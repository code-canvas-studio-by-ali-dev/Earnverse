import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import Cookies from 'js-cookie';

interface User {
    id: string;
    email: string;
    username: string;
    password: string;
    verificationKey: string;
}

interface StoreState {
    user: User | null;
    token: string | null;
    setUser: (user: User) => void;
    setToken: (token: string) => void;
    clearUser: () => void;
    clearStore: () => void;
}

const cookieStorage = createJSONStorage(() => ({
    getItem: (name: string) => {
        const value = Cookies.get(name);
        return value ? JSON.parse(value) : null;
    },
    setItem: (name: string, value: unknown) => {
        Cookies.set(name, JSON.stringify(value), { expires: 1 });
    },
    removeItem: (name: string) => {
        Cookies.remove(name);
    },
}));

export const useStore = create<StoreState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            setUser: (user) => set({ user }),
            setToken: (token) => set({ token }),
            clearUser: () => set({ user: null }),
            clearStore: () => set({ user: null, token: null }),
        }),
        {
            name: 'auth-storage',
            storage: cookieStorage,
        }
    )
);