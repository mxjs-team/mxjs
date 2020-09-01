import { EVENT_PROPERTY } from '../../src/event/constants'
import EventMixin from '../../src/event/EventMixin'

describe('EventMixin#unsubscribe', () => {
  const ClassWithEvent = EventMixin(class {})

  it('returns "true" when unsubscribing a "subscription"', () => {
    const object = new ClassWithEvent()
    const subscription = object.subscribe('event-type', () => {})
    const otherSubscription = object.subscribe('event-type', () => {})

    expect(object.unsubscribe(subscription)).toBeTruthy()
    expect(object[EVENT_PROPERTY].get(subscription)).toBeUndefined()
    expect(object[EVENT_PROPERTY].get(otherSubscription)).not.toBeUndefined()
  })

  it('returns "false" if "subscription" is not registered', () => {
    const object = new ClassWithEvent()
    const subscription = object.subscribe('event-type', () => {})
    const otherSubscription = object.subscribe('event-type', () => {})

    expect(object.unsubscribe(Symbol())).toBeFalsy()
    expect(object[EVENT_PROPERTY].get(subscription)).not.toBeUndefined()
    expect(object[EVENT_PROPERTY].get(otherSubscription)).not.toBeUndefined()
  })
})
