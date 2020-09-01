import getProperties from '../../src/diff/getProperties'

describe('getProperties', () => {
  it('returns a set of properties from an object list', () => {
    const objects = [
      {},
      { property: 'value' },
      { otherProperty: 'other value', anotherProperty: 'another value' },
      [],
      ['value', 'other value']
    ]

    expect(getProperties(...objects)).toEqual(['property', 'otherProperty', 'anotherProperty', '0', '1'])
  })
})
