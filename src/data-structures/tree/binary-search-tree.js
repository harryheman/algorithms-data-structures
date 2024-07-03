import BinaryTreeNode from './binary-tree-node'
import Comparator from '../../utils/comparator'

class Node extends BinaryTreeNode {
  constructor(value = null, fn) {
    super(value)

    this.compareFn = fn
    this.nodeValueComparator = new Comparator(fn)
  }

  insert(value) {
    if (!this.value) {
      this.value = value

      return this
    }

    if (this.nodeValueComparator.lessThan(this.value, value)) {
      if (this.left) {
        return this.left.insert(value)
      }

      const newNode = new Node(value, this.compareFn)
      this.setLeft(newNode)

      return newNode
    }

    if (this.nodeValueComparator.greaterThan(this.value, value)) {
      if (this.right) {
        return this.right.insert(value)
      }

      const newNode = new Node(value, this.compareFn)
      this.setRight(newNode)

      return newNode
    }

    return this
  }

  find(value) {
    if (this.nodeValueComparator.equal(this.value, value)) {
      return this
    }

    if (this.nodeValueComparator.lessThan(this.value, value) && this.left) {
      return this.left.find(value)
    }

    if (this.nodeValueComparator.greaterThan(this.value, value) && this.right) {
      return this.right.find(value)
    }

    return null
  }

  contains(value) {
    return !!this.find(value)
  }

  remove(value) {
    const nodeToRemove = this.find(value)

    if (!nodeToRemove) {
      return null
    }

    const { parent } = nodeToRemove

    if (!nodeToRemove.left && !nodeToRemove.right) {
      if (parent) {
        parent.removeChild(nodeToRemove)
      } else {
        nodeToRemove.setValue(null)
      }
    } else if (nodeToRemove.left && nodeToRemove.right) {
      const nextBiggerNode = nodeToRemove.right.findMin()
      if (!this.nodeComparator.equal(nextBiggerNode, nodeToRemove.right)) {
        this.remove(nextBiggerNode.value)
        nodeToRemove.setValue(nextBiggerNode.value)
      } else {
        nodeToRemove.setValue(nodeToRemove.right.value)
        nodeToRemove.setRight(nodeToRemove.right.right)
      }
    } else {
      const childNode = nodeToRemove.left || nodeToRemove.right

      if (parent) {
        parent.replaceChild(nodeToRemove, childNode)
      } else {
        BinaryTreeNode.copyNode(childNode, nodeToRemove)
      }
    }

    nodeToRemove.parent = null

    return this``
  }

  findMin() {
    if (!this.left) {
      return this
    }

    return this.left.findMin()
  }
}

export default class BinarySearchTree {
  constructor(compareFn) {
    this.root = new Node(null, compareFn)

    this.nodeComparator = this.root.nodeComparator
  }

  insert(value) {
    return this.root.insert(value)
  }

  contains(value) {
    return this.root.contains(value)
  }

  remove(value) {
    return this.root.remove(value)
  }

  toString() {
    return this.root.toString()
  }
}
