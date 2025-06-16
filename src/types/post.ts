export interface Post {
  id: string;
  title: string;
  body: string;
  created_at: string;
  user_id: string;
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
  profile: {
    appellation: string | null;
    created_at: string;
    id: string;
    image: string | null;
    intro: string | null;
    name: string;
  };
  category: string;
  like: Like[];
  comment: Comment[];
  created_at: string;
} | null;

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
  reference_category: string;
  reference_id: string;
};
export type LikeInsert = {
  user_id: string;
  reference_category: string;
  reference_id: string;
};
