import copyAndFreeze from '../../src/storage/copyAndFreeze'

describe('copyAndFreeze', () => {
  describe('when "value" isn`t an object', () => {
    it('returns "value"', () => {
      const value = 'value'
      const copy = copyAndFreeze(value)

      expect(copy).toBe(value)
    })
  })

  describe('when "value" is a simple object', () => {
    it('returns a frozen copy of "value"', () => {
      const value = {
        property: 'value',
        otherProperty: 'other value'
      }

      const copy = copyAndFreeze(value)

      expect(copy).toEqual(value)
      expect(Object.isFrozen(copy)).toBeTruthy()
    })
  })

  describe('when "value" is an "Array"', () => {
    it('returns a frozen copy of "value"', () => {
      const value = ['value', 'other value']
      const copy = copyAndFreeze(value)

      expect(copy).toEqual(value)
      expect(Object.isFrozen(copy)).toBeTruthy()
    })
  })

  describe('when "value" is an complex object', () => {
    it('returns a recursively frozen copy of "value"', () => {
      const value = {
        property: 'value',
        otherProperty: [
          'other value',
          {
            anotherProperty: 'another value'
          }
        ]
      }

      const copy = copyAndFreeze(value)

      expect(copy).toEqual(value)
      expect(Object.isFrozen(copy)).toBeTruthy()
      expect(Object.isFrozen(copy.otherProperty)).toBeTruthy()
      expect(Object.isFrozen(copy.otherProperty[1].anotherProperty)).toBeTruthy()
    })
  })
})
