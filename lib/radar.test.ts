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
    expect(itensEnergia.length).toBe(0);
    expect(contarItensRadar("energia")).toBe(0);
  });

  it("deve conter análise metodológica com os 3 critérios do IDATE", () => {
    const analise = obterAnaliseRadar("recursos-minerais");
    expect(analise).toBeDefined();
    if (analise) {
      expect(analise.criterios.recorrencia).toBeDefined();
      expect(analise.criterios.recorrencia.status).toBe("em_maturacao");
      expect(analise.criterios.relevanciaColetiva.status).toBe("atendido");
      expect(analise.criterios.viabilidadeApuracao.status).toBe("atendido");
    }
  });
});
