import Item from '../item'

describe('Item', () => {
  it('должен выполнить базовые манипуляции с выделенным элементом', () => {
    const itemA = new Item('A')
    const itemB = new Item('B')
    const itemC = new Item('C')
    const itemD = new Item('D')

    expect(itemA.getRank()).toBe(0)
    expect(itemA.getChildren()).toEqual([])
    expect(itemA.getKey()).toBe('A')
    expect(itemA.getRoot()).toEqual(itemA)
    expect(itemA.isRoot()).toBe(true)
    expect(itemB.isRoot()).toBe(true)

    itemA.addChild(itemB)
    itemD.setParent(itemC)

    expect(itemA.getRank()).toBe(1)
    expect(itemC.getRank()).toBe(1)

    expect(itemB.getRank()).toBe(0)
    expect(itemD.getRank()).toBe(0)

    expect(itemA.getChildren().length).toBe(1)
    expect(itemC.getChildren().length).toBe(1)

    expect(itemA.getChildren()[0]).toEqual(itemB)
    expect(itemC.getChildren()[0]).toEqual(itemD)

    expect(itemB.getChildren().length).toBe(0)
    expect(itemD.getChildren().length).toBe(0)

    expect(itemA.getRoot()).toEqual(itemA)
    expect(itemB.getRoot()).toEqual(itemA)

    expect(itemC.getRoot()).toEqual(itemC)
    expect(itemD.getRoot()).toEqual(itemC)

    expect(itemA.isRoot()).toBe(true)
    expect(itemB.isRoot()).toBe(false)
    expect(itemC.isRoot()).toBe(true)
    expect(itemD.isRoot()).toBe(false)

    itemA.addChild(itemC)

    expect(itemA.isRoot()).toBe(true)
    expect(itemB.isRoot()).toBe(false)
    expect(itemC.isRoot()).toBe(false)
    expect(itemD.isRoot()).toBe(false)

    expect(itemA.getRank()).toEqual(3)
    expect(itemB.getRank()).toEqual(0)
    expect(itemC.getRank()).toEqual(1)
  })

  it('должен выполнить базовые манипуляции с выделенным элементом с кастомной функцией извлечения ключа', () => {
    const keyExtractor = (value) => value.key

    const itemA = new Item({ key: 'A', value: 1 }, keyExtractor)
    const itemB = new Item({ key: 'B', value: 2 }, keyExtractor)
    const itemC = new Item({ key: 'C', value: 3 }, keyExtractor)
    const itemD = new Item({ key: 'D', value: 4 }, keyExtractor)

    expect(itemA.getRank()).toBe(0)
    expect(itemA.getChildren()).toEqual([])
    expect(itemA.getKey()).toBe('A')
    expect(itemA.getRoot()).toEqual(itemA)
    expect(itemA.isRoot()).toBe(true)
    expect(itemB.isRoot()).toBe(true)

    itemA.addChild(itemB)
    itemD.setParent(itemC)

    expect(itemA.getRank()).toBe(1)
    expect(itemC.getRank()).toBe(1)

    expect(itemB.getRank()).toBe(0)
    expect(itemD.getRank()).toBe(0)

    expect(itemA.getChildren().length).toBe(1)
    expect(itemC.getChildren().length).toBe(1)

    expect(itemA.getChildren()[0]).toEqual(itemB)
    expect(itemC.getChildren()[0]).toEqual(itemD)

    expect(itemB.getChildren().length).toBe(0)
    expect(itemD.getChildren().length).toBe(0)

    expect(itemA.getRoot()).toEqual(itemA)
    expect(itemB.getRoot()).toEqual(itemA)

    expect(itemC.getRoot()).toEqual(itemC)
    expect(itemD.getRoot()).toEqual(itemC)

    expect(itemA.isRoot()).toBe(true)
    expect(itemB.isRoot()).toBe(false)
    expect(itemC.isRoot()).toBe(true)
    expect(itemD.isRoot()).toBe(false)

    itemA.addChild(itemC)

    expect(itemA.isRoot()).toBe(true)
    expect(itemB.isRoot()).toBe(false)
    expect(itemC.isRoot()).toBe(false)
    expect(itemD.isRoot()).toBe(false)

    expect(itemA.getRank()).toEqual(3)
    expect(itemB.getRank()).toEqual(0)
    expect(itemC.getRank()).toEqual(1)
  })
})
