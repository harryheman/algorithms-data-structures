import isPowerOfTwoBitwise from '../is-power-of-two-bitwise'

describe('isPowerOfTwoBitwise', () => {
  it('должен проверить, является ли переданное число результатом возведения числа 2 в какую-либо степень, используя битовые операции', () => {
    expect(isPowerOfTwoBitwise(-1)).toBe(false)
    expect(isPowerOfTwoBitwise(0)).toBe(false)
    expect(isPowerOfTwoBitwise(1)).toBe(true)
    expect(isPowerOfTwoBitwise(2)).toBe(true)
    expect(isPowerOfTwoBitwise(3)).toBe(false)
    expect(isPowerOfTwoBitwise(4)).toBe(true)
    expect(isPowerOfTwoBitwise(5)).toBe(false)
    expect(isPowerOfTwoBitwise(6)).toBe(false)
    expect(isPowerOfTwoBitwise(7)).toBe(false)
    expect(isPowerOfTwoBitwise(8)).toBe(true)
    expect(isPowerOfTwoBitwise(10)).toBe(false)
    expect(isPowerOfTwoBitwise(12)).toBe(false)
    expect(isPowerOfTwoBitwise(16)).toBe(true)
    expect(isPowerOfTwoBitwise(31)).toBe(false)
    expect(isPowerOfTwoBitwise(64)).toBe(true)
    expect(isPowerOfTwoBitwise(1024)).toBe(true)
    expect(isPowerOfTwoBitwise(1023)).toBe(false)
  })
})
