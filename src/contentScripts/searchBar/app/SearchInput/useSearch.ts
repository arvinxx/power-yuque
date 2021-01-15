import { request } from '@/utils';
import { useContext } from 'react';
import { ResultService } from '../useResultService';

export const useSearch = () => {
  const { setResult } = useContext(ResultService);
  const fetch = async (params: SearchBar.SearchParams) => {
    const data = await request.get<SearchBar.SearchResponse>('/search', {
      params,
    });
    // @ts-ignore
    setResult(data.data);
  };

  return { fetch };
};
