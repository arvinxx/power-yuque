import type { FC } from 'react';
import { Button, Col, Row, Skeleton } from 'antd';
import { ReloadOutlined, InfoCircleOutlined } from '@ant-design/icons';

import Heatmap from './Heatmap';
import { useFetchData } from './useFetchData';
import styles from './style.less';
import { yuqueToken } from '@/utils';
import React from 'react';

const App: FC = () => {
  const { loading, data, fetchData } = useFetchData();

  return (
    <div className={styles.container}>
      <Row justify={'space-between'}>
        <Col>
          <div className={styles.title}>
            活跃状态
            <InfoCircleOutlined
              className={styles.info}
              onClick={() => {
                window.open(
                  'https://www.yuque.com/design-engineering/power-yuque/activity-calendar',
                );
              }}
            />
          </div>
        </Col>
        <Col>
          {yuqueToken ? (
            <Button size={'small'} onClick={fetchData}>
              <ReloadOutlined className={styles.reload} />
              刷新
            </Button>
          ) : null}
        </Col>
      </Row>
      <div className={styles.content}>
        {yuqueToken ? (
          <Skeleton
            active
            loading={loading}
            title={false}
            paragraph={{
              rows: 7,
              width: '100%',
              className: styles.loading,
            }}
          >
            <Heatmap data={data!} />
          </Skeleton>
        ) : (
          <div>
            <div className={styles.cta}>
              <div>添加语雀 Token 显示活跃日历</div>
              <Button
                size={'small'}
                type={'primary'}
                style={{ marginTop: 8 }}
                onClick={() => {
                  chrome.runtime.sendMessage({ action: 'openOptionsPage' });
                }}
              >
                立即添加
              </Button>
            </div>
            <img
              src="https://gw.alipayobjects.com/zos/antfincdn/b7VE3owdps/58a63a77-017e-48ae-9507-e0b964325782.png"
              className={styles.preview}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
