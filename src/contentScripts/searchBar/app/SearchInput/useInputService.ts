import { getServiceToken } from '@/utils';
import { useState } from 'react';

/**
 * SearchInput 需要的状态
 */
export const useInputService = () => {
  // 文本
  const [searchText, setSearchText] = useState('');
  // 搜索类型
  const [type, setType] = useState<SearchBar.SearchType>('repo');
  // 与我相关
  const [related, setRelated] = useState(true);

  return { searchText, setSearchText, type, setType, related, setRelated };
};

// 这个服务将被注册至全局
export const InputService = getServiceToken(useInputService);
