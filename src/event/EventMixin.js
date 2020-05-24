import { EVENT_PROPERTY } from './constants'
import removeCallback from './removeCallback'
import matchType from './matchType'

/**
 * Description
 *
 * @mixin
 */
const EventMixin = Class => class extends Class {
  constructor () {
    super()
    Object.defineProperty(this, EVENT_PROPERTY, {
      value: {}, writable: true
    })
  }

  /**
   * Description
   *
   * @param {string} type - description
   * @param {function} callback - description
   * @returns {this}
   */
  on (type, callback) {
    this[EVENT_PROPERTY][type] = [
      ...(this[EVENT_PROPERTY][type] || []),
      callback
    ]

    return this
  }

  /**
   * Description
   *
   * @param {string|RegExp} type - description
   * @param {function=} callback - description
   * @returns {this}
   */
  off (type, callback) {
    const events = this[EVENT_PROPERTY]

    this[EVENT_PROPERTY] = Object.entries(events).reduce(
      (events, [currentType, callbacks]) => ({
        ...events,
        ...(
          matchType(type, currentType)
            ? removeCallback(callback, callbacks, currentType)
            : { [currentType]: callbacks }
        )
      }),
      {}
    )

    return this
  }

  /**
   * Description
   *
   * @param {string|RegExp} type - description
   * @param {*} data - description
   * @param {Object} thisObject - description
   * @returns {this}
   */
  trigger (type, data, thisObject) {
    const events = this[EVENT_PROPERTY]

    for (const currentType in events) {
      const matchResult = matchType(type, currentType)

      if (!matchResult) continue

      for (const callback of events[currentType]) {
        callback.call(...[
          thisObject !== undefined ? thisObject : this,
          data,
          ...(Array.isArray(matchResult) ? [matchResult] : [])
        ])
      }
    }

    return this
  }
}

export default EventMixin
