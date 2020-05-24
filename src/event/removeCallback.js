/**
 * Description
 *
 * @private
 * @function
 * @param {function} callback - description
 * @param {function[]} callbacks - description
 * @param {string} type - description
 * @returns {Object} - description
 */
export default function removeCallback (callback, callbacks, type) {
  return (callback && (callbacks.lenght > 1 || callbacks[0] !== callback))
    ? { [type]: callbacks.filter(c => c !== callback) }
    : {}
}
