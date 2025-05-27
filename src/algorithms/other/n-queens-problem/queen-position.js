export default class QueenPosition {
  constructor(rowIndex, columnIndex) {
    this.rowIndex = rowIndex
    this.columnIndex = columnIndex
  }

  get leftDiagonal() {
    // Каждая позиция на одной левой (\) диагонали имеет одинаковую разницу между
    // `rowIndex` и `columnIndex`. Этот факт можно использовать для быстрой проверки нахождения
    // двух позиций (королев) на одной левой диагонали.
    // @see https://youtu.be/xouin83ebxE?t=1m59s
    return this.rowIndex - this.columnIndex
  }

  get rightDiagonal() {
    // Каждая позиция на одной правой диагонали (/) имеет одинаковую сумму между
    // `rowIndex` и `columnIndex`. Это факт может использоваться для быстрой проверки нахождения
    // двух позиций (королев) на одной правой диагонали.
    // @see https://youtu.be/xouin83ebxE?t=1m59s
    return this.rowIndex + this.columnIndex
  }

  toString() {
    return `${this.rowIndex},${this.columnIndex}`
  }
}
