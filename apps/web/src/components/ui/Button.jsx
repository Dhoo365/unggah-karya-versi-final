import { cx } from '../../lib/cx.js';

const variants = {
  primary: 'bg-navy text-white hover:bg-primary',
  soft: 'bg-soft text-navy hover:bg-ice',
  outline: 'border border-line bg-white text-navy hover:bg-surface',
  ghost: 'text-navy hover:bg-soft',
  danger: 'border border-red-200 bg-white text-red-700 hover:bg-red-50',
  dangerSolid: 'bg-red-600 text-white hover:bg-red-700',
  gold: 'bg-gold text-gold-ink hover:brightness-95',
  gray: 'bg-slate-100 text-slate-700 hover:bg-slate-200',
  white: 'bg-white text-navy hover:bg-soft',
};

const sizes = {
  sm: { btn: 'h-8 px-3 text-xs gap-1.5', icon: 'size-4' },
  md: { btn: 'h-10 px-4 text-sm gap-2', icon: 'size-[18px]' },
  lg: { btn: 'h-12 px-5 text-sm gap-2', icon: 'size-5' },
};

function Spinner({ className }) {
  return <i className={cx('inline-block animate-spin rounded-full border-2 border-current border-r-transparent', className)} aria-hidden />;
}

// Tombol standar. Tambahkan loading={true} untuk menampilkan putaran saat proses. Contoh: <Button variant="soft" icon={IoAddCircleOutline}>Tambah</Button>
export default function Button({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconRight: IconRight,
  loading = false,
  className,
  children,
  disabled,
  ...props
}) {
  const s = sizes[size];
  // Saat loading: ikon kiri diganti putaran, tombol tidak bisa diklik
  const Left = loading ? Spinner : Icon;
  return (
    <button
      type="button"
      className={cx(
        'ui-press inline-flex shrink-0 items-center justify-center rounded-xl font-semibold',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        s.btn,
        className
      )}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {Left && <Left className={cx('shrink-0', s.icon)} />}
      {children}
      {IconRight && <IconRight className={cx('shrink-0', s.icon)} />}
    </button>
  );
}
