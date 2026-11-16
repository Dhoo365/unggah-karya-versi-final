import { useEffect, useRef, useState } from 'react';

/*
  Menandai elemen saat pertama kali terlihat di layar.
  Dipakai untuk animasi muncul (fade-up, garis tinta tergambar, podium naik).

  const [ref, visible] = useReveal();
  <section ref={ref} data-visible={visible}>...</section>
*/
export function useReveal(options = { threshold: 0.2 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Browser lama tanpa IntersectionObserver: langsung tampilkan
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        io.disconnect();
      }
    }, options);
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, visible];
}
