import { create } from 'zustand';

interface StoreState {
  currentPage: string;
  role: string;
  setCurrentPage: (page: string) => void;
  setRole: (role: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  currentPage: '',
  role: '',
  setCurrentPage: (page) => set({ currentPage: page }),
  setRole: (role) => set({ role }),
}));