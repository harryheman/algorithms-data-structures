// Импортируем конструктор функции сравнения узлов
import Comparator from '../utils/comparator'
// Импортируем конструктор min-кучи
import MinHeap from './heap/min-heap'

// Очередь с приоритетом.
// Реализация на основе min-кучи
export default class PriorityQueue extends MinHeap {
  constructor() {
    // Инициализируем min-кучу
    super()
    // Карта приоритетов
    this.priorities = new Map()
    // Функция сравнения элементов
    this.compare = new Comparator(this.comparePriorities.bind(this))
  }

  // Добавляет элемент в очередь.
  // Принимает элемент и приоритет.
  // Чем больше приоритет (меньше значение `priority`),
  // тем "выше" элемент находится в очереди
  add(item, priority = 0) {
    // Обновляем приоритеты
    this.priorities.set(item, priority)
    // Добавляем элемент в кучу
    super.add(item)

    return this
  }

  // Удаляет элемент из очереди.
  // Принимает элемент и кастомную функцию сравнения элементов
  remove(item, compare) {
    // Удаляем элемент из кучи
    super.remove(item, compare)
    // Обновляем приоритеты
    this.priorities.delete(item)

    return this
  }

  // Обновляет приоритет.
  // Принимает элемент и новый приоритет
  changePriority(item, priority) {
    // Удаляем элемент из очереди
    this.remove(item, new Comparator(this.compareValues))
    // Добавляем элемент с новым приоритетом
    this.add(item, priority)

    return this
  }

  // Ищет элемент по значению.
  // Возвращает массив индексов
  findByValue(item) {
    return this.find(item, new Comparator(this.compareValues))
  }

  // Определяет наличие элемента
  hasValue(item) {
    return this.findByValue(item).length > 0
  }

  // Сравнивает приоритеты
  comparePriorities(a, b) {
    // Вызываем функцию сравнения значений,
    // передавая ей приоритеты
    return this.compareValues(this.priorities.get(a), this.priorities.get(b))
  }

  // Сравнивает значения
  compareValues(a, b) {
    if (a === b) {
      return 0
    }
    return a < b ? -1 : 1
  }
}
