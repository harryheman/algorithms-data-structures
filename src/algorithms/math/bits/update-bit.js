export default function updateBit(number, bitPosition, bitValue) {
  const _bitValue = bitValue ? 1 : 0

  return (number & ~(1 << bitPosition)) | (_bitValue << bitPosition)
}
