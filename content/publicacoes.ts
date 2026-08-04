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

/**
 * PENDENTE: acervo da IMEPPI ainda não incorporado. Ver content/PENDENCIAS.md.
 * A interface acima é o contrato; acrescentar itens aqui é suficiente para que
 * apareçam na biblioteca, no observatório correspondente e nos filtros.
 */
export const PUBLICACOES: readonly Publicacao[] = [];

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
