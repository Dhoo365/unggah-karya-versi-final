import { useState } from 'react';
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

const langkah = ['Identifikasi Awal', 'Unggah & Tautan', 'Finalisasi'];
const AKTIF = 1; // langkah ke-2 sedang berjalan
const MAKS_KATA = 200;
const hitungKata = (t) => (t.trim() ? t.trim().split(/\s+/).length : 0);

// Unggah berkas & karya (versi mobile: SiswaUnggah.vue)
export default function UnggahPage() {
  const [form, setForm] = useState(formUnggahAwal);
  const [tersimpan, setTersimpan] = useState(false);
  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setTersimpan(false);
  };
  const kata = hitungKata(form.sinopsis);

  return (
    <div className="space-y-8">
      {/* ---------- Langkah ---------- */}
      <Card className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold tracking-widest text-secondary">TAHAPAN PENGIRIMAN</span>
          <Pill tone="blue">Langkah {AKTIF + 1} dari {langkah.length}</Pill>
        </div>
        <ol className="grid grid-cols-3 gap-2">
          {langkah.map((l, i) => (
            <li key={l} className="space-y-2">
              <i className={cx('block h-1.5 rounded-full', i <= AKTIF ? 'bg-navy' : 'bg-slate-200')} />
              <span className={cx('flex items-center gap-1.5 text-xs font-semibold sm:text-sm', i <= AKTIF ? 'text-navy' : 'text-subtle')}>
                {i < AKTIF && <IoCheckmarkCircle className="size-4 text-emerald-600" />}
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
              <Pill tone="gray">{berkasSyarat.length} Berkas</Pill>
            </div>
            {berkasSyarat.map((b) => (
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
                <button type="button" className="mt-2 text-xs font-bold text-navy hover:underline">Ganti File</button>
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
              <IoFilmOutline className="absolute top-3 left-3 size-5 text-gold" />
              <b className="px-6 text-lg leading-snug font-extrabold">{thumbnailKarya.judul}</b>
            </div>
            <small className="block text-xs text-subtle">Format 16:9 sesuai pedoman teknis</small>
            <Button variant="outline" size="sm" icon={IoImageOutline} className="w-full">Unggah Ulang Poster</Button>
          </Card>

          <div className="space-y-3">
            <Button size="lg" icon={IoSendOutline} className="w-full" disabled={kata > MAKS_KATA}>Kirim Karya ke Penjurian</Button>
            <Button variant="soft" icon={IoSaveOutline} className="w-full" onClick={() => setTersimpan(true)}>
              {tersimpan ? 'Draf Tersimpan ✓' : 'Simpan Draf Formulir'}
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
