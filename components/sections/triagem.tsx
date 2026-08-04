import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import {
  Drop,
  GlobeHemisphereWest,
  Lightning,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";

const ICONES = {
  agua: Drop,
  terra: GlobeHemisphereWest,
  energia: Lightning,
} as const;

export interface EixoTriagem {
  readonly eixo: keyof typeof ICONES;
  readonly nome: string;
  readonly imagem: { readonly src: string; readonly alt: string };
  readonly exemplos: readonly string[];
}

/*
  Herda os três cards fotográficos da home original. A mudança é de função, não
  de forma: ali eles apresentavam setores atendidos, aqui são a triagem de
  entrada. Cada card leva ao formulário com o eixo já preenchido, o que remove
  uma decisão de quem está comunicando e melhora a classificação na origem.

  Os exemplos abaixo de cada eixo existem para calibrar expectativa: quem lê
  "cobrança irregular de tarifa" reconhece o próprio caso, e quem não reconhece
  nenhum dos doze provavelmente está no lugar errado — o que também é útil saber
  antes de preencher um formulário de dez minutos.
*/
export function Triagem({
  rotulo,
  titulo,
  intro,
  lista,
}: {
  rotulo: string;
  titulo: string;
  intro?: string;
  lista: readonly EixoTriagem[];
}) {
  return (
    <section className="border-b border-fio py-24 md:py-32">
      <Container>
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-cobalto-claro">
            {rotulo}
          </span>
          <h2 className="mt-4 max-w-[24ch] text-3xl font-bold leading-[1.1] tracking-tighter md:text-5xl">
            {titulo}
          </h2>
          {intro && (
            <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-fumaca">
              {intro}
            </p>
          )}
        </Reveal>

        <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          {lista.map((item, indice) => {
            const Icone = ICONES[item.eixo];

            return (
              <Reveal key={item.eixo} atraso={indice * 0.1}>
                <Link
                  href={`/denuncia/nova?eixo=${item.eixo}`}
                  className="group flex h-full flex-col overflow-hidden rounded-lg border border-fio bg-carvao/40 p-6 transition-all duration-300 hover:border-cobalto-claro/50 hover:bg-carvao/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalto-claro"
                >
                  <div className="relative aspect-[3/2] overflow-hidden rounded-md">
                    <Image
                      src={item.imagem.src}
                      alt={item.imagem.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-noite/80 via-transparent to-transparent" />
                  </div>

                  <div className="mt-6 flex items-center gap-3 border-t-2 border-cobalto pt-4">
                    <Icone
                      size={24}
                      weight="bold"
                      className="shrink-0 text-cobalto-claro"
                    />
                    <h3 className="text-2xl font-bold tracking-tight text-osso transition-colors group-hover:text-cobalto-claro">
                      {item.nome}
                    </h3>
                  </div>

                  <ul className="mt-4 flex-1 space-y-2">
                    {item.exemplos.map((exemplo) => (
                      <li
                        key={exemplo}
                        className="text-sm leading-snug text-fumaca transition-colors group-hover:text-osso"
                      >
                        {exemplo}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-6 inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-cobalto-claro">
                    Comunicar sobre {item.nome.toLowerCase()}
                    <ArrowRight
                      size={14}
                      weight="bold"
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
