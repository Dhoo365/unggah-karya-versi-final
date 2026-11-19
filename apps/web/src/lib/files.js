/*
  Alat bantu berkas di sisi browser (tanpa library):
  - buatPdf / unduhPdf : membuat PDF sederhana berisi judul + paragraf, lalu diunduh
  - unduhCsv           : ekspor tabel ke CSV (bisa dibuka di Excel)
  - bagikan            : Web Share API, jika tidak ada → salin tautan
  - bukaTautan         : buka tautan luar di tab baru

  Selama API belum siap, tombol "Unduh" memakai PDF buatan ini.
  Nanti cukup ganti isinya dengan berkas asli dari server.
*/

/* ---------------- PDF ---------------- */

// Karakter di luar Latin-1 diubah ke kode WinAnsi agar tampil benar di PDF
const WIN_ANSI = { '–': 0x96, '—': 0x97, '‘': 0x91, '’': 0x92, '“': 0x93, '”': 0x94, '•': 0x95, '…': 0x85, '€': 0x80 };
const keBytes = (teks) =>
  Array.from(teks, (c) => {
    if (WIN_ANSI[c]) return WIN_ANSI[c];
    const k = c.charCodeAt(0);
    return k < 256 ? k : 0x3f; // '?' untuk karakter yang tidak didukung
  });
const escapePdf = (teks) => teks.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');

// Pecah teks panjang menjadi beberapa baris (perkiraan lebar huruf Helvetica)
function bungkus(teks, maks) {
  const hasil = [];
  for (const paragraf of String(teks).split('\n')) {
    let baris = '';
    for (const kata of paragraf.split(/\s+/)) {
      if ((baris + ' ' + kata).trim().length > maks) {
        if (baris) hasil.push(baris);
        baris = kata;
      } else baris = (baris + ' ' + kata).trim();
    }
    hasil.push(baris);
  }
  return hasil;
}

/*
  dok: {
    judul, nomor?, penerbit?, tanggal?,
    bagian: [{ judul?, isi: 'teks' | ['poin', ...] }]  atau
    baris:  [['Label', 'Nilai'], ...]
  }
*/
export function buatPdf(dok) {
  const W = 595, H = 842, M = 56; // A4 dalam satuan point
  const halaman = [[]];
  let y = H - M;
  const tulis = (teks, { ukuran = 10.5, tebal = false, jarak = 4, x = M, maks = 92 } = {}) => {
    for (const b of bungkus(teks, maks)) {
      if (y < M + ukuran) {
        halaman.push([]);
        y = H - M;
      }
      halaman.at(-1).push(`BT /${tebal ? 'F2' : 'F1'} ${ukuran} Tf ${x} ${y.toFixed(1)} Td (${escapePdf(b)}) Tj ET`);
      y -= ukuran + jarak;
    }
  };
  const garis = () => {
    halaman.at(-1).push(`${M} ${y.toFixed(1)} m ${W - M} ${y.toFixed(1)} l 0.6 w 0 0.19 0.47 RG S`);
    y -= 14;
  };

  // Kop surat
  tulis('PEMERINTAH PROVINSI SULAWESI UTARA', { ukuran: 9, tebal: true, jarak: 2 });
  tulis('DINAS PENDIDIKAN DAERAH • SIKARYA', { ukuran: 9, jarak: 8 });
  garis();
  tulis(dok.judul, { ukuran: 15, tebal: true, jarak: 6, maks: 60 });
  const meta = [dok.nomor && `Nomor: ${dok.nomor}`, dok.penerbit, dok.tanggal].filter(Boolean).join('  •  ');
  if (meta) tulis(meta, { ukuran: 9, jarak: 10 });
  y -= 6;

  for (const [label, nilai] of dok.baris ?? []) {
    tulis(`${label}:`, { ukuran: 9, tebal: true, jarak: 1 });
    tulis(String(nilai), { jarak: 8 });
  }
  for (const b of dok.bagian ?? []) {
    if (b.judul) tulis(b.judul, { ukuran: 11.5, tebal: true, jarak: 6 });
    const isi = Array.isArray(b.isi) ? b.isi : [b.isi];
    isi.forEach((p, i) =>
      Array.isArray(b.isi) ? tulis(`${i + 1}.  ${p}`, { x: M + 6, maks: 88 }) : tulis(p, { jarak: 5 })
    );
    y -= 8;
  }
  y = Math.min(y, M + 40);
  tulis(`Dokumen dibuat otomatis oleh SIKARYA pada ${new Date().toLocaleString('id-ID')}.`, { ukuran: 8, jarak: 2 });

  // Rakit objek PDF
  const objek = [];
  const tambah = (s) => objek.push(s) && objek.length;
  const katalog = tambah('');
  const daftarHal = tambah('');
  const f1 = tambah('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
  const f2 = tambah('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');
  const kids = halaman.map((isi) => {
    const aliran = isi.join('\n');
    const c = tambah(`<< /Length ${keBytes(aliran).length} >>\nstream\n${aliran}\nendstream`);
    return tambah(`<< /Type /Page /Parent ${daftarHal} 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /Font << /F1 ${f1} 0 R /F2 ${f2} 0 R >> >> /Contents ${c} 0 R >>`);
  });
  objek[katalog - 1] = `<< /Type /Catalog /Pages ${daftarHal} 0 R >>`;
  objek[daftarHal - 1] = `<< /Type /Pages /Kids [${kids.map((k) => `${k} 0 R`).join(' ')}] /Count ${kids.length} >>`;

  let teks = '%PDF-1.4\n';
  const offset = [];
  objek.forEach((o, i) => {
    offset.push(keBytes(teks).length);
    teks += `${i + 1} 0 obj\n${o}\nendobj\n`;
  });
  const xref = keBytes(teks).length;
  teks += `xref\n0 ${objek.length + 1}\n0000000000 65535 f \n`;
  teks += offset.map((o) => `${String(o).padStart(10, '0')} 00000 n \n`).join('');
  teks += `trailer\n<< /Size ${objek.length + 1} /Root ${katalog} 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return new Blob([new Uint8Array(keBytes(teks))], { type: 'application/pdf' });
}

export const namaBerkas = (teks, ext = 'pdf') =>
  `${String(teks).replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '_').slice(0, 60) || 'dokumen'}.${ext}`;

export function unduhBlob(blob, nama) {
  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement('a'), { href: url, download: nama });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export const unduhPdf = (dok) => unduhBlob(buatPdf(dok), dok.namaFile ?? namaBerkas(dok.judul));

/* ---------------- CSV ---------------- */
export function unduhCsv(nama, kolom, baris) {
  const sel = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const isi = [kolom, ...baris].map((r) => r.map(sel).join(';')).join('\r\n');
  // BOM supaya Excel membaca huruf Indonesia dengan benar
  unduhBlob(new Blob(['﻿' + isi], { type: 'text/csv;charset=utf-8' }), nama);
}

/* ---------------- Bagikan & tautan ---------------- */
export async function bagikan({ title, text, url = window.location.href }) {
  try {
    if (navigator.share) {
      await navigator.share({ title, text, url });
      return 'shared';
    }
  } catch (e) {
    if (e?.name === 'AbortError') return 'cancelled';
  }
  await salin(url);
  return 'copied';
}

export async function salin(teks) {
  try {
    await navigator.clipboard.writeText(teks);
  } catch {
    // cadangan untuk browser lama / tanpa izin clipboard
    const t = Object.assign(document.createElement('textarea'), { value: teks });
    document.body.append(t);
    t.select();
    document.execCommand('copy');
    t.remove();
  }
}

export const bukaTautan = (url) => window.open(url, '_blank', 'noopener,noreferrer');

// Kontak resmi (dipakai tombol "Hubungi ..."). Ganti dengan nomor/alamat asli.
export const KONTAK = {
  waHelpdesk: 'https://wa.me/6281234567890?text=' + encodeURIComponent('Halo Helpdesk SIKARYA, saya butuh bantuan.'),
  emailHelpdesk: 'mailto:sikarya.dikdasulut@gmail.com?subject=' + encodeURIComponent('Bantuan SIKARYA'),
  youtube: 'https://www.youtube.com/results?search_query=dikda+sulut+sikarya',
};
