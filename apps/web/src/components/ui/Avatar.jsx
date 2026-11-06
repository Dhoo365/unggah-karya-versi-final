import { cx } from '../../lib/cx.js';
import { toneSoft } from '../../lib/tones.js';

const sizes = {
  sm: 'size-8 text-xs',
  md: 'size-11 text-sm',
  lg: 'size-16 text-lg',
};

// Lingkaran berisi inisial nama, misalnya "RS".
export default function Avatar({ initials, tone = 'blue', size = 'md', className }) {
  return (
    <div
      className={cx(
        'grid shrink-0 place-items-center rounded-full font-bold',
        sizes[size],
        toneSoft[tone],
        className
      )}
    >
      {initials}
    </div>
  );
}
