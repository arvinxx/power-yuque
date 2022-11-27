import type { FC } from 'react';
import { useContext } from 'react';
import { Input } from 'antd';
import { css } from '@emotion/css';
import { createStyles } from '@/hooks/useStyles';

import Options from './components/Options';

import { KeyboardService } from '../useKeyboardService';
import { SearchService } from '../useSearchService';

const useStyle = createStyles(
  () => css`
    height: 48px;
    box-shadow: none !important;

    &:focus,
    &:hover {
      border-color: #d9d9d9 !important;
      box-shadow: none !important;
    }
  `,
);

const SearchInput: FC = () => {
  const { onSearchEvent } = useContext(SearchService);

  const { inputRef, focusOnInput } = useContext(KeyboardService);

  return (
    <>
      <Input
        autoFocus
        ref={inputRef}
        className={useStyle()}
        placeholder={'请输入待搜索内容...'}
        size={'large'}
        onChange={onSearchEvent}
        onFocus={focusOnInput}
      />
      <Options />
    </>
  );
};

export default SearchInput;
