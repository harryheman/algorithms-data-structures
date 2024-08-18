export default class Edge {
  constructor(from, to, weight = 0) {
    // Начальный узел
    this.from = from
    // Конечный узел
    this.to = to
    // Вес ребра
    this.weight = weight
  }

  // Возвращает ключ ребра
  getKey() {
    const fromKey = this.from.getKey()
    const toKey = this.to.getKey()

    // Например, `A_B`
    return `${fromKey}_${toKey}`
  }

  // Инвертирует ребро
  reverse() {
    const tmp = this.from
    this.from = this.to
    this.to = tmp

    return this
  }

  // Преобразует ребро в строку
  toString() {
    return this.getKey()
  }
}
