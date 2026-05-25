import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Clock, Phone, Calendar, CheckCircle2 } from "lucide-react";
import aboutShowroomImg from "@/assets/public/A2.webp";
import { whatsappLink, WHATSAPP_DISPLAY } from "@/data/motorcycles";

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    gsap.from(".about-fade", {
      scrollTrigger: { trigger: ref.current, start: "top 75%" },
      opacity: 0,
      y: 28,
      duration: 0.8,
      stagger: 0.08,
      ease: "power2.out",
    });
  }, { scope: ref, revertOnUpdate: true });

  const isOpen = (() => {
    const d = new Date();
    const day = d.getDay();
    const h = d.getHours();
    if (day === 0) return false;
    if (day === 6) return h >= 8 && h < 13;
    return h >= 8 && h < 18;
  })();

  return (
    <section
      ref={ref}
      id="sobre"
      className="relative overflow-hidden bg-background py-24 md:py-32"
    >
      <div className="absolute inset-0 grain opacity-20" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 md:px-10 lg:grid-cols-12 relative z-10">
        <div className="lg:col-span-7">
          <div className="about-fade flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/60">
            <span className="h-px w-10 bg-[var(--bgg-yellow)]" />
            Quem somos
          </div>
          <h2 className="about-fade mt-3 font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-black uppercase text-white leading-[0.85]">
            Autoridade regional <br />
            em <span className="italic text-[var(--bgg-yellow)]">Pernambuco</span>.
          </h2>
          <p className="about-fade mt-8 max-w-xl text-base text-white/60 md:text-lg leading-relaxed">
            Nascida em Pernambuco e com operação em Caruaru, a BGG Mobilidade
            Elétrica lidera a transição rumo a um transporte urbano
            inteligente, veloz e sustentável no Agreste.
          </p>
          <ul className="about-fade mt-10 space-y-3">
            {[
              "Showroom oficial em Caruaru",
              "Atendimento consultivo",
              "Pós-venda próximo",
              "Assistência especializada",
              "Test-drive presencial",
            ].map((s) => (
              <li key={s} className="flex items-center gap-3 text-white/75 text-sm">
                <CheckCircle2 className="h-3.5 w-3.5 text-[var(--bgg-yellow)]" />
                {s}
              </li>
            ))}
          </ul>

          <div className="about-fade mt-10 overflow-hidden border border-white/[0.06]">
            <img
              src={aboutShowroomImg}
              alt="Showroom BGG em Caruaru"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="about-fade lg:col-span-5">
          <div className="editorial-panel p-8">
            <div className="flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${
                  isOpen ? "bg-[var(--bgg-yellow)]" : "bg-white/30"
                }`}
              />
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/60">
                {isOpen ? "Concessionária aberta" : "Horário encerrado"}
              </span>
            </div>
            <div className="divider-industrial my-5" />
            <h3 className="font-display text-3xl font-black uppercase text-white leading-[0.9]">
              Showroom BGG <br />
              <span className="italic text-[var(--bgg-yellow)]">Caruaru / PE</span>
            </h3>

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-3.5 w-3.5 text-[var(--bgg-yellow)]" />
                <div className="text-sm text-white/75">
                  <div>Seg–Sex: 08h às 18h</div>
                  <div>Sábado: 08h às 13h</div>
                  <div className="text-white/35">Domingo: fechado</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-3.5 w-3.5 text-[var(--bgg-yellow)]" />
                <a
                  href={whatsappLink("Olá! Quero falar com a BGG.")}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-white/85 hover:text-[var(--bgg-yellow)] transition-colors"
                >
                  {WHATSAPP_DISPLAY}
                </a>
              </div>
            </div>

            <a
              href={whatsappLink(
                "Olá! Quero agendar um test-drive da BGG em Caruaru.",
              )}
              target="_blank"
              rel="noreferrer"
              className="mt-8 btn-mechanical w-full justify-center"
            >
              <Calendar className="h-3.5 w-3.5" />
              Agendar test-drive
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}