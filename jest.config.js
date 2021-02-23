const {
  default: umiConfig,
} = require('@umijs/test/lib/createDefaultConfig/createDefaultConfig');

const defaultConfig = umiConfig(process.cwd(), {});

module.exports = {
  ...defaultConfig,
  setupFiles: [...defaultConfig.setupFiles, 'dotenv/config'],
};
