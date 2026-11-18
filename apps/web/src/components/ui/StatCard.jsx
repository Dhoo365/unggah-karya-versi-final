import { cx } from '../../lib/cx.js';
import { toneText } from '../../lib/tones.js';
import IconBox from './IconBox.jsx';

// Kartu angka statistik. Contoh: "Lomba Aktif — 12".
export default function StatCard({ label, value, unit, note, noteIcon: NoteIcon, icon, tone = 'blue' }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-line-soft bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <span className="text-sm font-medium text-muted">{label}</span>
        <IconBox icon={icon} tone={tone} size="sm" />
      </div>
      <div className="flex items-baseline gap-1.5">
        <b className={cx('text-3xl font-extrabold tracking-tight', toneText[tone] ?? 'text-ink')}>{value}</b>
        {unit && <span className="text-sm font-medium text-muted">{unit}</span>}
      </div>
      {note && (
        <p className="flex items-center gap-1 text-xs font-medium text-subtle">
          {NoteIcon && <NoteIcon className="size-3.5 text-emerald-600" />}
          {note}
        </p>
      )}
    </div>
  );
}
