import { getServiceToken } from '@/utils';
import { useState } from 'react';

// 这个服务将被注册至全局
export const InputService = getServiceToken(useInputService);

/**
 * SearchInput 需要的状态
 */
export default function useInputService() {
  // SearchBar 可见
  const [searchText, setSearchText] = useState('');

  return { searchText, setSearchText };
}
