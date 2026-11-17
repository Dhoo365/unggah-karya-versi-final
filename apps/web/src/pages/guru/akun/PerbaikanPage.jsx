import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IoChatboxEllipsesOutline,
  IoCheckmarkCircle,
  IoDocumentTextOutline,
  IoHeadsetOutline,
  IoLockClosedOutline,
  IoSendOutline,
  IoTimeOutline,
} from 'react-icons/io5';
import AccountLayout from '../../../components/layout/AccountLayout.jsx';
import { Button, Card, Pill } from '../../../components/ui/index.js';
import { Field, FilePicker, TextArea, TextInput, scrollToFirstError } from '../../../components/form/index.js';
import { pengajuanGuru as guru, tiketPerbaikanGuru as tiket } from '../../../data/guruAkun.js';

const MAKS = 200;

// Perbaikan berkas akun guru (versi mobile: GuruStatusPerbaikan.vue)
export default function PerbaikanPage() {
  const navigate = useNavigate();
  const [nomorSk, setNomorSk] = useState(tiket.nomorSk);
  const [catatan, setCatatan] = useState('');
  const [berkas, setBerkas] = useState(null);
  const [pesanBerkas, setPesanBerkas] = useState('');
  const [dicoba, setDicoba] = useState(false);
  const [mengirim, setMengirim] = useState(false);

  const errNomor = dicoba && nomorSk.trim().length < 3 ? 'Nomor SK Pembimbing wajib diisi.' : '';
  const errBerkas = pesanBerkas || (dicoba && !berkas ? 'Unggah SK pengganti yang sudah berstempel basah.' : '');

  const kirim = async (e) => {
    e.preventDefault();
    if (mengirim) return;
    setDicoba(true);
    if (nomorSk.trim().length < 3 || !berkas) return scrollToFirstError();
    setMengirim(true);
    // TODO: kirim nomorSk, berkas, dan catatan ke API koreksi berkas
    await new Promise((r) => setTimeout(r, 500));
    navigate('/daftar/guru/status');
  };

  return (
    <AccountLayout title="Akun Guru Pembimbing" badge={<Pill tone="red">● Perlu Perbaikan</Pill>} wide>
      <div className="grid gap-6 [&>*]:min-w-0 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          <Card className="space-y-4 border-amber-200 bg-amber-50/60">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <small className="text-[11px] font-bold tracking-widest text-subtle">TIKET VERIFIKASI</small>
                <b className="block font-mono text-lg text-ink">#{tiket.id}</b>
              </div>
              <Pill tone="amber" icon={IoTimeOutline}>{tiket.batasHari} hari kerja</Pill>
            </div>
            <h2 className="font-bold text-ink">Pemberitahuan Revisi Berkas</h2>
            <p className="text-xs font-semibold text-amber-900">Verifikator Cabdin Sulut</p>
            <blockquote className="flex gap-3 rounded-xl bg-white p-4 text-sm leading-relaxed text-ink">
              <IoChatboxEllipsesOutline className="size-5 shrink-0 text-amber-600" />“{tiket.pesan}”
            </blockquote>
            <p className="text-xs text-amber-900">Batas perbaikan hingga <b>{tiket.batasTanggal}</b></p>
          </Card>

          <Card className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold">Data PTK Dapodik</h2>
              <Pill tone="gray" icon={IoLockClosedOutline}>Terkunci</Pill>
            </div>
            {[
              ['Nama Lengkap Guru Pembimbing', guru.nama, <Pill key="v" tone="green" icon={IoCheckmarkCircle}>Terverifikasi</Pill>],
              ['NIP / NUPTK', <span key="n" className="font-mono">{guru.nip}</span>],
              ['Unit Kerja', guru.sekolah],
            ].map(([k, v, extra]) => (
              <div key={k} className="flex items-center gap-3 rounded-xl bg-surface px-4 py-3">
                <div className="min-w-0 flex-1">
                  <small className="block text-xs text-subtle">{k}</small>
                  <b className="block text-sm font-semibold text-ink">{v}</b>
                </div>
                {extra ?? <IoLockClosedOutline className="size-4 text-subtle" />}
              </div>
            ))}
          </Card>
        </div>

        <form onSubmit={kirim} noValidate>
          <Card className="space-y-5">
            <div>
              <h2 className="text-lg font-bold text-navy">Formulir Koreksi Berkas</h2>
              <small className="text-sm text-muted">Perbarui berkas sesuai arahan verifikator</small>
            </div>
            <Field label="Nomor SK Pembimbing" required error={errNomor}>
              <TextInput icon={IoDocumentTextOutline} placeholder="Nomor SK Penugasan" value={nomorSk} onChange={(e) => setNomorSk(e.target.value)} error={errNomor} />
            </Field>
            <Field label="Lampiran SK Pembimbing (Format PDF)" required extra="PDF asli, maks 5 MB" error={errBerkas}>
              <div className="mb-2 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50/60 p-3">
                <span className="grid size-9 place-items-center rounded-lg bg-white text-[10px] font-bold text-red-600">PDF</span>
                <div className="min-w-0 flex-1 text-sm">
                  <b className="block truncate font-semibold text-ink line-through decoration-red-400">{tiket.berkasLama.nama}</b>
                  <small className="text-xs text-red-700">{tiket.berkasLama.ukuran} • {tiket.berkasLama.alasan}</small>
                </div>
                <Pill tone="red">Perlu Diganti</Pill>
              </div>
              <FilePicker
                file={berkas}
                onPick={(f, m) => { setBerkas(f); setPesanBerkas(m); }}
                accept={['application/pdf']}
                maxMB={5}
                error={errBerkas}
                title="Pilih Berkas SK Pengganti"
                hint="Maksimal 5 MB (PDF asli, bersetempel basah)"
                readyLabel="Berkas Siap Dikirim"
              />
            </Field>
            <Field label="Catatan untuk Verifikator Cabdin Sulut" optional extra={`${catatan.length}/${MAKS}`} hint="Berikan klarifikasi jika diperlukan.">
              <TextArea maxLength={MAKS} placeholder="Tulis klarifikasi singkat..." value={catatan} onChange={(e) => setCatatan(e.target.value)} />
            </Field>
            <Button type="submit" size="lg" className="w-full" icon={IoSendOutline} disabled={mengirim}>{mengirim ? 'Mengirim...' : 'Kirim Ulang Berkas Guru'}</Button>
            <Button type="button" variant="ghost" className="w-full" icon={IoHeadsetOutline}>Hubungi Helpdesk Cabdin</Button>
          </Card>
        </form>
      </div>
    </AccountLayout>
  );
}
