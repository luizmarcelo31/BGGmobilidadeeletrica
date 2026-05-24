import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { scrollToSection } from "@/lib/lenis";
import whatsappIcon from "@/assets/public/brand/whatsapp-cta.svg";
import { whatsappLink } from "@/data/motorcycles";
import logoWebp from "@/assets/public/brand/bgg-logo.webp";

const links = [
  { label: "Início", target: "#top" },
  { label: "Modelos", target: "#modelos" },
  { label: "Benefícios", target: "#beneficios" },
  { label: "Quem somos", target: "#sobre" },
  { label: "Contato", target: "#contato" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (t: string) => {
    setOpen(false);
    if (t === "#top") {
      scrollToSection(document.body, 0);
    } else {
      const el = document.querySelector(t) as HTMLElement | null;
      if (el) scrollToSection(el, -60);
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/[0.06] bg-[#050505]/80 backdrop-blur-lg"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <button
          onClick={() => go("#top")}
          className="flex items-center gap-2 text-left"
        >
          <img src={logoWebp} alt="BGG Mobilidade Elétrica" className="h-10 w-auto" />
        </button>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <button
              key={l.target}
              onClick={() => go(l.target)}
              className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-[var(--bgg-yellow)]"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={whatsappLink("Olá! Quero saber mais sobre as motos BGG.")}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 border border-[var(--bgg-yellow)]/30 bg-[var(--bgg-yellow)]/5 px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[var(--bgg-yellow)] transition-all hover:bg-[var(--bgg-yellow)] hover:text-black hover:border-[var(--bgg-yellow)] md:inline-flex"
          >
            <img src={whatsappIcon} alt="" className="h-4 w-4" />
            WhatsApp
          </a>
          <button
            onClick={() => setOpen((s) => !s)}
            className="rounded border border-white/15 p-2 text-white lg:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/[0.06] bg-[#050505]/95 backdrop-blur-lg lg:hidden">
          <div className="flex flex-col px-6 py-4">
            {links.map((l) => (
              <button
                key={l.target}
                onClick={() => go(l.target)}
                className="border-b border-white/5 py-4 text-left text-sm uppercase tracking-[0.2em] text-white/80"
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}