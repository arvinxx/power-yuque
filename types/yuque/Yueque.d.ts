declare namespace yuque {
  interface Base {
    id: number;
    _serializer: string;
  }
  export interface User extends Base {
    type: string;
    login: string;
    name: string;
    description: string;
    avatar_url: string;
    followers_count: number;
    following_count: number;
    created_at: Date;
    updated_at: Date;
  }

  export interface Book extends Base {
    type: string;
    slug: string;
    name: string;
    user_id: number;
    description: string;
    public: number;
    content_updated_at: Date;
    updated_at: Date;
    created_at: Date;
    namespace: string;
    user: User;
  }

  export type SearchResponseData = yuque.DocType | yuque.RepoType;
}
