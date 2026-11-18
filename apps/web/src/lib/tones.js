// Kumpulan warna "tone" yang dipakai badge, ikon, dan progress bar.
// Ditulis lengkap (bukan disusun dinamis) supaya Tailwind bisa mendeteksinya.

// Latar lembut + teks (badge, kotak ikon)
export const toneSoft = {
  blue: 'bg-soft text-navy',
  sky: 'bg-ice text-secondary',
  amber: 'bg-amber-100 text-amber-800',
  green: 'bg-emerald-100 text-emerald-700',
  gray: 'bg-slate-100 text-slate-600',
  orange: 'bg-orange-100 text-orange-700',
  purple: 'bg-violet-100 text-violet-700',
  red: 'bg-red-100 text-red-700',
  navy: 'bg-navy text-white',
};

// Warna isi progress bar
export const toneBar = {
  blue: 'bg-navy',
  sky: 'bg-secondary',
  amber: 'bg-amber-500',
  green: 'bg-emerald-600',
  orange: 'bg-orange-500',
  gray: 'bg-slate-400',
};

// Warna teks saja
export const toneText = {
  blue: 'text-navy',
  sky: 'text-secondary',
  amber: 'text-amber-700',
  green: 'text-emerald-700',
  orange: 'text-orange-600',
  gray: 'text-slate-600',
};
