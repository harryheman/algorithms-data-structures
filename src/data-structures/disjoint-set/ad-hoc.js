export default class DisjointSetAdHoc {
  constructor(size) {
    this.roots = new Array(size).fill(0).map((_, i) => i)
    this.heights = new Array(size).fill(1)
  }

  find(a) {
    if (this.roots[a] === a) return a
    this.roots[a] = this.find(this.roots[a])
    return this.roots[a]
  }

  union(a, b) {
    const rootA = this.find(a)
    const rootB = this.find(b)
    if (rootA === rootB) return

    if (this.heights[rootA] < this.heights[rootB]) {
      this.roots[rootA] = rootB
    } else if (this.heights[rootA] > this.heights[rootB]) {
      this.roots[rootB] = rootA
    } else {
      this.roots[rootB] = rootA
      this.heights[rootA]++
    }
  }

  connected(a, b) {
    return this.find(a) === this.find(b)
  }
}
