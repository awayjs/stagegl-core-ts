import {IAsset}						from "@awayjs/core/lib/library/IAsset";
import {VideoSourceImage2D}			from "@awayjs/graphics/lib/image/VideoSourceImage2D";

import {GL_Image2D}					from "../image/GL_Image2D";
import {Stage}						from "../base/Stage";

/**
 *
 * @class away.pool.ImageObjectBase
 */
export class GL_VideoSourceImage2D extends GL_Image2D
{

	constructor(asset:IAsset, stage:Stage)
	{
		super(asset, stage);

		this._createTexture();
	}


	public activate(index:number, mipmap:boolean):void
	{
		this._stage.context.setTextureAt(index, this._texture);

		//  update from video
		if((<VideoSourceImage2D> this._asset)._videoSource){
			var gl = this._stage.context["_gl"];
			//gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
			gl.texImage2D(gl.TEXTURE_2D, index, gl.RGBA, gl.RGBA,
				gl.UNSIGNED_BYTE, (<VideoSourceImage2D> this._asset)._videoSource);
		}
	}
}