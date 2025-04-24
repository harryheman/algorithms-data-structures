import switchSign from '../switch-sign'

describe('switchSign', () => {
  it('должен менять знаки чисел', () => {
    expect(switchSign(0)).toBe(0)
    expect(switchSign(1)).toBe(-1)
    expect(switchSign(-1)).toBe(1)
    expect(switchSign(32)).toBe(-32)
    expect(switchSign(-32)).toBe(32)
    expect(switchSign(23)).toBe(-23)
    expect(switchSign(-23)).toBe(23)
  })
})
