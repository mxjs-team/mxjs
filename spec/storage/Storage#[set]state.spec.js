jest.mock('../../src/storage/copyAndFreeze', () => {
  return {
    __esModule: true,
    default: jest.fn(value => value)
  }
})

jest.mock('../../src/diff/diff')

import Storage from '../../src/storage/Storage'
import copyAndFreeze from '../../src/storage/copyAndFreeze'
import diff from '../../src/diff/diff'

describe('Storage#[set]state', () => {
  const storage = new Storage({})

  beforeEach(() => {
    copyAndFreeze.mockClear()
    diff.mockClear()
  })

  it('changes the state value and launches an event about that change', () => {
    const value = {}
    const freezedValue = {}
    const trigger = jest.spyOn(storage, 'trigger')

    copyAndFreeze.mockReturnValue(freezedValue)

    storage.state = value

    expect(storage.state).toBe(freezedValue)
    expect(copyAndFreeze).toBeCalledWith(value)
    expect(trigger).toBeCalledWith('change.state', freezedValue)
  })

  describe('when the current "state" is equal to the "value"', () => {
    const value = 'value'
    const storage = new Storage(value)

    it('does nothing', () => {
      const trigger = jest.spyOn(storage, 'trigger')

      storage.state = value

      expect(storage.state).toBe(value)
      expect(copyAndFreeze).not.toBeCalled()
      expect(trigger).not.toBeCalled()
    })
  })

  describe('when option "triggerDetailedEvents" is true', () => {
    const initialState = {}
    const storage = new Storage(initialState, { triggerDetailedEvents: true })

    it('launches events detailing each change in the state', () => {
      const value = {}
      const freezedValue = {}
      const trigger = jest.spyOn(storage, 'trigger')
      const diffReturnValue = [
        {
          type: 'change',
          path: '.property',
          previous: 'value',
          value: 'different value'
        },
        {
          type: 'deletion',
          path: '.otherProperty',
          previous: 'other value'
        },
        {
          type: 'definition',
          path: '.anotherProperty',
          value: 'another value'
        }
      ]

      copyAndFreeze.mockReturnValue(freezedValue)
      diff.mockReturnValue(diffReturnValue)

      storage.state = value

      expect(diff).toBeCalledWith(initialState, freezedValue)
      expect(trigger.mock.calls).toEqual([
        ['change.state', freezedValue],
        ...diffReturnValue.map(
          ({ type, path, ...rest }) => [`${type}.state${path}`, { path, ...rest }]
        )
      ])
    })
  })
})
