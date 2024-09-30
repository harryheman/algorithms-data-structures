import levenshteinDistance from '../levenshtein-distance'

describe('levenshteinDistance', () => {
  it('должен вычислить расстояния Левенштейна между двумя строками', () => {
    expect(levenshteinDistance('', '')).toBe(0)
    expect(levenshteinDistance('a', '')).toBe(1)
    expect(levenshteinDistance('', 'a')).toBe(1)
    expect(levenshteinDistance('abc', '')).toBe(3)
    expect(levenshteinDistance('', 'abc')).toBe(3)

    // Нужно добавить `I` в начало
    expect(levenshteinDistance('islander', 'slander')).toBe(1)

    // Нужно заменить `M` на `K`, `T` на `M` и добавить `A` в конец
    expect(levenshteinDistance('mart', 'karma')).toBe(3)

    // Нужно заменить `K` на `S`, `E` на `I` и добавить `G` в конец
    expect(levenshteinDistance('kitten', 'sitting')).toBe(3)

    // Нужно добавить 4 буквы `FOOT` в начало
    expect(levenshteinDistance('ball', 'football')).toBe(4)

    // Нужно удалить 4 буквы `FOOT` в начале
    expect(levenshteinDistance('football', 'foot')).toBe(4)

    // Нужно заменить первые 5 букв `INTEN` на `EXECU`
    expect(levenshteinDistance('intention', 'execution')).toBe(5)
  })
})
