import { API_ROUTES } from '@my-project/shared';

// Semua panggilan ke backend dikumpulkan di sini.
export async function getTodos() {
  const res = await fetch(API_ROUTES.TODOS);
  if (!res.ok) throw new Error('Gagal mengambil data');
  return res.json();
}
