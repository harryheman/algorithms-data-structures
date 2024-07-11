// Импортируем конструктор связного списка
// (мы будем использовать метод цепочек для разрешения коллизий)
import LinkedList from './linked-list'

// Дефолтный размер таблицы
// (в реальности размер будет намного больше)
const defaultSize = 32

// Хэш-таблица
export default class HashTable {
  constructor(size = defaultSize) {
    // Создаем таблицу указанного размера и
    // заполняем ее пустыми связными списками
    this.buckets = new Array(size).fill(null).map(() => new LinkedList())
    // Хранилище ключей
    this.keys = {}
  }

  // Преобразует ключ в хэшированное значение
  // (хэш-функция)
  hash(key) {
    // Для простоты в качестве хэша используется сумма кодов символов ключа
    // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt
    const hash = [...key].reduce((acc, char) => acc + char.charCodeAt(0), 0)
    // Хэшированное значение не должно превышать размера таблицы
    return hash % this.buckets.length
  }

  // Устанавливает значение по ключу
  set(key, value) {
    // Хэшируем ключ
    // (получаем индекс массива)
    const index = this.hash(key)
    // Сохраняем хэш по ключу
    this.keys[key] = index
    // Извлекаем нужный список
    const bucket = this.buckets[index]
    // Извлекаем узел
    // (значением узла является объект)
    const node = bucket.find({ cb: (value) => value.key === key })
    // Если узел не найден
    if (!node) {
      // Добавляем новый узел
      bucket.append({ key, value })
    } else {
      // Иначе, обновляем значение узла
      node.value.value = value
    }
  }

  // Удаляет значение по ключу
  remove(key) {
    // Хэшируем ключ
    const index = this.hash(key)
    // Удаляем хэш по ключу
    delete this.keys[key]
    // Извлекаем нужный список
    const bucket = this.buckets[index]
    // Извлекаем узел
    const node = bucket.find({ cb: (value) => value.key === key })
    // Возвращаем удаленный узел или `null`,
    // если узел отсутствует
    return node ? bucket.remove(node.value) : null
  }

  // Возвращает значение по ключу
  get(key) {
    // Хэшируем ключ
    const index = this.hash(key)
    // Извлекаем нужный список
    const bucket = this.buckets[index]
    // Извлекаем узел
    const node = bucket.find({ cb: (value) => value.key === key })
    // Возвращаем значение узла или `null`,
    // если узел отсутствует
    return node ? node.value.value : null
  }

  // Определяет наличие ключа
  has(key) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn
    return Object.hasOwn(this.keys, key)
  }

  // Возвращает все ключи
  getKeys() {
    return Object.keys(this.keys)
  }

  // Возвращает все значения
  getValues() {
    // Перебираем списки и возвращаем значения всех узлов
    return this.buckets.reduce((acc, bucket) => {
      return acc.concat(
        // Метод `toArray` преобразует связный список в массив
        bucket.toArray().map((node) => node.value.value),
      )
    }, [])
  }
}
