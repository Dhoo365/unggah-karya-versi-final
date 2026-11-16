import { cx } from '../../lib/cx.js';
import { toneBar } from '../../lib/tones.js';

// Batang progres. value = persen 0-100.
export default function ProgressBar({ value, tone = 'blue', thin = false, className }) {
  return (
    <div className={cx('overflow-hidden rounded-full bg-slate-100', thin ? 'h-1.5' : 'h-2.5', className)}>
      <div className={cx('h-full rounded-full', toneBar[tone])} style={{ width: `${value}%` }} />
    </div>
  );
}
