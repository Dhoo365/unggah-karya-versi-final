import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoDocumentTextOutline, IoEyeOutline, IoHeadsetOutline, IoHourglassOutline, IoLogOutOutline, IoSyncOutline, IoTimeOutline } from 'react-icons/io5';
import AccountLayout, { InfoList, StepList } from '../../../components/layout/AccountLayout.jsx';
import { useUi } from '../../../components/feedback/index.js';
import { KONTAK } from '../../../lib/files.js';
import { Button, Card, Pill } from '../../../components/ui/index.js';
import { cx } from '../../../lib/cx.js';
import { pengajuanGuru as p, tahapanVerifikasiGuru } from '../../../data/guruAkun.js';
import { dokumen } from '../../../data/dokumen.js';

// Status akun guru: menunggu verifikasi Cabdin (versi mobile: GuruStatusAkun.vue)
export default function StatusPage() {
  const navigate = useNavigate();
  const [memuat, setMemuat] = useState(false);

  const ui = useUi();
  const cekStatus = async () => {
    if (memuat) return;
    setMemuat(true);
    // TODO: cek status ke API. Jika disetujui → navigate('/guru')
    await new Promise((r) => setTimeout(r, 1200));
    setMemuat(false);
    ui.toast({
      title: 'Status belum berubah',
      description: 'Berkas Anda masih dalam antrean peninjauan.',
      tone: 'info',
      durasi: 7000,
      // tombol demo untuk melihat alur setelah akun disetujui
      action: { label: 'Simulasikan disetujui →', onClick: () => { navigate('/guru'); ui.toast({ title: 'Akun disetujui!', description: 'Selamat datang di portal SIKARYA.' }); } },
    });
  };

  const aside = (
    <Card className="space-y-4">
      <b className="text-sm font-bold">Tahapan verifikasi</b>
      <StepList items={tahapanVerifikasiGuru} />
    </Card>
  );

  return (
    <AccountLayout title="Status Akun Guru" badge={<Pill tone="amber">● Menunggu Verifikasi</Pill>} aside={aside}>
      <Card className="flex flex-col items-center gap-3 py-10 text-center">
        <span className="grid size-16 place-items-center rounded-full bg-amber-100 text-amber-700">
          <IoHourglassOutline className="size-8" />
        </span>
        <Pill tone="amber">Sedang Ditinjau</Pill>
        <h1 className="text-3xl font-extrabold tracking-tight">Berkas Pengajuan Sedang Ditinjau</h1>
        <p className="max-w-lg text-muted">
          Data Dapodik dan SK Penugasan Anda sedang dalam antrean verifikasi oleh Verifikator Dinas Pendidikan Daerah Provinsi Sulawesi Utara (Cabdin).
        </p>
      </Card>

      <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-navy/15 bg-soft/40 p-5">
        <IoTimeOutline className="size-7 shrink-0 text-navy" />
        <div className="min-w-0 flex-1">
          <small className="text-xs text-subtle">Tahap Verifikasi</small>
          <b className="block font-bold text-ink">{p.tahap}</b>
        </div>
        <Pill tone="blue">Antrean #{p.antrean}</Pill>
      </div>

      <Card className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-base font-bold">Identitas Pengajuan</h2>
          <code className="rounded bg-soft px-2 py-0.5 text-xs font-bold text-navy">#{p.noReg}</code>
        </div>
        <InfoList
          rows={[
            ['Nama Guru Pembimbing', p.nama],
            ['NIP / NUPTK', p.nip, 'font-mono'],
            ['Unit Kerja (Sekolah)', p.sekolah, 'text-navy'],
            ['Dokumen Terlampir', (
              <span key="b" className="flex flex-wrap items-center gap-2">
                <IoDocumentTextOutline className="size-4 text-red-600" /> {p.berkas.nama}
                <small className="font-normal text-subtle">{p.berkas.ukuran} • PDF</small>
                <button type="button" onClick={() => ui.lihat(dokumen('SK Penugasan Guru Pembimbing Lomba 2025', { jenis: 'sk', ukuran: p.berkas.ukuran, namaFile: p.berkas.nama, baris: [['Nama', p.nama], ['NIP / NUPTK', p.nip], ['Unit Kerja', p.sekolah]] }))} className="inline-flex items-center gap-1 text-xs font-bold text-navy hover:underline"><IoEyeOutline className="size-3.5" />Lihat</button>
              </span>
            )],
          ]}
        />
      </Card>

      <p className="text-sm text-muted">
        Hasil verifikasi menentukan hak akses Anda ke Portal Pengunggahan & Kurasi Karya Siswa. Estimasi <b className="text-ink">1–2 hari kerja</b>.
      </p>

      <div className="grid gap-3 sm:grid-cols-3">
        <Button className="sm:col-span-3" size="lg" onClick={cekStatus} disabled={memuat} icon={() => <IoSyncOutline className={cx('size-5', memuat && 'animate-spin')} />}>
          {memuat ? 'Memeriksa Status...' : 'Cek Status Terbaru'}
        </Button>
        <Button variant="outline" icon={IoHeadsetOutline} className="sm:col-span-2" onClick={() => ui.buka(KONTAK.waHelpdesk, 'WhatsApp dibuka')}>Hubungi Helpdesk Cabdin Sulut</Button>
        <Button variant="danger" icon={IoLogOutOutline} onClick={() => navigate('/')}>Keluar</Button>
      </div>
    </AccountLayout>
  );
}
