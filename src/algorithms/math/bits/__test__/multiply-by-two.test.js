import multiplyByTwo from '../multiply-by-two'

describe('multiplyByTwo', () => {
  it('должен умножить числа на 2 с помощью бинарных операций', () => {
    expect(multiplyByTwo(0)).toBe(0)
    expect(multiplyByTwo(1)).toBe(2)
    expect(multiplyByTwo(3)).toBe(6)
    expect(multiplyByTwo(10)).toBe(20)
    expect(multiplyByTwo(17)).toBe(34)
    expect(multiplyByTwo(125)).toBe(250)
  })
})
