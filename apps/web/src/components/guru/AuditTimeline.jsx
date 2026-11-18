import { IoPersonOutline } from 'react-icons/io5';
import { cx } from '../../lib/cx.js';
import { toneBar } from '../../lib/tones.js';

// Garis waktu log audit status siswa. items: [{ tanggal, jam, label, tone, isi, oleh }]
export default function AuditTimeline({ items }) {
  return (
    <ol className="relative space-y-6 border-l-2 border-line-soft pl-6">
      {items.map((r, i) => (
        <li key={r.tanggal + r.jam} className="relative">
          <i className={cx('absolute top-1 -left-[31px] size-4 rounded-full ring-4 ring-white', i === 0 ? 'bg-navy' : toneBar[r.tone] ?? 'bg-slate-300')} />
          <div className="flex flex-wrap items-baseline gap-x-2">
            <b className="text-sm font-semibold text-ink">{r.tanggal}</b>
            <small className="text-xs text-subtle">{r.jam}</small>
          </div>
          <p className="mt-1 text-sm text-ink">
            <span className="font-semibold">{r.label}</span> — {r.isi}
          </p>
          <small className="mt-1 inline-flex items-center gap-1 text-xs text-muted">
            <IoPersonOutline className="size-3.5" /> Diubah oleh: {r.oleh}
          </small>
        </li>
      ))}
    </ol>
  );
}
