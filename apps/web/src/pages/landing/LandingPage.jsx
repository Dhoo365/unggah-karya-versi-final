import LandingNav from '../../components/landing/LandingNav.jsx';
import HeroSection from '../../components/landing/HeroSection.jsx';
import JadwalSection from '../../components/landing/JadwalSection.jsx';
import AlurSection from '../../components/landing/AlurSection.jsx';
import PodiumSection from '../../components/landing/PodiumSection.jsx';
import PeranSection from '../../components/landing/PeranSection.jsx';
import FaqSection from '../../components/landing/FaqSection.jsx';
import LandingFooter from '../../components/landing/LandingFooter.jsx';

/*
  Landing page SIKARYA (alamat "/").
  Setiap bagian ada di src/components/landing/, isinya di src/data/landing.js,
  dan ilustrasinya di src/assets/landing/.
*/
export default function LandingPage() {
  return (
    <div className="landing overflow-x-clip bg-surface text-ink">
      <LandingNav />
      <main>
        <HeroSection />
        <JadwalSection />
        <AlurSection />
        <PodiumSection />
        <PeranSection />
        <FaqSection />
      </main>
      <LandingFooter />
    </div>
  );
}
