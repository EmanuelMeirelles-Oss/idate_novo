import { describe, it, expect } from "vitest";
import { contatoSchema } from "./contato-schema";

const valido = {
  nome: "Maria Andrade",
  cargo: "Diretora Financeira",
  empresa: "Agroindustrial Paraná S.A.",
  setor: "agronegocio",
  email: "maria@exemplo.com.br",
  telefone: "4133334444",
  mensagem:
    "Gostaríamos de avaliar direitos relacionados a encargos do setor elétrico.",
  website: "",
};

describe("contatoSchema", () => {
  it("aceita uma submissão válida", () => {
    expect(contatoSchema.safeParse(valido).success).toBe(true);
  });

  it("rejeita e-mail malformado", () => {
    const r = contatoSchema.safeParse({ ...valido, email: "maria@" });
    expect(r.success).toBe(false);
  });

  it("rejeita mensagem curta demais", () => {
    const r = contatoSchema.safeParse({ ...valido, mensagem: "oi" });
    expect(r.success).toBe(false);
  });

  it("rejeita setor fora da lista", () => {
    const r = contatoSchema.safeParse({ ...valido, setor: "turismo" });
    expect(r.success).toBe(false);
  });

  it("rejeita quando o honeypot está preenchido", () => {
    const r = contatoSchema.safeParse({ ...valido, website: "spam" });
    expect(r.success).toBe(false);
  });

  it("remove espaços nas pontas do nome", () => {
    const r = contatoSchema.safeParse({ ...valido, nome: "  Maria Andrade  " });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.nome).toBe("Maria Andrade");
  });
});
