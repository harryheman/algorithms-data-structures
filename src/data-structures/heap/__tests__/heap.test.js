import Heap from '..'

describe('Heap', () => {
  it('должен выбросить исключение при попытке создания кучи напрямую', () => {
    const instantiateHeap = () => {
      const heap = new Heap()
      heap.add(5)
    }

    expect(instantiateHeap).toThrow()
  })
})
