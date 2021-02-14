import { useContext, useEffect, useRef, useState } from 'react';
import type { Input } from 'antd';

import { getServiceToken } from '@/utils';

import { SearchService } from './useSearchService';
import { SearchBarService } from './useSearchBarService';

/**
 * Keyboard 需要的状态
 */
export const useKeyboardService = () => {
  const {
    setType,
    optionKeys,
    optionActiveIndex,
    isEmpty,
    result,
  } = useContext(SearchService);
  const { hide } = useContext(SearchBarService);

  const [focusKey, setFocusKey] = useState<SearchBar.FocusType>('input');
  const inputRef = useRef<Input>(null);
  const [selectResultIndex, setSelectResultIndex] = useState(0);

  const handleIndex = (index: number, length: number, back?: boolean) => {
    if (back) {
      return index === 0 ? length - 1 : index - 1;
    }
    return index === length - 1 ? 0 : index + 1;
  };
  /**
   * 按 Tabs 键切换选中 type
   * @param back
   */
  const switchOptionIndex = (back?: boolean) => {
    const newIndex = handleIndex(optionActiveIndex, optionKeys.length, back);

    setType(optionKeys[newIndex]);
  };

  /**
   * 按 上下键切换选中的 result
   * @param back
   */
  const switchResultIndex = (back?: boolean) => {
    const newIndex = handleIndex(selectResultIndex, result.length, back);
    setSelectResultIndex(newIndex);
  };

  const focusOnInput = () => {
    inputRef.current?.focus();
    setFocusKey('input');
  };
  const focusOnOptions = () => {
    inputRef.current?.blur();
    setFocusKey('options');
  };
  const focusOnResult = () => {
    inputRef.current?.blur();
    setFocusKey('result');
  };

  const handleResultIndex = (index: number) => {
    focusOnResult();
    setSelectResultIndex(index);
  };

  // 将焦点切换到 Options
  const onKeyDown = (event: KeyboardEvent) => {
    // 焦点在 options 的情况
    if (focusKey === 'options') {
      console.log(event.key);
      switch (event.key) {
        case 'Tab':
          event.preventDefault();
          switchOptionIndex(event.shiftKey);
          break;

        case 'ArrowRight':
          switchOptionIndex();
          break;
        case 'ArrowLeft':
          switchOptionIndex(true);
          break;
        case 'ArrowDown':
          event.preventDefault();
          focusOnResult();
          break;
        case 'ArrowUp':
        case 'Escape':
          focusOnInput();
          break;
        default:
      }
    }

    // 焦点在 input 的情况
    if (focusKey === 'input') {
      switch (event.key) {
        case 'Tab':
          event.preventDefault();
          focusOnOptions();
          switchOptionIndex(event.shiftKey);
          break;
        case 'Escape':
          hide();
          break;
        case 'ArrowDown':
          event.preventDefault();
          if (isEmpty) {
            focusOnOptions();
          } else {
            focusOnResult();
          }
          break;
        default:
      }
    }

    if (focusKey === 'result') {
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
          if (selectResultIndex === 0) {
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
    }
  };

  useEffect(() => {
    window.onkeydown = onKeyDown;

    return () => {
      window.onkeydown = null;
    };
  }, [focusKey, optionActiveIndex, isEmpty, selectResultIndex]);

  return {
    focusKey,
    inputRef,
    selectResultIndex,
    handleResultIndex,
    onKeyDown,
    focusOnInput,
    focusOnOptions,
  };
};

export const KeyboardService = getServiceToken(useKeyboardService);
