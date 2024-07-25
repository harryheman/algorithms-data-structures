import BinaryTreeNode from './binary-tree-node'
import Comparator from '../../utils/comparator'

export class BinarySearchTreeNode extends BinaryTreeNode {
  constructor(value = null, fn) {
    super(value)

    this.compareFn = fn
    this.nodeValueComparator = new Comparator(fn)
  }

  // Добавляет значение (узел)
  insert(value) {
    // Если значение отсутствует
    if (this.nodeValueComparator.equal(this.value, null)) {
      this.value = value

      return this
    }

    // Если новое значение меньше текущего
    if (this.nodeValueComparator.lessThan(value, this.value)) {
      // Если имеется левый потомок,
      if (this.left) {
        // добавляем значение в него
        return this.left.insert(value)
      }

      // Создаем новый узел
      const newNode = new BinarySearchTreeNode(value, this.compareFn)
      // и делаем его левым потомком
      this.setLeft(newNode)

      return newNode
    }

    // Если новое значение больше текущего
    if (this.nodeValueComparator.greaterThan(value, this.value)) {
      // Если имеется правый потомок,
      if (this.right) {
        // добавляем значение в него
        return this.right.insert(value)
      }

      // Создаем новый узел
      const newNode = new BinarySearchTreeNode(value, this.compareFn)
      // и делаем его правым потомком
      this.setRight(newNode)

      return newNode
    }

    return this
  }

  // Удаляет узел по значению
  remove(value) {
    // Ищем удаляемый узел
    const nodeToRemove = this.find(value)

    if (!nodeToRemove) {
      return null
    }

    // Извлекаем предка
    const { parent } = nodeToRemove

    if (!nodeToRemove.left && !nodeToRemove.right) {
      // Узел является листовым, т.е. не имеет потомков
      if (parent) {
        // У узла есть предок. Просто удаляем указатель на этот узел у предка
        parent.removeChild(nodeToRemove)
      } else {
        // У узла нет предка. Обнуляем значение текущего узла
        nodeToRemove.setValue(null)
      }
    } else if (nodeToRemove.left && nodeToRemove.right) {
      // Узел имеет двух потомков.
      // Находим следующее большее значение (минимальное значение в правом поддереве)
      // и заменяем им значение текущего узла
      const nextBiggerNode = nodeToRemove.right.findMin()
      if (!this.nodeComparator.equal(nextBiggerNode, nodeToRemove.right)) {
        this.remove(nextBiggerNode.value)
        nodeToRemove.setValue(nextBiggerNode.value)
      } else {
        // В случае, когда следующее правое значение является следующим большим значением,
        // и этот узел не имеет левого потомка,
        // просто заменяем удаляемый узел правым
        nodeToRemove.setValue(nodeToRemove.right.value)
        nodeToRemove.setRight(nodeToRemove.right.right)
      }
    } else {
      // Узел имеет одного потомка.
      // Делаем этого потомка прямым потомком предка текущего узла
      const childNode = nodeToRemove.left || nodeToRemove.right

      if (parent) {
        parent.replaceChild(nodeToRemove, childNode)
      } else {
        BinaryTreeNode.copyNode(childNode, nodeToRemove)
      }
    }

    // Обнуляем предка удаленного узла
    nodeToRemove.parent = null

    return true
  }

  // Ищет узел по значению
  find(value) {
    // Проверяем корень
    if (this.nodeValueComparator.equal(this.value, value)) {
      return this
    }

    if (this.nodeValueComparator.lessThan(value, this.value) && this.left) {
      // Проверяем левое поддерево
      return this.left.find(value)
    }

    if (this.nodeValueComparator.greaterThan(value, this.value) && this.right) {
      // Проверяем правое поддерево
      return this.right.find(value)
    }

    return null
  }

  // Определяет наличие узла
  contains(value) {
    return Boolean(this.find(value))
  }

  // Ищет узел с минимальным значением (нижний левый)
  findMin() {
    if (!this.left) {
      return this
    }

    return this.left.findMin()
  }
}

export default class BinarySearchTree {
  constructor(compareFn) {
    // Корневой узел
    this.root = new BinarySearchTreeNode(null, compareFn)
    // Функция сравнения узлов
    this.nodeComparator = this.root.nodeComparator
  }

  // Добавляет значение
  insert(value) {
    return this.root.insert(value)
  }

  // Удаляет узел по значению
  remove(value) {
    return this.root.remove(value)
  }

  // Определяет наличие узла
  contains(value) {
    return this.root.contains(value)
  }

  // Возвращает строковое представление дерева
  toString() {
    return this.root.toString()
  }
}
