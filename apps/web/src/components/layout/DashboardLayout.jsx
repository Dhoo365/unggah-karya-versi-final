import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { IoCloseOutline, IoLogOutOutline, IoMenuOutline, IoNotificationsOutline } from 'react-icons/io5';
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
*/
export default function DashboardLayout({ brand, sections, profile, footnote, notifications = 0 }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

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
        className={cx('fixed inset-0 z-30 bg-navy-dark/40 lg:hidden', open ? 'block' : 'hidden')}
        onClick={() => setOpen(false)}
      />

      {/* ============ SIDEBAR ============ */}
      <aside
        className={cx(
          'fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-line-soft bg-white transition-transform duration-200',
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
            onClick={() => navigate('/onboarding')}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-50"
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

          <button
            type="button"
            className="relative grid size-10 place-items-center rounded-xl text-muted hover:bg-surface"
            aria-label="Notifikasi"
          >
            <IoNotificationsOutline className="size-[22px]" />
            {notifications > 0 && (
              <span className="absolute top-1 right-1 grid min-w-4 place-items-center rounded-full bg-red-600 px-1 text-[10px] leading-4 font-bold text-white">
                {notifications}
              </span>
            )}
          </button>

          <div className="flex items-center gap-3 border-l border-line-soft pl-3">
            <div className="grid size-9 place-items-center rounded-full bg-navy text-xs font-bold text-white">
              {profile.initials}
            </div>
            <div className="hidden leading-tight md:block">
              <strong className="block text-sm font-semibold text-ink">{profile.name}</strong>
              <span className="text-xs text-muted">{profile.role}</span>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
