import getDefinition from '../../src/diff/getDefinition'

describe('getDefinition', () => {
  describe('when "originalWrapped" isn`t "undefined" or "derivedWrapped" is "undefined"', () => {
    it('returns "undefined"', () => {
      expect(getDefinition({}, undefined)).toBeUndefined()
      expect(getDefinition({}, {})).toBeUndefined()
      expect(getDefinition(undefined, undefined)).toBeUndefined()
    })
  })

  describe('when "originalWrapped" is "undefined" and "derivedWrapped" isn`t', () => {
    it('returns an object with the definition`s description', () => {
      const path = 'some.path'
      const originalWrapped = undefined

      const derivedWrapped = {
        value: 'value',
        toString: () => path
      }

      expect(getDefinition(originalWrapped, derivedWrapped)).toEqual({
        type: 'definition',
        path: `${derivedWrapped}`,
        value: derivedWrapped.value
      })
    })
  })
})
