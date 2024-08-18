// Функция определения того, является ли переданное число
// результатом возведения числа 2 в какую-либо степень
// (далее - степенью 2)
import isPowerOfTwo from '../../algorithms/math/is-power-of-two'

export default class SegmentTree {
  constructor(arr, fn, fb) {
    this.arr = arr
    // Основная операция
    this.fn = fn
    // Резервная операция
    this.fb = fb
    // Инициализируем представление дерева в виде массива
    this.tree = this.initTree(arr)
    // Строим дерево
    this.buildTree()
  }

  // Инициализирует представление дерева в виде массива
  initTree(arr) {
    let treeLength
    const arrLength = arr.length

    if (isPowerOfTwo(arrLength)) {
      // Если длина массива является степенью 2
      treeLength = arrLength * 2 - 1
    } else {
      // Если длина массива не является степенью 2,
      // нужно найти следующее число, которое является таковым,
      // и использовать его для вычисления длины дерева.
      // Это обусловлено тем, что пустые потомки идеального
      // бинарного дерева должны быть заполнены `null`
      const currentPower = Math.floor(Math.log2(arrLength))
      const nextPower = currentPower + 1
      const nextPowerOfTwoN = 2 ** nextPower

      treeLength = nextPowerOfTwoN * 2 - 1
    }

    return new Array(treeLength).fill(null)
  }

  // Строит дерево
  buildTree() {
    const leftIndex = 0
    const rightIndex = this.arr.length - 1
    const position = 0
    // Обращаемся к рекурсии
    this.buildTreeRecursively(leftIndex, rightIndex, position)
  }

  // Строит дерево рекурсивно
  buildTreeRecursively(leftIndex, rightIndex, position) {
    // Если левый и правый индексы совпадают, значит,
    // мы закончили деление пополам и добрались до листового узла.
    // Значение листа нужно копировать из массива в дерево
    if (leftIndex === rightIndex) {
      this.tree[position] = this.arr[leftIndex]
      return
    }

    // Делим массив на две равные части и обрабатываем каждую рекурсивно
    const middleIndex = Math.floor((leftIndex + rightIndex) / 2)
    // Обрабатываем левую половину
    this.buildTreeRecursively(
      leftIndex,
      middleIndex,
      this.getLeftChildIndex(position),
    )
    // Обрабатываем правую половину
    this.buildTreeRecursively(
      middleIndex + 1,
      rightIndex,
      this.getRightChildIndex(position),
    )

    // После заполнения всех листьев,
    // мы можем построить дерево снизу вверх
    // с помощью переданной функции
    this.tree[position] = this.fn(
      this.tree[this.getLeftChildIndex(position)],
      this.tree[this.getRightChildIndex(position)],
    )
  }

  // Выполняет запрос диапазона
  rangeQuery(queryLeftIndex, queryRightIndex) {
    const leftIndex = 0
    const rightIndex = this.arr.length - 1
    const position = 0
    // Обращаемся к рекурсии
    return this.rangeQueryRecursively(
      queryLeftIndex,
      queryRightIndex,
      leftIndex,
      rightIndex,
      position,
    )
  }

  // Выполняет запрос диапазона рекурсивно
  rangeQueryRecursively(
    queryLeftIndex,
    queryRightIndex,
    leftIndex,
    rightIndex,
    position,
  ) {
    if (queryLeftIndex <= leftIndex && queryRightIndex >= rightIndex) {
      // Полное перекрытие
      return this.tree[position]
    }

    if (queryLeftIndex > rightIndex || queryRightIndex < leftIndex) {
      // Перекрытие отсутствует
      return this.fb
    }

    // Частичное перекрытие
    const middleIndex = Math.floor((leftIndex + rightIndex) / 2)
    const leftFnResult = this.rangeQueryRecursively(
      queryLeftIndex,
      queryRightIndex,
      leftIndex,
      middleIndex,
      this.getLeftChildIndex(position),
    )
    const rightFnResult = this.rangeQueryRecursively(
      queryLeftIndex,
      queryRightIndex,
      middleIndex + 1,
      rightIndex,
      this.getRightChildIndex(position),
    )

    // Обрабатываем узлы с помощью переданной функции
    // и возвращаем результат
    return this.fn(leftFnResult, rightFnResult)
  }

  // Возвращает индекс левого потомка
  getLeftChildIndex(parentIndex) {
    return parentIndex * 2 + 1
  }

  // Возвращает индекс правого потомка
  getRightChildIndex(parentIndex) {
    return parentIndex * 2 + 2
  }
}
