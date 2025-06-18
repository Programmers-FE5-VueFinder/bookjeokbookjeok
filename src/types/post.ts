export interface Post {
  id: string;
  title: string;
  body: string;
  created_at: string;
  user_id: string;
  category: string;
  profile: {
    name: string;
    image: string | null;
  };
}

export type PostDetail = {
  id: string;
  title: string;
  body: string;
  image: string | null;
  profile: Profile;
  category: string;
  like: Like[];
  comment: Comment[];
  book_club_id: string | null;
  created_at: string;
  book?: book | null;
} | null;

export type Profile = {
  appellation: string | null;
  created_at: string;
  id: string;
  image: string | null;
  intro: string | null;
  name: string;
};

export type CommentInsert = {
  post_id: string;
  user_id: string;
  body: string;
};
export type Comment = {
  id: string;
  post_id: string;
  user_id: string;
  body: string;
  created_at: string;
};
export type Like = {
  id: string;
  created_at: string;
  user_id: string;
  post_id: string;
};
export type LikeInsert = {
  user_id: string;
  reference_category: string;
  reference_id: string;
};
export type book = {
  author: string | null;
  categoryId: number | null;
  categoryName: string | null;
  cover: null | string;
  created_at: string;
  description: string | null;
  id: string;
  title: string;
};
