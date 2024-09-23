import fisherYates from '../fisher-yates'

const sortedArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

describe('fisherYates', () => {
  it('должен тасовать маленькие массивы', () => {
    expect(fisherYates([])).toEqual([])
    expect(fisherYates([1])).toEqual([1])
  })

  it('должен произвольно перетасовать элементы массива', () => {
    const shuffledArray = fisherYates(sortedArr)

    expect(shuffledArray.length).toBe(sortedArr.length)
    expect(shuffledArray).not.toEqual(sortedArr)
    expect(shuffledArray.sort()).toEqual(sortedArr)
  })
})
