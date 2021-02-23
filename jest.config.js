const {
  default: umiConfig,
} = require('@umijs/test/lib/createDefaultConfig/createDefaultConfig');

const path = require('path');
const defaultConfig = umiConfig(process.cwd(), {});

module.exports = {
  ...defaultConfig,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  rootDir: path.resolve(__dirname, '.'),
  setupFiles: [...defaultConfig.setupFiles, 'dotenv/config'],
};
