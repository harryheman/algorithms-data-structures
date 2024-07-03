export default function bruteForce(arr) {
  let maxStartIdx = 0
  let maxLen = 0
  let maxSum = null

  for (let i = 0; i < arr.length; i++) {
    let sum = 0
    for (let j = 1; j <= arr.length - i; j++) {
      sum += arr[i + (j - 1)]
      if (!maxSum || sum > maxSum) {
        maxSum = sum
        maxStartIdx = i
        maxLen = j
      }
    }
  }

  return arr.slice(maxStartIdx, maxStartIdx + maxLen)
}
