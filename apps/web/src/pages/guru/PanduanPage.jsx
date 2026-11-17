import { useState } from 'react';
import {
  IoBookOutline,
  IoBookmarkOutline,
  IoDownloadOutline,
  IoLogoYoutube,
  IoReaderOutline,
  IoShieldCheckmark,
} from 'react-icons/io5';
import { Button, Card, EmptyState, IconBox, Pill, SearchBar, SectionHeader } from '../../components/ui/index.js';
import { matchQuery } from '../../lib/cx.js';
import { dokumenPanduan } from '../../data/guru.js';

// Panduan guru / buku saku (versi mobile: GuruPanduan.vue)
export default function PanduanPage() {
  const [cari, setCari] = useState('');
  const tampil = dokumenPanduan.filter((d) => matchQuery(d, cari, ['judul', 'deskripsi', 'tag']));

  return (
    <div className="space-y-8">
      {/* ---------- Buku saku ---------- */}
      <section className="relative grid gap-6 overflow-hidden rounded-3xl bg-gradient-to-br from-navy-dark via-navy to-primary p-6 text-white sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            <span className="rounded-full bg-gold px-3 py-1 text-gold-ink">Edisi 2025/2026</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1"><IoShieldCheckmark className="size-3.5" /> Terverifikasi Dikda</span>
            <span className="rounded-full bg-white/15 px-3 py-1">Pedoman Utama • Versi 2.1</span>
          </div>
          <h2 className="mt-4 text-2xl leading-tight font-extrabold sm:text-3xl">Buku Saku Guru Pembimbing Lomba Siswa 2025/2026</h2>
          <p className="mt-2 max-w-2xl text-sm text-ice">Edisi Resmi Dinas Pendidikan Daerah Prov Sulut. Panduan teknis pendampingan kurasi karya siswa jenjang SMA, SMK, dan SLB.</p>
          <p className="mt-3 text-xs text-ice">PDF (4.2 MB) • Terbit Januari 2026 • Dikmen & Diksus</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button variant="gold" icon={IoReaderOutline}>Baca Sekarang</Button>
            <Button variant="white" icon={IoDownloadOutline}>Unduh PDF</Button>
          </div>
        </div>
        <div className="hidden h-48 w-36 rotate-3 flex-col justify-between rounded-r-2xl rounded-l-md bg-white p-4 text-navy shadow-2xl ring-4 ring-white/20 lg:flex">
          <IoBookOutline className="size-8" />
          <b className="text-sm leading-tight font-extrabold">Buku Saku Guru Pembimbing</b>
          <small className="text-[10px] font-semibold text-subtle">DIKDA SULUT • 2026</small>
        </div>
      </section>

      {/* ---------- Regulasi ---------- */}
      <section className="space-y-4">
        <SectionHeader
          title="Daftar Regulasi & Instrumen Lomba"
          subtitle={`${tampil.length} berkas tersedia`}
          action={<SearchBar value={cari} onChange={setCari} placeholder="Cari regulasi atau instrumen lomba..." className="w-full sm:w-80" />}
        />
        {tampil.length ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {tampil.map((d) => (
              <Card key={d.id} as="article" className="flex flex-col gap-4">
                <div className="flex items-start justify-between gap-3">
                  <IconBox icon={d.icon} tone={d.tone} />
                  <Pill tone={d.tone}>{d.tag}</Pill>
                </div>
                <div>
                  <h3 className="font-bold text-ink">{d.judul}</h3>
                  <p className="mt-1 text-sm text-muted">{d.deskripsi}</p>
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-line-soft pt-4">
                  <small className="inline-flex items-center gap-1 text-xs font-semibold text-subtle"><IoBookmarkOutline className="size-3.5" />{d.format} • {d.ukuran}</small>
                  <Button size="sm" variant="soft" icon={IoDownloadOutline}>Unduh</Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState icon={IoBookOutline} title="Dokumen tidak ditemukan" description="Tidak ada dokumen yang cocok dengan pencarian." />
        )}
      </section>

      <Card className="flex flex-wrap items-center gap-4 bg-soft/40">
        <IoLogoYoutube className="size-10 shrink-0 text-red-600" />
        <div className="min-w-0 flex-1">
          <b className="block font-bold">Perlu panduan video tutorial?</b>
          <small className="text-sm text-muted">Tonton video tata cara verifikasi karya di kanal YouTube Resmi Dikda Sulut untuk penjelasan tahapan kurasi langkah demi langkah.</small>
        </div>
        <Button variant="outline">Buka YouTube Dikda</Button>
      </Card>
    </div>
  );
}
