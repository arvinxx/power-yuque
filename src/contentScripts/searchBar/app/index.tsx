import type { FC } from 'react';
import { useContext } from 'react';
import { useYuqueTokenService, YuqueTokenService } from '@/services';
import { Button, Space } from 'antd';

import useSearchBarService, { SearchBarService } from './useSearchBarService';
import { SearchService, useSearchService } from './useSearchService';
import { useCheckTokenValidService } from './useCheckTokenValidService';
import { KeyboardService, useKeyboardService } from './useKeyboardService';

import SearchInput from './SearchInput';
import SearchResult from './SearchResult';

import styles from './style.less';
import { isDevSearchBar } from '@/utils';

const SearchBar: FC = () => {
  const { visible, searchBarRef } = useContext(SearchBarService);

  const valid = useCheckTokenValidService();

  const keyboardService = useKeyboardService();
  return visible ? (
    <KeyboardService.Provider value={keyboardService}>
      <div className={styles.container}>
        <div ref={searchBarRef} className={styles.bar}>
          {valid ? (
            <>
              <div className={styles.input}>
                <SearchInput />
              </div>
              <div className={styles.result}>
                <SearchResult />
              </div>
            </>
          ) : (
            <Space direction={'vertical'} className={styles.invalid}>
              <div>
                <img
                  src="https://gw.alipayobjects.com/mdn/rms_15e52e/afts/img/A*TJ7dTIRWjVoAAAAAAAAAAAAAARQnAQ"
                  alt="无效的 token"
                />
              </div>
              <div style={{ marginTop: 16 }}>
                <h3>Token 无效</h3>
              </div>
              <div style={{ width: 400, textAlign: 'center' }}>
                没有配置 token 或 token 无效，请前往配置页添加 token。
                添加完成后请刷新页面并重试。
              </div>
              <Space style={{ marginTop: 16 }}>
                <Button
                  onClick={() => {
                    window.open(
                      'https://www.yuque.com/design-engineering/power-yuque/add-token',
                    );
                  }}
                >
                  查看教程
                </Button>
                <Button
                  type={'primary'}
                  onClick={() => {
                    chrome.runtime.sendMessage({ action: 'openOptionsPage' });
                  }}
                >
                  立即添加
                </Button>
              </Space>
            </Space>
          )}
        </div>
      </div>
    </KeyboardService.Provider>
  ) : null;
};

export default () => (
  <YuqueTokenService.Provider value={useYuqueTokenService()}>
    <SearchBarService.Provider value={useSearchBarService(isDevSearchBar)}>
      <SearchService.Provider value={useSearchService()}>
        <SearchBar />
      </SearchService.Provider>
    </SearchBarService.Provider>
  </YuqueTokenService.Provider>
);
