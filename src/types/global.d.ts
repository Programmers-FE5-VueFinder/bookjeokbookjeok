export declare global {
  interface User {
    id: string;
    name: string | null;
    image: string;
    intro: string | null;
    appellation: string;
    created_at: string;
  }
  interface Bookclub {
    id: string;
    name: string;
    info: string;
    is_recruiting: boolean;
    created_at: string;
    member: User[];
  }
  interface BookclubMember {
    id: string;
    user_id: string;
    book_club_id: string;
    created_at: string;
  }
}
