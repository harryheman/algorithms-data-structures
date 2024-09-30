import knuthMorrisPratt from '../knuth-morris-pratt'

describe('knuthMorrisPratt', () => {
  it('должен найти начальные индексы слов в текстах', () => {
    expect(knuthMorrisPratt('', '')).toBe(0)
    expect(knuthMorrisPratt('a', '')).toBe(0)
    expect(knuthMorrisPratt('a', 'a')).toBe(0)
    expect(knuthMorrisPratt('abcbcglx', 'abca')).toBe(-1)
    expect(knuthMorrisPratt('abcbcglx', 'bcgl')).toBe(3)
    expect(knuthMorrisPratt('abcxabcdabxabcdabcdabcy', 'abcdabcy')).toBe(15)
    expect(knuthMorrisPratt('abcxabcdabxabcdabcdabcy', 'abcdabca')).toBe(-1)
    expect(
      knuthMorrisPratt('abcxabcdabxaabcdabcabcdabcdabcy', 'abcdabca'),
    ).toBe(12)
    expect(
      knuthMorrisPratt('abcxabcdabxaabaabaaaabcdabcdabcy', 'aabaabaaa'),
    ).toBe(11)
  })
})
