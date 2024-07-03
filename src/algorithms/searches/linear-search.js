import Comparator from '../../utils/comparator'

export default function linearSearch(arr, target, comparatorFn) {
  const comparator = new Comparator(comparatorFn)
  const result = []

  arr.forEach((item, index) => {
    if (comparator.equal(item, target)) {
      result.push(index)
    }
  })

  return result
}
