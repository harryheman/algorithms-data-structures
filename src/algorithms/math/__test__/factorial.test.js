import factorial from '../factorial'

describe('factorial', () => {
  it('должна вычислять факториал числа', () => {
    expect(factorial(0)).toBe(1)
    expect(factorial(1)).toBe(1)
    expect(factorial(5)).toBe(120)
    expect(factorial(8)).toBe(40320)
    expect(factorial(10)).toBe(3628800)
  })
})
