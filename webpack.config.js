const path = require('path');
/**
 * 此文件专门用于解决 Webstorm 的 less alias 问题
 */
module.exports = {
  resolve: {
    alias: {
      theme: path.resolve(__dirname, './src/theme'),
      '@': path.resolve(__dirname, './src'),
    },
  },
};
