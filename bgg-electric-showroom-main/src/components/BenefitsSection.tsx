import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import {
  Zap,
  Wallet,
  PlugZap,
  MapPin,
  Sparkles,
  VolumeX,
  Wind,
} from "lucide-react";

const benefits = [
  { icon: Wallet, title: "0 IPVA*", desc: "Economia real que cabe no bolso todo mês." },
  { icon: Zap, title: "Sem combustível", desc: "Recarga elétrica em qualquer tomada comum." },
  { icon: PlugZap, title: "Carrega em casa", desc: "Chegou, plugou. Simples assim." },
  { icon: MapPin, title: "Aqui em Caruaru", desc: "Showroom e oficina 100% local." },
  { icon: Sparkles, title: "Acabamento premium", desc: "Visual e construção de concessionária." },
  { icon: VolumeX, title: "Silêncio total", desc: "Zero ruído. Zero vibração. Zero estresse." },
  { icon: Wind, title: "Fuja do trânsito", desc: "Chega de perder tempo no trânsito." },
];

const stats = [
  { v: "R$ 0", l: "Combustível" },
  { v: "SEM IPVA", l: "Economia" },
  { v: "SUPORTE", l: "oficina própria" },
  { v: "01", l: "Loja em Caruaru" },  
];

export default function BenefitsSection() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    gsap.from(".benefit-stat", {
      scrollTrigger: { trigger: ".benefit-stats", start: "top 85%" },
      opacity: 0,
      y: 24,
      duration: 0.7,
      stagger: 0.08,
      ease: "power2.out",
    });
    gsap.from(".benefit-card", {
      scrollTrigger: { trigger: ".benefit-grid", start: "top 85%" },
      opacity: 0,
      y: 28,
      duration: 0.6,
      stagger: 0.06,
      ease: "power2.out",
    });
  }, { scope: ref, revertOnUpdate: true });

  return (
    <section
      ref={ref}
      id="beneficios"
      className="relative bg-[var(--surface)] py-16 md:py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 grain opacity-30" />
      <div className="mx-auto max-w-7xl px-5 md:px-10 relative z-10">
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/60">
          <span className="h-px w-10 bg-[var(--bgg-yellow)]" />
          Por que BGG
        </div>
        <h2 className="mt-3 max-w-4xl font-display text-[clamp(2.5rem,5.5vw,5rem)] font-black uppercase text-white leading-[0.85]">
          Menos gasto. <span className="italic text-[var(--bgg-yellow)]">Mais caminho.</span>
        </h2>

        <div className="benefit-stats mt-16 grid grid-cols-2 gap-px bg-white/[0.04] md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.l}
              className={`benefit-stat bg-[var(--surface)] p-5 md:p-8 ${i < stats.length - 1 ? "" : ""}`}
            >
              <div className="font-display text-2xl font-black text-[var(--bgg-yellow)] md:text-4xl lg:text-5xl">
                {s.v}
              </div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.25em] text-white/50">
                {s.l}
              </div>
            </div>
          ))}
        </div>

        <div className="divider-industrial mt-16" />

        <div className="benefit-grid grid grid-cols-1 gap-px bg-white/[0.04] sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="benefit-card editorial-panel p-6 md:p-8 lg:p-10"
              >
                <div className="flex items-center gap-4">
                  <span className="text-[0.6rem] uppercase tracking-[0.15em] text-white/30 font-mono">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-white/[0.06]" />
                </div>
                <Icon className="mt-6 h-6 w-6 text-[var(--bgg-yellow)]" strokeWidth={1.2} />
                <h3 className="mt-5 font-display text-2xl font-bold uppercase text-white leading-[0.9]">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm text-white/55 leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}