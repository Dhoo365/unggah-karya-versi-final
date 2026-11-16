import { useState } from 'react';
import {
  IoArrowForwardOutline,
  IoDocumentTextOutline,
  IoDownloadOutline,
  IoEyeOutline,
  IoPersonOutline,
  IoSchoolOutline,
  IoSearchOutline,
  IoShareOutline,
  IoShieldCheckmarkOutline,
  IoStarOutline,
  IoTrophy,
} from 'react-icons/io5';
import {
  Button,
  Card,
  EmptyState,
  FilterChips,
  Pill,
  SearchBar,
  SectionHeader,
  StatCard,
} from '../../components/ui/index.js';
import { cx, matchQuery } from '../../lib/cx.js';
import { talentaFilters, talentaList, talentaStats } from '../../data/admin.js';

// Warna lencana peringkat
const rankStyle = {
  gold: 'bg-gold text-gold-ink',
  silver: 'bg-slate-200 text-slate-700',
  bronze: 'bg-amber-200 text-amber-900',
  plain: 'bg-slate-100 text-slate-500',
};
const medalColor = {
  gold: 'text-amber-500',
  silver: 'text-slate-400',
  bronze: 'text-amber-700',
};

// Kurasi talenta daerah (versi mobile: AdminTalenta.vue)
export default function TalentaPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState(talentaFilters[0]);

  const daftar = talentaList.filter((t) => matchQuery(t, query, ['name', 'school', 'bidang']));

  return (
    <div className="space-y-8">
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-dark via-navy to-primary p-6 text-white shadow-lg sm:p-8">
        <IoTrophy className="pointer-events-none absolute -right-6 -bottom-8 size-56 text-white/10" />
        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-xs font-bold text-gold-ink">
            <IoStarOutline className="size-4" /> Program Pembinaan 2026
          </span>
          <h2 className="mt-4 text-3xl font-extrabold">Database Talenta Emas Manado 2026</h2>
          <p className="mt-2 text-sm text-white/80">
            Pembinaan Menuju FLS2N & O2SN Tingkat Provinsi Sulut dan Nasional Puspresnas.
          </p>
        </div>
        <div className="relative mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-5">
          <span className="inline-flex items-center gap-2 text-sm text-white/85">
            <IoSchoolOutline className="size-5 text-gold" /> Dikda Sulut & Disdikbud Manado
          </span>
          <button type="button" className="inline-flex items-center gap-1.5 text-sm font-bold hover:underline">
            Tahap Finalisasi <IoArrowForwardOutline className="size-4" />
          </button>
        </div>
      </section>

      {/* ---------- Statistik ---------- */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {talentaStats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </section>

      {/* ---------- Pencarian & filter ---------- */}
      <section className="flex flex-col gap-4 xl:flex-row xl:items-center">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Cari siswa berprestasi, NISN, atau sekolah..."
          className="xl:w-[420px]"
        />
        <FilterChips items={talentaFilters} active={filter} onChange={setFilter} />
      </section>

      <div className="grid gap-8 xl:grid-cols-3">
        {/* ---------- Daftar talenta ---------- */}
        <div className="space-y-4 xl:col-span-2">
          <SectionHeader
            title="Daftar Talenta Teratas"
            action={
              <button type="button" className="text-sm font-bold text-navy hover:underline">
                Urutkan: Skor Tertinggi
              </button>
            }
          />

          {daftar.length === 0 && (
            <EmptyState icon={IoSearchOutline} title="Talenta tidak ditemukan" description="Coba kata kunci lain." />
          )}

          {daftar.map((t) => {
            const top = t.rank === 1;
            return (
              <Card key={t.name} as="article" className={cx('space-y-4', top && 'border-amber-300 ring-2 ring-amber-100')}>
                <div className="flex flex-wrap items-center gap-4">
                  <div className={cx('grid size-12 shrink-0 place-items-center rounded-xl text-base font-extrabold', rankStyle[t.rankTone])}>
                    #{t.rank}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="flex items-center gap-1.5 text-base font-bold text-ink">
                      {t.name}
                      {t.nameIcon && <t.nameIcon className={cx('size-[18px]', medalColor[t.rankTone])} />}
                    </h3>
                    <p className="text-sm text-muted">{t.school}</p>
                  </div>
                  <div className={cx('rounded-xl px-4 py-2 text-right', top ? 'bg-navy text-white' : 'bg-surface')}>
                    <small className={cx('block text-[11px] font-medium', top ? 'text-white/70' : 'text-subtle')}>Skor Kurasi</small>
                    <b className="text-xl font-extrabold">
                      {t.score}
                      <span className={cx('text-xs font-medium', top ? 'text-white/70' : 'text-subtle')}>/100</span>
                    </b>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-surface px-4 py-3">
                  <b className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
                    <t.icon className="size-[18px] text-navy" /> {t.bidang}
                  </b>
                  <Pill tone={t.badgeTone} icon={t.badgeIcon}>{t.badge}</Pill>
                </div>

                <div className="flex flex-wrap justify-end gap-2">
                  {top ? (
                    <>
                      <Button variant="soft" size="sm" icon={IoDownloadOutline}>Unduh Rapor Prestasi</Button>
                      <Button size="sm" icon={IoEyeOutline}>Lihat Portofolio</Button>
                    </>
                  ) : (
                    <>
                      <Button variant="ghost" size="sm">Detail Berkas</Button>
                      <Button variant={t.rankTone === 'plain' ? 'gray' : 'soft'} size="sm" icon={IoDocumentTextOutline}>
                        Rapor Prestasi
                      </Button>
                    </>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* ---------- Aksi eksekutif ---------- */}
        <aside>
          <div className="sticky top-24 space-y-4 rounded-2xl bg-gradient-to-br from-navy-dark to-navy p-6 text-white shadow-lg">
            <h2 className="flex items-center gap-2 text-base font-bold">
              <IoShieldCheckmarkOutline className="size-5 text-gold" /> Aksi Eksekutif Disdikbud Manado
            </h2>
            <p className="text-sm leading-relaxed text-white/75">
              Proses sinkronisasi langsung ke sistem Dinas Pendidikan Daerah Provinsi Sulawesi Utara.
            </p>
            <Button variant="white" className="h-auto w-full py-3 text-left whitespace-normal" icon={IoShareOutline}>
              Ekspor Kurasi Talenta ke Dinas Provinsi (PDF/Excel)
            </Button>
            <Button variant="gold" className="w-full" icon={IoPersonOutline}>
              Terbitkan Piagam Apresiasi Kadis
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
