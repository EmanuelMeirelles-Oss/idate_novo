import { Container } from "@/components/ui/container";
import { CTALink } from "@/components/ui/cta-link";
import { Reveal } from "@/components/ui/reveal";

/*
  Bloco horizontal leve, para chamadas que não merecem o peso visual de uma
  seção inteira nem o da caixa destacada de fechamento. Usado na home para a
  biblioteca: o acervo é importante, mas anunciá-lo com a mesma ênfase dos
  observatórios competiria com eles.
*/
export function Banda({
  titulo,
  descricao,
  cta,
}: {
  titulo: string;
  descricao: string;
  cta: { readonly rotulo: string; readonly href: string };
}) {
  return (
    <section className="border-b border-fio py-20 md:py-24">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-16">
            <div className="max-w-[52ch]">
              <h2 className="text-2xl font-bold leading-tight tracking-tighter text-osso md:text-3xl">
                {titulo}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-fumaca">
                {descricao}
              </p>
            </div>
            <div className="shrink-0">
              <CTALink href={cta.href} variante="secundario">
                {cta.rotulo}
              </CTALink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
