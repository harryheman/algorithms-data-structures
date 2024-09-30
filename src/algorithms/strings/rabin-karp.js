import PolynomialHash from '../cryptography/polynomial-hash'

export default function rabinKarp(text, word) {
  const hasher = new PolynomialHash()

  // Вычисляем хэш слова, который будет использоваться для сравнения с хэшами подстрок
  const wordHash = hasher.hash(word)

  let prevFrame = null
  let currentFrameHash = null

  // Перебираем все подстроки текста, которые могут совпасть
  for (let i = 0; i < text.length - word.length + 1; i++) {
    const currentFrame = text.slice(i, i + word.length)

    // Вычисляем хэш текущей подстроки
    if (!currentFrameHash) {
      currentFrameHash = hasher.hash(currentFrame)
    } else {
      currentFrameHash = hasher.roll(currentFrameHash, prevFrame, currentFrame)
    }

    prevFrame = currentFrame

    // Сравниваем хэш текущей подстроки с искомым паттерном.
    // При совпадении хэшей, проверяем равенство подстрок на случай коллизии хэшей
    if (
      wordHash === currentFrameHash &&
      text.slice(i, i + word.length) === word
    ) {
      return i
    }
  }

  return -1
}
