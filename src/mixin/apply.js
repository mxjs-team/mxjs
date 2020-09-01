import { APPLIED_MIXIN_PROPERTY } from './constants'
import hasMixin from './hasMixin'

export default function apply (mixin, Class) {
  if (hasMixin(Class, mixin)) return Class

  return Object.defineProperty(
    mixin(Class),
    APPLIED_MIXIN_PROPERTY,
    { value: mixin }
  )
}
