import { cx } from '../../lib/cx.js';

/*
  Menampilkan ilustrasi SVG secara inline (bukan <img>) supaya
  bagian-bagian di dalamnya bisa dianimasikan dengan CSS.
  Pemakaian:
    import heroSvg from '../../assets/landing/hero.svg?raw';
    <Illustration svg={heroSvg} label="..." />
*/
export default function Illustration({ svg, label, className }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cx('illus [&>svg]:block [&>svg]:h-auto [&>svg]:w-full', className)}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
