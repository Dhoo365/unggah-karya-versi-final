import { useNavigate } from 'react-router-dom';
import { IoArrowBackOutline, IoCloseCircle, IoLogoWhatsapp, IoRefreshOutline } from 'react-icons/io5';
import AccountLayout, { InfoList, StepList } from '../../components/layout/AccountLayout.jsx';
import { Avatar, Button, Card, Pill } from '../../components/ui/index.js';

/*
  Halaman "pengajuan ditolak" — dipakai bersama oleh Siswa dan Guru
  (versi mobile: SiswaPengajuanDitolak.vue & GuruPengajuanDitolak.vue).

  Props:
  - peran      : 'Siswa' | 'Guru'
  - keputusan  : { id, guru/verifikator, jabatan, waktu, alasan, langkah[] }
  - rincian    : [[label, nilai, classTambahan], ...]
  - daftarUlang: alamat halaman pendaftaran
*/
export default function PengajuanDitolak({ peran, keputusan, rincian, daftarUlang, verifikatorLabel = 'Guru Verifikator Sekolah' }) {
  const navigate = useNavigate();
  const nama = keputusan.verifikator ?? keputusan.guru;

  return (
    <AccountLayout title="Status Pengajuan Akun" badge={<code className="rounded-lg bg-red-50 px-2.5 py-1 text-xs font-bold text-red-700">#{keputusan.id}</code>} wide>
      <Card className="flex flex-col items-center gap-3 border-red-200 py-10 text-center">
        <span className="grid size-16 place-items-center rounded-full bg-red-100 text-red-600">
          <IoCloseCircle className="size-9" />
        </span>
        <Pill tone="red">Status: Pendaftaran {peran} Ditolak</Pill>
        <h1 className="text-3xl font-extrabold tracking-tight">Pengajuan Akun {peran} Tidak Disetujui</h1>
        <p className="max-w-xl text-muted">
          Mohon maaf, pengajuan registrasi akun {peran.toLowerCase()} Anda tidak dapat disetujui oleh verifikator. Silakan baca alasan dan langkah penyelesaian di bawah.
        </p>
      </Card>

      <div className="grid gap-6 [&>*]:min-w-0 lg:grid-cols-2">
        <Card className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar initials={nama.replace(/^(Dra?\.|Drs\.)\s*/, '').split(' ').map((w) => w[0]).join('').slice(0, 2)} tone="gray" />
            <div>
              <small className="block text-xs text-subtle">{verifikatorLabel}</small>
              <b className="block text-sm font-bold">{nama}</b>
              <span className="text-xs text-muted">{keputusan.jabatan}</span>
            </div>
          </div>
          <p className="text-xs text-subtle">Waktu keputusan: <b className="text-ink">{keputusan.waktu}</b></p>
          <div className="rounded-xl border border-red-200 bg-red-50 p-4">
            <small className="text-[11px] font-bold tracking-widest text-red-700">ALASAN RESMI PENOLAKAN</small>
            <p className="mt-2 text-sm leading-relaxed text-ink">“{keputusan.alasan}”</p>
          </div>
        </Card>

        <Card className="space-y-2">
          <h2 className="text-base font-bold">Rincian Data yang Diinputkan</h2>
          <InfoList rows={rincian} />
        </Card>
      </div>

      <Card className="space-y-4">
        <h2 className="text-base font-bold">Langkah Penyelesaian & Rekomendasi</h2>
        <StepList items={keputusan.langkah} />
      </Card>

      <div className="grid gap-3 sm:grid-cols-3">
        <Button size="lg" icon={IoRefreshOutline} onClick={() => navigate(daftarUlang)}>Daftar Ulang Akun</Button>
        <Button size="lg" variant="outline" icon={IoLogoWhatsapp}>Hubungi via WhatsApp</Button>
        <Button size="lg" variant="ghost" icon={IoArrowBackOutline} onClick={() => navigate('/onboarding')}>Kembali ke Halaman Masuk</Button>
      </div>
    </AccountLayout>
  );
}
