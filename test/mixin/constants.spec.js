import { APPLIED_MIXIN_PROPERTY } from '../../src/mixin/constants'

describe('constants', () => {
  describe('APPLIED_MIXIN_PROPERTY', () => {
    it('is a "Symbol"', () => {
      expect(typeof APPLIED_MIXIN_PROPERTY).toBe('symbol')
    })
  })
})
