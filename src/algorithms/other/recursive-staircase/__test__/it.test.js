import itRecursiveStaircase from '../it'

describe('itRecursiveStaircase', () => {
  it('should calculate number of variants using Iterative solution', () => {
    expect(() => itRecursiveStaircase(-1)).toThrowError('n меньше нуля!')
    expect(itRecursiveStaircase(0)).toBe(0)
    expect(itRecursiveStaircase(1)).toBe(1)
    expect(itRecursiveStaircase(2)).toBe(2)
    expect(itRecursiveStaircase(3)).toBe(3)
    expect(itRecursiveStaircase(4)).toBe(5)
    expect(itRecursiveStaircase(5)).toBe(8)
    expect(itRecursiveStaircase(6)).toBe(13)
    expect(itRecursiveStaircase(7)).toBe(21)
    expect(itRecursiveStaircase(8)).toBe(34)
    expect(itRecursiveStaircase(9)).toBe(55)
    expect(itRecursiveStaircase(10)).toBe(89)
  })
})
