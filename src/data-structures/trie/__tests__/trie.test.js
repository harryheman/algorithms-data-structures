import Trie from '..'

describe('Trie', () => {
  it('должен создать префиксное дерево', () => {
    const trie = new Trie()

    expect(trie).toBeDefined()
    expect(trie.head.toString()).toBe('*')
  })

  it('должен добавить слова в дерево', () => {
    const trie = new Trie()

    trie.addWord('cat')

    expect(trie.head.toString()).toBe('*:c')
    expect(trie.head.getChild('c').toString()).toBe('c:a')

    trie.addWord('car')
    expect(trie.head.toString()).toBe('*:c')
    expect(trie.head.getChild('c').toString()).toBe('c:a')
    expect(trie.head.getChild('c').getChild('a').toString()).toBe('a:t,r')
    expect(trie.head.getChild('c').getChild('a').getChild('t').toString()).toBe(
      't*',
    )
  })

  it('должен удалить слова из дерева', () => {
    const trie = new Trie()

    trie.addWord('carpet')
    trie.addWord('car')
    trie.addWord('cat')
    trie.addWord('cart')
    expect(trie.doesWordExist('carpet')).toBe(true)
    expect(trie.doesWordExist('car')).toBe(true)
    expect(trie.doesWordExist('cart')).toBe(true)
    expect(trie.doesWordExist('cat')).toBe(true)

    // Пытаемся удалить несуществующее слово
    trie.removeWord('carpool')
    expect(trie.doesWordExist('carpet')).toBe(true)
    expect(trie.doesWordExist('car')).toBe(true)
    expect(trie.doesWordExist('cart')).toBe(true)
    expect(trie.doesWordExist('cat')).toBe(true)

    trie.removeWord('carpet')
    expect(trie.doesWordExist('carpet')).toEqual(false)
    expect(trie.doesWordExist('car')).toEqual(true)
    expect(trie.doesWordExist('cart')).toBe(true)
    expect(trie.doesWordExist('cat')).toBe(true)

    trie.removeWord('cat')
    expect(trie.doesWordExist('car')).toEqual(true)
    expect(trie.doesWordExist('cart')).toBe(true)
    expect(trie.doesWordExist('cat')).toBe(false)

    trie.removeWord('car')
    expect(trie.doesWordExist('car')).toEqual(false)
    expect(trie.doesWordExist('cart')).toBe(true)

    trie.removeWord('cart')
    expect(trie.doesWordExist('car')).toEqual(false)
    expect(trie.doesWordExist('cart')).toBe(false)
  })

  it('должен получить следующие символы', () => {
    const trie = new Trie()

    trie.addWord('cat')
    trie.addWord('cats')
    trie.addWord('car')
    trie.addWord('caption')

    expect(trie.suggestNextCharacters('ca')).toEqual(['t', 'r', 'p'])
    expect(trie.suggestNextCharacters('cat')).toEqual(['s'])
    expect(trie.suggestNextCharacters('cab')).toBeNull()
  })

  it('должен определить наличие слов', () => {
    const trie = new Trie()

    trie.addWord('cat')
    trie.addWord('cats')
    trie.addWord('carpet')
    trie.addWord('car')
    trie.addWord('caption')

    expect(trie.doesWordExist('cat')).toBe(true)
    expect(trie.doesWordExist('cats')).toBe(true)
    expect(trie.doesWordExist('carpet')).toBe(true)
    expect(trie.doesWordExist('car')).toBe(true)
    expect(trie.doesWordExist('cap')).toBe(false)
    expect(trie.doesWordExist('call')).toBe(false)
  })
})
