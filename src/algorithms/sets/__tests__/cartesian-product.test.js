import cartesianProduct from '../cartesian-product'

describe('cartesianProduct', () => {
  it('должен вернуть `null` при отсутствии одного из множеств', () => {
    const product1 = cartesianProduct([1], null)
    const product2 = cartesianProduct([], null)

    expect(product1).toBeNull()
    expect(product2).toBeNull()
  })

  it('должен вычислить произведение двух множеств', () => {
    const product1 = cartesianProduct([1], [1])
    const product2 = cartesianProduct([1, 2], [3, 5])

    expect(product1).toEqual([[1, 1]])
    expect(product2).toEqual([
      [1, 3],
      [1, 5],
      [2, 3],
      [2, 5],
    ])
  })
})
