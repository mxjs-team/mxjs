jest.mock('../../src/mixin/apply')

import mix from '../../src/mixin/mix'
import apply from '../../src/mixin/apply'

describe('mix', () => {
  afterEach(() => apply.mockClear())

  it('applies mixins to "Class"', () => {
    const MixinMixed = class {}
    const OtherMixinMixed = class {}

    apply
      .mockReturnValueOnce(MixinMixed)
      .mockReturnValue(OtherMixinMixed)

    const Class = class {}
    const Mixin = Class => class extends Class {}
    const OtherMixin = Class => class extends Class {}

    expect(mix(Class).with(Mixin, OtherMixin)).toBe(OtherMixinMixed)
    expect(apply.mock.calls[0]).toEqual([Mixin, Class])
    expect(apply.mock.calls[1]).toEqual([OtherMixin, MixinMixed])
  })

  it('applies mixins to a generic class when "mix" is called without parameter', () => {
    const Mixed = class {}
    apply.mockReturnValue(Mixed)

    const Mixin = Class => class extends Class {}

    expect(mix().with(Mixin)).toBe(Mixed)
    expect(apply).toBeCalledWith(Mixin, expect.any(Function))
  })
})
