import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { CheckCircle, MinusCircle } from "@phosphor-icons/react/dist/ssr";

/*
  Ocupa o lugar estrutural da antiga comparação de patrimônios, com função
  invertida: aquela seção existia para criar desejo, esta existe para limitá-lo.
  Um canal nacional de denúncias que não declara o que não faz produz frustração
  em escala — e frustração em escala custa mais reputação do que o canal gera.

  As duas colunas têm peso visual equivalente de propósito. Destacar "o que
  fazemos" e apagar "o que não fazemos" anularia o efeito.
*/
function Coluna({
  rotulo,
  itens,
  positiva,
}: {
  rotulo: string;
  itens: readonly string[];
  positiva: boolean;
}) {
  return (
    <div
      className={`h-full rounded-lg p-6 sm:p-8 transition-all duration-300 ${
        positiva
          ? "border border-cobalto-claro/40 bg-carvao/70 hover:border-cobalto-claro"
          : "border border-fio bg-carvao/30 hover:border-fio-forte"
      }`}
    >
      <div className="flex items-center border-b border-fio pb-4">
        <p
          className={`font-mono text-[0.6875rem] uppercase tracking-[0.16em] ${
            positiva ? "font-semibold text-cobalto-claro" : "text-fumaca"
          }`}
        >
          {rotulo}
        </p>
      </div>

      <ul className="mt-6 space-y-4">
        {itens.map((item) => (
          <li
            key={item}
            className={`flex items-start gap-3 text-base leading-snug tracking-tight ${
              positiva ? "text-osso" : "text-fumaca"
            }`}
          >
            {positiva ? (
              <CheckCircle
                size={20}
                weight="fill"
                className="mt-0.5 shrink-0 text-cobalto-claro"
              />
            ) : (
              <MinusCircle
                size={20}
                weight="regular"
                className="mt-0.5 shrink-0 text-fumaca/50"
              />
            )}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Expectativa({
  rotulo,
  titulo,
  faz,
  naoFaz,
  fechamento,
}: {
  rotulo: string;
  titulo: string;
  faz: { readonly rotulo: string; readonly itens: readonly string[] };
  naoFaz: { readonly rotulo: string; readonly itens: readonly string[] };
  fechamento: string;
}) {
  return (
    <section className="border-b border-fio py-24 md:py-32">
      <Container>
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-cobalto-claro">
            {rotulo}
          </span>
          <h2 className="mt-4 max-w-[22ch] text-3xl font-bold leading-[1.1] tracking-tighter md:text-5xl">
            {titulo}
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-2 md:gap-12">
          <Reveal atraso={0.1}>
            <Coluna rotulo={faz.rotulo} itens={faz.itens} positiva />
          </Reveal>
          <Reveal atraso={0.2}>
            <Coluna
              rotulo={naoFaz.rotulo}
              itens={naoFaz.itens}
              positiva={false}
            />
          </Reveal>
        </div>

        <Reveal atraso={0.3}>
          <p className="mt-14 max-w-[65ch] border-l-2 border-cobalto-claro/40 pl-6 text-base leading-relaxed text-fumaca">
            {fechamento}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
