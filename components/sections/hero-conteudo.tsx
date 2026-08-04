"use client";

import { motion, AnimatePresence, type Variants } from "motion/react";
import { CTALink } from "@/components/ui/cta-link";
import { CanvasTelemetriaPilar } from "@/components/ui/canvas-telemetria-pilar";

const CONTAINER: Variants = {
  oculto: {},
  visivel: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const SOBE: Variants = {
  oculto: { y: "110%" },
  visivel: {
    y: "0%",
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

const SURGE: Variants = {
  oculto: { opacity: 0, y: 14 },
  visivel: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const DETALHES_PILARES = {
  agua: {
    nome: "Água",
    tag: "Recurso Hídrico & Saneamento",
    descricao: "Vigila o regime de outorgas, a cobrança pelo uso dos recursos hídricos e os contratos de saneamento.",
    observatorios: "Observatório Nacional das Águas",
    svgPath: "M0 12 Q 25 4, 50 12 T 100 12 T 150 12 T 200 12",
  },
  terra: {
    nome: "Terra",
    tag: "Direito Fundiário & Mineral",
    descricao: "Examina regularização fundiária, restrições ambientais, mineração e servidões para infraestrutura.",
    observatorios: "Observatório Nacional das Terras",
    svgPath: "M0 16 L 30 8 L 70 18 L 120 6 L 160 14 L 200 10",
  },
  energia: {
    nome: "Energia",
    tag: "Matriz Elétrica & Encargos",
    descricao: "Acompanha formação de preços, encargos setoriais, geração, transmissão e o mercado livre de energia.",
    observatorios: "Observatório Nacional da Energia",
    svgPath: "M0 12 L 60 12 L 75 2 L 90 22 L 105 4 L 120 12 L 200 12",
  },
} as const;

export type IdPilar = keyof typeof DETALHES_PILARES;
export const PILARES_ORDEM: IdPilar[] = ["agua", "terra", "energia"];

export interface ConteudoHero {
  readonly kicker: { readonly rotulo: string };
  readonly titulo: readonly string[];
  readonly subtitulo: string;
  readonly imagem: { readonly src: string; readonly alt: string };
  readonly ctaPrimario: { readonly rotulo: string; readonly href: string };
  readonly ctaSecundario: { readonly rotulo: string; readonly href: string };
  readonly pilares?: readonly string[];
}

export function HeroConteudo({
  conteudo,
  pilarSelecionado,
  setPilarSelecionado,
  pausado,
  setPausado,
}: {
  conteudo: ConteudoHero;
  pilarSelecionado: IdPilar;
  setPilarSelecionado: (pilar: IdPilar) => void;
  pausado: boolean;
  setPausado: (pausado: boolean) => void;
}) {
  const { kicker, titulo, subtitulo, ctaPrimario, ctaSecundario } = conteudo;

  return (
    <motion.div
      className="max-w-[54rem]"
      variants={CONTAINER}
      initial="oculto"
      animate="visivel"
    >
      <span className="block overflow-hidden">
        <motion.div
          data-reveal
          variants={SOBE}
          className="liquid-glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 shadow-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-cobalto-claro animate-pulse" />
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-cobalto-claro font-semibold">
            {kicker.rotulo}
          </span>
        </motion.div>
      </span>

      <h1 className="mt-6 text-3xl font-bold leading-[1.08] tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-osso">
        {titulo.map((linha) => (
          <span key={linha} className="block overflow-hidden pb-[0.06em]">
            <motion.span data-reveal variants={SOBE} className="block">
              {linha}
            </motion.span>
          </span>
        ))}
      </h1>

      <motion.p
        data-reveal
        variants={SURGE}
        className="mt-6 max-w-[46ch] text-base leading-relaxed text-fumaca sm:text-lg"
      >
        {subtitulo}
      </motion.p>

      <motion.div
        data-reveal
        variants={SURGE}
        className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-x-6 sm:gap-y-4"
      >
        <CTALink href={ctaPrimario.href}>{ctaPrimario.rotulo}</CTALink>
        <CTALink href={ctaSecundario.href} variante="secundario">
          {ctaSecundario.rotulo}
        </CTALink>
      </motion.div>

      {/* Conceito 1: Animação de Radar Morphing dos 3 Pilares Fundamentais */}
      <motion.div
        data-reveal
        variants={SURGE}
        onMouseEnter={() => setPausado(true)}
        onMouseLeave={() => setPausado(false)}
        className="mt-10 border-t border-fio/60 pt-6 sm:pt-8"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cobalto-claro animate-ping" />
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-cobalto-claro font-semibold">
              Radar de Evidências — 3 Pilares
            </span>
          </div>
          <span className="hidden font-mono text-[0.625rem] text-fumaca/70 sm:inline-block">
            {pausado ? "Foco fixado" : "Alternando automaticamente"}
          </span>
        </div>

        {/* Seletores com barras de progresso animadas */}
        <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
          {PILARES_ORDEM.map((chave) => {
            const pilar = DETALHES_PILARES[chave];
            const ativo = pilarSelecionado === chave;

            return (
              <button
                key={chave}
                onClick={() => {
                  setPilarSelecionado(chave);
                  setPausado(true);
                }}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-lg border p-3 text-left transition-all duration-300 sm:p-4 focus-visible:outline-2 focus-visible:outline-cobalto-claro ${
                  ativo
                    ? "border-cobalto-claro/70 bg-carvao/90 shadow-[0_0_25px_rgba(18,54,200,0.2)]"
                    : "border-fio bg-carvao/30 hover:border-fio-forte hover:bg-carvao/50"
                }`}
              >
                {ativo && (
                  <motion.div
                    layoutId="anel-pilar-ativo"
                    className="absolute inset-0 rounded-lg border border-cobalto-claro/50 bg-cobalto/15 pointer-events-none"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}

                {/* Barra de progresso da animação temporal */}
                {ativo && !pausado && (
                  <motion.div
                    key={`progresso-${chave}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 4.5, ease: "linear" }}
                    className="absolute top-0 left-0 right-0 h-[2px] bg-cobalto-claro origin-left pointer-events-none"
                  />
                )}

                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-osso">
                    {pilar.nome}
                  </span>
                  <span
                    className={`h-2 w-2 rounded-full transition-colors ${
                      ativo ? "bg-cobalto-claro" : "bg-fumaca/30 group-hover:bg-fumaca/60"
                    }`}
                  />
                </div>

                <span className="mt-2 block truncate font-mono text-[0.5625rem] uppercase tracking-widest text-fumaca">
                  {pilar.tag}
                </span>
              </button>
            );
          })}
        </div>

        {/* Card Morphing com Vetor SVG Reativo para cada Pilar */}
        <div className="relative mt-3 overflow-hidden rounded-lg border border-fio/50 bg-noite/85 p-4 backdrop-blur-md">
          {/* Engine Canvas2D: Renderiza matriz ASCII para Água, Topografia para Terra e Pulso Elétrico para Energia */}
          <CanvasTelemetriaPilar pilar={pilarSelecionado} className="opacity-30" />

          <AnimatePresence mode="wait">
            <motion.div
              key={pilarSelecionado}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                {/* Sinal de vetor SVG da telemetria */}
                <svg className="h-6 w-16 text-cobalto-claro shrink-0" viewBox="0 0 200 24" fill="none">
                  <motion.path
                    d={DETALHES_PILARES[pilarSelecionado].svgPath}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
                </svg>

                <p className="text-xs text-osso/90 leading-relaxed">
                  {DETALHES_PILARES[pilarSelecionado].descricao}
                </p>
              </div>

              <span className="shrink-0 font-mono text-[0.625rem] font-semibold uppercase tracking-wider text-cobalto-claro border-t sm:border-t-0 sm:border-l border-fio/60 pt-2 sm:pt-0 sm:pl-3">
                {DETALHES_PILARES[pilarSelecionado].observatorios}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
