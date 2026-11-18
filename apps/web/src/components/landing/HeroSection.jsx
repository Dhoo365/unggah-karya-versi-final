import { Link } from 'react-router-dom';
import { IoArrowForwardOutline } from 'react-icons/io5';
import heroSvg from '../../assets/landing/hero.svg?raw';
import { lombaDibuka, lombaSegera } from '../../data/landing.js';
import Illustration from './Illustration.jsx';
import { Eyebrow, InkCircle } from './Ink.jsx';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-4 pb-12 lg:pb-16">
      {/* bentuk geometris latar (gaya B) */}
      <i aria-hidden className="absolute -bottom-48 -left-44 hidden size-[300px] rounded-full bg-gold lg:block" />
      <i aria-hidden className="absolute -bottom-20 left-14 hidden size-[120px] rotate-[18deg] bg-soft lg:block" />

      <div className="relative mx-auto grid max-w-[1240px] items-center gap-6 px-4 sm:px-8 lg:grid-cols-[1fr_1.02fr]">
        <div className="hero-intro">
          <Eyebrow>Sistem Unggah Karya Lomba</Eyebrow>
          <h1 className="mt-4 text-[40px] leading-[1.06] font-extrabold tracking-tight text-ink sm:text-[56px] xl:text-[64px]">
            Karya kamu layak dapat <InkCircle>panggung.</InkCircle>
          </h1>
          <p className="mt-6 max-w-[500px] text-base leading-relaxed text-muted sm:text-lg">
            Ikut lomba resmi Dinas Pendidikan Sulawesi Utara tanpa ribet: unggah karya bersama guru, dinilai juri secara
            terbuka, dan sertifikatnya langsung terbit.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#jadwal" className="inline-flex h-12 items-center gap-2 rounded-xl bg-navy px-6 text-[15px] font-bold text-white hover:bg-primary">
              Lihat Jadwal Lomba <IoArrowForwardOutline className="size-[18px]" />
            </a>
            <Link to="/onboarding" className="inline-flex h-12 items-center rounded-xl border-[1.5px] border-line bg-white px-6 text-[15px] font-bold text-navy hover:bg-surface">
              Baca Juknis
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3 text-sm font-semibold">
            <span className="text-subtle">Sedang dibuka:</span>
            {lombaDibuka.map((l) => (
              <span key={l} className="sticker">
                <i className="size-2 rounded-full bg-emerald-600" /> {l}
              </span>
            ))}
            {lombaSegera.map((l) => (
              <span key={l} className="sticker opacity-60">
                <i className="size-2 rounded-full bg-line" /> {l}
              </span>
            ))}
          </div>
        </div>

        <Illustration
          svg={heroSvg}
          label="Siswa juara mengangkat piala bersama teman dan dewan juri di depan Gunung Klabat"
          className="hero-art -mx-2 lg:-mr-10"
        />
      </div>
    </section>
  );
}
