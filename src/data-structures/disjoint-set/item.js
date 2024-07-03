export default class Item {
  constructor(value, keyCb) {
    this.value = value
    this.keyCb = keyCb
    this.parent = null
    this.children = {}
  }

  getKey() {
    if (this.keyCb) {
      return this.keyCb(this.value)
    }
    return this.value
  }

  getRoot() {
    return this.isRoot() ? this : this.parent.getRoot()
  }

  isRoot() {
    return this.parent === null
  }

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

  getChildren() {
    return Object.values(this.children)
  }

  setParent(parent, forceSettingParentChild = true) {
    this.parent = parent

    if (forceSettingParentChild) {
      parent.addChild(this)
    }

    return this
  }

  addChild(child) {
    this.children[child.getKey()] = child
    child.setParent(this, false)

    return this
  }
}
