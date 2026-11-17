import { useState } from 'react';
import {
  IoAlertCircleOutline,
  IoBusinessOutline,
  IoCalendarOutline,
  IoCheckmarkCircle,
  IoCloudUploadOutline,
  IoDocumentTextOutline,
  IoEyeOutline,
  IoHourglassOutline,
  IoSchoolOutline,
  IoShieldCheckmarkOutline,
  IoTrophyOutline,
} from 'react-icons/io5';
import { Button, Card, Pill, SectionHeader } from '../../components/ui/index.js';
import { Checkbox, Field, FilePicker, SelectInput, TextInput, scrollToFirstError } from '../../components/form/index.js';
import { cx } from '../../lib/cx.js';

const tingkatList = [
  { value: 'Tingkat Kota Manado', icon: IoShieldCheckmarkOutline },
  { value: 'Antar Kecamatan', icon: IoBusinessOutline },
  { value: 'Antar Sekolah Manado', icon: IoSchoolOutline },
  { value: 'Pekan Prestasi Manado', icon: IoTrophyOutline },
];
const tahunList = ['2025', '2024', '2023', '2022'];
const FORMAT = ['application/pdf', 'image/jpeg', 'image/png'];

// status: approved | review | revision
const pengajuanAwal = [
  { id: '1', status: 'approved', tanggal: '14 Jan 2025', judul: 'Juara 1 Lomba Cipta Puisi FLS2N Tingkat Kota Manado 2024', tingkat: 'Tingkat Kota Manado', penyelenggara: 'Disdikbud Kota Manado', nomorBsre: 'MND-CERT-88102' },
  { id: '2', status: 'review', tanggal: 'Kemarin', judul: 'Juara 2 Olimpiade Sains Siswa Kota Manado 2024', tingkat: 'Tingkat Kota Manado', penyelenggara: 'MKKS Kota Manado', estimasi: 'Estimasi: 2–3 hari kerja verifikasi', namaFile: 'OSN_Manado_2024.pdf' },
  { id: '3', status: 'revision', tanggal: '10 Jan 2025', judul: 'Juara 3 Robotik Kreatif Pelajar Manado 2023', tingkat: 'Tingkat Kota Manado', penyelenggara: 'Balai Pemuda Kota Manado', catatan: 'Lampirkan SK Penetapan Pemenang dari Disdikbud Kota Manado atau legalisir Kepala Sekolah untuk pengesahan poin.' },
];
const statusInfo = {
  approved: { label: 'Disetujui Kota Manado', tone: 'green', icon: IoCheckmarkCircle },
  review: { label: 'Sedang Ditinjau Admin Kota', tone: 'amber', icon: IoHourglassOutline },
  revision: { label: 'Perlu Perbaikan Berkas', tone: 'red', icon: IoAlertCircleOutline },
};

// Validasi sertifikat prestasi (versi mobile: SiswaValidasiSertifikat.vue)
export default function SertifikatPage() {
  const [form, setForm] = useState({ nama: '', tingkat: tingkatList[0].value, tahun: '2024', penyelenggara: '', setuju: false });
  const [berkas, setBerkas] = useState(null);
  const [pesanBerkas, setPesanBerkas] = useState('');
  const [dicoba, setDicoba] = useState(false);
  const [daftar, setDaftar] = useState(pengajuanAwal);
  const [terkirim, setTerkirim] = useState(false);

  const errors = {
    nama: form.nama.trim().length >= 5 ? '' : 'Nama prestasi wajib diisi (minimal 5 karakter).',
    penyelenggara: form.penyelenggara.trim().length >= 3 ? '' : 'Nama penyelenggara wajib diisi.',
    berkas: pesanBerkas || (berkas ? '' : 'Berkas sertifikat wajib diunggah.'),
    setuju: form.setuju ? '' : 'Pernyataan keaslian dokumen wajib dicentang.',
  };
  const err = (k) => (dicoba ? errors[k] : k === 'berkas' ? pesanBerkas : '');
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e?.target ? e.target.value : e }));

  const kirim = (e) => {
    e.preventDefault();
    setDicoba(true);
    if (Object.values(errors).some(Boolean)) return scrollToFirstError();
    // TODO: kirim ke API. Untuk sekarang langsung ditambahkan ke riwayat.
    setDaftar((d) => [
      { id: String(Date.now()), status: 'review', tanggal: 'Baru saja', judul: form.nama, tingkat: form.tingkat, penyelenggara: form.penyelenggara, estimasi: 'Estimasi: 1–3 hari kerja verifikasi', namaFile: berkas.name },
      ...d,
    ]);
    setForm({ nama: '', tingkat: tingkatList[0].value, tahun: '2024', penyelenggara: '', setuju: false });
    setBerkas(null);
    setDicoba(false);
    setTerkirim(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-start gap-3 rounded-2xl border border-navy/15 bg-soft/40 p-5">
        <IoShieldCheckmarkOutline className="mt-0.5 size-6 shrink-0 text-navy" />
        <div>
          <b className="font-bold text-navy">Integrasi Resmi Dapodik</b>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            Sertifikat prestasi lomba tingkat Kota Manado dapat diunggah untuk diverifikasi Admin Dikbud Kota Manado agar masuk ke portofolio resmi Dapodik.
          </p>
        </div>
      </div>

      <div className="grid gap-8 [&>*]:min-w-0 xl:grid-cols-[1.1fr_1fr]">
        {/* ---------- Formulir ---------- */}
        <form onSubmit={kirim} noValidate>
          <Card className="space-y-5">
            <SectionHeader title="Formulir Data Prestasi Siswa" subtitle="Lengkapi detail perolehan lomba sesuai sertifikat fisik atau digital." />
            {terkirim && (
              <p className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-sm font-medium text-emerald-800">
                <IoCheckmarkCircle className="size-5" /> Sertifikat terkirim dan masuk antrean peninjauan.
              </p>
            )}
            <Field label="Nama Prestasi / Judul Kegiatan" required error={err('nama')} hint="Tuliskan nama kejuaraan lengkap beserta tingkatannya.">
              <TextInput icon={IoTrophyOutline} placeholder="Misal: Juara 2 Lomba Debat Bahasa Inggris Provinsi" value={form.nama} onChange={set('nama')} error={err('nama')} />
            </Field>
            <Field label="Tingkat Kejuaraan" required>
              <div className="grid grid-cols-2 gap-3">
                {tingkatList.map((t) => {
                  const on = form.tingkat === t.value;
                  const Icon = on ? IoCheckmarkCircle : t.icon;
                  return (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => set('tingkat')(t.value)}
                      className={cx('flex items-center gap-2 rounded-xl border-2 px-3 py-3 text-left text-sm font-semibold', on ? 'border-navy bg-soft/60 text-navy' : 'border-line-soft text-muted hover:border-line')}
                    >
                      <Icon className="size-5 shrink-0" /> {t.value}
                    </button>
                  );
                })}
              </div>
            </Field>
            <div className="grid gap-5 sm:grid-cols-[160px_1fr]">
              <Field label="Tahun" required>
                <SelectInput icon={IoCalendarOutline} placeholder="Tahun" options={tahunList} value={form.tahun} onChange={set('tahun')} />
              </Field>
              <Field label="Penyelenggara" required error={err('penyelenggara')}>
                <TextInput icon={IoBusinessOutline} placeholder="Dinas Pendidikan dan Kebudayaan..." value={form.penyelenggara} onChange={set('penyelenggara')} error={err('penyelenggara')} />
              </Field>
            </div>
            <Field label="Berkas Sertifikat (PDF / JPG)" required error={err('berkas')}>
              <FilePicker
                file={berkas}
                onPick={(f, m) => { setBerkas(f); setPesanBerkas(m); }}
                accept={FORMAT}
                maxMB={5}
                error={err('berkas')}
                title="Pilih Berkas Sertifikat"
                hint="PDF/JPG/PNG • Maks. 5 MB • Resolusi minimal 300 DPI"
                readyLabel="Siap diverifikasi"
              />
            </Field>
            <Field error={err('setuju')}>
              <Checkbox checked={form.setuju} onChange={set('setuju')} error={err('setuju')}>
                Saya menyatakan bahwa sertifikat ini sah dan asli. Pemalsuan dokumen dapat dikenakan sanksi diskualifikasi prestasi Dapodik.
              </Checkbox>
            </Field>
            <Button type="submit" size="lg" icon={IoCloudUploadOutline} className="w-full">Kirim Sertifikat untuk Validasi</Button>
            <p className="text-center text-xs text-subtle">Pemeriksaan berkas oleh Admin Verifikator Kota Manado rata-rata 1–3 hari kerja.</p>
          </Card>
        </form>

        {/* ---------- Riwayat ---------- */}
        <section className="space-y-4">
          <SectionHeader title="Daftar Pengajuan Sertifikat" action={<Pill tone="gray">{daftar.length} Berkas Tercatat</Pill>} />
          {daftar.map((item) => {
            const st = statusInfo[item.status];
            return (
              <Card key={item.id} as="article" className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Pill tone={st.tone} icon={st.icon}>{st.label}</Pill>
                  <small className="text-xs text-subtle">{item.tanggal}</small>
                </div>
                <div>
                  <h3 className="font-bold text-ink">{item.judul}</h3>
                  <p className="text-sm text-muted">{item.tingkat} • {item.penyelenggara}</p>
                </div>
                {item.status === 'approved' && (
                  <div className="flex items-center gap-3 rounded-xl bg-emerald-50 p-3">
                    <IoShieldCheckmarkOutline className="size-5 shrink-0 text-emerald-700" />
                    <div className="min-w-0 flex-1 text-sm">
                      <b className="block font-mono font-semibold text-ink">No. BSrE: {item.nomorBsre}</b>
                      <small className="text-xs text-emerald-800">Tervalidasi TTE Disdikbud Manado • Sinkron Dapodik</small>
                    </div>
                    <Button variant="ghost" size="sm" icon={IoEyeOutline}>Lihat</Button>
                  </div>
                )}
                {item.status === 'review' && (
                  <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-amber-50 p-3 text-sm">
                    <span className="text-amber-900">{item.estimasi}</span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted">
                      <IoDocumentTextOutline className="size-4" /> {item.namaFile}
                    </span>
                  </div>
                )}
                {item.status === 'revision' && (
                  <div className="space-y-3 rounded-xl border border-red-200 bg-red-50/60 p-3">
                    <p className="text-sm">
                      <b className="block text-red-800">Catatan Validator Dikbud Manado:</b>
                      <span className="text-ink">“{item.catatan}”</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">Detail Catatan</Button>
                      <Button variant="danger" size="sm" icon={IoCloudUploadOutline}>Unggah Ulang SK</Button>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </section>
      </div>
    </div>
  );
}
