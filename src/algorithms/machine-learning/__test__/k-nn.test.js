import kNN from '../k-nn'

describe('kNN', () => {
  it('должен выбрасывать исключение при неправильных данных', () => {
    expect(() => {
      kNN()
    }).toThrowError('Отсутствует обязательный параметр!')
  })

  it('должен выбрасывать исключение при неправильных метках', () => {
    const noLabels = () => {
      kNN([[1, 1]])
    }
    expect(noLabels).toThrowError('Отсутствует обязательный параметр!')
  })

  it('должен выбрасывать исключение при отсутствии вектора классификации #1', () => {
    const noClassification = () => {
      kNN([[1, 1]], [1])
    }
    expect(noClassification).toThrowError('Отсутствует обязательный параметр!')
  })

  it('должен выбрасывать исключение при отсутствии вектора классификации #2', () => {
    const inconsistent = () => {
      kNN([[1, 1]], [1], [1])
    }
    expect(inconsistent).toThrowError('Матрицы имеют разную форму!')
  })

  it('должен находить ближайших соседей', () => {
    let dataSet
    let labels
    let toClassify
    let expectedClass

    dataSet = [
      [1, 1],
      [2, 2],
    ]
    labels = [1, 2]
    toClassify = [1, 1]
    expectedClass = 1
    expect(kNN(dataSet, labels, toClassify)).toBe(expectedClass)

    dataSet = [
      [1, 1],
      [6, 2],
      [3, 3],
      [4, 5],
      [9, 2],
      [2, 4],
      [8, 7],
    ]
    labels = [1, 2, 1, 2, 1, 2, 1]
    toClassify = [1.25, 1.25]
    expectedClass = 1
    expect(kNN(dataSet, labels, toClassify)).toBe(expectedClass)

    dataSet = [
      [1, 1],
      [6, 2],
      [3, 3],
      [4, 5],
      [9, 2],
      [2, 4],
      [8, 7],
    ]
    labels = [1, 2, 1, 2, 1, 2, 1]
    toClassify = [1.25, 1.25]
    expectedClass = 2
    expect(kNN(dataSet, labels, toClassify, 5)).toBe(expectedClass)
  })

  it('должен находить ближайших соседей с равными расстояниями', () => {
    const dataSet = [
      [0, 0],
      [1, 1],
      [0, 2],
    ]
    const labels = [1, 3, 3]
    const toClassify = [0, 1]
    const expectedClass = 3
    expect(kNN(dataSet, labels, toClassify)).toBe(expectedClass)
  })

  it('должен находить ближайших соседей в 3D пространстве', () => {
    const dataSet = [
      [0, 0, 0],
      [0, 1, 1],
      [0, 0, 2],
    ]
    const labels = [1, 3, 3]
    const toClassify = [0, 0, 1]
    const expectedClass = 3
    expect(kNN(dataSet, labels, toClassify)).toBe(expectedClass)
  })
})
