import { z } from "zod";

export const UFS = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS",
  "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC",
  "SP", "SE", "TO",
] as const;

export const EIXOS_DENUNCIA = [
  { valor: "agua", rotulo: "Água" },
  { valor: "terra", rotulo: "Terra" },
  { valor: "energia", rotulo: "Energia" },
] as const;

export const VINCULOS = [
  { valor: "cidadao", rotulo: "Cidadão" },
  { valor: "empresa", rotulo: "Empresa" },
  { valor: "associacao", rotulo: "Associação ou entidade de classe" },
  { valor: "servidor", rotulo: "Servidor público" },
  { valor: "outro", rotulo: "Outro" },
] as const;

const VALORES_EIXO = EIXOS_DENUNCIA.map((e) => e.valor) as [string, ...string[]];
const VALORES_VINCULO = VINCULOS.map((v) => v.valor) as [string, ...string[]];

/**
 * O anonimato é a decisão estrutural deste schema. Denunciante que teme
 * retaliação — empregado, fornecedor, morador — não se identifica, e exigir
 * identificação eliminaria justamente as comunicações de maior risco e maior
 * valor informativo.
 *
 * A consequência é que `nome` e `email` só podem ser obrigatórios
 * condicionalmente, o que exige `superRefine`: o Zod não expressa "obrigatório
 * se outro campo for falso" de forma declarativa sem um union.
 */
export const denunciaSchema = z
  .object({
    anonimo: z.boolean(),

    nome: z.string().trim().max(120).optional().or(z.literal("")),
    email: z.string().trim().max(160).optional().or(z.literal("")),
    telefone: z.string().trim().max(40).optional().or(z.literal("")),
    vinculo: z.enum(VALORES_VINCULO),

    eixo: z.enum(VALORES_EIXO),
    assunto: z
      .string()
      .trim()
      .min(5, "Resuma o assunto em ao menos 5 caracteres.")
      .max(140, "O assunto deve ter no máximo 140 caracteres."),
    /*
      100 caracteres é um piso pensado para a triagem, não para o formulário:
      relatos curtos demais não permitem classificação nem verificação de
      recorrência, e entrariam no acervo como ruído.
    */
    descricao: z
      .string()
      .trim()
      .min(100, "Descreva os fatos em ao menos 100 caracteres.")
      .max(8000, "A descrição deve ter no máximo 8000 caracteres."),

    estado: z.enum(UFS),
    municipio: z.string().trim().min(2, "Informe o município."),

    empresas: z.string().trim().max(500).optional().or(z.literal("")),
    orgaos: z.string().trim().max(500).optional().or(z.literal("")),
    documentos: z.string().trim().max(1000).optional().or(z.literal("")),

    consentimento: z.literal(true, {
      message: "É necessário confirmar a veracidade das informações.",
    }),

    /** Honeypot: campo escondido que só um robô preenche. */
    website: z.string().max(0, "Submissão rejeitada."),
  })
  .superRefine((dados, ctx) => {
    if (dados.anonimo) return;

    if (!dados.nome || dados.nome.length < 2) {
      ctx.addIssue({
        code: "custom",
        path: ["nome"],
        message: "Informe seu nome ou marque a opção de comunicação anônima.",
      });
    }

    const email = dados.email ?? "";
    if (!email) {
      ctx.addIssue({
        code: "custom",
        path: ["email"],
        message: "Informe um e-mail para contato ou comunique anonimamente.",
      });
    } else if (!z.string().email().safeParse(email).success) {
      ctx.addIssue({
        code: "custom",
        path: ["email"],
        message: "Informe um e-mail válido.",
      });
    }
  });

export type DenunciaInput = z.infer<typeof denunciaSchema>;

export function rotuloEixo(valor: string): string {
  return EIXOS_DENUNCIA.find((e) => e.valor === valor)?.rotulo ?? valor;
}

export function rotuloVinculo(valor: string): string {
  return VINCULOS.find((v) => v.valor === valor)?.rotulo ?? valor;
}
