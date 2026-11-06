import { cx } from '../../lib/cx.js';

// Kotak putih dengan sudut membulat — wadah dasar hampir semua konten.
export default function Card({ as: Tag = 'div', className, children, ...props }) {
  return (
    <Tag
      className={cx('rounded-2xl border border-line-soft bg-white p-5 shadow-sm', className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
