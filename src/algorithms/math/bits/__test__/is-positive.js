import isPositive from '../is-positive'

describe('isPositive', () => {
  it('должна определять, является ли число положительным', () => {
    expect(isPositive(1)).toBe(true)
    expect(isPositive(2)).toBe(true)
    expect(isPositive(3)).toBe(true)
    expect(isPositive(5665)).toBe(true)
    expect(isPositive(56644325)).toBe(true)

    expect(isPositive(0)).toBe(false)
    expect(isPositive(-0)).toBe(false)
    expect(isPositive(-1)).toBe(false)
    expect(isPositive(-2)).toBe(false)
    expect(isPositive(-126)).toBe(false)
    expect(isPositive(-5665)).toBe(false)
    expect(isPositive(-56644325)).toBe(false)
  })
})
