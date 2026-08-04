import { z } from "zod";

export const SETORES = [
  { valor: "agronegocio", rotulo: "Agronegócio" },
  { valor: "industria", rotulo: "Indústria" },
  { valor: "mineracao", rotulo: "Mineração" },
  { valor: "infraestrutura", rotulo: "Infraestrutura" },
  { valor: "saneamento", rotulo: "Saneamento" },
  { valor: "energia", rotulo: "Energia" },
  { valor: "outro", rotulo: "Outro" },
] as const;

const VALORES_SETOR = SETORES.map((s) => s.valor) as [string, ...string[]];

export const contatoSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome completo."),
  cargo: z.string().trim().min(2, "Informe seu cargo."),
  empresa: z.string().trim().min(2, "Informe o nome da empresa."),
  setor: z.enum(VALORES_SETOR),
  email: z.string().trim().email("Informe um e-mail válido."),
  telefone: z.string().trim().min(10, "Informe um telefone com DDD."),
  mensagem: z
    .string()
    .trim()
    .min(20, "Descreva sua solicitação em ao menos 20 caracteres."),
  /** Honeypot: campo escondido que só um robô preenche. */
  website: z.string().max(0, "Submissão rejeitada."),
});

export type ContatoInput = z.infer<typeof contatoSchema>;
