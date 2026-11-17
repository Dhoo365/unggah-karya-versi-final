import { useState } from 'react';
import {
  IoChatboxEllipsesOutline,
  IoCheckmarkCircleOutline,
  IoDocumentTextOutline,
  IoDownloadOutline,
  IoFingerPrintOutline,
  IoLockClosedOutline,
  IoSendOutline,
} from 'react-icons/io5';
import { Button, Card, FilterChips, Pill, SectionHeader } from '../../components/ui/index.js';
import { riwayat, riwayatFilters } from '../../data/juriPenilaian.js';

// Riwayat penilaian juri (versi mobile: JuriRiwayat.vue)
export default function RiwayatPage() {
  const [filter, setFilter] = useState(riwayatFilters[0]);

  return (
    <div className="space-y-8">
      {/* ---------- Rekap ---------- */}
      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="flex flex-col justify-between gap-4 bg-gradient-to-br from-navy-dark to-navy text-white lg:col-span-1">
          <div>
            <span className="text-xs font-bold tracking-widest text-gold uppercase">Sidang Pleno Dewan Juri</span>
            <h2 className="mt-2 text-2xl font-extrabold">Riwayat Penilaian</h2>
            <p className="text-sm text-ice">Karya telah dikunci & sah</p>
          </div>
          <Button variant="white" icon={IoDownloadOutline} className="w-fit">Rekap PDF</Button>
        </Card>
        <Card className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted">Total Karya Selesai</span>
            <Pill tone="green">Final</Pill>
          </div>
          <b className="block text-4xl font-extrabold text-ink">18 <span className="text-base font-medium text-subtle">Karya</span></b>
          <small className="text-xs font-medium text-emerald-700">100% kuota terpenuhi</small>
        </Card>
        <Card className="space-y-2">
          <span className="text-sm text-muted">Rata-rata Skor</span>
          <b className="block text-4xl font-extrabold text-navy">84.6 <span className="text-base font-medium text-subtle">/ 100</span></b>
          <small className="text-xs font-medium text-subtle">Predikat Sangat Baik</small>
        </Card>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm">
        <span className="inline-flex items-center gap-2 font-semibold text-emerald-800">
          <IoFingerPrintOutline className="size-5" /> Tanda Tangan Elektronik (TTE BSrE) Sah
        </span>
        <a href="#" className="font-bold text-navy hover:underline">Audit Log</a>
      </div>

      <FilterChips items={riwayatFilters} active={filter} onChange={setFilter} />

      {/* ---------- Daftar karya ---------- */}
      <section className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {riwayat.map((r) => (
          <Card key={r.code} as="article" className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold text-secondary">{r.code} • {r.lomba}</span>
              <Pill tone={r.lock === 'ttd' ? 'green' : 'gray'} icon={r.lock === 'ttd' ? IoCheckmarkCircleOutline : IoLockClosedOutline}>
                {r.lockLabel}
              </Pill>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-ink">{r.title}</h3>
                <p className="mt-1 text-sm text-muted">
                  <b className="font-semibold text-ink">{r.name}</b> • {r.school}
                </p>
              </div>
              <div className="shrink-0 rounded-xl bg-soft px-3 py-2 text-right">
                <b className="block text-2xl font-extrabold text-navy">{r.score}</b>
                <small className="text-[11px] font-semibold text-secondary">{r.grade}</small>
              </div>
            </div>

            {r.breakdown && (
              <div className="grid grid-cols-3 gap-2">
                {r.breakdown.map((b) => (
                  <div key={b.k} className="rounded-xl border border-line-soft bg-surface p-3 text-center">
                    <small className="block text-[11px] text-subtle">{b.k}: {b.name}</small>
                    <b className="block text-lg font-extrabold text-ink">{b.value}</b>
                    <small className="text-[11px] font-semibold text-secondary">Bobot {b.weight}%</small>
                  </div>
                ))}
              </div>
            )}

            {r.quote && (
              <blockquote className="flex gap-3 rounded-xl bg-surface p-4 text-sm text-muted italic">
                <IoChatboxEllipsesOutline className="size-5 shrink-0 text-navy not-italic" />“{r.quote}”
              </blockquote>
            )}

            {r.tags && (
              <div className="flex flex-wrap gap-2">
                {r.tags.map((t) => (
                  <Pill key={t.label} tone="amber" icon={t.icon}>{t.label}</Pill>
                ))}
              </div>
            )}

            <div className="mt-auto flex flex-wrap gap-2 border-t border-line-soft pt-4">
              {r.breakdown ? (
                <>
                  <Button variant="outline" size="sm" icon={IoDocumentTextOutline}>Lihat Lembar Nilai</Button>
                  <Button variant="soft" size="sm" icon={IoDownloadOutline}>Unduh Bukti Nilai PDF</Button>
                </>
              ) : (
                <Button variant="soft" size="sm" className="w-full">Lihat Detail Nilai</Button>
              )}
            </div>
          </Card>
        ))}
      </section>

      {/* ---------- Sinkronisasi ---------- */}
      <Card className="flex flex-col gap-4 bg-soft/40 md:flex-row md:items-center md:justify-between">
        <SectionHeader
          title="Status Sinkronisasi Juri"
          subtitle="Seluruh nilai juri telah terkunci pada server Dikda Sulut. Kirim berkas salinan fisik pleno ke sekretariat Disdikbud Manado."
          className="max-w-2xl"
        />
        <Button icon={IoSendOutline}>Kirim Rekap Pleno ke Sekretariat</Button>
      </Card>
    </div>
  );
}
