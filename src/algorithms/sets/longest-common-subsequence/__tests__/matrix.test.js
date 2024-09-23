import lcs from '../matrix'

describe('lcs', () => {
  it('должен найти НОП двух множеств', () => {
    expect(lcs([''], [''])).toEqual([''])

    expect(lcs([''], ['A', 'B', 'C'])).toEqual([''])

    expect(lcs(['A', 'B', 'C'], [''])).toEqual([''])

    expect(lcs(['A', 'B', 'C'], ['D', 'E', 'F', 'G'])).toEqual([''])

    expect(
      lcs(['A', 'B', 'C', 'D', 'G', 'H'], ['A', 'E', 'D', 'F', 'H', 'R']),
    ).toEqual(['A', 'D', 'H'])

    expect(
      lcs(['A', 'G', 'G', 'T', 'A', 'B'], ['G', 'X', 'T', 'X', 'A', 'Y', 'B']),
    ).toEqual(['G', 'T', 'A', 'B'])

    expect(
      lcs(['A', 'B', 'C', 'D', 'A', 'F'], ['A', 'C', 'B', 'C', 'F']),
    ).toEqual(['A', 'B', 'C', 'F'])
  })
})
