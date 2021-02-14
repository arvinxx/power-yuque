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
  console.log('real', resultIndex);

  /**
   * 处理结果区高度
   */
  const scrollResultContainer = (index: number, back?: boolean) => {
    const { current: ctn } = resultRef;
    if (!ctn) return;

    const step = 77;

    if (index === result.length) {
      ctn.scrollTop = 0;
    }

    if (!back) {
      if (index > 3) {
        ctn.scrollTop += step;
      }
    } else if (ctn.scrollTop > 0) {
      ctn.scrollTop -= step;
    }
  };

  /**
   * 按 上下键切换选中的 result
   * @param index
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
    console.log(resultIndex);

    switch (event.key) {
      case 'Tab':
        event.preventDefault();
        switchOptionIndex(event.shiftKey);
        break;
      case 'ArrowDown':
        event.preventDefault();
        scrollResultContainer(resultIndex + 1);
        switchResultIndex();
        break;
      case 'ArrowUp':
        event.preventDefault();

        if (resultIndex === 0) {
          focusOnOptions();
        } else {
          scrollResultContainer(resultIndex - 1, true);
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
  };
};
