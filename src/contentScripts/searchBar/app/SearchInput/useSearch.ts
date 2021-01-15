import { request } from '@/utils';
import { useContext } from 'react';
import { ResultService } from '../useResultService';

export const useSearch = () => {
  const { setResult, setLoading } = useContext(ResultService);

  const fetch = async (params: SearchBar.SearchParams) => {
    setLoading(true);
    const data = await request.get<SearchBar.SearchResponse>('/search', {
      params,
    });
    setLoading(false);
    // @ts-ignore
    setResult(data.data);
  };

  return { fetch };
};
