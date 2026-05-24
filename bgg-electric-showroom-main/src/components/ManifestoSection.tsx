import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function ManifestoSection() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    gsap.from(".m-line", {
      scrollTrigger: { trigger: ref.current, start: "top 75%" },
      opacity: 0,
      y: 32,
      duration: 0.9,
      stagger: 0.12,
      ease: "power2.out",
    });
  }, { scope: ref, revertOnUpdate: true });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-background py-28 md:py-40"
    >
      <div className="absolute inset-0 vignette opacity-60" />
      <div className="absolute inset-0 grain opacity-20" />
      <div className="relative mx-auto max-w-5xl px-6 text-center md:px-10">
        <p className="m-line font-display text-[clamp(1.8rem,4vw,3.5rem)] font-bold uppercase leading-[0.9] text-white">
          Chega de perder horas da sua vida <br className="hidden md:block" />
          nos cruzamentos de <span className="italic text-[var(--bgg-yellow)]">Caruaru</span>.
        </p>
        <p className="m-line mt-10 font-display text-2xl font-black uppercase text-[var(--bgg-yellow)] md:text-4xl">
          Acabe de vez com o estresse do trânsito.
        </p>
        <p className="m-line mt-10 mx-auto max-w-2xl text-base text-white/60 md:text-lg leading-relaxed">
          Sem CNH*, sem IPVA, sem gastar fortunas com combustível na Capital do
          Agreste. Apenas você, sua BGG e o caminho livre por toda a cidade.
        </p>
        <div className="m-line divider-industrial mx-auto mt-12 max-w-xs" />
        <p className="m-line mt-6 font-display text-xl uppercase tracking-[0.15em] text-white md:text-2xl">
          O futuro chegou
          e ele é <span className="italic text-[var(--bgg-yellow)]">elétrico.</span>
        </p>
      </div>
    </section>
  );
}