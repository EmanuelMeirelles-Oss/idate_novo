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

export const RADAR_ATUAL: CicloRadar = {
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
};

export function obterItensRadar(observatorio?: IdObservatorio): readonly ItemRadar[] {
  if (!observatorio) return RADAR_ATUAL.itens;
  return RADAR_ATUAL.itens.filter((item) => item.observatorio === observatorio);
}

export function obterAnaliseRadar(observatorio: IdObservatorio): AnaliseNucleoSemanal | undefined {
  return RADAR_ATUAL.analises.find((analise) => analise.observatorio === observatorio);
}

export function contarItensRadar(observatorio: IdObservatorio): number {
  return RADAR_ATUAL.itens.filter((item) => item.observatorio === observatorio).length;
}
