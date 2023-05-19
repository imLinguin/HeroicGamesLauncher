import koffi from 'koffi'
import { gte as semverGte } from 'semver'
import {
  VK_SUCCESS,
  VK_STRUCTURE_TYPE_APPLICATION_INFO,
  VK_STRUCTURE_TYPE_INSTANCE_CREATE_INFO,
  VK_PHYSICAL_DEVICE_TYPE_CPU,
  VkPhysicalDeviceProperties
} from './c_bindings'

type VulkanVersion = [maj: number, min: number, patch: number]

/**
 * Encodes a semver version as described in {@link https://registry.khronos.org/vulkan/specs/1.3-extensions/html/vkspec.html#extendingvulkan-coreversions-versionnumbers}
 */
function create_version(maj: number, min: number, patch: number): number {
  return (maj << 22) | (min << 12) | patch
}

/**
 * Decodes a semver version as described in {@link https://registry.khronos.org/vulkan/specs/1.3-extensions/html/vkspec.html#extendingvulkan-coreversions-versionnumbers}
 */
function decode_version(version: number): VulkanVersion {
  return [(version >> 22) & 0x7f, (version >> 12) & 0x3ff, version & 0xfff]
}

/**
 * @returns The version of the installed Vulkan API interface, or `false` if
 * unsupported. <br>
 * Note that this is the interface version, not the version a user's GPU(s)
 * support. For that, see {@link get_supported_vulkan_versions}
 */
function get_vulkan_instance_version(): VulkanVersion | false {
  let vulkan_library
  try {
    vulkan_library = koffi.load('libvulkan.so.1')
  } catch (error) {
    return false
  }

  // https://registry.khronos.org/vulkan/specs/1.3-extensions/man/html/vkEnumerateInstanceVersion.html
  let vkEnumerateInstanceVersion
  try {
    vkEnumerateInstanceVersion = vulkan_library.func(
      'VkResult vkEnumerateInstanceVersion(_Out_ uint32_t*)'
    )
  } catch (error) {
    // If vkEnumerateInstanceVersion isn't present, we have to be on 1.0.0
    return [1, 0, 0]
  }
  const vk_instance_version = [0]
  const result: number = vkEnumerateInstanceVersion(vk_instance_version)
  if (result !== VK_SUCCESS) {
    return false
  }
  return decode_version(vk_instance_version[0])
}

/**
 * Helper function to detect if any GPU in the system supports a specified Vulkan version
 * @returns The name of first the adapter supporting the target version, or `false` if none do
 */
function any_gpu_supports_version(
  target_version: VulkanVersion
): string | false {
  for (const [name, supported_version] of get_supported_vulkan_versions()) {
    if (semverGte(supported_version.join('.'), target_version.join('.'))) {
      return name
    }
  }
  return false
}

/**
 * @returns A list of device names and their supported Vulkan versions
 */
function get_supported_vulkan_versions(): [
  name: string,
  version: VulkanVersion
][] {
  let vulkan_library
  try {
    vulkan_library = koffi.load('libvulkan.so.1')
  } catch (error) {
    return []
  }

  // https://registry.khronos.org/vulkan/specs/1.3-extensions/man/html/vkCreateInstance.html
  const vkCreateInstance = vulkan_library.func(
    'VkResult vkCreateInstance(VkInstanceCreateInfo*, VkAllocationCallbacks*, _Out_ VkInstance*)'
  )

  const our_instance = [0]
  let result: number = vkCreateInstance(
    {
      sType: VK_STRUCTURE_TYPE_INSTANCE_CREATE_INFO,
      pNext: null,
      flags: 0,
      pApplicationInfo: {
        sType: VK_STRUCTURE_TYPE_APPLICATION_INFO,
        pNext: null,
        pApplicationName: 'Heroic',
        // FIXME: Supply Heroic's actual version here
        applicationVersion: create_version(0, 1, 0),
        pEngineName: '',
        engineVersion: 0,
        apiVersion: create_version(1, 3, 0)
      },
      enabledLayerCount: 0,
      ppEnabledLayerNames: '',
      enabledExtensionCount: 0,
      ppEnabledExtensionNames: ''
    },
    null,
    our_instance
  )
  if (result !== VK_SUCCESS) {
    return []
  }

  // https://registry.khronos.org/vulkan/specs/1.3-extensions/man/html/vkDestroyInstance.html
  const vkDestroyInstance = vulkan_library.func(
    'void vkDestroyInstance(VkInstance, VkAllocationCallbacks*)'
  )

  // https://registry.khronos.org/vulkan/specs/1.3-extensions/man/html/vkEnumeratePhysicalDevices.html
  const vkEnumeratePhysicalDevices = vulkan_library.func(
    'VkResult vkEnumeratePhysicalDevices(VkInstance, _Inout_ uint32_t*, _Out_ VkPhysicalDevice*)'
  )

  const device_len: number[] = [0]
  result = vkEnumeratePhysicalDevices(our_instance[0], device_len, null)
  if (result !== VK_SUCCESS) {
    vkDestroyInstance(our_instance[0], null)
    return []
  }

  const devices = [0]
  devices.length = device_len[0]
  result = vkEnumeratePhysicalDevices(our_instance[0], device_len, devices)
  if (result !== VK_SUCCESS) {
    vkDestroyInstance(our_instance[0], null)
    return []
  }

  // https://registry.khronos.org/vulkan/specs/1.3-extensions/man/html/vkGetPhysicalDeviceProperties.html
  const vkGetPhysicalDeviceProperties = vulkan_library.func(
    'void vkGetPhysicalDeviceProperties(VkPhysicalDevice, _Out_ VkPhysicalDeviceProperties*)'
  )

  const device_props = Buffer.allocUnsafe(
    koffi.sizeof(VkPhysicalDeviceProperties)
  )
  const name_version_list: [name: string, version: VulkanVersion][] = []
  for (const device_handle of devices) {
    vkGetPhysicalDeviceProperties(device_handle, device_props)
    const device_props_decoded = koffi.decode(
      device_props,
      VkPhysicalDeviceProperties
    )

    // Don't list CPU adapters (e.g. lavapipe), as most applications skip them
    if (device_props_decoded.deviceType === VK_PHYSICAL_DEVICE_TYPE_CPU)
      continue

    name_version_list.push([
      device_props_decoded.deviceName,
      decode_version(device_props_decoded.apiVersion)
    ])
  }

  vkDestroyInstance(our_instance[0], null)
  return name_version_list
}

export { get_vulkan_instance_version, any_gpu_supports_version }
