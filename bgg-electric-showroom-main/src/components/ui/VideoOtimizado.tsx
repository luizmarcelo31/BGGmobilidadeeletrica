/*
  COMPRESSÃO PENDENTE — executar antes do deploy em produção:

  Desktop (< 4MB):
  ffmpeg -i hero-videoinicial.mp4 -c:v libx264 -crf 26 -preset slow \
    -vf scale=1920:-2 -c:a aac -b:a 96k \
    public/videos/hero-videoinicial-desktop.mp4

  ffmpeg -i hero-videoprincipal.mp4 -c:v libx264 -crf 26 -preset slow \
    -vf scale=1920:-2 -c:a aac -b:a 96k \
    public/videos/hero-videoprincipal-desktop.mp4

  Mobile (< 1.5MB):
  ffmpeg -i hero-videoinicial.mp4 -c:v libx264 -crf 30 -preset slow \
    -vf scale=720:-2 -c:a aac -b:a 64k \
    public/videos/hero-videoinicial-mobile.mp4

  ffmpeg -i hero-videoprincipal.mp4 -c:v libx264 -crf 30 -preset slow \
    -vf scale=720:-2 -c:a aac -b:a 64k \
    public/videos/hero-videoprincipal-mobile.mp4

  Após gerar os arquivos, mover os originais para /src/assets/originals/
  e atualizar os caminhos nos componentes para /videos/nome-desktop.mp4
  e /videos/nome-mobile.mp4.
*/

import { useEffect, useRef, useState, type VideoHTMLAttributes } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

type VideoOtimizadoProps = {
  src: string;
  /** Versão otimizada para mobile (ex: /videos/hero-mobile.mp4) */
  srcMobile?: string;
  poster: string;
  thumbnailFallback?: string;
  className?: string;
  videoAttrs?: VideoHTMLAttributes<HTMLVideoElement>;
  onLoad?: () => void;
};

type ConnectionType = "slow-2g" | "2g" | "3g" | "4g" | "unknown";

function getConnectionType(): ConnectionType {
  const nav = navigator as Navigator & { connection?: { effectiveType: string } };
  if (nav.connection?.effectiveType) {
    const type = nav.connection.effectiveType;
    if (type === "slow-2g" || type === "2g" || type === "3g" || type === "4g") {
      return type;
    }
  }
  return "unknown";
}

export default function VideoOtimizado({
  src,
  srcMobile,
  poster,
  thumbnailFallback,
  className = "",
  videoAttrs = {},
  onLoad,
}: VideoOtimizadoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [connectionType] = useState<ConnectionType>(getConnectionType);
  const [hasError, setHasError] = useState(false);
  const isMobile = useIsMobile();

  // Lazy load via IntersectionObserver — só carrega o vídeo quando entra na viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }, // começa a carregar 200px antes de aparecer
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Slow-2g / 2g: não carrega vídeo, exibe thumbnail estática
  if (connectionType === "slow-2g" || connectionType === "2g" || hasError) {
    const thumbSrc = thumbnailFallback || poster;
    return (
      <div ref={containerRef} className={className}>
        <img
          src={thumbSrc}
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  // Escolhe versão mobile ou desktop do vídeo
  const videoSrc = isMobile && srcMobile ? srcMobile : src;

  return (
    <div ref={containerRef} className={className}>
      {shouldLoad && (
        <video
          ref={videoRef}
          /*
            Atributos obrigatórios:
            - preload="none": não pré-carrega até entrar na viewport
            - poster: frame estático enquanto não carrega
            - playsinline: evita fullscreen forçado em iOS
            - muted: necessário para autoplay
            - loop: para vídeos ambiente/background
          */
          preload="none"
          poster={poster}
          playsInline
          muted
          loop
          onError={() => {
            console.warn(`[VideoOtimizado] Erro ao carregar: ${videoSrc}`);
            setHasError(true);
          }}
          onLoadedData={() => onLoad?.()}
          className="h-full w-full object-cover"
          {...videoAttrs}
        >
          {/*
            TODO — Adicionar source H.265/HEVC quando disponível:
            <source src={videoSrc.replace(".mp4", ".hevc.mp4")} type="video/mp4; codecs=hvc1" />
          */}
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
    </div>
  );
}