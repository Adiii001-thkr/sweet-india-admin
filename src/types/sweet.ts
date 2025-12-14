export type SweetCategory = 'Milk-based' | 'Dry-fruit' | 'Bengali' | 'Festival Special';

export interface Sweet {
  id: string;
  name: string;
  description: string | null;
  category: SweetCategory;
  price: number;
  quantity: number;
  is_available: boolean;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  sweet_id: string;
  quantity: number;
  total_price: number;
  created_at: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  name: string;
  email: string;
  created_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: 'CUSTOMER' | 'ADMIN';
}
