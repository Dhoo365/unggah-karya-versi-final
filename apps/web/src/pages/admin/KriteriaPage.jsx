import {
  IoAddCircleOutline,
  IoCheckmarkCircleOutline,
  IoChevronDownOutline,
  IoClipboardOutline,
  IoCopyOutline,
  IoCreateOutline,
  IoEllipsisVertical,
  IoFlagOutline,
  IoHammerOutline,
  IoLockClosedOutline,
  IoOptionsOutline,
  IoPeopleOutline,
  IoTrophyOutline,
} from 'react-icons/io5';
import { Button, Card, IconBox, Pill, SectionHeader } from '../../components/ui/index.js';
import { cx } from '../../lib/cx.js';
import { toneBar, toneSoft } from '../../lib/tones.js';
import { kriteriaList } from '../../data/admin.js';

// Kriteria & rubrik penilaian (versi mobile: AdminKriteria.vue)
export default function KriteriaPage() {
  const total = kriteriaList.reduce((sum, k) => sum + k.weight, 0);
  const seimbang = total === 100;

  return (
    <div className="space-y-8">
      {/* ---------- Regulasi ---------- */}
      <section className="flex flex-col gap-4 rounded-3xl bg-gradient-to-br from-navy-dark via-navy to-primary p-6 text-white shadow-lg sm:flex-row sm:p-8">
        <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/25">
          <IoClipboardOutline className="size-7 text-gold" />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-gold px-2.5 py-0.5 text-xs font-bold text-gold-ink">Regulasi 2026</span>
            <small className="text-xs text-white/70">SK Disdik Sulut No. 44/Dikda-03</small>
          </div>
          <h2 className="mt-2 text-2xl font-extrabold">Format Standar Penilaian Resmi TA 2025/2026</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/80">
            Metode kurasi menggunakan skala baku <b className="text-white">10 - 100 poin</b> rujukan Puspresnas
            Kemendikbudristek untuk sinkronisasi otomatis ke Pangkalan Talenta Daerah.
          </p>
        </div>
      </section>

      {/* ---------- Kategori & akumulasi bobot ---------- */}
      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm font-semibold text-muted">Kategori & Cabang Terpilih</span>
            <Pill tone="green" icon={IoLockClosedOutline}>Rubrik Terkunci & Aktif</Pill>
          </div>
          <button
            type="button"
            className="flex w-full items-center gap-4 rounded-xl border border-line-soft p-4 text-left hover:border-navy"
          >
            <IconBox icon={IoTrophyOutline} tone="amber" />
            <span className="min-w-0 flex-1">
              <b className="block text-sm font-bold text-ink">FLS2N Seni Budaya & Tari Kreasi 2026 – Kota Manado</b>
              <small className="text-xs text-muted">Jenjang SMA / SMK Se-Kota Manado (Babak Final)</small>
            </span>
            <IoChevronDownOutline className="size-5 shrink-0 text-subtle" />
          </button>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            <span className="inline-flex items-center gap-2"><IoHammerOutline className="size-4 text-navy" /> 3 Juri Terverifikasi</span>
            <span className="inline-flex items-center gap-2"><IoPeopleOutline className="size-4 text-navy" /> 28 Peserta Finalis</span>
          </div>
        </Card>

        <Card className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-base font-bold">Akumulasi Bobot Kriteria</h2>
            <Pill tone={seimbang ? 'green' : 'red'} icon={IoCheckmarkCircleOutline}>
              {total}% Terdistribusi {seimbang ? '(Seimbang)' : '(Belum 100%)'}
            </Pill>
          </div>
          <div className="flex h-4 gap-1 overflow-hidden rounded-full">
            {kriteriaList.map((k) => (
              <div key={k.no} className={cx('h-full first:rounded-l-full last:rounded-r-full', toneBar[k.tone])} style={{ width: `${k.weight}%` }} />
            ))}
          </div>
          <ul className="divide-y divide-line-soft">
            {kriteriaList.map((k) => (
              <li key={k.no} className="flex items-center gap-3 py-2 text-sm">
                <i className={cx('size-3 shrink-0 rounded-full', toneBar[k.tone])} />
                <span className="flex-1 text-muted">{k.short}</span>
                <b className="font-bold text-ink">{k.weight}%</b>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* ---------- Rincian komponen ---------- */}
      <section className="space-y-4">
        <SectionHeader
          title="Rincian Komponen Penilaian"
          icon={IoOptionsOutline}
          action={<small className="text-sm font-medium text-subtle">{kriteriaList.length} Parameter Wajib</small>}
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {kriteriaList.map((k) => (
            <Card key={k.no} as="article" className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className={cx('grid size-11 shrink-0 place-items-center rounded-xl text-sm font-extrabold', toneSoft[k.tone])}>
                  {k.no}
                </div>
                <div className="min-w-0 flex-1">
                  <Pill tone={k.tone}>Sub-Bobot: {k.weight}%</Pill>
                  <h3 className="mt-2 text-base font-bold text-ink">{k.title}</h3>
                </div>
                <button type="button" aria-label="Opsi" className="grid size-8 place-items-center rounded-lg text-muted hover:bg-surface">
                  <IoEllipsisVertical className="size-5" />
                </button>
              </div>

              <p className="text-sm leading-relaxed text-muted">
                <b className="font-semibold text-ink">Indikator Kurasi:</b> {k.indicator}
              </p>

              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line-soft pt-4">
                <div className="text-xs">
                  <span className="flex items-center gap-1 text-subtle">
                    <IoFlagOutline className="size-3.5" /> Batas Lulus (Passing Grade)
                  </span>
                  <b className="text-sm font-bold text-ink">Min. {k.min} Poin</b>
                </div>
                <Button variant="soft" size="sm" icon={IoCreateOutline}>Ubah Bobot</Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ---------- Aksi bawah ---------- */}
      <section className="flex flex-col justify-end gap-3 sm:flex-row">
        <Button variant="outline" icon={IoAddCircleOutline}>Tambah Kriteria Baru</Button>
        <Button icon={IoCopyOutline}>Salin Rubrik ke Cabang Lomba Lain</Button>
      </section>
    </div>
  );
}
