import type { FC } from 'react';
import React, { useContext } from 'react';
import { Checkbox, Space } from 'antd';
import cls from 'classnames';

import { SearchService } from '../../../useSearchService';

import styles from './style.less';

interface Option {
  key: SearchBar.SearchType;
  title: string;
}

const options: Option[] = [
  { key: 'repo', title: '知识库' },
  { key: 'doc', title: '文档' },
  { key: 'topic', title: '主题' },
  { key: 'artboard', title: '画板' },
  { key: 'group', title: '团队' },
  // { key: 'user', title: '用户' },
  // { key: 'attachment', title: '附件' },
];

const Options: FC = () => {
  const { type, setType, related, setRelated } = useContext(SearchService);

  return (
    <div className={styles.container}>
      <Space>
        {options.map((option) => (
          <div
            key={option.key}
            className={cls({
              [styles.option]: true,
              [styles.optionActive]: type === option.key,
            })}
            onClick={() => {
              setType(option.key);
            }}
          >
            {option.title}
          </div>
        ))}
      </Space>

      <div>
        <Checkbox
          checked={related}
          onChange={(e) => {
            setRelated(e.target.checked);
          }}
        />
        只与我相关
      </div>
    </div>
  );
};

export default Options;
