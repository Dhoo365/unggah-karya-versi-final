import PengajuanDitolak from '../../../components/account/PengajuanDitolak.jsx';
import { keputusanTolak as k } from '../../../data/siswaAkun.js';

// Pengajuan akun siswa ditolak (versi mobile: SiswaPengajuanDitolak.vue)
export default function DitolakPage() {
  return (
    <PengajuanDitolak
      peran="Siswa"
      keputusan={k}
      daftarUlang="/daftar/siswa"
      rincian={[
        ['Nama Lengkap Siswa', k.data.nama],
        ['NISN Terdaftar', k.data.nisn, 'text-red-600'],
        ['Rombel / Kelas', k.data.rombel],
        ['Asal Satuan Pendidikan', k.data.sekolah],
        ['Berkas Bermasalah', <span key="b">{k.data.berkas} <em className="ml-1 text-xs font-semibold text-red-600 not-italic">Tidak Valid / Fiktif</em></span>],
      ]}
    />
  );
}
