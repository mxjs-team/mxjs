import Storage from '../../src/storage/Storage'

describe('Storage#get', () => {
  it('returns the value of "state"`s property based on "path"', () => {
    const initialState = {
      property: [
        'value',
        {
          otherProperty: 'other value'
        }
      ]
    }

    const storage = new Storage(initialState)
    const path = 'property[1].otherProperty'

    expect(storage.get(path)).toBe(storage.state.property[1].otherProperty)
  })
})
