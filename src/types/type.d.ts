export interface Post {
    id: string;
    title: string;
    body: string;
    image?: string | null;
    category: string;
    created_at: string;
};

export interface BookCardProps {
    nickname: string;
    badge?: string;
    title: string;
    body: string;
    image?: string | null;
    likes?: number;
    comments?: number;
    createdAt: string;
    profileImage: string | null;
};

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
      reference_category: string
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
};

export interface PostDetail extends Post {
    profile: {
        id: string;
        name: string;
        image: string | null;
        intro: string | null;
        appellation: string | null;
        created_at: string;
    }
    like: PostDetailResponse['like'];
    comment: PostDetailResponse['comment'];
}