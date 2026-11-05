import { API_ROUTES } from '@my-project/shared';

// Kosong = pakai proxy Vite (saat di browser). Isi VITE_API_URL saat di HP.
const BASE_URL = import.meta.env.VITE_API_URL || '';

export async function getTodos() {
  const res = await fetch(BASE_URL + API_ROUTES.TODOS);
  if (!res.ok) throw new Error('Gagal mengambil data');
  return res.json();
}
