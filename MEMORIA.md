# MEMÓRIA INSTITUCIONAL & DIRETRIZES DE PROJETO — IDATE

> **Documento Vivo de Memória e Aprendizado Contínuo.**
> Este documento registra as preferências do usuário, padrões de arquitetura, decisões editoriais, fluxos de trabalho e histórico de aprendizados para que todo o contexto e modo de agir sejam mantidos em todas as sessões.

---

## 1. Diretrizes Absolutas de Atuação (User Rules & Postura)

1. **Proatividade Total (Sem Pedir Permissão)**:
   - Nunca pergunte se pode fazer uma alteração, teste ou commit. Execute diretamente, valide e apresente o resultado concluído.
2. **Manutenção da Memória**:
   - Toda vez que uma nova funcionalidade for criada, uma decisão for tomada ou uma preferência for estabelecida, este documento (`MEMORIA.md`) **deve ser atualizado imediatamente**.
3. **Fluxo de Deploy Contínuo (Vercel)**:
   - Todas as alterações funcionais aprovadas devem ser testadas localmente (`vitest`), compiladas com sucesso (`next build`), commitadas e enviadas via `git push origin main` para que a Vercel atualize o ambiente de produção automaticamente.
4. **Execução no Windows (PowerShell / CMD)**:
   - Em ambiente Windows com restrições de script PowerShell, executar comandos Node/NPM/Vitest encapsulados com `cmd.exe /c` (ex: `cmd.exe /c npx vitest run` ou `cmd.exe /c npm run build`).

---

## 2. Diretrizes Editoriais e de Conteúdo (Tese IDATE)

1. **Rigor e Veracidade (Zero Fabricação de Dados)**:
   - O maior ativo do IDATE é a autoridade técnica. É terminantemente proibido criar números inventados, estudos fictícios ou conclusões sem fontes documentais.
   - Um observatório vazio é honesto; um observatório com dados inventados destrói a credibilidade institucional.
2. **Ciclo de Vida dos Observatórios**:
   - `constituicao`: Observatório com escopo e perguntas abertas definidas, aguardando publicações.
   - `ativo`: Observatório promovido assim que possuir publicações/estudos reais indexados em `content/publicacoes.ts`.
3. **Radar Regulatório Semanal (`content/radar.ts`)**:
   - Monitoramento contínuo das fontes públicas oficiais (DOU, ANM, ANEEL, ANA, STF, STJ, MPF).
   - Cada ato catalogado deve conter: órgão, data, link público oficial, resumo objetivo, empresas/estruturas citadas e vínculo explícito com a pergunta da agenda de pesquisa.
   - **Triagem Metodológica de Núcleo**: Avaliar sempre os 3 critérios de [content/metodologia.ts](file:///d:/idatev2/Idatev2-main/content/metodologia.ts):
     - *Recorrência documentada* (padrão reiterado em série temporal);
     - *Relevância coletiva* (impacto difuso sobre pessoas/empresas);
     - *Viabilidade de apuração* (fontes documentais públicas abertas).
4. **Acervo e Biblioteca (`content/publicacoes.ts`)**:
   - Publicações formais (Notas Técnicas, Estudos, Pareceres, Jurisprudência Comentada) com autoria institucional declarada, data ISO, tags e exibição na Biblioteca e na página do Observatório.

---

## 3. Padrões de Design e UI/UX

1. **Estética Premium & Visual Dark Elegante**:
   - Paleta oficial: `noite` (#0A0C10), `carvao` (#14171D), `osso` (#E9EBEF), `fumaca` (#8B93A1), `cobalto` (#1236C8) e `cobalto-claro` (#5B7CFF).
   - Uso de acabamento `liquid-glass`, bordas sutis (`border-fio`), tipografia Geist / Geist Mono.
2. **Ícones**:
   - Importar exclusivamente de `@phosphor-icons/react/dist/ssr` para compatibilidade total com SSR e Next.js Server Components.
3. **Componentes Reutilizáveis**:
   - `CabecalhoPagina`, `Container`, `Reveal`, `CTALink`, `GradeObservatorios`, `RadarRegulatorio`.

---

## 4. Histórico de Evolução & Decisões Registradas

### [10/08/2026] — Radar Regulatório e Ativação do Observatório de Recursos Minerais
* **Demanda**: Incorporação dos achados regulatórios semanais da ANM (Despachos nº 21/2026 e 24/2026 sobre segurança de barragens em MG e Notificação de R$ 11,5 bi em CFEM).
* **Solução Implementada**:
  * Criação de `content/radar.ts` estruturando dados de vigilância contínua e avaliação dos critérios de núcleo.
  * Criação do componente `components/sections/radar-regulatorio.tsx` com sinal de radar pulsante e quadro de triagem metodológica.
  * Cadastro de 3 publicações técnicas em `content/publicacoes.ts` (2 Notas Técnicas de Segurança de Barragens e 1 Estudo de CFEM).
  * Promoção do Observatório de Recursos Minerais para estado `ativo` em `content/observatorios.ts`.
  * Exibição de cards ricos na Biblioteca (`app/biblioteca/page.tsx`) e badges de radar ativo na grade de observatórios (`components/sections/grade-observatorios.tsx`).
  * Criação da suíte de testes `lib/radar.test.ts` (36 testes aprovados).
  * Build e deploy em produção na Vercel via GitHub `main`.

### [12/08/2026] — Leitura Individual do Acervo (/biblioteca/[slug]), Governança LGPD, Radar na Home e SEO Estruturado
* **Demanda**: Auditoria de melhorias críticas identificadas no site (leitura do acervo, conformidade LGPD, coerência editorial dos observatórios e SEO).
* **Solução Implementada**:
  * **Páginas de Leitura Dedicadas (`app/biblioteca/[slug]/page.tsx`)**: Leitura completa de cada nota técnica e estudo com fundamentação legal, ficha técnica, citações ABNT, links para fontes oficiais no DOU/ANM e categorização.
  * **Filtros e Cards na Biblioteca (`app/biblioteca/page.tsx`)**: Implementado filtro por tipo de documento via URL e cards clicáveis direcionando para a leitura.
  * **Destaque na Home (`components/sections/acervo-destaque.tsx` e `app/page.tsx`)**: Seção na página inicial exibindo o pulso do Radar Regulatório Semanal e as publicações recentes.
  * **Governança LGPD & Privacidade (`app/privacidade/page.tsx` e `content/privacidade.ts`)**: Política formal de privacidade cobrindo legítimo interesse, sigilo absoluto da fonte denunciante e contato do DPO, com links no rodapé e no termo de consentimento da Central de Denúncias.
  * **SEO Técnico & Schema.org**: Criação de `app/sitemap.ts`, `app/robots.ts` e inserção de JSON-LD (`NGO`) em `app/layout.tsx`.
  * **Correção Editorial na Grade de Observatórios**: Atualização do texto introdutório em `app/observatorios/page.tsx` e inclusão de badge visual de estado "Ativo" em `components/sections/grade-observatorios.tsx`.
  * **Testes Automatizados**: Criação de `lib/publicacoes.test.ts` elevando a suíte para 43 testes (100% aprovados).

### [14/08/2026] — Expansão do Acervo Técnico: ANEEL (CDE 2026), ANA (NR 13 Saneamento), STJ (TUST/TUSD) e Novo Observatório
* **Demanda**: Pesquisa autônoma e indexação de dados oficiais reais para ampliação do acervo de estudos e ativação de novos observatórios temáticos.
* **Solução Implementada**:
  * **Novo Observatório Criado (`content/observatorios.ts`)**: *Observatório da Transição Energética e Descarbonização* (`transicao-energetica`, Eixo Energia), com escopo centrado na Lei nº 14.948/2024 (Marco Legal do Hidrogênio Sustentável) e mercado regulado de carbono.
  * **Promoção de Observatórios para `ativo`**:
    * *Observatório Nacional da Energia* (`energia`);
    * *Observatório Nacional das Águas* (`aguas`);
    * *Observatório de Tarifas Públicas* (`tarifas-publicas`).
  * **Novos Estudos e Notas Técnicas Cadastrados (`content/publicacoes.ts`)**:
    * **Energia**: *Orçamento da CDE 2026 atinge R$ 52,7 bilhões: Pressão dos subsídios de GD e amortização via Uso do Bem Público* (Estudo, ANEEL/CCEE).
    * **Águas/Saneamento**: *Norma de Referência ANA nº 13/2025: Padronização da estrutura tarifária e diretrizes da Tarifa Social no Saneamento* (Nota Técnica, ANA).
    * **Tarifas Públicas**: *TUSD e TUST no ICMS: A modulação de efeitos do Tema 986 pelo STJ e a afetação do Tema 1429* (Jurisprudência Comentada, STJ/STF).
  * **Radar Regulatório Atualizado (`content/radar.ts`)**:
    * Novos monitoramentos de atos da ANEEL, ANA e STJ.
    * Inclusão de avaliações metodológicas de núcleo para os setores de Energia e Saneamento Básico.
  * **Validação Completa**:
    * Atualização da suíte de testes `lib/publicacoes.test.ts` e `lib/radar.test.ts` (43 testes 100% aprovados).
    * Compilação estática do Next.js bem-sucedida (16 rotas geradas).

