import type { ChangeEvent } from 'react';
import { useMemo, useState } from 'react';
import { useDebounce } from 'ahooks';

import { useEventCallback } from 'rxjs-hooks';
import { from } from 'rxjs';
import {
  map,
  debounceTime,
  switchMap,
  combineLatest,
  filter,
  tap,
} from 'rxjs/operators';

import { getServiceToken, request } from '@/utils';

/**
 * SearchInput 需要的状态
 */
export const useSearchService = () => {
  const options: SearchBar.Option[] = useMemo(
    () => [
      { key: 'repo', title: '知识库' },
      { key: 'doc', title: '文档' },
      { key: 'topic', title: '主题' },
      { key: 'artboard', title: '画板' },
      { key: 'group', title: '团队' },
    ],
    [],
  );

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
  const [loading, setLoading] = useState(false);

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
        map((event) => event.target.value.trim()),
        // 2. 防抖
        debounceTime(600),
        // 过滤掉没有值的情况
        filter((value) => value.length !== 0),
        // 提供输入
        combineLatest(input$),
        // 3. 发起请求
        switchMap(([value, input]) => {
          setLoading(true);

          // 直接返回结果
          const [relate, searchType] = input;
          return request$({ q: value, type: searchType, related: relate });
        }),
        tap(() => {
          setLoading(false);
        }),
        // 4. 解构得值
        map((response) => {
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
    options,
    optionKeys: options.map((o) => o.key),
    optionActiveIndex: options.findIndex((o) => o.key === type),
    total,
    result: data,
    loading: useDebounce(loading, { wait: 500 }),
    onSearchEvent,
    type,
    setType,
    related,
    setRelated,
  };
};

// 这个服务将被注册至全局
export const SearchService = getServiceToken(useSearchService);
