import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IoCheckmarkCircle,
  IoColorPaletteOutline,
  IoLinkOutline,
  IoPersonCircleOutline,
  IoPersonOutline,
  IoSaveOutline,
  IoSendOutline,
  IoShieldCheckmarkOutline,
  IoTimeOutline,
  IoTrophyOutline,
} from 'react-icons/io5';
import { Avatar, Button, Card, Pill, SectionHeader } from '../../components/ui/index.js';
import { Checkbox, Field, FilePicker, SelectInput, TextArea, TextInput, scrollToFirstError } from '../../components/form/index.js';
import { cx } from '../../lib/cx.js';
import { cabangUnggah, guruProfil, siswaBinaan } from '../../data/guru.js';

const MAKS_KATA = 300;
const hitungKata = (t) => t.trim().split(/\s+/).filter(Boolean).length;
const langkah = ['Identitas', 'Berkas & Media', 'Validasi'];
const dokumenAdmin = [
  { key: 'orisinalitas', judul: 'Surat Orisinalitas', sub: 'Bermaterai 10.000 (PDF, maks. 5 MB)', icon: IoShieldCheckmarkOutline },
  { key: 'rekomendasi', judul: 'Surat Rekomendasi', sub: 'Kepala Sekolah (PDF, maks. 5 MB)', icon: IoPersonCircleOutline },
];

// Unggah karya siswa oleh guru (versi mobile: GuruUnggahKarya.vue)
export default function UnggahKaryaPage() {
  const navigate = useNavigate();
  const siswaAktif = siswaBinaan.filter((s) => s.status === 'aktif');
  const [nisn, setNisn] = useState(siswaAktif.at(-1).nisn);
  const siswa = siswaAktif.find((s) => s.nisn === nisn);
  const [form, setForm] = useState({ judul: '', deskripsi: '', tautan: '', orisinal: false, sinkron: false });
  const [berkas, setBerkas] = useState({ utama: null, orisinalitas: null, rekomendasi: null });
  const [pesan, setPesan] = useState({});
  const [dicoba, setDicoba] = useState(false);
  const [mengirim, setMengirim] = useState(false);
  const [draf, setDraf] = useState(false);

  const kata = hitungKata(form.deskripsi);
  const errors = {
    judul: form.judul.trim().length >= 5 ? '' : 'Judul karya wajib diisi (minimal 5 karakter).',
    deskripsi: kata === 0 ? 'Deskripsi dan sinopsis karya wajib diisi.' : kata > MAKS_KATA ? `Deskripsi melebihi ${MAKS_KATA} kata.` : '',
    utama: pesan.utama || (berkas.utama ? '' : 'Berkas utama karya wajib diunggah.'),
    orisinalitas: pesan.orisinalitas || (berkas.orisinalitas ? '' : 'Surat Orisinalitas wajib diunggah.'),
    rekomendasi: pesan.rekomendasi || (berkas.rekomendasi ? '' : 'Surat Rekomendasi wajib diunggah.'),
    tautan: form.tautan && !/^https?:\/\/\S+\.\S+/.test(form.tautan) ? 'Tautan harus diawali http:// atau https://.' : '',
    orisinal: form.orisinal ? '' : 'Pernyataan orisinalitas harus disetujui.',
    sinkron: form.sinkron ? '' : 'Pernyataan verifikasi data harus disetujui.',
  };
  // Pesan berkas & kelebihan kata tampil langsung; sisanya setelah tombol kirim ditekan
  const err = (k) => (dicoba ? errors[k] : pesan[k] || (k === 'deskripsi' && kata > MAKS_KATA ? errors[k] : '') || (k === 'tautan' ? errors[k] : ''));
  const set = (k) => (e) => { setForm((f) => ({ ...f, [k]: e?.target ? e.target.value : e })); setDraf(false); };
  const pilih = (k) => (f, m) => { setBerkas((b) => ({ ...b, [k]: f })); setPesan((p) => ({ ...p, [k]: m })); setDraf(false); };

  // Langkah aktif mengikuti kelengkapan form
  const aktif = !errors.judul && !errors.deskripsi ? (!errors.utama && !errors.orisinalitas && !errors.rekomendasi ? 2 : 1) : 0;

  const kirim = async (e) => {
    e.preventDefault();
    if (mengirim) return;
    setDicoba(true);
    if (Object.values(errors).some(Boolean)) return scrollToFirstError();
    setMengirim(true);
    // TODO: kirim form + berkas ke API, lalu arahkan ke daftar karya
    await new Promise((r) => setTimeout(r, 700));
    navigate('/guru/karya');
  };

  return (
    <form onSubmit={kirim} noValidate className="space-y-6">
      {/* ---------- Langkah ---------- */}
      <Card>
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

      <div className="grid gap-6 [&>*]:min-w-0 xl:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          {/* ---------- 1. Siswa & cabang ---------- */}
          <Card className="space-y-5">
            <SectionHeader title="1. Siswa Binaan & Cabang Lomba" action={<Pill tone="green" icon={IoCheckmarkCircle}>Terverifikasi</Pill>} />
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Siswa Peserta" required hint={siswa && `NISN: ${siswa.nisn} • Kelas ${siswa.kelas}`}>
                <SelectInput icon={IoPersonOutline} value={nisn} onChange={(e) => setNisn(e.target.value)}
                  options={siswaAktif.map((s) => ({ value: s.nisn, label: `${s.name} (${s.kelas})` }))} />
              </Field>
              <Field label="Cabang Lomba">
                <div className="flex h-12 items-center gap-3 rounded-xl border border-line-soft bg-surface px-4">
                  <IoTrophyOutline className="size-5 shrink-0 text-amber-600" />
                  <span className="min-w-0 flex-1 truncate text-sm font-semibold text-ink">{cabangUnggah.nama}</span>
                </div>
              </Field>
            </div>
            <p className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-xl bg-soft/40 px-4 py-3 text-xs text-muted">
              <span className="inline-flex items-center gap-1 font-semibold text-navy"><IoTimeOutline className="size-4" /> Buka s.d {cabangUnggah.batas}</span>
              Batas Ukuran: Maks 25 MB • Format: PDF / High-Res PNG
            </p>
          </Card>

          {/* ---------- 2. Detail karya ---------- */}
          <Card className="space-y-5">
            <SectionHeader title="2. Informasi Detail Karya" />
            <Field label="Judul Karya Siswa" required error={err('judul')} hint="Gunakan judul representatif sesuai tema kearifan lokal Sulawesi Utara.">
              <TextInput placeholder="Contoh: Eksplorasi Pesona Bawah Laut Bunaken" value={form.judul} onChange={set('judul')} error={err('judul')} trailing={<IoColorPaletteOutline className="size-5 text-subtle" />} />
            </Field>
            <Field label="Deskripsi & Sinopsis Filosofi Karya" required error={err('deskripsi')}
              extra={<span className={kata > MAKS_KATA ? 'font-bold text-red-600' : ''}>{kata} / {MAKS_KATA} kata</span>}>
              <TextArea rows={6} placeholder="Jelaskan makna, inspirasi, dan filosofi karya..." value={form.deskripsi} onChange={set('deskripsi')} error={!!err('deskripsi')} />
            </Field>
          </Card>

          {/* ---------- 3. Berkas ---------- */}
          <Card className="space-y-5">
            <SectionHeader title="3. Berkas & Dokumen Juknis" action={<Pill tone="amber">{cabangUnggah.tag}</Pill>} />
            <Field label="Berkas Utama Karya (Poster/Desain)" required extra="PDF/PNG maks 25 MB" error={err('utama')}>
              <FilePicker file={berkas.utama} onPick={pilih('utama')} accept={['application/pdf', 'image/png']} maxMB={25} error={err('utama')}
                title="Pilih Berkas Utama Karya" hint="PDF atau High-Res PNG, maksimal 25 MB" readyLabel="Sesuai Format" />
            </Field>
            <div className="grid gap-5 md:grid-cols-2">
              {dokumenAdmin.map((d) => (
                <Field key={d.key} label={d.judul} required error={err(d.key)}>
                  <FilePicker file={berkas[d.key]} onPick={pilih(d.key)} accept={['application/pdf']} maxMB={5} error={err(d.key)}
                    title={'Pilih ' + d.judul} hint={d.sub} readyLabel="Terunggah" />
                </Field>
              ))}
            </div>
            <Field label="Tautan Pendukung / Video Proses Karya" optional error={err('tautan')} hint="Tautan video timelapse pembuatan atau demonstrasi presentasi karya.">
              <TextInput icon={IoLinkOutline} type="url" placeholder="https://youtu.be/proses-karya-bunaken" value={form.tautan} onChange={set('tautan')} error={err('tautan')} />
            </Field>
          </Card>
        </div>

        {/* ---------- 4. Validasi guru ---------- */}
        <aside className="space-y-4 xl:sticky xl:top-24 xl:h-fit">
          <Card className="space-y-4">
            <SectionHeader title="4. Validasi Guru Pembimbing" />
            <Field error={err('orisinal')}>
              <Checkbox checked={form.orisinal} onChange={set('orisinal')} error={err('orisinal')}>
                Saya telah meninjau orisinalitas karya dan memastikan karya ini murni hasil ciptaan siswa, tidak melanggar hak cipta, serta memenuhi petunjuk teknis FLS2N Dikda Sulut 2025.
              </Checkbox>
            </Field>
            <Field error={err('sinkron')}>
              <Checkbox checked={form.sinkron} onChange={set('sinkron')} error={err('sinkron')}>
                Data identitas siswa (Nama, NISN, Jenjang) dan kelengkapan berkas telah diverifikasi sinkron dengan database resmi Dapodik Dinas Pendidikan Daerah.
              </Checkbox>
            </Field>
            <div className="flex items-center gap-3 rounded-xl bg-surface p-3">
              <Avatar initials={guruProfil.initials} tone="navy" />
              <div className="min-w-0 flex-1">
                <b className="block truncate text-sm font-semibold text-ink">{guruProfil.name}</b>
                <small className="block truncate text-xs text-muted">NUPTK: {guruProfil.nuptk}</small>
              </div>
              <Pill tone="green">Otorisasi Aktif</Pill>
            </div>
          </Card>
          <Button type="submit" size="lg" icon={IoSendOutline} className="w-full" disabled={mengirim}>{mengirim ? 'Mengirim...' : 'Verifikasi & Kirim Karya'}</Button>
          <Button type="button" variant="soft" icon={IoSaveOutline} className="w-full" onClick={() => setDraf(true)}>{draf ? 'Draf Tersimpan ✓' : 'Simpan Draf'}</Button>
          <p className="text-center text-xs text-subtle">Enkripsi data dinas terverifikasi BSrE • SIKARYA Dikda Sulut</p>
        </aside>
      </div>
    </form>
  );
}
