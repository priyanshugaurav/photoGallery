export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';

export function loadFavoritesFromStorage() {
  try {
    const raw = localStorage.getItem('gallery_favorites');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persist(favorites) {
  try { localStorage.setItem('gallery_favorites', JSON.stringify(favorites)); }
  catch {}
}

export function galleryReducer(state, action) {
  switch (action.type) {
    case TOGGLE_FAVORITE: {
      const id   = action.payload;
      const next = state.favorites.includes(id)
        ? state.favorites.filter(f => f !== id)
        : [...state.favorites, id];
      persist(next);
      return { ...state, favorites: next };
    }
    default:
      return state;
  }
}