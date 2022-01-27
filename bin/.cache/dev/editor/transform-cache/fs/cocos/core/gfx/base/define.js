"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IsPowerOf2 = IsPowerOf2;
exports.FormatSize = FormatSize;
exports.FormatSurfaceSize = FormatSurfaceSize;
exports.GetTypeSize = GetTypeSize;
exports.getTypedArrayConstructor = getTypedArrayConstructor;
exports.DESCRIPTOR_BUFFER_TYPE = exports.FormatInfos = exports.AttributeName = exports.GFXObject = exports.DynamicStates = exports.DynamicStencilStates = exports.MemoryStatus = exports.FormatInfo = exports.QueryPoolInfo = exports.QueueInfo = exports.CommandBufferInfo = exports.InputState = exports.PipelineLayoutInfo = exports.DescriptorSetInfo = exports.DescriptorSetLayoutInfo = exports.DescriptorSetLayoutBinding = exports.FramebufferInfo = exports.TextureBarrierInfo = exports.GlobalBarrierInfo = exports.RenderPassInfo = exports.SubpassDependency = exports.SubpassInfo = exports.DepthStencilAttachment = exports.ColorAttachment = exports.InputAssemblerInfo = exports.ShaderInfo = exports.Attribute = exports.ShaderStage = exports.UniformInputAttachment = exports.UniformStorageBuffer = exports.UniformStorageImage = exports.UniformTexture = exports.UniformSampler = exports.UniformSamplerTexture = exports.UniformBlock = exports.Uniform = exports.SamplerInfo = exports.TextureViewInfo = exports.TextureInfo = exports.IndirectBuffer = exports.DispatchInfo = exports.DrawInfo = exports.BufferViewInfo = exports.BufferInfo = exports.DeviceInfo = exports.SwapchainInfo = exports.BindingMappingInfo = exports.Color = exports.Viewport = exports.BufferTextureCopy = exports.TextureBlit = exports.TextureCopy = exports.TextureSubresRange = exports.TextureSubresLayers = exports.Extent = exports.Rect = exports.Offset = exports.DeviceCaps = exports.Size = exports.ClearFlagBit = exports.CommandBufferType = exports.QueryType = exports.QueueType = exports.DescriptorType = exports.StencilFace = exports.DynamicStateFlagBit = exports.CullMode = exports.ShadeModel = exports.PolygonMode = exports.PrimitiveMode = exports.PipelineBindPoint = exports.ResolveMode = exports.AccessType = exports.StoreOp = exports.LoadOp = exports.ShaderStageFlagBit = exports.ColorMask = exports.BlendOp = exports.BlendFactor = exports.StencilOp = exports.ComparisonFunc = exports.Address = exports.Filter = exports.VsyncMode = exports.SampleCount = exports.TextureFlagBit = exports.TextureUsageBit = exports.TextureType = exports.MemoryUsageBit = exports.MemoryAccessBit = exports.BufferFlagBit = exports.BufferUsageBit = exports.Type = exports.FormatType = exports.Format = exports.Feature = exports.SurfaceTransform = exports.API = exports.Status = exports.ObjectType = void 0;
exports.DRAW_INFO_SIZE = exports.DESCRIPTOR_DYNAMIC_TYPE = exports.DESCRIPTOR_SAMPLER_TYPE = void 0;

/*
 Copyright (c) 2020 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

/**
 * @packageDocumentation
 * @module gfx
 */
const deepCopy = (target, source, Ctor) => {
  for (let i = 0; i < source.length; ++i) {
    if (target.length <= i) target.push(new Ctor());
    target[i].copy(source[i]);
  }

  target.length = source.length;
};
/**
 * ========================= !DO NOT CHANGE THE FOLLOWING SECTION MANUALLY! =========================
 * The following section is auto-generated from engine-native/cocos/renderer/core/gfx/GFXDef-common.h
 * by the script engine-native/tools/gfx-define-generator/generate.js.
 * Changes to these public interfaces should be made there first and synced back.
 * ========================= !DO NOT CHANGE THE FOLLOWING SECTION MANUALLY! =========================
 */


let ObjectType;
exports.ObjectType = ObjectType;

(function (ObjectType) {
  ObjectType[ObjectType["UNKNOWN"] = 0] = "UNKNOWN";
  ObjectType[ObjectType["SWAPCHAIN"] = 1] = "SWAPCHAIN";
  ObjectType[ObjectType["BUFFER"] = 2] = "BUFFER";
  ObjectType[ObjectType["TEXTURE"] = 3] = "TEXTURE";
  ObjectType[ObjectType["RENDER_PASS"] = 4] = "RENDER_PASS";
  ObjectType[ObjectType["FRAMEBUFFER"] = 5] = "FRAMEBUFFER";
  ObjectType[ObjectType["SAMPLER"] = 6] = "SAMPLER";
  ObjectType[ObjectType["SHADER"] = 7] = "SHADER";
  ObjectType[ObjectType["DESCRIPTOR_SET_LAYOUT"] = 8] = "DESCRIPTOR_SET_LAYOUT";
  ObjectType[ObjectType["PIPELINE_LAYOUT"] = 9] = "PIPELINE_LAYOUT";
  ObjectType[ObjectType["PIPELINE_STATE"] = 10] = "PIPELINE_STATE";
  ObjectType[ObjectType["DESCRIPTOR_SET"] = 11] = "DESCRIPTOR_SET";
  ObjectType[ObjectType["INPUT_ASSEMBLER"] = 12] = "INPUT_ASSEMBLER";
  ObjectType[ObjectType["COMMAND_BUFFER"] = 13] = "COMMAND_BUFFER";
  ObjectType[ObjectType["QUEUE"] = 14] = "QUEUE";
  ObjectType[ObjectType["QUERY_POOL"] = 15] = "QUERY_POOL";
  ObjectType[ObjectType["GLOBAL_BARRIER"] = 16] = "GLOBAL_BARRIER";
  ObjectType[ObjectType["TEXTURE_BARRIER"] = 17] = "TEXTURE_BARRIER";
  ObjectType[ObjectType["BUFFER_BARRIER"] = 18] = "BUFFER_BARRIER";
  ObjectType[ObjectType["COUNT"] = 19] = "COUNT";
})(ObjectType || (exports.ObjectType = ObjectType = {}));

let Status;
exports.Status = Status;

(function (Status) {
  Status[Status["UNREADY"] = 0] = "UNREADY";
  Status[Status["FAILED"] = 1] = "FAILED";
  Status[Status["SUCCESS"] = 2] = "SUCCESS";
})(Status || (exports.Status = Status = {}));

let API;
exports.API = API;

(function (API) {
  API[API["UNKNOWN"] = 0] = "UNKNOWN";
  API[API["GLES2"] = 1] = "GLES2";
  API[API["GLES3"] = 2] = "GLES3";
  API[API["METAL"] = 3] = "METAL";
  API[API["VULKAN"] = 4] = "VULKAN";
  API[API["WEBGL"] = 5] = "WEBGL";
  API[API["WEBGL2"] = 6] = "WEBGL2";
  API[API["WEBGPU"] = 7] = "WEBGPU";
})(API || (exports.API = API = {}));

let SurfaceTransform;
exports.SurfaceTransform = SurfaceTransform;

(function (SurfaceTransform) {
  SurfaceTransform[SurfaceTransform["IDENTITY"] = 0] = "IDENTITY";
  SurfaceTransform[SurfaceTransform["ROTATE_90"] = 1] = "ROTATE_90";
  SurfaceTransform[SurfaceTransform["ROTATE_180"] = 2] = "ROTATE_180";
  SurfaceTransform[SurfaceTransform["ROTATE_270"] = 3] = "ROTATE_270";
})(SurfaceTransform || (exports.SurfaceTransform = SurfaceTransform = {}));

let Feature;
exports.Feature = Feature;

(function (Feature) {
  Feature[Feature["COLOR_FLOAT"] = 0] = "COLOR_FLOAT";
  Feature[Feature["COLOR_HALF_FLOAT"] = 1] = "COLOR_HALF_FLOAT";
  Feature[Feature["TEXTURE_FLOAT"] = 2] = "TEXTURE_FLOAT";
  Feature[Feature["TEXTURE_HALF_FLOAT"] = 3] = "TEXTURE_HALF_FLOAT";
  Feature[Feature["TEXTURE_FLOAT_LINEAR"] = 4] = "TEXTURE_FLOAT_LINEAR";
  Feature[Feature["TEXTURE_HALF_FLOAT_LINEAR"] = 5] = "TEXTURE_HALF_FLOAT_LINEAR";
  Feature[Feature["FORMAT_R11G11B10F"] = 6] = "FORMAT_R11G11B10F";
  Feature[Feature["FORMAT_SRGB"] = 7] = "FORMAT_SRGB";
  Feature[Feature["FORMAT_ETC1"] = 8] = "FORMAT_ETC1";
  Feature[Feature["FORMAT_ETC2"] = 9] = "FORMAT_ETC2";
  Feature[Feature["FORMAT_DXT"] = 10] = "FORMAT_DXT";
  Feature[Feature["FORMAT_PVRTC"] = 11] = "FORMAT_PVRTC";
  Feature[Feature["FORMAT_ASTC"] = 12] = "FORMAT_ASTC";
  Feature[Feature["FORMAT_RGB8"] = 13] = "FORMAT_RGB8";
  Feature[Feature["ELEMENT_INDEX_UINT"] = 14] = "ELEMENT_INDEX_UINT";
  Feature[Feature["INSTANCED_ARRAYS"] = 15] = "INSTANCED_ARRAYS";
  Feature[Feature["MULTIPLE_RENDER_TARGETS"] = 16] = "MULTIPLE_RENDER_TARGETS";
  Feature[Feature["BLEND_MINMAX"] = 17] = "BLEND_MINMAX";
  Feature[Feature["COMPUTE_SHADER"] = 18] = "COMPUTE_SHADER";
  Feature[Feature["INPUT_ATTACHMENT_BENEFIT"] = 19] = "INPUT_ATTACHMENT_BENEFIT";
  Feature[Feature["COUNT"] = 20] = "COUNT";
})(Feature || (exports.Feature = Feature = {}));

let Format;
exports.Format = Format;

(function (Format) {
  Format[Format["UNKNOWN"] = 0] = "UNKNOWN";
  Format[Format["A8"] = 1] = "A8";
  Format[Format["L8"] = 2] = "L8";
  Format[Format["LA8"] = 3] = "LA8";
  Format[Format["R8"] = 4] = "R8";
  Format[Format["R8SN"] = 5] = "R8SN";
  Format[Format["R8UI"] = 6] = "R8UI";
  Format[Format["R8I"] = 7] = "R8I";
  Format[Format["R16F"] = 8] = "R16F";
  Format[Format["R16UI"] = 9] = "R16UI";
  Format[Format["R16I"] = 10] = "R16I";
  Format[Format["R32F"] = 11] = "R32F";
  Format[Format["R32UI"] = 12] = "R32UI";
  Format[Format["R32I"] = 13] = "R32I";
  Format[Format["RG8"] = 14] = "RG8";
  Format[Format["RG8SN"] = 15] = "RG8SN";
  Format[Format["RG8UI"] = 16] = "RG8UI";
  Format[Format["RG8I"] = 17] = "RG8I";
  Format[Format["RG16F"] = 18] = "RG16F";
  Format[Format["RG16UI"] = 19] = "RG16UI";
  Format[Format["RG16I"] = 20] = "RG16I";
  Format[Format["RG32F"] = 21] = "RG32F";
  Format[Format["RG32UI"] = 22] = "RG32UI";
  Format[Format["RG32I"] = 23] = "RG32I";
  Format[Format["RGB8"] = 24] = "RGB8";
  Format[Format["SRGB8"] = 25] = "SRGB8";
  Format[Format["RGB8SN"] = 26] = "RGB8SN";
  Format[Format["RGB8UI"] = 27] = "RGB8UI";
  Format[Format["RGB8I"] = 28] = "RGB8I";
  Format[Format["RGB16F"] = 29] = "RGB16F";
  Format[Format["RGB16UI"] = 30] = "RGB16UI";
  Format[Format["RGB16I"] = 31] = "RGB16I";
  Format[Format["RGB32F"] = 32] = "RGB32F";
  Format[Format["RGB32UI"] = 33] = "RGB32UI";
  Format[Format["RGB32I"] = 34] = "RGB32I";
  Format[Format["RGBA8"] = 35] = "RGBA8";
  Format[Format["BGRA8"] = 36] = "BGRA8";
  Format[Format["SRGB8_A8"] = 37] = "SRGB8_A8";
  Format[Format["RGBA8SN"] = 38] = "RGBA8SN";
  Format[Format["RGBA8UI"] = 39] = "RGBA8UI";
  Format[Format["RGBA8I"] = 40] = "RGBA8I";
  Format[Format["RGBA16F"] = 41] = "RGBA16F";
  Format[Format["RGBA16UI"] = 42] = "RGBA16UI";
  Format[Format["RGBA16I"] = 43] = "RGBA16I";
  Format[Format["RGBA32F"] = 44] = "RGBA32F";
  Format[Format["RGBA32UI"] = 45] = "RGBA32UI";
  Format[Format["RGBA32I"] = 46] = "RGBA32I";
  Format[Format["R5G6B5"] = 47] = "R5G6B5";
  Format[Format["R11G11B10F"] = 48] = "R11G11B10F";
  Format[Format["RGB5A1"] = 49] = "RGB5A1";
  Format[Format["RGBA4"] = 50] = "RGBA4";
  Format[Format["RGB10A2"] = 51] = "RGB10A2";
  Format[Format["RGB10A2UI"] = 52] = "RGB10A2UI";
  Format[Format["RGB9E5"] = 53] = "RGB9E5";
  Format[Format["DEPTH"] = 54] = "DEPTH";
  Format[Format["DEPTH_STENCIL"] = 55] = "DEPTH_STENCIL";
  Format[Format["BC1"] = 56] = "BC1";
  Format[Format["BC1_ALPHA"] = 57] = "BC1_ALPHA";
  Format[Format["BC1_SRGB"] = 58] = "BC1_SRGB";
  Format[Format["BC1_SRGB_ALPHA"] = 59] = "BC1_SRGB_ALPHA";
  Format[Format["BC2"] = 60] = "BC2";
  Format[Format["BC2_SRGB"] = 61] = "BC2_SRGB";
  Format[Format["BC3"] = 62] = "BC3";
  Format[Format["BC3_SRGB"] = 63] = "BC3_SRGB";
  Format[Format["BC4"] = 64] = "BC4";
  Format[Format["BC4_SNORM"] = 65] = "BC4_SNORM";
  Format[Format["BC5"] = 66] = "BC5";
  Format[Format["BC5_SNORM"] = 67] = "BC5_SNORM";
  Format[Format["BC6H_UF16"] = 68] = "BC6H_UF16";
  Format[Format["BC6H_SF16"] = 69] = "BC6H_SF16";
  Format[Format["BC7"] = 70] = "BC7";
  Format[Format["BC7_SRGB"] = 71] = "BC7_SRGB";
  Format[Format["ETC_RGB8"] = 72] = "ETC_RGB8";
  Format[Format["ETC2_RGB8"] = 73] = "ETC2_RGB8";
  Format[Format["ETC2_SRGB8"] = 74] = "ETC2_SRGB8";
  Format[Format["ETC2_RGB8_A1"] = 75] = "ETC2_RGB8_A1";
  Format[Format["ETC2_SRGB8_A1"] = 76] = "ETC2_SRGB8_A1";
  Format[Format["ETC2_RGBA8"] = 77] = "ETC2_RGBA8";
  Format[Format["ETC2_SRGB8_A8"] = 78] = "ETC2_SRGB8_A8";
  Format[Format["EAC_R11"] = 79] = "EAC_R11";
  Format[Format["EAC_R11SN"] = 80] = "EAC_R11SN";
  Format[Format["EAC_RG11"] = 81] = "EAC_RG11";
  Format[Format["EAC_RG11SN"] = 82] = "EAC_RG11SN";
  Format[Format["PVRTC_RGB2"] = 83] = "PVRTC_RGB2";
  Format[Format["PVRTC_RGBA2"] = 84] = "PVRTC_RGBA2";
  Format[Format["PVRTC_RGB4"] = 85] = "PVRTC_RGB4";
  Format[Format["PVRTC_RGBA4"] = 86] = "PVRTC_RGBA4";
  Format[Format["PVRTC2_2BPP"] = 87] = "PVRTC2_2BPP";
  Format[Format["PVRTC2_4BPP"] = 88] = "PVRTC2_4BPP";
  Format[Format["ASTC_RGBA_4X4"] = 89] = "ASTC_RGBA_4X4";
  Format[Format["ASTC_RGBA_5X4"] = 90] = "ASTC_RGBA_5X4";
  Format[Format["ASTC_RGBA_5X5"] = 91] = "ASTC_RGBA_5X5";
  Format[Format["ASTC_RGBA_6X5"] = 92] = "ASTC_RGBA_6X5";
  Format[Format["ASTC_RGBA_6X6"] = 93] = "ASTC_RGBA_6X6";
  Format[Format["ASTC_RGBA_8X5"] = 94] = "ASTC_RGBA_8X5";
  Format[Format["ASTC_RGBA_8X6"] = 95] = "ASTC_RGBA_8X6";
  Format[Format["ASTC_RGBA_8X8"] = 96] = "ASTC_RGBA_8X8";
  Format[Format["ASTC_RGBA_10X5"] = 97] = "ASTC_RGBA_10X5";
  Format[Format["ASTC_RGBA_10X6"] = 98] = "ASTC_RGBA_10X6";
  Format[Format["ASTC_RGBA_10X8"] = 99] = "ASTC_RGBA_10X8";
  Format[Format["ASTC_RGBA_10X10"] = 100] = "ASTC_RGBA_10X10";
  Format[Format["ASTC_RGBA_12X10"] = 101] = "ASTC_RGBA_12X10";
  Format[Format["ASTC_RGBA_12X12"] = 102] = "ASTC_RGBA_12X12";
  Format[Format["ASTC_SRGBA_4X4"] = 103] = "ASTC_SRGBA_4X4";
  Format[Format["ASTC_SRGBA_5X4"] = 104] = "ASTC_SRGBA_5X4";
  Format[Format["ASTC_SRGBA_5X5"] = 105] = "ASTC_SRGBA_5X5";
  Format[Format["ASTC_SRGBA_6X5"] = 106] = "ASTC_SRGBA_6X5";
  Format[Format["ASTC_SRGBA_6X6"] = 107] = "ASTC_SRGBA_6X6";
  Format[Format["ASTC_SRGBA_8X5"] = 108] = "ASTC_SRGBA_8X5";
  Format[Format["ASTC_SRGBA_8X6"] = 109] = "ASTC_SRGBA_8X6";
  Format[Format["ASTC_SRGBA_8X8"] = 110] = "ASTC_SRGBA_8X8";
  Format[Format["ASTC_SRGBA_10X5"] = 111] = "ASTC_SRGBA_10X5";
  Format[Format["ASTC_SRGBA_10X6"] = 112] = "ASTC_SRGBA_10X6";
  Format[Format["ASTC_SRGBA_10X8"] = 113] = "ASTC_SRGBA_10X8";
  Format[Format["ASTC_SRGBA_10X10"] = 114] = "ASTC_SRGBA_10X10";
  Format[Format["ASTC_SRGBA_12X10"] = 115] = "ASTC_SRGBA_12X10";
  Format[Format["ASTC_SRGBA_12X12"] = 116] = "ASTC_SRGBA_12X12";
  Format[Format["COUNT"] = 117] = "COUNT";
})(Format || (exports.Format = Format = {}));

let FormatType;
exports.FormatType = FormatType;

(function (FormatType) {
  FormatType[FormatType["NONE"] = 0] = "NONE";
  FormatType[FormatType["UNORM"] = 1] = "UNORM";
  FormatType[FormatType["SNORM"] = 2] = "SNORM";
  FormatType[FormatType["UINT"] = 3] = "UINT";
  FormatType[FormatType["INT"] = 4] = "INT";
  FormatType[FormatType["UFLOAT"] = 5] = "UFLOAT";
  FormatType[FormatType["FLOAT"] = 6] = "FLOAT";
})(FormatType || (exports.FormatType = FormatType = {}));

let Type;
exports.Type = Type;

(function (Type) {
  Type[Type["UNKNOWN"] = 0] = "UNKNOWN";
  Type[Type["BOOL"] = 1] = "BOOL";
  Type[Type["BOOL2"] = 2] = "BOOL2";
  Type[Type["BOOL3"] = 3] = "BOOL3";
  Type[Type["BOOL4"] = 4] = "BOOL4";
  Type[Type["INT"] = 5] = "INT";
  Type[Type["INT2"] = 6] = "INT2";
  Type[Type["INT3"] = 7] = "INT3";
  Type[Type["INT4"] = 8] = "INT4";
  Type[Type["UINT"] = 9] = "UINT";
  Type[Type["UINT2"] = 10] = "UINT2";
  Type[Type["UINT3"] = 11] = "UINT3";
  Type[Type["UINT4"] = 12] = "UINT4";
  Type[Type["FLOAT"] = 13] = "FLOAT";
  Type[Type["FLOAT2"] = 14] = "FLOAT2";
  Type[Type["FLOAT3"] = 15] = "FLOAT3";
  Type[Type["FLOAT4"] = 16] = "FLOAT4";
  Type[Type["MAT2"] = 17] = "MAT2";
  Type[Type["MAT2X3"] = 18] = "MAT2X3";
  Type[Type["MAT2X4"] = 19] = "MAT2X4";
  Type[Type["MAT3X2"] = 20] = "MAT3X2";
  Type[Type["MAT3"] = 21] = "MAT3";
  Type[Type["MAT3X4"] = 22] = "MAT3X4";
  Type[Type["MAT4X2"] = 23] = "MAT4X2";
  Type[Type["MAT4X3"] = 24] = "MAT4X3";
  Type[Type["MAT4"] = 25] = "MAT4";
  Type[Type["SAMPLER1D"] = 26] = "SAMPLER1D";
  Type[Type["SAMPLER1D_ARRAY"] = 27] = "SAMPLER1D_ARRAY";
  Type[Type["SAMPLER2D"] = 28] = "SAMPLER2D";
  Type[Type["SAMPLER2D_ARRAY"] = 29] = "SAMPLER2D_ARRAY";
  Type[Type["SAMPLER3D"] = 30] = "SAMPLER3D";
  Type[Type["SAMPLER_CUBE"] = 31] = "SAMPLER_CUBE";
  Type[Type["SAMPLER"] = 32] = "SAMPLER";
  Type[Type["TEXTURE1D"] = 33] = "TEXTURE1D";
  Type[Type["TEXTURE1D_ARRAY"] = 34] = "TEXTURE1D_ARRAY";
  Type[Type["TEXTURE2D"] = 35] = "TEXTURE2D";
  Type[Type["TEXTURE2D_ARRAY"] = 36] = "TEXTURE2D_ARRAY";
  Type[Type["TEXTURE3D"] = 37] = "TEXTURE3D";
  Type[Type["TEXTURE_CUBE"] = 38] = "TEXTURE_CUBE";
  Type[Type["IMAGE1D"] = 39] = "IMAGE1D";
  Type[Type["IMAGE1D_ARRAY"] = 40] = "IMAGE1D_ARRAY";
  Type[Type["IMAGE2D"] = 41] = "IMAGE2D";
  Type[Type["IMAGE2D_ARRAY"] = 42] = "IMAGE2D_ARRAY";
  Type[Type["IMAGE3D"] = 43] = "IMAGE3D";
  Type[Type["IMAGE_CUBE"] = 44] = "IMAGE_CUBE";
  Type[Type["SUBPASS_INPUT"] = 45] = "SUBPASS_INPUT";
  Type[Type["COUNT"] = 46] = "COUNT";
})(Type || (exports.Type = Type = {}));

let BufferUsageBit;
exports.BufferUsageBit = BufferUsageBit;

(function (BufferUsageBit) {
  BufferUsageBit[BufferUsageBit["NONE"] = 0] = "NONE";
  BufferUsageBit[BufferUsageBit["TRANSFER_SRC"] = 1] = "TRANSFER_SRC";
  BufferUsageBit[BufferUsageBit["TRANSFER_DST"] = 2] = "TRANSFER_DST";
  BufferUsageBit[BufferUsageBit["INDEX"] = 4] = "INDEX";
  BufferUsageBit[BufferUsageBit["VERTEX"] = 8] = "VERTEX";
  BufferUsageBit[BufferUsageBit["UNIFORM"] = 16] = "UNIFORM";
  BufferUsageBit[BufferUsageBit["STORAGE"] = 32] = "STORAGE";
  BufferUsageBit[BufferUsageBit["INDIRECT"] = 64] = "INDIRECT";
})(BufferUsageBit || (exports.BufferUsageBit = BufferUsageBit = {}));

let BufferFlagBit;
exports.BufferFlagBit = BufferFlagBit;

(function (BufferFlagBit) {
  BufferFlagBit[BufferFlagBit["NONE"] = 0] = "NONE";
})(BufferFlagBit || (exports.BufferFlagBit = BufferFlagBit = {}));

let MemoryAccessBit;
exports.MemoryAccessBit = MemoryAccessBit;

(function (MemoryAccessBit) {
  MemoryAccessBit[MemoryAccessBit["NONE"] = 0] = "NONE";
  MemoryAccessBit[MemoryAccessBit["READ_ONLY"] = 1] = "READ_ONLY";
  MemoryAccessBit[MemoryAccessBit["WRITE_ONLY"] = 2] = "WRITE_ONLY";
  MemoryAccessBit[MemoryAccessBit["READ_WRITE"] = 3] = "READ_WRITE";
})(MemoryAccessBit || (exports.MemoryAccessBit = MemoryAccessBit = {}));

let MemoryUsageBit;
exports.MemoryUsageBit = MemoryUsageBit;

(function (MemoryUsageBit) {
  MemoryUsageBit[MemoryUsageBit["NONE"] = 0] = "NONE";
  MemoryUsageBit[MemoryUsageBit["DEVICE"] = 1] = "DEVICE";
  MemoryUsageBit[MemoryUsageBit["HOST"] = 2] = "HOST";
})(MemoryUsageBit || (exports.MemoryUsageBit = MemoryUsageBit = {}));

let TextureType;
exports.TextureType = TextureType;

(function (TextureType) {
  TextureType[TextureType["TEX1D"] = 0] = "TEX1D";
  TextureType[TextureType["TEX2D"] = 1] = "TEX2D";
  TextureType[TextureType["TEX3D"] = 2] = "TEX3D";
  TextureType[TextureType["CUBE"] = 3] = "CUBE";
  TextureType[TextureType["TEX1D_ARRAY"] = 4] = "TEX1D_ARRAY";
  TextureType[TextureType["TEX2D_ARRAY"] = 5] = "TEX2D_ARRAY";
})(TextureType || (exports.TextureType = TextureType = {}));

let TextureUsageBit;
exports.TextureUsageBit = TextureUsageBit;

(function (TextureUsageBit) {
  TextureUsageBit[TextureUsageBit["NONE"] = 0] = "NONE";
  TextureUsageBit[TextureUsageBit["TRANSFER_SRC"] = 1] = "TRANSFER_SRC";
  TextureUsageBit[TextureUsageBit["TRANSFER_DST"] = 2] = "TRANSFER_DST";
  TextureUsageBit[TextureUsageBit["SAMPLED"] = 4] = "SAMPLED";
  TextureUsageBit[TextureUsageBit["STORAGE"] = 8] = "STORAGE";
  TextureUsageBit[TextureUsageBit["COLOR_ATTACHMENT"] = 16] = "COLOR_ATTACHMENT";
  TextureUsageBit[TextureUsageBit["DEPTH_STENCIL_ATTACHMENT"] = 32] = "DEPTH_STENCIL_ATTACHMENT";
  TextureUsageBit[TextureUsageBit["INPUT_ATTACHMENT"] = 64] = "INPUT_ATTACHMENT";
})(TextureUsageBit || (exports.TextureUsageBit = TextureUsageBit = {}));

let TextureFlagBit;
exports.TextureFlagBit = TextureFlagBit;

(function (TextureFlagBit) {
  TextureFlagBit[TextureFlagBit["NONE"] = 0] = "NONE";
  TextureFlagBit[TextureFlagBit["GEN_MIPMAP"] = 1] = "GEN_MIPMAP";
  TextureFlagBit[TextureFlagBit["GENERAL_LAYOUT"] = 2] = "GENERAL_LAYOUT";
})(TextureFlagBit || (exports.TextureFlagBit = TextureFlagBit = {}));

let SampleCount;
exports.SampleCount = SampleCount;

(function (SampleCount) {
  SampleCount[SampleCount["ONE"] = 0] = "ONE";
  SampleCount[SampleCount["MULTIPLE_PERFORMANCE"] = 1] = "MULTIPLE_PERFORMANCE";
  SampleCount[SampleCount["MULTIPLE_BALANCE"] = 2] = "MULTIPLE_BALANCE";
  SampleCount[SampleCount["MULTIPLE_QUALITY"] = 3] = "MULTIPLE_QUALITY";
})(SampleCount || (exports.SampleCount = SampleCount = {}));

let VsyncMode;
exports.VsyncMode = VsyncMode;

(function (VsyncMode) {
  VsyncMode[VsyncMode["OFF"] = 0] = "OFF";
  VsyncMode[VsyncMode["ON"] = 1] = "ON";
  VsyncMode[VsyncMode["RELAXED"] = 2] = "RELAXED";
  VsyncMode[VsyncMode["MAILBOX"] = 3] = "MAILBOX";
  VsyncMode[VsyncMode["HALF"] = 4] = "HALF";
})(VsyncMode || (exports.VsyncMode = VsyncMode = {}));

let Filter;
exports.Filter = Filter;

(function (Filter) {
  Filter[Filter["NONE"] = 0] = "NONE";
  Filter[Filter["POINT"] = 1] = "POINT";
  Filter[Filter["LINEAR"] = 2] = "LINEAR";
  Filter[Filter["ANISOTROPIC"] = 3] = "ANISOTROPIC";
})(Filter || (exports.Filter = Filter = {}));

let Address;
exports.Address = Address;

(function (Address) {
  Address[Address["WRAP"] = 0] = "WRAP";
  Address[Address["MIRROR"] = 1] = "MIRROR";
  Address[Address["CLAMP"] = 2] = "CLAMP";
  Address[Address["BORDER"] = 3] = "BORDER";
})(Address || (exports.Address = Address = {}));

let ComparisonFunc;
exports.ComparisonFunc = ComparisonFunc;

(function (ComparisonFunc) {
  ComparisonFunc[ComparisonFunc["NEVER"] = 0] = "NEVER";
  ComparisonFunc[ComparisonFunc["LESS"] = 1] = "LESS";
  ComparisonFunc[ComparisonFunc["EQUAL"] = 2] = "EQUAL";
  ComparisonFunc[ComparisonFunc["LESS_EQUAL"] = 3] = "LESS_EQUAL";
  ComparisonFunc[ComparisonFunc["GREATER"] = 4] = "GREATER";
  ComparisonFunc[ComparisonFunc["NOT_EQUAL"] = 5] = "NOT_EQUAL";
  ComparisonFunc[ComparisonFunc["GREATER_EQUAL"] = 6] = "GREATER_EQUAL";
  ComparisonFunc[ComparisonFunc["ALWAYS"] = 7] = "ALWAYS";
})(ComparisonFunc || (exports.ComparisonFunc = ComparisonFunc = {}));

let StencilOp;
exports.StencilOp = StencilOp;

(function (StencilOp) {
  StencilOp[StencilOp["ZERO"] = 0] = "ZERO";
  StencilOp[StencilOp["KEEP"] = 1] = "KEEP";
  StencilOp[StencilOp["REPLACE"] = 2] = "REPLACE";
  StencilOp[StencilOp["INCR"] = 3] = "INCR";
  StencilOp[StencilOp["DECR"] = 4] = "DECR";
  StencilOp[StencilOp["INVERT"] = 5] = "INVERT";
  StencilOp[StencilOp["INCR_WRAP"] = 6] = "INCR_WRAP";
  StencilOp[StencilOp["DECR_WRAP"] = 7] = "DECR_WRAP";
})(StencilOp || (exports.StencilOp = StencilOp = {}));

let BlendFactor;
exports.BlendFactor = BlendFactor;

(function (BlendFactor) {
  BlendFactor[BlendFactor["ZERO"] = 0] = "ZERO";
  BlendFactor[BlendFactor["ONE"] = 1] = "ONE";
  BlendFactor[BlendFactor["SRC_ALPHA"] = 2] = "SRC_ALPHA";
  BlendFactor[BlendFactor["DST_ALPHA"] = 3] = "DST_ALPHA";
  BlendFactor[BlendFactor["ONE_MINUS_SRC_ALPHA"] = 4] = "ONE_MINUS_SRC_ALPHA";
  BlendFactor[BlendFactor["ONE_MINUS_DST_ALPHA"] = 5] = "ONE_MINUS_DST_ALPHA";
  BlendFactor[BlendFactor["SRC_COLOR"] = 6] = "SRC_COLOR";
  BlendFactor[BlendFactor["DST_COLOR"] = 7] = "DST_COLOR";
  BlendFactor[BlendFactor["ONE_MINUS_SRC_COLOR"] = 8] = "ONE_MINUS_SRC_COLOR";
  BlendFactor[BlendFactor["ONE_MINUS_DST_COLOR"] = 9] = "ONE_MINUS_DST_COLOR";
  BlendFactor[BlendFactor["SRC_ALPHA_SATURATE"] = 10] = "SRC_ALPHA_SATURATE";
  BlendFactor[BlendFactor["CONSTANT_COLOR"] = 11] = "CONSTANT_COLOR";
  BlendFactor[BlendFactor["ONE_MINUS_CONSTANT_COLOR"] = 12] = "ONE_MINUS_CONSTANT_COLOR";
  BlendFactor[BlendFactor["CONSTANT_ALPHA"] = 13] = "CONSTANT_ALPHA";
  BlendFactor[BlendFactor["ONE_MINUS_CONSTANT_ALPHA"] = 14] = "ONE_MINUS_CONSTANT_ALPHA";
})(BlendFactor || (exports.BlendFactor = BlendFactor = {}));

let BlendOp;
exports.BlendOp = BlendOp;

(function (BlendOp) {
  BlendOp[BlendOp["ADD"] = 0] = "ADD";
  BlendOp[BlendOp["SUB"] = 1] = "SUB";
  BlendOp[BlendOp["REV_SUB"] = 2] = "REV_SUB";
  BlendOp[BlendOp["MIN"] = 3] = "MIN";
  BlendOp[BlendOp["MAX"] = 4] = "MAX";
})(BlendOp || (exports.BlendOp = BlendOp = {}));

let ColorMask;
exports.ColorMask = ColorMask;

(function (ColorMask) {
  ColorMask[ColorMask["NONE"] = 0] = "NONE";
  ColorMask[ColorMask["R"] = 1] = "R";
  ColorMask[ColorMask["G"] = 2] = "G";
  ColorMask[ColorMask["B"] = 4] = "B";
  ColorMask[ColorMask["A"] = 8] = "A";
  ColorMask[ColorMask["ALL"] = 15] = "ALL";
})(ColorMask || (exports.ColorMask = ColorMask = {}));

let ShaderStageFlagBit;
exports.ShaderStageFlagBit = ShaderStageFlagBit;

(function (ShaderStageFlagBit) {
  ShaderStageFlagBit[ShaderStageFlagBit["NONE"] = 0] = "NONE";
  ShaderStageFlagBit[ShaderStageFlagBit["VERTEX"] = 1] = "VERTEX";
  ShaderStageFlagBit[ShaderStageFlagBit["CONTROL"] = 2] = "CONTROL";
  ShaderStageFlagBit[ShaderStageFlagBit["EVALUATION"] = 4] = "EVALUATION";
  ShaderStageFlagBit[ShaderStageFlagBit["GEOMETRY"] = 8] = "GEOMETRY";
  ShaderStageFlagBit[ShaderStageFlagBit["FRAGMENT"] = 16] = "FRAGMENT";
  ShaderStageFlagBit[ShaderStageFlagBit["COMPUTE"] = 32] = "COMPUTE";
  ShaderStageFlagBit[ShaderStageFlagBit["ALL"] = 63] = "ALL";
})(ShaderStageFlagBit || (exports.ShaderStageFlagBit = ShaderStageFlagBit = {}));

let LoadOp;
exports.LoadOp = LoadOp;

(function (LoadOp) {
  LoadOp[LoadOp["LOAD"] = 0] = "LOAD";
  LoadOp[LoadOp["CLEAR"] = 1] = "CLEAR";
  LoadOp[LoadOp["DISCARD"] = 2] = "DISCARD";
})(LoadOp || (exports.LoadOp = LoadOp = {}));

let StoreOp;
exports.StoreOp = StoreOp;

(function (StoreOp) {
  StoreOp[StoreOp["STORE"] = 0] = "STORE";
  StoreOp[StoreOp["DISCARD"] = 1] = "DISCARD";
})(StoreOp || (exports.StoreOp = StoreOp = {}));

let AccessType;
exports.AccessType = AccessType;

(function (AccessType) {
  AccessType[AccessType["NONE"] = 0] = "NONE";
  AccessType[AccessType["INDIRECT_BUFFER"] = 1] = "INDIRECT_BUFFER";
  AccessType[AccessType["INDEX_BUFFER"] = 2] = "INDEX_BUFFER";
  AccessType[AccessType["VERTEX_BUFFER"] = 3] = "VERTEX_BUFFER";
  AccessType[AccessType["VERTEX_SHADER_READ_UNIFORM_BUFFER"] = 4] = "VERTEX_SHADER_READ_UNIFORM_BUFFER";
  AccessType[AccessType["VERTEX_SHADER_READ_TEXTURE"] = 5] = "VERTEX_SHADER_READ_TEXTURE";
  AccessType[AccessType["VERTEX_SHADER_READ_OTHER"] = 6] = "VERTEX_SHADER_READ_OTHER";
  AccessType[AccessType["FRAGMENT_SHADER_READ_UNIFORM_BUFFER"] = 7] = "FRAGMENT_SHADER_READ_UNIFORM_BUFFER";
  AccessType[AccessType["FRAGMENT_SHADER_READ_TEXTURE"] = 8] = "FRAGMENT_SHADER_READ_TEXTURE";
  AccessType[AccessType["FRAGMENT_SHADER_READ_COLOR_INPUT_ATTACHMENT"] = 9] = "FRAGMENT_SHADER_READ_COLOR_INPUT_ATTACHMENT";
  AccessType[AccessType["FRAGMENT_SHADER_READ_DEPTH_STENCIL_INPUT_ATTACHMENT"] = 10] = "FRAGMENT_SHADER_READ_DEPTH_STENCIL_INPUT_ATTACHMENT";
  AccessType[AccessType["FRAGMENT_SHADER_READ_OTHER"] = 11] = "FRAGMENT_SHADER_READ_OTHER";
  AccessType[AccessType["COLOR_ATTACHMENT_READ"] = 12] = "COLOR_ATTACHMENT_READ";
  AccessType[AccessType["DEPTH_STENCIL_ATTACHMENT_READ"] = 13] = "DEPTH_STENCIL_ATTACHMENT_READ";
  AccessType[AccessType["COMPUTE_SHADER_READ_UNIFORM_BUFFER"] = 14] = "COMPUTE_SHADER_READ_UNIFORM_BUFFER";
  AccessType[AccessType["COMPUTE_SHADER_READ_TEXTURE"] = 15] = "COMPUTE_SHADER_READ_TEXTURE";
  AccessType[AccessType["COMPUTE_SHADER_READ_OTHER"] = 16] = "COMPUTE_SHADER_READ_OTHER";
  AccessType[AccessType["TRANSFER_READ"] = 17] = "TRANSFER_READ";
  AccessType[AccessType["HOST_READ"] = 18] = "HOST_READ";
  AccessType[AccessType["PRESENT"] = 19] = "PRESENT";
  AccessType[AccessType["VERTEX_SHADER_WRITE"] = 20] = "VERTEX_SHADER_WRITE";
  AccessType[AccessType["FRAGMENT_SHADER_WRITE"] = 21] = "FRAGMENT_SHADER_WRITE";
  AccessType[AccessType["COLOR_ATTACHMENT_WRITE"] = 22] = "COLOR_ATTACHMENT_WRITE";
  AccessType[AccessType["DEPTH_STENCIL_ATTACHMENT_WRITE"] = 23] = "DEPTH_STENCIL_ATTACHMENT_WRITE";
  AccessType[AccessType["COMPUTE_SHADER_WRITE"] = 24] = "COMPUTE_SHADER_WRITE";
  AccessType[AccessType["TRANSFER_WRITE"] = 25] = "TRANSFER_WRITE";
  AccessType[AccessType["HOST_PREINITIALIZED"] = 26] = "HOST_PREINITIALIZED";
  AccessType[AccessType["HOST_WRITE"] = 27] = "HOST_WRITE";
})(AccessType || (exports.AccessType = AccessType = {}));

let ResolveMode;
exports.ResolveMode = ResolveMode;

(function (ResolveMode) {
  ResolveMode[ResolveMode["NONE"] = 0] = "NONE";
  ResolveMode[ResolveMode["SAMPLE_ZERO"] = 1] = "SAMPLE_ZERO";
  ResolveMode[ResolveMode["AVERAGE"] = 2] = "AVERAGE";
  ResolveMode[ResolveMode["MIN"] = 3] = "MIN";
  ResolveMode[ResolveMode["MAX"] = 4] = "MAX";
})(ResolveMode || (exports.ResolveMode = ResolveMode = {}));

let PipelineBindPoint;
exports.PipelineBindPoint = PipelineBindPoint;

(function (PipelineBindPoint) {
  PipelineBindPoint[PipelineBindPoint["GRAPHICS"] = 0] = "GRAPHICS";
  PipelineBindPoint[PipelineBindPoint["COMPUTE"] = 1] = "COMPUTE";
  PipelineBindPoint[PipelineBindPoint["RAY_TRACING"] = 2] = "RAY_TRACING";
})(PipelineBindPoint || (exports.PipelineBindPoint = PipelineBindPoint = {}));

let PrimitiveMode;
exports.PrimitiveMode = PrimitiveMode;

(function (PrimitiveMode) {
  PrimitiveMode[PrimitiveMode["POINT_LIST"] = 0] = "POINT_LIST";
  PrimitiveMode[PrimitiveMode["LINE_LIST"] = 1] = "LINE_LIST";
  PrimitiveMode[PrimitiveMode["LINE_STRIP"] = 2] = "LINE_STRIP";
  PrimitiveMode[PrimitiveMode["LINE_LOOP"] = 3] = "LINE_LOOP";
  PrimitiveMode[PrimitiveMode["LINE_LIST_ADJACENCY"] = 4] = "LINE_LIST_ADJACENCY";
  PrimitiveMode[PrimitiveMode["LINE_STRIP_ADJACENCY"] = 5] = "LINE_STRIP_ADJACENCY";
  PrimitiveMode[PrimitiveMode["ISO_LINE_LIST"] = 6] = "ISO_LINE_LIST";
  PrimitiveMode[PrimitiveMode["TRIANGLE_LIST"] = 7] = "TRIANGLE_LIST";
  PrimitiveMode[PrimitiveMode["TRIANGLE_STRIP"] = 8] = "TRIANGLE_STRIP";
  PrimitiveMode[PrimitiveMode["TRIANGLE_FAN"] = 9] = "TRIANGLE_FAN";
  PrimitiveMode[PrimitiveMode["TRIANGLE_LIST_ADJACENCY"] = 10] = "TRIANGLE_LIST_ADJACENCY";
  PrimitiveMode[PrimitiveMode["TRIANGLE_STRIP_ADJACENCY"] = 11] = "TRIANGLE_STRIP_ADJACENCY";
  PrimitiveMode[PrimitiveMode["TRIANGLE_PATCH_ADJACENCY"] = 12] = "TRIANGLE_PATCH_ADJACENCY";
  PrimitiveMode[PrimitiveMode["QUAD_PATCH_LIST"] = 13] = "QUAD_PATCH_LIST";
})(PrimitiveMode || (exports.PrimitiveMode = PrimitiveMode = {}));

let PolygonMode;
exports.PolygonMode = PolygonMode;

(function (PolygonMode) {
  PolygonMode[PolygonMode["FILL"] = 0] = "FILL";
  PolygonMode[PolygonMode["POINT"] = 1] = "POINT";
  PolygonMode[PolygonMode["LINE"] = 2] = "LINE";
})(PolygonMode || (exports.PolygonMode = PolygonMode = {}));

let ShadeModel;
exports.ShadeModel = ShadeModel;

(function (ShadeModel) {
  ShadeModel[ShadeModel["GOURAND"] = 0] = "GOURAND";
  ShadeModel[ShadeModel["FLAT"] = 1] = "FLAT";
})(ShadeModel || (exports.ShadeModel = ShadeModel = {}));

let CullMode;
exports.CullMode = CullMode;

(function (CullMode) {
  CullMode[CullMode["NONE"] = 0] = "NONE";
  CullMode[CullMode["FRONT"] = 1] = "FRONT";
  CullMode[CullMode["BACK"] = 2] = "BACK";
})(CullMode || (exports.CullMode = CullMode = {}));

let DynamicStateFlagBit;
exports.DynamicStateFlagBit = DynamicStateFlagBit;

(function (DynamicStateFlagBit) {
  DynamicStateFlagBit[DynamicStateFlagBit["NONE"] = 0] = "NONE";
  DynamicStateFlagBit[DynamicStateFlagBit["LINE_WIDTH"] = 1] = "LINE_WIDTH";
  DynamicStateFlagBit[DynamicStateFlagBit["DEPTH_BIAS"] = 2] = "DEPTH_BIAS";
  DynamicStateFlagBit[DynamicStateFlagBit["BLEND_CONSTANTS"] = 4] = "BLEND_CONSTANTS";
  DynamicStateFlagBit[DynamicStateFlagBit["DEPTH_BOUNDS"] = 8] = "DEPTH_BOUNDS";
  DynamicStateFlagBit[DynamicStateFlagBit["STENCIL_WRITE_MASK"] = 16] = "STENCIL_WRITE_MASK";
  DynamicStateFlagBit[DynamicStateFlagBit["STENCIL_COMPARE_MASK"] = 32] = "STENCIL_COMPARE_MASK";
})(DynamicStateFlagBit || (exports.DynamicStateFlagBit = DynamicStateFlagBit = {}));

let StencilFace;
exports.StencilFace = StencilFace;

(function (StencilFace) {
  StencilFace[StencilFace["FRONT"] = 1] = "FRONT";
  StencilFace[StencilFace["BACK"] = 2] = "BACK";
  StencilFace[StencilFace["ALL"] = 3] = "ALL";
})(StencilFace || (exports.StencilFace = StencilFace = {}));

let DescriptorType;
exports.DescriptorType = DescriptorType;

(function (DescriptorType) {
  DescriptorType[DescriptorType["UNKNOWN"] = 0] = "UNKNOWN";
  DescriptorType[DescriptorType["UNIFORM_BUFFER"] = 1] = "UNIFORM_BUFFER";
  DescriptorType[DescriptorType["DYNAMIC_UNIFORM_BUFFER"] = 2] = "DYNAMIC_UNIFORM_BUFFER";
  DescriptorType[DescriptorType["STORAGE_BUFFER"] = 4] = "STORAGE_BUFFER";
  DescriptorType[DescriptorType["DYNAMIC_STORAGE_BUFFER"] = 8] = "DYNAMIC_STORAGE_BUFFER";
  DescriptorType[DescriptorType["SAMPLER_TEXTURE"] = 16] = "SAMPLER_TEXTURE";
  DescriptorType[DescriptorType["SAMPLER"] = 32] = "SAMPLER";
  DescriptorType[DescriptorType["TEXTURE"] = 64] = "TEXTURE";
  DescriptorType[DescriptorType["STORAGE_IMAGE"] = 128] = "STORAGE_IMAGE";
  DescriptorType[DescriptorType["INPUT_ATTACHMENT"] = 256] = "INPUT_ATTACHMENT";
})(DescriptorType || (exports.DescriptorType = DescriptorType = {}));

let QueueType;
exports.QueueType = QueueType;

(function (QueueType) {
  QueueType[QueueType["GRAPHICS"] = 0] = "GRAPHICS";
  QueueType[QueueType["COMPUTE"] = 1] = "COMPUTE";
  QueueType[QueueType["TRANSFER"] = 2] = "TRANSFER";
})(QueueType || (exports.QueueType = QueueType = {}));

let QueryType;
exports.QueryType = QueryType;

(function (QueryType) {
  QueryType[QueryType["OCCLUSION"] = 0] = "OCCLUSION";
  QueryType[QueryType["PIPELINE_STATISTICS"] = 1] = "PIPELINE_STATISTICS";
  QueryType[QueryType["TIMESTAMP"] = 2] = "TIMESTAMP";
})(QueryType || (exports.QueryType = QueryType = {}));

let CommandBufferType;
exports.CommandBufferType = CommandBufferType;

(function (CommandBufferType) {
  CommandBufferType[CommandBufferType["PRIMARY"] = 0] = "PRIMARY";
  CommandBufferType[CommandBufferType["SECONDARY"] = 1] = "SECONDARY";
})(CommandBufferType || (exports.CommandBufferType = CommandBufferType = {}));

let ClearFlagBit;
exports.ClearFlagBit = ClearFlagBit;

(function (ClearFlagBit) {
  ClearFlagBit[ClearFlagBit["NONE"] = 0] = "NONE";
  ClearFlagBit[ClearFlagBit["COLOR"] = 1] = "COLOR";
  ClearFlagBit[ClearFlagBit["DEPTH"] = 2] = "DEPTH";
  ClearFlagBit[ClearFlagBit["STENCIL"] = 4] = "STENCIL";
  ClearFlagBit[ClearFlagBit["DEPTH_STENCIL"] = 6] = "DEPTH_STENCIL";
  ClearFlagBit[ClearFlagBit["ALL"] = 7] = "ALL";
})(ClearFlagBit || (exports.ClearFlagBit = ClearFlagBit = {}));

class Size {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  copy(info) {
    this.x = info.x;
    this.y = info.y;
    this.z = info.z;
    return this;
  }

}

exports.Size = Size;

class DeviceCaps {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(maxVertexAttributes = 0, maxVertexUniformVectors = 0, maxFragmentUniformVectors = 0, maxTextureUnits = 0, maxImageUnits = 0, maxVertexTextureUnits = 0, maxColorRenderTargets = 0, maxShaderStorageBufferBindings = 0, maxShaderStorageBlockSize = 0, maxUniformBufferBindings = 0, maxUniformBlockSize = 0, maxTextureSize = 0, maxCubeMapTextureSize = 0, uboOffsetAlignment = 1, maxComputeSharedMemorySize = 0, maxComputeWorkGroupInvocations = 0, maxComputeWorkGroupSize = new Size(), maxComputeWorkGroupCount = new Size(), supportQuery = false, clipSpaceMinZ = -1, screenSpaceSignY = 1, clipSpaceSignY = 1) {
    this.maxVertexAttributes = maxVertexAttributes;
    this.maxVertexUniformVectors = maxVertexUniformVectors;
    this.maxFragmentUniformVectors = maxFragmentUniformVectors;
    this.maxTextureUnits = maxTextureUnits;
    this.maxImageUnits = maxImageUnits;
    this.maxVertexTextureUnits = maxVertexTextureUnits;
    this.maxColorRenderTargets = maxColorRenderTargets;
    this.maxShaderStorageBufferBindings = maxShaderStorageBufferBindings;
    this.maxShaderStorageBlockSize = maxShaderStorageBlockSize;
    this.maxUniformBufferBindings = maxUniformBufferBindings;
    this.maxUniformBlockSize = maxUniformBlockSize;
    this.maxTextureSize = maxTextureSize;
    this.maxCubeMapTextureSize = maxCubeMapTextureSize;
    this.uboOffsetAlignment = uboOffsetAlignment;
    this.maxComputeSharedMemorySize = maxComputeSharedMemorySize;
    this.maxComputeWorkGroupInvocations = maxComputeWorkGroupInvocations;
    this.maxComputeWorkGroupSize = maxComputeWorkGroupSize;
    this.maxComputeWorkGroupCount = maxComputeWorkGroupCount;
    this.supportQuery = supportQuery;
    this.clipSpaceMinZ = clipSpaceMinZ;
    this.screenSpaceSignY = screenSpaceSignY;
    this.clipSpaceSignY = clipSpaceSignY;
  }

  copy(info) {
    this.maxVertexAttributes = info.maxVertexAttributes;
    this.maxVertexUniformVectors = info.maxVertexUniformVectors;
    this.maxFragmentUniformVectors = info.maxFragmentUniformVectors;
    this.maxTextureUnits = info.maxTextureUnits;
    this.maxImageUnits = info.maxImageUnits;
    this.maxVertexTextureUnits = info.maxVertexTextureUnits;
    this.maxColorRenderTargets = info.maxColorRenderTargets;
    this.maxShaderStorageBufferBindings = info.maxShaderStorageBufferBindings;
    this.maxShaderStorageBlockSize = info.maxShaderStorageBlockSize;
    this.maxUniformBufferBindings = info.maxUniformBufferBindings;
    this.maxUniformBlockSize = info.maxUniformBlockSize;
    this.maxTextureSize = info.maxTextureSize;
    this.maxCubeMapTextureSize = info.maxCubeMapTextureSize;
    this.uboOffsetAlignment = info.uboOffsetAlignment;
    this.maxComputeSharedMemorySize = info.maxComputeSharedMemorySize;
    this.maxComputeWorkGroupInvocations = info.maxComputeWorkGroupInvocations;
    this.maxComputeWorkGroupSize.copy(info.maxComputeWorkGroupSize);
    this.maxComputeWorkGroupCount.copy(info.maxComputeWorkGroupCount);
    this.supportQuery = info.supportQuery;
    this.clipSpaceMinZ = info.clipSpaceMinZ;
    this.screenSpaceSignY = info.screenSpaceSignY;
    this.clipSpaceSignY = info.clipSpaceSignY;
    return this;
  }

}

exports.DeviceCaps = DeviceCaps;

class Offset {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  copy(info) {
    this.x = info.x;
    this.y = info.y;
    this.z = info.z;
    return this;
  }

}

exports.Offset = Offset;

class Rect {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(x = 0, y = 0, width = 0, height = 0) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  copy(info) {
    this.x = info.x;
    this.y = info.y;
    this.width = info.width;
    this.height = info.height;
    return this;
  }

}

exports.Rect = Rect;

class Extent {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(width = 0, height = 0, depth = 1) {
    this.width = width;
    this.height = height;
    this.depth = depth;
  }

  copy(info) {
    this.width = info.width;
    this.height = info.height;
    this.depth = info.depth;
    return this;
  }

}

exports.Extent = Extent;

class TextureSubresLayers {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(mipLevel = 0, baseArrayLayer = 0, layerCount = 1) {
    this.mipLevel = mipLevel;
    this.baseArrayLayer = baseArrayLayer;
    this.layerCount = layerCount;
  }

  copy(info) {
    this.mipLevel = info.mipLevel;
    this.baseArrayLayer = info.baseArrayLayer;
    this.layerCount = info.layerCount;
    return this;
  }

}

exports.TextureSubresLayers = TextureSubresLayers;

class TextureSubresRange {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(baseMipLevel = 0, levelCount = 1, baseArrayLayer = 0, layerCount = 1) {
    this.baseMipLevel = baseMipLevel;
    this.levelCount = levelCount;
    this.baseArrayLayer = baseArrayLayer;
    this.layerCount = layerCount;
  }

  copy(info) {
    this.baseMipLevel = info.baseMipLevel;
    this.levelCount = info.levelCount;
    this.baseArrayLayer = info.baseArrayLayer;
    this.layerCount = info.layerCount;
    return this;
  }

}

exports.TextureSubresRange = TextureSubresRange;

class TextureCopy {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(srcSubres = new TextureSubresLayers(), srcOffset = new Offset(), dstSubres = new TextureSubresLayers(), dstOffset = new Offset(), extent = new Extent()) {
    this.srcSubres = srcSubres;
    this.srcOffset = srcOffset;
    this.dstSubres = dstSubres;
    this.dstOffset = dstOffset;
    this.extent = extent;
  }

  copy(info) {
    this.srcSubres.copy(info.srcSubres);
    this.srcOffset.copy(info.srcOffset);
    this.dstSubres.copy(info.dstSubres);
    this.dstOffset.copy(info.dstOffset);
    this.extent.copy(info.extent);
    return this;
  }

}

exports.TextureCopy = TextureCopy;

class TextureBlit {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(srcSubres = new TextureSubresLayers(), srcOffset = new Offset(), srcExtent = new Extent(), dstSubres = new TextureSubresLayers(), dstOffset = new Offset(), dstExtent = new Extent()) {
    this.srcSubres = srcSubres;
    this.srcOffset = srcOffset;
    this.srcExtent = srcExtent;
    this.dstSubres = dstSubres;
    this.dstOffset = dstOffset;
    this.dstExtent = dstExtent;
  }

  copy(info) {
    this.srcSubres.copy(info.srcSubres);
    this.srcOffset.copy(info.srcOffset);
    this.srcExtent.copy(info.srcExtent);
    this.dstSubres.copy(info.dstSubres);
    this.dstOffset.copy(info.dstOffset);
    this.dstExtent.copy(info.dstExtent);
    return this;
  }

}

exports.TextureBlit = TextureBlit;

class BufferTextureCopy {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(buffStride = 0, buffTexHeight = 0, texOffset = new Offset(), texExtent = new Extent(), texSubres = new TextureSubresLayers()) {
    this.buffStride = buffStride;
    this.buffTexHeight = buffTexHeight;
    this.texOffset = texOffset;
    this.texExtent = texExtent;
    this.texSubres = texSubres;
  }

  copy(info) {
    this.buffStride = info.buffStride;
    this.buffTexHeight = info.buffTexHeight;
    this.texOffset.copy(info.texOffset);
    this.texExtent.copy(info.texExtent);
    this.texSubres.copy(info.texSubres);
    return this;
  }

}

exports.BufferTextureCopy = BufferTextureCopy;

class Viewport {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(left = 0, top = 0, width = 0, height = 0, minDepth = 0, maxDepth = 1) {
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.minDepth = minDepth;
    this.maxDepth = maxDepth;
  }

  copy(info) {
    this.left = info.left;
    this.top = info.top;
    this.width = info.width;
    this.height = info.height;
    this.minDepth = info.minDepth;
    this.maxDepth = info.maxDepth;
    return this;
  }

}

exports.Viewport = Viewport;

class Color {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(x = 0, y = 0, z = 0, w = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  copy(info) {
    this.x = info.x;
    this.y = info.y;
    this.z = info.z;
    this.w = info.w;
    return this;
  }

}

exports.Color = Color;

class BindingMappingInfo {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(bufferOffsets = [], samplerOffsets = [], flexibleSet = 0) {
    this.bufferOffsets = bufferOffsets;
    this.samplerOffsets = samplerOffsets;
    this.flexibleSet = flexibleSet;
  }

  copy(info) {
    this.bufferOffsets = info.bufferOffsets.slice();
    this.samplerOffsets = info.samplerOffsets.slice();
    this.flexibleSet = info.flexibleSet;
    return this;
  }

}

exports.BindingMappingInfo = BindingMappingInfo;

class SwapchainInfo {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(windowHandle = null, vsyncMode = VsyncMode.ON, width = 0, height = 0) {
    this.windowHandle = windowHandle;
    this.vsyncMode = vsyncMode;
    this.width = width;
    this.height = height;
  }

  copy(info) {
    this.windowHandle = info.windowHandle;
    this.vsyncMode = info.vsyncMode;
    this.width = info.width;
    this.height = info.height;
    return this;
  }

}

exports.SwapchainInfo = SwapchainInfo;

class DeviceInfo {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(bindingMappingInfo = new BindingMappingInfo()) {
    this.bindingMappingInfo = bindingMappingInfo;
  }

  copy(info) {
    this.bindingMappingInfo.copy(info.bindingMappingInfo);
    return this;
  }

}

exports.DeviceInfo = DeviceInfo;

class BufferInfo {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(usage = BufferUsageBit.NONE, memUsage = MemoryUsageBit.NONE, size = 0, stride = 1, flags = BufferFlagBit.NONE) {
    this.usage = usage;
    this.memUsage = memUsage;
    this.size = size;
    this.stride = stride;
    this.flags = flags;
  }

  copy(info) {
    this.usage = info.usage;
    this.memUsage = info.memUsage;
    this.size = info.size;
    this.stride = info.stride;
    this.flags = info.flags;
    return this;
  }

}

exports.BufferInfo = BufferInfo;

class BufferViewInfo {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(buffer = null, offset = 0, range = 0) {
    this.buffer = buffer;
    this.offset = offset;
    this.range = range;
  }

  copy(info) {
    this.buffer = info.buffer;
    this.offset = info.offset;
    this.range = info.range;
    return this;
  }

}

exports.BufferViewInfo = BufferViewInfo;

class DrawInfo {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(vertexCount = 0, firstVertex = 0, indexCount = 0, firstIndex = 0, vertexOffset = 0, instanceCount = 0, firstInstance = 0) {
    this.vertexCount = vertexCount;
    this.firstVertex = firstVertex;
    this.indexCount = indexCount;
    this.firstIndex = firstIndex;
    this.vertexOffset = vertexOffset;
    this.instanceCount = instanceCount;
    this.firstInstance = firstInstance;
  }

  copy(info) {
    this.vertexCount = info.vertexCount;
    this.firstVertex = info.firstVertex;
    this.indexCount = info.indexCount;
    this.firstIndex = info.firstIndex;
    this.vertexOffset = info.vertexOffset;
    this.instanceCount = info.instanceCount;
    this.firstInstance = info.firstInstance;
    return this;
  }

}

exports.DrawInfo = DrawInfo;

class DispatchInfo {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(groupCountX = 0, groupCountY = 0, groupCountZ = 0, indirectBuffer = null, indirectOffset = 0) {
    this.groupCountX = groupCountX;
    this.groupCountY = groupCountY;
    this.groupCountZ = groupCountZ;
    this.indirectBuffer = indirectBuffer;
    this.indirectOffset = indirectOffset;
  }

  copy(info) {
    this.groupCountX = info.groupCountX;
    this.groupCountY = info.groupCountY;
    this.groupCountZ = info.groupCountZ;
    this.indirectBuffer = info.indirectBuffer;
    this.indirectOffset = info.indirectOffset;
    return this;
  }

}

exports.DispatchInfo = DispatchInfo;

class IndirectBuffer {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(drawInfos = []) {
    this.drawInfos = drawInfos;
  }

  copy(info) {
    deepCopy(this.drawInfos, info.drawInfos, DrawInfo);
    return this;
  }

}

exports.IndirectBuffer = IndirectBuffer;

class TextureInfo {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(type = TextureType.TEX2D, usage = TextureUsageBit.NONE, format = Format.UNKNOWN, width = 0, height = 0, flags = TextureFlagBit.NONE, layerCount = 1, levelCount = 1, samples = SampleCount.ONE, depth = 1, externalRes = 0) {
    this.type = type;
    this.usage = usage;
    this.format = format;
    this.width = width;
    this.height = height;
    this.flags = flags;
    this.layerCount = layerCount;
    this.levelCount = levelCount;
    this.samples = samples;
    this.depth = depth;
    this.externalRes = externalRes;
  }

  copy(info) {
    this.type = info.type;
    this.usage = info.usage;
    this.format = info.format;
    this.width = info.width;
    this.height = info.height;
    this.flags = info.flags;
    this.layerCount = info.layerCount;
    this.levelCount = info.levelCount;
    this.samples = info.samples;
    this.depth = info.depth;
    this.externalRes = info.externalRes;
    return this;
  }

}

exports.TextureInfo = TextureInfo;

class TextureViewInfo {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(texture = null, type = TextureType.TEX2D, format = Format.UNKNOWN, baseLevel = 0, levelCount = 1, baseLayer = 0, layerCount = 1) {
    this.texture = texture;
    this.type = type;
    this.format = format;
    this.baseLevel = baseLevel;
    this.levelCount = levelCount;
    this.baseLayer = baseLayer;
    this.layerCount = layerCount;
  }

  copy(info) {
    this.texture = info.texture;
    this.type = info.type;
    this.format = info.format;
    this.baseLevel = info.baseLevel;
    this.levelCount = info.levelCount;
    this.baseLayer = info.baseLayer;
    this.layerCount = info.layerCount;
    return this;
  }

}

exports.TextureViewInfo = TextureViewInfo;

class SamplerInfo {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(minFilter = Filter.LINEAR, magFilter = Filter.LINEAR, mipFilter = Filter.NONE, addressU = Address.WRAP, addressV = Address.WRAP, addressW = Address.WRAP, maxAnisotropy = 0, cmpFunc = ComparisonFunc.ALWAYS) {
    this.minFilter = minFilter;
    this.magFilter = magFilter;
    this.mipFilter = mipFilter;
    this.addressU = addressU;
    this.addressV = addressV;
    this.addressW = addressW;
    this.maxAnisotropy = maxAnisotropy;
    this.cmpFunc = cmpFunc;
  }

  copy(info) {
    this.minFilter = info.minFilter;
    this.magFilter = info.magFilter;
    this.mipFilter = info.mipFilter;
    this.addressU = info.addressU;
    this.addressV = info.addressV;
    this.addressW = info.addressW;
    this.maxAnisotropy = info.maxAnisotropy;
    this.cmpFunc = info.cmpFunc;
    return this;
  }

}

exports.SamplerInfo = SamplerInfo;

class Uniform {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(name = '', type = Type.UNKNOWN, count = 0) {
    this.name = name;
    this.type = type;
    this.count = count;
  }

  copy(info) {
    this.name = info.name;
    this.type = info.type;
    this.count = info.count;
    return this;
  }

}

exports.Uniform = Uniform;

class UniformBlock {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(set = 0, binding = 0, name = '', members = [], count = 0) {
    this.set = set;
    this.binding = binding;
    this.name = name;
    this.members = members;
    this.count = count;
  }

  copy(info) {
    this.set = info.set;
    this.binding = info.binding;
    this.name = info.name;
    deepCopy(this.members, info.members, Uniform);
    this.count = info.count;
    return this;
  }

}

exports.UniformBlock = UniformBlock;

class UniformSamplerTexture {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(set = 0, binding = 0, name = '', type = Type.UNKNOWN, count = 0) {
    this.set = set;
    this.binding = binding;
    this.name = name;
    this.type = type;
    this.count = count;
  }

  copy(info) {
    this.set = info.set;
    this.binding = info.binding;
    this.name = info.name;
    this.type = info.type;
    this.count = info.count;
    return this;
  }

}

exports.UniformSamplerTexture = UniformSamplerTexture;

class UniformSampler {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(set = 0, binding = 0, name = '', count = 0) {
    this.set = set;
    this.binding = binding;
    this.name = name;
    this.count = count;
  }

  copy(info) {
    this.set = info.set;
    this.binding = info.binding;
    this.name = info.name;
    this.count = info.count;
    return this;
  }

}

exports.UniformSampler = UniformSampler;

class UniformTexture {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(set = 0, binding = 0, name = '', type = Type.UNKNOWN, count = 0) {
    this.set = set;
    this.binding = binding;
    this.name = name;
    this.type = type;
    this.count = count;
  }

  copy(info) {
    this.set = info.set;
    this.binding = info.binding;
    this.name = info.name;
    this.type = info.type;
    this.count = info.count;
    return this;
  }

}

exports.UniformTexture = UniformTexture;

class UniformStorageImage {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(set = 0, binding = 0, name = '', type = Type.UNKNOWN, count = 0, memoryAccess = MemoryAccessBit.READ_WRITE) {
    this.set = set;
    this.binding = binding;
    this.name = name;
    this.type = type;
    this.count = count;
    this.memoryAccess = memoryAccess;
  }

  copy(info) {
    this.set = info.set;
    this.binding = info.binding;
    this.name = info.name;
    this.type = info.type;
    this.count = info.count;
    this.memoryAccess = info.memoryAccess;
    return this;
  }

}

exports.UniformStorageImage = UniformStorageImage;

class UniformStorageBuffer {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(set = 0, binding = 0, name = '', count = 0, memoryAccess = MemoryAccessBit.READ_WRITE) {
    this.set = set;
    this.binding = binding;
    this.name = name;
    this.count = count;
    this.memoryAccess = memoryAccess;
  }

  copy(info) {
    this.set = info.set;
    this.binding = info.binding;
    this.name = info.name;
    this.count = info.count;
    this.memoryAccess = info.memoryAccess;
    return this;
  }

}

exports.UniformStorageBuffer = UniformStorageBuffer;

class UniformInputAttachment {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(set = 0, binding = 0, name = '', count = 0) {
    this.set = set;
    this.binding = binding;
    this.name = name;
    this.count = count;
  }

  copy(info) {
    this.set = info.set;
    this.binding = info.binding;
    this.name = info.name;
    this.count = info.count;
    return this;
  }

}

exports.UniformInputAttachment = UniformInputAttachment;

class ShaderStage {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(stage = ShaderStageFlagBit.NONE, source = '') {
    this.stage = stage;
    this.source = source;
  }

  copy(info) {
    this.stage = info.stage;
    this.source = info.source;
    return this;
  }

}

exports.ShaderStage = ShaderStage;

class Attribute {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(name = '', format = Format.UNKNOWN, isNormalized = false, stream = 0, isInstanced = false, location = 0) {
    this.name = name;
    this.format = format;
    this.isNormalized = isNormalized;
    this.stream = stream;
    this.isInstanced = isInstanced;
    this.location = location;
  }

  copy(info) {
    this.name = info.name;
    this.format = info.format;
    this.isNormalized = info.isNormalized;
    this.stream = info.stream;
    this.isInstanced = info.isInstanced;
    this.location = info.location;
    return this;
  }

}

exports.Attribute = Attribute;

class ShaderInfo {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(name = '', stages = [], attributes = [], blocks = [], buffers = [], samplerTextures = [], samplers = [], textures = [], images = [], subpassInputs = []) {
    this.name = name;
    this.stages = stages;
    this.attributes = attributes;
    this.blocks = blocks;
    this.buffers = buffers;
    this.samplerTextures = samplerTextures;
    this.samplers = samplers;
    this.textures = textures;
    this.images = images;
    this.subpassInputs = subpassInputs;
  }

  copy(info) {
    this.name = info.name;
    deepCopy(this.stages, info.stages, ShaderStage);
    deepCopy(this.attributes, info.attributes, Attribute);
    deepCopy(this.blocks, info.blocks, UniformBlock);
    deepCopy(this.buffers, info.buffers, UniformStorageBuffer);
    deepCopy(this.samplerTextures, info.samplerTextures, UniformSamplerTexture);
    deepCopy(this.samplers, info.samplers, UniformSampler);
    deepCopy(this.textures, info.textures, UniformTexture);
    deepCopy(this.images, info.images, UniformStorageImage);
    deepCopy(this.subpassInputs, info.subpassInputs, UniformInputAttachment);
    return this;
  }

}

exports.ShaderInfo = ShaderInfo;

class InputAssemblerInfo {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(attributes = [], vertexBuffers = [], indexBuffer = null, indirectBuffer = null) {
    this.attributes = attributes;
    this.vertexBuffers = vertexBuffers;
    this.indexBuffer = indexBuffer;
    this.indirectBuffer = indirectBuffer;
  }

  copy(info) {
    deepCopy(this.attributes, info.attributes, Attribute);
    this.vertexBuffers = info.vertexBuffers.slice();
    this.indexBuffer = info.indexBuffer;
    this.indirectBuffer = info.indirectBuffer;
    return this;
  }

}

exports.InputAssemblerInfo = InputAssemblerInfo;

class ColorAttachment {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(format = Format.UNKNOWN, sampleCount = SampleCount.ONE, loadOp = LoadOp.CLEAR, storeOp = StoreOp.STORE, beginAccesses = [], endAccesses = [AccessType.COLOR_ATTACHMENT_WRITE], isGeneralLayout = false) {
    this.format = format;
    this.sampleCount = sampleCount;
    this.loadOp = loadOp;
    this.storeOp = storeOp;
    this.beginAccesses = beginAccesses;
    this.endAccesses = endAccesses;
    this.isGeneralLayout = isGeneralLayout;
  }

  copy(info) {
    this.format = info.format;
    this.sampleCount = info.sampleCount;
    this.loadOp = info.loadOp;
    this.storeOp = info.storeOp;
    this.beginAccesses = info.beginAccesses.slice();
    this.endAccesses = info.endAccesses.slice();
    this.isGeneralLayout = info.isGeneralLayout;
    return this;
  }

}

exports.ColorAttachment = ColorAttachment;

class DepthStencilAttachment {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(format = Format.UNKNOWN, sampleCount = SampleCount.ONE, depthLoadOp = LoadOp.CLEAR, depthStoreOp = StoreOp.STORE, stencilLoadOp = LoadOp.CLEAR, stencilStoreOp = StoreOp.STORE, beginAccesses = [], endAccesses = [AccessType.DEPTH_STENCIL_ATTACHMENT_WRITE], isGeneralLayout = false) {
    this.format = format;
    this.sampleCount = sampleCount;
    this.depthLoadOp = depthLoadOp;
    this.depthStoreOp = depthStoreOp;
    this.stencilLoadOp = stencilLoadOp;
    this.stencilStoreOp = stencilStoreOp;
    this.beginAccesses = beginAccesses;
    this.endAccesses = endAccesses;
    this.isGeneralLayout = isGeneralLayout;
  }

  copy(info) {
    this.format = info.format;
    this.sampleCount = info.sampleCount;
    this.depthLoadOp = info.depthLoadOp;
    this.depthStoreOp = info.depthStoreOp;
    this.stencilLoadOp = info.stencilLoadOp;
    this.stencilStoreOp = info.stencilStoreOp;
    this.beginAccesses = info.beginAccesses.slice();
    this.endAccesses = info.endAccesses.slice();
    this.isGeneralLayout = info.isGeneralLayout;
    return this;
  }

}

exports.DepthStencilAttachment = DepthStencilAttachment;

class SubpassInfo {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(inputs = [], colors = [], resolves = [], preserves = [], depthStencil = -1, depthStencilResolve = -1, depthResolveMode = ResolveMode.NONE, stencilResolveMode = ResolveMode.NONE) {
    this.inputs = inputs;
    this.colors = colors;
    this.resolves = resolves;
    this.preserves = preserves;
    this.depthStencil = depthStencil;
    this.depthStencilResolve = depthStencilResolve;
    this.depthResolveMode = depthResolveMode;
    this.stencilResolveMode = stencilResolveMode;
  }

  copy(info) {
    this.inputs = info.inputs.slice();
    this.colors = info.colors.slice();
    this.resolves = info.resolves.slice();
    this.preserves = info.preserves.slice();
    this.depthStencil = info.depthStencil;
    this.depthStencilResolve = info.depthStencilResolve;
    this.depthResolveMode = info.depthResolveMode;
    this.stencilResolveMode = info.stencilResolveMode;
    return this;
  }

}

exports.SubpassInfo = SubpassInfo;

class SubpassDependency {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(srcSubpass = 0, dstSubpass = 0, srcAccesses = [], dstAccesses = []) {
    this.srcSubpass = srcSubpass;
    this.dstSubpass = dstSubpass;
    this.srcAccesses = srcAccesses;
    this.dstAccesses = dstAccesses;
  }

  copy(info) {
    this.srcSubpass = info.srcSubpass;
    this.dstSubpass = info.dstSubpass;
    this.srcAccesses = info.srcAccesses.slice();
    this.dstAccesses = info.dstAccesses.slice();
    return this;
  }

}

exports.SubpassDependency = SubpassDependency;

class RenderPassInfo {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(colorAttachments = [], depthStencilAttachment = new DepthStencilAttachment(), subpasses = [], dependencies = []) {
    this.colorAttachments = colorAttachments;
    this.depthStencilAttachment = depthStencilAttachment;
    this.subpasses = subpasses;
    this.dependencies = dependencies;
  }

  copy(info) {
    deepCopy(this.colorAttachments, info.colorAttachments, ColorAttachment);
    this.depthStencilAttachment.copy(info.depthStencilAttachment);
    deepCopy(this.subpasses, info.subpasses, SubpassInfo);
    deepCopy(this.dependencies, info.dependencies, SubpassDependency);
    return this;
  }

}

exports.RenderPassInfo = RenderPassInfo;

class GlobalBarrierInfo {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(prevAccesses = [], nextAccesses = []) {
    this.prevAccesses = prevAccesses;
    this.nextAccesses = nextAccesses;
  }

  copy(info) {
    this.prevAccesses = info.prevAccesses.slice();
    this.nextAccesses = info.nextAccesses.slice();
    return this;
  }

}

exports.GlobalBarrierInfo = GlobalBarrierInfo;

class TextureBarrierInfo {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(prevAccesses = [], nextAccesses = [], discardContents = false, srcQueue = null, dstQueue = null) {
    this.prevAccesses = prevAccesses;
    this.nextAccesses = nextAccesses;
    this.discardContents = discardContents;
    this.srcQueue = srcQueue;
    this.dstQueue = dstQueue;
  }

  copy(info) {
    this.prevAccesses = info.prevAccesses.slice();
    this.nextAccesses = info.nextAccesses.slice();
    this.discardContents = info.discardContents;
    this.srcQueue = info.srcQueue;
    this.dstQueue = info.dstQueue;
    return this;
  }

}

exports.TextureBarrierInfo = TextureBarrierInfo;

class FramebufferInfo {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(renderPass = null, colorTextures = [], depthStencilTexture = null) {
    this.renderPass = renderPass;
    this.colorTextures = colorTextures;
    this.depthStencilTexture = depthStencilTexture;
  }

  copy(info) {
    this.renderPass = info.renderPass;
    this.colorTextures = info.colorTextures.slice();
    this.depthStencilTexture = info.depthStencilTexture;
    return this;
  }

}

exports.FramebufferInfo = FramebufferInfo;

class DescriptorSetLayoutBinding {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(binding = -1, descriptorType = DescriptorType.UNKNOWN, count = 0, stageFlags = ShaderStageFlagBit.NONE, immutableSamplers = []) {
    this.binding = binding;
    this.descriptorType = descriptorType;
    this.count = count;
    this.stageFlags = stageFlags;
    this.immutableSamplers = immutableSamplers;
  }

  copy(info) {
    this.binding = info.binding;
    this.descriptorType = info.descriptorType;
    this.count = info.count;
    this.stageFlags = info.stageFlags;
    this.immutableSamplers = info.immutableSamplers.slice();
    return this;
  }

}

exports.DescriptorSetLayoutBinding = DescriptorSetLayoutBinding;

class DescriptorSetLayoutInfo {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(bindings = []) {
    this.bindings = bindings;
  }

  copy(info) {
    deepCopy(this.bindings, info.bindings, DescriptorSetLayoutBinding);
    return this;
  }

}

exports.DescriptorSetLayoutInfo = DescriptorSetLayoutInfo;

class DescriptorSetInfo {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(layout = null) {
    this.layout = layout;
  }

  copy(info) {
    this.layout = info.layout;
    return this;
  }

}

exports.DescriptorSetInfo = DescriptorSetInfo;

class PipelineLayoutInfo {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(setLayouts = []) {
    this.setLayouts = setLayouts;
  }

  copy(info) {
    this.setLayouts = info.setLayouts.slice();
    return this;
  }

}

exports.PipelineLayoutInfo = PipelineLayoutInfo;

class InputState {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(attributes = []) {
    this.attributes = attributes;
  }

  copy(info) {
    deepCopy(this.attributes, info.attributes, Attribute);
    return this;
  }

}

exports.InputState = InputState;

class CommandBufferInfo {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(queue = null, type = CommandBufferType.PRIMARY) {
    this.queue = queue;
    this.type = type;
  }

  copy(info) {
    this.queue = info.queue;
    this.type = info.type;
    return this;
  }

}

exports.CommandBufferInfo = CommandBufferInfo;

class QueueInfo {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(type = QueueType.GRAPHICS) {
    this.type = type;
  }

  copy(info) {
    this.type = info.type;
    return this;
  }

}

exports.QueueInfo = QueueInfo;

class QueryPoolInfo {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(type = QueryType.OCCLUSION, maxQueryObjects = 65536, forceWait = true) {
    this.type = type;
    this.maxQueryObjects = maxQueryObjects;
    this.forceWait = forceWait;
  }

  copy(info) {
    this.type = info.type;
    this.maxQueryObjects = info.maxQueryObjects;
    this.forceWait = info.forceWait;
    return this;
  }

}

exports.QueryPoolInfo = QueryPoolInfo;

class FormatInfo {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(name = '', size = 0, count = 0, type = FormatType.NONE, hasAlpha = false, hasDepth = false, hasStencil = false, isCompressed = false) {
    this.name = name;
    this.size = size;
    this.count = count;
    this.type = type;
    this.hasAlpha = hasAlpha;
    this.hasDepth = hasDepth;
    this.hasStencil = hasStencil;
    this.isCompressed = isCompressed;
  }

}

exports.FormatInfo = FormatInfo;

class MemoryStatus {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(bufferSize = 0, textureSize = 0) {
    this.bufferSize = bufferSize;
    this.textureSize = textureSize;
  }

  copy(info) {
    this.bufferSize = info.bufferSize;
    this.textureSize = info.textureSize;
    return this;
  }

}

exports.MemoryStatus = MemoryStatus;

class DynamicStencilStates {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(writeMask = 0, compareMask = 0, reference = 0) {
    this.writeMask = writeMask;
    this.compareMask = compareMask;
    this.reference = reference;
  }

  copy(info) {
    this.writeMask = info.writeMask;
    this.compareMask = info.compareMask;
    this.reference = info.reference;
    return this;
  }

}

exports.DynamicStencilStates = DynamicStencilStates;

class DynamicStates {
  // to make sure all usages must be an instance of this exact class, not assembled from plain object
  constructor(viewport = new Viewport(), scissor = new Rect(), blendConstant = new Color(), lineWidth = 1, depthBiasConstant = 0, depthBiasClamp = 0, depthBiasSlope = 0, depthMinBounds = 0, depthMaxBounds = 0, stencilStatesFront = new DynamicStencilStates(), stencilStatesBack = new DynamicStencilStates()) {
    this.viewport = viewport;
    this.scissor = scissor;
    this.blendConstant = blendConstant;
    this.lineWidth = lineWidth;
    this.depthBiasConstant = depthBiasConstant;
    this.depthBiasClamp = depthBiasClamp;
    this.depthBiasSlope = depthBiasSlope;
    this.depthMinBounds = depthMinBounds;
    this.depthMaxBounds = depthMaxBounds;
    this.stencilStatesFront = stencilStatesFront;
    this.stencilStatesBack = stencilStatesBack;
  }

  copy(info) {
    this.viewport.copy(info.viewport);
    this.scissor.copy(info.scissor);
    this.blendConstant.copy(info.blendConstant);
    this.lineWidth = info.lineWidth;
    this.depthBiasConstant = info.depthBiasConstant;
    this.depthBiasClamp = info.depthBiasClamp;
    this.depthBiasSlope = info.depthBiasSlope;
    this.depthMinBounds = info.depthMinBounds;
    this.depthMaxBounds = info.depthMaxBounds;
    this.stencilStatesFront.copy(info.stencilStatesFront);
    this.stencilStatesBack.copy(info.stencilStatesBack);
    return this;
  }

}
/**
 * ========================= !DO NOT CHANGE THE ABOVE SECTION MANUALLY! =========================
 * The above section is auto-generated from engine-native/cocos/renderer/core/gfx/GFXDef-common.h
 * by the script engine-native/tools/gfx-define-generator/generate.js.
 * Changes to these public interfaces should be made there first and synced back.
 * ========================= !DO NOT CHANGE THE ABOVE SECTION MANUALLY! =========================
 */

/**
 * @en GFX base object.
 * @zh GFX 基类对象。
 */


exports.DynamicStates = DynamicStates;

class GFXObject {
  get objectType() {
    return this._objectType;
  }

  get objectID() {
    return this._objectID;
  }

  get typedID() {
    return this._typedID;
  }

  constructor(objectType) {
    this._objectType = ObjectType.UNKNOWN;
    this._objectID = 0;
    this._typedID = 0;
    this._objectType = objectType;
    this._objectID = GFXObject._idTable[ObjectType.UNKNOWN]++;
    this._typedID = GFXObject._idTable[objectType]++;
  }

}

exports.GFXObject = GFXObject;
GFXObject._idTable = Array(ObjectType.COUNT).fill(1 << 16);
let AttributeName;
exports.AttributeName = AttributeName;

(function (AttributeName) {
  AttributeName["ATTR_POSITION"] = "a_position";
  AttributeName["ATTR_NORMAL"] = "a_normal";
  AttributeName["ATTR_TANGENT"] = "a_tangent";
  AttributeName["ATTR_BITANGENT"] = "a_bitangent";
  AttributeName["ATTR_WEIGHTS"] = "a_weights";
  AttributeName["ATTR_JOINTS"] = "a_joints";
  AttributeName["ATTR_COLOR"] = "a_color";
  AttributeName["ATTR_COLOR1"] = "a_color1";
  AttributeName["ATTR_COLOR2"] = "a_color2";
  AttributeName["ATTR_TEX_COORD"] = "a_texCoord";
  AttributeName["ATTR_TEX_COORD1"] = "a_texCoord1";
  AttributeName["ATTR_TEX_COORD2"] = "a_texCoord2";
  AttributeName["ATTR_TEX_COORD3"] = "a_texCoord3";
  AttributeName["ATTR_TEX_COORD4"] = "a_texCoord4";
  AttributeName["ATTR_TEX_COORD5"] = "a_texCoord5";
  AttributeName["ATTR_TEX_COORD6"] = "a_texCoord6";
  AttributeName["ATTR_TEX_COORD7"] = "a_texCoord7";
  AttributeName["ATTR_TEX_COORD8"] = "a_texCoord8";
  AttributeName["ATTR_BATCH_ID"] = "a_batch_id";
  AttributeName["ATTR_BATCH_UV"] = "a_batch_uv";
})(AttributeName || (exports.AttributeName = AttributeName = {}));

const FormatInfos = Object.freeze([new FormatInfo('UNKNOWN', 0, 0, FormatType.NONE, false, false, false, false), new FormatInfo('A8', 1, 1, FormatType.UNORM, true, false, false, false), new FormatInfo('L8', 1, 1, FormatType.UNORM, false, false, false, false), new FormatInfo('LA8', 1, 2, FormatType.UNORM, true, false, false, false), new FormatInfo('R8', 1, 1, FormatType.UNORM, false, false, false, false), new FormatInfo('R8SN', 1, 1, FormatType.SNORM, false, false, false, false), new FormatInfo('R8UI', 1, 1, FormatType.UINT, false, false, false, false), new FormatInfo('R8I', 1, 1, FormatType.INT, false, false, false, false), new FormatInfo('R16F', 2, 1, FormatType.FLOAT, false, false, false, false), new FormatInfo('R16UI', 2, 1, FormatType.UINT, false, false, false, false), new FormatInfo('R16I', 2, 1, FormatType.INT, false, false, false, false), new FormatInfo('R32F', 4, 1, FormatType.FLOAT, false, false, false, false), new FormatInfo('R32UI', 4, 1, FormatType.UINT, false, false, false, false), new FormatInfo('R32I', 4, 1, FormatType.INT, false, false, false, false), new FormatInfo('RG8', 2, 2, FormatType.UNORM, false, false, false, false), new FormatInfo('RG8SN', 2, 2, FormatType.SNORM, false, false, false, false), new FormatInfo('RG8UI', 2, 2, FormatType.UINT, false, false, false, false), new FormatInfo('RG8I', 2, 2, FormatType.INT, false, false, false, false), new FormatInfo('RG16F', 4, 2, FormatType.FLOAT, false, false, false, false), new FormatInfo('RG16UI', 4, 2, FormatType.UINT, false, false, false, false), new FormatInfo('RG16I', 4, 2, FormatType.INT, false, false, false, false), new FormatInfo('RG32F', 8, 2, FormatType.FLOAT, false, false, false, false), new FormatInfo('RG32UI', 8, 2, FormatType.UINT, false, false, false, false), new FormatInfo('RG32I', 8, 2, FormatType.INT, false, false, false, false), new FormatInfo('RGB8', 3, 3, FormatType.UNORM, false, false, false, false), new FormatInfo('SRGB8', 3, 3, FormatType.UNORM, false, false, false, false), new FormatInfo('RGB8SN', 3, 3, FormatType.SNORM, false, false, false, false), new FormatInfo('RGB8UI', 3, 3, FormatType.UINT, false, false, false, false), new FormatInfo('RGB8I', 3, 3, FormatType.INT, false, false, false, false), new FormatInfo('RGB16F', 6, 3, FormatType.FLOAT, false, false, false, false), new FormatInfo('RGB16UI', 6, 3, FormatType.UINT, false, false, false, false), new FormatInfo('RGB16I', 6, 3, FormatType.INT, false, false, false, false), new FormatInfo('RGB32F', 12, 3, FormatType.FLOAT, false, false, false, false), new FormatInfo('RGB32UI', 12, 3, FormatType.UINT, false, false, false, false), new FormatInfo('RGB32I', 12, 3, FormatType.INT, false, false, false, false), new FormatInfo('RGBA8', 4, 4, FormatType.UNORM, true, false, false, false), new FormatInfo('BGRA8', 4, 4, FormatType.UNORM, true, false, false, false), new FormatInfo('SRGB8_A8', 4, 4, FormatType.UNORM, true, false, false, false), new FormatInfo('RGBA8SN', 4, 4, FormatType.SNORM, true, false, false, false), new FormatInfo('RGBA8UI', 4, 4, FormatType.UINT, true, false, false, false), new FormatInfo('RGBA8I', 4, 4, FormatType.INT, true, false, false, false), new FormatInfo('RGBA16F', 8, 4, FormatType.FLOAT, true, false, false, false), new FormatInfo('RGBA16UI', 8, 4, FormatType.UINT, true, false, false, false), new FormatInfo('RGBA16I', 8, 4, FormatType.INT, true, false, false, false), new FormatInfo('RGBA32F', 16, 4, FormatType.FLOAT, true, false, false, false), new FormatInfo('RGBA32UI', 16, 4, FormatType.UINT, true, false, false, false), new FormatInfo('RGBA32I', 16, 4, FormatType.INT, true, false, false, false), new FormatInfo('R5G6B5', 2, 3, FormatType.UNORM, false, false, false, false), new FormatInfo('R11G11B10F', 4, 3, FormatType.FLOAT, false, false, false, false), new FormatInfo('RGB5A1', 2, 4, FormatType.UNORM, true, false, false, false), new FormatInfo('RGBA4', 2, 4, FormatType.UNORM, true, false, false, false), new FormatInfo('RGB10A2', 2, 4, FormatType.UNORM, true, false, false, false), new FormatInfo('RGB10A2UI', 2, 4, FormatType.UINT, true, false, false, false), new FormatInfo('RGB9E5', 2, 4, FormatType.FLOAT, true, false, false, false), new FormatInfo('DEPTH', 4, 1, FormatType.FLOAT, false, true, false, false), new FormatInfo('DEPTH_STENCIL', 5, 2, FormatType.FLOAT, false, true, true, false), new FormatInfo('BC1', 1, 3, FormatType.UNORM, false, false, false, true), new FormatInfo('BC1_ALPHA', 1, 4, FormatType.UNORM, true, false, false, true), new FormatInfo('BC1_SRGB', 1, 3, FormatType.UNORM, false, false, false, true), new FormatInfo('BC1_SRGB_ALPHA', 1, 4, FormatType.UNORM, true, false, false, true), new FormatInfo('BC2', 1, 4, FormatType.UNORM, true, false, false, true), new FormatInfo('BC2_SRGB', 1, 4, FormatType.UNORM, true, false, false, true), new FormatInfo('BC3', 1, 4, FormatType.UNORM, true, false, false, true), new FormatInfo('BC3_SRGB', 1, 4, FormatType.UNORM, true, false, false, true), new FormatInfo('BC4', 1, 1, FormatType.UNORM, false, false, false, true), new FormatInfo('BC4_SNORM', 1, 1, FormatType.SNORM, false, false, false, true), new FormatInfo('BC5', 1, 2, FormatType.UNORM, false, false, false, true), new FormatInfo('BC5_SNORM', 1, 2, FormatType.SNORM, false, false, false, true), new FormatInfo('BC6H_UF16', 1, 3, FormatType.UFLOAT, false, false, false, true), new FormatInfo('BC6H_SF16', 1, 3, FormatType.FLOAT, false, false, false, true), new FormatInfo('BC7', 1, 4, FormatType.UNORM, true, false, false, true), new FormatInfo('BC7_SRGB', 1, 4, FormatType.UNORM, true, false, false, true), new FormatInfo('ETC_RGB8', 1, 3, FormatType.UNORM, false, false, false, true), new FormatInfo('ETC2_RGB8', 1, 3, FormatType.UNORM, false, false, false, true), new FormatInfo('ETC2_SRGB8', 1, 3, FormatType.UNORM, false, false, false, true), new FormatInfo('ETC2_RGB8_A1', 1, 4, FormatType.UNORM, true, false, false, true), new FormatInfo('ETC2_SRGB8_A1', 1, 4, FormatType.UNORM, true, false, false, true), new FormatInfo('ETC2_RGBA8', 2, 4, FormatType.UNORM, true, false, false, true), new FormatInfo('ETC2_SRGB8_A8', 2, 4, FormatType.UNORM, true, false, false, true), new FormatInfo('EAC_R11', 1, 1, FormatType.UNORM, false, false, false, true), new FormatInfo('EAC_R11SN', 1, 1, FormatType.SNORM, false, false, false, true), new FormatInfo('EAC_RG11', 2, 2, FormatType.UNORM, false, false, false, true), new FormatInfo('EAC_RG11SN', 2, 2, FormatType.SNORM, false, false, false, true), new FormatInfo('PVRTC_RGB2', 2, 3, FormatType.UNORM, false, false, false, true), new FormatInfo('PVRTC_RGBA2', 2, 4, FormatType.UNORM, true, false, false, true), new FormatInfo('PVRTC_RGB4', 2, 3, FormatType.UNORM, false, false, false, true), new FormatInfo('PVRTC_RGBA4', 2, 4, FormatType.UNORM, true, false, false, true), new FormatInfo('PVRTC2_2BPP', 2, 4, FormatType.UNORM, true, false, false, true), new FormatInfo('PVRTC2_4BPP', 2, 4, FormatType.UNORM, true, false, false, true), new FormatInfo('ASTC_RGBA_4x4', 1, 4, FormatType.UNORM, true, false, false, true), new FormatInfo('ASTC_RGBA_5x4', 1, 4, FormatType.UNORM, true, false, false, true), new FormatInfo('ASTC_RGBA_5x5', 1, 4, FormatType.UNORM, true, false, false, true), new FormatInfo('ASTC_RGBA_6x5', 1, 4, FormatType.UNORM, true, false, false, true), new FormatInfo('ASTC_RGBA_6x6', 1, 4, FormatType.UNORM, true, false, false, true), new FormatInfo('ASTC_RGBA_8x5', 1, 4, FormatType.UNORM, true, false, false, true), new FormatInfo('ASTC_RGBA_8x6', 1, 4, FormatType.UNORM, true, false, false, true), new FormatInfo('ASTC_RGBA_8x8', 1, 4, FormatType.UNORM, true, false, false, true), new FormatInfo('ASTC_RGBA_10x5', 1, 4, FormatType.UNORM, true, false, false, true), new FormatInfo('ASTC_RGBA_10x6', 1, 4, FormatType.UNORM, true, false, false, true), new FormatInfo('ASTC_RGBA_10x8', 1, 4, FormatType.UNORM, true, false, false, true), new FormatInfo('ASTC_RGBA_10x10', 1, 4, FormatType.UNORM, true, false, false, true), new FormatInfo('ASTC_RGBA_12x10', 1, 4, FormatType.UNORM, true, false, false, true), new FormatInfo('ASTC_RGBA_12x12', 1, 4, FormatType.UNORM, true, false, false, true), new FormatInfo('ASTC_SRGBA_4x4', 1, 4, FormatType.UNORM, true, false, false, true), new FormatInfo('ASTC_SRGBA_5x4', 1, 4, FormatType.UNORM, true, false, false, true), new FormatInfo('ASTC_SRGBA_5x5', 1, 4, FormatType.UNORM, true, false, false, true), new FormatInfo('ASTC_SRGBA_6x5', 1, 4, FormatType.UNORM, true, false, false, true), new FormatInfo('ASTC_SRGBA_6x6', 1, 4, FormatType.UNORM, true, false, false, true), new FormatInfo('ASTC_SRGBA_8x5', 1, 4, FormatType.UNORM, true, false, false, true), new FormatInfo('ASTC_SRGBA_8x6', 1, 4, FormatType.UNORM, true, false, false, true), new FormatInfo('ASTC_SRGBA_8x8', 1, 4, FormatType.UNORM, true, false, false, true), new FormatInfo('ASTC_SRGBA_10x5', 1, 4, FormatType.UNORM, true, false, false, true), new FormatInfo('ASTC_SRGBA_10x6', 1, 4, FormatType.UNORM, true, false, false, true), new FormatInfo('ASTC_SRGBA_10x8', 1, 4, FormatType.UNORM, true, false, false, true), new FormatInfo('ASTC_SRGBA_10x10', 1, 4, FormatType.UNORM, true, false, false, true), new FormatInfo('ASTC_SRGBA_12x10', 1, 4, FormatType.UNORM, true, false, false, true), new FormatInfo('ASTC_SRGBA_12x12', 1, 4, FormatType.UNORM, true, false, false, true)]);
exports.FormatInfos = FormatInfos;
const DESCRIPTOR_BUFFER_TYPE = DescriptorType.UNIFORM_BUFFER | DescriptorType.DYNAMIC_UNIFORM_BUFFER | DescriptorType.STORAGE_BUFFER | DescriptorType.DYNAMIC_STORAGE_BUFFER;
exports.DESCRIPTOR_BUFFER_TYPE = DESCRIPTOR_BUFFER_TYPE;
const DESCRIPTOR_SAMPLER_TYPE = DescriptorType.SAMPLER_TEXTURE | DescriptorType.SAMPLER | DescriptorType.TEXTURE | DescriptorType.STORAGE_IMAGE | DescriptorType.INPUT_ATTACHMENT;
exports.DESCRIPTOR_SAMPLER_TYPE = DESCRIPTOR_SAMPLER_TYPE;
const DESCRIPTOR_DYNAMIC_TYPE = DescriptorType.DYNAMIC_STORAGE_BUFFER | DescriptorType.DYNAMIC_UNIFORM_BUFFER;
exports.DESCRIPTOR_DYNAMIC_TYPE = DESCRIPTOR_DYNAMIC_TYPE;
const DRAW_INFO_SIZE = 28;
exports.DRAW_INFO_SIZE = DRAW_INFO_SIZE;

function IsPowerOf2(x) {
  return x > 0 && (x & x - 1) === 0;
}
/**
 * @en Get memory size of the specified fomat.
 * @zh 获取指定格式对应的内存大小。
 * @param format The target format.
 * @param width The target width.
 * @param height The target height.
 * @param depth The target depth.
 */


function FormatSize(format, width, height, depth) {
  if (!FormatInfos[format].isCompressed) {
    return width * height * depth * FormatInfos[format].size;
  } else {
    switch (format) {
      case Format.BC1:
      case Format.BC1_ALPHA:
      case Format.BC1_SRGB:
      case Format.BC1_SRGB_ALPHA:
        return Math.ceil(width / 4) * Math.ceil(height / 4) * 8 * depth;

      case Format.BC2:
      case Format.BC2_SRGB:
      case Format.BC3:
      case Format.BC3_SRGB:
      case Format.BC4:
      case Format.BC4_SNORM:
      case Format.BC6H_SF16:
      case Format.BC6H_UF16:
      case Format.BC7:
      case Format.BC7_SRGB:
        return Math.ceil(width / 4) * Math.ceil(height / 4) * 16 * depth;

      case Format.BC5:
      case Format.BC5_SNORM:
        return Math.ceil(width / 4) * Math.ceil(height / 4) * 32 * depth;

      case Format.ETC_RGB8:
      case Format.ETC2_RGB8:
      case Format.ETC2_SRGB8:
      case Format.ETC2_RGB8_A1:
      case Format.EAC_R11:
      case Format.EAC_R11SN:
        return Math.ceil(width / 4) * Math.ceil(height / 4) * 8 * depth;

      case Format.ETC2_RGBA8:
      case Format.ETC2_SRGB8_A1:
      case Format.EAC_RG11:
      case Format.EAC_RG11SN:
        return Math.ceil(width / 4) * Math.ceil(height / 4) * 16 * depth;

      case Format.PVRTC_RGB2:
      case Format.PVRTC_RGBA2:
      case Format.PVRTC2_2BPP:
        return Math.ceil(Math.max(width, 16) * Math.max(height, 8) / 4) * depth;

      case Format.PVRTC_RGB4:
      case Format.PVRTC_RGBA4:
      case Format.PVRTC2_4BPP:
        return Math.ceil(Math.max(width, 8) * Math.max(height, 8) / 2) * depth;

      case Format.ASTC_RGBA_4X4:
      case Format.ASTC_SRGBA_4X4:
        return Math.ceil(width / 4) * Math.ceil(height / 4) * 16 * depth;

      case Format.ASTC_RGBA_5X4:
      case Format.ASTC_SRGBA_5X4:
        return Math.ceil(width / 5) * Math.ceil(height / 4) * 16 * depth;

      case Format.ASTC_RGBA_5X5:
      case Format.ASTC_SRGBA_5X5:
        return Math.ceil(width / 5) * Math.ceil(height / 5) * 16 * depth;

      case Format.ASTC_RGBA_6X5:
      case Format.ASTC_SRGBA_6X5:
        return Math.ceil(width / 6) * Math.ceil(height / 5) * 16 * depth;

      case Format.ASTC_RGBA_6X6:
      case Format.ASTC_SRGBA_6X6:
        return Math.ceil(width / 6) * Math.ceil(height / 6) * 16 * depth;

      case Format.ASTC_RGBA_8X5:
      case Format.ASTC_SRGBA_8X5:
        return Math.ceil(width / 8) * Math.ceil(height / 5) * 16 * depth;

      case Format.ASTC_RGBA_8X6:
      case Format.ASTC_SRGBA_8X6:
        return Math.ceil(width / 8) * Math.ceil(height / 6) * 16 * depth;

      case Format.ASTC_RGBA_8X8:
      case Format.ASTC_SRGBA_8X8:
        return Math.ceil(width / 8) * Math.ceil(height / 8) * 16 * depth;

      case Format.ASTC_RGBA_10X5:
      case Format.ASTC_SRGBA_10X5:
        return Math.ceil(width / 10) * Math.ceil(height / 5) * 16 * depth;

      case Format.ASTC_RGBA_10X6:
      case Format.ASTC_SRGBA_10X6:
        return Math.ceil(width / 10) * Math.ceil(height / 6) * 16 * depth;

      case Format.ASTC_RGBA_10X8:
      case Format.ASTC_SRGBA_10X8:
        return Math.ceil(width / 10) * Math.ceil(height / 8) * 16 * depth;

      case Format.ASTC_RGBA_10X10:
      case Format.ASTC_SRGBA_10X10:
        return Math.ceil(width / 10) * Math.ceil(height / 10) * 16 * depth;

      case Format.ASTC_RGBA_12X10:
      case Format.ASTC_SRGBA_12X10:
        return Math.ceil(width / 12) * Math.ceil(height / 10) * 16 * depth;

      case Format.ASTC_RGBA_12X12:
      case Format.ASTC_SRGBA_12X12:
        return Math.ceil(width / 12) * Math.ceil(height / 12) * 16 * depth;

      default:
        {
          return 0;
        }
    }
  }
}
/**
 * @en Get memory size of the specified surface.
 * @zh GFX 格式表面内存大小。
 * @param format The target format.
 * @param width The target width.
 * @param height The target height.
 * @param depth The target depth.
 * @param mips The target mip levels.
 */


function FormatSurfaceSize(format, width, height, depth, mips) {
  let size = 0;

  for (let i = 0; i < mips; ++i) {
    size += FormatSize(format, width, height, depth);
    width = Math.max(width >> 1, 1);
    height = Math.max(height >> 1, 1);
  }

  return size;
}

const _type2size = [0, // UNKNOWN
4, // BOOL
8, // BOOL2
12, // BOOL3
16, // BOOL4
4, // INT
8, // INT2
12, // INT3
16, // INT4
4, // UINT
8, // UINT2
12, // UINT3
16, // UINT4
4, // FLOAT
8, // FLOAT2
12, // FLOAT3
16, // FLOAT4
16, // MAT2
24, // MAT2X3
32, // MAT2X4
24, // MAT3X2
36, // MAT3
48, // MAT3X4
32, // MAT4X2
48, // MAT4X3
64, // MAT4
4, // SAMPLER1D
4, // SAMPLER1D_ARRAY
4, // SAMPLER2D
4, // SAMPLER2D_ARRAY
4, // SAMPLER3D
4 // SAMPLER_CUBE
];
/**
 * @en Get the memory size of the specified type.
 * @zh 得到 GFX 数据类型的大小。
 * @param type The target type.
 */

function GetTypeSize(type) {
  return _type2size[type] || 0;
}

function getTypedArrayConstructor(info) {
  const stride = info.size / info.count;

  switch (info.type) {
    case FormatType.UNORM:
    case FormatType.UINT:
      {
        switch (stride) {
          case 1:
            return Uint8Array;

          case 2:
            return Uint16Array;

          case 4:
            return Uint32Array;

          default:
        }

        break;
      }

    case FormatType.SNORM:
    case FormatType.INT:
      {
        switch (stride) {
          case 1:
            return Int8Array;

          case 2:
            return Int16Array;

          case 4:
            return Int32Array;

          default:
        }

        break;
      }

    case FormatType.FLOAT:
      {
        return Float32Array;
      }

    default:
  }

  return Float32Array;
}