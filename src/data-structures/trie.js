import HashTable from './hash-table'

const HEAD_CHARACTER = '*'

// узел префиксного дерева
class Node {
  constructor(char, isCompleteWord = false) {
    // символ
    this.char = char
    // индикатор последнего (завершающего) символа
    this.isCompleteWord = isCompleteWord
    // хеш-таблица потомков
    this.children = new HashTable()
  }

  // получение потомка
  getChild(char) {
    return this.children.get(char)
  }

  // добавление потомка
  addChild(char, isCompleteWord = false) {
    if (!this.children.has(char)) {
      this.children.set(char, new Node(char, isCompleteWord))
    }

    // извлекаем узел
    const node = this.getChild(char)

    // обновляем его флаг `isCompleteWord` при необходимости
    // например, при добавлении слова "car" после слова "carpet",
    // букву "r" нужно пометить как завершающую
    node.isCompleteWord = node.isCompleteWord || isCompleteWord

    // возвращаем узел
    return node
  }

  // удаление потомка
  removeChild(char) {
    // извлекаем узел
    const node = this.getChild(char)

    // удаляем узел, только если:
    // - у него нет потомков
    // - node.isCompleteWord === false
    if (node && !node.isCompleteWord && !node.hasChildren()) {
      this.children.remove(char)
    }

    return this
  }

  // проверка наличия потомка
  hasChild(char) {
    return this.children.has(char)
  }

  // проверка наличия потомков
  hasChildren() {
    return this.children.getKeys().length > 0
  }

  // предложение следующих символов
  suggestChildren() {
    return this.children.getKeys()
  }

  // преобразование узла в строку
  toString() {
    let childrenAsString = this.suggestChildren().toString()
    childrenAsString = childrenAsString ? `${childrenAsString}` : ''
    const isCompleteString = this.isCompleteWord ? HEAD_CHARACTER : ''

    return `${this.char}${isCompleteString}${childrenAsString}`
  }
}

// префиксное дерево
export default class Trie {
  constructor() {
    // головной узел
    this.head = new Node()
  }

  // добавление слова в дерево
  addWord(word) {
    // разбиваем слово на массив символов
    const chars = [...word]

    // начинаем с головного узла
    let node = this.head

    // добавляем каждый символ в дерево
    for (let i = 0; i < chars.length; i++) {
      // индикатор последнего (завершающего) символа
      const isComplete = i === chars.length - 1
      // добавляем узел
      node = node.addChild(chars[i], isComplete)
    }

    return this
  }

  // удаление слова из дерева
  removeWord(word) {
    // удаление слова "сначала в глубину"
    const depthFirstRemove = (node, i = 0) => {
      // если удаляется символ за пределами слова
      if (i >= word.length) return

      const char = word[i]
      const nextNode = node.getChild(char)

      // если удаляется отсутствующее в дереве слово
      if (!nextNode) return

      // погружаемся глубже
      depthFirstRemove(nextNode, i + 1)

      // поскольку мы удаляем слово, обновляем флаг `isCompleteWord` его последнего символа
      if (i === word.length - 1) {
        nextNode.isCompleteWord = false
      }

      // узел удаляется, только если:
      // - у него нет потомков
      // - nextNode.isCompleteWord === false
      node.removeChild(char)
    }

    // начинаем с головного узла
    depthFirstRemove(this.head)

    return this
  }

  // предложение следующего символа
  suggestNextCharacter(word) {
    // получаем последний символ
    const lastChar = this.getLastCharNode(word)

    // если таковой отсутствует
    if (!lastChar) return null

    // массив следующих символов
    return lastChar.suggestChildren()
  }

  // проверка наличия слова в дереве
  doesWordExist(word) {
    // получаем последний символ
    const lastChar = this.getLastCharNode(word)

    return !!lastChar && lastChar.isCompleteWord
  }

  // получение последнего символа
  getLastCharNode(word) {
    // разбиваем слово на массив символов
    const chars = [...word]
    // начинаем с головного узла
    let node = this.head

    for (let i = 0; i < chars.length; i++) {
      // если такого символа в дереве нет
      if (!node.hasChild(chars[i])) {
        return null
      }

      // получаем значение узла
      node = node.getChild(chars[i])
    }

    // возвращаем последний узел
    return node
  }
}
