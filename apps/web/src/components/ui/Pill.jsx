import { cx } from '../../lib/cx.js';
import { toneSoft } from '../../lib/tones.js';

// Label kecil berwarna, misalnya status "Pendaftaran Buka".
export default function Pill({ tone = 'gray', icon: Icon, className, children }) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap',
        toneSoft[tone],
        className
      )}
    >
      {Icon && <Icon className="size-3.5 shrink-0" />}
      {children}
    </span>
  );
}
