import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Sweet, SweetCategory } from '@/types/sweet';
import { toast } from 'sonner';

export function useSweets() {
  return useQuery({
    queryKey: ['sweets'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sweets')
        .select('*')
        .eq('is_available', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Sweet[];
    }
  });
}

export function useAllSweets() {
  return useQuery({
    queryKey: ['allSweets'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sweets')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Sweet[];
    }
  });
}

export function useSweetsByCategory(category: SweetCategory | 'All') {
  return useQuery({
    queryKey: ['sweets', category],
    queryFn: async () => {
      let query = supabase
        .from('sweets')
        .select('*')
        .eq('is_available', true);
      
      if (category !== 'All') {
        query = query.eq('category', category);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Sweet[];
    }
  });
}

export function useSearchSweets(searchTerm: string, category: SweetCategory | 'All', minPrice?: number, maxPrice?: number) {
  return useQuery({
    queryKey: ['sweets', 'search', searchTerm, category, minPrice, maxPrice],
    queryFn: async () => {
      let query = supabase
        .from('sweets')
        .select('*')
        .eq('is_available', true);
      
      if (searchTerm) {
        query = query.ilike('name', `%${searchTerm}%`);
      }
      
      if (category !== 'All') {
        query = query.eq('category', category);
      }
      
      if (minPrice !== undefined) {
        query = query.gte('price', minPrice);
      }
      
      if (maxPrice !== undefined) {
        query = query.lte('price', maxPrice);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Sweet[];
    },
    enabled: true
  });
}

export function usePurchaseSweet() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ sweetId, quantity, userId }: { sweetId: string; quantity: number; userId: string }) => {
      // First, get the sweet to check quantity and price
      const { data: sweet, error: fetchError } = await supabase
        .from('sweets')
        .select('*')
        .eq('id', sweetId)
        .single();
      
      if (fetchError) throw fetchError;
      if (!sweet) throw new Error('Sweet not found');
      if (sweet.quantity < quantity) throw new Error('Not enough stock available');
      
      // Create order
      const { error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: userId,
          sweet_id: sweetId,
          quantity,
          total_price: sweet.price * quantity
        });
      
      if (orderError) throw orderError;
      
      // Update sweet quantity
      const { error: updateError } = await supabase
        .from('sweets')
        .update({ quantity: sweet.quantity - quantity })
        .eq('id', sweetId);
      
      if (updateError) throw updateError;
      
      return { success: true, totalPrice: sweet.price * quantity };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['sweets'] });
      toast.success(`Order placed successfully! Total: ₹${data.totalPrice}`);
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });
}

export function useAddSweet() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (sweet: Omit<Sweet, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('sweets')
        .insert(sweet)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sweets'] });
      queryClient.invalidateQueries({ queryKey: ['allSweets'] });
      toast.success('Sweet added successfully!');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });
}

export function useUpdateSweet() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Sweet> & { id: string }) => {
      const { data, error } = await supabase
        .from('sweets')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sweets'] });
      queryClient.invalidateQueries({ queryKey: ['allSweets'] });
      toast.success('Sweet updated successfully!');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });
}

export function useDeleteSweet() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('sweets')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sweets'] });
      queryClient.invalidateQueries({ queryKey: ['allSweets'] });
      toast.success('Sweet deleted successfully!');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });
}

export function useRestockSweet() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, quantity }: { id: string; quantity: number }) => {
      const { data: sweet, error: fetchError } = await supabase
        .from('sweets')
        .select('quantity')
        .eq('id', id)
        .single();
      
      if (fetchError) throw fetchError;
      
      const { error } = await supabase
        .from('sweets')
        .update({ quantity: sweet.quantity + quantity })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sweets'] });
      queryClient.invalidateQueries({ queryKey: ['allSweets'] });
      toast.success('Stock updated successfully!');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });
}
