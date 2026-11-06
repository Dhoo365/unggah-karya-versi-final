import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IoArrowForwardOutline,
  IoArrowUndoOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoDocumentTextOutline,
  IoDownloadOutline,
  IoRibbonOutline,
  IoSearchOutline,
  IoServerOutline,
  IoTrophyOutline,
} from 'react-icons/io5';
import {
  Avatar,
  Button,
  Card,
  EmptyState,
  IconBox,
  Pill,
  SearchBar,
  SectionHeader,
} from '../../components/ui/index.js';
import { cx, matchQuery } from '../../lib/cx.js';
import { pesertaList, pesertaStats, pesertaTervalidasi, topTalenta } from '../../data/admin.js';

// Status tampilan untuk setiap peserta di antrean
const STATUS = {
  menunggu: { label: 'Menunggu Validasi', tone: 'amber' },
  valid: { label: 'Tervalidasi', tone: 'green' },
  revisi: { label: 'Perlu Revisi', tone: 'red' },
};

// Manajemen peserta & validasi prestasi (versi mobile: AdminPeserta.vue)
export default function PesertaPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('validasi');
  // { [id]: 'valid' | 'revisi' } — status hasil klik tombol
  const [statusMap, setStatusMap] = useState({});

  const setStatus = (id, status) => setStatusMap((prev) => ({ ...prev, [id]: status }));
  const daftar = pesertaList.filter((p) => matchQuery(p, query, ['nama', 'nisn', 'asal', 'lomba']));
  // Total antrean 24 (data contoh), berkurang setiap ada yang divalidasi/ditolak
  const sudahDiproses = Object.values(statusMap).filter(Boolean).length;
  const menunggu = pesertaStats[0].value - sudahDiproses;

  return (
    <div className="space-y-8">
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-dark via-navy to-primary p-6 text-white shadow-lg sm:p-8">
        <i className="pointer-events-none absolute -bottom-24 -left-10 size-72 rounded-full bg-secondary/40 blur-3xl" />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold tracking-wide text-white/75 uppercase">
                Sistem Kurasi Talenta Kota Manado
              </span>
              <span className="rounded-full bg-gold px-2.5 py-0.5 text-xs font-bold text-gold-ink">TPK 2025</span>
            </div>
            <h2 className="mt-3 text-3xl leading-tight font-extrabold">
              Manajemen Peserta &<br className="hidden sm:block" /> Validasi Prestasi
            </h2>
            <p className="mt-2 flex items-center gap-2 text-sm text-white/75">
              <i className="size-2 rounded-full bg-emerald-400" /> TTE BSrE Terhubung Aktif
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:min-w-[420px]">
            {pesertaStats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15 backdrop-blur">
                <span className="text-xs font-medium text-white/75">{s.label}</span>
                <strong className="mt-1 block text-2xl font-extrabold">{s.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Pencarian & tab ---------- */}
      <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="inline-flex rounded-xl border border-line-soft bg-white p-1 shadow-sm">
          <TabButton active={tab === 'validasi'} onClick={() => setTab('validasi')} icon={IoCheckmarkCircleOutline}>
            Validasi Prestasi
            <span className={cx('rounded-full px-2 text-xs', tab === 'validasi' ? 'bg-white/20' : 'bg-amber-100 text-amber-800')}>
              {menunggu}
            </span>
          </TabButton>
          <TabButton active={tab === 'kurasi'} onClick={() => setTab('kurasi')} icon={IoRibbonOutline}>
            Kurasi Talenta
          </TabButton>
        </div>
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Cari NISN, nama peserta, atau sekolah..."
          className="lg:w-[420px]"
        />
      </section>

      {tab === 'validasi' ? (
        <div className="grid gap-8 xl:grid-cols-3">
          {/* ---------- Antrean ---------- */}
          <div className="space-y-5 xl:col-span-2">
            <SectionHeader
              title="Daftar Antrean Validasi"
              action={
                <div className="flex items-center gap-3">
                  <Pill tone="amber">{menunggu} Menunggu</Pill>
                  <button type="button" className="inline-flex items-center gap-1 text-sm font-bold text-navy hover:underline">
                    Lihat Semua <IoArrowForwardOutline className="size-4" />
                  </button>
                </div>
              }
            />

            {daftar.length === 0 && (
              <EmptyState icon={IoSearchOutline} title="Peserta tidak ditemukan" description="Periksa kembali NISN, nama, atau nama sekolah." />
            )}

            {daftar.map((p) => {
              const st = STATUS[statusMap[p.id] ?? 'menunggu'];
              return (
                <Card key={p.id} as="article" className="space-y-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <Avatar initials={p.initial} tone={p.avatarTone} />
                      <div>
                        <strong className="block text-base font-bold text-ink">{p.nama}</strong>
                        <span className="text-sm text-muted">{p.asal}</span>
                        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                          <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                            <IoCheckmarkCircleOutline className="size-4" /> Dapodik Terverifikasi
                          </span>
                          <span className="text-subtle">NISN: {p.nisn}</span>
                        </div>
                      </div>
                    </div>
                    <Pill tone={st.tone}>{st.label}</Pill>
                  </div>

                  <div className="rounded-xl bg-surface p-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <strong className="text-sm font-bold text-ink">{p.lomba}</strong>
                      <span className="text-xs text-subtle">{p.waktu}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted italic">“{p.judul}”</p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {p.files.map((f) => (
                        <div key={f.nama} className="flex items-center gap-3 rounded-lg border border-line-soft bg-white px-3 py-2.5">
                          <f.icon className="size-5 shrink-0 text-navy" />
                          <span className="min-w-0 flex-1 truncate text-sm font-medium">{f.nama}</span>
                          <small className="text-xs text-subtle">{f.size}</small>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line-soft pt-4">
                    <span className="inline-flex items-center gap-2 text-sm text-muted">
                      <IoDocumentTextOutline className="size-5" /> TTE BSrE
                      <b className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                        <IoCheckmarkCircleOutline className="size-4" /> Siap
                      </b>
                    </span>

                    {statusMap[p.id] ? (
                      <Button variant="ghost" size="sm" icon={IoArrowUndoOutline} onClick={() => setStatus(p.id, undefined)}>
                        Batalkan
                      </Button>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        <Button variant="danger" size="sm" icon={IoCloseCircleOutline} onClick={() => setStatus(p.id, 'revisi')}>
                          Minta Revisi / Tolak
                        </Button>
                        <Button size="sm" icon={IoCheckmarkCircleOutline} onClick={() => setStatus(p.id, 'valid')}>
                          Validasi & Sahkan TTE
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}

            {/* Peserta yang sudah tervalidasi */}
            <Card as="article" className="space-y-4 border-emerald-200 bg-emerald-50/30">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <Avatar initials={pesertaTervalidasi.initial} tone={pesertaTervalidasi.avatarTone} />
                  <div>
                    <strong className="block text-base font-bold text-ink">{pesertaTervalidasi.nama}</strong>
                    <span className="text-sm text-muted">{pesertaTervalidasi.asal}</span>
                    <span className="mt-1 flex items-center gap-1 text-xs font-semibold text-emerald-700">
                      <IoCheckmarkCircleOutline className="size-4" /> Dapodik Terverifikasi
                    </span>
                  </div>
                </div>
                <Pill tone="green">Tervalidasi • E-Sertifikat Terbit</Pill>
              </div>
              <div className="rounded-xl border border-emerald-100 bg-white p-4">
                <strong className="text-sm font-bold text-ink">{pesertaTervalidasi.lomba}</strong>
                <p className="mt-1 text-sm text-muted italic">{pesertaTervalidasi.judul}</p>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-subtle">Diarsipkan di SIM-Prestasi Sulut</span>
                <Button variant="outline" size="sm" icon={IoDownloadOutline}>Unduh E-Sertifikat</Button>
              </div>
            </Card>
          </div>

          {/* ---------- Panel samping ---------- */}
          <aside className="space-y-6">
            <Card className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <IconBox icon={IoTrophyOutline} tone="amber" size="sm" />
                  <div>
                    <strong className="block text-sm font-bold">Top 10 Talenta Seni & Sains Kota Manado</strong>
                    <small className="text-xs text-emerald-700">100% tervalidasi</small>
                  </div>
                </div>
                <Pill tone="blue">Seleksi Nasional</Pill>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-amber-50 to-white p-3 ring-1 ring-amber-200">
                <div className="grid size-10 place-items-center rounded-xl bg-gold text-sm font-extrabold text-gold-ink">
                  #{topTalenta.rank}
                </div>
                <div className="min-w-0 flex-1">
                  <strong className="block truncate text-sm font-bold">{topTalenta.nama}</strong>
                  <span className="block truncate text-xs text-muted">{topTalenta.info}</span>
                </div>
                <div className="text-right">
                  <strong className="text-lg font-extrabold text-navy">{topTalenta.skor}</strong>
                  <small className="text-xs text-subtle">/100</small>
                </div>
              </div>
            </Card>

            <Card className="flex items-start gap-4 bg-soft/40">
              <IconBox icon={IoServerOutline} tone="navy" />
              <div>
                <strong className="block text-sm font-bold">Pusat Data Integrasi Prestasi</strong>
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  Arsip portofolio siswa berprestasi dan dapat diverifikasi melalui sistem pusat pendidikan.
                </p>
              </div>
            </Card>

            <Button size="lg" className="w-full" icon={IoCheckmarkCircleOutline}>
              Validasi Massal
            </Button>
          </aside>
        </div>
      ) : (
        <EmptyState
          icon={IoRibbonOutline}
          title="Kurasi Talenta Daerah"
          description="Kelola dan pilih peserta berprestasi untuk masuk dalam daftar talenta unggulan Kota Manado."
          action={
            <Button iconRight={IoArrowForwardOutline} onClick={() => navigate('/admin/talenta')}>
              Mulai Kurasi Talenta
            </Button>
          }
        />
      )}
    </div>
  );
}

function TabButton({ active, onClick, icon: Icon, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        'inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-semibold transition-colors',
        active ? 'bg-navy text-white' : 'text-muted hover:text-ink'
      )}
    >
      <Icon className="size-[18px]" />
      {children}
    </button>
  );
}
