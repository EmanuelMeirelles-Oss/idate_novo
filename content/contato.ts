/**
 * Contato institucional. Não é canal de denúncia: quem quer comunicar uma
 * irregularidade vai para a Central (content/denuncia.ts), que tem triagem,
 * anonimato e protocolo. Este formulário atende imprensa, pesquisadores,
 * órgãos públicos e instituições que queiram cooperação técnica.
 */
export const CONTATO = {
  titulo: "Contato institucional",
  chamada:
    "Canal para imprensa, pesquisadores, órgãos públicos e instituições interessadas em cooperação técnica. Para comunicar uma possível irregularidade, use a Central Nacional de Denúncias.",
  desvio: {
    texto: "Quer comunicar uma irregularidade envolvendo água, terra ou energia?",
    cta: { rotulo: "Ir para a Central de Denúncias", href: "/denuncia" },
  },
  campos: {
    nome: "Nome completo",
    cargo: "Cargo ou função",
    empresa: "Instituição",
    setor: "Área de interesse",
    email: "E-mail",
    telefone: "Telefone com DDD",
    mensagem: "Mensagem",
  },
  botao: "Enviar mensagem",
  enviando: "Enviando...",
  sucesso: "Mensagem recebida. O instituto responderá pelo e-mail informado.",
} as const;
