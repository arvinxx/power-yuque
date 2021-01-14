import type { FC } from 'react';
import React, { useContext } from 'react';
import { useKeyboardTrigger } from './useKeyboardTrigger';
import useSearchBarService, { SearchBarService } from './useSearchBarService';
import SearchInput from './SearchInput';

import styles from './style.less';

const SearchBar: FC = () => {
  const { visible } = useContext(SearchBarService);
  useKeyboardTrigger();

  return visible ? (
    <div className={styles.container}>
      <div className={styles.bar}>
        <SearchInput />
      </div>
    </div>
  ) : null;
};

export default () => (
  <SearchBarService.Provider value={useSearchBarService()}>
    <SearchBar />
  </SearchBarService.Provider>
);
