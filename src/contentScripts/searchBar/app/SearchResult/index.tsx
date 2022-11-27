import { useContext } from 'react';
import type { FC } from 'react';
import { Skeleton } from 'antd';
import cls from 'classnames';

import { SearchService } from '../useSearchService';
import { useKeyboardResult } from './useKeyboardResult';
import RepoIcon from './RepoIcon';
import AnimatedHeight from './AnimatedHeight';

import { useStyles } from './style';

const SearchResult: FC = () => {
  const { result, loading } = useContext(SearchService);
  const {
    resultIndex,
    handleResultIndex,
    isFocusOnResult,
    resultRef,
    openPage,
  } = useKeyboardResult();

  const styles = useStyles();

  return (
    // @ts-ignore
    <AnimatedHeight maxHeight={400} ref={resultRef}>
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
          const { title, info, id, target, type } = item;

          return (
            <div
              key={id}
              className={cls({
                [styles.row]: true,
                [styles.selected]: isFocusOnResult && resultIndex === index,
              })}
              onClick={() => {
                openPage();
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
    </AnimatedHeight>
  );
};

export default SearchResult;
