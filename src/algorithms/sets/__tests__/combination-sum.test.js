import combinationSum from '../combination-sum'

describe('combinationSum', () => {
  it('должен найти все комбинации чисел для получения указанной суммы', () => {
    expect(combinationSum([1], 4)).toEqual([[1, 1, 1, 1]])

    expect(combinationSum([2, 3, 6, 7], 7)).toEqual([[2, 2, 3], [7]])

    expect(combinationSum([2, 3, 5], 8)).toEqual([
      [2, 2, 2, 2],
      [2, 3, 3],
      [3, 5],
    ])

    expect(combinationSum([2, 5], 3)).toEqual([])

    expect(combinationSum([], 3)).toEqual([])
  })
})
