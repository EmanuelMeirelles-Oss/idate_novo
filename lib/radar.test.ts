import { describe, expect, it } from "vitest";
import {
  RADAR_ATUAL,
  obterItensRadar,
  obterAnaliseRadar,
  contarItensRadar,
} from "@/content/radar";
import { OBSERVATORIOS } from "@/content/observatorios";

describe("Radar Regulatório Semanal", () => {
  it("deve conter dados válidos de ciclo e período", () => {
    expect(RADAR_ATUAL.periodo.inicio).toBe("2026-08-03");
    expect(RADAR_ATUAL.periodo.fim).toBe("2026-08-10");
    expect(RADAR_ATUAL.fontesVigiadas.length).toBeGreaterThan(0);
    expect(RADAR_ATUAL.fontesVigiadas).toContain("ANM");
    expect(RADAR_ATUAL.fontesVigiadas).toContain("DOU");
  });

  it("deve associar todos os itens a observatórios existentes", () => {
    const slugsValidos = new Set(OBSERVATORIOS.map((obs) => obs.slug));

    for (const item of RADAR_ATUAL.itens) {
      expect(slugsValidos.has(item.observatorio)).toBe(true);
      expect(item.titulo.length).toBeGreaterThan(10);
      expect(item.url).toMatch(/^https?:\/\//);
      expect(item.publicadoEm).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(item.perguntaVinculada.length).toBeGreaterThan(10);
    }
  });

  it("deve filtrar itens por observatório corretamente", () => {
    const itensMineracao = obterItensRadar("recursos-minerais");
    expect(itensMineracao.length).toBe(3);
    expect(contarItensRadar("recursos-minerais")).toBe(3);

    const itensEnergia = obterItensRadar("energia");
    expect(itensEnergia.length).toBe(1);
    expect(contarItensRadar("energia")).toBe(1);

    const itensAguas = obterItensRadar("aguas");
    expect(itensAguas.length).toBe(1);
    expect(contarItensRadar("aguas")).toBe(1);

    const itensTarifas = obterItensRadar("tarifas-publicas");
    expect(itensTarifas.length).toBe(1);
    expect(contarItensRadar("tarifas-publicas")).toBe(1);

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
    }

    const analiseEnergia = obterAnaliseRadar("energia");
    expect(analiseEnergia).toBeDefined();
    if (analiseEnergia) {
      expect(analiseEnergia.criterios.recorrencia.status).toBe("atendido");
      expect(analiseEnergia.criterios.relevanciaColetiva.status).toBe("atendido");
      expect(analiseEnergia.criterios.viabilidadeApuracao.status).toBe("atendido");
    }
  });
});
