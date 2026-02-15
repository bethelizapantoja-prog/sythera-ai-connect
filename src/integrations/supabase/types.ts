export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      bot_phone_events: {
        Row: {
          bot_id: string
          content: string | null
          created_at: string | null
          event_type: Database["public"]["Enums"]["phone_event_type"]
          id: string
          image_url: string | null
        }
        Insert: {
          bot_id: string
          content?: string | null
          created_at?: string | null
          event_type: Database["public"]["Enums"]["phone_event_type"]
          id?: string
          image_url?: string | null
        }
        Update: {
          bot_id?: string
          content?: string | null
          created_at?: string | null
          event_type?: Database["public"]["Enums"]["phone_event_type"]
          id?: string
          image_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bot_phone_events_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "bots"
            referencedColumns: ["id"]
          },
        ]
      }
      bots: {
        Row: {
          auto_status_config: Json | null
          avatar_url: string | null
          charm_contrast: string | null
          created_at: string | null
          creator_id: string
          dislikes: string | null
          first_message: string | null
          hidden_habits: string | null
          id: string
          intro: string | null
          likes: string | null
          name: string
          opening_story: string | null
          personality: string | null
          privacy: Database["public"]["Enums"]["bot_privacy"] | null
          relationship_with_user: string | null
          slogan: string | null
          total_chats: number | null
          total_likes: number | null
          updated_at: string | null
          web_access_enabled: boolean | null
        }
        Insert: {
          auto_status_config?: Json | null
          avatar_url?: string | null
          charm_contrast?: string | null
          created_at?: string | null
          creator_id: string
          dislikes?: string | null
          first_message?: string | null
          hidden_habits?: string | null
          id?: string
          intro?: string | null
          likes?: string | null
          name?: string
          opening_story?: string | null
          personality?: string | null
          privacy?: Database["public"]["Enums"]["bot_privacy"] | null
          relationship_with_user?: string | null
          slogan?: string | null
          total_chats?: number | null
          total_likes?: number | null
          updated_at?: string | null
          web_access_enabled?: boolean | null
        }
        Update: {
          auto_status_config?: Json | null
          avatar_url?: string | null
          charm_contrast?: string | null
          created_at?: string | null
          creator_id?: string
          dislikes?: string | null
          first_message?: string | null
          hidden_habits?: string | null
          id?: string
          intro?: string | null
          likes?: string | null
          name?: string
          opening_story?: string | null
          personality?: string | null
          privacy?: Database["public"]["Enums"]["bot_privacy"] | null
          relationship_with_user?: string | null
          slogan?: string | null
          total_chats?: number | null
          total_likes?: number | null
          updated_at?: string | null
          web_access_enabled?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "bots_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          content: string
          created_at: string | null
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          content?: string
          created_at?: string | null
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      conversation_history: {
        Row: {
          bot_id: string
          conversation_id: string
          id: string
          last_message_preview: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          bot_id: string
          conversation_id: string
          id?: string
          last_message_preview?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          bot_id?: string
          conversation_id?: string
          id?: string
          last_message_preview?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversation_history_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "bots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversation_history_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversation_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          affinity_score: number | null
          bot_id: string
          created_at: string | null
          id: string
          persona_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          affinity_score?: number | null
          bot_id: string
          created_at?: string | null
          id?: string
          persona_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          affinity_score?: number | null
          bot_id?: string
          created_at?: string | null
          id?: string
          persona_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "bots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_persona_id_fkey"
            columns: ["persona_id"]
            isOneToOne: false
            referencedRelation: "personas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      diaries: {
        Row: {
          content: string
          created_at: string | null
          id: string
          mood: string | null
          related_bot_id: string | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content?: string
          created_at?: string | null
          id?: string
          mood?: string | null
          related_bot_id?: string | null
          title?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          mood?: string | null
          related_bot_id?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "diaries_related_bot_id_fkey"
            columns: ["related_bot_id"]
            isOneToOne: false
            referencedRelation: "bots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "diaries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      images: {
        Row: {
          created_at: string | null
          id: string
          owner_id: string
          type: Database["public"]["Enums"]["image_type"]
          url: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          owner_id: string
          type: Database["public"]["Enums"]["image_type"]
          url: string
        }
        Update: {
          created_at?: string | null
          id?: string
          owner_id?: string
          type?: Database["public"]["Enums"]["image_type"]
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "images_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      internal_thoughts: {
        Row: {
          bot_id: string
          content: string
          created_at: string | null
          id: string
          message_id: string
          visible_to_user: boolean | null
        }
        Insert: {
          bot_id: string
          content?: string
          created_at?: string | null
          id?: string
          message_id: string
          visible_to_user?: boolean | null
        }
        Update: {
          bot_id?: string
          content?: string
          created_at?: string | null
          id?: string
          message_id?: string
          visible_to_user?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "internal_thoughts_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "bots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "internal_thoughts_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      likes: {
        Row: {
          bot_id: string | null
          created_at: string | null
          id: string
          post_id: string | null
          user_id: string
        }
        Insert: {
          bot_id?: string | null
          created_at?: string | null
          id?: string
          post_id?: string | null
          user_id: string
        }
        Update: {
          bot_id?: string | null
          created_at?: string | null
          id?: string
          post_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "bots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string | null
          edited: boolean | null
          id: string
          image_url: string | null
          message_type: Database["public"]["Enums"]["message_type"] | null
          sender_type: Database["public"]["Enums"]["sender_type"]
          updated_at: string | null
        }
        Insert: {
          content?: string
          conversation_id: string
          created_at?: string | null
          edited?: boolean | null
          id?: string
          image_url?: string | null
          message_type?: Database["public"]["Enums"]["message_type"] | null
          sender_type: Database["public"]["Enums"]["sender_type"]
          updated_at?: string | null
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string | null
          edited?: boolean | null
          id?: string
          image_url?: string | null
          message_type?: Database["public"]["Enums"]["message_type"] | null
          sender_type?: Database["public"]["Enums"]["sender_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      personas: {
        Row: {
          auto_status: string | null
          avatar_url: string | null
          created_at: string | null
          emotional_triggers: string | null
          id: string
          important_memories: string | null
          name: string
          personality: string | null
          public_description: string | null
          speech_style: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          auto_status?: string | null
          avatar_url?: string | null
          created_at?: string | null
          emotional_triggers?: string | null
          id?: string
          important_memories?: string | null
          name?: string
          personality?: string | null
          public_description?: string | null
          speech_style?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          auto_status?: string | null
          avatar_url?: string | null
          created_at?: string | null
          emotional_triggers?: string | null
          id?: string
          important_memories?: string | null
          name?: string
          personality?: string | null
          public_description?: string | null
          speech_style?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "personas_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          bot_id: string | null
          content_text: string
          created_at: string | null
          creator_id: string
          id: string
          image_url: string | null
          updated_at: string | null
        }
        Insert: {
          bot_id?: string | null
          content_text?: string
          created_at?: string | null
          creator_id: string
          id?: string
          image_url?: string | null
          updated_at?: string | null
        }
        Update: {
          bot_id?: string | null
          content_text?: string
          created_at?: string | null
          creator_id?: string
          id?: string
          image_url?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "bots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "posts_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          account_status: Database["public"]["Enums"]["account_status"] | null
          avatar_url: string | null
          created_at: string | null
          email: string
          google_id: string | null
          id: string
          is_premium: boolean | null
          language: string | null
          name: string
          updated_at: string | null
        }
        Insert: {
          account_status?: Database["public"]["Enums"]["account_status"] | null
          avatar_url?: string | null
          created_at?: string | null
          email: string
          google_id?: string | null
          id?: string
          is_premium?: boolean | null
          language?: string | null
          name?: string
          updated_at?: string | null
        }
        Update: {
          account_status?: Database["public"]["Enums"]["account_status"] | null
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          google_id?: string | null
          id?: string
          is_premium?: boolean | null
          language?: string | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      account_status: "active" | "banned" | "deleted"
      bot_privacy: "public" | "private"
      image_type: "chat" | "post" | "diary"
      message_type: "text" | "image" | "thought" | "system"
      phone_event_type: "message" | "photo" | "status_update"
      sender_type: "user" | "bot" | "system"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      account_status: ["active", "banned", "deleted"],
      bot_privacy: ["public", "private"],
      image_type: ["chat", "post", "diary"],
      message_type: ["text", "image", "thought", "system"],
      phone_event_type: ["message", "photo", "status_update"],
      sender_type: ["user", "bot", "system"],
    },
  },
} as const
