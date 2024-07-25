import BinarySearchTree from './binary-search-tree'

// АВЛ-дерево расширяет двоичное дерево поиска
export default class AvlTree extends BinarySearchTree {
  // Добавляет значение (узел)
  insert(value) {
    // Обычная вставка
    super.insert(value)

    // Поднимаемся к корню, выполняя балансировку дерева
    let currentNode = this.root.find(value)
    while (currentNode) {
      this.balance(currentNode)
      currentNode = currentNode.parent
    }
  }

  // Удаляет узел по значению
  remove(value) {
    // Обычное удаление
    super.remove(value)

    // Балансируем дерево, начиная с корня
    this.balance(this.root)
  }

  // Балансирует дерево
  balance(node) {
    if (node.balanceFactor > 1) {
      // Левый поворот
      if (node.left.balanceFactor > 0) {
        // Левый-левый поворот
        this.rotateLeftLeft(node)
      } else if (node.left.balanceFactor < 0) {
        // Левый-правый поворот
        this.rotateLeftRight(node)
      }
    } else if (node.balanceFactor < -1) {
      // Правый поворот
      if (node.right.balanceFactor < 0) {
        // Правый-правый поворот
        this.rotateRightRight(node)
      } else if (node.right.balanceFactor > 0) {
        // Правый-левый поворот
        this.rotateRightLeft(node)
      }
    }
  }

  // Выполняет левый-левый поворот
  rotateLeftLeft(rootNode) {
    // Удаляем левого потомка
    const leftNode = rootNode.left
    rootNode.setLeft(null)

    // Делаем левый узел потомком предка `rootNode`
    if (rootNode.parent) {
      rootNode.parent.setLeft(leftNode)
    } else if (rootNode === this.root) {
      // Если `rootNode` является корнем, делаем левый узел новым корнем
      this.root = leftNode
    }

    // Если левый узел имеет правого потомка,
    // делаем его левым потомком `rootNode`
    if (leftNode.right) {
      rootNode.setLeft(leftNode.right)
    }

    // Делаем `rootNode` правым потомком левого узла
    leftNode.setRight(rootNode)
  }

  // Выполняет левый-правый поворот
  rotateLeftRight(rootNode) {
    // Удаляем левого потомка
    const leftNode = rootNode.left
    rootNode.setLeft(null)

    // Удаляем правого потомка левого узла
    const leftRightNode = leftNode.right
    leftNode.setRight(null)

    // Сохраняем левое поддерево `leftRightNode`
    if (leftRightNode.left) {
      leftNode.setRight(leftRightNode.left)
      leftRightNode.setLeft(null)
    }

    rootNode.setLeft(leftRightNode)
    leftRightNode.setLeft(leftNode)

    // Выполняем левый-левый поворот
    this.rotateLeftLeft(rootNode)
  }

  // Выполняет правый-правый поворот
  rotateRightRight(rootNode) {
    // Удаляем правого потомка
    const rightNode = rootNode.right
    rootNode.setRight(null)

    // Делаем правый узел потомком предка `rootNode`
    if (rootNode.parent) {
      rootNode.parent.setRight(rightNode)
    } else if (rootNode === this.root) {
      // Если `rootNode` является корнем, делаем правый узел новым корнем
      this.root = rightNode
    }

    // Если правый узел имеет левого потомка,
    // делаем его правым потомком `rootNode`
    if (rightNode.left) {
      rootNode.setRight(rightNode.left)
    }

    // Делаем `rootNode` левым потомком правого узла
    rightNode.setLeft(rootNode)
  }

  // Выполняет правый-левый поворот
  rotateRightLeft(rootNode) {
    // Удаляем правого потомка
    const rightNode = rootNode.right
    rootNode.setRight(null)

    // Удаляем левого потомка правого узла
    const rightLeftNode = rightNode.left
    rightNode.setLeft(null)

    // Сохраняем правое поддерево `rightLeftNode`
    if (rightLeftNode.right) {
      rightNode.setLeft(rightLeftNode.right)
      rightLeftNode.setRight(null)
    }

    rootNode.setRight(rightLeftNode)
    rightLeftNode.setRight(rightNode)

    // Выполняем правый-правый поворот
    this.rotateRightRight(rootNode)
  }
}
