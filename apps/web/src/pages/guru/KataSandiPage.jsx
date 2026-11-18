import UbahSandiForm from '../../components/account/UbahSandiForm.jsx';
import { guruProfil } from '../../data/guru.js';

const kriteria = [
  { label: 'Minimal 8 karakter', wajib: true, cek: (s) => s.length >= 8 },
  { label: 'Kombinasi huruf & angka', wajib: true, cek: (s) => /[A-Za-z]/.test(s) && /\d/.test(s) },
];

// Keamanan & kata sandi guru (versi mobile: GuruKataSandi.vue)
export default function KataSandiPage() {
  return (
    <UbahSandiForm
      identitas={{
        initials: guruProfil.initials,
        nama: guruProfil.name,
        sub: `${guruProfil.role} • ${guruProfil.org}`,
        badge: 'Akun Aktif • NIP ' + guruProfil.nip,
      }}
      subjudul="Perbarui kata sandi secara berkala untuk menjaga keamanan akun portal guru Anda."
      kriteria={kriteria}
      catatan="Lupa kata sandi lama? Hubungi Operator Dapodik sekolah atau Helpdesk Teknis Dinas Pendidikan Daerah Provinsi Sulawesi Utara."
      kembali="/guru/profil"
    />
  );
}
