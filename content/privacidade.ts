export interface BlocoPrivacidade {
  readonly titulo: string;
  readonly paragrafos: readonly string[];
}

export const PRIVACIDADE = {
  titulo: "Política de Privacidade e Governança de Dados",
  chamada:
    "Diretrizes de tratamento, sigilo e salvaguarda de dados pessoais sob a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).",
  atualizadoEm: "Agosto de 2026",
  blocos: [
    {
      titulo: "1. Compromisso Institucional e Escopo",
      paragrafos: [
        "O Instituto dos Direitos da Água, Terra e Energia (IDATE), como associação civil sem fins econômicos voltada à pesquisa, produção de evidências e vigilância regulatória, assume o compromisso de tratar dados pessoais com estrito respeito aos princípios da finalidade, adequação, necessidade e segurança jurídica.",
        "Esta política disciplina as diretrizes aplicáveis à navegação em nossos portais e, especialmente, ao fluxo de recepção e processamento de informações enviadas à Central Nacional de Denúncias e aos canais de contato institucional.",
      ],
    },
    {
      titulo: "2. Bases Legais de Tratamento",
      paragrafos: [
        "O tratamento de dados realizado pelo IDATE fundamenta-se nas seguintes hipóteses legais previstas no art. 7º da LGPD:",
        "a) Legítimo interesse do controlador (art. 7º, IX), voltado à promoção de estudos, produção de notas técnicas e defesa de direitos difusos e coletivos relativos à gestão da água, terra e energia;",
        "b) Cumprimento de obrigação legal ou regulatória (art. 7º, II), nos casos de guarda de registros exigidos pelo Marco Civil da Internet (Lei nº 12.965/2014);",
        "c) Consentimento expresso e inequívoco do titular (art. 7º, I), quando fornecido voluntariamente pelo usuário nos formulários de contato.",
      ],
    },
    {
      titulo: "3. Sigilo da Fonte Denunciante e Central de Denúncias",
      paragrafos: [
        "A garantia de sigilo é pilar fundamental do instituto. Nas comunicações de irregularidades encaminhadas à Central Nacional de Denúncias:",
        "I. É assegurada a prerrogativa de envio inteiramente anônimo, sem exigência de identificação do comunicante;",
        "II. Nos casos em que o comunicante opta por se identificar para acompanhamento ou juntada de esclarecimentos, sua identidade é mantida sob sigilo institucional absoluto e restrita à equipe técnica de triagem, não sendo divulgada em publicações, notas técnicas ou manifestações públicas;",
        "III. O IDATE adota medidas técnicas de segurança da informação contra acessos não autorizados e repudia qualquer ato de retaliação.",
      ],
    },
    {
      titulo: "4. Tratamento de Dados de Terceiros Citados",
      paragrafos: [
        "Comunicações de irregularidades podem conter menções a terceiros, agentes públicos ou entes corporativos.",
        "O IDATE não fabrica, não presume e não antecipa juízos de culpabilidade. Toda informação recebida passa pela triagem metodológica formal (critérios de recorrência, relevância coletiva e viabilidade documental) e é confrontada exclusivamente com bases de dados públicas oficiais (DOU, ANM, ANEEL, ANA, Tribunais e órgãos ministeriais).",
        "Dados que não guardem relação com a finalidade de pesquisa e defesa do interesse coletivo são imediatamente expurgados.",
      ],
    },
    {
      titulo: "5. Retenção e Descarte de Dados",
      paragrafos: [
        "Os dados são retidos exclusivamente pelo período necessário para a conclusão das análises técnicas do observatório pertinente ou para o cumprimento de prazos prescricionais legais.",
        "Comunicações arquivadas por ausência de viabilidade ou objeto são eliminadas de forma segura e irreversível em conformidade com as melhores práticas de higienização de dados.",
      ],
    },
    {
      titulo: "6. Direitos dos Titulares e Encarregado (DPO)",
      paragrafos: [
        "Em conformidade com o art. 18 da LGPD, qualquer titular pode requisitar a confirmação da existência de tratamento, o acesso, a retificação ou a eliminação de seus dados pessoais.",
        "Para exercer esses direitos ou esclarecer dúvidas sobre esta Política, os titulares podem entrar em contato com o Encarregado pelo Tratamento de Dados Pessoais (DPO) por meio do canal institucional de contato do IDATE.",
      ],
    },
  ],
} as const;
