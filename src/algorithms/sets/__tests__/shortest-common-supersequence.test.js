import shortestCommonSupersequence from '../shortest-common-supersequence'

describe('shortestCommonSupersequence', () => {
  it('должен найти КОС двух множеств', () => {
    // LCS (наибольшая общая последовательность) пустая
    expect(
      shortestCommonSupersequence(['A', 'B', 'C'], ['D', 'E', 'F']),
    ).toEqual(['A', 'B', 'C', 'D', 'E', 'F'])

    // LCS - "EE"
    expect(
      shortestCommonSupersequence(['G', 'E', 'E', 'K'], ['E', 'K', 'E']),
    ).toEqual(['G', 'E', 'K', 'E', 'K'])

    // LCS - "GTAB"
    expect(
      shortestCommonSupersequence(
        ['A', 'G', 'G', 'T', 'A', 'B'],
        ['G', 'X', 'T', 'X', 'A', 'Y', 'B'],
      ),
    ).toEqual(['A', 'G', 'G', 'X', 'T', 'X', 'A', 'Y', 'B'])

    // LCS - "BCBA"
    expect(
      shortestCommonSupersequence(
        ['A', 'B', 'C', 'B', 'D', 'A', 'B'],
        ['B', 'D', 'C', 'A', 'B', 'A'],
      ),
    ).toEqual(['A', 'B', 'D', 'C', 'A', 'B', 'D', 'A', 'B'])

    // LCS - "BDABA"
    expect(
      shortestCommonSupersequence(
        ['B', 'D', 'C', 'A', 'B', 'A'],
        ['A', 'B', 'C', 'B', 'D', 'A', 'B', 'A', 'C'],
      ),
    ).toEqual(['A', 'B', 'C', 'B', 'D', 'C', 'A', 'B', 'A', 'C'])
  })
})
