import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoLockClosedOutline, IoPeopleOutline, IoSwapHorizontalOutline, IoTimeOutline } from 'react-icons/io5';
import { Avatar, Button, Card, EmptyState, FilterChips, Pill, SearchBar, SectionHeader } from '../../components/ui/index.js';
import { matchQuery } from '../../lib/cx.js';
import { guruProfil, siswaBinaan, statusSiswa } from '../../data/guru.js';

// Daftar siswa bimbingan (versi mobile: GuruDataSiswa.vue)
export default function DataSiswaPage() {
  const total = (s) => siswaBinaan.filter((x) => !s || x.status === s).length;
  const filters = [
    { id: null, label: `Semua (${total()})` },
    { id: 'aktif', label: `Siswa Aktif (${total('aktif')})` },
    { id: 'lulus', label: `Siswa Lulus (${total('lulus')})` },
  ];
  const [aktif, setAktif] = useState(filters[0].label);
  const [cari, setCari] = useState('');
  const idAktif = filters.find((f) => f.label === aktif)?.id;
  const daftar = siswaBinaan.filter((s) => (!idAktif || s.status === idAktif) && matchQuery(s, cari, ['name', 'nisn']));

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 rounded-2xl border border-navy/15 bg-soft/40 p-5">
        <IoLockClosedOutline className="mt-0.5 size-6 shrink-0 text-navy" />
        <div>
          <b className="font-bold text-navy">Data Terisolasi: Khusus {guruProfil.org}</b>
          <p className="mt-1 text-sm text-muted">Portal audit resmi Guru Pembimbing. Hak akses hanya menampilkan riwayat portofolio & peserta terdaftar unit sekolah Anda.</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <SearchBar value={cari} onChange={setCari} placeholder="Cari nama atau NISN siswa..." className="lg:w-96" />
        <FilterChips items={filters.map((f) => f.label)} active={aktif} onChange={setAktif} />
      </div>

      <SectionHeader title="Daftar Siswa Bimbingan" subtitle={`Menampilkan ${daftar.length} dari ${siswaBinaan.length} siswa`} />

      {daftar.length ? (
        <Card className="overflow-hidden p-0">
          {/* Tabel di layar lebar, kartu bertumpuk di HP */}
          <table className="hidden w-full text-sm md:table">
            <thead className="bg-surface text-left text-xs font-semibold tracking-wide text-subtle uppercase">
              <tr>
                <th className="px-5 py-3">Siswa</th>
                <th className="px-5 py-3">Kelas</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Keterangan</th>
                <th className="px-5 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-soft">
              {daftar.map((s) => {
                const st = statusSiswa[s.status];
                const Note = s.noteIcon;
                return (
                  <tr key={s.id} className="hover:bg-surface/60">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar initials={s.initial} tone={s.status === 'lulus' ? 'gray' : 'navy'} />
                        <div>
                          <b className="block font-semibold text-ink">{s.name}</b>
                          <small className="font-mono text-xs text-subtle">NISN {s.nisn}</small>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-muted">{s.kelas}</td>
                    <td className="px-5 py-4"><Pill tone={st.tone}>{st.label}</Pill></td>
                    <td className="px-5 py-4 text-muted"><span className="inline-flex items-center gap-1.5"><Note className="size-4 text-navy" />{s.note}</span></td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Link to={`/guru/siswa/${s.id}`}><Button variant="ghost" size="sm" icon={IoTimeOutline}>Riwayat</Button></Link>
                        <Link to={`/guru/siswa/${s.id}/status`}><Button variant="soft" size="sm" icon={IoSwapHorizontalOutline}>Kelola Status</Button></Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <ul className="divide-y divide-line-soft md:hidden">
            {daftar.map((s) => {
              const st = statusSiswa[s.status];
              return (
                <li key={s.id} className="space-y-3 p-4">
                  <div className="flex items-center gap-3">
                    <Avatar initials={s.initial} tone={s.status === 'lulus' ? 'gray' : 'navy'} />
                    <div className="min-w-0 flex-1">
                      <b className="block font-semibold text-ink">{s.name}</b>
                      <small className="text-xs text-subtle">NISN {s.nisn} • Kelas {s.kelas}</small>
                    </div>
                    <Pill tone={st.tone}>{st.label}</Pill>
                  </div>
                  <small className="block text-xs text-muted">{s.note}</small>
                  <div className="flex gap-2">
                    <Link to={`/guru/siswa/${s.id}`} className="flex-1"><Button variant="outline" size="sm" className="w-full">Lihat Riwayat</Button></Link>
                    <Link to={`/guru/siswa/${s.id}/status`} className="flex-1"><Button size="sm" className="w-full">Kelola Status</Button></Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>
      ) : (
        <EmptyState icon={IoPeopleOutline} title="Siswa tidak ditemukan" description="Coba kata kunci lain atau ubah filter status." />
      )}
      <p className="text-center text-xs text-subtle">Data perlindungan siswa terlindungi enkripsi SHA-256 • Dinas Pendidikan Daerah Provinsi Sulawesi Utara © 2026</p>
    </div>
  );
}
