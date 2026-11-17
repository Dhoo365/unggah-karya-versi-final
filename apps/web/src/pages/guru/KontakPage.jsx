import { useState } from 'react';
import {
  IoCallOutline,
  IoCheckmarkCircle,
  IoIdCardOutline,
  IoInformationCircleOutline,
  IoKeypadOutline,
  IoLocationOutline,
  IoLockClosedOutline,
  IoMailOutline,
  IoSaveOutline,
  IoSchoolOutline,
  IoSyncOutline,
} from 'react-icons/io5';
import { Button, Card, Pill, SectionHeader } from '../../components/ui/index.js';
import { Field, TextArea, TextInput } from '../../components/form/index.js';
import { guruProfil as g } from '../../data/guru.js';

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const teleponOk = (v) => /^(\+62|62|0)8\d{7,11}$/.test(v.replace(/[\s-]/g, ''));

// Informasi kontak Dapodik guru (versi mobile: GuruKontakDapodik.vue)
export default function KontakPage() {
  const [awal, setAwal] = useState({ email: g.email, telepon: g.telepon, alamat: g.alamat });
  const [form, setForm] = useState(awal);
  const [sms, setSms] = useState(false);
  const [tersimpan, setTersimpan] = useState(false);

  const errors = {
    email: !form.email ? 'Email wajib diisi.' : emailOk(form.email) ? '' : 'Format email belum benar.',
    telepon: !form.telepon ? 'Nomor seluler wajib diisi.' : teleponOk(form.telepon) ? '' : 'Masukkan nomor seluler Indonesia yang valid (contoh: +62 812-3456-7890).',
    alamat: form.alamat.trim() ? '' : 'Alamat domisili wajib diisi.',
  };
  const berubah = Object.keys(awal).some((k) => form[k] !== awal[k]);
  const bisaSimpan = berubah && !Object.values(errors).some(Boolean);
  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setTersimpan(false);
    if (k === 'telepon') setSms(false);
  };
  const simpan = (e) => {
    e.preventDefault();
    if (!bisaSimpan) return;
    // TODO: kirim ke API
    setAwal(form);
    setTersimpan(true);
  };

  const terkunci = [
    { label: 'Nama Lengkap & Gelar', value: g.name, icon: IoIdCardOutline },
    { label: 'NIP / NUPTK', value: `${g.nip} / ${g.nuptk}`, icon: IoKeypadOutline },
    { label: 'Satuan Pendidikan Induk', value: `${g.org} • ${g.kota}`, icon: IoSchoolOutline },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5">
        <IoCheckmarkCircle className="mt-0.5 size-6 shrink-0 text-emerald-600" />
        <div className="min-w-0 flex-1">
          <b className="font-bold text-emerald-900">Tersinkronisasi Dapodik Kemendikbudristek</b>
          <p className="mt-1 text-sm text-emerald-900/80">Pembaruan data sinkronisasi terakhir: 14 Mei 2024, 08:32 WITA oleh Admin Dapodik Sekolah.</p>
        </div>
        <Pill tone="green">Aktif 2024/2025 Genap</Pill>
      </div>

      <div className="grid gap-6 [&>*]:min-w-0 xl:grid-cols-[1fr_1.2fr]">
        {/* ---------- Data pokok terkunci ---------- */}
        <Card className="h-fit space-y-5">
          <SectionHeader title="Data Pokok Guru" subtitle="Terkunci" action={<Pill tone="gray" icon={IoLockClosedOutline}>Hanya-Baca</Pill>} />
          {terkunci.map((t) => (
            <Field key={t.label} label={t.label}>
              <TextInput icon={t.icon} value={t.value} readOnly disabled trailing={<IoLockClosedOutline className="size-4 text-subtle" />} />
            </Field>
          ))}
          <p className="flex gap-2 rounded-xl bg-amber-50 p-3 text-xs leading-relaxed text-amber-900">
            <IoInformationCircleOutline className="size-4 shrink-0" />
            Perubahan Nama, NIP, atau Instansi Induk hanya dapat diproses melalui Operator Dapodik Sekolah resmi Dinas Pendidikan Daerah Sulut.
          </p>
        </Card>

        {/* ---------- Kontak mandiri ---------- */}
        <form onSubmit={simpan} noValidate>
          <Card className="space-y-5">
            <SectionHeader title="Informasi Kontak Mandiri" action={<Pill tone="blue">Dapat Diubah</Pill>} />
            {tersimpan && (
              <p className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-sm font-medium text-emerald-800">
                <IoCheckmarkCircle className="size-5" /> Perubahan kontak berhasil disimpan.
              </p>
            )}
            <Field label="Email Akun Belajar.id" extra={<Pill tone="sky">Terhubung SSO</Pill>} error={errors.email} hint="Digunakan untuk notifikasi verifikasi karya dan penjurian lomba.">
              <TextInput icon={IoMailOutline} type="email" value={form.email} onChange={set('email')} error={errors.email} />
            </Field>
            <Field label="Nomor WhatsApp / Seluler Aktif" extra={<Pill tone="green">Terverifikasi SMS/WA</Pill>} error={errors.telepon} hint={sms ? 'Permintaan uji SMS dikirim.' : 'Diperlukan untuk koordinasi teknis penganugerahan karya guru.'}>
              <div className="flex gap-2">
                <TextInput icon={IoCallOutline} type="tel" value={form.telepon} onChange={set('telepon')} error={errors.telepon} className="min-w-0 flex-1" />
                <Button type="button" variant="outline" disabled={!!errors.telepon} onClick={() => setSms(true)}>Uji SMS</Button>
              </div>
            </Field>
            <Field label="Alamat Domisili Guru" error={errors.alamat} hint="Alamat pengiriman sertifikat cetak & plakat penghargaan lomba.">
              <div className="relative">
                <IoLocationOutline className="pointer-events-none absolute top-3.5 left-3.5 size-5 text-subtle" />
                <TextArea rows={3} value={form.alamat} onChange={set('alamat')} error={!!errors.alamat} className="pl-11" />
              </div>
            </Field>
            <div className="flex flex-col gap-3 border-t border-line-soft pt-5 sm:flex-row sm:justify-end">
              <Button type="button" variant="ghost" icon={IoSyncOutline}>Sinkronisasi Ulang Dapodik</Button>
              <Button type="submit" icon={IoSaveOutline} disabled={!bisaSimpan}>Simpan Perubahan Kontak</Button>
            </div>
          </Card>
        </form>
      </div>
    </div>
  );
}
