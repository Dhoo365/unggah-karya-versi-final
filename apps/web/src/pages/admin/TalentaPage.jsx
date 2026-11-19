import { useState } from 'react';
import {
  IoArrowForwardOutline,
  IoDocumentTextOutline,
  IoDownloadOutline,
  IoEyeOutline,
  IoPersonOutline,
  IoSchoolOutline,
  IoSearchOutline,
  IoShareOutline,
  IoShieldCheckmarkOutline,
  IoStarOutline,
  IoTrophy,
} from 'react-icons/io5';
import {
  Button,
  Card,
  EmptyState,
  FilterChips,
  Pill,
  SearchBar,
  SectionHeader,
  StatCard,
} from '../../components/ui/index.js';
import { cx, matchQuery } from '../../lib/cx.js';
import { talentaFilters, talentaList, talentaStats } from '../../data/admin.js';
import { Dropdown, useUi } from '../../components/feedback/index.js';
import { IoChevronDownOutline, IoGridOutline, IoLockClosedOutline, IoSwapVerticalOutline } from 'react-icons/io5';
import { dokumen } from '../../data/dokumen.js';

const bidangFilter = { 1: /seni|tari|desain|budaya|musik/i, 2: /sains|robot|kir|ilmiah|maritim/i };
const urutan = [
  { label: 'Skor Tertinggi', fn: (a, b) => b.score - a.score },
  { label: 'Skor Terendah', fn: (a, b) => a.score - b.score },
  { label: 'Nama A–Z', fn: (a, b) => a.name.localeCompare(b.name) },
];
const rapor = (t) =>
  dokumen(`Rapor Prestasi ${t.name}`, {
    jenis: 'rekap',
    label: 'Rapor Prestasi',
    baris: [['Nama', t.name], ['Sekolah', t.school], ['Peringkat Kota', `#${t.rank}`], ['Skor Kurasi', `${t.score} / 100`], ['Bidang', t.bidang.replace('Bidang ', '')], ['Status', t.badge]],
  });

// Warna lencana peringkat
const rankStyle = {
  gold: 'bg-gold text-gold-ink',
  silver: 'bg-slate-200 text-slate-700',
  bronze: 'bg-amber-200 text-amber-900',
  plain: 'bg-slate-100 text-slate-500',
};
const medalColor = {
  gold: 'text-amber-500',
  silver: 'text-slate-400',
  bronze: 'text-amber-700',
};

// Kurasi talenta daerah (versi mobile: AdminTalenta.vue)
export default function TalentaPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState(talentaFilters[0]);

  const ui = useUi();
  const [urut, setUrut] = useState(0);
  const [final, setFinal] = useState(false);
  const idx = talentaFilters.indexOf(filter);
  const daftar = talentaList
    .filter((t) => matchQuery(t, query, ['name', 'school', 'bidang']) && (!bidangFilter[idx] || bidangFilter[idx].test(t.bidang)))
    .sort(urutan[urut].fn);

  const finalisasi = async () => {
    if (final) return ui.toast({ title: 'Daftar sudah difinalisasi', description: 'Hubungi Dinas Provinsi untuk membuka kunci.', tone: 'info' });
    const ok = await ui.confirm({
      title: 'Finalisasi daftar talenta?',
      message: 'Peringkat dikunci dan dikirim ke Dinas Pendidikan Provinsi untuk seleksi kontingen.',
      confirmLabel: 'Kunci & Kirim',
      icon: IoLockClosedOutline,
      delay: 800,
    });
    if (!ok) return;
    setFinal(true);
    ui.toast({ title: 'Daftar talenta difinalisasi', description: `${talentaList.length} talenta dikunci untuk seleksi provinsi.` });
  };
  const piagam = async () => {
    const ok = await ui.confirm({
      title: 'Terbitkan piagam apresiasi?',
      message: `Piagam Kadis untuk ${Math.min(10, talentaList.length)} talenta teratas akan dibubuhi TTE dan dikirim ke sekolah.`,
      confirmLabel: 'Terbitkan Piagam',
      tone: 'success',
      icon: IoPersonOutline,
      delay: 900,
    });
    if (ok) ui.toast({ title: 'Piagam apresiasi diterbitkan', description: 'Sekolah menerima notifikasi untuk mengunduh piagam.' });
  };
  const eksporPdf = () =>
    ui.unduh(dokumen('Rekap Kurasi Talenta Daerah Kota Manado 2026', { jenis: 'rekap', baris: daftar.map((t) => [`#${t.rank} ${t.name}`, `${t.school} • ${t.score}`]) }));
  const eksporExcel = () =>
    ui.csv('Kurasi_Talenta_Manado_2026.csv', ['Peringkat', 'Nama', 'Sekolah', 'Bidang', 'Skor', 'Status'], daftar.map((t) => [t.rank, t.name, t.school, t.bidang, t.score, t.badge]));

  return (
    <div className="space-y-8">
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-dark via-navy to-primary p-6 text-white shadow-lg sm:p-8">
        <IoTrophy className="pointer-events-none absolute -right-6 -bottom-8 size-56 text-white/10" />
        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-xs font-bold text-gold-ink">
            <IoStarOutline className="size-4" /> Program Pembinaan 2026
          </span>
          <h2 className="mt-4 text-3xl font-extrabold">Database Talenta Emas Manado 2026</h2>
          <p className="mt-2 text-sm text-white/80">
            Pembinaan Menuju FLS2N & O2SN Tingkat Provinsi Sulut dan Nasional Puspresnas.
          </p>
        </div>
        <div className="relative mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-5">
          <span className="inline-flex items-center gap-2 text-sm text-white/85">
            <IoSchoolOutline className="size-5 text-gold" /> Dikda Sulut & Disdikbud Manado
          </span>
          <button type="button" onClick={finalisasi} className="inline-flex items-center gap-1.5 text-sm font-bold hover:underline">
            {final ? <><IoLockClosedOutline className="size-4" /> Telah Difinalisasi</> : <>Tahap Finalisasi <IoArrowForwardOutline className="size-4" /></>}
          </button>
        </div>
      </section>

      {/* ---------- Statistik ---------- */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {talentaStats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </section>

      {/* ---------- Pencarian & filter ---------- */}
      <section className="flex flex-col gap-4 xl:flex-row xl:items-center">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Cari siswa berprestasi, NISN, atau sekolah..."
          className="xl:w-[420px]"
        />
        <FilterChips items={talentaFilters} active={filter} onChange={setFilter} />
      </section>

      <div className="grid gap-8 xl:grid-cols-3">
        {/* ---------- Daftar talenta ---------- */}
        <div className="space-y-4 xl:col-span-2">
          <SectionHeader
            title="Daftar Talenta Teratas"
            action={
              <Dropdown
                items={urutan.map((u, i) => ({ label: u.label, icon: i === urut ? IoSwapVerticalOutline : undefined, onClick: () => setUrut(i) }))}
                trigger={({ toggle, open }) => (
                  <button type="button" onClick={toggle} aria-expanded={open} className="inline-flex items-center gap-1 text-sm font-bold text-navy hover:underline">
                    Urutkan: {urutan[urut].label} <IoChevronDownOutline className={cx('size-4 transition-transform', open && 'rotate-180')} />
                  </button>
                )}
              />
            }
          />

          {daftar.length === 0 && (
            <EmptyState icon={IoSearchOutline} title="Talenta tidak ditemukan" description="Coba kata kunci lain." />
          )}

          {daftar.map((t) => {
            const top = t.rank === 1;
            return (
              <Card key={t.name} as="article" className={cx('ui-enter space-y-4', top && 'border-amber-300 ring-2 ring-amber-100')}>
                <div className="flex flex-wrap items-center gap-4">
                  <div className={cx('grid size-12 shrink-0 place-items-center rounded-xl text-base font-extrabold', rankStyle[t.rankTone])}>
                    #{t.rank}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="flex items-center gap-1.5 text-base font-bold text-ink">
                      {t.name}
                      {t.nameIcon && <t.nameIcon className={cx('size-[18px]', medalColor[t.rankTone])} />}
                    </h3>
                    <p className="text-sm text-muted">{t.school}</p>
                  </div>
                  <div className={cx('rounded-xl px-4 py-2 text-right', top ? 'bg-navy text-white' : 'bg-surface')}>
                    <small className={cx('block text-[11px] font-medium', top ? 'text-white/70' : 'text-subtle')}>Skor Kurasi</small>
                    <b className="text-xl font-extrabold">
                      {t.score}
                      <span className={cx('text-xs font-medium', top ? 'text-white/70' : 'text-subtle')}>/100</span>
                    </b>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-surface px-4 py-3">
                  <b className="inline-flex items-center gap-2 text-sm font-semibold text-ink">
                    <t.icon className="size-[18px] text-navy" /> {t.bidang}
                  </b>
                  <Pill tone={t.badgeTone} icon={t.badgeIcon}>{t.badge}</Pill>
                </div>

                <div className="flex flex-wrap justify-end gap-2">
                  {top ? (
                    <>
                      <Button variant="soft" size="sm" icon={IoDownloadOutline} onClick={() => ui.unduh(rapor(t))}>Unduh Rapor Prestasi</Button>
                      <Button size="sm" icon={IoEyeOutline} onClick={() => ui.lihat({ ...rapor(t), judul: `Portofolio ${t.name}`, jenis: 'Portofolio Talenta' })}>Lihat Portofolio</Button>
                    </>
                  ) : (
                    <>
                      <Button variant="ghost" size="sm" onClick={() => ui.lihat({ ...rapor(t), judul: `Berkas ${t.name}`, jenis: 'Detail Berkas' })}>Detail Berkas</Button>
                      <Button variant={t.rankTone === 'plain' ? 'gray' : 'soft'} size="sm" icon={IoDocumentTextOutline} onClick={() => ui.unduh(rapor(t))}>
                        Rapor Prestasi
                      </Button>
                    </>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* ---------- Aksi eksekutif ---------- */}
        <aside>
          <div className="sticky top-24 space-y-4 rounded-2xl bg-gradient-to-br from-navy-dark to-navy p-6 text-white shadow-lg">
            <h2 className="flex items-center gap-2 text-base font-bold">
              <IoShieldCheckmarkOutline className="size-5 text-gold" /> Aksi Eksekutif Disdikbud Manado
            </h2>
            <p className="text-sm leading-relaxed text-white/75">
              Proses sinkronisasi langsung ke sistem Dinas Pendidikan Daerah Provinsi Sulawesi Utara.
            </p>
            <Dropdown
              align="left"
              panelClassName="w-full p-1.5"
              items={[
                { label: 'Ekspor PDF (Rekap Resmi)', icon: IoDocumentTextOutline, onClick: eksporPdf },
                { label: 'Ekspor Excel (CSV)', icon: IoGridOutline, onClick: eksporExcel },
              ]}
              trigger={({ toggle }) => (
                <Button variant="white" className="h-auto w-full py-3 text-left whitespace-normal" icon={IoShareOutline} iconRight={IoChevronDownOutline} onClick={toggle}>
                  Ekspor Kurasi Talenta ke Dinas Provinsi (PDF/Excel)
                </Button>
              )}
            />
            <Button variant="gold" className="w-full" icon={IoPersonOutline} onClick={piagam}>
              Terbitkan Piagam Apresiasi Kadis
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
