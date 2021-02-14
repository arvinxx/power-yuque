import { useCallback, useContext, useEffect, useState } from 'react';

import { SearchService } from '../useSearchService';
import { KeyboardService, handleIndex } from '../useKeyboardService';

/**
 * 处理结果区
 */
export const useKeyboardResult = () => {
  const { result } = useContext(SearchService);
  const {
    focusKey,
    switchOptionIndex,
    focusOnResult,
    focusOnOptions,
    focusOnInput,
  } = useContext(KeyboardService);

  const [resultIndex, setResultIndex] = useState(0);

  /**
   * 按 上下键切换选中的 result
   * @param back
   */
  const switchResultIndex = (back?: boolean) => {
    const newIndex = handleIndex(resultIndex, result.length, back);
    setResultIndex(newIndex);
  };

  const handleResultIndex = (index: number) => {
    focusOnResult();
    setResultIndex(index);
  };

  // 将焦点切换到 Options
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (focusKey !== 'result') return;
      switch (event.key) {
        case 'Tab':
          event.preventDefault();
          switchOptionIndex(event.shiftKey);
          break;
        case 'ArrowDown':
          event.preventDefault();
          switchResultIndex();
          break;
        case 'ArrowUp':
          event.preventDefault();
          if (resultIndex === 0) {
            focusOnOptions();
          } else {
            switchResultIndex(true);
          }
          break;
        case 'ArrowRight':
          switchOptionIndex();
          break;
        case 'ArrowLeft':
          switchOptionIndex(true);
          break;
        case 'Escape':
          focusOnInput();
          break;
        default:
      }
    },
    [focusKey, resultIndex, switchOptionIndex],
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  return {
    resultIndex,
    handleResultIndex,
    isFocusOnResult: focusKey === 'result',
  };
};
