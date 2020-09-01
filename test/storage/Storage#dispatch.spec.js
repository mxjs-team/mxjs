import Storage from '../../src/storage/Storage'

describe('Storage#dispatch', () => {
  it('change "state"`s value for the return of calling "reducer"', () => {
    const initialState = 'initial state'
    const nextState = 'next state'
    const reducer = jest.fn(() => nextState)
    const storage = new Storage(initialState, { reducer })
    const action = 'action'
    const payload = { property: 'value' }

    storage.dispatch(action, payload)

    expect(reducer).toBeCalledWith(initialState, action, payload)
    expect(storage.state).toBe(nextState)
  })
})
