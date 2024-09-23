import dynamicProgramming from '../dynamic-programming'

describe('dynamicProgramming', () => {
  it('должен найти максимальные подмассивы методом динамического программирования', () => {
    expect(dynamicProgramming([])).toEqual([])
    expect(dynamicProgramming([0, 0])).toEqual([0])
    expect(dynamicProgramming([0, 0, 1])).toEqual([0, 0, 1])
    expect(dynamicProgramming([0, 0, 1, 2])).toEqual([0, 0, 1, 2])
    expect(dynamicProgramming([0, 0, -1, 2])).toEqual([2])
    expect(dynamicProgramming([-1, -2, -3, -4, -5])).toEqual([-1])
    expect(dynamicProgramming([1, 2, 3, 2, 3, 4, 5])).toEqual([
      1, 2, 3, 2, 3, 4, 5,
    ])
    expect(dynamicProgramming([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toEqual([
      4, -1, 2, 1,
    ])
    expect(dynamicProgramming([-2, -3, 4, -1, -2, 1, 5, -3])).toEqual([
      4, -1, -2, 1, 5,
    ])
    expect(dynamicProgramming([1, -3, 2, -5, 7, 6, -1, 4, 11, -23])).toEqual([
      7, 6, -1, 4, 11,
    ])
  })
})
