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
import whatsappLogo from "@/assets/public/brand/whatsapp-logo.svg";
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

      {/* Floating WhatsApp — só o logo, tamanho do antigo botão pill (~48px) */}
      <a
        href={whatsappLink("Olá BGG! Vim do site.")}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-5 z-30 block transition-transform hover:scale-105 active:scale-95"
      >
        <img
          src={whatsappLogo}
          alt=""
          width={48}
          height={48}
          className="h-12 w-12 drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]"
        />
      </a>
    </div>
  );
}