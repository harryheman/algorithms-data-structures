import divideConquer from '../divide-conquer'

describe('dcMaximumSubarraySum', () => {
  it("должен найти максимальные подмассивы методом 'Разделяй и властвуй'", () => {
    expect(divideConquer([])).toEqual(-Infinity)
    expect(divideConquer([0, 0])).toEqual(0)
    expect(divideConquer([0, 0, 1])).toEqual(1)
    expect(divideConquer([0, 0, 1, 2])).toEqual(3)
    expect(divideConquer([0, 0, -1, 2])).toEqual(2)
    expect(divideConquer([-1, -2, -3, -4, -5])).toEqual(-1)
    expect(divideConquer([1, 2, 3, 2, 3, 4, 5])).toEqual(20)
    expect(divideConquer([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toEqual(6)
    expect(divideConquer([-2, -3, 4, -1, -2, 1, 5, -3])).toEqual(7)
    expect(divideConquer([1, -3, 2, -5, 7, 6, -1, 4, 11, -23])).toEqual(27)
  })
})
