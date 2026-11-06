import { IoArrowForwardOutline } from 'react-icons/io5';
import bustAlvaro from '../../assets/landing/bust-alvaro.svg?raw';
import bustClarissa from '../../assets/landing/bust-clarissa.svg?raw';
import bustKezia from '../../assets/landing/bust-kezia.svg?raw';
import { podium, talentaLainnya } from '../../data/landing.js';
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

export default function PodiumSection() {
  return (
    <Reveal as="section" id="juara" className="mx-auto max-w-[1240px] scroll-mt-6 px-4 pt-20 sm:px-8 lg:pt-24">
      <div className="reveal mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Talenta Emas 2026</Eyebrow>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-[44px] sm:leading-[1.1]">Podium tahun ini</h2>
        </div>
        <a href="#juara" className="inline-flex h-11 items-center gap-2 rounded-xl border-[1.5px] border-line bg-white px-5 text-sm font-bold text-navy hover:bg-surface">
          Papan Juara Lengkap <IoArrowForwardOutline className="size-4" />
        </a>
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

        <a
          href="#juara"
          className="reveal flex flex-col justify-between gap-6 self-start rounded-[22px] border-[1.5px] border-dashed border-pen bg-white p-6 transition-colors hover:bg-surface sm:col-span-3 lg:col-span-1 lg:mt-20 lg:h-[250px]"
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
        </a>
      </div>
    </Reveal>
  );
}
