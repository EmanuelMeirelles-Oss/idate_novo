import { describe, expect, it } from "vitest";
import { denunciaSchema } from "./denuncia-schema";

const BASE = {
  anonimo: false,
  nome: "Maria Souza",
  email: "maria@exemplo.com",
  telefone: "48999998888",
  vinculo: "cidadao",
  eixo: "energia",
  assunto: "Cobrança de encargo sem previsão normativa",
  descricao:
    "A concessionária passou a cobrar um encargo que não consta da resolução vigente. A cobrança começou em janeiro e atinge todos os consumidores do município, sem qualquer comunicação prévia ou justificativa técnica publicada.",
  estado: "SC",
  municipio: "Florianópolis",
  empresas: "",
  orgaos: "",
  documentos: "",
  consentimento: true,
  website: "",
};

function erros(dados: Record<string, unknown>): string[] {
  const resultado = denunciaSchema.safeParse(dados);
  if (resultado.success) return [];
  return resultado.error.issues.map((problema) => problema.path.join("."));
}

describe("denunciaSchema", () => {
  it("aceita uma comunicação identificada e completa", () => {
    expect(denunciaSchema.safeParse(BASE).success).toBe(true);
  });

  describe("anonimato", () => {
    it("dispensa nome e e-mail quando a comunicação é anônima", () => {
      const anonima = { ...BASE, anonimo: true, nome: "", email: "", telefone: "" };
      expect(denunciaSchema.safeParse(anonima).success).toBe(true);
    });

    it("exige nome quando o denunciante escolhe se identificar", () => {
      expect(erros({ ...BASE, nome: "" })).toContain("nome");
    });

    it("exige e-mail quando o denunciante escolhe se identificar", () => {
      expect(erros({ ...BASE, email: "" })).toContain("email");
    });

    it("rejeita e-mail malformado em comunicação identificada", () => {
      expect(erros({ ...BASE, email: "maria@" })).toContain("email");
    });
  });

  describe("descrição dos fatos", () => {
    it("rejeita relato curto demais para permitir triagem", () => {
      expect(erros({ ...BASE, descricao: "Cobrança errada na conta." })).toContain(
        "descricao",
      );
    });

    it("aceita relato no limite mínimo de 100 caracteres", () => {
      const cem = "a".repeat(100);
      expect(denunciaSchema.safeParse({ ...BASE, descricao: cem }).success).toBe(
        true,
      );
    });
  });

  describe("localização", () => {
    it("rejeita unidade federativa inexistente", () => {
      expect(erros({ ...BASE, estado: "XX" })).toContain("estado");
    });

    it("exige município", () => {
      expect(erros({ ...BASE, municipio: "" })).toContain("municipio");
    });
  });

  it("exige confirmação de veracidade", () => {
    expect(erros({ ...BASE, consentimento: false })).toContain("consentimento");
  });

  it("rejeita submissão com o honeypot preenchido", () => {
    expect(erros({ ...BASE, website: "http://spam.example" })).toContain(
      "website",
    );
  });

  it("rejeita eixo fora dos três previstos", () => {
    expect(erros({ ...BASE, eixo: "mineracao" })).toContain("eixo");
  });
});
