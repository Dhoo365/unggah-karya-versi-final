import PengajuanDitolak from '../../../components/account/PengajuanDitolak.jsx';
import { keputusanTolakGuru as k } from '../../../data/guruAkun.js';

// Pengajuan akun guru ditolak (versi mobile: GuruPengajuanDitolak.vue)
export default function DitolakPage() {
  return (
    <PengajuanDitolak
      peran="Guru"
      keputusan={k}
      daftarUlang="/daftar/guru"
      verifikatorLabel="Otoritas Verifikator Resmi"
      rincian={[
        ['Nama Lengkap PTK', k.data.nama],
        ['NUPTK Terdaftar', k.data.nuptk, 'font-mono text-red-600'],
        ['Asal Satuan Pendidikan', k.data.sekolah],
        ['Dokumen Bermasalah', <span key="b">{k.data.dokumen} <em className="ml-1 text-xs font-semibold text-red-600 not-italic">Kedaluwarsa</em></span>],
      ]}
    />
  );
}
