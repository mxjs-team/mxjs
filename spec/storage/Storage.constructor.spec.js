jest.mock('../../src/storage/copyAndFreeze')

import hasMixin from '../../src/mixin/hasMixin'
import EventMixin from '../../src/event/EventMixin'
import Storage from '../../src/storage/Storage'
import { STORAGE_PROPERTY } from '../../src/storage/constants'
import defaultReducer from '../../src/storage/defaultReducer'
import copyAndFreeze from '../../src/storage/copyAndFreeze'

describe('Storage.constructor', () => {
  const initialState = {}

  beforeEach(() => copyAndFreeze.mockClear())

  it('defines a property containing a frozen copy of "initialState", and default options', () => {
    const copiedAndFrozenInitialState = {}

    copyAndFreeze.mockReturnValue(copiedAndFrozenInitialState)

    const storage = new Storage(initialState)

    expect(storage[STORAGE_PROPERTY].state).toBe(copiedAndFrozenInitialState)

    expect(storage[STORAGE_PROPERTY].options).toEqual({
      reducer: defaultReducer,
      triggerDetailedEvents: false
    })

    expect(copyAndFreeze).toBeCalledWith(initialState)
  })

  it('implements "EventMixin"', () => {
    expect(hasMixin(EventMixin, Storage)).toBeTruthy()
  })

  describe('when less "options" are passed than available', () => {
    it('records past "options" and includes others with their default values', () => {
      const options = { reducer: state => state }
      const storage = new Storage(initialState, options)

      expect(storage[STORAGE_PROPERTY].options).toEqual({
        reducer: options.reducer,
        triggerDetailedEvents: false
      })
    })
  })

  describe('when all available "options" are passed', () => {
    it('records past "options"', () => {
      const options = {
        reducer: state => state,
        triggerDetailedEvents: false
      }

      const storage = new Storage(initialState, options)

      expect(storage[STORAGE_PROPERTY].options).toEqual(options)
    })
  })

  describe('when unot vailable "options" are passed', () => {
    it('discards not vailable "options"', () => {
      const options = {
        reducer: state => state,
        nonexistentOption: 'value'
      }

      const storage = new Storage(initialState, options)

      expect(storage[STORAGE_PROPERTY].options).toEqual({
        reducer: options.reducer,
        triggerDetailedEvents: false
      })
    })
  })
})
