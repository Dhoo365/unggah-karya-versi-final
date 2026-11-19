import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  IoBookOutline,
  IoBusinessOutline,
  IoIdCardOutline,
  IoKeyOutline,
  IoKeypadOutline,
  IoLocationOutline,
  IoLockClosedOutline,
  IoMailOutline,
  IoPersonOutline,
  IoRefreshCircleOutline,
  IoShieldCheckmarkOutline,
} from 'react-icons/io5';
import AccountLayout, { StepList } from '../../../components/layout/AccountLayout.jsx';
import { useUi } from '../../../components/feedback/index.js';
import { KONTAK } from '../../../lib/files.js';
import { Button, Card, Pill } from '../../../components/ui/index.js';
import { Checkbox, Field, FilePicker, PasswordInput, SelectInput, Step, StrengthMeter, TextInput, scrollToFirstError } from '../../../components/form/index.js';
import { cabangDinasList, tahapanVerifikasiGuru } from '../../../data/guruAkun.js';

const kosong = { nuptk: '', nik: '', nama: '', cabang: '', sekolah: '', mapel: '', wa: '', email: '', sandi: '', konfirmasi: '', setuju: false };
const ANGKA = { nuptk: 16, nik: 16, wa: 13 };

// Aturan validasi (sama dengan versi mobile)
function validasi(f, berkas, pesanBerkas) {
  return {
    nuptk: /^\d{16}$/.test(f.nuptk) ? '' : 'NUPTK / PegID harus 16 digit angka.',
    nik: /^\d{16}$/.test(f.nik) ? '' : 'NIK harus 16 digit angka.',
    nama: f.nama.trim().length >= 3 ? '' : 'Nama lengkap & gelar wajib diisi.',
    cabang: f.cabang ? '' : 'Pilih wilayah Cabang Dinas.',
    sekolah: f.sekolah.trim().length >= 3 ? '' : 'Nama satuan pendidikan wajib diisi.',
    mapel: f.mapel.trim().length >= 2 ? '' : 'Mata pelajaran / bidang binaan wajib diisi.',
    wa: /^8\d{8,11}$/.test(f.wa) ? '' : 'Masukkan nomor tanpa 0 di depan, contoh: 812 3456 7890.',
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email) ? '' : 'Format email belum benar.',
    sandi: f.sandi.length >= 8 && /[A-Za-z]/.test(f.sandi) && /\d/.test(f.sandi) ? '' : 'Minimal 8 karakter, kombinasi huruf dan angka.',
    konfirmasi: f.konfirmasi && f.konfirmasi === f.sandi ? '' : 'Konfirmasi belum sama dengan kata sandi.',
    berkas: berkas ? '' : pesanBerkas || 'Surat Tugas / SK wajib diunggah.',
    setuju: f.setuju ? '' : 'Pernyataan harus disetujui untuk melanjutkan.',
  };
}

// Pendaftaran akun guru pembimbing (versi mobile: GuruPendaftaran.vue)
export default function DaftarPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(kosong);
  const [berkas, setBerkas] = useState(null);
  const [pesanBerkas, setPesanBerkas] = useState('');
  const [touched, setTouched] = useState({});
  const [dicoba, setDicoba] = useState(false);
  const [mengirim, setMengirim] = useState(false);
  const [mengecek, setMengecek] = useState(false);
  const ui = useUi();
  // Validasi NUPTK ke GTK Dapodik (contoh). TODO: ganti dengan API resmi.
  const cekDapodik = async () => {
    if (!/^\d{16}$/.test(form.nuptk)) {
      setTouched((t) => ({ ...t, nuptk: true }));
      return ui.toast({ title: 'NUPTK belum lengkap', description: 'Masukkan 16 digit NUPTK / PegID terlebih dahulu.', tone: 'warning' });
    }
    setMengecek(true);
    await new Promise((r) => setTimeout(r, 900));
    setMengecek(false);
    setForm((f) => ({ ...f, nama: f.nama || 'Dra. Meiske Lumintang, M.Pd', sekolah: f.sekolah || 'SMA Negeri 1 Manado' }));
    ui.toast({ title: 'NUPTK aktif di GTK Dapodik', description: 'Nama dan unit kerja terisi otomatis.' });
  };

  const errors = useMemo(() => validasi(form, berkas, pesanBerkas), [form, berkas, pesanBerkas]);
  const err = (k) => (touched[k] || dicoba || (k === 'berkas' && pesanBerkas) ? errors[k] : '');
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e?.target ? e.target.value : e }));
  const blur = (k) => () => setTouched((t) => ({ ...t, [k]: true }));

  // NUPTK, NIK, dan WhatsApp hanya angka
  useEffect(() => {
    const bersih = Object.fromEntries(Object.entries(ANGKA).map(([k, n]) => [k, form[k].replace(/\D/g, '').slice(0, n)]));
    if (Object.keys(ANGKA).some((k) => bersih[k] !== form[k])) setForm((f) => ({ ...f, ...bersih }));
  }, [form]);

  const kirim = async (e) => {
    e.preventDefault();
    setDicoba(true);
    if (Object.values(errors).some(Boolean)) return scrollToFirstError();
    setMengirim(true);
    // TODO: kirim form dan berkas ke API pendaftaran. Jangan menulis kata sandi ke console/log.
    await new Promise((r) => setTimeout(r, 500));
    navigate('/daftar/guru/status');
  };

  const aside = (
    <>
      <Card className="space-y-3 border-navy/20 bg-soft/40">
        <b className="flex items-center gap-2 text-sm font-bold text-navy">
          <IoShieldCheckmarkOutline className="size-5" /> Validasi GTK Dapodik
        </b>
        <p className="text-sm leading-relaxed text-muted">
          Pastikan NUPTK atau PegID Anda terdaftar aktif di pangkalan data Dapodik sekolah binaan. Validasi terintegrasi dengan database GTK Kemendikbudristek & Cabang Dinas Pendidikan Prov. Sulut.
        </p>
      </Card>
      <Card className="space-y-4">
        <b className="text-sm font-bold">Setelah mendaftar</b>
        <StepList items={tahapanVerifikasiGuru} />
      </Card>
      <p className="flex items-center gap-2 text-xs text-subtle"><IoLockClosedOutline className="size-4" /> Transmisi data terenkripsi 256-Bit SSL / TLS</p>
    </>
  );

  return (
    <AccountLayout title="Pendaftaran Guru" badge={<Pill tone="blue">Portal Pendidik & Pembimbing</Pill>} aside={aside}>
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Pendaftaran Akun Guru Pembimbing</h1>
        <p className="mt-2 text-muted">Untuk pembimbing kontingen lomba siswa SMA/SMK/SLB se-Sulawesi Utara.</p>
      </div>

      <form onSubmit={kirim} noValidate className="space-y-6">
        <Card className="space-y-5">
          <Step n={1} title="Validasi Identitas PTK" />
          <Field label="NUPTK / PegID (16 Digit)" required extra={<Pill tone="blue">Wajib Dapodik</Pill>} error={err('nuptk')}>
            <TextInput
              icon={IoKeypadOutline}
              inputMode="numeric"
              placeholder="Contoh: 8345763665210083"
              value={form.nuptk}
              onChange={set('nuptk')}
              onBlur={blur('nuptk')}
              error={err('nuptk')}
              trailing={
                <button type="button" onClick={cekDapodik} disabled={mengecek} className="ui-press inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-soft px-3 py-1.5 text-xs font-bold text-navy hover:bg-ice disabled:opacity-70">
                  {mengecek && <i className="size-3 animate-spin rounded-full border-2 border-current border-r-transparent" />}
                  {mengecek ? 'Mengecek...' : 'Validasi Dapodik'}
                </button>
              }
            />
          </Field>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Nomor Induk Kependudukan (NIK)" required error={err('nik')}>
              <TextInput icon={IoIdCardOutline} inputMode="numeric" placeholder="16 digit sesuai e-KTP" value={form.nik} onChange={set('nik')} onBlur={blur('nik')} error={err('nik')} />
            </Field>
            <Field label="Nama Lengkap & Gelar" required error={err('nama')} hint="Gunakan ejaan resmi untuk pencetakan sertifikat pembimbing juara.">
              <TextInput icon={IoPersonOutline} placeholder="Misal: Dra. Maria Sondakh, M.Pd." value={form.nama} onChange={set('nama')} onBlur={blur('nama')} error={err('nama')} />
            </Field>
          </div>
        </Card>

        <Card className="space-y-5">
          <Step n={2} title="Data Penugasan & Sekolah" />
          <Field label="Cabang Dinas Wilayah (Sulawesi Utara)" required error={err('cabang')}>
            <SelectInput icon={IoLocationOutline} placeholder="Pilih Wilayah Cabang Dinas..." options={cabangDinasList} value={form.cabang} onChange={set('cabang')} onBlur={blur('cabang')} error={err('cabang')} />
          </Field>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Asal Satuan Pendidikan (SMA / SMK / SLB)" required error={err('sekolah')}>
              <TextInput icon={IoBusinessOutline} placeholder="Contoh: SMAN 1 Manado" value={form.sekolah} onChange={set('sekolah')} onBlur={blur('sekolah')} error={err('sekolah')} />
            </Field>
            <Field label="Mata Pelajaran / Bidang Binaan" required error={err('mapel')}>
              <TextInput icon={IoBookOutline} placeholder="Seni Budaya / TIK / Pembina OSIS" value={form.mapel} onChange={set('mapel')} onBlur={blur('mapel')} error={err('mapel')} />
            </Field>
          </div>
        </Card>

        <Card className="space-y-5">
          <Step n={3} title="Kontak & Akses Masuk" />
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Nomor WhatsApp Aktif" required error={err('wa')} hint="Untuk notifikasi verifikasi karya & OTP penilaian.">
              <TextInput
                inputMode="numeric"
                placeholder="812 3456 7890"
                value={form.wa}
                onChange={set('wa')}
                onBlur={blur('wa')}
                error={err('wa')}
                icon={() => <span className="flex h-full items-center border-r border-line pr-3 text-sm font-semibold text-muted">+62</span>}
              />
            </Field>
            <Field label="Email Resmi (belajar.id / Dinas / Pribadi)" required error={err('email')}>
              <TextInput icon={IoMailOutline} type="email" placeholder="nama.guru@guru.sma.belajar.id" value={form.email} onChange={set('email')} onBlur={blur('email')} error={err('email')} />
            </Field>
            <Field label="Kata Sandi Akun" required error={err('sandi')}>
              <PasswordInput icon={IoKeyOutline} placeholder="Minimal 8 karakter huruf & angka" value={form.sandi} onChange={set('sandi')} onBlur={blur('sandi')} error={err('sandi')} />
              <StrengthMeter value={form.sandi} />
            </Field>
            <Field label="Konfirmasi Kata Sandi" required error={err('konfirmasi')}>
              <PasswordInput icon={IoRefreshCircleOutline} placeholder="Ulangi kata sandi" value={form.konfirmasi} onChange={set('konfirmasi')} onBlur={blur('konfirmasi')} error={err('konfirmasi')} />
            </Field>
          </div>
        </Card>

        <Card className="space-y-5">
          <Step n={4} title="Dokumen Verifikasi Pembimbing" />
          <Field label="Surat Tugas / SK Kepala Sekolah Penetapan Pembimbing Lomba" required error={err('berkas')} hint="Dokumen hanya digunakan untuk akreditasi dewan juri tingkat provinsi.">
            <FilePicker
              file={berkas}
              onPick={(f, m) => { setBerkas(f); setPesanBerkas(m); }}
              accept={['application/pdf', 'image/jpeg', 'image/png']}
              maxMB={2}
              error={err('berkas')}
              title="Pilih Berkas SK / Surat Tugas"
              hint="Format PDF, JPG, atau PNG (Maksimum 2 MB)"
            />
          </Field>
          <Field error={err('setuju')}>
            <Checkbox checked={form.setuju} onChange={set('setuju')} error={err('setuju')}>
              Saya menyatakan dengan sesungguhnya bahwa seluruh data PTK adalah sah, dan sebagai Guru Pembimbing saya berkomitmen menjaga integritas dan orisinalitas karya cipta peserta didik bimbingan, serta mematuhi pedoman lomba Dinas Pendidikan Daerah Provinsi Sulawesi Utara.
            </Checkbox>
          </Field>
        </Card>

        <div className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted">
            Sudah memiliki akun terdaftar? <Link to="/onboarding" className="font-bold text-navy hover:underline">Masuk Portal Guru</Link>
          </p>
          <Button type="submit" size="lg" disabled={mengirim} className="w-full sm:w-auto">
            {mengirim ? 'Memproses...' : 'Daftar Sebagai Guru Pembimbing'}
          </Button>
        </div>
      </form>
    </AccountLayout>
  );
}
