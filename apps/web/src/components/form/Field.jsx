import { useState } from 'react';
import { IoAlertCircleOutline, IoChevronDownOutline, IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { cx } from '../../lib/cx.js';

/*
  Komponen form yang dipakai halaman pendaftaran & akun (Siswa dan Guru).
  Semua menerima `error` (teks) untuk menampilkan pesan kesalahan.
*/

// Pembungkus: label + isi + pesan bantuan/kesalahan
export function Field({ label, required, optional, extra, hint, error, children, className }) {
  return (
    <div className={cx('space-y-1.5', className)} data-error={error ? 'true' : undefined}>
      {label && (
        <div className="flex items-baseline justify-between gap-2">
          <label className="text-sm font-semibold text-ink">
            {label}
            {required && <b className="ml-0.5 text-red-600">*</b>}
            {optional && <span className="ml-1 font-normal text-subtle">(Opsional)</span>}
          </label>
          {extra && <small className="text-xs text-subtle">{extra}</small>}
        </div>
      )}
      {children}
      {error ? (
        <p className="flex items-center gap-1.5 text-xs font-medium text-red-600">
          <IoAlertCircleOutline className="size-4 shrink-0" /> {error}
        </p>
      ) : (
        hint && <p className="text-xs text-subtle">{hint}</p>
      )}
    </div>
  );
}

const box = (error) =>
  cx(
    'flex h-12 items-center gap-3 rounded-xl border bg-white px-4 transition-colors focus-within:ring-2',
    error ? 'border-red-400 focus-within:ring-red-100' : 'border-line focus-within:border-navy focus-within:ring-soft'
  );

export function TextInput({ icon: Icon, error, trailing, className, ...props }) {
  return (
    <div className={cx(box(error), className)}>
      {Icon && <Icon className="size-5 shrink-0 text-subtle" />}
      <input className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-subtle" {...props} />
      {trailing}
    </div>
  );
}

export function PasswordInput({ icon, error, ...props }) {
  const [show, setShow] = useState(false);
  return (
    <TextInput
      icon={icon}
      error={error}
      type={show ? 'text' : 'password'}
      autoComplete="new-password"
      trailing={
        <button type="button" onClick={() => setShow(!show)} className="text-subtle hover:text-navy" aria-label={show ? 'Sembunyikan sandi' : 'Tampilkan sandi'}>
          {show ? <IoEyeOffOutline className="size-5" /> : <IoEyeOutline className="size-5" />}
        </button>
      }
      {...props}
    />
  );
}

// Skor kekuatan sandi 0-3 (sama dengan versi mobile)
export function passwordStrength(s) {
  if (!s) return { skor: 0, label: '' };
  let skor = 0;
  if (s.length >= 8) skor++;
  if (/[A-Za-z]/.test(s) && /\d/.test(s)) skor++;
  if (s.length >= 12 || (/[A-Z]/.test(s) && /[a-z]/.test(s) && /[^A-Za-z0-9]/.test(s))) skor++;
  return { skor, label: skor <= 1 ? 'Lemah' : skor === 2 ? 'Cukup' : 'Kuat' };
}

export function StrengthMeter({ value }) {
  const { skor, label } = passwordStrength(value);
  const warna = skor <= 1 ? 'bg-red-500' : skor === 2 ? 'bg-amber-500' : 'bg-emerald-600';
  return (
    <div className="flex items-center gap-3 text-xs">
      <div className="flex flex-1 gap-1.5">
        {[1, 2, 3].map((n) => (
          <i key={n} className={cx('h-1.5 flex-1 rounded-full', skor >= n ? warna : 'bg-slate-200')} />
        ))}
      </div>
      <span className="text-subtle">
        Kekuatan Sandi {label && <b className="text-ink">{label}</b>}
      </span>
    </div>
  );
}

export function SelectInput({ icon: Icon, error, placeholder, options, value, onChange, ...props }) {
  return (
    <div className={cx(box(error), 'relative')}>
      {Icon && <Icon className="size-5 shrink-0 text-subtle" />}
      <select
        value={value}
        onChange={onChange}
        className={cx('h-full min-w-0 flex-1 appearance-none bg-transparent pr-6 text-sm outline-none', !value && 'text-subtle')}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {/* opsi boleh berupa teks biasa atau { value, label } */}
        {options.map((o) => {
          const { value: v, label } = typeof o === 'string' ? { value: o, label: o } : o;
          return <option key={v} value={v} className="text-ink">{label}</option>;
        })}
      </select>
      <IoChevronDownOutline className="pointer-events-none absolute right-4 size-4 text-subtle" />
    </div>
  );
}

export function TextArea({ error, className, ...props }) {
  return (
    <textarea
      className={cx(
        'min-h-28 w-full rounded-xl border bg-white px-4 py-3 text-sm outline-none placeholder:text-subtle focus:ring-2',
        error ? 'border-red-400 focus:ring-red-100' : 'border-line focus:border-navy focus:ring-soft',
        className
      )}
      {...props}
    />
  );
}

// Pilihan berbentuk kartu (mis. jenjang SMA/SMK/SLB)
export function RadioCards({ name, options, value, onChange, error, columns = 3 }) {
  return (
    <div className={cx('grid gap-3', columns === 2 ? 'grid-cols-2' : 'grid-cols-3')} role="radiogroup">
      {options.map((o) => {
        const on = value === o.key;
        return (
          <label
            key={o.key}
            className={cx(
              'cursor-pointer rounded-xl border-2 px-4 py-3 text-center transition-colors',
              on ? 'border-navy bg-soft/60' : error ? 'border-red-300 bg-white' : 'border-line-soft bg-white hover:border-line'
            )}
          >
            <input type="radio" name={name} value={o.key} checked={on} onChange={() => onChange(o.key)} className="sr-only" />
            <b className={cx('block text-base font-extrabold', on ? 'text-navy' : 'text-ink')}>{o.label}</b>
            {o.desc && <small className="text-xs text-subtle">{o.desc}</small>}
          </label>
        );
      })}
    </div>
  );
}

export function Checkbox({ checked, onChange, error, children }) {
  return (
    <label className={cx('flex cursor-pointer gap-3 rounded-xl border p-4 text-sm leading-relaxed', error ? 'border-red-300 bg-red-50/50' : 'border-line-soft bg-surface')}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-0.5 size-4 shrink-0 accent-navy" />
      <span className="text-muted">{children}</span>
    </label>
  );
}

// Fokus & gulir ke kolom pertama yang salah setelah submit
export function scrollToFirstError() {
  requestAnimationFrame(() => {
    const el = document.querySelector('[data-error="true"]');
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.querySelector('input, select, textarea')?.focus({ preventScroll: true });
  });
}

// Judul bernomor untuk tiap bagian formulir panjang
export function Step({ n, title, action }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2 className="flex items-center gap-3 text-base font-bold text-ink">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-navy text-sm font-bold text-white">{n}</span>
        {title}
      </h2>
      {action}
    </div>
  );
}
