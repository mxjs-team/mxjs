import { EVENT_PROPERTY } from '../../src/event/constants'
import EventMixin from '../../src/event/EventMixin'

describe('EventMixin#trigger', () => {
  const ClassWithEvent = EventMixin(class {})
  const callback = jest.fn()
  const otherCallback = jest.fn()
  const anotherCallback = jest.fn()
  const type = 'type'
  const otherType = 'other-type'

  describe('when "type" is a "string"', () => {
    it('performs callbacks associated with event`s "type"', () => {
      const object = new ClassWithEvent()

      object[EVENT_PROPERTY] = {
        [type]: [callback, otherCallback],
        [otherType]: [anotherCallback]
      }

      object.trigger(type)

      expect(callback).toBeCalled()
      expect(otherCallback).toBeCalled()
      expect(anotherCallback).not.toBeCalled()
    })

    it('assigns object "this"`s to callback "this" by default', () => {
      const object = new ClassWithEvent()
      const callback = jest.fn(function () { return this })

      object[EVENT_PROPERTY] = { [type]: [callback] }
      object.trigger(type)

      expect(callback).toReturnWith(object)
    })

    it('assigns "thisObject" to callback "this"', () => {
      const object = new ClassWithEvent()
      const thisObject = {}
      const callback = jest.fn(function () { return this })

      object[EVENT_PROPERTY] = { [type]: [callback] }
      object.trigger(type, undefined, thisObject)

      expect(callback).toReturnWith(thisObject)
    })

    it('passes "data" as "callback"`s argument', () => {
      const object = new ClassWithEvent()
      const data = {}

      object[EVENT_PROPERTY] = { [type]: [callback] }
      object.trigger(type, data)

      expect(callback).toBeCalledWith(data)
    })
  })

  describe('when "type" is a "RegExp"', () => {
    const anotherType = 'event'
    const expression = /type/g

    it('performs callbacks that "type" matches with "expression"', () => {
      const object = new ClassWithEvent()

      object[EVENT_PROPERTY] = {
        [type]: [callback],
        [otherType]: [otherCallback],
        [anotherType]: [anotherCallback]
      }

      object.trigger(expression)

      expect(callback).toBeCalled()
      expect(otherCallback).toBeCalled()
      expect(anotherCallback).not.toBeCalled()
    })

    it('passes "types" "match" with "expression" as "callback"`s second argument', () => {
      const object = new ClassWithEvent()

      object[EVENT_PROPERTY] = { [type]: [callback] }
      object.trigger(expression)

      expect(callback).toBeCalledWith(undefined, expect.any(Array))
    })
  })

  it('returns "this"', () => {
    const object = new ClassWithEvent()

    expect(object.trigger(type)).toBe(object)
  })
})
