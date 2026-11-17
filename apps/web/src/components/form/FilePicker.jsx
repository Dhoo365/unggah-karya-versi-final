import { useRef } from 'react';
import { IoCheckmarkCircle, IoCloudUploadOutline, IoDocumentOutline, IoSwapHorizontalOutline } from 'react-icons/io5';
import { cx } from '../../lib/cx.js';

const MB = 1024 * 1024;
export const formatSize = (b) => (b >= MB ? (b / MB).toFixed(1) + ' MB' : Math.ceil(b / 1024) + ' KB');

/*
  Pemilih berkas dengan cek format & ukuran.
  - accept: daftar MIME yang diizinkan, mis. ['image/jpeg','image/png','application/pdf']
  - maxMB : batas ukuran
  - onPick(file | null, pesanError)
*/
export default function FilePicker({ file, onPick, accept, maxMB = 2, error, title, hint, readyLabel = 'Siap diunggah' }) {
  const ref = useRef(null);

  const pick = (e) => {
    const f = e.target.files?.[0];
    e.target.value = '';
    if (!f) return;
    if (accept && !accept.includes(f.type)) return onPick(null, 'Format berkas tidak sesuai ketentuan.');
    if (f.size > maxMB * MB) return onPick(null, `Ukuran berkas maksimum ${maxMB} MB.`);
    onPick(f, '');
  };

  return (
    <>
      <input ref={ref} type="file" accept={accept?.join(',')} onChange={pick} className="sr-only" tabIndex={-1} />
      {file ? (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <IoDocumentOutline className="size-6 shrink-0 text-emerald-700" />
          <div className="min-w-0 flex-1">
            <b className="block truncate text-sm font-semibold text-ink">{file.name}</b>
            <small className="flex items-center gap-1 text-xs text-emerald-700">
              <IoCheckmarkCircle className="size-3.5" /> {formatSize(file.size)} • {readyLabel}
            </small>
          </div>
          <button type="button" onClick={() => ref.current?.click()} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold text-navy hover:bg-white">
            <IoSwapHorizontalOutline className="size-4" /> Ganti
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className={cx(
            'flex w-full flex-col items-center gap-2 rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors',
            error ? 'border-red-300 bg-red-50/40' : 'border-line bg-surface hover:border-navy hover:bg-soft/30'
          )}
        >
          <span className="grid size-12 place-items-center rounded-full bg-white text-navy shadow-sm">
            <IoCloudUploadOutline className="size-6" />
          </span>
          <b className="text-sm font-bold text-ink">{title}</b>
          {hint && <small className="text-xs text-subtle">{hint}</small>}
        </button>
      )}
    </>
  );
}
