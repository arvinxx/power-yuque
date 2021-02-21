import type { ChangeEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
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
  distinctUntilChanged,
} from 'rxjs/operators';

import { getServiceToken, isDevSearchBar, request } from '@/utils';

/**
 * SearchInput 需要的状态
 */
export const useSearchService = () => {
  const options: SearchBar.Option[] = useMemo(
    () => [
      { key: 'repo', title: '知识库' },
      { key: 'doc', title: '文档' },
      { key: 'group', title: '团队' },
      { key: 'topic', title: '主题' },
      { key: 'artboard', title: '画板' },
    ],
    [],
  );

  const request$ = (params: SearchBar.SearchParams) =>
    from(
      request.get<SearchBar.SearchResponse>('/search', {
        params,
      }),
    );

  // 搜索类型
  const [type, setType] = useState<SearchBar.SearchType>('repo');
  // 与我相关
  const [related, setRelated] = useState(true);
  const [loading, setLoading] = useState(false);

  const defaultState = { result: [], total: 0 };

  /**
   * 搜索方法
   */
  const [onSearchEvent, { total, result }] = useEventCallback<
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
        // 过滤相同值
        distinctUntilChanged(),
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
          const { data, meta } = response;
          return { result: data, total: meta?.total };
        }),
      ),
    defaultState,
    [related, type],
  );

  // TEST 用于测试 list 的代码
  useEffect(() => {
    if (isDevSearchBar) {
      // @ts-ignore
      onSearchEvent({ target: { value: '设计' } });
    }
  }, []);

  return {
    options,
    optionKeys: options.map((o) => o.key),
    optionActiveIndex: options.findIndex((o) => o.key === type),
    total,
    result,
    loading: useDebounce(loading, { wait: 500 }),
    onSearchEvent,
    type,
    setType,
    related,
    setRelated,
    isEmpty: result.length === 0,
  };
};

// 这个服务将被注册至全局
export const SearchService = getServiceToken(useSearchService);
