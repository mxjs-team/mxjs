import defaultReducer from '../../src/storage/defaultReducer'

describe('defaultReducer', () => {
  it('returns the "state"', () => {
    const state = {}

    expect(defaultReducer(state)).toBe(state)
  })
})
