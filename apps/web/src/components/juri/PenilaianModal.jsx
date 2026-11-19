import { useState } from 'react';
import { IoCheckmarkCircle, IoLockClosedOutline, IoSaveOutline, IoSendOutline } from 'react-icons/io5';
import { Modal, useUi } from '../feedback/index.js';
import { Button } from '../ui/index.js';
import { cx } from '../../lib/cx.js';

// Rubrik per jenis lomba (bobot dalam persen, total 100)
export const rubrik = {
  tari: [
    { name: 'Wiraga', desc: 'Teknik gerak, sikap tubuh, kelincahan', weight: 30 },
    { name: 'Wirama', desc: 'Ketepatan irama & tempo musik', weight: 30 },
    { name: 'Wirasa', desc: 'Penghayatan & ekspresi', weight: 20 },
    { name: 'Kreativitas', desc: 'Kebaruan koreografi & kearifan lokal', weight: 20 },
  ],
  kriya: [
    { name: 'Orisinalitas', desc: 'Keaslian ide & motif lokal', weight: 35 },
    { name: 'Teknik', desc: 'Kerapian & penguasaan bahan', weight: 35 },
    { name: 'Estetika', desc: 'Keindahan bentuk & warna', weight: 15 },
    { name: 'Fungsi', desc: 'Nilai guna & daya jual', weight: 15 },
  ],
};
export const jenisRubrik = (lomba = '') => (/kriya|vokasi/i.test(lomba) ? 'kriya' : 'tari');
export const hitungSkor = (kriteria, nilai) =>
  kriteria.reduce((s, k) => s + ((nilai[k.name] ?? 0) * k.weight) / 100, 0);
export const grade = (skor) => (skor >= 85 ? 'A (Sangat Baik)' : skor >= 75 ? 'B (Baik)' : skor >= 65 ? 'C (Cukup)' : 'D (Perlu Bimbingan)');

/*
  Lembar penilaian juri.
  - karya: { no, title, name, school, lomba, nilai?: { Wiraga: 80, ... }, catatan? }
  - onSimpan(karya, { nilai, catatan, skor, final })
*/
export default function PenilaianModal({ karya, onClose, onSimpan }) {
  const ui = useUi();
  const kriteria = rubrik[jenisRubrik(karya?.lomba)];
  const [nilai, setNilai] = useState({});
  const [catatan, setCatatan] = useState('');
  const [kunci, setKunci] = useState(null);
  const [proses, setProses] = useState(null);
  if (karya && kunci !== karya.no) {
    setKunci(karya.no);
    setNilai(karya.nilai ?? {});
    setCatatan(karya.catatan ?? '');
  }
  if (!karya && kunci) setKunci(null);

  const terisi = kriteria.filter((k) => nilai[k.name] != null).length;
  const skor = hitungSkor(kriteria, nilai);
  const lengkap = terisi === kriteria.length;

  const simpan = async (final) => {
    if (final) {
      if (!lengkap) return ui.toast({ title: 'Nilai belum lengkap', description: `Isi ${kriteria.length - terisi} kriteria lagi sebelum mengirim nilai final.`, tone: 'warning' });
      const ok = await ui.confirm({
        title: 'Kirim nilai final?',
        message: `Skor akhir ${skor.toFixed(2)} • Grade ${grade(skor)}`,
        detail: 'Setelah dikirim, nilai dikunci dengan TTE dan tidak dapat diubah kecuali melalui sidang pleno.',
        confirmLabel: 'Kirim & Kunci Nilai',
        icon: IoLockClosedOutline,
      });
      if (!ok) return;
    }
    setProses(final ? 'final' : 'draf');
    await new Promise((r) => setTimeout(r, 600)); // TODO: simpan ke API
    setProses(null);
    onSimpan(karya, { nilai, catatan, skor, final });
  };

  return (
    <Modal
      open={!!karya}
      onClose={onClose}
      title={karya?.title}
      subtitle={karya && `Antrean #${karya.no} • ${karya.name} • ${karya.school}`}
      size="xl"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>Tutup</Button>
          <Button variant="soft" icon={IoSaveOutline} loading={proses === 'draf'} disabled={!!proses} onClick={() => simpan(false)}>Simpan Draf</Button>
          <Button icon={IoSendOutline} loading={proses === 'final'} disabled={!!proses} onClick={() => simpan(true)}>Kirim Nilai Final</Button>
        </>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
        <div className="space-y-4">
          {kriteria.map((k, i) => {
            const v = nilai[k.name];
            return (
              <div key={k.name} className={cx('rounded-2xl border p-4 transition-colors', v != null ? 'border-navy/30 bg-soft/20' : 'border-line-soft')}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <b className="flex items-center gap-2 text-sm font-bold text-ink">
                      <span className="grid size-6 place-items-center rounded-md bg-navy text-[11px] text-white">K{i + 1}</span>
                      {k.name}
                      <small className="font-semibold text-subtle">• Bobot {k.weight}%</small>
                    </b>
                    <small className="mt-1 block text-xs text-muted">{k.desc}</small>
                  </div>
                  <input
                    type="number"
                    min="10"
                    max="100"
                    value={v ?? ''}
                    placeholder="—"
                    onChange={(e) => {
                      const n = e.target.value === '' ? undefined : Math.min(100, Math.max(0, Number(e.target.value)));
                      setNilai((x) => ({ ...x, [k.name]: n }));
                    }}
                    aria-label={`Nilai ${k.name}`}
                    className="h-11 w-20 shrink-0 rounded-xl border border-line text-center text-lg font-extrabold text-navy outline-none focus:border-navy focus:ring-4 focus:ring-soft"
                  />
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={v ?? 10}
                  onChange={(e) => setNilai((x) => ({ ...x, [k.name]: Number(e.target.value) }))}
                  aria-label={`Geser nilai ${k.name}`}
                  className={cx('mt-3 w-full accent-navy', v == null && 'opacity-50')}
                />
                <div className="mt-1 flex justify-between text-[10px] font-semibold text-subtle">
                  <span>10</span><span>Cukup 65</span><span>Baik 75</span><span>Sangat Baik 85</span><span>100</span>
                </div>
              </div>
            );
          })}
          <label className="block">
            <span className="text-sm font-semibold text-ink">Catatan Juri <small className="font-normal text-subtle">(opsional, dibaca peserta)</small></span>
            <textarea rows={3} value={catatan} onChange={(e) => setCatatan(e.target.value)} maxLength={300} placeholder="Apresiasi dan saran perbaikan untuk peserta..." className="mt-1.5 w-full resize-none rounded-xl border border-line px-4 py-3 text-sm outline-none focus:border-navy focus:ring-4 focus:ring-soft" />
          </label>
        </div>

        {/* Ringkasan skor */}
        <aside className="h-fit space-y-4 rounded-2xl bg-gradient-to-br from-navy-dark to-navy p-5 text-white lg:sticky lg:top-0">
          <small className="text-xs font-bold tracking-widest text-ice">SKOR AKHIR (TERBOBOT)</small>
          <b className="block text-5xl font-extrabold tabular-nums">{skor.toFixed(2)}</b>
          <span className="inline-block rounded-full bg-gold px-3 py-1 text-xs font-bold text-gold-ink">Grade {lengkap ? grade(skor) : '—'}</span>
          <ul className="space-y-1.5 border-t border-white/15 pt-3 text-sm">
            {kriteria.map((k) => (
              <li key={k.name} className="flex justify-between gap-2">
                <span className="flex items-center gap-1.5 text-ice">
                  {nilai[k.name] != null && <IoCheckmarkCircle className="ui-check size-4 text-emerald-300" />}
                  {k.name}
                </span>
                <b className="tabular-nums">{nilai[k.name] != null ? ((nilai[k.name] * k.weight) / 100).toFixed(2) : '—'}</b>
              </li>
            ))}
          </ul>
          <div>
            <div className="mb-1 flex justify-between text-xs text-ice"><span>Kriteria terisi</span><b>{terisi}/{kriteria.length}</b></div>
            <i className="block h-2 overflow-hidden rounded-full bg-white/15">
              <i className="block h-full rounded-full bg-gold transition-[width] duration-300" style={{ width: `${(terisi / kriteria.length) * 100}%` }} />
            </i>
          </div>
        </aside>
      </div>
    </Modal>
  );
}
