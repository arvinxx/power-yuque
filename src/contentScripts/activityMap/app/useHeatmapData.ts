import { useEffect, useState } from 'react';
import { getActivityData, mapToHeatData, yuqueToken } from '@/utils';
import { useLocalStorageState } from 'ahooks';
import dayjs from 'dayjs';

export const useHeatmapData = () => {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useLocalStorageState<any[]>(
    'PY_HEATMAP_RAW_DATA',
    [],
  );
  const [date, setDate] = useLocalStorageState<number>(
    'PY_HEATMAP_UPDATED_AT',
    Date.now(),
  );

  const [loginPath, setLoginPath] = useLocalStorageState('PY_LOGIN_PATH', '');

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
      setDate(Date.now());
    }
  };

  useEffect(() => {
    if (!yuqueToken) return;
    const isToday = date && dayjs(date).isSame(dayjs(), 'd');
    const isEmpty = data && data.length === 0;

    if (!loginPath || isEmpty || !isToday) {
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
