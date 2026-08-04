import { CANAL, LEMA } from "@/content/site";

/**
 * A Central Nacional de Denúncias. Herda a composição e o ritmo da home
 * original — hero cinematográfico, três cards com imagem, revelação no scroll,
 * blocos numerados — porque aquele registro fala em segunda pessoa e convoca
 * ação, que é exatamente o que um canal precisa e o que um instituto não deve
 * fazer na página de entrada.
 */
export const DENUNCIA = {
  hero: {
    kicker: { rotulo: CANAL.nome },
    titulo: ["Você identificou uma possível ilegalidade envolvendo água, terra ou energia?"],
    subtitulo:
      "Comunique ao IDATE. Sua informação entra na triagem técnica do instituto e pode originar um núcleo de pesquisa.",
    /*
      PENDENTE: imagem provisória. A Central precisa de hero próprio, distinto
      do da home — se as duas páginas abrem com a mesma fotografia e o mesmo
      ritmo, o visitante acha que clicou errado. `arquivo.jpg` foi produzida
      para /metodologia e está aqui só para não deixar imagem quebrada.
      Ver content/PENDENCIAS.md e docs/brief-imagens.md.
    */
    imagem: {
      src: "/imagens/arquivo.jpg",
      alt: "Arquivo de documentos em estantes metálicas, corredor em perspectiva sob luz baixa",
    },
    ctaPrimario: { rotulo: CANAL.acao, href: "/denuncia/nova" },
    ctaSecundario: { rotulo: "Como investigamos", href: "#etapas" },
    pilares: [
      "Comunicação anônima possível",
      "Análise por equipe técnica",
      "Sem custo",
    ],
  },

  /*
    Triagem disfarçada de seção. Os três cards com imagem herdam o componente
    dos eixos, mas aqui cada um é uma porta para o formulário já pré-classificado
    — o que reduz um campo de decisão para quem está enviando e melhora a
    qualidade da classificação na entrada.
  */
  triagem: {
    titulo: "Sobre o que você quer comunicar?",
    intro:
      "A escolha do eixo apenas encaminha sua comunicação ao observatório correspondente. Se houver dúvida, escolha o mais próximo: a classificação final é feita pela equipe técnica.",
    lista: [
      {
        eixo: "agua",
        nome: "Água",
        imagem: {
          src: "/imagens/agua.jpg",
          alt: "Estação de tratamento de água vista de cima, tanques circulares sob névoa",
        },
        exemplos: [
          "Cobrança irregular de tarifa de saneamento",
          "Outorga de captação sem base legal",
          "Contrato de concessão descumprido",
          "Contaminação de manancial",
        ],
      },
      {
        eixo: "terra",
        nome: "Terra",
        imagem: {
          src: "/imagens/terra.jpg",
          alt: "Lavra a céu aberto vista de cima, bancos escavados em espiral",
        },
        exemplos: [
          "Servidão administrativa sem indenização",
          "Lavra mineral fora da área outorgada",
          "Sobreposição de títulos dominiais",
          "Passivo ambiental não recuperado",
        ],
      },
      {
        eixo: "energia",
        nome: "Energia",
        imagem: {
          src: "/imagens/energia.jpg",
          alt: "Vertedouro de barragem à noite, água caindo em lâminas sobre o concreto",
        },
        exemplos: [
          "Encargo cobrado sem previsão normativa",
          "Erro em revisão tarifária",
          "Cláusula abusiva em contrato de energia",
          "Devolução de empréstimo compulsório",
        ],
      },
    ],
  },

  /*
    As sete etapas do brief, sem cortes. A etapa 7 é escrita com reserva
    deliberada ("quando necessário e juridicamente adequado") porque o processo
    judicial não é o produto do instituto — é uma consequência possível. Prometer
    litígio aqui converteria o canal em captação de causas.
  */
  etapas: {
    titulo: "O que acontece depois que você envia.",
    intro:
      "O percurso abaixo é o mesmo para toda comunicação recebida, independentemente do tema ou do porte de quem comunica.",
    lista: [
      {
        numero: "01",
        nome: "Recebimento",
        descricao:
          "Sua comunicação é registrada e recebe um número de protocolo. Nenhuma informação é descartada.",
      },
      {
        numero: "02",
        nome: "Triagem técnica",
        descricao:
          "A equipe verifica a consistência do relato, a documentação anexada e o enquadramento normativo aplicável.",
      },
      {
        numero: "03",
        nome: "Verificação de recorrência",
        descricao:
          "O caso é comparado ao acervo. A pergunta é se ele é isolado ou se integra um padrão já observado.",
      },
      {
        numero: "04",
        nome: "Constituição de núcleo",
        descricao:
          "Havendo recorrência e relevância coletiva, o instituto constitui um núcleo de pesquisa dedicado àquele problema.",
      },
      {
        numero: "05",
        nome: "Produção técnica",
        descricao:
          "O núcleo reúne documentos, mapeia a legislação, identifica jurisprudência e produz estudos, pareceres e notas técnicas.",
      },
      {
        numero: "06",
        nome: "Diálogo institucional",
        descricao:
          "Os resultados são levados a órgãos públicos, agências reguladoras e demais instituições competentes, com propostas de solução.",
      },
      {
        numero: "07",
        nome: "Medidas cabíveis",
        descricao:
          "Quando necessário e juridicamente adequado, a situação pode ser encaminhada para atuação administrativa ou judicial.",
      },
    ],
  },

  /*
    Gestão de expectativa. Ocupa o lugar estrutural da antiga seção de comparação
    e é a seção mais importante desta página do ponto de vista institucional: um
    canal de denúncias que não diz o que não faz produz frustração em escala, e
    frustração em escala é um problema reputacional maior do que a ausência de
    canal. Também protege o instituto de ser lido como escritório.
  */
  expectativa: {
    titulo: "O que este canal é, e o que ele não é.",
    faz: {
      rotulo: "O IDATE faz",
      itens: [
        "Registra e analisa toda comunicação recebida",
        "Classifica o caso e o encaminha ao observatório competente",
        "Verifica se há padrão que justifique um núcleo de pesquisa",
        "Publica os resultados da pesquisa em acesso aberto",
        "Dialoga com órgãos públicos e agências reguladoras",
      ],
    },
    naoFaz: {
      rotulo: "O IDATE não faz",
      itens: [
        "Não presta consultoria jurídica individual",
        "Não representa pessoas ou empresas em processos",
        "Não garante que um caso resultará em ação judicial",
        "Não cobra nem repassa valores a quem comunica",
        "Não substitui denúncia a órgãos de fiscalização e controle",
      ],
    },
    fechamento:
      "A maior parte das comunicações recebidas será registrada para fins estatísticos e de pesquisa, sem desdobramento individual. Isso não as torna irrelevantes: é o volume de registros semelhantes que revela os padrões dos quais nascem os núcleos.",
  },

  lema: {
    kicker: { rotulo: "Por que sua comunicação importa" },
    declaracao: LEMA,
  },

  fechamento: {
    titulo: "Toda grande transformação institucional começa com uma informação confiável.",
    subtitulo:
      "O formulário leva cerca de dez minutos. Quanto mais documentação você anexar, mais rápida é a triagem.",
    cta: { rotulo: CANAL.acao, href: "/denuncia/nova" },
  },
} as const;

/**
 * Conteúdo do formulário. Separado do restante porque muda por outro motivo:
 * rótulos de campo acompanham o schema de validação (lib/denuncia-schema.ts),
 * não a narrativa da página.
 */
export const FORMULARIO_DENUNCIA = {
  titulo: "Comunicar uma irregularidade",
  chamada:
    "Descreva o que você observou. Campos marcados como obrigatórios são o mínimo para que a triagem seja possível; todo o resto ajuda, mas não impede o envio.",

  /*
    PENDENTE — bloqueia a publicação desta página:
    anexo de documentos, fotografias, contratos e contas exige storage de
    arquivos, que o projeto ainda não possui, e definição de base legal, política
    de retenção e tratamento de dados de terceiros denunciados (LGPD).
    Ver content/PENDENCIAS.md.
  */
  avisoAnexos:
    "O envio de documentos, fotografias, contratos e contas será habilitado em breve. Por ora, descreva a documentação que você possui — a equipe entrará em contato para recebê-la.",

  secoes: {
    identificacao: {
      rotulo: "Identificação",
      descricao:
        "Você pode comunicar de forma anônima. Se optar por se identificar, seus dados são usados apenas para contato sobre esta comunicação.",
    },
    ocorrencia: {
      rotulo: "A ocorrência",
      descricao: "O que aconteceu, onde e quem está envolvido.",
    },
    documentacao: {
      rotulo: "Documentação",
      descricao: "O que você tem em mãos que possa comprovar o relato.",
    },
  },

  campos: {
    anonimo: "Quero comunicar de forma anônima",
    nome: "Nome completo",
    email: "E-mail",
    telefone: "Telefone com DDD",
    vinculo: "Você comunica como",
    eixo: "Tema da comunicação",
    assunto: "Assunto",
    descricao: "Descrição dos fatos",
    estado: "Estado",
    municipio: "Município",
    empresas: "Empresas envolvidas",
    orgaos: "Órgãos públicos envolvidos",
    documentos: "Documentação que você possui",
    consentimento:
      "Declaro que as informações prestadas são verdadeiras e autorizo o IDATE a tratá-las para fins de pesquisa e triagem técnica.",
  },

  ajuda: {
    descricao:
      "Relate o que observou de forma objetiva: o que ocorreu, quando começou, quem foi afetado e como você tomou conhecimento.",
    empresas:
      "Concessionárias, comercializadoras, mineradoras ou qualquer empresa envolvida. Separe por vírgula.",
    orgaos:
      "Agências reguladoras, prefeituras, secretarias ou órgãos de fiscalização já acionados, se houver.",
  },

  vinculos: [
    "Cidadão",
    "Empresa",
    "Associação ou entidade de classe",
    "Servidor público",
    "Outro",
  ],

  botao: "Enviar comunicação",
  enviando: "Enviando...",
  sucesso:
    "Comunicação recebida. A equipe técnica fará a triagem e, se você se identificou, responderá pelo contato informado.",
  anonimoSucesso:
    "Comunicação anônima recebida. Ela será registrada e analisada pela equipe técnica.",
} as const;
