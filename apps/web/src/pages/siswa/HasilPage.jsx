import { useState } from 'react';
import {
  IoCalendarOutline,
  IoChatboxEllipsesOutline,
  IoCheckmarkCircle,
  IoDocumentTextOutline,
  IoDownloadOutline,
  IoHourglassOutline,
  IoPrintOutline,
  IoQrCodeOutline,
  IoTrophy,
} from 'react-icons/io5';
import { Avatar, Button, Card, Pill } from '../../components/ui/index.js';
import { cx } from '../../lib/cx.js';
import { prestasi, siswaProfil } from '../../data/siswa.js';
import { useUi } from '../../components/feedback/index.js';
import { dokumen } from '../../data/dokumen.js';

const sertifikat = (p) =>
  dokumen(`E-Sertifikat ${p.badge} — ${p.judul}`, {
    jenis: 'sertifikat',
    nomor: `SKR-${p.meta.replace(/\W+/g, '-')}-${p.id}`,
    baris: [['Nama', siswaProfil.name], ['NISN', siswaProfil.nisn], ['Sekolah', siswaProfil.org], ['Capaian', p.badge], ['Nilai', `${p.nilai} / 100`]],
  });
const skPemenang = (p) => dokumen(`SK Penetapan Pemenang ${p.judul}`, { jenis: 'sk', nomor: '800/PEMENANG/DIKDA/2024', baris: [['Juara', `${siswaProfil.name} — ${p.badge}`], ['Nilai Akhir', p.nilai]] });

const filters = [
  { id: 'semua', label: 'Semua Lomba' },
  { id: 'diumumkan', label: 'Diumumkan' },
  { id: 'penjurian', label: 'Dalam Penjurian' },
];
const badgeTone = { gold: 'amber', blue: 'blue', gray: 'gray' };

// Hasil lomba & prestasi siswa (versi mobile: SiswaHasilLomba.vue)
export default function HasilPage() {
  const [aktif, setAktif] = useState('semua');
  const ui = useUi();
  const daftar = prestasi.filter((p) => aktif === 'semua' || p.status === aktif);
  const jumlah = (id) => prestasi.filter((p) => id === 'semua' || p.status === id).length;

  return (
    <div className="space-y-8">
      {/* ---------- Profil ringkas ---------- */}
      <section className="grid gap-4 [&>*]:min-w-0 lg:grid-cols-[1.4fr_1fr_1fr]">
        <Card className="flex items-center gap-4">
          <Avatar initials={siswaProfil.initials} size="lg" tone="navy" />
          <div className="min-w-0">
            <b className="block text-lg font-bold">{siswaProfil.name}</b>
            <small className="text-sm text-muted">NISN: {siswaProfil.nisn} • {siswaProfil.org}</small>
            <div className="mt-2 flex flex-wrap gap-2">
              <Pill tone="green" icon={IoCheckmarkCircle}>Terverifikasi TTE BSrE</Pill>
              <Pill tone="blue">Sinkron Dapodik</Pill>
            </div>
          </div>
        </Card>
        <Card>
          <small className="text-sm text-muted">Total Capaian</small>
          <b className="mt-1 block text-4xl font-extrabold text-navy">3 <span className="text-sm font-medium text-subtle">Prestasi Sah</span></b>
        </Card>
        <Card>
          <small className="text-sm text-muted">Sebaran Wilayah</small>
          <b className="mt-1 block text-4xl font-extrabold text-navy">1 <span className="text-sm font-medium text-subtle">Nasional • 2 Provinsi</span></b>
        </Card>
      </section>

      {/* ---------- Filter ---------- */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setAktif(f.id)}
            className={cx(
              'inline-flex h-9 items-center gap-2 rounded-full border px-4 text-sm font-semibold',
              aktif === f.id ? 'border-navy bg-navy text-white' : 'border-line-soft bg-white text-muted hover:text-ink'
            )}
          >
            {f.label}
            <span className={cx('rounded-full px-1.5 text-xs', aktif === f.id ? 'bg-white/20' : 'bg-soft text-navy')}>{jumlah(f.id)}</span>
          </button>
        ))}
      </div>

      {/* ---------- Prestasi ---------- */}
      <section className="grid gap-5 [&>*]:min-w-0 lg:grid-cols-2 xl:grid-cols-3">
        {daftar.map((p) => (
          <Card key={p.id} as="article" className={cx('ui-enter flex flex-col gap-4', p.medali === 'gold' && 'border-amber-300 ring-2 ring-amber-100')}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Pill tone={badgeTone[p.medali]} icon={p.medali === 'gold' ? IoTrophy : p.status === 'penjurian' ? IoHourglassOutline : undefined}>
                {p.badge}
              </Pill>
              <small className="text-xs font-semibold text-subtle">{p.meta}</small>
            </div>
            <div>
              <h3 className="text-lg font-bold text-ink">{p.judul}</h3>
              <p className="mt-1 text-sm text-muted">{p.sub}</p>
            </div>

            {p.nilai ? (
              <div className="flex items-baseline justify-between rounded-xl bg-soft/50 px-4 py-3">
                <span className="text-sm text-muted">{p.nilaiLabel}</span>
                <b className="text-3xl font-extrabold text-navy">{p.nilai}<small className="text-sm font-medium text-subtle"> / 100</small></b>
              </div>
            ) : (
              <div className="space-y-1 rounded-xl border border-dashed border-line bg-surface p-4 text-sm">
                <b className="flex items-center gap-2 font-semibold text-ink">
                  <IoCalendarOutline className="size-4 text-navy" /> Pengumuman dijadwalkan:
                </b>
                <span className="text-muted">{p.jadwal}</span>
                <small className="block pt-1 text-xs text-subtle">Hasil dan sertifikat belum dirilis dewan juri</small>
              </div>
            )}

            {p.quote && (
              <blockquote className="flex gap-2 text-sm text-muted italic">
                <IoChatboxEllipsesOutline className="size-5 shrink-0 text-navy not-italic" />“{p.quote}”
              </blockquote>
            )}

            {p.aksi && (
              <div className="mt-auto flex flex-wrap gap-2 border-t border-line-soft pt-4">
                {p.aksi.length > 1 && <Button variant="outline" size="sm" icon={IoDocumentTextOutline} onClick={() => ui.lihat(skPemenang(p))}>{p.aksi[0]}</Button>}
                <Button size="sm" icon={IoDownloadOutline} className="flex-1" onClick={() => ui.unduh(sertifikat(p))}>{p.aksi[p.aksi.length - 1]}</Button>
              </div>
            )}
          </Card>
        ))}
      </section>

      {/* ---------- Portofolio ---------- */}
      <Card className="flex flex-wrap items-center gap-4 bg-soft/40">
        <IoQrCodeOutline className="size-10 shrink-0 text-navy" />
        <div className="min-w-0 flex-1">
          <b className="block font-bold">Kebutuhan SNBP & Beasiswa</b>
          <small className="text-sm text-muted">Seluruh sertifikat telah dibubuhi QR Code Verifikasi BSrE sah dari Dinas Pendidikan Daerah Provinsi Sulawesi Utara.</small>
        </div>
        <Button icon={IoPrintOutline} onClick={() => ui.unduh(dokumen(`Portofolio Prestasi ${siswaProfil.name}`, { jenis: 'rekap', label: 'E-Portofolio', baris: [['Nama', siswaProfil.name], ['NISN', siswaProfil.nisn], ['Sekolah', siswaProfil.org], ...prestasi.map((x) => [x.badge, `${x.judul} (${x.meta})`])] }))}>Cetak Portofolio Prestasi (PDF)</Button>
      </Card>
    </div>
  );
}
