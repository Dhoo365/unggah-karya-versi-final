import { useState } from 'react';
import { IoAddOutline, IoRemoveOutline } from 'react-icons/io5';
import { faq } from '../../data/landing.js';
import { cx } from '../../lib/cx.js';
import { Eyebrow } from './Ink.jsx';
import Reveal from './Reveal.jsx';

export default function FaqSection() {
  const [buka, setBuka] = useState(0); // indeks pertanyaan yang terbuka, -1 = semua tertutup

  return (
    <Reveal as="section" id="faq" className="mx-auto grid max-w-[1240px] scroll-mt-6 gap-10 px-4 pt-20 sm:px-8 lg:grid-cols-[380px_1fr] lg:gap-16 lg:pt-24">
      <div className="reveal">
        <Eyebrow>Pertanyaan</Eyebrow>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-[44px] sm:leading-[1.1]">Yang sering ditanyakan</h2>
        <p className="mt-4 leading-relaxed text-muted">Belum terjawab? Hubungi helpdesk dinas pendidikan di kabupaten/kotamu.</p>
      </div>

      <div className="reveal border-t-[1.5px] border-pen">
        {faq.map((f, i) => {
          const open = buka === i;
          return (
            <div key={f.t} className="border-b border-dashed border-line">
              <button
                type="button"
                onClick={() => setBuka(open ? -1 : i)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-extrabold sm:text-lg"
              >
                {f.t}
                <span className={cx('grid size-[30px] shrink-0 place-items-center rounded-full border-[1.5px] border-pen transition-colors', open && 'bg-gold')}>
                  {open ? <IoRemoveOutline className="size-4" /> : <IoAddOutline className="size-4" />}
                </span>
              </button>
              <div className={cx('grid transition-[grid-template-rows] duration-300', open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
                <p className="overflow-hidden pr-10 text-[15px] leading-relaxed text-muted">
                  <span className="block pb-5">{f.j}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Reveal>
  );
}
