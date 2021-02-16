import { useContext, useEffect, useRef, useState } from 'react';

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
  const resultRef = useRef<HTMLDivElement>(null);

  /**
   * 处理结果区高度
   */
  const scrollResultContainer = (back?: boolean) => {
    const { current: ctn } = resultRef;
    if (!ctn) return;

    const step = 77;

    if (!back) {
      if (resultIndex > 3) {
        ctn.scrollTop += step;
      }

      // 最后一个
      if (resultIndex === result.length - 1) {
        ctn.scrollTop = 0;
      }
    } else if (ctn.scrollTop > 0) {
      ctn.scrollTop -= step;
    }
  };

  const openPage = () => {
    window.open(result[resultIndex].url);
  };
  /**
   * 按 上下键切换选中的 result
   * @param back
   */
  const switchResultIndex = (back?: boolean) => {
    const newIndex = handleIndex(resultIndex, result.length, back);
    setResultIndex(newIndex);
  };

  const keepResultIndex = () => {
    if (resultIndex >= result.length) {
      setResultIndex(result.length - 1);
    }
  };
  const handleResultIndex = (index: number) => {
    focusOnResult();
    setResultIndex(index);
  };

  // 将焦点切换到 Options
  const onKeyDown = (event: KeyboardEvent) => {
    if (focusKey !== 'result') return;

    switch (event.key) {
      case 'Tab':
        event.preventDefault();
        switchOptionIndex(event.shiftKey);
        break;
      case 'ArrowDown':
        event.preventDefault();
        scrollResultContainer();
        switchResultIndex();
        break;
      case 'ArrowUp':
        event.preventDefault();

        if (resultIndex === 0) {
          focusOnOptions();
        } else {
          scrollResultContainer(true);
          switchResultIndex(true);
        }
        break;
      case 'ArrowRight':
        switchOptionIndex();
        keepResultIndex();
        break;
      case 'ArrowLeft':
        switchOptionIndex(true);
        keepResultIndex();
        break;
      case 'Escape':
        focusOnInput();
        break;
      case 'Enter':
        openPage();
        break;
      default:
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [focusKey, result, resultIndex, keepResultIndex, switchOptionIndex]);

  return {
    resultRef,
    resultIndex,
    handleResultIndex,
    isFocusOnResult: focusKey === 'result',
    openPage,
  };
};
