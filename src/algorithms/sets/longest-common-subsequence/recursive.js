export default function lcsRecursive(a, b) {
  const lcs = (a, b, memo = {}) => {
    if (!a || !b) return ''

    if (memo[`${a},${b}`]) {
      return memo[`${a},${b}`]
    }

    if (a[0] === b[0]) {
      return a[0] + lcs(a.slice(1), b.slice(1), memo)
    }

    const next1 = lcs(a.slice(1), b, memo)
    const next2 = lcs(a, b.slice(1), memo)

    const nextLongest = next1.length >= next2.length ? next1 : next2
    memo[`${a},${b}`] = nextLongest

    return nextLongest
  }

  return lcs(a, b)
}
