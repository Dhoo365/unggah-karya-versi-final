import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { IoCloseOutline } from 'react-icons/io5';
import { cx } from '../../lib/cx.js';
import { toneSoft } from '../../lib/tones.js';

// Menahan komponen tetap tampil selama animasi keluar berjalan
export function useExit(open, ms = 170) {
  const [mounted, setMounted] = useState(open);
  const [closing, setClosing] = useState(false);
  useEffect(() => {
    if (open) {
      setMounted(true);
      setClosing(false);
      return;
    }
    if (!mounted) return;
    setClosing(true);
    const t = setTimeout(() => {
      setMounted(false);
      setClosing(false);
    }, ms);
    return () => clearTimeout(t);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps
  return { mounted, closing };
}

let terbuka = 0; // jumlah dialog terbuka (untuk mengunci scroll halaman)

/*
  Dialog dengan animasi. Di HP tampil sebagai lembar dari bawah.
  Props: open, onClose, title, subtitle, icon, tone, size ('sm' | 'md' | 'lg' | 'xl'), footer, children
*/
export default function Modal({ open, onClose, title, subtitle, icon: Icon, tone = 'blue', size = 'md', footer, children, dismissable = true }) {
  const { mounted, closing } = useExit(open);
  const panel = useRef(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const sebelum = document.activeElement;
    terbuka += 1;
    document.body.style.overflow = 'hidden';
    // fokus ke elemen pertama yang bisa diisi, atau panel
    requestAnimationFrame(() => {
      const el = panel.current?.querySelector('input, textarea, select') ?? panel.current;
      el?.focus({ preventScroll: true });
    });
    const onKey = (e) => {
      if (e.key === 'Escape' && dismissable) onClose?.();
      if (e.key === 'Tab' && panel.current) {
        // jaga fokus tetap di dalam dialog
        const f = panel.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const list = [...f].filter((x) => !x.disabled);
        if (!list.length) return;
        const [a, z] = [list[0], list.at(-1)];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      terbuka -= 1;
      if (!terbuka) document.body.style.overflow = '';
      sebelum?.focus?.({ preventScroll: true });
    };
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!mounted) return null;
  const lebar = { sm: 'sm:max-w-md', md: 'sm:max-w-lg', lg: 'sm:max-w-2xl', xl: 'sm:max-w-4xl' }[size];

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6">
      <div
        className="ui-backdrop absolute inset-0 bg-navy-dark/45 backdrop-blur-[2px]"
        data-closing={closing || undefined}
        onClick={() => dismissable && onClose?.()}
      />
      <section
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? id : undefined}
        tabIndex={-1}
        data-closing={closing || undefined}
        className={cx(
          'ui-dialog ui-sheet relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl outline-none sm:rounded-3xl',
          lebar
        )}
      >
        <i className="mx-auto mt-2.5 h-1.5 w-12 shrink-0 rounded-full bg-slate-200 sm:hidden" aria-hidden />
        {(title || Icon) && (
          <header className="flex items-start gap-3 px-5 pt-4 pb-3 sm:px-6 sm:pt-6">
            {Icon && (
              <span className={cx('grid size-11 shrink-0 place-items-center rounded-2xl', toneSoft[tone] ?? toneSoft.blue)}>
                <Icon className="size-6" />
              </span>
            )}
            <div className="min-w-0 flex-1 pt-0.5">
              {title && <h2 id={id} className="text-lg leading-snug font-bold text-ink">{title}</h2>}
              {subtitle && <p className="mt-0.5 text-sm text-muted">{subtitle}</p>}
            </div>
            {dismissable && (
              <button type="button" onClick={onClose} aria-label="Tutup" className="ui-press -mt-1 -mr-2 grid size-9 shrink-0 place-items-center rounded-xl text-subtle hover:bg-surface hover:text-ink">
                <IoCloseOutline className="size-6" />
              </button>
            )}
          </header>
        )}
        <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5 sm:px-6">{children}</div>
        {footer && (
          <footer className="flex flex-col-reverse gap-2 border-t border-line-soft bg-surface/60 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
            {footer}
          </footer>
        )}
      </section>
    </div>,
    document.body
  );
}
