import generatePropertyChain from '../../src/storage/generatePropertyChain'

describe('generatePropertyChain', () => {
  it('returns an "Array" with the property chain', () => {
    const examples = [
      {
        path: 'property.otherProperty[0].anotherProperty',
        result: ['property', 'otherProperty', '0', 'anotherProperty']
      },
      {
        path: '.property.otherProperty[0].anotherProperty',
        result: ['property', 'otherProperty', '0', 'anotherProperty']
      },
      {
        path: '[property]otherProperty[0].anotherProperty',
        result: ['property', 'otherProperty', '0', 'anotherProperty']
      },
      {
        path: '[[property]]..otherProperty[0].[anotherProperty]',
        result: ['property', 'otherProperty', '0', 'anotherProperty']
      },
    ]

    for (const { path, result } of examples) {
      expect(generatePropertyChain(path)).toEqual(result)
    }
  })

  describe('when the "path" is an "Array"', () => {
    it('returns the "path"', () => {
      const path = ['property', 'otherProperty']

      expect(generatePropertyChain(path)).toBe(path)
    })
  })
})
