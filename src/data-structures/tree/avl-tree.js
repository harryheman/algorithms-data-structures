import BinarySearchTree from './binary-search-tree'

export default class AvlTree extends BinarySearchTree {
  insert(value) {
    // обычная вставка
    super.insert(value)

    // поднимаемся к корню и проверяем факторы баланса по пути
    let currentNode = this.root.find(value)
    while (currentNode) {
      this.balance(currentNode)
      currentNode = currentNode.parent
    }
  }

  remove(value) {
    // обычное удаление
    super.remove(value)

    // балансируем дерево, начиная с корня
    this.balance(this.root)
  }

  balance(node) {
    if (node.balanceFactor > 1) {
      // левый поворот
      if (node.left.balanceFactor > 0) {
        // левый левый поворот
        this.rotateLeftLeft(node)
      } else if (node.left.balanceFactor < 0) {
        // левый правый поворот
        this.rotateLeftRight(node)
      }
    } else if (node.balanceFactor < -1) {
      // правый поворот
      if (node.right.balanceFactor < 0) {
        // правый правый поворот
        this.rotateRightRight(node)
      } else if (node.right.balanceFactor > 0) {
        // правый левый поворот
        this.rotateRightLeft(node)
      }
    }
  }

  rotateLeftLeft(rootNode) {
    // удаляем левый узел
    const leftNode = rootNode.left
    rootNode.setLeft(null)

    // делаем левый узел потомком предка `rootNode`
    if (rootNode.parent) {
      rootNode.parent.setLeft(leftNode)
    } else if (rootNode === this.root) {
      // если `rootNode` является корнем, делаем левый узел новым корнем
      this.root = leftNode
    }

    // если левый узел имеет правого потомка,
    // делаем его левым узлом `rootNode`
    if (leftNode.right) {
      rootNode.setLeft(leftNode.right)
    }

    // делаем `rootNode` правым узлом левого
    leftNode.setRight(rootNode)
  }

  rotateLeftRight(rootNode) {
    const leftNode = rootNode.left
    rootNode.setLeft(null)

    // удаляем правый узел левого
    const leftRightNode = leftNode.right
    leftNode.setRight(null)

    // сохраняем левое поддерево `leftRightNode`
    if (leftRightNode.left) {
      leftNode.setRight(leftRightNode.left)
      leftRightNode.setLeft(null)
    }

    rootNode.setLeft(leftRightNode)
    leftRightNode.setLeft(leftNode)
    this.rotateLeftLeft(rootNode)
  }

  rotateRightRight(rootNode) {
    // удаляем правый узел
    const rightNode = rootNode.right
    rootNode.setRight(null)

    // делаем правый узел потомком предка `rootNode`
    if (rootNode.parent) {
      rootNode.parent.setRight(rightNode)
    } else if (rootNode === this.root) {
      // если `rootNode` является корнем, делаем правый узел новым корнем
      this.root = rightNode
    }

    // если правый узел имеет левого потомка,
    // делаем его правым узлом `rootNode`
    if (rightNode.left) {
      rootNode.setRight(rightNode.left)
    }

    // делаем `rootNode` левым узлом правого
    rightNode.setLeft(rootNode)
  }

  rotateRightLeft(rootNode) {
    const rightNode = rootNode.right
    rootNode.setRight(null)

    // удаляем левый узел правого
    const rightLeftNode = rightNode.left
    rightNode.setLeft(null)

    // сохраняем правое поддерево `rightLeftNode`
    if (rightLeftNode.right) {
      rightNode.setLeft(rightLeftNode.right)
      rightLeftNode.setRight(null)
    }

    rootNode.setRight(rightLeftNode)
    rightLeftNode.setRight(rightNode)
    this.rotateRightRight(rootNode)
  }
}
