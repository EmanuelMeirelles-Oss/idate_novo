import type { Metadata } from "next";
import { CabecalhoPagina } from "@/components/ui/cabecalho-pagina";
import { Container } from "@/components/ui/container";
import { FiltroEixo, type OpcaoFiltro } from "@/components/ui/filtro-eixo";
import { GradeObservatorios } from "@/components/sections/grade-observatorios";
import { EIXOS, OBSERVATORIOS, observatoriosPorEixo, type IdEixo } from "@/content/observatorios";

export const metadata: Metadata = {
  title: "Observatórios",
  description:
    "Oito observatórios permanentes sobre os direitos da água, da terra e da energia. Cada um com escopo declarado e agenda de pesquisa aberta.",
};

const FILTROS: readonly OpcaoFiltro[] = [
  { rotulo: "Todos" },
  { rotulo: EIXOS.agua.rotulo, valor: "agua" },
  { rotulo: EIXOS.terra.rotulo, valor: "terra" },
  { rotulo: EIXOS.energia.rotulo, valor: "energia" },
];

function ehEixoFiltravel(valor: string | undefined): valor is "agua" | "terra" | "energia" {
  return valor === "agua" || valor === "terra" || valor === "energia";
}

export default async function Observatorios({
  searchParams,
}: {
  searchParams: Promise<{ eixo?: string }>;
}) {
  const { eixo } = await searchParams;
  const eixoAtivo: IdEixo | undefined = ehEixoFiltravel(eixo) ? eixo : undefined;
  const lista = eixoAtivo ? observatoriosPorEixo(eixoAtivo) : OBSERVATORIOS;

  return (
    <>
      <CabecalhoPagina
        titulo="Observatórios"
        chamada="Um observatório não responde a demanda: acompanha um objeto ao longo do tempo, acumula documentação e publica o que apura. São oito, e a agenda de cada um é pública."
      />

      <Container className="mt-16">
        <FiltroEixo opcoes={FILTROS} ativo={eixoAtivo} baseHref="/observatorios" />
      </Container>

      <GradeObservatorios
        rotulo={
          eixoAtivo
            ? `${lista.length} observatório${lista.length === 1 ? "" : "s"} — eixo ${EIXOS[eixoAtivo].rotulo}`
            : `${lista.length} observatórios permanentes`
        }
        titulo="Cada observatório é um objeto de estudo, não uma linha de serviço."
        intro="Os observatórios mantêm agenda de pesquisa aberta e monitoramento contínuo. As notas técnicas, estudos e despachos regulatórios entram no acervo à medida que as investigações avançam."
        lista={lista}
      />
    </>
  );
}
