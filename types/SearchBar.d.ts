declare module SearchBar {
  export interface User {
    id: number;
    login: string;
    name: string;
    work_id?: any;
    email?: any;
    avatar_url: string;
    created_at: Date;
    updated_at: Date;
  }

  export interface Meta {
    total: number;
  }

  export interface SearchResponse {
    data: yuque.SearchResponseData[];
    meta: Meta;
  }

  export interface SearchParams {
    /**
     * 资源类型
     */
    type:
      | 'topic'
      | 'repo'
      | 'doc'
      | 'artboard'
      | 'group'
      | 'user'
      | 'attachment';
    /**
     * 关键字
     */
    q: string;
    /**
     * 分页参数
     */
    offset?: number;
    /**
     * 搜索与我相关的传递 true
     */
    related?: boolean;
  }
}
