import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ChevronRight } from "lucide-react";
import heroVideoPrincipal from "@/assets/hero-videoprincipal.mp4";
import heroPoster from "@/assets/showroom.jpg";
import { scrollToSection } from "@/lib/lenis";
import VideoOtimizado from "@/components/ui/VideoOtimizado";

export default function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!rootRef.current) return;

    const tl = gsap.timeline({
      defaults: { ease: "power2.out" },
      delay: 0.2,
    });

    // Eyebrow — fade simples, pequeno e rápido
    tl.from(".hero-eyebrow", {
      opacity: 0,
      y: 10,
      duration: 0.6,
    })

      // Linhas do título — efeito "cortina": sobem de dentro do wrapper
      .from(
        ".hero-line",
        {
          yPercent: 110,
          duration: 1.1,
          stagger: 0.13,
          ease: "expo.out",
          clearProps: "will-change",
        },
        "-=0.25",
      )

      // Subtítulo — fade + y leve
      .from(
        ".hero-sub",
        { opacity: 0, y: 18, duration: 0.7 },
        "-=0.5",
      )

      // CTAs em cascata
      .from(
        ".hero-cta",
        { opacity: 0, y: 12, duration: 0.5, stagger: 0.1 },
        "-=0.35",
      )

      // Stats em cascata
      .from(
        ".hero-stat",
        { opacity: 0, y: 16, duration: 0.5, stagger: 0.08 },
        "-=0.2",
      )

      // Background — scale sutil, começa junto com a timeline (pos: 0)
      .from(
        ".hero-bg",
        {
          scale: 1.08,
          duration: 2.8,
          ease: "power2.out",
          clearProps: "will-change",
        },
        0,
      );
  }, { scope: rootRef, revertOnUpdate: true });

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative isolate flex min-h-screen items-center overflow-hidden"
    >
      {/* Background — will-change aplicado para criar layer GPU antecipada */}
      <div className="hero-bg absolute inset-0 -z-10 [will-change:transform]">
        <VideoOtimizado
          src={heroVideoPrincipal}
          poster={heroPoster}
          className="absolute inset-0 h-full w-full"
          videoAttrs={{ autoPlay: true, className: "h-full w-full object-cover [object-position:65%_center]" }}
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 grain" />
        <div className="absolute inset-0 vignette-heavy" />
        <div className="absolute inset-0 atmospheric-glow" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 pb-16 pt-28 md:px-16 md:pt-40">
        <div className="max-w-3xl">

          <div className="hero-eyebrow flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/60">
            <span className="h-px w-10 bg-[var(--bgg-yellow)]" />
            BGG · Caruaru / PE
          </div>

          {/*
            Cada linha é envolvida por um wrapper com overflow:hidden.
            O GSAP anima o .hero-line com yPercent:110 → 0, fazendo o
            texto "emergir de baixo" como uma cortina — efeito editorial premium.
            O wrapper não precisa de altura definida: o inline-block do span
            interno dimensiona tudo automaticamente.
          */}
          <h1 className="mt-6 font-display text-[clamp(2.2rem,8vw,6.5rem)] font-black uppercase text-white leading-[0.85]">
            <span className="block overflow-hidden">
              <span className="hero-line block [will-change:transform]">
                A nova forma
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line block italic text-[var(--bgg-yellow)] [will-change:transform]">
                de andar
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line block [will-change:transform]">
                em Caruaru.
              </span>
            </span>
          </h1>

          <p className="hero-sub mt-5 max-w-xl text-sm leading-relaxed text-white/60 md:text-base md:mt-8 md:text-lg">
            Sem combustível. Sem CNH*. Sem estresse. Performance elétrica com
            acabamento de concessionária premium, no coração do Agreste.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                const el = document.querySelector("#modelos") as HTMLElement;
                if (el) scrollToSection(el, -40);
              }}
              className="hero-cta btn-mechanical w-full md:w-auto"
            >
              Explorar modelos
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 border-t border-white/10 pt-6 md:gap-6 md:mt-16">
            {[
              { v: "0 GASOLINA", l: "Autonomia" },
              { v: "0 IPVA",     l: "Economia"  },
              { v: "Caruaru",    l: "Showroom"  },
            ].map((s) => (
              <div key={s.l} className="hero-stat">
                <div className="font-display text-xl font-bold text-[var(--bgg-yellow)] md:text-3xl">
                  {s.v}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-white/50">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}