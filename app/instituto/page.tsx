import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { CabecalhoPagina } from "@/components/ui/cabecalho-pagina";
import { Rotulo } from "@/components/ui/rotulo";
import { Regua } from "@/components/ui/regua";
import { Reveal } from "@/components/ui/reveal";
import { INSTITUTO } from "@/content/instituto";

export const metadata: Metadata = {
  title: "O Instituto",
  description: INSTITUTO.chamada,
};

export default function Instituto() {
  return (
    <>
      <CabecalhoPagina titulo={INSTITUTO.titulo} chamada={INSTITUTO.chamada} />

      <section className="border-b border-fio py-24 md:py-32">
        <Container>
          <div className="space-y-20 md:space-y-28">
            {INSTITUTO.blocos.map((bloco) => (
              <Reveal key={bloco.titulo}>
                <article className="grid gap-8 lg:grid-cols-12 lg:gap-16">
                  <div className="lg:col-span-4">
                    <Rotulo rotulo={bloco.titulo} nivel="h2" />
                  </div>
                  <div className="space-y-6 lg:col-span-8">
                    {bloco.paragrafos.map((paragrafo) => (
                      <p
                        key={paragrafo.slice(0, 40)}
                        className="max-w-[65ch] text-base leading-relaxed text-fumaca"
                      >
                        {paragrafo}
                      </p>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-fio py-24 md:py-32">
        <Container>
          <Reveal>
            <Rotulo rotulo={INSTITUTO.corpoTecnico.titulo} nivel="h2" />
            <p className="mt-8 max-w-[65ch] text-base leading-relaxed text-fumaca">
              {INSTITUTO.corpoTecnico.descricao}
            </p>
            <ul className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              {INSTITUTO.corpoTecnico.disciplinas.map((disciplina) => (
                <li
                  key={disciplina}
                  className="border-t border-fio pt-4 text-xl font-semibold tracking-tight"
                >
                  {disciplina}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-fio py-24 md:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <Reveal>
              <div>
                <Rotulo rotulo="Missão" nivel="h2" />
                <p className="mt-8 max-w-[50ch] text-xl leading-snug tracking-tight md:text-2xl">
                  {INSTITUTO.missao}
                </p>
              </div>
            </Reveal>
            <Reveal atraso={0.1}>
              <div>
                <Rotulo rotulo="Visão" nivel="h2" />
                <p className="mt-8 max-w-[50ch] text-xl leading-snug tracking-tight md:text-2xl">
                  {INSTITUTO.visao}
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <Reveal>
            <Rotulo rotulo="Valores" nivel="h2" />
            <div className="mt-8">
              <Regua />
            </div>
            <ul className="mt-12 grid gap-x-12 gap-y-8 sm:grid-cols-2">
              {INSTITUTO.valores.map((valor) => (
                <li key={valor} className="max-w-[60ch] text-base leading-relaxed text-fumaca">
                  {valor}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
