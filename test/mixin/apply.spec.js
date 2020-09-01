jest.mock('../../src/mixin/hasMixin')

import apply from '../../src/mixin/apply'
import { APPLIED_MIXIN_PROPERTY } from '../../src/mixin/constants'
import hasMixin from '../../src/mixin/hasMixin'

describe('apply', () => {
  const mixed = {}
  const mixin = jest.fn().mockReturnValueOnce(mixed)

  describe('when "mixin" has not been applied to "Class"', () => {
    beforeEach(() => {
      hasMixin.mockClear().mockReturnValue(false)
      mixin.mockClear()
    })

    it('returns the result of applying "mixin" to "Class"', () => {
      class Class {}

      expect(apply(mixin, Class)).toBe(mixed)
      expect(mixin).toBeCalledWith(Class)
      expect(Object.getOwnPropertyDescriptor(mixed, APPLIED_MIXIN_PROPERTY)).toEqual({
        value: mixin,
        writable: false,
        configurable: false,
        enumerable: false
      })
    })
  })

  describe('when "mixin" has been applied to "Class"', () => {
    beforeEach(() => {
      hasMixin.mockClear().mockReturnValue(true)
      mixin.mockClear()
    })

    it('returns "Class"', () => {
      class Class {}

      expect(apply(mixin, Class)).toBe(Class)
      expect(mixin).not.toBeCalled()
    })
  })
})
