module.exports = {
  // Если эта настройка имеет значение `true`, Jest перестанет выполнять тесты
  // после первого провала.
  bail: false,

  // Если эта настройка имеет значение `true`, Jest будет представлять отчет о каждом тесте.
  verbose: false,

  // Индикатор сбора информации о покрытии во время выполнения тестов.
  collectCoverage: false,

  // Директория для файлов о покрытии.
  coverageDirectory: './coverage/',

  // Паттерны игнорируемых тестов.
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],

  // Паттерны тестов, игнорируемых при сборе информации о покрытии.
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/'],

  // Паттерн тестовых файлов.
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$',

  // @see: https://github.com/facebook/jest/issues/6769
  testEnvironmentOptions: {
    url: 'http://localhost/',
  },

  // @see: https://jestjs.io/docs/en/configuration#coveragethreshold-object
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 95,
      functions: 100,
      lines: 100,
    },
  },
}
