import { useState } from 'react';
import {
  IoCalendarOutline,
  IoCheckboxOutline,
  IoInformationCircleOutline,
  IoSchoolOutline,
  IoSearchOutline,
  IoShieldCheckmarkOutline,
  IoTimeOutline,
} from 'react-icons/io5';
import { Button, Card, EmptyState, FilterChips, Pill, SearchBar } from '../../components/ui/index.js';
import { cx, matchQuery } from '../../lib/cx.js';
import { antrean, antreanFilters, beban } from '../../data/juriPenilaian.js';

const statusTone = { wait: 'amber', draft: 'blue', idle: 'gray' };
const dotTone = { amber: 'bg-amber-500', blue: 'bg-navy' };
const ctaVariant = { wait: 'primary', draft: 'soft', idle: 'outline' };

// Antrean penilaian juri (versi mobile: JuriAnteran.vue)
export default function AntreanPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState(antreanFilters[0]);
  const daftar = antrean.filter((a) => matchQuery(a, query, ['no', 'name', 'title', 'school']));

  return (
    <div className="space-y-8">
      {/* ---------- Ringkasan ---------- */}
      <section className="grid gap-4 lg:grid-cols-[1.3fr_1fr_1fr]">
        <Card className="flex flex-col justify-between gap-4 bg-gradient-to-br from-navy-dark to-navy text-white">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold"><IoShieldCheckmarkOutline className="size-3.5" /> Juri Resmi</span>
            <h2 className="mt-3 text-2xl font-extrabold">Antrean Penilaian</h2>
            <p className="text-sm text-ice">Penjurian Tahap Final Tingkat Kota 2026</p>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-gold">
            <IoCalendarOutline className="size-4" /> Tenggat: 28 Feb 2026
          </span>
        </Card>
        {beban.map((b) => (
          <Card key={b.label} className="flex flex-col justify-between gap-3">
            <span className="flex items-center gap-2 text-sm font-medium text-muted">
              <i className={cx('size-2.5 rounded-full', dotTone[b.tone])} /> {b.label}
            </span>
            <div className="flex items-baseline gap-2">
              <b className="text-4xl font-extrabold text-ink">{b.value}</b>
              <span className="text-sm text-subtle">{b.unit}</span>
            </div>
          </Card>
        ))}
      </section>

      {/* ---------- Pencarian & filter ---------- */}
      <section className="flex flex-col gap-4 xl:flex-row xl:items-center">
        <SearchBar value={query} onChange={setQuery} placeholder="Cari nomor undian atau nama peserta..." className="xl:w-[420px]" />
        <FilterChips items={antreanFilters} active={filter} onChange={setFilter} />
      </section>

      <div className="grid gap-8 xl:grid-cols-[1fr_320px]">
        {/* ---------- Daftar antrean ---------- */}
        <div className="space-y-4">
          {daftar.length === 0 && <EmptyState icon={IoSearchOutline} title="Karya tidak ditemukan" description="Coba nomor undian atau nama peserta lain." />}
          {daftar.map((a) => (
            <Card key={a.no} as="article" className={cx('space-y-4', a.status === 'draft' && 'border-navy/40 ring-2 ring-soft')}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 text-xs font-bold tracking-wide text-secondary uppercase">
                  <a.tagIcon className="size-4" /> Antrean #{a.no} • {a.lomba}
                </span>
                <Pill tone={statusTone[a.status]}>{a.statusLabel}</Pill>
              </div>

              <div>
                <h3 className="text-lg font-bold text-ink">{a.title}</h3>
                <p className="mt-1 flex flex-wrap items-center gap-x-2 text-sm text-muted">
                  <IoSchoolOutline className="size-4 text-secondary" />
                  <b className="font-semibold text-ink">{a.name}</b>
                  <span className="text-line">•</span>
                  {a.school}
                </p>
              </div>

              {a.files && (
                <div className="flex flex-wrap gap-2">
                  {a.files.map((f) => (
                    <span key={f.label} className="inline-flex items-center gap-2 rounded-lg border border-line-soft bg-surface px-3 py-2 text-xs font-semibold text-ink">
                      <f.icon className="size-4 text-navy" /> {f.label}
                    </span>
                  ))}
                </div>
              )}

              {a.progress && (
                <div className="space-y-3 rounded-xl bg-soft/50 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                    <span className="inline-flex items-center gap-2 font-semibold text-navy">
                      <IoCheckboxOutline className="size-4" /> {a.progress.filled} dari {a.progress.total} Kriteria Terisi
                    </span>
                    <b className="font-bold text-ink">Skor Sementara: {a.progress.score}</b>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {a.progress.criteria.map((c) => (
                      <span
                        key={c.name}
                        className={cx(
                          'rounded-lg px-3 py-2 text-center text-xs font-semibold',
                          c.done ? 'bg-navy text-white' : 'border border-dashed border-line bg-white text-subtle'
                        )}
                      >
                        {c.name}
                        <small className="block text-[10px] font-medium opacity-80">{c.done ? 'Selesai' : 'Kosong'}</small>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line-soft pt-4">
                <span className="inline-flex items-center gap-1.5 text-xs text-subtle">
                  {a.time && (
                    <>
                      <IoTimeOutline className="size-4" /> Masuk {a.time}
                    </>
                  )}
                </span>
                <Button variant={ctaVariant[a.status]} iconRight={a.ctaIcon}>{a.cta}</Button>
              </div>
            </Card>
          ))}
        </div>

        {/* ---------- Petunjuk ---------- */}
        <aside>
          <div className="sticky top-24 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <b className="flex items-center gap-2 text-sm font-bold text-amber-900">
              <IoInformationCircleOutline className="size-5" /> Petunjuk Dewan Juri
            </b>
            <p className="mt-2 text-sm leading-relaxed text-amber-900/80">
              Sesuai regulasi Disdikbud Sulut, seluruh rubrik penilaian wajib disimpan sebagai draf sebelum batas waktu
              <b> 28 Februari 2026 pukul 23:59 WITA</b> untuk rekonsiliasi sidang pleno.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
