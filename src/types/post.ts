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
