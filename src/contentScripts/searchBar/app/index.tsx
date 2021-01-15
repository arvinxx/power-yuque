import type { FC } from 'react';
import React, { useContext } from 'react';
import { useKeyboardTrigger } from './useKeyboardTrigger';

import useSearchBarService, { SearchBarService } from './useSearchBarService';
import { ResultService, useResultService } from './useResultService';
import SearchInput from './SearchInput';
import SearchResult from './SearchResult';

import styles from './style.less';

const SearchBar: FC = () => {
  const { visible, searchBarRef } = useContext(SearchBarService);
  useKeyboardTrigger();

  return visible ? (
    <div className={styles.container}>
      <div ref={searchBarRef} className={styles.bar}>
        <div className={styles.input}>
          <SearchInput />
        </div>
        <div className={styles.result}>
          <SearchResult />
        </div>
      </div>
    </div>
  ) : null;
};

export default () => (
  <SearchBarService.Provider value={useSearchBarService(true)}>
    <ResultService.Provider value={useResultService()}>
      <SearchBar />
    </ResultService.Provider>
  </SearchBarService.Provider>
);
