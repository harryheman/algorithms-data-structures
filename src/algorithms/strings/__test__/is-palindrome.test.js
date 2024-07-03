import isPalindrome from '../is-palindrome'

describe('palindromeCheck', () => {
  it('должен проверять, является ли строка палиндромом', () => {
    expect(isPalindrome('a')).toBe(true)
    expect(isPalindrome('pop')).toBe(true)
    expect(isPalindrome('deed')).toBe(true)
    expect(isPalindrome('kayak')).toBe(true)
    expect(isPalindrome('racecar')).toBe(true)

    expect(isPalindrome('rad')).toBe(false)
    expect(isPalindrome('dodo')).toBe(false)
    expect(isPalindrome('polo')).toBe(false)
  })
})
