"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Container } from "@/components/ui/container";
import AnimatedGradient from "@/components/ui/animated-gradient";

/*
  Cores explícitas de fundo escuro e revelação para a seção Esteira.
  Esta seção é uma esteira cinematográfica de revelação que permanece
  sempre em fundo escuro (#0A0C10) para maximizar o efeito do campo de ondas.
*/
const COR_NOITE_ESCURA = "#0A0C10";
const COR_PENUMBRA_ESCURA = "#475569";
const COR_OSSO_ESCURO = "#F8FAFC";
const COR_COBALTO_CLARO = "#5B7CFF";

const CAMPO = {
  preset: "custom",
  color1: COR_NOITE_ESCURA,
  color2: "#1236C8",
  color3: COR_NOITE_ESCURA,
  rotation: 0,
  proportion: 28,
  scale: 0.42,
  speed: 7,
  distortion: 3,
  swirl: 42,
  swirlIterations: 6,
  softness: 100,
  offset: -120,
  shape: "Edge",
  shapeSize: 40,
} as const;

function LinhaRevelada({
  progresso,
  indice,
  total,
  texto,
}: {
  progresso: MotionValue<number>;
  indice: number;
  total: number;
  texto: string;
}) {
  const inicio = 0.18 + (indice / total) * 0.42;
  const cor = useTransform(
    progresso,
    [inicio, inicio + 0.14],
    [COR_PENUMBRA_ESCURA, COR_OSSO_ESCURO],
  );

  return (
    <motion.p
      data-linha-revelada
      style={{ color: cor }}
      className="max-w-[24ch] text-2xl font-semibold leading-tight tracking-tight md:text-4xl lg:text-5xl"
    >
      {texto}
    </motion.p>
  );
}

export function Esteira({
  kicker,
  linhas,
  fechamento,
}: {
  kicker: { readonly rotulo: string };
  linhas: readonly string[];
  fechamento: string;
}) {
  const referencia = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: referencia,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={referencia}
      className="relative isolate overflow-hidden bg-[#0A0C10] text-[#F8FAFC] py-32 md:py-48"
    >
      <AnimatedGradient config={CAMPO} noise={{ opacity: 0.5, scale: 1 }} />

      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#0A0C10]/65" />

      <Container>
        <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-[#5B7CFF]">
          {kicker.rotulo}
        </h2>

        <div className="mt-12 space-y-6 md:space-y-8">
          {linhas.map((linha, indice) => (
            <LinhaRevelada
              key={linha}
              progresso={scrollYProgress}
              indice={indice}
              total={linhas.length}
              texto={linha}
            />
          ))}
        </div>

        <div className="mt-20 border-t border-white/15 pt-10">
          <p className="text-xl font-bold tracking-tight text-[#5B7CFF] md:text-2xl">
            {fechamento}
          </p>
        </div>
      </Container>
    </section>
  );
}
