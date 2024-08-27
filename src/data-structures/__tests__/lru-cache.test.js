import LRUCache from '../lru-cache'

describe('LRUCache', () => {
  it('должен добавить/извлечь значения в/из кэша', () => {
    const cache = new LRUCache(100)
    expect(cache.get('key-1')).toBeNull()

    cache.set('key-1', 15)
    cache.set('key-2', 16)
    cache.set('key-3', 17)
    expect(cache.get('key-1')).toBe(15)
    expect(cache.get('key-2')).toBe(16)
    expect(cache.get('key-3')).toBe(17)
    expect(cache.get('key-3')).toBe(17)
    expect(cache.get('key-2')).toBe(16)
    expect(cache.get('key-1')).toBe(15)

    cache.set('key-1', 5)
    cache.set('key-2', 6)
    cache.set('key-3', 7)
    expect(cache.get('key-1')).toBe(5)
    expect(cache.get('key-2')).toBe(6)
    expect(cache.get('key-3')).toBe(7)
  })

  it('должен вытеснить элементы из кэша размером 1', () => {
    const cache = new LRUCache(1)
    expect(cache.get('key-1')).toBeNull()

    cache.set('key-1', 15)
    expect(cache.get('key-1')).toBe(15)

    cache.set('key-2', 16)
    expect(cache.get('key-1')).toBeNull()
    expect(cache.get('key-2')).toBe(16)

    cache.set('key-2', 17)
    expect(cache.get('key-2')).toBe(17)

    cache.set('key-3', 18)
    cache.set('key-4', 19)
    expect(cache.get('key-2')).toBeNull()
    expect(cache.get('key-3')).toBeNull()
    expect(cache.get('key-4')).toBe(19)
  })

  it('должен вытеснить элементы из кэша размером 2', () => {
    const cache = new LRUCache(2)
    expect(cache.get('key-21')).toBeNull()

    cache.set('key-21', 15)
    expect(cache.get('key-21')).toBe(15)

    cache.set('key-22', 16)
    expect(cache.get('key-21')).toBe(15)
    expect(cache.get('key-22')).toBe(16)

    cache.set('key-22', 17)
    expect(cache.get('key-22')).toBe(17)

    cache.set('key-23', 18)
    expect(cache.size).toBe(2)
    expect(cache.get('key-21')).toBeNull()
    expect(cache.get('key-22')).toBe(17)
    expect(cache.get('key-23')).toBe(18)

    cache.set('key-24', 19)
    expect(cache.size).toBe(2)
    expect(cache.get('key-21')).toBeNull()
    expect(cache.get('key-22')).toBeNull()
    expect(cache.get('key-23')).toBe(18)
    expect(cache.get('key-24')).toBe(19)
  })

  it('должен вытеснить элемент из кэша размером 3', () => {
    const cache = new LRUCache(3)

    cache.set('key-1', 1)
    cache.set('key-2', 2)
    cache.set('key-3', 3)
    expect(cache.get('key-1')).toBe(1)
    expect(cache.get('key-2')).toBe(2)
    expect(cache.get('key-3')).toBe(3)

    cache.set('key-3', 4)
    expect(cache.get('key-1')).toBe(1)
    expect(cache.get('key-2')).toBe(2)
    expect(cache.get('key-3')).toBe(4)

    cache.set('key-4', 5)
    expect(cache.get('key-1')).toBeNull()
    expect(cache.get('key-2')).toBe(2)
    expect(cache.get('key-3')).toBe(4)
    expect(cache.get('key-4')).toBe(5)
  })

  it('должен обновить узел при вызове метода `set`', () => {
    const cache = new LRUCache(2)

    cache.set('2', 1)
    cache.set('1', 1)
    cache.set('2', 3)
    cache.set('4', 1)
    expect(cache.get('1')).toBeNull()
    expect(cache.get('2')).toBe(3)
  })

  it('должен обновить элементы в кэше размером 3', () => {
    const cache = new LRUCache(3)

    cache.set('key-1', 1)
    cache.set('key-2', 2)
    cache.set('key-3', 3)
    expect(cache.get('key-1')).toBe(1)

    cache.set('key-4', 4)
    expect(cache.get('key-1')).toBe(1)
    expect(cache.get('key-3')).toBe(3)
    expect(cache.get('key-4')).toBe(4)
    expect(cache.get('key-2')).toBeNull()
  })

  it('должен обновить элементы в кэше размером 4', () => {
    const cache = new LRUCache(4)

    cache.set('key-1', 1)
    cache.set('key-2', 2)
    cache.set('key-3', 3)
    cache.set('key-4', 4)
    expect(cache.get('key-4')).toBe(4)
    expect(cache.get('key-3')).toBe(3)
    expect(cache.get('key-2')).toBe(2)
    expect(cache.get('key-1')).toBe(1)

    cache.set('key-5', 5)
    expect(cache.get('key-1')).toBe(1)
    expect(cache.get('key-2')).toBe(2)
    expect(cache.get('key-3')).toBe(3)
    expect(cache.get('key-4')).toBeNull()
    expect(cache.get('key-5')).toBe(5)

    cache.set('key-6', 6)
    expect(cache.get('key-1')).toBeNull()
    expect(cache.get('key-2')).toBe(2)
    expect(cache.get('key-3')).toBe(3)
    expect(cache.get('key-4')).toBeNull()
    expect(cache.get('key-5')).toBe(5)
    expect(cache.get('key-6')).toBe(6)
  })
})
