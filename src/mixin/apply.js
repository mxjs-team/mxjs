import { APPLIED_MIXIN_PROPERTY } from './constants'
import hasMixin from './hasMixin'

/**
 * Description
 *
 * @private
 * @function
 * @param {function} mixin - description
 * @param {function} Class - description
 * @returns {function} - description
 */
export default function apply (mixin, Class) {
  if (hasMixin(mixin, Class)) return Class

  return Object.defineProperty(
    mixin(Class),
    APPLIED_MIXIN_PROPERTY,
    { value: mixin }
  )
}
