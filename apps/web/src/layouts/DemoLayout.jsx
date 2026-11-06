import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';

// Layout untuk halaman contoh koneksi ke backend (/demo dan /about).
export default function DemoLayout() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <main className="mx-auto max-w-4xl p-6">
        <Outlet />
      </main>
    </div>
  );
}
