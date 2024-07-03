import isPowerOfTwo from '../../algorithms/math/is-power-of-two'

export default class SegmentTree {
  constructor(arr, fn, fb) {
    this.arr = arr
    // основная операция
    this.fn = fn
    // резервная операция
    this.fb = fb
    // инициализируем представление дерева в виде массива
    this.tree = this.initTree(arr)
    this.buildTree()
  }

  initTree(arr) {
    let segmentTreeArrLength
    const arrLength = arr.length

    if (isPowerOfTwo(arrLength)) {
      // если длина оригинального массива является степенью 2
      segmentTreeArrLength = arrLength * 2 - 1
    } else {
      // если длина оригинального массива не является степенью 2,
      // нужно найти следующее число, которое является степенью 2,
      // и использовать его для вычисления длины массива дерева.
      // Это связано с тем, что пустые потомки идеального
      // бинарного дерева должны быть заполнены `null`
      const currentPower = Math.floor(Math.log2(arrLength))
      const nextPower = currentPower + 1
      const nextPowerOfTwoN = 2 ** nextPower

      segmentTreeArrLength = nextPowerOfTwoN * 2 - 1
    }

    return new Array(segmentTreeArrLength).fill(null)
  }

  buildTree() {
    const leftIndex = 0
    const rightIndex = this.arr.length - 1
    const position = 0
    this.buildTreeRecursively(leftIndex, rightIndex, position)
  }

  buildTreeRecursively(leftIndex, rightIndex, position) {
    // если нижний и верхний индексы совпадают, значит,
    // мы закончили разделение и добрались до листового узла.
    // Значение листа нужно копировать из массива в дерево
    if (leftIndex === rightIndex) {
      this.tree[position] = this.arr[leftIndex]
      return
    }

    // делим массив на две равные части и обрабатываем их рекурсивно
    const middleIndex = Math.floor((leftIndex + rightIndex) / 2)
    // обрабатываем левую половину
    this.buildTreeRecursively(
      leftIndex,
      middleIndex,
      this.getLeftChildIndex(position),
    )
    // обрабатываем правую половину
    this.buildTreeRecursively(
      middleIndex + 1,
      rightIndex,
      this.getRightChildIndex(position),
    )

    // после заполнения всех листьев, мы можем построить дерево снизу вверх
    // с помощью предоставленной функции (операции)
    this.tree[position] = this.fn(
      this.tree[this.getLeftChildIndex(position)],
      this.tree[this.getRightChildIndex(position)],
    )
  }

  rangeQuery(queryLeftIndex, queryRightIndex) {
    const leftIndex = 0
    const rightIndex = this.arr.length - 1
    const position = 0
    return this.rangeQueryRecursively(
      queryLeftIndex,
      queryRightIndex,
      leftIndex,
      rightIndex,
      position,
    )
  }

  rangeQueryRecursively(
    queryLeftIndex,
    queryRightIndex,
    leftIndex,
    rightIndex,
    position,
  ) {
    if (queryLeftIndex <= leftIndex && queryRightIndex >= rightIndex) {
      // полное перекрытие
      return this.tree[position]
    }

    if (queryLeftIndex > rightIndex || queryRightIndex < leftIndex) {
      // нет перекрытия
      return this.fb
    }

    // частичное перекрытие
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

    return this.fn(leftFnResult, rightFnResult)
  }

  getLeftChildIndex(parentIndex) {
    return parentIndex * 2 + 1
  }

  getRightChildIndex(parentIndex) {
    return parentIndex * 2 + 2
  }
}
