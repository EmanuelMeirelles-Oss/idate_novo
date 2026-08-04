import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export interface Eixo {
  readonly nome: string;
  readonly imagem: { readonly src: string; readonly alt: string };
  readonly tags: readonly string[];
  readonly href: string;
}

/**
 * Os três eixos em foto. Sem ícone de água/terra/energia de propósito — a
 * fotografia carrega a identidade, um ícone literal (gota, globo, raio)
 * reforçaria a leitura "ONG ambiental" que o projeto evita desde o brief
 * original.
 */
export function Eixos({
  kicker,
  titulo,
  intro,
  lista,
}: {
  kicker: { readonly rotulo: string };
  titulo: string;
  intro?: string;
  lista: readonly Eixo[];
}) {
  return (
    <section className="border-b border-fio py-24 md:py-32">
      <Container>
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-cobalto-claro">
            {kicker.rotulo}
          </span>
          <h2 className="mt-4 max-w-[26ch] text-3xl font-bold leading-[1.1] tracking-tighter md:text-5xl">
            {titulo}
          </h2>
          {intro && (
            <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-fumaca">
              {intro}
            </p>
          )}
        </Reveal>

        <ul className="mt-16 grid gap-6 md:grid-cols-3 lg:gap-8">
          {lista.map((eixo, indice) => (
            <li key={eixo.nome}>
              <Reveal atraso={indice * 0.08}>
                <Link
                  href={eixo.href}
                  className="group flex h-full flex-col overflow-hidden rounded-lg border border-fio bg-carvao/30 transition-all duration-300 hover:border-cobalto-claro/50 hover:bg-carvao/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalto-claro"
                >
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image
                      src={eixo.imagem.src}
                      alt={eixo.imagem.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-noite/80 via-noite/10 to-transparent" />
                  </div>

                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <h3 className="text-xl font-bold leading-tight tracking-tight text-osso transition-colors group-hover:text-cobalto-claro md:text-2xl">
                      {eixo.nome}
                    </h3>

                    <div className="mt-4 flex flex-1 flex-wrap gap-2">
                      {eixo.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-fio px-3 py-1 font-mono text-[0.625rem] uppercase tracking-wide text-fumaca"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <span className="mt-6 inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-cobalto-claro">
                      Ver observatórios
                      <ArrowUpRight
                        size={14}
                        weight="bold"
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
