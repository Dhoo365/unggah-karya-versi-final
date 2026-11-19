import { useState } from 'react';
import {
  IoAlertCircle,
  IoArrowForwardOutline,
  IoBusinessOutline,
  IoCalendarOutline,
  IoDocumentTextOutline,
  IoDownloadOutline,
  IoMegaphoneOutline,
  IoNewspaperOutline,
  IoPin,
  IoTrophyOutline,
  IoVideocamOutline,
} from 'react-icons/io5';
import { Avatar, Button, Card, EmptyState, FilterChips, Pill } from '../../components/ui/index.js';
import { cx } from '../../lib/cx.js';
import { kategoriPengumuman, pengumuman } from '../../data/guru.js';
import { useUi } from '../../components/feedback/index.js';
import { dokumen } from '../../data/dokumen.js';
import { KONTAK } from '../../lib/files.js';

const badgeIcon = { edaran: IoPin, wajib: IoAlertCircle, teknis: IoVideocamOutline, hasil: IoTrophyOutline };

// Pengumuman & surat edaran (versi mobile: GuruPengumuman.vue)
export default function PengumumanPage() {
  const [aktif, setAktif] = useState(kategoriPengumuman[0].label);
  const ui = useUi();
  const surat = (p) => dokumen(p.judul, { jenis: 'surat', nomor: p.nomor?.replace(/^.*No: /, ''), penerbit: p.instansi, namaFile: p.berkas?.nama, ukuran: p.berkas?.ukuran });
  const key = kategoriPengumuman.find((k) => k.label === aktif)?.key;
  const tampil = pengumuman.filter((p) => key === 'semua' || p.kategori.includes(key));

  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-dark via-navy to-primary p-6 text-white sm:p-8">
        <IoMegaphoneOutline className="pointer-events-none absolute right-6 bottom-4 hidden size-36 text-white/10 md:block" />
        <span className="text-xs font-bold tracking-widest text-gold">KHUSUS GURU PEMBIMBING</span>
        <h2 className="mt-2 text-2xl font-extrabold">Sinkronisasi & Edaran Tahap Provinsi 2026</h2>
        <p className="mt-2 max-w-xl text-sm text-ice">Pastikan seluruh data portofolio siswa terbimbing telah tervalidasi sebelum batas kurasi wilayah.</p>
      </section>

      <FilterChips items={kategoriPengumuman.map((k) => k.label)} active={aktif} onChange={setAktif} />

      {tampil.length ? (
        <div className="grid gap-5 [&>*]:min-w-0 lg:grid-cols-2">
          {tampil.map((p) => {
            const Icon = badgeIcon[p.tipe];
            return (
              <Card key={p.id} as="article" className={cx('ui-enter flex flex-col gap-4', p.tersemat && 'border-navy/30 ring-2 ring-soft lg:col-span-2')}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Pill tone={p.tone} icon={Icon}>{p.badge}</Pill>
                  <time className="inline-flex items-center gap-1 text-xs text-subtle"><IoCalendarOutline className="size-3.5" />{p.tanggal}</time>
                </div>
                <div>
                  {p.nomor && <small className="text-xs font-semibold text-secondary">{p.nomor}</small>}
                  <h3 className="text-lg font-bold text-ink">{p.judul}</h3>
                  {p.instansi && <p className="mt-1 inline-flex items-center gap-1 text-sm text-muted"><IoBusinessOutline className="size-4" />{p.instansi}</p>}
                </div>
                {p.sorotan ? (
                  <p className="rounded-xl border-l-4 border-navy bg-soft/40 p-4 text-sm leading-relaxed text-ink">
                    {p.sorotan.awal} <b className="text-red-600">{p.sorotan.merah}</b>.
                  </p>
                ) : (
                  <p className="text-sm leading-relaxed text-muted">{p.isi}</p>
                )}
                {p.berkas && (
                  <div className="flex flex-wrap items-center gap-3 rounded-xl border border-line-soft p-3">
                    <span className="grid size-10 place-items-center rounded-lg bg-red-50 text-xs font-bold text-red-600">PDF</span>
                    <span className="min-w-0 flex-1">
                      <b className="block truncate text-sm font-semibold text-ink">{p.berkas.nama}</b>
                      <small className="text-xs text-subtle">Dokumen Resmi • {p.berkas.ukuran}</small>
                    </span>
                    <Button size="sm" icon={IoDownloadOutline} onClick={() => ui.unduh(surat(p))}>Unduh</Button>
                  </div>
                )}
                <div className="mt-auto flex flex-wrap items-center gap-2">
                  {p.tipe === 'wajib' && <Button variant="outline" size="sm" icon={IoDocumentTextOutline} onClick={() => ui.lihat(dokumen('Format Surat Pernyataan Orisinalitas Karya', { label: 'Template', bagian: [{ isi: 'Yang bertanda tangan di bawah ini, Kepala Sekolah ......, menyatakan bahwa karya berjudul ...... merupakan hasil orisinal peserta didik kami dan belum pernah dilombakan.' }, { judul: 'Lampiran wajib', isi: ['Sinopsis karya (maks. 300 kata).', 'Meterai Rp10.000 dan tanda tangan Kepala Sekolah.', 'Stempel basah sekolah asal.'] }] }))}>Lihat Format & Template</Button>}
                  {p.tipe === 'teknis' && (
                    <>
                      <Button variant="soft" size="sm" icon={IoVideocamOutline} onClick={() => ui.buka('https://zoom.us/join', 'Membuka Zoom')}>Tautan Zoom</Button>
                      <Button variant="outline" size="sm" icon={IoNewspaperOutline} onClick={() => ui.lihat(dokumen(`Notulensi ${p.judul}`, { label: 'Notulensi Rapat', bagian: [{ judul: 'Ringkasan', isi: p.isi }, { judul: 'Keputusan', isi: ['Rubrik 5 cabang lomba disepakati.', 'Bimtek lanjutan dijadwalkan bulan depan.', 'Materi presentasi dibagikan melalui portal.'] }] }))}>Notulensi</Button>
                    </>
                  )}
                  {p.tipe === 'hasil' && (
                    <div className="flex w-full items-center justify-between gap-3">
                      <span className="flex items-center gap-2">
                        <span className="flex -space-x-2">
                          {p.avatar.map((a) => <Avatar key={a.i} initials={a.i} tone={a.tone} size="sm" className="ring-2 ring-white" />)}
                        </span>
                        <small className="text-xs text-muted">{p.wilayah}</small>
                      </span>
                      <Button variant="ghost" size="sm" iconRight={IoArrowForwardOutline} onClick={() => ui.lihat(dokumen(p.judul, { jenis: 'rekap', label: 'Daftar Nominasi', baris: [['SMAN 1 Manado', 'Video Animasi Edukasi Bahari Bunaken'], ['SMKN 2 Bitung', 'Robot Pemilah Sampah Pesisir'], ['SMAN 1 Tomohon', 'Kriya Anyam Bambu Minahasa'], ['…', 'dan 117 karya lainnya']] }))}>Buka Daftar</Button>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <EmptyState icon={IoMegaphoneOutline} title="Belum ada pengumuman" description="Belum ada pengumuman pada kategori ini." />
      )}
    </div>
  );
}
