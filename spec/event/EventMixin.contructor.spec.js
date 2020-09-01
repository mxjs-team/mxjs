import { EVENT_PROPERTY } from '../../src/event/constants'
import EventMixin from '../../src/event/EventMixin'

describe('EventMixin.constructor', () => {
  const ClassWithEvent = EventMixin(class {})

  it('creates an "EVENT_PROPERTY" attribute with an empty "Map"', () => {
    const object = new ClassWithEvent()

    expect(object).toEqual({})
    expect(object[EVENT_PROPERTY] instanceof Map).toBeTruthy()
    expect(object[EVENT_PROPERTY].size).toBe(0)
  })
})
