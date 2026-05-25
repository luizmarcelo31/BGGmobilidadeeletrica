import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { MapPin, ArrowRight } from "lucide-react";
import heroVideoInicial from "@/assets/hero-videoinicial.mp4";
import heroVideoPrincipal from "@/assets/hero-videoprincipal.mp4";
import VideoOtimizado from "@/components/ui/VideoOtimizado";

type Props = { onEnter: () => void };

export default function SplashScreen({ onEnter }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [closing, setClosing] = useState(false);

  // Trava o scroll da página enquanto a splash está montada.
  useEffect(() => {
    document.documentElement.classList.add("splash-locked");
    document.body.classList.add("splash-locked");
    return () => {
      document.documentElement.classList.remove("splash-locked");
      document.body.classList.remove("splash-locked");
    };
  }, []);

  // Preload silencioso do vídeo principal durante a splash.
  useEffect(() => {
    const controller = new AbortController();
    fetch(heroVideoPrincipal, {
      signal: controller.signal,
      priority: "low",
    }).catch(() => {});
    return () => controller.abort();
  }, []);

  // Animação de entrada
  useGSAP(() => {
    if (!rootRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.from(".splash-location", { y: 12, opacity: 0, duration: 0.6 })
      .from(
        ".splash-line",
        {
          yPercent: 110,
          duration: 1.0,
          stagger: 0.13,
          ease: "expo.out",
          clearProps: "will-change",
        },
        "-=0.2",
      )
      .from(".splash-sub",   { y: 16, opacity: 0, duration: 0.6 }, "-=0.4")
      .from(".splash-badge", { y: 10, opacity: 0, duration: 0.4, stagger: 0.06 }, "-=0.2")
      .from(".splash-cta",   { y: 12, opacity: 0, duration: 0.5 }, "-=0.2")
      .from(
        ".splash-bg",
        { scale: 1.06, duration: 2.4, ease: "power2.out", clearProps: "will-change" },
        0,
      );
  }, { scope: rootRef, revertOnUpdate: true });

  const handleEnter = () => {
    if (closing) return;
    setClosing(true);

    const tl = gsap.timeline({
      onComplete: () => onEnter(),
    });

    tl.to(".splash-content > div", {
      y: -16,
      opacity: 0,
      duration: 0.4,
      stagger: 0.04,
      ease: "power2.in",
    }).to(
      rootRef.current,
      { opacity: 0, scale: 1.04, duration: 0.7, ease: "power3.inOut" },
      "-=0.2",
    );
  };

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] overflow-hidden bg-[#050505]"
    >
      {/* Background */}
      <div className="splash-bg absolute inset-0 [will-change:transform]">
        <VideoOtimizado
          src={heroVideoInicial}
          eager
          className="absolute inset-0 h-full w-full"
          videoAttrs={{ autoPlay: true, "aria-hidden": true }}
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 vignette-heavy" />
        <div className="absolute inset-0 grain" />
        <div className="absolute inset-0 atmospheric-glow" />
      </div>

      {/*
        Layout: grid de 3 linhas
        - Linha 1 (auto): localização
        - Linha 2 (1fr): conteúdo centralizado
        - Linha 3 (auto): marca no canto inferior direito
      */}
      <div className="splash-content relative z-10 grid h-full w-full grid-rows-[auto_1fr_auto] px-6 pt-12 pb-6 md:px-16 md:pt-16 md:pb-8">

        {/* ── TOPO: Localização ── */}
        <div className="splash-location flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/70">
          <MapPin className="h-3.5 w-3.5 text-[var(--bgg-yellow)]" />
          Caruaru · Pernambuco
        </div>

        {/* ── CENTRO: Título + descrição + badges + CTA ── */}
        <div className="flex flex-col justify-center min-h-0 max-w-3xl self-center w-full">
          <h1 className="font-display text-[clamp(2.4rem,10vw,8rem)] font-black uppercase text-white leading-[1.1] -ml-0.5">
            <span className="block overflow-hidden pb-0.5">
              <span className="splash-line block [will-change:transform]">
                Caruaru não para e
              </span>
            </span>
            <span className="block overflow-hidden leading-[1.05] pb-0.5">
              <span className="splash-line block italic text-[var(--bgg-yellow)] [will-change:transform]">
                Você também não.
              </span>
            </span>
          </h1>

          <p className="splash-sub mt-5 max-w-xl text-sm md:text-base text-white/60 leading-relaxed">
            A cidade que nunca parou de crescer merece uma mobilidade à altura.
            Sem IPVA. Sem CNH*. Só você e o caminho.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {["Sem IPVA", "Sem CNH*", "Entrega em Caruaru"].map((b) => (
              <span key={b} className="splash-badge tag-tech">
                {b}
              </span>
            ))}
          </div>

          <button
            onClick={handleEnter}
            className="splash-cta btn-mechanical mt-8 md:mt-10 self-start"
          >
            Conheça nossos modelos
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* ── RODAPÉ: Marca alinhada à direita ── */}
        <div className="text-[9px] md:text-[10px] uppercase tracking-[0.5em] text-white/40 text-right self-end">
          BGG · Mobilidade Elétrica
        </div>

      </div>
    </div>
  );
}