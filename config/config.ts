import { defineConfig } from 'umi';
import { resolve } from 'path';
import theme from '../src/theme/theme';

const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  locale: { default: 'zh-CN' },
  alias: {
    theme: resolve(__dirname, '../src/theme'),
  },
  theme,
  define: {
    'process.env.SEARCH_BAR': process.env.SEARCH_BAR,
  },
  // chrome 插件配置项
  extensions: {
    name: `Power Yuque${isDev ? ' DEV' : ''}`,
    description: '语雀增强插件',
    optionsUI: {
      page: '@/pages/options',
      openInTab: true,
    },
    contentScripts: [
      {
        matches: [
          'https://yuque.com/*',
          'https://www.yuque.com/*',
          'https://yuque.antfin.com/*',
        ],
        entries: ['@/contentScripts/index'],
      },
    ],
    background: { scripts: ['@/background/index'] },
    popupUI: '@/pages/popup',
    permissions: ['storage'],
    icons: isDev
      ? {
          16: 'logo/logo-dev.png',
          32: 'logo/logo-dev.png',
          48: 'logo/logo-dev.png',
          128: 'logo/logo-dev.png',
        }
      : {
          16: 'logo/logo@16.png',
          32: 'logo/logo@32.png',
          48: 'logo/logo@48.png',
          128: 'logo/logo@128.png',
        },
  },
});
