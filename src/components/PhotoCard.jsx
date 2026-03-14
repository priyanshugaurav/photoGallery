import { useState } from 'react';
import { TOGGLE_FAVORITE } from '../reducers/galleryReducer';

export default function PhotoCard({ photo, isFavorited, dispatch, index }) {
  const [animating, setAnimating] = useState(false);

  const handleFavorite = (e) => {
    e.stopPropagation();
    dispatch({ type: TOGGLE_FAVORITE, payload: photo.id });
    setAnimating(true);
    setTimeout(() => setAnimating(false), 420);
  };

  return (
    <article
      className="photo-card card-enter group relative bg-white rounded-2xl overflow-hidden border border-[#EBEBEB] hover:border-[#D4D4D4] hover:shadow-[0_8px_30px_rgba(0,0,0,0.09)] transition-all duration-300 cursor-pointer"
      style={{ animationDelay: `${Math.min(index * 35, 500)}ms` }}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[#F0F0F0]" style={{ aspectRatio: '4/3' }}>
        <img
          src={`https://picsum.photos/id/${photo.id}/600/450`}
          alt={`Photo by ${photo.author}`}
          loading="lazy"
          className="photo-img w-full h-full object-cover"
        />

        {/* Dark overlay on hover */}
        <div className="card-overlay absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Favorite button — floats on image */}
        <button
          onClick={handleFavorite}
          aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          className={`
            absolute top-3 right-3 z-10
            w-8 h-8 rounded-full
            flex items-center justify-center
            transition-all duration-200
            backdrop-blur-sm
            ${isFavorited
              ? 'bg-white shadow-[0_2px_8px_rgba(0,0,0,0.18)]'
              : 'bg-white/70 opacity-0 group-hover:opacity-100 shadow-[0_2px_8px_rgba(0,0,0,0.12)]'
            }
          `}
        >
          <svg
            width="14" height="14" viewBox="0 0 24 24"
            fill={isFavorited ? '#E5484D' : 'none'}
            stroke={isFavorited ? '#E5484D' : '#6B6B6B'}
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className={animating ? 'heart-animate' : ''}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* Footer */}
      <div className="px-4 py-3.5 flex items-center gap-3">
        {/* Avatar initial */}
        <div
          className="w-7 h-7 rounded-full bg-[#F0F0F0] flex items-center justify-center flex-shrink-0 text-[11px] font-semibold text-[#6B6B6B] uppercase select-none"
          aria-hidden="true"
        >
          {photo.author.charAt(0)}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-medium text-[#0F0F0F] truncate leading-tight">
            {photo.author}
          </p>
          <p className="text-[11px] text-[#ABABAB] mt-0.5 font-[400]">
            #{photo.id}
          </p>
        </div>
      </div>
    </article>
  );
}