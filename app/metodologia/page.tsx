import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { CabecalhoPagina } from "@/components/ui/cabecalho-pagina";
import { Rotulo } from "@/components/ui/rotulo";
import { Reveal } from "@/components/ui/reveal";
import { Etapas } from "@/components/sections/etapas";
import { METODOLOGIA } from "@/content/metodologia";

export const metadata: Metadata = {
  title: "Como investigamos",
  description: METODOLOGIA.chamada,
};

export default function Metodologia() {
  const { padrao, nucleos, limites } = METODOLOGIA;

  return (
    <>
      <CabecalhoPagina
        titulo={METODOLOGIA.titulo}
        chamada={METODOLOGIA.chamada}
      />

      <section className="border-b border-fio py-24 md:py-32">
        <Container>
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <Rotulo rotulo={padrao.titulo} nivel="h2" />
              </div>
              <div className="lg:col-span-8">
                <div className="max-w-[65ch] space-y-6">
                  {padrao.paragrafos.map((paragrafo) => (
                    <p
                      key={paragrafo.slice(0, 40)}
                      className="text-base leading-relaxed text-fumaca"
                    >
                      {paragrafo}
                    </p>
                  ))}
                </div>
                <ul className="mt-12 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {padrao.fontes.map((fonte) => (
                    <li
                      key={fonte}
                      className="border-t border-fio pt-3 text-sm font-semibold"
                    >
                      {fonte}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Mesma sequência exibida na Central de Denúncias, importada de lá. */}
      <Etapas
        rotulo="O percurso"
        titulo="Da comunicação recebida à medida cabível."
        lista={METODOLOGIA.etapas}
      />

      <section className="border-b border-fio py-24 md:py-32">
        <Container>
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <Rotulo rotulo={nucleos.titulo} nivel="h2" />
              </div>
              <div className="lg:col-span-8">
                <div className="max-w-[65ch] space-y-6">
                  {nucleos.paragrafos.map((paragrafo) => (
                    <p
                      key={paragrafo.slice(0, 40)}
                      className="text-base leading-relaxed text-fumaca"
                    >
                      {paragrafo}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <dl className="mt-16 grid gap-px overflow-hidden rounded-lg border border-fio md:grid-cols-3">
            {nucleos.criterios.map((criterio) => (
              <div key={criterio.nome} className="bg-carvao/30 p-6 sm:p-8">
                <dt className="text-xl font-bold tracking-tight text-osso">
                  {criterio.nome}
                </dt>
                <dd className="mt-4 text-sm leading-relaxed text-fumaca">
                  {criterio.descricao}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <Rotulo rotulo={limites.titulo} nivel="h2" />
              </div>
              <div className="lg:col-span-8">
                <div className="max-w-[65ch] space-y-6">
                  {limites.paragrafos.map((paragrafo) => (
                    <p
                      key={paragrafo.slice(0, 40)}
                      className="text-base leading-relaxed text-fumaca"
                    >
                      {paragrafo}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
