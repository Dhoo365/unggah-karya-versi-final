import { IoCheckmarkOutline } from 'react-icons/io5';
import { cx } from '../../lib/cx.js';

// Deretan tombol filter. Yang aktif berwarna biru tua dengan tanda centang.
export default function FilterChips({ items, active, onChange, className }) {
  return (
    <div className={cx('flex flex-wrap gap-2', className)}>
      {items.map((item) => {
        const on = item === active;
        return (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            className={cx(
              'inline-flex h-9 items-center gap-1.5 rounded-full border px-4 text-sm font-semibold transition-colors',
              on
                ? 'border-navy bg-navy text-white'
                : 'border-line-soft bg-white text-muted hover:border-line hover:text-ink'
            )}
          >
            {on && <IoCheckmarkOutline className="size-4" />}
            {item}
          </button>
        );
      })}
    </div>
  );
}
