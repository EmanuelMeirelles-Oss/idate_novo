/**
 * Fonte única da paleta. Os mesmos valores são declarados em app/globals.css
 * como tokens do Tailwind; este módulo existe para que os testes de contraste
 * verifiquem os valores reais em vez de cópias.
 *
 * Base escura neutra com um acento só, o cobalto da marca.
 *
 * `cobalto` é cor de preenchimento, não de texto: sobre a base ele tem 2.2:1 e
 * seria ilegível. Texto em acento usa `cobaltoClaro`. Botão sólido usa fundo
 * `cobalto` com texto `osso`, que dá 8.8:1.
 *
 * `penumbra` é o estado "ainda não revelado" das linhas da seção escura.
 * Deliberadamente de baixíssimo contraste, decorativo, nunca portador de
 * conteúdo: sob prefers-reduced-motion o CSS força essas linhas para `osso`.
 */
export const PALETA = {
  noite: "#0A0C10",
  carvao: "#14171D",
  osso: "#E9EBEF",
  fumaca: "#8B93A1",
  cobalto: "#1236C8",
  cobaltoClaro: "#5B7CFF",
  penumbra: "#2C3340",
} as const;

export type NomeCor = keyof typeof PALETA;
