import type { FC } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import { DarkModeService, useDarkModeService } from './useDarkModeService';

import styles from './style.less';

import './darkMode/index.less';

const App: FC = () => {
  const darkModeService = useDarkModeService();

  const { theme, switchDarkMode } = darkModeService;

  return (
    <DarkModeService.Provider value={darkModeService}>
      <div className={styles.button} onClick={switchDarkMode}>
        <img
          src={
            theme === 'dark'
              ? 'https://gw.alipayobjects.com/zos/antfincdn/E19hyseWJI/9eedf301-ffd9-4863-a185-826891597f1c.png'
              : 'https://gw.alipayobjects.com/zos/antfincdn/le3%26GEsq5z/5fecc39a-18b2-486c-b387-be2700adcf30.png'
          }
          style={{
            width: 20,
            height: 20,
          }}
          alt={'切换模式'}
        />
      </div>
    </DarkModeService.Provider>
  );
};

// 创建容器
const container = document.createElement('div');
document.body.append(container);
ReactDOM.render(<App />, container);
