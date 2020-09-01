export default function getProperties (...objects) {
  return [...new Set(objects.map(Object.keys).flat())]
}
