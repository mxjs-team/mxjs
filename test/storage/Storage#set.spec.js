import Storage from '../../src/storage/Storage'

describe('Storage#set', () => {
  const initialState = {
    property: ['value', { otherProperty: 'other value' }]
  }

  const value = 'new value'

  it('changes the value of "state"`s property based on "path"', () => {
    const storage = new Storage(initialState)
    const setState = jest.spyOn(storage, 'state', 'set')
    const path = 'property[1].otherProperty'

    storage.set(path, value)

    expect(setState).toBeCalledWith({
      property: ['value', { otherProperty: value }]
    })
  })

  describe('when "path" starts with "."', () => {
    const path = '.property[1].otherProperty'

    it('changes the value of "state"`s property based on "path"', () => {
      const storage = new Storage(initialState)
      const setState = jest.spyOn(storage, 'state', 'set')

      storage.set(path, value)

      expect(setState).toBeCalledWith({
        property: ['value', { otherProperty: value }]
      })
    })
  })
})
