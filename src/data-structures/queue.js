// Импортируем конструктор связного списка
import LinkedList from './linked-list'

// Очередь
export default class Queue {
  constructor() {
    // Создаем связный список
    this.list = new LinkedList()
  }

  // Проверяет, является ли очередь пустой
  isEmpty() {
    return !this.list.head
  }

  // Возвращает значение первого узла без его удаления
  peek() {
    if (this.isEmpty()) {
      return null
    }

    return this.list.head.value
  }

  // Добавляет элемент в конец очереди
  enqueue(value) {
    this.list.append(value)
  }

  // Удаляет первый узел и возвращает его значение
  dequeue() {
    const removedHead = this.list.removeHead()
    return removedHead?.value || null
  }

  // Преобразует очередь в строку.
  // Принимает кастомную функцию стрингификации
  toString(cb) {
    return this.list.toString(cb)
  }

  // Преобразует очередь в массив значений
  toArray() {
    return this.list.toArray().map((node) => node.value)
  }
}
