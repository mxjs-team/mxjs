import copyAndSet from '../../src/storage/copyAndSet'

describe('copyAndSet', () => {
  const value = 'different value'
  const object = {
    property: ['value', { otherProperty: 'other value' }],
    anotherProperty: 'another value'
  }

  it('copies the "object" by changing the property value based on "propertyChain"', () => {
    expect(copyAndSet(object, ['property', '1', 'otherProperty'], value)).toEqual({
      property: ['value', { otherProperty: value }],
      anotherProperty: 'another value'
    })

    expect(copyAndSet(object, ['property'], value)).toEqual({
      property: value,
      anotherProperty: 'another value'
    })
  })
})
