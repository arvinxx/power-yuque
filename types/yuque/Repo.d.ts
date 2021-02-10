declare module YuqueApi {
  interface SuccessResponse<T> {
    data: T;
  }

  interface Serializer {
    _serializer: string;
    id: number;
    created_at: Date;
    updated_at: Date;
  }

  export interface User extends Serializer {
    avatar_url: string;
    description: string;
    followers_count: number;
    following_count: number;
    login: string;
    name: string;
    type: string;
  }
  type RepoType = 'Book' | 'Column';

  type RepoResponse = SuccessResponse<BookSerializer[]>;

  export interface BookSerializer extends Serializer {
    content_updated_at: Date;
    creator_id: number;
    description: string;
    items_count: number;
    likes_count: number;
    name: string;
    namespace: string;
    public: number;
    slug: string;
    user: User;
    user_id: number;
    watches_count: number;
  }
}
