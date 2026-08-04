import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { CabecalhoPagina } from "@/components/ui/cabecalho-pagina";
import { FormularioContato } from "@/components/sections/formulario-contato";
import { CONTATO } from "@/content/contato";

export const metadata: Metadata = {
  title: "Solicitar análise",
  description: CONTATO.chamada,
};

export default function Contato() {
  return (
    <>
      <CabecalhoPagina titulo={CONTATO.titulo} chamada={CONTATO.chamada} />
      <section className="py-20 md:py-28">
        <Container>
          <div className="max-w-[52rem]">
            <FormularioContato />
          </div>
        </Container>
      </section>
    </>
  );
}
