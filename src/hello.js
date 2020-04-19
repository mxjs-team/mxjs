/**
 * Returns `'hello ${something}'`
 * @param {string} [something='world']
 * @returns {string}
 */
function hello (something = 'world') {
  return `Hello ${something}!`
}

export default hello
