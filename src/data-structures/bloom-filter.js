export default class BloomFilter {
  // Размер фильтра напрямую влияет на вероятность ложно положительных результатов.
  // Чем больше размер, тем такая вероятность ниже
  constructor(size = 100) {
    this.size = size
    this.storage = this.createStore(size)
  }

  insert(item) {
    const hashValues = this.getHashValues(item)

    // устанавливаем каждый индекс в значение `true`
    hashValues.forEach((v) => this.storage.setValue(v))
  }

  mayContain(item) {
    const hashValues = this.getHashValues(item)

    for (const v of hashValues) {
      if (!this.storage.getValue(v)) {
        // мы точно знаем, что элемент отсутствует
        return false
      }
    }

    // элемент может существовать
    return true
  }

  createStore(size) {
    const storage = new Array(size).fill(false)

    return {
      getValue(i) {
        return storage[i]
      },
      setValue(i) {
        storage[i] = true
      },
    }
  }

  hash1(item) {
    let hash = 0
    for (let i = 0; i < item.length; i++) {
      const char = item.charCodeAt(i)
      hash = (hash << 5) + hash + char
      hash &= hash // конвертируем в 32-битное целое число
      hash = Math.abs(hash)
    }
    return hash % this.size
  }

  hash2(item) {
    let hash = 5381
    for (let i = 0; i < item.length; i++) {
      const char = item.charCodeAt(i)
      hash = (hash << 5) + hash + char // hash * 33 + char
    }
    return Math.abs(hash % this.size)
  }

  hash3(item) {
    let hash = 0
    for (let i = 0; i < item.length; i++) {
      const char = item.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash &= hash // конвертируем в 32-битное целое число
    }
    return Math.abs(hash % this.size)
  }

  getHashValues(item) {
    return [this.hash1(item), this.hash2(item), this.hash3(item)]
  }
}
