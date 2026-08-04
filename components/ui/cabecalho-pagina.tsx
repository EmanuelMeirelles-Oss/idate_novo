import { Container } from "@/components/ui/container";

export function CabecalhoPagina({
  titulo,
  chamada,
  /* Sobrescrito pelas páginas de observatório, que exibem o eixo no lugar. */
  kicker = "IDATE — Instituto dos Direitos da Água, Terra e Energia",
}: {
  titulo: string;
  chamada: string;
  kicker?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-fio py-20 md:py-28">
      <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-cobalto/15 blur-3xl pointer-events-none" />
      <Container className="relative z-10">
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-cobalto-claro">
          {kicker}
        </span>
        <div className="mt-4 grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <h1 className="text-4xl font-bold leading-[1.05] tracking-tighter md:text-6xl text-osso">
              {titulo}
            </h1>
          </div>
          <div className="flex items-end lg:col-span-6">
            <p className="max-w-[55ch] text-lg leading-relaxed text-fumaca">
              {chamada}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

