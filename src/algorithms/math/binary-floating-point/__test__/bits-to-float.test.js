import {
  testCases16Bits,
  testCases32Bits,
  testCases64Bits,
} from '../test-cases'
import { bitsToFloat16, bitsToFloat32, bitsToFloat64 } from '../bits-to-float'

describe('bitsToFloat16', () => {
  it('должна конвертировать бинарное представление 16-битного числа с плавающей точкой в его десятичное представление', () => {
    for (let i = 0; i < testCases16Bits.length; i++) {
      const [decimal, binary] = testCases16Bits[i]
      const bits = binary.split('').map((bitString) => parseInt(bitString, 10))
      expect(bitsToFloat16(bits)).toBeCloseTo(decimal, 4)
    }
  })
})

describe('bitsToFloat32', () => {
  it('должна конвертировать бинарное представление 32-битного числа с плавающей точкой в его десятичное представление', () => {
    for (let i = 0; i < testCases32Bits.length; i++) {
      const [decimal, binary] = testCases32Bits[i]
      const bits = binary.split('').map((bitString) => parseInt(bitString, 10))
      expect(bitsToFloat32(bits)).toBeCloseTo(decimal, 7)
    }
  })
})

describe('bitsToFloat64', () => {
  it('должна конвертировать бинарное представление 64-битного числа с плавающей точкой в его десятичное представление', () => {
    for (let i = 0; i < testCases64Bits.length; i++) {
      const [decimal, binary] = testCases64Bits[i]
      const bits = binary.split('').map((bitString) => parseInt(bitString, 10))
      expect(bitsToFloat64(bits)).toBeCloseTo(decimal, 14)
    }
  })
})
