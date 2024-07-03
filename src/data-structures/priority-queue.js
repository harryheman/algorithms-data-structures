import Comparator from '../utils/comparator'
import MinHeap from './heap/MinHeap'

// очередь с приоритетом
// расширяет min-кучу
export default class PriorityQueue extends MinHeap {
  constructor() {
    // инициализируем min-кучу
    super()
    // приоритеты
    this.priorities = new Map()
    // функция сравнения
    this.compare = new Comparator(this.comparePriority.bind(this))
  }

  // добавление элемента в очередь с приоритетом
  add(item, priority = 0) {
    // обновляем приоритеты
    this.priorities.set(item, priority)
    // добавляем элемент в min-кучу
    super.add(item)
    // это позволяет вызывать методы по цепочке
    return this
  }

  // удаление элемента
  remove(item, compare) {
    // удаляем элемент из min-кучи
    super.remove(item, compare)
    // обновляем приоритеты
    this.priorities.delete(item)
    return this
  }

  // меняем приоритет
  changePriority(item, priority) {
    // удаляем элемент
    this.remove(item, new Comparator(this.compareValue))
    // добавляем элемент с новым приоритетом
    this.add(item, priority)
    return this
  }

  // поиск элемента по значению
  // возвращается массив индексов
  findByValue(item) {
    return this.find(item, new Comparator(this.compareValue))
  }

  // проверка наличия значения
  hasValue(item) {
    return this.findByValue(item).length > 0
  }

  // функция сравнения приоритетов
  comparePriority(a, b) {
    // вызываем функцию сравнения значений, передавая ей значения карты приоритетов
    return this.compareValue(this.priorities.get(a), this.priorities.get(b))
  }

  // функция сравнения значений
  compareValue(a, b) {
    if (a === b) {
      return 0
    }
    return a < b ? -1 : 1
  }
}
