import React from 'react';
import { Menu } from 'antd';
import {
  BulbOutlined,
  FontColorsOutlined,
  KeyOutlined,
  SearchOutlined,
} from '@ant-design/icons';

import { useYuqueTokenService, YuqueTokenService } from '@/services';
import Token from './Token';

import styles from './style.less';

const App = () => {
  const yuqueTokenService = useYuqueTokenService();

  return (
    <YuqueTokenService.Provider value={yuqueTokenService}>
      <div className={styles.container}>
        <h4>Power Yuque 配置面板</h4>
        <div className={styles.card}>
          <Menu
            mode="inline"
            className={styles.menu}
            defaultSelectedKeys={['token']}
          >
            <Menu.Item key="token">
              <KeyOutlined /> 语雀 Token
            </Menu.Item>
            <Menu.Item disabled key="typographic">
              <FontColorsOutlined />
              排版配置
            </Menu.Item>

            <Menu.Item disabled key="dark">
              <BulbOutlined />
              深色模式
            </Menu.Item>
            <Menu.Item disabled key="search-bar">
              <SearchOutlined /> 高级搜索框
            </Menu.Item>
          </Menu>

          <div className={styles.content}>
            <Token />
          </div>
        </div>
      </div>
    </YuqueTokenService.Provider>
  );
};

export default App;
