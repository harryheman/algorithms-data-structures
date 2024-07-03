import Sort from './sort'
import MinHeap from '../../data-structures/heap/MinHeap'

export default class HeapSort extends Sort {
  sort(arr) {
    const _arr = []
    const minHeap = new MinHeap(this.callbacks.compareCallback)

    // Добавляем все элементы массив в кучу
    for (const item of arr) {
      this.callbacks.visitingCallback(item)

      minHeap.add(item)
    }

    // Теперь у нас есть куча, в которой минимальный элемент всегда находится наверху.
    // Извлекаем минимальные элементы по одному для формирования отсортированного массива
    while (!minHeap.isEmpty()) {
      const item = minHeap.poll()

      this.callbacks.visitingCallback(item)

      _arr.push(item)
    }

    return _arr
  }
}
