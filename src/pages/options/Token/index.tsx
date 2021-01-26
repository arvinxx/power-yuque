import React, { useContext } from 'react';
import { Button, Input, Space } from 'antd';

import { YuqueTokenService } from '@/services';

import styles from './style.less';

const Token = () => {
  const { setYuqueToken, token, syncToCloudStorage } = useContext(
    YuqueTokenService,
  );

  return (
    <div className={styles.container}>
      <Space direction={'vertical'} style={{ display: 'flex' }}>
        语雀 Token:
        <Input
          placeholder={'token'}
          value={token}
          onChange={(e) => {
            setYuqueToken(e.target.value);
          }}
          onPressEnter={syncToCloudStorage}
        />
        <Button type={'primary'} onClick={syncToCloudStorage}>
          保存
        </Button>
      </Space>
    </div>
  );
};

export default Token;
