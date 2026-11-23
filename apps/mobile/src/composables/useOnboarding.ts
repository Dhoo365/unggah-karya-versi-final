import { useIonRouter, useBackButton } from '@ionic/vue';

/**
 * Semua rute onboarding di satu tempat, supaya tidak ada lagi
 * '/onboarding2' vs '/onboarding/2' yang saling tidak cocok.
 */
export const ROUTES = {
  slides: ['/onboarding', '/onboarding2', '/onboarding3'],
  // Halaman login umum belum ada di router, sementara pakai /loginjuri.
  login: '/loginjuri',
  register: '/pilihakun',
  // Halaman juknis belum ada; ganti ke '/juknis' setelah halamannya dibuat.
  guest: '/loginjuri',
} as const;

/** Tujuan tiap kartu di halaman Pilih Akun. Ganti setelah halaman daftar dibuat. */
export const ROLE_ROUTES: Record<string, string> = {
  siswa: '/berandasiswa',
  guru: '/berandaguru',
  juri: '/loginjuri',
};

const DONE_KEY = 'sikarya:onboarding-done';

export function isOnboardingDone(): boolean {
  try {
    return localStorage.getItem(DONE_KEY) === '1';
  } catch {
    return false;
  }
}

export function markOnboardingDone(): void {
  try {
    localStorage.setItem(DONE_KEY, '1');
  } catch {
    /* storage tidak tersedia, abaikan */
  }
}

/** Mencegah tombol tertekan dua kali (double tap) saat animasi transisi. */
export function useTapGuard(delay = 450) {
  let last = 0;
  return (fn: () => void) => {
    const now = Date.now();
    if (now - last < delay) return;
    last = now;
    fn();
  };
}

type Dir = 'forward' | 'back' | 'root';
type Action = 'push' | 'replace';

/** Navigasi dengan animasi Ionic yang benar (maju/mundur/root). */
export function useNav() {
  const ionRouter = useIonRouter();
  const guard = useTapGuard();

  const go = (path: string, dir: Dir = 'forward', action: Action = 'push') =>
    guard(() => ionRouter.navigate(path, dir, action));

  /** Kembali ke halaman sebelumnya; kalau tidak ada riwayat, pakai fallback. */
  const back = (fallback: string) =>
    guard(() => {
      if (ionRouter.canGoBack()) ionRouter.back();
      else ionRouter.navigate(fallback, 'back', 'replace');
    });

  return { ionRouter, guard, go, back };
}

/**
 * Logika tombol untuk slide onboarding ke-`step` (1-based):
 * lanjut, kembali, lewati, klik titik (dots), swipe kiri/kanan,
 * dan tombol back fisik Android.
 */
export function useOnboarding(step: number) {
  const { ionRouter, guard } = useNav();
  const total = ROUTES.slides.length;

  const goTo = (n: number) =>
    guard(() => {
      if (n === step || n < 1 || n > total) return;
      const forward = n > step;
      if (!forward && n === step - 1 && ionRouter.canGoBack()) {
        ionRouter.back();
      } else {
        ionRouter.navigate(ROUTES.slides[n - 1], forward ? 'forward' : 'back', forward ? 'push' : 'replace');
      }
    });

  /** Selesai onboarding: tandai sudah dilihat lalu buka tujuan. */
  const finish = (path: string, keepHistory = false) =>
    guard(() => {
      markOnboardingDone();
      if (keepHistory) ionRouter.navigate(path, 'forward', 'push');
      else ionRouter.navigate(path, 'root', 'replace');
    });

  const next = () => (step < total ? goTo(step + 1) : finish(ROUTES.login));
  const prev = () => goTo(step - 1);
  const skip = () => finish(ROUTES.login);

  // Tombol back fisik Android: mundur satu slide, di slide 1 pakai perilaku bawaan.
  useBackButton(10, (processNextHandler) => {
    if (step > 1) prev();
    else processNextHandler();
  });

  // Swipe horizontal: kiri = lanjut, kanan = kembali.
  let x0 = 0;
  let y0 = 0;
  const onTouchStart = (e: TouchEvent) => {
    x0 = e.changedTouches[0].clientX;
    y0 = e.changedTouches[0].clientY;
  };
  const onTouchEnd = (e: TouchEvent) => {
    const dx = e.changedTouches[0].clientX - x0;
    const dy = e.changedTouches[0].clientY - y0;
    if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    if (dx < 0 && step < total) next();
    else if (dx > 0) prev();
  };

  return { total, current: step, next, prev, goTo, skip, finish, onTouchStart, onTouchEnd };
}
