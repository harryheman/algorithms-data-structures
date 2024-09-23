import Comparator from '../../utils/comparator'

export default class Sort {
  constructor(originalCallbacks) {
    this.callbacks = Sort.initSortingCallbacks(originalCallbacks)
    this.comparator = new Comparator(this.callbacks.compareCallback)
  }

  static initSortingCallbacks(originalCallbacks) {
    const callbacks = originalCallbacks || {}
    const stubCallback = () => {}

    callbacks.compareCallback = callbacks.compareCallback || undefined
    callbacks.visitingCallback = callbacks.visitingCallback || stubCallback

    return callbacks
  }

  sort() {
    throw new Error('Метод сортировки не реализован')
  }
}
