import UbahSandiForm from '../../components/account/UbahSandiForm.jsx';
import { siswaProfil } from '../../data/siswa.js';

const kriteria = [
  { label: 'Minimal 8 karakter', wajib: true, cek: (s) => s.length >= 8 },
  { label: 'Kombinasi huruf besar, huruf kecil, dan angka', wajib: true, cek: (s) => /[A-Z]/.test(s) && /[a-z]/.test(s) && /\d/.test(s) },
  { label: 'Simbol khusus (misal: @, #, !)', wajib: false, cek: (s) => /[^A-Za-z0-9]/.test(s) },
];

// Ubah kata sandi siswa (versi mobile: SiswaUbahSandi.vue)
export default function UbahSandiPage() {
  return (
    <UbahSandiForm
      identitas={{
        initials: siswaProfil.initials,
        nama: siswaProfil.name,
        sub: `NISN: ${siswaProfil.nisn} • ${siswaProfil.org}`,
        badge: 'Dapodik Aktif',
        keterangan: 'Kata sandi ini digunakan untuk login ke portal lomba, pengumpulan karya, dan pemantauan sertifikat SIKARYA Dikda Sulut.',
      }}
      kriteria={kriteria}
      catatan={`Jika lupa kata sandi lama, segera temui Operator Dapodik di ${siswaProfil.org} untuk reset token dinas.`}
      kembali="/siswa/profil"
    />
  );
}
