import mmRecursiveStaircase from '../mm'

describe('mmRecursiveStaircase', () => {
  it('should calculate number of variants using Brute Force with Memoization', () => {
    expect(() => mmRecursiveStaircase(-1)).toThrowError('n меньше нуля!')
    expect(mmRecursiveStaircase(0)).toBe(0)
    expect(mmRecursiveStaircase(1)).toBe(1)
    expect(mmRecursiveStaircase(2)).toBe(2)
    expect(mmRecursiveStaircase(3)).toBe(3)
    expect(mmRecursiveStaircase(4)).toBe(5)
    expect(mmRecursiveStaircase(5)).toBe(8)
    expect(mmRecursiveStaircase(6)).toBe(13)
    expect(mmRecursiveStaircase(7)).toBe(21)
    expect(mmRecursiveStaircase(8)).toBe(34)
    expect(mmRecursiveStaircase(9)).toBe(55)
    expect(mmRecursiveStaircase(10)).toBe(89)
  })
})
