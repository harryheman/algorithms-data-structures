/**
 * Возвращает форму матрицы
 */
export const shape = (m) => {
  const shapes = []
  let dimension = m
  while (dimension && Array.isArray(dimension)) {
    shapes.push(dimension.length)
    dimension = (dimension && [...dimension][0]) || null
  }
  return shapes
}

/**
 * Проверят, что матрица имеет правильный тип
 */
const validateType = (m) => {
  if (!m || !Array.isArray(m) || !Array.isArray(m[0])) {
    throw new Error('Неправильный формат матрицы!')
  }
}

/**
 *
 */
const validate2D = (m) => {
  validateType(m)
  const _shape = shape(m)
  if (_shape.length !== 2) {
    throw new Error('Матрица не является двумерной!')
  }
}

/**
 * Проверяет, что матрицы имеют одинаковую форму
 */
export const validateSameShape = (a, b) => {
  validateType(a)
  validateType(b)
  const _shapeA = shape(a)
  const _shapeB = shape(b)
  if (_shapeA.length !== _shapeB.length) {
    throw new Error('Матрицы имеют разные направления!')
  }

  while (_shapeA.length && _shapeB.length) {
    if (_shapeA.pop() !== _shapeB.pop()) {
      throw new Error('Матрицы имеют разную форму!')
    }
  }
}

/**
 * Генерирует матрицу указанной формы с определенными значениями
 */
export const generate = (shape, fill) => {
  /**
   * Рекурсивно генерирует матрицу
   */
  const generateRecursively = (shape, indices) => {
    if (shape.length === 1) {
      return Array(shape[0])
        .fill()
        .map((_, i) => fill([...indices, i]))
    }
    const m = []
    for (let i = 0; i < shape[0]; i++) {
      m.push(generateRecursively(shape.slice(1), [...indices, i]))
    }
    return m
  }

  return generateRecursively(shape, [])
}

/**
 * Генерирует матрицу 0 указанной формы
 */
export const zeros = (shape) => {
  return generate(shape, () => 0)
}

export const dot = (a, b) => {
  validate2D(a)
  validate2D(b)

  const _shapeA = shape(a)
  const _shapeB = shape(b)
  if (_shapeA[1] !== _shapeB[0]) {
    throw new Error('Матрицы не могут быть перемножены!')
  }

  const c = zeros([_shapeA[0], _shapeB[1]])

  for (let bCol = 0; bCol < b[0].length; bCol++) {
    for (let aRow = 0; aRow < a.length; aRow++) {
      let sum = 0

      for (let aCol = 0; aCol < a[aRow].length; aCol++) {
        sum += a[aRow][aCol] * b[aCol][bCol]
      }

      c[aRow][bCol] = sum
    }
  }

  return c
}

/**
 * Транспонирует матрицу
 */
export const transpose = (m) => {
  validate2D(m)

  const _shape = shape(m)

  const t = zeros([_shape[1], _shape[0]])

  for (let row = 0; row < m.length; row++) {
    for (let col = 0; col < m[0].length; col++) {
      t[col][row] = m[row][col]
    }
  }

  return t
}

/**
 * Применяет переданную функцию к каждому элементу матрицы
 */
export const walk = (m, cb) => {
  const walkRecursively = (_m, indices) => {
    const _shape = shape(_m)

    if (_shape.length === 1) {
      for (let i = 0; i < _m.length; i++) {
        cb([...indices, i], _m[i])
      }
    }

    for (let i = 0; i < _m.length; i++) {
      walkRecursively(_m[i], [...indices, i])
    }
  }

  walkRecursively(m, [])
}

/**
 * Возвращает значение ячейки матрицы по указанному индексу
 */
export const getCellAtIndex = (m, indices) => {
  let cell = m[indices[0]]

  for (let i = 1; i < indices.length - 1; i++) {
    cell = cell[indices[i]]
  }

  return cell[indices[indices.length - 1]]
}

/**
 * Обновляет значение ячейки матрицы по указанному индексу
 */
export const updateCellAtIndex = (m, indices, value) => {
  let cell = m[indices[0]]

  for (let i = 1; i < indices.length - 1; i++) {
    cell = cell[indices[i]]
  }

  cell[indices[indices.length - 1]] = value
}

/**
 * Складывает 2 матрицы поэлементно
 */
export const add = (a, b) => {
  validateSameShape(a, b)

  const result = zeros(shape(a))

  walk(a, (indices, value) => {
    const currentCellValue = getCellAtIndex(result, indices)
    updateCellAtIndex(result, indices, currentCellValue + value)
  })

  walk(b, (indices, value) => {
    const currentCellValue = getCellAtIndex(result, indices)
    updateCellAtIndex(result, indices, currentCellValue + value)
  })

  return result
}

/**
 * Умножает 2 матрицы поэлементно
 */
export const multiply = (a, b) => {
  validateSameShape(a, b)

  const result = zeros(shape(a))

  walk(a, (indices, value) => {
    updateCellAtIndex(result, indices, value)
  })

  walk(b, (indices, value) => {
    const currentCellValue = getCellAtIndex(result, indices)
    updateCellAtIndex(result, indices, currentCellValue * value)
  })

  return result
}

/**
 * Вычитает 2 матрицы поэлементно
 */
export const subtract = (a, b) => {
  validateSameShape(a, b)

  const result = zeros(shape(a))

  walk(a, (indices, value) => {
    updateCellAtIndex(result, indices, value)
  })

  walk(b, (indices, value) => {
    const currentCellValue = getCellAtIndex(result, indices)
    updateCellAtIndex(result, indices, currentCellValue - value)
  })

  return result
}
