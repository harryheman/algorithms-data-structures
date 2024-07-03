import backtracking from '../backtracking'

describe('backtracking', () => {
  it('должен вычислять множества всех подмножеств с помощью рекурсивного подхода', () => {
    expect(backtracking([1])).toEqual([[], [1]])

    expect(backtracking([1, 2, 3])).toEqual([
      [],
      [1],
      [1, 2],
      [1, 2, 3],
      [1, 3],
      [2],
      [2, 3],
      [3],
    ])
  })
})
