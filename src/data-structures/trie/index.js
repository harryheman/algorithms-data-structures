import TrieNode, { HEAD_CHARACTER } from './node'

// Префиксное дерево
export default class Trie {
  constructor() {
    // Головной (корневой) узел
    this.head = new TrieNode(HEAD_CHARACTER)
  }

  // Добавляет слово (ключ) в дерево
  addWord(word) {
    // Преобразуем строку (слово) в массив символов
    // (вопрос на засыпку: почему лучше не использовать `split()`?
    // Подсказка: попробуйте преобразовать "Hello, 👋!")
    const chars = [...word]

    // Текущий узел (начинаем с головного)
    let node = this.head

    // Перебираем символы и добавляем каждый в дерево
    for (let i = 0; i < chars.length; i++) {
      // Индикатор последнего (завершающего) символа
      const isComplete = i === chars.length - 1
      // Добавляем потомка
      node = node.addChild(chars[i], isComplete)
    }

    return this
  }

  // Удаляет слово (ключ) из дерева
  removeWord(word) {
    // Удаляет слово рекурсивно ("сначала в глубину")
    const depthFirstRemove = (node, i = 0) => {
      // Если удаляемый символ находится за пределами слова,
      // ничего не делаем
      if (i >= word.length) return

      // Символ
      const char = word[i]
      // Следующий узел
      const nextNode = node.getChild(char)

      // Если следующий узел отсутствует,
      // ничего не делаем
      if (!nextNode) return

      // Погружаемся глубже
      depthFirstRemove(nextNode, i + 1)

      // Поскольку мы удаляем слово,
      // необходимо обновить флаг `isCompleteWord`
      // его последнего символа
      if (i === word.length - 1) {
        nextNode.isCompleteWord = false
      }

      // Узел удаляется, только если:
      // - у него нет потомков
      // - nextNode.isCompleteWord === false
      node.removeChild(char)
    }

    // Начинаем с головного узла
    depthFirstRemove(this.head)

    return this
  }

  // Автодополнение (предложение следующих символов)
  suggestNextCharacters(word) {
    // Получаем последний символ
    const lastChar = this.getLastCharNode(word)

    // Если последний символ отсутствует
    if (!lastChar) {
      return null
    }

    // Возвращаем массив следующих символов
    return lastChar.suggestChildren()
  }

  // Определяет наличие слова в дереве
  doesWordExist(word) {
    // Получаем последний символ
    const lastChar = this.getLastCharNode(word)

    return Boolean(lastChar) && lastChar.isCompleteWord
  }

  // Возвращает последний символ
  getLastCharNode(word) {
    // Разбиваем слово на символы
    const chars = [...word]
    // Текущий узел (начинаем с головного)
    let node = this.head

    // Перебираем символы
    for (let i = 0; i < chars.length; i++) {
      // Если символ отсутствует
      if (!node.hasChild(chars[i])) {
        return null
      }

      // Извлекаем потомка
      node = node.getChild(chars[i])
    }

    // Возвращаем последний узел
    return node
  }
}
