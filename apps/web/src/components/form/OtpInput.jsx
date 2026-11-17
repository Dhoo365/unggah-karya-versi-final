import { useEffect, useRef } from 'react';
import { cx } from '../../lib/cx.js';

/*
  Kotak kode OTP (default 6 digit). Mendukung tempel kode, isi otomatis,
  Backspace untuk mundur, dan tombol panah kiri/kanan — sama dengan versi mobile.
  value: array string per digit, onChange(arrayBaru)
*/
export default function OtpInput({ value, onChange, error, length = 6, autoFocus = true }) {
  const refs = useRef([]);
  const focus = (i) => refs.current[Math.max(0, Math.min(length - 1, i))]?.focus();

  useEffect(() => {
    if (autoFocus) focus(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const spread = (start, text) => {
    const digits = text.replace(/\D/g, '').slice(0, length - start).split('');
    const next = [...value];
    digits.forEach((d, k) => (next[start + k] = d));
    onChange(next);
    focus(start + digits.length);
  };

  const handleChange = (i, raw) => {
    const angka = raw.replace(/\D/g, '');
    if (angka.length > 1) return spread(i, angka);
    const next = [...value];
    next[i] = angka;
    onChange(next);
    if (angka && i < length - 1) focus(i + 1);
  };

  const handleKey = (i, e) => {
    if (e.key === 'Backspace' && !value[i] && i > 0) {
      const next = [...value];
      next[i - 1] = '';
      onChange(next);
      focus(i - 1);
      e.preventDefault();
    } else if (e.key === 'ArrowLeft') {
      focus(i - 1);
      e.preventDefault();
    } else if (e.key === 'ArrowRight') {
      focus(i + 1);
      e.preventDefault();
    }
  };

  return (
    <div className="flex justify-center gap-2 sm:gap-3">
      {Array.from({ length }, (_, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          value={value[i] ?? ''}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKey(i, e)}
          onPaste={(e) => {
            e.preventDefault();
            spread(i, e.clipboardData.getData('text'));
          }}
          inputMode="numeric"
          autoComplete={i === 0 ? 'one-time-code' : 'off'}
          maxLength={length}
          placeholder="•"
          aria-label={`Digit ${i + 1}`}
          className={cx(
            'size-12 rounded-xl border-2 bg-white text-center text-xl font-extrabold text-navy outline-none transition-colors sm:size-14',
            'placeholder:text-line focus:border-navy focus:ring-2 focus:ring-soft',
            error ? 'border-red-400' : value[i] ? 'border-navy' : 'border-line'
          )}
        />
      ))}
    </div>
  );
}
