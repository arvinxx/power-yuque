import type { FC } from 'react';
import React, { useContext } from 'react';
import { useYuqueTokenService, YuqueTokenService } from '@/services';

import useSearchBarService, { SearchBarService } from './useSearchBarService';
import { SearchService, useSearchService } from './useSearchService';

import SearchInput from './SearchInput';
import SearchResult from './SearchResult';
import AnimatedHeight from './AnimatedHeight';

import styles from './style.less';

const SearchBar: FC = () => {
  const { visible, searchBarRef } = useContext(SearchBarService);

  return visible ? (
    <div className={styles.container}>
      <div ref={searchBarRef} className={styles.bar}>
        <div className={styles.input}>
          <SearchInput />
        </div>
        <div className={styles.result}>
          <AnimatedHeight maxHeight={400}>
            <SearchResult />
          </AnimatedHeight>
        </div>
      </div>
    </div>
  ) : null;
};

export default () => (
  <YuqueTokenService.Provider value={useYuqueTokenService()}>
    <SearchBarService.Provider value={useSearchBarService()}>
      <SearchService.Provider value={useSearchService()}>
        <SearchBar />
      </SearchService.Provider>
    </SearchBarService.Provider>
  </YuqueTokenService.Provider>
);
