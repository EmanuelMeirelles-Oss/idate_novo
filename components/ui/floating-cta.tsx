"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Megaphone } from "@phosphor-icons/react";
import { CANAL } from "@/content/site";

// Páginas onde a própria página já é o canal de denúncia — o botão flutuante
// duplicaria a ação principal em vez de complementá-la.
const ROTAS_SEM_CTA_FLUTUANTE = ["/contato", "/denuncia/nova"];

export function FloatingCTA() {
  const pathname = usePathname();
  const [visivel, setVisivel] = useState(false);
  const [rodapeVisivel, setRodapeVisivel] = useState(false);

  useEffect(() => {
    function aoRolar() {
      // Mostra o botão flutuante quando o usuário rolar mais de 400px
      if (window.scrollY > 400) {
        setVisivel(true);
      } else {
        setVisivel(false);
      }
    }

    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  useEffect(() => {
    const rodape = document.querySelector("footer");
    if (!rodape) return;

    // Some assim que o rodapé entra na tela, pra não sobrepor os links de
    // contato e o copyright no fim de cada página.
    const observer = new IntersectionObserver(
      ([entrada]) => setRodapeVisivel(entrada.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(rodape);

    return () => observer.disconnect();
  }, [pathname]);

  if (ROTAS_SEM_CTA_FLUTUANTE.includes(pathname)) return null;
  if (!visivel || rodapeVisivel) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <Link
        href={CANAL.href}
        className="group flex items-center gap-3 rounded-full border border-cobalto-claro/40 bg-noite/90 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-osso shadow-[0_10px_30px_rgba(18,54,200,0.4)] backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-cobalto-claro hover:bg-cobalto hover:shadow-[0_10px_40px_rgba(91,124,255,0.6)]"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cobalto text-osso group-hover:bg-noite group-hover:text-cobalto-claro transition-colors">
          <Megaphone size={14} weight="bold" />
        </span>
        <span className="hidden sm:inline">{CANAL.acao}</span>
        <span className="sm:hidden">Denunciar</span>
        <ArrowRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  );
}
