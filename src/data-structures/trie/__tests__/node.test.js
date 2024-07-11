import TrieNode from '../node'

describe('TrieNode', () => {
  it('должен создать узел префиксного дерева', () => {
    const trieNode = new TrieNode('c', true)

    expect(trieNode.char).toBe('c')
    expect(trieNode.isCompleteWord).toBe(true)
    expect(trieNode.toString()).toBe('c*')
  })

  it('должен добавить потомков', () => {
    const trieNode = new TrieNode('c')

    trieNode.addChild('a', true)
    trieNode.addChild('o')

    expect(trieNode.toString()).toBe('c:a,o')
  })

  it('должен извлечь потомков', () => {
    const trieNode = new TrieNode('c')

    trieNode.addChild('a')
    trieNode.addChild('o')

    expect(trieNode.getChild('a').toString()).toBe('a')
    expect(trieNode.getChild('a').char).toBe('a')
    expect(trieNode.getChild('o').toString()).toBe('o')
    expect(trieNode.getChild('b')).toBeNull()
  })

  it('должен определить наличие потомков', () => {
    const trieNode = new TrieNode('c')

    expect(trieNode.hasChildren()).toBe(false)

    trieNode.addChild('a')

    expect(trieNode.hasChildren()).toBe(true)
  })

  it('должен определить наличие конкретного потомка', () => {
    const trieNode = new TrieNode('c')

    trieNode.addChild('a')
    trieNode.addChild('o')

    expect(trieNode.hasChild('a')).toBe(true)
    expect(trieNode.hasChild('o')).toBe(true)
    expect(trieNode.hasChild('b')).toBe(false)
  })

  it('должен получить следующие символы', () => {
    const trieNode = new TrieNode('c')

    trieNode.addChild('a')
    trieNode.addChild('o')

    expect(trieNode.suggestChildren()).toEqual(['a', 'o'])
  })

  it('должен удалить потомка, если у него НЕТ потомков', () => {
    const trieNode = new TrieNode('c')
    trieNode.addChild('a')
    expect(trieNode.hasChild('a')).toBe(true)

    trieNode.removeChild('a')
    expect(trieNode.hasChild('a')).toBe(false)
  })

  it('НЕ должен удалять потомков, у которых есть потомки', () => {
    const trieNode = new TrieNode('c')
    trieNode.addChild('a')
    const childNode = trieNode.getChild('a')
    childNode.addChild('r')

    trieNode.removeChild('a')
    expect(trieNode.hasChild('a')).toEqual(true)
  })

  it('НЕ должен удалять потомков, которые являются завершающими символами', () => {
    const trieNode = new TrieNode('c')
    const IS_COMPLETE_WORD = true
    trieNode.addChild('a', IS_COMPLETE_WORD)

    trieNode.removeChild('a')
    expect(trieNode.hasChild('a')).toEqual(true)
  })
})
