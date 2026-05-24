import { whatsappLink, WHATSAPP_DISPLAY } from "@/data/motorcycles";
import whatsappIcon from "@/assets/public/brand/whatsapp-cta.svg";
import logoWebp from "@/assets/public/brand/bgg-logo.webp";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-background pb-10 pt-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 md:grid-cols-4 md:px-10">
        <div className="md:col-span-2">
          <img src={logoWebp} alt="BGG Mobilidade Elétrica" className="h-12 w-auto" />
          <p className="mt-3 max-w-sm text-sm text-white/55 leading-relaxed">
            Mobilidade elétrica em Caruaru, Pernambuco.
          </p>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">
            Navegação
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { l: "Modelos", h: "#modelos" },
              { l: "Benefícios", h: "#beneficios" },
              { l: "Quem somos", h: "#sobre" },
              { l: "Contato", h: "#contato" },
            ].map((i) => (
              <li key={i.h}>
                <a
                  href={i.h}
                  className="text-white/65 hover:text-[var(--bgg-yellow)] transition-colors"
                >
                  {i.l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">
            Atendimento
          </div>
          <a
            href={whatsappLink("Olá BGG!")}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm text-white/75 hover:text-[var(--bgg-yellow)] transition-colors"
          >
            <img src={whatsappIcon} alt="" className="h-5 w-5" />
            {WHATSAPP_DISPLAY}
          </a>
          <p className="mt-3 text-sm text-white/55">Caruaru · PE</p>
        </div>
      </div>
      <div className="divider-industrial mx-auto mt-14 max-w-7xl px-6 md:px-10" />
      <div className="mx-auto mt-6 max-w-7xl px-6 text-[10px] uppercase tracking-[0.25em] text-white/30 md:flex md:items-center md:justify-between md:px-10">
        <span>© {new Date().getFullYear()} BGG Mobilidade Elétrica</span>
        <span className="mt-2 block md:mt-0">
          *Verifique regras aplicáveis conforme categoria do veículo.
        </span>
      </div>
    </footer>
  );
}