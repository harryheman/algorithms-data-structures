import dpRecursiveStaircase from '../dp'

describe('dpRecursiveStaircase', () => {
  it('должен вычислять количество вариантов с помощью динамического программирования', () => {
    expect(() => dpRecursiveStaircase(-1)).toThrowError('n меньше нуля!')
    expect(dpRecursiveStaircase(0)).toBe(0)
    expect(dpRecursiveStaircase(1)).toBe(1)
    expect(dpRecursiveStaircase(2)).toBe(2)
    expect(dpRecursiveStaircase(3)).toBe(3)
    expect(dpRecursiveStaircase(4)).toBe(5)
    expect(dpRecursiveStaircase(5)).toBe(8)
    expect(dpRecursiveStaircase(6)).toBe(13)
    expect(dpRecursiveStaircase(7)).toBe(21)
    expect(dpRecursiveStaircase(8)).toBe(34)
    expect(dpRecursiveStaircase(9)).toBe(55)
    expect(dpRecursiveStaircase(10)).toBe(89)
  })
})
