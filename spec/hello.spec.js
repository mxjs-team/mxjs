import hello from '../src/hello'

describe('hello', () => {
  it('returns "Hello world!"', () => {
    expect(hello()).toBe('Hello world!')
  })

  it('returns "hello ${argument}!" if there is "argument"', () => {
    expect(hello('baby')).toBe('Hello baby!')
  })
})
