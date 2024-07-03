import euclideanDistance from '../euclidean-distance'

describe('euclideanDistance', () => {
  it('должен вычислять евклидово расстояние между векторами', () => {
    expect(euclideanDistance([[1]], [[2]])).toEqual(1)
    expect(euclideanDistance([[2]], [[1]])).toEqual(1)
    expect(euclideanDistance([[5, 8]], [[7, 3]])).toEqual(5.39)
    expect(euclideanDistance([[5], [8]], [[7], [3]])).toEqual(5.39)
    expect(euclideanDistance([[8, 2, 6]], [[3, 5, 7]])).toEqual(5.92)
    expect(euclideanDistance([[8], [2], [6]], [[3], [5], [7]])).toEqual(5.92)
    expect(
      euclideanDistance([[[8]], [[2]], [[6]]], [[[3]], [[5]], [[7]]]),
    ).toEqual(5.92)
  })

  it('должен выбрасывать исключения, если матрицы имеют разную форму', () => {
    expect(() => euclideanDistance([[1]], [[[2]]])).toThrowError(
      'Матрицы имеют разные направления!',
    )

    expect(() => euclideanDistance([[1]], [[2, 3]])).toThrowError(
      'Матрицы имеют разную форму!',
    )
  })
})
