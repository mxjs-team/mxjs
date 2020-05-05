import apply from './apply'

/**
 * Description
 *
 * @private
 */
class Mix {
  constructor (Class) {
    this.Class = Class
  }

  /**
   * Description
   *
   * @function
   * @param {...function} ...mixins - description
   * @returns {function} - description
   */
  with (...mixins) {
    return mixins.reduce(
      (Class, mixin) => apply(mixin, Class),
      this.Class
    )
  }
}

/**
 * Description
 *
 * @example
 * example
 *
 * @function
 * @param {function} Class - description
 * @returns {Mix} - description
 */
export default function mix (Class) {
  return new Mix(Class || class {})
}
