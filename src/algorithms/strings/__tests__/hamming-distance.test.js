import hammingDistance from '../hamming-distance'

describe('hammingDistance', () => {
  it('должен выбросить исключение при сравнении строк разной длины', () => {
    const compareStringsOfDifferentLength = () => {
      hammingDistance('a', 'aa')
    }

    expect(compareStringsOfDifferentLength).toThrowError()
  })

  it('должен вычислить расстояния Хэмминга между двумя строками', () => {
    expect(hammingDistance('a', 'a')).toBe(0)
    expect(hammingDistance('a', 'b')).toBe(1)
    expect(hammingDistance('abc', 'add')).toBe(2)
    expect(hammingDistance('karolin', 'kathrin')).toBe(3)
    expect(hammingDistance('karolin', 'kerstin')).toBe(3)
    expect(hammingDistance('1011101', '1001001')).toBe(2)
    expect(hammingDistance('2173896', '2233796')).toBe(3)
  })
})
