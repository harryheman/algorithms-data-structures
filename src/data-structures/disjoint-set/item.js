export default class Item {
  constructor(value, keyCb) {
    // Значение
    this.value = value
    // Кастомная функция извлечения ключа
    this.keyCb = keyCb
    // Родительский узел
    this.parent = null
    // Дочерние узлы
    this.children = {}
  }

  // Возвращает ключ (значение)
  getKey() {
    if (this.keyCb) {
      return this.keyCb(this.value)
    }
    return this.value
  }

  // Возвращает корневой узел
  getRoot() {
    return this.isRoot() ? this : this.parent.getRoot()
  }

  // Определяет, является ли узел корневым
  isRoot() {
    return this.parent === null
  }

  // Возвращает ранг (вес) узла
  getRank() {
    const children = this.getChildren()

    if (children.length === 0) {
      return 0
    }

    let rank = 0
    for (const child of children) {
      rank += 1
      rank += child.getRank()
    }
    return rank
  }

  // Возвращает потомков
  getChildren() {
    return Object.values(this.children)
  }

  // Устанавливает предка
  setParent(parent, forceSettingParentChild = true) {
    this.parent = parent

    if (forceSettingParentChild) {
      parent.addChild(this)
    }

    return this
  }

  // Добавляет потомка
  addChild(child) {
    this.children[child.getKey()] = child
    child.setParent(this, false)

    return this
  }
}
