const permitedOptions = ['reducer', 'triggerDetailedEvents']

export default function normalizeOptions (options) {
  return Object.freeze(
    Object.entries(options).reduce((normalized, [option, value]) => (
      permitedOptions.includes(option)
        ? { ...normalized, [option]: value }
        : normalized
    ), {})
  )
}
