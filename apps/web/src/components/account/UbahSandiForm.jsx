import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IoCheckmarkCircle,
  IoEllipseOutline,
  IoInformationCircleOutline,
  IoLockClosedOutline,
  IoRefreshCircleOutline,
  IoSaveOutline,
  IoShieldCheckmark,
} from 'react-icons/io5';
import { Avatar, Button, Card, Pill, SectionHeader } from '../ui/index.js';
import { Field, PasswordInput, scrollToFirstError } from '../form/index.js';
import { cx } from '../../lib/cx.js';

/*
  Formulir ubah kata sandi yang dipakai bersama oleh portal Siswa dan Guru.
  - identitas: { initials, nama, sub, badge, keterangan }
  - kriteria : [{ label, cek: (sandi) => boolean, wajib }]
  - catatan  : teks/elemen bantuan di bawah kriteria
  - kembali  : path tombol batal
*/
export default function UbahSandiForm({ identitas, kriteria, catatan, kembali, subjudul }) {
  const navigate = useNavigate();
  const kosong = { lama: '', baru: '', konfirmasi: '' };
  const [form, setForm] = useState(kosong);
  const [dicoba, setDicoba] = useState(false);
  const [menyimpan, setMenyimpan] = useState(false);
  const [berhasil, setBerhasil] = useState(false);

  const wajibOk = kriteria.filter((k) => k.wajib).every((k) => k.cek(form.baru));
  const errors = {
    lama: form.lama ? '' : 'Kata sandi saat ini wajib diisi.',
    baru: wajibOk ? '' : 'Kata sandi baru belum memenuhi kriteria keamanan.',
    konfirmasi: form.konfirmasi && form.konfirmasi === form.baru ? '' : 'Konfirmasi kata sandi tidak cocok dengan kata sandi baru.',
  };
  // Konfirmasi langsung diberi tahu begitu mulai diketik
  const err = (k) => (dicoba || (k === 'konfirmasi' && form.konfirmasi) ? errors[k] : '');
  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setBerhasil(false);
  };

  const simpan = async (e) => {
    e.preventDefault();
    if (menyimpan) return;
    setDicoba(true);
    if (Object.values(errors).some(Boolean)) return scrollToFirstError();
    setMenyimpan(true);
    // TODO: kirim form.lama & form.baru ke API. Jangan tulis kata sandi ke console/log.
    await new Promise((r) => setTimeout(r, 600));
    setMenyimpan(false);
    setForm(kosong);
    setDicoba(false);
    setBerhasil(true);
  };

  return (
    <div className="grid gap-8 [&>*]:min-w-0 lg:grid-cols-[320px_1fr] lg:items-start">
      <aside className="space-y-4 lg:sticky lg:top-24">
        <Card className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar initials={identitas.initials} size="lg" tone="navy" />
            <div className="min-w-0">
              <b className="block font-bold text-ink">{identitas.nama}</b>
              <small className="text-sm text-muted">{identitas.sub}</small>
            </div>
          </div>
          {identitas.badge && <Pill tone="green" icon={IoShieldCheckmark}>{identitas.badge}</Pill>}
          {identitas.keterangan && <p className="text-sm leading-relaxed text-muted">{identitas.keterangan}</p>}
        </Card>
        {catatan && (
          <p className="flex gap-2 rounded-2xl bg-amber-50 p-4 text-sm leading-relaxed text-amber-900">
            <IoInformationCircleOutline className="mt-0.5 size-5 shrink-0" />
            <span>{catatan}</span>
          </p>
        )}
      </aside>

      <form onSubmit={simpan} noValidate>
        <Card className="space-y-5">
          <SectionHeader title="Formulir Kata Sandi Baru" subtitle={subjudul} action={<small className="text-xs text-subtle">* Wajib diisi</small>} />
          {berhasil && (
            <p className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-sm font-medium text-emerald-800">
              <IoCheckmarkCircle className="size-5" /> Kata sandi berhasil diperbarui.
            </p>
          )}
          <Field label="Kata Sandi Saat Ini" required error={err('lama')} hint="Kata sandi akun aktif Anda">
            <PasswordInput icon={IoLockClosedOutline} autoComplete="current-password" placeholder="••••••••••••" value={form.lama} onChange={set('lama')} error={err('lama')} />
          </Field>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Kata Sandi Baru" required error={err('baru')}>
              <PasswordInput icon={IoRefreshCircleOutline} placeholder="Buat kata sandi baru yang kuat" value={form.baru} onChange={set('baru')} error={err('baru')} />
            </Field>
            <Field label="Konfirmasi Kata Sandi Baru" required error={err('konfirmasi')}>
              <PasswordInput icon={IoCheckmarkCircle} placeholder="Ulangi kata sandi baru" value={form.konfirmasi} onChange={set('konfirmasi')} error={err('konfirmasi')} />
            </Field>
          </div>

          <div className="rounded-xl bg-surface p-4">
            <b className="text-sm font-semibold text-ink">Kriteria Keamanan Kata Sandi</b>
            <ul className="mt-2 space-y-1.5">
              {kriteria.map((k) => {
                const ok = k.cek(form.baru);
                const Icon = ok ? IoCheckmarkCircle : IoEllipseOutline;
                return (
                  <li key={k.label} className={cx('flex items-center gap-2 text-sm', ok ? 'text-emerald-700' : 'text-muted')}>
                    <Icon className="size-4 shrink-0" /> {k.label}
                    {!k.wajib && <span className="text-xs text-subtle">(disarankan)</span>}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-line-soft pt-5 sm:flex-row sm:justify-end">
            <Button type="button" variant="ghost" onClick={() => navigate(kembali)}>Batal / Kembali ke Profil</Button>
            <Button type="submit" icon={IoSaveOutline} disabled={menyimpan}>
              {menyimpan ? 'Menyimpan Kata Sandi...' : 'Simpan Kata Sandi Baru'}
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
