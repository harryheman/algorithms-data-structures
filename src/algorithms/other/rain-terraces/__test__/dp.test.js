import dpRainTerraces from '../dp'

describe('dpRainTerraces', () => {
  it('должен находить количество воды, собираемой после дождя', () => {
    expect(dpRainTerraces([1])).toBe(0)
    expect(dpRainTerraces([1, 0])).toBe(0)
    expect(dpRainTerraces([0, 1])).toBe(0)
    expect(dpRainTerraces([0, 1, 0])).toBe(0)
    expect(dpRainTerraces([0, 1, 0, 0])).toBe(0)
    expect(dpRainTerraces([0, 1, 0, 0, 1, 0])).toBe(2)
    expect(dpRainTerraces([0, 2, 0, 0, 1, 0])).toBe(2)
    expect(dpRainTerraces([2, 0, 2])).toBe(2)
    expect(dpRainTerraces([2, 0, 5])).toBe(2)
    expect(dpRainTerraces([3, 0, 0, 2, 0, 4])).toBe(10)
    expect(dpRainTerraces([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])).toBe(6)
    expect(dpRainTerraces([1, 1, 1, 1, 1])).toBe(0)
    expect(dpRainTerraces([1, 2, 3, 4, 5])).toBe(0)
    expect(dpRainTerraces([4, 1, 3, 1, 2, 1, 2, 1])).toBe(4)
    expect(dpRainTerraces([0, 2, 4, 3, 4, 2, 4, 0, 8, 7, 0])).toBe(7)
  })
})
