import Comparator from '../../utils/comparator'

export default class Sort {
  constructor(originalCallbacks) {
    // Коллбэки сортировки
    this.callbacks = Sort.initSortingCallbacks(originalCallbacks)
    // Функция сравнения элементов
    this.comparator = new Comparator(this.callbacks.compareCallback)
  }

  // Коллбэки сортировки
  static initSortingCallbacks(originalCallbacks) {
    const callbacks = originalCallbacks || {}
    const stubCallback = () => {}

    // Вызывается при сравнении элементов
    callbacks.compareCallback = callbacks.compareCallback || undefined
    // Вызывается при посещении элемента
    callbacks.visitingCallback = callbacks.visitingCallback || stubCallback

    return callbacks
  }

  // Метод сортировки реализуется подклассом
  sort() {
    throw new Error('Метод сортировки не реализован')
  }
}
