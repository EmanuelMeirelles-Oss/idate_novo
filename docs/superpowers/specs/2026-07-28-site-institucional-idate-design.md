# Site institucional IDATE — Design

**Data:** 2026-07-28
**Status:** aprovado
**Projeto:** IDATE — Instituto dos Direitos da Água, Terra e Energia

---

## 1. Contexto e problema

O IDATE é um centro de inteligência jurídica e patrimonial. Não é escritório de advocacia. Sua tese central é que empresas possuem um "patrimônio invisível" — direitos econômicos originados de leis, contratos, tributos e relações regulatórias — que permanece desconhecido, mal calculado ou não exercido por complexidade técnica.

O site precisa resolver dois problemas simultâneos:

1. **Estabelecer autoridade institucional** diante de um público que decide por confiança e rigor, não por entusiasmo.
2. **Corrigir uma leitura errada embutida no próprio nome.** "Água, Terra e Energia" lê como ONG ambiental ou pauta ESG à primeira vista. O texto do instituto deixa claro que os três elementos são *setores econômicos onde nascem direitos patrimoniais*, não uma bandeira ambiental. Se o design não comunicar "patrimônio e direito" nos primeiros segundos, o visitante classifica errado e sai.

O problema 2 é o que dita a maior parte das decisões visuais abaixo.

### Público

CFOs, controladoria, diretoria jurídica e conselhos de administração de empresas de médio e grande porte nos setores de agronegócio, indústria, mineração, infraestrutura e saneamento.

### Objetivo do site

Híbrido: autoridade institucional com um caminho de conversão claro, porém sóbrio, para empresas solicitarem análise de patrimônio jurídico. Não é landing page comercial; não é cartão de visitas passivo.

---

## 2. Design read e diais

Seguindo taste-skill §0.B:

> Site institucional de instituto de inteligência jurídico-patrimonial, para CFOs e conselhos de empresas de setores regulados, com linguagem de autoridade sóbria e conceito visual de "revelação do invisível", inclinado a trust-first premium.

**Diais (taste-skill §1):**

| Dial | Valor | Justificativa |
|---|---|---|
| `DESIGN_VARIANCE` | 5 | Puxado para baixo pelo peso institucional, mas acima do preset de setor público (3) porque é site de posicionamento, não formulário de serviço. |
| `MOTION_INTENSITY` | 4 | Movimento serve à narrativa de revelação, nunca ao espetáculo. |
| `VISUAL_DENSITY` | 3 | O respiro é parte do argumento: o instituto vende clareza sobre complexidade. |

### Anti-defaults explicitamente banidos neste projeto

Cada item abaixo é um reflexo automático que denunciaria design gerado sem intenção:

- Serifa display (Playfair, Cormorant, Fraunces, Instrument Serif) — o reflexo de "jurídico = serifa".
- Azul-marinho `#1B3A6B`-família com dourado — a paleta padrão de escritório de advocacia.
- Balança, martelo, coluna grega, aperto de mão, prédio corporativo em vidro.
- Folha, gota d'água, painel solar, turbina eólica, degradê verde — reforçariam a leitura ambiental que estamos combatendo.
- Roxo/violeta com brilho, gradiente mesh, glassmorphism genérico, três cards de feature iguais.
- Hero centralizado sobre fundo escuro com brilho.

---

## 3. Direção visual

**Base "Dossiê"** para o site inteiro, com **uma única inversão escura** na home.

A referência mental é publicação institucional técnica — relatório de banco central, parecer de órgão regulador — e não site de escritório. Grid rígido, numeração de seção em monoespaçada, fios finos, hierarquia tipográfica fazendo o trabalho pesado no lugar de ornamento.

### 3.1 Paleta

| Token | Hex | Papel |
|---|---|---|
| `paper` | `#F2F1EE` | Fundo padrão. Off-white neutro-frio. **Não é creme nem bege.** |
| `ink` | `#0F1110` | Texto primário, near-black levemente esverdeado. |
| `cobalt` | `#1236C8` | Acento único global. Kickers, fios, links, CTAs, numeração. |
| `graphite` | `#5E6260` | Texto secundário. |
| `hairline` | `rgba(15,17,16,.14)` | Bordas e réguas. |

**Inversão escura (escopo único):**

| Token | Hex | Papel |
|---|---|---|
| `void` | `#0B0E14` | Fundo da seção escura. Preto **azulado e frio**. |
| `bone` | `#E9EBEF` | Texto na inversão. |
| `amber` | `#F0B429` | Substitui o cobalto na proporção 1:1 dentro da inversão. |
| `penumbra` | `#2C3340` | Texto ainda não revelado. |

**Exceção consciente à regra de acento único.** A taste-skill §4.2 exige um acento por projeto. O âmbar é uma substituição escopada, não uma deriva: cobalto e âmbar **nunca coexistem na mesma tela**. O cobalto é ilegível sobre `#0B0E14` e clareá-lo produziria o brilho azul de IA que a própria skill bane. O breu é azulado e frio de propósito — sobre um preto marrom, o âmbar leria como ouro de escritório; sobre um preto azul, lê como luz revelando.

**Trava de consistência:** nenhum outro acento entra no projeto. Estados de erro e sucesso do formulário usam tinta e cobalto com peso e ícone, não verde e vermelho.

### 3.2 Tipografia

**Geist** (display e corpo) e **Geist Mono** (numeração de seção, kickers, rótulos), ambas via `next/font/google`.

Geist é sans display. A escolha é deliberada contra o reflexo da serifa: o instituto se define por rigor técnico e conhecimento contemporâneo, não por herança e tradição. Serifa comunicaria a segunda coisa.

- **Display:** `text-4xl md:text-6xl lg:text-7xl tracking-tighter leading-[1.05]`, peso 700.
- **Corpo:** `text-base leading-relaxed max-w-[65ch]`, cor `graphite`.
- **Kicker / numeração:** Geist Mono, `text-xs tracking-[0.14em] uppercase`, cor `cobalt`.
- **Ênfase em headline:** itálico ou peso da *mesma* família. Nunca injetar serifa numa headline sans.

### 3.3 Layout e movimento

- Container `max-w-[1400px] mx-auto`, gutters generosos.
- CSS Grid para toda composição multi-coluna. Nunca aritmética de porcentagem em flex.
- Viés anti-centro: heros e aberturas de seção alinhados à esquerda ou em split assimétrico.
- `min-h-[100dvh]` em qualquer seção de altura total. Nunca `h-screen`.
- Movimento via `motion/react`. Revelação por scroll com `useScroll` / `useTransform`. **Nunca `useState` para valor contínuo.**
- Todo componente com movimento é folha isolada com `'use client'`.
- `prefers-reduced-motion: reduce` desliga translação e revelação progressiva, preservando o conteúdo integralmente legível.

### 3.4 Ícones

`@phosphor-icons/react`, `strokeWidth` padronizado em 1.5, uma família só. Uso mínimo — estética de dossiê vive de fios, números e espaço, não de ícone decorativo.

### 3.5 Marca

**Aprovada em 2026-07-28.** Monograma de entrelace: um "I" central servindo de espinha, cercado por interlace angular em simetria bilateral, dentro de silhueta octogonal. Cobalto sólido. Lê como selo institucional; o entrelace remete à complexidade tecida do sistema normativo.

Como o site é severo e quase sem ornamento, a marca funciona como **único objeto ornamental de um sistema austero** — o contraste é intencional e trabalha a favor.

#### Sistema de dois níveis (obrigatório)

A marca completa tem mais de doze traços distintos, cada um em torno de 4–5% da largura total. A 32px isso vira traço e vão de ~1,5px; a 16px, menos de um pixel. Abaixo desse limite o antialiasing funde tudo. Portanto:

| Nível | Uso | Construção |
|---|---|---|
| **Completa** | Timbrado, capa de parecer, relevo seco, cabeçalho do site, aplicações ≥ 64px | Entrelace integral |
| **Reduzida** | Favicon, avatar de rede social, rodapé, aplicações < 64px | Preserva o I central e a silhueta octogonal; descarta o miolo do entrelace |

Trocar de nível por tamanho é uso correto, não enfraquecimento.

#### Pendências de arte-final

O material aprovado é PNG gerado por modelo de imagem e **não é usável em produção**. Antes de entrar no site:

1. Redesenhar como SVG vetorial exato.
2. Uniformizar espessura entre segmentos — variam no original.
3. Padronizar tratamento de canto — o original mistura chanfro e canto reto.
4. Estabelecer lógica consistente de sobreposição no entrelace (regra fixa de passa-por-cima / passa-por-baixo).
5. Derivar a versão reduzida.
6. Gerar a família: símbolo isolado, lockup horizontal, lockup vertical, uma cor, invertido, favicon 16/32/180.

#### Wordmark

"IDATE" em Geist peso 800, `tracking-tight`, com "Instituto dos Direitos da Água, Terra e Energia" em Geist Mono menor. Composto em tipografia viva no site, não embutido no SVG — mantém nitidez, acessibilidade e editabilidade. Versão com texto convertido em curvas fica como pendência para uso fora da web.

---

## 4. Arquitetura de informação

### 4.1 Home (`/`)

Narrativa que faz o argumento inteiro em escala reduzida.

| # | Seção | Conteúdo |
|---|---|---|
| 01 | Hero | "Existe um patrimônio que não aparece no balanço." Sub extraído da abertura do texto-fonte. CTA primário "Solicitar análise", secundário "Conhecer o instituto". |
| 02 | Tangível × Jurídico | Duas colunas confrontadas: *o que o inventário registra* (instalações, equipamentos, capital, mercadorias, veículos) contra *o que ele não registra* (leis, contratos, tributos, relações regulatórias, alterações legislativas, decisões dos tribunais superiores). Layout derivado diretamente da estrutura do texto-fonte. |
| 03 | **Patrimônio Invisível** — inversão escura | Linhas emergem da penumbra conforme o scroll: "não ocupa espaço físico / não pode ser armazenado / não aparece em máquinas, imóveis ou estoques / mas possui valor econômico real". Fecha em âmbar: "Esse patrimônio é formado por direitos." |
| 04 | Três eixos | Água, Terra e Energia com os setores de cada um. Enquadrados como *setores onde nascem direitos*, jamais como pauta ambiental. |
| 05 | A tese | Declaração em display: "Nem toda riqueza é criada. Grande parte dela apenas deixa de ser perdida." Seguida do parágrafo sobre recuperar em vez de criar patrimônio. |
| 06 | Como o instituto trabalha | Os quatro verbos do próprio texto-fonte: identificar, proteger, preservar, recuperar. Link para Metodologia. |
| 07 | CTA de fechamento | Convite sóbrio para análise. |

Todo CTA primário do site aponta para `/contato`. Não há modal, não há formulário embutido fora da página de contato — um destino único mantém a mensuração simples e o site honesto sobre o que está pedindo.

### 4.2 O Instituto (`/instituto`)

A origem da ideia, a filosofia, o conhecimento como patrimônio, a natureza multidisciplinar (Direito, Economia, Regulação, História Legislativa, Jurisprudência, Análise Patrimonial), missão, visão e os sete valores.

### 4.3 Áreas de Atuação (`/atuacao`)

Por que água, terra e energia. Um bloco por eixo, com os setores atendidos. **Sem teses tributárias nomeadas e sem percentuais de recuperação** — isso exigiria dado que não temos e criaria exposição desnecessária.

### 4.4 Metodologia (`/metodologia`)

A complexidade do sistema normativo brasileiro como causa da perda patrimonial. Como o instituto acompanha alteração legislativa, mudança jurisprudencial, repercussão geral, recurso repetitivo e norma de agência reguladora. Os quatro verbos desdobrados.

### 4.5 Contato (`/contato`)

Formulário de solicitação de análise: nome, cargo, empresa, setor, porte, e-mail, telefone, mensagem. Dados institucionais de contato como placeholder marcado.

---

## 5. Política de conteúdo

O instituto vende rigor técnico. Dado falso na home é risco maior que benefício — se alguém verificar e não bater, o dano à credibilidade é desproporcional.

**Proibido neste projeto:**

- Valores recuperados, número de clientes, anos de atuação, qualquer métrica não fornecida.
- Depoimentos, cases, logos de empresas atendidas.
- Nomes, cargos, biografias ou fotos de equipe.
- Selos, certificações, prêmios, filiações.
- Endereço, CNPJ, telefone ou e-mail inventados.

Todo item ausente vira entrada em `content/PENDENCIAS.md`, com o que exatamente precisa ser fornecido e onde entra no site. Placeholders visíveis na interface são marcados de forma que ninguém publique por engano.

Toda a copy da interface é derivada do texto institucional fornecido pelo cliente. Onde o texto-fonte não cobre algo, ou se escreve conectivo neutro, ou vira pendência.

---

## 6. Stack e estrutura

### 6.1 Stack

- **Next.js 16**, App Router, Server Components por padrão, TypeScript strict. (A spec foi escrita supondo Next 15; `create-next-app@latest` instalou 16.2.12 e a decisão foi seguir com 16 — nenhuma breaking change relevante afeta este projeto.)
- **Tailwind v4** via `@tailwindcss/postcss`. Tokens da paleta declarados em `@theme`.
- **motion** (`import { motion } from "motion/react"`).
- **next/font/google** para Geist e Geist Mono. Nunca `<link>` para Google Fonts.
- **@phosphor-icons/react**.
- Deploy alvo: Vercel.

### 6.2 Estrutura de arquivos

```
D:\Idate\
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    ← Home
│   ├── globals.css                 ← @theme com os tokens
│   ├── instituto/page.tsx
│   ├── atuacao/page.tsx
│   ├── metodologia/page.tsx
│   ├── contato/page.tsx
│   └── api/contato/route.ts
├── components/
│   ├── layout/                     Header, Footer, Container, Logotipo
│   ├── sections/                   uma seção por arquivo
│   └── ui/                         SectionNumber, Rule, CTALink, Reveal
├── content/
│   ├── home.ts, instituto.ts, atuacao.ts, metodologia.ts, contato.ts
│   ├── site.ts                     nav, metadados, dados institucionais
│   └── PENDENCIAS.md
├── lib/
└── docs/superpowers/specs/
```

**Copy centralizada em `content/`.** Separar texto de componente permite revisar toda a copy de uma vez e editar sem abrir `.tsx`. Cada arquivo exporta objetos tipados que a seção correspondente consome.

**Uma seção por arquivo em `components/sections/`.** Arquivos focados são mais fáceis de editar com confiança e de revisar isoladamente.

### 6.3 Formulário de contato

`POST /api/contato` → route handler com validação de schema no servidor, provedor de envio plugável, saindo com Resend por variável de ambiente.

**Sem `RESEND_API_KEY` configurada, a rota retorna erro explícito e a interface mostra falha real.** Nunca fingir sucesso — um formulário que engole submissão silenciosamente perde negócio sem deixar rastro.

Honeypot anti-spam. Sem CAPTCHA.

---

## 7. Acessibilidade e verificação

**Critérios de aceite antes de declarar concluído:**

1. Contraste WCAG AA verificado em cada par de cor efetivamente usado, nas duas superfícies (papel e breu).
2. Navegação completa por teclado, foco visível em todo elemento interativo.
3. `prefers-reduced-motion: reduce` desliga movimento sem esconder conteúdo.
4. Console do navegador limpo, sem erro nem aviso de hidratação.
5. Layout íntegro em 375px, 768px e 1440px. Nenhuma rolagem horizontal.
6. Metadados por página: `title`, `description`, Open Graph.
7. Semântica: um `h1` por página, hierarquia de heading sem salto, landmarks corretos.

Verificação executada no painel de navegador com o dev server rodando, incluindo leitura de console e screenshot do resultado real.

---

## 8. Fora de escopo

- Identidade de marca completa (logo desenhado, manual de marca).
- CMS ou área administrativa.
- Blog / seção de artigos — descartada nesta fase por exigir produção contínua de conteúdo.
- Versão em outro idioma.
- Analytics e pixel de rastreamento.
- Área de cliente ou login.
- **Deploy em produção e registro de domínio.** O projeto é entregue rodando localmente e pronto para Vercel, mas publicar exige conta, domínio e decisão do cliente — passo separado, feito por Emanuel quando o conteúdo pendente estiver resolvido.
