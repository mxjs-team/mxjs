jest.mock('../../src/diff/wrap')

import heap from '../../src/diff/heap'
import wrap from '../../src/diff/wrap'

describe('heap', () => {
  const property = 'property'

  beforeEach(() => wrap.mockClear())

  describe('when "wraped"`s "value" is not an object', () => {
    const wraped = { value: 'some value' }

    it('returns "undefined"', () => {
      expect(heap(wraped, property)).toBeUndefined()
    })
  })

  describe('when "wraped"`s "value" doesn`t own "property"', () => {
    const object = {}
    const wraped = { value: object }

    it('returns "undefined"', () => {
      expect(heap(wraped, property)).toBeUndefined()
    })
  })

  describe('when "wraped"`s "value" owns the "property"', () => {
    const history = 'some.path'
    const object = { [property]: 'some value' }
    const wraped = {
      value: object,
      toString: () => history
    }

    it('returns the "wrap" call returns', () => {
      const wrapReturn = {}

      wrap.mockReturnValue(wrapReturn)

      expect(heap(wraped, property)).toBe(wrapReturn)
      expect(wrap).toBeCalledWith(object[property], `${history}.${property}`)
    })

    describe('when "wraped"`s "value" is an "Array"', () => {
      const property = 0
      const history = 'some.path'
      const object = ['some value']
      const wraped = {
        value: object,
        toString: () => history
      }

      it('calls "wrap" with "history" argument in the proper notation', () => {
        heap(wraped, property)

        expect(wrap).toBeCalledWith(object[property], `${history}[${property}]`)
      })
    })
  })
})
