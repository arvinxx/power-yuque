declare module yuque {
  export interface User {
    id: number;
    type: string;
    login: string;
    name: string;
    description: string;
    avatar_url: string;
    followers_count: number;
    following_count: number;
    created_at: Date;
    updated_at: Date;
    _serializer: string;
  }
  export interface DocType {
    id: number;
    type: string;
    public: number;
    name: string;
    slug: string;
    user_id: number;
    description: string;
    created_at: Date;
    updated_at: Date;
    user: User;
    namespace: string;
  }

  export interface Target {
    id: number;
    type: string;
    slug: string;
    name: string;
    user_id: number;
    description: string;
    creator_id: number;
    public: number;
    items_count: number;
    likes_count: number;
    watches_count: number;
    content_updated_at: Date;
    updated_at: Date;
    created_at: Date;
    namespace: string;
    user: User;
    _serializer: string;
  }

  export interface RepoType {
    id: number;
    type: string;
    title: string;
    summary: string;
    url: string;
    info: string;
    target: Target;
    _serializer: string;
  }
  export type SearchResponseData = yuque.DocType | yuque.RepoType;
}
