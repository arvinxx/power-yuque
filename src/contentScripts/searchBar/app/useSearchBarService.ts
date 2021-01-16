import { getServiceToken } from '@/utils';
import { useRef, useState } from 'react';
import { useClickAway } from 'ahooks';
import { useHotkeys } from 'react-hotkeys-hook';

// 这个服务将被注册至全局
export const SearchBarService = getServiceToken(useSearchBarService);

/**
 * SearchBar 需要的状态
 */
export default function useSearchBarService(initState?: boolean) {
  // SearchBar 可见
  const [visible, setVisible] = useState(initState || false);

  const show = () => {
    setVisible(true);
  };
  const hide = () => {
    setVisible(false);
  };
  const trigger = () => {
    setVisible(!visible);
  };

  const searchBarRef = useRef(null);

  useClickAway(() => {
    setVisible(false);
  }, [searchBarRef]);

  useHotkeys(
    'command+shift+F',
    () => {
      trigger();
    },
    [visible],
  );

  useHotkeys('Esc', () => {
    hide();
  });

  return {
    visible,
    show,
    hide,
    searchBarRef,
  };
}
