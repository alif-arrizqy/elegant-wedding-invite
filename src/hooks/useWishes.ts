import { useState, useEffect } from "react";
import {
    fetchWishes,
    addWish,
    subscribeToWishes,
} from "@/services/wishService";
import { WishSectionData } from "@/constant/WeddingData";

export interface Wish {
    id: number;
    name: string;
    message: string;
    timestamp: Date;
}

export const useWishes = () => {
    const [wishes, setWishes] = useState<Wish[]>([...WishSectionData]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch initial data
    useEffect(() => {
        const loadWishes = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const fetchedWishes = await fetchWishes();

                // Combine dengan data dummy jika database kosong
                if (fetchedWishes.length === 0) {
                    // setWishes([...WishSectionData]);
                    setWishes([]);
                } else {
                    setWishes(fetchedWishes);
                }
            } catch (err) {
                console.error("Failed to load wishes:", err);
                setError("Gagal memuat ucapan. Menggunakan data lokal.");
                // Fallback ke data dummy
                setWishes([...WishSectionData]);
            } finally {
                setIsLoading(false);
            }
        };

        loadWishes();
    }, []);

    // Subscribe to real-time updates
    useEffect(() => {
        try {
            const unsubscribe = subscribeToWishes((updatedWishes) => {
                setWishes(updatedWishes);
            });

            return () => unsubscribe();
        } catch (err) {
            console.warn("Real-time subscription not available:", err);
        }
    }, []);

    // Add new wish
    const submitWish = async (name: string, message: string): Promise<Wish> => {
        try {
            setError(null);

            const newWish = await addWish({
                name: name.trim(),
                message: message.trim(),
            });

            // Update local state
            setWishes((prev) => [newWish, ...prev]);

            return newWish;
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "Gagal mengirim ucapan";
            setError(errorMessage);
            throw err;
        }
    };

    return {
        wishes,
        isLoading,
        error,
        submitWish,
    };
};
