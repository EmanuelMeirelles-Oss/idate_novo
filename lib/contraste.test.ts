import { describe, it, expect } from "vitest";
import { contrastRatio } from "./contraste";

describe("contrastRatio", () => {
  it("retorna 21 para preto contra branco", () => {
    expect(contrastRatio("#000000", "#FFFFFF")).toBeCloseTo(21, 1);
  });

  it("retorna 1 para uma cor contra ela mesma", () => {
    expect(contrastRatio("#1236C8", "#1236C8")).toBeCloseTo(1, 5);
  });

  it("é simétrico", () => {
    expect(contrastRatio("#F2F1EE", "#0F1110")).toBeCloseTo(
      contrastRatio("#0F1110", "#F2F1EE"),
      5,
    );
  });

  it("rejeita hex inválido", () => {
    expect(() => contrastRatio("#GGG", "#FFFFFF")).toThrow();
  });
});
