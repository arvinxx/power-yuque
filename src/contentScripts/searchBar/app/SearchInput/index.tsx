import type { FC } from 'react';
import React, { useContext } from 'react';
import { Input } from 'antd';
import { KeyboardService, useKeyboardService } from './useKeyboardService';

import Options from './components/Options';
import { SearchService } from '../useSearchService';

import styles from './style.less';

const SearchInput: FC = () => {
  const { onSearchEvent } = useContext(SearchService);

  const keyboardService = useKeyboardService();
  const { inputRef, focusOnInput } = keyboardService;
  return (
    <KeyboardService.Provider value={keyboardService}>
      <Input
        autoFocus
        ref={inputRef}
        className={styles.input}
        placeholder={'请输入待搜索内容...'}
        size={'large'}
        onChange={onSearchEvent}
        onFocus={focusOnInput}
        // onKeyDown={onKeyDown}
      />
      <Options />
    </KeyboardService.Provider>
  );
};

export default SearchInput;
