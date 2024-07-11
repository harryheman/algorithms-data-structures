// Импортируем конструктор функции сравнения узлов
import Comparator from '../../utils/comparator'

// Родительский класс для min- и max-куч
export default class Heap {
  constructor(fn) {
    // Кучи должны создаваться с помощью соответствующих подклассов
    if (new.target === Heap) {
      throw new TypeError('Кучу нельзя создавать напрямую!')
    }
    // Представление кучи в виде массива
    this.heapContainer = []
    // Функция сравнения элементов
    this.compare = new Comparator(fn)
  }

  // Возвращает индекс левого потомка
  getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1
  }

  // Возвращает индекс правого потомка
  getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2
  }

  // Возвращает индекс предка
  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2)
  }

  // Проверяет наличие предка
  hasParent(childIndex) {
    return this.getParentIndex(childIndex) >= 0
  }

  // Проверяет наличие левого потомка
  hasLeftChild(parentIndex) {
    return this.getLeftChildIndex(parentIndex) < this.heapContainer.length
  }

  // Проверяет наличие правого потомка
  hasRightChild(parentIndex) {
    return this.getRightChildIndex(parentIndex) < this.heapContainer.length
  }

  // Возвращает левого потомка
  leftChild(parentIndex) {
    return this.heapContainer[this.getLeftChildIndex(parentIndex)]
  }

  // Возвращает правого потомка
  rightChild(parentIndex) {
    return this.heapContainer[this.getRightChildIndex(parentIndex)]
  }

  // Возвращает предка
  parent(childIndex) {
    return this.heapContainer[this.getParentIndex(childIndex)]
  }

  // Определяет пустоту кучи
  isEmpty() {
    return this.heapContainer.length === 0
  }

  // Возвращает строковое представление кучи
  toString() {
    return this.heapContainer.toString()
  }

  // Возвращает ссылку на корневой элемент кучи
  // (наименьший для min-кучи, наибольший для max-кучи;
  // элемент не удаляется)
  peek() {
    if (this.isEmpty()) {
      return null
    }

    return this.heapContainer[0]
  }

  // Удаляет и возвращает корневой элемент кучи
  poll() {
    if (this.isEmpty()) {
      return null
    }

    if (this.heapContainer.length === 1) {
      return this.heapContainer.pop()
    }

    const item = this.heapContainer[0]
    // Перемещаем последний элемент в начало
    this.heapContainer[0] = this.heapContainer.pop()
    // Просеиваем кучу вниз
    this.heapifyDown()
    // Возвращаем удаленный элемент
    return item
  }

  // Добавляет элемент в кучу
  add(item) {
    // Добавляем новый элемент в конец кучи
    this.heapContainer.push(item)
    // Просеиваем кучу вверх
    this.heapifyUp()

    return this
  }

  // Удаляет элемент из кучи.
  // Принимает элемент и кастомную функцию сравнения элементов
  remove(item, comparator = this.compare) {
    // Определяем количество удаляемых элементов
    const numberOfItemsToRemove = this.find(item, comparator).length

    for (let i = 0; i < numberOfItemsToRemove; i += 1) {
      // Определять индекс удаляемого элемента необходимо на каждой итерации,
      // поскольку куча каждый раз модифицируется
      const index = this.find(item, comparator).pop()

      // Последний элемент просто удаляется
      if (index === this.heapContainer.length - 1) {
        this.heapContainer.pop()
      } else {
        // Иначе, перемещаем последний элемент на освободившееся место
        this.heapContainer[index] = this.heapContainer.pop()
        // Получаем родительский элемент
        const parentItem = this.parent(index)

        // Если предок отсутствует или неправильно расположен,
        // просеиваем кучу вниз
        if (
          this.hasLeftChild(index) &&
          (!parentItem ||
            this.pairIsInCorrectOrder(parentItem, this.heapContainer[index]))
        ) {
          this.heapifyDown(index)
        } else {
          // Иначе, просеиваем кучу вверх
          this.heapifyUp(index)
        }
      }
    }

    return this
  }

  // Находит индексы всех элементов, равных `item`.
  // Принимает искомый элемент и кастомную функцию сравнения элементов
  find(item, comparator = this.compare) {
    const indices = []

    for (let i = 0; i < this.heapContainer.length; i += 1) {
      if (comparator.equal(this.heapContainer[i], item)) {
        indices.push(i)
      }
    }

    return indices
  }

  // Меняет элементы местами
  swap(indexOne, indexTwo) {
    const tmp = this.heapContainer[indexOne]
    this.heapContainer[indexOne] = this.heapContainer[indexTwo]
    this.heapContainer[indexTwo] = tmp
  }

  // Просеивает кучу вверх.
  // Принимает кастомный индекс начальной позиции
  heapifyUp(customStartIndex) {
    // Берем последний элемент (последний в массиве или нижний левый в дереве)
    // и поднимаем его наверх до тех пор, пока он не будет
    // правильно расположен по отношению к предку
    let currentIndex = customStartIndex || this.heapContainer.length - 1

    while (
      this.hasParent(currentIndex) &&
      !this.pairIsInCorrectOrder(
        this.parent(currentIndex),
        this.heapContainer[currentIndex],
      )
    ) {
      this.swap(currentIndex, this.getParentIndex(currentIndex))
      currentIndex = this.getParentIndex(currentIndex)
    }
  }

  // Просеивает кучу вниз.
  // Принимает кастомный индекс начальной позиции (по умолчанию 0)
  heapifyDown(customStartIndex = 0) {
    // Сравниваем предка с его потомками и
    // меняем местами предка с соответствующим потомком
    // (наименьшим для min-кучи и наибольшим для max-кучи).
    // Затем делаем тоже самое для следующего потомка
    let currentIndex = customStartIndex
    let nextIndex = null

    // Пока есть левый потомок
    while (this.hasLeftChild(currentIndex)) {
      // Если есть правый потомок и
      // потомки расположены в правильном порядке
      if (
        this.hasRightChild(currentIndex) &&
        this.pairIsInCorrectOrder(
          this.rightChild(currentIndex),
          this.leftChild(currentIndex),
        )
      ) {
        // Следующим индексом является индекс правого потомка
        nextIndex = this.getRightChildIndex(currentIndex)
      } else {
        // Иначе, следующим индексом является индекс левого потомка
        nextIndex = this.getLeftChildIndex(currentIndex)
      }

      // Прерываем цикл, если элементы расположены в правильном порядке
      if (
        this.pairIsInCorrectOrder(
          this.heapContainer[currentIndex],
          this.heapContainer[nextIndex],
        )
      ) {
        break
      }

      // Меняем элементы местами
      this.swap(currentIndex, nextIndex)
      // Обновляем текущий индекс
      currentIndex = nextIndex
    }
  }

  // Проверяет, что пара элементов в куче расположена в правильном порядке.
  // Для min-кучи первый элемент всегда должен быть меньше или равен второму.
  // Для max-кучи первый элемент всегда должен быть больше или равен второму.
  // Этот метод должен быть реализован соответствующими подклассами
  // (min-кучей и max-кучей)
  pairIsInCorrectOrder(firstElement, secondElement) {
    throw new Error('Метод сравнения не реализован!')
  }
}
