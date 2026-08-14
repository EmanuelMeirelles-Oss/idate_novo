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

export interface SecaoPublicacao {
  readonly subtitulo: string;
  readonly paragrafos: readonly string[];
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
  readonly fundamentacaoLegal?: readonly string[];
  readonly fontesOficiais?: readonly { readonly nome: string; readonly url: string }[];
  readonly secoes?: readonly SecaoPublicacao[];
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
    fundamentacaoLegal: [
      "Lei nº 12.334/2010 (Política Nacional de Segurança de Barragens — PNSB)",
      "Lei nº 14.066/2020 (Aprimoramento da fiscalização e eliminação de barragens a montante)",
      "Resolução ANM nº 95/2022 (Regulamento de Segurança de Barragens de Mineração)",
    ],
    fontesOficiais: [
      {
        nome: "ANM — Despacho da Relação nº 21/2026 (Processos Minerários em MG)",
        url: "https://atlaspublico.com.br/noticias/anm-fixa-prazos-para-exigencias-tecnicas-em-barragens-da-76870",
      },
    ],
    secoes: [
      {
        subtitulo: "1. Contexto e Deliberações da ANM",
        paragrafos: [
          "Por meio do Despacho referente à Relação nº 21/2026, a Agência Nacional de Mineração (ANM) deliberou sobre condicionantes técnicas de segurança e cadastramento de três estruturas minerárias críticas em Minas Gerais: a Barragem Maravilhas II (Vale, em Itabirito), a Barragem Mãe D'água (Green Metals, em Nova Era) e a barragem de contenção de rejeitos do Sistema Minas-Rio (Anglo American, em Santo Antônio do Grama).",
          "O ato administrativo fixou prazos peremptórios para o atendimento de notificações de engenharia e determinou a juntada de estudos complementares de estabilidade física e hidráulica.",
        ],
      },
      {
        subtitulo: "2. Indeferimento de Alteração Cadastral e Risco Estrutural",
        paragrafos: [
          "Dentre as decisões constantes no despacho, destaca-se o indeferimento do pedido formulado pela Anglo American para alteração dos parâmetros cadastrais da barragem de rejeitos vinculada ao mineroduto do Sistema Minas-Rio. A autoridade regulatória assentou que alterações de parâmetros sem prévia comprovação empírica de conformidade não atendem aos critérios de salvaguarda da Resolução ANM nº 95/2022.",
          "Adicionalmente, a estrutura Mãe D'água (Green Metals) permanece enquadrada na categoria de alto risco potencial associado, constando inclusive em Ação Civil Pública ajuizada pelo Ministério Público Federal (MPF) desde maio/2026 por inconformidades em sistemas de drenagem interna e monitoramento piezométrico.",
        ],
      },
      {
        subtitulo: "3. Avaliação Técnica e Implicações Jurídicas",
        paragrafos: [
          "A atuação da ANM sinaliza uma postura de endurecimento na concessão de prazos e na revisão de fichas cadastrais após a vigência plena da Lei nº 14.066/2020. Para o Observatório de Recursos Minerais do IDATE, a convergência de despachos sobre múltiplas operadoras na mesma semana exige vigilância sistemática sobre o cumprimento tempestivo dos planos de ação de emergência (PAEBM) e a transparência dos relatórios de Declaração de Condição de Estabilidade (DCE).",
        ],
      },
    ],
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
    fundamentacaoLegal: [
      "Lei nº 12.334/2010 (PNSB)",
      "Resolução ANM nº 95/2022 (Critérios para Descaracterização)",
      "Resolução ANM nº 13/2019 (Extinção de alteamento a montante)",
    ],
    fontesOficiais: [
      {
        nome: "ANM — Despacho da Relação nº 24/2026 (Processos de Mariana e Região Central de MG)",
        url: "https://atlaspublico.com.br/noticias/anm-determina-cumprimento-de-exigencia-tecnica-em-barragem-77137",
      },
    ],
    secoes: [
      {
        subtitulo: "1. Descaracterização da Barragem Campo Grande",
        paragrafos: [
          "A Barragem Campo Grande, situada no Complexo Minerário Alegria (Mariana/MG) e operada pela Vale S.A., encontra-se em processo formal de descaracterização estrutural. No Despacho da Relação nº 24/2026, a ANM indeferiu pleitos de flexibilização de etapas executivas e impôs o cumprimento rigoroso dos marcos acordados no Plano de Descaracterização.",
          "O acompanhamento contínuo dos volumes remanescentes de rejeito e do rebaixamento do lençol freático interno constitui obrigação inegociável sob o regime da Resolução ANM nº 95/2022.",
        ],
      },
      {
        subtitulo: "2. Indeferimento de Prorrogação à Extrativa Metalurgia",
        paragrafos: [
          "No mesmo ato normativo, a ANM rejeitou o pedido de prorrogação de prazo protocolado pela Extrativa Metalurgia para atendimento de pendências na barragem denominada Rejeitos, cominando uma exigência técnica suplementar com prazo improrrogável de 30 dias.",
          "O não atendimento no prazo estipulado enseja sanções administrativas imediatas, incluindo autuação por infração gravíssima e eventual interdição cautelar das atividades produtivas vinculadas ao barramento.",
        ],
      },
    ],
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
    fundamentacaoLegal: [
      "Constituição Federal de 1988, art. 20, § 1º (Regime constitucional da compensação financeira)",
      "Lei nº 7.990/1989 e Lei nº 8.001/1990",
      "Lei nº 13.540/2017 (Reestruturação das alíquotas e partilha federativa da CFEM)",
      "Decreto nº 9.407/2018 (Critérios de apuração para municípios afetados)",
    ],
    fontesOficiais: [
      {
        nome: "ANM — Notificação de Cobrança Administrativa de CFEM (30 Processos Fiscais)",
        url: "https://atlaspublico.com.br/noticias/agencia-nacional-de-mineracao-notifica-vale-e-outras-77138",
      },
    ],
    secoes: [
      {
        subtitulo: "1. Dimensão da Cobrança e Base de Incidência",
        paragrafos: [
          "Em agosto de 2026, a ANM expediu notificações de cobrança fiscal que totalizam R$ 11,5 bilhões em Compensação Financeira pela Exploração de Recursos Minerais (CFEM), distribuídos em cerca de 30 processos administrativos que apuram diferenças de recolhimento nas províncias minerais de Carajás (PA) e do Quadrilátero Ferrífero (MG).",
          "A controvérsia central reside na base de cálculo da receita bruta das vendas deduzida dos tributos incidentes e na apuração dos custos de transporte e beneficiamento nas operações de exportação intra-grupo econômico.",
        ],
      },
      {
        subtitulo: "2. Prazos e Rito de Inscrição em Dívida Ativa",
        paragrafos: [
          "As mineradoras notificadas contam com prazo de 10 (dez) dias corridos para efetuar o adimplemento voluntário ou apresentar recurso administrativo perante a diretoria colegiada da ANM. Esgotada a instância administrativa sem quitação ou garantia idônea, os créditos são encaminhados à Procuradoria Federal Especializada junto à ANM para inscrição em Dívida Ativa da União e execução fiscal judicial.",
        ],
      },
      {
        subtitulo: "3. Repercussão Fiscal sobre Municípios Produtores e Afetados",
        paragrafos: [
          "A Lei nº 13.540/2017 fixou a partilha da CFEM em 60% para os municípios produtores, 15% para os municípios afetados pela atividade (cortados por ferrovias, minerodutos ou sedes de estruturas de apoio), 15% para o Estado produtor e 10% para a União.",
          "O desfecho dessa cobrança bilionária tem impacto direto no orçamento de dezenas de municípios brasileiros dependentes de receitas extraordinárias de compensação mineral, demandando rigor no controle social e na correta destinação dos recursos.",
        ],
      },
    ],
  },
  {
    slug: "aneel-cde-orcamento-2026-impacto-tarifario-ubp",
    titulo:
      "Orçamento da CDE 2026 atinge R$ 52,7 bilhões: Pressão dos subsídios de GD e amortização via Uso do Bem Público",
    resumo:
      "Análise sobre o orçamento da Conta de Desenvolvimento Energético (CDE) para 2026, com R$ 47,8 bilhões rateados na tarifa de energia (alta de 15,4%), a expansão dos subsídios à Geração Distribuída e a liberação de R$ 5,48 bilhões em repactuação de UBP para conter reajustes.",
    tipo: "estudo",
    observatorio: "energia",
    autores: [{ nome: "Equipe Técnica do IDATE", titulacao: "Observatório Nacional da Energia" }],
    publicadoEm: "2026-08-08",
    tags: [
      "Energia Elétrica",
      "CDE",
      "Encargos Setoriais",
      "ANEEL",
      "Geração Distribuída",
      "Modicidade Tarifária",
    ],
    destaque: true,
    fundamentacaoLegal: [
      "Lei nº 10.438/2002 (Institui a Conta de Desenvolvimento Energético — CDE)",
      "Lei nº 14.300/2022 (Marco Legal da Microgeração e Minigeração Distribuída)",
      "Lei nº 15.269/2025 (Diretrizes de Modicidade e Mecanismos de Controle da CDE)",
      "Resolução Normativa ANEEL nº 1.000/2021 (Regras de Prestação do Serviço Público de Distribuição)",
    ],
    fontesOficiais: [
      {
        nome: "ANEEL — Proposta Orçamentária da CDE 2026 e Despachos Tarifários",
        url: "https://www.gov.br/aneel/pt-br/assuntos/noticias/2026",
      },
    ],
    secoes: [
      {
        subtitulo: "1. Composição do Orçamento da CDE e Repasse Tarifário",
        paragrafos: [
          "Para o exercício de 2026, a proposta orçamentária da Conta de Desenvolvimento Energético (CDE) alcançou a marca recorde de R$ 52,7 bilhões. Deste total, R$ 47,8 bilhões correspondem à parcela CDE-Uso, suportada diretamente pelos consumidores cativos e livres na conta de luz — um incremento de 15,4% em comparação ao ciclo tarifário anterior.",
          "O crescimento exponencial do encargo setorial, que quadruplicou em volume nominal nos últimos 15 anos, evidencia a transferência progressiva de custos de políticas públicas para a tarifa de uso da rede.",
        ],
      },
      {
        subtitulo: "2. Vetores de Expansão: Geração Distribuída e Fontes Incentivadas",
        paragrafos: [
          "O principal vetor de pressão sobre a CDE em 2026 é o custeio dos subsídios tarifários destinados à Geração Distribuída (GD), com projeção de alta de 87,4%, somado aos descontos concedidos no fio para fontes incentivadas e ao custeio da Tarifa Social de Energia Elétrica.",
          "Essa estrutura gera assimetria distributiva severa: consumidores que não têm capacidade de investimento em microgeração própria arcam com a totalidade dos custos de remuneração da infraestrutura de rede compartilhada.",
        ],
      },
      {
        subtitulo: "3. Medidas Mitigatórias: O Uso do Bem Público (UBP) e Perspectivas",
        paragrafos: [
          "Para evitar que as revisões tarifárias de 2026 superassem os dois dígitos (com projeções iniciais acima de 10% de alta média), a ANEEL liberou R$ 5,48 bilhões em recursos oriundos da repactuação do Uso do Bem Público (UBP) de hidrelétricas, com foco preferencial nas distribuidoras das regiões Norte e Nordeste.",
          "Embora a utilização de receitas extraordinárias atenue o impacto conjuntural de curto prazo, o Observatório Nacional da Energia destaca a urgência de uma reforma estrutural na legislação da CDE para salvaguardar a modicidade tarifária e a competitividade da indústria nacional.",
        ],
      },
    ],
  },
  {
    slug: "ana-norma-referencia-13-2025-estrutura-tarifaria-saneamento",
    titulo:
      "Norma de Referência ANA nº 13/2025: Padronização da estrutura tarifária e diretrizes da Tarifa Social no Saneamento",
    resumo:
      "Análise da Resolução ANA nº 271/2025 que aprovou a Norma de Referência nº 13/2025, fixando diretrizes nacionais para padronização de estruturas tarifárias, mecanismos de subsidiação cruzada, transparência das faturas e critérios de Tarifa Social.",
    tipo: "nota-tecnica",
    observatorio: "aguas",
    autores: [{ nome: "Equipe Técnica do IDATE", titulacao: "Observatório Nacional das Águas" }],
    publicadoEm: "2026-08-09",
    tags: [
      "Saneamento Básico",
      "ANA",
      "Estrutura Tarifária",
      "Tarifa Social",
      "Recursos Hídricos",
      "Regulação Infranacional",
    ],
    destaque: true,
    fundamentacaoLegal: [
      "Lei nº 11.445/2007, alterada pela Lei nº 14.026/2020 (Novo Marco Legal do Saneamento Básico)",
      "Resolução ANA nº 271/2025 (Aprova a Norma de Referência nº 13/2025)",
      "Resolução ANA nº 277/2025 (Revisão da Agenda Regulatória 2025-2026)",
      "Decreto Federal nº 11.598/2023 (Comprovação da capacidade econômico-financeira dos prestadores)",
    ],
    fontesOficiais: [
      {
        nome: "ANA — Resolução nº 271/2025 e Norma de Referência nº 13/2025",
        url: "https://www.gov.br/ana/pt-br/assuntos/saneamento-basico",
      },
    ],
    secoes: [
      {
        subtitulo: "1. Harmonização das Agências Infranacionais e Competência da ANA",
        paragrafos: [
          "Com base na competência outorgada pelo Novo Marco Legal do Saneamento (Lei nº 14.026/2020), a Agência Nacional de Águas e Saneamento Básico (ANA) editou a Resolução nº 271/2025, estabelecendo a NR nº 13/2025. O ato visa superar a histórica fragmentação de critérios regulatórios entre as mais de 80 agências infranacionais (municipais, intermunicipais e estaduais) em operação no país.",
          "A adesão às normas de referência constitui condicionante expressa para que os entes subnacionais e seus prestadores tenham acesso a recursos públicos federais e a financiamentos com recursos da União.",
        ],
      },
      {
        subtitulo: "2. Estrutura Tarifária em Blocos e Tarifa Social Unificada",
        paragrafos: [
          "A norma determina parâmetros técnicos claros para a cobrança por disponibilidade (parcela fixa) e por volume consumido (parcela variável), desincentivando o consumo predatório e garantindo sustentabilidade econômico-financeira ao operador.",
          "No tocante à Tarifa Social, a NR nº 13/2025 uniformiza os critérios de elegibilidade vinculados ao Cadastro Único (CadÚnico) e estabelece diretrizes de subsidiação cruzada que asseguram acesso mínimo essencial à água potável e coleta de esgoto para famílias em vulnerabilidade extrema, sem comprometer o equilíbrio contratual da concessão.",
        ],
      },
      {
        subtitulo: "3. Transparência Faturária e Fiscalização de Metas",
        paragrafos: [
          "A resolução impõe aos prestadores obrigações rigorosas de detalhamento nas contas emitidas aos usuários, discriminando custos de captação, adução, tratamento, reservação e esgotamento sanitário. Para o Observatório Nacional das Águas, o próximo gargalo regulatório reside na fiscalização tempestiva da conformidade dessas regras pelas agências delegadas.",
        ],
      },
    ],
  },
  {
    slug: "stj-tema-986-tema-1429-tusd-tust-icms-energia",
    titulo:
      "TUSD e TUST no ICMS: A modulação de efeitos do Tema 986 pelo STJ e a afetação do Tema 1429",
    resumo:
      "Exame da fixação pelo STJ da tese do Tema 986 (inclusão da TUST/TUSD na base de cálculo do ICMS da energia elétrica), da chancela de natureza infraconstitucional pelo STF e dos efeitos da afetação do Tema 1429 sobre a repetição de indébito para consumidores livres.",
    tipo: "jurisprudencia",
    observatorio: "tarifas-publicas",
    autores: [{ nome: "Equipe Técnica do IDATE", titulacao: "Observatório de Tarifas Públicas" }],
    publicadoEm: "2026-08-10",
    tags: [
      "Tributação da Energia",
      "TUSD",
      "TUST",
      "ICMS",
      "STJ",
      "Tema 986",
      "Tema 1429",
      "Grandes Consumidores",
    ],
    destaque: false,
    fundamentacaoLegal: [
      "Lei Complementar nº 87/1996 (Lei Kandir, art. 2º, § 1º, III, e art. 13, § 1º, II, 'a')",
      "Lei Complementar nº 194/2022 (Exclusão da TUST/TUSD — com eficácia suspensa na ADI 7195/STF)",
      "Superior Tribunal de Justiça — REsp 1.692.023/MT e Tema Repetitivo 986",
      "Superior Tribunal de Justiça — Afetação do Tema Repetitivo 1429",
      "Supremo Tribunal Federal — ADI 7195 e Tema 956 da Repercussão Geral",
    ],
    fontesOficiais: [
      {
        nome: "Superior Tribunal de Justiça — Jurisprudência em Teses e Temas Repetitivos 986 e 1429",
        url: "https://www.stj.jus.br",
      },
    ],
    secoes: [
      {
        subtitulo: "1. O Julgamento de Mérito do Tema 986 pelo STJ",
        paragrafos: [
          "A 1ª Seção do Superior Tribunal de Justiça, ao apreciar os recursos especiais representativos da controvérsia no Tema 986, pacificou o entendimento de que a Tarifa de Uso do Sistema de Transmissão (TUST) e a Tarifa de Uso do Sistema de Distribuição (TUSD) integram a base de cálculo do ICMS quando lançadas diretamente na fatura de energia elétrica do consumidor final (livre ou cativo).",
          "O tribunal considerou que a transmissão e a distribuição configuram etapas operacionais indissociáveis do ciclo de fornecimento da energia elétrica, integrando o preço final da operação mercantil.",
        ],
      },
      {
        subtitulo: "2. Modulação Temporal e Segurança Jurídica",
        paragrafos: [
          "O acórdão do STJ estabeleceu modulação temporal estrita: a cobrança retroativa foi obstada unicamente em relação aos contribuintes que, até 27 de março de 2017, obtiveram provimentos liminares favoráveis que os desobrigaram do recolhimento, resguardando o período em que vigoraram tais decisões.",
          "Para todos os demais contribuintes e para o período posterior à publicação do acórdão, a incidência da exação tributária sobre os encargos de conexão e uso da rede é mandatória.",
        ],
      },
      {
        subtitulo: "3. O Desdobramento no Tema 1429/STJ e Impactos Industriais",
        paragrafos: [
          "Com o mérito estabilizado e o STF reconhecendo a natureza puramente infraconstitucional da controvérsia, o STJ afetou recentemente o Tema 1429 para solucionar controvérsias residuais sobre sucumbência e o direito à repetição de indébito de contribuintes que efetuaram o pagamento sob protesto ou depósito judicial.",
          "Para o Observatório de Tarifas Públicas e Grandes Consumidores do IDATE, a conformação definitiva dessas teses impacta substancialmente o custo fixo de eletrointensivos e define o passivo fiscal contingente das concessionárias de distribuição.",
        ],
      },
    ],
  },
];

export function buscarPublicacao(slug: string): Publicacao | undefined {
  return PUBLICACOES.find((publicacao) => publicacao.slug === slug);
}

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
