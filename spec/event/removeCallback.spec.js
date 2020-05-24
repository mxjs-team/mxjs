import removeCallback from '../../src/event/removeCallback'

describe('removeCallback', () => {
  describe('when "callback" is contained in "callbacks"', () => {
    it('returns an object with "type" attribute containing "callbacks" without "callback"', () => {
      const callback = () => {}
      const otherCallback = () => {}
      const callbacks = [otherCallback, callback]
      const type = 'type'
      const result = removeCallback(callback, callbacks, type)

      expect(result).toEqual({ [type]: expect.any(Array) })
      expect(result[type]).toEqual([otherCallback])
    })

    it('returns an empty object if "callbacks" contains only "callback"', () => {
      const callback = () => {}
      const callbacks = [callback]
      const type = 'type'
      const result = removeCallback(callback, callbacks, type)

      expect(result).toEqual({})
    })
  })

  describe('when "callback" is not contained in "callbacks"', () => {
    it('returns an object with "type" attribute containing "callbacks"', () => {
      const callback = () => {}
      const otherCallback = () => {}
      const anotherCallback = () => {}
      const callbacks = [otherCallback, anotherCallback]
      const type = 'type'
      const result = removeCallback(callback, callbacks, type)

      expect(result).toEqual({ [type]: expect.any(Array) })
      expect(result[type]).toEqual([otherCallback, anotherCallback])
    })
  })

  describe('when "callback" is "undefined"', () => {
    it('returns an empty object', () => {
      const callback = undefined
      const callbacks = [callback]
      const type = 'type'
      const result = removeCallback(callback, callbacks, type)

      expect(result).toEqual({})
    })
  })
})
