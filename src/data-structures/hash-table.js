import LinkedList from './linked-list'

// дефолтный размер таблицы
const defaultHashTableSize = 32

// хеш-таблица
export default class HashTable {
  constructor(size = defaultHashTableSize) {
    // создаем хеш-таблицу указанного размера и заполняем ее пустыми связанными списками
    this.buckets = Array(size)
      .fill()
      .map(() => new LinkedList())
    // позволяет быстро получать информацию об актуальных ключах
    this.keys = {}
  }

  // преобразование ключа в хеш-значение
  hash(key) {
    // для простоты в качестве хеша используется сумма кодов символов ключа
    const hash = [...key].reduce((acc, char) => acc + char.charCodeAt(0), 0)
    // значение не должно превышать размер таблицы
    return hash % this.buckets.length
  }

  // установка значения по ключу
  set(key, value) {
    // хешируем ключ
    const index = this.hash(key)
    // сохраняем хеш по ключу
    this.keys[key] = index
    // извлекаем список
    const bucket = this.buckets[index]
    // извлекаем узел
    const node = bucket.find({ cb: (value) => value.key === key })
    // если узел не найден
    if (!node) {
      // добавляем новый узел
      bucket.append({ key, value })
    } else {
      // иначе, обновляем значение узла
      node.value.value = value
    }
  }

  remove(key) {
    // хешируем ключ
    const index = this.hash(key)
    // удаляем хеш по ключу
    delete this.keys[key]
    // извлекаем список
    const bucket = this.buckets[index]
    // извлекаем узел
    const node = bucket.find({ cb: (value) => value.key === key })
    // возвращаем удаленный узел или null
    return node ? bucket.remove(node.value) : null
  }

  // получение значения по ключу
  get(key) {
    // хешируем ключ
    const index = this.hash(key)
    // извлекаем список
    const bucket = this.buckets[index]
    // извлекаем узел
    const node = bucket.find({ cb: (value) => value.key === key })
    // возвращаем значение узла или null
    return node ? node.value.value : null
  }

  // проверка наличия ключа
  has(key) {
    return !!this.keys[key]
  }

  // получение всех ключей
  getKeys() {
    return Object.keys(this.keys)
  }

  // получение всех значений
  getValues() {
    return this.buckets.reduce((acc, bucket) => {
      return acc.concat(bucket.toArray().map((node) => node.value.value))
    }, [])
  }
}
