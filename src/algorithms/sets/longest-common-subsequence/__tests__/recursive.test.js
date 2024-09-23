import lcsRecursive from '../recursive'

describe('lcsRecursive', () => {
  it('должен рекурсивно найти НОП двух строк', () => {
    expect(lcsRecursive('', '')).toBe('')
    expect(lcsRecursive('ABC', '')).toBe('')
    expect(lcsRecursive('', 'ABC')).toBe('')
    expect(lcsRecursive('ABABC', 'BABCA')).toBe('BABC')
    expect(lcsRecursive('BABCA', 'ABCBA')).toBe('ABCA')
    expect(lcsRecursive('sea', 'eat')).toBe('ea')
    expect(lcsRecursive('algorithms', 'rithm')).toBe('rithm')
    expect(
      lcsRecursive(
        'Algorithms and data structures implemented in JavaScript',
        'Here you may find Algorithms and data structures that are implemented in JavaScript',
      ),
    ).toBe('Algorithms and data structures implemented in JavaScript')
  })
})
