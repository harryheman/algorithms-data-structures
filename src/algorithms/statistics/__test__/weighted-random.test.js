import weightedRandom from '../weighted-random'

describe('weightedRandom', () => {
  it('должен выбрасывать исключение пр пустом массиве элементов', () => {
    const getWeightedRandomWithInvalidInputs = () => {
      weightedRandom([], [])
    }
    expect(getWeightedRandomWithInvalidInputs).toThrow(
      'Элементы/веса не должны быть пустыми!',
    )
  })

  it('должен выбрасывать исключение при несовпадении количества элементов и весов', () => {
    const getWeightedRandomWithInvalidInputs = () => {
      weightedRandom(['a', 'b', 'c'], [10, 0])
    }
    expect(getWeightedRandomWithInvalidInputs).toThrow(
      'Элементы и веса должны быть одинаковой длины!',
    )
  })

  it('должен правильно выполнять произвольную выборку на основе весов в простых случаях', () => {
    expect(weightedRandom(['a', 'b', 'c'], [1, 0, 0])).toEqual({
      index: 0,
      item: 'a',
    })
    expect(weightedRandom(['a', 'b', 'c'], [0, 1, 0])).toEqual({
      index: 1,
      item: 'b',
    })
    expect(weightedRandom(['a', 'b', 'c'], [0, 0, 1])).toEqual({
      index: 2,
      item: 'c',
    })
    expect(weightedRandom(['a', 'b', 'c'], [0, 1, 1])).not.toEqual({
      index: 0,
      item: 'a',
    })
    expect(weightedRandom(['a', 'b', 'c'], [1, 0, 1])).not.toEqual({
      index: 1,
      item: 'b',
    })
    expect(weightedRandom(['a', 'b', 'c'], [1, 1, 0])).not.toEqual({
      index: 2,
      item: 'c',
    })
  })

  it('должен правильно выполнять произвольную выборку на основе весов', () => {
    // Количество выборок
    const ATTEMPTS_NUM = 1000
    // Дельта +/- количества выборок элемента.
    // Например, если мы хотим, чтобы элемент 'a' выбирался 300 раз из 1000 (30%),
    // тогда 267 раз является приемлемым, поскольку это больше 250 (300 - 50)
    // и меньше 350 (300 + 50)
    const THRESHOLD = 50

    const items = ['a', 'b', 'c'] // Значения элементов неважны
    const weights = [0.1, 0.3, 0.6]

    const counter = []
    for (let i = 0; i < ATTEMPTS_NUM; i += 1) {
      const randomItem = weightedRandom(items, weights)
      if (!counter[randomItem.index]) {
        counter[randomItem.index] = 1
      } else {
        counter[randomItem.index] += 1
      }
    }

    for (let itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
      /*
        Элемент под индексом 0 должен выбираться 100 раз (в идеале)
        или, учитывая порог, [100 - 50, 100 + 50] раз.

        Элемент под индексом 1 должен выбираться 300 раз (в идеале)
        или, учитывая порог, [300 - 50, 300 + 50] раз.

        Элемент под индексом 2 должен выбираться 600 раз (в идеале)
        или, учитывая порог, [600 - 50, 600 + 50] раз
       */
      expect(counter[itemIndex]).toBeGreaterThan(
        ATTEMPTS_NUM * weights[itemIndex] - THRESHOLD,
      )
      expect(counter[itemIndex]).toBeLessThan(
        ATTEMPTS_NUM * weights[itemIndex] + THRESHOLD,
      )
    }
  })
})
