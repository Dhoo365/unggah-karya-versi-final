import { useReveal } from '../../hooks/useReveal.js';
import { cx } from '../../lib/cx.js';

/*
  Pembungkus yang memberi atribut data-visible="true" saat terlihat.
  Anak dengan class "reveal" akan muncul perlahan (lihat index.css).
*/
export default function Reveal({ as: Tag = 'div', className, children, ...props }) {
  const [ref, visible] = useReveal();
  return (
    <Tag ref={ref} data-visible={visible} className={cx('reveal-scope', className)} {...props}>
      {children}
    </Tag>
  );
}
