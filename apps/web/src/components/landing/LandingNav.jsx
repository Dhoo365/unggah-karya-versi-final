import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoCloseOutline, IoMenuOutline } from 'react-icons/io5';
import { navLinks, pengumumanAtas } from '../../data/landing.js';
import { cx } from '../../lib/cx.js';

export default function LandingNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-30">
      {/* pita pengumuman */}
      <div className="bg-navy px-4 py-2.5 text-center text-xs font-semibold text-white sm:text-[13px]">
        <b className="text-gold">{pengumumanAtas.sorot}</b> {pengumumanAtas.teks}
      </div>

      <nav className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-4 sm:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/assets/Logo.png" alt="" className="size-9 object-contain" />
          <span className="leading-tight">
            <b className="block text-lg font-extrabold tracking-wide text-navy">SIKARYA</b>
            <small className="block text-[11px] font-semibold text-subtle">Dikda Sulawesi Utara</small>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 text-sm font-semibold text-muted lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-navy">{l.label}</a>
            </li>
          ))}
        </ul>

        <div className="hidden gap-2.5 sm:flex">
          <Link to="/onboarding" className="inline-flex h-[42px] items-center rounded-xl border-[1.5px] border-line bg-white px-5 text-sm font-bold text-navy hover:bg-surface">
            Masuk
          </Link>
          <Link to="/onboarding" className="inline-flex h-[42px] items-center rounded-xl bg-navy px-5 text-sm font-bold text-white hover:bg-primary">
            Daftar
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="grid size-10 place-items-center rounded-xl text-navy hover:bg-white lg:hidden"
          aria-label={open ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={open}
        >
          {open ? <IoCloseOutline className="size-7" /> : <IoMenuOutline className="size-7" />}
        </button>
      </nav>

      {/* menu layar kecil */}
      <div className={cx('absolute inset-x-0 top-full border-y border-line-soft bg-white px-4 py-4 shadow-lg lg:hidden', open ? 'block' : 'hidden')}>
        <ul className="space-y-1">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 font-semibold text-ink hover:bg-surface">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:hidden">
          <Link to="/onboarding" className="grid h-11 place-items-center rounded-xl border-[1.5px] border-line font-bold text-navy">Masuk</Link>
          <Link to="/onboarding" className="grid h-11 place-items-center rounded-xl bg-navy font-bold text-white">Daftar</Link>
        </div>
      </div>
    </header>
  );
}
