import * as m from './matrix'

export default function euclideanDistance(a, b) {
  m.validateSameShape(a, b)

  let squares = 0

  m.walk(a, (indices, aCellVal) => {
    const bCellVal = m.getCellAtIndex(b, indices)
    squares += (aCellVal - bCellVal) ** 2
  })

  return +Math.sqrt(squares).toFixed(2)
}
