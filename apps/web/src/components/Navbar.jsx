import { Link } from 'react-router-dom';
import { APP_NAME } from '@my-project/shared';

// Menu atas untuk halaman contoh (/demo dan /about).
export default function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="mx-auto flex max-w-4xl items-center justify-between p-4">
        <span className="text-lg font-bold text-blue-600">{APP_NAME}</span>
        <div className="flex gap-4 text-sm">
          <Link to="/demo" className="hover:text-blue-600">Demo API</Link>
          <Link to="/about" className="hover:text-blue-600">About</Link>
          <Link to="/admin" className="hover:text-blue-600">Portal Admin</Link>
        </div>
      </div>
    </nav>
  );
}
