import { ProjectionBase } from '@awayjs/core';
import { Image2D, _Stage_Image2D } from '../../../image/Image2D';
import { Stage } from '../../../Stage';
import { FilterUtils } from '../../../utils/FilterUtils';
import { GradientAtlass } from '../../../utils/GradientAtlass';
import { TaskBaseWebGL } from './TaskBaseWebgGL';

const enum BEVEL_MODE {
	COLOR = 'color',
	GRADIENT = 'gradient'
}

const VERTEX = `
precision highp float;
uniform vec4 uTexMatrix[2];
uniform vec4 uTexMatrixSource;

/* AGAL legacy atrib resolver require this names */
attribute vec4 va0; // position

varying vec2 vUv[2];

void main() {
	vec4 pos = va0;

	pos.xy = pos.xy * uTexMatrix[0].zw + uTexMatrix[0].xy;
	pos.z = pos.z * 2.0 - pos.w;

    gl_Position = pos;

	vUv[0] = clamp((va0.xy * uTexMatrix[1].zw) + uTexMatrix[1].xy, 0., 1.);
	vUv[1] = clamp((va0.xy * uTexMatrixSource.zw) + uTexMatrixSource.xy , 0., 1.);
}

`;

const COLOR_MODE_PART = `
uniform vec4 uHColor;
uniform vec4 uSColor;

vec4 bevel(float shadow, float high) {
	float factor = high - shadow;

	shadow = min(1., max(0., factor) * uStrength) * uSColor.a;
	high = min(1., max(0., -factor) * uStrength) * uHColor.a;

	return vec4(uSColor.rgb * shadow + uHColor.rgb * high, shadow + high);
}

`;

const GRAD_MODE_PART = `
// gradient
uniform sampler2D fs2;
uniform float uGradIndex;

vec4 bevel(float shadow, float high) {
	shadow *= uStrength;
	high *= uStrength;

	vec2 pos = vec2(0.5 * (1. + shadow - high), uGradIndex);

	return texture2D(fs2, pos) * (shadow + high);
}

`;

const FRAG = (mode =  BEVEL_MODE.COLOR) =>  `
precision highp float;
varying vec2 vUv[2];

uniform float uStrength;
uniform vec3 uType;
uniform vec2 uDir;

/* AGAL legacy attrib resolver require this names */
// blur
uniform sampler2D fs0;
/* AGAL legacy attrib resolver require this names */
// source
uniform sampler2D fs1;
${
	mode === BEVEL_MODE.COLOR ? COLOR_MODE_PART : GRAD_MODE_PART
}

void main() {
	vec4 color = texture2D(fs1, vUv[1]);
	
	float a = color.a;

	// LOOL.. there are a bug - we PMA it twice, devide to compense
	if (a > 0.) color.a /= a;

	float shadow = texture2D(fs0, vUv[0] + uDir).a;
	float high = texture2D(fs0, vUv[0] - uDir).a;

	float cut = color.a * uType[1] + (1.0 - color.a) * uType[2];

	vec4 outColor = bevel(shadow, high) * cut;

	gl_FragColor = color * (1. - outColor.a) * uType[0] + outColor;
	gl_FragColor *= a;
}`;

export class BevelTask extends TaskBaseWebGL {
	readonly activateInternaly = false;

	public sourceImage: Image2D;

	private _currentAtlass: GradientAtlass;
	private _currentIndex: number = 0;
	private _currentHash: string;
	private _gradInvalid: boolean = false;

	public get name() {
		return 'BevelTask:' + this._renderMode;
	}

	private _renderMode: BEVEL_MODE = BEVEL_MODE.COLOR;

	private set renderMode(v: BEVEL_MODE) {
		if (v === this._renderMode) return;

		this._renderMode = v;
		this.invalidateProgram();
	}

	private get renderMode() {
		return this._renderMode;
	}

	private _shadowColor: number = 0x0;
	public get shadowColor(): number {
		return this._shadowColor;
	}

	public set shadowColor(value: number) {
		if (this.shadowColor === value) return;

		this._shadowColor = value;
		this._gradInvalid = true;

		this.renderMode = BEVEL_MODE.COLOR;
	}

	private _shadowAlpha: number = 1;
	public get shadowAlpha(): number {
		return this._shadowAlpha;
	}

	public set shadowAlpha(value: number) {
		if (value === this._shadowAlpha) return;

		this._shadowAlpha = value;
		this._gradInvalid = true;

		this.renderMode = BEVEL_MODE.COLOR;
	}

	private _highlightColor: number = 0xfffff;
	public get highlightColor(): number {
		return this._highlightColor;
	}

	public set highlightColor(value: number) {
		if (this._highlightColor !== value) return;

		this._highlightColor = value;
		this._gradInvalid = true;

		this.renderMode = BEVEL_MODE.COLOR;
	}

	private _highlightAlpha: number = 1;
	public get highlightAlpha(): number {
		return this._highlightAlpha;
	}

	public set highlightAlpha(value: number) {
		if (this._highlightAlpha === value) return;

		this._highlightAlpha = value;
		this._gradInvalid = true;

		this.renderMode = BEVEL_MODE.COLOR;
	}

	private _dirInvalid: boolean = false;
	private _angle: number = 45;
	public get angle(): number {
		return this._angle;
	}

	public set angle(value: number) {
		if (value === this._angle) return;

		this._angle = value;
		this._dirInvalid = true;
	}

	private _distance: number = 4;
	public get distance(): number {
		return this._distance;
	}

	public set distance(value: number) {
		if (value === this._distance) return;

		this._distance = value;
		this._dirInvalid = true;
	}

	private _colors: ui32[];
	public get colors(): ui32[] {
		return this._colors;
	}

	public set colors(value: ui32[]) {
		this._colors = value;

		if (value.length) {
			this._gradInvalid = true;
			//this._shadowColor = value[0];
			//this._highlightColor = value[value.length - 1];

			this.renderMode = BEVEL_MODE.GRADIENT;
		}
	}

	private _alphas: ui32[];
	public get alphas(): ui32[] {
		return this._alphas;
	}

	public set alphas(value: ui32[]) {
		this._alphas = value;

		if (value.length) {
			this._gradInvalid = true;
			//this._shadowAlpha = value[0];
			//this._highlightAlpha = value[value.length - 1];
			this.renderMode = BEVEL_MODE.GRADIENT;
		}
	}

	private _ratios: ui32[];
	public get ratios(): ui32[] {
		return this._ratios;
	}

	public set ratios(value: ui32[]) {
		this._ratios = value;

		if (value.length) {
			this._gradInvalid = true;
			this.renderMode = BEVEL_MODE.GRADIENT;
		}
	}

	public strength: number = 1;
	public knockout: boolean = false;
	public type: 'inner' | 'outer' | 'both' = 'inner';

	public _focusId = -1;

	constructor() {
		super();
	}

	public getVertexCode(): string {
		return VERTEX;
	}

	public getFragmentCode(): string {
		return FRAG(this._renderMode);
	}

	private _regenColorMap(): void {

		if (!this._gradInvalid || this._renderMode !== BEVEL_MODE.GRADIENT) {
			return;
		}

		const hash = GradientAtlass.computeHash(this._colors, this._alphas, this._ratios);

		this._gradInvalid = false;

		if (this._currentHash === hash) {
			return;
		}

		const atlass = this._currentAtlass = GradientAtlass.getAtlassForHash(hash, true);

		if (atlass.hasGradient(hash)) {
			this._currentIndex = atlass.getGradient(hash).index;
		} else {
			this._currentIndex = atlass.setGradient(this._colors, this._alphas, this.ratios).index;
		}

		this._currentHash = hash;
		this._gradInvalid = false;
	}

	public preActivate(_stage: Stage) {
		// not requre init grad for it
		if (this._renderMode !== BEVEL_MODE.GRADIENT) {
			return;
		}

		this._regenColorMap();
	}

	public activate(_stage: Stage, _projection: ProjectionBase, _depthTexture: Image2D): void {
		super.computeVertexData();

		const tex = this._source;
		const prog = this._program3D;
		const needUpload = prog.focusId !== this._focusId;

		prog.uploadUniform('uTexMatrix', this._vertexConstantData);

		if (needUpload || this._dirInvalid) {
			const rad = this.angle * Math.PI / 180;
			prog.uploadUniform('uDir', [
				Math.cos(rad) * this.distance / tex.width,
				Math.sin(rad) * this.distance / tex.height
			]);
		}

		prog.uploadUniform('uStrength', this.strength);
		prog.uploadUniform('uType', [
			this.knockout ? 0 : 1,
			this.type !== 'outer' ? 1 : 0,
			this.type !== 'inner' ? 1 : 0
		]);

		prog.uploadUniform('uTexMatrixSource', [
			0, 0,
			this.inputRect.width / this.sourceImage.width,
			this.inputRect.height / this.sourceImage.height,
		]);

		this.sourceImage.getAbstraction<_Stage_Image2D>(_stage).activate(1);

		if (this._renderMode === BEVEL_MODE.GRADIENT) {
			this._currentAtlass.getAbstraction<_Stage_Image2D>(_stage).activate(2);
			prog.uploadUniform('uGradIndex', this._currentIndex / this._currentAtlass.height);
		} else if (this._gradInvalid || needUpload) {

			prog.uploadUniform('uSColor',
				FilterUtils.colorToArray(
					this._shadowColor,
					this._shadowAlpha)
			);
			prog.uploadUniform('uHColor',
				FilterUtils.colorToArray(
					this._highlightColor,
					this._highlightAlpha)
			);
		}

		this._focusId = prog.focusId;
		this._dirInvalid = false;
	}
}