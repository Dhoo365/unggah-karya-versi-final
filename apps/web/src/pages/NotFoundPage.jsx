import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="grid min-h-screen place-items-center bg-surface px-6 text-center">
      <div>
        <p className="text-6xl font-extrabold text-navy">404</p>
        <h1 className="mt-2 text-xl font-bold text-ink">Halaman tidak ditemukan</h1>
        <p className="mt-1 text-sm text-muted">Alamat yang kamu buka tidak tersedia.</p>
        <Link
          to="/admin"
          className="mt-6 inline-flex h-10 items-center rounded-xl bg-navy px-4 text-sm font-semibold text-white hover:bg-primary"
        >
          Ke Dashboard Admin
        </Link>
      </div>
    </div>
  );
}
