import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import type { Input } from 'antd';

import { getServiceToken } from '@/utils';

import { SearchService } from './useSearchService';
import { SearchBarService } from './useSearchBarService';

/**
 * 循环切换 index 的方法
 * @param index
 * @param length
 * @param back
 */
export const handleIndex = (index: number, length: number, back?: boolean) => {
  if (back) {
    return index === 0 ? length - 1 : index - 1;
  }
  return index === length - 1 ? 0 : index + 1;
};

/**
 * Keyboard 需要的状态
 */
export const useKeyboardService = () => {
  const { setType, optionKeys, optionActiveIndex, isEmpty } = useContext(
    SearchService,
  );
  const { hide } = useContext(SearchBarService);

  const [focusKey, setFocusKey] = useState<SearchBar.FocusType>('input');
  const inputRef = useRef<Input>(null);

  /**
   * 按 Tabs 键切换选中 type
   * @param back
   */
  const switchOptionIndex = useCallback(
    (back?: boolean) => {
      const newIndex = handleIndex(optionActiveIndex, optionKeys.length, back);

      setType(optionKeys[newIndex]);
    },
    [optionActiveIndex],
  );

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

  // 将焦点切换到 Options
  const onKeyDown = (event: KeyboardEvent) => {
    // 焦点在 options 的情况
    if (focusKey === 'options') {
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
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    // window.onkeydown = onKeyDown;

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      // window.onkeydown = null;
    };
  }, [focusKey, switchOptionIndex, isEmpty]);

  return {
    focusKey,
    inputRef,
    onKeyDown,
    focusOnInput,
    focusOnOptions,
    focusOnResult,
    switchOptionIndex,
  };
};

export const KeyboardService = getServiceToken(useKeyboardService);
