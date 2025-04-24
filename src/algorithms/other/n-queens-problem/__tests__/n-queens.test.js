import nQueens from '../n-queens'

describe('nQueens', () => {
  it('должен возвращать пустой массив, свидетельствующий об отсутствии решений дл 3 королев', () => {
    const solutions = nQueens(3)
    expect(solutions.length).toBe(0)
  })

  it('должен решать задачу n-королев для 4 королев', () => {
    const solutions = nQueens(4)
    expect(solutions.length).toBe(2)

    // Первое решение
    expect(solutions[0][0].toString()).toBe('0,1')
    expect(solutions[0][1].toString()).toBe('1,3')
    expect(solutions[0][2].toString()).toBe('2,0')
    expect(solutions[0][3].toString()).toBe('3,2')

    // Второе решение (отраженное)
    expect(solutions[1][0].toString()).toBe('0,2')
    expect(solutions[1][1].toString()).toBe('1,0')
    expect(solutions[1][2].toString()).toBe('2,3')
    expect(solutions[1][3].toString()).toBe('3,1')
  })

  it('должен решать задачу n-королев для 6 королев', () => {
    const solutions = nQueens(6)
    expect(solutions.length).toBe(4)

    // Решение
    expect(solutions[0][0].toString()).toBe('0,1')
    expect(solutions[0][1].toString()).toBe('1,3')
    expect(solutions[0][2].toString()).toBe('2,5')
    expect(solutions[0][3].toString()).toBe('3,0')
    expect(solutions[0][4].toString()).toBe('4,2')
    expect(solutions[0][5].toString()).toBe('5,4')
  })
})
