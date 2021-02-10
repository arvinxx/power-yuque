declare module YuqueApi {
  export interface UserSerializer extends Serializer {
    account_id: number;
    avatar_url: string;
    books_count: number;
    description: string;
    followers_count: number;
    following_count: number;
    id: number;
    login: string;
    name: string;
    public: number;
    public_books_count: number;
    space_id: number;
    type: string;
  }

  type UserResponse = SuccessResponse<UserSerializer>;
}
