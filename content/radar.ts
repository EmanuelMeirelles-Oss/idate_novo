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

export interface AnaliseNucleoSemanal {
  readonly observatorio: IdObservatorio;
  readonly tema: string;
  readonly status: "em_observacao" | "em_maturacao" | "nucleo_constituido" | "arquivado";
  readonly statusRotulo: string;
  readonly resumo: string;
  readonly criterios: {
    readonly recorrencia: {
      readonly status: StatusCriterio;
      readonly titulo: string;
      readonly detalhe: string;
    };
    readonly relevanciaColetiva: {
      readonly status: StatusCriterio;
      readonly titulo: string;
      readonly detalhe: string;
    };
    readonly viabilidadeApuracao: {
      readonly status: StatusCriterio;
      readonly titulo: string;
      readonly detalhe: string;
    };
  };
  readonly parecerTecnico: string;
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
}

export const RADAR_ATUAL: CicloRadar = {
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
        "A ANM fixou prazos para exigências técnicas em três barragens de mineração em Minas Gerais — Maravilhas II (Vale, Itabirito), Mãe D'água (Green Metals, Nova Era) e a barragem de rejeitos da Anglo American (Santo Antônio do Grama, vinculada ao mineroduto do Sistema Minas-Rio) — e negou pedido de alteração cadastral da Anglo American. A barragem Mãe D'água está classificada como alto risco e é alvo de ação civil pública do MPF desde maio/2026 por falhas de segurança básica.",
      observatorio: "recursos-minerais",
      perguntaVinculada:
        "Que obrigações de recuperação ambiental incidem sobre áreas lavradas e como são fiscalizadas?",
      empresasCitadas: ["Vale", "Anglo American", "Green Metals"],
      estruturasCitadas: [
        "Maravilhas II (Itabirito/MG)",
        "Mãe D'água (Nova Era/MG)",
        "Barragem do Sistema Minas-Rio (Santo Antônio do Grama/MG)",
      ],
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
        "A ANM determinou à Vale o cumprimento de exigência técnica na barragem Campo Grande (Mina Alegria, Mariana/MG, em descaracterização) e negou à Extrativa Metalurgia prorrogação de prazo para exigências na barragem Rejeitos, além de impor nova exigência técnica com prazo de 30 dias.",
      observatorio: "recursos-minerais",
      perguntaVinculada:
        "Que obrigações de recuperação ambiental incidem sobre áreas lavradas e como são fiscalizadas?",
      empresasCitadas: ["Vale", "Extrativa Metalurgia"],
      estruturasCitadas: [
        "Campo Grande (Mina Alegria, Mariana/MG)",
        "Barragem Rejeitos",
      ],
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
        "A ANM notificou a Vale e outras mineradoras a pagar R$ 11,5 bilhões em CFEM (30 processos de cobrança, operações no Pará e em Minas Gerais), com prazo de 10 dias para pagamento ou defesa antes da inscrição em dívida ativa.",
      observatorio: "recursos-minerais",
      perguntaVinculada:
        "Como se distribui a compensação financeira pela exploração mineral entre os entes federativos?",
      empresasCitadas: ["Vale", "Outras mineradoras"],
      valorEnvolvido: "R$ 11.500.000.000,00",
    },
  ],
  analises: [
    {
      observatorio: "recursos-minerais",
      tema: "Fiscalização e Segurança de Barragens de Mineração (Lei nº 12.334/2010 e Resolução ANM nº 95/2022)",
      status: "em_observacao",
      statusRotulo: "Em Observação Ativa — Recorrência em Maturação",
      resumo:
        "Três despachos independentes da ANM na mesma semana atingindo quatro mineradoras distintas (Vale, Green Metals, Anglo American e Extrativa Metalurgia) sob o mesmo regime de segurança de barragens. O caso Mãe D'água possui histórico prévio de ACP do MPF.",
      criterios: {
        recorrencia: {
          status: "em_maturacao",
          titulo: "Recorrência documentada",
          detalhe:
            "Aparece em despachos simultâneos de 4 empresas sob o mesmo marco normativo, mas em um recorte temporal de uma semana. Requer série temporal continuada (60 a 90 dias) para comprovar padrão regulatório consolidado.",
        },
        relevanciaColetiva: {
          status: "atendido",
          titulo: "Relevância coletiva",
          detalhe:
            "A estabilidade de barragens de rejeito e o cumprimento de prazos de descaracterização afetam diretamente a segurança de populações a jusante e a proteção de bacias hidrográficas em Minas Gerais.",
        },
        viabilidadeApuracao: {
          status: "atendido",
          titulo: "Viabilidade de apuração",
          detalhe:
            "Fontes documentais abertas suficientes: dados públicos do SIGBM/ANM, processos no SEI/ANM e autos de ação civil pública do MPF.",
        },
      },
      parecerTecnico:
        "Manter o tema em observação ativa no acervo temático do Observatório de Recursos Minerais. A abertura formal de um núcleo autônomo dependerá do monitoramento de despachos e autuações subsequentes nas próximas semanas.",
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
