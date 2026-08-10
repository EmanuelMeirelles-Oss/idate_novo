import type { IdObservatorio } from "@/content/observatorios";

/**
 * Modelo do acervo. Este arquivo existe para que o conteúdo produzido pelos
 * pesquisadores entre por preenchimento, não por reengenharia: quando o acervo
 * da IMEPPI for incorporado, basta acrescentar objetos a `PUBLICACOES`.
 *
 * Nenhuma publicação é declarada aqui até que exista documento real assinado.
 * O array vazio não é esquecimento — é a posição editorial descrita em
 * content/observatorios.ts e content/PENDENCIAS.md.
 */

export const TIPOS_PUBLICACAO = {
  "nota-tecnica": {
    rotulo: "Nota técnica",
    plural: "Notas técnicas",
    descricao:
      "Análise objetiva de um problema específico, com posição técnica fundamentada.",
  },
  estudo: {
    rotulo: "Estudo",
    plural: "Estudos",
    descricao:
      "Pesquisa extensa sobre um tema, com levantamento normativo e jurisprudencial.",
  },
  artigo: {
    rotulo: "Artigo",
    plural: "Artigos técnicos",
    descricao: "Texto autoral de análise, assinado por pesquisador do instituto.",
  },
  parecer: {
    rotulo: "Parecer",
    plural: "Pareceres",
    descricao: "Manifestação jurídica sobre questão determinada.",
  },
  jurisprudencia: {
    rotulo: "Jurisprudência comentada",
    plural: "Jurisprudência comentada",
    descricao: "Decisão judicial relevante acompanhada de análise crítica.",
  },
  "linha-do-tempo": {
    rotulo: "Linha do tempo",
    plural: "Linhas do tempo",
    descricao: "Reconstrução cronológica da evolução normativa de um tema.",
  },
  caso: {
    rotulo: "Caso emblemático",
    plural: "Casos emblemáticos",
    descricao: "Situação concreta documentada por seu valor de precedente.",
  },
  infografico: {
    rotulo: "Infográfico",
    plural: "Infográficos",
    descricao: "Representação visual de dados ou de estrutura normativa.",
  },
  indicador: {
    rotulo: "Indicador",
    plural: "Indicadores",
    descricao: "Série de dados acompanhada periodicamente pelo observatório.",
  },
} as const;

export type TipoPublicacao = keyof typeof TIPOS_PUBLICACAO;

export interface Autor {
  readonly nome: string;
  /** Ex.: "Doutor em Direito Regulatório". Opcional: nem todo autor titula. */
  readonly titulacao?: string;
}

export interface Arquivo {
  readonly src: string;
  readonly paginas?: number;
  readonly tamanhoKb?: number;
}

export interface Publicacao {
  readonly slug: string;
  readonly titulo: string;
  /** Duas a três frases. É o que aparece nos cards e nos resultados de busca. */
  readonly resumo: string;
  readonly tipo: TipoPublicacao;
  readonly observatorio: IdObservatorio;
  readonly autores: readonly Autor[];
  /** ISO 8601 (AAAA-MM-DD). Ordenação e `<time dateTime>` dependem disso. */
  readonly publicadoEm: string;
  readonly atualizadoEm?: string;
  readonly tags: readonly string[];
  readonly arquivo?: Arquivo;
  /** Marca a publicação para aparecer na home e no topo do observatório. */
  readonly destaque?: boolean;
}

export const PUBLICACOES: readonly Publicacao[] = [
  {
    slug: "anm-exigencias-tecnicas-barragens-mg-2026",
    titulo:
      "ANM fixa prazos para exigências técnicas em barragens da Vale, Anglo American e Green Metals",
    resumo:
      "Análise regulatória sobre o Despacho da Relação nº 21/2026 da ANM, que fixou prazos técnicos nas barragens Maravilhas II, Mãe D'água e Sistema Minas-Rio, indeferindo alteração cadastral requerida pela Anglo American sob a Lei nº 12.334/2010.",
    tipo: "nota-tecnica",
    observatorio: "recursos-minerais",
    autores: [{ nome: "Equipe Técnica do IDATE", titulacao: "Observatório de Recursos Minerais" }],
    publicadoEm: "2026-08-04",
    tags: ["Mineração", "Segurança de Barragens", "ANM", "Vale", "Anglo American", "Green Metals"],
    destaque: true,
  },
  {
    slug: "anm-exigencia-campo-grande-extrativa-2026",
    titulo:
      "ANM determina cumprimento de exigência técnica em barragem Campo Grande da Vale e indefere prorrogação à Extrativa Metalurgia",
    resumo:
      "Avaliação técnica do Despacho da Relação nº 24/2026 da ANM referente aos prazos de descaracterização na barragem Campo Grande (Mariana/MG) e imposição de exigência técnica com prazo de 30 dias na barragem Rejeitos da Extrativa Metalurgia.",
    tipo: "nota-tecnica",
    observatorio: "recursos-minerais",
    autores: [{ nome: "Equipe Técnica do IDATE", titulacao: "Observatório de Recursos Minerais" }],
    publicadoEm: "2026-08-05",
    tags: ["Mineração", "Descaracterização de Barragens", "ANM", "Vale", "Extrativa Metalurgia"],
    destaque: false,
  },
  {
    slug: "anm-notificacao-cobranca-cfem-11-bi",
    titulo:
      "Notificação da ANM a mineradoras para pagamento de R$ 11,5 bilhões em CFEM: Impactos na partilha federativa",
    resumo:
      "Exame analítico sobre a notificação de cobrança de R$ 11,5 bilhões em CFEM em 30 processos administrativos no Pará e em Minas Gerais, avaliando o prazo de defesa de 10 dias e o impacto na arrecadação dos municípios mineradores e afetados.",
    tipo: "estudo",
    observatorio: "recursos-minerais",
    autores: [{ nome: "Equipe Técnica do IDATE", titulacao: "Observatório de Recursos Minerais" }],
    publicadoEm: "2026-08-05",
    tags: ["CFEM", "Compensação Financeira", "Federalismo Fiscal", "ANM", "Vale"],
    destaque: true,
  },
];

export function publicacoesDoObservatorio(
  observatorio: IdObservatorio,
): readonly Publicacao[] {
  return PUBLICACOES.filter(
    (publicacao) => publicacao.observatorio === observatorio,
  );
}

export function publicacoesPorTipo(
  tipo: TipoPublicacao,
): readonly Publicacao[] {
  return PUBLICACOES.filter((publicacao) => publicacao.tipo === tipo);
}

/** Mais recentes primeiro. `limite` ausente devolve tudo. */
export function publicacoesRecentes(limite?: number): readonly Publicacao[] {
  const ordenadas = [...PUBLICACOES].sort((a, b) =>
    b.publicadoEm.localeCompare(a.publicadoEm),
  );
  return limite === undefined ? ordenadas : ordenadas.slice(0, limite);
}

export function publicacoesEmDestaque(): readonly Publicacao[] {
  return PUBLICACOES.filter((publicacao) => publicacao.destaque === true);
}

/** Tipos que têm ao menos uma publicação — para não renderizar filtro vazio. */
export function tiposComPublicacao(): readonly TipoPublicacao[] {
  const presentes = new Set(PUBLICACOES.map((publicacao) => publicacao.tipo));
  return [...presentes];
}
