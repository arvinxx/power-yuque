import { getServiceToken } from '@/utils';
import { useState } from 'react';

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
  return { visible, show, hide, trigger };
}
