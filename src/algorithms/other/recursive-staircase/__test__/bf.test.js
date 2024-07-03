import bfRecursiveStaircase from '../bf'

describe('bfRecursiveStaircase', () => {
  it('должен вычислять количество вариантов методом грубой силы', () => {
    expect(() => bfRecursiveStaircase(-1)).toThrowError('n меньше нуля!')
    expect(bfRecursiveStaircase(0)).toBe(0)
    expect(bfRecursiveStaircase(1)).toBe(1)
    expect(bfRecursiveStaircase(2)).toBe(2)
    expect(bfRecursiveStaircase(3)).toBe(3)
    expect(bfRecursiveStaircase(4)).toBe(5)
    expect(bfRecursiveStaircase(5)).toBe(8)
    expect(bfRecursiveStaircase(6)).toBe(13)
    expect(bfRecursiveStaircase(7)).toBe(21)
    expect(bfRecursiveStaircase(8)).toBe(34)
    expect(bfRecursiveStaircase(9)).toBe(55)
    expect(bfRecursiveStaircase(10)).toBe(89)
  })
})
