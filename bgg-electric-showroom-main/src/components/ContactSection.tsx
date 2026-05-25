import { useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Phone, Clock, MapPin, Check } from "lucide-react";
import {
  motorcycles,
  whatsappLink,
  WHATSAPP_DISPLAY,
} from "@/data/motorcycles";

/** Sanitiza string para uso seguro em texto — remove tags HTML e trim */
function sanitize(v: string): string {
  return v.replace(/<[^>]*>/g, "").trim();
}

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [model, setModel] = useState(motorcycles[0].name);

  useGSAP(() => {
    if (!ref.current) return;

    gsap.from(".contact-fade", {
      scrollTrigger: { trigger: ref.current, start: "top 75%" },
      opacity: 0,
      y: 24,
      duration: 0.7,
      stagger: 0.06,
      ease: "power2.out",
    });
  }, { scope: ref, revertOnUpdate: true });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Olá BGG! Meu nome é ${sanitize(name) || "—"}. Meu WhatsApp: ${sanitize(phone) || "—"}. Tenho interesse no modelo: ${sanitize(model)}. Quero falar com um consultor.`;
    window.open(whatsappLink(msg), "_blank");
  };

  return (
    <section
      ref={ref}
      id="contato"
      className="relative bg-[var(--surface)] py-24 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 grain opacity-30" />
      <div className="mx-auto max-w-7xl px-6 md:px-10 relative z-10">
        <div className="contact-fade flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-white/60">
          <span className="h-px w-10 bg-[var(--bgg-yellow)]" />
          Contato
        </div>
        <h2 className="contact-fade mt-3 font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-black uppercase text-white leading-[0.85]">
          Marque um <span className="italic text-[var(--bgg-yellow)]">test-drive</span>.
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="contact-fade space-y-6">
            <div className="aspect-[16/10] overflow-hidden border border-white/[0.06]">
              <iframe
                title="Mapa Caruaru"
                src="https://www.google.com/maps?q=Caruaru,Pernambuco&output=embed"
                className="h-full w-full grayscale"
                loading="lazy"
              />
            </div>
            <div className="grid grid-cols-1 gap-px bg-white/[0.04] sm:grid-cols-3">
              <InfoBlock
                icon={MapPin}
                title="Localização"
                value="Caruaru · PE"
              />
              <InfoBlock
                icon={Phone}
                title="WhatsApp"
                value={WHATSAPP_DISPLAY}
              />
              <InfoBlock
                icon={Clock}
                title="Horário"
                value="Seg–Sáb"
              />
            </div>
          </div>

          <form
            onSubmit={submit}
            className="contact-fade flex flex-col gap-5 editorial-panel p-8 md:p-10"
          >
            <div>
              <label className="text-[10px] uppercase tracking-[0.3em] text-white/50">
                Nome
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={120}
                className="mt-2 w-full border-b border-white/[0.1] bg-transparent py-3 text-sm text-white outline-none transition-colors focus:border-[var(--bgg-yellow)]"
                placeholder="Seu nome"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-[0.3em] text-white/50">
                WhatsApp
              </label>
              <input
                type="tel"
                inputMode="numeric"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                required
                maxLength={15}
                className="mt-2 w-full border-b border-white/[0.1] bg-transparent py-3 text-sm text-white outline-none transition-colors focus:border-[var(--bgg-yellow)]"
                placeholder="(81) 9 9999-9999"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.3em] text-white/50 mb-3">
                Modelo de interesse
              </label>
              <div className="flex flex-col gap-2">
                {motorcycles.map((m) => {
                  const checked = model === m.name;
                  return (
                    <label
                      key={m.id}
                      className={`flex items-center gap-3 cursor-pointer rounded border px-4 py-3 transition-colors ${
                        checked
                          ? "border-[var(--bgg-yellow)] bg-[var(--bgg-yellow)]/5"
                          : "border-white/[0.08] hover:border-white/20"
                      }`}
                    >
                      <span
                        className={`inline-flex items-center justify-center w-5 h-5 rounded border transition-colors shrink-0 ${
                          checked
                            ? "border-[var(--bgg-yellow)] bg-[var(--bgg-yellow)]"
                            : "border-white/20 bg-transparent"
                        }`}
                      >
                        {checked && (
                          <Check className="h-3 w-3 text-[#050505]" strokeWidth={3} />
                        )}
                      </span>
                      <input
                        type="radio"
                        name="modelo"
                        value={m.name}
                        checked={checked}
                        onChange={() => setModel(m.name)}
                        className="sr-only"
                      />
                      <span className="text-sm font-medium text-white">{m.name}</span>
                    </label>
                  );
                })}
              </div>
            </div>
            <button
              type="submit"
              className="btn-mechanical mt-2 w-full justify-center py-4"
            >
              Quero falar com um consultor
            </button>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/35 text-center">
              Ao enviar, abriremos seu WhatsApp com a mensagem pronta.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function InfoBlock({
  icon: Icon,
  title,
  value,
}: {
  icon: typeof Phone;
  title: string;
  value: string;
}) {
  return (
    <div className="editorial-panel p-5">
      <Icon className="h-3.5 w-3.5 text-[var(--bgg-yellow)]" />
      <div className="mt-3 text-[10px] uppercase tracking-[0.3em] text-white/50">
        {title}
      </div>
      <div className="mt-1 font-display text-lg font-bold text-white leading-[0.9]">
        {value}
      </div>
    </div>
  );
}