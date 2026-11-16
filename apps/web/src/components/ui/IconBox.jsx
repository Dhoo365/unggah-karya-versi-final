import { cx } from '../../lib/cx.js';
import { toneSoft } from '../../lib/tones.js';

const sizes = {
  sm: { box: 'size-8 rounded-lg', icon: 'size-4' },
  md: { box: 'size-10 rounded-xl', icon: 'size-5' },
  lg: { box: 'size-12 rounded-xl', icon: 'size-6' },
};

// Kotak berisi ikon dengan latar warna lembut.
export default function IconBox({ icon: Icon, tone = 'blue', size = 'md', className }) {
  return (
    <div className={cx('grid shrink-0 place-items-center', sizes[size].box, toneSoft[tone], className)}>
      <Icon className={sizes[size].icon} />
    </div>
  );
}
