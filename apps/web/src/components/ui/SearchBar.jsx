import { IoOptionsOutline, IoSearchOutline } from 'react-icons/io5';
import { cx } from '../../lib/cx.js';

// Kotak pencarian dengan tombol filter.
export default function SearchBar({ value, onChange, placeholder, className }) {
  return (
    <label
      className={cx(
        'flex h-11 items-center gap-3 rounded-xl border border-line-soft bg-white px-4 shadow-sm',
        'focus-within:border-navy focus-within:ring-2 focus-within:ring-soft',
        className
      )}
    >
      <IoSearchOutline className="size-5 shrink-0 text-subtle" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-subtle"
      />
      <span className="grid size-8 place-items-center rounded-lg text-muted hover:bg-surface" aria-hidden>
        <IoOptionsOutline className="size-5" />
      </span>
    </label>
  );
}
