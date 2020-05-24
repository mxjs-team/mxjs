import { EVENT_PROPERTY } from '../../src/event/constants'
import EventMixin from '../../src/event/EventMixin'

describe('EventMixin#on', () => {
  const ClassWithEvent = EventMixin(class {})

  it('properly records the callbacks in the types', () => {
    const type = 'type'
    const otherType = 'otherType'
    const callback = () => {}
    const otherCallback = () => {}
    const object = new ClassWithEvent()

    object.on(type, callback)

    expect(object[EVENT_PROPERTY]).toEqual({ [type]: expect.any(Array) })
    expect(object[EVENT_PROPERTY][type]).toEqual([callback])

    object.on(type, otherCallback)

    expect(object[EVENT_PROPERTY][type]).toEqual([callback, otherCallback])

    object.on(otherType, otherCallback)

    expect(object[EVENT_PROPERTY]).toEqual({
      [type]: expect.any(Array),
      [otherType]: expect.any(Array)
    })

    expect(object[EVENT_PROPERTY][type]).toEqual([callback, otherCallback])
    expect(object[EVENT_PROPERTY][otherType]).toEqual([otherCallback])
  })

  it('returns "this"', () => {
    const type = 'type'
    const callback = () => {}
    const object = new ClassWithEvent()

    expect(object.on(type, callback)).toBe(object)
  })
})
