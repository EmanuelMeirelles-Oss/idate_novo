"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { HeroConteudo, type ConteudoHero, type IdPilar, PILARES_ORDEM } from "./hero-conteudo";
import { PilarGlowHero } from "@/components/ui/pilar-glow-hero";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";

export function Hero({
  conteudo,
  rolagem = "Explorar",
}: {
  conteudo: ConteudoHero;
  /** Rótulo do indicador de rolagem. Muda por página. */
  rolagem?: string;
}) {
  const { imagem } = conteudo;
  const [pilarSelecionado, setPilarSelecionado] = useState<IdPilar>("agua");
  const [pausado, setPausado] = useState(false);

  // Ciclo automático do radar a cada 4.5 segundos (pausa em hover/clique).
  // Vive aqui, não em HeroConteudo, porque PilarGlowHero também consome
  // pilarSelecionado e é irmão de HeroConteudo, não filho dele.
  useEffect(() => {
    if (pausado) return;

    const timer = setInterval(() => {
      setPilarSelecionado((atual) => {
        const proxIndice = (PILARES_ORDEM.indexOf(atual) + 1) % PILARES_ORDEM.length;
        return PILARES_ORDEM[proxIndice];
      });
    }, 4500);

    return () => clearInterval(timer);
  }, [pausado]);

  return (
    <section className="relative isolate flex min-h-[100dvh] flex-col justify-end overflow-hidden">
      {/*
        `data-assenta` roda a animação de assentamento definida em globals.css:
        a foto entra 6% maior e recua, como câmera estabilizando depois do
        corte. Fica no invólucro e não na <Image> porque o next/image controla
        o próprio transform de posicionamento.

        O filtro CSS corrige o tom da fonte (amanhecer quente) para o registro
        frio do site, sem reprocessar o arquivo de origem — mesmo raciocínio
        dos véus gradiente abaixo: o tratamento vive em código, não na imagem.
      */}
      <div data-assenta className="absolute inset-0 -z-20">
        <Image
          src={imagem.src}
          alt={imagem.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover [filter:saturate(0.7)_hue-rotate(155deg)_brightness(0.82)]"
        />
      </div>

      {/*
        Dois véus, ambos funcionais e não decorativos. O horizontal escurece o
        lado esquerdo, onde o texto vive, aproveitando que a fotografia já é
        vazia e escura ali. O vertical garante o contraste do bloco de texto
        contra o campo, que na base do quadro tem trilhas mais claras.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-noite via-noite/80 to-transparent"
      />

      {/*
        Camada generativa: linhas finas reativas ao pilar em foco, contidas à
        faixa esquerda onde o véu acima já está opaco — nunca cobre a foto
        inteira, só reforça a zona que já é escura por composição.
      */}
      <div aria-hidden="true" className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden sm:w-[60%]">
        <PilarGlowHero pilar={pilarSelecionado} />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-noite via-noite/70 to-transparent"
      />

      <Container className="pb-16 pt-28 md:pb-24">
        <HeroConteudo
          conteudo={conteudo}
          pilarSelecionado={pilarSelecionado}
          setPilarSelecionado={setPilarSelecionado}
          pausado={pausado}
          setPausado={setPausado}
        />

        <div className="mt-16 flex items-center gap-3 text-fumaca/70">
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em]">
            {rolagem}
          </span>
          <div className="flex h-6 w-6 animate-bounce items-center justify-center rounded-full border border-fio text-cobalto-claro">
            <CaretDown size={12} weight="bold" />
          </div>
        </div>
      </Container>
    </section>
  );
}
