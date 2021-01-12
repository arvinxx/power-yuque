import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  locale: { default: 'zh-CN' },
  extensions: {
    name: 'Yuque Power',
    description: '语雀增强插件',
    optionsUI: {
      page: '@/pages/options',
      openInTab: true,
    },
    contentScripts: [
      {
        matches: ['https://yuque.com/*', 'https://www.yuque.com/*'],
        entries: ['@/contentScripts/yuque'],
      },
    ],
    // content_scripts: [],
    background: { scripts: ['@/background/index'] },
    popupUI: '@/pages/popup',
    icons: {
      16: 'logo/logo@16.png',
      32: 'logo/logo@32.png',
      48: 'logo/logo@48.png',
      128: 'logo/logo@128.png',
    },
  },
});
