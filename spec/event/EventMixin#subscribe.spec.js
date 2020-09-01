import { EVENT_PROPERTY } from '../../src/event/constants'
import EventMixin from '../../src/event/EventMixin'

describe('EventMixin#subscribe', () => {
  const ClassWithEvent = EventMixin(class {})

  it('returns a subscription', () => {
    const object = new ClassWithEvent()
    const expression = 'event-type'
    const callback = () => {}
    const subscription = object.subscribe(expression, callback)

    expect(typeof subscription).toBe('symbol')
    expect(object[EVENT_PROPERTY].get(subscription)).toEqual({ expression, callback })
  })
})
