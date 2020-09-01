import Storage from '../../src/storage/Storage'

describe('Storage#set', () => {
  it('changes the value of "state"`s property based on "path"', () => {
    const initialState = {
      property: [
        'value',
        {
          otherProperty: 'other value'
        }
      ]
    }

    const storage = new Storage(initialState)
    const setState = jest.spyOn(storage, 'state', 'set')
    const path = 'property[1].otherProperty'
    const value = 'new value'

    storage.set(path, value)

    expect(setState).toBeCalledWith({
      property: [
        'value',
        {
          otherProperty: value
        }
      ]
    })
  })
})
