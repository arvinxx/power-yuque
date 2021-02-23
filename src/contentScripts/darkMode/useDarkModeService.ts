import { getServiceToken } from '@/utils';
import { useLocalStorageState } from 'ahooks';
import { useCallback, useEffect } from 'react';

import { replaceImageUrl } from './utils';
import { PY_KEYS } from '@/store/key';

/**
 * DarkMode 需要的状态
 */
export const useDarkModeService = () => {
  // DarkMode 可见
  const [theme, setTheme] = useLocalStorageState<'light' | 'dark'>(
    PY_KEYS.theme,
    'light',
  );

  const switchDarkMode = () => {
    window.postMessage('PW_SWITCH_DARK_MODE', 'https://www.yuque.com');
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  /**
   * 切换语雀 logo
   */
  const switchYuqueLogo = useCallback(() => {
    const urlList = [
      // Dark
      'https://gw.alipayobjects.com/zos/antfincdn/dfrWqPeNPf/yuque_dark_logo.png',
      // Light
      'https://gw.alipayobjects.com/mdn/prod_resou/afts/img/A*OwZWQ68zSTMAAAAAAAAAAABkARQnAQ',
    ];

    replaceImageUrl(theme === 'dark' ? urlList.reverse() : urlList);
  }, [theme]);

  useEffect(() => {
    document.body.setAttribute('theme', theme!);

    switchYuqueLogo();
  }, [switchYuqueLogo, theme]);

  return { theme, switchDarkMode };
};

// 这个服务将作为聚合根
export const DarkModeService = getServiceToken(useDarkModeService);
