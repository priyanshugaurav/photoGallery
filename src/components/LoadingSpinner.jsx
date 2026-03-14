export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[55vh] gap-3">
      <div className="spinner" />
      <p className="text-xs text-[#9B9B9B] tracking-[0.18em] font-[500]">
        Loading photos
      </p>
    </div>
  );
}