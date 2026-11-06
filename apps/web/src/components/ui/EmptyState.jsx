import IconBox from './IconBox.jsx';

// Tampilan saat belum ada data atau fitur belum tersedia.
export default function EmptyState({ icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-line bg-white px-6 py-14 text-center">
      <IconBox icon={icon} tone="blue" size="lg" />
      <h2 className="text-lg font-bold text-ink">{title}</h2>
      {description && <p className="max-w-md text-sm text-muted">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
