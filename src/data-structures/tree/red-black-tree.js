import BinarySearchTree from './binary-search-tree'

// Цвета
const COLORS = {
  red: 'red',
  black: 'black',
}

// Название поля, в котором хранится цвет
const PROP = 'color'

// Красно-черное дерево расширяет двоичное дерево поиска
export default class RedBlackTree extends BinarySearchTree {
  // Вставляет значение (узел)
  insert(value) {
    // Обычная вставка
    const insertedNode = super.insert(value)

    // Если добавляется корень,
    // if (!this.root.left && !this.root.right) {
    if (this.nodeComparator.equal(this.root, insertedNode)) {
      // делаем его черным
      this.makeNodeBlack(insertedNode)
    } else {
      // Делаем новый узел красным
      this.makeNodeRed(insertedNode)
    }

    // Выполняем балансировку дерева
    this.balance(insertedNode)

    // Возвращаем добавленный узел
    return insertedNode
  }

  // Удаляет узел
  remove(value) {
    throw new Error(`Невозможно удалить ${value}. Метод удаления не реализован`)
  }

  // Выполняет балансировку дерева
  balance(node) {
    // В случае корневого узла балансировать нечего
    if (this.nodeComparator.equal(this.root, node)) return

    // В случае черного предка балансировать нечего
    if (this.isNodeBlack(node.parent)) return

    const grandParent = node.parent.parent

    // Если у узла есть красный дядя, то нужно выполнить перекрашивание
    if (node.uncle && this.isNodeRed(node.uncle)) {
      // Перекрашиваем предка и дядю в черный
      this.makeNodeBlack(node.parent)
      this.makeNodeBlack(node.uncle)

      if (!this.nodeComparator.equal(this.root, grandParent)) {
        // Перекрашиваем дедушку в красный, если он не является корнем
        this.makeNodeRed(grandParent)
      } else {
        // Если дедушка - черный корень, ничего не делаем,
        // поскольку корень уже имеет двух черных потоков,
        // которых мы только что перекрасили
        return
      }

      // Выполняем балансировку для перекрашенного дедушки
      this.balance(grandParent)
      // Если дядя узла черный или отсутствует, нужно выполнить повороты
    } else if (!node.uncle || this.isNodeBlack(node.uncle)) {
      if (grandParent) {
        // Дедушка, которого мы получим после вращений
        let newGrandParent

        if (this.nodeComparator.equal(node.parent, grandParent.left)) {
          // Левый поворот
          if (this.nodeComparator.equal(node, grandParent.left.left)) {
            // Левый-левый поворот
            newGrandParent = this.leftLeftRotation(grandParent)
          } else {
            // Левый-правый поворот
            newGrandParent = this.leftRightRotation(grandParent)
          }
        } else {
          // Правый поворот
          if (this.nodeComparator.equal(node, grandParent.right.right)) {
            // Правый-правый поворот
            newGrandParent = this.rightRightRotation(grandParent)
          } else {
            // Правый-левый поворот
            newGrandParent = this.rightLeftRotation(grandParent)
          }
        }

        // Если `newGrandParent` не имеет предка, делаем его корнем
        // и красим в черный
        if (newGrandParent && !newGrandParent.parent) {
          this.root = newGrandParent
          this.makeNodeBlack(this.root)
        }

        // Выполняем балансировку для нового дедушки
        this.balance(newGrandParent)
      }
    }
  }

  // Выполняет левый-левый поворот
  leftLeftRotation(grandParentNode) {
    // Сохраняем предка дедушки
    const grandGrandParent = grandParentNode.parent

    // Определяем тип дедушки (левый или правый)
    let grandParentNodeIsLeft
    if (grandGrandParent) {
      grandParentNodeIsLeft = this.nodeComparator.equal(
        grandGrandParent.left,
        grandParentNode,
      )
    }

    // Сохраняем левого потомка дедушки
    const parentNode = grandParentNode.left

    // Сохраняем правого потомка предка
    const parentRightNode = parentNode.right

    // Делаем дедушку правым потомком предка
    parentNode.setRight(grandParentNode)

    // Делаем правого потомка предка левым потомком дедушки
    grandParentNode.setLeft(parentRightNode)

    // Заменяем дедушку предком
    if (grandGrandParent) {
      if (grandParentNodeIsLeft) {
        grandGrandParent.setLeft(parentNode)
      } else {
        grandGrandParent.setRight(parentNode)
      }
    } else {
      // Делаем предка корнем
      parentNode.parent = null
    }

    // Перекрашиваем дедушку и предка
    this.swapNodeColors(parentNode, grandParentNode)

    // Возвращаем новый корень
    return parentNode
  }

  // Выполняет левый-правый поворот
  leftRightRotation(grandParentNode) {
    // Сохраняем левый и левый правый узлы
    const parentNode = grandParentNode.left
    const childNode = parentNode.right

    // Сохраняем левый узел потомка во избежание потери
    // левого поддерева. Позже он будет перемещен в
    // правое поддерево предка
    const childLeftNode = childNode.left

    // Делаем предка левым узлом потомка
    childNode.setLeft(parentNode)

    // Делаем левый узел потомка правым узлом предка
    parentNode.setRight(childLeftNode)

    // Помещаем левый правый узел на место левого
    grandParentNode.setLeft(childNode)

    // Выполняем левый-левый поворот
    return this.leftLeftRotation(grandParentNode)
  }

  // Выполняет правый-правый поворот
  rightRightRotation(grandParentNode) {
    // Сохраняем предка дедушки
    const grandGrandParent = grandParentNode.parent

    // Определяем тип дедушки (левый или правый)
    let grandParentNodeIsLeft
    if (grandGrandParent) {
      grandParentNodeIsLeft = this.nodeComparator.equal(
        grandGrandParent.left,
        grandParentNode,
      )
    }

    // Сохраняем правого потомка дедушки
    const parentNode = grandParentNode.right

    // Сохраняем левого потомка предка
    const parentLeftNode = parentNode.left

    // Делаем дедушку левым потомком предка
    parentNode.setLeft(grandParentNode)

    // Делаем левого потомка предка правым потомком дедушки
    grandParentNode.setRight(parentLeftNode)

    // Заменяем дедушку предком
    if (grandGrandParent) {
      if (grandParentNodeIsLeft) {
        grandGrandParent.setLeft(parentNode)
      } else {
        grandGrandParent.setRight(parentNode)
      }
    } else {
      // Делаем предка корнем
      parentNode.parent = null
    }

    // Перекрашиваем дедушку и предка
    this.swapNodeColors(parentNode, grandParentNode)

    // Возвращаем новый корень
    return parentNode
  }

  // Выполняет правый-левый поворот
  rightLeftRotation(grandParentNode) {
    // Сохраняем правый и правый левый узлы
    const parentNode = grandParentNode.right
    const childNode = parentNode.left

    // Сохраняем правый узел потомка во избежание потери
    // правого поддерева. Позже он будет перемещен в
    // левое поддерево предка
    const childRightNode = childNode.right

    // Делаем предка правым узлом потомка
    childNode.setRight(parentNode)

    // Делаем правый узел потомка левым узлом предка
    parentNode.setLeft(childRightNode)

    // Помещаем потомка на место предка
    grandParentNode.setRight(childNode)

    // Выполняем правый-правый поворот
    return this.rightRightRotation(grandParentNode)
  }

  // Делает узел красным
  makeNodeRed(node) {
    node.meta.set(PROP, COLORS.red)

    return node
  }

  // Делает узел черным
  makeNodeBlack(node) {
    node.meta.set(PROP, COLORS.black)

    return node
  }

  // Проверяет, является ли узел красным
  isNodeRed(node) {
    return node.meta.get(PROP) === COLORS.red
  }

  // Проверяет, является ли узел черным
  isNodeBlack(node) {
    return node.meta.get(PROP) === COLORS.black
  }

  // Проверяет, покрашен ли узел
  isNodeColored(node) {
    return this.isNodeBlack(node) || this.isNodeRed(node)
  }

  // Перекрашивает узлы
  swapNodeColors(node1, node2) {
    const node1Color = node1.meta.get(PROP)
    const node2Color = node2.meta.get(PROP)

    node1.meta.set(PROP, node2Color)
    node2.meta.set(PROP, node1Color)
  }
}
