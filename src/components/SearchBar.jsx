export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative flex items-center w-full">
      <div className="absolute left-3 pointer-events-none text-[#AEAEB2]">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
      </div>

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search photographers…"
        className="
          w-full h-[34px] pl-[30px] pr-8
          bg-[#F9F9F9] border border-[#E8E8E8]
          rounded-[10px] text-[13px] text-[#0F0F0F]
          placeholder:text-[#AEAEB2]
          transition-all duration-200
          hover:border-[#C8C8C8] hover:bg-white
          focus:outline-none focus:bg-white focus:border-[#0066FF]
          focus:ring-[3px] focus:ring-[rgba(0,102,255,0.10)]
        "
      />

      {value && (
        <button
          onClick={() => onChange({ target: { value: '' } })}
          aria-label="Clear"
          className="absolute right-2.5 text-[#AEAEB2] hover:text-[#0F0F0F] transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>
      )}
    </div>
  );
}