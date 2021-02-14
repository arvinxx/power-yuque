import type { FC } from 'react';
import React, { useContext } from 'react';
import { Input } from 'antd';
import Options from './components/Options';

import { KeyboardService } from '../useKeyboardService';
import { SearchService } from '../useSearchService';

import styles from './style.less';

const SearchInput: FC = () => {
  const { onSearchEvent } = useContext(SearchService);

  const { inputRef, focusOnInput } = useContext(KeyboardService);

  return (
    <>
      <Input
        autoFocus
        ref={inputRef}
        className={styles.input}
        placeholder={'请输入待搜索内容...'}
        size={'large'}
        onChange={onSearchEvent}
        onFocus={focusOnInput}
      />
      <Options />
    </>
  );
};

export default SearchInput;
