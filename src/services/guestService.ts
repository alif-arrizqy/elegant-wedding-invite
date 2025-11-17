import { supabase } from '@/lib/supabase';

export interface Guest {
  id: number;
  name: string;
  slug: string;
  created_at?: string;
}

interface GuestInsert {
  name: string;
}

/**
 * Generate slug dari nama tamu
 * Contoh: "John Noel" -> "john-noel"
 */
export const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
};

/**
 * Generate URL undangan untuk tamu
 */
export const generateInvitationUrl = (slug: string): string => {
  const baseUrl = window.location.origin;
  return `${baseUrl}/?guest=${slug}`;
};

/**
 * Fetch semua guests dari Supabase
 */
export const fetchGuests = async (): Promise<Guest[]> => {
  const { data, error } = await supabase
    .from('guests')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching guests:', error);
    throw error;
  }

  return data || [];
};

/**
 * Fetch single guest berdasarkan ID
 */
export const fetchGuestById = async (id: number): Promise<Guest | null> => {
  const { data, error } = await supabase
    .from('guests')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching guest:', error);
    return null;
  }

  return data;
};

/**
 * Tambah guest baru
 */
export const addGuest = async (guest: GuestInsert): Promise<Guest> => {
  const slug = generateSlug(guest.name);

  const { data, error } = await supabase
    .from('guests')
    .insert([
      {
        name: guest.name,
        slug: slug,
        created_at: new Date().toISOString(),
      }
    ])
    .select()
    .single();

  if (error) {
    console.error('Error adding guest:', error);
    throw error;
  }

  return data;
};

/**
 * Update guest
 */
export const updateGuest = async (id: number, guest: GuestInsert): Promise<Guest> => {
  const slug = generateSlug(guest.name);

  const { data, error } = await supabase
    .from('guests')
    .update({
      name: guest.name,
      slug: slug,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating guest:', error);
    throw error;
  }

  return data;
};

/**
 * Delete guest
 */
export const deleteGuest = async (id: number): Promise<void> => {
  const { error } = await supabase
    .from('guests')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting guest:', error);
    throw error;
  }
};

/**
 * Check jika slug sudah ada
 */
export const slugExists = async (slug: string, excludeId?: number): Promise<boolean> => {
  let query = supabase
    .from('guests')
    .select('id')
    .eq('slug', slug);

  if (excludeId) {
    query = query.neq('id', excludeId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error checking slug:', error);
    return false;
  }

  return data && data.length > 0;
};
