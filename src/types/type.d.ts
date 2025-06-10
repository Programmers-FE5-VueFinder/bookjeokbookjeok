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