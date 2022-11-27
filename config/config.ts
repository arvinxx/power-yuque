import { defineConfig } from '@umijs/max';
import { resolve } from 'path';

const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  plugins: [require.resolve('umi-plugin-extensions')],

  locale: { default: 'zh-CN' },
  alias: {
    theme: resolve(__dirname, '../src/theme'),
  },
  mpa: {
    layout: '@/layouts/Layout',
  },
  antd: {
    import: false,
  },
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
    background: { service_worker: '@/background/index' },
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
