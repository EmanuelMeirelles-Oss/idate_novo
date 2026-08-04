import type { Metadata } from "next";
import { CabecalhoPagina } from "@/components/ui/cabecalho-pagina";
import { GradeObservatorios } from "@/components/sections/grade-observatorios";
import { OBSERVATORIOS } from "@/content/observatorios";

export const metadata: Metadata = {
  title: "Observatórios",
  description:
    "Oito observatórios permanentes sobre os direitos da água, da terra e da energia. Cada um com escopo declarado e agenda de pesquisa aberta.",
};

export default function Observatorios() {
  return (
    <>
      <CabecalhoPagina
        titulo="Observatórios"
        chamada="Um observatório não responde a demanda: acompanha um objeto ao longo do tempo, acumula documentação e publica o que apura. São oito, e a agenda de cada um é pública."
      />
      <GradeObservatorios
        rotulo={`${OBSERVATORIOS.length} observatórios permanentes`}
        titulo="Cada observatório é um objeto de estudo, não uma linha de serviço."
        intro="Todos os observatórios encontram-se em constituição. As perguntas de pesquisa abaixo são a agenda declarada de cada um — publicações entram no acervo à medida que são concluídas."
        lista={OBSERVATORIOS}
      />
    </>
  );
}
