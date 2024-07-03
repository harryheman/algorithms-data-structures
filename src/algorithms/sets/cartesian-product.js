export default function cartesianProduct(a, b) {
  if (!a?.length || !b?.length) return null

  return a.map((x) => b.map((y) => [x, y])).reduce((a, b) => a.concat(b), [])
}
