import { useContext } from 'react';
import { Button, Col, Input, message, Row, Space } from 'antd';

import { YuqueTokenService } from '@/services';

const Token = () => {
  const {
    setYuqueToken,
    token,
    syncToCloudStorage,
    checkTokenValid,
    valid,
    resetToken,
  } = useContext(YuqueTokenService);

  return (
    <Space direction={'vertical'} style={{ display: 'flex' }}>
      语雀 Token:
      <Input
        placeholder={'e.g. Xlwu5C6MRHredbTtt3ImP2LODHfyCUMzBo9OLex6'}
        value={token}
        onChange={(e) => {
          setYuqueToken(e.target.value);
        }}
        onPressEnter={syncToCloudStorage}
      />
      <Row justify={'space-between'}>
        <Col>
          <Button
            disabled={!token}
            onClick={async () => {
              const data = await checkTokenValid();
              if (data) {
                message.success(' Token 有效，将自动保存...');
                syncToCloudStorage();
              } else {
                message.error('Token 无效，请重试');
              }
            }}
          >
            测试 Token
          </Button>
        </Col>
        <Col>
          <Space>
            <Button disabled={!token} onClick={resetToken}>
              重置
            </Button>
            <Button
              disabled={!token || !valid}
              type={'primary'}
              onClick={syncToCloudStorage}
            >
              保存
            </Button>
          </Space>
        </Col>
      </Row>
    </Space>
  );
};

export default Token;
