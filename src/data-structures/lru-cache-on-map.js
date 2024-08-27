export default class LruCacheOnMap {
  // Конструктор принимает размер кэша
  constructor(size) {
    // Размер кэша
    this.size = size
    // Хранилище (по сути, сам кэш)
    this.map = new Map()
  }

  // Возвращает значение по ключу
  get(key) {
    const val = this.map.get(key)
    if (!val) return null
    // Обновляем "приоритет" элемента
    this.map.delete(key)
    this.map.set(key, val)
    return val
  }

  // Добавляет элемент в кэш
  set(key, val) {
    // Обновляем "приоритет" элемента
    this.map.delete(key)
    this.map.set(key, val)
    // Если кэш переполнен, удаляем первый (самый редко используемый) элемент
    if (this.map.size > this.size) {
      for (const key of this.map.keys()) {
        this.map.delete(key)
        break
      }
    }
  }
}
