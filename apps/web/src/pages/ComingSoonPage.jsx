import { useNavigate } from 'react-router-dom';
import { IoArrowBackOutline, IoConstructOutline } from 'react-icons/io5';
import { Button, EmptyState } from '../components/ui/index.js';

// Halaman sementara untuk menu yang desainnya belum dibuat.
export default function ComingSoonPage({ icon = IoConstructOutline, title }) {
  const navigate = useNavigate();
  return (
    <EmptyState
      icon={icon}
      title={title}
      description="Halaman ini belum dibuat. Tampilannya akan menyusul setelah desain versi mobile-nya tersedia."
      action={
        <Button variant="outline" icon={IoArrowBackOutline} onClick={() => navigate(-1)}>
          Kembali
        </Button>
      }
    />
  );
}
