export default function fisherYates(arr) {
  // Эффективно создаем глубокую копию массива
  // https://developer.mozilla.org/en-US/docs/Web/API/structuredClone
  const arrCopy = structuredClone(arr)

  for (let i = arrCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]]
  }

  return arrCopy
}
