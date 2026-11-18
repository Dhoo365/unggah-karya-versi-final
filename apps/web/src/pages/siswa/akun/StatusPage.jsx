import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoChatbubbleEllipsesOutline, IoHourglassOutline, IoLockClosedOutline, IoLogOutOutline, IoSyncOutline } from 'react-icons/io5';
import AccountLayout, { InfoList } from '../../../components/layout/AccountLayout.jsx';
import { Button, Card, Pill } from '../../../components/ui/index.js';
import { cx } from '../../../lib/cx.js';
import { pengajuanSiswa as p } from '../../../data/siswaAkun.js';

// Status akun siswa: menunggu verifikasi guru (versi mobile: SiswaAkunStatus.vue)
export default function StatusPage() {
  const navigate = useNavigate();
  const [memuat, setMemuat] = useState(false);

  const cekStatus = async () => {
    if (memuat) return;
    setMemuat(true);
    // TODO: cek status ke API. Jika disetujui → navigate('/siswa')
    setTimeout(() => setMemuat(false), 1200);
  };

  return (
    <AccountLayout title="Status Akun Siswa" badge={<Pill tone="amber">● Menunggu Verifikasi</Pill>}>
      <Card className="flex flex-col items-center gap-3 py-10 text-center">
        <span className="grid size-16 place-items-center rounded-full bg-amber-100 text-amber-700">
          <IoHourglassOutline className="size-8" />
        </span>
        <Pill tone="amber">Sedang Ditinjau</Pill>
        <h1 className="text-3xl font-extrabold tracking-tight">Pendaftaran Berhasil Diajukan</h1>
        <p className="max-w-lg text-muted">
          Akun Anda sedang dalam proses verifikasi oleh Guru Pembimbing di <b className="text-ink">{p.sekolah}</b>. Proses biasanya membutuhkan waktu 1×24 jam kerja.
        </p>
      </Card>

      <Card className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold">Ringkasan Data Siswa</h2>
          <Pill tone="gray" icon={IoLockClosedOutline}>Terkunci</Pill>
        </div>
        <InfoList
          rows={[
            ['Nomor Tiket', <code key="t" className="rounded bg-soft px-2 py-0.5 text-navy">#{p.tiket}</code>],
            ['Nama Siswa', p.nama],
            ['NISN', p.nisn],
            ['Sekolah', p.sekolah],
            ['Guru Verifikator', p.guru, 'text-navy'],
          ]}
        />
      </Card>

      <div className="rounded-2xl border border-navy/15 bg-soft/40 p-5">
        <b className="text-sm font-bold text-navy">Estimasi Selesai 1×24 Jam</b>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          Notifikasi WhatsApp otomatis atau pesan di portal ini akan dikirim segera setelah berkas disetujui oleh guru pembimbing Anda.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Button className="sm:col-span-3" size="lg" onClick={cekStatus} disabled={memuat} icon={() => <IoSyncOutline className={cx('size-5', memuat && 'animate-spin')} />}>
          {memuat ? 'Memeriksa Status...' : 'Perbarui Status'}
        </Button>
        <Button variant="outline" icon={IoChatbubbleEllipsesOutline} className="sm:col-span-2">Hubungi Guru</Button>
        <Button variant="danger" icon={IoLogOutOutline} onClick={() => navigate('/')}>Keluar Akun</Button>
      </div>
    </AccountLayout>
  );
}
