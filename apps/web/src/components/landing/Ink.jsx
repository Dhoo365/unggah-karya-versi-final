import { cx } from '../../lib/cx.js';

/*
  Coretan tinta (gaya C) yang dipakai di landing page.
  Garis lingkaran & garis bawah "tergambar" saat muncul di layar (lihat .ink-draw di index.css).
*/

// Lingkaran coretan emas di sekitar sebuah kata
export function InkCircle({ children }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      {children}
      <svg
        viewBox="0 0 300 110"
        preserveAspectRatio="none"
        aria-hidden
        className="ink-draw pointer-events-none absolute -top-[14%] -left-[6%] h-[130%] w-[112%]"
      >
        <path
          d="M40 70 C 20 30, 110 6, 190 12 C 270 18, 300 50, 268 80 C 236 108, 90 108, 40 86 C 18 76, 30 40, 70 28"
          fill="none"
          stroke="#ffba38"
          strokeWidth="5"
          strokeLinecap="round"
          pathLength="1"
        />
      </svg>
    </span>
  );
}

// Garis bawah coretan
export function InkUnderline({ children, className }) {
  return (
    <span className={cx('relative inline-block', className)}>
      {children}
      <svg viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden className="ink-draw absolute -bottom-2.5 left-0 h-4 w-full">
        <path d="M4 12 C 50 4, 120 18, 196 8" fill="none" stroke="#ffba38" strokeWidth="5" strokeLinecap="round" pathLength="1" />
      </svg>
    </span>
  );
}

export function InkArrow({ className }) {
  return (
    <svg width="90" height="50" viewBox="0 0 90 50" aria-hidden className={className}>
      <path d="M6 40 C 26 10, 56 6, 80 18" fill="none" stroke="#14275e" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M68 10 L80 18 L70 28" fill="none" stroke="#14275e" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function InkCheck() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden className="mt-px shrink-0">
      <path d="M3 4 h16 v15 h-16 z" fill="none" stroke="#14275e" strokeWidth="2" strokeLinejoin="round" transform="rotate(-3 11 11)" />
      <path d="M6 11 l4 4 l9 -12" fill="none" stroke="#ffba38" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Label kecil di atas judul bagian
export function Eyebrow({ children }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.14em] text-secondary uppercase sm:text-[13px]">
      <i className="h-1 w-5 rounded-full bg-gold" />
      {children}
    </span>
  );
}
