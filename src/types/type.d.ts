export interface Post {
  id: string;
  title: string;
  body: string;
  image?: string | null;
  category: string;
  created_at: string;
}

export interface BookCardProps {
  nickname: string;
  badge?: string;
  title: string;
  body: string | null;
  image?: string | null;
  likes?: number;
  comments?: number;
  createdAt: string;
  profileImage: string | null;
  id: string | undefined;
  book_id?: string | null;
  category?: string;
}

export interface PostDetailResponse {
  profile: {
    id: string;
    name: string;
    image: string | null;
    intro: string | null;
    appellation: string | null;
    created_at: string;
  };
  like: Array<{
    id: string;
    created_at: string;
    user_id: string;
    reference_category: string;
    reference_id: string;
  }>;
  comment: Array<{
    id: string;
    post_id: string;
    user_id: string;
    body: string;
    created_at: string;
  }>;
  // vote: any[];
}

export interface PostDetail extends Post {
  profile: {
    id: string;
    name: string;
    image: string | null;
    intro: string | null;
    appellation: string | null;
    created_at: string;
  };
  like: PostDetailResponse['like'];
  comment: PostDetailResponse['comment'];
  book?: {
    id: string;
    cover: string;
  } 
}

export interface PopularDiaryCardProps {
    id: string;
    genre: string | null;  
    title: string;
    content: string | null | undefined;
};

interface DiaryPost {
  id: string;
  category: string;
  like: Like[];
  book: Book;
}

/* 금주의 인기 다이어리 */
interface Book {
  id: string;
  categoryName: string | null;
  title: string;
  description: string | null;
  cover: string;
  subInfo?: {
    subTitle: string;
  }
}
interface Like {
  id: string;
  user_id: string;
  reference_category: string;
  reference_id: string;
  created_at: string;
}
interface APIDiaryPost {
  id: string;
  category: string;
  like: Like[];
  book: Book | null;
}

type Bestsellers = {
  title: string;
  author: string;
  cover: string;
  isbn13?: string;
};