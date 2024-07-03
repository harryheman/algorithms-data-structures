export default function clearBit(number, bitPosition) {
  return number & ~(1 << bitPosition)
}
