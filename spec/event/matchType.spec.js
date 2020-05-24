import matchType from '../../src/event/matchType'

describe('matchType', () => {
   describe('when expression is "string"', () => {
     const expression = 'event'

     it('returns "true" when "expression" is equal to "type"', () => {
       const type = 'event'

       expect(matchType(expression, type)).toBeTruthy()
     })

     it('returns "false" when "expression" is not equal to "type"', () => {
       const type = 'otherEvent'

       expect(matchType(expression, type)).toBeFalsy()
     })
   })

   describe('when expression is "RegEx"', () => {
    const expression = /^event$/g

    it('returns "match"`s result when "type" matches with "expression"', () => {
      const type = 'event'

      expect(matchType(expression, type)).toEqual(type.match(expression))
    })

    it('returns "false" when "type" does not match with "expression"', () => {
      const type = 'otherEvent'

      expect(matchType(expression, type)).toBeNull()
    })
  })
})
