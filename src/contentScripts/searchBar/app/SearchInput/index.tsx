import type { FC } from 'react';
import React, { useContext } from 'react';
import { Input } from 'antd';
import useInputService, { InputService } from './useInputService';
import { SearchBarService } from '../useSearchBarService';
import { useSearch } from './useSearch';

import styles from './style.less';

const SearchInput: FC = () => {
  const { searchText, setSearchText } = useContext(InputService);
  const { hide } = useContext(SearchBarService);
  const { fetch } = useSearch();
  return (
    <Input
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
        }
      }}
      onPressEnter={() => {
        console.log(searchText);
        fetch(searchText);
      }}
    />
  );
};

export default () => (
  <InputService.Provider value={useInputService()}>
    <SearchInput />
  </InputService.Provider>
);
