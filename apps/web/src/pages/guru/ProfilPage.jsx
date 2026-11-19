import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  IoBookOutline,
  IoCheckmarkCircle,
  IoChevronForward,
  IoClipboardOutline,
  IoCloudUploadOutline,
  IoDownloadOutline,
  IoEyeOutline,
  IoHeadsetOutline,
  IoIdCardOutline,
  IoLockClosedOutline,
  IoLogOutOutline,
  IoNotificationsOutline,
  IoShieldOutline,
} from 'react-icons/io5';
import { Button, Card, IconBox, Pill, SectionHeader, StatCard } from '../../components/ui/index.js';
import { InfoList } from '../../components/layout/AccountLayout.jsx';
import { cx } from '../../lib/cx.js';
import { guruProfil as g, sertifikatGuru, statistikGuru } from '../../data/guru.js';
import { Modal, useUi } from '../../components/feedback/index.js';
import { dokumen } from '../../data/dokumen.js';
import { KONTAK } from '../../lib/files.js';
import { IoMedalOutline, IoSchoolOutline } from 'react-icons/io5';

const skDoc = dokumen('SK Kepala Sekolah Penetapan Pembimbing Lomba 2026', {
  jenis: 'sk',
  nomor: '421.2/108/SMPN1-MND/I/2026',
  penerbit: 'Kepala SMP Negeri 1 Manado',
  ukuran: 'PDF 1.8 MB',
  baris: [['Nama', g.name], ['NIP', g.nip], ['Tugas', g.peran]],
});
const semuaSertifikat = [
  ...sertifikatGuru,
  { judul: 'Guru Penggerak Angkatan 9', penerbit: 'Kemendikbudristek', icon: IoSchoolOutline, tone: 'green' },
  { judul: 'Pembina OSIS Berprestasi Kota Manado 2024', penerbit: 'Disdikbud Kota Manado', icon: IoMedalOutline, tone: 'purple' },
];
const sertDoc = (c) => dokumen(c.judul, { jenis: 'sertifikat', penerbit: c.penerbit, baris: [['Diberikan kepada', g.name], ['NIP', g.nip]] });

function MenuRow({ to, onClick, icon, title, sub, children }) {
  const isi = (
    <>
      <IconBox icon={icon} tone="blue" size="sm" />
      <span className="min-w-0 flex-1">
        <b className="block text-sm font-semibold text-ink">{title}</b>
        <small className="block truncate text-xs text-muted">{sub}</small>
      </span>
      {children ?? <IoChevronForward className="size-4 text-subtle" />}
    </>
  );
  const cls = 'ui-press flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left hover:bg-surface';
  if (to) return <Link to={to} className={cls}>{isi}</Link>;
  if (onClick) return <button type="button" onClick={onClick} className={cls}>{isi}</button>;
  return <div className={cls.replace('ui-press ', '')}>{isi}</div>;
}

// Profil guru pembimbing (versi mobile: GuruProfil.vue)
export default function ProfilPage() {
  const [notifikasi, setNotifikasi] = useState(true);
  const [semua, setSemua] = useState(false);
  const [skBaru, setSkBaru] = useState(null);
  const inputSk = useRef(null);
  const ui = useUi();
  const navigate = useNavigate();
  const keluar = async () => {
    const ok = await ui.confirm({ title: 'Keluar dari Portal Guru?', message: 'Anda perlu masuk kembali untuk mengelola karya siswa.', confirmLabel: 'Ya, Keluar', tone: 'danger', icon: IoLogOutOutline });
    if (!ok) return;
    navigate('/onboarding');
    ui.toast({ title: 'Anda telah keluar', tone: 'info' });
  };
  const gantiSk = (e) => {
    const f = e.target.files?.[0];
    e.target.value = '';
    if (!f) return;
    if (f.type !== 'application/pdf') return ui.toast({ title: 'SK harus berformat PDF', tone: 'error' });
    if (f.size > 5 * 1024 * 1024) return ui.toast({ title: 'Berkas terlalu besar', description: 'Maksimal 5 MB.', tone: 'error' });
    setSkBaru(f.name);
    ui.toast({ title: 'SK baru diunggah', description: `${f.name} • menunggu verifikasi Cabdin.` });
  };
  return (
    <div className="space-y-8">
      {/* ---------- Identitas ---------- */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-dark via-navy to-primary p-6 text-white sm:p-8">
        <i className="pointer-events-none absolute -top-20 -right-10 size-64 rounded-full bg-secondary/40 blur-3xl" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center">
          <span className="grid size-20 shrink-0 place-items-center rounded-2xl bg-white text-2xl font-extrabold text-navy">{g.initials}</span>
          <div className="min-w-0 flex-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
              <i className="size-2 rounded-full bg-emerald-400" /> Pendidik Aktif Dapodik 2025/2026
            </span>
            <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">{g.name}</h2>
            <p className="text-sm text-ice">{g.peran}</p>
            <p className="text-sm text-ice">{g.org} • {g.cabdin}</p>
          </div>
          <dl className="grid gap-3 rounded-2xl bg-white/10 p-4 text-sm ring-1 ring-white/15 sm:grid-cols-2 lg:w-72 lg:grid-cols-1">
            <div><dt className="text-xs text-ice">NUPTK</dt><dd className="font-mono font-semibold">{g.nuptk}</dd></div>
            <div><dt className="text-xs text-ice">NIP</dt><dd className="font-mono font-semibold">{g.nip}</dd></div>
          </dl>
        </div>
      </section>

      {/* ---------- Statistik ---------- */}
      <section className="space-y-4">
        <SectionHeader title="Statistik Pembinaan Lomba" subtitle="Tahun 2025/2026" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statistikGuru.map((s) => <StatCard key={s.label} {...s} />)}
        </div>
      </section>

      <div className="grid gap-8 [&>*]:min-w-0 xl:grid-cols-2">
        <div className="space-y-8">
          {/* ---------- SK ---------- */}
          <section className="space-y-4">
            <SectionHeader title="SK & Legalitas Pembimbing" action={<Pill tone="green">Sah Cabdin</Pill>} />
            <Card className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-red-50 text-xs font-bold text-red-600">PDF</span>
                <div className="min-w-0">
                  <b className="block font-semibold text-ink">SK Kepala Sekolah Penetapan Pembimbing Lomba 2026</b>
                  <small className="text-xs text-muted">No: 421.2/108/SMPN1-MND/I/2026 • PDF 1.8 MB</small>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="soft" size="sm" icon={IoEyeOutline} className="flex-1" onClick={() => ui.lihat(skDoc)}>Lihat Dokumen</Button>
                <Button variant="outline" size="sm" icon={IoDownloadOutline} className="flex-1" onClick={() => ui.unduh(skDoc)}>Unduh</Button>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-emerald-50 p-3">
                <IoClipboardOutline className="size-5 text-emerald-700" />
                <span className="min-w-0 flex-1">
                  <b className="block text-sm font-semibold text-ink">Pakta Integritas Orisinalitas Karya</b>
                  <small className="text-xs text-emerald-800">Terverifikasi Digital Sig • Aktif 2026</small>
                </span>
                <IoCheckmarkCircle className="size-5 text-emerald-600" />
              </div>
              <input ref={inputSk} type="file" accept="application/pdf" hidden onChange={gantiSk} />
              {skBaru && <p className="ui-enter rounded-xl bg-amber-50 p-3 text-xs font-medium text-amber-900">SK baru <b>{skBaru}</b> menunggu verifikasi Cabdin.</p>}
              <Button variant="ghost" size="sm" icon={IoCloudUploadOutline} className="w-full" onClick={() => inputSk.current?.click()}>Perbarui Berkas SK Penugasan</Button>
            </Card>
          </section>

          {/* ---------- Sertifikat ---------- */}
          <section className="space-y-4">
            <SectionHeader title="E-Sertifikat Pembimbing Resmi" action={<Pill tone="blue">Tervalidasi</Pill>} />
            <Card className="space-y-3">
              {sertifikatGuru.map((c) => (
                <div key={c.judul} className="flex items-center gap-3 rounded-xl border border-line-soft p-3">
                  <IconBox icon={c.icon} tone={c.tone} />
                  <span className="min-w-0 flex-1">
                    <b className="block text-sm font-semibold text-ink">{c.judul}</b>
                    <small className="text-xs text-muted">{c.penerbit}</small>
                  </span>
                  <Button variant="ghost" size="sm" icon={IoDownloadOutline} aria-label={'Unduh ' + c.judul} onClick={() => ui.unduh(sertDoc(c))} />
                </div>
              ))}
              <button type="button" onClick={() => setSemua(true)} className="w-full pt-1 text-center text-sm font-semibold text-navy hover:underline">Lihat Semua Sertifikat ({semuaSertifikat.length})</button>
              <Modal open={semua} onClose={() => setSemua(false)} icon={IoMedalOutline} title="E-Sertifikat Pembimbing" subtitle={`${semuaSertifikat.length} sertifikat tervalidasi`} footer={<Button variant="ghost" onClick={() => setSemua(false)}>Tutup</Button>}>
                <div className="space-y-3">
                  {semuaSertifikat.map((c) => (
                    <div key={c.judul} className="flex items-center gap-3 rounded-xl border border-line-soft p-3">
                      <IconBox icon={c.icon} tone={c.tone} />
                      <span className="min-w-0 flex-1">
                        <b className="block text-sm font-semibold text-ink">{c.judul}</b>
                        <small className="text-xs text-muted">{c.penerbit}</small>
                      </span>
                      <Button variant="soft" size="sm" icon={IoEyeOutline} onClick={() => { setSemua(false); ui.lihat(sertDoc(c)); }}>Lihat</Button>
                    </div>
                  ))}
                </div>
              </Modal>
            </Card>
          </section>
        </div>

        {/* ---------- Pengaturan ---------- */}
        <section className="space-y-4">
          <SectionHeader title="Manajemen Akun & Pengaturan" />
          <Card className="p-2">
            <MenuRow to="/guru/kontak" icon={IoIdCardOutline} title="Informasi Kontak Dapodik" sub={`${g.email} • ${g.telepon}`} />
            <MenuRow icon={IoNotificationsOutline} title="Notifikasi WhatsApp & Email" sub="Status revisi karya siswa & info juri berkala">
              <button
                type="button"
                role="switch"
                aria-checked={notifikasi}
                aria-label="Notifikasi WhatsApp & Email"
                onClick={() => { setNotifikasi(!notifikasi); ui.toast({ title: notifikasi ? 'Notifikasi dimatikan' : 'Notifikasi diaktifkan', description: notifikasi ? 'Anda tidak akan menerima pesan WhatsApp & email.' : 'Info revisi & penilaian dikirim ke WhatsApp dan email.', tone: 'info', durasi: 3000 }); }}
                className={cx('relative h-6 w-11 shrink-0 rounded-full transition', notifikasi ? 'bg-navy' : 'bg-slate-300')}
              >
                <i className={cx('absolute top-0.5 size-5 rounded-full bg-white shadow transition-all', notifikasi ? 'left-[22px]' : 'left-0.5')} />
              </button>
            </MenuRow>
            <MenuRow to="/guru/kata-sandi" icon={IoLockClosedOutline} title="Keamanan & Kata Sandi" sub="Ubah password & autentikasi 2 langkah" />
            <MenuRow to="/guru/panduan" icon={IoBookOutline} title="Panduan Guru (Buku Saku PDF)" sub="Standar kurasi & penilaian mandiri" />
            <MenuRow onClick={() => ui.buka(KONTAK.waHelpdesk, 'WhatsApp Helpdesk dibuka')} icon={IoHeadsetOutline} title="Pusat Bantuan & Hotline Cabdin" sub="Helpdesk Teknis Dinas Pendidikan Sulut" />
          </Card>
          <p className="flex gap-2 rounded-2xl bg-soft/40 p-4 text-sm text-muted">
            <IoShieldOutline className="mt-0.5 size-5 shrink-0 text-navy" />
            <span>Data sesi terisolasi khusus unit kerja <b className="text-ink">{g.org}</b>. Seluruh aktivitas kurasi dan unggahan karya tercatat dalam audit trail sistem kedinasan.</span>
          </p>
          <Card className="space-y-1">
            <small className="text-xs font-semibold text-subtle">Ringkasan akun</small>
            <InfoList rows={[['Email', g.email], ['WhatsApp', g.telepon], ['Satuan Pendidikan', g.org]]} />
          </Card>
          <Button variant="danger" icon={IoLogOutOutline} className="w-full" onClick={keluar}>Keluar dari Portal Guru</Button>
        </section>
      </div>
    </div>
  );
}
