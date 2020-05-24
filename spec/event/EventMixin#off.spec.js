import { EVENT_PROPERTY } from '../../src/event/constants'
import EventMixin from '../../src/event/EventMixin'

describe('EventMixin#off', () => {
  const ClassWithEvent = EventMixin(class {})
  const type = 'type'
  const otherType = 'other-type'
  const callback = () => {}
  const otherCallback = () => {}

  describe('when "type" is a "string"', () => {
    it('removes "callback" for the "type"', () => {
      const object = new ClassWithEvent()

      object[EVENT_PROPERTY] = {
        [type]: [otherCallback, callback],
        [otherType]: [otherCallback, callback]
      }

      object.off(type, callback)

      expect(object[EVENT_PROPERTY]).toEqual({
        [type]: expect.any(Array),
        [otherType]: expect.any(Array)
      })

      expect(object[EVENT_PROPERTY][type]).toEqual([otherCallback])
      expect(object[EVENT_PROPERTY][otherType]).toEqual([otherCallback, callback])
    })

    it('removes "type" if it only contains the "callback"', () => {
      const object = new ClassWithEvent()

      object[EVENT_PROPERTY] = { [type]: [callback] }
      object.off(type, callback)

      expect(object[EVENT_PROPERTY]).toEqual({})
    })

    it('removes "type" if no "callback" are reported', () => {
      const object = new ClassWithEvent()

      object[EVENT_PROPERTY] = { [type]: [callback, otherCallback] }
      object.off(type)

      expect(object[EVENT_PROPERTY]).toEqual({})
    })

    it('does nothing if "type" is not registered', () => {
      const object = new ClassWithEvent()

      object[EVENT_PROPERTY] = { [otherType]: [callback, otherCallback] }
      object.off(type, callback)

      expect(object[EVENT_PROPERTY]).toEqual({ [otherType]: expect.any(Array) })
      expect(object[EVENT_PROPERTY][otherType]).toEqual([callback, otherCallback])
    })
  })

  describe('when "type" is a "RegExp"', () => {
    const anotherType = 'event'
    const expression = /type/g

    it('removes "callback" that "type" matches with "expression"', () => {
      const object = new ClassWithEvent()

      object[EVENT_PROPERTY] = {
        [type]: [callback],
        [otherType]: [otherCallback, callback],
        [anotherType]: [callback]
      }

      object.off(expression, callback)

      expect(object[EVENT_PROPERTY]).toEqual({
        [otherType]: expect.any(Array),
        [anotherType]: expect.any(Array)
      })

      expect(object[EVENT_PROPERTY][otherType]).toEqual([otherCallback])
      expect(object[EVENT_PROPERTY][anotherType]).toEqual([callback])
    })

    it('removes "type" matches with "expression" if no "callback" are reported', () => {
      const object = new ClassWithEvent()

      object[EVENT_PROPERTY] = {
        [type]: [callback, otherCallback],
        [anotherType]: [callback]
      }

      object.off(expression)

      expect(object[EVENT_PROPERTY]).toEqual({
        [anotherType]: expect.any(Array)
      })

      expect(object[EVENT_PROPERTY][anotherType]).toEqual([callback])
    })
  })

  it('returns "this"', () => {
    const object = new ClassWithEvent()

    expect(object.off(type, callback)).toBe(object)
  })
})
