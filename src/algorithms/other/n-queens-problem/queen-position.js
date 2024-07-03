export default class QueenPosition {
  constructor(rowIndex, columnIndex) {
    this.rowIndex = rowIndex
    this.columnIndex = columnIndex
  }

  get leftDiagonal() {
    // Каждая позиция на той же левой (\) диагонали имеет ту же разницу между
    // rowIndex и columnIndex. Этот факт можно использовать для быстрой проверки нахождения
    // 2 позиций (королев) на одной и той же левой диагонали.
    // @see https://youtu.be/xouin83ebxE?t=1m59s
    return this.rowIndex - this.columnIndex
  }

  get rightDiagonal() {
    // Каждая позиция на той же правой диагонали (/) имеет ту же сумму между
    // rowIndex и columnIndex. Это факт может использоваться для быстрой проверки нахождения
    // 2 позиций (королев) на одной и той же правой диагонали.
    // @see https://youtu.be/xouin83ebxE?t=1m59s
    return this.rowIndex + this.columnIndex
  }

  toString() {
    return `${this.rowIndex},${this.columnIndex}`
  }
}
