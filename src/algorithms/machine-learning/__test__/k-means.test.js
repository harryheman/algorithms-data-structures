import KMeans from '../k-means'

describe('kMeans', () => {
  it('должен выбрасывать исключение при невалидных данных', () => {
    expect(() => {
      KMeans()
    }).toThrowError('Отсутствуют данные для классификации!')
  })

  it('должен выбрасывать исключение при несогласованных данных', () => {
    expect(() => {
      KMeans([[1, 2], [1]], 2)
    }).toThrowError('Матрицы имеют разную форму!')
  })

  it('должен находить ближайших соседей', () => {
    const data = [
      [1, 1],
      [6, 2],
      [3, 3],
      [4, 5],
      [9, 2],
      [2, 4],
      [8, 7],
    ]
    const k = 2
    const expectedClusters = [0, 1, 0, 1, 1, 0, 1]
    expect(KMeans(data, k)).toEqual(expectedClusters)

    expect(
      KMeans(
        [
          [0, 0],
          [0, 1],
          [10, 10],
        ],
        2,
      ),
    ).toEqual([0, 0, 1])
  })

  it('должен находить кластеры с равными расстояниями', () => {
    const dataSet = [
      [0, 0],
      [1, 1],
      [2, 2],
    ]
    const k = 3
    const expectedCluster = [0, 1, 2]
    expect(KMeans(dataSet, k)).toEqual(expectedCluster)
  })

  it('должен находить ближайших соседей в 3D пространстве', () => {
    const dataSet = [
      [0, 0, 0],
      [0, 1, 0],
      [2, 0, 2],
    ]
    const k = 2
    const expectedCluster = [1, 1, 0]
    expect(KMeans(dataSet, k)).toEqual(expectedCluster)
  })
})
