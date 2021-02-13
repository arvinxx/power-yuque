import { useContext, useEffect, useRef, useState } from 'react';
import type { Input } from 'antd';

import { getServiceToken } from '@/utils';
import { SearchService } from '../useSearchService';
import { SearchBarService } from '../useSearchBarService';

type FocusType = 'input' | 'options' | 'result';

/**
 * Keyboard 需要的状态
 */
export const useKeyboardService = () => {
  const { setType, optionKeys, optionActiveIndex } = useContext(SearchService);
  const { hide } = useContext(SearchBarService);

  const [focusKey, setFocusKey] = useState<FocusType>('input');
  const inputRef = useRef<Input>(null);

  /**
   * 按 Tabs 键切换选中 type
   * @param back
   */
  const switchOptionIndex = (back?: boolean) => {
    let newIndex: number;

    if (back) {
      newIndex =
        optionActiveIndex === 0 ? optionKeys.length - 1 : optionActiveIndex - 1;
    } else {
      newIndex =
        optionActiveIndex === optionKeys.length - 1 ? 0 : optionActiveIndex + 1;
    }

    setType(optionKeys[newIndex]);
  };

  const focusOnInput = () => {
    inputRef.current?.focus();
    setFocusKey('input');
  };

  const focusOnOptions = () => {
    inputRef.current?.blur();
    setFocusKey('options');
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
          focusOnOptions();
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
  }, [focusKey, optionActiveIndex]);

  return {
    onKeyDown,
    focusKey,
    inputRef,
    focusOnInput,
    focusOnOptions,
  };
};

export const KeyboardService = getServiceToken(useKeyboardService);
