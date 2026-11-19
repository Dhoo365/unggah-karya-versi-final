import { useState } from 'react';
import {
  IoBanOutline,
  IoBriefcaseOutline,
  IoCheckmarkCircleOutline,
  IoClipboardOutline,
  IoCreateOutline,
  IoEllipsisVertical,
  IoEyeOutline,
  IoFingerPrintOutline,
  IoIdCardOutline,
  IoLogoWhatsapp,
  IoPersonAddOutline,
  IoPersonOutline,
  IoRemoveCircleOutline,
  IoSaveOutline,
  IoSearchOutline,
  IoTimeOutline,
} from 'react-icons/io5';
import {
  Avatar,
  Button,
  Card,
  EmptyState,
  FilterChips,
  Pill,
  ProgressBar,
  SearchBar,
  StatCard,
} from '../../components/ui/index.js';
import { Dropdown, Modal, useUi } from '../../components/feedback/index.js';
import { Field, SelectInput, TextInput } from '../../components/form/index.js';
import { matchQuery } from '../../lib/cx.js';
import { dokumen } from '../../data/dokumen.js';
import { juriFilters, juriList, juriStats } from '../../data/admin.js';

// Kata kunci untuk tiap filter bidang
const bidangFilter = { 1: /seni|tari|musik|vokal/i, 2: /kriya|desain|vokasi/i, 3: /kir|ilmiah/i };
const bidangOpsi = ['Seni Tari & Budaya', 'Musik & Vokal Tradisi', 'Kriya & Desain', 'Karya Ilmiah Remaja (KIR)', 'Olahraga'];
const inisial = (n) => n.replace(/^(dr|dra|drs|prof|ir)\.?\s+/i, '').split(/\s+/).slice(0, 2).map((w) => w[0]).join('').toUpperCase();

/* ---------- Formulir tambah / ubah juri ---------- */
function JuriModal({ open, awal, onClose, onSimpan }) {
  const kosong = { name: '', nip: '', instansi: '', role: '', bidang: bidangOpsi[0], wa: '' };
  const [f, setF] = useState(kosong);
  const [kunci, setKunci] = useState(null);
  const [dicoba, setDicoba] = useState(false);
  const [simpan, setSimpan] = useState(false);
  if (open && kunci !== (awal?.name ?? 'baru')) {
    setKunci(awal?.name ?? 'baru');
    setDicoba(false);
    setF(awal
      ? { ...kosong, name: awal.name, role: awal.role, nip: awal.meta.match(/NIP: (\d+)/)?.[1] ?? '', instansi: awal.meta.split('•').at(-1).replace('Instansi:', '').trim(), bidang: awal.chips[1]?.label ?? bidangOpsi[0] }
      : kosong);
  }
  if (!open && kunci) setKunci(null);

  const err = {
    name: f.name.trim().length >= 3 ? '' : 'Nama lengkap wajib diisi.',
    role: f.role.trim().length >= 3 ? '' : 'Peran/jabatan juri wajib diisi.',
    nip: !f.nip || /^\d{18}$/.test(f.nip) ? '' : 'NIP harus 18 digit angka (kosongkan bila non-ASN).',
    wa: awal || /^8\d{8,11}$/.test(f.wa) ? '' : 'Nomor WhatsApp tanpa 0 di depan, contoh 81234567890.',
  };
  const e = (k) => (dicoba ? err[k] : '');
  const set = (k) => (ev) => setF((x) => ({ ...x, [k]: k === 'nip' || k === 'wa' ? ev.target.value.replace(/\D/g, '') : ev.target.value }));
  const kirim = async () => {
    setDicoba(true);
    if (Object.values(err).some(Boolean)) return;
    setSimpan(true);
    await new Promise((r) => setTimeout(r, 550)); // TODO: simpan ke API
    setSimpan(false);
    onSimpan(f);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      icon={awal ? IoCreateOutline : IoPersonAddOutline}
      title={awal ? 'Ubah Data Juri' : 'Tambah Juri Baru'}
      subtitle={awal ? awal.name : 'Tautan pakta integritas dikirim otomatis via WhatsApp'}
      size="lg"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Batal</Button>
          <Button icon={IoSaveOutline} loading={simpan} onClick={kirim}>{awal ? 'Simpan Perubahan' : 'Tambah & Kirim Undangan'}</Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nama Lengkap & Gelar" required error={e('name')}>
          <TextInput icon={IoPersonOutline} placeholder="Dr. Maria Sondakh, M.Sn" value={f.name} onChange={set('name')} error={e('name')} />
        </Field>
        <Field label="NIP" optional error={e('nip')}>
          <TextInput icon={IoIdCardOutline} inputMode="numeric" maxLength={18} placeholder="18 digit" value={f.nip} onChange={set('nip')} error={e('nip')} />
        </Field>
        <Field label="Peran / Jabatan Juri" required error={e('role')}>
          <TextInput icon={IoBriefcaseOutline} placeholder="Juri FLS2N Seni Tari" value={f.role} onChange={set('role')} error={e('role')} />
        </Field>
        <Field label="Instansi" optional>
          <TextInput placeholder="UNIMA / Unsrat / Praktisi" value={f.instansi} onChange={set('instansi')} />
        </Field>
        <Field label="Bidang Penilaian" required>
          <SelectInput options={[...new Set([...bidangOpsi, f.bidang])]} value={f.bidang} onChange={set('bidang')} />
        </Field>
        {!awal && (
          <Field label="Nomor WhatsApp" required error={e('wa')}>
            <TextInput icon={IoLogoWhatsapp} inputMode="numeric" placeholder="81234567890" value={f.wa} onChange={set('wa')} error={e('wa')} />
          </Field>
        )}
      </div>
    </Modal>
  );
}

/* ---------- Detail & tugas ---------- */
function DetailModal({ juri, onClose, onUbah }) {
  const tugas = [
    { cabang: juri?.chips[1]?.label ?? 'Cabang lomba', selesai: 18, total: 24 },
    { cabang: 'Seleksi Portofolio Tahap I', selesai: 12, total: 12 },
  ];
  return (
    <Modal
      open={!!juri}
      onClose={onClose}
      title={juri?.name}
      subtitle={juri?.role}
      size="lg"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Tutup</Button>
          <Button variant="soft" icon={IoCreateOutline} onClick={onUbah}>Ubah Data</Button>
        </>
      }
    >
      {juri && (
        <div className="space-y-5">
          <div className="flex items-center gap-4 rounded-2xl bg-surface p-4">
            <Avatar initials={juri.initial} tone={juri.avatarTone} size="lg" />
            <div className="min-w-0 text-sm">
              <p className="text-muted">{juri.meta}</p>
              <p className="mt-1 font-semibold text-ink">{juri.sk}</p>
              <div className="mt-2 flex flex-wrap gap-2">{juri.chips.map((c) => <Pill key={c.label} tone={c.tone} icon={c.icon}>{c.label}</Pill>)}</div>
            </div>
          </div>
          <div className="space-y-3">
            <b className="text-sm font-bold text-ink">Tugas Penilaian</b>
            {tugas.map((t) => (
              <div key={t.cabang} className="space-y-1.5 rounded-xl border border-line-soft p-3">
                <div className="flex justify-between gap-3 text-sm">
                  <span className="font-medium text-ink">{t.cabang}</span>
                  <b className="text-navy">{t.selesai}/{t.total} karya</b>
                </div>
                <ProgressBar value={(t.selesai / t.total) * 100} tone={t.selesai === t.total ? 'green' : 'blue'} />
              </div>
            ))}
          </div>
        </div>
      )}
    </Modal>
  );
}

// Kelola dewan juri (versi mobile: AdminJuri.vue)
export default function JuriPage() {
  const ui = useUi();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState(juriFilters[0]);
  const [daftarJuri, setDaftarJuri] = useState(juriList);
  const [form, setForm] = useState(null); // { awal }
  const [detail, setDetail] = useState(null);
  const [mengirim, setMengirim] = useState(null);

  const idxFilter = juriFilters.indexOf(filter);
  const daftar = daftarJuri.filter(
    (j) => matchQuery(j, query, ['name', 'role', 'meta']) && (!bidangFilter[idxFilter] || bidangFilter[idxFilter].test(j.role + ' ' + j.chips.map((c) => c.label).join(' ')))
  );

  const simpan = (f) => {
    const meta = [f.nip && `NIP: ${f.nip}`, f.instansi && `Instansi: ${f.instansi}`].filter(Boolean).join(' • ') || 'Juri Disdikbud Kota Manado';
    if (form.awal) {
      setDaftarJuri((d) => d.map((j) => (j === form.awal ? { ...j, name: f.name.trim(), role: f.role.trim(), meta, initial: inisial(f.name), chips: [j.chips[0], { ...j.chips[1], label: f.bidang }] } : j)));
      ui.toast({ title: 'Data juri diperbarui', description: f.name });
    } else {
      setDaftarJuri((d) => [
        {
          initial: inisial(f.name),
          avatarTone: 'sky',
          name: f.name.trim(),
          role: f.role.trim(),
          meta,
          chips: [
            { label: 'Menunggu Konfirmasi Pakta', tone: 'amber', icon: IoRemoveCircleOutline },
            { label: f.bidang, tone: 'gray', icon: IoBriefcaseOutline },
          ],
          warning: 'Tautan Pakta Terkirim via WA',
          sk: 'Menunggu TTE Digital',
          baru: true,
        },
        ...d,
      ]);
      setFilter(juriFilters[0]);
      ui.toast({ title: 'Juri baru ditambahkan', description: `Undangan & pakta integritas dikirim ke +62 ${f.wa}.` });
    }
    setForm(null);
  };

  const kirimUlang = async (j) => {
    setMengirim(j.name);
    await new Promise((r) => setTimeout(r, 800)); // TODO: panggil API kirim ulang WA
    setMengirim(null);
    setDaftarJuri((d) => d.map((x) => (x === j ? { ...x, warning: 'Dikirim ulang • baru saja' } : x)));
    ui.toast({ title: 'Tautan pakta dikirim ulang', description: `${j.name} akan menerima pesan WhatsApp.` });
  };

  const nonaktifkan = async (j) => {
    const ok = await ui.confirm({
      title: 'Nonaktifkan juri?',
      message: j.name,
      detail: 'Juri tidak bisa lagi menilai karya. Nilai yang sudah masuk tetap tersimpan.',
      confirmLabel: 'Nonaktifkan',
      tone: 'danger',
      icon: IoBanOutline,
    });
    if (!ok) return;
    const pos = daftarJuri.indexOf(j);
    setDaftarJuri((d) => d.filter((x) => x !== j));
    ui.toast({ title: 'Juri dinonaktifkan', description: j.name, tone: 'info', durasi: 6000, action: { label: 'Urungkan', onClick: () => setDaftarJuri((d) => [...d.slice(0, pos), j, ...d.slice(pos)]) } });
  };

  const lihatSk = () =>
    ui.lihat(
      dokumen('SK Kepala Dinas tentang Penugasan Dewan Juri Lomba 2026', {
        jenis: 'sk',
        nomor: '800/Dikbud-Mdo/55/2026',
        penerbit: 'Kepala Disdikbud Kota Manado',
        baris: daftarJuri.map((j) => [j.name, j.role]),
      })
    );

  return (
    <div className="space-y-8">
      <JuriModal open={!!form} awal={form?.awal} onClose={() => setForm(null)} onSimpan={simpan} />
      <DetailModal juri={detail} onClose={() => setDetail(null)} onUbah={() => { const j = detail; setDetail(null); setForm({ awal: j }); }} />

      {/* ---------- Statistik ---------- */}
      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {juriStats.map((s) => (
          <StatCard key={s.label} {...s} value={s.label === 'Juri Terdaftar' ? daftarJuri.length : s.value} />
        ))}
      </section>

      {/* ---------- Toolbar ---------- */}
      <section className="space-y-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Cari nama juri, NIP, atau keahlian..."
            className="lg:flex-1"
          />
          <div className="flex flex-wrap gap-2">
            <Button variant="soft" icon={IoClipboardOutline} onClick={lihatSk}>Kelola SK Kadis Penugasan</Button>
            <Button icon={IoPersonAddOutline} onClick={() => setForm({ awal: null })}>Tambah Juri Baru</Button>
          </div>
        </div>
        <FilterChips items={juriFilters} active={filter} onChange={setFilter} />
      </section>

      {/* ---------- Daftar juri ---------- */}
      {daftar.length === 0 ? (
        <EmptyState icon={IoSearchOutline} title="Juri tidak ditemukan" description="Coba kata kunci lain, misalnya nama, NIP, atau bidang keahlian." />
      ) : (
        <section className="grid gap-5 md:grid-cols-2">
          {daftar.map((j) => (
            <Card key={j.name} as="article" className="ui-enter flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <Avatar initials={j.initial} tone={j.avatarTone} size="lg" />
                <div className="min-w-0 flex-1">
                  <h2 className="text-base font-bold text-ink">{j.name}</h2>
                  <b className="block text-sm font-semibold text-navy">{j.role}</b>
                  <p className="mt-1 text-xs text-subtle">{j.meta}</p>
                </div>
                <Dropdown
                  items={[
                    { label: 'Lihat Detail', icon: IoEyeOutline, onClick: () => setDetail(j) },
                    { label: 'Ubah Data', icon: IoCreateOutline, onClick: () => setForm({ awal: j }) },
                    { label: 'Kirim Ulang Pakta', icon: IoLogoWhatsapp, onClick: () => kirimUlang(j) },
                    { divider: true },
                    { label: 'Nonaktifkan Juri', icon: IoBanOutline, tone: 'danger', onClick: () => nonaktifkan(j) },
                  ]}
                  trigger={({ toggle, open }) => (
                    <button type="button" aria-label="Opsi" aria-expanded={open} onClick={toggle} className="ui-press grid size-9 place-items-center rounded-lg text-muted hover:bg-surface">
                      <IoEllipsisVertical className="size-5" />
                    </button>
                  )}
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {j.chips.map((c) => (
                  <Pill key={c.label} tone={c.tone} icon={c.icon}>{c.label}</Pill>
                ))}
              </div>

              {j.warning ? (
                <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-sm">
                  <span className="inline-flex items-center gap-2 font-medium text-amber-800">
                    <IoTimeOutline className="size-4" /> {j.warning}
                  </span>
                  <Button variant="ghost" size="sm" loading={mengirim === j.name} onClick={() => kirimUlang(j)}>
                    {mengirim === j.name ? 'Mengirim...' : 'Kirim Ulang'}
                  </Button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-x-5 gap-y-2 rounded-xl bg-surface px-3 py-2.5 text-sm">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700">
                    <IoCheckmarkCircleOutline className="size-4" /> Pakta Integritas Valid
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-muted">
                    <IoFingerPrintOutline className="size-4" /> TTE Digital BSrE
                  </span>
                </div>
              )}

              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line-soft pt-4">
                <span className="text-xs font-medium text-subtle">{j.sk}</span>
                <div className="flex gap-2">
                  <Button variant="soft" size="sm" onClick={() => setDetail(j)}>Detail & Tugas</Button>
                  <button
                    type="button"
                    aria-label="Ubah"
                    onClick={() => setForm({ awal: j })}
                    className="ui-press grid size-8 place-items-center rounded-xl border border-line text-navy hover:bg-surface"
                  >
                    <IoCreateOutline className="size-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </section>
      )}
    </div>
  );
}
