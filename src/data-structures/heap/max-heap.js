import Heap from '.'

export default class MaxHeap extends Heap {
  pairIsInCorrectOrder(firstElement, secondElement) {
    // Первый элемент должен быть больше или равен второму
    return this.compare.greaterThanOrEqual(firstElement, secondElement)
  }
}
