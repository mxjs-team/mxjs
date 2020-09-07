export default function generatePropertyChain (path) {
  return Array.isArray(path)
    ? path
    : path.split(/\.|\[|\]\[|\]\.|\]/g).filter(e => e)
}
