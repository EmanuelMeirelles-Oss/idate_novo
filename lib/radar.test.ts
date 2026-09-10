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
    expect(RADAR_ATUAL.periodo.inicio).toBe("2026-09-01");
    expect(RADAR_ATUAL.periodo.fim).toBe("2026-09-08");
    expect(RADAR_ATUAL.periodo.rotulo).toBe("01 a 08/09/2026");
    expect(RADAR_ATUAL.fontesVigiadas.length).toBeGreaterThan(0);
    expect(RADAR_ATUAL.fontesVigiadas).toContain("ANM");
    expect(RADAR_ATUAL.fontesVigiadas).toContain("ANEEL");
    expect(RADAR_ATUAL.fontesVigiadas).toContain("DOU");
    expect(RADAR_ATUAL.fontesVigiadas).toContain("ANA");
  });

  it("deve associar todos os atos a observatórios existentes e válidos", () => {
    const slugsValidos = new Set(OBSERVATORIOS.map((obs) => obs.slug));
    expect(RADAR_ATUAL.itens.length).toBe(10);

    for (const item of RADAR_ATUAL.itens) {
      expect(slugsValidos.has(item.observatorio)).toBe(true);
      expect(item.titulo.length).toBeGreaterThan(10);
      expect(item.url).toMatch(/^https?:\/\//);
      expect(item.publicadoEm).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(item.perguntaVinculada.length).toBeGreaterThan(10);
    }
  });

  it("deve filtrar atos por observatório com precisão", () => {
    const itensAguas = obterItensRadar("aguas");
    expect(itensAguas.length).toBe(2);
    expect(contarItensRadar("aguas")).toBe(2);

    const itensTarifas = obterItensRadar("tarifas-publicas");
    expect(itensTarifas.length).toBe(2);
    expect(contarItensRadar("tarifas-publicas")).toBe(2);

    const itensEnergia = obterItensRadar("energia");
    expect(itensEnergia.length).toBe(2);
    expect(contarItensRadar("energia")).toBe(2);

    const itensMercadoLivre = obterItensRadar("mercado-livre-energia");
    expect(itensMercadoLivre.length).toBe(1);
    expect(contarItensRadar("mercado-livre-energia")).toBe(1);

    const itensTransicao = obterItensRadar("transicao-energetica");
    expect(itensTransicao.length).toBe(1);
    expect(contarItensRadar("transicao-energetica")).toBe(1);

    const itensMineracao = obterItensRadar("recursos-minerais");
    expect(itensMineracao.length).toBe(2);
    expect(contarItensRadar("recursos-minerais")).toBe(2);
  });

  it("deve conter análise metodológica com os 3 critérios do IDATE", () => {
    const analiseAguas = obterAnaliseRadar("aguas");
    expect(analiseAguas).toBeDefined();
    if (analiseAguas) {
      expect(analiseAguas.criterios.recorrencia).toBeDefined();
      expect(analiseAguas.criterios.recorrencia.status).toBe("em_maturacao");
      expect(analiseAguas.criterios.relevanciaColetiva.status).toBe("atendido");
      expect(analiseAguas.criterios.viabilidadeApuracao.status).toBe("atendido");
      expect(analiseAguas.status).toBe("em_observacao");
    }

    const analiseMineracao = obterAnaliseRadar("recursos-minerais");
    expect(analiseMineracao).toBeDefined();
    if (analiseMineracao) {
      expect(analiseMineracao.criterios.recorrencia.status).toBe("em_maturacao");
      expect(analiseMineracao.criterios.relevanciaColetiva.status).toBe("atendido");
      expect(analiseMineracao.criterios.viabilidadeApuracao.status).toBe("atendido");
      expect(analiseMineracao.status).toBe("em_observacao");
    }
  });

  it("deve registrar transparência institucional de itens descartados e fontes sem ocorrência", () => {
    expect(RADAR_ATUAL.itensDescartados).toBeDefined();
    expect(RADAR_ATUAL.itensDescartados?.length).toBe(8);

    expect(RADAR_ATUAL.fontesSemOcorrencias).toBeDefined();
    expect(RADAR_ATUAL.fontesSemOcorrencias?.length).toBe(1);
  });

  it("deve suportar histórico de ciclos anteriores arquivados", () => {
    const ciclos = obterTodosCiclos();
    expect(ciclos.length).toBeGreaterThanOrEqual(5);
    expect(HISTORICO_RADAR[0].periodo.inicio).toBe("2026-09-01");
    expect(HISTORICO_RADAR[1].periodo.inicio).toBe("2026-08-24");
    expect(HISTORICO_RADAR[2].periodo.inicio).toBe("2026-08-17");
    expect(HISTORICO_RADAR[3].periodo.inicio).toBe("2026-08-10");
    expect(HISTORICO_RADAR[4].periodo.inicio).toBe("2026-08-03");

    // Consulta específica por ciclo anterior
    const itensCicloAnterior = obterItensRadar(undefined, "ciclo-2026-08-24-2026-08-31");
    expect(itensCicloAnterior.length).toBe(2);
  });
});

