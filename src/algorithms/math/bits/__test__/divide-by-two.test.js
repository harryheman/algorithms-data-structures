import divideByTwo from '../divide-by-two'

describe('divideByTwo', () => {
  it('должна делить число на 2 с помощью бинарных операций', () => {
    expect(divideByTwo(0)).toBe(0)
    expect(divideByTwo(1)).toBe(0)
    expect(divideByTwo(3)).toBe(1)
    expect(divideByTwo(10)).toBe(5)
    expect(divideByTwo(17)).toBe(8)
    expect(divideByTwo(125)).toBe(62)
  })
})
