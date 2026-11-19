import { useEffect, useRef, useState } from 'react';
import { cx } from '../../lib/cx.js';

/*
  Menu tarik-turun sederhana.
  - trigger: ({ open, toggle }) => elemen tombol
  - items  : [{ label, icon, onClick, tone: 'danger', divider }]  ATAU
  - children: (tutup) => isi bebas (mis. panel notifikasi)
  - align  : 'right' | 'left'
*/
export default function Dropdown({ trigger, items, children, align = 'right', className, panelClassName }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const tutup = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const klik = (e) => !ref.current?.contains(e.target) && tutup();
    const esc = (e) => e.key === 'Escape' && tutup();
    document.addEventListener('mousedown', klik);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('mousedown', klik);
      document.removeEventListener('keydown', esc);
    };
  }, [open]);

  return (
    <div ref={ref} className={cx('relative', className)}>
      {trigger({ open, toggle: () => setOpen((o) => !o) })}
      {open && (
        <div
          role="menu"
          className={cx(
            'ui-drop absolute top-full z-50 mt-2 overflow-hidden rounded-2xl border border-line-soft bg-white shadow-xl shadow-navy/10',
            align === 'right' ? 'right-0' : 'left-0 origin-top-left',
            items ? 'w-56 p-1.5' : '',
            panelClassName
          )}
        >
          {items
            ? items.map((it, i) =>
                it.divider ? (
                  <hr key={i} className="my-1 border-line-soft" />
                ) : (
                  <button
                    key={it.label}
                    type="button"
                    role="menuitem"
                    onClick={() => { tutup(); it.onClick?.(); }}
                    className={cx(
                      'flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium',
                      it.tone === 'danger' ? 'text-red-700 hover:bg-red-50' : 'text-ink hover:bg-surface'
                    )}
                  >
                    {it.icon && <it.icon className={cx('size-[18px] shrink-0', it.tone === 'danger' ? '' : 'text-subtle')} />}
                    {it.label}
                  </button>
                )
              )
            : children(tutup)}
        </div>
      )}
    </div>
  );
}
