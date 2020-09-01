import { APPLIED_MIXIN_PROPERTY } from '../../src/mixin/constants'
import hasMixin from '../../src/mixin/hasMixin'

describe('hasMixin', () => {
  const mixin = Class => class extends Class {}

  describe('when "Class" has "APPLIED_MIXIN_PROPERTY"', () => {
    it('returns "true" if the property is "mixin"', () => {
      class Class {}
      Class[APPLIED_MIXIN_PROPERTY] = mixin

      expect(hasMixin(Class, mixin)).toBeTruthy()
    })
  })

  describe('when some class in the "Class" prototype chain has "APPLIED_MIXIN_PROPERTY"', () => {
    it('returns "true" if the property is "mixin"', () => {
      class SuperClass {}
      class Class extends SuperClass {}
      SuperClass[APPLIED_MIXIN_PROPERTY] = mixin

      expect(hasMixin(Class, mixin)).toBeTruthy()
    })

    it('returns "false" if the property isn`t "mixin"', () => {
      const otherMixin = Class => class extends Class {}

      class SuperClass {}
      class Class extends SuperClass {}
      SuperClass[APPLIED_MIXIN_PROPERTY] = otherMixin

      expect(hasMixin(Class, mixin)).toBeFalsy()
    })
  })

  describe('when "Class" and its prototype chain don`t have "APPLIED_MIXIN_PROPERTY"', () => {
    it('returns "false"', () => {
      class SuperClass {}
      class Class extends SuperClass {}

      expect(hasMixin(Class, mixin)).toBeFalsy()
    })
  })
})
