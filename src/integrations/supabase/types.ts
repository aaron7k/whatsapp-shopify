export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      openai_bots: {
        Row: {
          assistant_id: string | null
          assistant_messages: string[] | null
          bot_type: string | null
          created_at: string | null
          debounce_time: number | null
          delay_message: number | null
          enabled: boolean | null
          expire: number | null
          function_url: string | null
          id: string
          ignore_jids: string[] | null
          keep_open: boolean | null
          keyword_finish: string | null
          listening_from_me: boolean | null
          max_tokens: number | null
          model: string | null
          openai_creds_id: string | null
          stop_bot_from_me: boolean | null
          system_messages: string[] | null
          trigger_operator: string | null
          trigger_type: string | null
          trigger_value: string | null
          unknown_message: string | null
          updated_at: string | null
          user_id: string
          user_messages: string[] | null
        }
        Insert: {
          assistant_id?: string | null
          assistant_messages?: string[] | null
          bot_type?: string | null
          created_at?: string | null
          debounce_time?: number | null
          delay_message?: number | null
          enabled?: boolean | null
          expire?: number | null
          function_url?: string | null
          id?: string
          ignore_jids?: string[] | null
          keep_open?: boolean | null
          keyword_finish?: string | null
          listening_from_me?: boolean | null
          max_tokens?: number | null
          model?: string | null
          openai_creds_id?: string | null
          stop_bot_from_me?: boolean | null
          system_messages?: string[] | null
          trigger_operator?: string | null
          trigger_type?: string | null
          trigger_value?: string | null
          unknown_message?: string | null
          updated_at?: string | null
          user_id: string
          user_messages?: string[] | null
        }
        Update: {
          assistant_id?: string | null
          assistant_messages?: string[] | null
          bot_type?: string | null
          created_at?: string | null
          debounce_time?: number | null
          delay_message?: number | null
          enabled?: boolean | null
          expire?: number | null
          function_url?: string | null
          id?: string
          ignore_jids?: string[] | null
          keep_open?: boolean | null
          keyword_finish?: string | null
          listening_from_me?: boolean | null
          max_tokens?: number | null
          model?: string | null
          openai_creds_id?: string | null
          stop_bot_from_me?: boolean | null
          system_messages?: string[] | null
          trigger_operator?: string | null
          trigger_type?: string | null
          trigger_value?: string | null
          unknown_message?: string | null
          updated_at?: string | null
          user_id?: string
          user_messages?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "openai_bots_openai_creds_id_fkey"
            columns: ["openai_creds_id"]
            isOneToOne: false
            referencedRelation: "openai_credentials"
            referencedColumns: ["id"]
          },
        ]
      }
      openai_credentials: {
        Row: {
          api_key: string
          created_at: string | null
          id: string
          name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          api_key: string
          created_at?: string | null
          id?: string
          name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          api_key?: string
          created_at?: string | null
          id?: string
          name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      openai_sessions: {
        Row: {
          bot_id: string | null
          created_at: string | null
          id: string
          remote_jid: string
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          bot_id?: string | null
          created_at?: string | null
          id?: string
          remote_jid: string
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          bot_id?: string | null
          created_at?: string | null
          id?: string
          remote_jid?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "openai_sessions_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "openai_bots"
            referencedColumns: ["id"]
          },
        ]
      }
      openai_settings: {
        Row: {
          created_at: string | null
          debounce_time: number | null
          delay_message: number | null
          expire: number | null
          id: string
          ignore_jids: string[] | null
          keep_open: boolean | null
          keyword_finish: string | null
          listening_from_me: boolean | null
          openai_creds_id: string | null
          stop_bot_from_me: boolean | null
          unknown_message: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          debounce_time?: number | null
          delay_message?: number | null
          expire?: number | null
          id?: string
          ignore_jids?: string[] | null
          keep_open?: boolean | null
          keyword_finish?: string | null
          listening_from_me?: boolean | null
          openai_creds_id?: string | null
          stop_bot_from_me?: boolean | null
          unknown_message?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          debounce_time?: number | null
          delay_message?: number | null
          expire?: number | null
          id?: string
          ignore_jids?: string[] | null
          keep_open?: boolean | null
          keyword_finish?: string | null
          listening_from_me?: boolean | null
          openai_creds_id?: string | null
          stop_bot_from_me?: boolean | null
          unknown_message?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "openai_settings_openai_creds_id_fkey"
            columns: ["openai_creds_id"]
            isOneToOne: false
            referencedRelation: "openai_credentials"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_instances: {
        Row: {
          created_at: string | null
          id: string
          instance_agents: string[] | null
          instance_key: string | null
          instance_name: string
          instance_phone: string
          instance_pic: string | null
          last_connected_at: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          instance_agents?: string[] | null
          instance_key?: string | null
          instance_name: string
          instance_phone: string
          instance_pic?: string | null
          last_connected_at?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          instance_agents?: string[] | null
          instance_key?: string | null
          instance_name?: string
          instance_phone?: string
          instance_pic?: string | null
          last_connected_at?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
