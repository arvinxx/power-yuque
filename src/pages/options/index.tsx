import type { FC } from 'react';
import { useState } from 'react';
import { Menu } from 'antd';
import {
  BulbOutlined,
  FontColorsOutlined,
  KeyOutlined,
  SearchOutlined,
} from '@ant-design/icons';

import { useYuqueTokenService, YuqueTokenService } from '@/services';

import Token from './Token';
// import Typography from './Typography';

import styles from './style.less';

const App: FC = () => {
  const [selectedKey, setSelectedKey] = useState(
    'typography',
    // 'token'
  );
  const yuqueTokenService = useYuqueTokenService();

  const Panel: FC = () => {
    switch (selectedKey) {
      case 'typography':
        return <Typography />;
      case 'token':
      default:
        return <Token />;
    }
  };

  return (
    <YuqueTokenService.Provider value={yuqueTokenService}>
      <div className={styles.container}>
        <h4>Power Yuque 配置面板</h4>
        <div className={styles.card}>
          <Menu
            mode="inline"
            className={styles.menu}
            onSelect={(e) => {
              setSelectedKey(e.selectedKeys?.[0] as string);
            }}
            selectedKeys={[selectedKey]}
          >
            <Menu.Item key="token">
              <KeyOutlined /> 语雀 Token
            </Menu.Item>
            <Menu.Item key="typography">
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
            <Panel />
          </div>
        </div>
      </div>
    </YuqueTokenService.Provider>
  );
};

export default App;
