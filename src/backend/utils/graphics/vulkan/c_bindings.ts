import koffi from 'koffi'

// Part of https://registry.khronos.org/vulkan/specs/1.3-extensions/man/html/VkResult.html
const VK_SUCCESS = 0
koffi.alias('VkResult', 'int')

// Part of https://registry.khronos.org/vulkan/specs/1.3-extensions/man/html/VkStructureType.html
const VK_STRUCTURE_TYPE_APPLICATION_INFO = 0
const VK_STRUCTURE_TYPE_INSTANCE_CREATE_INFO = 1

// https://registry.khronos.org/vulkan/specs/1.3-extensions/man/html/VK_MAX_PHYSICAL_DEVICE_NAME_SIZE.html
const VK_MAX_PHYSICAL_DEVICE_NAME_SIZE = 256

// https://registry.khronos.org/vulkan/specs/1.3-extensions/man/html/VK_UUID_SIZE.html
const VK_UUID_SIZE = 16

// https://registry.khronos.org/vulkan/specs/1.3-extensions/man/html/VkFlags.html
koffi.alias('VkFlags', 'uint32_t')
// https://registry.khronos.org/vulkan/specs/1.3-extensions/man/html/VkSampleCountFlags.html
koffi.alias('VkSampleCountFlags', 'VkFlags')
// https://registry.khronos.org/vulkan/specs/1.3-extensions/man/html/VkDeviceSize.html
koffi.alias('VkDeviceSize', 'uint64_t')
// https://registry.khronos.org/vulkan/specs/1.3-extensions/man/html/VkPhysicalDeviceLimits.html
const VkPhysicalDeviceLimits = koffi.struct('VkPhysicalDeviceLimits', {
  maxImageDimension1D: 'uint32_t',
  maxImageDimension2D: 'uint32_t',
  maxImageDimension3D: 'uint32_t',
  maxImageDimensionCube: 'uint32_t',
  maxImageArrayLayers: 'uint32_t',
  maxTexelBufferElements: 'uint32_t',
  maxUniformBufferRange: 'uint32_t',
  maxStorageBufferRange: 'uint32_t',
  maxPushConstantsSize: 'uint32_t',
  maxMemoryAllocationCount: 'uint32_t',
  maxSamplerAllocationCount: 'uint32_t',
  bufferImageGranularity: 'uint64_t',
  sparseAddressSpaceSize: 'uint64_t',
  maxBoundDescriptorSets: 'uint32_t',
  maxPerStageDescriptorSamplers: 'uint32_t',
  maxPerStageDescriptorUniformBuffers: 'uint32_t',
  maxPerStageDescriptorStorageBuffers: 'uint32_t',
  maxPerStageDescriptorSampledImages: 'uint32_t',
  maxPerStageDescriptorStorageImages: 'uint32_t',
  maxPerStageDescriptorInputAttachments: 'uint32_t',
  maxPerStageResources: 'uint32_t',
  maxDescriptorSetSamplers: 'uint32_t',
  maxDescriptorSetUniformBuffers: 'uint32_t',
  maxDescriptorSetUniformBuffersDynamic: 'uint32_t',
  maxDescriptorSetStorageBuffers: 'uint32_t',
  maxDescriptorSetStorageBuffersDynamic: 'uint32_t',
  maxDescriptorSetSampledImages: 'uint32_t',
  maxDescriptorSetStorageImages: 'uint32_t',
  maxDescriptorSetInputAttachments: 'uint32_t',
  maxVertexInputAttributes: 'uint32_t',
  maxVertexInputBindings: 'uint32_t',
  maxVertexInputAttributeOffset: 'uint32_t',
  maxVertexInputBindingStride: 'uint32_t',
  maxVertexOutputComponents: 'uint32_t',
  maxTessellationGenerationLevel: 'uint32_t',
  maxTessellationPatchSize: 'uint32_t',
  maxTessellationControlPerVertexInputComponents: 'uint32_t',
  maxTessellationControlPerVertexOutputComponents: 'uint32_t',
  maxTessellationControlPerPatchOutputComponents: 'uint32_t',
  maxTessellationControlTotalOutputComponents: 'uint32_t',
  maxTessellationEvaluationInputComponents: 'uint32_t',
  maxTessellationEvaluationOutputComponents: 'uint32_t',
  maxGeometryShaderInvocations: 'uint32_t',
  maxGeometryInputComponents: 'uint32_t',
  maxGeometryOutputComponents: 'uint32_t',
  maxGeometryOutputVertices: 'uint32_t',
  maxGeometryTotalOutputComponents: 'uint32_t',
  maxFragmentInputComponents: 'uint32_t',
  maxFragmentOutputAttachments: 'uint32_t',
  maxFragmentDualSrcAttachments: 'uint32_t',
  maxFragmentCombinedOutputResources: 'uint32_t',
  maxComputeSharedMemorySize: 'uint32_t',
  maxComputeWorkGroupCount: koffi.array('uint32_t', 3),
  maxComputeWorkGroupInvocations: 'uint32_t',
  maxComputeWorkGroupSize: koffi.array('uint32_t', 3),
  subPixelPrecisionBits: 'uint32_t',
  subTexelPrecisionBits: 'uint32_t',
  mipmapPrecisionBits: 'uint32_t',
  maxDrawIndexedIndexValue: 'uint32_t',
  maxDrawIndirectCount: 'uint32_t',
  maxSamplerLodBias: 'float',
  maxSamplerAnisotropy: 'float',
  maxViewports: 'uint32_t',
  maxViewportDimensions: koffi.array('uint32_t', 2),
  viewportBoundsRange: koffi.array('float', 2),
  viewportSubPixelBits: 'uint32_t',
  minMemoryMapAlignment: 'size_t',
  minTexelBufferOffsetAlignment: 'uint64_t',
  minUniformBufferOffsetAlignment: 'uint64_t',
  minStorageBufferOffsetAlignment: 'uint64_t',
  minTexelOffset: 'int32_t',
  maxTexelOffset: 'uint32_t',
  minTexelGatherOffset: 'int32_t',
  maxTexelGatherOffset: 'uint32_t',
  minInterpolationOffset: 'float',
  maxInterpolationOffset: 'float',
  subPixelInterpolationOffsetBits: 'uint32_t',
  maxFramebufferWidth: 'uint32_t',
  maxFramebufferHeight: 'uint32_t',
  maxFramebufferLayers: 'uint32_t',
  framebufferColorSampleCounts: 'uint32_t',
  framebufferDepthSampleCounts: 'uint32_t',
  framebufferStencilSampleCounts: 'uint32_t',
  framebufferNoAttachmentsSampleCounts: 'uint32_t',
  maxColorAttachments: 'uint32_t',
  sampledImageColorSampleCounts: 'uint32_t',
  sampledImageIntegerSampleCounts: 'uint32_t',
  sampledImageDepthSampleCounts: 'uint32_t',
  sampledImageStencilSampleCounts: 'uint32_t',
  storageImageSampleCounts: 'uint32_t',
  maxSampleMaskWords: 'uint32_t',
  timestampComputeAndGraphics: 'uint32_t',
  timestampPeriod: 'float',
  maxClipDistances: 'uint32_t',
  maxCullDistances: 'uint32_t',
  maxCombinedClipAndCullDistances: 'uint32_t',
  discreteQueuePriorities: 'uint32_t',
  pointSizeRange: koffi.array('float', 2),
  lineWidthRange: koffi.array('float', 2),
  pointSizeGranularity: 'float',
  lineWidthGranularity: 'float',
  strictLines: 'uint32_t',
  standardSampleLocations: 'uint32_t',
  optimalBufferCopyOffsetAlignment: 'uint64_t',
  optimalBufferCopyRowPitchAlignment: 'uint64_t',
  nonCoherentAtomSize: 'uint64_t'
})

// https://registry.khronos.org/vulkan/specs/1.3-extensions/man/html/VkBool32.html
koffi.alias('VkBool32', 'uint32_t')
// https://registry.khronos.org/vulkan/specs/1.3-extensions/man/html/VkPhysicalDeviceSparseProperties.html
const VkPhysicalDeviceSparseProperties = koffi.struct(
  'VkPhysicalDeviceSparseProperties',
  {
    residencyStandard2DBlockShape: 'VkBool32',
    residencyStandard2DMultisampleBlockShape: 'VkBool32',
    residencyStandard3DBlockShape: 'VkBool32',
    residencyAlignedMipSize: 'VkBool32',
    residencyNonResidentStrict: 'VkBool32'
  }
)

// https://registry.khronos.org/vulkan/specs/1.3-extensions/man/html/VkPhysicalDeviceType.html
koffi.alias('VkPhysicalDeviceType', 'int')
// https://registry.khronos.org/vulkan/specs/1.3-extensions/man/html/VkPhysicalDeviceProperties.html
const VkPhysicalDeviceProperties = koffi.struct('VkPhysicalDeviceProperties', {
  apiVersion: 'uint32_t',
  driverVersion: 'uint32_t',
  vendorID: 'uint32_t',
  deviceID: 'uint32_t',
  deviceType: 'VkPhysicalDeviceType',
  deviceName: koffi.array('char', VK_MAX_PHYSICAL_DEVICE_NAME_SIZE),
  pipelineCacheUUID: koffi.array('uint8_t', VK_UUID_SIZE),
  limits: VkPhysicalDeviceLimits,
  sparseProperties: VkPhysicalDeviceSparseProperties
})

// https://registry.khronos.org/vulkan/specs/1.3-extensions/man/html/VkStructureType.html
koffi.alias('VkStructureType', 'int')
// https://registry.khronos.org/vulkan/specs/1.3-extensions/man/html/VkApplicationInfo.html
koffi.struct('VkApplicationInfo', {
  sType: 'VkStructureType',
  pNext: 'const void*',
  pApplicationName: 'const char*',
  applicationVersion: 'uint32_t',
  pEngineName: 'const char*',
  engineVersion: 'uint32_t',
  apiVersion: 'uint32_t'
})

// https://registry.khronos.org/vulkan/specs/1.3-extensions/man/html/VkInstanceCreateInfo.html
koffi.struct('VkInstanceCreateInfo', {
  sType: 'VkStructureType',
  pNext: 'const void*',
  flags: 'uint32_t',
  pApplicationInfo: 'const VkApplicationInfo*',
  enabledLayerCount: 'uint32_t',
  ppEnabledLayerNames: 'const char* const*',
  enabledExtensionCount: 'uint32_t',
  ppEnabledExtensionNames: 'const char* const*'
})

koffi.pointer('VkAllocationCallbacks', koffi.opaque(), 1)

// https://registry.khronos.org/vulkan/specs/1.3-extensions/man/html/VkInstance.html
koffi.pointer('VkInstance', koffi.opaque(), 1)

// https://registry.khronos.org/vulkan/specs/1.3-extensions/man/html/VkPhysicalDevice.html
koffi.pointer('VkPhysicalDevice', koffi.opaque(), 1)

// Part of https://registry.khronos.org/vulkan/specs/1.3-extensions/man/html/VkPhysicalDeviceType.html
const VK_PHYSICAL_DEVICE_TYPE_CPU = 4

export {
  VK_SUCCESS,
  VK_STRUCTURE_TYPE_APPLICATION_INFO,
  VK_STRUCTURE_TYPE_INSTANCE_CREATE_INFO,
  VkPhysicalDeviceProperties,
  VK_PHYSICAL_DEVICE_TYPE_CPU
}
