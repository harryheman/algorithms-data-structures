export default function isPalindrome(str) {
  return str === [...str].reverse().join('')
}
