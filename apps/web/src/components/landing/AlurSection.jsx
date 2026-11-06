import vUnggah from '../../assets/landing/v-unggah.svg?raw';
import vValidasi from '../../assets/landing/v-validasi.svg?raw';
import vNilai from '../../assets/landing/v-nilai.svg?raw';
import vJuara from '../../assets/landing/v-juara.svg?raw';
import { alurKarya } from '../../data/landing.js';
import { cx } from '../../lib/cx.js';
import Illustration from './Illustration.jsx';
import { Eyebrow } from './Ink.jsx';
import Reveal from './Reveal.jsx';

const gambar = { unggah: vUnggah, validasi: vValidasi, nilai: vNilai, juara: vJuara };

export default function AlurSection() {
  return (
    <Reveal as="section" id="alur" className="mx-auto max-w-[1240px] scroll-mt-6 px-4 pt-20 sm:px-8 lg:pt-28">
      <div className="reveal mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Alur</Eyebrow>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-[44px] sm:leading-[1.1]">Perjalanan sebuah karya</h2>
        </div>
        <p className="max-w-[380px] text-[15px] leading-relaxed text-muted sm:text-base">
          Dari laptop siswa sampai panggung juara. Setiap tahap bisa dipantau siswa, guru, dan dinas.
        </p>
      </div>

      <div className="relative grid gap-x-6 gap-y-10 pb-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* jalur titik-titik yang "mengalir" (hanya di layar lebar) */}
        <svg aria-hidden viewBox="0 0 1180 120" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-[70px] hidden h-[120px] w-full lg:block">
          <path
            className="trail"
            d="M80 90 C 220 -10, 330 140, 440 60 S 700 -10, 760 70 S 1000 140, 1120 40"
            fill="none"
            stroke="#14275e"
            strokeWidth="2.6"
            strokeDasharray="2 10"
            strokeLinecap="round"
          />
        </svg>

        {alurKarya.map((s, i) => (
          <article
            key={s.key}
            className={cx('reveal stop relative', i % 2 === 1 && 'lg:mt-16')}
            style={{ '--d': `${i * 120}ms` }}
          >
            <span className="absolute top-1.5 left-2.5 z-10 grid size-[38px] place-items-center rounded-full border-2 border-pen bg-gold font-extrabold text-gold-ink">
              {i + 1}
            </span>
            <Illustration svg={gambar[s.key]} label={s.judul} className="stop-art mx-auto max-w-[300px]" />
            <h3 className="mt-2 text-lg font-extrabold sm:text-[19px]">{s.judul}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.isi}</p>
          </article>
        ))}
      </div>
    </Reveal>
  );
}
