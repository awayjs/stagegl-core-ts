declare module "awayjs-stagegl/lib/StageGL" {
	import Stage = require("awayjs-stagegl/lib/base/Stage");
	/**
	 *
	 * static shim
	 */
	var stagegl: {
	    Stage: typeof Stage;
	};
	export = stagegl;
	
}

declare module "awayjs-stagegl/lib/aglsl/AGALTokenizer" {
	import ByteArray = require("awayjs-core/lib/utils/ByteArray");
	import Description = require("awayjs-stagegl/lib/aglsl/Description");
	class AGALTokenizer {
	    constructor();
	    decribeAGALByteArray(bytes: ByteArray): Description;
	    readReg(s: any, mh: any, desc: any, bytes: any): void;
	}
	export = AGALTokenizer;
	
}

declare module "awayjs-stagegl/lib/aglsl/AGLSLParser" {
	import Description = require("awayjs-stagegl/lib/aglsl/Description");
	class AGLSLParser {
	    parse(desc: Description): string;
	    regtostring(regtype: number, regnum: number, desc: Description, tag: any): string;
	    sourcetostring(s: any, subline: any, dwm: any, isscalar: any, desc: any, tag: any): string;
	}
	export = AGLSLParser;
	
}

declare module "awayjs-stagegl/lib/aglsl/Description" {
	import Header = require("awayjs-stagegl/lib/aglsl/Header");
	import Token = require("awayjs-stagegl/lib/aglsl/Token");
	class Description {
	    regread: any[];
	    regwrite: any[];
	    hasindirect: boolean;
	    writedepth: boolean;
	    hasmatrix: boolean;
	    samplers: any[];
	    tokens: Token[];
	    header: Header;
	    constructor();
	}
	export = Description;
	
}

declare module "awayjs-stagegl/lib/aglsl/Destination" {
	class Destination {
	    mask: number;
	    regnum: number;
	    regtype: number;
	    dim: number;
	    indexoffset: number;
	    swizzle: number;
	    lodbiad: number;
	    readmode: number;
	    special: number;
	    wrap: number;
	    filter: number;
	    indexregtype: number;
	    indexselect: number;
	    indirectflag: number;
	    constructor();
	}
	export = Destination;
	
}

declare module "awayjs-stagegl/lib/aglsl/Header" {
	class Header {
	    progid: number;
	    version: number;
	    type: string;
	    constructor();
	}
	export = Header;
	
}

declare module "awayjs-stagegl/lib/aglsl/Mapping" {
	import OpLUT = require("awayjs-stagegl/lib/aglsl/OpLUT");
	class Mapping {
	    static agal2glsllut: Array<OpLUT>;
	    constructor(include?: OpLUT);
	}
	export = Mapping;
	
}

declare module "awayjs-stagegl/lib/aglsl/OpLUT" {
	class OpLUT {
	    s: string;
	    flags: number;
	    dest: boolean;
	    a: boolean;
	    b: boolean;
	    matrixwidth: number;
	    matrixheight: number;
	    ndwm: boolean;
	    scalar: boolean;
	    dm: boolean;
	    lod: boolean;
	    constructor(s: string, flags: number, dest: boolean, a: boolean, b: boolean, matrixwidth: number, matrixheight: number, ndwm: boolean, scaler: boolean, dm: boolean, lod: boolean);
	}
	export = OpLUT;
	
}

declare module "awayjs-stagegl/lib/aglsl/Sampler" {
	class Sampler {
	    lodbias: number;
	    dim: number;
	    readmode: number;
	    special: number;
	    wrap: number;
	    mipmap: number;
	    filter: number;
	    constructor();
	}
	export = Sampler;
	
}

declare module "awayjs-stagegl/lib/aglsl/Token" {
	import Destination = require("awayjs-stagegl/lib/aglsl/Destination");
	class Token {
	    dest: Destination;
	    opcode: number;
	    a: Destination;
	    b: Destination;
	    constructor();
	}
	export = Token;
	
}

declare module "awayjs-stagegl/lib/aglsl/assembler/AGALMiniAssembler" {
	import Part = require("awayjs-stagegl/lib/aglsl/assembler/Part");
	class AGALMiniAssembler {
	    r: Object;
	    cur: Part;
	    constructor();
	    assemble(source: string, ext_part?: any, ext_version?: any): Object;
	    private processLine(line, linenr);
	    emitHeader(pr: Part): void;
	    emitOpcode(pr: Part, opcode: any): void;
	    emitZeroDword(pr: Part): void;
	    emitZeroQword(pr: any): void;
	    emitDest(pr: any, token: any, opdest: any): boolean;
	    stringToMask(s: string): number;
	    stringToSwizzle(s: any): number;
	    emitSampler(pr: Part, token: any, opsrc: any, opts: any): boolean;
	    emitSource(pr: any, token: any, opsrc: any): boolean;
	    addHeader(partname: any, version: any): void;
	}
	export = AGALMiniAssembler;
	
}

declare module "awayjs-stagegl/lib/aglsl/assembler/FS" {
	class FS {
	    format: string;
	    size: number;
	}
	export = FS;
	
}

declare module "awayjs-stagegl/lib/aglsl/assembler/Flags" {
	class Flags {
	    simple: boolean;
	    horizontal: boolean;
	    fragonly: boolean;
	    matrix: boolean;
	}
	export = Flags;
	
}

declare module "awayjs-stagegl/lib/aglsl/assembler/Opcode" {
	import Flags = require("awayjs-stagegl/lib/aglsl/assembler/Flags");
	import FS = require("awayjs-stagegl/lib/aglsl/assembler/FS");
	/**
	 *
	 */
	class Opcode {
	    dest: string;
	    a: FS;
	    b: FS;
	    opcode: number;
	    flags: Flags;
	    constructor(dest: string, aformat: string, asize: number, bformat: string, bsize: number, opcode: number, simple: boolean, horizontal: boolean, fragonly: boolean, matrix: boolean);
	}
	export = Opcode;
	
}

declare module "awayjs-stagegl/lib/aglsl/assembler/OpcodeMap" {
	class OpcodeMap {
	    private static _map;
	    static map: Object[];
	    constructor();
	}
	export = OpcodeMap;
	
}

declare module "awayjs-stagegl/lib/aglsl/assembler/Part" {
	import ByteArray = require("awayjs-core/lib/utils/ByteArray");
	class Part {
	    name: string;
	    version: number;
	    data: ByteArray;
	    constructor(name?: string, version?: number);
	}
	export = Part;
	
}

declare module "awayjs-stagegl/lib/aglsl/assembler/RegMap" {
	class RegMap {
	    private static _map;
	    static map: any[];
	    constructor();
	}
	export = RegMap;
	
}

declare module "awayjs-stagegl/lib/aglsl/assembler/Sampler" {
	class Sampler {
	    shift: number;
	    mask: number;
	    value: number;
	    constructor(shift: number, mask: number, value: number);
	}
	export = Sampler;
	
}

declare module "awayjs-stagegl/lib/aglsl/assembler/SamplerMap" {
	class SamplerMap {
	    private static _map;
	    static map: Object[];
	    constructor();
	}
	export = SamplerMap;
	
}

declare module "awayjs-stagegl/lib/attributes/GL_AttributesBuffer" {
	import AttributesBuffer = require("awayjs-core/lib/attributes/AttributesBuffer");
	import AssetEvent = require("awayjs-core/lib/events/AssetEvent");
	import AbstractionBase = require("awayjs-core/lib/library/AbstractionBase");
	import Stage = require("awayjs-stagegl/lib/base/Stage");
	import IIndexBuffer = require("awayjs-stagegl/lib/base/IIndexBuffer");
	import IVertexBuffer = require("awayjs-stagegl/lib/base/IVertexBuffer");
	/**
	 *
	 * @class away.pool.GL_AttributesBuffer
	 */
	class GL_AttributesBuffer extends AbstractionBase {
	    _indexBuffer: IIndexBuffer;
	    _vertexBuffer: IVertexBuffer;
	    _stage: Stage;
	    _attributesBuffer: AttributesBuffer;
	    _mipmap: boolean;
	    _invalid: boolean;
	    constructor(attributesBuffer: AttributesBuffer, stage: Stage);
	    /**
	     *
	     */
	    onClear(event: AssetEvent): void;
	    activate(index: number, size: number, dimensions: number, offset: number): void;
	    draw(mode: string, firstIndex: number, numIndices: number): void;
	    _getIndexBuffer(): IIndexBuffer;
	    _getVertexBuffer(): IVertexBuffer;
	}
	export = GL_AttributesBuffer;
	
}

declare module "awayjs-stagegl/lib/base/ContextGLBlendFactor" {
	class ContextGLBlendFactor {
	    static DESTINATION_ALPHA: string;
	    static DESTINATION_COLOR: string;
	    static ONE: string;
	    static ONE_MINUS_DESTINATION_ALPHA: string;
	    static ONE_MINUS_DESTINATION_COLOR: string;
	    static ONE_MINUS_SOURCE_ALPHA: string;
	    static ONE_MINUS_SOURCE_COLOR: string;
	    static SOURCE_ALPHA: string;
	    static SOURCE_COLOR: string;
	    static ZERO: string;
	}
	export = ContextGLBlendFactor;
	
}

declare module "awayjs-stagegl/lib/base/ContextGLClearMask" {
	class ContextGLClearMask {
	    static COLOR: number;
	    static DEPTH: number;
	    static STENCIL: number;
	    static ALL: number;
	}
	export = ContextGLClearMask;
	
}

declare module "awayjs-stagegl/lib/base/ContextGLCompareMode" {
	class ContextGLCompareMode {
	    static ALWAYS: string;
	    static EQUAL: string;
	    static GREATER: string;
	    static GREATER_EQUAL: string;
	    static LESS: string;
	    static LESS_EQUAL: string;
	    static NEVER: string;
	    static NOT_EQUAL: string;
	}
	export = ContextGLCompareMode;
	
}

declare module "awayjs-stagegl/lib/base/ContextGLDrawMode" {
	class ContextGLDrawMode {
	    static TRIANGLES: string;
	    static LINES: string;
	}
	export = ContextGLDrawMode;
	
}

declare module "awayjs-stagegl/lib/base/ContextGLMipFilter" {
	class ContextGLMipFilter {
	    static MIPLINEAR: string;
	    static MIPNEAREST: string;
	    static MIPNONE: string;
	}
	export = ContextGLMipFilter;
	
}

declare module "awayjs-stagegl/lib/base/ContextGLProfile" {
	class ContextGLProfile {
	    static BASELINE: string;
	    static BASELINE_CONSTRAINED: string;
	    static BASELINE_EXTENDED: string;
	}
	export = ContextGLProfile;
	
}

declare module "awayjs-stagegl/lib/base/ContextGLProgramType" {
	class ContextGLProgramType {
	    static FRAGMENT: number;
	    static SAMPLER: number;
	    static VERTEX: number;
	}
	export = ContextGLProgramType;
	
}

declare module "awayjs-stagegl/lib/base/ContextGLStencilAction" {
	class ContextGLStencilAction {
	    static DECREMENT_SATURATE: string;
	    static DECREMENT_WRAP: string;
	    static INCREMENT_SATURATE: string;
	    static INCREMENT_WRAP: string;
	    static INVERT: string;
	    static KEEP: string;
	    static SET: string;
	    static ZERO: string;
	}
	export = ContextGLStencilAction;
	
}

declare module "awayjs-stagegl/lib/base/ContextGLTextureFilter" {
	class ContextGLTextureFilter {
	    static LINEAR: string;
	    static NEAREST: string;
	}
	export = ContextGLTextureFilter;
	
}

declare module "awayjs-stagegl/lib/base/ContextGLTextureFormat" {
	class ContextGLTextureFormat {
	    static BGRA: string;
	    static BGRA_PACKED: string;
	    static BGR_PACKED: string;
	    static COMPRESSED: string;
	    static COMPRESSED_ALPHA: string;
	}
	export = ContextGLTextureFormat;
	
}

declare module "awayjs-stagegl/lib/base/ContextGLTriangleFace" {
	class ContextGLTriangleFace {
	    static BACK: string;
	    static FRONT: string;
	    static FRONT_AND_BACK: string;
	    static NONE: string;
	}
	export = ContextGLTriangleFace;
	
}

declare module "awayjs-stagegl/lib/base/ContextGLVertexBufferFormat" {
	class ContextGLVertexBufferFormat {
	    static BYTES_4: number;
	    static FLOAT_1: number;
	    static FLOAT_2: number;
	    static FLOAT_3: number;
	    static FLOAT_4: number;
	}
	export = ContextGLVertexBufferFormat;
	
}

declare module "awayjs-stagegl/lib/base/ContextGLWrapMode" {
	class ContextGLWrapMode {
	    static CLAMP: string;
	    static REPEAT: string;
	}
	export = ContextGLWrapMode;
	
}

declare module "awayjs-stagegl/lib/base/ContextMode" {
	class ContextMode {
	    static AUTO: string;
	    static WEBGL: string;
	    static FLASH: string;
	    static NATIVE: string;
	    static SOFTWARE: string;
	}
	export = ContextMode;
	
}

declare module "awayjs-stagegl/lib/base/ContextSoftware" {
	import BitmapImage2D = require("awayjs-core/lib/image/BitmapImage2D");
	import Matrix3D = require("awayjs-core/lib/geom/Matrix3D");
	import Vector3D = require("awayjs-core/lib/geom/Vector3D");
	import Rectangle = require("awayjs-core/lib/geom/Rectangle");
	import IContextGL = require("awayjs-stagegl/lib/base/IContextGL");
	import IIndexBuffer = require("awayjs-stagegl/lib/base/IIndexBuffer");
	import ICubeTexture = require("awayjs-stagegl/lib/base/ICubeTexture");
	import ITextureBase = require("awayjs-stagegl/lib/base/ITextureBase");
	import IndexBufferSoftware = require("awayjs-stagegl/lib/base/IndexBufferSoftware");
	import VertexBufferSoftware = require("awayjs-stagegl/lib/base/VertexBufferSoftware");
	import TextureSoftware = require("awayjs-stagegl/lib/base/TextureSoftware");
	import ProgramSoftware = require("awayjs-stagegl/lib/base/ProgramSoftware");
	import ProgramVOSoftware = require("awayjs-stagegl/lib/base/ProgramVOSoftware");
	import SoftwareSamplerState = require("awayjs-stagegl/lib/base/SoftwareSamplerState");
	class ContextSoftware implements IContextGL {
	    private _canvas;
	    static MAX_SAMPLERS: number;
	    private _backBufferRect;
	    private _backBufferWidth;
	    private _backBufferHeight;
	    private _backBufferColor;
	    private _frontBuffer;
	    private _zbuffer;
	    private _cullingMode;
	    private _blendSource;
	    private _blendDestination;
	    private _colorMaskR;
	    private _colorMaskG;
	    private _colorMaskB;
	    private _colorMaskA;
	    private _writeDepth;
	    private _depthCompareMode;
	    private _program;
	    private _screenMatrix;
	    private _frontBufferMatrix;
	    private _bboxMin;
	    private _bboxMax;
	    private _clamp;
	    _samplerStates: SoftwareSamplerState[];
	    _textures: Array<TextureSoftware>;
	    _vertexBuffers: Array<VertexBufferSoftware>;
	    _vertexBufferOffsets: Array<number>;
	    _vertexBufferFormats: Array<number>;
	    _fragmentConstants: Array<Vector3D>;
	    _vertexConstants: Array<Vector3D>;
	    private _antialias;
	    constructor(canvas: HTMLCanvasElement);
	    frontBuffer: BitmapImage2D;
	    container: HTMLElement;
	    clear(red?: number, green?: number, blue?: number, alpha?: number, depth?: number, stencil?: number, mask?: number): void;
	    configureBackBuffer(width: number, height: number, antiAlias: number, enableDepthAndStencil: boolean): void;
	    createCubeTexture(size: number, format: string, optimizeForRenderToTexture: boolean, streamingLevels: number): ICubeTexture;
	    createIndexBuffer(numIndices: number): IIndexBuffer;
	    createProgram(): ProgramSoftware;
	    createTexture(width: number, height: number, format: string, optimizeForRenderToTexture: boolean, streamingLevels: number): TextureSoftware;
	    createVertexBuffer(numVertices: number, dataPerVertex: number): VertexBufferSoftware;
	    dispose(): void;
	    setBlendFactors(sourceFactor: string, destinationFactor: string): void;
	    setColorMask(red: boolean, green: boolean, blue: boolean, alpha: boolean): void;
	    setStencilActions(triangleFace: string, compareMode: string, actionOnBothPass: string, actionOnDepthFail: string, actionOnDepthPassStencilFail: string, coordinateSystem: string): void;
	    setStencilReferenceValue(referenceValue: number, readMask: number, writeMask: number): void;
	    setCulling(triangleFaceToCull: string, coordinateSystem: string): void;
	    setDepthTest(depthMask: boolean, passCompareMode: string): void;
	    setProgram(program: ProgramSoftware): void;
	    setProgramConstantsFromMatrix(programType: number, firstRegister: number, matrix: Matrix3D, transposedMatrix: boolean): void;
	    setProgramConstantsFromArray(programType: number, firstRegister: number, data: Float32Array, numRegisters: number): void;
	    setTextureAt(sampler: number, texture: TextureSoftware): void;
	    setVertexBufferAt(index: number, buffer: VertexBufferSoftware, bufferOffset: number, format: number): void;
	    present(): void;
	    drawToBitmapImage2D(destination: BitmapImage2D): void;
	    drawIndices(mode: string, indexBuffer: IndexBufferSoftware, firstIndex: number, numIndices: number): void;
	    drawVertices(mode: string, firstVertex: number, numVertices: number): void;
	    setScissorRectangle(rectangle: Rectangle): void;
	    setSamplerStateAt(sampler: number, wrap: string, filter: string, mipfilter: string): void;
	    setRenderToTexture(target: ITextureBase, enableDepthAndStencil: boolean, antiAlias: number, surfaceSelector: number): void;
	    setRenderToBackBuffer(): void;
	    putPixel(x: number, y: number, color: number): void;
	    private applyBlendMode(argb, blend, dest, source);
	    clamp(value: number, min?: number, max?: number): number;
	    interpolate(min: number, max: number, gradient: number): number;
	    triangle(vo0: ProgramVOSoftware, vo1: ProgramVOSoftware, vo2: ProgramVOSoftware): void;
	    calcPixel(x: number, y: number, p0: Vector3D, p1: Vector3D, p2: Vector3D, project: Vector3D, depth: Vector3D, vo0: ProgramVOSoftware, vo1: ProgramVOSoftware, vo2: ProgramVOSoftware): Vector3D;
	    barycentric(a: Vector3D, b: Vector3D, c: Vector3D, x: number, y: number): Vector3D;
	}
	export = ContextSoftware;
	
}

declare module "awayjs-stagegl/lib/base/ContextStage3D" {
	import BitmapImage2D = require("awayjs-core/lib/image/BitmapImage2D");
	import Matrix3D = require("awayjs-core/lib/geom/Matrix3D");
	import Rectangle = require("awayjs-core/lib/geom/Rectangle");
	import Sampler = require("awayjs-stagegl/lib/aglsl/Sampler");
	import CubeTextureFlash = require("awayjs-stagegl/lib/base/CubeTextureFlash");
	import IContextGL = require("awayjs-stagegl/lib/base/IContextGL");
	import IndexBufferFlash = require("awayjs-stagegl/lib/base/IndexBufferFlash");
	import ProgramFlash = require("awayjs-stagegl/lib/base/ProgramFlash");
	import TextureFlash = require("awayjs-stagegl/lib/base/TextureFlash");
	import ResourceBaseFlash = require("awayjs-stagegl/lib/base/ResourceBaseFlash");
	import VertexBufferFlash = require("awayjs-stagegl/lib/base/VertexBufferFlash");
	class ContextStage3D implements IContextGL {
	    static contexts: Object;
	    static maxvertexconstants: number;
	    static maxfragconstants: number;
	    static maxtemp: number;
	    static maxstreams: number;
	    static maxtextures: number;
	    static defaultsampler: Sampler;
	    _iDriverInfo: any;
	    private _container;
	    private _width;
	    private _height;
	    private _cmdStream;
	    private _errorCheckingEnabled;
	    private _resources;
	    private _oldCanvas;
	    private _oldParent;
	    static debug: boolean;
	    static logStream: boolean;
	    _iCallback: (context: IContextGL) => void;
	    container: HTMLElement;
	    driverInfo: any;
	    errorCheckingEnabled: boolean;
	    constructor(container: HTMLCanvasElement, callback: (context: IContextGL) => void, include?: Sampler);
	    _iAddResource(resource: ResourceBaseFlash): void;
	    _iRemoveResource(resource: ResourceBaseFlash): void;
	    createTexture(width: number, height: number, format: string, optimizeForRenderToTexture: boolean, streamingLevels?: number): TextureFlash;
	    createCubeTexture(size: number, format: string, optimizeForRenderToTexture: boolean, streamingLevels?: number): CubeTextureFlash;
	    setTextureAt(sampler: number, texture: ResourceBaseFlash): void;
	    setSamplerStateAt(sampler: number, wrap: string, filter: string, mipfilter: string): void;
	    setStencilActions(triangleFace?: string, compareMode?: string, actionOnBothPass?: string, actionOnDepthFail?: string, actionOnDepthPassStencilFail?: string, coordinateSystem?: string): void;
	    setStencilReferenceValue(referenceValue: number, readMask?: number, writeMask?: number): void;
	    setCulling(triangleFaceToCull: string, coordinateSystem?: string): void;
	    drawIndices(mode: string, indexBuffer: IndexBufferFlash, firstIndex?: number, numIndices?: number): void;
	    drawVertices(mode: string, firstVertex?: number, numVertices?: number): void;
	    setProgramConstantsFromMatrix(programType: number, firstRegister: number, matrix: Matrix3D, transposedMatrix?: boolean): void;
	    setProgramConstantsFromArray(programType: number, firstRegister: number, data: Float32Array, numRegisters?: number): void;
	    setProgram(program: ProgramFlash): void;
	    present(): void;
	    clear(red?: number, green?: number, blue?: number, alpha?: number, depth?: number, stencil?: number, mask?: number): void;
	    createProgram(): ProgramFlash;
	    createVertexBuffer(numVertices: number, data32PerVertex: number): VertexBufferFlash;
	    createIndexBuffer(numIndices: number): IndexBufferFlash;
	    configureBackBuffer(width: number, height: number, antiAlias: number, enableDepthAndStencil?: boolean): void;
	    drawToBitmapImage2D(destination: BitmapImage2D): void;
	    setVertexBufferAt(index: number, buffer: VertexBufferFlash, bufferOffset?: number, format?: number): void;
	    setColorMask(red: boolean, green: boolean, blue: boolean, alpha: boolean): void;
	    setBlendFactors(sourceFactor: string, destinationFactor: string): void;
	    setRenderToTexture(target: ResourceBaseFlash, enableDepthAndStencil?: boolean, antiAlias?: number, surfaceSelector?: number): void;
	    setRenderToBackBuffer(): void;
	    setScissorRectangle(rectangle: Rectangle): void;
	    setDepthTest(depthMask: boolean, passCompareMode: string): void;
	    dispose(): void;
	    addStream(stream: string): void;
	    execute(): number;
	}
	export = ContextStage3D;
	
}

declare module "awayjs-stagegl/lib/base/ContextWebGL" {
	import BitmapImage2D = require("awayjs-core/lib/image/BitmapImage2D");
	import Matrix3D = require("awayjs-core/lib/geom/Matrix3D");
	import Rectangle = require("awayjs-core/lib/geom/Rectangle");
	import CubeTextureWebGL = require("awayjs-stagegl/lib/base/CubeTextureWebGL");
	import IContextGL = require("awayjs-stagegl/lib/base/IContextGL");
	import IndexBufferWebGL = require("awayjs-stagegl/lib/base/IndexBufferWebGL");
	import ProgramWebGL = require("awayjs-stagegl/lib/base/ProgramWebGL");
	import TextureBaseWebGL = require("awayjs-stagegl/lib/base/TextureBaseWebGL");
	import TextureWebGL = require("awayjs-stagegl/lib/base/TextureWebGL");
	import VertexBufferWebGL = require("awayjs-stagegl/lib/base/VertexBufferWebGL");
	class ContextWebGL implements IContextGL {
	    private _blendFactorDictionary;
	    private _drawModeDictionary;
	    private _compareModeDictionary;
	    private _stencilActionDictionary;
	    private _textureIndexDictionary;
	    private _textureTypeDictionary;
	    private _wrapDictionary;
	    private _filterDictionary;
	    private _mipmapFilterDictionary;
	    private _vertexBufferPropertiesDictionary;
	    private _container;
	    private _width;
	    private _height;
	    private _drawing;
	    private _blendEnabled;
	    private _blendSourceFactor;
	    private _blendDestinationFactor;
	    private _standardDerivatives;
	    private _samplerStates;
	    static MAX_SAMPLERS: number;
	    _gl: WebGLRenderingContext;
	    _currentProgram: ProgramWebGL;
	    private _currentArrayBuffer;
	    private _activeTexture;
	    private _stencilCompareMode;
	    private _stencilCompareModeBack;
	    private _stencilCompareModeFront;
	    private _stencilReferenceValue;
	    private _stencilReadMask;
	    private _separateStencil;
	    container: HTMLElement;
	    standardDerivatives: boolean;
	    constructor(canvas: HTMLCanvasElement);
	    gl(): WebGLRenderingContext;
	    clear(red?: number, green?: number, blue?: number, alpha?: number, depth?: number, stencil?: number, mask?: number): void;
	    configureBackBuffer(width: number, height: number, antiAlias: number, enableDepthAndStencil?: boolean): void;
	    createCubeTexture(size: number, format: string, optimizeForRenderToTexture: boolean, streamingLevels?: number): CubeTextureWebGL;
	    createIndexBuffer(numIndices: number): IndexBufferWebGL;
	    createProgram(): ProgramWebGL;
	    createTexture(width: number, height: number, format: string, optimizeForRenderToTexture: boolean, streamingLevels?: number): TextureWebGL;
	    createVertexBuffer(numVertices: number, dataPerVertex: number): VertexBufferWebGL;
	    dispose(): void;
	    drawToBitmapImage2D(destination: BitmapImage2D): void;
	    drawIndices(mode: string, indexBuffer: IndexBufferWebGL, firstIndex?: number, numIndices?: number): void;
	    drawVertices(mode: string, firstVertex?: number, numVertices?: number): void;
	    present(): void;
	    setBlendFactors(sourceFactor: string, destinationFactor: string): void;
	    setColorMask(red: boolean, green: boolean, blue: boolean, alpha: boolean): void;
	    setCulling(triangleFaceToCull: string, coordinateSystem?: string): void;
	    setDepthTest(depthMask: boolean, passCompareMode: string): void;
	    setStencilActions(triangleFace?: string, compareMode?: string, actionOnBothPass?: string, actionOnDepthFail?: string, actionOnDepthPassStencilFail?: string, coordinateSystem?: string): void;
	    setStencilReferenceValue(referenceValue: number, readMask: number, writeMask: number): void;
	    setProgram(program: ProgramWebGL): void;
	    private static _float4;
	    setProgramConstantsFromMatrix(programType: number, firstRegister: number, matrix: Matrix3D, transposedMatrix?: boolean): void;
	    static modulo: number;
	    setProgramConstantsFromArray(programType: number, firstRegister: number, data: Float32Array, numRegisters?: number): void;
	    setScissorRectangle(rectangle: Rectangle): void;
	    setTextureAt(sampler: number, texture: TextureBaseWebGL): void;
	    setSamplerStateAt(sampler: number, wrap: string, filter: string, mipfilter: string): void;
	    setVertexBufferAt(index: number, buffer: VertexBufferWebGL, bufferOffset?: number, format?: number): void;
	    setRenderToTexture(target: TextureBaseWebGL, enableDepthAndStencil?: boolean, antiAlias?: number, surfaceSelector?: number): void;
	    setRenderToBackBuffer(): void;
	    private updateBlendStatus();
	    private translateTriangleFace(triangleFace, coordinateSystem);
	}
	export = ContextWebGL;
	
}

declare module "awayjs-stagegl/lib/base/CubeTextureFlash" {
	import ByteArray = require("awayjs-core/lib/utils/ByteArray");
	import ContextStage3D = require("awayjs-stagegl/lib/base/ContextStage3D");
	import ICubeTexture = require("awayjs-stagegl/lib/base/ICubeTexture");
	import ResourceBaseFlash = require("awayjs-stagegl/lib/base/ResourceBaseFlash");
	class CubeTextureFlash extends ResourceBaseFlash implements ICubeTexture {
	    private _context;
	    private _size;
	    size: number;
	    constructor(context: ContextStage3D, size: number, format: string, forRTT: boolean, streaming?: boolean);
	    dispose(): void;
	    uploadFromData(image: HTMLImageElement, side: number, miplevel?: number): any;
	    uploadFromData(imageData: ImageData, side: number, miplevel?: number): any;
	    uploadCompressedTextureFromByteArray(data: ByteArray, byteArrayOffset: number, async?: boolean): void;
	}
	export = CubeTextureFlash;
	
}

declare module "awayjs-stagegl/lib/base/CubeTextureWebGL" {
	import ByteArray = require("awayjs-core/lib/utils/ByteArray");
	import ICubeTexture = require("awayjs-stagegl/lib/base/ICubeTexture");
	import TextureBaseWebGL = require("awayjs-stagegl/lib/base/TextureBaseWebGL");
	class CubeTextureWebGL extends TextureBaseWebGL implements ICubeTexture {
	    private _textureSelectorDictionary;
	    textureType: string;
	    private _texture;
	    private _size;
	    constructor(gl: WebGLRenderingContext, size: number);
	    dispose(): void;
	    uploadFromData(image: HTMLImageElement, side: number, miplevel?: number): any;
	    uploadFromData(imageData: ImageData, side: number, miplevel?: number): any;
	    uploadCompressedTextureFromByteArray(data: ByteArray, byteArrayOffset: number, async?: boolean): void;
	    size: number;
	    glTexture: WebGLTexture;
	}
	export = CubeTextureWebGL;
	
}

declare module "awayjs-stagegl/lib/base/IContextGL" {
	import Matrix3D = require("awayjs-core/lib/geom/Matrix3D");
	import Rectangle = require("awayjs-core/lib/geom/Rectangle");
	import BitmapImage2D = require("awayjs-core/lib/image/BitmapImage2D");
	import ICubeTexture = require("awayjs-stagegl/lib/base/ICubeTexture");
	import IIndexBuffer = require("awayjs-stagegl/lib/base/IIndexBuffer");
	import IProgram = require("awayjs-stagegl/lib/base/IProgram");
	import ITexture = require("awayjs-stagegl/lib/base/ITexture");
	import ITextureBase = require("awayjs-stagegl/lib/base/ITextureBase");
	import IVertexBuffer = require("awayjs-stagegl/lib/base/IVertexBuffer");
	interface IContextGL {
	    container: HTMLElement;
	    clear(red?: number, green?: number, blue?: number, alpha?: number, depth?: number, stencil?: number, mask?: number): any;
	    configureBackBuffer(width: number, height: number, antiAlias: number, enableDepthAndStencil?: boolean): any;
	    createCubeTexture(size: number, format: string, optimizeForRenderToTexture: boolean, streamingLevels?: number): ICubeTexture;
	    createIndexBuffer(numIndices: number): IIndexBuffer;
	    createProgram(): IProgram;
	    createTexture(width: number, height: number, format: string, optimizeForRenderToTexture: boolean, streamingLevels?: number): ITexture;
	    createVertexBuffer(numVertices: number, dataPerVertex: number): IVertexBuffer;
	    dispose(): any;
	    drawToBitmapImage2D(destination: BitmapImage2D): any;
	    drawIndices(mode: string, indexBuffer: IIndexBuffer, firstIndex?: number, numIndices?: number): any;
	    drawVertices(mode: string, firstVertex?: number, numVertices?: number): any;
	    present(): any;
	    setBlendFactors(sourceFactor: string, destinationFactor: string): any;
	    setColorMask(red: boolean, green: boolean, blue: boolean, alpha: boolean): any;
	    setStencilActions(triangleFace?: string, compareMode?: string, actionOnBothPass?: string, actionOnDepthFail?: string, actionOnDepthPassStencilFail?: string, coordinateSystem?: string): any;
	    setStencilReferenceValue(referenceValue: number, readMask?: number, writeMask?: number): any;
	    setCulling(triangleFaceToCull: string, coordinateSystem?: string): any;
	    setDepthTest(depthMask: boolean, passCompareMode: string): any;
	    setProgram(program: IProgram): any;
	    setProgramConstantsFromMatrix(programType: number, firstRegister: number, matrix: Matrix3D, transposedMatrix?: boolean): any;
	    setProgramConstantsFromArray(programType: number, firstRegister: number, data: Float32Array, numRegisters?: number): any;
	    setSamplerStateAt(sampler: number, wrap: string, filter: string, mipfilter: string): any;
	    setScissorRectangle(rectangle: Rectangle): any;
	    setTextureAt(sampler: number, texture: ITextureBase): any;
	    setVertexBufferAt(index: number, buffer: IVertexBuffer, bufferOffset?: number, format?: number): any;
	    setRenderToTexture(target: ITextureBase, enableDepthAndStencil?: boolean, antiAlias?: number, surfaceSelector?: number): any;
	    setRenderToBackBuffer(): any;
	}
	export = IContextGL;
	
}

declare module "awayjs-stagegl/lib/base/ICubeTexture" {
	import ByteArray = require("awayjs-core/lib/utils/ByteArray");
	import ITextureBase = require("awayjs-stagegl/lib/base/ITextureBase");
	interface ICubeTexture extends ITextureBase {
	    size: number;
	    uploadFromData(image: HTMLImageElement, side: number, miplevel?: number): any;
	    uploadFromData(imageData: ImageData, side: number, miplevel?: number): any;
	    uploadCompressedTextureFromByteArray(data: ByteArray, byteArrayOffset: number, async: boolean): any;
	}
	export = ICubeTexture;
	
}

declare module "awayjs-stagegl/lib/base/IIndexBuffer" {
	interface IIndexBuffer {
	    numIndices: number;
	    uploadFromArray(data: number[], startOffset: number, count: number): any;
	    uploadFromByteArray(data: ArrayBuffer, startOffset: number, count: number): any;
	    dispose(): any;
	}
	export = IIndexBuffer;
	
}

declare module "awayjs-stagegl/lib/base/IProgram" {
	import ByteArray = require("awayjs-core/lib/utils/ByteArray");
	interface IProgram {
	    upload(vertexProgram: ByteArray, fragmentProgram: ByteArray): any;
	    dispose(): any;
	}
	export = IProgram;
	
}

declare module "awayjs-stagegl/lib/base/ITexture" {
	import ITextureBase = require("awayjs-stagegl/lib/base/ITextureBase");
	interface ITexture extends ITextureBase {
	    width: number;
	    height: number;
	    uploadFromData(image: HTMLImageElement, miplevel?: number): any;
	    uploadFromData(imageData: ImageData, miplevel?: number): any;
	}
	export = ITexture;
	
}

declare module "awayjs-stagegl/lib/base/ITextureBase" {
	interface ITextureBase {
	    dispose(): any;
	}
	export = ITextureBase;
	
}

declare module "awayjs-stagegl/lib/base/IVertexBuffer" {
	interface IVertexBuffer {
	    numVertices: number;
	    dataPerVertex: number;
	    uploadFromArray(data: number[], startVertex: number, numVertices: number): any;
	    uploadFromByteArray(data: ArrayBuffer, startVertex: number, numVertices: number): any;
	    dispose(): any;
	}
	export = IVertexBuffer;
	
}

declare module "awayjs-stagegl/lib/base/IndexBufferFlash" {
	import ContextStage3D = require("awayjs-stagegl/lib/base/ContextStage3D");
	import IIndexBuffer = require("awayjs-stagegl/lib/base/IIndexBuffer");
	import ResourceBaseFlash = require("awayjs-stagegl/lib/base/ResourceBaseFlash");
	class IndexBufferFlash extends ResourceBaseFlash implements IIndexBuffer {
	    private _context;
	    private _numIndices;
	    constructor(context: ContextStage3D, numIndices: number);
	    uploadFromArray(data: number[], startOffset: number, count: number): void;
	    uploadFromByteArray(data: ArrayBuffer, startOffset: number, count: number): void;
	    dispose(): void;
	    numIndices: number;
	}
	export = IndexBufferFlash;
	
}

declare module "awayjs-stagegl/lib/base/IndexBufferSoftware" {
	import IIndexBuffer = require("awayjs-stagegl/lib/base/IIndexBuffer");
	class IndexBufferSoftware implements IIndexBuffer {
	    private _numIndices;
	    private _data;
	    private _startOffset;
	    constructor(numIndices: number);
	    uploadFromArray(data: number[], startOffset: number, count: number): void;
	    uploadFromByteArray(data: ArrayBuffer, startOffset: number, count: number): void;
	    dispose(): void;
	    numIndices: number;
	    data: Uint16Array;
	    startOffset: number;
	}
	export = IndexBufferSoftware;
	
}

declare module "awayjs-stagegl/lib/base/IndexBufferWebGL" {
	import IIndexBuffer = require("awayjs-stagegl/lib/base/IIndexBuffer");
	class IndexBufferWebGL implements IIndexBuffer {
	    private _gl;
	    private _numIndices;
	    private _buffer;
	    constructor(gl: WebGLRenderingContext, numIndices: number);
	    uploadFromArray(data: number[], startOffset: number, count: number): void;
	    uploadFromByteArray(data: ArrayBuffer, startOffset: number, count: number): void;
	    dispose(): void;
	    numIndices: number;
	    glBuffer: WebGLBuffer;
	}
	export = IndexBufferWebGL;
	
}

declare module "awayjs-stagegl/lib/base/OpCodes" {
	class OpCodes {
	    static trueValue: number;
	    static falseValue: number;
	    static intMask: number;
	    static drawTriangles: number;
	    static setProgramConstant: number;
	    static setProgram: number;
	    static present: number;
	    static clear: number;
	    static initProgram: number;
	    static initVertexBuffer: number;
	    static initIndexBuffer: number;
	    static configureBackBuffer: number;
	    static uploadArrayIndexBuffer: number;
	    static uploadArrayVertexBuffer: number;
	    static uploadAGALBytesProgram: number;
	    static setVertexBufferAt: number;
	    static uploadBytesIndexBuffer: number;
	    static uploadBytesVertexBuffer: number;
	    static setColorMask: number;
	    static setDepthTest: number;
	    static disposeProgram: number;
	    static disposeContext: number;
	    static disposeVertexBuffer: number;
	    static disposeIndexBuffer: number;
	    static initTexture: number;
	    static setTextureAt: number;
	    static uploadBytesTexture: number;
	    static disposeTexture: number;
	    static setCulling: number;
	    static setScissorRect: number;
	    static clearScissorRect: number;
	    static setBlendFactors: number;
	    static setRenderToTexture: number;
	    static clearTextureAt: number;
	    static clearVertexBufferAt: number;
	    static setStencilActions: number;
	    static setStencilReferenceValue: number;
	    static initCubeTexture: number;
	    static disposeCubeTexture: number;
	    static uploadBytesCubeTexture: number;
	    static clearRenderToTexture: number;
	    static enableErrorChecking: number;
	}
	export = OpCodes;
	
}

declare module "awayjs-stagegl/lib/base/ProgramFlash" {
	import ByteArray = require("awayjs-core/lib/utils/ByteArray");
	import ContextStage3D = require("awayjs-stagegl/lib/base/ContextStage3D");
	import IProgram = require("awayjs-stagegl/lib/base/IProgram");
	import ResourceBaseFlash = require("awayjs-stagegl/lib/base/ResourceBaseFlash");
	class ProgramFlash extends ResourceBaseFlash implements IProgram {
	    private _context;
	    constructor(context: ContextStage3D);
	    upload(vertexProgram: ByteArray, fragmentProgram: ByteArray): void;
	    dispose(): void;
	}
	export = ProgramFlash;
	
}

declare module "awayjs-stagegl/lib/base/ProgramSoftware" {
	import ByteArray = require("awayjs-core/lib/utils/ByteArray");
	import IProgram = require("awayjs-stagegl/lib/base/IProgram");
	import ProgramVOSoftware = require("awayjs-stagegl/lib/base/ProgramVOSoftware");
	import ContextSoftware = require("awayjs-stagegl/lib/base/ContextSoftware");
	import Description = require("awayjs-stagegl/lib/aglsl/Description");
	import Vector3D = require("awayjs-core/lib/geom/Vector3D");
	import Destination = require("awayjs-stagegl/lib/aglsl/Destination");
	class ProgramSoftware implements IProgram {
	    private static _defaultSamplerState;
	    private static _tokenizer;
	    private static _opCodeFunc;
	    private _vertexDescr;
	    private _fragmentDescr;
	    constructor();
	    upload(vertexProgram: ByteArray, fragmentProgram: ByteArray): void;
	    dispose(): void;
	    vertex(contextSoftware: ContextSoftware, vertexIndex: number): ProgramVOSoftware;
	    fragment(context: ContextSoftware, clip: Vector3D, clipRight: Vector3D, clipBottom: Vector3D, vo0: ProgramVOSoftware, vo1: ProgramVOSoftware, vo2: ProgramVOSoftware, fragDepth: number): ProgramVOSoftware;
	    private static getDestTarget(vo, desc, dest);
	    private static getSourceTargetType(vo, desc, dest, context);
	    private static getSourceTargetByIndex(targetType, targetIndex);
	    private static getSourceTarget(vo, desc, dest, context);
	    static mov(vo: ProgramVOSoftware, desc: Description, dest: Destination, source1: Destination, source2: Destination, context: ContextSoftware): void;
	    static m44(vo: ProgramVOSoftware, desc: Description, dest: Destination, source1: Destination, source2: Destination, context: ContextSoftware): void;
	    private static sample(vo, context, u, v, textureIndex, dux, dvx, duy, dvy);
	    private static sampleNearest(u, v, textureData, textureWidth, textureHeight, repeat);
	    private static sampleBilinear(u, v, textureData, textureWidth, textureHeight, repeat);
	    private static interpolateColor(source, target, a);
	    static tex(vo: ProgramVOSoftware, desc: Description, dest: Destination, source1: Destination, source2: Destination, context: ContextSoftware): void;
	    static add(vo: ProgramVOSoftware, desc: Description, dest: Destination, source1: Destination, source2: Destination, context: ContextSoftware): void;
	    static sub(vo: ProgramVOSoftware, desc: Description, dest: Destination, source1: Destination, source2: Destination, context: ContextSoftware): void;
	    static mul(vo: ProgramVOSoftware, desc: Description, dest: Destination, source1: Destination, source2: Destination, context: ContextSoftware): void;
	    static div(vo: ProgramVOSoftware, desc: Description, dest: Destination, source1: Destination, source2: Destination, context: ContextSoftware): void;
	    static rcp(vo: ProgramVOSoftware, desc: Description, dest: Destination, source1: Destination, source2: Destination, context: ContextSoftware): void;
	    static min(vo: ProgramVOSoftware, desc: Description, dest: Destination, source1: Destination, source2: Destination, context: ContextSoftware): void;
	    static max(vo: ProgramVOSoftware, desc: Description, dest: Destination, source1: Destination, source2: Destination, context: ContextSoftware): void;
	    static frc(vo: ProgramVOSoftware, desc: Description, dest: Destination, source1: Destination, source2: Destination, context: ContextSoftware): void;
	    static sqt(vo: ProgramVOSoftware, desc: Description, dest: Destination, source1: Destination, source2: Destination, context: ContextSoftware): void;
	    static rsq(vo: ProgramVOSoftware, desc: Description, dest: Destination, source1: Destination, source2: Destination, context: ContextSoftware): void;
	    static pow(vo: ProgramVOSoftware, desc: Description, dest: Destination, source1: Destination, source2: Destination, context: ContextSoftware): void;
	    static log(vo: ProgramVOSoftware, desc: Description, dest: Destination, source1: Destination, source2: Destination, context: ContextSoftware): void;
	    static exp(vo: ProgramVOSoftware, desc: Description, dest: Destination, source1: Destination, source2: Destination, context: ContextSoftware): void;
	    static nrm(vo: ProgramVOSoftware, desc: Description, dest: Destination, source1: Destination, source2: Destination, context: ContextSoftware): void;
	    static sin(vo: ProgramVOSoftware, desc: Description, dest: Destination, source1: Destination, source2: Destination, context: ContextSoftware): void;
	    static cos(vo: ProgramVOSoftware, desc: Description, dest: Destination, source1: Destination, source2: Destination, context: ContextSoftware): void;
	    static crs(vo: ProgramVOSoftware, desc: Description, dest: Destination, source1: Destination, source2: Destination, context: ContextSoftware): void;
	    static dp3(vo: ProgramVOSoftware, desc: Description, dest: Destination, source1: Destination, source2: Destination, context: ContextSoftware): void;
	    static dp4(vo: ProgramVOSoftware, desc: Description, dest: Destination, source1: Destination, source2: Destination, context: ContextSoftware): void;
	    static abs(vo: ProgramVOSoftware, desc: Description, dest: Destination, source1: Destination, source2: Destination, context: ContextSoftware): void;
	    static neg(vo: ProgramVOSoftware, desc: Description, dest: Destination, source1: Destination, source2: Destination, context: ContextSoftware): void;
	    static sat(vo: ProgramVOSoftware, desc: Description, dest: Destination, source1: Destination, source2: Destination, context: ContextSoftware): void;
	    static m33(vo: ProgramVOSoftware, desc: Description, dest: Destination, source1: Destination, source2: Destination, context: ContextSoftware): void;
	    static m34(vo: ProgramVOSoftware, desc: Description, dest: Destination, source1: Destination, source2: Destination, context: ContextSoftware): void;
	    static ddx(vo: ProgramVOSoftware, desc: Description, dest: Destination, source1: Destination, source2: Destination, context: ContextSoftware): void;
	    static ddy(vo: ProgramVOSoftware, desc: Description, dest: Destination, source1: Destination, source2: Destination, context: ContextSoftware): void;
	    static sge(vo: ProgramVOSoftware, desc: Description, dest: Destination, source1: Destination, source2: Destination, context: ContextSoftware): void;
	    static slt(vo: ProgramVOSoftware, desc: Description, dest: Destination, source1: Destination, source2: Destination, context: ContextSoftware): void;
	    static seq(vo: ProgramVOSoftware, desc: Description, dest: Destination, source1: Destination, source2: Destination, context: ContextSoftware): void;
	    static sne(vo: ProgramVOSoftware, desc: Description, dest: Destination, source1: Destination, source2: Destination, context: ContextSoftware): void;
	    static sgn(vo: ProgramVOSoftware, desc: Description, dest: Destination, source1: Destination, source2: Destination, context: ContextSoftware): void;
	    static kil(vo: ProgramVOSoftware, desc: Description, dest: Destination, source1: Destination, source2: Destination, context: ContextSoftware): void;
	}
	export = ProgramSoftware;
	
}

declare module "awayjs-stagegl/lib/base/ProgramVOSoftware" {
	import Vector3D = require("awayjs-core/lib/geom/Vector3D");
	class ProgramVOSoftware {
	    outputPosition: Vector3D[];
	    outputColor: Vector3D[];
	    outputDepth: number;
	    varying: Vector3D[];
	    derivativeX: Vector3D[];
	    derivativeY: Vector3D[];
	    temp: Vector3D[];
	    attributes: Vector3D[];
	    discard: boolean;
	}
	export = ProgramVOSoftware;
	
}

declare module "awayjs-stagegl/lib/base/ProgramWebGL" {
	import ByteArray = require("awayjs-core/lib/utils/ByteArray");
	import IProgram = require("awayjs-stagegl/lib/base/IProgram");
	class ProgramWebGL implements IProgram {
	    private static _tokenizer;
	    private static _aglslParser;
	    private static _uniformLocationNameDictionary;
	    private _gl;
	    private _program;
	    private _vertexShader;
	    private _fragmentShader;
	    private _uniforms;
	    private _attribs;
	    constructor(gl: WebGLRenderingContext);
	    upload(vertexProgram: ByteArray, fragmentProgram: ByteArray): void;
	    getUniformLocation(programType: number, index: number): WebGLUniformLocation;
	    getAttribLocation(index: number): number;
	    dispose(): void;
	    focusProgram(): void;
	    glProgram: WebGLProgram;
	}
	export = ProgramWebGL;
	
}

declare module "awayjs-stagegl/lib/base/ResourceBaseFlash" {
	class ResourceBaseFlash {
	    _pId: number;
	    id: number;
	    dispose(): void;
	}
	export = ResourceBaseFlash;
	
}

declare module "awayjs-stagegl/lib/base/SamplerState" {
	class SamplerState {
	    type: number;
	    wrap: number;
	    filter: number;
	    mipfilter: number;
	}
	export = SamplerState;
	
}

declare module "awayjs-stagegl/lib/base/SoftwareSamplerState" {
	/**
	 * The same as SamplerState, but with strings
	 * TODO: replace two similar classes with one
	 */
	class SoftwareSamplerState {
	    type: string;
	    wrap: string;
	    filter: string;
	    mipfilter: string;
	}
	export = SoftwareSamplerState;
	
}

declare module "awayjs-stagegl/lib/base/Stage" {
	import EventDispatcher = require("awayjs-core/lib/events/EventDispatcher");
	import Rectangle = require("awayjs-core/lib/geom/Rectangle");
	import ImageBase = require("awayjs-core/lib/image/ImageBase");
	import AbstractionBase = require("awayjs-core/lib/library/AbstractionBase");
	import IAsset = require("awayjs-core/lib/library/IAsset");
	import IAssetClass = require("awayjs-core/lib/library/IAssetClass");
	import IAbstractionPool = require("awayjs-core/lib/library/IAbstractionPool");
	import IContextGL = require("awayjs-stagegl/lib/base/IContextGL");
	import IVertexBuffer = require("awayjs-stagegl/lib/base/IVertexBuffer");
	import GL_IAssetClass = require("awayjs-stagegl/lib/library/GL_IAssetClass");
	import ProgramData = require("awayjs-stagegl/lib/image/ProgramData");
	import StageManager = require("awayjs-stagegl/lib/managers/StageManager");
	/**
	 * Stage provides a proxy class to handle the creation and attachment of the Context
	 * (and in turn the back buffer) it uses. Stage should never be created directly,
	 * but requested through StageManager.
	 *
	 * @see away.managers.StageManager
	 *
	 */
	class Stage extends EventDispatcher implements IAbstractionPool {
	    private static _abstractionClassPool;
	    private _abstractionPool;
	    private _programData;
	    private _programDataPool;
	    private _context;
	    private _container;
	    private _width;
	    private _height;
	    private _x;
	    private _y;
	    private _stageIndex;
	    private _usesSoftwareRendering;
	    private _profile;
	    private _stageManager;
	    private _antiAlias;
	    private _enableDepthAndStencil;
	    private _contextRequested;
	    private _renderTarget;
	    private _renderSurfaceSelector;
	    private _scissorRect;
	    private _color;
	    private _backBufferDirty;
	    private _viewPort;
	    private _viewportUpdated;
	    private _viewportDirty;
	    private _bufferClear;
	    private _initialised;
	    private _bufferFormatDictionary;
	    constructor(container: HTMLCanvasElement, stageIndex: number, stageManager: StageManager, forceSoftware?: boolean, profile?: string);
	    getProgramData(vertexString: string, fragmentString: string): ProgramData;
	    setRenderTarget(target: ImageBase, enableDepthAndStencil?: boolean, surfaceSelector?: number): void;
	    getAbstraction(asset: IAsset): AbstractionBase;
	    /**
	     *
	     * @param image
	     */
	    clearAbstraction(asset: IAsset): void;
	    /**
	     *
	     * @param imageObjectClass
	     */
	    static registerAbstraction(gl_assetClass: GL_IAssetClass, assetClass: IAssetClass): void;
	    /**
	     * Requests a Context object to attach to the managed gl canvas.
	     */
	    requestContext(forceSoftware?: boolean, profile?: string, mode?: string): void;
	    /**
	     * The width of the gl canvas
	     */
	    width: number;
	    /**
	     * The height of the gl canvas
	     */
	    height: number;
	    /**
	     * The x position of the gl canvas
	     */
	    x: number;
	    /**
	     * The y position of the gl canvas
	     */
	    y: number;
	    visible: boolean;
	    container: HTMLElement;
	    /**
	     * The Context object associated with the given stage object.
	     */
	    context: IContextGL;
	    private notifyViewportUpdated();
	    profile: string;
	    /**
	     * Disposes the Stage object, freeing the Context attached to the Stage.
	     */
	    dispose(): void;
	    /**
	     * Configures the back buffer associated with the Stage object.
	     * @param backBufferWidth The width of the backbuffer.
	     * @param backBufferHeight The height of the backbuffer.
	     * @param antiAlias The amount of anti-aliasing to use.
	     * @param enableDepthAndStencil Indicates whether the back buffer contains a depth and stencil buffer.
	     */
	    configureBackBuffer(backBufferWidth: number, backBufferHeight: number, antiAlias: number, enableDepthAndStencil: boolean): void;
	    enableDepthAndStencil: boolean;
	    renderTarget: ImageBase;
	    renderSurfaceSelector: number;
	    clear(): void;
	    scissorRect: Rectangle;
	    /**
	     * The index of the Stage which is managed by this instance of StageProxy.
	     */
	    stageIndex: number;
	    /**
	     * Indicates whether the Stage managed by this proxy is running in software mode.
	     * Remember to wait for the CONTEXT_CREATED event before checking this property,
	     * as only then will it be guaranteed to be accurate.
	     */
	    usesSoftwareRendering: boolean;
	    /**
	     * The antiAliasing of the Stage.
	     */
	    antiAlias: number;
	    /**
	     * A viewPort rectangle equivalent of the Stage size and position.
	     */
	    viewPort: Rectangle;
	    /**
	     * The background color of the Stage.
	     */
	    color: number;
	    /**
	     * The freshly cleared state of the backbuffer before any rendering
	     */
	    bufferClear: boolean;
	    registerProgram(programData: ProgramData): void;
	    unRegisterProgram(programData: ProgramData): void;
	    /**
	     * Frees the Context associated with this StageProxy.
	     */
	    private freeContext();
	    private onContextLost(event);
	    private onContextRestored(event);
	    recoverFromDisposal(): boolean;
	    private _callback(context);
	    setVertexBuffer(index: number, buffer: IVertexBuffer, size: number, dimensions: number, offset: number): void;
	    setSamplerState(index: number, repeat: boolean, smooth: boolean, mipmap: boolean): void;
	}
	export = Stage;
	
}

declare module "awayjs-stagegl/lib/base/TextureBaseWebGL" {
	class TextureBaseWebGL {
	    textureType: string;
	    _gl: WebGLRenderingContext;
	    constructor(gl: WebGLRenderingContext);
	    dispose(): void;
	    glTexture: WebGLTexture;
	}
	export = TextureBaseWebGL;
	
}

declare module "awayjs-stagegl/lib/base/TextureFlash" {
	import ContextStage3D = require("awayjs-stagegl/lib/base/ContextStage3D");
	import ITexture = require("awayjs-stagegl/lib/base/ITexture");
	import ResourceBaseFlash = require("awayjs-stagegl/lib/base/ResourceBaseFlash");
	class TextureFlash extends ResourceBaseFlash implements ITexture {
	    private _context;
	    private _width;
	    private _height;
	    width: number;
	    height: number;
	    constructor(context: ContextStage3D, width: number, height: number, format: string, forRTT: boolean, streaming?: boolean);
	    dispose(): void;
	    uploadFromData(image: HTMLImageElement, miplevel?: number): any;
	    uploadFromData(imageData: ImageData, miplevel?: number): any;
	}
	export = TextureFlash;
	
}

declare module "awayjs-stagegl/lib/base/TextureSoftware" {
	import ITexture = require("awayjs-stagegl/lib/base/ITexture");
	class TextureSoftware implements ITexture {
	    textureType: string;
	    private _width;
	    private _height;
	    private _mipLevels;
	    constructor(width: number, height: number);
	    dispose(): void;
	    width: number;
	    height: number;
	    uploadFromData(image: HTMLImageElement, miplevel?: number): any;
	    uploadFromData(imageData: ImageData, miplevel?: number): any;
	    getData(miplevel: number): number[];
	}
	export = TextureSoftware;
	
}

declare module "awayjs-stagegl/lib/base/TextureWebGL" {
	import ByteArray = require("awayjs-core/lib/utils/ByteArray");
	import ITexture = require("awayjs-stagegl/lib/base/ITexture");
	import TextureBaseWebGL = require("awayjs-stagegl/lib/base/TextureBaseWebGL");
	class TextureWebGL extends TextureBaseWebGL implements ITexture {
	    textureType: string;
	    private _width;
	    private _height;
	    private _frameBuffer;
	    private _glTexture;
	    constructor(gl: WebGLRenderingContext, width: number, height: number);
	    dispose(): void;
	    width: number;
	    height: number;
	    frameBuffer: WebGLFramebuffer;
	    uploadFromData(image: HTMLImageElement, miplevel?: number): any;
	    uploadFromData(imageData: ImageData, miplevel?: number): any;
	    uploadCompressedTextureFromByteArray(data: ByteArray, byteArrayOffset: number, async?: boolean): void;
	    glTexture: WebGLTexture;
	    generateMipmaps(): void;
	}
	export = TextureWebGL;
	
}

declare module "awayjs-stagegl/lib/base/VertexBufferFlash" {
	import ContextStage3D = require("awayjs-stagegl/lib/base/ContextStage3D");
	import IVertexBuffer = require("awayjs-stagegl/lib/base/IVertexBuffer");
	import ResourceBaseFlash = require("awayjs-stagegl/lib/base/ResourceBaseFlash");
	class VertexBufferFlash extends ResourceBaseFlash implements IVertexBuffer {
	    private _context;
	    private _numVertices;
	    private _dataPerVertex;
	    constructor(context: ContextStage3D, numVertices: number, dataPerVertex: number);
	    uploadFromArray(data: number[], startVertex: number, numVertices: number): void;
	    uploadFromByteArray(data: ArrayBuffer, startVertex: number, numVertices: number): void;
	    numVertices: number;
	    dataPerVertex: number;
	    dispose(): void;
	}
	export = VertexBufferFlash;
	
}

declare module "awayjs-stagegl/lib/base/VertexBufferSoftware" {
	import IVertexBuffer = require("awayjs-stagegl/lib/base/IVertexBuffer");
	class VertexBufferSoftware implements IVertexBuffer {
	    private _numVertices;
	    private _dataPerVertex;
	    private _floatData;
	    private _uintData;
	    constructor(numVertices: number, dataPerVertex: number);
	    uploadFromArray(vertices: number[], startVertex: number, numVertices: number): void;
	    uploadFromByteArray(data: ArrayBuffer, startVertex: number, numVertices: number): void;
	    numVertices: number;
	    dataPerVertex: number;
	    attributesPerVertex: number;
	    dispose(): void;
	    data: Float32Array;
	    uintData: Uint8Array;
	}
	export = VertexBufferSoftware;
	
}

declare module "awayjs-stagegl/lib/base/VertexBufferWebGL" {
	import IVertexBuffer = require("awayjs-stagegl/lib/base/IVertexBuffer");
	class VertexBufferWebGL implements IVertexBuffer {
	    private _gl;
	    private _numVertices;
	    private _dataPerVertex;
	    private _buffer;
	    constructor(gl: WebGLRenderingContext, numVertices: number, dataPerVertex: number);
	    uploadFromArray(vertices: number[], startVertex: number, numVertices: number): void;
	    uploadFromByteArray(data: ArrayBuffer, startVertex: number, numVertices: number): void;
	    numVertices: number;
	    dataPerVertex: number;
	    glBuffer: WebGLBuffer;
	    dispose(): void;
	}
	export = VertexBufferWebGL;
	
}

declare module "awayjs-stagegl/lib/events/StageEvent" {
	import EventBase = require("awayjs-core/lib/events/EventBase");
	import Stage = require("awayjs-stagegl/lib/base/Stage");
	class StageEvent extends EventBase {
	    /**
	     *
	     */
	    static STAGE_ERROR: string;
	    /**
	     *
	     */
	    static CONTEXT_CREATED: string;
	    /**
	     *
	     */
	    static CONTEXT_DISPOSED: string;
	    /**
	     *
	     */
	    static CONTEXT_RECREATED: string;
	    /**
	     *
	     */
	    static VIEWPORT_UPDATED: string;
	    private _stage;
	    /**
	     *
	     */
	    stage: Stage;
	    constructor(type: string, stage: Stage);
	    /**
	     *
	     */
	    clone(): StageEvent;
	}
	export = StageEvent;
	
}

declare module "awayjs-stagegl/lib/image/GL_BitmapImage2D" {
	import AssetEvent = require("awayjs-core/lib/events/AssetEvent");
	import GL_Image2D = require("awayjs-stagegl/lib/image/GL_Image2D");
	import ITextureBase = require("awayjs-stagegl/lib/base/ITextureBase");
	/**
	 *
	 * @class away.pool.ImageObjectBase
	 */
	class GL_BitmapImage2D extends GL_Image2D {
	    private _mipmapData;
	    activate(index: number, repeat: boolean, smooth: boolean, mipmap: boolean): void;
	    /**
	     *
	     */
	    onClear(event: AssetEvent): void;
	    /**
	     *
	     * @param context
	     * @returns {ITexture}
	     */
	    _getTexture(): ITextureBase;
	}
	export = GL_BitmapImage2D;
	
}

declare module "awayjs-stagegl/lib/image/GL_BitmapImageCube" {
	import BitmapImage2D = require("awayjs-core/lib/image/BitmapImage2D");
	import AssetEvent = require("awayjs-core/lib/events/AssetEvent");
	import GL_ImageCube = require("awayjs-stagegl/lib/image/GL_ImageCube");
	import ITextureBase = require("awayjs-stagegl/lib/base/ITextureBase");
	/**
	 *
	 * @class away.pool.ImageObjectBase
	 */
	class GL_BitmapImageCube extends GL_ImageCube {
	    _mipmapDataArray: Array<Array<BitmapImage2D>>;
	    activate(index: number, repeat: boolean, smooth: boolean, mipmap: boolean): void;
	    /**
	     *
	     */
	    onClear(event: AssetEvent): void;
	    /**
	     *
	     * @param context
	     * @returns {ITexture}
	     */
	    _getTexture(): ITextureBase;
	}
	export = GL_BitmapImageCube;
	
}

declare module "awayjs-stagegl/lib/image/GL_Image2D" {
	import ITextureBase = require("awayjs-stagegl/lib/base/ITextureBase");
	import GL_ImageBase = require("awayjs-stagegl/lib/image/GL_ImageBase");
	/**
	 *
	 * @class away.pool.GL_ImageBase
	 */
	class GL_Image2D extends GL_ImageBase {
	    /**
	     *
	     * @param context
	     * @returns {ITexture}
	     */
	    _getTexture(): ITextureBase;
	}
	export = GL_Image2D;
	
}

declare module "awayjs-stagegl/lib/image/GL_ImageBase" {
	import AssetEvent = require("awayjs-core/lib/events/AssetEvent");
	import IAsset = require("awayjs-core/lib/library/IAsset");
	import AbstractionBase = require("awayjs-core/lib/library/AbstractionBase");
	import Stage = require("awayjs-stagegl/lib/base/Stage");
	import ITextureBase = require("awayjs-stagegl/lib/base/ITextureBase");
	/**
	 *
	 * @class away.pool.GL_ImageBase
	 */
	class GL_ImageBase extends AbstractionBase {
	    usages: number;
	    _texture: ITextureBase;
	    _mipmap: boolean;
	    _stage: Stage;
	    constructor(asset: IAsset, stage: Stage);
	    /**
	     *
	     */
	    onClear(event: AssetEvent): void;
	    activate(index: number, repeat: boolean, smooth: boolean, mipmap: boolean): void;
	    _getTexture(): ITextureBase;
	}
	export = GL_ImageBase;
	
}

declare module "awayjs-stagegl/lib/image/GL_ImageCube" {
	import ITextureBase = require("awayjs-stagegl/lib/base/ITextureBase");
	import GL_ImageBase = require("awayjs-stagegl/lib/image/GL_ImageBase");
	/**
	 *
	 * @class away.pool.GL_ImageCubeBase
	 */
	class GL_ImageCube extends GL_ImageBase {
	    /**
	     *
	     * @param context
	     * @returns {ITexture}
	     */
	    _getTexture(): ITextureBase;
	}
	export = GL_ImageCube;
	
}

declare module "awayjs-stagegl/lib/image/GL_RenderImage2D" {
	import GL_Image2D = require("awayjs-stagegl/lib/image/GL_Image2D");
	/**
	 *
	 * @class away.pool.ImageObjectBase
	 */
	class GL_RenderIimage2D extends GL_Image2D {
	    activate(index: number, repeat: boolean, smooth: boolean, mipmap: boolean): void;
	}
	export = GL_RenderIimage2D;
	
}

declare module "awayjs-stagegl/lib/image/GL_RenderImageCube" {
	import GL_ImageCube = require("awayjs-stagegl/lib/image/GL_ImageCube");
	/**
	 *
	 * @class away.pool.ImageObjectBase
	 */
	class GL_RenderImageCube extends GL_ImageCube {
	    activate(index: number, repeat: boolean, smooth: boolean, mipmap: boolean): void;
	}
	export = GL_RenderImageCube;
	
}

declare module "awayjs-stagegl/lib/image/GL_SpecularImage2D" {
	import AssetEvent = require("awayjs-core/lib/events/AssetEvent");
	import ITextureBase = require("awayjs-stagegl/lib/base/ITextureBase");
	import GL_Image2D = require("awayjs-stagegl/lib/image/GL_Image2D");
	/**
	 *
	 * @class away.pool.ImageObjectBase
	 */
	class GL_SpecularImage2D extends GL_Image2D {
	    private _mipmapData;
	    activate(index: number, repeat: boolean, smooth: boolean, mipmap: boolean): void;
	    /**
	     *
	     */
	    onClear(event: AssetEvent): void;
	    /**
	     *
	     * @param context
	     * @returns {ITexture}
	     */
	    _getTexture(): ITextureBase;
	}
	export = GL_SpecularImage2D;
	
}

declare module "awayjs-stagegl/lib/image/ProgramData" {
	import ProgramDataPool = require("awayjs-stagegl/lib/image/ProgramDataPool");
	import IProgram = require("awayjs-stagegl/lib/base/IProgram");
	import Stage = require("awayjs-stagegl/lib/base/Stage");
	/**
	 *
	 * @class away.pool.ProgramDataBase
	 */
	class ProgramData {
	    static PROGRAMDATA_ID_COUNT: number;
	    private _pool;
	    vertexString: string;
	    fragmentString: string;
	    stage: Stage;
	    usages: number;
	    program: IProgram;
	    id: number;
	    constructor(pool: ProgramDataPool, context: Stage, vertexString: string, fragmentString: string);
	    /**
	     *
	     */
	    dispose(): void;
	}
	export = ProgramData;
	
}

declare module "awayjs-stagegl/lib/image/ProgramDataPool" {
	import Stage = require("awayjs-stagegl/lib/base/Stage");
	import ProgramData = require("awayjs-stagegl/lib/image/ProgramData");
	/**
	 * @class away.pool.ProgramDataPool
	 */
	class ProgramDataPool {
	    private _pool;
	    private _stage;
	    /**
	     * //TODO
	     *
	     * @param textureDataClass
	     */
	    constructor(stage: Stage);
	    /**
	     * //TODO
	     *
	     * @param materialOwner
	     * @returns ITexture
	     */
	    getItem(vertexString: string, fragmentString: string): ProgramData;
	    /**
	     * //TODO
	     *
	     * @param materialOwner
	     */
	    disposeItem(key: string): void;
	}
	export = ProgramDataPool;
	
}

declare module "awayjs-stagegl/lib/library/GL_IAssetClass" {
	import IAsset = require("awayjs-core/lib/library/IAsset");
	import AbstractionBase = require("awayjs-core/lib/library/AbstractionBase");
	import Stage = require("awayjs-stagegl/lib/base/Stage");
	/**
	 * IImageObjectClass is an interface for the constructable class definition ITextureObject that is used to
	 * create renderable objects in the rendering pipeline to render the contents of a partition
	 *
	 * @class away.render.IImageObjectClass
	 */
	interface GL_IAssetClass {
	    /**
	     *
	     */
	    new (asset: IAsset, stage: Stage): AbstractionBase;
	}
	export = GL_IAssetClass;
	
}

declare module "awayjs-stagegl/lib/managers/StageManager" {
	import EventDispatcher = require("awayjs-core/lib/events/EventDispatcher");
	import Stage = require("awayjs-stagegl/lib/base/Stage");
	/**
	 * The StageManager class provides a multiton object that handles management for Stage objects.
	 *
	 * @see away.base.Stage
	 */
	class StageManager extends EventDispatcher {
	    private static STAGE_MAX_QUANTITY;
	    private _stages;
	    private static _instance;
	    private static _numStages;
	    private _onContextCreatedDelegate;
	    /**
	     * Creates a new StageManager class.
	     * @param stage The Stage object that contains the Stage objects to be managed.
	     * @private
	     */
	    constructor();
	    /**
	     * Gets a StageManager instance for the given Stage object.
	     * @param stage The Stage object that contains the Stage objects to be managed.
	     * @return The StageManager instance for the given Stage object.
	     */
	    static getInstance(): StageManager;
	    /**
	     * Requests the Stage for the given index.
	     *
	     * @param index The index of the requested Stage.
	     * @param forceSoftware Whether to force software mode even if hardware acceleration is available.
	     * @param profile The compatibility profile, an enumeration of ContextProfile
	     * @return The Stage for the given index.
	     */
	    getStageAt(index: number, forceSoftware?: boolean, profile?: string, mode?: string): Stage;
	    /**
	     * Removes a Stage from the manager.
	     * @param stage
	     * @private
	     */
	    iRemoveStage(stage: Stage): void;
	    /**
	     * Get the next available stage. An error is thrown if there are no StageProxies available
	     * @param forceSoftware Whether to force software mode even if hardware acceleration is available.
	     * @param profile The compatibility profile, an enumeration of ContextProfile
	     * @return The allocated stage
	     */
	    getFreeStage(forceSoftware?: boolean, profile?: string, mode?: string): Stage;
	    /**
	     * Checks if a new stage can be created and managed by the class.
	     * @return true if there is one slot free for a new stage
	     */
	    hasFreeStage: boolean;
	    /**
	     * Returns the amount of stage objects that can be created and managed by the class
	     * @return the amount of free slots
	     */
	    numSlotsFree: number;
	    /**
	     * Returns the amount of Stage objects currently managed by the class.
	     * @return the amount of slots used
	     */
	    numSlotsUsed: number;
	    /**
	     * The maximum amount of Stage objects that can be managed by the class
	     */
	    numSlotsTotal: number;
	    private onContextCreated(event);
	}
	export = StageManager;
	
}

