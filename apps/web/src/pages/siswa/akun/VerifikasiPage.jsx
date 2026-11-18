import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoCheckmarkCircle, IoLockClosedOutline, IoLogoWhatsapp, IoMailOutline, IoTimeOutline } from 'react-icons/io5';
import AccountLayout, { StepList } from '../../../components/layout/AccountLayout.jsx';
import { Avatar, Button, Card, Pill } from '../../../components/ui/index.js';
import { OtpInput } from '../../../components/form/index.js';
import { cx } from '../../../lib/cx.js';
import { siswaTerdaftar, tahapanVerifikasi } from '../../../data/siswaAkun.js';

const PANJANG = 6;
const JEDA = 90; // detik sebelum boleh kirim ulang

// Verifikasi OTP akun siswa (versi mobile: SiswaVerifikasi.vue)
export default function VerifikasiPage() {
  const navigate = useNavigate();
  const [digits, setDigits] = useState(Array(PANJANG).fill(''));
  const [galat, setGalat] = useState('');
  const [sisa, setSisa] = useState(JEDA);
  const [memverifikasi, setMemverifikasi] = useState(false);
  const lengkap = digits.join('').length === PANJANG;

  useEffect(() => {
    if (sisa <= 0) return;
    const t = setTimeout(() => setSisa((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [sisa]);

  const waktu = `${String(Math.floor(sisa / 60)).padStart(2, '0')}:${String(sisa % 60).padStart(2, '0')}`;

  const kirimUlang = () => {
    if (sisa > 0) return;
    // TODO: minta server mengirim ulang kode. Server juga harus membatasi frekuensi kirim.
    setDigits(Array(PANJANG).fill(''));
    setGalat('');
    setSisa(JEDA);
  };

  const verifikasi = async () => {
    if (!lengkap || memverifikasi) return;
    setMemverifikasi(true);
    setGalat('');
    try {
      // TODO: kirim kode ke API. Jika gagal: setGalat('Kode OTP salah atau sudah kedaluwarsa.')
      navigate('/daftar/siswa/status');
    } finally {
      setMemverifikasi(false);
    }
  };

  const aside = (
    <Card className="space-y-4">
      <b className="text-sm font-bold">Tahapan Pasca Verifikasi</b>
      <StepList items={tahapanVerifikasi} />
    </Card>
  );

  return (
    <AccountLayout title="Aktivasi Akun" badge={<Pill tone="amber">Tahap Terakhir</Pill>} aside={aside}>
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Verifikasi Akun Anda</h1>
        <p className="mt-2 text-muted">Kode verifikasi 6 digit telah dikirimkan ke email dan nomor WhatsApp resmi siswa terdaftar.</p>
      </div>

      <Card className="flex flex-wrap items-center gap-4">
        <Avatar initials={siswaTerdaftar.nama.split(' ').map((w) => w[0]).join('').slice(0, 2)} size="lg" />
        <div className="min-w-0 flex-1">
          <b className="block text-lg font-bold">{siswaTerdaftar.nama}</b>
          <span className="text-sm text-muted">NISN: {siswaTerdaftar.nisn} • {siswaTerdaftar.sekolah}</span>
        </div>
        <div className="grid w-full gap-2 sm:grid-cols-2">
          {[
            [IoMailOutline, 'Email Siswa', siswaTerdaftar.email],
            [IoLogoWhatsapp, 'WhatsApp Resmi', siswaTerdaftar.telepon],
          ].map(([Icon, label, val]) => (
            <div key={label} className="flex items-center gap-3 rounded-xl bg-surface p-3">
              <Icon className="size-5 text-navy" />
              <div className="min-w-0 flex-1">
                <small className="block text-xs text-subtle">{label}</small>
                <b className="block truncate text-sm font-semibold">{val}</b>
              </div>
              <Pill tone="green" icon={IoCheckmarkCircle}>Terkirim</Pill>
            </div>
          ))}
        </div>
      </Card>

      <Card className="space-y-6 text-center">
        <div className="flex flex-wrap items-center justify-between gap-2 text-left">
          <h2 className="text-lg font-bold">Masukkan 6 Digit Kode OTP</h2>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-subtle">
            <IoTimeOutline className="size-4" /> Masa berlaku 5 menit
          </span>
        </div>
        <OtpInput value={digits} onChange={(d) => { setDigits(d); setGalat(''); }} error={galat} />
        {galat && <p className="text-sm font-medium text-red-600">{galat}</p>}
        <p className="text-sm text-muted">
          Kirim ulang kode dalam{' '}
          <b className={cx('font-mono', sisa === 0 ? 'text-emerald-700' : 'text-navy')}>{waktu}</b>
        </p>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm font-bold">
          <button type="button" onClick={kirimUlang} disabled={sisa > 0} className="text-navy hover:underline disabled:cursor-not-allowed disabled:text-subtle disabled:no-underline">
            Kirim via WhatsApp
          </button>
          <span className="text-line">|</span>
          <button type="button" className="text-navy hover:underline">Ganti Email / No. HP</button>
        </div>
        <Button size="lg" className="w-full" disabled={!lengkap || memverifikasi} onClick={verifikasi}>
          {memverifikasi ? 'Memverifikasi...' : 'Verifikasi & Masuk ke Beranda'}
        </Button>
        <div className="flex flex-wrap justify-center gap-3">
          <Button variant="outline" size="sm" onClick={() => window.open('https://mail.google.com', '_blank', 'noopener')}>Buka Gmail Siswa</Button>
          <Button variant="ghost" size="sm">Bantuan Dapodik</Button>
        </div>
      </Card>

      <p className="flex items-center justify-center gap-2 text-xs text-subtle">
        <IoLockClosedOutline className="size-4" /> Sistem resmi terenkripsi SSL 256-bit
      </p>
    </AccountLayout>
  );
}
