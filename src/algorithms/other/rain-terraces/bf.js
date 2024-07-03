export default function bfRainTerraces(terraces) {
  let waterAmount = 0

  for (let i = 0; i < terraces.length; i++) {
    let maxLeft = 0
    for (let j = i - 1; j >= 0; j--) {
      maxLeft = Math.max(maxLeft, terraces[j])
    }

    let maxRight = 0
    for (let j = i + 1; j < terraces.length; j++) {
      maxRight = Math.max(maxRight, terraces[j])
    }

    const terraceBoundary = Math.min(maxLeft, maxRight)
    if (terraceBoundary > terraces[i]) {
      waterAmount += terraceBoundary - terraces[i]
    }
  }

  return waterAmount
}
