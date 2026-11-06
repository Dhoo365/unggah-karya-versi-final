// Menggabungkan class Tailwind, mengabaikan nilai kosong/false.
// Contoh: cx('px-4', isActive && 'bg-navy') -> 'px-4 bg-navy'
export function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Mencari teks di beberapa field objek (untuk kotak pencarian).
export function matchQuery(item, query, fields) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return fields.some((f) => String(item[f] ?? '').toLowerCase().includes(q));
}
