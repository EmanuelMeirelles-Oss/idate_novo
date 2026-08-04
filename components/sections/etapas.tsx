import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export interface Etapa {
  readonly numero: string;
  readonly nome: string;
  readonly descricao: string;
}

/*
  Herda a grade numerada da antiga seção de "quatro movimentos". A diferença é
  que a numeração agora vem do conteúdo, e não do índice do array: as sete
  etapas são uma sequência declarada em content/denuncia.ts, reaproveitada por
  "Como investigamos", e o número faz parte do texto, não da renderização.
*/
export function Etapas({
  id,
  rotulo,
  titulo,
  intro,
  lista,
}: {
  id?: string;
  rotulo: string;
  titulo: string;
  intro?: string;
  lista: readonly Etapa[];
}) {
  return (
    <section id={id} className="border-b border-fio py-24 md:py-32">
      <Container>
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-cobalto-claro">
            {rotulo}
          </span>
          <h2 className="mt-4 max-w-[22ch] text-3xl font-bold leading-[1.1] tracking-tighter md:text-5xl">
            {titulo}
          </h2>
          {intro && (
            <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-fumaca">
              {intro}
            </p>
          )}
        </Reveal>

        <ol className="mt-16 grid gap-8 md:grid-cols-2 md:gap-x-12 md:gap-y-10">
          {lista.map((etapa, indice) => (
            <li
              key={etapa.numero}
              className="group rounded-lg border border-fio bg-carvao/30 p-6 sm:p-8 transition-all duration-300 hover:border-cobalto-claro/40 hover:bg-carvao/60"
            >
              <Reveal atraso={indice * 0.08}>
                <div className="flex items-center justify-between border-b border-fio pb-4">
                  <span className="font-mono text-sm font-semibold tracking-wider text-cobalto-claro">
                    {etapa.numero}
                  </span>
                  <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-fumaca">
                    Etapa {indice + 1} de {lista.length}
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-bold tracking-tight text-osso group-hover:text-cobalto-claro transition-colors">
                  {etapa.nome}
                </h3>
                <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-fumaca">
                  {etapa.descricao}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
