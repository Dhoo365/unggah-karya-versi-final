import { cx } from '../../lib/cx.js';

const variants = {
  primary: 'bg-navy text-white hover:bg-primary',
  soft: 'bg-soft text-navy hover:bg-ice',
  outline: 'border border-line bg-white text-navy hover:bg-surface',
  ghost: 'text-navy hover:bg-soft',
  danger: 'border border-red-200 bg-white text-red-700 hover:bg-red-50',
  gold: 'bg-gold text-gold-ink hover:brightness-95',
  gray: 'bg-slate-100 text-slate-700 hover:bg-slate-200',
  white: 'bg-white text-navy hover:bg-soft',
};

const sizes = {
  sm: { btn: 'h-8 px-3 text-xs gap-1.5', icon: 'size-4' },
  md: { btn: 'h-10 px-4 text-sm gap-2', icon: 'size-[18px]' },
  lg: { btn: 'h-12 px-5 text-sm gap-2', icon: 'size-5' },
};

// Tombol standar. Contoh: <Button variant="soft" icon={IoAddCircleOutline}>Tambah</Button>
export default function Button({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconRight: IconRight,
  className,
  children,
  ...props
}) {
  const s = sizes[size];
  return (
    <button
      type="button"
      className={cx(
        'inline-flex shrink-0 items-center justify-center rounded-xl font-semibold transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy disabled:opacity-50',
        variants[variant],
        s.btn,
        className
      )}
      {...props}
    >
      {Icon && <Icon className={cx('shrink-0', s.icon)} />}
      {children}
      {IconRight && <IconRight className={cx('shrink-0', s.icon)} />}
    </button>
  );
}
