import { useState, useEffect } from 'react';
import { Guest, fetchGuests, addGuest, updateGuest, deleteGuest } from '@/services/guestService';

export const useGuests = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load guests on mount
  useEffect(() => {
    loadGuests();
  }, []);

  const loadGuests = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchGuests();
      setGuests(data);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Gagal memuat tamu';
      setError(errorMsg);
      console.error('Error loading guests:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const createGuest = async (name: string): Promise<Guest | null> => {
    try {
      setError(null);
      const newGuest = await addGuest({ name });
      setGuests((prev) => [newGuest, ...prev]);
      return newGuest;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Gagal menambah tamu';
      setError(errorMsg);
      return null;
    }
  };

  const editGuest = async (id: number, name: string): Promise<Guest | null> => {
    try {
      setError(null);
      const updatedGuest = await updateGuest(id, { name });
      setGuests((prev) =>
        prev.map((g) => (g.id === id ? updatedGuest : g))
      );
      return updatedGuest;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Gagal mengubah tamu';
      setError(errorMsg);
      return null;
    }
  };

  const removeGuest = async (id: number): Promise<boolean> => {
    try {
      setError(null);
      await deleteGuest(id);
      setGuests((prev) => prev.filter((g) => g.id !== id));
      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Gagal menghapus tamu';
      setError(errorMsg);
      return false;
    }
  };

  return {
    guests,
    isLoading,
    error,
    createGuest,
    editGuest,
    removeGuest,
    refetch: loadGuests,
  };
};
