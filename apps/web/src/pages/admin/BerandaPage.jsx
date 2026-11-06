import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  IoAddCircleOutline,
  IoArrowForwardOutline,
  IoCheckmarkCircle,
  IoChevronForwardOutline,
  IoClipboardOutline,
  IoCloudUploadOutline,
  IoCreateOutline,
  IoHammerOutline,
  IoIdCardOutline,
  IoOptionsOutline,
  IoPersonAddOutline,
  IoRibbon,
  IoSearchOutline,
  IoShieldCheckmarkOutline,
  IoTrashOutline,
} from 'react-icons/io5';
import {
  Avatar,
  Button,
  Card,
  EmptyState,
  FilterChips,
  IconBox,
  Pill,
  ProgressBar,
  SearchBar,
  SectionHeader,
  StatCard,
} from '../../components/ui/index.js';
import { cx, matchQuery } from '../../lib/cx.js';
import { toneSoft, toneText } from '../../lib/tones.js';
import {
  berandaStats,
  jenjangFilters,
  juriAvatars,
  kriteriaRingkas,
  lombaList,
  pengumuman,
} from '../../data/admin.js';

// Dashboard utama Admin (versi mobile: AdminBeranda.vue)
export default function BerandaPage() {
  const [query, setQuery] = useState('');
  const [jenjang, setJenjang] = useState(jenjangFilters[0]);

  const lombaTampil = lombaList.filter(
    (l) => (jenjang === jenjangFilters[0] || l.level === jenjang) && matchQuery(l, query, ['title', 'meta'])
  );

  return (
    <div className="space-y-8">
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-dark via-navy to-primary p-6 text-white shadow-lg sm:p-8">
        <i className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-secondary/40 blur-3xl" />
        <div className="relative flex flex-wrap items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/25">
              <IoRibbon className="size-7 text-gold" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-extrabold">Admin Disdikbud Manado</h2>
                <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-semibold">Kota Manado</span>
              </div>
              <p className="mt-1 text-sm text-white/75">Dinas Pendidikan dan Kebudayaan Kota Manado</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/20 px-3 py-1.5 text-xs font-bold text-emerald-100 ring-1 ring-emerald-300/30">
            <i className="size-2 rounded-full bg-emerald-400" /> Aktif 2026
          </span>
        </div>
        <div className="relative mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-5">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-white/85">
            <IoShieldCheckmarkOutline className="size-5 text-gold" /> Hak Akses Verifikator Utama
          </span>
          <a href="#buat-lomba" className="inline-flex items-center gap-1.5 text-sm font-bold hover:underline">
            Pusat Kontrol <IoArrowForwardOutline className="size-4" />
          </a>
        </div>
      </section>

      {/* ---------- Pencarian & filter jenjang ---------- */}
      <section className="flex flex-col gap-4 xl:flex-row xl:items-center">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Cari lomba, juknis, atau nama dewan juri..."
          className="xl:w-[420px]"
        />
        <FilterChips items={jenjangFilters} active={jenjang} onChange={setJenjang} />
      </section>

      {/* ---------- Statistik ---------- */}
      <section className="space-y-4">
        <SectionHeader
          title="Statistik Kinerja Lomba"
          action={<span className="text-sm font-medium text-subtle">Tahun Ajaran 2025/2026</span>}
        />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {berandaStats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* ---------- 2 kolom: lomba | panel samping ---------- */}
      <div className="grid gap-8 xl:grid-cols-3">
        <div className="space-y-5 xl:col-span-2">
          <Card id="buat-lomba" className="flex flex-wrap items-center justify-between gap-4 border-navy/20 bg-soft/40">
            <div className="flex items-center gap-4">
              <IconBox icon={IoAddCircleOutline} tone="navy" size="lg" />
              <div>
                <h3 className="text-base font-bold text-ink">Buat Lomba Baru</h3>
                <p className="text-sm text-muted">Unggah juknis, atur kuota, dan tanggal seleksi</p>
              </div>
            </div>
            <Button icon={IoAddCircleOutline}>Buat Lomba</Button>
          </Card>

          <SectionHeader
            title="Data Lomba Terkini"
            subtitle="Kelola status kuota kecamatan/sub-rayon, jadwal & juknis"
            action={
              <button type="button" className="text-sm font-bold text-navy hover:underline">
                Kelola Semua
              </button>
            }
          />

          {lombaTampil.length === 0 && (
            <EmptyState
              icon={IoSearchOutline}
              title="Lomba tidak ditemukan"
              description="Coba ubah kata kunci pencarian atau pilih jenjang lain."
            />
          )}

          {lombaTampil.map((l) => (
            <Card key={l.title} as="article" className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  <Pill tone={l.levelTone}>{l.level}</Pill>
                  <Pill tone={l.statusTone}>{l.status}</Pill>
                </div>
                <div className="flex gap-1">
                  <button type="button" aria-label="Ubah" className="grid size-9 place-items-center rounded-lg text-muted hover:bg-surface hover:text-navy">
                    <IoCreateOutline className="size-5" />
                  </button>
                  <button type="button" aria-label="Hapus" className="grid size-9 place-items-center rounded-lg text-muted hover:bg-red-50 hover:text-red-600">
                    <IoTrashOutline className="size-5" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-ink">{l.title}</h3>
                <p className="text-sm text-muted">{l.meta}</p>
              </div>

              {l.quota ? (
                <>
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
                      <span className="text-muted">{l.quota.label}</span>
                      <b className={cx('font-bold', toneText[l.quota.tone])}>{l.quota.value}</b>
                    </div>
                    <ProgressBar value={l.quota.pct} tone={l.quota.tone} />
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line-soft pt-4">
                    <span className={cx('inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold', toneSoft[l.foot.tone])}>
                      <l.foot.icon className="size-4" /> {l.foot.text}
                    </span>
                    <Button variant="ghost" size="sm" iconRight={IoChevronForwardOutline}>
                      {l.foot.btn}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line-soft pt-4 text-sm">
                  <span className="text-muted">
                    Siswa Lolos Verifikasi: <strong className="text-ink">{l.verified}</strong>
                  </span>
                  <Button variant="soft" size="sm">Kelola Kuota Kecamatan</Button>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* ---------- Panel samping ---------- */}
        <aside className="space-y-6">
          {/* Dewan juri */}
          <Card className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <IconBox icon={IoHammerOutline} tone="amber" size="sm" />
                <h2 className="text-base font-bold">Penetapan Dewan Juri</h2>
              </div>
              <span className="text-xs font-semibold whitespace-nowrap text-subtle">18 Terdaftar</span>
            </div>
            <div className="space-y-4 rounded-xl bg-surface p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-ink">
                    FLS2N Kategori Vokal Solo & Musik Tradisi - Tingkat Kota Manado
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    3 Dewan Juri Ditetapkan (Praktisi Musik & Penggiat Seni Kota Manado)
                  </p>
                </div>
                <Pill tone="green" icon={IoCheckmarkCircle}>Lengkap</Pill>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex -space-x-1">
                  {juriAvatars.map((a) => (
                    <Avatar key={a.initials} initials={a.initials} tone={a.tone} size="sm" className="ring-2 ring-surface" />
                  ))}
                </div>
                <Link to="/admin/juri" className="inline-flex items-center gap-1 text-xs font-bold text-navy hover:underline">
                  Tentukan Penugasan <IoArrowForwardOutline className="size-4" />
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="soft" size="sm" icon={IoPersonAddOutline}>SK Dewan Juri</Button>
              <Button variant="outline" size="sm" icon={IoIdCardOutline}>Pakta Integritas</Button>
            </div>
          </Card>

          {/* Kriteria ringkas */}
          <Card className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <IconBox icon={IoClipboardOutline} tone="blue" size="sm" />
                <div>
                  <h2 className="text-base font-bold">Kriteria & Rubrik Skor</h2>
                  <p className="text-xs text-muted">Bobot penilaian standar Disdikbud Kota Manado</p>
                </div>
              </div>
              <Link to="/admin/kriteria" aria-label="Ubah rubrik" className="grid size-9 place-items-center rounded-lg text-muted hover:bg-surface hover:text-navy">
                <IoOptionsOutline className="size-5" />
              </Link>
            </div>
            <div className="space-y-4">
              {kriteriaRingkas.map((k) => (
                <div key={k.title} className="space-y-1.5">
                  <div className="flex items-baseline justify-between gap-3 text-sm">
                    <b className="font-semibold text-ink">{k.title}</b>
                    <b className={cx('font-bold', toneText[k.tone])}>{k.pct}%</b>
                  </div>
                  <ProgressBar value={k.pct} tone={k.tone} thin />
                  <span className="block text-xs text-subtle">{k.desc}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Pengumuman */}
          <Card className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-base font-bold">Status Pengumuman Hasil</h2>
              <span className="text-xs whitespace-nowrap text-subtle">Publikasi Portal</span>
            </div>
            <div className="space-y-3">
              {pengumuman.map((p) => (
                <div
                  key={p.title}
                  className={cx(
                    'flex items-start gap-3 rounded-xl p-3',
                    p.dashed ? 'border border-dashed border-amber-300 bg-amber-50/50' : 'bg-surface'
                  )}
                >
                  <IconBox icon={p.icon} tone={p.tone} size="sm" />
                  <div className="min-w-0 flex-1">
                    <b className="block text-sm font-semibold text-ink">{p.title}</b>
                    <span className="text-xs text-muted">{p.sub}</span>
                  </div>
                  <Pill tone={p.tone}>{p.badge}</Pill>
                </div>
              ))}
            </div>
            <Button className="w-full" icon={IoCloudUploadOutline}>Rilis Pengumuman Resmi Baru</Button>
          </Card>
        </aside>
      </div>
    </div>
  );
}
