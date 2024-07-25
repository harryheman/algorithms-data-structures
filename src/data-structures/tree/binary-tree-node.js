import Comparator from '../../utils/comparator'
import HashTable from '../hash-table'

export default class BinaryTreeNode {
  constructor(value = null) {
    // Значение
    this.value = value
    // Левый потомок
    this.left = null
    // Правый потомок
    this.right = null
    // Предок
    this.parent = null

    // Дополнительная информация об узле
    this.meta = new HashTable()

    // Функция сравнения узлов
    this.nodeComparator = new Comparator()
  }

  // Геттер высоты (глубины) левого поддерева
  get leftHeight() {
    if (!this.left) {
      return 0
    }

    return this.left.height + 1
  }

  // Геттер высоты правого поддерева
  get rightHeight() {
    if (!this.right) {
      return 0
    }

    return this.right.height + 1
  }

  // Геттер максимальной высоты
  get height() {
    return Math.max(this.leftHeight, this.rightHeight)
  }

  // Геттер разницы между высотой левого и правого поддеревьев
  // (фактор балансировки)
  get balanceFactor() {
    return this.leftHeight - this.rightHeight
  }

  // Геттер дяди
  get uncle() {
    // Если нет предка, то нет и дяди
    if (!this.parent) {
      return null
    }

    // Если нет дедушки, то нет и дяди
    if (!this.parent.parent) {
      return null
    }

    // Если у дедушки нет двух потомков, то нет и дяди
    if (!this.parent.parent.left || !this.parent.parent.right) {
      return null
    }

    // Выясняем, кто является дядей
    // путем сравнения предка с потомком дедушки
    if (this.nodeComparator.equal(this.parent, this.parent.parent.left)) {
      // Дядя - правый узел
      return this.parent.parent.right
    }

    // Дядя - левый узел
    return this.parent.parent.left
  }

  // Устанавливает значение
  setValue(value) {
    this.value = value

    return this
  }

  // Устанавливает левого потомок
  setLeft(node) {
    // Сбрасываем предка левого узла
    if (this.left) {
      this.left.parent = null
    }

    // Обновляем левый узел
    this.left = node

    // Делаем текущий узел предком нового левого узла
    if (this.left) {
      this.left.parent = this
    }

    return this
  }

  // Устанавливает правого потомка
  setRight(node) {
    // Сбрасываем предка правого узла
    if (this.right) {
      this.right.parent = null
    }

    // Обновляем правый узел
    this.right = node

    // Делаем текущий узел предком нового правого узла
    if (this.right) {
      this.right.parent = this
    }

    return this
  }

  // Удаляет потомка
  removeChild(nodeToRemove) {
    // Если удаляется левый потомок
    if (this.left && this.nodeComparator.equal(this.left, nodeToRemove)) {
      this.left = null
      return true
    }

    // Если удаляется правый потомок
    if (this.right && this.nodeComparator.equal(this.right, nodeToRemove)) {
      this.right = null
      return true
    }

    return false
  }

  // Заменяет потомка
  replaceChild(nodeToReplace, replacementNode) {
    if (!nodeToReplace || !replacementNode) {
      return false
    }

    // Если заменяется левый потомок
    if (this.left && this.nodeComparator.equal(this.left, nodeToReplace)) {
      this.left = replacementNode
      return true
    }

    // Если заменяется правый потомок
    if (this.right && this.nodeComparator.equal(this.right, nodeToReplace)) {
      this.right = replacementNode
      return true
    }

    return false
  }

  // Обходит дерево в порядке возрастания ключей (inorder, infix traverse):
  // сначала обходится левое поддерево, затем корень, затем правое поддерево
  traverseInOrder() {
    let result = []

    if (this.left) {
      result = result.concat(this.left.traverseInOrder())
    }

    result.push(this.value)

    if (this.right) {
      result = result.concat(this.right.traverseInOrder())
    }

    return result
  }

  // Статический метод копирования узла
  static copyNode(sourceNode, targetNode) {
    targetNode.setValue(sourceNode.value)
    targetNode.setLeft(sourceNode.left)
    targetNode.setRight(sourceNode.right)
  }

  // Преобразует дерево в строку
  toString() {
    return this.traverseInOrder().toString()
  }
}
