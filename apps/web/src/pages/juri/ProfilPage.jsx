import { useNavigate } from 'react-router-dom';
import { IoCheckmarkCircleOutline, IoFingerPrintOutline, IoLogOutOutline } from 'react-icons/io5';
import { Button, Card, IconBox, Pill, SectionHeader } from '../../components/ui/index.js';
import { cx } from '../../lib/cx.js';
import { toneText } from '../../lib/tones.js';
import { juriProfile } from '../../data/juri.js';
import { dokumenJuri, profilStats } from '../../data/juriPenilaian.js';

// Profil juri (versi mobile: JuriProfil.vue)
export default function ProfilPage() {
  const navigate = useNavigate();

  return (
    <div className="grid gap-8 xl:grid-cols-[360px_1fr]">
      {/* ---------- Kartu profil ---------- */}
      <aside className="space-y-4">
        <Card className="overflow-hidden p-0">
          <div className="h-24 bg-gradient-to-br from-navy-dark to-primary" />
          <div className="-mt-12 flex flex-col items-center px-6 pb-6 text-center">
            {juriProfile.photo ? (
              <img src={juriProfile.photo} alt={juriProfile.name} className="size-24 rounded-2xl border-4 border-white object-cover shadow-md" />
            ) : (
              <div className="grid size-24 place-items-center rounded-2xl border-4 border-white bg-navy text-3xl font-extrabold text-white">
                {juriProfile.initials}
              </div>
            )}
            <Pill tone="amber" className="mt-3">Ketua Juri</Pill>
            <h2 className="mt-2 text-xl font-extrabold text-ink">{juriProfile.name}</h2>
            <p className="mt-1 text-xs text-subtle">NIP: {juriProfile.nip}</p>
            <p className="mt-1 text-sm text-muted">Dosen Seni UNIMA / Tim Juri Disdikbud Kota Manado</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Pill tone="green" icon={IoCheckmarkCircleOutline}>Pakta Integritas</Pill>
              <Pill tone="blue" icon={IoFingerPrintOutline}>TTE BSrE Aktif</Pill>
            </div>
          </div>
        </Card>
        <Button variant="danger" className="w-full" icon={IoLogOutOutline} onClick={() => navigate('/onboarding')}>
          Keluar dari Akun
        </Button>
      </aside>

      <div className="space-y-8">
        {/* ---------- Statistik ---------- */}
        <section className="grid grid-cols-3 gap-4">
          {profilStats.map((s) => (
            <Card key={s.label} className="text-center">
              <b className={cx('block text-3xl font-extrabold', toneText[s.tone])}>{s.value}</b>
              <span className="text-sm text-muted">{s.label}</span>
            </Card>
          ))}
        </section>

        {/* ---------- Dokumen ---------- */}
        <section className="space-y-4">
          <SectionHeader title="Legalitas & Surat Penugasan" action={<Pill tone="gray">T.A. 2026</Pill>} />
          <div className="space-y-3">
            {dokumenJuri.map((d) => (
              <Card key={d.title} className="flex flex-wrap items-center gap-4">
                <IconBox icon={d.icon} tone={d.tone} />
                <div className="min-w-0 flex-1">
                  <b className="block text-sm font-bold text-ink">{d.title}</b>
                  <span className={cx('text-xs text-muted', d.mono && 'font-mono')}>{d.desc}</span>
                </div>
                {d.action ? (
                  <Button variant="soft" size="sm">{d.action}</Button>
                ) : (
                  <Pill tone={d.badgeTone} icon={d.badgeIcon}>{d.badge}</Pill>
                )}
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
