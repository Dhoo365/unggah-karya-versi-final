import { useRef, useState } from 'react';
import {
  IoBusinessOutline,
  IoCheckmarkCircle,
  IoDocumentTextOutline,
  IoFilmOutline,
  IoIdCardOutline,
  IoImageOutline,
  IoLinkOutline,
  IoPersonOutline,
  IoSaveOutline,
  IoSchoolOutline,
  IoSendOutline,
  IoTimeOutline,
} from 'react-icons/io5';
import { Button, Card, Pill, SectionHeader } from '../../components/ui/index.js';
import { Field, TextArea, TextInput } from '../../components/form/index.js';
import { cx } from '../../lib/cx.js';
import { berkasSyarat, formUnggahAwal, lombaUnggah, thumbnailKarya } from '../../data/siswa.js';
import { Modal, useUi } from '../../components/feedback/index.js';
import { formatSize } from '../../components/form/FilePicker.jsx';
import { IoCheckmarkDoneCircle, IoTrophyOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const langkah = ['Identifikasi Awal', 'Unggah & Tautan', 'Finalisasi'];
const MAKS_KATA = 200;
const hitungKata = (t) => (t.trim() ? t.trim().split(/\s+/).length : 0);

// Unggah berkas & karya (versi mobile: SiswaUnggah.vue)
export default function UnggahPage() {
  const [form, setForm] = useState(formUnggahAwal);
  const [tersimpan, setTersimpan] = useState(false);
  const [berkas, setBerkas] = useState(berkasSyarat);
  const [poster, setPoster] = useState(null); // URL gambar pratinjau
  const [aktif, setAktif] = useState(1); // langkah ke-2 sedang berjalan
  const [mengirim, setMengirim] = useState(false);
  const [menyimpan, setMenyimpan] = useState(false);
  const [noReg, setNoReg] = useState(null);
  const inputBerkas = useRef(null);
  const inputPoster = useRef(null);
  const [gantiIdx, setGantiIdx] = useState(null);
  const ui = useUi();
  const navigate = useNavigate();
  const tanggal = () => new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

  const pilihBerkas = (e) => {
    const f = e.target.files?.[0];
    e.target.value = '';
    if (!f) return;
    if (f.type !== 'application/pdf') return ui.toast({ title: 'Format tidak sesuai', description: 'Berkas persyaratan harus PDF.', tone: 'error' });
    if (f.size > 5 * 1024 * 1024) return ui.toast({ title: 'Berkas terlalu besar', description: `${formatSize(f.size)} — maksimal 5 MB.`, tone: 'error' });
    setBerkas((b) => b.map((x, i) => (i === gantiIdx ? { ...x, info: `Terunggah (PDF ${formatSize(f.size)}) • ${tanggal()} • ${f.name}`, status: 'BARU', tone: 'sky' } : x)));
    ui.toast({ title: 'Berkas diganti', description: f.name });
  };
  const pilihPoster = (e) => {
    const f = e.target.files?.[0];
    e.target.value = '';
    if (!f) return;
    if (!/^image\/(png|jpe?g|webp)$/.test(f.type)) return ui.toast({ title: 'Format tidak sesuai', description: 'Poster harus JPG, PNG, atau WEBP.', tone: 'error' });
    if (f.size > 5 * 1024 * 1024) return ui.toast({ title: 'Poster terlalu besar', description: 'Maksimal 5 MB.', tone: 'error' });
    if (poster) URL.revokeObjectURL(poster);
    setPoster(URL.createObjectURL(f));
    ui.toast({ title: 'Poster diperbarui', description: f.name });
  };
  const simpanDraf = async () => {
    setMenyimpan(true);
    await new Promise((r) => setTimeout(r, 500)); // TODO: simpan draf ke API
    setMenyimpan(false);
    setTersimpan(true);
    ui.toast({ title: 'Draf tersimpan', description: 'Anda bisa melanjutkan pengisian kapan saja.', tone: 'info' });
  };
  const kirimKarya = async () => {
    if (!/^https?:\/\/\S+\.\S+/.test(form.tautanVideo)) return ui.toast({ title: 'Tautan video belum valid', description: 'Gunakan tautan YouTube atau Google Drive yang diawali https://', tone: 'warning' });
    if (!form.sinopsis.trim()) return ui.toast({ title: 'Sinopsis masih kosong', tone: 'warning' });
    const ok = await ui.confirm({
      title: 'Kirim karya ke penjurian?',
      message: lombaUnggah.judul,
      detail: 'Setelah dikirim, data identitas dan berkas tidak bisa diubah. Pastikan tautan video dapat diakses juri.',
      confirmLabel: 'Kirim Karya',
      icon: IoSendOutline,
      delay: 0,
    });
    if (!ok) return;
    setMengirim(true);
    await new Promise((r) => setTimeout(r, 1100)); // TODO: kirim ke API
    setMengirim(false);
    setAktif(2);
    setNoReg(`SKR-FLS2N-${String(Math.floor(Math.random() * 9000) + 1000)}`);
  };
  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setTersimpan(false);
  };
  const kata = hitungKata(form.sinopsis);

  return (
    <div className="space-y-8">
      <input ref={inputBerkas} type="file" accept="application/pdf" hidden onChange={pilihBerkas} />
      <input ref={inputPoster} type="file" accept="image/png,image/jpeg,image/webp" hidden onChange={pilihPoster} />
      <Modal
        open={!!noReg}
        onClose={() => setNoReg(null)}
        size="sm"
        footer={
          <>
            <Button variant="ghost" onClick={() => setNoReg(null)}>Tutup</Button>
            <Button icon={IoTrophyOutline} onClick={() => { setNoReg(null); navigate('/siswa/hasil'); }}>Pantau Hasil Lomba</Button>
          </>
        }
      >
        <div className="flex flex-col items-center gap-3 pt-6 text-center">
          <span className="ui-check grid size-20 place-items-center rounded-full bg-emerald-100 text-emerald-600">
            <IoCheckmarkDoneCircle className="size-12" />
          </span>
          <h2 className="text-xl font-extrabold text-ink">Karya Berhasil Dikirim!</h2>
          <p className="text-sm text-muted">Karya <b className="text-ink">{form.namaTim}</b> kini masuk antrean penjurian dewan juri provinsi.</p>
          <code className="rounded-lg bg-soft px-3 py-1.5 text-sm font-bold text-navy">No. Registrasi: {noReg}</code>
        </div>
      </Modal>
      {/* ---------- Langkah ---------- */}
      <Card className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold tracking-widest text-secondary">TAHAPAN PENGIRIMAN</span>
          <Pill tone="blue">Langkah {aktif + 1} dari {langkah.length}</Pill>
        </div>
        <ol className="grid grid-cols-3 gap-2">
          {langkah.map((l, i) => (
            <li key={l} className="space-y-2">
              <i className={cx('block h-1.5 rounded-full', i <= aktif ? 'bg-navy' : 'bg-slate-200')} />
              <span className={cx('flex items-center gap-1.5 text-xs font-semibold sm:text-sm', i <= aktif ? 'text-navy' : 'text-subtle')}>
                {i < aktif && <IoCheckmarkCircle className="size-4 text-emerald-600" />}
                {i + 1}. {l}
              </span>
            </li>
          ))}
        </ol>
      </Card>

      {/* ---------- Info lomba ---------- */}
      <section className="rounded-2xl bg-gradient-to-br from-navy-dark to-navy p-6 text-white">
        <span className="text-xs font-bold tracking-widest text-gold">{lombaUnggah.kategori}</span>
        <h2 className="mt-2 text-2xl font-extrabold">{lombaUnggah.judul}</h2>
        <p className="mt-2 inline-flex items-center gap-2 text-sm text-ice">
          <IoTimeOutline className="size-4" /> Batas akhir penerimaan berkas: {lombaUnggah.batas}
        </p>
      </section>

      <div className="grid gap-8 [&>*]:min-w-0 xl:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          {/* ---------- Identitas ---------- */}
          <Card className="space-y-5">
            <SectionHeader title="Data Identitas Peserta" subtitle="Informasi tim perwakilan dan guru pendamping resmi" />
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Nama Tim / Delegasi">
                <TextInput icon={IoBusinessOutline} value={form.namaTim} onChange={set('namaTim')} />
              </Field>
              <Field label="Asal Satuan Pendidikan" hint="Terdaftar resmi di Cabang Dinas Pendidikan Sulawesi Utara">
                <TextInput icon={IoSchoolOutline} value={form.asalSekolah} onChange={set('asalSekolah')} />
              </Field>
              <Field label="Nama Guru Pembimbing">
                <TextInput icon={IoPersonOutline} value={form.namaGuru} onChange={set('namaGuru')} />
              </Field>
              <Field label="NIP / NUPTK Pembimbing">
                <TextInput icon={IoIdCardOutline} value={form.nipGuru} onChange={set('nipGuru')} />
              </Field>
            </div>
          </Card>

          {/* ---------- Karya digital ---------- */}
          <Card className="space-y-5">
            <SectionHeader title="Karya Digital & Sinopsis" subtitle="Tautan video dokumenter dan lembar ringkasan karya" />
            <Field label="Tautan Video Karya (YouTube / Google Drive)" hint='Setel akses video ke "Tidak Publik (Unlisted)" atau "Siapa saja yang memiliki tautan".'>
              <TextInput icon={IoLinkOutline} type="url" value={form.tautanVideo} onChange={set('tautanVideo')} />
            </Field>
            <Field
              label="Sinopsis Singkat Karya"
              extra={<span className={kata > MAKS_KATA ? 'font-bold text-red-600' : ''}>{kata} / {MAKS_KATA} kata</span>}
              error={kata > MAKS_KATA ? `Sinopsis melebihi ${MAKS_KATA} kata.` : ''}
            >
              <TextArea rows={5} placeholder="Tuliskan sinopsis karya..." value={form.sinopsis} onChange={set('sinopsis')} error={kata > MAKS_KATA} />
            </Field>
          </Card>
        </div>

        <aside className="space-y-6">
          {/* ---------- Berkas persyaratan ---------- */}
          <Card className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold">Berkas Persyaratan</h2>
                <small className="text-xs text-subtle">PDF resmi, maks. 5 MB per berkas</small>
              </div>
              <Pill tone="gray">{berkas.length} Berkas</Pill>
            </div>
            {berkas.map((b, i) => (
              <div key={b.nama} className="rounded-xl border border-line-soft p-3">
                <div className="flex items-start gap-3">
                  <IoDocumentTextOutline className="mt-0.5 size-5 shrink-0 text-navy" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <b className="text-sm font-semibold text-ink">{b.nama}</b>
                      <Pill tone={b.tone}>{b.status}</Pill>
                    </div>
                    <small className="mt-1 block text-xs text-subtle">{b.info}</small>
                  </div>
                </div>
                <button type="button" disabled={aktif === 2} onClick={() => { setGantiIdx(i); inputBerkas.current?.click(); }} className="mt-2 text-xs font-bold text-navy hover:underline disabled:cursor-not-allowed disabled:opacity-40">Ganti File</button>
              </div>
            ))}
            <p className="flex items-start gap-2 rounded-xl bg-emerald-50 p-3 text-xs text-emerald-800">
              <IoCheckmarkCircle className="size-4 shrink-0" /> Seluruh berkas administrasi telah memenuhi format sah Dikda Sulut.
            </p>
          </Card>

          {/* ---------- Thumbnail ---------- */}
          <Card className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold">Pratinjau Thumbnail</h2>
              <small className="text-[11px] font-semibold text-subtle">{thumbnailKarya.resolusi}</small>
            </div>
            <div className="relative grid aspect-video place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-primary via-navy to-navy-dark text-center text-white">
              {poster ? (
                <img src={poster} alt="Pratinjau poster karya" className="ui-enter absolute inset-0 size-full object-cover" />
              ) : (
                <>
                  <IoFilmOutline className="absolute top-3 left-3 size-5 text-gold" />
                  <b className="px-6 text-lg leading-snug font-extrabold">{thumbnailKarya.judul}</b>
                </>
              )}
            </div>
            <small className="block text-xs text-subtle">Format 16:9 sesuai pedoman teknis</small>
            <Button variant="outline" size="sm" icon={IoImageOutline} className="w-full" disabled={aktif === 2} onClick={() => inputPoster.current?.click()}>Unggah Ulang Poster</Button>
          </Card>

          <div className="space-y-3">
            <Button size="lg" icon={aktif === 2 ? IoCheckmarkCircle : IoSendOutline} className="w-full" disabled={kata > MAKS_KATA || aktif === 2} loading={mengirim} onClick={kirimKarya}>
              {aktif === 2 ? 'Karya Telah Dikirim' : mengirim ? 'Mengirim Karya...' : 'Kirim Karya ke Penjurian'}
            </Button>
            <Button variant="soft" icon={IoSaveOutline} className="w-full" loading={menyimpan} disabled={aktif === 2} onClick={simpanDraf}>
              {tersimpan ? 'Draf Tersimpan ✓' : 'Simpan Draf Formulir'}
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
