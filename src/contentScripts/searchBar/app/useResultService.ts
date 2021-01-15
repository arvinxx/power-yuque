import { getServiceToken } from '@/utils';
import { useMemo, useState } from 'react';

/**
 * Search Result 需要的状态
 */
export const useResultService = () => {
  // SearchBar 可见
  const [result, setResult] = useState<yuque.RepoType[]>([]);
  const [loading, setLoading] = useState(false);

  console.log(result);
  const isEmpty = useMemo(() => result.length === 0, [result]);
  return {
    result,
    setResult,
    isEmpty,
    clear: () => {
      setResult([]);
    },
    loading,
    setLoading,
  };
};

// 这个服务将被注册至全局
export const ResultService = getServiceToken(useResultService);
