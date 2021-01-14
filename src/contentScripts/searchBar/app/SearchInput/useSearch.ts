import { request } from '@/utils';

export const useSearch = () => {
  const fetch = async (searchText: string) => {
    const { data } = await request.get('/search', {
      params: {
        q: searchText,
        type: 'doc',
      },
    });
    console.log(data);
    return data;
  };

  return { fetch };
};
