export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      book: {
        Row: {
          book_id: number;
          created_at: string;
          id: string;
          reference_category: string;
          reference_id: string;
          star: number | null;
          user_id: string;
        };
        Insert: {
          book_id: number;
          created_at?: string;
          id?: string;
          reference_category: string;
          reference_id: string;
          star?: number | null;
          user_id: string;
        };
        Update: {
          book_id?: number;
          created_at?: string;
          id?: string;
          reference_category?: string;
          reference_id?: string;
          star?: number | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'book_rating_reference_id_fkey';
            columns: ['reference_id'];
            isOneToOne: false;
            referencedRelation: 'post';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'book_rating_reference_id_fkey1';
            columns: ['reference_id'];
            isOneToOne: false;
            referencedRelation: 'review';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'book_rating_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
        ];
      };
      book_club: {
        Row: {
          created_at: string;
          id: string;
          info: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          info?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          info?: string | null;
        };
        Relationships: [];
      };
      book_club_member: {
        Row: {
          book_club_id: string;
          created_at: string;
          id: string;
          user_id: string;
        };
        Insert: {
          book_club_id: string;
          created_at?: string;
          id?: string;
          user_id: string;
        };
        Update: {
          book_club_id?: string;
          created_at?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'book_club_member_book_club_id_fkey';
            columns: ['book_club_id'];
            isOneToOne: false;
            referencedRelation: 'book_club';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'chat_room_user_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
        ];
      };
      chat_message: {
        Row: {
          body: string;
          chat_room_id: string;
          created_at: string;
          id: string;
          user_id: string;
        };
        Insert: {
          body: string;
          chat_room_id: string;
          created_at?: string;
          id?: string;
          user_id: string;
        };
        Update: {
          body?: string;
          chat_room_id?: string;
          created_at?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'chat_message_chat_room_id_fkey';
            columns: ['chat_room_id'];
            isOneToOne: false;
            referencedRelation: 'chat_room';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'chat_message_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
        ];
      };
      chat_room: {
        Row: {
          book_club_id: string;
          created_at: string;
          id: string;
          owner_id: string;
        };
        Insert: {
          book_club_id: string;
          created_at?: string;
          id?: string;
          owner_id: string;
        };
        Update: {
          book_club_id?: string;
          created_at?: string;
          id?: string;
          owner_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'chat_room_book_club_id_fkey';
            columns: ['book_club_id'];
            isOneToOne: false;
            referencedRelation: 'book_club';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'chat_room_owner_id_fkey';
            columns: ['owner_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
        ];
      };
      comment: {
        Row: {
          body: string;
          created_at: string;
          id: string;
          post_id: string;
          user_id: string;
        };
        Insert: {
          body: string;
          created_at?: string;
          id?: string;
          post_id: string;
          user_id: string;
        };
        Update: {
          body?: string;
          created_at?: string;
          id?: string;
          post_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'comment_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'post';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'comment_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
        ];
      };
      folder: {
        Row: {
          created_at: string;
          id: string;
          name: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'folder_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
        ];
      };
      folder_item: {
        Row: {
          book: number;
          created_at: string;
          folder_id: string;
          id: string;
        };
        Insert: {
          book: number;
          created_at?: string;
          folder_id: string;
          id?: string;
        };
        Update: {
          book?: number;
          created_at?: string;
          folder_id?: string;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'folder_item_folder_id_fkey';
            columns: ['folder_id'];
            isOneToOne: false;
            referencedRelation: 'folder';
            referencedColumns: ['id'];
          },
        ];
      };
      follow: {
        Row: {
          created_at: string;
          follower_id: string;
          following_id: string;
          id: string;
        };
        Insert: {
          created_at?: string;
          follower_id: string;
          following_id: string;
          id?: string;
        };
        Update: {
          created_at?: string;
          follower_id?: string;
          following_id?: string;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'follow_follower_id_fkey';
            columns: ['follower_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'follow_following_id_fkey';
            columns: ['following_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
        ];
      };
      like: {
        Row: {
          created_at: string;
          id: string;
          post_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          post_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          post_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'Like_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'post';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Like_post_id_fkey1';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'review';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'Like_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
        ];
      };
      notification: {
        Row: {
          created_at: string;
          id: string;
          is_read: boolean;
          object_id: string | null;
          sender_id: string;
          type: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          is_read?: boolean;
          object_id?: string | null;
          sender_id: string;
          type: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          is_read?: boolean;
          object_id?: string | null;
          sender_id?: string;
          type?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'notification_object_id_fkey';
            columns: ['object_id'];
            isOneToOne: false;
            referencedRelation: 'follow';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'notification_object_id_fkey1';
            columns: ['object_id'];
            isOneToOne: false;
            referencedRelation: 'like';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'notification_object_id_fkey2';
            columns: ['object_id'];
            isOneToOne: false;
            referencedRelation: 'comment';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'notification_object_id_fkey3';
            columns: ['object_id'];
            isOneToOne: false;
            referencedRelation: 'reply';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'notification_object_id_fkey4';
            columns: ['object_id'];
            isOneToOne: false;
            referencedRelation: 'chat_room';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'notification_sender_id_fkey';
            columns: ['sender_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'notification_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
        ];
      };
      post: {
        Row: {
          body: string;
          category: string;
          created_at: string;
          id: string;
          image: string | null;
          title: string;
          user_id: string;
        };
        Insert: {
          body: string;
          category: string;
          created_at?: string;
          id?: string;
          image?: string | null;
          title: string;
          user_id?: string;
        };
        Update: {
          body?: string;
          category?: string;
          created_at?: string;
          id?: string;
          image?: string | null;
          title?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'Post_user_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
        ];
      };
      reply: {
        Row: {
          body: string;
          comment_id: string;
          created_at: string;
          id: string;
          post_id: string;
          user_id: string;
        };
        Insert: {
          body: string;
          comment_id: string;
          created_at?: string;
          id?: string;
          post_id: string;
          user_id: string;
        };
        Update: {
          body?: string;
          comment_id?: string;
          created_at?: string;
          id?: string;
          post_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'reply_comment_id_fkey';
            columns: ['comment_id'];
            isOneToOne: false;
            referencedRelation: 'comment';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'reply_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'post';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'reply_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
        ];
      };
      review: {
        Row: {
          body: string;
          created_at: string;
          id: string;
          user_id: string;
        };
        Insert: {
          body: string;
          created_at?: string;
          id?: string;
          user_id: string;
        };
        Update: {
          body?: string;
          created_at?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'Review_user_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'review_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
        ];
      };
      user: {
        Row: {
          appellation: string | null;
          created_at: string;
          id: string;
          image: string | null;
          intro: string | null;
          name: string;
        };
        Insert: {
          appellation?: string | null;
          created_at?: string;
          id?: string;
          image?: string | null;
          intro?: string | null;
          name: string;
        };
        Update: {
          appellation?: string | null;
          created_at?: string;
          id?: string;
          image?: string | null;
          intro?: string | null;
          name?: string;
        };
        Relationships: [];
      };
      vote: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          post_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          post_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          post_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'Vote_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'post';
            referencedColumns: ['id'];
          },
        ];
      };
      vote_item: {
        Row: {
          body: string;
          created_at: string;
          id: string;
          vote_id: string;
        };
        Insert: {
          body: string;
          created_at?: string;
          id?: string;
          vote_id: string;
        };
        Update: {
          body?: string;
          created_at?: string;
          id?: string;
          vote_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'vote_item_vote_id_fkey';
            columns: ['vote_id'];
            isOneToOne: false;
            referencedRelation: 'vote';
            referencedColumns: ['id'];
          },
        ];
      };
      vote_item_voter: {
        Row: {
          created_at: string;
          id: string;
          user_id: string;
          vote_item_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          user_id: string;
          vote_item_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          user_id?: string;
          vote_item_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'vote_item_voter_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'user';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'vote_item_voter_vote_item_id_fkey';
            columns: ['vote_item_id'];
            isOneToOne: false;
            referencedRelation: 'vote_item';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const;
