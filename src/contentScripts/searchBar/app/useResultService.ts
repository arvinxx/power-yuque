import { getServiceToken } from '@/utils';
import { useMemo, useState } from 'react';

/**
 * Search Result 需要的状态
 */
export const useResultService = () => {
  // SearchBar 可见
  const [result, setResult] = useState<yuque.RepoType[]>([]);

  console.log(result);
  const isEmpty = useMemo(() => result.length === 0, [result]);
  return {
    result,
    setResult,
    isEmpty,
    clear: () => {
      setResult([]);
    },
  };
};

// 这个服务将被注册至全局
export const ResultService = getServiceToken(useResultService);
