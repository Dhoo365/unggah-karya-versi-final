import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  IoAlertCircle,
  IoCheckmarkCircle,
  IoCloseOutline,
  IoDocumentTextOutline,
  IoDownloadOutline,
  IoInformationCircle,
  IoPrintOutline,
  IoWarning,
} from 'react-icons/io5';
import Modal from './Modal.jsx';
import { Button } from '../ui/index.js';
import { cx } from '../../lib/cx.js';
import { bagikan as bagikanApi, bukaTautan, unduhCsv, unduhPdf } from '../../lib/files.js';

/*
  Penyedia umpan balik untuk seluruh aplikasi. Pakai lewat hook:

    const ui = useUi();
    ui.toast({ title: 'Tersimpan', tone: 'success' });
    if (await ui.confirm({ title: 'Hapus juri?', tone: 'danger' })) { ... }
    const alasan = await ui.confirm({ title: 'Tolak berkas', prompt: { label: 'Alasan' } });
    ui.lihat(dokumen);   // pratinjau dokumen + tombol unduh/cetak
    ui.unduh(dokumen);   // langsung unduh PDF + notifikasi
*/

const Ctx = createContext(null);
export const useUi = () => useContext(Ctx);

const gayaToast = {
  success: { icon: IoCheckmarkCircle, warna: 'text-emerald-600', bar: 'bg-emerald-500' },
  info: { icon: IoInformationCircle, warna: 'text-navy', bar: 'bg-navy' },
  warning: { icon: IoWarning, warna: 'text-amber-600', bar: 'bg-amber-500' },
  error: { icon: IoAlertCircle, warna: 'text-red-600', bar: 'bg-red-500' },
};

/* ---------------- Toast ---------------- */
function Toast({ t, tutup }) {
  const g = gayaToast[t.tone] ?? gayaToast.info;
  const Icon = g.icon;
  const sisa = useRef(t.durasi);
  const mulai = useRef(Date.now());
  const timer = useRef(null);
  const jalan = () => {
    mulai.current = Date.now();
    timer.current = setTimeout(() => tutup(t.id), sisa.current);
  };
  const jeda = () => {
    clearTimeout(timer.current);
    sisa.current -= Date.now() - mulai.current;
  };
  useEffect(() => {
    jalan();
    return () => clearTimeout(timer.current);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      role="status"
      data-closing={t.keluar || undefined}
      onMouseEnter={jeda}
      onMouseLeave={jalan}
      className="ui-toast pointer-events-auto relative w-full overflow-hidden rounded-2xl border border-line-soft bg-white shadow-xl shadow-navy/10 sm:w-96"
    >
      <div className="flex items-start gap-3 p-4 pr-10">
        <Icon className={cx('ui-check mt-0.5 size-6 shrink-0', g.warna)} />
        <div className="min-w-0 flex-1">
          <b className="block text-sm font-bold text-ink">{t.title}</b>
          {t.description && <p className="mt-0.5 text-sm leading-snug text-muted">{t.description}</p>}
          {t.action && (
            <button
              type="button"
              onClick={() => { t.action.onClick(); tutup(t.id); }}
              className="mt-2 text-sm font-bold text-navy hover:underline"
            >
              {t.action.label}
            </button>
          )}
        </div>
      </div>
      <button type="button" onClick={() => tutup(t.id)} aria-label="Tutup notifikasi" className="absolute top-3 right-3 grid size-7 place-items-center rounded-lg text-subtle hover:bg-surface hover:text-ink">
        <IoCloseOutline className="size-5" />
      </button>
      <i className={cx('ui-toast-bar absolute bottom-0 left-0 h-1 w-full opacity-70', g.bar)} style={{ animationDuration: `${t.durasi}ms` }} />
    </div>
  );
}

/* ---------------- Konfirmasi ---------------- */
function Konfirmasi({ req, selesai }) {
  const [nilai, setNilai] = useState(req?.prompt?.value ?? '');
  const [salah, setSalah] = useState('');
  const [proses, setProses] = useState(false);
  useEffect(() => { setNilai(req?.prompt?.value ?? ''); setSalah(''); setProses(false); }, [req]);
  const ok = async () => {
    if (req.prompt) {
      const min = req.prompt.min ?? (req.prompt.required ? 1 : 0);
      if (nilai.trim().length < min) return setSalah(req.prompt.error ?? `Wajib diisi minimal ${min} karakter.`);
    }
    setProses(true);
    // jeda singkat agar terasa ada proses (nanti diganti panggilan API)
    await new Promise((r) => setTimeout(r, req.delay ?? 350));
    selesai(req.prompt ? nilai.trim() : true);
  };
  const danger = req?.tone === 'danger';
  return (
    <Modal
      open={!!req?.open}
      onClose={() => !proses && selesai(req.prompt ? null : false)}
      title={req?.title}
      subtitle={req?.message}
      icon={req?.icon ?? (danger ? IoWarning : IoInformationCircle)}
      tone={danger ? 'red' : req?.tone === 'success' ? 'green' : 'blue'}
      size="sm"
      footer={
        <>
          <Button variant="ghost" onClick={() => selesai(req.prompt ? null : false)} disabled={proses}>{req?.cancelLabel ?? 'Batal'}</Button>
          <Button
            variant={danger ? 'dangerSolid' : 'primary'}
            loading={proses}
            onClick={ok}
          >
            {req?.confirmLabel ?? 'Lanjutkan'}
          </Button>
        </>
      }
    >
      {req?.detail && <div className="rounded-xl bg-surface p-3 text-sm text-muted">{req.detail}</div>}
      {req?.prompt && (
        <label className="mt-1 block">
          <span className="text-sm font-semibold text-ink">{req.prompt.label}</span>
          {req.prompt.multiline === false ? (
            <input
              value={nilai}
              onChange={(e) => { setNilai(e.target.value); setSalah(''); }}
              onKeyDown={(e) => e.key === 'Enter' && ok()}
              placeholder={req.prompt.placeholder}
              type={req.prompt.type ?? 'text'}
              className={cx('mt-1.5 h-12 w-full rounded-xl border bg-white px-4 text-sm outline-none focus:ring-4', salah ? 'border-red-400 focus:ring-red-100' : 'border-line focus:border-navy focus:ring-soft')}
            />
          ) : (
            <textarea
              rows={4}
              value={nilai}
              onChange={(e) => { setNilai(e.target.value); setSalah(''); }}
              placeholder={req.prompt.placeholder}
              className={cx('mt-1.5 w-full resize-none rounded-xl border bg-white px-4 py-3 text-sm outline-none focus:ring-4', salah ? 'border-red-400 focus:ring-red-100' : 'border-line focus:border-navy focus:ring-soft')}
            />
          )}
          {salah && <small className="mt-1 block text-xs font-medium text-red-600">{salah}</small>}
        </label>
      )}
    </Modal>
  );
}

/* ---------------- Pratinjau dokumen ---------------- */
function PratinjauDokumen({ dok, tutup, unduh }) {
  const [mengunduh, setMengunduh] = useState(false);
  // simpan dokumen terakhir agar isi tidak hilang saat animasi tutup
  const terakhir = useRef(null);
  if (dok) terakhir.current = dok;
  const d = terakhir.current ?? {};
  return (
    <Modal
      open={!!dok}
      onClose={tutup}
      title={d.judul}
      subtitle={[d.jenis ?? 'Dokumen', d.ukuran].filter(Boolean).join(' • ')}
      icon={IoDocumentTextOutline}
      size="lg"
      footer={
        <>
          <Button variant="ghost" onClick={tutup}>Tutup</Button>
          <Button variant="outline" icon={IoPrintOutline} onClick={() => window.print()} className="hidden sm:inline-flex">Cetak</Button>
          <Button
            icon={IoDownloadOutline}
            loading={mengunduh}
            onClick={async () => { setMengunduh(true); await unduh(d); setMengunduh(false); }}
          >
            Unduh PDF
          </Button>
        </>
      }
    >
      {/* Kertas dokumen */}
      <article className="rounded-2xl bg-slate-100 p-3 sm:p-5">
        <div className="mx-auto max-w-xl space-y-4 rounded-lg bg-white p-6 text-sm leading-relaxed text-ink shadow-md sm:p-8">
          <header className="border-b-2 border-navy pb-3 text-center">
            <b className="block text-[11px] tracking-widest text-navy">PEMERINTAH PROVINSI SULAWESI UTARA</b>
            <small className="block text-[11px] tracking-wider text-muted">DINAS PENDIDIKAN DAERAH • SIKARYA</small>
          </header>
          <div className="text-center">
            <h3 className="text-base font-extrabold">{d.judul}</h3>
            {d.nomor && <small className="block text-xs text-muted">Nomor: {d.nomor}</small>}
            {(d.penerbit || d.tanggal) && <small className="block text-xs text-subtle">{[d.penerbit, d.tanggal].filter(Boolean).join(' • ')}</small>}
          </div>
          {d.baris && (
            <dl className="divide-y divide-line-soft rounded-xl border border-line-soft">
              {d.baris.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[minmax(0,40%)_1fr] gap-3 px-3 py-2 text-xs sm:text-sm">
                  <dt className="text-muted">{k}</dt>
                  <dd className="font-semibold [overflow-wrap:anywhere]">{v}</dd>
                </div>
              ))}
            </dl>
          )}
          {d.bagian?.map((b, i) => (
            <section key={i} className="space-y-1.5">
              {b.judul && <h4 className="font-bold text-navy">{b.judul}</h4>}
              {Array.isArray(b.isi) ? (
                <ol className="list-decimal space-y-1 pl-5 text-muted">{b.isi.map((p) => <li key={p}>{p}</li>)}</ol>
              ) : (
                <p className="text-muted">{b.isi}</p>
              )}
            </section>
          ))}
          <footer className="flex items-end justify-between gap-4 border-t border-line-soft pt-4 text-[11px] text-subtle">
            <span>Tervalidasi TTE BSrE<br />SIKARYA Dikda Sulut</span>
            <span className="grid size-14 place-items-center rounded-md border-2 border-dashed border-line text-[9px] font-bold">QR</span>
          </footer>
        </div>
      </article>
    </Modal>
  );
}

/* ---------------- Penyedia ---------------- */
export default function FeedbackProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const [konfirmasi, setKonfirmasi] = useState(null);
  const [dok, setDok] = useState(null);
  const penyelesai = useRef(null);

  const tutupToast = useCallback((id) => {
    setToasts((l) => l.map((t) => (t.id === id ? { ...t, keluar: true } : t)));
    setTimeout(() => setToasts((l) => l.filter((t) => t.id !== id)), 230);
  }, []);

  const toast = useCallback((opsi) => {
    const t = { id: Math.random().toString(36).slice(2), tone: 'success', durasi: 4200, ...(typeof opsi === 'string' ? { title: opsi } : opsi) };
    setToasts((l) => [...l.slice(-3), t]);
    return t.id;
  }, []);

  const confirm = useCallback(
    (opsi) =>
      new Promise((resolve) => {
        penyelesai.current = resolve;
        setKonfirmasi({ ...opsi, open: true });
      }),
    []
  );
  const selesai = (hasil) => {
    penyelesai.current?.(hasil);
    setKonfirmasi((k) => (k ? { ...k, open: false } : k));
  };

  const unduh = useCallback(
    async (d) => {
      await new Promise((r) => setTimeout(r, 450)); // simulasi menyiapkan berkas
      unduhPdf(d);
      toast({ title: 'Unduhan dimulai', description: d.namaFile ?? d.judul, tone: 'success' });
    },
    [toast]
  );

  const nilai = useMemo(
    () => ({
      toast,
      confirm,
      lihat: setDok,
      unduh,
      csv: (nama, kolom, baris) => {
        unduhCsv(nama, kolom, baris);
        toast({ title: 'Data diekspor', description: `${nama} • ${baris.length} baris`, tone: 'success' });
      },
      cetak: () => window.print(),
      buka: (url, label) => {
        bukaTautan(url);
        if (label) toast({ title: label, description: 'Dibuka di tab baru.', tone: 'info', durasi: 2600 });
      },
      bagikan: async (info) => {
        const hasil = await bagikanApi(info);
        if (hasil === 'copied') toast({ title: 'Tautan disalin', description: 'Tempel di WhatsApp atau email untuk membagikan.', tone: 'success' });
      },
      segera: (fitur) => toast({ title: `${fitur} segera hadir`, description: 'Fitur ini akan aktif setelah terhubung ke server.', tone: 'info' }),
    }),
    [toast, confirm, unduh]
  );

  return (
    <Ctx.Provider value={nilai}>
      {children}
      <Konfirmasi req={konfirmasi} selesai={selesai} />
      <PratinjauDokumen dok={dok} tutup={() => setDok(null)} unduh={unduh} />
      {createPortal(
        <div aria-live="polite" className="ui-toast-region pointer-events-none fixed inset-x-3 bottom-3 z-[70] flex flex-col items-stretch gap-2 sm:inset-x-auto sm:right-5 sm:bottom-5 sm:items-end">
          {toasts.map((t) => <Toast key={t.id} t={t} tutup={tutupToast} />)}
        </div>,
        document.body
      )}
    </Ctx.Provider>
  );
}
