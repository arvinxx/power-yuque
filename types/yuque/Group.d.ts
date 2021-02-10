declare module YuqueApi {
  export interface GroupSerializer extends Serializer {
    avatar_url: string;
    books_count: number;
    description: string;
    login: string;
    members_count: number;
    name: string;
    public: number;
    public_books_count: number;
    public_topics_count: number;
    topics_count: number;
  }

  type GroupResponse = SuccessResponse<GroupSerializer[]>;
}
