import { APPLIED_MIXIN_PROPERTY } from './constants'

export default function hasMixin (Class, mixin) {
  if (Class === null) return false
  if (Class[APPLIED_MIXIN_PROPERTY] === mixin) return true

  return hasMixin(Object.getPrototypeOf(Class), mixin)
}
