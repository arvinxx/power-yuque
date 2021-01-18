import { getServiceToken, request } from '@/utils';
import { ChangeEvent } from 'react';
import { useState } from 'react';
import { useEventCallback } from 'rxjs-hooks';
import { map, debounceTime, switchMap, combineLatest } from 'rxjs/operators';
import { from, of } from 'rxjs';

/**
 * SearchInput 需要的状态
 */
export const useSearchService = () => {
  const request$ = (params: SearchBar.SearchParams) =>
    from(
      request.get<SearchBar.SearchResponse>('/search', {
        params,
      }),
    );

  // TEST 用于测试 list 的代码
  // useEffect(() => {
  //   fetch({ q: '设计', type: 'repo', related: true }).then();
  // }, []);

  // 搜索类型
  const [type, setType] = useState<SearchBar.SearchType>('repo');
  // 与我相关
  const [related, setRelated] = useState(true);

  const defaultState = { data: [], total: 0 };
  /**
   * 搜索方法
   */
  const [onSearchEvent, { total, data }] = useEventCallback<
    ChangeEvent<HTMLInputElement>,
    SearchBar.SearchData,
    [boolean, SearchBar.SearchType]
  >(
    (event$, _, input$) =>
      event$.pipe(
        // 1. 获取 value
        map(event => event.target.value),
        // 2. 防抖
        debounceTime(600),
        // 提供输入
        combineLatest(input$),
        // 3. 发起请求
        switchMap(([value, input]) => {
          // 没有值返回 null
          if (value.length === 0) return of({ data: [], meta: { total: 0 } });

          // 直接返回结果
          const [relate, searchType] = input;
          return request$({ q: value, type: searchType, related: relate });
        }),
        // 4. 解构得值
        map(response => {
          if (!response) return defaultState;

          // 之后在这一步做值解构
          const { data: result, meta } = response;
          return { data: result, total: meta?.total };
        }),
      ),
    defaultState,
    [related, type],
  );

  return {
    total,
    result: data,
    loading: false,
    onSearchEvent,
    type,
    setType,
    related,
    setRelated,
  };
};

// 这个服务将被注册至全局
export const SearchService = getServiceToken(useSearchService);
