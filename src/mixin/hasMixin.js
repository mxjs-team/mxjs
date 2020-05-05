import { APPLIED_MIXIN_PROPERTY } from './constants'

/**
 * Description
 *
 * @example
 * example
 *
 * @function
 * @param {function} mixin - description
 * @param {function} Class - description
 * @returns {boolean}
 */
export default function hasMixin (mixin, Class) {
  if (Class === null) return false
  if (Class[APPLIED_MIXIN_PROPERTY] === mixin) return true

  return hasMixin(mixin, Object.getPrototypeOf(Class))
}
