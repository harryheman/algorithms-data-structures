export default function dynamicProgramming(arr) {
  let maxSum = -Infinity
  let sum = 0

  let maxStartIdx = 0
  let maxEndIdx = arr.length - 1
  let currentStartIdx = 0

  arr.forEach((item, idx) => {
    sum += item

    if (maxSum < sum) {
      maxSum = sum
      maxStartIdx = currentStartIdx
      maxEndIdx = idx
    }

    if (sum < 0) {
      sum = 0
      currentStartIdx = idx + 1
    }
  })

  return arr.slice(maxStartIdx, maxEndIdx + 1)
}
