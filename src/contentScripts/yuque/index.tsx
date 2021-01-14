import type { FC } from 'react';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useLocalStorageState } from 'ahooks';

import styles from './style.less';

import './darkMode/index.less';
import './typographic.less';

const App: FC = () => {
  const [theme, setTheme] = useLocalStorageState('theme', 'light');
  const switchDarkMode = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  useEffect(() => {
    document.body.setAttribute('theme', theme!);
  }, [theme]);

  return (
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
      />
    </div>
  );
};

// 创建容器
const container = document.createElement('div');
document.body.append(container);
ReactDOM.render(<App />, container);
