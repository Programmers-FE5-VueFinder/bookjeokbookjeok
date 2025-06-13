type Post = {
    id: string;
    title: string;
    body: string;
    image: string | null;
    category: string;
    created_at: string;
};

type BookCardProps = {
    nickname: string;
    badge?: string;
    title: string;
    body: string;
    image?: string | null;
    likes?: number;
    comments?: number;
    createdAt: string;
};

type PopularDiaryCardProps = {
    genre: string;  
    title: string;
    content: string;
};

type Bestsellers = {
  title: string;
  author: string;
  cover: string;
  isbn13?: string;
};