import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface BookmarkState {
  bookmarks: string[];
  addBookmark: (slug: string) => void;
  removeBookmark: (slug: string) => void;
  toggleBookmark: (slug: string) => void;
  isBookmarked: (slug: string) => boolean;
  clearBookmarks: () => void;
}

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      bookmarks: [],

      addBookmark: (slug) =>
        set((state) => ({
          bookmarks: state.bookmarks.includes(slug)
            ? state.bookmarks
            : [...state.bookmarks, slug],
        })),

      removeBookmark: (slug) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((b) => b !== slug),
        })),

      toggleBookmark: (slug) => {
        const { bookmarks } = get();
        if (bookmarks.includes(slug)) {
          set({ bookmarks: bookmarks.filter((b) => b !== slug) });
        } else {
          set({ bookmarks: [...bookmarks, slug] });
        }
      },

      isBookmarked: (slug) => get().bookmarks.includes(slug),

      clearBookmarks: () => set({ bookmarks: [] }),
    }),
    {
      name: 'wildmed-bookmarks',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
