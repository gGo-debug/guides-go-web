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
      adventures: {
        Row: {
          average_rating: number | null
          base_price: number
          category_id: string | null
          created_at: string
          description: string
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          duration_minutes: number
          guide_id: string
          id: string
          images: Json | null
          included_items: string[] | null
          latitude: number | null
          location: string
          longitude: number | null
          max_participants: number
          min_participants: number
          required_items: string[] | null
          slug: string
          status: Database["public"]["Enums"]["adventure_status"] | null
          title: string
          total_reviews: number | null
          updated_at: string
        }
        Insert: {
          average_rating?: number | null
          base_price: number
          category_id?: string | null
          created_at?: string
          description: string
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          duration_minutes: number
          guide_id: string
          id?: string
          images?: Json | null
          included_items?: string[] | null
          latitude?: number | null
          location: string
          longitude?: number | null
          max_participants: number
          min_participants?: number
          required_items?: string[] | null
          slug: string
          status?: Database["public"]["Enums"]["adventure_status"] | null
          title: string
          total_reviews?: number | null
          updated_at?: string
        }
        Update: {
          average_rating?: number | null
          base_price?: number
          category_id?: string | null
          created_at?: string
          description?: string
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          duration_minutes?: number
          guide_id?: string
          id?: string
          images?: Json | null
          included_items?: string[] | null
          latitude?: number | null
          location?: string
          longitude?: number | null
          max_participants?: number
          min_participants?: number
          required_items?: string[] | null
          slug?: string
          status?: Database["public"]["Enums"]["adventure_status"] | null
          title?: string
          total_reviews?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "adventures_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "adventures_guide_id_fkey"
            columns: ["guide_id"]
            isOneToOne: false
            referencedRelation: "guide_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          adventure_id: string
          booking_date: string
          contact_email: string
          contact_phone: string | null
          created_at: string
          end_time: string
          guide_id: string
          id: string
          number_of_participants: number
          participants_details: Json
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          special_requirements: string | null
          start_time: string
          status: Database["public"]["Enums"]["booking_status"] | null
          total_price: number
          updated_at: string
          user_id: string
        }
        Insert: {
          adventure_id: string
          booking_date: string
          contact_email: string
          contact_phone?: string | null
          created_at?: string
          end_time: string
          guide_id: string
          id?: string
          number_of_participants: number
          participants_details: Json
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          special_requirements?: string | null
          start_time: string
          status?: Database["public"]["Enums"]["booking_status"] | null
          total_price: number
          updated_at?: string
          user_id: string
        }
        Update: {
          adventure_id?: string
          booking_date?: string
          contact_email?: string
          contact_phone?: string | null
          created_at?: string
          end_time?: string
          guide_id?: string
          id?: string
          number_of_participants?: number
          participants_details?: Json
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          special_requirements?: string | null
          start_time?: string
          status?: Database["public"]["Enums"]["booking_status"] | null
          total_price?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_adventure_id_fkey"
            columns: ["adventure_id"]
            isOneToOne: false
            referencedRelation: "adventures"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_guide_id_fkey"
            columns: ["guide_id"]
            isOneToOne: false
            referencedRelation: "guide_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          description: string | null
          icon: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      date_availability: {
        Row: {
          adventure_id: string
          available_slots: number
          created_at: string
          end_time: string
          id: string
          is_blocked: boolean | null
          max_participants: number
          price_override: number | null
          specific_date: string
          start_time: string
        }
        Insert: {
          adventure_id: string
          available_slots: number
          created_at?: string
          end_time: string
          id?: string
          is_blocked?: boolean | null
          max_participants: number
          price_override?: number | null
          specific_date: string
          start_time: string
        }
        Update: {
          adventure_id?: string
          available_slots?: number
          created_at?: string
          end_time?: string
          id?: string
          is_blocked?: boolean | null
          max_participants?: number
          price_override?: number | null
          specific_date?: string
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "date_availability_adventure_id_fkey"
            columns: ["adventure_id"]
            isOneToOne: false
            referencedRelation: "adventures"
            referencedColumns: ["id"]
          },
        ]
      }
      guide_profiles: {
        Row: {
          average_rating: number | null
          bio: string | null
          certifications: string[] | null
          experience_years: number | null
          id: string
          languages: string[] | null
          location: string | null
          social_links: Json | null
          specialties: string[] | null
          status: string | null
          total_reviews: number | null
          website: string | null
        }
        Insert: {
          average_rating?: number | null
          bio?: string | null
          certifications?: string[] | null
          experience_years?: number | null
          id: string
          languages?: string[] | null
          location?: string | null
          social_links?: Json | null
          specialties?: string[] | null
          status?: string | null
          total_reviews?: number | null
          website?: string | null
        }
        Update: {
          average_rating?: number | null
          bio?: string | null
          certifications?: string[] | null
          experience_years?: number | null
          id?: string
          languages?: string[] | null
          location?: string | null
          social_links?: Json | null
          specialties?: string[] | null
          status?: string | null
          total_reviews?: number | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "guide_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          is_verified: boolean | null
          last_login: string | null
          phone: string | null
          raw_user_meta_data: Json | null
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          is_verified?: boolean | null
          last_login?: string | null
          phone?: string | null
          raw_user_meta_data?: Json | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          is_verified?: boolean | null
          last_login?: string | null
          phone?: string | null
          raw_user_meta_data?: Json | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          adventure_id: string
          booking_id: string
          comment: string | null
          created_at: string
          guide_id: string
          id: string
          rating: number
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          adventure_id: string
          booking_id: string
          comment?: string | null
          created_at?: string
          guide_id: string
          id?: string
          rating: number
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          adventure_id?: string
          booking_id?: string
          comment?: string | null
          created_at?: string
          guide_id?: string
          id?: string
          rating?: number
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_adventure_id_fkey"
            columns: ["adventure_id"]
            isOneToOne: false
            referencedRelation: "adventures"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_guide_id_fkey"
            columns: ["guide_id"]
            isOneToOne: false
            referencedRelation: "guide_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      time_slots: {
        Row: {
          adventure_id: string
          created_at: string
          day_of_week: number
          end_time: string
          id: string
          is_active: boolean | null
          max_participants: number
          price_override: number | null
          start_time: string
        }
        Insert: {
          adventure_id: string
          created_at?: string
          day_of_week: number
          end_time: string
          id?: string
          is_active?: boolean | null
          max_participants: number
          price_override?: number | null
          start_time: string
        }
        Update: {
          adventure_id?: string
          created_at?: string
          day_of_week?: number
          end_time?: string
          id?: string
          is_active?: boolean | null
          max_participants?: number
          price_override?: number | null
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "time_slots_adventure_id_fkey"
            columns: ["adventure_id"]
            isOneToOne: false
            referencedRelation: "adventures"
            referencedColumns: ["id"]
          },
        ]
      }
      waitlist: {
        Row: {
          created_at: string
          email: string
          id: number
          interests: string | null
          location: string | null
          name: string
          signup_date: string
          user_type: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: number
          interests?: string | null
          location?: string | null
          name: string
          signup_date: string
          user_type: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
          interests?: string | null
          location?: string | null
          name?: string
          signup_date?: string
          user_type?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      citext:
        | {
            Args: {
              "": boolean
            }
            Returns: string
          }
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: string
          }
      citext_hash: {
        Args: {
          "": string
        }
        Returns: number
      }
      citextin: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      citextout: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      citextrecv: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      citextsend: {
        Args: {
          "": string
        }
        Returns: string
      }
      create_booking: {
        Args: {
          p_experience_id: string
          p_user_id: string
          p_booking_date: string
          p_guest_count: number
          p_special_requirements?: string
        }
        Returns: string
      }
      get_posted_experiences: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          name: string
          longitude: number
          latitude: number
          date: string
          image: string
          price: number
          rating: number
          guide: string
          description: string
          category: string
        }[]
      }
    }
    Enums: {
      adventure_status: "draft" | "active" | "inactive"
      booking_status: "pending" | "confirmed" | "cancelled" | "completed"
      difficulty_level: "Easy" | "Moderate" | "Challenging" | "Expert"
      payment_status: "pending" | "paid" | "refunded"
      user_role: "user" | "guide" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
