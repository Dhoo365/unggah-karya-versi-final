import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoArrowForwardOutline, IoCloseOutline, IoMenuOutline } from 'react-icons/io5';
import { navLinks, pengumumanAtas } from '../../data/landing.js';
import { cx } from '../../lib/cx.js';

/*
  Navbar landing page — gaya kapsul mengambang.
  - Pita pengumuman ikut tergulir.
  - Navbar berupa kapsul putih yang terlepas dari tepi layar dan menempel saat di-scroll.
  - Bayangan menebal begitu halaman mulai digulir.
*/
export default function LandingNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* pita pengumuman */}
      <div className="bg-navy px-4 py-2.5 text-center text-xs font-semibold text-white sm:text-[13px]">
        <b className="text-gold">{pengumumanAtas.sorot}</b> {pengumumanAtas.teks}
      </div>

      <header className="sticky top-3 z-40 mt-3 px-3 sm:px-6">
        <nav
          className={cx(
            'relative mx-auto flex h-16 max-w-[1120px] items-center justify-between gap-4 rounded-2xl border bg-white/95 pr-2 pl-4 backdrop-blur-md transition-shadow duration-300 sm:pl-5',
            scrolled
              ? 'border-line-soft shadow-[0_14px_34px_-16px_rgba(0,26,110,0.35)]'
              : 'border-line-soft shadow-[0_6px_20px_-14px_rgba(0,26,110,0.25)]'
          )}
        >
          <Link to="/" className="flex shrink-0 items-center gap-2.5">
            <img src="/assets/Logo.png" alt="" className="size-9 object-contain" />
            <span className="leading-tight">
              <b className="block text-[17px] font-extrabold tracking-wide text-navy">SIKARYA</b>
              <small className="hidden text-[11px] font-semibold text-subtle sm:block">Dikda Sulawesi Utara</small>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 text-sm font-semibold text-muted lg:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="nav-link relative block px-4 py-2 transition-colors hover:text-navy">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            <Link to="/onboarding" className="hidden h-11 items-center rounded-xl px-4 text-sm font-bold text-navy hover:bg-surface sm:inline-flex">
              Masuk
            </Link>
            <Link
              to="/onboarding"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-navy px-4 text-sm font-bold text-white transition-colors hover:bg-primary sm:px-5"
            >
              Daftar <IoArrowForwardOutline className="hidden size-4 sm:block" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="grid size-11 place-items-center rounded-xl text-navy hover:bg-surface lg:hidden"
              aria-label={open ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={open}
            >
              {open ? <IoCloseOutline className="size-6" /> : <IoMenuOutline className="size-6" />}
            </button>
          </div>

          {/* menu layar kecil: kartu yang turun di bawah kapsul */}
          <div
            className={cx(
              'absolute inset-x-0 top-full mt-2 rounded-2xl border border-line-soft bg-white p-3 shadow-[0_14px_34px_-16px_rgba(0,26,110,0.35)] lg:hidden',
              open ? 'block' : 'hidden'
            )}
          >
            <ul>
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 font-semibold text-ink hover:bg-surface">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <Link to="/onboarding" className="mt-2 grid h-11 place-items-center rounded-xl border-[1.5px] border-line font-bold text-navy sm:hidden">
              Masuk
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}
