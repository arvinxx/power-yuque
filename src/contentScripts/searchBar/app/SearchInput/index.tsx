import type { FC } from 'react';
import React, { useContext } from 'react';
import { Checkbox, Input, Space } from 'antd';
import cls from 'classnames';

import { useInputService, InputService } from './useInputService';
import { ResultService } from '../useResultService';
import { SearchBarService } from '../useSearchBarService';
import { useSearch } from './useSearch';

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
  { key: 'user', title: '用户' },
  { key: 'attachment', title: '附件' },
];

const SearchInput: FC = () => {
  const {
    searchText,
    setSearchText,
    type,
    setType,
    related,
    setRelated,
  } = useContext(InputService);
  const { hide } = useContext(SearchBarService);
  const { clear } = useContext(ResultService);
  const { fetch } = useSearch();

  // 用于测试 list 的代码
  // useEffect(() => {
  //   fetch({ q: '设计', type: 'repo', related: true }).then();
  // }, []);
  return (
    <div>
      <Input
        autoFocus
        className={styles.input}
        placeholder={'请输入待搜索内容...'}
        size={'large'}
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            hide();
            clear();
          }
        }}
        onPressEnter={() => {
          fetch({ q: searchText, type, related }).then();
        }}
      />
      <div className={styles.options}>
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
    </div>
  );
};

export default () => (
  <InputService.Provider value={useInputService()}>
    <SearchInput />
  </InputService.Provider>
);
