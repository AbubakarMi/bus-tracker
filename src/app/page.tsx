import { Header } from '@/components/header';
import { Hero } from '@/components/landing/hero';
import { Features } from '@/components/landing/features';
import { About } from '@/components/landing/about';
import { MapSection } from '@/components/landing/map-section';
import { Contact } from '@/components/landing/contact';
import { Footer } from '@/components/footer';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <About />
        <MapSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
