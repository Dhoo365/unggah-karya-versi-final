import { useState } from 'react';
import {
  IoCheckmarkCircleOutline,
  IoClipboardOutline,
  IoCreateOutline,
  IoEllipsisVertical,
  IoFingerPrintOutline,
  IoPersonAddOutline,
  IoSearchOutline,
  IoTimeOutline,
} from 'react-icons/io5';
import {
  Avatar,
  Button,
  Card,
  EmptyState,
  FilterChips,
  Pill,
  SearchBar,
  StatCard,
} from '../../components/ui/index.js';
import { matchQuery } from '../../lib/cx.js';
import { juriFilters, juriList, juriStats } from '../../data/admin.js';

// Kelola dewan juri (versi mobile: AdminJuri.vue)
export default function JuriPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState(juriFilters[0]);

  const daftar = juriList.filter((j) => matchQuery(j, query, ['name', 'role', 'meta']));

  return (
    <div className="space-y-8">
      {/* ---------- Statistik ---------- */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {juriStats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </section>

      {/* ---------- Toolbar ---------- */}
      <section className="space-y-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Cari nama juri, NIP, atau keahlian..."
            className="lg:flex-1"
          />
          <div className="flex flex-wrap gap-2">
            <Button variant="soft" icon={IoClipboardOutline}>Kelola SK Kadis Penugasan</Button>
            <Button icon={IoPersonAddOutline}>Tambah Juri Baru</Button>
          </div>
        </div>
        <FilterChips items={juriFilters} active={filter} onChange={setFilter} />
      </section>

      {/* ---------- Daftar juri ---------- */}
      {daftar.length === 0 ? (
        <EmptyState icon={IoSearchOutline} title="Juri tidak ditemukan" description="Coba kata kunci lain, misalnya nama, NIP, atau bidang keahlian." />
      ) : (
        <section className="grid gap-5 md:grid-cols-2">
          {daftar.map((j) => (
            <Card key={j.name} as="article" className="flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <Avatar initials={j.initial} tone={j.avatarTone} size="lg" />
                <div className="min-w-0 flex-1">
                  <h2 className="text-base font-bold text-ink">{j.name}</h2>
                  <b className="block text-sm font-semibold text-navy">{j.role}</b>
                  <p className="mt-1 text-xs text-subtle">{j.meta}</p>
                </div>
                <button type="button" aria-label="Opsi" className="grid size-9 place-items-center rounded-lg text-muted hover:bg-surface">
                  <IoEllipsisVertical className="size-5" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {j.chips.map((c) => (
                  <Pill key={c.label} tone={c.tone} icon={c.icon}>{c.label}</Pill>
                ))}
              </div>

              {j.warning ? (
                <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-sm">
                  <span className="inline-flex items-center gap-2 font-medium text-amber-800">
                    <IoTimeOutline className="size-4" /> {j.warning}
                  </span>
                  <button type="button" className="font-bold text-navy hover:underline">Kirim Ulang</button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-x-5 gap-y-2 rounded-xl bg-surface px-3 py-2.5 text-sm">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700">
                    <IoCheckmarkCircleOutline className="size-4" /> Pakta Integritas Valid
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-muted">
                    <IoFingerPrintOutline className="size-4" /> TTE Digital BSrE
                  </span>
                </div>
              )}

              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line-soft pt-4">
                <span className="text-xs font-medium text-subtle">{j.sk}</span>
                <div className="flex gap-2">
                  <Button variant="soft" size="sm">Detail & Tugas</Button>
                  <button
                    type="button"
                    aria-label="Ubah"
                    className="grid size-8 place-items-center rounded-xl border border-line text-navy hover:bg-surface"
                  >
                    <IoCreateOutline className="size-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </section>
      )}
    </div>
  );
}
