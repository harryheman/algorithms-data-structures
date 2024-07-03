export default function dpRainTerraces(terraces) {
  let waterAmount = 0

  let maxLeftArr = new Array(terraces.length).fill(0)
  let maxRightArr = new Array(terraces.length).fill(0)

  ;[maxLeftArr[0], maxRightArr[terraces.length - 1]] = [
    terraces[0],
    terraces[terraces.length - 1],
  ]

  for (let i = 1; i < terraces.length; i++) {
    maxLeftArr[i] = Math.max(maxLeftArr[i - 1], terraces[i])
  }

  for (let i = terraces.length - 2; i >= 0; i--) {
    maxRightArr[i] = Math.max(maxRightArr[i + 1], terraces[i])
  }

  for (let i = 0; i < terraces.length; i++) {
    const terraceBoundary = Math.min(maxLeftArr[i], maxRightArr[i])

    if (terraceBoundary > terraces[i]) {
      waterAmount += terraceBoundary - terraces[i]
    }
  }

  return waterAmount
}
