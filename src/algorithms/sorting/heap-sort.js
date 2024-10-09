import Sort from './sort'
import MinHeap from '../../data-structures/heap/min-heap'

export default class HeapSort extends Sort {
  sort(arr) {
    const _arr = []
    // Создаем минимальную кучу
    const minHeap = new MinHeap(this.callbacks.compareCallback)

    // Добавляем элементы массива в кучу
    for (const item of arr) {
      this.callbacks.visitingCallback(item)

      minHeap.add(item)
    }

    // Теперь у нас есть куча, в которой минимальный элемент всегда находится на самом верху.
    // Извлекаем минимальные элементы по одному для формирования отсортированного массива
    while (!minHeap.isEmpty()) {
      const item = minHeap.poll()

      this.callbacks.visitingCallback(item)

      _arr.push(item)
    }

    return _arr
  }
}
