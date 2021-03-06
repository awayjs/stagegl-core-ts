import { BlurTask } from './tasks/BlurTask';
import { FilterBase } from './FilterBase';
import { FilterUtils, serialisable, proxyTo } from '../utils/FilterUtils';
import { Image2D } from '../image/Image2D';
import { Rectangle } from '@awayjs/core';
import { FilterManager } from '../managers/FilterManager';
import { IBitmapFilter, IBitmapFilterProps } from './IBitmapFilter';

export interface IBlurFilterProps extends IBitmapFilterProps {
	blurX: number;
	blurY: number;
	// not supported yet
	quality: number;
	// not falsh prop, passed from cache
	imageScale: number;
}
export class BlurFilter extends FilterBase implements IBitmapFilter<'blur', IBlurFilterProps> {
	public static readonly filterName: string = 'blur';

	protected _hBlurTask: BlurTask;
	protected _vBlurTask: BlurTask;

	@serialisable
	public imageScale: number = 1;

	@serialisable
	@proxyTo('_hBlurTask', 'amount')
	public blurX: number;

	@serialisable
	@proxyTo('_vBlurTask', 'amount')
	public blurY: number;

	constructor(props?: Partial<IBlurFilterProps>) {
		super();

		this._hBlurTask = new BlurTask(props?.blurX || 4, -1, true);
		this._vBlurTask = new BlurTask(props?.blurY || 4, -1, false);

		this.addTask(this._hBlurTask);
		this.addTask(this._vBlurTask);
	}

	public applyProps(props: Partial<IBlurFilterProps>) {
		if ('blurX' in props) {
			this.blurX = props.blurX;
		}

		if ('blurY' in props) {
			this.blurY = props.blurY;
		}

		if ('imageScale' in props) {
			this.imageScale = props.imageScale || 1;
		}
	}

	/**
	 * The distance between two blur samples. Set to -1 to autodetect with acceptable quality (default value).
	 * Higher values provide better performance at the cost of reduces quality.
	 */
	public get stepSize(): number {
		return this._hBlurTask.stepSize;
	}

	public set stepSize(value: number) {
		this._hBlurTask.stepSize = value;
		this._vBlurTask.stepSize = value;
	}

	public meashurePad(input: Rectangle, target: Rectangle = input): Rectangle {
		const pad = FilterUtils.meashureBlurPad(
			this.blurX,
			this.blurY,
			3,
			true
		);

		target.copyFrom(input);

		target.x -= pad.x;
		target.y -= pad.y;
		target.width += pad.x;
		target.height += pad.y;

		return target;
	}

	public setRenderState (
		source: Image2D,
		target: Image2D,
		sourceRect: Rectangle,
		outRect: Rectangle,
		filterManage: FilterManager
	) {
		/*
		const pad = FilterUtils.meashureBlurPad(
			this.blurX,
			this.blurY,
			3,
			false
		);
		*/

		const subPassTarget = filterManage.popTemp(
			source.width,
			source.height
		);

		// TEMP target can be dirty, because we use offset, clear it
		this._hBlurTask.needClear = true;

		// we not cut region, because in this case blur will emit invalid data on edge
		this._hBlurTask.inputRect.setTo(
			0,0,
			source.width,
			source.height
		);

		// apply padding
		this._hBlurTask.destRect.setTo(
			0, 0,
			source.width,
			source.height
		);

		// but we can use a clip to kill non-used
		/* this._vBlurTask.clipRect = new Rectangle(
			0,0,
			source.width,
			source.height
		);
		*/

		//this._vBlurTask.clipRect = this._hBlurTask.clipRect;

		// emit real
		// crop a dest rectanle
		this._vBlurTask.inputRect.copyFrom(outRect);
		this._vBlurTask.destRect.copyFrom(outRect);

		this._hBlurTask.source = source;
		this._hBlurTask.target = subPassTarget;
		this._vBlurTask.source = subPassTarget;
		this._vBlurTask.target = target;

		this._temp = [subPassTarget];
	}
}