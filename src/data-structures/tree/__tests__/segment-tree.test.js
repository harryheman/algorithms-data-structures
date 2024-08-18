import SegmentTree from '../segment-tree'

describe('SegmentTree', () => {
  it('должен построить дерево для массива #0 с длиной, являющейся степенью 2', () => {
    const array = [-1, 2]
    const segmentTree = new SegmentTree(array, Math.min, Infinity)

    expect(segmentTree.tree).toEqual([-1, -1, 2])
    expect(segmentTree.tree.length).toBe(2 * array.length - 1)
  })

  it('должен построить дерево для массива #1 с длиной, являющейся степень 2', () => {
    const array = [-1, 2, 4, 0]
    const segmentTree = new SegmentTree(array, Math.min, Infinity)

    expect(segmentTree.tree).toEqual([-1, -1, 0, -1, 2, 4, 0])
    expect(segmentTree.tree.length).toBe(2 * array.length - 1)
  })

  it('должен построить дерево для массива #0 с длиной, НЕ являющейся степень 2', () => {
    const array = [0, 1, 2]
    const segmentTree = new SegmentTree(array, Math.min, Infinity)

    expect(segmentTree.tree).toEqual([0, 0, 2, 0, 1, null, null])
    expect(segmentTree.tree.length).toBe(2 * 4 - 1)
  })

  it('должен построить дерево для массива #1 с длиной, НЕ являющейся степень 2', () => {
    const array = [-1, 3, 4, 0, 2, 1]
    const segmentTree = new SegmentTree(array, Math.min, Infinity)

    expect(segmentTree.tree).toEqual([
      -1,
      -1,
      0,
      -1,
      4,
      0,
      1,
      -1,
      3,
      null,
      null,
      0,
      2,
      null,
      null,
    ])
    expect(segmentTree.tree.length).toBe(2 * 8 - 1)
  })

  it('должен построить максимальное дерево (предок является максимальным потомком)', () => {
    const array = [-1, 2, 4, 0]
    const segmentTree = new SegmentTree(array, Math.max, -Infinity)

    expect(segmentTree.tree).toEqual([4, 2, 4, -1, 2, 4, 0])
    expect(segmentTree.tree.length).toBe(2 * array.length - 1)
  })

  it('должен построить суммарное дерево (редок является суммой потомков)', () => {
    const array = [-1, 2, 4, 0]
    const segmentTree = new SegmentTree(array, (a, b) => a + b, 0)

    expect(segmentTree.tree).toEqual([5, 1, 4, -1, 2, 4, 0])
    expect(segmentTree.tree.length).toBe(2 * array.length - 1)
  })

  it('должен выполнить минимальный запрос диапазона на массиве с длиной, являющейся степенью 2', () => {
    const array = [-1, 3, 4, 0, 2, 1]
    const segmentTree = new SegmentTree(array, Math.min, Infinity)

    expect(segmentTree.rangeQuery(0, 5)).toBe(-1)
    expect(segmentTree.rangeQuery(0, 2)).toBe(-1)
    expect(segmentTree.rangeQuery(1, 3)).toBe(0)
    expect(segmentTree.rangeQuery(2, 4)).toBe(0)
    expect(segmentTree.rangeQuery(4, 5)).toBe(1)
    expect(segmentTree.rangeQuery(2, 2)).toBe(4)
  })

  it('должен выполнить минимальный запрос диапазона на массиве с длиной, НЕ являющейся степенью 2', () => {
    const array = [-1, 2, 4, 0]
    const segmentTree = new SegmentTree(array, Math.min, Infinity)

    expect(segmentTree.rangeQuery(0, 4)).toBe(-1)
    expect(segmentTree.rangeQuery(0, 1)).toBe(-1)
    expect(segmentTree.rangeQuery(1, 3)).toBe(0)
    expect(segmentTree.rangeQuery(1, 2)).toBe(2)
    expect(segmentTree.rangeQuery(2, 3)).toBe(0)
    expect(segmentTree.rangeQuery(2, 2)).toBe(4)
  })

  it('должен выполнить максимальный запрос диапазона', () => {
    const array = [-1, 3, 4, 0, 2, 1]
    const segmentTree = new SegmentTree(array, Math.max, -Infinity)

    expect(segmentTree.rangeQuery(0, 5)).toBe(4)
    expect(segmentTree.rangeQuery(0, 1)).toBe(3)
    expect(segmentTree.rangeQuery(1, 3)).toBe(4)
    expect(segmentTree.rangeQuery(2, 4)).toBe(4)
    expect(segmentTree.rangeQuery(4, 5)).toBe(2)
    expect(segmentTree.rangeQuery(3, 3)).toBe(0)
  })

  it('должен выполнить суммарный запрос диапазона', () => {
    const array = [-1, 3, 4, 0, 2, 1]
    const segmentTree = new SegmentTree(array, (a, b) => a + b, 0)

    expect(segmentTree.rangeQuery(0, 5)).toBe(9)
    expect(segmentTree.rangeQuery(0, 1)).toBe(2)
    expect(segmentTree.rangeQuery(1, 3)).toBe(7)
    expect(segmentTree.rangeQuery(2, 4)).toBe(6)
    expect(segmentTree.rangeQuery(4, 5)).toBe(3)
    expect(segmentTree.rangeQuery(3, 3)).toBe(0)
  })
})
