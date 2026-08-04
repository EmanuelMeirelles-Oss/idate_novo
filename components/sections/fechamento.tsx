import { Container } from "@/components/ui/container";
import { CTALink } from "@/components/ui/cta-link";
import { Reveal } from "@/components/ui/reveal";

export function Fechamento({
  rotulo,
  titulo,
  subtitulo,
  cta,
}: {
  /** Kicker do bloco. Antes era o número fixo da seção na home. */
  rotulo: string;
  titulo: string;
  subtitulo: string;
  cta: { readonly rotulo: string; readonly href: string };
}) {
  return (
    <section className="py-24 md:py-36">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-xl border border-cobalto-claro/30 bg-gradient-to-b from-carvao/90 to-noite p-8 sm:p-14 md:p-16 shadow-[0_0_50px_rgba(18,54,200,0.15)]">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cobalto/20 blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-[38ch]">
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-cobalto-claro">
                {rotulo}
              </span>
              <h2 className="mt-4 text-3xl font-bold leading-[1.08] tracking-tighter sm:text-4xl md:text-5xl text-osso">
                {titulo}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-fumaca">
                {subtitulo}
              </p>
              <div className="mt-10">
                <CTALink href={cta.href}>{cta.rotulo}</CTALink>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
