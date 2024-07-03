export default class Comparator {
  constructor(fn) {
    this.compare = fn || Comparator.defaultCompare
  }

  // Дефолтная функция сравнения узлов
  static defaultCompare(a, b) {
    if (a === b) {
      return 0
    }
    return a < b ? -1 : 1
  }

  // Проверка на равенство
  equal(a, b) {
    return this.compare(a, b) === 0
  }

  // Меньше чем
  lessThan(a, b) {
    return this.compare(a, b) < 0
  }

  // Больше чем
  greaterThan(a, b) {
    return this.compare(a, b) > 0
  }

  // Меньше или равно
  lessThanOrEqual(a, b) {
    return this.lessThan(a, b) || this.equal(a, b)
  }

  // Больше или равно
  greaterThanOrEqual(a, b) {
    return this.greaterThan(a, b) || this.equal(a, b)
  }

  // Инверсия сравнения
  reverse() {
    const original = this.compare
    this.compare = (a, b) => original(b, a)
  }
}
