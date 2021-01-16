declare namespace yuque {
  interface ResourceTarget {
    id: number;
    content_updated_at: Date;
    created_at: Date;
    updated_at: Date;
    slug: string;
    description: string;
    user_id: number;
    _serializer: string;
    likes_count: number;
    public: boolean;
  }
  export interface DocTarget extends ResourceTarget {
    title: string;
    book_id: number;
    format: string;
    status: number;
    view_status: number;
    read_status: number;
    comments_count: number;
    published_at: Date;
    first_published_at?: Date;
    draft_version: number;
    last_editor_id: number;
    word_count: number;
    cover: string;
    custom_description: string;
    last_editor?: any;
    book: Book;
  }

  export interface RepoTarget extends ResourceTarget {
    type: string;
    name: string;
    creator_id: number;
    items_count: number;
    watches_count: number;
    namespace: string;
    user: User;
  }
}
