import isEven from '../is-even'

describe('isEven', () => {
  it('должен определить, являются ли числа четными', () => {
    expect(isEven(0)).toBe(true)
    expect(isEven(2)).toBe(true)
    expect(isEven(-2)).toBe(true)
    expect(isEven(1)).toBe(false)
    expect(isEven(-1)).toBe(false)
    expect(isEven(-3)).toBe(false)
    expect(isEven(3)).toBe(false)
    expect(isEven(8)).toBe(true)
    expect(isEven(9)).toBe(false)
    expect(isEven(121)).toBe(false)
    expect(isEven(122)).toBe(true)
    expect(isEven(1201)).toBe(false)
    expect(isEven(1202)).toBe(true)
  })
})
