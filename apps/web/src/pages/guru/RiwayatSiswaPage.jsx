import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  IoArrowBackOutline,
  IoCalendarOutline,
  IoDownloadOutline,
  IoEyeOutline,
  IoPrintOutline,
  IoShieldCheckmarkOutline,
  IoSwapHorizontalOutline,
  IoTrophyOutline,
} from 'react-icons/io5';
import { Avatar, Button, Card, IconBox, Pill, SectionHeader } from '../../components/ui/index.js';
import AuditTimeline from '../../components/guru/AuditTimeline.jsx';
import { cx } from '../../lib/cx.js';
import { logAudit, portofolioSiswa, siswaBinaan, statusSiswa } from '../../data/guru.js';
import { useUi } from '../../components/feedback/index.js';
import { dokumen } from '../../data/dokumen.js';

// Riwayat portofolio satu siswa (versi mobile: GuruRiwayatSiswa.vue)
export default function RiwayatSiswaPage() {
  const { nisn } = useParams();
  const siswa = siswaBinaan.find((s) => s.id === nisn) ?? siswaBinaan[0];
  const st = statusSiswa[siswa.status];
  const { lomba, catatanGuru, peminatan } = portofolioSiswa;
  const [tab, setTab] = useState('karya');
  const ui = useUi();
  const submisi = (l) => dokumen(`Submisi: ${l.judul}`, { label: 'Detail Submisi', baris: [['Siswa', siswa.name], ['NISN', siswa.nisn], ['Kompetisi', l.kompetisi], ['Tahap', l.label], ['Tanggal Submisi', l.tanggal], ['Skor Sementara', l.skor], ['Catatan', l.catatan ?? '—']] });
  const sertifikat = (l) => dokumen(`E-Sertifikat ${l.label} — ${l.judul}`, { jenis: 'sertifikat', nomor: l.noReg, baris: [['Nama', siswa.name], ['NISN', siswa.nisn], ['Kompetisi', l.kompetisi], ['Skor Akhir', l.skor]] });
  const statistik = [
    { label: 'Lomba Diikuti', value: lomba.length, cls: 'text-navy' },
    { label: 'Dalam Penjurian', value: lomba.filter((l) => l.tipe === 'proses').length, cls: 'text-secondary' },
    { label: 'Lolos Juara', value: lomba.filter((l) => l.tipe === 'juara').length, cls: 'text-orange-600' },
  ];

  return (
    <div className="space-y-6">
      <Link to="/guru/siswa" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:underline">
        <IoArrowBackOutline className="size-4" /> Kembali ke Daftar Siswa
      </Link>

      {/* ---------- Identitas ---------- */}
      <Card className="grid gap-6 [&>*]:min-w-0 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="flex items-center gap-4">
          <Avatar initials={siswa.initial} size="lg" tone="navy" />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <b className="text-xl font-bold text-ink">{siswa.name}</b>
              <Pill tone={st.tone}>{st.label}</Pill>
            </div>
            <small className="block text-sm text-muted">NISN: {siswa.nisn} • Kelas: {siswa.kelas}</small>
            <small className="block text-sm text-subtle">{peminatan}</small>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {statistik.map((s) => (
            <div key={s.label} className="rounded-xl bg-surface px-4 py-3 text-center">
              <b className={cx('block text-2xl font-extrabold', s.cls)}>{s.value}</b>
              <small className="text-xs text-muted">{s.label}</small>
            </div>
          ))}
        </div>
      </Card>

      {/* ---------- Tab ---------- */}
      <div className="flex gap-1 rounded-xl bg-surface p-1 sm:w-fit">
        {[['karya', `Karya & Lomba (${lomba.length})`], ['audit', 'Log Audit Status']].map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={cx('flex-1 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold', tab === id ? 'bg-white text-navy shadow-sm' : 'text-muted hover:text-ink')}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'karya' ? (
        <div className="grid gap-6 [&>*]:min-w-0 xl:grid-cols-[1fr_340px]">
          <section className="space-y-4">
            <SectionHeader title="Daftar Partisipasi Kompetisi" subtitle="Tahun Ajaran 2024/2025" />
            {lomba.map((l) => (
              <Card key={l.id} as="article" className={cx('space-y-4', l.tipe === 'juara' && 'border-amber-300 ring-2 ring-amber-100')}>
                <div className="flex flex-wrap items-start gap-3">
                  <IconBox icon={l.icon} tone={l.tipe === 'juara' ? 'amber' : 'blue'} />
                  <div className="min-w-0 flex-1 basis-52">
                    <small className="text-xs font-semibold text-subtle">{l.kompetisi}</small>
                    <h3 className="font-bold text-ink">{l.judul}</h3>
                  </div>
                  <Pill tone={l.tipe === 'juara' ? 'amber' : 'sky'} icon={l.tipe === 'juara' ? IoTrophyOutline : undefined}>{l.label}</Pill>
                </div>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl bg-surface p-3 text-sm">
                  <span className="inline-flex items-center gap-1.5 text-muted"><IoCalendarOutline className="size-4" /> Submisi: <b className="text-ink">{l.tanggal}</b></span>
                  {l.tipe === 'proses' ? (
                    <span className="text-muted">Skor Sementara: <b className="text-navy">{l.skor}</b></span>
                  ) : (
                    <>
                      <span className="inline-flex items-center gap-1 text-emerald-700"><IoShieldCheckmarkOutline className="size-4" /> Validasi Dikda Sulut: Selesai</span>
                      <span className="text-muted">Skor Akhir: <b className="text-navy">{l.skor}</b></span>
                      <span className="font-mono text-xs text-subtle">No. Reg: {l.noReg}</span>
                    </>
                  )}
                </div>
                {l.catatan && <p className="text-sm text-muted">Catatan: {l.catatan}</p>}
                <div className="flex justify-end">
                  {l.tipe === 'proses'
                    ? <Button variant="outline" size="sm" icon={IoEyeOutline} onClick={() => ui.lihat(submisi(l))}>Lihat Detail Submisi</Button>
                    : <Button size="sm" icon={IoDownloadOutline} onClick={() => ui.unduh(sertifikat(l))}>Unduh E-Sertifikat</Button>}
                </div>
              </Card>
            ))}
          </section>
          <aside className="space-y-4">
            <Card className="space-y-3">
              <h2 className="text-base font-bold">Catatan Guru Pembimbing</h2>
              <blockquote className="border-l-4 border-gold pl-4 text-sm leading-relaxed text-ink italic">“{catatanGuru.isi}”</blockquote>
              <small className="block text-xs text-muted">{catatanGuru.nama} • Diperbarui {catatanGuru.tanggal}</small>
            </Card>
            <Button variant="outline" icon={IoPrintOutline} className="w-full" onClick={() => ui.unduh(dokumen(`Rekap Portofolio ${siswa.name}`, { jenis: 'rekap', label: 'Rekap Portofolio', baris: [['Nama', siswa.name], ['NISN', siswa.nisn], ['Kelas', siswa.kelas], ['Peminatan', peminatan], ...lomba.map((l) => [l.kompetisi, `${l.judul} • ${l.label} • Skor ${l.skor}`]), ['Catatan Guru', catatanGuru.isi]] }))}>Cetak Rekap Portofolio (PDF)</Button>
          </aside>
        </div>
      ) : (
        <Card className="space-y-5">
          <SectionHeader
            title="Riwayat Perubahan Status"
            subtitle="Audit Trail Terverifikasi"
            action={<Link to={`/guru/siswa/${siswa.id}/status`}><Button size="sm" icon={IoSwapHorizontalOutline}>Kelola Status</Button></Link>}
          />
          <AuditTimeline items={logAudit} />
        </Card>
      )}
    </div>
  );
}
