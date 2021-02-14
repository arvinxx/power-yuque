export const isDev = process.env.NODE_ENV === 'development';
export const isTest = process.env.NODE_ENV === 'test';
export const isDevSearchBar = process.env.SEARCH_BAR === '1';

export const yuqueToken = isTest
  ? process.env.YUQUE_TOKEN!
  : localStorage.getItem('PY_YUQUE_TOKEN')?.replace(/"/g, '') || '';
