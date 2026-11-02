const UNSPLASH_BASE = "https://images.unsplash.com";

export function unsplash(photoId: string): string {
  return `${UNSPLASH_BASE}/photo-${photoId}?auto=format&fit=crop&w=1600&q=80`;
}
