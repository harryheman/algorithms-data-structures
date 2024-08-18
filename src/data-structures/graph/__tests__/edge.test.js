import Edge from '../edge'
import Node from '../node'

describe('Edge', () => {
  it('должена создать ребро графа с дефолтным весом', () => {
    const from = new Node('A')
    const to = new Node('B')
    const edge = new Edge(from, to)

    expect(edge.getKey()).toBe('A_B')
    expect(edge.toString()).toBe('A_B')
    expect(edge.from).toEqual(from)
    expect(edge.to).toEqual(to)
    expect(edge.weight).toEqual(0)
  })

  it('должена создать граф с указанным весом', () => {
    const from = new Node('A')
    const to = new Node('B')
    const edge = new Edge(from, to, 10)

    expect(edge.from).toEqual(from)
    expect(edge.to).toEqual(to)
    expect(edge.weight).toEqual(10)
  })

  it('должен инвертировать ребро', () => {
    const nodeA = new Node('A')
    const nodeB = new Node('B')
    const edge = new Edge(nodeA, nodeB, 10)

    expect(edge.from).toEqual(nodeA)
    expect(edge.to).toEqual(nodeB)
    expect(edge.weight).toEqual(10)

    edge.reverse()

    expect(edge.from).toEqual(nodeB)
    expect(edge.to).toEqual(nodeA)
    expect(edge.weight).toEqual(10)
  })
})
