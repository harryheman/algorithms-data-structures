export default class BloomFilter {
  // Размер фильтра напрямую влияет на вероятность ложноположительных результатов.
  // Как правило, чем больше размер, тем такая вероятность ниже
  constructor(size = 100) {
    // Размер фильтра
    this.size = size
    // Хранилище (по сути, сам фильтр)
    this.storage = this.createStore(size)
  }

  // Добавляет элемент в фильтр
  insert(item) {
    // Вычисляем хеш элемента (индексы массива в количестве 3 штук)
    const hashValues = this.getHashValues(item)

    // Устанавливаем значение по каждому индексу в `true`
    hashValues.forEach((v) => this.storage.setValue(v))
  }

  // Определяет наличие элемента в фильтре
  mayContain(item) {
    // Вычисляем хеш элемента
    const hashValues = this.getHashValues(item)

    // Перебираем индексы
    for (const v of hashValues) {
      // Если хотя бы одно значение равняется `false`
      if (!this.storage.getValue(v)) {
        // Элемент точно отсутствует
        return false
      }
    }

    // Элемент может присутствовать
    return true
  }

  // Создает хранилище
  createStore(size) {
    // Хранилище - массив указанного размера, заполненный `false`
    const storage = new Array(size).fill(false)

    // Возвращается объект с "геттером" и "сеттером"
    return {
      getValue(i) {
        return storage[i]
      },
      setValue(i) {
        storage[i] = true
      },
    }
  }

  // Хеш-функции
  hash1(item) {
    let hash = 0
    for (let i = 0; i < item.length; i++) {
      const char = item.charCodeAt(i)
      hash = (hash << 5) + hash + char
      hash &= hash // конвертируем значение в 32-битное целое число
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
      hash &= hash // конвертируем значение в 32-битное целое число
    }
    return Math.abs(hash % this.size)
  }

  // Генерирует хеш элемента.
  // Возвращает массив из трех индексов
  getHashValues(item) {
    return [this.hash1(item), this.hash2(item), this.hash3(item)]
  }
}
