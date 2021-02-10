import { useEffect, useState } from 'react';
import { getActivityData, mapToHeatData } from '@/utils';
import { useLocalStorageState } from 'ahooks';

export const useFetchData = () => {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useLocalStorageState<any[]>('HeatmapRowData', []);

  const fetchData = async () => {
    setLoading(true);
    const activityData = await getActivityData();
    setLoading(false);

    if (activityData) {
      setData(activityData!);
    }
  };
  useEffect(() => {
    if (data?.length === 0) {
      fetchData();
    }
  }, [data]);
  return { data: mapToHeatData(data!), loading, fetchData };
};
