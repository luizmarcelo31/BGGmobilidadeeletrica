import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ChevronRight, Calendar } from "lucide-react";
import { motorcycles, whatsappLink } from "@/data/motorcycles";

// CRÍTICO: registrar plugins no escopo do módulo, fora de qualquer componente.
// Sem isso, ScrollTrigger.create() lança "_context2 is not a function"
// e o useGSAP não consegue integrar com o sistema interno do GSAP.
gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function CinematicShowroom() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useGSAP(
    () => {
      if (!sectionRef.current || isMobile) return;

      const section = sectionRef.current;
      const slides = section.querySelectorAll<HTMLElement>(".motorcycle-slide");
      if (!slides.length) return;

      gsap.set(slides, { autoAlpha: 0 });
      gsap.set(slides[0], { autoAlpha: 1 });

      const total = slides.length;
      const distance = (total - 1) * window.innerHeight;

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${distance}`,
        pin: true,
        scrub: true,
        snap: {
          snapTo: (v: number) => Math.round(v * (total - 1)) / (total - 1),
          duration: { min: 0.3, max: 0.6 },
          delay: 0.05,
          ease: "power2.inOut",
        },
        onUpdate: (self) => {
          const idx = Math.round(self.progress * (total - 1));
          setActive(idx);
          slides.forEach((s, i) => {
            gsap.to(s, {
              autoAlpha: i === idx ? 1 : 0,
              duration: 0.5,
              overwrite: true,
            });
          });
        },
      });
      // Não retornar função de cleanup aqui: revertOnUpdate já cuida disso.
      // Retornar cleanup manual junto com revertOnUpdate causa dupla-limpeza
      // e o erro "_context2 is not a function" em alguns bundlers.
    },
    { scope: sectionRef, dependencies: [isMobile], revertOnUpdate: true },
  );

  if (isMobile) {
    return (
      <section id="modelos" className="relative bg-background py-16">
        <div className="px-4">
          <SectionHeader />
        </div>
        <div className="mt-10 space-y-6 px-4">
          {motorcycles.map((m, i) => (
            <MotorcycleCardAnimado key={m.id} m={m} index={i} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="modelos"
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-background"
    >
      <div className="absolute inset-x-0 top-0 z-30 px-6 pt-24 md:px-12">
        <SectionHeader inline />
      </div>

      <div>
        {motorcycles.map((m, i) => (
          <div key={m.id} className="motorcycle-slide absolute inset-0">
            <MotorcycleSlide m={m} active={i === active} />
          </div>
        ))}
      </div>

      {/* Indicadores de slide */}
      <div className="absolute right-6 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-3 md:right-10">
        {motorcycles.map((m, i) => (
          <div key={m.id} className="flex items-center gap-3">
            <span
              className={`text-[10px] uppercase tracking-[0.25em] transition-colors ${
                i === active ? "text-[var(--bgg-yellow)]" : "text-white/30"
              }`}
            >
              0{i + 1}
            </span>
            <span
              className={`block h-8 w-px transition-colors ${
                i === active ? "bg-[var(--bgg-yellow)]" : "bg-white/15"
              }`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------

function SectionHeader({ inline = false }: { inline?: boolean }) {
  return (
    <div className={inline ? "" : "px-5 md:px-12"}>
      <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/60">
        <span className="h-px w-10 bg-[var(--bgg-yellow)]" />
        Showroom · 03 modelos
      </div>
      <h2 className="mt-3 pb-2 font-display text-3xl font-black uppercase text-white md:text-6xl leading-[0.85]">
        Escolha a sua{" "}
        <span className="italic text-[var(--bgg-yellow)]">BGG</span>.
      </h2>
    </div>
  );
}

// ---------------------------------------------------------------------------

function MotorcycleSlide({
  m,
  active,
}: {
  m: (typeof motorcycles)[number];
  active: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!active || !rootRef.current) return;

      const root = rootRef.current;
      const slideImg = root.querySelector<HTMLElement>(".slide-img");
      const slideWords = root.querySelectorAll<HTMLElement>(".slide-word");
      const slideFades = root.querySelectorAll<HTMLElement>(".slide-fade");
      const slideContent = root.querySelector<HTMLElement>(".slide-content");

      if (!slideImg || !slideWords.length) return;

      // Não é necessário matar a timeline manualmente aqui.
      // revertOnUpdate reverte e recria tudo automaticamente a cada dependência alterada.
      const tl = gsap.timeline();
      const enterDuration = 1.15;

      tl.from(slideImg, {
        opacity: 0,
        scale: 1.03,
        x: 28,
        duration: enterDuration,
        ease: "power3.out",
        clearProps: "will-change",
      }, 0)
        .from(
          slideWords,
          {
            yPercent: 110,
            duration: enterDuration,
            stagger: 0.1,
            ease: "power3.out",
            clearProps: "will-change",
          },
          0,
        )
        .from(
          slideFades,
          {
            y: 16,
            opacity: 0,
            duration: 0.5,
            stagger: 0.06,
            ease: "power2.out",
          },
          "-=0.6",
        )
        .from(
          slideContent,
          {
            opacity: 0,
            x: -40,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.8",
        );
    },
    { scope: rootRef, dependencies: [active, m.id], revertOnUpdate: true },
  );

  return (
    <div ref={rootRef} className="relative h-full w-full flex">
      {/* Painel de conteúdo — mobile: ocupa tudo + pt-0 (header já está fora), desktop: lado esquerdo com pt-56 */}
      <div className="relative z-10 flex w-full flex-col justify-start bg-[#050505] px-5 pb-16 pt-0 md:w-[40%] md:px-12 md:pt-56 lg:px-16">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-r from-transparent to-[#050505] md:w-32" />
        <div className="pointer-events-none absolute inset-0 atmospheric-glow-left" />

        <div className="slide-content relative z-10 max-w-lg">
          <div className="slide-fade text-[10px] uppercase tracking-[0.3em] text-[var(--bgg-yellow)]">
            {m.category}
          </div>

          <h3 className="mt-3 font-display text-[clamp(2.5rem,5vw,5.5rem)] font-black uppercase leading-none text-white">
            {m.name.split(" ").map((w, i) => (
              <span key={i} className="inline-block overflow-hidden leading-none align-bottom">
                <span className="slide-word mr-3 inline-block [will-change:transform]">
                  {w}
                </span>
              </span>
            ))}
          </h3>

          <p className="slide-fade mt-4 text-base text-white/60 md:text-lg leading-relaxed max-w-sm">
            {m.description}
          </p>

          <div className="slide-fade mt-8 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-white/10 pt-6">
            <Stat label="Autonomia" value={m.range} />
            <Stat label="Velocidade" value={m.topSpeed} />
            <Stat label="Bateria" value={m.battery} />
            <Stat label="Recarga" value={m.chargeTime} />
          </div>

          <div className="slide-fade mt-6 flex flex-wrap gap-2">
            {m.highlights.map((h) => (
              <span key={h} className="tag-tech">
                {h}
              </span>
            ))}
          </div>

          <div className="slide-fade mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappLink(
                `Olá! Tenho interesse na ${m.name}. Pode me passar mais informações?`,
              )}
              target="_blank"
              rel="noreferrer"
              className="btn-mechanical"
            >
              Tenho interesse
              <ChevronRight className="h-3 w-3" />
            </a>
            <a
              href={whatsappLink(
                `Olá! Quero agendar um test-drive da ${m.name} em Caruaru.`,
              )}
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
            >
              <Calendar className="h-3.5 w-3.5" />
              Agendar test-drive
            </a>
          </div>
        </div>
      </div>

      {/* Painel da imagem — mobile: abaixo do conteúdo com altura fixa, desktop: lado direito */}
      <div className="relative w-full h-[50vh] overflow-hidden md:hidden">
        <img
          src={m.image}
          alt={`${m.name} disponível na BGG Mobilidade em Caruaru PE`}
          loading="eager"
          width={1200}
          height={900}
          className="slide-img h-full w-full object-cover [will-change:transform,opacity]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
        <div className="pointer-events-none absolute inset-0 grain" />
      </div>
      <div className="relative hidden w-0 overflow-hidden md:block md:w-[63%]">
        <img
          src={m.image}
          alt={`${m.name} disponível na BGG Mobilidade em Caruaru PE`}
          loading="eager"
          width={1200}
          height={900}
          className="slide-img h-full w-full object-cover [will-change:transform,opacity]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/60" />
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/30 to-transparent" />
        </div>
        <div className="pointer-events-none absolute inset-0 grain" />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.25em] text-white/50">
        {label}
      </div>
      <div className="mt-1 font-display text-xl font-bold text-white">
        {value}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Mobile: card animado com IntersectionObserver + GSAP
// ---------------------------------------------------------------------------

function MotorcycleCardAnimado({ m, index }: { m: (typeof motorcycles)[number]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-80px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useGSAP(() => {
    if (!visible || !cardRef.current) return;

    const card = cardRef.current;
    const img = card.querySelector<HTMLElement>(".card-img");
    const titleWords = card.querySelectorAll<HTMLElement>(".card-word");
    const fades = card.querySelectorAll<HTMLElement>(".card-fade");

    const tl = gsap.timeline();
    const enterDuration = 1.15;

    tl.from(img, {
      opacity: 0,
      scale: 1.03,
      x: 24,
      duration: enterDuration,
      ease: "power3.out",
      clearProps: "will-change",
    }, 0)
      .from(
        titleWords,
        {
          yPercent: 110,
          duration: enterDuration,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "will-change",
        },
        0,
      )
      .from(
        fades,
        {
          y: 14,
          opacity: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: "power2.out",
        },
        "-=0.5",
      );
  }, { scope: cardRef, dependencies: [visible], revertOnUpdate: true });

  return (
    <article ref={cardRef} className="editorial-panel overflow-hidden">
      {/* ── BLOCO IMAGEM ── */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <img
          src={m.image}
          alt={`${m.name} disponível na BGG Mobilidade em Caruaru PE`}
          loading="lazy"
          width={800}
          height={600}
          className="card-img h-full w-full object-cover [will-change:transform,opacity]"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-black/50 to-transparent" />
        <div className="pointer-events-none absolute inset-0 grain" />

        <div className="absolute top-4 left-4 z-10 border border-[var(--bgg-yellow)]/30 bg-black/60 px-2.5 py-1 text-[9px] uppercase tracking-[0.3em] text-[var(--bgg-yellow)]">
          {m.category}
        </div>

        <div className="absolute top-4 right-4 z-10 font-mono text-[10px] text-white/30 tracking-widest">
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10 px-5 pb-5 pt-10">
          <h3 className="font-display text-[clamp(2rem,7vw,2.8rem)] font-black uppercase leading-none text-white">
            {m.name.split(" ").map((w, j) => (
              <span key={j} className="inline-block overflow-hidden align-bottom">
                <span className="card-word mr-2 inline-block [will-change:transform]">{w}</span>
              </span>
            ))}
          </h3>
        </div>
      </div>

      {/* ── BLOCO CONTEÚDO ── */}
      <div className="bg-[#0B0B0B] px-5 pt-4 pb-6">
        <p className="card-fade mb-5 text-sm text-white/55 leading-relaxed">
          {m.description}
        </p>

        <div className="card-fade divider-industrial mb-4" />

        <div className="card-fade grid grid-cols-2 gap-x-6 gap-y-4">
          <Stat label="Autonomia" value={m.range} />
          <Stat label="Velocidade" value={m.topSpeed} />
          <Stat label="Bateria" value={m.battery} />
          <Stat label="Recarga" value={m.chargeTime} />
        </div>

        <div className="card-fade mt-4 flex flex-wrap gap-1.5">
          {m.highlights.map((h) => (
            <span key={h} className="tag-tech">
              {h}
            </span>
          ))}
        </div>

        <div className="card-fade mt-5 flex flex-col gap-2">
          <a
            href={whatsappLink(`Olá! Tenho interesse na ${m.name}.`)}
            target="_blank"
            rel="noreferrer"
            className="btn-mechanical w-full justify-center min-h-[44px]"
          >
            Tenho interesse
            <ChevronRight className="h-3 w-3" />
          </a>
          <a
            href={whatsappLink(
              `Olá! Quero agendar um test-drive da ${m.name} em Caruaru.`,
            )}
            target="_blank"
            rel="noreferrer"
            className="btn-outline w-full justify-center min-h-[44px]"
          >
            <Calendar className="h-3.5 w-3.5" />
            Agendar test-drive
          </a>
        </div>
      </div>
    </article>
  );
}

// ---------------------------------------------------------------------------

function MotorcycleCard({ m, index }: { m: (typeof motorcycles)[number]; index: number }) {
  return (
    <article className="editorial-panel overflow-hidden">
      {/* ── BLOCO IMAGEM ── */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <img
          src={m.image}
          alt={`${m.name} disponível na BGG Mobilidade em Caruaru PE`}
          loading="lazy"
          width={800}
          height={600}
          className="h-full w-full object-cover"
        />

        {/* Overlay gradiente */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-black/50 to-transparent" />

        {/* Grain */}
        <div className="pointer-events-none absolute inset-0 grain" />

        {/* Categoria (canto superior esquerdo) */}
        <div className="absolute top-4 left-4 z-10 border border-[var(--bgg-yellow)]/30 bg-black/60 px-2.5 py-1 text-[9px] uppercase tracking-[0.3em] text-[var(--bgg-yellow)]">
          {m.category}
        </div>

        {/* Número do modelo (canto superior direito) */}
        <div className="absolute top-4 right-4 z-10 font-mono text-[10px] text-white/30 tracking-widest">
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Título sobreposto no rodapé da imagem */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-5 pb-5 pt-10">
          <h3 className="font-display text-[clamp(2rem,7vw,2.8rem)] font-black uppercase leading-none text-white">
            {m.name.split(" ").map((w, j) => (
              <span key={j} className="inline-block overflow-hidden align-bottom">
                <span className="mr-2 inline-block">{w}</span>
              </span>
            ))}
          </h3>
        </div>
      </div>

      {/* ── BLOCO CONTEÚDO ── */}
      <div className="bg-[#0B0B0B] px-5 pt-4 pb-6">
        <p className="mb-5 text-sm text-white/55 leading-relaxed">
          {m.description}
        </p>

        <div className="divider-industrial mb-4" />

        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <Stat label="Autonomia" value={m.range} />
          <Stat label="Velocidade" value={m.topSpeed} />
          <Stat label="Bateria" value={m.battery} />
          <Stat label="Recarga" value={m.chargeTime} />
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {m.highlights.map((h) => (
            <span key={h} className="tag-tech">
              {h}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <a
            href={whatsappLink(`Olá! Tenho interesse na ${m.name}.`)}
            target="_blank"
            rel="noreferrer"
            className="btn-mechanical w-full justify-center min-h-[44px]"
          >
            Tenho interesse
            <ChevronRight className="h-3 w-3" />
          </a>
          <a
            href={whatsappLink(
              `Olá! Quero agendar um test-drive da ${m.name} em Caruaru.`,
            )}
            target="_blank"
            rel="noreferrer"
            className="btn-outline w-full justify-center min-h-[44px]"
          >
            <Calendar className="h-3.5 w-3.5" />
            Agendar test-drive
          </a>
        </div>
      </div>
    </article>
  );
}
