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
    expect(RADAR_ATUAL.periodo.inicio).toBe("2026-08-17");
    expect(RADAR_ATUAL.periodo.fim).toBe("2026-08-24");
    expect(RADAR_ATUAL.periodo.rotulo).toBe("17 a 24/08/2026");
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
    const itensEnergia = obterItensRadar("energia");
    expect(itensEnergia.length).toBe(1);
    expect(contarItensRadar("energia")).toBe(1);

    const itensMineracao = obterItensRadar("recursos-minerais");
    expect(itensMineracao.length).toBe(2);
    expect(contarItensRadar("recursos-minerais")).toBe(2);

    const itensAguas = obterItensRadar("aguas");
    expect(itensAguas.length).toBe(1);
    expect(contarItensRadar("aguas")).toBe(1);

    const itensTarifas = obterItensRadar("tarifas-publicas");
    expect(itensTarifas.length).toBe(0);
    expect(contarItensRadar("tarifas-publicas")).toBe(0);

    const itensTerras = obterItensRadar("terras");
    expect(itensTerras.length).toBe(0);
    expect(contarItensRadar("terras")).toBe(0);
  });

  it("deve conter análise metodológica com os 3 critérios do IDATE", () => {
    const analiseMinerais = obterAnaliseRadar("recursos-minerais");
    expect(analiseMinerais).toBeDefined();
    if (analiseMinerais) {
      expect(analiseMinerais.criterios.recorrencia).toBeDefined();
      expect(analiseMinerais.criterios.recorrencia.status).toBe("em_maturacao");
      expect(analiseMinerais.criterios.relevanciaColetiva.status).toBe("atendido");
      expect(analiseMinerais.criterios.viabilidadeApuracao.status).toBe("atendido");
      expect(analiseMinerais.status).toBe("em_observacao");
    }

    const analiseEnergia = obterAnaliseRadar("energia");
    expect(analiseEnergia).toBeDefined();
    if (analiseEnergia) {
      expect(analiseEnergia.criterios.recorrencia.status).toBe("em_maturacao");
      expect(analiseEnergia.criterios.relevanciaColetiva.status).toBe("atendido");
      expect(analiseEnergia.criterios.viabilidadeApuracao.status).toBe("atendido");
      expect(analiseEnergia.status).toBe("em_observacao");
    }

    const analiseAguas = obterAnaliseRadar("aguas");
    expect(analiseAguas).toBeDefined();
    if (analiseAguas) {
      expect(analiseAguas.criterios.recorrencia.status).toBe("em_maturacao");
      expect(analiseAguas.criterios.relevanciaColetiva.status).toBe("atendido");
      expect(analiseAguas.criterios.viabilidadeApuracao.status).toBe("atendido");
      expect(analiseAguas.status).toBe("em_observacao");
    }
  });

  it("deve registrar transparência institucional de itens descartados e fontes sem ocorrência", () => {
    expect(RADAR_ATUAL.itensDescartados).toBeDefined();
    expect(RADAR_ATUAL.itensDescartados?.length).toBe(3);

    expect(RADAR_ATUAL.fontesSemOcorrencias).toBeDefined();
    expect(RADAR_ATUAL.fontesSemOcorrencias?.length).toBe(1);
  });

  it("deve suportar histórico de ciclos anteriores arquivados", () => {
    const ciclos = obterTodosCiclos();
    expect(ciclos.length).toBeGreaterThanOrEqual(3);
    expect(HISTORICO_RADAR[0].periodo.inicio).toBe("2026-08-17");
    expect(HISTORICO_RADAR[1].periodo.inicio).toBe("2026-08-10");
    expect(HISTORICO_RADAR[2].periodo.inicio).toBe("2026-08-03");

    // Consulta específica por ciclo anterior
    const itensCicloAnterior = obterItensRadar(undefined, "ciclo-2026-08-10-2026-08-17");
    expect(itensCicloAnterior.length).toBe(4);
  });
});

