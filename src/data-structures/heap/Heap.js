import Comparator from '../../utils/comparator'

// родительский класс для min- и max-куч
export default class Heap {
  constructor(fn) {
    if (new.target === Heap) {
      throw new TypeError('Кучу нельзя создавать напрямую!')
    }
    // представление кучи в виде массива
    this.heapContainer = []
    this.compare = new Comparator(fn)
  }

  getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1
  }

  getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2
  }

  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2)
  }

  hasParent(childIndex) {
    return this.getParentIndex(childIndex) >= 0
  }

  hasLeftChild(parentIndex) {
    return this.getLeftChildIndex(parentIndex) < this.heapContainer.length
  }

  hasRightChild(parentIndex) {
    return this.getRightChildIndex(parentIndex) < this.heapContainer.length
  }

  leftChild(parentIndex) {
    return this.heapContainer[this.getLeftChildIndex(parentIndex)]
  }

  rightChild(parentIndex) {
    return this.heapContainer[this.getRightChildIndex(parentIndex)]
  }

  parent(childIndex) {
    return this.heapContainer[this.getParentIndex(childIndex)]
  }

  swap(indexOne, indexTwo) {
    const tmp = this.heapContainer[indexOne]
    this.heapContainer[indexOne] = this.heapContainer[indexTwo]
    this.heapContainer[indexTwo] = tmp
  }

  isEmpty() {
    return this.heapContainer.length === 0
  }

  toString() {
    return this.heapContainer.toString()
  }

  peek() {
    if (this.isEmpty()) {
      return null
    }

    return this.heapContainer[0]
  }

  poll() {
    if (this.isEmpty()) {
      return null
    }

    if (this.heapContainer.length === 1) {
      return this.heapContainer.pop()
    }

    const item = this.heapContainer[0]
    // перемещаем последний элемент в начало
    this.heapContainer[0] = this.heapContainer.pop()
    this.heapifyDown()

    return item
  }

  add(item) {
    this.heapContainer.push(item)
    this.heapifyUp()

    return this
  }

  remove(item, comparator = this.compare) {
    // получаем количество удаляемых элементов
    const numberOfItemsToRemove = this.find(item, comparator).length

    for (let i = 0; i < numberOfItemsToRemove; i++) {
      // определять индекс удаляемого элемента необходимо на каждой итерации,
      // поскольку индексы меняются после каждой модификации кучи
      const index = this.find(item, comparator).pop()

      // последний элемент просто удаляется
      if (index === this.heapContainer.length - 1) {
        this.heapContainer.pop()
      } else {
        // перемещаем последний элемент в освободившуюся позицию
        this.heapContainer[index] = this.heapContainer.pop()
        // получаем родительский элемент
        const parentItem = this.parent(index)

        // если предок отсутствует или неправильно расположен, то
        // удаляем элемент ниже
        if (
          this.hasLeftChild(index) &&
          (!parentItem ||
            this.pairIsInCorrectOrder(parentItem, this.heapContainer[index]))
        ) {
          this.heapifyDown(index)
        } else {
          // иначе, удаляем элемент выше
          this.heapifyUp(index)
        }
      }
    }

    return this
  }

  find(item, comparator = this.compare) {
    const indices = []

    for (let i = 0; i < this.heapContainer.length; i++) {
      if (comparator.equal(this.heapContainer[i], item)) {
        indices.push(i)
      }
    }

    return indices
  }

  heapifyUp(customStartIndex) {
    // берем последний элемент (последний в массиве или нижний левый в дереве)
    // и поднимаем его наверх до тех пор, пока он не будет
    // правильно расположен по отношению к родительскому элементу
    let currentIndex = customStartIndex || this.heapContainer.length - 1

    while (
      this.hasParent(currentIndex) &&
      !this.pairIsInCorrectOrder(
        this.parent(currentIndex),
        this.heapContainer[currentIndex],
      )
    ) {
      this.swap(currentIndex, this.getParentIndex(currentIndex))
      currentIndex = this.getParentIndex(currentIndex)
    }
  }

  heapifyDown(customStartIndex = 0) {
    // сравниваем родительский элемент с его дочерними элементами и
    // меняем местами предка с соответствующим потомком
    // (наименьшим для min-кучи и наибольшим для max-кучи).
    // Затем делаем тоже самое для следующего потомка
    let currentIndex = customStartIndex
    let nextIndex = null

    while (this.hasLeftChild(currentIndex)) {
      if (
        this.hasRightChild(currentIndex) &&
        this.pairIsInCorrectOrder(
          this.rightChild(currentIndex),
          this.leftChild(currentIndex),
        )
      ) {
        nextIndex = this.getRightChildIndex(currentIndex)
      } else {
        nextIndex = this.getLeftChildIndex(currentIndex)
      }

      if (
        this.pairIsInCorrectOrder(
          this.heapContainer[currentIndex],
          this.heapContainer[nextIndex],
        )
      ) {
        break
      }

      this.swap(currentIndex, nextIndex)
      currentIndex = nextIndex
    }
  }

  // проверка того, что пара элементов в куче расположена в правильном порядке.
  // Для min-кучи первый элемент всегда должен быть меньше или равен второму.
  // Для max-кучи первый элемент всегда должен быть больше или равен второму.
  pairIsInCorrectOrder(firstElement, secondElement) {
    throw new Error('Метод сравнения не реализован!')
  }
}
