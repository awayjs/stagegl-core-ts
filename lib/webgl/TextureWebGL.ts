import { ITexture } from '../base/ITexture';
import { TextureBaseWebGL } from './TextureBaseWebGL';
import { ContextWebGL } from './ContextWebGL';
import { IUnloadable, UnloadService } from '../managers/UnloadManager';
import { Settings } from '../Settings';
import { RenderTargetWebGLMSAA } from './RenderTargetWebGLMSAA';
import { RenderTargetWebGL } from './RenderTargetWebGL';

export class TextureWebGL extends TextureBaseWebGL implements ITexture, IUnloadable {
	public static readonly SIZE_POOL_LIMIT = 10;

	public static unloadManager = UnloadService.createManager<TextureWebGL>({
		keepAliveTime: 20_000,
		name: 'TextureWebGL',
		priority: 1000, // runs after any unloaders
	});

	private static _pool: NumberMap<Array<TextureWebGL>> = {};

	public static store(tex: TextureWebGL) {

		const key = tex._width << 16 | tex._height;
		const array = TextureWebGL._pool[key] || (TextureWebGL._pool[key] = []);

		if (array.indexOf(tex) > -1) {
			tex.lastUsedTime = this.unloadManager.correctedTime;

			return true;
		}

		if (array.length >= this.SIZE_POOL_LIMIT) {
			return false;
		}

		array.push(tex);

		if (Settings.ENABLE_UNLOAD_TEXTURE) {
			tex.lastUsedTime = this.unloadManager.correctedTime;

			this.unloadManager.addTask(tex);

			// const count = this.unloadManager.execute();
			// count && console.debug('[TextureWebGL Experimental] Remove textures persistently', count);
		}

		return true;
	}

	public static remove(tex: TextureWebGL): boolean {
		const key = tex._width << 16 | tex._height;
		const array = TextureWebGL._pool[key];

		if (!array || !array.length) return false;

		const index = array.indexOf(tex);

		return index > -1 && !!array.splice(index,1);
	}

	public static create (context: ContextWebGL, width: number, height: number) {
		// const count = this.unloadManager.execute();
		// count && console.debug('[TextureWebGL Experimental] Remove textures persistently', count);

		const key = width << 16 | (height | 0);
		const tex = TextureWebGL._pool[key]?.pop();

		if (tex) {
			this.unloadManager.removeTask(tex);
			return tex;
		}

		return new TextureWebGL(context, width, height);
	}

	public textureType: string = 'texture2d';

	/*internal*/ _renderTarget: RenderTargetWebGLMSAA | RenderTargetWebGL;
	/*internal*/ _width: number;
	/*internal*/ _height: number;
	/*internal*/ _isFilled: boolean = false;
	/*internal*/ _isPMA: boolean = false;
	/*internal*/ _isRT: boolean = false;
	/*internal*/ _isMipmaped: boolean = false;

	//keepAliveTime: number = 30_000;
	lastUsedTime: number = 0;

	get canUnload() {
		return this._glTexture && !this._isRT;
	}

	constructor(context: ContextWebGL, width: number, height: number) {
		super(context);

		if (!width || !height) {
			throw new Error(`Incorrected size of texture { width: ${width}, height: ${height}}`);
		}

		this._width = width;
		this._height = height;

		this._glTexture = this._gl.createTexture();
		this._context.stats.counter.texture++;
		this._context.stats.memory.texture += width * height * 8;
	}

	get isPOT () {
		return !(this._width & (this._width - 1)) && !(this._height & (this._height - 1));
	}

	public get width(): number {
		return this._width;
	}

	public get height(): number {
		return this._height;
	}

	/**
	 * @inheritdoc
	 */
	public dispose(): void {
		if (Settings.ENABLE_TEXTURE_POOLING && TextureWebGL.store(this))
			return;

		this.unload();
	}

	unload(): void {
		TextureWebGL.remove(this);

		this._context.stats.counter.texture--;
		this._context.stats.memory.texture -= this.width * this.height * 8;

		this._context._texContext.disposeTexture(this);

		this._glTexture = null;
		this._state.dispose();
	}

	/* eslint-disable-next-line */
	public uploadFromArray(array: Uint8Array | Array<number>, miplevel: number = 0, premultiplied: boolean = false): void {
		this._context._texContext.uploadFromArray(
			this,
			array,
			miplevel,
			premultiplied
		);

		this._isFilled = true;
		this._isPMA = premultiplied;
	}

	public uploadFromURL(urlRequest: unknown, miplevel: number = 0, premultiplied: boolean = false): void {
		//dummy code for testing
		this._context._texContext.uploadFromArray(
			this,
			null,
			miplevel,
			premultiplied
		);

		this._isFilled = true;
		this._isPMA = premultiplied;
	}

	public uploadCompressedTextureFromArray(array: Uint8Array, offset: number, async: boolean = false): void {
	}

	public generateMipmaps(): void {
		// cant be generated on nPOT texture in webgl1
		if (!this.isPOT && this._context.glVersion !== 2) {
			return;
		}

		const last = this._context._texContext.bindTexture(this, true);

		this._gl.generateMipmap(this._gl.TEXTURE_2D);

		this._context._texContext.bindTexture(last, true);

		this._isMipmaped = true;
	}
}