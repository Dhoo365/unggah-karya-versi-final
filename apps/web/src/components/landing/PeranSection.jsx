import { peran } from '../../data/landing.js';
import { cx } from '../../lib/cx.js';
import { Eyebrow, InkCheck, InkUnderline } from './Ink.jsx';
import Reveal from './Reveal.jsx';

export default function PeranSection() {
  return (
    <Reveal as="section" className="mx-auto max-w-[1240px] px-4 pt-20 sm:px-8 lg:pt-24">
      <div className="reveal mb-10">
        <Eyebrow>Untuk Siapa</Eyebrow>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-[44px] sm:leading-[1.1]">Satu akun, sesuai peranmu</h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {peran.map((r, i) => (
          <div key={r.judul} className="reveal" style={{ '--d': `${i * 100}ms` }}>
            <article
              className={cx('note-card rounded-[6px_18px_6px_18px] border-[1.5px] border-pen px-[22px] py-6 shadow-[4px_4px_0_var(--color-pen)]', r.latar)}
              style={{ '--tilt': `${r.miring}deg` }}
            >
              <h3 className="text-xl font-extrabold">
                <InkUnderline>{r.judul}</InkUnderline>
              </h3>
              <ul className="mt-5 space-y-3">
                {r.poin.map((p) => (
                  <li key={p} className="flex gap-2.5 text-sm leading-snug">
                    <InkCheck />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
