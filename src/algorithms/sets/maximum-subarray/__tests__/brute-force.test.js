import bruteForce from '../brute-force'

describe('bruteForce', () => {
  it('должен найти максимальные подмассивы методом грубой силы', () => {
    expect(bruteForce([])).toEqual([])
    expect(bruteForce([0, 0])).toEqual([0])
    expect(bruteForce([0, 0, 1])).toEqual([0, 0, 1])
    expect(bruteForce([0, 0, 1, 2])).toEqual([0, 0, 1, 2])
    expect(bruteForce([0, 0, -1, 2])).toEqual([2])
    expect(bruteForce([-1, -2, -3, -4, -5])).toEqual([-1])
    expect(bruteForce([1, 2, 3, 2, 3, 4, 5])).toEqual([1, 2, 3, 2, 3, 4, 5])
    expect(bruteForce([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toEqual([4, -1, 2, 1])
    expect(bruteForce([-2, -3, 4, -1, -2, 1, 5, -3])).toEqual([4, -1, -2, 1, 5])
    expect(bruteForce([1, -3, 2, -5, 7, 6, -1, 4, 11, -23])).toEqual([
      7, 6, -1, 4, 11,
    ])
  })
})
