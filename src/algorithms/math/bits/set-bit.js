export default function setBit(number, bitPosition) {
  return number | (1 << bitPosition)
}
