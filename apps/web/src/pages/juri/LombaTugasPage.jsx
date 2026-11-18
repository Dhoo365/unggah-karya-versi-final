import { useState } from 'react';
import {
  IoAlarmOutline,
  IoDocumentTextOutline,
  IoDownloadOutline,
  IoKeyOutline,
  IoMegaphoneOutline,
} from 'react-icons/io5';
import {
  Button,
  Card,
  FilterChips,
  Pill,
  ProgressBar,
  SectionHeader,
} from '../../components/ui/index.js';
import { cx } from '../../lib/cx.js';
import { toneSoft, toneText } from '../../lib/tones.js';
import { juriProfile, lombaFilters, lombaTugas, recap } from '../../data/juri.js';

const percent = (l) => Math.round((l.done / l.total) * 100);

// Beranda portal Juri (versi mobile: JuriLombaTugas.vue)
export default function LombaTugasPage() {
  const [filter, setFilter] = useState(lombaFilters[0]);

  return (
    <div className="space-y-8">
      {/* ---------- Profil & tenggat ---------- */}
      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="flex flex-col gap-5 sm:flex-row sm:items-center lg:col-span-2">
          <div className="relative shrink-0">
            {juriProfile.photo ? (
              <img src={juriProfile.photo} alt={juriProfile.name} className="size-20 rounded-2xl object-cover" />
            ) : (
              <div className="grid size-20 place-items-center rounded-2xl bg-navy text-2xl font-extrabold text-white">
                {juriProfile.initials}
              </div>
            )}
            <i className="absolute -right-1 -bottom-1 size-5 rounded-full border-4 border-white bg-emerald-500" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-extrabold text-ink">{juriProfile.name}</h2>
            <b className="block text-sm font-semibold text-navy">{juriProfile.role}</b>
            <p className="mt-1 text-xs text-subtle">NIP: {juriProfile.nip} • {juriProfile.org}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Pill tone="green">Pakta Integritas Aktif</Pill>
              <Pill tone="blue" icon={IoKeyOutline}>Hak Akses Penuh</Pill>
            </div>
          </div>
        </Card>

        <div className="flex flex-col justify-between gap-4 rounded-2xl border border-orange-200 bg-orange-50 p-5">
          <div className="flex items-start gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-orange-500 text-white">
              <IoAlarmOutline className="size-5" />
            </div>
            <div>
              <b className="block text-sm font-bold text-orange-900">Batas Penilaian Mendekat</b>
              <p className="mt-1 text-xs leading-relaxed text-orange-800">
                Input skor akhir rubrik ditutup <b>28 Februari 2026</b> pukul 23:59 WITA.
              </p>
            </div>
          </div>
          <span className="w-fit rounded-full bg-orange-600 px-3 py-1 text-xs font-bold text-white">3 Hari Lagi</span>
        </div>
      </section>

      {/* ---------- Rekap ---------- */}
      <section className="space-y-4">
        <SectionHeader
          title="Rekapitulasi Tugas Juri"
          action={<span className="text-sm font-semibold text-navy">Tahun Ajaran 2025/2026</span>}
        />
        <div className="grid gap-4 sm:grid-cols-3">
          {recap.map((r) => (
            <Card key={r.label} className="flex items-center gap-4">
              <div className={cx('grid size-12 shrink-0 place-items-center rounded-xl', toneSoft[r.tone])}>
                <r.icon className="size-6" />
              </div>
              <div className="flex-1">
                <span className="text-sm text-muted">{r.label}</span>
                <b className={cx('block text-3xl font-extrabold', toneText[r.tone])}>{r.value}</b>
              </div>
              <Pill tone={r.tone}>{r.tag}</Pill>
            </Card>
          ))}
        </div>
      </section>

      {/* ---------- Cabang lomba ---------- */}
      <section className="space-y-4">
        <SectionHeader
          title="Cabang Lomba Ditugaskan"
          action={<span className="text-sm font-medium text-subtle">{lombaTugas.length} Aktif</span>}
        />
        <FilterChips items={lombaFilters} active={filter} onChange={setFilter} />

        <div className="grid gap-5 lg:grid-cols-2">
          {lombaTugas.map((l) => (
            <Card key={l.title} as="article" className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Pill tone={l.tone} icon={l.tagIcon}>{l.tag}</Pill>
                <span className={cx('inline-flex items-center gap-1.5 text-xs font-semibold', toneText[l.tone])}>
                  <i className="size-2 animate-pulse rounded-full bg-current" /> {l.status}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-ink">{l.title}</h3>
                <p className="mt-2 flex items-center gap-2 text-sm font-medium text-secondary">
                  <l.lineIcon className="size-4" /> {l.line}
                </p>
                <p className="mt-1 flex items-center gap-2 text-sm text-muted">
                  <IoDocumentTextOutline className="size-4" /> {l.doc}
                </p>
              </div>

              <div className="space-y-2 rounded-xl bg-surface p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
                  <span className="text-muted">Progres Penilaian Juri</span>
                  <b className="font-bold text-ink">
                    {l.done} / {l.total} Peserta ({percent(l)}%)
                  </b>
                </div>
                <ProgressBar value={percent(l)} tone={l.tone} />
                <div className="flex flex-wrap justify-between gap-2 text-xs">
                  <small className="text-subtle">{l.left}</small>
                  <small className={cx('font-semibold', toneText[l.noteTone])}>{l.note}</small>
                </div>
              </div>

              <Button className="mt-auto w-full" icon={l.ctaIcon}>Buka Antrean Karya Peserta</Button>
            </Card>
          ))}
        </div>
      </section>

      {/* ---------- Instruksi ---------- */}
      <section className="rounded-2xl border border-line-soft bg-soft/40 p-6">
        <h2 className="flex items-center gap-2 text-base font-bold text-navy">
          <IoMegaphoneOutline className="size-5" /> Instruksi Tim Teknis SIKARYA Sulut
        </h2>
        <p className="mt-2 max-w-4xl text-sm leading-relaxed text-muted">
          Setiap dewan juri wajib memastikan penilaian 4 aspek kriteria (Orisinalitas, Teknik, Penghayatan, dan
          Kesesuaian Tema) telah tersimpan dengan status verifikasi ganda sebelum sinkronisasi data final ke
          Puspresnas/Dinas Provinsi.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs font-medium text-subtle">Sekretariat Disdikbud Kota Manado</span>
          <Button variant="outline" size="sm" icon={IoDownloadOutline}>Unduh Panduan Rubrik PDF</Button>
        </div>
      </section>
    </div>
  );
}
