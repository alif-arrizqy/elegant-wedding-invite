import { supabase } from "@/lib/supabase";

export interface Wish {
    id: number;
    name: string;
    message: string;
    timestamp: Date;
    created_at?: string;
}

interface WishInsert {
    name: string;
    message: string;
}

/**
 * Fetch semua wishes dari Supabase
 */
export const fetchWishes = async (): Promise<Wish[]> => {
    const { data, error } = await supabase
        .from("wishes")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching wishes:", error);
        throw error;
    }

    return (data || []).map((wish: WishInsert & { id: number; created_at: string }) => ({
        id: wish.id,
        name: wish.name,
        message: wish.message,
        timestamp: new Date(wish.created_at),
        created_at: wish.created_at,
    }));
};

/**
 * Tambah wish baru ke Supabase
 */
export const addWish = async (wish: WishInsert): Promise<Wish> => {
    const { data, error } = await supabase
        .from("wishes")
        .insert([
            {
                name: wish.name,
                message: wish.message,
                created_at: new Date().toISOString(),
            },
        ])
        .select()
        .single();

    if (error) {
        console.error("Error adding wish:", error);
        throw error;
    }

    return {
        id: data.id,
        name: data.name,
        message: data.message,
        timestamp: new Date(data.created_at),
        created_at: data.created_at,
    };
};

/**
 * Delete wish dari Supabase (optional)
 */
export const deleteWish = async (id: number): Promise<void> => {
    const { error } = await supabase.from("wishes").delete().eq("id", id);

    if (error) {
        console.error("Error deleting wish:", error);
        throw error;
    }
};

/**
 * Subscribe to real-time updates untuk wishes
 */
export const subscribeToWishes = (callback: (wishes: Wish[]) => void) => {
    const subscription = supabase
        .channel("wishes_channel")
        .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "wishes" },
            async () => {
                const wishes = await fetchWishes();
                callback(wishes);
            }
        )
        .subscribe();

    return () => {
        subscription.unsubscribe();
    };
};
