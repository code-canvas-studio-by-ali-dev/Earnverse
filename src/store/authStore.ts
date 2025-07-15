import { create } from 'zustand';

interface User {
    id: string;
    email: string;
    username: string;
    password: string;
    verificationKey: string;
}

interface StoreState {
    user: User | null;
    setUser: (user: User) => void;
    clearUser: () => void;
}

export const useStore = create<StoreState>((set) => ({
    user: { id: "12345", email: "test_one1470@gmail.com", username: "user_1470_test_one_2456_1", password: "#Sweety12", verificationKey: "12345678" },
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
}));