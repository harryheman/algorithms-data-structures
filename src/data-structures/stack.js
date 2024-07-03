// Импортируем конструктор связного списка
import LinkedList from './linked-list'

// Стек
export default class Stack {
  constructor() {
    // Создаем связный список
    this.list = new LinkedList()
  }

  // Проверяет, является ли стек пустым
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

  // Добавляет элемент в начало стека
  push(value) {
    this.list.prepend(value)
  }

  // Удаляет первый узел и возвращает его значение
  pop() {
    const removedHead = this.list.removeHead()
    return removedHead?.value || null
  }

  // Преобразует стек в строку
  toString(cb) {
    return this.list.toString(cb)
  }

  // Преобразует стек в массив значений
  toArray() {
    return this.list.toArray().map((node) => node.value)
  }
}
