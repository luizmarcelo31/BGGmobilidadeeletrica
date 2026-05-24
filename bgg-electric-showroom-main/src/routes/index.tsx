import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplashScreen from "@/components/SplashScreen";
import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import CinematicShowroom from "@/components/CinematicShowroom";
import BenefitsSection from "@/components/BenefitsSection";
import AboutSection from "@/components/AboutSection";
import ManifestoSection from "@/components/ManifestoSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { initLenis, destroyLenis, startLenis } from "@/lib/lenis";
import whatsappIcon from "@/assets/public/brand/whatsapp-cta.svg";
import { whatsappLink } from "@/data/motorcycles";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BGG Mobilidade Elétrica | Scooters Elétricas em Caruaru, PE" },
      {
        name: "description",
        content:
          "Showroom premium de scooters e motos elétricas em Caruaru, Pernambuco. Sem IPVA. Sem combustível. Agende seu test-drive.",
      },
      { property: "og:title", content: "BGG Mobilidade Elétrica | Scooters Elétricas em Caruaru, PE" },
      {
        property: "og:description",
        content: "Mobilidade elétrica premium no Agreste. Agende seu test-drive em Caruaru.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [showSplash, setShowSplash] = useState(true);

  // Inicializa o Lenis pausado (splash está ativa) e destrói no unmount.
  // Isso evita que o ticker do GSAP acumule em hot-reload / SPA navigation.
  useEffect(() => {
    const lenis = initLenis();
    lenis?.stop(); // trava scroll enquanto splash estiver visível
    return () => destroyLenis();
  }, []);

  // Quando a splash sai: refresha os triggers (DOM agora tem altura real)
  // e só então libera o Lenis — evita que o usuário role antes dos
  // ScrollTriggers medirem as posições corretas.
  useEffect(() => {
    if (!showSplash) {
      const t = setTimeout(() => {
        ScrollTrigger.refresh();
        startLenis();
      }, 120); // 120ms: aguarda o unmount da splash e o repaint
      return () => clearTimeout(t);
    }
  }, [showSplash]);

  return (
    <div className="relative bg-background text-foreground min-h-[100dvh]">
      {showSplash && <SplashScreen onEnter={() => setShowSplash(false)} />}
      <SiteHeader />
      <main>
        <HeroSection />
        <CinematicShowroom />
        <BenefitsSection />
        <AboutSection />
        <ManifestoSection />
        <ContactSection />
      </main>
      <Footer />

      {/* Floating WhatsApp — estilo secundário para não competir com CTA primário da hero */}
      <a
        href={whatsappLink("Olá BGG! Vim do site.")}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-[env(safe-area-inset-bottom,1.5rem)] right-5 z-30 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/80 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/80 backdrop-blur-md transition-all hover:border-[var(--bgg-yellow)] hover:text-[var(--bgg-yellow)]"
      >
        <img src={whatsappIcon} alt="" className="h-5 w-5" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </div>
  );
}