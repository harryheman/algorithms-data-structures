// @see: https://en.wikipedia.org/wiki/Single-precision_floating-point_format
const singlePrecisionBytesLength = 4 // 32 бита

// @see: https://en.wikipedia.org/wiki/Double-precision_floating-point_format
const doublePrecisionBytesLength = 8 // 64 бита

const bitsInByte = 8
const byteOffset = 0
const littleEndian = false

/**
 * Преобразует число с плавающей запятой в двоичное представление согласно IEEE 754
 */
function floatAsBinaryString(floatNumber, byteLength) {
  let numberAsBinaryString = ''

  const arrayBuffer = new ArrayBuffer(byteLength)
  const dataView = new DataView(arrayBuffer)

  if (byteLength === singlePrecisionBytesLength) {
    dataView.setFloat32(byteOffset, floatNumber, littleEndian)
  } else {
    dataView.setFloat64(byteOffset, floatNumber, littleEndian)
  }

  for (let i = 0; i < byteLength; i++) {
    let bits = dataView.getUint8(i).toString(2)
    if (bits.length < bitsInByte) {
      bits = '0'.repeat(bitsInByte - bits.length) + bits
    }
    numberAsBinaryString += bits
  }

  return numberAsBinaryString
}

export function floatAsBinaryString32(floatNumber) {
  return floatAsBinaryString(floatNumber, singlePrecisionBytesLength)
}

export function floatAsBinaryString64(floatNumber) {
  return floatAsBinaryString(floatNumber, doublePrecisionBytesLength)
}
