import React, { useContext } from 'react';
import { Button, Input, message, Space } from 'antd';

import { YuqueTokenService } from '@/services';

import styles from './style.less';

const Token = () => {
  const {
    setYuqueToken,
    token,
    syncToCloudStorage,
    checkTokenValid,
    valid,
  } = useContext(YuqueTokenService);

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
        <Space>
          <Button
            onClick={async () => {
              const data = await checkTokenValid();
              if (data) {
                message.success('Token 有效');
              } else {
                message.error('Token 无效，请重试');
              }
            }}
          >
            测试 Token
          </Button>
          <Button
            disabled={!valid}
            type={'primary'}
            onClick={syncToCloudStorage}
          >
            保存
          </Button>
        </Space>
      </Space>
    </div>
  );
};

export default Token;
