import { describe, it, expect } from "vitest";
import {
  PUBLICACOES,
  buscarPublicacao,
  publicacoesDoObservatorio,
  publicacoesPorTipo,
  publicacoesRecentes,
  tiposComPublicacao,
} from "@/content/publicacoes";

describe("Modelo de Publicações do Acervo", () => {
  it("deve carregar as publicações cadastradas com integridade estrutural", () => {
    expect(PUBLICACOES.length).toBeGreaterThanOrEqual(3);

    for (const pub of PUBLICACOES) {
      expect(pub.slug).toBeTruthy();
      expect(pub.titulo).toBeTruthy();
      expect(pub.resumo).toBeTruthy();
      expect(pub.publicadoEm).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(pub.autores.length).toBeGreaterThan(0);
      expect(pub.secoes && pub.secoes.length).toBeGreaterThan(0);
    }
  });

  it("deve buscar uma publicação existente por slug", () => {
    const pub = buscarPublicacao("anm-exigencias-tecnicas-barragens-mg-2026");
    expect(pub).toBeDefined();
    expect(pub?.observatorio).toBe("recursos-minerais");
    expect(pub?.tipo).toBe("nota-tecnica");
  });

  it("deve retornar undefined para slug inexistente", () => {
    const pub = buscarPublicacao("slug-que-nao-existe");
    expect(pub).toBeUndefined();
  });

  it("deve filtrar publicações por observatório", () => {
    const pubs = publicacoesDoObservatorio("recursos-minerais");
    expect(pubs.length).toBe(3);
    const vazias = publicacoesDoObservatorio("energia");
    expect(vazias.length).toBe(0);
  });

  it("deve filtrar publicações por tipo", () => {
    const notas = publicacoesPorTipo("nota-tecnica");
    expect(notas.length).toBe(2);
    const estudos = publicacoesPorTipo("estudo");
    expect(estudos.length).toBe(1);
  });

  it("deve retornar os tipos que possuem publicações", () => {
    const tipos = tiposComPublicacao();
    expect(tipos).toContain("nota-tecnica");
    expect(tipos).toContain("estudo");
  });

  it("deve ordenar publicações recentes por data decrescente", () => {
    const recentes = publicacoesRecentes(2);
    expect(recentes.length).toBe(2);
    expect(recentes[0].publicadoEm >= recentes[1].publicadoEm).toBe(true);
  });
});
