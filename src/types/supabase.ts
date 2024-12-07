// src/types/supabase.ts
export interface Database {
    public: {
      Tables: {
        adventures: {
          Row: {
            id: string;
            created_at: string;
            title: string;
            description: string;
            location: string;
            duration_minutes: number;
            price: number;
            difficulty: string;
            min_group_size: number;
            max_group_size: number;
            image_url: string;
            category: string;
            status: 'active' | 'inactive';
          };
          Insert: Omit<Database['public']['Tables']['adventures']['Row'], 'id' | 'created_at'>;
          Update: Partial<Database['public']['Tables']['adventures']['Insert']>;
        };
        availability: {
          Row: {
            id: string;
            adventure_id: string;
            date: string;
            available_slots: number;
          };
          Insert: Omit<Database['public']['Tables']['availability']['Row'], 'id'>;
          Update: Partial<Database['public']['Tables']['availability']['Insert']>;
        };
      };
    };
  }