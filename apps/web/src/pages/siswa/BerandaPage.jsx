import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IoArrowForwardOutline,
  IoDocumentTextOutline,
  IoDownloadOutline,
  IoHelpBuoyOutline,
  IoTimeOutline,
  IoTrophyOutline,
} from 'react-icons/io5';
import { Button, Card, FilterChips, IconBox, Pill, SectionHeader } from '../../components/ui/index.js';
import { jenjangFilter, lombaAktif, sorotanLomba, statBeranda } from '../../data/siswa.js';

// Hitung mundur ke tenggat (hari/jam/menit/detik)
function useCountdown(target) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const ms = Math.max(0, new Date(target).getTime() - now);
  const s = Math.floor(ms / 1000);
  return [
    [Math.floor(s / 86400), 'HARI'],
    [Math.floor((s % 86400) / 3600), 'JAM'],
    [Math.floor((s % 3600) / 60), 'MENIT'],
    [s % 60, 'DETIK'],
  ];
}

// Beranda Siswa (versi mobile: SiswaBeranda.vue)
export default function BerandaPage() {
  const navigate = useNavigate();
  const labels = jenjangFilter.map((j) => j.label);
  const [aktif, setAktif] = useState(labels[0]);
  const idAktif = jenjangFilter.find((j) => j.label === aktif)?.id;
  const daftar = lombaAktif.filter((l) => idAktif === 'semua' || l.jenjang.includes(idAktif));
  const hitung = useCountdown(sorotanLomba.tenggat);

  return (
    <div className="space-y-8">
      {/* ---------- Sorotan lomba + hitung mundur ---------- */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-dark via-navy to-primary p-6 text-white shadow-lg sm:p-8">
        <i className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-secondary/40 blur-3xl" />
        <IoTrophyOutline className="pointer-events-none absolute right-8 bottom-6 hidden size-40 text-white/10 lg:block" />
        <div className="relative grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-gold px-3 py-1 text-xs font-bold text-gold-ink">{sorotanLomba.label}</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                <IoTimeOutline className="size-3.5" /> Sisa {hitung[0][0]} Hari
              </span>
            </div>
            <h2 className="mt-4 text-3xl leading-tight font-extrabold">{sorotanLomba.judul}</h2>
            <p className="mt-2 text-sm text-ice">{sorotanLomba.sub}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="gold" iconRight={IoArrowForwardOutline} onClick={() => navigate('/siswa/unggah')}>Daftar Sekarang</Button>
              <Button variant="white" icon={IoDownloadOutline}>Unduh Juknis Resmi</Button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {hitung.map(([v, l]) => (
              <div key={l} className="rounded-2xl bg-white/10 py-4 text-center ring-1 ring-white/15 backdrop-blur">
                <b className="block font-mono text-3xl font-extrabold tabular-nums">{String(v).padStart(2, '0')}</b>
                <small className="text-[10px] font-bold tracking-widest text-ice">{l}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Statistik ---------- */}
      <section className="grid gap-4 sm:grid-cols-3">
        {statBeranda.map((s) => (
          <Card key={s.label}>
            <small className="text-sm text-muted">{s.label}</small>
            <b className="mt-1 block text-3xl font-extrabold text-navy">
              {s.value} <span className="text-sm font-medium text-subtle">{s.unit}</span>
            </b>
          </Card>
        ))}
      </section>

      {/* ---------- Kategori lomba ---------- */}
      <section className="space-y-5">
        <SectionHeader title="Kategori Lomba Aktif" subtitle="Pilih cabang kejuaraan dan unggah berkas karya siswa" />
        <FilterChips items={labels} active={aktif} onChange={setAktif} />
        <div className="grid gap-5 md:grid-cols-2">
          {daftar.map((l) => (
            <Card key={l.id} as="article" className="flex flex-col gap-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <IconBox icon={l.icon} tone={l.tone} />
                  <div>
                    <Pill tone={l.tone}>{l.jenjangTag}</Pill>
                    <small className="mt-1 block text-xs text-subtle">{l.bidang}</small>
                  </div>
                </div>
                <Pill tone="green">Buka</Pill>
              </div>
              <div>
                <h3 className="text-lg font-bold text-ink">{l.judul}</h3>
                <p className="mt-1 text-sm text-muted">{l.deskripsi}</p>
              </div>
              <div className="grid grid-cols-2 gap-3 rounded-xl bg-surface p-3 text-sm">
                <span className="text-subtle">Tenggat: <b className="block text-ink">{l.tenggat}</b></span>
                <span className="text-subtle">Kuota: <b className="block text-ink">{l.kuota}</b></span>
              </div>
              <div className="mt-auto flex gap-2">
                <Button variant="outline" size="sm" icon={IoDocumentTextOutline} className="flex-1">Pedoman Juknis</Button>
                <Button size="sm" iconRight={IoArrowForwardOutline} className="flex-1" onClick={() => navigate('/siswa/unggah')}>Detail & Kirim</Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ---------- Bantuan ---------- */}
      <Card className="flex flex-wrap items-center gap-4 bg-soft/40">
        <IconBox icon={IoHelpBuoyOutline} tone="navy" />
        <div className="min-w-0 flex-1">
          <b className="block font-bold">Butuh Panduan Pendaftaran?</b>
          <small className="text-sm text-muted">Hubungi Helpdesk Teknis Dinas Dikda Sulut</small>
        </div>
        <Button variant="outline" onClick={() => navigate('/siswa/panduan')}>Bantuan</Button>
      </Card>
    </div>
  );
}
