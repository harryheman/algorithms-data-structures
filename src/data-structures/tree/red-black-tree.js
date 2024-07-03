import BinarySearchTree from './binary-search-tree'

const COLORS = {
  red: 'red',
  black: 'black',
}

const PROP = 'color'

export default class RedBlackTree extends BinarySearchTree {
  insert(value) {
    const insertedNode = super.insert(value)

    // if (!this.root.left && !this.root.right) {
    if (this.nodeComparator.equal(this.root, insertedNode)) {
      // делаем корень черным
      this.makeNodeBlack(insertedNode)
    } else {
      // делаем вставленные узлы красными
      this.makeNodeRed(insertedNode)
    }

    // проверяем балансировку
    this.balance(insertedNode)

    return insertedNode
  }

  remove(value) {
    throw new Error(
      `Невозможно удалить ${value}. Метод удаления еще не реализован`,
    )
  }

  balance(node) {
    // в случае корневого узла балансировать нечего
    if (this.nodeComparator.equal(this.root, node)) return

    // в случае черного предка балансировать нечего
    if (this.isNodeBlack(node.parent)) return

    const grandParent = node.parent.parent

    // если у узла есть красный дядя, необходимо перекрашивание
    if (node.uncle && this.isNodeRed(node.uncle)) {
      // перекрашиваем предка и дядю в черный
      this.makeNodeBlack(node.uncle)
      this.makeNodeBlack(node.parent)

      if (!this.nodeComparator.equal(this.root, grandParent)) {
        // перекрашиваем дедушку в красный, если он не является корнем
        this.makeNodeRed(grandParent)
      } else {
        // если дедушка черный корень, ничего не делаем,
        // поскольку корень уже имеет двух черных потоков,
        // которых мы только что перекрасили
        return
      }

      // выполняем дальнейшие проверки для перекрашенного дедушки
      this.balance(grandParent)
    } else if (!node.uncle || this.isNodeBlack(node.uncle)) {
      // если дядя узла черный или отсутствует, необходимы вращения

      if (grandParent) {
        // дедушка, которого мы получим после вращений
        let newGrandParent

        if (this.nodeComparator.equal(node.parent, grandParent.left)) {
          // левый поворот
          if (this.nodeComparator.equal(node, grandParent.left.left)) {
            // левый левый поворот
            newGrandParent = this.leftLeftRotation(grandParent)
          } else {
            // левый правый поворот
            newGrandParent = this.leftRightRotation(grandParent)
          }
        } else {
          // правый поворот
          if (this.nodeComparator.equal(node, grandParent.right.right)) {
            // правый правый поворот
            newGrandParent = this.rightRightRotation(grandParent)
          } else {
            // правый левый поворот
            newGrandParent = this.rightLeftRotation(grandParent)
          }
        }

        // если `newGrandParent` не имеет предка, делаем его корнем
        if (newGrandParent && !newGrandParent.parent) {
          this.root = newGrandParent
          this.makeNodeBlack(this.root)
        }

        this.balance(newGrandParent)
      }
    }
  }

  leftLeftRotation(grandParentNode) {
    // сохраняем предка дедушки
    const grandGrandParent = grandParentNode.parent

    // определяем тип дедушки (левый или правый)
    let grandParentNodeIsLeft
    if (grandGrandParent) {
      grandParentNodeIsLeft = this.nodeComparator.equal(
        grandGrandParent.left,
        grandParentNode,
      )
    }

    // сохраняем левый узел дедушки
    const parentNode = grandParentNode.left

    // сохраняем правый узел предка, поскольку
    // мы переместим его в левое поддерево дедушки
    const parentRightNode = parentNode.right

    // делаем дедушку правым узлом предка
    parentNode.setRight(grandParentNode)

    // перемещаем правое поддерево предка в левое поддерево дедушки
    grandParentNode.setLeft(parentRightNode)

    // заменяем дедушку предком
    if (grandGrandParent) {
      if (grandParentNodeIsLeft) {
        grandGrandParent.setLeft(parentNode)
      } else {
        grandGrandParent.setRight(parentNode)
      }
    } else {
      // делаем предка корнем
      parentNode.parent = null
    }

    // меняем цвета дедушки и предка
    this.swapNodeColors(parentNode, grandParentNode)

    // возвращаем новый корень
    return parentNode
  }

  leftRightRotation(grandParentNode) {
    // сохраняем левый и левый правый узлы
    const parentNode = grandParentNode.left
    const childNode = parentNode.right

    // сохраняем левый узел потомка во избежание потери
    // левого поддерева. Позже он будет перемещен в
    // правое поддерево предка
    const childLeftNode = childNode.left

    // делаем предка левым узлом потомка
    childNode.setLeft(parentNode)

    // перемещаем левое поддерево потомка в правое поддерево предка
    parentNode.setRight(childLeftNode)

    // помещаем левый правый узел на место левого
    grandParentNode.setLeft(childNode)

    // теперь мы готовы к выполнению левого левого поворота
    return this.leftLeftRotation(grandParentNode)
  }

  rightRightRotation(grandParentNode) {
    // сохраняем предка дедушки
    const grandGrandParent = grandParentNode.parent

    // определяем тип дедушки (левый или правый)
    let grandParentNodeIsLeft
    if (grandGrandParent) {
      grandParentNodeIsLeft = this.nodeComparator.equal(
        grandGrandParent.left,
        grandParentNode,
      )
    }

    // сохраняем правый узел дедушки
    const parentNode = grandParentNode.right

    // сохраняем левый узел предка, поскольку
    // мы переместим его в правое поддерево дедушки
    const parentLeftNode = parentNode.left

    // делаем дедушку левым узлом предка
    parentNode.setLeft(grandParentNode)

    // перемещаем левое поддерево предка в правое поддерево дедушки
    grandParentNode.setRight(parentLeftNode)

    // заменяем дедушку предком
    if (grandGrandParent) {
      if (grandParentNodeIsLeft) {
        grandGrandParent.setLeft(parentNode)
      } else {
        grandGrandParent.setRight(parentNode)
      }
    } else {
      // делаем предка корнем
      parentNode.parent = null
    }

    // меняем цвета дедушки и предка
    this.swapNodeColors(parentNode, grandParentNode)

    // возвращаем новый корень
    return parentNode
  }

  rightLeftRotation(grandParentNode) {
    // сохраняем правый и правый левый узлы
    const parentNode = grandParentNode.right
    const childNode = parentNode.left

    // сохраняем правый узел потомка во избежание потери
    // правого поддерева. Позже он будет перемещен в
    // левое поддерево предка
    const childRightNode = childNode.right

    // делаем предка правым узлом потомка
    childNode.setRight(parentNode)

    // перемещаем правое поддерево потомка в левое поддерево предка
    parentNode.setLeft(childRightNode)

    // помещаем потомка на место предка
    grandParentNode.setRight(childNode)

    // теперь мы готовы к выполнению правого правого поворота
    return this.rightRightRotation(grandParentNode)
  }

  makeNodeRed(node) {
    node.meta.set(PROP, COLORS.red)

    return node
  }

  makeNodeBlack(node) {
    node.meta.set(PROP, COLORS.black)

    return node
  }

  isNodeRed(node) {
    return node.meta.get(PROP) === COLORS.red
  }

  isNodeBlack(node) {
    return node.meta.get(PROP) === COLORS.black
  }

  isNodeColored(node) {
    return this.isNodeBlack(node) || this.isNodeRed(node)
  }

  swapNodeColors(node1, node2) {
    const node1Color = node1.meta.get(PROP)
    const node2Color = node2.meta.get(PROP)

    node1.meta.set(PROP, node2Color)
    node2.meta.set(PROP, node1Color)
  }
}
