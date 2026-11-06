import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IoArrowBackOutline,
  IoArrowForwardOutline,
  IoBookOutline,
  IoBusinessOutline,
  IoCarSportOutline,
  IoCheckmarkCircle,
  IoCloudUploadOutline,
  IoDocumentTextOutline,
  IoFlagOutline,
  IoFlaskOutline,
  IoFootballOutline,
  IoHammerOutline,
  IoLocationOutline,
  IoMusicalNotesOutline,
  IoSchoolOutline,
  IoShieldCheckmarkOutline,
} from 'react-icons/io5';
import { cx } from '../../lib/cx.js';

/*
  Halaman pengenalan (onboarding).
  Versi mobile memakai 2 halaman terpisah (OnboardingPage & OnBoardingSlide2).
  Di web keduanya digabung menjadi satu halaman dengan langkah 1 dan 2.
  Kiri: panel visual. Kanan: penjelasan dan tombol.
*/

const slides = [
  {
    step: 'Temukan Kompetisi',
    title: 'Panggung Talenta Pelajar',
    titleAccent: 'Sulawesi Utara',
    description:
      'Jelajahi puluhan cabang lomba seni, teknologi, sains, dan vokasi tingkat daerah hingga nasional secara resmi dan terpadu.',
    features: [
      { title: 'Sinkron Dapodik', subtitle: 'Validasi NISN instan', icon: IoCheckmarkCircle, tone: 'text-emerald-600 bg-emerald-50' },
      { title: 'Juknis Resmi', subtitle: 'Panduan terbuka untuk semua', icon: IoDocumentTextOutline, tone: 'text-navy bg-soft' },
    ],
    Visual: CompetitionVisual,
  },
  {
    step: 'Kurasi & Validasi',
    title: 'Unggah Karya Praktis',
    titleAccent: 'Bersama Pembimbing',
    description:
      'Kirim video sinopsis, naskah inovasi, dan portofolio dengan supervisi guru Anda. Berkas otomatis terverifikasi sebelum masuk ke meja dewan juri Dikda Sulut.',
    features: [
      {
        title: 'Validasi Otomatis Pra-Submit',
        subtitle: 'Mencegah kesalahan format, kuota file, atau legalitas yang tidak lengkap.',
        icon: IoShieldCheckmarkOutline,
        tone: 'text-navy bg-soft',
      },
      {
        title: 'Status & Catatan Revisi Real-Time',
        subtitle: 'Arahan perbaikan langsung dari pembimbing via notifikasi sistem.',
        icon: IoCloudUploadOutline,
        tone: 'text-secondary bg-ice',
      },
    ],
    Visual: UploadVisual,
  },
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const isLast = index === slides.length - 1;
  const Visual = slide.Visual;

  const next = () => (isLast ? navigate('/admin') : setIndex(index + 1));
  const back = () => setIndex(Math.max(0, index - 1));

  return (
    <div className="grid min-h-screen bg-white lg:grid-cols-2">
      {/* ================= PANEL KIRI (visual) ================= */}
      <section className="relative flex flex-col overflow-hidden bg-gradient-to-br from-navy-dark via-navy to-primary px-6 py-6 text-white sm:px-10 lg:py-10">
        <i className="pointer-events-none absolute -top-32 -right-24 size-96 rounded-full bg-secondary/40 blur-3xl" />
        <i className="pointer-events-none absolute -bottom-40 -left-24 size-96 rounded-full bg-gold/20 blur-3xl" />

        <header className="relative flex items-center gap-3">
          <img src="/assets/Logo.png" alt="Logo SIKARYA" className="size-11 rounded-xl bg-white object-contain p-1" />
          <div className="leading-tight">
            <strong className="block text-lg font-extrabold tracking-wide">SIKARYA</strong>
            <span className="text-xs text-white/70">Dikda Sulawesi Utara</span>
          </div>
        </header>

        <div className="relative flex flex-1 items-center justify-center py-10">
          <Visual />
        </div>

        <footer className="relative hidden items-center gap-2 text-xs text-white/70 lg:flex">
          <IoBusinessOutline className="size-4" />
          Dinas Pendidikan Daerah Provinsi Sulawesi Utara
        </footer>
      </section>

      {/* ================= PANEL KANAN (penjelasan) ================= */}
      <section className="flex flex-col px-6 py-6 sm:px-10 lg:px-16 lg:py-10">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate('/admin')}
            className="rounded-lg px-3 py-2 text-sm font-semibold text-muted hover:bg-surface hover:text-ink"
          >
            Lewati
          </button>
        </div>

        <div className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center py-8">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-soft px-3 py-1.5 text-xs font-bold text-navy">
            <IoFlagOutline className="size-4" />
            Langkah {index + 1} dari {slides.length} • {slide.step}
          </span>

          <h1 className="mt-5 text-4xl leading-tight font-extrabold tracking-tight text-ink sm:text-5xl">
            {slide.title}
            <span className="block text-navy">{slide.titleAccent}</span>
          </h1>

          <p className="mt-4 text-base leading-relaxed text-muted">{slide.description}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {slide.features.map((f) => (
              <div key={f.title} className="flex gap-3 rounded-2xl border border-line-soft p-4">
                <div className={cx('grid size-10 shrink-0 place-items-center rounded-xl', f.tone)}>
                  <f.icon className="size-5" />
                </div>
                <div>
                  <strong className="block text-sm font-bold text-ink">{f.title}</strong>
                  <span className="text-xs leading-relaxed text-muted">{f.subtitle}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <div className="flex gap-2" role="tablist" aria-label="Langkah pengenalan">
              {slides.map((s, i) => (
                <button
                  key={s.step}
                  type="button"
                  aria-label={`Langkah ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={cx('h-2 rounded-full transition-all', i === index ? 'w-8 bg-navy' : 'w-2 bg-line')}
                />
              ))}
            </div>

            <div className="ml-auto flex gap-3">
              {index > 0 && (
                <button
                  type="button"
                  onClick={back}
                  className="inline-flex h-12 items-center gap-2 rounded-xl border border-line px-5 text-sm font-semibold text-navy hover:bg-surface"
                >
                  <IoArrowBackOutline className="size-5" />
                  Kembali
                </button>
              )}
              <button
                type="button"
                onClick={next}
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-navy px-6 text-sm font-semibold text-white shadow-lg shadow-navy/20 hover:bg-primary"
              >
                {isLast ? 'Masuk Portal Admin' : `Lanjut (${index + 1}/${slides.length})`}
                <IoArrowForwardOutline className="size-5" />
              </button>
            </div>
          </div>

          {isLast && (
            <button
              type="button"
              onClick={() => navigate('/juri')}
              className="mt-4 inline-flex w-fit items-center gap-2 self-end text-sm font-semibold text-secondary hover:underline"
            >
              <IoHammerOutline className="size-4" />
              Masuk sebagai Dewan Juri
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

/* ---------- Visual langkah 1: kompetisi ---------- */
function CompetitionVisual() {
  const [imgOk, setImgOk] = useState(true);
  const competitions = [
    { label: 'FLS3N', icon: IoMusicalNotesOutline },
    { label: 'O2SN', icon: IoFootballOutline },
    { label: 'JURDOL', icon: IoFlaskOutline },
    { label: 'DRAG RACE', icon: IoCarSportOutline },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-secondary to-navy-dark shadow-2xl ring-1 ring-white/20">
        {imgOk ? (
          <img
            src="/assets/onboarding/slide-1.jpg"
            alt="Siswa di puncak gunung Sulawesi Utara"
            className="size-full object-cover"
            onError={() => setImgOk(false)}
          />
        ) : (
          // Gambar pengganti jika foto slide-1.jpg belum ada
          <svg viewBox="0 0 400 300" className="absolute inset-0 size-full" aria-hidden>
            <circle cx="300" cy="80" r="36" fill="#ffba38" opacity="0.9" />
            <path d="M0 300 L110 130 L170 210 L240 110 L400 300 Z" fill="#ffffff" opacity="0.12" />
            <path d="M0 300 L80 200 L150 250 L260 160 L400 300 Z" fill="#ffffff" opacity="0.18" />
          </svg>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-transparent to-transparent" />

        <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-navy-dark/70 px-3 py-1.5 text-xs font-semibold backdrop-blur">
          <IoSchoolOutline className="size-4" /> Jenjang SMA • SMK
        </span>
        <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 text-xs font-medium">
          <IoLocationOutline className="size-4" /> 15 Kab / Kota Sulawesi Utara
        </span>
        <span className="absolute right-4 bottom-4 text-xs font-bold">2026/2027</span>
      </div>

      <ul className="mt-5 flex flex-wrap justify-center gap-2">
        {competitions.map((c) => (
          <li
            key={c.label}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold ring-1 ring-white/20 backdrop-blur"
          >
            <c.icon className="size-4 text-gold" />
            {c.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Visual langkah 2: unggah karya ---------- */
function UploadVisual() {
  const files = [
    { top: 'MP4', bottom: 'Video', cls: 'bg-soft text-navy' },
    { top: 'PDF', bottom: 'Naskah', cls: 'bg-soft text-navy' },
    { top: 'ZIP', bottom: 'Data', cls: 'bg-slate-100 text-slate-600' },
  ];

  return (
    <div className="w-full max-w-md rounded-3xl bg-white p-6 text-ink shadow-2xl">
      <div className="grid grid-cols-4 gap-3">
        {files.map((f) => (
          <div key={f.top} className={cx('rounded-xl px-2 py-3 text-center', f.cls)}>
            <b className="block text-sm font-extrabold">{f.top}</b>
            <span className="text-[11px] font-semibold uppercase">{f.bottom}</span>
          </div>
        ))}
        <div className="flex flex-col items-center justify-center rounded-xl bg-emerald-50 px-2 py-3 text-center text-emerald-700">
          <IoCloudUploadOutline className="size-5" />
          <span className="text-[11px] leading-tight font-semibold">Enkripsi SSL</span>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3 rounded-2xl border border-line-soft p-4">
        <div className="grid size-11 shrink-0 place-items-center rounded-full bg-soft text-navy">
          <IoBookOutline className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <strong className="block truncate text-sm font-bold">Drs. Mott Versteppen, S.T</strong>
          <span className="text-xs text-muted">Guru Pembimbing • SMAN 7</span>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
          <i className="size-1.5 rounded-full bg-emerald-500" />
          NUPTK Sah
        </span>
      </div>

      <div className="mt-4">
        <div className="mb-1.5 flex justify-between text-xs">
          <span className="font-medium text-muted">Mengunggah Video_Karya_Final.mp4</span>
          <b className="text-navy">72%</b>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-[72%] rounded-full bg-navy" />
        </div>
      </div>
    </div>
  );
}
