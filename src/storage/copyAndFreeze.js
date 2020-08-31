export default function copyAndFreeze (value) {
  if (typeof value !== 'object') return value

  if (Array.isArray(value)) return Object.freeze(value.map(copyAndFreeze))

  return Object.freeze(
    Object
      .entries(value)
      .reduce(
        (copy, [key, value]) => ({ ...copy, [key]: copyAndFreeze(value) }),
        {}
      )
  )
}
