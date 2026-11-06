import { Link } from 'react-router-dom';
import { jadwalLomba } from '../../data/landing.js';
import { cx } from '../../lib/cx.js';
import { Eyebrow, InkArrow } from './Ink.jsx';
import Reveal from './Reveal.jsx';

export default function JadwalSection() {
  return (
    <Reveal as="section" id="jadwal" className="mx-auto max-w-[1240px] scroll-mt-6 px-4 pt-20 sm:px-8 lg:pt-24">
      <div className="reveal mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Jadwal Lomba</Eyebrow>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-[44px] sm:leading-[1.1]">Yang sedang dan akan dibuka</h2>
        </div>
        <span className="hidden items-center gap-1.5 text-[15px] text-muted md:flex">
          Lihat semua cabang <InkArrow className="rotate-[10deg]" />
        </span>
      </div>

      <div className="reveal overflow-hidden rounded-[22px] border-[1.5px] border-pen bg-white shadow-[6px_6px_0_var(--color-soft)]">
        {jadwalLomba.map((l, i) => {
          const buka = l.status === 'buka';
          return (
            <div
              key={l.cabang}
              className={cx(
                'grid grid-cols-[64px_1fr] items-center gap-x-4 gap-y-3 px-4 py-5 sm:px-6',
                'lg:grid-cols-[96px_1.6fr_1fr_1.2fr_1fr_150px] lg:gap-5 lg:px-7',
                i > 0 && 'border-t border-dashed border-line'
              )}
            >
              <div className={cx('grid size-16 place-items-center rounded-2xl text-center leading-none lg:size-[72px]', buka ? 'bg-navy text-white' : 'bg-soft text-navy')}>
                <div>
                  <b className="text-2xl font-extrabold lg:text-[26px]">{l.tgl}</b>
                  <small className={cx('mt-1 block text-[11px] font-bold tracking-widest', buka ? 'text-gold' : 'text-secondary')}>{l.bln}</small>
                </div>
              </div>

              <div>
                <div className="text-[11px] font-extrabold tracking-[0.12em] text-secondary">{l.cabang}</div>
                <h3 className="mt-1 text-base font-extrabold sm:text-[17px]">{l.nama}</h3>
                {/* info ringkas untuk layar kecil */}
                <p className="mt-1 text-xs font-semibold text-subtle lg:hidden">
                  {l.jenjang} • {l.kuota}
                </p>
              </div>

              <div className="hidden lg:block">
                <span className="inline-flex rounded-full bg-soft px-3 py-1 text-xs font-bold text-navy">{l.jenjang}</span>
              </div>

              <div className="hidden lg:block">
                <div className="h-2 overflow-hidden rounded bg-slate-100">
                  <i className="quota-bar block h-full rounded bg-navy" style={{ '--w': `${l.persen}%` }} />
                </div>
                <small className="mt-1.5 block text-xs font-semibold text-subtle">{l.kuota}</small>
              </div>

              <div className={cx('col-start-2 text-[13px] font-bold lg:col-start-auto', buka ? 'text-emerald-700' : 'text-subtle')}>
                {buka ? '● ' : '○ '}
                {l.info}
              </div>

              <Link
                to="/onboarding"
                className={cx(
                  'col-span-2 grid h-10 place-items-center rounded-xl text-[13px] font-bold lg:col-span-1',
                  buka ? 'bg-navy text-white hover:bg-primary' : 'border-[1.5px] border-line text-navy hover:bg-surface'
                )}
              >
                {buka ? 'Daftar' : 'Ingatkan Saya'}
              </Link>
            </div>
          );
        })}
      </div>
    </Reveal>
  );
}
