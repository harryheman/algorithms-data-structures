import knightTour from '../knight-tour'

describe('knightTour', () => {
  it('должен проверять отсутствие решения для доски 3x3', () => {
    const moves = knightTour(3)

    expect(moves.length).toBe(0)
  })

  it('должен находить решения для доски 5x5', () => {
    const moves = knightTour(5)

    expect(moves.length).toBe(25)

    expect(moves).toEqual([
      [0, 0],
      [1, 2],
      [2, 0],
      [0, 1],
      [1, 3],
      [3, 4],
      [2, 2],
      [4, 1],
      [3, 3],
      [1, 4],
      [0, 2],
      [1, 0],
      [3, 1],
      [4, 3],
      [2, 4],
      [0, 3],
      [1, 1],
      [3, 0],
      [4, 2],
      [2, 1],
      [4, 0],
      [3, 2],
      [4, 4],
      [2, 3],
      [0, 4],
    ])
  })
})
