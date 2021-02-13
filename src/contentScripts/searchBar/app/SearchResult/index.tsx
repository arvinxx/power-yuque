import React, { useContext } from 'react';
import type { FC } from 'react';
import { Skeleton } from 'antd';

import { SearchService } from '../useSearchService';
import RepoIcon from './RepoIcon';

import styles from './style.less';

const SearchResult: FC = () => {
  const { result, loading } = useContext(SearchService);

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
      {result?.map((item) => {
        const { title, info, id, url, target, type } = item;

        return (
          <div
            key={id}
            className={styles.row}
            onClick={() => {
              window.open(url);
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
