import wrap from '../../src/diff/wrap'

describe('wrap', () => {
  const object = {}

  it('returns an object with "value", and "type" properties, and "toString" method', () => {
    expect(wrap(object)).toEqual({
      type: typeof object,
      value: object,
      toString: expect.any(Function)
    })
  })

  describe('"toString" method', () => {
    it('returns an empty "string"', () => {
      expect(wrap(object).toString()).toBe('')
    })
  })

  describe('when "wrap" is called with "history"', () => {
    const history = 'some.history'

    describe('"toString" method', () => {
      it('returns "history"', () => {
        expect(wrap(object, history).toString()).toBe(history)
      })
    })
  })
})
