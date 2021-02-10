declare module YuqueApi {
  export interface LastEditor {
    _serializer: string;
    avatar_url: string;
    created_at: Date;
    description: string;
    followers_count: number;
    following_count: number;
    id: number;
    login: string;
    name: string;
    type: string;
    updated_at: Date;
  }

  export interface DocSerializer extends Serializer {
    book?: any;
    book_id: number;
    comments_count: number;
    content_updated_at: Date;
    cover: string;
    custom_description: string;
    description: string;
    draft_version: number;
    first_published_at?: Date;
    format: string;
    id: number;
    last_editor: LastEditor;
    last_editor_id: number;
    likes_count: number;
    public: number;
    published_at?: Date;
    read_status: number;
    slug: string;
    status: number;
    title: string;
    user_id: number;
    view_status: number;
    word_count: number;
  }

  type DocResponse = SuccessResponse<DocSerializer[]>;
}
