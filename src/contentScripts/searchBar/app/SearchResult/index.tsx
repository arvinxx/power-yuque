import React, { useContext } from 'react';
import ProList from '@ant-design/pro-list';
import type { FC } from 'react';
import type { ProListMetas } from '@ant-design/pro-list';
import { ResultService } from '../useResultService';
import styles from './style.less';

const SearchResult: FC = () => {
  const { isEmpty, result } = useContext(ResultService);

  const metas: ProListMetas<yuque.SearchResponseData> = {
    title: {
      dataIndex: 'title',
      render: (dom, entity) => {
        console.log(dom);
        return (
          <div
            className={styles.title}
            dangerouslySetInnerHTML={{
              __html: (entity as yuque.RepoType).title,
            }}
          />
        );
      },
    },
    description: {
      dataIndex: 'info',
    },
  };
  return isEmpty ? null : (
    <ProList
      rowClassName={styles.row}
      dataSource={result}
      metas={metas}
      size={'small'}
      toolBarRender={false}
    />
  );
};

export default SearchResult;
