import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  IoAddCircleOutline,
  IoArrowForwardOutline,
  IoCheckmarkCircle,
  IoChevronForwardOutline,
  IoClipboardOutline,
  IoCloudUploadOutline,
  IoCreateOutline,
  IoDocumentTextOutline,
  IoMegaphoneOutline,
  IoSaveOutline,
  IoCalendarOutline,
  IoPeopleOutline,
  IoHammerOutline,
  IoIdCardOutline,
  IoOptionsOutline,
  IoPersonAddOutline,
  IoRibbon,
  IoSearchOutline,
  IoShieldCheckmarkOutline,
  IoTrashOutline,
} from 'react-icons/io5';
import {
  Avatar,
  Button,
  Card,
  EmptyState,
  FilterChips,
  IconBox,
  Pill,
  ProgressBar,
  SearchBar,
  SectionHeader,
  StatCard,
} from '../../components/ui/index.js';
import { cx, matchQuery } from '../../lib/cx.js';
import { toneSoft, toneText } from '../../lib/tones.js';
import {
  berandaStats,
  jenjangFilters,
  juriAvatars,
  kriteriaRingkas,
  lombaList,
  pengumuman,
} from '../../data/admin.js';
import { Modal, useUi } from '../../components/feedback/index.js';
import { Field, FilePicker, SelectInput, TextArea, TextInput } from '../../components/form/index.js';
import { dokumen } from '../../data/dokumen.js';

const jenjangOpsi = [
  { value: 'SMA / MA', tone: 'blue' },
  { value: 'SMK Vokasi', tone: 'sky' },
  { value: 'SMP / MTs', tone: 'gray' },
];
const kecamatanManado = ['Malalayang', 'Sario', 'Wanea', 'Wenang', 'Tikala', 'Paal Dua', 'Mapanget', 'Singkil', 'Tuminting', 'Bunaken', 'Bunaken Kepulauan'];

/* ---------- Formulir buat / ubah lomba ---------- */
function LombaModal({ open, awal, onClose, onSimpan }) {
  const kosong = { title: '', level: jenjangOpsi[0].value, tenggat: '', kuota: '100', meta: '' };
  const [f, setF] = useState(kosong);
  const [juknis, setJuknis] = useState(null);
  const [pesan, setPesan] = useState('');
  const [dicoba, setDicoba] = useState(false);
  const [simpan, setSimpan] = useState(false);
  // isi ulang setiap kali dibuka
  const [kunci, setKunci] = useState(null);
  if (open && kunci !== (awal?.title ?? 'baru')) {
    setKunci(awal?.title ?? 'baru');
    setF(awal ? { title: awal.title, level: awal.level, tenggat: awal.tenggat ?? '', kuota: String(awal.kuotaMaks ?? 100), meta: awal.meta } : kosong);
    setJuknis(null); setPesan(''); setDicoba(false);
  }
  if (!open && kunci) setKunci(null);

  const err = {
    title: f.title.trim().length >= 5 ? '' : 'Nama lomba minimal 5 karakter.',
    tenggat: f.tenggat ? '' : 'Tentukan tanggal batas pendaftaran.',
    kuota: Number(f.kuota) > 0 ? '' : 'Kuota harus lebih dari 0.',
  };
  const e = (k) => (dicoba ? err[k] : '');
  const set = (k) => (ev) => setF((x) => ({ ...x, [k]: ev.target.value }));
  const kirim = async () => {
    setDicoba(true);
    if (Object.values(err).some(Boolean)) return;
    setSimpan(true);
    await new Promise((r) => setTimeout(r, 500)); // TODO: simpan ke API
    setSimpan(false);
    onSimpan({ ...f, juknis });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      icon={awal ? IoCreateOutline : IoAddCircleOutline}
      title={awal ? 'Ubah Data Lomba' : 'Buat Lomba Baru'}
      subtitle="Unggah juknis, atur kuota, dan tanggal seleksi"
      size="lg"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Batal</Button>
          <Button icon={IoSaveOutline} loading={simpan} onClick={kirim}>{awal ? 'Simpan Perubahan' : 'Terbitkan Lomba'}</Button>
        </>
      }
    >
      <div className="space-y-4">
        <Field label="Nama Lomba" required error={e('title')}>
          <TextInput placeholder="Contoh: FLS2N Cipta Puisi 2026" value={f.title} onChange={set('title')} error={e('title')} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Jenjang" required>
            <SelectInput options={jenjangOpsi.map((j) => j.value)} value={f.level} onChange={set('level')} />
          </Field>
          <Field label="Batas Pendaftaran" required error={e('tenggat')}>
            <TextInput type="date" icon={IoCalendarOutline} value={f.tenggat} onChange={set('tenggat')} error={e('tenggat')} />
          </Field>
          <Field label="Kuota Peserta" required error={e('kuota')}>
            <TextInput type="number" min="1" icon={IoPeopleOutline} value={f.kuota} onChange={set('kuota')} error={e('kuota')} />
          </Field>
          <Field label="Tingkat / Tahap" optional>
            <TextInput placeholder="Tingkat Kota Manado • Seleksi Tahap I" value={f.meta} onChange={set('meta')} />
          </Field>
        </div>
        <Field label="Berkas Juknis" optional error={pesan}>
          <FilePicker file={juknis} onPick={(x, m) => { setJuknis(x); setPesan(m); }} accept={['application/pdf']} maxMB={10} error={pesan} title="Pilih Juknis (PDF)" hint="PDF, maksimal 10 MB" readyLabel="Siap diunggah" />
        </Field>
      </div>
    </Modal>
  );
}

/* ---------- Kuota per kecamatan ---------- */
function KuotaModal({ lomba, onClose, onSimpan }) {
  const [kuota, setKuota] = useState(() => Object.fromEntries(kecamatanManado.map((k, i) => [k, 8 + (i % 4)])));
  const [simpan, setSimpan] = useState(false);
  const total = Object.values(kuota).reduce((a, b) => a + (Number(b) || 0), 0);
  return (
    <Modal
      open={!!lomba}
      onClose={onClose}
      icon={IoPeopleOutline}
      title="Kuota Kecamatan"
      subtitle={lomba?.title}
      size="lg"
      footer={
        <>
          <span className="mr-auto self-center text-sm text-muted">Total kuota: <b className="text-navy">{total}</b> peserta</span>
          <Button variant="ghost" onClick={onClose}>Batal</Button>
          <Button icon={IoSaveOutline} loading={simpan} onClick={async () => { setSimpan(true); await new Promise((r) => setTimeout(r, 450)); setSimpan(false); onSimpan(total); }}>Simpan Kuota</Button>
        </>
      }
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {kecamatanManado.map((k) => (
          <label key={k} className="flex items-center justify-between gap-3 rounded-xl border border-line-soft px-3 py-2">
            <span className="text-sm font-medium text-ink">{k}</span>
            <span className="flex items-center gap-1">
              <button type="button" aria-label={`Kurangi ${k}`} onClick={() => setKuota((q) => ({ ...q, [k]: Math.max(0, q[k] - 1) }))} className="ui-press grid size-8 place-items-center rounded-lg bg-surface font-bold text-navy hover:bg-soft">−</button>
              <input type="number" min="0" value={kuota[k]} onChange={(e) => setKuota((q) => ({ ...q, [k]: Math.max(0, Number(e.target.value) || 0) }))} className="h-8 w-12 rounded-lg border border-line text-center text-sm font-bold outline-none focus:border-navy" />
              <button type="button" aria-label={`Tambah ${k}`} onClick={() => setKuota((q) => ({ ...q, [k]: q[k] + 1 }))} className="ui-press grid size-8 place-items-center rounded-lg bg-surface font-bold text-navy hover:bg-soft">+</button>
            </span>
          </label>
        ))}
      </div>
    </Modal>
  );
}

/* ---------- Rilis pengumuman ---------- */
function PengumumanModal({ open, lomba, onClose, onRilis }) {
  const [f, setF] = useState({ lomba: '', judul: '', isi: '', mode: 'terbit' });
  const [dicoba, setDicoba] = useState(false);
  const [proses, setProses] = useState(false);
  const err = { lomba: f.lomba ? '' : 'Pilih lomba.', judul: f.judul.trim().length >= 5 ? '' : 'Judul minimal 5 karakter.' };
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }));
  const kirim = async () => {
    setDicoba(true);
    if (Object.values(err).some(Boolean)) return;
    setProses(true);
    await new Promise((r) => setTimeout(r, 600));
    setProses(false);
    onRilis(f);
    setF({ lomba: '', judul: '', isi: '', mode: 'terbit' });
    setDicoba(false);
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      icon={IoMegaphoneOutline}
      title="Rilis Pengumuman Resmi"
      subtitle="Pengumuman tampil di portal siswa, guru, dan juri"
      size="lg"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Batal</Button>
          <Button icon={IoCloudUploadOutline} loading={proses} onClick={kirim}>{f.mode === 'terbit' ? 'Terbitkan Sekarang' : 'Simpan sebagai Draft SK'}</Button>
        </>
      }
    >
      <div className="space-y-4">
        <Field label="Lomba" required error={dicoba ? err.lomba : ''}>
          <SelectInput placeholder="Pilih lomba..." options={lomba.map((l) => l.title)} value={f.lomba} onChange={set('lomba')} error={dicoba ? err.lomba : ''} />
        </Field>
        <Field label="Judul Pengumuman" required error={dicoba ? err.judul : ''}>
          <TextInput placeholder="Contoh: Juara FLS2N Cipta Puisi Tingkat Kota Manado" value={f.judul} onChange={set('judul')} error={dicoba ? err.judul : ''} />
        </Field>
        <Field label="Isi Singkat" optional>
          <TextArea rows={3} placeholder="Ringkasan hasil atau informasi penting..." value={f.isi} onChange={set('isi')} />
        </Field>
        <div className="grid grid-cols-2 gap-2">
          {[['terbit', 'Terbitkan langsung'], ['draft', 'Draft (tunggu TTD Kadis)']].map(([v, l]) => (
            <button key={v} type="button" onClick={() => setF((x) => ({ ...x, mode: v }))} className={cx('ui-press rounded-xl border-2 px-3 py-3 text-left text-sm font-semibold', f.mode === v ? 'border-navy bg-soft/50 text-navy' : 'border-line-soft text-muted hover:border-line')}>
              {l}
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
}

// Dashboard utama Admin (versi mobile: AdminBeranda.vue)
export default function BerandaPage() {
  const ui = useUi();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [jenjang, setJenjang] = useState(jenjangFilters[0]);
  const [lomba, setLomba] = useState(lombaList);
  const [form, setForm] = useState(null); // null | { awal }
  const [kuotaUntuk, setKuotaUntuk] = useState(null);
  const [rilis, setRilis] = useState(false);
  const [daftarPengumuman, setDaftarPengumuman] = useState(pengumuman);

  const lombaTampil = lomba.filter(
    (l) => (jenjang === jenjangFilters[0] || l.level === jenjang) && matchQuery(l, query, ['title', 'meta'])
  );

  const simpanLomba = (f) => {
    const tone = jenjangOpsi.find((j) => j.value === f.level)?.tone ?? 'blue';
    const tgl = new Date(f.tenggat).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    const data = {
      level: f.level,
      levelTone: tone,
      title: f.title.trim(),
      meta: f.meta.trim() || 'Tingkat Kota Manado',
      tenggat: f.tenggat,
      kuotaMaks: Number(f.kuota),
      quota: { label: `Kuota Peserta • Tutup ${tgl}`, value: `0 / ${f.kuota} Peserta`, pct: 0, tone },
      foot: { icon: IoDocumentTextOutline, text: f.juknis?.name ?? 'Juknis belum diunggah', tone: f.juknis ? 'blue' : 'gray', btn: 'Detail Kuota' },
    };
    if (form?.awal) {
      setLomba((l) => l.map((x) => (x === form.awal ? { ...x, ...data, status: x.status, statusTone: x.statusTone, quota: x.quota ? { ...x.quota, value: x.quota.value.replace(/\/ \d+/, `/ ${f.kuota}`) } : x.quota } : x)));
      ui.toast({ title: 'Perubahan disimpan', description: data.title });
    } else {
      setLomba((l) => [{ ...data, status: 'Pendaftaran Buka', statusTone: 'green' }, ...l]);
      setJenjang(jenjangFilters[0]);
      setQuery('');
      ui.toast({ title: 'Lomba baru diterbitkan', description: `${data.title} kini tampil di portal sekolah.` });
    }
    setForm(null);
  };

  const hapusLomba = async (l) => {
    const ok = await ui.confirm({
      title: 'Hapus lomba ini?',
      message: l.title,
      detail: 'Data pendaftar dan kuota lomba ini akan ikut terhapus dari daftar.',
      confirmLabel: 'Hapus Lomba',
      tone: 'danger',
      icon: IoTrashOutline,
    });
    if (!ok) return;
    const posisi = lomba.indexOf(l);
    setLomba((d) => d.filter((x) => x !== l));
    ui.toast({
      title: 'Lomba dihapus',
      description: l.title,
      tone: 'info',
      durasi: 6000,
      action: { label: 'Urungkan', onClick: () => setLomba((d) => [...d.slice(0, posisi), l, ...d.slice(posisi)]) },
    });
  };

  const aksiFoot = (l) => {
    if (l.foot.btn === 'Lihat Portofolio') return navigate('/admin/talenta');
    setKuotaUntuk(l);
  };

  return (
    <div className="space-y-8">
      <LombaModal open={!!form} awal={form?.awal} onClose={() => setForm(null)} onSimpan={simpanLomba} />
      <KuotaModal
        lomba={kuotaUntuk}
        onClose={() => setKuotaUntuk(null)}
        onSimpan={(total) => { ui.toast({ title: 'Kuota kecamatan disimpan', description: `${total} kursi dibagi ke ${kecamatanManado.length} kecamatan.` }); setKuotaUntuk(null); }}
      />
      <PengumumanModal
        open={rilis}
        lomba={lomba}
        onClose={() => setRilis(false)}
        onRilis={(f) => {
          const terbit = f.mode === 'terbit';
          setDaftarPengumuman((d) => [
            terbit
              ? { title: f.judul, sub: `Diterbitkan • ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}`, badge: 'Diterbitkan', icon: IoMegaphoneOutline, tone: 'green', dashed: false }
              : { title: f.judul, sub: 'Menunggu TTD Kadis Pendidikan Kota Manado', badge: 'Draft SK', icon: IoCreateOutline, tone: 'amber', dashed: true },
            ...d,
          ]);
          setRilis(false);
          ui.toast({ title: terbit ? 'Pengumuman diterbitkan' : 'Draft SK disimpan', description: f.judul });
        }}
      />
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-dark via-navy to-primary p-6 text-white shadow-lg sm:p-8">
        <i className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-secondary/40 blur-3xl" />
        <div className="relative flex flex-wrap items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/25">
              <IoRibbon className="size-7 text-gold" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-extrabold">Admin Disdikbud Manado</h2>
                <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-semibold">Kota Manado</span>
              </div>
              <p className="mt-1 text-sm text-white/75">Dinas Pendidikan dan Kebudayaan Kota Manado</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/20 px-3 py-1.5 text-xs font-bold text-emerald-100 ring-1 ring-emerald-300/30">
            <i className="size-2 rounded-full bg-emerald-400" /> Aktif 2026
          </span>
        </div>
        <div className="relative mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-5">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-white/85">
            <IoShieldCheckmarkOutline className="size-5 text-gold" /> Hak Akses Verifikator Utama
          </span>
          <a href="#buat-lomba" className="inline-flex items-center gap-1.5 text-sm font-bold hover:underline">
            Pusat Kontrol <IoArrowForwardOutline className="size-4" />
          </a>
        </div>
      </section>

      {/* ---------- Pencarian & filter jenjang ---------- */}
      <section className="flex flex-col gap-4 xl:flex-row xl:items-center">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Cari lomba, juknis, atau nama dewan juri..."
          className="xl:w-[420px]"
        />
        <FilterChips items={jenjangFilters} active={jenjang} onChange={setJenjang} />
      </section>

      {/* ---------- Statistik ---------- */}
      <section className="space-y-4">
        <SectionHeader
          title="Statistik Kinerja Lomba"
          action={<span className="text-sm font-medium text-subtle">Tahun Ajaran 2025/2026</span>}
        />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {berandaStats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* ---------- 2 kolom: lomba | panel samping ---------- */}
      <div className="grid gap-8 xl:grid-cols-3">
        <div className="space-y-5 xl:col-span-2">
          <Card id="buat-lomba" className="flex flex-wrap items-center justify-between gap-4 border-navy/20 bg-soft/40">
            <div className="flex items-center gap-4">
              <IconBox icon={IoAddCircleOutline} tone="navy" size="lg" />
              <div>
                <h3 className="text-base font-bold text-ink">Buat Lomba Baru</h3>
                <p className="text-sm text-muted">Unggah juknis, atur kuota, dan tanggal seleksi</p>
              </div>
            </div>
            <Button icon={IoAddCircleOutline} onClick={() => setForm({ awal: null })}>Buat Lomba</Button>
          </Card>

          <SectionHeader
            title="Data Lomba Terkini"
            subtitle="Kelola status kuota kecamatan/sub-rayon, jadwal & juknis"
            action={
              <button type="button" onClick={() => { setJenjang(jenjangFilters[0]); setQuery(''); ui.toast({ title: 'Menampilkan semua lomba', description: `${lomba.length} lomba di semua jenjang.`, tone: 'info', durasi: 2500 }); }} className="text-sm font-bold text-navy hover:underline">
                Kelola Semua
              </button>
            }
          />

          {lombaTampil.length === 0 && (
            <EmptyState
              icon={IoSearchOutline}
              title="Lomba tidak ditemukan"
              description="Coba ubah kata kunci pencarian atau pilih jenjang lain."
            />
          )}

          {lombaTampil.map((l) => (
            <Card key={l.title} as="article" className="ui-enter space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  <Pill tone={l.levelTone}>{l.level}</Pill>
                  <Pill tone={l.statusTone}>{l.status}</Pill>
                </div>
                <div className="flex gap-1">
                  <button type="button" aria-label="Ubah" onClick={() => setForm({ awal: l })} className="ui-press grid size-9 place-items-center rounded-lg text-muted hover:bg-surface hover:text-navy">
                    <IoCreateOutline className="size-5" />
                  </button>
                  <button type="button" aria-label="Hapus" onClick={() => hapusLomba(l)} className="ui-press grid size-9 place-items-center rounded-lg text-muted hover:bg-red-50 hover:text-red-600">
                    <IoTrashOutline className="size-5" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-ink">{l.title}</h3>
                <p className="text-sm text-muted">{l.meta}</p>
              </div>

              {l.quota ? (
                <>
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
                      <span className="text-muted">{l.quota.label}</span>
                      <b className={cx('font-bold', toneText[l.quota.tone])}>{l.quota.value}</b>
                    </div>
                    <ProgressBar value={l.quota.pct} tone={l.quota.tone} />
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line-soft pt-4">
                    <span className={cx('inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold', toneSoft[l.foot.tone])}>
                      <l.foot.icon className="size-4" /> {l.foot.text}
                    </span>
                    <Button variant="ghost" size="sm" iconRight={IoChevronForwardOutline} onClick={() => aksiFoot(l)}>
                      {l.foot.btn}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line-soft pt-4 text-sm">
                  <span className="text-muted">
                    Siswa Lolos Verifikasi: <strong className="text-ink">{l.verified}</strong>
                  </span>
                  <Button variant="soft" size="sm" onClick={() => setKuotaUntuk(l)}>Kelola Kuota Kecamatan</Button>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* ---------- Panel samping ---------- */}
        <aside className="space-y-6">
          {/* Dewan juri */}
          <Card className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <IconBox icon={IoHammerOutline} tone="amber" size="sm" />
                <h2 className="text-base font-bold">Penetapan Dewan Juri</h2>
              </div>
              <span className="text-xs font-semibold whitespace-nowrap text-subtle">18 Terdaftar</span>
            </div>
            <div className="space-y-4 rounded-xl bg-surface p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-ink">
                    FLS2N Kategori Vokal Solo & Musik Tradisi - Tingkat Kota Manado
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    3 Dewan Juri Ditetapkan (Praktisi Musik & Penggiat Seni Kota Manado)
                  </p>
                </div>
                <Pill tone="green" icon={IoCheckmarkCircle}>Lengkap</Pill>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex -space-x-1">
                  {juriAvatars.map((a) => (
                    <Avatar key={a.initials} initials={a.initials} tone={a.tone} size="sm" className="ring-2 ring-surface" />
                  ))}
                </div>
                <Link to="/admin/juri" className="inline-flex items-center gap-1 text-xs font-bold text-navy hover:underline">
                  Tentukan Penugasan <IoArrowForwardOutline className="size-4" />
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="soft" size="sm" icon={IoPersonAddOutline} onClick={() => ui.lihat(dokumen('SK Penetapan Dewan Juri FLS2N Kota Manado 2026', { jenis: 'sk', nomor: '800/214/DISDIKBUD-MDO/2026', penerbit: 'Kepala Disdikbud Kota Manado', baris: [['Dewan Juri', 'Dr. Ronald Rumengan • Maria Kawilarang • Arnold Lumanauw'], ['Cabang', 'Vokal Solo & Musik Tradisi']] }))}>SK Dewan Juri</Button>
              <Button variant="outline" size="sm" icon={IoIdCardOutline} onClick={() => ui.lihat(dokumen('Pakta Integritas Dewan Juri 2026', { label: 'Pakta Integritas', bagian: [{ isi: 'Kami yang bertanda tangan di bawah ini selaku Dewan Juri menyatakan:' }, { isi: ['Menilai secara objektif, jujur, dan tidak memihak.', 'Tidak memiliki hubungan keluarga atau kepentingan dengan peserta yang dinilai.', 'Menjaga kerahasiaan nilai hingga pengumuman resmi.', 'Bersedia menerima sanksi bila melanggar pakta ini.'] }] }))}>Pakta Integritas</Button>
            </div>
          </Card>

          {/* Kriteria ringkas */}
          <Card className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <IconBox icon={IoClipboardOutline} tone="blue" size="sm" />
                <div>
                  <h2 className="text-base font-bold">Kriteria & Rubrik Skor</h2>
                  <p className="text-xs text-muted">Bobot penilaian standar Disdikbud Kota Manado</p>
                </div>
              </div>
              <Link to="/admin/kriteria" aria-label="Ubah rubrik" className="grid size-9 place-items-center rounded-lg text-muted hover:bg-surface hover:text-navy">
                <IoOptionsOutline className="size-5" />
              </Link>
            </div>
            <div className="space-y-4">
              {kriteriaRingkas.map((k) => (
                <div key={k.title} className="space-y-1.5">
                  <div className="flex items-baseline justify-between gap-3 text-sm">
                    <b className="font-semibold text-ink">{k.title}</b>
                    <b className={cx('font-bold', toneText[k.tone])}>{k.pct}%</b>
                  </div>
                  <ProgressBar value={k.pct} tone={k.tone} thin />
                  <span className="block text-xs text-subtle">{k.desc}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Pengumuman */}
          <Card className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-base font-bold">Status Pengumuman Hasil</h2>
              <span className="text-xs whitespace-nowrap text-subtle">Publikasi Portal</span>
            </div>
            <div className="space-y-3">
              {daftarPengumuman.map((p) => (
                <div
                  key={p.title}
                  className={cx(
                    'ui-enter flex items-start gap-3 rounded-xl p-3',
                    p.dashed ? 'border border-dashed border-amber-300 bg-amber-50/50' : 'bg-surface'
                  )}
                >
                  <IconBox icon={p.icon} tone={p.tone} size="sm" />
                  <div className="min-w-0 flex-1">
                    <b className="block text-sm font-semibold text-ink">{p.title}</b>
                    <span className="text-xs text-muted">{p.sub}</span>
                  </div>
                  <Pill tone={p.tone}>{p.badge}</Pill>
                </div>
              ))}
            </div>
            <Button className="w-full" icon={IoCloudUploadOutline} onClick={() => setRilis(true)}>Rilis Pengumuman Resmi Baru</Button>
          </Card>
        </aside>
      </div>
    </div>
  );
}
