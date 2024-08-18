import * as m from '../matrix'

describe('Matrix', () => {
  it('должен выбрасывать исключения при умножении матриц неправильной формы', () => {
    expect(() => m.dot([0], [1])).toThrowError('Неправильный формат матрицы!')
    expect(() => m.dot([[0]], [1])).toThrowError('Неправильный формат матрицы!')
    expect(() => m.dot([[[0]]], [[1]])).toThrowError(
      'Матрица не является двумерной!',
    )
    expect(() => m.dot([[0]], [[1], [2]])).toThrowError(
      'Матрицы не могут быть перемножены!',
    )
  })

  it('должен вычислять направления матриц', () => {
    expect(m.shape([])).toEqual([0])

    expect(m.shape([[]])).toEqual([1, 0])

    expect(m.shape([[0]])).toEqual([1, 1])

    expect(m.shape([[0, 0]])).toEqual([1, 2])

    expect(
      m.shape([
        [0, 0],
        [0, 0],
      ]),
    ).toEqual([2, 2])

    expect(
      m.shape([
        [0, 0, 0],
        [0, 0, 0],
      ]),
    ).toEqual([2, 3])

    expect(
      m.shape([
        [0, 0],
        [0, 0],
        [0, 0],
      ]),
    ).toEqual([3, 2])

    expect(
      m.shape([
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ]),
    ).toEqual([3, 3])

    expect(m.shape([[0], [0], [0]])).toEqual([3, 1])

    expect(
      m.shape([
        [[0], [0], [0]],
        [[0], [0], [0]],
        [[0], [0], [0]],
      ]),
    ).toEqual([3, 3, 1])

    expect(
      m.shape([
        [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
        ],
        [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
        ],
        [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
        ],
      ]),
    ).toEqual([3, 3, 3])
  })

  it('должен генерировать матрицу нулей', () => {
    expect(m.zeros([1, 0])).toEqual([[]])

    expect(m.zeros([1, 1])).toEqual([[0]])

    expect(m.zeros([1, 3])).toEqual([[0, 0, 0]])

    expect(m.zeros([3, 3])).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ])

    expect(m.zeros([3, 3, 1])).toEqual([
      [[0], [0], [0]],
      [[0], [0], [0]],
      [[0], [0], [0]],
    ])
  })

  it('должен генерировать матрицу с определенными значениями', () => {
    expect(m.generate([1, 0], () => 1)).toEqual([[]])

    expect(m.generate([1, 1], () => 1)).toEqual([[1]])

    expect(m.generate([1, 3], () => 1)).toEqual([[1, 1, 1]])

    expect(m.generate([3, 3], () => 1)).toEqual([
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ])

    expect(m.generate([3, 3, 1], () => 1)).toEqual([
      [[1], [1], [1]],
      [[1], [1], [1]],
      [[1], [1], [1]],
    ])
  })

  it('должен генерировать определенную матрицу на основе указанных индексов ячеек', () => {
    const indicesCallback = jest.fn((indices) => {
      return indices[0] * 10 + indices[1]
    })
    const _m = m.generate([3, 3], indicesCallback)

    expect(indicesCallback).toHaveBeenCalledTimes(3 * 3)
    expect(indicesCallback.mock.calls[0][0]).toEqual([0, 0])
    expect(indicesCallback.mock.calls[1][0]).toEqual([0, 1])
    expect(indicesCallback.mock.calls[2][0]).toEqual([0, 2])
    expect(indicesCallback.mock.calls[3][0]).toEqual([1, 0])
    expect(indicesCallback.mock.calls[4][0]).toEqual([1, 1])
    expect(indicesCallback.mock.calls[5][0]).toEqual([1, 2])
    expect(indicesCallback.mock.calls[6][0]).toEqual([2, 0])
    expect(indicesCallback.mock.calls[7][0]).toEqual([2, 1])
    expect(indicesCallback.mock.calls[8][0]).toEqual([2, 2])
    expect(_m).toEqual([
      [0, 1, 2],
      [10, 11, 12],
      [20, 21, 22],
    ])
  })

  it('должен умножать 2 матрицы', () => {
    let c
    c = m.dot(
      [
        [1, 2],
        [3, 4],
      ],
      [
        [5, 6],
        [7, 8],
      ],
    )
    expect(m.shape(c)).toEqual([2, 2])
    expect(c).toEqual([
      [19, 22],
      [43, 50],
    ])

    c = m.dot(
      [
        [1, 2],
        [3, 4],
      ],
      [[5], [6]],
    )
    expect(m.shape(c)).toEqual([2, 1])
    expect(c).toEqual([[17], [39]])

    c = m.dot(
      [
        [1, 2, 3],
        [4, 5, 6],
      ],
      [
        [7, 8],
        [9, 10],
        [11, 12],
      ],
    )
    expect(m.shape(c)).toEqual([2, 2])
    expect(c).toEqual([
      [58, 64],
      [139, 154],
    ])

    c = m.dot(
      [[3, 4, 2]],
      [
        [13, 9, 7, 5],
        [8, 7, 4, 6],
        [6, 4, 0, 3],
      ],
    )
    expect(m.shape(c)).toEqual([1, 4])
    expect(c).toEqual([[83, 63, 37, 45]])
  })

  it('должен транспонировать матрицы', () => {
    expect(m.transpose([[1, 2, 3]])).toEqual([[1], [2], [3]])

    expect(m.transpose([[1], [2], [3]])).toEqual([[1, 2, 3]])

    expect(
      m.transpose([
        [1, 2, 3],
        [4, 5, 6],
      ]),
    ).toEqual([
      [1, 4],
      [2, 5],
      [3, 6],
    ])

    expect(
      m.transpose([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ]),
    ).toEqual([
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
    ])
  })

  it('должен выбросить исключение при транспонировании не двумерной матрицы', () => {
    expect(() => {
      m.transpose([[[1]]])
    }).toThrowError('Матрица не является двумерной!')
  })

  it('должен сложить 2 матрицы', () => {
    expect(m.add([[1]], [[2]])).toEqual([[3]])

    expect(m.add([[1, 2, 3]], [[4, 5, 6]])).toEqual([[5, 7, 9]])

    expect(m.add([[1], [2], [3]], [[4], [5], [6]])).toEqual([[5], [7], [9]])

    expect(
      m.add(
        [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
        ],
        [
          [10, 11, 12],
          [13, 14, 15],
          [16, 17, 18],
        ],
      ),
    ).toEqual([
      [11, 13, 15],
      [17, 19, 21],
      [23, 25, 27],
    ])

    expect(
      m.add(
        [
          [[1], [2], [3]],
          [[4], [5], [6]],
          [[7], [8], [9]],
        ],
        [
          [[10], [11], [12]],
          [[13], [14], [15]],
          [[16], [17], [18]],
        ],
      ),
    ).toEqual([
      [[11], [13], [15]],
      [[17], [19], [21]],
      [[23], [25], [27]],
    ])
  })

  it('должен выбрасывать исключения при сложении матриц разных форм', () => {
    expect(() => m.add([[0]], [[[0]]])).toThrowError(
      'Матрицы имеют разные направления!',
    )

    expect(() => m.add([[0]], [[0, 0]])).toThrowError(
      'Матрицы имеют разную форму!',
    )
  })

  it('должен умножать матрицы', () => {
    expect(m.multiply([[2]], [[3]])).toEqual([[6]])

    expect(m.multiply([[1, 2, 3]], [[4, 5, 6]])).toEqual([[4, 10, 18]])

    expect(m.multiply([[1], [2], [3]], [[4], [5], [6]])).toEqual([
      [4],
      [10],
      [18],
    ])

    expect(
      m.multiply(
        [
          [1, 2],
          [3, 4],
        ],
        [
          [5, 6],
          [7, 8],
        ],
      ),
    ).toEqual([
      [5, 12],
      [21, 32],
    ])

    expect(
      m.multiply(
        [
          [[1], [2]],
          [[3], [4]],
        ],
        [
          [[5], [6]],
          [[7], [8]],
        ],
      ),
    ).toEqual([
      [[5], [12]],
      [[21], [32]],
    ])
  })

  it('должен выбрасывать исключения при умножении матриц разных форм', () => {
    expect(() => m.multiply([[0]], [[[0]]])).toThrowError(
      'Матрицы имеют разные направления!',
    )

    expect(() => m.multiply([[0]], [[0, 0]])).toThrowError(
      'Матрицы имеют разную форму!',
    )
  })

  it('должен вычитать 2 матрицы', () => {
    expect(m.subtract([[3]], [[2]])).toEqual([[1]])

    expect(m.subtract([[10, 12, 14]], [[4, 5, 6]])).toEqual([[6, 7, 8]])

    expect(m.subtract([[[10], [12], [14]]], [[[4], [5], [6]]])).toEqual([
      [[6], [7], [8]],
    ])

    expect(
      m.subtract(
        [
          [10, 20],
          [30, 40],
        ],
        [
          [5, 6],
          [7, 8],
        ],
      ),
    ).toEqual([
      [5, 14],
      [23, 32],
    ])

    expect(
      m.subtract(
        [
          [[10], [20]],
          [[30], [40]],
        ],
        [
          [[5], [6]],
          [[7], [8]],
        ],
      ),
    ).toEqual([
      [[5], [14]],
      [[23], [32]],
    ])
  })

  it('должен выбрасывать исключения при вычитании матриц разных форм', () => {
    expect(() => m.subtract([[0]], [[[0]]])).toThrowError(
      'Матрицы имеют разные направления!',
    )

    expect(() => m.subtract([[0]], [[0, 0]])).toThrowError(
      'Матрицы имеют разную форму!',
    )
  })
})
