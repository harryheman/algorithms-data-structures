const precisionConfigs = {
  // @see: https://en.wikipedia.org/wiki/Half-precision_floating-point_format
  half: {
    signBitsCount: 1,
    exponentBitsCount: 5,
    fractionBitsCount: 10,
  },
  // @see: https://en.wikipedia.org/wiki/Single-precision_floating-point_format
  single: {
    signBitsCount: 1,
    exponentBitsCount: 8,
    fractionBitsCount: 23,
  },
  // @see: https://en.wikipedia.org/wiki/Double-precision_floating-point_format
  double: {
    signBitsCount: 1,
    exponentBitsCount: 11,
    fractionBitsCount: 52,
  },
}

/**
 * Преобразует бинарное представление числа с плавающей точкой в его десятичное представление
 */
function bitsToFloat(bits, precisionConfig) {
  const { signBitsCount, exponentBitsCount } = precisionConfig

  // определяем знак
  const sign = (-1) ** bits[0] // -1^1 = -1, -1^0 = 1

  // вычисляем значение экспоненты
  const exponentBias = 2 ** (exponentBitsCount - 1) - 1
  const exponentBits = bits.slice(
    signBitsCount,
    signBitsCount + exponentBitsCount,
  )
  const exponentUnbiased = exponentBits.reduce(
    (exponentSoFar, currentBit, bitIndex) => {
      const bitPowerOfTwo = 2 ** (exponentBitsCount - bitIndex - 1)
      return exponentSoFar + currentBit * bitPowerOfTwo
    },
    0,
  )
  const exponent = exponentUnbiased - exponentBias

  // вычисляем значение дробной части
  const fractionBits = bits.slice(signBitsCount + exponentBitsCount)
  const fraction = fractionBits.reduce(
    (fractionSoFar, currentBit, bitIndex) => {
      const bitPowerOfTwo = 2 ** -(bitIndex + 1)
      return fractionSoFar + currentBit * bitPowerOfTwo
    },
    0,
  )

  // вычисляем число
  return sign * 2 ** exponent * (1 + fraction)
}

export function bitsToFloat16(bits) {
  return bitsToFloat(bits, precisionConfigs.half)
}

export function bitsToFloat32(bits) {
  return bitsToFloat(bits, precisionConfigs.single)
}

export function bitsToFloat64(bits) {
  return bitsToFloat(bits, precisionConfigs.double)
}
