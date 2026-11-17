import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IoAlertCircle,
  IoAttachOutline,
  IoCheckmarkCircle,
  IoCloudUploadOutline,
  IoCloseCircleOutline,
  IoEyeOutline,
  IoFolderOpenOutline,
  IoInformationCircleOutline,
  IoPaperPlane,
  IoPersonOutline,
  IoShareSocialOutline,
  IoStatsChartOutline,
  IoTimeOutline,
} from 'react-icons/io5';
import { Button, Card, EmptyState, Pill, ProgressBar } from '../../components/ui/index.js';
import { cx } from '../../lib/cx.js';
import { karyaSiswa } from '../../data/guru.js';

const statusInfo = {
  menunggu: { label: 'Diajukan → Menunggu Verifikasi Dispen', tone: 'amber', icon: IoPaperPlane },
  revisi: { label: 'Perlu Perbaikan / Revisi', tone: 'red', icon: IoAlertCircle },
  dinilai: { label: 'Diterima Dispen → Sedang Dinilai Juri', tone: 'green', icon: IoCheckmarkCircle },
};
const filters = [
  { key: 'semua', label: 'Semua', cocok: () => true },
  { key: 'menunggu', label: 'Menunggu Verifikasi', cocok: (k) => k.status === 'menunggu' },
  { key: 'revisi', label: 'Perlu Revisi', cocok: (k) => k.status === 'revisi' },
  { key: 'diterima', label: 'Diterima / Lolos', cocok: (k) => k.status === 'dinilai' },
];

// Karya siswa sekolah (versi mobile: GuruKaryaSiswa.vue)
export default function KaryaSiswaPage() {
  const navigate = useNavigate();
  const [karya, setKarya] = useState(karyaSiswa);
  const [filter, setFilter] = useState('semua');
  const f = filters.find((x) => x.key === filter);
  const tampil = karya.filter(f.cocok);
  const tarik = (id) => setKarya((d) => d.filter((k) => k.id !== id)); // TODO: konfirmasi + API

  return (
    <div className="space-y-6">
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-dark via-navy to-primary p-6 text-white sm:p-8">
        <IoCloudUploadOutline className="pointer-events-none absolute right-6 bottom-4 hidden size-36 text-white/10 md:block" />
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <span className="rounded-full bg-white/15 px-3 py-1">T.A. 2025/2026 Gelombang I</span>
          <span className="rounded-full bg-gold px-3 py-1 text-gold-ink">Batas Kurasi Dispen: 30 Juni 2026</span>
        </div>
        <h2 className="mt-4 text-2xl font-extrabold">Daftarkan Karya Inovasi Siswa</h2>
        <p className="mt-2 max-w-lg text-sm text-ice">Pastikan NISN terdaftar dan pakta integritas orisinalitas bermeterai telah disiapkan. Auto-validasi Dapodik & berkas aktif.</p>
        <Button variant="gold" icon={IoCloudUploadOutline} className="mt-5" onClick={() => navigate('/guru/unggah')}>Upload Karya Baru</Button>
      </section>

      {/* ---------- Filter ---------- */}
      <div className="flex flex-wrap gap-2">
        {filters.map((x) => {
          const on = x.key === filter;
          return (
            <button key={x.key} type="button" onClick={() => setFilter(x.key)}
              className={cx('inline-flex h-9 items-center gap-2 rounded-full border px-4 text-sm font-semibold', on ? 'border-navy bg-navy text-white' : 'border-line-soft bg-white text-muted hover:text-ink')}>
              {x.label}
              <span className={cx('rounded-full px-1.5 text-xs', on ? 'bg-white/20' : 'bg-soft text-navy')}>{karya.filter(x.cocok).length}</span>
            </button>
          );
        })}
      </div>

      {/* ---------- Kartu karya ---------- */}
      {tampil.length ? (
        <section className="grid gap-5 [&>*]:min-w-0 lg:grid-cols-2 2xl:grid-cols-3">
          {tampil.map((k) => {
            const st = statusInfo[k.status];
            const Kat = k.kategoriIcon;
            return (
              <Card key={k.id} as="article" className={cx('flex flex-col gap-4', k.status === 'revisi' && 'border-red-200')}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Pill tone={st.tone} icon={st.icon}>{st.label}</Pill>
                  {k.tanggal && <small className="text-xs text-subtle">{k.tanggal}</small>}
                  {k.batas && <small className="inline-flex items-center gap-1 text-xs font-semibold text-red-600"><IoTimeOutline className="size-3.5" />Batas: {k.batas}</small>}
                </div>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-ink">{k.judul}</h3>
                    <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
                      <span className="inline-flex items-center gap-1"><IoPersonOutline className="size-4" />{k.siswa} • Kelas {k.kelas}</span>
                      <span className="inline-flex items-center gap-1"><Kat className="size-4 text-navy" />{k.kategori}</span>
                    </p>
                  </div>
                  {k.skor && (
                    <div className="shrink-0 rounded-xl bg-soft/60 px-3 py-2 text-center">
                      <small className="block text-[10px] font-bold tracking-widest text-subtle">SKOR</small>
                      <b className="text-xl font-extrabold text-navy">{k.skor}</b><small className="text-xs text-subtle">/100</small>
                    </div>
                  )}
                </div>

                {k.status === 'menunggu' && (
                  <>
                    <div className="flex items-center gap-2 rounded-xl bg-surface p-3 text-sm">
                      <IoAttachOutline className="size-4 text-navy" />
                      <span className="min-w-0 flex-1 truncate font-medium text-ink">{k.file}</span>
                      <small className="text-xs text-subtle">{k.ukuran}</small>
                    </div>
                    <div className="mt-auto flex gap-2">
                      <Button variant="soft" size="sm" icon={IoEyeOutline} className="flex-1">Lihat Berkas</Button>
                      <Button variant="outline" size="sm" icon={IoCloseCircleOutline} className="flex-1" onClick={() => tarik(k.id)}>Tarik / Batalkan</Button>
                    </div>
                  </>
                )}
                {k.status === 'revisi' && (
                  <>
                    <p className="rounded-xl border border-red-200 bg-red-50/60 p-3 text-sm">
                      <b className="block text-red-800">Alasan Penolakan Dispen:</b>
                      <span className="text-ink">“{k.alasan}”</span>
                    </p>
                    <div className="mt-auto space-y-2">
                      <Button variant="danger" size="sm" icon={IoCloudUploadOutline} className="w-full" onClick={() => navigate('/guru/unggah')}>Perbaiki & Upload Ulang Berkas</Button>
                      <button type="button" className="w-full text-center text-xs font-semibold text-navy hover:underline">Detail Catatan Juri & Evaluasi</button>
                    </div>
                  </>
                )}
                {k.status === 'dinilai' && (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted">Progres Penilaian: {k.juriSelesai} dari {k.juriTotal} Juri Selesai</span>
                        <b className="text-navy">{Math.round((k.juriSelesai / k.juriTotal) * 100)}%</b>
                      </div>
                      <ProgressBar value={(k.juriSelesai / k.juriTotal) * 100} tone="green" />
                    </div>
                    <div className="mt-auto flex gap-2">
                      <Button variant="gray" size="sm" icon={IoStatsChartOutline} className="flex-1">Rubrik Penilaian</Button>
                      <Button variant="outline" size="sm" icon={IoShareSocialOutline} aria-label="Bagikan" />
                    </div>
                  </>
                )}
              </Card>
            );
          })}
        </section>
      ) : (
        <EmptyState icon={IoFolderOpenOutline} title="Belum ada karya" description="Belum ada karya pada kategori ini." />
      )}

      <p className="flex items-center justify-center gap-2 text-center text-xs text-subtle">
        <IoInformationCircleOutline className="size-4" /> Verifikasi berkas oleh Tim Kurasi Dispen Sulut dilakukan setelah karya diajukan.
      </p>
    </div>
  );
}
