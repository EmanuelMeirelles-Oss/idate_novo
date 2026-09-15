import type { IdObservatorio } from "@/content/observatorios";

export interface ItemRadar {
  readonly id: string;
  readonly titulo: string;
  readonly fonte: string;
  readonly orgao: "ANM" | "ANEEL" | "ANA" | "DOU" | "MPF" | "STF" | "STJ";
  readonly publicadoEm: string; // ISO format (AAAA-MM-DD)
  readonly url: string;
  readonly resumo: string;
  readonly observatorio: IdObservatorio;
  readonly perguntaVinculada: string;
  readonly empresasCitadas?: readonly string[];
  readonly estruturasCitadas?: readonly string[];
  readonly valorEnvolvido?: string;
}

export type StatusCriterio = "atendido" | "em_maturacao" | "insuficiente";

export interface CriterioMetodologico {
  readonly status: StatusCriterio;
  readonly titulo: string;
  readonly detalhe: string;
}

export interface AnaliseNucleoSemanal {
  readonly observatorio: IdObservatorio;
  readonly tema: string;
  readonly status: "em_observacao" | "em_maturacao" | "nucleo_constituido" | "arquivado";
  readonly statusRotulo: string;
  readonly resumo: string;
  readonly criterios: {
    readonly recorrencia: CriterioMetodologico;
    readonly relevanciaColetiva: CriterioMetodologico;
    readonly viabilidadeApuracao: CriterioMetodologico;
  };
  readonly parecerTecnico: string;
}

export interface ItemDescartadoRadar {
  readonly titulo: string;
  readonly fonte: string;
  readonly orgao: "ANM" | "ANEEL" | "ANA" | "DOU" | "MPF" | "STF" | "STJ";
  readonly publicadoEm: string;
  readonly motivoDescarte: string;
}

export interface FonteSemOcorrencia {
  readonly orgao: string;
  readonly url?: string;
  readonly observacao: string;
}

export interface CicloRadar {
  readonly id: string;
  readonly periodo: {
    readonly inicio: string;
    readonly fim: string;
    readonly rotulo: string;
  };
  readonly fontesVigiadas: readonly string[];
  readonly itens: readonly ItemRadar[];
  readonly analises: readonly AnaliseNucleoSemanal[];
  readonly itensDescartados?: readonly ItemDescartadoRadar[];
  readonly fontesSemOcorrencias?: readonly FonteSemOcorrencia[];
}

export const HISTORICO_RADAR: readonly CicloRadar[] = [
  {
    id: "ciclo-2026-09-07-2026-09-14",
    periodo: {
      inicio: "2026-09-07",
      fim: "2026-09-14",
      rotulo: "07 a 14/09/2026",
    },
    fontesVigiadas: ["DOU", "ANM", "ANEEL", "ANA"],
    itens: [
      {
        id: "aneel-revisao-agenda-regulatoria-2026-2027",
        titulo:
          "ANEEL aprova primeira revisão da Agenda Regulatória para o biênio 2026-2027",
        fonte: "ANEEL — 09/09/2026",
        orgao: "ANEEL",
        publicadoEm: "2026-09-09",
        url: "https://www.gov.br/aneel/pt-br/assuntos/noticias/2026-defeso-eleitoral/aneel-aprova-primeira-revisao-da-agenda-regulatoria-para-o-bienio-2026-2027",
        resumo:
          "Cinco novas atividades incluídas, nove remanejadas para 2028 e duas excluídas; a agenda fecha com 54 atividades regulatórias prioritárias para os próximos dois anos.",
        observatorio: "energia",
        perguntaVinculada:
          "Como os encargos setoriais se distribuem entre as classes de consumo e que critérios sustentam essa repartição?",
        empresasCitadas: ["ANEEL", "Agentes do Setor Elétrico"],
      },
      {
        id: "aneel-consulta-publica-recursos-distribuidos-baterias-ve",
        titulo:
          "ANEEL propõe novas regras para preparar a rede elétrica para geração solar, baterias e veículos elétricos",
        fonte: "ANEEL — 08/09/2026",
        orgao: "ANEEL",
        publicadoEm: "2026-09-08",
        url: "https://www.gov.br/aneel/pt-br/assuntos/noticias/2026-defeso-eleitoral/aneel-propoe-novas-regras-para-preparar-a-rede-eletrica-para-geracao-solar-baterias-e-veiculos-eletricos",
        resumo:
          "Consulta pública aberta sobre integração de recursos energéticos distribuídos (REDs), visando preparar o sistema para geração distribuída, armazenamento em baterias e mobilidade elétrica.",
        observatorio: "transicao-energetica",
        perguntaVinculada:
          "Como os incentivos tributários e creditícios do marco do hidrogênio de baixa emissão (Lei nº 14.948/2024) se harmonizam com o setor elétrico?",
        empresasCitadas: ["ANEEL", "Distribuidoras", "Consumidores Geradores"],
      },
      {
        id: "aneel-leilao-transmissao-armazenamento-baterias-2027",
        titulo:
          "Leilão de abril/2027, o primeiro com contratação de baterias na transmissão, entra em consulta pública",
        fonte: "ANEEL — 08/09/2026",
        orgao: "ANEEL",
        publicadoEm: "2026-09-08",
        url: "https://www.gov.br/aneel/pt-br/assuntos/noticias/2026-defeso-eleitoral/leilao-marcado-para-abril-de-2027-o-primeiro-com-contratacao-de-baterias-na-transmissao-entra-em-consulta-publica",
        resumo:
          "Consulta pública para o leilão de transmissão de abril de 2027, prevendo R$ 12,9 bilhões em investimentos e inaugurando a contratação de sistemas de armazenamento em baterias na rede básica.",
        observatorio: "transicao-energetica",
        perguntaVinculada:
          "Como as novas exigências de descarbonização impactam os contratos legados da indústria de base?",
        empresasCitadas: ["ANEEL", "Transmissoras", "ONS"],
        valorEnvolvido: "R$ 12.900.000.000,00",
      },
      {
        id: "aneel-transferencia-controle-26-concessionarias-transmissao",
        titulo:
          "ANEEL aprova transferência de controle indireto de 26 concessionárias de transmissão",
        fonte: "ANEEL — 11/09/2026",
        orgao: "ANEEL",
        publicadoEm: "2026-09-11",
        url: "https://www.gov.br/aneel/pt-br/assuntos/noticias/2026-defeso-eleitoral/aneel-aprova-transferencia-de-controle-indireto-de-26-concessionarias-de-transmissao",
        resumo:
          "Aprovação da operação societária com participação conjunta da Caisse de Dépôt et Placement du Québec e do Grupo Energía Bogotá no controle indireto de 26 concessionárias de transmissão de energia.",
        observatorio: "energia",
        perguntaVinculada:
          "Em que medida decisões dos tribunais superiores alteraram a composição da tarifa nas últimas décadas?",
        empresasCitadas: [
          "Caisse de Dépôt et Placement du Québec",
          "Grupo Energía Bogotá",
          "ANEEL",
        ],
      },
      {
        id: "ana-certoh-atualizacao-valor-minimo-obras-hidricas",
        titulo:
          "ANA atualiza valor mínimo de obras de infraestrutura sujeitas ao Certificado de Avaliação da Sustentabilidade da Obra Hídrica",
        fonte: "ANA — 10/09/2026",
        orgao: "ANA",
        publicadoEm: "2026-09-10",
        url: "https://www.gov.br/ana/pt-br/assuntos/noticias-e-eventos/noticias-periodo-eleitoral-2026/agencia-atualiza-valor-minimo-de-obras-de-infraestrutura-sujeitas-ao-certificado-de-avaliacao-da-sustentabilidade-da-obra-hidrica",
        resumo:
          "Atualização do piso financeiro que obriga obras hídricas ao Certificado de Avaliação da Sustentabilidade (CERTOH), alterando a régua de fiscalização e governança ambiental de barragens e canais.",
        observatorio: "aguas",
        perguntaVinculada:
          "Quais conflitos de competência recorrentes surgem entre órgãos gestores de bacias hidrográficas?",
        empresasCitadas: ["ANA", "Empreendedores Hídricos"],
      },
      {
        id: "ana-consulta-publica-revisao-tarifaria-saneamento-reta-final",
        titulo:
          "Consulta pública sobre revisão tarifária de abastecimento de água e esgotamento sanitário entra na reta final",
        fonte: "ANA — 10/09/2026",
        orgao: "ANA",
        publicadoEm: "2026-09-10",
        url: "https://www.gov.br/ana/pt-br/assuntos/noticias-e-eventos/noticias-periodo-eleitoral-2026/termina-na-proxima-quinta-17-a-consulta-publica-sobre-revisao-tarifaria-para-os-servicos-de-abastecimento-de-agua-e-esgotamento-sanitario",
        resumo:
          "Reta final da Consulta Pública nº 03/2026 sobre a Norma de Referência para revisões tarifárias de água e esgoto no âmbito do Marco Legal do Saneamento Básico, com encerramento em 17/09/2026.",
        observatorio: "tarifas-publicas",
        perguntaVinculada:
          "Que componentes integram a tarifa e quais deles são efetivamente discriminados ao usuário?",
        empresasCitadas: ["ANA", "ERIs", "Prestadores de Saneamento"],
      },
      {
        id: "anm-contribuicoes-norma-seguranca-pilhas-esteril-rejeito",
        titulo:
          "Sociedade apresenta contribuições para futura norma sobre segurança de pilhas de estéril e rejeito na mineração",
        fonte: "ANM — 11/09/2026",
        orgao: "ANM",
        publicadoEm: "2026-09-11",
        url: "https://www.gov.br/anm/pt-br/assuntos/noticias/sociedade-apresenta-contribuicoes-para-futura-norma-sobre-seguranca-de-pilhas",
        resumo:
          "Encerramento das sessões e recebimento de contribuições técnicas sobre a minuta de resolução que estabelecerá os requisitos de segurança para pilhas de estéril e rejeito mineral.",
        observatorio: "recursos-minerais",
        perguntaVinculada:
          "Que obrigações de recuperação ambiental incidem sobre áreas lavradas e como são fiscalizadas?",
        empresasCitadas: ["ANM", "Mineradoras"],
      },
      {
        id: "anm-alerta-chuvas-extremas-el-nino-estruturas-minerarias",
        titulo:
          "ANM alerta empreendedores para reforço de medidas preventivas contra chuvas extremas e El Niño",
        fonte: "ANM — 10/09/2026",
        orgao: "ANM",
        publicadoEm: "2026-09-10",
        url: "https://www.gov.br/anm/pt-br/assuntos/noticias/empreendedores-devem-reforcar-medidas-preventivas-contra-possiveis-chuvas-extremas-associadas-ao-el-nino",
        resumo:
          "Recomendação oficial da agência minerária exigindo monitoramento intensivo e inspeções extraordinárias em barragens e pilhas de rejeito em razão da previsão de precipitações severas.",
        observatorio: "recursos-minerais",
        perguntaVinculada:
          "Que obrigações de recuperação ambiental incidem sobre áreas lavradas e como são fiscalizadas?",
        empresasCitadas: ["ANM", "Empreendedores Minerários"],
      },
      {
        id: "anm-modernizacao-delimitar-areas-interesse-mineral",
        titulo:
          "ANM abre consulta sobre modernização do sistema de organização de áreas de interesse mineral",
        fonte: "ANM — 08/09/2026",
        orgao: "ANM",
        publicadoEm: "2026-09-08",
        url: "https://www.gov.br/anm/pt-br/assuntos/noticias/ajude-a-modernizar-a-forma-como-se-organizan-as-areas-de-interesse-mineral",
        resumo:
          "Participação social aberta sobre a reformulação do sistema de quadrículas e ordenamento territorial dos direitos minerários no Brasil, afetando sobreposições ambientais e fundiárias.",
        observatorio: "terras",
        perguntaVinculada:
          "Qual o estado da jurisprudência sobre sobreposição entre títulos dominiais e áreas protegidas?",
        empresasCitadas: ["ANM", "Titulares de Direitos Minerários"],
      },
      {
        id: "dou-mme-medida-provisoria-1389-credito-extraordinario",
        titulo:
          "Medida Provisória nº 1.389/2026 abre crédito extraordinário de R$ 6,605 bilhões em favor do Ministério de Minas e Energia",
        fonte: "DOU — 08/09/2026",
        orgao: "DOU",
        publicadoEm: "2026-09-08",
        url: "https://www.in.gov.br/servicos/diario-oficial-da-uniao",
        resumo:
          "Publicação no DOU referente à edição da MP nº 1.389/2026 com alocação extraordinária de R$ 6,605 bilhões no orçamento do MME. Item sob checagem documental quanto à destinação dos recursos.",
        observatorio: "energia",
        perguntaVinculada:
          "Como os encargos setoriais se distribuem entre as classes de consumo e que critérios sustentam essa repartição?",
        empresasCitadas: ["Ministério de Minas e Energia", "Governo Federal"],
        valorEnvolvido: "R$ 6.605.000.000,00",
      },
    ],
    analises: [
      {
        observatorio: "recursos-minerais",
        tema: "Segurança de Estruturas de Rejeito e Obras Hídricas sob Eventos Climáticos Extremos",
        status: "em_observacao",
        statusRotulo: "Núcleo de Pesquisa em Qualificação Metodológica — Atos Convergentes ANM/ANA/ANEEL",
        resumo:
          "Convergência de quatro atos e manifestações regulatórias na mesma semana: norma de segurança de pilhas em formação na ANM (11/09), alerta de chuvas extremas e El Niño da ANM (10/09), atualização do limiar do CERTOH para obras hídricas pela ANA (10/09) e o prazo de reclassificação de barragens de UHE na ANEEL (REN 1.064/2023).",
        criterios: {
          recorrencia: {
            status: "atendido",
            titulo: "Recorrência documentada",
            detalhe:
              "Quatro manifestações normativas convergentes editadas em setembro/2026 por três agências distintas (ANM, ANA e ANEEL), consolidando um padrão regulatório continuado de risco físico infraestrutural.",
          },
          relevanciaColetiva: {
            status: "atendido",
            titulo: "Relevância coletiva",
            detalhe:
              "Afeta a segurança física de populações a jusante de reservatórios e pilhas de rejeito, além da integridade de bacias hidrográficas e infraestruturas energéticas.",
          },
          viabilidadeApuracao: {
            status: "atendido",
            titulo: "Viabilidade de apuração",
            detalhe:
              "Documentação técnica e minutas normativas abertas nos portais das três agências reguladoras e no novo Portal de Estudos Técnicos da ANEEL.",
          },
        },
        parecerTecnico:
          "Conjunto qualificado para constituição de núcleo metodológico nos Observatórios de Recursos Minerais, Águas e Energia. Recomendada apuração jornalística e técnica focada no cruzamento das regras de segurança sob eventos climáticos extremos.",
      },
      {
        observatorio: "transicao-energetica",
        tema: "Armazenamento em Baterias de Grande Porte e Recursos Energéticos Distribuídos",
        status: "em_observacao",
        statusRotulo: "Lead de Monitoramento — Sinergia Regulatória em Maturação",
        resumo:
          "A ANEEL lançou simultaneamente duas consultas públicas em 08/09/2026 para regulamentar a integração de recursos energéticos distribuídos (geração solar, baterias e VE) e o primeiro leilão de transmissão com contratação de baterias (previsto para abril/2027 com R$ 12,9 bi).",
        criterios: {
          recorrencia: {
            status: "em_maturacao",
            titulo: "Recorrência documentada",
            detalhe:
              "Dois atos regulatórios simultâneos da ANEEL. A comprovação de padrão temporal continuado dependerá do acompanhamento das contribuições e da edição dos editais definitivos nos próximos meses.",
          },
          relevanciaColetiva: {
            status: "atendido",
            titulo: "Relevância coletiva",
            detalhe:
              "Define a arquitetura regulatória e os modelos de remuneração para o armazenamento de energia em escala no Sistema Interligado Nacional.",
          },
          viabilidadeApuracao: {
            status: "atendido",
            titulo: "Viabilidade de apuração",
            detalhe:
              "Minutas de editais, termos de referência e documentos de consulta pública acessíveis no portal da ANEEL.",
          },
        },
        parecerTecnico:
          "Lead catalogado em observação ativa nos Observatórios de Transição Energética e Mercado Livre de Energia.",
      },
    ],
    itensDescartados: [
      {
        titulo: "Assinatura de contratos do Leilão de Reserva de Capacidade e Transmissão nº 1/2026",
        fonte: "ANEEL",
        orgao: "ANEEL",
        publicadoEm: "2026-09-10",
        motivoDescarte:
          "Cerimônia formal de assinatura de contratos decorrentes de certames já homologados em edições anteriores, sem novidade normativa.",
      },
      {
        titulo: "Boletim de expansão da matriz elétrica de agosto/2026 (4,9 GW acumulados)",
        fonte: "ANEEL",
        orgao: "ANEEL",
        publicadoEm: "2026-09-11",
        motivoDescarte:
          "Dado estatístico mensal de entrada em operação comercial de usinas, sem conteúdo regulatório autônomo.",
      },
      {
        titulo: "Lançamento do Portal de Estudos Técnicos da ANEEL",
        fonte: "ANEEL",
        orgao: "ANEEL",
        publicadoEm: "2026-09-08",
        motivoDescarte:
          "Disponibilização de repositório de pesquisas e inventários hidrelétricos. Relevante como fonte de consulta, não como ato regulatório.",
      },
      {
        titulo: "Reta final da Consulta Pública ANA nº 04/2026 (Agenda Regulatória 2027-2028)",
        fonte: "ANA",
        orgao: "ANA",
        publicadoEm: "2026-09-09",
        motivoDescarte:
          "Lembrete institucional sobre prazo de contribuição em consulta pública lançada em agosto/2026.",
      },
      {
        titulo: "Tomada de subsídios para Planejamento Estratégico Institucional 2027-2031 da ANA",
        fonte: "ANA",
        orgao: "ANA",
        publicadoEm: "2026-09-08",
        motivoDescarte:
          "Processo interno de planejamento administrativo e estratégico corporativo da agência.",
      },
      {
        titulo: "Encerramento de inscrições orais para Audiência Pública sobre revisão tarifária (ANA)",
        fonte: "ANA",
        orgao: "ANA",
        publicadoEm: "2026-09-08",
        motivoDescarte:
          "Etapa operacional de credenciamento de expositores para sessão pública.",
      },
      {
        titulo: "ANA conquista 2º lugar em índice nacional de capacidade institucional",
        fonte: "ANA",
        orgao: "ANA",
        publicadoEm: "2026-09-11",
        motivoDescarte:
          "Divulgação institucional de premiação e ranking de governança pública.",
      },
      {
        titulo: "Reestruturação do combate à lavra ilegal pela ANM",
        fonte: "ANM",
        orgao: "ANM",
        publicadoEm: "2026-09-09",
        motivoDescarte:
          "Anúncio de estratégias e acordos de cooperação sem publicação de resolução normativa ou ato sancionatório específico.",
      },
      {
        titulo: "Debate sobre participação de fornecedores locais no Pará",
        fonte: "ANM",
        orgao: "ANM",
        publicadoEm: "2026-09-09",
        motivoDescarte:
          "Evento e debate regional sobre conteúdo local e compras na cadeia produtiva mineral.",
      },
      {
        titulo: "Ampliação de diálogo institucional Brasil-Canadá na mineração",
        fonte: "ANM",
        orgao: "ANM",
        publicadoEm: "2026-09-10",
        motivoDescarte:
          "Reunião diplomática bilateral sobre cooperação em minerais estratégicos.",
      },
      {
        titulo: "Edição do evento Horizonte Mineral da ANM",
        fonte: "ANM",
        orgao: "ANM",
        publicadoEm: "2026-09-10",
        motivoDescarte:
          "Encontro técnico institucional sobre difusão de conhecimento geológico e mineral.",
      },
      {
        titulo: "Aviso de indisponibilidade temporária de systems da ANM (11 a 14/09)",
        fonte: "ANM",
        orgao: "ANM",
        publicadoEm: "2026-09-11",
        motivoDescarte:
          "Comunicado operacional sobre manutenção de infraestrutura de TI.",
      },
      {
        titulo: "Tomada de Subsídios ANM nº 04/2026 (Sandbox Regulatório Mineral)",
        fonte: "ANM",
        orgao: "ANM",
        publicadoEm: "2026-07-29",
        motivoDescarte:
          "Sem movimentação inédita na janela de 07 a 14/09/2026. Prazo de contribuições mantido até 28/09/2026.",
      },
    ],
    fontesSemOcorrencias: [
      {
        orgao: "DOU (Diário Oficial da União) — Varredura Parcial",
        url: "https://in.gov.br",
        observacao:
          "A busca direta no portal in.gov.br foi parcialmente limitada por ambiente de rede. Os atos regulatórios das agências foram validados diretamente nas páginas de notícias e publicações oficiais dos órgãos reguladores.",
      },
    ],
  },
  {
    id: "ciclo-2026-09-01-2026-09-08",
    periodo: {
      inicio: "2026-09-01",
      fim: "2026-09-08",
      rotulo: "01 a 08/09/2026",
    },
    fontesVigiadas: ["DOU", "ANM", "ANEEL", "ANA"],
    itens: [
      {
        id: "ana-norma-referencia-16-2026-contabilidade-regulatoria",
        titulo:
          "ANA publica Norma de Referência nº 16/2026, sobre contabilidade regulatória no saneamento básico",
        fonte: "ANA — 31/08/2026 (Resolução ANA nº 302/2026, publicada no DOU)",
        orgao: "ANA",
        publicadoEm: "2026-08-31",
        url: "https://www.gov.br/ana/pt-br/assuntos/noticias-e-eventos/noticias-periodo-eleitoral-2026/ana-publica-norma-de-referencia-sobre-contabilidade-regulatoria-no-saneamento-basico",
        resumo:
          "Padroniza os procedimentos de contabilidade regulatória de prestadores de água e esgoto e fixa prazo de três anos (até 31/08/2029) para que as entidades reguladoras infranacionais incorporem as diretrizes aos seus atos normativos. Define a base contábil sobre a qual se calculam revisões tarifárias e indenizações de ativos ao fim da concessão.",
        observatorio: "aguas",
        perguntaVinculada:
          "Como se estruturam as revisões tarifárias nos contratos de concessão de saneamento e a aplicação das Normas de Referência da ANA?",
        empresasCitadas: [
          "ANA",
          "Entidades Reguladoras Infranacionais (ERIs)",
          "Prestadores de Água e Esgoto",
        ],
      },
      {
        id: "ana-audiencia-publica-03-2026-revisao-tarifaria-agua-esgoto",
        titulo:
          "Audiência Pública nº 03/2026 sobre a norma de referência de revisão tarifária para água e esgoto",
        fonte: "ANA — 02/09/2026 (Consulta Pública nº 03/2026 aberta até 17/09/2026)",
        orgao: "ANA",
        publicadoEm: "2026-09-02",
        url: "https://www.gov.br/ana/pt-br/assuntos/noticias-e-eventos/noticias-periodo-eleitoral-2026/audiencia-publica-sobre-revisao-tarifaria-para-servicos-de-agua-e-esgoto-recebe-inscricoes-para-apresentacoes-ate-9-de-setembro",
        resumo:
          "Norma de referência que regerá a revisão tarifária periódica, ordinária e extraordinária dos serviços de abastecimento de água e esgotamento sanitário. Em janela aberta de contribuições públicas até 17/09/2026.",
        observatorio: "aguas",
        perguntaVinculada:
          "Como se estruturam as revisões tarifárias nos contratos de concessão de saneamento e a aplicação das Normas de Referência da ANA?",
        empresasCitadas: [
          "ANA",
          "Entidades Reguladoras Infranacionais",
          "Prestadores de Serviços de Saneamento",
        ],
      },
      {
        id: "ana-3-encontro-eris-reforma-tributaria-saneamento",
        titulo:
          "ANA encerra 3º Encontro Nacional das Entidades Reguladoras Infranacionais com debate sobre Reforma Tributária no saneamento",
        fonte: "ANA — 04/09/2026",
        orgao: "ANA",
        publicadoEm: "2026-09-04",
        url: "https://www.gov.br/ana/pt-br/assuntos/noticias-e-eventos/noticias-periodo-eleitoral-2026/ana-encerra-3o-encontro-nacional-das-entidades-reguladoras-infranacionais-com-debate-sobre-reforma-tributaria-no-saneamento",
        resumo:
          "Debate sobre os efeitos da reforma tributária na tarifa de saneamento básico e o papel regulatório das ERIs. Lead de acompanhamento sobre a estrutura tarifária e tributária.",
        observatorio: "tarifas-publicas",
        perguntaVinculada:
          "Como os tributos incidentes sobre serviços públicos delegados foram tratados pelos tribunais superiores (TUST/TUSD no ICMS)?",
        empresasCitadas: ["ANA", "ERIs"],
      },
      {
        id: "ana-lista-positiva-tarifa-social-agua-esgoto-julho",
        titulo:
          "ANA publica Lista Positiva da Tarifa Social de Água e Esgoto com dados de julho de 2026",
        fonte: "ANA — 03/09/2026",
        orgao: "ANA",
        publicadoEm: "2026-09-03",
        url: "https://www.gov.br/ana/pt-br/assuntos/noticias-e-eventos/noticias-periodo-eleitoral-2026/lista-positiva-com-dados-de-julho-e-marcada-por-estabilidade-na-implementacao-da-tarifa-social-de-agua-e-esgoto",
        resumo:
          "Série mensal de dados públicos sobre a implementação da Tarifa Social de Água e Esgoto (1.920 municípios em julho, ante 1.917 em junho), acompanhando a aplicação do benefício.",
        observatorio: "tarifas-publicas",
        perguntaVinculada:
          "Que componentes integram a tarifa e quais deles são efetivamente discriminados ao usuário?",
        empresasCitadas: ["ANA", "Municípios Beneficiados"],
      },
      {
        id: "aneel-reducao-tarifas-roraima-energia",
        titulo:
          "ANEEL aprova redução média de 14,67% nas tarifas da Roraima Energia",
        fonte: "ANEEL — 02/09/2026",
        orgao: "ANEEL",
        publicadoEm: "2026-09-02",
        url: "https://www.gov.br/aneel/pt-br/assuntos/noticias/2026-defeso-eleitoral/aneel-aprova-reducao-nas-tarifas-da-roraima-energia",
        resumo:
          "Revisão tarifária da Roraima Energia aprovada com redução média de 14,67% nas tarifas. Caso atípico de sistema isolado em integração ao SIN com efeito por classe de consumo.",
        observatorio: "energia",
        perguntaVinculada:
          "Que efeitos as revisões tarifárias periódicas produzem sobre consumidores industriais e rurais?",
        empresasCitadas: ["Roraima Energia", "ANEEL"],
        valorEnvolvido: "Redução média -14,67%",
      },
      {
        id: "aneel-cp-regras-comercializacao-2027",
        titulo:
          "ANEEL propõe aprimoramento das Regras de Comercialização 2027 em Consulta Pública",
        fonte: "ANEEL — 01/09/2026 (contribuições de 03/09 a 02/10/2026)",
        orgao: "ANEEL",
        publicadoEm: "2026-09-01",
        url: "https://www.gov.br/aneel/pt-br/assuntos/noticias/2026-defeso-eleitoral/consulta-publica-propoe-aprimoramento-das-regras-de-comercializacao-2027",
        resumo:
          "Proposta de aperfeiçoamento das Regras de Comercialização para 2027, base operacional do ambiente de contratação livre, redefinindo formação de preço e alocação de risco.",
        observatorio: "mercado-livre-energia",
        perguntaVinculada:
          "Que assimetrias de informação persistem na formação de preço no ambiente de contratação livre?",
        empresasCitadas: ["ANEEL", "CCEE", "Comercializadoras de Energia"],
      },
      {
        id: "aneel-cp-031-2026-indicador-prazos-obras-distribuicao",
        titulo:
          "ANEEL propõe novo indicador para prazos de execução de obras de distribuição (CP nº 031/2026)",
        fonte: "ANEEL — 01/09/2026 (contribuições de 03/09 a 19/10/2026)",
        orgao: "ANEEL",
        publicadoEm: "2026-09-01",
        url: "https://www.gov.br/aneel/pt-br/assuntos/noticias/2026-defeso-eleitoral/aneel-propoe-novo-indicador-para-incentivar-o-cumprimento-dos-prazos-de-execucao-de-obras-relacionadas-ao-servico-de-distribuicao",
        resumo:
          "Consulta Pública nº 031/2026 com proposta de indicador de qualidade para incentivar o cumprimento dos prazos de obras de distribuição de energia, afetando penalidades e componentes tarifários.",
        observatorio: "energia",
        perguntaVinculada:
          "Que efeitos as revisões tarifárias periódicas produzem sobre consumidores industriais e rurais?",
        empresasCitadas: ["ANEEL", "Distribuidoras de Energia"],
      },
      {
        id: "aneel-ap-editais-leiloes-baterias-grande-porte",
        titulo:
          "Audiência Pública debate editais dos primeiros leilões de baterias de grande porte no Brasil",
        fonte: "ANEEL — 01/09/2026 (contribuições até 14/09/2026)",
        orgao: "ANEEL",
        publicadoEm: "2026-09-01",
        url: "https://www.gov.br/aneel/pt-br/assuntos/noticias/2026-defeso-eleitoral/audiencia-publica-debate-editais-dos-primeiros-leiloes-de-baterias-de-grande-porte-no-brasil",
        resumo:
          "Primeiro desenho regulatório para leilão de armazenamento de energia em baterias de grande porte no Brasil, definindo regras de remuneração de capacidade e custeio.",
        observatorio: "transicao-energetica",
        perguntaVinculada:
          "Como a regulação do mercado de carbono e novos vetores limpos impactam a competitividade industrial?",
        empresasCitadas: ["ANEEL", "ONS", "Agentes do Setor Elétrico"],
      },
      {
        id: "anm-ap-02-2026-seguranca-pilhas-mineracao",
        titulo:
          "ANM realiza Audiência Pública nº 02/2026 sobre gestão da segurança de pilhas de mineração",
        fonte: "ANM — aviso em 31/08/2026 (sessão virtual em 11/09; contribuições até 14/10/2026)",
        orgao: "ANM",
        publicadoEm: "2026-08-31",
        url: "https://www.gov.br/anm/pt-br/assuntos/noticias/gestao-da-seguranca-de-pilhas-de-mineracao-e-tema-de-audiencia-publica",
        resumo:
          "Minuta de resolução com Análise de Impacto Regulatório (AIR) sobre segurança de pilhas de estéril e rejeito na mineração, reforçando a fiscalização e a contenção de passivos socioambientais.",
        observatorio: "recursos-minerais",
        perguntaVinculada:
          "Que obrigações de recuperação ambiental incidem sobre áreas lavradas e como são fiscalizadas?",
        empresasCitadas: ["ANM", "Empresas Mineradoras"],
      },
      {
        id: "anm-ia-controle-prazos-royalties-cfem",
        titulo:
          "ANM avança em projeto de IA para controle de prazos da arrecadação e fiscalização da CFEM",
        fonte: "ANM — 02/09/2026",
        orgao: "ANM",
        publicadoEm: "2026-09-02",
        url: "https://www.gov.br/anm/pt-br/assuntos/noticias/royalties-da-mineracao-projeto-de-ia-para-controle-de-prazos-avanca",
        resumo:
          "Desenvolvimento de ferramentas de IA para automação e controle de prazos na arrecadação e fiscalização da CFEM. Afeta a infraestrutura de dados sobre repasses a entes federativos.",
        observatorio: "recursos-minerais",
        perguntaVinculada:
          "Como se distribui a compensação financeira pela exploração mineral entre os entes federativos?",
        empresasCitadas: ["ANM"],
      },
    ],
    analises: [
      {
        observatorio: "aguas",
        tema: "Estrutura Econômico-Financeira das Tarifas de Saneamento (NR nº 16/2026 e CP/AP nº 03/2026 da ANA)",
        status: "em_observacao",
        statusRotulo: "Lead de Monitoramento — Triagem Aberta (Densidade Documental em Maturação)",
        resumo:
          "Os itens 1.1 a 1.4 formam um conjunto coerente sobre contabilidade regulatória (NR 16/2026), procedimentos de revisão tarifária (CP/AP 03/2026), reflexos da reforma tributária e dados da Tarifa Social. Alta densidade documental na semana.",
        criterios: {
          recorrencia: {
            status: "em_maturacao",
            titulo: "Recorrência documentada",
            detalhe:
              "Apesar da elevada densidade documental temática, o critério de recorrência exige a verificação do padrão em fontes ou comunicações independentes (ex.: denúncias ou ações infranacionais). Lead mantido em maturação sem constituição imediata de núcleo autônomo.",
          },
          relevanciaColetiva: {
            status: "atendido",
            titulo: "Relevância coletiva",
            detalhe:
              "As normas de referência da ANA definem o cálculo tarifário, indenização de ativos e diretrizes para todas as entidades reguladoras infranacionais no saneamento básico.",
          },
          viabilidadeApuracao: {
            status: "atendido",
            titulo: "Viabilidade de apuração",
            detalhe:
              "Atos publicados no DOU e no portal da ANA com minutas regulatórias, relatórios de AIR e prazos públicos totalmente rastreáveis.",
          },
        },
        parecerTecnico:
          "Lead catalogado em observação ativa nos Observatórios de Águas e Tarifas Públicas. A apuração acompanhará a Consulta Pública nº 03/2026 (até 17/09/2026) e a recepção das diretrizes contábeis pelas agências infranacionais.",
      },
      {
        observatorio: "recursos-minerais",
        tema: "Segurança de Pilhas de Estéril/Rejeito e Automação de Prazos da CFEM (ANM)",
        status: "em_observacao",
        statusRotulo: "Lead de Monitoramento — Triagem Aberta",
        resumo:
          "Abertura da AP nº 02/2026 com AIR sobre regulação de segurança de pilhas de estéril e rejeito, combinada ao avanço do projeto de IA para controle de prazos de fiscalização da CFEM.",
        criterios: {
          recorrencia: {
            status: "em_maturacao",
            titulo: "Recorrência documentada",
            detalhe:
              "Monitoramento da minuta de resolução sobre pilhas de rejeito e da evolução dos módulos de fiscalização de royalties da ANM.",
          },
          relevanciaColetiva: {
            status: "atendido",
            titulo: "Relevância coletiva",
            detalhe:
              "Impacta a contenção de passivos ambientais em áreas lavradas e a apuração da arrecadação de royalties em todo o setor minerário nacional.",
          },
          viabilidadeApuracao: {
            status: "atendido",
            titulo: "Viabilidade de apuração",
            detalhe:
              "Aviso de audiência pública e documentos da AIR acessíveis no portal oficial da ANM.",
          },
        },
        parecerTecnico:
          "Item mantido em observação ativa no Observatório de Recursos Minerais com acompanhamento da sessão pública em 11/09/2026.",
      },
      {
        observatorio: "energia",
        tema: "Revisão Tarifária Roraima Energia, Indicadores de Obras e Armazenamento em Baterias (ANEEL)",
        status: "em_observacao",
        statusRotulo: "Lead de Monitoramento — Triagem Aberta",
        resumo:
          "Aprovação de redução tarifária média de 14,67% na Roraima Energia, CP nº 031/2026 para prazos de obras de distribuição e editais de leilões de baterias de grande porte.",
        criterios: {
          recorrencia: {
            status: "em_maturacao",
            titulo: "Recorrência documentada",
            detalhe:
              "Leilões de armazenamento de energia e novos indicadores de qualidade em fase inicial de escuta pública.",
          },
          relevanciaColetiva: {
            status: "atendido",
            titulo: "Relevância coletiva",
            detalhe:
              "Primeiro arcabouço de remuneração para armazenamento de energia em escala no SIN e revisão tarifária em sistema isolado.",
          },
          viabilidadeApuracao: {
            status: "atendido",
            titulo: "Viabilidade de apuração",
            detalhe:
              "Processos públicos e editais de leilão disponíveis no portal da ANEEL.",
          },
        },
        parecerTecnico:
          "Item em observação nos Observatórios de Energia, Mercado Livre de Energia e Transição Energética.",
      },
    ],
    itensDescartados: [
      {
        titulo: "Portarias ANEEL de alteração da estrutura organizacional da agência",
        fonte: "ANEEL",
        orgao: "ANEEL",
        publicadoEm: "2026-09-03",
        motivoDescarte:
          "Alteração da estrutura organizacional interna da agência, sem relação direta com os escopos regulatórios temáticos dos observatórios.",
      },
      {
        titulo: "Início de operação comercial da Termelétrica Manaus I",
        fonte: "ANEEL",
        orgao: "ANEEL",
        publicadoEm: "2026-09-01",
        motivoDescarte:
          "Ato operacional de outorga/liberação de geradora específica sem conteúdo normativo ou impacto regulatório difuso.",
      },
      {
        titulo: "3ª edição do Painel El Niño (ANA)",
        fonte: "ANA",
        orgao: "ANA",
        publicadoEm: "2026-09-01",
        motivoDescarte:
          "Divulgação de boletim de monitoramento climático/meteorológico sem inovação regulatória.",
      },
      {
        titulo: "Oficina do PROGESTÃO (ANA)",
        fonte: "ANA",
        orgao: "ANA",
        publicadoEm: "2026-09-02",
        motivoDescarte:
          "Evento de capacitação institucional e gestão de recursos hídricos nos estados.",
      },
      {
        titulo: "Edital da UNESCO para consultor (ANA)",
        fonte: "ANA",
        orgao: "ANA",
        publicadoEm: "2026-08-31",
        motivoDescarte:
          "Processo seletivo administrativo para contratação de consultoria individual.",
      },
      {
        titulo: "Encontro sobre dados hídricos da Bacia Amazônica (ANA)",
        fonte: "ANA",
        orgao: "ANA",
        publicadoEm: "2026-09-04",
        motivoDescarte:
          "Reunião técnica sobre governança e intercâmbio de dados hidrológicos internacionais.",
      },
      {
        titulo: "Painel sobre cadeias de minerais críticos na EXPOSIBRAM (ANM)",
        fonte: "ANM",
        orgao: "ANM",
        publicadoEm: "2026-09-03",
        motivoDescarte:
          "Participação institucional em painel de eventos do setor mineral sem teor normativo.",
      },
      {
        titulo: "Tomada de Subsídios ANM nº 04/2026 (Sandbox Regulatório Mineral)",
        fonte: "ANM",
        orgao: "ANM",
        publicadoEm: "2026-07-29",
        motivoDescarte:
          "Sem movimentação nova na janela de 01 a 08/09/2026. Prazo mantido aberto até 28/09/2026.",
      },
    ],
    fontesSemOcorrencias: [
      {
        orgao: "DOU (Diário Oficial da União) — Busca Direta",
        url: "https://in.gov.br",
        observacao:
          "Páginas de notícias das agências varridas em diretórios de defeso eleitoral. A busca direta no portal in.gov.br não retornou resultados indexáveis na janela semanal (atos validados via portais oficiais das agências).",
      },
    ],
  },
  {
    id: "ciclo-2026-08-24-2026-08-31",
    periodo: {
      inicio: "2026-08-24",
      fim: "2026-08-31",
      rotulo: "24 a 31/08/2026",
    },
    fontesVigiadas: ["DOU", "ANM", "ANEEL", "ANA"],
    itens: [
      {
        id: "mme-portarias-929-930-931-consultas-publicas",
        titulo:
          "Portarias MME nº 929, 930 e 931, de 20/08/2026 — três consultas públicas sobre comercialização, PLD, TFSEE de comercializadoras e reserva de capacidade",
        fonte: "DOU, publicadas em 24/08/2026 (Ministério de Minas e Energia)",
        orgao: "DOU",
        publicadoEm: "2026-08-24",
        url: "https://www.gov.br/mme/pt-br/assuntos/noticias/mme-abre-consulta-sobre-regras-de-comercializacao-armazenamento-e-mercado-livre-de-energia",
        resumo:
          "A Portaria nº 930 propõe revisão dos Decretos nº 5.163/2004 e nº 2.655/1998 (com ajustes no nº 5.177/2004) para adequá-los à Lei nº 15.269/2025, incluindo flexibilização de cobertura contratual de 100% da carga, novas definições de agente (varejista, armazenador e Supridor de Última Instância), regras de migração e liquidação semanal do MCP a partir de janeiro de 2029. A Portaria nº 929 regulamenta a TFSEE sobre comercializadoras (alíquota de 0,40% fixada pela Lei nº 15.269/2025), e a Portaria nº 931 trata do rateio do ERCAP e da apuração do Encargo de Energia de Reserva.",
        observatorio: "mercado-livre-energia",
        perguntaVinculada:
          "Como as regras de migração afetam consumidores de médio porte?",
        empresasCitadas: [
          "Ministério de Minas e Energia",
          "Comercializadoras de Energia",
          "CCEE",
          "ANEEL",
        ],
      },
      {
        id: "aneel-reajuste-tarifario-equatorial-maranhao",
        titulo:
          "ANEEL aprova Reajuste Tarifário Anual da Equatorial Maranhão com troca de indexador para IPCA e aporte de UBP",
        fonte: "ANEEL (17ª Reunião Pública Ordinária da Diretoria de 2026)",
        orgao: "ANEEL",
        publicadoEm: "2026-08-24",
        url: "https://www.gov.br/aneel/pt-br/assuntos/noticias/2026-defeso-eleitoral/aneel-aprova-reajuste-tarifario-anual-da-equatorial-maranhao",
        resumo:
          "Reajuste tarifário anual da Equatorial Maranhão aprovado em 24/08/2026 (tarifas vigentes a partir de 28/08/2026) com efeito médio de 5,76% (residenciais B1 5,20%; baixa tensão média 5,25%; alta tensão média 8,68%). O processo marca a alteração do índice da Parcela B do IGP-M para o IPCA (ponderado) após renovação contratual e a antecipação de recursos da repactuação de cotas de Uso de Bem Público (UBP), na forma da Lei nº 15.235/2025, por modicidade tarifária.",
        observatorio: "tarifas-publicas",
        perguntaVinculada:
          "Que componentes integram a tarifa e quais deles são efetivamente discriminados ao usuário?",
        empresasCitadas: ["Equatorial Maranhão", "ANEEL"],
        valorEnvolvido: "Efeito médio +5,76% (Alta Tensão +8,68%)",
      },
    ],
    analises: [
      {
        observatorio: "energia",
        tema: "UBP como Instrumento de Modicidade Tarifária (Lei nº 15.235/2025)",
        status: "em_observacao",
        statusRotulo: "Lead de Monitoramento — Triagem Aberta",
        resumo:
          "Segunda ocorrência consecutiva do mecanismo de antecipação de recursos da repactuação de cotas de Uso de Bem Público (UBP) sob a Lei nº 15.235/2025 para modicidade tarifária (homologação prévia de R$ 5,48 bi no Norte/Nordeste e agora no RTA da Equatorial Maranhão). Padrão regulatório em maturação.",
        criterios: {
          recorrencia: {
            status: "em_maturacao",
            titulo: "Recorrência documentada",
            detalhe:
              "Segunda ocorrência em duas semanas consecutivas sob a mesma fundamentação legal (Lei nº 15.235/2025). Duas ocorrências sinalizam padrão em formação, mantendo o critério em maturação antes de eventual constituição de núcleo autônomo.",
          },
          relevanciaColetiva: {
            status: "atendido",
            titulo: "Relevância coletiva",
            detalhe:
              "O mecanismo atenua tarifas para conjuntos indeterminados de consumidores em áreas de concessão inteiras (cerca de 2,88 milhões de unidades consumidoras no Maranhão).",
          },
          viabilidadeApuracao: {
            status: "atendido",
            titulo: "Viabilidade de apuração",
            detalhe:
              "Base normativa expressa na Lei nº 15.235/2025, resoluções homologatórias e notas técnicas da ANEEL totalmente rastreáveis.",
          },
        },
        parecerTecnico:
          "Lead mantido em observação ativa nos Observatórios de Energia e Tarifas Públicas. O acompanhamento vigiará a reaparição do mecanismo de UBP em novos processos tarifários de distribuidoras.",
      },
      {
        observatorio: "mercado-livre-energia",
        tema: "Revisão Ampla das Regras do Mercado Livre, PLD, TFSEE e ERCAP (Portarias MME nº 929, 930 e 931/2026)",
        status: "em_observacao",
        statusRotulo: "Lead de Monitoramento — Triagem Aberta",
        resumo:
          "Consultas públicas abertas pelo MME propondo a revisão dos Decretos nº 5.163/2004 e nº 2.655/1998 para adequação à Lei nº 15.269/2025, alterando regras de migração em tensão ≥ 2,3 kV, antecedência de 180 dias, alíquota da TFSEE sobre comercializadoras (0,40%) e rateio do ERCAP.",
        criterios: {
          recorrencia: {
            status: "em_maturacao",
            titulo: "Recorrência documentada",
            detalhe:
              "Três portarias normativas simultâneas abrindo prazo de 45 dias de contribuições (até 08/10/2026). Acompanhamento do desdobramento regulatório e da minuta final pós-consulta pública.",
          },
          relevanciaColetiva: {
            status: "atendido",
            titulo: "Relevância coletiva",
            detalhe:
              "Redefine agentes, encargos (TFSEE e ERCAP), regras de migração para consumidores de médio porte e liquidação semanal no MCP a partir de 2029.",
          },
          viabilidadeApuracao: {
            status: "atendido",
            titulo: "Viabilidade de apuração",
            detalhe:
              "Minutas publicadas no DOU e Notas Técnicas nº 14/2026/SE, 15/2026/SE e 27/2026/SAER/SE disponíveis no portal de consultas públicas do MME.",
          },
        },
        parecerTecnico:
          "Item catalogado como lead de monitoramento prioritário no Observatório do Mercado Livre de Energia e no Observatório de Grandes Consumidores Industriais. Apuração acompanhará o ciclo de contribuições até 08/10/2026.",
      },
    ],
    itensDescartados: [
      {
        titulo: "Resolução Regulatória ANA nº 301/2026 (Exigência da NR nº 8/2024)",
        fonte: "ANA",
        orgao: "ANA",
        publicadoEm: "2026-08-14",
        motivoDescarte:
          "Publicada em 14/08/2026 (DOU nº 154 de 17/08/2026), fora da janela semanal vigiada (24 a 31/08/2026).",
      },
      {
        titulo: "Consulta Pública ANA nº 04/2026 (Agenda Regulatória 2027-2028)",
        fonte: "ANA",
        orgao: "ANA",
        publicadoEm: "2026-08-03",
        motivoDescarte:
          "Lançada em 03/08/2026, fora da janela semanal de 24 a 31/08/2026 (contribuições abertas até 17/09/2026).",
      },
      {
        titulo: "Notícias Institucionais ANM da Exposibram 2026",
        fonte: "ANM",
        orgao: "ANM",
        publicadoEm: "2026-08-25",
        motivoDescarte:
          "Cobertura institucional (cadeia do ouro, rastreabilidade e acervo histórico), sem conteúdo ou inovação normativa.",
      },
      {
        titulo: "Tomada de Subsídios ANM nº 04/2026 (Sandbox Regulatório Mineral)",
        fonte: "ANM",
        orgao: "ANM",
        publicadoEm: "2026-07-29",
        motivoDescarte:
          "Sem movimentação na janela de 24 a 31/08/2026 (última atualização em 29/07/2026 com prazo prorrogado até 28/09/2026).",
      },
      {
        titulo: "Resoluções ANM nº 244, 245 e 246/2026 e Aviso de Consulta Pública nº 1/2026",
        fonte: "ANM",
        orgao: "ANM",
        publicadoEm: "2026-07-31",
        motivoDescarte:
          "Publicados entre 31/07 e 07/08/2026, fora da janela semanal vigiada.",
      },
    ],
    fontesSemOcorrencias: [
      {
        orgao: "ANA (Agência Nacional de Águas e Saneamento Básico)",
        url: "https://www.gov.br/ana/pt-br/legislacao/resolucoes/resolucoes-regulatorias",
        observacao:
          "Nenhum ato normativo inédito publicado entre 24 e 31/08/2026. A Resolução nº 301/2026 e a Consulta Pública nº 04/2026 foram editadas antes da janela.",
      },
      {
        orgao: "ANM (Agência Nacional de Mineração)",
        url: "https://www.gov.br/anm",
        observacao:
          "Nenhum ato normativo publicado na janela. As matérias de 25 a 28/08 restringiram-se à cobertura institucional da Exposibram 2026.",
      },
      {
        orgao: "Eixo Terra / Regularização Fundiária",
        observacao:
          "Nenhum ato normativo ou relevante localizado no período vigiado.",
      },
    ],
  },
  {
    id: "ciclo-2026-08-17-2026-08-24",
    periodo: {
      inicio: "2026-08-17",
      fim: "2026-08-24",
      rotulo: "17 a 24/08/2026",
    },
    fontesVigiadas: ["DOU", "ANM", "ANEEL", "ANA"],
    itens: [
      {
        id: "anm-arr-cfem-municipios-afetados",
        titulo:
          "ANM conclui Avaliação de Resultado Regulatório da CFEM e projeta sistema dinâmico para repasses a municípios afetados",
        fonte: "ANM (Notícias Oficiais)",
        orgao: "ANM",
        publicadoEm: "2026-08-19",
        url: "https://www.gov.br/anm/pt-br/assuntos/noticias/avaliacao-de-regras-da-cfem-e-concluida-e-projeta-sistema-dinamico-para-repasses-a-municipios-afetados",
        resumo:
          "A Avaliação de Resultado Regulatório (ARR) da Resolução ANM nº 143/2023 apontou a necessidade de aperfeiçoar os critérios de distribuição dos 15% da CFEM destinados a municípios afetados (não apenas produtores) pela atividade mineral, visando um modelo dinâmico.",
        observatorio: "recursos-minerais",
        perguntaVinculada:
          "Como se distribui a compensação financeira pela exploração mineral entre os entes federativos?",
        empresasCitadas: ["Municípios Afetados pela Mineração", "ANM"],
      },
      {
        id: "anm-sumula-prazos-recursos-municipios-afetados",
        titulo:
          "ANM aprova súmula definindo inadmissibilidade de recursos fora do prazo contra lista anual de municípios afetados",
        fonte: "ANM (88ª Reunião Ordinária Pública)",
        orgao: "ANM",
        publicadoEm: "2026-08-19",
        url: "https://www.gov.br/anm/pt-br/assuntos/noticias/recursos-contra-lista-de-municipios-afetados-por-mineracao-deverao-observar-prazos",
        resumo:
          "Na 88ª Reunião Ordinária Pública, a Diretoria Colegiada da ANM aprovou súmula que torna inadmissíveis recursos administrativos fora do prazo contra a lista anual de municípios afetados por infraestrutura ou transporte mineral, que fundamenta o rateio da CFEM.",
        observatorio: "recursos-minerais",
        perguntaVinculada:
          "Como se distribui a compensação financeira pela exploração mineral entre os entes federativos?",
        empresasCitadas: ["Municípios Afetados", "Diretoria Colegiada da ANM"],
      },
      {
        id: "ana-outorga-hidreletricas-reversiveis-ciclo-fechado",
        titulo:
          "ANA simplifica exigência de outorga de recursos hídricos para hidrelétricas reversíveis de ciclo fechado",
        fonte: "Cenário Energia (Manifestação da ANA à ANEEL)",
        orgao: "ANA",
        publicadoEm: "2026-08-19",
        url: "https://cenarioenergia.com.br/2026/08/19/ana-simplifica-outorga-para-hidreletricas-reversiveis-de-ciclo-fechado/",
        resumo:
          "A ANA restringiu a exigência de outorga de recursos hídricos para UHRs de ciclo fechado ao enchimento inicial dos reservatórios e à recomposição de perdas operacionais — dispensando análise contínua de trechos de vazão reduzida e abrindo a possibilidade de a ANEEL pedir outorga preventiva em nome próprio.",
        observatorio: "aguas",
        perguntaVinculada:
          "Como os instrumentos de outorga e cobrança pelo uso da água afetam grandes empreendimentos?",
        empresasCitadas: ["ANA", "ANEEL", "Empreendimentos de UHR"],
      },
      {
        id: "aneel-revisao-tarifaria-celesc-sc",
        titulo:
          "ANEEL aprova revisão tarifária periódica da Celesc-DIS com efeito médio de 10,82% em Santa Catarina",
        fonte: "ANEEL (Resolução Homologatória nº 3.602/2026)",
        orgao: "ANEEL",
        publicadoEm: "2026-08-21",
        url: "https://www.gov.br/aneel/pt-br",
        resumo:
          "Revisão tarifária periódica da Celesc-DIS com efeito médio de 10,82% sobre cerca de 3,6 milhões de unidades consumidoras em SC, sendo 9,26% em baixa tensão (residencial B1 em 9,29%) e 14,16% para grandes consumidores industriais e comerciais em alta tensão por alocação de custos de capacidade.",
        observatorio: "energia",
        perguntaVinculada:
          "Que efeitos as revisões tarifárias periódicas produzem sobre consumidores industriais e rurais?",
        empresasCitadas: ["Celesc Distribuição S.A.", "Consumidores Industriais e Comerciais de SC"],
        valorEnvolvido: "Reajuste médio +10,82% (Alta Tensão +14,16%)",
      },
    ],
    analises: [
      {
        observatorio: "recursos-minerais",
        tema: "Revisão dos Critérios e Prazos Recursais da CFEM para Municípios Afetados (ARR e Súmula ANM)",
        status: "em_observacao",
        statusRotulo: "Lead de Monitoramento — Triagem Aberta",
        resumo:
          "A conclusão da ARR da Resolução ANM nº 143/2023 projetando modelo dinâmico de repasse da CFEM aos municípios afetados, combinada com a súmula fixando preclusão temporal de recursos na 88ª Reunião Colegiada, foram catalogadas como leads de forte sinergia com a agenda do observatório.",
        criterios: {
          recorrencia: {
            status: "em_maturacao",
            titulo: "Recorrência documentada",
            detalhe:
              "Dois atos normativos convergentes aprovados na mesma reunião colegiada. A eventual constituição de núcleo autônomo aguardará a publicação da minuta regulatória subsequente da ARR ou o surgimento de disputas interfederativas registradas pelo instituto.",
          },
          relevanciaColetiva: {
            status: "atendido",
            titulo: "Relevância coletiva",
            detalhe:
              "Os critérios definem o rateio de 15% da arrecadação global da CFEM entre centenas de municípios cortados por ferroductos, rodovias de escoamento e estruturas de apoio minerário.",
          },
          viabilidadeApuracao: {
            status: "atendido",
            titulo: "Viabilidade de apuração",
            detalhe:
              "Documentação pública acessível nas atas da 88ª Reunião Ordinária da ANM e nos autos do processo da ARR nº 143/2023.",
          },
        },
        parecerTecnico:
          "Lead mantido em observação ativa no Observatório de Recursos Minerais. Recomenda-se acompanhar o desdobramento da minuta regulatória decorrente da ARR.",
      },
      {
        observatorio: "aguas",
        tema: "Simplificação do Regime de Outorga Hídrica para Hidrelétricas Reversíveis (ANA/ANEEL)",
        status: "em_observacao",
        statusRotulo: "Lead de Monitoramento — Triagem Aberta",
        resumo:
          "A limitação da exigência de outorga para UHRs de ciclo fechado ao volume de enchimento inicial e reposição de perdas alivia exigências operacionais e altera a sistemática de outorga preventiva em leilões de reserva.",
        criterios: {
          recorrencia: {
            status: "em_maturacao",
            titulo: "Recorrência documentada",
            detalhe:
              "Manifestação da ANA em resposta a consulta da ANEEL. A consolidação dependerá da posterior edição de norma conjunta ou resolução normativa abrangendo a outorga no SIN.",
          },
          relevanciaColetiva: {
            status: "atendido",
            titulo: "Relevância coletiva",
            detalhe:
              "Afeta diretamente o modelo de negócios e o aproveitamento de recursos hídricos para armazenamento de energia de grande porte no país.",
          },
          viabilidadeApuracao: {
            status: "atendido",
            titulo: "Viabilidade de apuração",
            detalhe:
              "Manifestação formal da agência e normativos de outorga de recursos hídricos disponíveis nos portais da ANA e ANEEL.",
          },
        },
        parecerTecnico:
          "Item catalogado como lead de monitoramento no Observatório Nacional das Águas.",
      },
      {
        observatorio: "energia",
        tema: "Revisão Tarifária Periódica Celesc-DIS e Alocação de Custos de Capacidade (ANEEL)",
        status: "em_observacao",
        statusRotulo: "Lead de Monitoramento — Triagem Aberta",
        resumo:
          "A Resolução Homologatória nº 3.602/2026 fixou reajuste médio de 10,82% para a Celesc-DIS, destacando-se a elevação de 14,16% na Alta Tensão devido à alocação de custos de capacidade e demanda.",
        criterios: {
          recorrencia: {
            status: "em_maturacao",
            titulo: "Recorrência documentada",
            detalhe:
              "Processo tarifário periódico ordinário de calendário regulatório. Comparações contínuas dependem do fechamento do ciclo de revisões de 2026 de outras distribuidoras do Sul/Sudeste.",
          },
          relevanciaColetiva: {
            status: "atendido",
            titulo: "Relevância coletiva",
            detalhe:
              "Impacto financeiro direto sobre 3,6 milhões de consumidores e sobre os custos de competitividade do parque industrial catarinense.",
          },
          viabilidadeApuracao: {
            status: "atendido",
            titulo: "Viabilidade de apuração",
            detalhe:
              "Dados abertos na Resolução Homologatória nº 3.602/2026 e nas planilhas de cálculo do processo tarifário na ANEEL.",
          },
        },
        parecerTecnico:
          "Item catalogado como lead no Observatório Nacional da Energia e no Observatório de Tarifas Públicas.",
      },
    ],
    itensDescartados: [
      {
        titulo: "Decretos nº 13.096/2026 e nº 13.097/2026 (Hidrogênio Sustentável e Mercado Livre)",
        fonte: "DOU",
        orgao: "DOU",
        publicadoEm: "2026-08-12",
        motivoDescarte: "Publicados em 12-13/08/2026, fora da janela semanal vigiada (17 a 24/08/2026).",
      },
      {
        titulo: "Consulta Pública ANM nº 01/2026 (Infrações e Multas na Mineração)",
        fonte: "ANM",
        orgao: "ANM",
        publicadoEm: "2026-08-10",
        motivoDescarte: "Abertura em 10/08/2026, fora da janela semanal de 17 a 24/08/2026.",
      },
      {
        titulo: "Prorrogação da Tomada de Subsídios nº 04/2026 (Sandbox Regulatório Mineral)",
        fonte: "ANM",
        orgao: "ANM",
        publicadoEm: "2026-07-29",
        motivoDescarte: "Sem movimentações novas publicadas no Diário Oficial ou portal na janela de 17 a 24/08/2026 (contribuições abertas até 28/09/2026).",
      },
    ],
    fontesSemOcorrencias: [
      {
        orgao: "DOU (Diário Oficial da União)",
        url: "https://in.gov.br",
        observacao:
          "Sem portarias ou decretos autônomos inéditos de impacto difuso publicados entre 17 e 24/08/2026 além dos atos homologatórios já mapeados pelas agências reguladoras específicas.",
      },
    ],
  },
  {
    id: "ciclo-2026-08-10-2026-08-17",
    periodo: {
      inicio: "2026-08-10",
      fim: "2026-08-17",
      rotulo: "10 a 17/08/2026",
    },
    fontesVigiadas: ["DOU", "ANM", "ANEEL", "ANA"],
    itens: [
      {
        id: "aneel-repasse-5-bi-cde-norte-nordeste",
        titulo:
          "ANEEL homologa repasse preliminar de R$ 5,48 bilhões às distribuidoras para reduzir tarifas no Norte e Nordeste",
        fonte: "ANEEL (Notícias Oficiais)",
        orgao: "ANEEL",
        publicadoEm: "2026-08-11",
        url: "https://www.gov.br/aneel/pt-br/assuntos/noticias/2026-defeso-eleitoral/aneel-homologa-repasse-preliminar-de-r-5-48-bilhoes-as-distribuidoras-recurso-utilizado-para-reduzir-tarifas-de-energia-no-norte-e-nordeste",
        resumo:
          "A ANEEL homologou repasse preliminar de R$ 5,48 bilhões às distribuidoras com foco na redução tarifária nas regiões Norte e Nordeste. Os valores decorrem da renegociação de Uso de Bem Público (UBP) de usinas hidrelétricas, convertida em aporte antecipado à Conta de Desenvolvimento Energético (CDE) — encargo setorial redirecionado para aliviar a pressão tarifária regional.",
        observatorio: "energia",
        perguntaVinculada:
          "Como os encargos setoriais se distribuem entre as classes de consumo e que critérios sustentam essa repartição?",
        empresasCitadas: ["Distribuidoras do Norte e Nordeste", "CCEE"],
        valorEnvolvido: "R$ 5.480.000.000,00",
      },
      {
        id: "aneel-revisao-tarifaria-cea-amapa",
        titulo:
          "ANEEL decide nova data para reajuste e revisão de tarifas da CEA (Amapá)",
        fonte: "ANEEL (Notícias Oficiais)",
        orgao: "ANEEL",
        publicadoEm: "2026-08-11",
        url: "https://www.gov.br/aneel/pt-br/assuntos/noticias/2026-defeso-eleitoral/agencia-decide-nova-data-para-reajuste-e-revisao-de-tarifas-da-cea-amapa",
        resumo:
          "A ANEEL deliberou nova data para o processo de reajuste e revisão tarifária periódica da concessionária CEA Equatorial (Amapá), com reflexo direto no cronograma de repasse e nas tarifas aplicáveis aos consumidores da área de concessão.",
        observatorio: "energia",
        perguntaVinculada:
          "Que efeitos as revisões tarifárias periódicas produzem sobre consumidores industriais e rurais?",
        empresasCitadas: ["CEA Equatorial (Amapá)"],
      },
      {
        id: "anm-distribuicao-cfem-504-milhoes-pgrm",
        titulo:
          "Mais de R$ 504 milhões em CFEM são distribuídos a estados e municípios produtores",
        fonte: "ANM (Notícias Oficiais)",
        orgao: "ANM",
        publicadoEm: "2026-08-14",
        url: "https://www.gov.br/anm/pt-br/assuntos/noticias/mais-de-r-504-milhoes-em-cfem-sao-distribuidos-a-estados-e-municipios-produtores",
        resumo:
          "A ANM realizou a distribuição de mais de R$ 504 milhões em royalties da CFEM a estados e municípios produtores. O repasse marcou o início da operação da Plataforma de Gestão de Royalties Minerais (PGRM), responsável por quase 89% de toda a arrecadação apurada no período.",
        observatorio: "recursos-minerais",
        perguntaVinculada:
          "Como se distribui a compensação financeira pela exploração mineral entre os entes federativos?",
        empresasCitadas: ["Mineradoras e Entes Federativos Beneficiários"],
        valorEnvolvido: "R$ 504.000.000,00",
      },
      {
        id: "anm-consulta-publica-infracoes-multas-mineracao",
        titulo:
          "Aberta consulta pública para revisar regras de infrações e multas na mineração",
        fonte: "ANM (Consulta Pública, 10/08 a 24/09/2026)",
        orgao: "ANM",
        publicadoEm: "2026-08-10",
        url: "https://www.gov.br/anm/pt-br/assuntos/noticias/aberta-consulta-publica-para-revisar-regras-de-infracoes-e-multas-na-mineracao",
        resumo:
          "A ANM abriu consulta pública com prazo de contribuições de 10/08 a 24/09/2026 para revisar procedimentos de apuração de infrações, sanções e critérios de cálculo de multas na atividade minerária — afetando diretamente o regime de fiscalização que dá suporte às obrigações de recuperação ambiental em áreas lavradas.",
        observatorio: "recursos-minerais",
        perguntaVinculada:
          "Que obrigações de recuperação ambiental incidem sobre áreas lavradas e como são fiscalizadas?",
        empresasCitadas: ["Setor Minerário Nacional"],
      },
    ],
    analises: [
      {
        observatorio: "energia",
        tema: "Aportes de UBP na CDE e Calendário Tarifário de Distribuidoras (ANEEL)",
        status: "em_observacao",
        statusRotulo: "Lead de Monitoramento — Triagem Aberta",
        resumo:
          "A homologação do repasse preliminar de R$ 5,48 bi de UBP para redução tarifária no Norte/Nordeste e a fixação de nova data de revisão da CEA (Amapá) foram catalogados como leads de vigilância. O aporte atenua encargos setoriais no curto prazo, mas os atos isolados da semana não configuram, por si sós, um novo núcleo autônomo.",
        criterios: {
          recorrencia: {
            status: "em_maturacao",
            titulo: "Recorrência documentada",
            detalhe:
              "O uso de UBP para amortecer a CDE segue a diretriz orçamentária de 2026, mas a aplicação prática em processos homologatórios específicos requer série temporal continuada para mapear o impacto consolidado por classe de consumo.",
          },
          relevanciaColetiva: {
            status: "atendido",
            titulo: "Relevância coletiva",
            detalhe:
              "O repasse bilionário e os reajustes das distribuidoras afetam diretamente as tarifas de milhões de consumidores residenciais, comerciais e industriais nas regiões Norte e Nordeste.",
          },
          viabilidadeApuracao: {
            status: "atendido",
            titulo: "Viabilidade de apuração",
            detalhe:
              "Atos homologatórios e notas técnicas disponíveis no portal oficial da ANEEL e nos registros da CCEE.",
          },
        },
        parecerTecnico:
          "Item mantido como lead de monitoramento no Observatório Nacional da Energia. Não atende isoladamente aos três critérios para constituição de núcleo autônomo de pesquisa.",
      },
      {
        observatorio: "recursos-minerais",
        tema: "Arrecadação de CFEM via PGRM e Revisão do Regime Sancionatório Mineral (ANM)",
        status: "em_observacao",
        statusRotulo: "Lead de Monitoramento — Triagem Aberta",
        resumo:
          "Distribuição de R$ 504 milhões em CFEM com estreia da plataforma PGRM (89% da arrecadação) e abertura de consulta pública para dosimetria de infrações e multas. Ambos os itens foram catalogados como leads para vigilância contínua.",
        criterios: {
          recorrencia: {
            status: "em_maturacao",
            titulo: "Recorrência documentada",
            detalhe:
              "A arrecadação de royalties é rotina mensal e a consulta pública iniciou em 10/08/2026. A comprovação de padrão regulatório novo depende do desfecho das contribuições (até 24/09/2026) e da apuração da arrecadação nos meses subsequentes via PGRM.",
          },
          relevanciaColetiva: {
            status: "atendido",
            titulo: "Relevância coletiva",
            detalhe:
              "A partilha da CFEM subsidia orçamentos públicos em centenas de municípios mineradores e o regime de multas incide sobre a recuperação socioambiental de todas as áreas lavradas do país.",
          },
          viabilidadeApuracao: {
            status: "atendido",
            titulo: "Viabilidade de apuração",
            detalhe:
              "Dados públicos acessíveis no portal da ANM, no sistema PGRM e nos autos da Consulta Pública de infrações e multas.",
          },
        },
        parecerTecnico:
          "Item mantido como lead de monitoramento no Observatório de Recursos Minerais. Toda decisão sobre eventual abertura de núcleo aguardará o encerramento do prazo de consulta pública em 24/09/2026.",
      },
    ],
    itensDescartados: [
      {
        titulo:
          "Manutenção do processo de recomendação de caducidade da concessão da Enel São Paulo",
        fonte: "ANEEL (Notícias)",
        orgao: "ANEEL",
        publicadoEm: "2026-08-14",
        motivoDescarte:
          "Sem relação direta com as perguntas de pesquisa em aberto nos observatórios atuais. Não incluída para evitar conexões forçadas.",
      },
    ],
    fontesSemOcorrencias: [
      {
        orgao: "DOU (Diário Oficial da União)",
        url: "https://in.gov.br",
        observacao:
          "As buscas realizadas não localizaram normas/portarias/atos claramente relacionados a água, terra, mineração ou energia elétrica publicados nesta janela de 7 dias.",
      },
      {
        orgao: "ANA (Agência Nacional de Águas e Saneamento Básico)",
        url: "https://gov.br/ana",
        observacao:
          "Página de notícias da agência com acesso temporariamente restrito por autenticação durante a apuração; buscas alternativas sem publicações datadas entre 10 e 17/08/2026. Recomenda-se checagem manual no próximo ciclo.",
      },
      {
        orgao: "ANM (Sandbox Regulatório - Tomada de Subsídios nº 04/2026)",
        url: "https://gov.br/anm",
        observacao:
          "Sem novas movimentações no período. A última atualização (prorrogação do prazo de contribuições até 28/09/2026) foi publicada em 29/07/2026, fora da janela semanal.",
      },
    ],
  },
  {
    id: "ciclo-2026-08-03-2026-08-10",
    periodo: {
      inicio: "2026-08-03",
      fim: "2026-08-10",
      rotulo: "03 a 10/08/2026",
    },
    fontesVigiadas: ["DOU", "ANM", "ANEEL", "ANA"],
    itens: [
      {
        id: "anm-exigencias-barragens-vale-anglo-greenmetals",
        titulo:
          "ANM fixa prazos para exigências técnicas em barragens da Vale, Anglo American e Green Metals e indefere alteração cadastral",
        fonte: "ANM (Despacho, Relação nº 21/2026) — via Atlas Público",
        orgao: "ANM",
        publicadoEm: "2026-08-04",
        url: "https://atlaspublico.com.br/noticias/anm-fixa-prazos-para-exigencias-tecnicas-em-barragens-da-76870",
        resumo:
          "A ANM fixou prazos para exigências técnicas em três barragens de mineração em Minas Gerais — Maravilhas II (Vale), Mãe D'água (Green Metals) e a barragem de rejeitos da Anglo American — e negou pedido de alteração cadastral da Anglo American.",
        observatorio: "recursos-minerais",
        perguntaVinculada:
          "Que obrigações de recuperação ambiental incidem sobre áreas lavradas e como são fiscalizadas?",
        empresasCitadas: ["Vale", "Anglo American", "Green Metals"],
      },
      {
        id: "anm-exigencia-campo-grande-vale-extrativa",
        titulo:
          "ANM determina cumprimento de exigência técnica em barragem Campo Grande da Vale e nega prorrogação à Extrativa Metalurgia",
        fonte: "ANM (Despacho, Relação nº 24/2026) — via Atlas Público",
        orgao: "ANM",
        publicadoEm: "2026-08-05",
        url: "https://atlaspublico.com.br/noticias/anm-determina-cumprimento-de-exigencia-tecnica-em-barragem-77137",
        resumo:
          "A ANM determinou à Vale o cumprimento de exigência técnica na barragem Campo Grande (Mina Alegria, Mariana/MG) e negou à Extrativa Metalurgia prorrogação de prazo na barragem Rejeitos.",
        observatorio: "recursos-minerais",
        perguntaVinculada:
          "Que obrigações de recuperação ambiental incidem sobre áreas lavradas e como são fiscalizadas?",
        empresasCitadas: ["Vale", "Extrativa Metalurgia"],
      },
      {
        id: "anm-notificacao-cfem-11-bi-vale",
        titulo:
          "Agência Nacional de Mineração notifica Vale e outras mineradoras a pagar R$ 11,5 bi em CFEM",
        fonte: "ANM — via Atlas Público",
        orgao: "ANM",
        publicadoEm: "2026-08-05",
        url: "https://atlaspublico.com.br/noticias/agencia-nacional-de-mineracao-notifica-vale-e-outras-77138",
        resumo:
          "A ANM notificou a Vale e outras mineradoras a pagar R$ 11,5 bilhões em CFEM em cerca de 30 processos administrativos no Pará e em Minas Gerais.",
        observatorio: "recursos-minerais",
        perguntaVinculada:
          "Como se distribui a compensação financeira pela exploração mineral entre os entes federativos?",
        empresasCitadas: ["Vale", "Outras mineradoras"],
        valorEnvolvido: "R$ 11.500.000.000,00",
      },
      {
        id: "aneel-orcamento-cde-2026-subsidios-gd",
        titulo:
          "ANEEL aprova proposta de R$ 52,7 bilhões para CDE em 2026 e mobiliza R$ 5,48 bi de UBP para conter tarifas",
        fonte: "ANEEL (Processo Tarifário CDE 2026)",
        orgao: "ANEEL",
        publicadoEm: "2026-08-08",
        url: "https://www.gov.br/aneel/pt-br/assuntos/noticias/2026",
        resumo:
          "A ANEEL aprovou o orçamento da Conta de Desenvolvimento Energético para 2026 em R$ 52,7 bilhões, com forte pressão de subsídios de GD e uso de R$ 5,48 bi de UBP.",
        observatorio: "energia",
        perguntaVinculada:
          "Como os encargos setoriais se distribuem entre as classes de consumo e que critérios sustentam essa repartição?",
        empresasCitadas: ["Distribuidoras do SIN", "CCEE"],
        valorEnvolvido: "R$ 52.700.000.000,00",
      },
    ],
    analises: [
      {
        observatorio: "recursos-minerais",
        tema: "Fiscalização e Segurança de Barragens de Mineração (Lei nº 12.334/2010)",
        status: "em_observacao",
        statusRotulo: "Em Observação Ativa — Recorrência em Maturação",
        resumo:
          "Despachos simultâneos da ANM atingindo 4 operadoras em Minas Gerais.",
        criterios: {
          recorrencia: {
            status: "em_maturacao",
            titulo: "Recorrência documentada",
            detalhe: "Necessita série temporal continuada de 60 a 90 dias.",
          },
          relevanciaColetiva: {
            status: "atendido",
            titulo: "Relevância coletiva",
            detalhe: "Segurança de populações e bacias hidrográficas.",
          },
          viabilidadeApuracao: {
            status: "atendido",
            titulo: "Viabilidade de apuração",
            detalhe: "Dados abertos no SIGBM/ANM e SEI.",
          },
        },
        parecerTecnico: "Acompanhamento em observação ativa.",
      },
    ],
  },
];

export const RADAR_ATUAL: CicloRadar = HISTORICO_RADAR[0];

export function obterItensRadar(observatorio?: IdObservatorio, cicloId?: string): readonly ItemRadar[] {
  const ciclo = cicloId ? HISTORICO_RADAR.find((c) => c.id === cicloId) ?? RADAR_ATUAL : RADAR_ATUAL;
  if (!observatorio) return ciclo.itens;
  return ciclo.itens.filter((item) => item.observatorio === observatorio);
}

export function obterAnaliseRadar(observatorio: IdObservatorio, cicloId?: string): AnaliseNucleoSemanal | undefined {
  const ciclo = cicloId ? HISTORICO_RADAR.find((c) => c.id === cicloId) ?? RADAR_ATUAL : RADAR_ATUAL;
  return ciclo.analises.find((analise) => analise.observatorio === observatorio);
}

export function contarItensRadar(observatorio: IdObservatorio, cicloId?: string): number {
  const ciclo = cicloId ? HISTORICO_RADAR.find((c) => c.id === cicloId) ?? RADAR_ATUAL : RADAR_ATUAL;
  return ciclo.itens.filter((item) => item.observatorio === observatorio).length;
}

export function obterTodosCiclos(): readonly CicloRadar[] {
  return HISTORICO_RADAR;
}
