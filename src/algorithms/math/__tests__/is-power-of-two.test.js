import isPowerOfTwo from '../is-power-of-two'

describe('isPowerOfTwo', () => {
  it('должен проверить, является ли переданное число результатом возведения числа 2 в какую-либо степень', () => {
    expect(isPowerOfTwo(-1)).toBe(false)
    expect(isPowerOfTwo(0)).toBe(false)
    expect(isPowerOfTwo(1)).toBe(true)
    expect(isPowerOfTwo(2)).toBe(true)
    expect(isPowerOfTwo(3)).toBe(false)
    expect(isPowerOfTwo(4)).toBe(true)
    expect(isPowerOfTwo(5)).toBe(false)
    expect(isPowerOfTwo(6)).toBe(false)
    expect(isPowerOfTwo(7)).toBe(false)
    expect(isPowerOfTwo(8)).toBe(true)
    expect(isPowerOfTwo(10)).toBe(false)
    expect(isPowerOfTwo(12)).toBe(false)
    expect(isPowerOfTwo(16)).toBe(true)
    expect(isPowerOfTwo(31)).toBe(false)
    expect(isPowerOfTwo(64)).toBe(true)
    expect(isPowerOfTwo(1024)).toBe(true)
    expect(isPowerOfTwo(1023)).toBe(false)
  })
})
