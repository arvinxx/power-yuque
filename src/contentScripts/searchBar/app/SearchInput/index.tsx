import type { FC } from 'react';
import React, { useContext } from 'react';
import { Input } from 'antd';

import Options from './components/Options';
import { SearchService } from '../useSearchService';
import { SearchBarService } from '../useSearchBarService';
import styles from './style.less';

const SearchInput: FC = () => {
  const { onSearchEvent } = useContext(SearchService);
  const { hide } = useContext(SearchBarService);

  return (
    <div>
      <Input
        autoFocus
        className={styles.input}
        placeholder={'请输入待搜索内容...'}
        size={'large'}
        onChange={onSearchEvent}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            hide();
          }
        }}
      />
      <Options />
    </div>
  );
};

export default SearchInput;
