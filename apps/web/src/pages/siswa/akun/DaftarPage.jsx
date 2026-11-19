import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  IoBookmarkOutline,
  IoChatbubbleEllipsesOutline,
  IoKeyOutline,
  IoKeypadOutline,
  IoMailOutline,
  IoMapOutline,
  IoPersonOutline,
  IoRefreshCircleOutline,
  IoSchoolOutline,
  IoShieldCheckmarkOutline,
} from 'react-icons/io5';
import AccountLayout, { StepList } from '../../../components/layout/AccountLayout.jsx';
import { useUi } from '../../../components/feedback/index.js';
import { KONTAK } from '../../../lib/files.js';
import { Button, Card, Pill } from '../../../components/ui/index.js';
import { Checkbox, Field, PasswordInput, RadioCards, SelectInput, Step, StrengthMeter, TextInput, scrollToFirstError } from '../../../components/form/index.js';
import { cabdinList, jenjangSiswa, tahapanVerifikasi } from '../../../data/siswaAkun.js';

const kosong = { nisn: '', nama: '', jenjang: '', cabdin: '', sekolah: '', kelas: '', email: '', wa: '', sandi: '', konfirmasi: '', setuju: false };

// Aturan validasi (sama dengan versi mobile)
function validasi(f) {
  return {
    nisn: /^\d{10}$/.test(f.nisn) ? '' : 'NISN harus 10 digit angka.',
    nama: f.nama.trim().length >= 3 ? '' : 'Nama lengkap siswa wajib diisi.',
    jenjang: f.jenjang ? '' : 'Pilih jenjang pendidikan.',
    cabdin: f.cabdin ? '' : 'Pilih wilayah Cabang Dinas.',
    sekolah: f.sekolah.trim().length >= 3 ? '' : 'Asal sekolah wajib diisi.',
    kelas: f.kelas.trim().length >= 2 ? '' : 'Kelas dan jurusan wajib diisi.',
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email) ? '' : 'Format email belum benar.',
    wa: /^(\+62|62|0)8\d{8,11}$/.test(f.wa.replace(/[\s-]/g, '')) ? '' : 'Masukkan nomor seluler Indonesia yang valid (contoh: +62 812 3456 7890).',
    sandi: f.sandi.length >= 8 && /[A-Za-z]/.test(f.sandi) && /\d/.test(f.sandi) ? '' : 'Minimal 8 karakter, kombinasi huruf dan angka.',
    konfirmasi: f.konfirmasi && f.konfirmasi === f.sandi ? '' : 'Konfirmasi belum sama dengan kata sandi.',
    setuju: f.setuju ? '' : 'Pernyataan harus disetujui untuk melanjutkan.',
  };
}

// Pendaftaran akun siswa (versi mobile: SiswaDaftar.vue)
export default function DaftarPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(kosong);
  const [touched, setTouched] = useState({});
  const [dicoba, setDicoba] = useState(false);
  const [mengirim, setMengirim] = useState(false);
  const [mengecek, setMengecek] = useState(false);
  const ui = useUi();
  // Cek NISN ke Dapodik (contoh). TODO: ganti dengan API Dapodik/Verval PD.
  const cekDapodik = async () => {
    if (!/^\d{10}$/.test(form.nisn)) {
      setTouched((t) => ({ ...t, nisn: true }));
      return ui.toast({ title: 'NISN belum lengkap', description: 'Masukkan 10 digit NISN terlebih dahulu.', tone: 'warning' });
    }
    setMengecek(true);
    await new Promise((r) => setTimeout(r, 900));
    setMengecek(false);
    setForm((f) => ({ ...f, nama: f.nama || 'Christian Tatengkeng', sekolah: f.sekolah || 'SMAN 1 Manado' }));
    ui.toast({ title: 'NISN ditemukan di Dapodik', description: 'Nama dan sekolah terisi otomatis. Periksa kembali sebelum mendaftar.' });
  };

  const errors = useMemo(() => validasi(form), [form]);
  const err = (k) => (touched[k] || dicoba ? errors[k] : '');
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e?.target ? e.target.value : e }));
  const blur = (k) => () => setTouched((t) => ({ ...t, [k]: true }));

  // NISN hanya angka, maksimal 10 digit
  useEffect(() => {
    const bersih = form.nisn.replace(/\D/g, '').slice(0, 10);
    if (bersih !== form.nisn) setForm((f) => ({ ...f, nisn: bersih }));
  }, [form.nisn]);

  const kirim = async (e) => {
    e.preventDefault();
    setDicoba(true);
    if (Object.values(errors).some(Boolean)) return scrollToFirstError();
    setMengirim(true);
    try {
      // TODO: kirim data pendaftaran ke API. Jangan menulis kata sandi ke console/log.
      navigate('/daftar/siswa/verifikasi');
    } finally {
      setMengirim(false);
    }
  };

  const aside = (
    <>
      <Card className="space-y-3 border-navy/20 bg-soft/40">
        <b className="flex items-center gap-2 text-sm font-bold text-navy">
          <IoShieldCheckmarkOutline className="size-5" /> Validasi Data Dapodik
        </b>
        <p className="text-sm leading-relaxed text-muted">
          Pastikan NISN aktif dan terdaftar di Dapodik untuk validasi otomatis delegasi sekolah dan pembuatan nomor peserta kompetisi.
        </p>
      </Card>
      <Card className="space-y-4">
        <b className="text-sm font-bold">Setelah mendaftar</b>
        <StepList items={tahapanVerifikasi} />
      </Card>
    </>
  );

  return (
    <AccountLayout title="Pendaftaran Siswa" badge={<Pill tone="blue">Akun Resmi Peserta</Pill>} aside={aside}>
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Daftar Akun Siswa Baru</h1>
        <p className="mt-2 text-muted">Registrasi peserta lomba talenta & karya seni tingkat SMA/SMK/SLB se-Sulawesi Utara.</p>
      </div>

      <form onSubmit={kirim} noValidate className="space-y-6">
        <Card className="space-y-5">
          <Step n={1} title="Identitas Siswa Dapodik" />
          <Field label="Nomor Induk Siswa Nasional (NISN)" required error={err('nisn')} hint="Ketik 10 angka NISN Anda lalu klik Cek Dapodik.">
            <TextInput
              icon={IoKeypadOutline}
              inputMode="numeric"
              placeholder="10 digit NISN aktif"
              value={form.nisn}
              onChange={set('nisn')}
              onBlur={blur('nisn')}
              error={err('nisn')}
              trailing={
                <button type="button" onClick={cekDapodik} disabled={mengecek} className="ui-press inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-soft px-3 py-1.5 text-xs font-bold text-navy hover:bg-ice disabled:opacity-70">
                  {mengecek && <i className="size-3 animate-spin rounded-full border-2 border-current border-r-transparent" />}
                  {mengecek ? 'Mengecek...' : 'Cek Dapodik'}
                </button>
              }
            />
          </Field>
          <Field label="Nama Lengkap Siswa" required error={err('nama')}>
            <TextInput icon={IoPersonOutline} placeholder="Nama sesuai kartu identitas / akta" value={form.nama} onChange={set('nama')} onBlur={blur('nama')} error={err('nama')} />
          </Field>
        </Card>

        <Card className="space-y-5">
          <Step n={2} title="Satuan Pendidikan & Wilayah" />
          <Field label="Jenjang Pendidikan" required error={err('jenjang')}>
            <RadioCards name="jenjang" options={jenjangSiswa} value={form.jenjang} onChange={set('jenjang')} error={err('jenjang')} />
          </Field>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Wilayah Cabang Dinas (Cabdin)" required error={err('cabdin')} className="md:col-span-2">
              <SelectInput icon={IoMapOutline} placeholder="Pilih Wilayah Cabang Dinas" options={cabdinList} value={form.cabdin} onChange={set('cabdin')} onBlur={blur('cabdin')} error={err('cabdin')} />
            </Field>
            <Field label="Asal Sekolah" required error={err('sekolah')}>
              <TextInput icon={IoSchoolOutline} placeholder="Contoh: SMAN 1 Manado" value={form.sekolah} onChange={set('sekolah')} onBlur={blur('sekolah')} error={err('sekolah')} />
            </Field>
            <Field label="Kelas & Jurusan" required error={err('kelas')}>
              <TextInput icon={IoBookmarkOutline} placeholder="Contoh: XII RPL / XI IPA" value={form.kelas} onChange={set('kelas')} onBlur={blur('kelas')} error={err('kelas')} />
            </Field>
          </div>
        </Card>

        <Card className="space-y-5">
          <Step n={3} title="Kontak & Keamanan Akun" />
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Alamat Email Aktif" required error={err('email')} hint="Sertifikat digital & berkas kurasi dikirim ke email ini.">
              <TextInput icon={IoMailOutline} type="email" placeholder="nama.siswa@gmail.com" value={form.email} onChange={set('email')} onBlur={blur('email')} error={err('email')} />
            </Field>
            <Field label="Nomor WhatsApp Aktif" required error={err('wa')}>
              <TextInput icon={IoChatbubbleEllipsesOutline} type="tel" placeholder="+62 812 3456 7890" value={form.wa} onChange={set('wa')} onBlur={blur('wa')} error={err('wa')} />
            </Field>
            <Field label="Kata Sandi Baru" required error={err('sandi')}>
              <PasswordInput icon={IoKeyOutline} placeholder="Minimal 8 karakter (huruf & angka)" value={form.sandi} onChange={set('sandi')} onBlur={blur('sandi')} error={err('sandi')} />
              <StrengthMeter value={form.sandi} />
            </Field>
            <Field label="Konfirmasi Kata Sandi" required error={err('konfirmasi')}>
              <PasswordInput icon={IoRefreshCircleOutline} placeholder="Ulangi kata sandi di atas" value={form.konfirmasi} onChange={set('konfirmasi')} onBlur={blur('konfirmasi')} error={err('konfirmasi')} />
            </Field>
          </div>
          <Field error={err('setuju')}>
            <Checkbox checked={form.setuju} onChange={set('setuju')} error={err('setuju')}>
              Saya menyatakan seluruh data yang diisikan benar, otentik, dan bersedia mematuhi pedoman lomba Dinas Pendidikan Daerah Provinsi Sulawesi Utara.
            </Checkbox>
          </Field>
        </Card>

        <div className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted">
            Sudah memiliki akun? <Link to="/onboarding" className="font-bold text-navy hover:underline">Masuk di sini</Link>
          </p>
          <Button type="submit" size="lg" disabled={mengirim} className="w-full sm:w-auto">
            {mengirim ? 'Memproses...' : 'Daftar Sekarang'}
          </Button>
        </div>
      </form>
    </AccountLayout>
  );
}
