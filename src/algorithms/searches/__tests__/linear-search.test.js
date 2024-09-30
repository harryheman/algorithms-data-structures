import linearSearch from '../linear-search'

describe('linearSearch', () => {
  it('должен найти числа в массиве', () => {
    const array = [1, 2, 4, 6, 2]

    expect(linearSearch(array, 10)).toEqual([])
    expect(linearSearch(array, 1)).toEqual([0])
    expect(linearSearch(array, 2)).toEqual([1, 4])
  })

  it('должен найти символы в массиве', () => {
    const array = ['a', 'b', 'a']

    expect(linearSearch(array, 'c')).toEqual([])
    expect(linearSearch(array, 'b')).toEqual([1])
    expect(linearSearch(array, 'a')).toEqual([0, 2])
  })

  it('должен найти объекты в массиве', () => {
    const comparatorCallback = (a, b) => {
      if (a.key === b.key) {
        return 0
      }

      return a.key <= b.key ? -1 : 1
    }

    const array = [{ key: 5 }, { key: 6 }, { key: 7 }, { key: 6 }]

    expect(linearSearch(array, { key: 10 }, comparatorCallback)).toEqual([])
    expect(linearSearch(array, { key: 5 }, comparatorCallback)).toEqual([0])
    expect(linearSearch(array, { key: 6 }, comparatorCallback)).toEqual([1, 3])
  })
})
