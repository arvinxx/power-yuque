import { getServiceToken } from '@/utils';
import { useRef, useState } from 'react';
import { useClickAway } from 'ahooks';
import { useHotkeys } from 'react-hotkeys-hook';
import device from 'current-device';

// 这个服务将被注册至全局
export const SearchBarService = getServiceToken(useSearchBarService);

/**
 * SearchBar 需要的状态
 */
export default function useSearchBarService(initState?: boolean) {
  // searchBar 对象
  const searchBarRef = useRef(null);

  // SearchBar 可见
  const [visible, setVisible] = useState(initState || false);

  const show = () => {
    setVisible(true);
  };
  const hide = () => {
    setVisible(false);
  };

  useClickAway(() => {
    setVisible(false);
  }, [searchBarRef]);

  // 快捷键触发能力
  useHotkeys(
    `${device.windows() ? 'ctrl' : 'command'}+shift+F`,
    () => {
      setVisible(!visible);
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
