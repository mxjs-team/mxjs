import generatePropertyChain from '../../src/storage/generatePropertyChain'

describe('generatePropertyChain', () => {
  it('returns an "Array" with the property chain', () => {
    const path = 'property.otherProperty[0].anotherProperty'

    expect(generatePropertyChain(path)).toEqual([
      'property', 'otherProperty', '0', 'anotherProperty'
    ])
  })

  describe('when the "path" is an "Array"', () => {
    it('returns the "path"', () => {
      const path = ['property', 'otherProperty']

      expect(generatePropertyChain(path)).toBe(path)
    })
  })
})
