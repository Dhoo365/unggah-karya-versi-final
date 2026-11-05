import { useTodos } from '../hooks/useTodos.js';

export default function HomePage() {
  const { todos, loading, error } = useTodos();

  return (
    <section>
      <h1 className="mb-4 text-2xl font-bold">Daftar Todo</h1>
      {loading && <p>Memuat...</p>}
      {error && <p className="text-red-600">Error: {error} (pastikan API berjalan)</p>}
      <ul className="space-y-2">
        {todos.map((t) => (
          <li key={t.id} className="rounded-lg bg-white p-3 shadow-sm">{t.title}</li>
        ))}
      </ul>
    </section>
  );
}
