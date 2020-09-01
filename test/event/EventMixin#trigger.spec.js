import EventMixin from '../../src/event/EventMixin'

describe('EventMixin#trigger', () => {
  const ClassWithEvent = EventMixin(class {})
  const callback = jest.fn(function () { return this })
  const otherCallback = jest.fn(function () { return this })
  const anotherCallback = jest.fn(function () { return this })

  beforeEach(() => {
    callback.mockClear()
    otherCallback.mockClear()
    anotherCallback.mockClear()
  })

  it('performs "callback" when "subscription"`s "expression" match with "type"', () => {
    const object = new ClassWithEvent()
    const type = 'state.change'

    object.subscribe('state.change', callback)
    object.subscribe(/^state\./g, otherCallback)
    object.subscribe('state.delete', anotherCallback)

    object.trigger(type)

    expect(callback).toBeCalled()
    expect(otherCallback).toBeCalled()
    expect(anotherCallback).not.toBeCalled()
  })

  it('assigns "object" as "callback"`s "this" by default', () => {
    const object = new ClassWithEvent()
    const type = 'state.change'

    object.subscribe('state.change', callback)
    object.trigger(type)

    expect(callback).toReturnWith(object)
  })

  it('assigns "thisObject" to "callback"`s "this"', () => {
    const object = new ClassWithEvent()
    const type = 'state.change'
    const thisObject = {}

    object.subscribe('state.change', callback)
    object.trigger(type, undefined, thisObject)

    expect(callback).toReturnWith(thisObject)
  })

  it('passes "data" and an object with additional informations as "callback" parameters', () => {
    const object = new ClassWithEvent()
    const type = 'state.change'
    const data = {}
    const subscription = object.subscribe('state.change', callback)

    object.trigger(type, data)

    expect(callback).toBeCalledWith(
      data,
      expect.objectContaining({ subscription })
    )
  })

  it('passes "matchArray" as attribute in additional informations when "subscription"`s "expression" is a "RegExp"', () => {
    const object = new ClassWithEvent()
    const expression = /^state/g
    const type = 'state.change'
    const data = {}
    const subscription = object.subscribe(expression, callback)

    object.trigger(type, data)

    expect(callback).toBeCalledWith(
      data,
      expect.objectContaining({ subscription, matchArray: expect.any(Array) })
    )
  })

  it('returns "this"', () => {
    const object = new ClassWithEvent()
    const type = 'type'

    expect(object.trigger(type)).toBe(object)
  })
})
