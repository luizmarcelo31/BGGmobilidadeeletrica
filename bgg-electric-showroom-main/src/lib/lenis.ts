import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let lenisInstance: Lenis | null = null;
let tickerFn: gsap.TickerCallback | null = null;

export function initLenis() {
  if (typeof window === "undefined") return null;
  if (lenisInstance) return lenisInstance;

  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({
    duration: 0.8,
    smoothWheel: true,
    wheelMultiplier: 0.7,
    touchMultiplier: 0.9,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -8 * t)),
  });

  // Vincula o ScrollTrigger ao wrapper do Lenis — evita "Invalid scope"
  // que ocorre quando o ScrollTrigger procura elementos no scroller padrão
  // (window) em vez do wrapper de scroll suave do Lenis.
  ScrollTrigger.defaults({ scroller: (lenis as any).wrapper as HTMLElement });

  lenis.on("scroll", () => ScrollTrigger.update());

  tickerFn = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(tickerFn);
  gsap.ticker.lagSmoothing(0);

  lenisInstance = lenis;

  window.addEventListener("load", () => ScrollTrigger.refresh());

  return lenis;
}

export function destroyLenis() {
  if (tickerFn) {
    gsap.ticker.remove(tickerFn);
    tickerFn = null;
  }
  lenisInstance?.destroy();
  lenisInstance = null;
}

export function getLenis() {
  return lenisInstance;
}

export function scrollToSection(target: string | HTMLElement, offset = 0) {
  lenisInstance?.scrollTo(target, {
    offset,
    duration: 1.4,
    easing: (t: number) =>
      t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2, // easeInOutCubic
  });
}

export function stopLenis() {
  lenisInstance?.stop();
}

export function startLenis() {
  lenisInstance?.start();
}