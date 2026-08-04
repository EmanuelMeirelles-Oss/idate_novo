export const SITE = {
  nome: "IDATE",
  nomeCompleto: "Instituto dos Direitos da Água, Terra e Energia",
  descricao:
    "Associação civil sem fins econômicos dedicada à pesquisa e à produção de conhecimento técnico sobre os direitos da água, da terra e da energia.",
  /** PENDENTE: domínio definitivo. Ver content/PENDENCIAS.md. */
  url: "https://idate.org.br",
  versao: "2.0.0",
} as const;

/**
 * O lema organiza o site inteiro. A home o enuncia, a Central de Denúncias o
 * demonstra em sete etapas e os observatórios são o terceiro elo em operação.
 */
export const LEMA =
  "O IDATE transforma denúncias em conhecimento, conhecimento em evidências e evidências em mudanças." as const;

/**
 * A navegação lista apenas produção institucional. A Central de Denúncias fica
 * fora dela de propósito: é o CTA persistente (FloatingCTA), presente em todas
 * as páginas, e diluí-la entre cinco links de menu enfraqueceria justamente o
 * canal que o instituto quer destacar.
 */
export const NAVEGACAO = [
  { rotulo: "O Instituto", href: "/instituto" },
  { rotulo: "Observatórios", href: "/observatorios" },
  { rotulo: "Biblioteca", href: "/biblioteca" },
  { rotulo: "Como investigamos", href: "/metodologia" },
  { rotulo: "Contato", href: "/contato" },
] as const;

/** O botão persistente. Rótulo escolhido pelo instituto entre as variantes. */
export const CANAL = {
  nome: "Central Nacional de Denúncias",
  nomeCurto: "Central de Denúncias",
  acao: "Comunicar uma irregularidade",
  href: "/denuncia",
} as const;

/**
 * PENDENTE: o instituto ainda não forneceu dados institucionais.
 * Ver content/PENDENCIAS.md. Não publicar com estes valores.
 */
export const INSTITUCIONAL = {
  email: null as string | null,
  telefone: null as string | null,
  endereco: null as string | null,
  cnpj: null as string | null,
} as const;
