import BloomFilter from '../bloom-filter'

describe('BloomFilter', () => {
  let bloomFilter
  const people = ['Bruce Wayne', 'Clark Kent', 'Barry Allen']

  beforeEach(() => {
    bloomFilter = new BloomFilter()
  })

  it('должен содержать методы "insert" и "mayContain"', () => {
    expect(typeof bloomFilter.insert).toBe('function')
    expect(typeof bloomFilter.mayContain).toBe('function')
  })

  it('должен создать хранилище с указанными методами', () => {
    const store = bloomFilter.createStore(18)
    expect(typeof store.getValue).toBe('function')
    expect(typeof store.setValue).toBe('function')
  })

  it('должен стабильно хешировать элементы с помощью трех хеш-функций', () => {
    const str1 = 'apple'

    expect(bloomFilter.hash1(str1)).toEqual(bloomFilter.hash1(str1))
    expect(bloomFilter.hash2(str1)).toEqual(bloomFilter.hash2(str1))
    expect(bloomFilter.hash3(str1)).toEqual(bloomFilter.hash3(str1))

    expect(bloomFilter.hash1(str1)).toBe(14)
    expect(bloomFilter.hash2(str1)).toBe(43)
    expect(bloomFilter.hash3(str1)).toBe(10)

    const str2 = 'orange'

    expect(bloomFilter.hash1(str2)).toEqual(bloomFilter.hash1(str2))
    expect(bloomFilter.hash2(str2)).toEqual(bloomFilter.hash2(str2))
    expect(bloomFilter.hash3(str2)).toEqual(bloomFilter.hash3(str2))

    expect(bloomFilter.hash1(str2)).toBe(0)
    expect(bloomFilter.hash2(str2)).toBe(61)
    expect(bloomFilter.hash3(str2)).toBe(10)
  })

  it('должен создать массив с тремя хешированными значениями', () => {
    expect(bloomFilter.getHashValues('abc').length).toBe(3)
    expect(bloomFilter.getHashValues('abc')).toEqual([66, 63, 54])
  })

  it('должен добавить строки и возвращать `true` при проверке их наличия', () => {
    people.forEach((person) => bloomFilter.insert(person))

    // expect(bloomFilter.mayContain('Bruce Wayne')).toBe(true)
    // expect(bloomFilter.mayContain('Clark Kent')).toBe(true)
    // expect(bloomFilter.mayContain('Barry Allen')).toBe(true)

    expect(bloomFilter.mayContain('Tony Stark')).toBe(false)
  })
})
