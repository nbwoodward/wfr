import { useBookmarkStore } from '../stores/bookmarkStore';
import { getAllProtocols } from '../lib/content';
import type { ProtocolIndex } from '../types/protocol';

export function useBookmarks() {
  const { bookmarks, addBookmark, removeBookmark, toggleBookmark, isBookmarked } =
    useBookmarkStore();

  const getBookmarkedProtocols = (): ProtocolIndex[] => {
    const allProtocols = getAllProtocols();
    return bookmarks
      .map((slug) => allProtocols.find((p) => p.slug === slug))
      .filter((p): p is ProtocolIndex => p !== undefined);
  };

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    toggleBookmark,
    isBookmarked,
    getBookmarkedProtocols,
  };
}
