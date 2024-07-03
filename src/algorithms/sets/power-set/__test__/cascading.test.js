import cascading from '../cascading'

describe('cascading', () => {
  it('должен вычислять множества всех подмножеств с помощью каскадного подхода', () => {
    expect(cascading([1])).toEqual([[], [1]])

    expect(cascading([1, 2])).toEqual([[], [1], [2], [1, 2]])

    expect(cascading([1, 2, 3])).toEqual([
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
