import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MAX_HISTORY = 10;

interface HistoryState {
  recentlyViewed: string[];
  addToHistory: (slug: string) => void;
  clearHistory: () => void;
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      recentlyViewed: [],

      addToHistory: (slug) =>
        set((state) => {
          // Remove if already exists (we'll add to front)
          const filtered = state.recentlyViewed.filter((s) => s !== slug);
          // Add to front and limit to max
          const updated = [slug, ...filtered].slice(0, MAX_HISTORY);
          return { recentlyViewed: updated };
        }),

      clearHistory: () => set({ recentlyViewed: [] }),
    }),
    {
      name: 'wildmed-history',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
