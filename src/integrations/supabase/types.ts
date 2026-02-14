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
      bot_npcs: {
        Row: {
          bot_id: string
          description: string | null
          id: string
          name: string
          relationship: string | null
        }
        Insert: {
          bot_id: string
          description?: string | null
          id?: string
          name: string
          relationship?: string | null
        }
        Update: {
          bot_id?: string
          description?: string | null
          id?: string
          name?: string
          relationship?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bot_npcs_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "bots"
            referencedColumns: ["id"]
          },
        ]
      }
      bots: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          creator_id: string
          creator_note: string | null
          first_message: string | null
          followers_fake: number | null
          gender: string | null
          history: string | null
          id: string
          is_public: boolean | null
          life_experience: string | null
          name: string
          nsfw: boolean | null
          personality_json: Json | null
          personality_type: string | null
          reputation: number | null
          slogan: string | null
          speech_style: string | null
          status_config: Json | null
          tags: string[] | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          creator_id: string
          creator_note?: string | null
          first_message?: string | null
          followers_fake?: number | null
          gender?: string | null
          history?: string | null
          id?: string
          is_public?: boolean | null
          life_experience?: string | null
          name: string
          nsfw?: boolean | null
          personality_json?: Json | null
          personality_type?: string | null
          reputation?: number | null
          slogan?: string | null
          speech_style?: string | null
          status_config?: Json | null
          tags?: string[] | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          creator_id?: string
          creator_note?: string | null
          first_message?: string | null
          followers_fake?: number | null
          gender?: string | null
          history?: string | null
          id?: string
          is_public?: boolean | null
          life_experience?: string | null
          name?: string
          nsfw?: boolean | null
          personality_json?: Json | null
          personality_type?: string | null
          reputation?: number | null
          slogan?: string | null
          speech_style?: string | null
          status_config?: Json | null
          tags?: string[] | null
        }
        Relationships: []
      }
      conversations: {
        Row: {
          auto_memory_json: Json | null
          bot_id: string
          created_at: string | null
          id: string
          manual_memory_json: Json | null
          mode: Database["public"]["Enums"]["chat_mode"] | null
          relationship_points: number | null
          user_id: string
        }
        Insert: {
          auto_memory_json?: Json | null
          bot_id: string
          created_at?: string | null
          id?: string
          manual_memory_json?: Json | null
          mode?: Database["public"]["Enums"]["chat_mode"] | null
          relationship_points?: number | null
          user_id: string
        }
        Update: {
          auto_memory_json?: Json | null
          bot_id?: string
          created_at?: string | null
          id?: string
          manual_memory_json?: Json | null
          mode?: Database["public"]["Enums"]["chat_mode"] | null
          relationship_points?: number | null
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
        ]
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string | null
          id: string
          message_type: string | null
          sender_type: Database["public"]["Enums"]["sender_type"]
        }
        Insert: {
          content?: string
          conversation_id: string
          created_at?: string | null
          id?: string
          message_type?: string | null
          sender_type: Database["public"]["Enums"]["sender_type"]
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string | null
          id?: string
          message_type?: string | null
          sender_type?: Database["public"]["Enums"]["sender_type"]
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
      post_comments: {
        Row: {
          author_id: string
          author_type: Database["public"]["Enums"]["author_type"]
          content: string
          created_at: string | null
          id: string
          post_id: string
        }
        Insert: {
          author_id: string
          author_type?: Database["public"]["Enums"]["author_type"]
          content?: string
          created_at?: string | null
          id?: string
          post_id: string
        }
        Update: {
          author_id?: string
          author_type?: Database["public"]["Enums"]["author_type"]
          content?: string
          created_at?: string | null
          id?: string
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_reactions: {
        Row: {
          created_at: string | null
          id: string
          post_id: string
          reaction: Database["public"]["Enums"]["reaction_type"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          post_id: string
          reaction?: Database["public"]["Enums"]["reaction_type"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          post_id?: string
          reaction?: Database["public"]["Enums"]["reaction_type"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_reactions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          author_id: string
          author_type: Database["public"]["Enums"]["author_type"]
          content: string
          created_at: string | null
          id: string
          image_url: string | null
          reputation_delta: number | null
        }
        Insert: {
          author_id: string
          author_type?: Database["public"]["Enums"]["author_type"]
          content?: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          reputation_delta?: number | null
        }
        Update: {
          author_id?: string
          author_type?: Database["public"]["Enums"]["author_type"]
          content?: string
          created_at?: string | null
          id?: string
          image_url?: string | null
          reputation_delta?: number | null
        }
        Relationships: []
      }
      private_messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          receiver_id: string
          sender_id: string
        }
        Insert: {
          content?: string
          created_at?: string | null
          id?: string
          receiver_id: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          receiver_id?: string
          sender_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          date_of_birth: string
          email: string
          followers_fake: number | null
          gender: string | null
          id: string
          name: string
          nsfw_enabled: boolean | null
          preferred_language: string | null
          reputation_global: number | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          date_of_birth: string
          email?: string
          followers_fake?: number | null
          gender?: string | null
          id?: string
          name?: string
          nsfw_enabled?: boolean | null
          preferred_language?: string | null
          reputation_global?: number | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          date_of_birth?: string
          email?: string
          followers_fake?: number | null
          gender?: string | null
          id?: string
          name?: string
          nsfw_enabled?: boolean | null
          preferred_language?: string | null
          reputation_global?: number | null
          user_id?: string
        }
        Relationships: []
      }
      reports: {
        Row: {
          created_at: string | null
          id: string
          reason: string
          reporter_id: string
          status: Database["public"]["Enums"]["report_status"] | null
          target_id: string
          target_type: Database["public"]["Enums"]["report_target_type"]
        }
        Insert: {
          created_at?: string | null
          id?: string
          reason?: string
          reporter_id: string
          status?: Database["public"]["Enums"]["report_status"] | null
          target_id: string
          target_type: Database["public"]["Enums"]["report_target_type"]
        }
        Update: {
          created_at?: string | null
          id?: string
          reason?: string
          reporter_id?: string
          status?: Database["public"]["Enums"]["report_status"] | null
          target_id?: string
          target_type?: Database["public"]["Enums"]["report_target_type"]
        }
        Relationships: []
      }
      server_bots: {
        Row: {
          bot_id: string
          id: string
          server_id: string
        }
        Insert: {
          bot_id: string
          id?: string
          server_id: string
        }
        Update: {
          bot_id?: string
          id?: string
          server_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "server_bots_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "bots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "server_bots_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "servers"
            referencedColumns: ["id"]
          },
        ]
      }
      server_members: {
        Row: {
          id: string
          joined_at: string | null
          server_id: string
          user_id: string
        }
        Insert: {
          id?: string
          joined_at?: string | null
          server_id: string
          user_id: string
        }
        Update: {
          id?: string
          joined_at?: string | null
          server_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "server_members_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "servers"
            referencedColumns: ["id"]
          },
        ]
      }
      server_messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          sender_id: string
          sender_type: Database["public"]["Enums"]["sender_type"]
          server_id: string
        }
        Insert: {
          content?: string
          created_at?: string | null
          id?: string
          sender_id: string
          sender_type: Database["public"]["Enums"]["sender_type"]
          server_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          sender_id?: string
          sender_type?: Database["public"]["Enums"]["sender_type"]
          server_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "server_messages_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "servers"
            referencedColumns: ["id"]
          },
        ]
      }
      servers: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          description: string | null
          id: string
          is_18_plus: boolean | null
          name: string
          owner_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_18_plus?: boolean | null
          name: string
          owner_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_18_plus?: boolean | null
          name?: string
          owner_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      web_search_cache: {
        Row: {
          created_at: string | null
          id: string
          query: string
          results: Json | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          query: string
          results?: Json | null
        }
        Update: {
          created_at?: string | null
          id?: string
          query?: string
          results?: Json | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_view_nsfw: { Args: { _user_id: string }; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_server_member: {
        Args: { _server_id: string; _user_id: string }
        Returns: boolean
      }
      is_server_owner: {
        Args: { _server_id: string; _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      author_type: "user" | "bot"
      chat_mode: "normal" | "roleplay"
      reaction_type: "like" | "love" | "laugh" | "wow" | "sad" | "angry"
      report_status: "pending" | "resolved" | "ignored"
      report_target_type: "user" | "bot" | "post" | "message" | "server"
      sender_type: "user" | "bot"
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
      app_role: ["admin", "moderator", "user"],
      author_type: ["user", "bot"],
      chat_mode: ["normal", "roleplay"],
      reaction_type: ["like", "love", "laugh", "wow", "sad", "angry"],
      report_status: ["pending", "resolved", "ignored"],
      report_target_type: ["user", "bot", "post", "message", "server"],
      sender_type: ["user", "bot"],
    },
  },
} as const
