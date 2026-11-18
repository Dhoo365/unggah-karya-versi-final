import { Link } from 'react-router-dom';
import { cx } from '../../lib/cx.js';

/*
  Kerangka halaman akun (pendaftaran, verifikasi, status akun) untuk Siswa & Guru.
  Halaman-halaman ini dibuka sebelum pengguna masuk portal, jadi tidak memakai sidebar.

  Props:
  - title     : judul kecil di bar atas (mis. "Status Akun Siswa")
  - badge     : elemen di kanan bar atas (mis. <Pill>)
  - aside     : kolom samping (desktop) berisi info/langkah
  - children  : isi utama
*/
export default function AccountLayout({ title, badge, aside, children, wide = false }) {
  return (
    <div className="min-h-screen bg-surface text-ink">
      <header className="sticky top-0 z-30 border-b border-line-soft bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/assets/Logo.png" alt="" className="size-9 object-contain" />
            <span className="leading-tight">
              <b className="block text-[15px] font-extrabold tracking-wide text-navy">SIKARYA Dikda Sulut</b>
              <small className="block text-[11px] font-semibold text-subtle">{title ?? 'Provinsi Sulawesi Utara'}</small>
            </span>
          </Link>
          {badge}
        </div>
      </header>

      <main className={cx('mx-auto grid gap-8 px-4 py-8 sm:px-6 lg:py-12', aside ? 'max-w-6xl lg:grid-cols-[1fr_340px]' : wide ? 'max-w-5xl' : 'max-w-3xl')}>
        <div className="min-w-0 space-y-6">{children}</div>
        {aside && <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">{aside}</aside>}
      </main>

      <footer className="border-t border-line-soft py-6 text-center text-xs leading-relaxed text-subtle">
        © 2026 Dinas Pendidikan Daerah Provinsi Sulawesi Utara
        <br />
        Sistem Informasi Karya & Talenta Siswa (SIKARYA)
      </footer>
    </div>
  );
}

// Daftar data berlabel (dt/dd) untuk ringkasan pengajuan
export function InfoList({ rows }) {
  return (
    <dl className="divide-y divide-line-soft">
      {rows.map(([k, v, cls]) => (
        <div key={k} className="grid grid-cols-[150px_1fr] gap-4 py-3 text-sm sm:grid-cols-[200px_1fr]">
          <dt className="text-subtle">{k}</dt>
          <dd className={cx('min-w-0 font-semibold text-ink [overflow-wrap:anywhere]', cls)}>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

// Langkah bernomor (dipakai di panel samping)
export function StepList({ items }) {
  return (
    <ol className="space-y-4">
      {items.map((s, i) => (
        <li key={s.judul ?? i} className="flex gap-3">
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-navy text-xs font-bold text-white">{i + 1}</span>
          <div className="text-sm">
            {s.judul && <b className="block font-semibold text-ink">{s.judul}</b>}
            <span className="leading-relaxed text-muted">{s.isi}</span>
          </div>
        </li>
      ))}
    </ol>
  );
}
