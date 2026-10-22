export interface Post {
  id: string;
  title: string;
  type: 'Essay' | 'Fragment' | 'Private Journal' | 'Vault Draft';
  readTime: string;
  date: string;
  synopsis: string;
  body: string;
  isRestricted: boolean;
  password?: string;
  draftNumber?: string;
  published: boolean;
}

/**
 * Validates the password for encrypted manuscripts (case-insensitive trim)
 */
export function validatePassword(attempt: string, expected: string = 'nocturne'): boolean {
  if (!attempt || !expected) return false;
  return attempt.trim().toLowerCase() === expected.trim().toLowerCase();
}

/**
 * Estimates reading time from word count (standard 200 wpm)
 */
export function estimateReadingTime(text: string): string {
  if (!text || text.trim().length === 0) return '1 min read';
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

/**
 * Filters posts by active category tab
 */
export function filterPosts(posts: Post[], tab: string): Post[] {
  if (!tab || tab.toLowerCase() === 'all') return posts;
  const normalized = tab.toLowerCase();
  if (normalized === 'essays') {
    return posts.filter(p => p.type === 'Essay');
  }
  if (normalized === 'fragments') {
    return posts.filter(p => p.type === 'Fragment');
  }
  if (normalized === 'archive' || normalized === 'vault') {
    return posts.filter(p => p.isRestricted || p.type === 'Vault Draft');
  }
  return posts;
}

/**
 * Searches posts by title, synopsis, or body
 */
export function searchPosts(posts: Post[], query: string): Post[] {
  if (!query || query.trim() === '') return posts;
  const q = query.toLowerCase().trim();
  return posts.filter(p => 
    p.title.toLowerCase().includes(q) ||
    p.synopsis.toLowerCase().includes(q) ||
    p.body.toLowerCase().includes(q)
  );
}

/**
 * Calculates reading progress percentage clamped between 0 and 100
 */
export function calculateReadingProgress(scrollTop: number, scrollHeight: number, clientHeight: number): number {
  const maxScroll = scrollHeight - clientHeight;
  if (maxScroll <= 0) return 100;
  const pct = (scrollTop / maxScroll) * 100;
  return Math.min(100, Math.max(0, Math.round(pct)));
}
