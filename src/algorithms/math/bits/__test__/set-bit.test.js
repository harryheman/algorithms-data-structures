import setBit from '../set-bit'

describe('setBit', () => {
  it('должен установить биты на указанные позиции', () => {
    // 1 = 0b0001
    expect(setBit(1, 0)).toBe(1)
    expect(setBit(1, 1)).toBe(3)
    expect(setBit(1, 2)).toBe(5)

    // 10 = 0b1010
    expect(setBit(10, 0)).toBe(11)
    expect(setBit(10, 1)).toBe(10)
    expect(setBit(10, 2)).toBe(14)
  })
})
