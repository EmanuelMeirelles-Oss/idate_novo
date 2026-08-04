import { DENUNCIA } from "@/content/denuncia";

/**
 * "Como investigamos". As sete etapas são a mesma sequência exibida na Central
 * de Denúncias — importadas, não duplicadas, para que uma alteração no percurso
 * não deixe as duas páginas contando histórias diferentes.
 */
export const METODOLOGIA = {
  titulo: "Como investigamos",
  chamada:
    "O IDATE não investiga caso a caso. Investiga padrões — e o método existe para distinguir um do outro.",

  padrao: {
    titulo: "De caso isolado a objeto de pesquisa",
    paragrafos: [
      "Uma cobrança indevida em um município é um problema individual. A mesma cobrança em duzentos municípios, sob a mesma norma e com a mesma justificativa, é um problema institucional — e exige tratamento diferente.",
      "A distinção entre os dois casos não é evidente para quem está dentro de apenas um deles. Só aparece quando existe um acervo que permita comparação. Construir e manter esse acervo é a atividade central do instituto.",
    ],
    fontes: [
      "Comunicações recebidas pela Central de Denúncias",
      "Legislação federal, estadual e municipal",
      "Normas de agências reguladoras",
      "Jurisprudência dos tribunais superiores",
      "Contratos de concessão e termos de outorga",
      "Dados públicos de órgãos setoriais",
    ],
  },

  /** Fonte única da sequência. Ver content/denuncia.ts. */
  etapas: DENUNCIA.etapas.lista,

  nucleos: {
    titulo: "Quando nasce um núcleo de pesquisa",
    paragrafos: [
      "Um núcleo é constituído quando três condições se apresentam ao mesmo tempo: recorrência documentada, relevância coletiva e viabilidade de apuração com as fontes disponíveis.",
      "A ausência de qualquer uma delas mantém o caso no acervo, disponível para reavaliação. Casos arquivados por insuficiência de recorrência voltam à análise sempre que novas comunicações semelhantes chegam.",
    ],
    criterios: [
      {
        nome: "Recorrência",
        descricao:
          "O padrão aparece em comunicações independentes, de origens distintas, sob a mesma configuração normativa.",
      },
      {
        nome: "Relevância coletiva",
        descricao:
          "O problema afeta um conjunto indeterminado de pessoas ou empresas, não apenas as que comunicaram.",
      },
      {
        nome: "Viabilidade de apuração",
        descricao:
          "Existem fontes documentais e normativas suficientes para sustentar uma conclusão técnica verificável.",
      },
    ],
  },

  limites: {
    titulo: "Os limites do método",
    paragrafos: [
      "Um estudo do IDATE descreve o que as fontes consultadas permitem afirmar, e explicita o que elas não permitem. Publicações do instituto trazem sempre o recorte temporal, as fontes utilizadas e as questões que permaneceram em aberto.",
      "Pesquisa sobre regulação lida com normas que mudam e com entendimentos judiciais que se alteram. Um estudo publicado é fotografia de um momento, não sentença definitiva — e é assim que deve ser lido e citado.",
    ],
  },
} as const;
