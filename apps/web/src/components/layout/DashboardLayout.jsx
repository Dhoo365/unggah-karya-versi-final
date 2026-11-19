import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  IoCheckmarkDoneOutline,
  IoChevronDownOutline,
  IoCloseOutline,
  IoLogOutOutline,
  IoMenuOutline,
  IoNotificationsOffOutline,
  IoNotificationsOutline,
  IoPersonCircleOutline,
} from 'react-icons/io5';
import { Dropdown, useUi } from '../feedback/index.js';
import { toneSoft } from '../../lib/tones.js';
import { cx } from '../../lib/cx.js';

/*
  Kerangka halaman dashboard (dipakai portal Admin dan portal Juri).

  Di versi mobile navigasi ada di tab bar bawah. Di web, navigasi
  dipindah ke sidebar kiri. Di layar kecil sidebar disembunyikan
  dan dibuka lewat tombol menu.

  Props:
  - brand:    { icon, title, subtitle }
  - sections: [{ label, items: [{ to, label, icon, title, subtitle, end, dot }] }]
  - profile:  { initials, name, role, org, email }
  - footnote: teks kecil di bawah sidebar (wilayah/versi)
  - notifications: daftar notifikasi [{ id, icon, tone, judul, isi, waktu, to }]
  - profilePath: halaman profil (menu di pojok kanan atas)
*/
export default function DashboardLayout({ brand, sections, profile, footnote, notifications = [], profilePath }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const ui = useUi();
  const [dibaca, setDibaca] = useState([]);
  const belum = notifications.filter((n) => !dibaca.includes(n.id)).length;

  const keluar = async () => {
    const ok = await ui.confirm({
      title: 'Keluar dari portal?',
      message: 'Anda perlu masuk kembali untuk mengakses portal ini.',
      confirmLabel: 'Ya, Keluar',
      tone: 'danger',
      icon: IoLogOutOutline,
    });
    if (!ok) return;
    navigate('/onboarding');
    ui.toast({ title: 'Anda telah keluar', description: 'Sampai jumpa kembali di SIKARYA.', tone: 'info' });
  };

  // Tutup sidebar mobile setiap pindah halaman
  useEffect(() => setOpen(false), [pathname]);

  // Cari item navigasi yang sedang aktif untuk judul di header
  const items = sections.flatMap((s) => s.items);
  const current =
    items.find((i) => (i.end ? pathname === i.to : pathname.startsWith(i.to))) ?? items[0];

  const BrandIcon = brand.icon;

  return (
    <div className="min-h-screen bg-surface text-ink">
      {/* Latar gelap saat sidebar dibuka di layar kecil */}
      <div
        className={cx('fixed inset-0 z-30 bg-navy-dark/40 transition-opacity duration-200 lg:hidden', open ? 'opacity-100' : 'pointer-events-none opacity-0')}
        onClick={() => setOpen(false)}
      />

      {/* ============ SIDEBAR ============ */}
      <aside
        className={cx(
          'fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-line-soft bg-white transition-transform duration-300 ease-out',
          'lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-16 items-center justify-between gap-3 border-b border-line-soft px-5">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-navy text-white">
              <BrandIcon className="size-5" />
            </div>
            <div className="leading-tight">
              <strong className="block text-[15px] font-extrabold text-navy">{brand.title}</strong>
              <span className="flex items-center gap-1.5 text-xs text-muted">
                <i className="size-1.5 rounded-full bg-emerald-500" />
                {brand.subtitle}
              </span>
            </div>
          </div>
          <button
            type="button"
            className="grid size-9 place-items-center rounded-lg text-muted hover:bg-surface lg:hidden"
            onClick={() => setOpen(false)}
            aria-label="Tutup menu"
          >
            <IoCloseOutline className="size-6" />
          </button>
        </div>

        <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
          {sections.map((section) => (
            <div key={section.label}>
              <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-subtle">
                {section.label}
              </p>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.end}
                      className={({ isActive }) =>
                        cx(
                          'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors',
                          isActive ? 'bg-soft text-navy' : 'text-muted hover:bg-surface hover:text-ink'
                        )
                      }
                    >
                      <item.icon className="size-5 shrink-0" />
                      <span className="flex-1">{item.label}</span>
                      {item.dot && <i className="size-2 rounded-full bg-red-500" />}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="space-y-3 border-t border-line-soft p-4">
          <div className="rounded-xl bg-surface p-3">
            <strong className="block text-sm font-bold text-ink">{profile.name}</strong>
            <span className="block text-xs text-muted">{profile.org}</span>
            {profile.email && <small className="mt-1 block text-xs text-subtle">{profile.email}</small>}
            {footnote && (
              <div className="mt-2 flex items-center justify-between border-t border-line-soft pt-2 text-[11px] text-subtle">
                <span>{footnote.left}</span>
                <b className="font-semibold text-muted">{footnote.right}</b>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={keluar}
            className="ui-press flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-50"
          >
            <IoLogOutOutline className="size-5" />
            Keluar Portal
          </button>
        </div>
      </aside>

      {/* ============ AREA KONTEN ============ */}
      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line-soft bg-white/90 px-4 backdrop-blur sm:px-6 lg:px-8">
          <button
            type="button"
            className="grid size-10 place-items-center rounded-xl text-ink hover:bg-surface lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Buka menu"
          >
            <IoMenuOutline className="size-6" />
          </button>

          <div className="min-w-0 flex-1">
            <h1 className="truncate text-base font-bold text-ink sm:text-lg">{current.title ?? current.label}</h1>
            {current.subtitle && <p className="truncate text-xs text-muted">{current.subtitle}</p>}
          </div>

          {/* ---------- Notifikasi ---------- */}
          <Dropdown
            panelClassName="fixed inset-x-3 top-16 sm:absolute sm:inset-x-auto sm:top-full sm:right-0 sm:w-96"
            trigger={({ open: buka, toggle }) => (
              <button
                type="button"
                onClick={toggle}
                aria-expanded={buka}
                aria-label={`Notifikasi, ${belum} belum dibaca`}
                className={cx('ui-bell ui-press relative grid size-10 place-items-center rounded-xl text-muted hover:bg-surface', buka && 'bg-surface text-navy')}
              >
                <IoNotificationsOutline className="size-[22px]" />
                {belum > 0 && (
                  <span className="absolute top-1 right-1 grid min-w-4 place-items-center rounded-full bg-red-600 px-1 text-[10px] leading-4 font-bold text-white ring-2 ring-white">
                    {belum}
                  </span>
                )}
              </button>
            )}
          >
            {(tutup) => (
              <div>
                <div className="flex items-center justify-between border-b border-line-soft px-4 py-3">
                  <b className="text-sm font-bold text-ink">Notifikasi</b>
                  {belum > 0 && (
                    <button type="button" onClick={() => setDibaca(notifications.map((n) => n.id))} className="inline-flex items-center gap-1 text-xs font-bold text-navy hover:underline">
                      <IoCheckmarkDoneOutline className="size-4" /> Tandai semua dibaca
                    </button>
                  )}
                </div>
                {notifications.length ? (
                  <ul className="max-h-[60vh] divide-y divide-line-soft overflow-y-auto">
                    {notifications.map((n) => {
                      const baru = !dibaca.includes(n.id);
                      const Icon = n.icon;
                      return (
                        <li key={n.id}>
                          <button
                            type="button"
                            onClick={() => { setDibaca((d) => [...new Set([...d, n.id])]); tutup(); n.to && navigate(n.to); }}
                            className={cx('flex w-full gap-3 px-4 py-3 text-left hover:bg-surface', baru && 'bg-soft/30')}
                          >
                            <span className={cx('grid size-9 shrink-0 place-items-center rounded-xl', toneSoft[n.tone] ?? toneSoft.blue)}>
                              <Icon className="size-5" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <b className={cx('block text-sm leading-snug text-ink', baru ? 'font-bold' : 'font-medium')}>{n.judul}</b>
                              <small className="block text-xs text-muted">{n.isi}</small>
                              <small className="mt-0.5 block text-[11px] text-subtle">{n.waktu}</small>
                            </span>
                            {baru && <i className="mt-1.5 size-2 shrink-0 rounded-full bg-navy" />}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="flex flex-col items-center gap-2 px-4 py-8 text-center text-sm text-muted">
                    <IoNotificationsOffOutline className="size-8 text-subtle" /> Belum ada notifikasi.
                  </p>
                )}
              </div>
            )}
          </Dropdown>

          {/* ---------- Menu profil ---------- */}
          <Dropdown
            className="border-l border-line-soft pl-3"
            items={[
              ...(profilePath ? [{ label: 'Profil Saya', icon: IoPersonCircleOutline, onClick: () => navigate(profilePath) }, { divider: true }] : []),
              { label: 'Keluar Portal', icon: IoLogOutOutline, tone: 'danger', onClick: keluar },
            ]}
            trigger={({ open: buka, toggle }) => (
              <button type="button" onClick={toggle} aria-expanded={buka} aria-haspopup="menu" className="ui-press flex items-center gap-3 rounded-xl p-1 pr-2 hover:bg-surface">
                <div className="grid size-9 place-items-center rounded-full bg-navy text-xs font-bold text-white">
                  {profile.initials}
                </div>
                <div className="hidden text-left leading-tight md:block">
                  <strong className="block text-sm font-semibold text-ink">{profile.name}</strong>
                  <span className="text-xs text-muted">{profile.role}</span>
                </div>
                <IoChevronDownOutline className={cx('hidden size-4 text-subtle transition-transform md:block', buka && 'rotate-180')} />
              </button>
            )}
          />
        </header>

        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
