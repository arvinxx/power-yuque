declare namespace yuque {
  /**
   * 搜索结果基础的资源类型
   */
  export interface ResourceType extends Base {
    title: string;
    summary: string;
    url: string;
    info: string;
  }
  export interface DocType extends ResourceType {
    type: 'doc';
    target: DocTarget;
  }

  export interface RepoType extends ResourceType {
    type: 'repo';
    target: RepoTarget;
  }
  /**
   * 资源类型
   */
  export type ResourcesType =
    | 'topic'
    | 'repo'
    | 'doc'
    | 'artboard'
    | 'group'
    | 'user'
    | 'attachment';
}
