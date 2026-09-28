import { contrastRatio } from "./contraste";
import { PALETA } from "./paleta";


describe("paleta — conformidade WCAG AA", () => {
  it("osso sobre noite atinge AAA para corpo de texto", () => {
    expect(contrastRatio(PALETA.osso, PALETA.noite)).toBeGreaterThanOrEqual(7);
  });

  it("fumaça sobre noite atinge AA para corpo de texto", () => {
    expect(contrastRatio(PALETA.fumaca, PALETA.noite)).toBeGreaterThanOrEqual(4.5);
  });

  it("cobalto claro sobre noite atinge AA para corpo de texto", () => {
    expect(contrastRatio(PALETA.cobaltoClaro, PALETA.noite)).toBeGreaterThanOrEqual(4.5);
  });

  it("osso sobre carvão atinge AAA, para superfície elevada", () => {
    expect(contrastRatio(PALETA.osso, PALETA.carvao)).toBeGreaterThanOrEqual(7);
  });

  it("carvão (texto claro) sobre cobalto sólido atinge AA, para o botão primário", () => {
    expect(contrastRatio(PALETA.carvao, PALETA.cobalto)).toBeGreaterThanOrEqual(4.5);
  });

  it("cobalto puro serve como texto de alto contraste sobre a base clara", () => {
    expect(contrastRatio(PALETA.cobalto, PALETA.noite)).toBeGreaterThanOrEqual(4.5);
  });

  it("penumbra é decorativa: contraste baixo demais para carregar conteúdo", () => {
    expect(contrastRatio(PALETA.penumbra, PALETA.noite)).toBeLessThan(3);
  });

  /*
    Pares introduzidos pelo reposicionamento. Cards de observatório, triagem,
    etapas e expectativa usam `bg-carvao` com corpo em `fumaca` — combinação que
    carrega a maior parte do texto do site novo.
  */
  it("fumaça sobre carvão atinge AA: é o corpo de texto de todos os cards", () => {
    expect(contrastRatio(PALETA.fumaca, PALETA.carvao)).toBeGreaterThanOrEqual(
      4.5,
    );
  });

  it("cobalto claro sobre carvão atinge AA: kickers em superfície elevada", () => {
    expect(
      contrastRatio(PALETA.cobaltoClaro, PALETA.carvao),
    ).toBeGreaterThanOrEqual(4.5);
  });

  it("noite sobre cobalto claro atinge AA: estado hover do botão de envio", () => {
    expect(
      contrastRatio(PALETA.noite, PALETA.cobaltoClaro),
    ).toBeGreaterThanOrEqual(4.5);
  });
});
