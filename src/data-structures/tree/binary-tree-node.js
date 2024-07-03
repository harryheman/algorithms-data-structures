import Comparator from '../../utils/comparator'
import HashTable from '../hash-table'

export default class BinaryTreeNode {
  constructor(value = null) {
    this.value = value
    this.left = null
    this.right = null
    this.parent = null

    // дополнительная информация об узле
    this.meta = new HashTable()

    // функция сравнения узлов
    this.nodeComparator = new Comparator()
  }

  get leftHeight() {
    if (!this.left) {
      return 0
    }

    return this.left.height + 1
  }

  get rightHeight() {
    if (!this.right) {
      return 0
    }

    return this.right.height + 1
  }

  get height() {
    return Math.max(this.leftHeight, this.rightHeight)
  }

  get balanceFactor() {
    return this.leftHeight - this.rightHeight
  }

  get uncle() {
    // если нет предка
    if (!this.parent) {
      return null
    }

    // если нет дедушки
    if (!this.parent.parent) {
      return null
    }

    // если у дедушки нет двух детей
    if (!this.parent.parent.left || !this.parent.parent.right) {
      return null
    }

    // выясняем, кто является дядей
    if (this.nodeComparator.equal(this.parent, this.parent.parent.left)) {
      // правый узел
      return this.parent.parent.right
    }

    // левый узел
    return this.parent.parent.left
  }

  setValue(value) {
    this.value = value

    return this
  }

  setLeft(node) {
    // сбрасываем предка левого узла
    if (this.left) {
      this.left.parent = null
    }

    // обновляем левый узел
    this.left = node

    // делаем текущий узел предком нового левого узла
    if (this.left) {
      this.left.parent = this
    }

    return this
  }

  setRight(node) {
    // сбрасываем предка правого узла
    if (this.right) {
      this.right.parent = null
    }

    // обновляем правый узел
    this.right = node

    // делаем текущий узел предком нового правого узла
    if (this.right) {
      this.right.parent = this
    }

    return this
  }

  removeChild(nodeToRemove) {
    if (this.left && this.nodeComparator.equal(this.left, nodeToRemove)) {
      this.left = null
      return true
    }

    if (this.right && this.nodeComparator.equal(this.right, nodeToRemove)) {
      this.right = null
      return true
    }

    return false
  }

  replaceChild(nodeToReplace, replacementNode) {
    if (!nodeToReplace || !replacementNode) {
      return false
    }

    if (this.left && this.nodeComparator.equal(this.left, nodeToReplace)) {
      this.setLeft(replacementNode)
      return true
    }

    if (this.right && this.nodeComparator.equal(this.right, nodeToReplace)) {
      this.setRight(replacementNode)
      return true
    }

    return false
  }

  static copyNode(sourceNode, targetNode) {
    targetNode.setValue(sourceNode.value)
    targetNode.setLeft(sourceNode.left)
    targetNode.setRight(sourceNode.right)
  }

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

  toString() {
    return this.traverseInOrder().toString()
  }
}
