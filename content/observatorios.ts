/**
 * Os observatórios são a espinha dorsal do site. Não são "áreas de atuação"
 * nem linhas de serviço: cada um é um objeto de estudo permanente, com escopo
 * declarado e perguntas de pesquisa abertas.
 *
 * REGRA EDITORIAL — vale para este arquivo e para content/publicacoes.ts:
 * escopo e perguntas de pesquisa podem ser escritos agora porque descrevem
 * intenção institucional. Achados, números, conclusões e casos NÃO podem, e
 * entram apenas quando houver publicação real assinada. Um observatório vazio
 * é honesto; um observatório com estudo fabricado destrói a autoridade técnica
 * que é a razão de existir do instituto. Ver content/PENDENCIAS.md.
 */

export const EIXOS = {
  agua: { rotulo: "Água", ordem: 1 },
  terra: { rotulo: "Terra", ordem: 2 },
  energia: { rotulo: "Energia", ordem: 3 },
  transversal: { rotulo: "Transversal", ordem: 4 },
} as const;

export type IdEixo = keyof typeof EIXOS;

/**
 * `constituicao` — escopo definido, sem publicação ainda.
 * `ativo`        — produz publicações regularmente.
 *
 * Todos nascem em `constituicao`. Promover para `ativo` só quando houver
 * publicação real indexada.
 */
export type EstadoObservatorio = "constituicao" | "ativo";

export interface Observatorio {
  readonly slug: string;
  readonly nome: string;
  /** Usado em cards, migalhas e filtros, onde o nome completo não cabe. */
  readonly nomeCurto: string;
  readonly eixo: IdEixo;
  readonly estado: EstadoObservatorio;
  /** O que o observatório vigia. Uma frase, sem adjetivo de venda. */
  readonly escopo: string;
  /**
   * Perguntas de pesquisa em aberto. São o principal sinal de autoridade
   * enquanto não há publicações: mostram que existe agenda, não vitrine.
   */
  readonly perguntas: readonly string[];
}

export const OBSERVATORIOS: readonly Observatorio[] = [
  {
    slug: "energia",
    nome: "Observatório Nacional da Energia",
    nomeCurto: "Energia",
    eixo: "energia",
    estado: "constituicao",
    escopo:
      "Acompanha a formação de preços, os encargos setoriais e o regime jurídico da geração, transmissão e distribuição de energia elétrica no Brasil.",
    perguntas: [
      "Como os encargos setoriais se distribuem entre as classes de consumo e que critérios sustentam essa repartição?",
      "Que efeitos as revisões tarifárias periódicas produzem sobre consumidores industriais e rurais?",
      "Em que medida decisões dos tribunais superiores alteraram a composição da tarifa nas últimas décadas?",
    ],
  },
  {
    slug: "aguas",
    nome: "Observatório Nacional das Águas",
    nomeCurto: "Águas",
    eixo: "agua",
    estado: "constituicao",
    escopo:
      "Estuda o regime de outorgas, a cobrança pelo uso de recursos hídricos, os contratos de saneamento e a repartição de competências entre União, estados e municípios.",
    perguntas: [
      "Que critérios os entes federativos aplicam na cobrança pelo uso de recursos hídricos e qual sua base normativa?",
      "Como se estruturam as revisões tarifárias nos contratos de concessão de saneamento?",
      "Quais conflitos de competência recorrentes surgem entre órgãos gestores de bacias hidrográficas?",
    ],
  },
  {
    slug: "terras",
    nome: "Observatório Nacional das Terras",
    nomeCurto: "Terras",
    eixo: "terra",
    estado: "constituicao",
    escopo:
      "Examina regularização fundiária, restrições ambientais sobre a propriedade rural, servidões administrativas e desapropriações para infraestrutura.",
    perguntas: [
      "Como se calcula a indenização em servidões administrativas instituídas para linhas de transmissão e dutos?",
      "Que impactos as restrições ambientais produzem sobre o valor econômico da propriedade rural?",
      "Qual o estado da jurisprudência sobre sobreposição entre títulos dominiais e áreas protegidas?",
    ],
  },
  {
    slug: "emprestimo-compulsorio",
    nome: "Observatório do Empréstimo Compulsório da Energia Elétrica",
    nomeCurto: "Empréstimo Compulsório",
    eixo: "energia",
    estado: "constituicao",
    escopo:
      "Reúne legislação, jurisprudência e documentação sobre o empréstimo compulsório instituído em favor da Eletrobras e sobre os critérios de devolução aos consumidores.",
    perguntas: [
      "Como evoluiu o entendimento dos tribunais superiores sobre correção monetária e juros na devolução dos valores?",
      "Que documentação comprova a condição de consumidor contribuinte e como ela foi preservada ao longo do tempo?",
      "Quais os marcos prescricionais reconhecidos e como se comportaram ao longo das sucessivas decisões?",
    ],
  },
  {
    slug: "mercado-livre-energia",
    nome: "Observatório do Mercado Livre de Energia",
    nomeCurto: "Mercado Livre",
    eixo: "energia",
    estado: "constituicao",
    escopo:
      "Monitora a abertura do mercado livre, os contratos de compra e venda de energia, a migração de consumidores e as regras de comercialização.",
    perguntas: [
      "Que cláusulas contratuais concentram litígio recorrente entre comercializadoras e consumidores livres?",
      "Como as regras de migração afetam consumidores de médio porte?",
      "Que assimetrias de informação persistem na formação de preço no ambiente de contratação livre?",
    ],
  },
  {
    slug: "tarifas-publicas",
    nome: "Observatório de Tarifas Públicas",
    nomeCurto: "Tarifas Públicas",
    eixo: "transversal",
    estado: "constituicao",
    escopo:
      "Analisa a composição, a revisão e o controle das tarifas de serviços públicos delegados, com atenção à transparência dos componentes cobrados.",
    perguntas: [
      "Que componentes integram a tarifa e quais deles são efetivamente discriminados ao usuário?",
      "Como os tributos incidentes sobre serviços públicos delegados foram tratados pelos tribunais superiores?",
      "Que mecanismos de controle social sobre revisões tarifárias existem e como têm sido exercidos?",
    ],
  },
  {
    slug: "recursos-minerais",
    nome: "Observatório de Recursos Minerais",
    nomeCurto: "Recursos Minerais",
    eixo: "terra",
    estado: "ativo",
    escopo:
      "Acompanha o regime de outorga mineral, a compensação financeira pela exploração de recursos minerais e os passivos socioambientais da atividade.",
    perguntas: [
      "Como se distribui a compensação financeira pela exploração mineral entre os entes federativos?",
      "Que obrigações de recuperação ambiental incidem sobre áreas lavradas e como são fiscalizadas?",
      "Qual o tratamento jurídico dos conflitos entre atividade mineral e uso agrícola do solo?",
      "Que mudanças normativas podem resultar do sandbox regulatório para o setor mineral atualmente em consulta pública pela ANM?",
    ],
  },
  {
    slug: "grandes-consumidores",
    nome: "Observatório de Grandes Consumidores Industriais",
    nomeCurto: "Grandes Consumidores",
    eixo: "transversal",
    estado: "constituicao",
    escopo:
      "Estuda o regime jurídico e econômico aplicável a consumidores eletrointensivos e a grandes usuários de água, incluindo encargos, contratos e regimes especiais.",
    perguntas: [
      "Que regimes especiais se aplicam a consumidores eletrointensivos e sob que condições são mantidos?",
      "Como se comportam os custos regulatórios sobre indústrias de uso intensivo de água?",
      "Que efeitos as alterações legislativas recentes produziram sobre contratos de longo prazo?",
    ],
  },
] as const;

export type IdObservatorio = (typeof OBSERVATORIOS)[number]["slug"];

export function buscarObservatorio(slug: string): Observatorio | undefined {
  return OBSERVATORIOS.find((observatorio) => observatorio.slug === slug);
}

export function observatoriosPorEixo(eixo: IdEixo): readonly Observatorio[] {
  return OBSERVATORIOS.filter((observatorio) => observatorio.eixo === eixo);
}
