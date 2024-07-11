// Импортируем конструктор хэш-таблицы
import HashTable from '../hash-table'

// Последний (завершающий) символ
export const HEAD_CHARACTER = '*'

// Узел префиксного дерева
export default class Node {
  constructor(char, isCompleteWord = false) {
    // Символ
    this.char = char
    // Индикатор завершающего символа
    this.isCompleteWord = isCompleteWord
    // Хэш-таблица потомков
    this.children = new HashTable()
  }

  // Добавляет потомка в дерево
  addChild(char, isCompleteWord = false) {
    // Добавляем узел при отсутствии
    if (!this.hasChild(char)) {
      this.children.set(char, new Node(char, isCompleteWord))
    }

    // Извлекаем узел
    const node = this.getChild(char)

    // Обновляем флаг `isCompleteWord` при необходимости,
    // например, при добавлении слова "car" после слова "carpet",
    // букву "r" нужно пометить как завершающую
    node.isCompleteWord = node.isCompleteWord || isCompleteWord

    // Возвращаем узел
    return node
  }

  // Удаляет потомка
  removeChild(char) {
    // Извлекаем узел
    const node = this.getChild(char)

    // Удаляем узел, только если:
    // - у него нет потомков
    // - node.isCompleteWord === false
    if (node && !node.isCompleteWord && !node.hasChildren()) {
      this.children.remove(char)
    }

    return this
  }

  // Возвращает потомка
  getChild(char) {
    return this.children.get(char)
  }

  // Определяет наличие потомка
  hasChild(char) {
    return this.children.has(char)
  }

  // Определяет наличие потомков
  hasChildren() {
    return this.children.getKeys().length > 0
  }

  // Автодополнение (предложение следующих символов)
  suggestChildren() {
    return [...this.children.getKeys()]
  }

  // Преобразует потомков в строку
  // с указанием признака завершающего символа
  toString() {
    let childrenAsString = this.suggestChildren().toString()
    childrenAsString = childrenAsString ? `:${childrenAsString}` : ''
    const isCompleteString = this.isCompleteWord ? HEAD_CHARACTER : ''

    return `${this.char}${isCompleteString}${childrenAsString}`
  }
}
