import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoArrowBackOutline, IoCheckmarkCircle, IoSaveOutline, IoWarningOutline } from 'react-icons/io5';
import { Avatar, Button, Card, Pill, SectionHeader } from '../../components/ui/index.js';
import { Field, TextArea, scrollToFirstError } from '../../components/form/index.js';
import AuditTimeline from '../../components/guru/AuditTimeline.jsx';
import { cx } from '../../lib/cx.js';
import { guruProfil, logAudit, siswaBinaan, statusSiswa } from '../../data/guru.js';

const MAKS = 250;
const hariIni = () => new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

// Ubah status siswa + catatan audit (versi mobile: GuruKelolaStatus.vue / panel di GuruDataSiswa.vue)
export default function KelolaStatusPage() {
  const { nisn } = useParams();
  const navigate = useNavigate();
  const siswa = siswaBinaan.find((s) => s.id === nisn) ?? siswaBinaan[1];
  const [sekarang, setSekarang] = useState(siswa.status);
  const [baru, setBaru] = useState(siswa.status);
  const [catatan, setCatatan] = useState('');
  const [log, setLog] = useState(logAudit);
  const [dicoba, setDicoba] = useState(false);
  const [mengirim, setMengirim] = useState(false);
  const [tersimpan, setTersimpan] = useState(false);

  const errors = {
    status: baru === sekarang ? 'Pilih status yang berbeda dari status saat ini.' : '',
    catatan: catatan.trim().length < 5 ? 'Alasan perubahan wajib diisi untuk audit (minimal 5 karakter).' : '',
  };

  const simpan = async (e) => {
    e.preventDefault();
    if (mengirim) return;
    setDicoba(true);
    if (Object.values(errors).some(Boolean)) return scrollToFirstError();
    setMengirim(true);
    // TODO: kirim perubahan status ke API
    await new Promise((r) => setTimeout(r, 500));
    const jam = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WITA';
    setLog((l) => [{ tanggal: hariIni(), jam, label: statusSiswa[baru].label, tone: statusSiswa[baru].tone, isi: catatan.trim(), oleh: guruProfil.name }, ...l]);
    setSekarang(baru);
    setCatatan('');
    setDicoba(false);
    setMengirim(false);
    setTersimpan(true);
  };

  return (
    <div className="space-y-6">
      <Link to="/guru/siswa" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:underline">
        <IoArrowBackOutline className="size-4" /> Kembali ke Daftar Siswa
      </Link>

      <div className="grid gap-6 [&>*]:min-w-0 xl:grid-cols-[1fr_380px]">
        <form onSubmit={simpan} noValidate className="space-y-6">
          <Card className="flex flex-wrap items-center gap-4">
            <Avatar initials={siswa.initial} size="lg" tone="navy" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <b className="text-xl font-bold text-ink">{siswa.name}</b>
                <Pill tone={statusSiswa[sekarang].tone}>{statusSiswa[sekarang].label}</Pill>
              </div>
              <small className="text-sm text-muted">NISN: {siswa.nisn} • Kelas {siswa.kelas} • {guruProfil.org}</small>
            </div>
          </Card>

          <Card className="space-y-5">
            <SectionHeader title="Pilih Status Pembaruan" action={<Pill tone="blue">1 Opsi Terpilih</Pill>} />
            {tersimpan && (
              <p className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-sm font-medium text-emerald-800">
                <IoCheckmarkCircle className="size-5" /> Status siswa diperbarui dan tercatat di log audit.
              </p>
            )}
            <Field error={dicoba ? errors.status : ''}>
              <div className="grid gap-3 md:grid-cols-2" role="radiogroup">
                {Object.entries(statusSiswa).map(([value, o]) => {
                  const on = baru === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      onClick={() => { setBaru(value); setTersimpan(false); }}
                      className={cx(
                        'flex gap-3 rounded-xl border-2 p-4 text-left transition',
                        on ? (o.peringatan ? 'border-red-500 bg-red-50/60' : 'border-navy bg-soft/50') : 'border-line-soft hover:border-line'
                      )}
                    >
                      <span className={cx('mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border-2', on ? (o.peringatan ? 'border-red-500' : 'border-navy') : 'border-line')}>
                        {on && <i className={cx('size-2.5 rounded-full', o.peringatan ? 'bg-red-500' : 'bg-navy')} />}
                      </span>
                      <span className="min-w-0">
                        <span className="flex flex-wrap items-center gap-2 font-semibold text-ink">
                          {o.label}
                          {o.peringatan && <IoWarningOutline className="size-4 text-red-600" />}
                          {value === sekarang && <em className="rounded bg-slate-100 px-1.5 text-[11px] font-semibold text-slate-600 not-italic">Status Sekarang</em>}
                        </span>
                        <small className="mt-1 block text-xs text-muted">{o.desc}</small>
                      </span>
                    </button>
                  );
                })}
              </div>
            </Field>
            <Field
              label="Alasan / Catatan Perubahan (Audit Trail)"
              required
              extra={<span className={catatan.length > MAKS ? 'text-red-600' : ''}>{catatan.length}/{MAKS} karakter</span>}
              error={dicoba ? errors.catatan : ''}
              hint="Catatan ini akan dicatat ke dalam log audit resmi Dikda Sulut dan tidak dapat dihapus."
            >
              <TextArea rows={4} maxLength={MAKS} placeholder="Contoh: Siswa aktif terdaftar tim Olimpiade Sains Sulut 2026" value={catatan} onChange={(e) => setCatatan(e.target.value)} error={dicoba && !!errors.catatan} />
            </Field>
            <div className="flex flex-col-reverse gap-3 border-t border-line-soft pt-5 sm:flex-row sm:justify-end">
              <Button type="button" variant="ghost" onClick={() => navigate('/guru/siswa')}>Batal</Button>
              <Button type="submit" icon={IoSaveOutline} disabled={mengirim}>{mengirim ? 'Menyimpan...' : 'Simpan & Perbarui Status'}</Button>
            </div>
          </Card>
        </form>

        <Card as="aside" className="h-fit space-y-5">
          <SectionHeader title="Riwayat Audit Terakhir" action={<Pill tone="gray">{log.length} Catatan</Pill>} />
          <AuditTimeline items={log} />
          <small className="block border-t border-line-soft pt-3 text-xs text-subtle">Sistem Verifikasi Audit Trail Terenkripsi • Dinas Pendidikan Daerah Provinsi Sulawesi Utara</small>
        </Card>
      </div>
    </div>
  );
}
