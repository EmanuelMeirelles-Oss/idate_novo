import type { Metadata } from "next";
import { CabecalhoPagina } from "@/components/ui/cabecalho-pagina";
import { FormularioDenuncia } from "@/components/sections/formulario-denuncia";
import { FORMULARIO_DENUNCIA } from "@/content/denuncia";
import { CANAL } from "@/content/site";

export const metadata: Metadata = {
  title: FORMULARIO_DENUNCIA.titulo,
  description:
    "Formulário da Central Nacional de Denúncias do IDATE. A comunicação pode ser feita de forma anônima.",
};

/*
  `searchParams` é uma Promise em Next 16, como `params`. Verificado em
  node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/page.md
*/
export default async function NovaDenuncia({
  searchParams,
}: {
  searchParams: Promise<{ eixo?: string }>;
}) {
  const { eixo } = await searchParams;

  return (
    <>
      <CabecalhoPagina
        kicker={CANAL.nome}
        titulo={FORMULARIO_DENUNCIA.titulo}
        chamada={FORMULARIO_DENUNCIA.chamada}
      />
      <FormularioDenuncia eixoInicial={eixo} />
    </>
  );
}
