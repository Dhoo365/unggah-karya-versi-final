import { Link, useNavigate } from 'react-router-dom';
import {
  IoAddOutline,
  IoArrowForwardOutline,
  IoChevronForwardOutline,
  IoQrCodeOutline,
  IoShieldCheckmark,
  IoShieldCheckmarkOutline,
  IoSwapHorizontalOutline,
} from 'react-icons/io5';
import { Button, Card, IconBox, Pill, SectionHeader, StatCard } from '../../components/ui/index.js';
import { cx } from '../../lib/cx.js';
import { feedAktivitas, guruProfil, menuGuru, metrikKarya, metrikSiswa } from '../../data/guru.js';

const dotTone = { amber: 'bg-amber-500', green: 'bg-emerald-500', red: 'bg-red-500' };
const textTone = { amber: 'text-amber-600', green: 'text-emerald-600', red: 'text-red-600' };

// Beranda Guru Pembimbing (versi mobile: GuruBeranda.vue)
export default function BerandaPage() {
  const navigate = useNavigate();
  return (
    <div className="space-y-8">
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-dark via-navy to-primary p-6 text-white shadow-lg sm:p-8">
        <i className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-secondary/40 blur-3xl" />
        <IoQrCodeOutline className="pointer-events-none absolute right-8 bottom-6 hidden size-36 text-white/10 lg:block" />
        <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
              <IoShieldCheckmark className="size-3.5 text-gold" /> Portal Guru Terpadu 2025/2026
            </span>
            <h2 className="mt-4 text-3xl leading-tight font-extrabold">Dashboard Pembimbing</h2>
            <p className="mt-2 max-w-xl text-sm text-ice">Kelola kelengkapan data siswa, pengajuan karya kompetisi, serta monitoring status penilaian tingkat dinas.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="gold" icon={IoAddOutline} onClick={() => navigate('/guru/unggah')}>Upload Karya Siswa</Button>
              <Button variant="white" icon={IoSwapHorizontalOutline} onClick={() => navigate('/guru/siswa')}>Kelola Status</Button>
            </div>
          </div>
          <div className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/15 backdrop-blur">
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-xl bg-white text-lg font-extrabold text-navy">{guruProfil.initials}</span>
              <div className="min-w-0">
                <b className="block font-bold">{guruProfil.name}</b>
                <small className="text-xs text-ice">NIP: {guruProfil.nip}</small>
              </div>
            </div>
            <p className="mt-4 flex gap-2 border-t border-white/15 pt-4 text-xs leading-relaxed text-ice">
              <IoShieldCheckmarkOutline className="size-4 shrink-0 text-gold" />
              <span><b className="text-white">Hak Akses Terbatas:</b> pengelolaan & isolasi data khusus siswa {guruProfil.org} yang terverifikasi.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Metrik ---------- */}
      <section className="space-y-4">
        <SectionHeader title="Metrik Siswa & Karya Sekolah" subtitle={guruProfil.org} />
        <div className="grid gap-4 sm:grid-cols-3">
          {metrikSiswa.map((m) => <StatCard key={m.label} label={m.label} value={m.value} unit={m.note} icon={m.icon} tone={m.tone} />)}
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {metrikKarya.map((s) => (
            <Link key={s.label} to="/guru/karya">
              <Card className="flex items-center justify-between transition hover:shadow-md">
                <div>
                  <span className="flex items-center gap-2 text-sm font-medium text-muted"><i className={cx('size-2 rounded-full', dotTone[s.tone])} /> Karya {s.label}</span>
                  <b className={cx('mt-1 block text-3xl font-extrabold', textTone[s.tone])}>{s.value}</b>
                  <small className="text-xs text-subtle">{s.note}</small>
                </div>
                <IoChevronForwardOutline className="size-5 text-subtle" />
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid gap-8 [&>*]:min-w-0 xl:grid-cols-[1fr_1.2fr]">
        {/* ---------- Menu ---------- */}
        <section className="space-y-4">
          <SectionHeader title="Menu Utama Guru" subtitle="Fitur Manajemen" />
          <div className="grid gap-3 sm:grid-cols-2">
            {menuGuru.map((m) => (
              <Link key={m.to} to={m.to}>
                <Card className="flex h-full items-start gap-3 transition hover:border-navy/30 hover:shadow-md">
                  <IconBox icon={m.icon} tone={m.tone} />
                  <div className="min-w-0">
                    <b className="block font-semibold text-ink">{m.title}</b>
                    <small className="text-sm text-muted">{m.desc}</small>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          <Card className="flex flex-wrap items-center gap-4 bg-soft/40">
            <IconBox icon={IoShieldCheckmarkOutline} tone="navy" />
            <div className="min-w-0 flex-1">
              <b className="block font-semibold">Validasi Otomatis Pra-Submit</b>
              <small className="text-sm text-muted">Cek plagiasi & kelengkapan berkas otomatis sebelum dikirim ke Dispen.</small>
            </div>
            <Pill tone="green">Aktif</Pill>
          </Card>
        </section>

        {/* ---------- Feed ---------- */}
        <section className="space-y-4">
          <SectionHeader title="Feed Aktivitas & Audit Trail" action={<Link to="/guru/siswa" className="inline-flex items-center gap-1 text-sm font-semibold text-navy hover:underline">Riwayat Lengkap <IoArrowForwardOutline className="size-4" /></Link>} />
          {feedAktivitas.map((f) => (
            <Card key={f.title} as="article" className="flex gap-4">
              <IconBox icon={f.icon} tone={f.tone} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Pill tone={f.tone}>{f.tag}</Pill>
                  <small className="text-xs text-subtle">{f.time}</small>
                </div>
                <h3 className="mt-2 font-semibold text-ink">{f.title}</h3>
                <p className="text-sm text-muted">{f.desc}</p>
              </div>
            </Card>
          ))}
        </section>
      </div>
    </div>
  );
}
