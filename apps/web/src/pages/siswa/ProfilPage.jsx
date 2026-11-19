import { Link, useNavigate } from 'react-router-dom';
import {
  IoChevronForwardOutline,
  IoDocumentTextOutline,
  IoDownloadOutline,
  IoHeadsetOutline,
  IoHelpBuoyOutline,
  IoLockClosed,
  IoLockClosedOutline,
  IoLogOutOutline,
  IoPersonOutline,
  IoRibbonOutline,
  IoShieldCheckmark,
} from 'react-icons/io5';
import { Avatar, Button, Card, IconBox, Pill, SectionHeader } from '../../components/ui/index.js';
import { InfoList } from '../../components/layout/AccountLayout.jsx';
import { prestasi, siswaProfil } from '../../data/siswa.js';
import { useUi } from '../../components/feedback/index.js';
import { dokumen } from '../../data/dokumen.js';
import { KONTAK } from '../../lib/files.js';

const statistik = [
  { nilai: 3, label: 'Prestasi Kota Terverifikasi' },
  { nilai: 2, label: 'Karya Diajukan' },
  { nilai: 1, label: 'Lomba Sedang Diikuti' },
];
const biodata = [
  ['NISN', siswaProfil.nisn, 'font-mono'],
  ['NIK', '717104******0002', 'font-mono'],
  ['Tempat, Tgl Lahir', 'Manado, 14 Mei 2009'],
  ['Ibu Kandung', 'Maria Sumampouw'],
  ['Kelas', 'Kelas IX-A • Jalur Prestasi'],
];
const pembimbing = { initials: 'JR', nama: 'Dra. Johanis Runtuwene, M.Pd', info: 'NIP. 197405121999031004 • Pembimbing Prestasi' };
const menu = [
  { to: '/siswa/ubah-sandi', icon: IoLockClosedOutline, judul: 'Keamanan & Ubah Kata Sandi', sub: 'Kata sandi akun portal siswa dan verifikasi dua faktor' },
  { to: '/siswa/panduan', icon: IoHelpBuoyOutline, judul: 'Pusat Bantuan & Panduan Siswa', sub: 'Tata cara pengunggahan berkas karya dan juknis lomba' },
  { href: KONTAK.emailHelpdesk, icon: IoHeadsetOutline, judul: 'Hubungi Admin / Operator Sekolah', sub: 'Layanan bantuan data Dapodik sekolah' },
];

function MenuRow({ item }) {
  const isi = (
    <>
      <IconBox icon={item.icon} tone="navy" size="sm" />
      <span className="min-w-0 flex-1">
        <b className="block text-sm font-semibold text-ink">{item.judul}</b>
        <small className="text-xs text-muted">{item.sub}</small>
      </span>
      <IoChevronForwardOutline className="size-4 text-subtle" />
    </>
  );
  const cls = 'flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-surface';
  return item.to ? <Link to={item.to} className={cls}>{isi}</Link> : <a href={item.href} className={cls}>{isi}</a>;
}

// Profil siswa (versi mobile: SiswaProfil.vue)
export default function ProfilPage() {
  const ui = useUi();
  const navigate = useNavigate();
  const keluar = async () => {
    const ok = await ui.confirm({ title: 'Keluar dari akun SIKARYA?', message: 'Anda perlu masuk kembali untuk mengunggah karya.', confirmLabel: 'Ya, Keluar', tone: 'danger', icon: IoLogOutOutline });
    if (!ok) return;
    navigate('/onboarding');
    ui.toast({ title: 'Anda telah keluar', tone: 'info' });
  };
  return (
    <div className="space-y-8">
      {/* ---------- Kartu identitas ---------- */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-dark via-navy to-primary p-6 text-white sm:p-8">
        <i className="pointer-events-none absolute -top-20 -right-10 size-64 rounded-full bg-secondary/40 blur-3xl" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center">
          <span className="grid size-20 shrink-0 place-items-center rounded-2xl bg-white text-2xl font-extrabold text-navy">{siswaProfil.initials}</span>
          <div className="min-w-0 flex-1">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
              <IoShieldCheckmark className="size-3.5 text-gold" /> Siswa Terdaftar Dapodik
            </span>
            <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">{siswaProfil.name}</h2>
            <p className="text-sm text-ice">{siswaProfil.org} • NISN {siswaProfil.nisn}</p>
          </div>
          <div className="grid grid-cols-3 gap-2 md:w-96">
            {statistik.map((s) => (
              <div key={s.label} className="rounded-2xl bg-white/10 p-3 text-center ring-1 ring-white/15">
                <b className="block text-2xl font-extrabold">{s.nilai}</b>
                <small className="text-[11px] leading-tight text-ice">{s.label}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-8 [&>*]:min-w-0 xl:grid-cols-2">
        {/* ---------- Akun & biodata ---------- */}
        <section className="space-y-4">
          <SectionHeader title="Akun & Biodata" action={<Pill tone="blue">Tersinkron Dapodik</Pill>} />
          <Card className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <b className="flex items-center gap-2 font-semibold text-ink"><IoPersonOutline className="size-5 text-navy" /> Biodata Dapodik Siswa</b>
              <Pill tone="gray" icon={IoLockClosed}>Terkunci</Pill>
            </div>
            <InfoList rows={biodata} />
            <small className="block text-xs text-subtle">Data resmi terverifikasi Pusdatin Kemendikbudristek. Perubahan hanya melalui operator sekolah.</small>
          </Card>
          <Card className="flex items-center gap-3">
            <Avatar initials={pembimbing.initials} tone="sky" />
            <div className="min-w-0 flex-1">
              <small className="text-xs font-semibold text-subtle">Guru Pembimbing Terhubung</small>
              <b className="block text-sm font-semibold text-ink">{pembimbing.nama}</b>
              <small className="text-xs text-muted">{pembimbing.info}</small>
            </div>
            <Pill tone="green">Aktif</Pill>
          </Card>
        </section>

        {/* ---------- Portofolio ---------- */}
        <section className="space-y-4">
          <SectionHeader title="Portofolio & Prestasi" subtitle="Disdikbud Kota Manado" />
          <Link to="/siswa/sertifikat" className="block">
            <Card className="flex items-center gap-4 transition hover:border-navy/30 hover:shadow-md">
              <IconBox icon={IoRibbonOutline} tone="amber" />
              <div className="min-w-0 flex-1">
                <b className="block font-semibold text-ink">Sertifikat & Prestasi Terkumpul <Pill tone="amber" className="ml-1">3 Piagam</Pill></b>
                <small className="text-sm text-muted">Juara 1 FLS2N Seni Lukis • O2SN Renang • KSN IPA</small>
              </div>
              <IoChevronForwardOutline className="size-5 text-subtle" />
            </Card>
          </Link>
          <Card className="flex flex-wrap items-center gap-4 bg-soft/40">
            <IconBox icon={IoDocumentTextOutline} tone="navy" />
            <div className="min-w-0 flex-1">
              <b className="block font-semibold text-ink">Cetak E-Portofolio Lengkap <Pill tone="blue" className="ml-1">BSrE</Pill></b>
              <small className="text-sm text-muted">Dokumen PDF resmi ber-barcode verifikasi Disdikbud Manado.</small>
            </div>
            <Button size="sm" icon={IoDownloadOutline} onClick={() => ui.unduh(dokumen(`E-Portofolio ${siswaProfil.name}`, { jenis: 'rekap', label: 'E-Portofolio', baris: [['Nama', siswaProfil.name], ['NISN', siswaProfil.nisn], ['Sekolah', siswaProfil.org], ...prestasi.map((x) => [x.badge, `${x.judul} (${x.meta})`])] }))}>Unduh PDF</Button>
          </Card>

          <SectionHeader title="Pusat Bantuan & Pengaturan" className="pt-4" />
          <Card className="p-2">
            {menu.map((m) => <MenuRow key={m.judul} item={m} />)}
          </Card>
          <Button variant="danger" icon={IoLogOutOutline} className="w-full" onClick={keluar}>Keluar dari Akun SIKARYA</Button>
        </section>
      </div>
    </div>
  );
}
