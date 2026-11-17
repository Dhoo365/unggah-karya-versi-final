import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IoCalendarOutline,
  IoCheckmarkCircle,
  IoDocumentTextOutline,
  IoDownloadOutline,
  IoLockClosedOutline,
  IoMegaphoneOutline,
  IoNotificationsOutline,
  IoPersonAddOutline,
  IoTrophyOutline,
} from 'react-icons/io5';
import { Button, Card, EmptyState, FilterChips, IconBox, Pill } from '../../components/ui/index.js';
import { cx } from '../../lib/cx.js';
import { guruProfil, jenjangLomba, katalogLomba } from '../../data/guru.js';

// Katalog lomba aktif (versi mobile: GuruKatalogLomba.vue)
export default function KatalogLombaPage() {
  const navigate = useNavigate();
  const [jenjang, setJenjang] = useState(jenjangLomba[0].label);
  const [diingatkan, setDiingatkan] = useState([]);
  const key = jenjangLomba.find((j) => j.label === jenjang)?.key;
  const tampil = katalogLomba.filter((l) => l.jenjang === key);
  const [unggulan, ...lainnya] = tampil;

  const Aksi = ({ l }) => (
    <div className="flex flex-col gap-2">
      <Button icon={IoPersonAddOutline} className="w-full" onClick={() => navigate('/guru/unggah')}>Daftarkan Siswa</Button>
      <Button variant="outline" icon={IoDownloadOutline} className="w-full">Unduh Juknis{l.ukuranJuknis ? ` (${l.ukuranJuknis})` : ''}</Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <FilterChips items={jenjangLomba.map((j) => j.label)} active={jenjang} onChange={setJenjang} />
        <span className="inline-flex items-center gap-2 text-sm text-muted">
          Akun Guru Pembimbing • <b className="text-ink">{guruProfil.org}</b> <Pill tone="green">Aktif</Pill>
        </span>
      </div>

      <div className="flex items-start gap-3 rounded-2xl border border-navy/15 bg-soft/40 p-4 text-sm">
        <IoMegaphoneOutline className="mt-0.5 size-5 shrink-0 text-navy" />
        <p className="text-muted"><b className="text-ink">Informasi Wilayah Sulawesi Utara:</b> Menampilkan lomba resmi Dinas Pendidikan Daerah Prov. Sulut periode 2026 sesuai jenjang sekolah Anda.</p>
      </div>

      {!tampil.length && (
        <EmptyState icon={IoTrophyOutline} title="Belum ada lomba" description="Belum ada lomba untuk jenjang ini. Pilih “Jenjang SMP” untuk melihat katalog sekolah Anda." />
      )}

      {/* ---------- Lomba unggulan ---------- */}
      {unggulan?.unggulan && (
        <Card as="article" className="grid gap-6 border-amber-200 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Pill tone="amber" icon={unggulan.tagIcon}>{unggulan.tag}</Pill>
              <Pill tone="blue">Pendaftaran Dibuka</Pill>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-ink">{unggulan.judul}</h2>
              <p className="mt-1 text-muted">{unggulan.deskripsi}</p>
            </div>
            <div>
              <small className="text-xs font-bold tracking-widest text-subtle">CABANG YANG DILOMBAKAN</small>
              <div className="mt-2 flex flex-wrap gap-2">
                {unggulan.cabang.map((c) => {
                  const I = c.icon;
                  return <span key={c.nama} className="inline-flex items-center gap-1.5 rounded-lg bg-surface px-3 py-1.5 text-sm font-medium text-ink"><I className="size-4 text-navy" />{c.nama}</span>;
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 rounded-2xl bg-surface p-5">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-sm text-muted"><IoCalendarOutline className="size-4" />{unggulan.batasLabel}</span>
              <Pill tone="red">{unggulan.sisaHari}</Pill>
            </div>
            <b className="text-2xl font-extrabold text-navy">{unggulan.batas}</b>
            <div className="grid grid-cols-2 gap-3 border-t border-line-soft pt-4 text-sm">
              <span className="text-subtle">Kuota<b className="block text-ink">{unggulan.kuota}</b></span>
              <span className="text-subtle">Sisa Kuota Sekolah<b className="block text-ink">{unggulan.sisaKuota}</b></span>
            </div>
            <div className="mt-auto"><Aksi l={unggulan} /></div>
          </div>
        </Card>
      )}

      {/* ---------- Lomba lainnya ---------- */}
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {(unggulan?.unggulan ? lainnya : tampil).map((l) => {
          const segera = l.status === 'segera';
          const ingat = diingatkan.includes(l.id);
          return (
            <Card key={l.id} as="article" className={cx('flex flex-col gap-4', segera && 'bg-surface/60')}>
              <div className="flex items-start justify-between gap-3">
                <IconBox icon={l.tagIcon} tone={l.tagTone} />
                {segera ? <Pill tone="gray" icon={IoLockClosedOutline}>Segera Dibuka</Pill> : <Pill tone="blue">Dibuka</Pill>}
              </div>
              <div>
                <small className="text-xs font-semibold text-subtle">{l.tag}</small>
                <h3 className="text-lg font-bold text-ink">{l.judul}</h3>
                <p className="mt-1 text-sm text-muted">{l.deskripsi}</p>
              </div>
              {segera ? (
                <>
                  <p className="flex items-start gap-2 rounded-xl border border-dashed border-line p-3 text-xs text-muted italic">
                    <IoDocumentTextOutline className="size-4 shrink-0 not-italic" /> {l.petunjuk}
                  </p>
                  <Button variant={ingat ? 'soft' : 'outline'} size="sm" icon={ingat ? IoCheckmarkCircle : IoNotificationsOutline} className="mt-auto"
                    onClick={() => setDiingatkan((d) => (ingat ? d.filter((x) => x !== l.id) : [...d, l.id]))}>
                    {ingat ? 'Pengingat Aktif' : 'Ingatkan Saya'}
                  </Button>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 rounded-xl bg-surface p-3 text-sm">
                    <IoCalendarOutline className="size-4 text-navy" />
                    <span className="text-muted">{l.batasLabel}:</span> <b className="text-ink">{l.batas}</b>
                  </div>
                  <div className="mt-auto"><Aksi l={l} /></div>
                </>
              )}
            </Card>
          );
        })}
      </section>

      <p className="text-center text-sm text-muted">Butuh bantuan pendaftaran? Hubungi Panitia Provinsi melalui menu <b className="text-ink">Profil › Bantuan</b>.</p>
    </div>
  );
}
