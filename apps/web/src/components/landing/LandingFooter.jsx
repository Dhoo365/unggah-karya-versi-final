import { Link } from 'react-router-dom';
import { IoArrowForwardOutline } from 'react-icons/io5';
import skylineSvg from '../../assets/landing/skyline.svg?raw';
import Illustration from './Illustration.jsx';
import { InkUnderline } from './Ink.jsx';
import Reveal from './Reveal.jsx';

const kolom = [
  { judul: 'LOMBA', isi: ['FLS2N', 'O2SN', 'KIR & OSN', 'LKS Vokasi'] },
  { judul: 'PLATFORM', isi: ['Jadwal Lomba', 'Alur', 'Papan Juara', 'Masuk Portal'] },
  { judul: 'KONTAK', isi: ['Manado, Sulawesi Utara', 'helpdesk@sikarya.id'] },
];

export default function LandingFooter() {
  return (
    <>
      {/* ajakan penutup */}
      <Reveal as="section" className="mt-24 lg:mt-28">
        <div className="reveal mx-auto max-w-[1240px] px-4 pb-8 text-center sm:px-8">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-[52px] sm:leading-[1.08]">
            Siap naik <InkUnderline>panggung?</InkUnderline>
          </h2>
          <p className="mx-auto mt-4 mb-7 max-w-[560px] leading-relaxed text-muted sm:text-[17px]">
            Daftarkan dirimu sekarang. Guru pembimbing bisa menyusul mendampingi dari akunnya sendiri.
          </p>
          <Link to="/onboarding" className="inline-flex h-12 items-center gap-2 rounded-xl bg-gold px-6 text-[15px] font-bold text-gold-ink hover:brightness-95">
            Daftar Sekarang <IoArrowForwardOutline className="size-[18px]" />
          </Link>
        </div>
        <Illustration svg={skylineSvg} label="Siluet Gunung Klabat, Jembatan Soekarno, dan kota Manado" className="skyline" />
      </Reveal>

      <footer className="-mt-px bg-navy-dark pt-14 pb-8 text-[#a9b8de]">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <div className="flex items-center gap-2.5">
                <img src="/assets/Logo.png" alt="" className="size-10 rounded-[10px] bg-white object-contain p-1" />
                <b className="text-lg font-extrabold tracking-wide text-white">SIKARYA</b>
              </div>
              <p className="mt-4 max-w-[320px] text-sm leading-relaxed">
                Sistem Unggah Karya Lomba pelajar Sulawesi Utara, dikelola Dinas Pendidikan Daerah Provinsi Sulawesi Utara.
              </p>
            </div>
            {kolom.map((k) => (
              <div key={k.judul}>
                <h4 className="mb-4 text-[13px] font-bold tracking-[0.12em] text-white">{k.judul}</h4>
                <ul className="space-y-2.5 text-sm">
                  {k.isi.map((x) => (
                    <li key={x}>{x === 'Masuk Portal' ? <Link to="/onboarding" className="hover:text-white">{x}</Link> : x}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-between gap-3 border-t border-white/10 pt-5 text-[13px]">
            <span>© 2026 SIKARYA • Dikda Provinsi Sulawesi Utara</span>
            <span>Kebijakan Privasi</span>
          </div>
        </div>
      </footer>
    </>
  );
}
