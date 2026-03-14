import PhotoCard from './PhotoCard';

export default function PhotoGrid({ photos, favorites, dispatch }) {
  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] gap-3 text-center">
        <div className="w-12 h-12 rounded-2xl bg-[#F0F0F0] flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="#9B9B9B" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </div>
        <div>
          <p className="text-[15px] font-medium text-[#0F0F0F]">No results found</p>
          <p className="text-[13px] text-[#9B9B9B] mt-1">Try a different photographer name</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {photos.map((photo, index) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          isFavorited={favorites.includes(photo.id)}
          dispatch={dispatch}
          index={index}
        />
      ))}
    </div>
  );
}