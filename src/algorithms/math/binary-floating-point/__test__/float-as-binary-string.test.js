import {
  floatAsBinaryString32,
  floatAsBinaryString64,
} from '../float-as-binary-string'
import { testCases32Bits, testCases64Bits } from '../test-cases'

describe('floatAs32Binary', () => {
  it('должна создать бинарное представление 32-битного числа с плавающей точкой', () => {
    for (let i = 0; i < testCases32Bits.length; i++) {
      const [decimal, binary] = testCases32Bits[i]
      expect(floatAsBinaryString32(decimal)).toBe(binary)
    }
  })
})

describe('floatAs64Binary', () => {
  it('должна создать бинарное представление 64-битного числа с плавающей точкой', () => {
    for (let i = 0; i < testCases64Bits.length; i++) {
      const [decimal, binary] = testCases64Bits[i]
      expect(floatAsBinaryString64(decimal)).toBe(binary)
    }
  })
})
