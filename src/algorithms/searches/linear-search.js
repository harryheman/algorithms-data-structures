import Comparator from '../../utils/comparator'

export default function linearSearch(arr, target, fn) {
  const comparator = new Comparator(fn)
  const result = []

  arr.forEach((item, index) => {
    if (comparator.equal(item, target)) {
      result.push(index)
    }
  })

  return result
}
