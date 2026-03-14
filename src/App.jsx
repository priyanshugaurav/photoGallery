import { useReducer, useCallback, useMemo, useState } from 'react';
import { useFetchPhotos } from './hooks/useFetchPhotos';
import { galleryReducer, loadFavoritesFromStorage } from './reducers/galleryReducer';
import SearchBar     from './components/SearchBar';
import PhotoGrid     from './components/PhotoGrid';
import LoadingSpinner from './components/LoadingSpinner';

export default function App() {
  const { photos, loading, error } = useFetchPhotos(30);
  const [query, setQuery]   = useState('');
  const [tab, setTab]       = useState('all'); // 'all' | 'favorites'

  const [state, dispatch] = useReducer(galleryReducer, {
    favorites: loadFavoritesFromStorage(),
  });

  const handleSearch = useCallback((e) => {
    setQuery(e.target.value);
  }, []);

  const filteredPhotos = useMemo(() => {
    let list = tab === 'favorites'
      ? photos.filter(p => state.favorites.includes(p.id))
      : photos;
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter(p => p.author.toLowerCase().includes(q));
  }, [photos, query, tab, state.favorites]);

  const favCount = state.favorites.length;

  return (
    <div className="min-h-screen bg-[#F4F4F5]">

      {/* ── Navbar ── */}
      <div className="sticky top-0 z-20 px-6 pt-4 pb-3">
        <nav className="
          max-w-7xl mx-auto
          h-14 px-4
          bg-white/90 backdrop-blur-xl
          border border-[#E8E8E8]
          rounded-2xl
          flex items-center justify-between gap-4
          shadow-[0_2px_16px_rgba(0,0,0,0.06)]
        ">
          {/* Logo */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-7 h-7 rounded-[8px] bg-[#0F0F0F] flex items-center justify-center">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="white" strokeWidth="2.3" strokeLinecap="round">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <path d="m21 15-5-5L5 21"/>
              </svg>
            </div>
            <span className="text-[15px] font-semibold text-[#0F0F0F] tracking-[-0.025em]">
              Gallery
            </span>
          </div>

          {/* Pill tab switcher */}
          <div className="flex items-center gap-0.5 bg-[#F4F4F5] rounded-[10px] p-[3px] flex-shrink-0">
            {['all', 'favorites'].map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`
                  px-4 h-7 rounded-[7px] text-[13px] font-medium
                  transition-all duration-200
                  ${tab === t
                    ? 'bg-white text-[#0F0F0F] shadow-[0_1px_4px_rgba(0,0,0,0.1)]'
                    : 'text-[#8A8A8A] hover:text-[#0F0F0F]'
                  }
                `}
              >
                {t === 'all' ? 'All' : `Saved${favCount > 0 ? ` ${favCount}` : ''}`}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="flex-1 max-w-xs">
            <SearchBar value={query} onChange={handleSearch} />
          </div>

          {/* Fav pill */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {favCount > 0 && (
              <div className="flex items-center gap-1.5 h-8 px-3 rounded-[10px] bg-[#FFF0F0] border border-[#FFD9D9]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5484D]" />
                <span className="text-[12px] font-medium text-[#E5484D]">
                  {favCount} saved
                </span>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* ── Main ── */}
      <main className="max-w-7xl mx-auto px-6 pb-10">

        {/* Page heading */}
        {!loading && !error && (
          <div className="mb-6">
            <h1 className="text-[22px] font-semibold text-[#0F0F0F] tracking-[-0.025em]">
              {tab === 'favorites'
                ? 'Saved photos'
                : query
                  ? <>Results for <span className="text-[#0066FF]">&ldquo;{query}&rdquo;</span></>
                  : 'All Photos'
              }
            </h1>
            <p className="text-[13px] text-[#9B9B9B] mt-1">
              {filteredPhotos.length} photo{filteredPhotos.length !== 1 ? 's' : ''}
              {query && ` · filtered`}
            </p>
          </div>
        )}

        {loading && <LoadingSpinner />}

        {error && !loading && (
          <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center">
            <div className="w-11 h-11 rounded-2xl bg-[#FFF0F0] flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="#E5484D" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <div>
              <p className="text-[15px] font-medium text-[#0F0F0F]">Failed to load photos</p>
              <p className="text-[13px] text-[#9B9B9B] mt-1">{error}</p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="mt-1 h-9 px-5 rounded-xl bg-[#0F0F0F] text-white text-[13px] font-medium hover:bg-[#2A2A2A] transition-colors"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && (
          <PhotoGrid
            photos={filteredPhotos}
            favorites={state.favorites}
            dispatch={dispatch}
          />
        )}
      </main>

      {/* Footer */}
      {!loading && !error && (
        <footer className="border-t border-[#E8E8E8] py-6 mt-2">
          <p className="text-center text-[12px] text-[#C0C0C0]">
            Photos via{' '}
            <a href="https://picsum.photos" target="_blank" rel="noopener noreferrer"
              className="hover:text-[#6B6B6B] transition-colors">
              Picsum Photos
            </a>
          </p>
        </footer>
      )}
    </div>
  );
}