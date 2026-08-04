"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Container } from "@/components/ui/container";
import AnimatedGradient from "@/components/ui/animated-gradient";
import { PALETA } from "@/lib/paleta";

/*
  Configuração do campo de fundo desta seção.

  Nenhum dos presets de fábrica entra aqui: eles são roxo plasma, laranja lava
  e verde neon, a paleta de slop que o projeto inteiro evita. Este é `custom`
  em cobalto, com a base do site nas duas pontas para que o azul apareça como
  uma faixa que emerge do escuro e volta, em vez de um campo colorido.

  Velocidade em 7 de propósito: o movimento é lento a ponto de a pessoa não ter
  certeza se está se mexendo. Antes isso servia à ideia de patrimônio invisível;
  agora serve à formação lenta de um padrão a partir de registros dispersos.
*/
const CAMPO = {
  preset: "custom",
  color1: PALETA.noite,
  color2: PALETA.cobalto,
  color3: PALETA.noite,
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

/**
 * A cor das linhas sai da penumbra e chega ao osso conforme a seção atravessa a
 * tela. Cada linha que acende é, literalmente, um registro a mais compondo o
 * padrão — o efeito é o argumento.
 *
 * Sob `prefers-reduced-motion` quem força o osso é o CSS
 * (`[data-linha-revelada]` em `app/globals.css`): trocar o elemento em JS
 * quebraria a hidratação, porque o servidor não conhece a preferência.
 */
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
    [PALETA.penumbra, PALETA.osso],
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
      className="relative isolate overflow-hidden py-32 md:py-48"
    >
      <AnimatedGradient config={CAMPO} noise={{ opacity: 0.5, scale: 1 }} />

      {/*
        Véu por cima do campo. O cobalto no pico da onda subiria o fundo a
        ponto de comer contraste do texto em penumbra, que é justamente o
        estado que precisa ler como quase invisível sem sumir.
      */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-noite/55" />

      <Container>
        <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-cobalto-claro">
          {kicker.rotulo}
        </h2>

        {/*
          A medida de 24ch vive em cada linha, não neste contêiner. `ch` resolve
          contra o font-size do próprio elemento: aqui seriam 16px (~280px de
          coluna) contra os 48px do texto, espremendo as frases em fragmentos de
          uma palavra. No parágrafo, a medida acompanha o tamanho responsivo.
        */}
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

        <div className="mt-20 border-t border-fio pt-10">
          <p className="text-xl font-bold tracking-tight text-cobalto-claro md:text-2xl">
            {fechamento}
          </p>
        </div>
      </Container>
    </section>
  );
}
