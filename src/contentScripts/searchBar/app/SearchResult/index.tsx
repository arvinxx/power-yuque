import React, { useContext } from 'react';
import type { FC } from 'react';
import { Skeleton } from 'antd';
import cls from 'classnames';

import { SearchService } from '../useSearchService';
import { useKeyboardResult } from './useKeyboardResult';
import RepoIcon from './RepoIcon';

import styles from './style.less';

const SearchResult: FC = () => {
  const { result, loading } = useContext(SearchService);
  const {
    resultIndex,
    handleResultIndex,
    isFocusOnResult,
  } = useKeyboardResult();

  return (
    <Skeleton
      loading={loading}
      title={false}
      paragraph={{
        rows: 4,
      }}
      active
      className={styles.skeleton}
    >
      {result?.map((item, index) => {
        const { title, info, id, url, target, type } = item;

        return (
          <div
            key={id}
            className={cls({
              [styles.row]: true,
              [styles.selected]: isFocusOnResult && resultIndex === index,
            })}
            onClick={() => {
              window.open(url);
            }}
            onMouseEnter={() => {
              handleResultIndex(index);
            }}
          >
            <div className={styles.repo}>
              {type === 'repo' ? (
                <RepoIcon
                  type={(target as yuque.RepoTarget).type.toLowerCase()}
                />
              ) : (
                <RepoIcon type={type.toLowerCase()} />
              )}
            </div>
            <div>
              <div
                className={styles.title}
                dangerouslySetInnerHTML={{
                  __html: title,
                }}
              />
              <div className={styles.desc}>{info}</div>
            </div>
          </div>
        );
      })}
    </Skeleton>
  );
};

export default SearchResult;
