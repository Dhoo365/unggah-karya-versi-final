import { cx } from '../../lib/cx.js';

// Judul bagian dengan keterangan dan aksi di sisi kanan.
export default function SectionHeader({ title, subtitle, icon: Icon, action, className }) {
  return (
    <div className={cx('flex flex-wrap items-end justify-between gap-x-4 gap-y-2', className)}>
      <div>
        <h2 className="flex items-center gap-2 text-lg font-bold text-ink">
          {Icon && <Icon className="size-5 text-navy" />}
          {title}
        </h2>
        {subtitle && <p className="mt-0.5 text-sm text-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
