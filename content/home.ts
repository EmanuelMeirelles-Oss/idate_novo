import { LEMA } from "@/content/site";

/**
 * A home institucional. Registro deliberadamente frio: terceira pessoa, sem
 * "você", sem chamada comercial. Quem fala em segunda pessoa é a Central de
 * Denúncias (content/denuncia.ts) — a divisão de vozes entre as duas páginas é
 * o que impede que o site pareça um funil.
 */
export const HOME = {
  /*
    A headline enuncia uma lacuna de observação, não um problema do visitante.
    É a diferença entre "sua empresa pode ter pago mais do que devia" e uma
    constatação sobre o país: a primeira convoca um cliente, a segunda apresenta
    um instituto. O subtítulo diz, em uma respiração, o que o IDATE é
    juridicamente — associação civil sem fins econômicos — porque essa é a
    informação que separa um instituto de um escritório.
  */
  hero: {
    kicker: { rotulo: "Associação civil sem fins econômicos" },
    /*
      Partida em segmentos porque cada um sobe por trás de uma máscara própria,
      em sequência. A quebra é decisão tipográfica: "Poucos os observam de
      perto." isolado carrega o peso da frase.
    */
    titulo: ["Três recursos sustentam o país.", "Poucos os observam de perto."],
    subtitulo:
      "O IDATE produz pesquisa, estudos técnicos e observatórios permanentes sobre os direitos da água, da terra e da energia.",
    imagem: {
      src: "/imagens/hero-transmissao.jpg",
      alt: "Torre de transmissão de energia silhuetada contra o sol nascendo em meio à névoa baixa.",
    },
    ctaPrimario: { rotulo: "Conheça os observatórios", href: "/observatorios" },
    ctaSecundario: { rotulo: "Como investigamos", href: "/metodologia" },
    /*
      Substituem os antigos selos de "Sigilo & Rigor Regulatório / Engenharia
      Jurídica", que eram sinais de escritório. Estes três declaram natureza
      institucional: o que o instituto publica, como trabalha e qual seu alcance.
    */
    pilares: ["Acesso aberto", "Pesquisa permanente", "Abrangência nacional"],
  },

  /*
    O lema em posição de tese. Vem logo após o hero porque é a única frase do
    site que explica, sozinha, por que um instituto de pesquisa mantém um canal
    de denúncias — e por que o canal não é um serviço, mas uma fonte.
  */
  lema: {
    kicker: { rotulo: "A razão de existir" },
    declaracao: LEMA,
    desenvolvimento:
      "Denúncia isolada é registro estatístico. Denúncia recorrente é objeto de pesquisa. O instituto existe para fazer essa passagem com método, e para publicar o resultado.",
  },

  /*
    Os três eixos, em foto. A tese do Lema aterrissa em setor concreto antes de
    entrar no grid dos 8 observatórios — cada um deles já pertence a um destes
    três eixos (ou a "transversal"). Tags reaproveitadas de
    docs/copy-home-v2.md §04, que descrevia os mesmos setores; só a moldura de
    venda em volta delas foi descartada, não a lista em si.
  */
  eixos: {
    kicker: { rotulo: "Os três recursos" },
    titulo: "Três setores, e uma densidade normativa que poucos acompanham.",
    intro:
      "Água, terra e energia sustentam quase toda a atividade produtiva do país. Ao redor deles formou-se, ao longo de décadas, uma estrutura de leis, concessões, outorgas, tributos e encargos que se sobrepõem em camadas. É aí que nascem os direitos patrimoniais mais relevantes, e é aí que eles somem.",
    lista: [
      {
        nome: "Água",
        imagem: {
          src: "/imagens/agua.jpg",
          alt: "Vista aérea de tanques circulares de uma estação de tratamento de água, névoa sobre a superfície ao amanhecer.",
        },
        tags: ["Saneamento", "Concessionárias", "Outorgas de captação", "Agroindústria irrigada"],
        href: "/observatorios?eixo=agua",
      },
      {
        nome: "Terra",
        imagem: {
          src: "/imagens/terra.jpg",
          alt: "Vista aérea de uma mina a céu aberto, terraços concêntricos descendo em espiral.",
        },
        tags: ["Agronegócio", "Mineração", "Produção de alimentos", "Infraestrutura e logística"],
        href: "/observatorios?eixo=terra",
      },
      {
        nome: "Energia",
        imagem: {
          src: "/imagens/energia.jpg",
          alt: "Vertedouro de usina hidrelétrica à noite, água caindo em lâminas junto a luzes industriais.",
        },
        tags: ["Geração e distribuição", "Encargos setoriais", "Indústria eletrointensiva", "Mercado livre"],
        href: "/observatorios?eixo=energia",
      },
    ],
  },

  observatorios: {
    titulo: "Oito observatórios permanentes.",
    intro:
      "Cada observatório mantém escopo declarado, agenda de pesquisa aberta e acervo próprio de notas técnicas, estudos e jurisprudência comentada. Nenhum deles se organiza por linha de serviço: organizam-se por objeto de estudo.",
    cta: { rotulo: "Ver todos os observatórios", href: "/observatorios" },
  },

  /*
    A esteira. Reaproveita o componente de revelação progressiva no scroll: cada
    linha que aparece é, literalmente, uma denúncia a mais formando o padrão. O
    efeito não foi projetado para isso e é onde funciona melhor.
  */
  esteira: {
    kicker: { rotulo: "Como o conhecimento se forma" },
    linhas: [
      "Uma comunicação isolada é um registro.",
      "Dezenas de comunicações semelhantes são um padrão.",
      "Um padrão documentado sustenta um núcleo de pesquisa.",
      "Um núcleo de pesquisa produz evidência.",
    ],
    fechamento: "Evidência é o que move instituições.",
  },

  biblioteca: {
    titulo: "O acervo é público.",
    descricao:
      "Notas técnicas, estudos, pareceres, jurisprudência comentada e linhas do tempo produzidos pelos observatórios ficam disponíveis para consulta, sem cadastro e sem restrição de acesso.",
    cta: { rotulo: "Consultar a biblioteca", href: "/biblioteca" },
  },

  /*
    As duas portas. Substitui o antigo bloco de fechamento com CTA único de
    venda. A ordem importa: o instituto primeiro, o canal depois. Denúncia é
    insumo do trabalho; autoridade técnica é o produto.
  */
  portas: {
    titulo: "Duas formas de usar o instituto.",
    lista: [
      {
        rotulo: "Consultar",
        titulo: "Conheça a produção do IDATE",
        descricao:
          "Observatórios, estudos, notas técnicas, jurisprudência comentada e linhas do tempo. Acesso livre.",
        cta: { rotulo: "Ir para os observatórios", href: "/observatorios" },
      },
      {
        rotulo: "Contribuir",
        titulo: "Comunique uma irregularidade",
        descricao:
          "Identificou uma possível ilegalidade envolvendo água, terra ou energia? Sua comunicação entra na triagem técnica do instituto.",
        cta: { rotulo: "Central Nacional de Denúncias", href: "/denuncia" },
      },
    ],
  },
} as const;
