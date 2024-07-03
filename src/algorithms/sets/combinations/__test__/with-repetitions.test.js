import withRepetitions from '../with-repetitions'
import factorial from '../../../math/factorial'

describe('withRepetitions', () => {
  it('должен комбинировать строку с повторами', () => {
    expect(withRepetitions(['A'], 1)).toEqual([['A']])

    expect(withRepetitions(['A', 'B'], 1)).toEqual([['A'], ['B']])

    expect(withRepetitions(['A', 'B'], 2)).toEqual([
      ['A', 'A'],
      ['A', 'B'],
      ['B', 'B'],
    ])

    expect(withRepetitions(['A', 'B'], 3)).toEqual([
      ['A', 'A', 'A'],
      ['A', 'A', 'B'],
      ['A', 'B', 'B'],
      ['B', 'B', 'B'],
    ])

    expect(withRepetitions(['A', 'B', 'C'], 2)).toEqual([
      ['A', 'A'],
      ['A', 'B'],
      ['A', 'C'],
      ['B', 'B'],
      ['B', 'C'],
      ['C', 'C'],
    ])

    expect(withRepetitions(['A', 'B', 'C'], 3)).toEqual([
      ['A', 'A', 'A'],
      ['A', 'A', 'B'],
      ['A', 'A', 'C'],
      ['A', 'B', 'B'],
      ['A', 'B', 'C'],
      ['A', 'C', 'C'],
      ['B', 'B', 'B'],
      ['B', 'B', 'C'],
      ['B', 'C', 'C'],
      ['C', 'C', 'C'],
    ])

    const combinationOptions = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    const combinationSlotsNumber = 4
    const combinations = withRepetitions(
      combinationOptions,
      combinationSlotsNumber,
    )
    const n = combinationOptions.length
    const r = combinationSlotsNumber
    const expectedNumberOfCombinations =
      factorial(r + n - 1) / (factorial(r) * factorial(n - 1))

    expect(combinations.length).toBe(expectedNumberOfCombinations)
  })
})
