export default function copyAndSet (object, propertyChain, value) {
  const [property, ...rest] = propertyChain
  const propertyValue = rest.length
    ? copyAndSet(object[property], rest, value)
    : value

  return Array.isArray(object)
    ? Object.assign([...object], { [property]: propertyValue })
    : { ...object, [property]: propertyValue }
}
