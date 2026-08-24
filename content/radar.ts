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
