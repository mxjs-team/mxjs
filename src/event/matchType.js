/**
 * Description
 *
 * @private
 * @function
 * @param {string|RegExp} matcher - description
 * @param {string} type - description
 */
export default function matchType (expression, type) {
  return (typeof expression === 'string')
    ? expression === type
    : type.match(expression)
}
