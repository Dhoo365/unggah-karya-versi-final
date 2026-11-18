import { useState } from 'react';
import {
  IoArrowForward,
  IoBookOutline,
  IoChevronDownOutline,
  IoDownloadOutline,
  IoLogoWhatsapp,
  IoMailOutline,
  IoOpenOutline,
  IoSyncOutline,
} from 'react-icons/io5';
import { Button, Card, EmptyState, FilterChips, SearchBar, SectionHeader } from '../../components/ui/index.js';
import { cx, matchQuery } from '../../lib/cx.js';

const kategori = [
  { id: 'semua', label: 'Semua' },
  { id: 'unggah', label: 'Unggah Karya' },
  { id: 'sertifikat', label: 'Sertifikat' },
  { id: 'akun', label: 'Akun & Dapodik' },
];

const alur = [
  { judul: 'Registrasi Akun', isi: 'Sinkronisasi NISN via operator Dapodik sekolah.' },
  { judul: 'Pilih Cabang', isi: 'Pilih kategori lomba FLS2N, O2SN, atau Vokasi.' },
  { judul: 'Unggah Berkas', isi: 'Kirim file PDF, karya gambar, atau tautan video.' },
  { judul: 'Pantau & Sertifikat', isi: 'Lihat skor tim juri dan unduh e-sertifikat resmi.' },
];

const faq = [
  {
    id: 1, kat: 'akun', tanya: 'Bagaimana jika NISN saya tidak ditemukan di Dapodik?',
    jawab: (
      <>
        Pastikan penulisan 10 digit NISN sudah sesuai dengan rapor fisik. Jika sistem masih menampilkan status tidak terdaftar, segera hubungi{' '}
        <b className="text-ink">Operator Dapodik / Tata Usaha sekolah</b> untuk memvalidasi NISN pada portal Verval PD Kemendikbud.
        <span className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-navy"><IoSyncOutline className="size-4" /> Sinkronisasi otomatis setiap 1x24 jam</span>
      </>
    ),
    teks: 'nisn dapodik operator verval',
  },
  { id: 2, kat: 'unggah', tanya: 'Apa format dan batas ukuran file video dan dokumen karya?', jawab: 'Dokumen karya utama berupa PDF atau PNG maksimal 25 MB, sedangkan surat administrasi pendukung berformat PDF maksimal 5 MB.' },
  { id: 3, kat: 'sertifikat', tanya: 'Berapa lama proses validasi sertifikat oleh Disdikbud Kota Manado?', jawab: 'Proses pemeriksaan dan validasi berkas oleh tim verifikator membutuhkan waktu rata-rata 1–3 hari kerja.' },
  { id: 4, kat: 'unggah', tanya: 'Apakah saya bisa mendaftar lebih dari satu cabang lomba?', jawab: 'Ya, siswa diperbolehkan mengikuti maksimal 2 cabang lomba berbeda selama tidak ada jadwal penjurian yang bersamaan.' },
];

// Pusat bantuan & panduan siswa (versi mobile: SiswaPanduan.vue)
export default function PanduanPage() {
  const [cari, setCari] = useState('');
  const [aktif, setAktif] = useState(kategori[0].label);
  const [buka, setBuka] = useState(1);
  const idAktif = kategori.find((k) => k.label === aktif)?.id;
  const daftar = faq.filter(
    (f) => (idAktif === 'semua' || f.kat === idAktif) && matchQuery({ ...f, isi: typeof f.jawab === 'string' ? f.jawab : f.teks }, cari, ['tanya', 'isi'])
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <SearchBar value={cari} onChange={setCari} placeholder="Cari topik bantuan, juknis, atau kendala..." className="lg:w-96" />
        <FilterChips items={kategori.map((k) => k.label)} active={aktif} onChange={setAktif} />
      </div>

      <div className="grid gap-8 [&>*]:min-w-0 xl:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          {/* ---------- Buku saku ---------- */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-dark via-navy to-primary p-6 text-white sm:p-8">
            <IoBookOutline className="pointer-events-none absolute right-6 bottom-4 hidden size-36 text-white/10 md:block" />
            <span className="text-xs font-bold tracking-widest text-gold">BUKU SAKU SISWA 2025</span>
            <h2 className="mt-2 text-2xl font-extrabold">Panduan Praktis Siswa (PDF)</h2>
            <p className="mt-2 max-w-lg text-sm text-ice">Petunjuk teknis resmi pendaftaran, ketentuan berkas karya digital, dan tahapan verifikasi kurasi.</p>
            <Button variant="gold" icon={IoDownloadOutline} className="mt-5">Unduh Juknis Lengkap (2.4 MB)</Button>
          </section>

          {/* ---------- FAQ ---------- */}
          <section className="space-y-4">
            <SectionHeader title="Pertanyaan Sering Diajukan" subtitle="FAQ Siswa" />
            {daftar.length ? (
              <div className="divide-y divide-line-soft overflow-hidden rounded-2xl border border-line-soft bg-white">
                {daftar.map((f) => {
                  const on = buka === f.id;
                  return (
                    <div key={f.id}>
                      <button
                        type="button"
                        onClick={() => setBuka(on ? null : f.id)}
                        aria-expanded={on}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-ink hover:bg-surface"
                      >
                        {f.tanya}
                        <IoChevronDownOutline className={cx('size-5 shrink-0 text-subtle transition-transform', on && 'rotate-180')} />
                      </button>
                      {on && <div className="px-5 pb-5 text-sm leading-relaxed text-muted">{f.jawab}</div>}
                    </div>
                  );
                })}
              </div>
            ) : (
              <EmptyState icon={IoBookOutline} title="Topik tidak ditemukan" description="Coba kata kunci lain atau pilih kategori Semua." />
            )}
          </section>
        </div>

        <aside className="space-y-6">
          {/* ---------- Alur ---------- */}
          <Card className="space-y-4">
            <SectionHeader title="Alur Partisipasi Karya" subtitle="4 Tahapan Mudah" />
            <ol className="space-y-4">
              {alur.map((a, i) => (
                <li key={a.judul} className="flex gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-navy text-sm font-bold text-white">{i + 1}</span>
                  <div>
                    <b className="block text-sm font-semibold text-ink">{a.judul}</b>
                    <small className="text-sm text-muted">{a.isi}</small>
                  </div>
                </li>
              ))}
            </ol>
          </Card>

          {/* ---------- Kontak ---------- */}
          <Card className="space-y-3">
            <div>
              <h2 className="text-base font-bold">Butuh bantuan lebih lanjut?</h2>
              <small className="text-sm text-muted">Tim helpdesk teknis Cabdin Manado siap membimbing kendala Anda.</small>
            </div>
            <a href="https://wa.me/" target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl bg-emerald-50 p-3 hover:bg-emerald-100">
              <IoLogoWhatsapp className="size-6 shrink-0 text-emerald-600" />
              <span className="min-w-0 flex-1">
                <b className="block text-sm font-semibold text-ink">Chat WhatsApp Helpdesk</b>
                <small className="text-xs text-muted">Senin – Jumat, 08:00 - 16:00 WITA</small>
              </span>
              <IoArrowForward className="size-4 text-emerald-700" />
            </a>
            <a href="mailto:sikarya.dikdasulut@gmail.com" className="flex items-center gap-3 rounded-xl border border-line-soft p-3 hover:bg-surface">
              <IoMailOutline className="size-6 shrink-0 text-navy" />
              <span className="min-w-0 flex-1">
                <b className="block text-sm font-semibold text-ink">Email Dukungan Resmi</b>
                <small className="block truncate text-xs text-muted">sikarya.dikdasulut@gmail.com</small>
              </span>
              <IoOpenOutline className="size-4 text-subtle" />
            </a>
          </Card>
        </aside>
      </div>
    </div>
  );
}
