import wrap from './wrap'

export default function heap (wraped, property) {
  const value = wraped.value

  if (typeof value !== 'object') return
  if (!(property in value)) return

  return wrap(
    value[property],
    Array.isArray(value) ? `${wraped}[${property}]` : `${wraped}.${property}`
  )
}
