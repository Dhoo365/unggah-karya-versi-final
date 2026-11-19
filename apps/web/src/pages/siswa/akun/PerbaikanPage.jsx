import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IoBusinessOutline,
  IoChatboxEllipsesOutline,
  IoHelpCircleOutline,
  IoImageOutline,
  IoLockClosedOutline,
  IoSendOutline,
  IoTimeOutline,
} from 'react-icons/io5';
import AccountLayout from '../../../components/layout/AccountLayout.jsx';
import { useUi } from '../../../components/feedback/index.js';
import { KONTAK } from '../../../lib/files.js';
import { Button, Card, Pill } from '../../../components/ui/index.js';
import { Field, FilePicker, SelectInput, TextArea, scrollToFirstError } from '../../../components/form/index.js';
import { pengajuanSiswa as siswa, rombelList, tiketPerbaikan as tiket } from '../../../data/siswaAkun.js';

const FORMAT = ['image/jpeg', 'image/png', 'application/pdf'];

// Perbaikan data akun siswa (versi mobile: SiswaStatusPerbaikan.vue)
export default function PerbaikanPage() {
  const navigate = useNavigate();
  const ui = useUi();
  const [rombel, setRombel] = useState('');
  const [catatan, setCatatan] = useState('');
  const [berkas, setBerkas] = useState(null);
  const [pesanBerkas, setPesanBerkas] = useState('');
  const [dicoba, setDicoba] = useState(false);

  const errRombel = dicoba && !rombel ? 'Pilih rombel kelas Anda.' : '';
  const errBerkas = pesanBerkas || (dicoba && !berkas ? 'Unggah scan Kartu Pelajar yang baru dan terbaca jelas.' : '');

  const kirim = (e) => {
    e.preventDefault();
    setDicoba(true);
    if (!rombel || !berkas) return scrollToFirstError();
    // TODO: kirim perbaikan ke API
    navigate('/daftar/siswa/status');
  };

  return (
    <AccountLayout title="Status & Perbaikan Akun" badge={<Pill tone="red">Perlu Revisi</Pill>} wide>
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          {/* catatan verifikator */}
          <Card className="space-y-4 border-amber-200 bg-amber-50/60">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <small className="text-[11px] font-bold tracking-widest text-subtle">ID TIKET VERIFIKASI</small>
                <b className="block font-mono text-lg text-ink">#{tiket.id}</b>
              </div>
              <Pill tone="amber" icon={IoTimeOutline}>Sisa {tiket.sisaWaktu}</Pill>
            </div>
            <p className="text-xs font-semibold text-amber-900">Catatan Verifikator • {tiket.verifikator}</p>
            <blockquote className="flex gap-3 rounded-xl bg-white p-4 text-sm leading-relaxed text-ink">
              <IoChatboxEllipsesOutline className="size-5 shrink-0 text-amber-600" />“{tiket.pesan}”
            </blockquote>
          </Card>

          {/* data Dapodik (hanya-baca) */}
          <Card className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold">Data Terverifikasi Dapodik</h2>
              <Pill tone="green">Sinkron Dapodik</Pill>
            </div>
            {[
              ['Nama Lengkap Siswa', siswa.nama],
              ['Nomor Induk Siswa Nasional', siswa.nisn],
              ['Satuan Pendidikan (Sekolah Asal)', siswa.sekolah],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center gap-3 rounded-xl bg-surface px-4 py-3">
                <div className="min-w-0 flex-1">
                  <small className="block text-xs text-subtle">{k}</small>
                  <b className="block text-sm font-semibold text-ink">{v}</b>
                </div>
                <IoLockClosedOutline className="size-4 text-subtle" />
              </div>
            ))}
            <p className="text-xs leading-relaxed text-subtle">Perubahan nama dan NISN hanya dapat diproses melalui Operator Dapodik Satuan Pendidikan.</p>
          </Card>
        </div>

        {/* formulir perbaikan */}
        <form onSubmit={kirim} noValidate>
          <Card className="space-y-5">
            <h2 className="text-lg font-bold text-navy">Formulir Perbaikan Data</h2>
            <Field label="Rombongan Belajar (Rombel)" required extra="Tahun Ajaran 2024/2025" error={errRombel} hint="Pilih rombel resmi sesuai SK Pembagian Kelas terkini.">
              <SelectInput icon={IoBusinessOutline} placeholder="Pilih rombel kelas" options={rombelList} value={rombel} onChange={(e) => setRombel(e.target.value)} error={errRombel} />
            </Field>

            <Field label="Scan Kartu Pelajar Siswa" required extra="JPG, PNG, PDF (maks 2 MB)" error={errBerkas}>
              <div className="mb-2 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50/60 p-3">
                <IoImageOutline className="size-5 text-red-600" />
                <div className="min-w-0 flex-1 text-sm">
                  <b className="block truncate font-semibold text-ink line-through decoration-red-400">{tiket.berkasLama.nama}</b>
                  <small className="text-xs text-red-700">Alasan penolakan: {tiket.berkasLama.alasan}</small>
                </div>
                <Pill tone="red">Ditolak</Pill>
              </div>
              <FilePicker
                file={berkas}
                onPick={(f, msg) => { setBerkas(f); setPesanBerkas(msg); }}
                accept={FORMAT}
                maxMB={2}
                error={errBerkas}
                title="Pilih Scan Kartu Pelajar Baru"
                hint="Pastikan foto tajam, terbaca jelas, dan tidak terpotong"
                readyLabel="Format sesuai"
              />
            </Field>

            <Field label="Catatan Tanggapan Siswa" optional extra={catatan.length ? `${catatan.length}/250 karakter` : 'Maks. 250 karakter'} hint="Pesan ini langsung terlihat oleh verifikator di Dinas Pendidikan.">
              <TextArea maxLength={250} placeholder="Tulis tanggapan singkat untuk verifikator..." value={catatan} onChange={(e) => setCatatan(e.target.value)} />
            </Field>

            <p className="rounded-xl bg-soft/50 p-3 text-xs leading-relaxed text-navy">
              Data perbaikan yang dikirim ulang akan masuk prioritas antrean kurasi verifikator dalam waktu 1×24 jam kerja.
            </p>
            <Button type="submit" size="lg" className="w-full" icon={IoSendOutline}>Kirim Ulang Perbaikan</Button>
            <Button variant="ghost" className="w-full" onClick={() => ui.buka(KONTAK.waHelpdesk, 'WhatsApp dibuka')} icon={IoHelpCircleOutline}>Bantuan / Hubungi Guru Pembimbing</Button>
          </Card>
        </form>
      </div>
    </AccountLayout>
  );
}
