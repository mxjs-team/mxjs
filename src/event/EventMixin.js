import { EVENT_PROPERTY } from './constants'

/**
 * Description
 *
 * @mixin
 */
const EventMixin = Class => class extends Class {
  constructor () {
    super()
    Object.defineProperty(this, EVENT_PROPERTY, {
      value: new Map(), writable: true
    })
  }

  /**
   * Description
   *
   * @param {string|RegExp} expression - description
   * @param {function} callback - description
   * @returns {symbol} - description
   */
  subscribe (expression, callback) {
    const subscription = Symbol()

    this[EVENT_PROPERTY].set(subscription, { expression, callback })

    return subscription
  }

  /**
   * Description
   *
   * @param {symbol} subscription - description
   * @returns {boolean} - description
   */
  unsubscribe (subscription) {
    return this[EVENT_PROPERTY].delete(subscription)
  }

  /**
   * Description
   *
   * @param {string} type - description
   * @param {*} data - description
   * @param {Object} thisObject - description
   * @returns {this}
   */
  trigger (type, data, thisObject) {
    for (const [subscription, { expression, callback }] of this[EVENT_PROPERTY]) {
      const matchArray = (typeof expression === 'string')
        ? expression === type
        : type.match(expression)

      if (!matchArray) continue

      callback.call(
        thisObject !== undefined ? thisObject : this,
        data,
        { subscription,  ...(Array.isArray(matchArray) ? { matchArray } : {}) }
      )
    }

    return this
  }
}

export default EventMixin
