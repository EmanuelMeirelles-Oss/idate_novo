import {

  RADAR_ATUAL,
  HISTORICO_RADAR,
  obterItensRadar,
  obterAnaliseRadar,
  contarItensRadar,
  obterTodosCiclos,
} from "@/content/radar";
import { OBSERVATORIOS } from "@/content/observatorios";

describe("Radar Regulatório Semanal", () => {
  it("deve conter dados válidos de ciclo e período", () => {
    expect(RADAR_ATUAL.periodo.inicio).toBe("2026-09-14");
    expect(RADAR_ATUAL.periodo.fim).toBe("2026-09-21");
    expect(RADAR_ATUAL.periodo.rotulo).toBe("14 a 21/09/2026");
    expect(RADAR_ATUAL.fontesVigiadas.length).toBeGreaterThan(0);
    expect(RADAR_ATUAL.fontesVigiadas).toContain("ANM");
    expect(RADAR_ATUAL.fontesVigiadas).toContain("ANEEL");
    expect(RADAR_ATUAL.fontesVigiadas).toContain("DOU");
    expect(RADAR_ATUAL.fontesVigiadas).toContain("ANA");
  });

  it("deve associar todos os atos a observatórios existentes e válidos", () => {
    const slugsValidos = new Set(OBSERVATORIOS.map((obs) => obs.slug));
    expect(RADAR_ATUAL.itens.length).toBe(4);

    for (const item of RADAR_ATUAL.itens) {
      expect(slugsValidos.has(item.observatorio)).toBe(true);
      expect(item.titulo.length).toBeGreaterThan(10);
      expect(item.url).toMatch(/^https?:\/\//);
      expect(item.publicadoEm).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(item.perguntaVinculada.length).toBeGreaterThan(10);
    }
  });

  it("deve filtrar atos por observatório com precisão", () => {
    const itensMineracao = obterItensRadar("recursos-minerais");
    expect(itensMineracao.length).toBe(4);
    expect(contarItensRadar("recursos-minerais")).toBe(4);

    // Consulta específica por ciclo anterior (07 a 14/09/2026)
    const cicloIdAnterior = "ciclo-2026-09-07-2026-09-14";
    const itensAguas = obterItensRadar("aguas", cicloIdAnterior);
    expect(itensAguas.length).toBe(1);
    expect(contarItensRadar("aguas", cicloIdAnterior)).toBe(1);

    const itensEnergia = obterItensRadar("energia", cicloIdAnterior);
    expect(itensEnergia.length).toBe(3);
    expect(contarItensRadar("energia", cicloIdAnterior)).toBe(3);

    const itensTransicao = obterItensRadar("transicao-energetica", cicloIdAnterior);
    expect(itensTransicao.length).toBe(2);
    expect(contarItensRadar("transicao-energetica", cicloIdAnterior)).toBe(2);
  });

  it("deve conter análise metodológica com os 3 critérios do IDATE", () => {
    const analiseMineracao = obterAnaliseRadar("recursos-minerais");
    expect(analiseMineracao).toBeDefined();
    if (analiseMineracao) {
      expect(analiseMineracao.criterios.recorrencia).toBeDefined();
      expect(analiseMineracao.criterios.recorrencia.status).toBe("em_maturacao");
      expect(analiseMineracao.criterios.relevanciaColetiva.status).toBe("atendido");
      expect(analiseMineracao.criterios.viabilidadeApuracao.status).toBe("atendido");
      expect(analiseMineracao.status).toBe("em_observacao");
    }

    const analiseTransicaoAnterior = obterAnaliseRadar("transicao-energetica", "ciclo-2026-09-07-2026-09-14");
    expect(analiseTransicaoAnterior).toBeDefined();
    if (analiseTransicaoAnterior) {
      expect(analiseTransicaoAnterior.criterios.recorrencia.status).toBe("em_maturacao");
      expect(analiseTransicaoAnterior.criterios.relevanciaColetiva.status).toBe("atendido");
      expect(analiseTransicaoAnterior.criterios.viabilidadeApuracao.status).toBe("atendido");
      expect(analiseTransicaoAnterior.status).toBe("em_observacao");
    }
  });

  it("deve registrar transparência institucional de itens descartados e fontes sem ocorrência", () => {
    expect(RADAR_ATUAL.itensDescartados).toBeDefined();
    expect(RADAR_ATUAL.itensDescartados?.length).toBe(3);

    expect(RADAR_ATUAL.fontesSemOcorrencias).toBeDefined();
    expect(RADAR_ATUAL.fontesSemOcorrencias?.length).toBe(3);
  });

  it("deve suportar histórico de ciclos anteriores arquivados", () => {
    const ciclos = obterTodosCiclos();
    expect(ciclos.length).toBeGreaterThanOrEqual(7);
    expect(HISTORICO_RADAR[0].periodo.inicio).toBe("2026-09-14");
    expect(HISTORICO_RADAR[1].periodo.inicio).toBe("2026-09-07");
    expect(HISTORICO_RADAR[2].periodo.inicio).toBe("2026-09-01");
    expect(HISTORICO_RADAR[3].periodo.inicio).toBe("2026-08-24");
    expect(HISTORICO_RADAR[4].periodo.inicio).toBe("2026-08-17");
    expect(HISTORICO_RADAR[5].periodo.inicio).toBe("2026-08-10");
    expect(HISTORICO_RADAR[6].periodo.inicio).toBe("2026-08-03");

    // Consulta específica por ciclo anterior
    const itensCicloAnterior = obterItensRadar(undefined, "ciclo-2026-09-07-2026-09-14");
    expect(itensCicloAnterior.length).toBe(10);
  });
});

