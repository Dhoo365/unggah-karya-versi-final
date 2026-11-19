import {
  IoAddCircleOutline,
  IoCheckmarkCircleOutline,
  IoChevronDownOutline,
  IoClipboardOutline,
  IoCopyOutline,
  IoCreateOutline,
  IoEllipsisVertical,
  IoFlagOutline,
  IoHammerOutline,
  IoLockClosedOutline,
  IoOptionsOutline,
  IoPeopleOutline,
  IoTrophyOutline,
} from 'react-icons/io5';
import { useState } from 'react';
import { IoCheckmarkCircle, IoSaveOutline, IoTrashOutline, IoWarningOutline } from 'react-icons/io5';
import { Button, Card, IconBox, Pill, SectionHeader } from '../../components/ui/index.js';
import { Dropdown, Modal, useUi } from '../../components/feedback/index.js';
import { Field, TextArea, TextInput } from '../../components/form/index.js';
import { cx } from '../../lib/cx.js';
import { toneBar, toneSoft } from '../../lib/tones.js';
import { kriteriaList, lombaList } from '../../data/admin.js';

const tones = ['blue', 'sky', 'amber', 'green', 'orange', 'gray'];
const cabangList = [
  { title: 'FLS2N Seni Budaya & Tari Kreasi 2026 – Kota Manado', sub: 'Jenjang SMA / SMK Se-Kota Manado (Babak Final)' },
  ...lombaList.slice(1).map((l) => ({ title: l.title, sub: `${l.level} • ${l.meta}` })),
];

/* ---------- Formulir kriteria (tambah / ubah / ubah bobot) ---------- */
function KriteriaModal({ open, awal, sisa, fokusBobot, onClose, onSimpan }) {
  const kosong = { title: '', short: '', indicator: '', weight: 10, min: 70 };
  const [f, setF] = useState(kosong);
  const [kunci, setKunci] = useState(null);
  const [dicoba, setDicoba] = useState(false);
  if (open && kunci !== (awal?.no ?? 'baru')) {
    setKunci(awal?.no ?? 'baru');
    setDicoba(false);
    setF(awal ? { title: awal.title, short: awal.short, indicator: awal.indicator, weight: awal.weight, min: awal.min } : { ...kosong, weight: Math.max(5, sisa) });
  }
  if (!open && kunci) setKunci(null);
  const totalBaru = sisa + (awal?.weight ?? 0) - 0; // bobot yang tersedia untuk kriteria ini
  const err = {
    title: f.title.trim().length >= 5 ? '' : 'Nama kriteria minimal 5 karakter.',
    indicator: f.indicator.trim().length >= 10 ? '' : 'Tuliskan indikator kurasi (minimal 10 karakter).',
    weight: f.weight >= 5 && f.weight <= 100 ? '' : 'Bobot 5 – 100%.',
    min: f.min >= 10 && f.min <= 100 ? '' : 'Passing grade 10 – 100 poin.',
  };
  const e = (k) => (dicoba ? err[k] : '');
  const set = (k, angka) => (ev) => setF((x) => ({ ...x, [k]: angka ? Number(ev.target.value) : ev.target.value }));
  const lebih = f.weight > totalBaru;
  return (
    <Modal
      open={open}
      onClose={onClose}
      icon={awal ? IoCreateOutline : IoAddCircleOutline}
      title={fokusBobot ? 'Ubah Bobot Kriteria' : awal ? 'Ubah Kriteria' : 'Tambah Kriteria Baru'}
      subtitle={awal?.title ?? 'Parameter baru untuk rubrik cabang ini'}
      size={fokusBobot ? 'sm' : 'lg'}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Batal</Button>
          <Button icon={IoSaveOutline} onClick={() => { setDicoba(true); if (!Object.values(err).some(Boolean)) onSimpan(f); }}>Simpan</Button>
        </>
      }
    >
      <div className="space-y-5">
        {!fokusBobot && (
          <>
            <Field label="Nama Kriteria" required error={e('title')}>
              <TextInput value={f.title} onChange={set('title')} placeholder="Contoh: Penguasaan Panggung" error={e('title')} />
            </Field>
            <Field label="Label Singkat" optional hint="Ditampilkan di grafik bobot.">
              <TextInput value={f.short} onChange={set('short')} placeholder="Penguasaan Panggung" />
            </Field>
            <Field label="Indikator Kurasi" required error={e('indicator')}>
              <TextArea rows={3} value={f.indicator} onChange={set('indicator')} error={!!e('indicator')} />
            </Field>
          </>
        )}
        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-semibold text-ink">Bobot</span>
            <b className="text-2xl font-extrabold text-navy tabular-nums">{f.weight}%</b>
          </div>
          <input type="range" min="5" max="100" step="5" value={f.weight} onChange={set('weight', true)} className="w-full accent-navy" aria-label="Bobot kriteria" />
          <small className={cx('flex items-center gap-1.5 text-xs', lebih ? 'font-semibold text-amber-700' : 'text-subtle')}>
            {lebih ? <IoWarningOutline className="size-4" /> : <IoCheckmarkCircle className="size-4 text-emerald-600" />}
            {lebih ? `Total bobot akan melebihi 100% (${100 - totalBaru + f.weight}%). Kurangi bobot kriteria lain.` : `Sisa bobot yang tersedia: ${totalBaru}%`}
          </small>
        </div>
        <Field label="Batas Lulus (Passing Grade)" required error={e('min')}>
          <TextInput type="number" min="10" max="100" value={f.min} onChange={set('min', true)} error={e('min')} trailing={<span className="text-xs font-semibold text-subtle">poin</span>} />
        </Field>
      </div>
    </Modal>
  );
}

/* ---------- Salin rubrik ---------- */
function SalinModal({ open, asal, onClose, onSalin }) {
  const tujuan = cabangList.filter((c) => c.title !== asal);
  const [pilih, setPilih] = useState([]);
  const [proses, setProses] = useState(false);
  return (
    <Modal
      open={open}
      onClose={onClose}
      icon={IoCopyOutline}
      title="Salin Rubrik ke Cabang Lain"
      subtitle={`Sumber: ${asal}`}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Batal</Button>
          <Button icon={IoCopyOutline} disabled={!pilih.length} loading={proses} onClick={async () => { setProses(true); await new Promise((r) => setTimeout(r, 600)); setProses(false); onSalin(pilih); setPilih([]); }}>
            Salin ke {pilih.length || ''} Cabang
          </Button>
        </>
      }
    >
      <div className="space-y-2">
        {tujuan.map((c) => {
          const on = pilih.includes(c.title);
          return (
            <button key={c.title} type="button" onClick={() => setPilih((p) => (on ? p.filter((x) => x !== c.title) : [...p, c.title]))}
              className={cx('ui-press flex w-full items-center gap-3 rounded-xl border-2 p-3 text-left', on ? 'border-navy bg-soft/40' : 'border-line-soft hover:border-line')}>
              <span className={cx('grid size-5 shrink-0 place-items-center rounded-md border-2', on ? 'border-navy bg-navy text-white' : 'border-line')}>{on && <IoCheckmarkCircle className="size-4" />}</span>
              <span className="min-w-0">
                <b className="block text-sm font-semibold text-ink">{c.title}</b>
                <small className="text-xs text-muted">{c.sub}</small>
              </span>
            </button>
          );
        })}
      </div>
    </Modal>
  );
}

// Kriteria & rubrik penilaian (versi mobile: AdminKriteria.vue)
export default function KriteriaPage() {
  const ui = useUi();
  const [kriteria, setKriteria] = useState(kriteriaList);
  const [cabang, setCabang] = useState(cabangList[0]);
  const [form, setForm] = useState(null); // { awal, fokusBobot }
  const [salin, setSalin] = useState(false);
  const total = kriteria.reduce((sum, k) => sum + k.weight, 0);
  const sisa = 100 - total;

  const simpan = (f) => {
    const data = { ...f, title: f.title.trim(), short: f.short.trim() || f.title.trim().split(' ').slice(0, 2).join(' '), indicator: f.indicator.trim() };
    if (form.awal) {
      setKriteria((l) => l.map((k) => (k === form.awal ? { ...k, ...data } : k)));
      ui.toast({ title: form.fokusBobot ? 'Bobot diperbarui' : 'Kriteria diperbarui', description: `${data.title} • ${data.weight}%` });
    } else {
      setKriteria((l) => [...l, { ...data, no: String(l.length + 1).padStart(2, '0'), tone: tones[l.length % tones.length] }]);
      ui.toast({ title: 'Kriteria ditambahkan', description: data.title });
    }
    const totalBaru = total - (form.awal?.weight ?? 0) + data.weight;
    if (totalBaru !== 100) ui.toast({ title: `Total bobot ${totalBaru}%`, description: 'Sesuaikan agar tepat 100% sebelum penilaian dimulai.', tone: 'warning' });
    setForm(null);
  };

  const hapus = async (k) => {
    const ok = await ui.confirm({ title: 'Hapus kriteria?', message: k.title, detail: `Bobot ${k.weight}% akan dilepas dan perlu dibagi ke kriteria lain.`, confirmLabel: 'Hapus', tone: 'danger', icon: IoTrashOutline });
    if (!ok) return;
    const lama = kriteria;
    setKriteria((l) => l.filter((x) => x !== k).map((x, i) => ({ ...x, no: String(i + 1).padStart(2, '0') })));
    ui.toast({ title: 'Kriteria dihapus', description: k.title, tone: 'info', durasi: 6000, action: { label: 'Urungkan', onClick: () => setKriteria(lama) } });
  };

  const seimbang = total === 100;

  return (
    <div className="space-y-8">
      <KriteriaModal open={!!form} awal={form?.awal} fokusBobot={form?.fokusBobot} sisa={sisa} onClose={() => setForm(null)} onSimpan={simpan} />
      <SalinModal
        open={salin}
        asal={cabang.title}
        onClose={() => setSalin(false)}
        onSalin={(t) => { setSalin(false); ui.toast({ title: 'Rubrik berhasil disalin', description: `${kriteria.length} kriteria disalin ke ${t.length} cabang lomba.` }); }}
      />
      {/* ---------- Regulasi ---------- */}
      <section className="flex flex-col gap-4 rounded-3xl bg-gradient-to-br from-navy-dark via-navy to-primary p-6 text-white shadow-lg sm:flex-row sm:p-8">
        <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/25">
          <IoClipboardOutline className="size-7 text-gold" />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-gold px-2.5 py-0.5 text-xs font-bold text-gold-ink">Regulasi 2026</span>
            <small className="text-xs text-white/70">SK Disdik Sulut No. 44/Dikda-03</small>
          </div>
          <h2 className="mt-2 text-2xl font-extrabold">Format Standar Penilaian Resmi TA 2025/2026</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/80">
            Metode kurasi menggunakan skala baku <b className="text-white">10 - 100 poin</b> rujukan Puspresnas
            Kemendikbudristek untuk sinkronisasi otomatis ke Pangkalan Talenta Daerah.
          </p>
        </div>
      </section>

      {/* ---------- Kategori & akumulasi bobot ---------- */}
      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm font-semibold text-muted">Kategori & Cabang Terpilih</span>
            <Pill tone="green" icon={IoLockClosedOutline}>Rubrik Terkunci & Aktif</Pill>
          </div>
          <Dropdown
            align="left"
            panelClassName="w-full p-1.5"
            trigger={({ open, toggle }) => (
              <button
                type="button"
                onClick={toggle}
                aria-expanded={open}
                className={cx('ui-press flex w-full items-center gap-4 rounded-xl border p-4 text-left hover:border-navy', open ? 'border-navy' : 'border-line-soft')}
              >
                <IconBox icon={IoTrophyOutline} tone="amber" />
                <span className="min-w-0 flex-1">
                  <b className="block text-sm font-bold text-ink">{cabang.title}</b>
                  <small className="text-xs text-muted">{cabang.sub}</small>
                </span>
                <IoChevronDownOutline className={cx('size-5 shrink-0 text-subtle transition-transform', open && 'rotate-180')} />
              </button>
            )}
          >
            {(tutup) =>
              cabangList.map((c) => (
                <button key={c.title} type="button" onClick={() => { setCabang(c); tutup(); ui.toast({ title: 'Rubrik dimuat', description: c.title, tone: 'info', durasi: 2500 }); }}
                  className={cx('flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-surface', c.title === cabang.title && 'bg-soft/40')}>
                  <span className="min-w-0 flex-1">
                    <b className="block text-sm font-semibold text-ink">{c.title}</b>
                    <small className="text-xs text-muted">{c.sub}</small>
                  </span>
                  {c.title === cabang.title && <IoCheckmarkCircle className="size-5 shrink-0 text-navy" />}
                </button>
              ))
            }
          </Dropdown>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            <span className="inline-flex items-center gap-2"><IoHammerOutline className="size-4 text-navy" /> 3 Juri Terverifikasi</span>
            <span className="inline-flex items-center gap-2"><IoPeopleOutline className="size-4 text-navy" /> 28 Peserta Finalis</span>
          </div>
        </Card>

        <Card className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-base font-bold">Akumulasi Bobot Kriteria</h2>
            <Pill tone={seimbang ? 'green' : 'red'} icon={seimbang ? IoCheckmarkCircleOutline : IoWarningOutline}>
              {total}% Terdistribusi {seimbang ? '(Seimbang)' : '(Belum 100%)'}
            </Pill>
          </div>
          <div className="flex h-4 gap-1 overflow-hidden rounded-full">
            {kriteria.map((k) => (
              <div key={k.no} className={cx('h-full transition-[width] duration-500 first:rounded-l-full last:rounded-r-full', toneBar[k.tone])} style={{ width: `${k.weight}%` }} />
            ))}
          </div>
          <ul className="divide-y divide-line-soft">
            {kriteria.map((k) => (
              <li key={k.no} className="flex items-center gap-3 py-2 text-sm">
                <i className={cx('size-3 shrink-0 rounded-full', toneBar[k.tone])} />
                <span className="flex-1 text-muted">{k.short}</span>
                <b className="font-bold text-ink">{k.weight}%</b>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {/* ---------- Rincian komponen ---------- */}
      <section className="space-y-4">
        <SectionHeader
          title="Rincian Komponen Penilaian"
          icon={IoOptionsOutline}
          action={<small className="text-sm font-medium text-subtle">{kriteria.length} Parameter Wajib</small>}
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {kriteria.map((k) => (
            <Card key={k.no} as="article" className="ui-enter flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className={cx('grid size-11 shrink-0 place-items-center rounded-xl text-sm font-extrabold', toneSoft[k.tone])}>
                  {k.no}
                </div>
                <div className="min-w-0 flex-1">
                  <Pill tone={k.tone}>Sub-Bobot: {k.weight}%</Pill>
                  <h3 className="mt-2 text-base font-bold text-ink">{k.title}</h3>
                </div>
                <Dropdown
                  items={[
                    { label: 'Ubah Kriteria', icon: IoCreateOutline, onClick: () => setForm({ awal: k }) },
                    { label: 'Duplikat', icon: IoCopyOutline, onClick: () => { setKriteria((l) => [...l, { ...k, title: `${k.title} (Salinan)`, weight: 5, no: String(l.length + 1).padStart(2, '0'), tone: tones[l.length % tones.length] }]); ui.toast({ title: 'Kriteria diduplikat', description: 'Atur bobot salinan agar total 100%.', tone: 'info' }); } },
                    { divider: true },
                    { label: 'Hapus Kriteria', icon: IoTrashOutline, tone: 'danger', onClick: () => hapus(k) },
                  ]}
                  trigger={({ toggle, open }) => (
                    <button type="button" aria-label="Opsi" aria-expanded={open} onClick={toggle} className="ui-press grid size-8 place-items-center rounded-lg text-muted hover:bg-surface">
                      <IoEllipsisVertical className="size-5" />
                    </button>
                  )}
                />
              </div>

              <p className="text-sm leading-relaxed text-muted">
                <b className="font-semibold text-ink">Indikator Kurasi:</b> {k.indicator}
              </p>

              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line-soft pt-4">
                <div className="text-xs">
                  <span className="flex items-center gap-1 text-subtle">
                    <IoFlagOutline className="size-3.5" /> Batas Lulus (Passing Grade)
                  </span>
                  <b className="text-sm font-bold text-ink">Min. {k.min} Poin</b>
                </div>
                <Button variant="soft" size="sm" icon={IoCreateOutline} onClick={() => setForm({ awal: k, fokusBobot: true })}>Ubah Bobot</Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ---------- Aksi bawah ---------- */}
      <section className="flex flex-col justify-end gap-3 sm:flex-row">
        <Button variant="outline" icon={IoAddCircleOutline} onClick={() => setForm({ awal: null })}>Tambah Kriteria Baru</Button>
        <Button icon={IoCopyOutline} onClick={() => setSalin(true)}>Salin Rubrik ke Cabang Lomba Lain</Button>
      </section>
    </div>
  );
}
