import Storage from '../../src/storage/Storage'
import { STORAGE_PROPERTY } from '../../src/storage/constants'

describe('Storage#[get]options', () => {
  it('returns the "options" value', () => {
    const storage = new Storage({})

    expect(storage.options).toBe(storage[STORAGE_PROPERTY].options)
  })
})
