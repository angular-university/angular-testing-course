module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/",
    "<rootDir>/cypress/"
  ],
  transform: {
    '^.+\\.(ts|js|html)$': ['jest-preset-angular', 'ts-jest', {
      isolatedModules: true,
    }]
  },
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  collectCoverage: true,
  coverageReporters: ['html'],
  coverageDirectory: '<rootDir>/coverage/',
};