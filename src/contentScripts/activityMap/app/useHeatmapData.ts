import { useEffect, useState } from 'react';
import { getActivityData, mapToHeatData, yuqueToken } from '@/utils';
import { useLocalStorageState } from 'ahooks';

export const useHeatmapData = () => {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useLocalStorageState<any[]>('HeatmapRowData', []);

  const [loginPath, setLoginPath] = useLocalStorageState('LOGIN_PATH', '');

  /**
   * 获取数据
   */
  const fetchData = async () => {
    setLoading(true);
    const result = await getActivityData();
    setLoading(false);

    if (result) {
      const { data: activityData, username } = result;
      setLoginPath(username);
      setData(activityData!);
    }
  };

  useEffect(() => {
    if ((yuqueToken && !loginPath) || data?.length === 0) {
      fetchData();
    }
  }, [data]);

  return {
    data: mapToHeatData(data!),
    loading,
    fetchData,
    isHome: location.pathname.substr(1) === loginPath,
  };
};
