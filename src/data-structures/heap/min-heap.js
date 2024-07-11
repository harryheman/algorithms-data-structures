import Heap from '.'

export default class MinHeap extends Heap {
  pairIsInCorrectOrder(firstElement, secondElement) {
    // Первый элемент должен быть меньше или равен второму
    return this.compare.lessThanOrEqual(firstElement, secondElement)
  }
}
