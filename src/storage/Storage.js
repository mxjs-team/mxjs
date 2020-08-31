import diff from '../diff'
import EventMixin from '../event'
import { mix } from '../mixin'
import { STORAGE_PROPERTY } from './constants'
import copyAndFreeze from './copyAndFreeze'
import copyAndSet from './copyAndSet'
import defaultReducer from './defaultReducer'
import generatePropertyChain from './generatePropertyChain'
import normalizeOptions from './normalizeOptions'

export default class Storage extends mix().with(EventMixin) {
  constructor (initialState, options = {}) {
    super()

    const defaultOptions = {
      reducer: defaultReducer,
      triggerDetailedEvents: false
    }

    Object.defineProperty(this, STORAGE_PROPERTY, {
      writable: true,
      value: {
        state: copyAndFreeze(initialState),
        options: normalizeOptions({ ...defaultOptions, ...options })
      }
    })
  }

  get state () {
    return this[STORAGE_PROPERTY].state
  }

  get options () {
    return this[STORAGE_PROPERTY].options
  }

  set state (value) {
    if (this.state === value) return

    const oldState = this.state

    this[STORAGE_PROPERTY].state = copyAndFreeze(value)
    this.trigger('change.state', this.state)

    if (this[STORAGE_PROPERTY].options.triggerDetailedEvents) {
      for (const { type, path, ...rest } of diff(oldState, this.state)) {
        this.trigger(`${type}.state${path}`, { path, ...rest })
      }
    }
  }

  changeOptions (options) {
    this[STORAGE_PROPERTY].options = normalizeOptions({
      ...this.options, ...options
    })
  }

  dispatch (action, payload) {
    this.state = this.options.reducer(this.state, action, payload)

    return this.state
  }

  get (path) {
    const propertyChain = generatePropertyChain(path)

    return propertyChain.reduce(
      (current, property) => current[property],
      this.state
    )
  }

  set (path, value) {
    const propertyChain = generatePropertyChain(path)

    this.state = copyAndSet(this.state, propertyChain, value)
  }
}
