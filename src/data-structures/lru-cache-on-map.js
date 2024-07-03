export default class LruCacheOnMap {
  constructor(size) {
    this.size = size
    this.map = new Map()
  }

  get(key) {
    const val = this.map.get(key)
    if (!val) return null
    this.map.delete(key)
    this.map.set(key, val)
    return val
  }

  set(key, val) {
    this.map.delete(key)
    this.map.set(key, val)
    if (this.map.size > this.size) {
      for (const key of this.map.keys()) {
        this.map.delete(key)
        break
      }
    }
  }
}
