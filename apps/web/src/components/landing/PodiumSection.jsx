import { useState } from 'react';
import { IoArrowForwardOutline, IoTrophyOutline } from 'react-icons/io5';
import { Modal } from '../feedback/index.js';
import bustAlvaro from '../../assets/landing/bust-alvaro.svg?raw';
import bustClarissa from '../../assets/landing/bust-clarissa.svg?raw';
import bustKezia from '../../assets/landing/bust-kezia.svg?raw';
import { papanJuara, podium, talentaLainnya } from '../../data/landing.js';
import { cx } from '../../lib/cx.js';
import Illustration from './Illustration.jsx';
import { Eyebrow } from './Ink.jsx';
import Reveal from './Reveal.jsx';

const potret = { alvaro: bustAlvaro, clarissa: bustClarissa, kezia: bustKezia };
// tinggi balok podium & warnanya per peringkat
const balok = {
  1: { h: 'h-[110px]', bg: 'bg-navy' },
  2: { h: 'h-[70px]', bg: 'bg-primary' },
  3: { h: 'h-[44px]', bg: 'bg-secondary' },
};

const medali = { 1: 'bg-gold text-gold-ink', 2: 'bg-slate-200 text-slate-700', 3: 'bg-amber-200 text-amber-900' };

export default function PodiumSection() {
  const [buka, setBuka] = useState(false);
  return (
    <Reveal as="section" id="juara" className="mx-auto max-w-[1240px] scroll-mt-24 px-4 pt-20 sm:px-8 lg:pt-24">
      <Modal open={buka} onClose={() => setBuka(false)} icon={IoTrophyOutline} tone="amber" title="Papan Juara 2026" subtitle={`10 besar dari ${talentaLainnya + 3} talenta terkurasi se-Sulawesi Utara`} size="lg">
        <ol className="space-y-2">
          {papanJuara.map((t) => (
            <li key={t.rank} className="ui-enter flex items-center gap-3 rounded-2xl border border-line-soft p-3" style={{ animationDelay: `${t.rank * 40}ms` }}>
              <span className={cx('grid size-10 shrink-0 place-items-center rounded-xl text-sm font-extrabold', medali[t.rank] ?? 'bg-surface text-subtle')}>#{t.rank}</span>
              <span className="min-w-0 flex-1">
                <b className="block truncate text-sm font-bold text-ink">{t.nama}</b>
                <small className="block truncate text-xs text-muted">{t.sekolah} • {t.bidang}</small>
              </span>
              <b className="text-lg font-extrabold text-navy tabular-nums">{t.skor}</b>
            </li>
          ))}
        </ol>
      </Modal>
      <div className="reveal mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Talenta Emas 2026</Eyebrow>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-[44px] sm:leading-[1.1]">Podium tahun ini</h2>
        </div>
        <button type="button" onClick={() => setBuka(true)} className="ui-press inline-flex h-11 items-center gap-2 rounded-xl border-[1.5px] border-line bg-white px-5 text-sm font-bold text-navy hover:bg-surface">
          Papan Juara Lengkap <IoArrowForwardOutline className="size-4" />
        </button>
      </div>

      <div className="grid items-end gap-6 sm:grid-cols-3 lg:grid-cols-[1fr_1.1fr_1fr_0.8fr]">
        {podium.map((p) => {
          const first = p.rank === 1;
          return (
            // di layar kecil juara 1 tampil paling atas
            <div key={p.key} className={cx('reveal', first ? 'order-first sm:order-none' : '')} style={{ '--d': `${(p.rank - 1) * 120}ms` }}>
              <article
                className={cx(
                  'podium-card overflow-hidden rounded-[22px] border-[1.5px] border-pen bg-white',
                  first ? 'shadow-[6px_6px_0_var(--color-gold)]' : 'shadow-[5px_5px_0_var(--color-soft)]'
                )}
              >
                <div className="relative">
                  <Illustration svg={potret[p.key]} label={`Potret ${p.nama}`} />
                  <span
                    className={cx(
                      'absolute top-3 left-3 rounded-full border-[1.5px] border-pen px-3 py-1 text-sm font-extrabold',
                      first ? 'bg-gold text-gold-ink' : 'bg-white text-navy'
                    )}
                  >
                    #{p.rank}
                  </span>
                </div>
                <div className="px-[18px] pt-4 pb-[18px]">
                  <h3 className="text-lg font-extrabold">{p.nama}</h3>
                  <span className="text-[13px] text-subtle">{p.sekolah}</span>
                  <div className="mt-3.5 flex items-center justify-between gap-2 border-t border-dashed border-line pt-3">
                    <span className="truncate rounded-full bg-[#eef3ff] px-2.5 py-1 text-xs font-bold text-navy">{p.bidang}</span>
                    <b className="text-2xl font-extrabold text-navy">{p.skor}</b>
                  </div>
                </div>
              </article>
              {/* balok podium (naik saat terlihat) */}
              <div className="mt-3.5 hidden overflow-hidden sm:block">
                <div className={cx('podium-step grid place-items-center rounded-t-[14px] text-3xl font-extrabold text-white', balok[p.rank].h, balok[p.rank].bg)}>
                  {p.rank}
                </div>
              </div>
            </div>
          );
        })}

        <button
          type="button"
          onClick={() => setBuka(true)}
          className="reveal flex flex-col text-left justify-between gap-6 self-start rounded-[22px] border-[1.5px] border-dashed border-pen bg-white p-6 transition-colors hover:bg-surface sm:col-span-3 lg:col-span-1 lg:mt-20 lg:h-[250px]"
          style={{ '--d': '360ms' }}
        >
          <span className="text-[13px] font-bold tracking-[0.1em] text-subtle">DAN LAINNYA</span>
          <div>
            <b className="text-[44px] leading-none font-extrabold text-navy">+{talentaLainnya}</b>
            <p className="mt-2 text-sm text-muted">talenta terkurasi dari 15 kab/kota</p>
          </div>
          <span className="inline-flex items-center gap-1.5 font-bold text-navy">
            Lihat semua <IoArrowForwardOutline className="size-4" />
          </span>
        </button>
      </div>
    </Reveal>
  );
}
