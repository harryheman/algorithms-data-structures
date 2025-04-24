import bitsDiff from '../bits-diff'

describe('bitsDiff', () => {
  it('должен вычислить разницу между двумя числами в битах', () => {
    expect(bitsDiff(0, 0)).toBe(0)
    expect(bitsDiff(1, 1)).toBe(0)
    expect(bitsDiff(124, 124)).toBe(0)
    expect(bitsDiff(0, 1)).toBe(1)
    expect(bitsDiff(1, 0)).toBe(1)
    expect(bitsDiff(1, 2)).toBe(2)
    expect(bitsDiff(1, 3)).toBe(1)
  })
})
