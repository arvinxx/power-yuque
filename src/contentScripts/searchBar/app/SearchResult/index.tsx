import React, { useContext } from 'react';
import type { FC } from 'react';
import { Skeleton } from 'antd';

import { ResultService } from '../useResultService';
import RepoIcon from './RepoIcon';

import styles from './style.less';

const SearchResult: FC = () => {
  const { result, loading } = useContext(ResultService);

  return (
    <Skeleton loading={loading} active className={styles.skeleton}>
      {result.map((item: yuque.RepoType) => {
        const {
          title,
          info,
          id,
          url,
          target: { type },
        } = item;

        return (
          <div
            key={id}
            className={styles.row}
            onClick={() => {
              window.open(url);
            }}
          >
            <div className={styles.repo}>
              <RepoIcon type={type.toLowerCase()} />
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
