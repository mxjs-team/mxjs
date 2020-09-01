export default function wrap (object, history = '') {
  return {
    type: typeof object,
    value: object,
    toString: () => history
  }
}
