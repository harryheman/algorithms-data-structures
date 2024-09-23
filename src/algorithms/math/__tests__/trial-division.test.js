import trialDivision from '../trial-division'

describe('trialDivision', () => {
  it('должен определить простые числа', () => {
    expect(trialDivision(1)).toBe(false)
    expect(trialDivision(2)).toBe(true)
    expect(trialDivision(3)).toBe(true)
    expect(trialDivision(5)).toBe(true)
    expect(trialDivision(11)).toBe(true)
    expect(trialDivision(191)).toBe(true)
    expect(trialDivision(191)).toBe(true)
    expect(trialDivision(199)).toBe(true)

    expect(trialDivision(-1)).toBe(false)
    expect(trialDivision(0)).toBe(false)
    expect(trialDivision(4)).toBe(false)
    expect(trialDivision(6)).toBe(false)
    expect(trialDivision(12)).toBe(false)
    expect(trialDivision(14)).toBe(false)
    expect(trialDivision(25)).toBe(false)
    expect(trialDivision(192)).toBe(false)
    expect(trialDivision(200)).toBe(false)
    expect(trialDivision(400)).toBe(false)

    expect(trialDivision(0.5)).toBe(false)
    expect(trialDivision(1.3)).toBe(false)
    expect(trialDivision(10.5)).toBe(false)
  })
})
