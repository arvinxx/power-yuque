import type { FC } from 'react';
import React, { useContext } from 'react';
import { Input } from 'antd';

import Options from './components/Options';

import { useInputService, InputService } from './useInputService';
import { ResultService } from '../useResultService';
import { SearchBarService } from '../useSearchBarService';
import { useSearch } from './useSearch';

import styles from './style.less';

const SearchInput: FC = () => {
  const { searchText, setSearchText, type, related } = useContext(InputService);
  const { hide } = useContext(SearchBarService);
  const { clear } = useContext(ResultService);
  const { fetch } = useSearch();

  // 用于测试 list 的代码
  // useEffect(() => {
  //   fetch({ q: '设计', type: 'repo', related: true }).then();
  // }, []);
  return (
    <div>
      <Input
        autoFocus
        className={styles.input}
        placeholder={'请输入待搜索内容...'}
        size={'large'}
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            hide();
            clear();
          }
        }}
        onPressEnter={() => {
          fetch({ q: searchText, type, related }).then();
        }}
      />
      <Options />
    </div>
  );
};

export default () => (
  <InputService.Provider value={useInputService()}>
    <SearchInput />
  </InputService.Provider>
);
