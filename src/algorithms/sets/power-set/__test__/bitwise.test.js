import bitwise from '../bitwise'

describe('bitwise', () => {
  it('должен вычислять множества всех подмножеств с помощью бинарного подхода', () => {
    expect(bitwise([1])).toEqual([[], [1]])

    expect(bitwise([1, 2, 3])).toEqual([
      [],
      [1],
      [2],
      [1, 2],
      [3],
      [1, 3],
      [2, 3],
      [1, 2, 3],
    ])
  })
})
