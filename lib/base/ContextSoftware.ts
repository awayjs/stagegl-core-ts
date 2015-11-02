import BitmapImage2D                = require("awayjs-core/lib/data/BitmapImage2D");
import Matrix3D                        = require("awayjs-core/lib/geom/Matrix3D");
import Matrix                        = require("awayjs-core/lib/geom/Matrix");
import Point                        = require("awayjs-core/lib/geom/Point");
import Vector3D                        = require("awayjs-core/lib/geom/Vector3D");
import Rectangle                    = require("awayjs-core/lib/geom/Rectangle");
import ByteArray                    = require("awayjs-core/lib/utils/ByteArray");
import ColorUtils                    = require("awayjs-core/lib/utils/ColorUtils");

import ContextGLBlendFactor            = require("awayjs-stagegl/lib/base/ContextGLBlendFactor");
import ContextGLDrawMode            = require("awayjs-stagegl/lib/base/ContextGLDrawMode");
import ContextGLClearMask            = require("awayjs-stagegl/lib/base/ContextGLClearMask");
import ContextGLCompareMode            = require("awayjs-stagegl/lib/base/ContextGLCompareMode");
import ContextGLMipFilter            = require("awayjs-stagegl/lib/base/ContextGLMipFilter");
import ContextGLProgramType            = require("awayjs-stagegl/lib/base/ContextGLProgramType");
import ContextGLStencilAction        = require("awayjs-stagegl/lib/base/ContextGLStencilAction");
import ContextGLTextureFilter        = require("awayjs-stagegl/lib/base/ContextGLTextureFilter");
import ContextGLTriangleFace        = require("awayjs-stagegl/lib/base/ContextGLTriangleFace");
import ContextGLVertexBufferFormat    = require("awayjs-stagegl/lib/base/ContextGLVertexBufferFormat");
import ContextGLWrapMode            = require("awayjs-stagegl/lib/base/ContextGLWrapMode");
import CubeTextureWebGL                = require("awayjs-stagegl/lib/base/CubeTextureWebGL");
import IContextGL                    = require("awayjs-stagegl/lib/base/IContextGL");
import IIndexBuffer                    = require("awayjs-stagegl/lib/base/IIndexBuffer");
import ICubeTexture                    = require("awayjs-stagegl/lib/base/ICubeTexture");
import ITexture                        = require("awayjs-stagegl/lib/base/ITexture");
import IVertexBuffer                = require("awayjs-stagegl/lib/base/IVertexBuffer");
import IProgram                        = require("awayjs-stagegl/lib/base/IProgram");
import ITextureBase                    = require("awayjs-stagegl/lib/base/ITextureBase");
import IndexBufferSoftware                    = require("awayjs-stagegl/lib/base/IndexBufferSoftware");
import VertexBufferSoftware                    = require("awayjs-stagegl/lib/base/VertexBufferSoftware");
import TextureSoftware                    = require("awayjs-stagegl/lib/base/TextureSoftware");
import ProgramSoftware                    = require("awayjs-stagegl/lib/base/ProgramSoftware");
import ProgramVOSoftware                        = require("awayjs-stagegl/lib/base/ProgramVOSoftware");

class ContextSoftware implements IContextGL {

    private _canvas:HTMLCanvasElement;

    public static MAX_SAMPLERS:number = 8;

    private _backBufferRect:Rectangle = new Rectangle();
    private _backBufferWidth:number = 100;
    private _backBufferHeight:number = 100;
    private _backBufferColor:BitmapImage2D;
    private _antiAliasedBuffer:BitmapImage2D;
    private _antiAliasMatrix:Matrix = new Matrix(0.5, 0,0,0.5);
    private _zbuffer:number[] = [];
    private _cullingMode:string = ContextGLTriangleFace.BACK;
    private _blendSource:string = ContextGLBlendFactor.ONE;
    private _blendDestination:string = ContextGLBlendFactor.ZERO;
    private _colorMaskR:boolean = true;
    private _colorMaskG:boolean = true;
    private _colorMaskB:boolean = true;
    private _colorMaskA:boolean = true;
    private _writeDepth:boolean = true;
    private _depthCompareMode:string = ContextGLCompareMode.LESS;
    private _program:ProgramSoftware;

    private _screenMatrix:Matrix3D = new Matrix3D();

    private _bboxMin:Point = new Point();
    private _bboxMax:Point = new Point();
    private _clamp:Point = new Point();

    private _drawRect:Rectangle = new Rectangle();

    public _textures:Array<TextureSoftware> = [];
    public _vertexBuffers:Array<VertexBufferSoftware> = [];
    public _vertexBufferOffsets:Array<number> = [];
    public _vertexBufferFormats:Array<number> = [];

    public _fragmentConstants:Array<Vector3D> = [];
    public _vertexConstants:Array<Vector3D> = [];

    constructor(canvas:HTMLCanvasElement) {
        this._canvas = canvas;

        this._backBufferColor = new BitmapImage2D(this._backBufferWidth, this._backBufferHeight, false, 0, false);
        this._antiAliasedBuffer = new BitmapImage2D(2,2, false, 0, false);

        if(document && document.body) {
            document.body.appendChild(this._backBufferColor.getCanvas());
        }
    }

    public get backBufferColor():BitmapImage2D {
        return this._backBufferColor;
    }

    public get antiAliasedBuffer():BitmapImage2D {
        return this._antiAliasedBuffer;
    }

    public get container():HTMLElement {
        return this._canvas;
    }

    public clear(red:number = 0, green:number = 0, blue:number = 0, alpha:number = 1, depth:number = 1, stencil:number = 0, mask:number = ContextGLClearMask.ALL) {
        if (mask & ContextGLClearMask.COLOR) {
            this._backBufferColor.fillRect(this._backBufferRect, ColorUtils.ARGBtoFloat32(alpha, red, green, blue));
        }

        //TODO: mask & ContextGLClearMask.STENCIL

        if (mask & ContextGLClearMask.DEPTH) {
            this._zbuffer.length = 0;
            var len:number = this._backBufferWidth * this._backBufferHeight;
            for (var i:number = 0; i < len; i++) {
                this._zbuffer[i] = 10000000;
            }
        }
    }

    public configureBackBuffer(width:number, height:number, antiAlias:number, enableDepthAndStencil:boolean) {
        console.log("configureBackBuffer antiAlias: "+antiAlias);
        this._backBufferWidth = width*2;
        this._backBufferHeight = height*2;

        this._backBufferRect.width = width;
        this._backBufferRect.height = height;

        this._backBufferColor._setSize(width*2, height*2);

        this._antiAliasedBuffer._setSize(width, height);

        var raw:Float32Array = this._screenMatrix.rawData;

        raw[0] = this._backBufferWidth / 2;
        raw[1] = 0;
        raw[2] = 0;
        raw[3] = this._backBufferWidth / 2;

        raw[4] = 0;
        raw[5] = -this._backBufferHeight / 2;
        raw[6] = 0;
        raw[7] = this._backBufferHeight / 2;

        raw[8] = 0;
        raw[9] = 0;
        raw[10] = 1;
        raw[11] = 0;

        raw[12] = 0;
        raw[13] = 0;
        raw[14] = 0;
        raw[15] = 0;

        this._screenMatrix.transpose();
    }

    public createCubeTexture(size:number, format:string, optimizeForRenderToTexture:boolean, streamingLevels:number):ICubeTexture {
        //TODO: impl
        return undefined;
    }

    public createIndexBuffer(numIndices:number):IIndexBuffer {
        return new IndexBufferSoftware(numIndices);
    }

    public createProgram():ProgramSoftware {
        return new ProgramSoftware();
    }

    public createTexture(width:number, height:number, format:string, optimizeForRenderToTexture:boolean, streamingLevels:number):TextureSoftware {
        return new TextureSoftware(width, height);
    }

    public createVertexBuffer(numVertices:number, dataPerVertex:number):VertexBufferSoftware {
        return new VertexBufferSoftware(numVertices, dataPerVertex);
    }

    public dispose() {
    }

    public setBlendFactors(sourceFactor:string, destinationFactor:string) {
        console.log("setBlendFactors sourceFactor: "+sourceFactor+" destinationFactor: "+destinationFactor);
        this._blendSource = sourceFactor;
        this._blendDestination = destinationFactor;
    }

    public setColorMask(red:boolean, green:boolean, blue:boolean, alpha:boolean) {
        this._colorMaskR = red;
        this._colorMaskG = green;
        this._colorMaskB = blue;
        this._colorMaskA = alpha;
    }

    public setStencilActions(triangleFace:string, compareMode:string, actionOnBothPass:string, actionOnDepthFail:string, actionOnDepthPassStencilFail:string, coordinateSystem:string) {
        //TODO:
    }

    public setStencilReferenceValue(referenceValue:number, readMask:number, writeMask:number) {
        //TODO:
    }

    public setCulling(triangleFaceToCull:string, coordinateSystem:string) {
        //TODO: CoordinateSystem.RIGHT_HAND
        this._cullingMode = triangleFaceToCull;
    }

    public setDepthTest(depthMask:boolean, passCompareMode:string) {
        this._writeDepth = depthMask;
        this._depthCompareMode = passCompareMode;
    }

    public setProgram(program:ProgramSoftware) {
        this._program = program;
    }

    public setProgramConstantsFromMatrix(programType:number, firstRegister:number, matrix:Matrix3D, transposedMatrix:boolean) {
        console.log("setProgramConstantsFromMatrix: programType" + programType + " firstRegister: " + firstRegister + " matrix: " + matrix + " transposedMatrix: " + transposedMatrix);

        if (transposedMatrix) {
            var tempMatrix:Matrix3D = matrix.clone();
            tempMatrix.transpose();
            matrix = tempMatrix;
        }

        var target:Array<Vector3D>;
        if (programType == ContextGLProgramType.VERTEX) {
            target = this._vertexConstants;
        } else if (programType == ContextGLProgramType.FRAGMENT) {
            target = this._fragmentConstants;
        }

        var matrixData:Float32Array = matrix.rawData;
        for (var i:number = firstRegister; i < firstRegister + 4; i++) {
            target[i] = new Vector3D(matrixData[i * 4], matrixData[i * 4 + 1], matrixData[i * 4 + 2], matrixData[i * 4 + 3]);
        }
    }

    public setProgramConstantsFromArray(programType:number, firstRegister:number, data:Float32Array, numRegisters:number) {
        console.log("setProgramConstantsFromArray: programType" + programType + " firstRegister: " + firstRegister + " data: " + data + " numRegisters: " + numRegisters);
        var target:Array<Vector3D>;
        if (programType == ContextGLProgramType.VERTEX) {
            target = this._vertexConstants;
        } else if (programType == ContextGLProgramType.FRAGMENT) {
            target = this._fragmentConstants;
        }

        var k:number = 0;
        for (var i:number = firstRegister; i < firstRegister + numRegisters; i++) {
            target[i] = new Vector3D(data[k++], data[k++], data[k++], data[k++]);
        }
    }

    public setTextureAt(sampler:number, texture:TextureSoftware) {
        console.log("setTextureAt sample: " + sampler + " texture: " + texture);
        this._textures[sampler] = texture;
    }

    public setVertexBufferAt(index:number, buffer:VertexBufferSoftware, bufferOffset:number, format:number) {
        console.log("setVertexBufferAt index: " + index + " buffer: " + buffer + " bufferOffset: " + bufferOffset + " format: " + format);
        this._vertexBuffers[index] = buffer;
        this._vertexBufferOffsets[index] = bufferOffset;
        this._vertexBufferFormats[index] = format;
    }

    public present() {
        console.log("present()");
        this._antiAliasedBuffer.draw(this._backBufferColor, this._antiAliasMatrix);
    }

    public drawToBitmapImage2D(destination:BitmapImage2D) {
    }

    public drawIndices(mode:string, indexBuffer:IndexBufferSoftware, firstIndex:number, numIndices:number) {
        console.log("drawIndices mode: " + mode + " firstIndex: " + firstIndex + " numIndices: " + numIndices);

        if (!this._program) {
            return;
        }

        this._backBufferColor.lock();

        for (var i:number = firstIndex; i < numIndices; i += 3) {
            var index0:number = indexBuffer.data[indexBuffer.startOffset + i];
            var index1:number = indexBuffer.data[indexBuffer.startOffset + i + 1];
            var index2:number = indexBuffer.data[indexBuffer.startOffset + i + 2];

            var vo0:ProgramVOSoftware = this._program.vertex(this, index0);
            var vo1:ProgramVOSoftware = this._program.vertex(this, index1);
            var vo2:ProgramVOSoftware = this._program.vertex(this, index2);

            this.triangle(vo0, vo1, vo2);
        }

        this._backBufferColor.unlock();
    }

    public drawVertices(mode:string, firstVertex:number, numVertices:number) {
        console.log("drawVertices");
    }

    public setScissorRectangle(rectangle:Rectangle) {
        //TODO:
    }

    public setSamplerStateAt(sampler:number, wrap:string, filter:string, mipfilter:string) {
        //TODO:
    }

    public setRenderToTexture(target:ITextureBase, enableDepthAndStencil:boolean, antiAlias:number, surfaceSelector:number) {
        //TODO:
    }

    public setRenderToBackBuffer() {
        //TODO:
    }

    public putPixel(x:number, y:number, color:number):void {
        this._drawRect.x = x;
        this._drawRect.y = y;
        this._drawRect.width = 1;
        this._drawRect.height = 1;

        var dest:number[] = ColorUtils.float32ColorToARGB(this._backBufferColor.getPixel32(x, y));
        var source:number[] = ColorUtils.float32ColorToARGB(color);

        var destModified:number[] = this.applyBlendMode(dest, this._blendDestination, dest, source);
        var sourceModified:number[] = this.applyBlendMode(source, this._blendSource, dest, source);

        var a:number = destModified[0] + sourceModified[0];
        var r:number = destModified[1] + sourceModified[1];
        var g:number = destModified[2] + sourceModified[2];
        var b:number = destModified[3] + sourceModified[3];

        a = Math.max(0, Math.min(a, 255));
        r = Math.max(0, Math.min(r, 255));
        g = Math.max(0, Math.min(g, 255));
        b = Math.max(0, Math.min(b, 255));
        //
        //r*=a/255;
        //g*=a/255;
        //b*=a/255;
        //a = 255;

        this._backBufferColor.setPixel32(x, y, ColorUtils.ARGBtoFloat32(a, r, g, b));
    }

    private applyBlendMode(argb:number[], blend:string, dest:number[], source:number[]):number[] {
        var result:number[] = [];

        result[0] = argb[0];
        result[1] = argb[1];
        result[2] = argb[2];
        result[3] = argb[3];

        if (blend == ContextGLBlendFactor.DESTINATION_ALPHA) {
            result[0] *= dest[0];
            result[1] *= dest[0];
            result[2] *= dest[0];
            result[3] *= dest[0];
        } else if (blend == ContextGLBlendFactor.DESTINATION_COLOR) {
            result[0] *= dest[0];
            result[1] *= dest[1];
            result[2] *= dest[2];
            result[3] *= dest[3];
        } else if (blend == ContextGLBlendFactor.ZERO) {
            result[0] = 0;
            result[1] = 0;
            result[2] = 0;
            result[3] = 0;
        } else if (blend == ContextGLBlendFactor.ONE_MINUS_DESTINATION_ALPHA) {
            result[0] *= 1 - dest[0];
            result[1] *= 1 - dest[0];
            result[2] *= 1 - dest[0];
            result[3] *= 1 - dest[0];
        } else if (blend == ContextGLBlendFactor.ONE_MINUS_DESTINATION_COLOR) {
            result[0] *= 1 - dest[0];
            result[1] *= 1 - dest[1];
            result[2] *= 1 - dest[2];
            result[3] *= 1 - dest[3];
        } else if (blend == ContextGLBlendFactor.ONE_MINUS_SOURCE_ALPHA) {
            result[0] *= 1 - source[0];
            result[1] *= 1 - source[0];
            result[2] *= 1 - source[0];
            result[3] *= 1 - source[0];
        } else if (blend == ContextGLBlendFactor.ONE_MINUS_SOURCE_COLOR) {
            result[0] *= 1 - source[0];
            result[1] *= 1 - source[1];
            result[2] *= 1 - source[2];
            result[3] *= 1 - source[3];
        } else if (blend == ContextGLBlendFactor.SOURCE_ALPHA) {
            result[0] *= source[0];
            result[1] *= source[0];
            result[2] *= source[0];
            result[3] *= source[0];
        } else if (blend == ContextGLBlendFactor.SOURCE_COLOR) {
            result[0] *= source[0];
            result[1] *= source[1];
            result[2] *= source[2];
            result[3] *= source[3];
        }

        return result;
    }

    public drawRect(x:number, y:number, color:number):void {
        this._drawRect.x = x;
        this._drawRect.y = y;
        this._drawRect.width = 5;
        this._drawRect.height = 5;
        this._backBufferColor.fillRect(this._drawRect, color);
    }

    public clamp(value:number, min:number = 0, max:number = 1):number {
        return Math.max(min, Math.min(value, max));
    }

    public interpolate(min:number, max:number, gradient:number) {
        return min + (max - min) * this.clamp(gradient);
    }

    public triangle(vo0:ProgramVOSoftware, vo1:ProgramVOSoftware, vo2:ProgramVOSoftware):void {
        var p0:Vector3D = vo0.outputPosition[0];
        if (!p0 || p0.w == 0 || isNaN(p0.w)) {
            console.error("wrong position");
            return;
        }
        var p1:Vector3D = vo1.outputPosition[0];
        var p2:Vector3D = vo2.outputPosition[0];

        p0.z = p0.z * 2 - p0.w;
        p1.z = p1.z * 2 - p1.w;
        p2.z = p2.z * 2 - p2.w;

        p0.scaleBy(1 / p0.w);
        p1.scaleBy(1 / p1.w);
        p2.scaleBy(1 / p2.w);

        var depth:Vector3D = new Vector3D(p0.z, p1.z, p2.z);
        var project:Vector3D = new Vector3D(p0.w, p1.w, p2.w);

        p0 = this._screenMatrix.transformVector(p0);
        p1 = this._screenMatrix.transformVector(p1);
        p2 = this._screenMatrix.transformVector(p2);

        this._bboxMin.x = 1000000;
        this._bboxMin.y = 1000000;
        this._bboxMax.x = -1000000;
        this._bboxMax.y = -1000000;

        this._clamp.x = this._backBufferWidth - 1;
        this._clamp.y = this._backBufferHeight - 1;

        this._bboxMin.x = Math.max(0, Math.min(this._bboxMin.x, p0.x));
        this._bboxMin.y = Math.max(0, Math.min(this._bboxMin.y, p0.y));

        this._bboxMin.x = Math.max(0, Math.min(this._bboxMin.x, p1.x));
        this._bboxMin.y = Math.max(0, Math.min(this._bboxMin.y, p1.y));

        this._bboxMin.x = Math.max(0, Math.min(this._bboxMin.x, p2.x));
        this._bboxMin.y = Math.max(0, Math.min(this._bboxMin.y, p2.y));

        this._bboxMax.x = Math.min(this._clamp.x, Math.max(this._bboxMax.x, p0.x));
        this._bboxMax.y = Math.min(this._clamp.y, Math.max(this._bboxMax.y, p0.y));

        this._bboxMax.x = Math.min(this._clamp.x, Math.max(this._bboxMax.x, p1.x));
        this._bboxMax.y = Math.min(this._clamp.y, Math.max(this._bboxMax.y, p1.y));

        this._bboxMax.x = Math.min(this._clamp.x, Math.max(this._bboxMax.x, p2.x));
        this._bboxMax.y = Math.min(this._clamp.y, Math.max(this._bboxMax.y, p2.y));

        this._bboxMin.x = Math.floor(this._bboxMin.x);
        this._bboxMin.y = Math.floor(this._bboxMin.y);
        this._bboxMax.x = Math.floor(this._bboxMax.x);
        this._bboxMax.y = Math.floor(this._bboxMax.y);

        for (var x:number = this._bboxMin.x; x <= this._bboxMax.x; x++) {
            for (var y:number = this._bboxMin.y; y <= this._bboxMax.y; y++) {
                var screen:Vector3D = this.barycentric(p0, p1, p2, x, y);

                var clip:Vector3D = new Vector3D(screen.x / project.x, screen.y / project.y, screen.z / project.z);

                var sum:number = clip.x + clip.y + clip.z;
                clip.scaleBy(1 / sum);

                var index:number = ((x % this._backBufferWidth) + y * this._backBufferWidth);

                var fragDepth:number = depth.x * screen.x + depth.y * screen.y + depth.z * screen.z;

                if (screen.x < 0 || screen.y < 0 || screen.z < 0) {
                    continue;
                }

                var currentDepth:number =this._zbuffer[index];
                //< fragDepth
                var passDepthTest:boolean = false;
                switch(this._depthCompareMode) {
                    case ContextGLCompareMode.ALWAYS:
                        passDepthTest = true;
                        break;
                    case ContextGLCompareMode.EQUAL:
                        passDepthTest = fragDepth==currentDepth;
                        break;
                    case ContextGLCompareMode.GREATER:
                        passDepthTest = fragDepth>currentDepth;
                        break;
                    case ContextGLCompareMode.GREATER_EQUAL:
                        passDepthTest = fragDepth>=currentDepth;
                        break;
                    case ContextGLCompareMode.LESS:
                        passDepthTest = fragDepth<currentDepth;
                        break;
                    case ContextGLCompareMode.LESS_EQUAL:
                        passDepthTest = fragDepth<=currentDepth;
                        break;
                    case ContextGLCompareMode.NEVER:
                        passDepthTest = false;
                        break;
                    case ContextGLCompareMode.NOT_EQUAL:
                        passDepthTest = fragDepth!=currentDepth;
                        break;
                    default:
                }

                if(!passDepthTest) {
                    continue;
                }

                var fragmentVO:ProgramVOSoftware = this._program.fragment(this, clip, vo0, vo1, vo2);
                if (fragmentVO.discard) {
                    continue;
                }

                if(this._writeDepth) {
                    this._zbuffer[index] = fragDepth;
                }

                var color:Vector3D = fragmentVO.outputColor[0];

                color.x = Math.max(0, Math.min(color.x, 1));
                color.y = Math.max(0, Math.min(color.y, 1));
                color.z = Math.max(0, Math.min(color.z, 1));
                color.w = Math.max(0, Math.min(color.w, 1));

                color.x *= 255;
                color.y *= 255;
                color.z *= 255;
                color.w *= 255;

                if (color) {
                    this.putPixel(x, y, ColorUtils.ARGBtoFloat32(color.w, color.x, color.y, color.z));
                } else {
                    this.putPixel(x, y, 0xffff0000);
                }
            }
        }
    }

    public barycentric(a:Vector3D, b:Vector3D, c:Vector3D, x:number, y:number):Vector3D {
        var sx:Vector3D = new Vector3D();
        sx.x = c.x - a.x;
        sx.y = b.x - a.x;
        sx.z = a.x - x;

        var sy:Vector3D = new Vector3D();
        sy.x = c.y - a.y;
        sy.y = b.y - a.y;
        sy.z = a.y - y;

        var u:Vector3D = sx.crossProduct(sy);
        if (u.z < 0.01) {
            return new Vector3D(1 - (u.x + u.y) / u.z, u.y / u.z, u.x / u.z);
        }
        return new Vector3D(-1, 1, 1);
    }
}

export = ContextSoftware;

class VertexBufferProperties {
    public size:number;

    public type:number;

    public normalized:boolean;

    constructor(size:number, type:number, normalized:boolean) {
        this.size = size;
        this.type = type;
        this.normalized = normalized;
    }
}
