export default function getBit(number, bitPosition) {
  return (number >> bitPosition) & 1
}
