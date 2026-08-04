# Site Institucional IDATE — Plano de Implementação

> **Para trabalhadores agênticos:** SUB-SKILL OBRIGATÓRIA: use `superpowers:subagent-driven-development` (recomendado) ou `superpowers:executing-plans` para implementar tarefa por tarefa. Os passos usam checkbox (`- [ ]`) para rastreio.

**Objetivo:** Construir o site institucional de cinco páginas do IDATE, com direção visual "Dossiê", seção escura de revelação por scroll na home, e formulário de solicitação de análise.

**Arquitetura:** Next.js 16 App Router com Server Components por padrão. Toda copy vive em `content/` como objetos TypeScript tipados, separada dos componentes, para permitir revisão e edição sem tocar em `.tsx`. Componentes com movimento são folhas isoladas `'use client'`. O formulário posta numa route handler com provedor de envio plugável que falha de forma explícita quando não configurado.

**Stack:** Next.js 16, TypeScript strict, Tailwind v4, motion (`motion/react`), Zod v4, Resend, Vitest + Testing Library.

> **Nota de versão (registrada em 2026-07-28, após a Task 1):** o plano foi escrito supondo Next.js 15, mas `create-next-app@latest` instalou Next.js 16.2.12. Decisão: seguir com 16. As duas breaking changes relevantes foram avaliadas — a remoção do acesso síncrono a `params`/`searchParams`/`cookies`/`headers` não nos afeta porque nenhuma página do projeto usa essas APIs, e a mudança de `scroll-behavior` está tratada na Task 4 com o atributo `data-scroll-behavior`.

**Spec:** `docs/superpowers/specs/2026-07-28-site-institucional-idate-design.md`

**Diretório de trabalho:** `D:\Idate`

---

## Estrutura de arquivos

| Arquivo | Responsabilidade |
|---|---|
| `app/layout.tsx` | Shell HTML, fontes, metadados base, Header e Footer |
| `app/page.tsx` | Home — compõe as sete seções |
| `app/globals.css` | Tokens de design via `@theme` do Tailwind v4 |
| `app/instituto/page.tsx` | Página O Instituto |
| `app/atuacao/page.tsx` | Página Áreas de Atuação |
| `app/metodologia/page.tsx` | Página Metodologia |
| `app/contato/page.tsx` | Página Contato |
| `app/api/contato/route.ts` | Recebe, valida e despacha a solicitação |
| `lib/contraste.ts` | Cálculo de razão de contraste WCAG |
| `lib/contato-schema.ts` | Schema Zod compartilhado entre cliente e servidor |
| `lib/enviar-solicitacao.ts` | Provedor de envio (Resend) |
| `content/*.ts` | Copy de cada página, tipada |
| `content/site.ts` | Navegação, metadados, dados institucionais |
| `content/PENDENCIAS.md` | O que falta o cliente fornecer |
| `components/layout/*` | Header, Footer, Container, Marca |
| `components/ui/*` | SectionNumber, Regua, CTALink, Reveal |
| `components/sections/*` | Uma seção da home por arquivo |

**Princípio:** cada arquivo tem uma responsabilidade. Seções da home não compartilham arquivo — elas mudam por motivos diferentes.

---

## Task 1: Scaffold do projeto

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`

- [ ] **Step 1: Criar o projeto Next.js**

Rodar em `D:\Idate`. O diretório já contém `docs/`, `brand/` e `.git`, então o scaffold é feito no diretório atual:

```bash
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*" --eslint --turbopack --skip-install
```

Se o instalador reclamar de diretório não vazio, confirme prosseguir — ele preserva `docs/`, `brand/` e `.git`.

- [ ] **Step 2: Instalar dependências**

```bash
npm install motion zod resend @phosphor-icons/react
```

- [ ] **Step 3: Verificar que o servidor sobe**

```bash
npm run dev
```

Esperado: `Ready in ...` e `http://localhost:3000` respondendo. Encerrar com Ctrl+C.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 15 com Tailwind v4"
```

---

## Task 2: Infraestrutura de testes

**Files:**
- Create: `vitest.config.ts`, `vitest.setup.ts`, `lib/contraste.test.ts`
- Modify: `package.json`

- [ ] **Step 1: Instalar dependências de teste**

```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 2: Criar `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./") },
  },
});
```

- [ ] **Step 3: Criar `vitest.setup.ts`**

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 4: Adicionar o script de teste em `package.json`**

Dentro de `"scripts"`, acrescentar:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 5: Escrever o teste que falha**

Criar `lib/contraste.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { contrastRatio } from "./contraste";

describe("contrastRatio", () => {
  it("retorna 21 para preto contra branco", () => {
    expect(contrastRatio("#000000", "#FFFFFF")).toBeCloseTo(21, 1);
  });

  it("retorna 1 para uma cor contra ela mesma", () => {
    expect(contrastRatio("#1236C8", "#1236C8")).toBeCloseTo(1, 5);
  });

  it("é simétrico", () => {
    expect(contrastRatio("#F2F1EE", "#0F1110")).toBeCloseTo(
      contrastRatio("#0F1110", "#F2F1EE"),
      5,
    );
  });

  it("rejeita hex inválido", () => {
    expect(() => contrastRatio("#GGG", "#FFFFFF")).toThrow();
  });
});
```

- [ ] **Step 6: Rodar o teste e confirmar que falha**

```bash
npm test
```

Esperado: FAIL — `Failed to resolve import "./contraste"`.

- [ ] **Step 7: Implementar `lib/contraste.ts`**

```ts
type RGB = [number, number, number];

function hexParaRgb(hex: string): RGB {
  const limpo = hex.replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(limpo)) {
    throw new Error(`Hex inválido: ${hex}`);
  }
  return [
    parseInt(limpo.slice(0, 2), 16),
    parseInt(limpo.slice(2, 4), 16),
    parseInt(limpo.slice(4, 6), 16),
  ];
}

function luminanciaCanal(valor: number): number {
  const s = valor / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

export function luminanciaRelativa(hex: string): number {
  const [r, g, b] = hexParaRgb(hex);
  return (
    0.2126 * luminanciaCanal(r) +
    0.7152 * luminanciaCanal(g) +
    0.0722 * luminanciaCanal(b)
  );
}

export function contrastRatio(a: string, b: string): number {
  const la = luminanciaRelativa(a);
  const lb = luminanciaRelativa(b);
  const claro = Math.max(la, lb);
  const escuro = Math.min(la, lb);
  return (claro + 0.05) / (escuro + 0.05);
}
```

- [ ] **Step 8: Rodar o teste e confirmar que passa**

```bash
npm test
```

Esperado: PASS, 4 testes.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "test: infraestrutura Vitest e utilitário de contraste WCAG"
```

---

## Task 3: Tokens de design e guarda de contraste

**Files:**
- Create: `lib/paleta.ts`, `lib/paleta.test.ts`
- Modify: `app/globals.css`

- [ ] **Step 1: Escrever o teste que falha**

Criar `lib/paleta.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { contrastRatio } from "./contraste";
import { PALETA } from "./paleta";

describe("paleta — conformidade WCAG AA", () => {
  it("tinta sobre papel atinge AAA para corpo de texto", () => {
    expect(contrastRatio(PALETA.ink, PALETA.paper)).toBeGreaterThanOrEqual(7);
  });

  it("cobalto sobre papel atinge AA para corpo de texto", () => {
    expect(contrastRatio(PALETA.cobalt, PALETA.paper)).toBeGreaterThanOrEqual(4.5);
  });

  it("grafite sobre papel atinge AA para corpo de texto", () => {
    expect(contrastRatio(PALETA.graphite, PALETA.paper)).toBeGreaterThanOrEqual(4.5);
  });

  it("osso sobre breu atinge AAA para corpo de texto", () => {
    expect(contrastRatio(PALETA.bone, PALETA.void)).toBeGreaterThanOrEqual(7);
  });

  it("âmbar sobre breu atinge AA para corpo de texto", () => {
    expect(contrastRatio(PALETA.amber, PALETA.void)).toBeGreaterThanOrEqual(4.5);
  });
});
```

- [ ] **Step 2: Rodar e confirmar que falha**

```bash
npm test
```

Esperado: FAIL — `Failed to resolve import "./paleta"`.

- [ ] **Step 3: Implementar `lib/paleta.ts`**

```ts
/**
 * Fonte única da paleta. Os mesmos valores são declarados em app/globals.css
 * como tokens do Tailwind; este módulo existe para que os testes de contraste
 * verifiquem os valores reais em vez de cópias.
 *
 * `penumbra` é deliberadamente de baixo contraste — é o estado "ainda não
 * revelado" da seção escura, decorativo e nunca portador de conteúdo. Sob
 * prefers-reduced-motion o texto é renderizado direto em `bone`.
 */
export const PALETA = {
  paper: "#F2F1EE",
  ink: "#0F1110",
  cobalt: "#1236C8",
  graphite: "#5E6260",
  void: "#0B0E14",
  bone: "#E9EBEF",
  amber: "#F0B429",
  penumbra: "#2C3340",
} as const;

export type NomeCor = keyof typeof PALETA;
```

- [ ] **Step 4: Rodar e confirmar que passa**

```bash
npm test
```

Esperado: PASS, 9 testes no total.

- [ ] **Step 5: Substituir `app/globals.css` inteiro**

```css
@import "tailwindcss";

@theme {
  --color-paper: #f2f1ee;
  --color-ink: #0f1110;
  --color-cobalt: #1236c8;
  --color-graphite: #5e6260;
  --color-void: #0b0e14;
  --color-bone: #e9ebef;
  --color-amber: #f0b429;
  --color-penumbra: #2c3340;
  --color-hairline: rgba(15, 17, 16, 0.14);
  --color-hairline-invertida: rgba(233, 235, 239, 0.14);

  --font-sans: var(--fonte-geist), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--fonte-geist-mono), ui-monospace, monospace;
}

html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

body {
  background-color: var(--color-paper);
  color: var(--color-ink);
  -webkit-font-smoothing: antialiased;
}

::selection {
  background-color: var(--color-cobalt);
  color: var(--color-paper);
}

:focus-visible {
  outline: 2px solid var(--color-cobalt);
  outline-offset: 3px;
}
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: tokens de design com teste de conformidade WCAG"
```

---

## Task 4: Fontes e layout raiz

**Files:**
- Modify: `app/layout.tsx`
- Create: `content/site.ts`

- [ ] **Step 1: Criar `content/site.ts`**

```ts
export const SITE = {
  nome: "IDATE",
  nomeCompleto: "Instituto dos Direitos da Água, Terra e Energia",
  descricao:
    "Centro de inteligência jurídica e patrimonial. Identificamos, protegemos e recuperamos direitos econômicos que empresas possuem e desconhecem.",
  url: "https://idate.org.br",
} as const;

export const NAVEGACAO = [
  { rotulo: "O Instituto", href: "/instituto" },
  { rotulo: "Áreas de Atuação", href: "/atuacao" },
  { rotulo: "Metodologia", href: "/metodologia" },
  { rotulo: "Contato", href: "/contato" },
] as const;

/**
 * PENDENTE — o cliente ainda não forneceu dados institucionais.
 * Ver content/PENDENCIAS.md. Não publicar com estes valores.
 */
export const INSTITUCIONAL = {
  email: null as string | null,
  telefone: null as string | null,
  endereco: null as string | null,
  cnpj: null as string | null,
} as const;
```

- [ ] **Step 2: Substituir `app/layout.tsx` inteiro**

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SITE } from "@/content/site";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--fonte-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--fonte-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.nome} — ${SITE.nomeCompleto}`,
    template: `%s — ${SITE.nome}`,
  },
  description: SITE.descricao,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: SITE.nome,
    title: `${SITE.nome} — ${SITE.nomeCompleto}`,
    description: SITE.descricao,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${geist.variable} ${geistMono.variable}`}
    >
      <body className="font-sans">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-cobalt focus:px-4 focus:py-2 focus:text-paper"
        >
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: fontes Geist, metadados e layout raiz"
```

Nota: o build vai falhar até Task 6 criar Header e Footer. Isso é esperado.

Nota sobre `data-scroll-behavior="smooth"`: até o Next 15, o framework anulava temporariamente o `scroll-behavior: smooth` do CSS durante troca de rota, para a navegação ir direto ao topo. O Next 16 deixou de fazer isso por padrão. Sem esse atributo, cada clique no menu produziria uma rolagem suave até o topo — o site pareceria lento. O atributo restaura o comportamento anterior sem abrir mão do scroll suave em âncoras internas.

---

## Task 5: Primitivas de UI

**Files:**
- Create: `components/ui/container.tsx`, `components/ui/numero-secao.tsx`, `components/ui/regua.tsx`, `components/ui/cta-link.tsx`, `components/ui/reveal.tsx`

- [ ] **Step 1: Criar `components/ui/container.tsx`**

```tsx
import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1400px] px-6 md:px-10 lg:px-16 ${className}`}>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Criar `components/ui/numero-secao.tsx`**

```tsx
export function NumeroSecao({
  numero,
  rotulo,
  invertido = false,
}: {
  numero: string;
  rotulo: string;
  invertido?: boolean;
}) {
  const cor = invertido ? "text-amber" : "text-cobalt";
  return (
    <p className={`font-mono text-xs uppercase tracking-[0.14em] ${cor}`}>
      {numero} — {rotulo}
    </p>
  );
}
```

- [ ] **Step 3: Criar `components/ui/regua.tsx`**

```tsx
export function Regua({ invertida = false }: { invertida?: boolean }) {
  const cor = invertida ? "bg-amber" : "bg-cobalt";
  return <div className={`h-[2px] w-14 ${cor}`} aria-hidden="true" />;
}
```

- [ ] **Step 4: Criar `components/ui/cta-link.tsx`**

```tsx
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export function CTALink({
  href,
  children,
  variante = "primario",
}: {
  href: string;
  children: React.ReactNode;
  variante?: "primario" | "secundario";
}) {
  if (variante === "primario") {
    return (
      <Link
        href={href}
        className="inline-flex items-center gap-2 bg-cobalt px-6 py-3.5 text-sm font-semibold text-paper transition-opacity hover:opacity-90"
      >
        {children}
        <ArrowRight size={16} weight="bold" aria-hidden="true" />
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 border-b border-cobalt pb-1 text-sm font-semibold text-cobalt transition-opacity hover:opacity-70"
    >
      {children}
      <ArrowRight size={14} weight="bold" aria-hidden="true" />
    </Link>
  );
}
```

- [ ] **Step 5: Criar `components/ui/reveal.tsx`**

```tsx
"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function Reveal({
  children,
  atraso = 0,
}: {
  children: ReactNode;
  atraso?: number;
}) {
  const movimentoReduzido = useReducedMotion();

  if (movimentoReduzido) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: atraso, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: primitivas de UI (Container, NumeroSecao, Regua, CTALink, Reveal)"
```

---

## Task 6: Marca, Header e Footer

**Files:**
- Create: `components/layout/marca.tsx`, `components/layout/header.tsx`, `components/layout/footer.tsx`

- [ ] **Step 1: Criar `components/layout/marca.tsx`**

O SVG do entrelace ainda não foi vetorizado (ver spec §3.5, pendências de arte-final). Até lá, o componente renderiza o wordmark tipográfico e reserva o espaço do símbolo.

```tsx
import Link from "next/link";

/**
 * PENDENTE — o símbolo do entrelace ainda não foi vetorizado.
 * Ver spec §3.5. Quando o SVG existir, ele entra aqui como <SimboloCompleto />
 * em aplicações ≥64px e <SimboloReduzido /> abaixo disso.
 */
export function Marca({ invertida = false }: { invertida?: boolean }) {
  const corPrincipal = invertida ? "text-bone" : "text-ink";
  const corSecundaria = invertida ? "text-penumbra" : "text-graphite";

  return (
    <Link href="/" className="inline-block" aria-label="IDATE — página inicial">
      <span className={`block text-xl font-extrabold tracking-tight ${corPrincipal}`}>
        IDATE
      </span>
      <span
        className={`mt-1 block max-w-[18ch] font-mono text-[0.5rem] leading-relaxed tracking-[0.11em] ${corSecundaria}`}
      >
        INSTITUTO DOS DIREITOS DA ÁGUA, TERRA E ENERGIA
      </span>
    </Link>
  );
}
```

- [ ] **Step 2: Criar `components/layout/header.tsx`**

```tsx
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Marca } from "./marca";
import { NAVEGACAO } from "@/content/site";

export function Header() {
  return (
    <header className="border-b border-hairline">
      <Container className="flex items-center justify-between py-6">
        <Marca />
        <nav aria-label="Navegação principal">
          <ul className="flex items-center gap-6 md:gap-8">
            {NAVEGACAO.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-graphite transition-colors hover:text-cobalt"
                >
                  {item.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
```

- [ ] **Step 3: Criar `components/layout/footer.tsx`**

```tsx
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Marca } from "./marca";
import { NAVEGACAO, INSTITUCIONAL, SITE } from "@/content/site";

export function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="mt-32 border-t border-hairline py-16">
      <Container className="grid gap-12 md:grid-cols-2">
        <Marca />

        <div className="grid gap-10 sm:grid-cols-2">
          <nav aria-label="Navegação do rodapé">
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-cobalt">
              Navegação
            </p>
            <ul className="mt-4 space-y-2">
              {NAVEGACAO.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-graphite transition-colors hover:text-cobalt"
                  >
                    {item.rotulo}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-cobalt">
              Contato
            </p>
            <ul className="mt-4 space-y-2 text-sm text-graphite">
              {INSTITUCIONAL.email ? (
                <li>{INSTITUCIONAL.email}</li>
              ) : (
                <li className="italic">E-mail institucional a definir</li>
              )}
              {INSTITUCIONAL.telefone ? (
                <li>{INSTITUCIONAL.telefone}</li>
              ) : (
                <li className="italic">Telefone a definir</li>
              )}
              {INSTITUCIONAL.endereco ? (
                <li>{INSTITUCIONAL.endereco}</li>
              ) : (
                <li className="italic">Endereço a definir</li>
              )}
            </ul>
          </div>
        </div>
      </Container>

      <Container className="mt-16 border-t border-hairline pt-8">
        <p className="font-mono text-[0.625rem] tracking-[0.1em] text-graphite">
          © {ano} {SITE.nomeCompleto.toUpperCase()}
        </p>
      </Container>
    </footer>
  );
}
```

- [ ] **Step 4: Verificar que o build passa**

```bash
npm run build
```

Esperado: build concluído sem erro de módulo não encontrado.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: Marca, Header e Footer"
```

---

## Task 7: Copy da home

**Files:**
- Create: `content/home.ts`

- [ ] **Step 1: Criar `content/home.ts`**

Toda a copy derivada do texto institucional fornecido pelo cliente.

```ts
export const HOME = {
  hero: {
    kicker: { numero: "01", rotulo: "Patrimônio Jurídico" },
    titulo: "Existe um patrimônio que não aparece no balanço.",
    subtitulo:
      "Ao longo de sua existência, toda empresa estabelece relações jurídicas com o Estado, com concessionárias de serviços públicos e com agentes reguladores. Essas relações produzem direitos patrimoniais que frequentemente permanecem desconhecidos, são calculados incorretamente ou deixam de ser exercidos por absoluta complexidade técnica.",
    ctaPrimario: { rotulo: "Solicitar análise", href: "/contato" },
    ctaSecundario: { rotulo: "Conhecer o instituto", href: "/instituto" },
  },

  comparacao: {
    kicker: { numero: "02", rotulo: "O que o inventário alcança" },
    titulo: "Dois patrimônios. Um deles é fácil de contar.",
    tangivel: {
      rotulo: "O que o balanço registra",
      itens: ["Instalações", "Equipamentos", "Capital", "Mercadorias", "Veículos"],
    },
    juridico: {
      rotulo: "O que ele não registra",
      itens: [
        "Leis",
        "Contratos",
        "Tributos",
        "Relações regulatórias",
        "Alterações legislativas",
        "Decisões dos tribunais superiores",
      ],
    },
    fechamento:
      "Esse patrimônio não desaparece porque deixou de ser observado. Muitas vezes permanece existente durante décadas. O que desaparece é o conhecimento sobre sua existência.",
  },

  invisivel: {
    kicker: { numero: "03", rotulo: "O que não se vê" },
    linhas: [
      "Não ocupa espaço físico.",
      "Não pode ser armazenado em depósitos.",
      "Não aparece em máquinas, imóveis ou estoques.",
      "Mas possui valor econômico real.",
    ],
    fechamento: "Esse patrimônio é formado por direitos.",
  },

  eixos: {
    kicker: { numero: "04", rotulo: "Onde nascem os direitos" },
    titulo: "Água, terra e energia sustentam a atividade produtiva nacional.",
    intro:
      "Ao redor desses três elementos formou-se, ao longo das últimas décadas, uma estrutura normativa composta por leis, contratos, concessões, tributos, encargos e obrigações específicas. É nesse ambiente que surgem alguns dos mais relevantes direitos patrimoniais das empresas brasileiras.",
    lista: [
      {
        nome: "Água",
        setores: ["Saneamento", "Concessões", "Outorgas", "Indústria"],
      },
      {
        nome: "Terra",
        setores: ["Agronegócio", "Mineração", "Produção de alimentos", "Infraestrutura"],
      },
      {
        nome: "Energia",
        setores: ["Geração", "Distribuição", "Encargos setoriais", "Indústria intensiva"],
      },
    ],
  },

  tese: {
    kicker: { numero: "05", rotulo: "A razão de existir" },
    declaracao:
      "Nem toda riqueza é criada. Grande parte dela apenas deixa de ser perdida.",
    desenvolvimento:
      "Quando um direito é corretamente identificado, preservado e exercido, não se cria um patrimônio novo. Recupera-se um patrimônio que já existia.",
  },

  trabalho: {
    kicker: { numero: "06", rotulo: "Como o instituto trabalha" },
    titulo: "Quatro movimentos sobre o mesmo patrimônio.",
    verbos: [
      {
        nome: "Identificar",
        descricao:
          "Reconhecer, na história jurídica da empresa, os direitos econômicos que permanecem ocultos sob a complexidade normativa.",
      },
      {
        nome: "Proteger",
        descricao:
          "Impedir que o direito reconhecido se perca por decurso de prazo, cálculo incorreto ou desatenção a mudanças de entendimento.",
      },
      {
        nome: "Preservar",
        descricao:
          "Acompanhar de forma contínua as alterações legislativas e jurisprudenciais que afetam o direito ao longo do tempo.",
      },
      {
        nome: "Recuperar",
        descricao:
          "Exercer o direito de forma técnica, segura e fundamentada, devolvendo ao patrimônio da empresa aquilo que já lhe pertencia.",
      },
    ],
    cta: { rotulo: "Ver a metodologia", href: "/metodologia" },
  },

  fechamento: {
    titulo: "Todo direito economicamente relevante deve ser conhecido antes de ser exercido.",
    subtitulo:
      "Não existe proteção sem conhecimento. Não existe recuperação sem identificação.",
    cta: { rotulo: "Solicitar análise", href: "/contato" },
  },
} as const;
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "content: copy da home derivada do texto institucional"
```

---

## Task 8: Seção Hero

**Files:**
- Create: `components/sections/hero.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Criar `components/sections/hero.tsx`**

```tsx
import { Container } from "@/components/ui/container";
import { NumeroSecao } from "@/components/ui/numero-secao";
import { CTALink } from "@/components/ui/cta-link";
import { HOME } from "@/content/home";

export function Hero() {
  const { kicker, titulo, subtitulo, ctaPrimario, ctaSecundario } = HOME.hero;

  return (
    <section className="border-b border-hairline py-24 md:py-32 lg:py-40">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <NumeroSecao numero={kicker.numero} rotulo={kicker.rotulo} />
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tighter md:text-6xl lg:text-7xl">
              {titulo}
            </h1>
          </div>

          <div className="flex flex-col justify-end lg:col-span-5">
            <p className="max-w-[52ch] text-base leading-relaxed text-graphite">
              {subtitulo}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <CTALink href={ctaPrimario.href}>{ctaPrimario.rotulo}</CTALink>
              <CTALink href={ctaSecundario.href} variante="secundario">
                {ctaSecundario.rotulo}
              </CTALink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Substituir `app/page.tsx` inteiro**

```tsx
import { Hero } from "@/components/sections/hero";

export default function Home() {
  return (
    <>
      <Hero />
    </>
  );
}
```

- [ ] **Step 3: Verificar no navegador**

```bash
npm run dev
```

Abrir `http://localhost:3000`. Esperado: hero em split assimétrico, título alinhado à esquerda, kicker cobalto, dois CTAs. Console sem erro.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: seção Hero"
```

---

## Task 9: Seção Comparação (tangível × jurídico)

**Files:**
- Create: `components/sections/comparacao.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Criar `components/sections/comparacao.tsx`**

```tsx
import { Container } from "@/components/ui/container";
import { NumeroSecao } from "@/components/ui/numero-secao";
import { Reveal } from "@/components/ui/reveal";
import { HOME } from "@/content/home";

function Coluna({
  rotulo,
  itens,
  destacada,
}: {
  rotulo: string;
  itens: readonly string[];
  destacada: boolean;
}) {
  return (
    <div className={destacada ? "border-t-2 border-cobalt pt-6" : "border-t border-hairline pt-6"}>
      <p
        className={`font-mono text-[0.625rem] uppercase tracking-[0.14em] ${
          destacada ? "text-cobalt" : "text-graphite"
        }`}
      >
        {rotulo}
      </p>
      <ul className="mt-6 space-y-3">
        {itens.map((item) => (
          <li
            key={item}
            className={`text-lg tracking-tight md:text-xl ${
              destacada ? "font-semibold text-ink" : "text-graphite"
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Comparacao() {
  const { kicker, titulo, tangivel, juridico, fechamento } = HOME.comparacao;

  return (
    <section className="border-b border-hairline py-24 md:py-32">
      <Container>
        <Reveal>
          <NumeroSecao numero={kicker.numero} rotulo={kicker.rotulo} />
          <h2 className="mt-6 max-w-[20ch] text-3xl font-bold leading-[1.1] tracking-tighter md:text-5xl">
            {titulo}
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-16">
          <Reveal atraso={0.1}>
            <Coluna rotulo={tangivel.rotulo} itens={tangivel.itens} destacada={false} />
          </Reveal>
          <Reveal atraso={0.2}>
            <Coluna rotulo={juridico.rotulo} itens={juridico.itens} destacada />
          </Reveal>
        </div>

        <Reveal atraso={0.3}>
          <p className="mt-16 max-w-[65ch] text-base leading-relaxed text-graphite">
            {fechamento}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Adicionar à home**

Substituir `app/page.tsx`:

```tsx
import { Hero } from "@/components/sections/hero";
import { Comparacao } from "@/components/sections/comparacao";

export default function Home() {
  return (
    <>
      <Hero />
      <Comparacao />
    </>
  );
}
```

- [ ] **Step 3: Verificar no navegador**

Recarregar `http://localhost:3000`. Esperado: duas colunas, a da direita com borda cobalto e texto em peso maior. Rolar para conferir que a animação de entrada dispara uma vez.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: seção Comparação"
```

---

## Task 10: Seção Patrimônio Invisível (inversão escura)

**Files:**
- Create: `components/sections/patrimonio-invisivel.tsx`
- Modify: `app/page.tsx`

Esta é a única inversão de fundo do site. O cobalto é substituído por âmbar na proporção 1:1 e os dois nunca coexistem.

- [ ] **Step 1: Criar `components/sections/patrimonio-invisivel.tsx`**

```tsx
"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { Container } from "@/components/ui/container";
import { HOME } from "@/content/home";
import { PALETA } from "@/lib/paleta";

function LinhaRevelada({
  progresso,
  indice,
  total,
  texto,
}: {
  progresso: MotionValue<number>;
  indice: number;
  total: number;
  texto: string;
}) {
  const inicio = 0.18 + (indice / total) * 0.42;
  const cor = useTransform(
    progresso,
    [inicio, inicio + 0.14],
    [PALETA.penumbra, PALETA.bone],
  );

  return (
    <motion.p
      style={{ color: cor }}
      className="text-2xl font-semibold leading-tight tracking-tight md:text-4xl lg:text-5xl"
    >
      {texto}
    </motion.p>
  );
}

export function PatrimonioInvisivel() {
  const referencia = useRef<HTMLElement>(null);
  const movimentoReduzido = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: referencia,
    offset: ["start end", "end start"],
  });

  const { kicker, linhas, fechamento } = HOME.invisivel;

  return (
    <section ref={referencia} className="bg-void py-32 md:py-48">
      <Container>
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-amber">
          {kicker.numero} — {kicker.rotulo}
        </p>

        <div className="mt-12 max-w-[24ch] space-y-6 md:space-y-8">
          {linhas.map((linha, indice) =>
            movimentoReduzido ? (
              <p
                key={linha}
                className="text-2xl font-semibold leading-tight tracking-tight text-bone md:text-4xl lg:text-5xl"
              >
                {linha}
              </p>
            ) : (
              <LinhaRevelada
                key={linha}
                progresso={scrollYProgress}
                indice={indice}
                total={linhas.length}
                texto={linha}
              />
            ),
          )}
        </div>

        <div className="mt-20 border-t border-hairline-invertida pt-10">
          <p className="text-xl font-bold tracking-tight text-amber md:text-2xl">
            {fechamento}
          </p>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Adicionar à home**

```tsx
import { Hero } from "@/components/sections/hero";
import { Comparacao } from "@/components/sections/comparacao";
import { PatrimonioInvisivel } from "@/components/sections/patrimonio-invisivel";

export default function Home() {
  return (
    <>
      <Hero />
      <Comparacao />
      <PatrimonioInvisivel />
    </>
  );
}
```

- [ ] **Step 3: Verificar a revelação por scroll**

Recarregar e rolar devagar pela seção escura. Esperado: as quatro linhas passam de `#2C3340` para `#E9EBEF` em sequência conforme o scroll avança.

- [ ] **Step 4: Verificar sob movimento reduzido**

No DevTools, abrir o menu de comandos (Ctrl+Shift+P), rodar "Emulate CSS prefers-reduced-motion: reduce", recarregar. Esperado: as quatro linhas aparecem imediatamente em `#E9EBEF`, legíveis, sem transição de cor. Desativar a emulação depois.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: seção Patrimônio Invisível com revelação por scroll"
```

---

## Task 11: Seções Eixos, Tese, Trabalho e Fechamento

**Files:**
- Create: `components/sections/eixos.tsx`, `components/sections/tese.tsx`, `components/sections/trabalho.tsx`, `components/sections/fechamento.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Criar `components/sections/eixos.tsx`**

```tsx
import { Container } from "@/components/ui/container";
import { NumeroSecao } from "@/components/ui/numero-secao";
import { Reveal } from "@/components/ui/reveal";
import { HOME } from "@/content/home";

export function Eixos() {
  const { kicker, titulo, intro, lista } = HOME.eixos;

  return (
    <section className="border-b border-hairline py-24 md:py-32">
      <Container>
        <Reveal>
          <NumeroSecao numero={kicker.numero} rotulo={kicker.rotulo} />
          <h2 className="mt-6 max-w-[24ch] text-3xl font-bold leading-[1.1] tracking-tighter md:text-5xl">
            {titulo}
          </h2>
          <p className="mt-8 max-w-[65ch] text-base leading-relaxed text-graphite">
            {intro}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          {lista.map((eixo, indice) => (
            <Reveal key={eixo.nome} atraso={indice * 0.1}>
              <div className="border-t-2 border-cobalt pt-6">
                <h3 className="text-2xl font-bold tracking-tight">{eixo.nome}</h3>
                <ul className="mt-5 space-y-2">
                  {eixo.setores.map((setor) => (
                    <li key={setor} className="text-sm text-graphite">
                      {setor}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Criar `components/sections/tese.tsx`**

```tsx
import { Container } from "@/components/ui/container";
import { NumeroSecao } from "@/components/ui/numero-secao";
import { Regua } from "@/components/ui/regua";
import { Reveal } from "@/components/ui/reveal";
import { HOME } from "@/content/home";

export function Tese() {
  const { kicker, declaracao, desenvolvimento } = HOME.tese;

  return (
    <section className="border-b border-hairline py-24 md:py-40">
      <Container>
        <Reveal>
          <NumeroSecao numero={kicker.numero} rotulo={kicker.rotulo} />
          <p className="mt-8 max-w-[18ch] text-4xl font-bold leading-[1.05] tracking-tighter md:text-6xl lg:text-7xl">
            {declaracao}
          </p>
          <div className="mt-10">
            <Regua />
          </div>
          <p className="mt-10 max-w-[60ch] text-base leading-relaxed text-graphite">
            {desenvolvimento}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
```

- [ ] **Step 3: Criar `components/sections/trabalho.tsx`**

```tsx
import { Container } from "@/components/ui/container";
import { NumeroSecao } from "@/components/ui/numero-secao";
import { CTALink } from "@/components/ui/cta-link";
import { Reveal } from "@/components/ui/reveal";
import { HOME } from "@/content/home";

export function Trabalho() {
  const { kicker, titulo, verbos, cta } = HOME.trabalho;

  return (
    <section className="border-b border-hairline py-24 md:py-32">
      <Container>
        <Reveal>
          <NumeroSecao numero={kicker.numero} rotulo={kicker.rotulo} />
          <h2 className="mt-6 max-w-[20ch] text-3xl font-bold leading-[1.1] tracking-tighter md:text-5xl">
            {titulo}
          </h2>
        </Reveal>

        <ol className="mt-16 grid gap-10 md:grid-cols-2 md:gap-x-16 md:gap-y-14">
          {verbos.map((verbo, indice) => (
            <Reveal key={verbo.nome} atraso={indice * 0.08}>
              <li className="border-t border-hairline pt-6">
                <p className="font-mono text-[0.625rem] tracking-[0.14em] text-cobalt">
                  {String(indice + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-2xl font-bold tracking-tight">{verbo.nome}</h3>
                <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-graphite">
                  {verbo.descricao}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal atraso={0.2}>
          <div className="mt-16">
            <CTALink href={cta.href} variante="secundario">
              {cta.rotulo}
            </CTALink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
```

Nota: `<Reveal>` renderiza uma `div`, então os `<li>` ficam dentro dela. Para manter a semântica da lista, o `Reveal` aqui envolve o `li` — se o linter reclamar de `<div>` dentro de `<ol>`, trocar `<ol>`/`<li>` por `<div>`/`<div>` com `role="list"` e `role="listitem"`.

- [ ] **Step 4: Criar `components/sections/fechamento.tsx`**

```tsx
import { Container } from "@/components/ui/container";
import { CTALink } from "@/components/ui/cta-link";
import { Reveal } from "@/components/ui/reveal";
import { HOME } from "@/content/home";

export function Fechamento() {
  const { titulo, subtitulo, cta } = HOME.fechamento;

  return (
    <section className="py-24 md:py-40">
      <Container>
        <Reveal>
          <div className="max-w-[34ch]">
            <h2 className="text-3xl font-bold leading-[1.08] tracking-tighter md:text-5xl">
              {titulo}
            </h2>
            <p className="mt-8 text-base leading-relaxed text-graphite">{subtitulo}</p>
            <div className="mt-12">
              <CTALink href={cta.href}>{cta.rotulo}</CTALink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
```

- [ ] **Step 5: Montar a home completa**

Substituir `app/page.tsx`:

```tsx
import { Hero } from "@/components/sections/hero";
import { Comparacao } from "@/components/sections/comparacao";
import { PatrimonioInvisivel } from "@/components/sections/patrimonio-invisivel";
import { Eixos } from "@/components/sections/eixos";
import { Tese } from "@/components/sections/tese";
import { Trabalho } from "@/components/sections/trabalho";
import { Fechamento } from "@/components/sections/fechamento";

export default function Home() {
  return (
    <>
      <Hero />
      <Comparacao />
      <PatrimonioInvisivel />
      <Eixos />
      <Tese />
      <Trabalho />
      <Fechamento />
    </>
  );
}
```

- [ ] **Step 6: Verificar a home inteira**

Recarregar e rolar do topo ao rodapé. Esperado: sete seções na ordem, apenas a terceira com fundo escuro, console limpo.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: seções Eixos, Tese, Trabalho e Fechamento — home completa"
```

---

## Task 12: Páginas internas — copy

**Files:**
- Create: `content/instituto.ts`, `content/atuacao.ts`, `content/metodologia.ts`

- [ ] **Step 1: Criar `content/instituto.ts`**

```ts
export const INSTITUTO = {
  titulo: "O Instituto",
  chamada:
    "O IDATE não é um escritório de advocacia. É uma instituição dedicada ao patrimônio jurídico e econômico das empresas brasileiras.",
  blocos: [
    {
      numero: "01",
      titulo: "A origem da ideia",
      paragrafos: [
        "O IDATE nasce de uma constatação simples, mas pouco percebida pelo mercado: o patrimônio de uma empresa não é composto apenas pelos bens que aparecem em seu balanço patrimonial.",
        "Ao longo de sua existência, toda empresa estabelece inúmeras relações jurídicas com o Estado, com concessionárias de serviços públicos, com agentes reguladores, com fornecedores estratégicos e com o próprio sistema econômico brasileiro. Essas relações produzem direitos patrimoniais que muitas vezes permanecem desconhecidos.",
      ],
    },
    {
      numero: "02",
      titulo: "A filosofia",
      paragrafos: [
        "O instituto parte da premissa de que o Direito não deve ser compreendido apenas como um mecanismo de solução de conflitos. Sua função mais relevante é proteger o patrimônio.",
        "Quando um direito econômico deixa de ser exercido, ocorre uma perda patrimonial. Essa perda nem sempre decorre de ilegalidade — na maioria das vezes decorre da própria complexidade do sistema jurídico brasileiro. O instituto existe para reduzir a distância entre o direito existente e o patrimônio efetivamente reconhecido.",
      ],
    },
    {
      numero: "03",
      titulo: "O conhecimento como patrimônio",
      paragrafos: [
        "O maior ativo do IDATE não são processos judiciais. Também não são petições, muito menos ações. O verdadeiro patrimônio do instituto é o conhecimento.",
        "Conhecimento sobre legislação, sobre precedentes, sobre evolução jurisprudencial, conhecimento econômico, regulatório e histórico. A reunião dessas informações permite identificar direitos que permanecem ocultos para a maior parte das empresas.",
      ],
    },
    {
      numero: "04",
      titulo: "A natureza do instituto",
      paragrafos: [
        "O IDATE é um centro de inteligência jurídica e patrimonial. Sua atuação está baseada na investigação técnica de direitos econômicos relacionados a setores estratégicos da economia brasileira.",
        "Seu trabalho integra Direito, Economia, Regulação, História Legislativa, Jurisprudência e Análise Patrimonial. Essa abordagem multidisciplinar permite compreender o patrimônio empresarial sob uma perspectiva mais ampla do que a tradicionalmente adotada pela advocacia convencional.",
      ],
    },
  ],
  disciplinas: [
    "Direito",
    "Economia",
    "Regulação",
    "História Legislativa",
    "Jurisprudência",
    "Análise Patrimonial",
  ],
  missao:
    "Produzir inteligência jurídica capaz de identificar, proteger, preservar e recuperar direitos patrimoniais de elevada complexidade, contribuindo para que empresas conheçam integralmente seu patrimônio econômico e exerçam seus direitos de forma técnica, segura e fundamentada.",
  visao:
    "Todo direito economicamente relevante deve ser conhecido antes de ser exercido. Não existe proteção sem conhecimento. Não existe recuperação sem identificação. Não existe patrimônio plenamente preservado quando parte dele permanece invisível.",
  valores: [
    "Rigor técnico na pesquisa e interpretação do Direito.",
    "Independência intelectual na análise de teses e precedentes.",
    "Transparência na comunicação dos riscos e oportunidades.",
    "Responsabilidade na condução de estudos e pareceres.",
    "Ética na defesa dos interesses patrimoniais de seus clientes.",
    "Produção contínua de conhecimento aplicado.",
    "Compromisso com a segurança jurídica e a previsibilidade das decisões.",
  ],
} as const;
```

- [ ] **Step 2: Criar `content/atuacao.ts`**

```ts
export const ATUACAO = {
  titulo: "Áreas de Atuação",
  chamada:
    "O nome do instituto simboliza não apenas recursos naturais, mas os setores econômicos em que os direitos patrimoniais assumem maior relevância.",
  intro: [
    "Água, terra e energia sustentam praticamente toda a atividade produtiva nacional. São indispensáveis ao agronegócio, à indústria, à mineração, à infraestrutura, ao saneamento, à produção de alimentos e à geração de riqueza.",
    "Ao redor desses elementos formou-se, ao longo das últimas décadas, uma complexa estrutura normativa composta por leis, contratos, concessões, tributos, encargos e obrigações específicas. É justamente nesse ambiente que surgem alguns dos mais relevantes direitos patrimoniais das empresas brasileiras.",
  ],
  eixos: [
    {
      numero: "01",
      nome: "Água",
      descricao:
        "O uso da água é regulado por outorgas, contratos de concessão e encargos que se acumularam ao longo de décadas de reforma do setor. Empresas que dependem de captação, tratamento ou fornecimento constroem, nesse ambiente, relações jurídicas duradouras e economicamente relevantes.",
      setores: [
        "Saneamento básico",
        "Concessionárias de água e esgoto",
        "Indústria com captação própria",
        "Agroindústria irrigada",
      ],
    },
    {
      numero: "02",
      nome: "Terra",
      descricao:
        "A propriedade e o uso do solo produzem obrigações tributárias, ambientais e registrais que se sobrepõem em camadas normativas. Cada alteração legislativa e cada mudança de entendimento dos tribunais redefine o alcance desses direitos.",
      setores: [
        "Agronegócio",
        "Mineração",
        "Produção de alimentos",
        "Infraestrutura e logística",
      ],
    },
    {
      numero: "03",
      nome: "Energia",
      descricao:
        "O setor elétrico brasileiro é um dos ambientes regulatórios mais densos do país. Encargos setoriais, tributos sobre a operação e sucessivas revisões normativas produzem direitos patrimoniais de identificação tecnicamente complexa.",
      setores: [
        "Geração e distribuição",
        "Indústria eletrointensiva",
        "Consumidores do mercado livre",
        "Infraestrutura energética",
      ],
    },
  ],
} as const;
```

- [ ] **Step 3: Criar `content/metodologia.ts`**

```ts
export const METODOLOGIA = {
  titulo: "Metodologia",
  chamada:
    "O Brasil possui um dos sistemas normativos mais extensos do mundo. Compreender sua dinâmica exige pesquisa permanente.",
  complexidade: {
    numero: "01",
    titulo: "Por que direitos se perdem",
    paragrafos: [
      "Leis são alteradas. Tribunais modificam entendimentos. Temas são submetidos à repercussão geral. Recursos repetitivos redefinem interpretações. Agências reguladoras editam novas normas.",
      "Nesse cenário, direitos econômicos podem surgir, desaparecer ou ser reinterpretados ao longo dos anos. A perda patrimonial raramente decorre de ilegalidade — decorre da própria complexidade do sistema.",
    ],
    fontes: [
      "Alteração legislativa",
      "Mudança jurisprudencial",
      "Repercussão geral",
      "Recurso repetitivo",
      "Norma de agência reguladora",
    ],
  },
  verbos: [
    {
      numero: "02",
      nome: "Identificar",
      descricao:
        "Reconhecer, na história jurídica da empresa, os direitos econômicos que permanecem ocultos sob a complexidade normativa. Envolve leitura de contratos, análise de obrigações regulatórias e reconstrução da trajetória legislativa aplicável ao setor.",
    },
    {
      numero: "03",
      nome: "Proteger",
      descricao:
        "Impedir que o direito reconhecido se perca por decurso de prazo, cálculo incorreto ou desatenção a mudanças de entendimento. Proteção é trabalho de vigilância, não de litígio.",
    },
    {
      numero: "04",
      nome: "Preservar",
      descricao:
        "Acompanhar de forma contínua as alterações legislativas e jurisprudenciais que afetam o direito ao longo do tempo. Um direito preservado é um direito que permanece exercível.",
    },
    {
      numero: "05",
      nome: "Recuperar",
      descricao:
        "Exercer o direito de forma técnica, segura e fundamentada. Não se cria um patrimônio novo — recupera-se um patrimônio que já existia.",
    },
  ],
} as const;
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "content: copy das páginas Instituto, Atuação e Metodologia"
```

---

## Task 13: Páginas internas — componentes

**Files:**
- Create: `components/ui/cabecalho-pagina.tsx`, `app/instituto/page.tsx`, `app/atuacao/page.tsx`, `app/metodologia/page.tsx`

- [ ] **Step 1: Criar `components/ui/cabecalho-pagina.tsx`**

```tsx
import { Container } from "@/components/ui/container";

export function CabecalhoPagina({
  titulo,
  chamada,
}: {
  titulo: string;
  chamada: string;
}) {
  return (
    <section className="border-b border-hairline py-20 md:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <h1 className="text-4xl font-bold leading-[1.05] tracking-tighter md:text-6xl">
              {titulo}
            </h1>
          </div>
          <div className="flex items-end lg:col-span-6">
            <p className="max-w-[55ch] text-lg leading-relaxed text-graphite">
              {chamada}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Criar `app/instituto/page.tsx`**

```tsx
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { CabecalhoPagina } from "@/components/ui/cabecalho-pagina";
import { NumeroSecao } from "@/components/ui/numero-secao";
import { Regua } from "@/components/ui/regua";
import { Reveal } from "@/components/ui/reveal";
import { INSTITUTO } from "@/content/instituto";

export const metadata: Metadata = {
  title: "O Instituto",
  description: INSTITUTO.chamada,
};

export default function Instituto() {
  return (
    <>
      <CabecalhoPagina titulo={INSTITUTO.titulo} chamada={INSTITUTO.chamada} />

      <section className="border-b border-hairline py-24 md:py-32">
        <Container>
          <div className="space-y-20 md:space-y-28">
            {INSTITUTO.blocos.map((bloco) => (
              <Reveal key={bloco.numero}>
                <article className="grid gap-8 lg:grid-cols-12 lg:gap-16">
                  <div className="lg:col-span-4">
                    <NumeroSecao numero={bloco.numero} rotulo={bloco.titulo} />
                  </div>
                  <div className="space-y-6 lg:col-span-8">
                    {bloco.paragrafos.map((paragrafo) => (
                      <p
                        key={paragrafo.slice(0, 40)}
                        className="max-w-[65ch] text-base leading-relaxed text-graphite"
                      >
                        {paragrafo}
                      </p>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-hairline py-24 md:py-32">
        <Container>
          <Reveal>
            <NumeroSecao numero="05" rotulo="Abordagem multidisciplinar" />
            <ul className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              {INSTITUTO.disciplinas.map((disciplina) => (
                <li
                  key={disciplina}
                  className="border-t border-hairline pt-4 text-xl font-semibold tracking-tight"
                >
                  {disciplina}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <section className="border-b border-hairline py-24 md:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <Reveal>
              <div>
                <NumeroSecao numero="06" rotulo="Missão" />
                <p className="mt-8 max-w-[50ch] text-xl leading-snug tracking-tight md:text-2xl">
                  {INSTITUTO.missao}
                </p>
              </div>
            </Reveal>
            <Reveal atraso={0.1}>
              <div>
                <NumeroSecao numero="07" rotulo="Visão" />
                <p className="mt-8 max-w-[50ch] text-xl leading-snug tracking-tight md:text-2xl">
                  {INSTITUTO.visao}
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <Reveal>
            <NumeroSecao numero="08" rotulo="Valores" />
            <div className="mt-8">
              <Regua />
            </div>
            <ol className="mt-12 space-y-6">
              {INSTITUTO.valores.map((valor, indice) => (
                <li
                  key={valor}
                  className="flex gap-6 border-t border-hairline pt-5"
                >
                  <span className="font-mono text-[0.625rem] tracking-[0.14em] text-cobalt">
                    {String(indice + 1).padStart(2, "0")}
                  </span>
                  <span className="max-w-[60ch] text-base leading-relaxed text-graphite">
                    {valor}
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
```

- [ ] **Step 3: Criar `app/atuacao/page.tsx`**

```tsx
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { CabecalhoPagina } from "@/components/ui/cabecalho-pagina";
import { NumeroSecao } from "@/components/ui/numero-secao";
import { Reveal } from "@/components/ui/reveal";
import { ATUACAO } from "@/content/atuacao";

export const metadata: Metadata = {
  title: "Áreas de Atuação",
  description: ATUACAO.chamada,
};

export default function Atuacao() {
  return (
    <>
      <CabecalhoPagina titulo={ATUACAO.titulo} chamada={ATUACAO.chamada} />

      <section className="border-b border-hairline py-20 md:py-28">
        <Container>
          <Reveal>
            <div className="max-w-[65ch] space-y-6">
              {ATUACAO.intro.map((paragrafo) => (
                <p
                  key={paragrafo.slice(0, 40)}
                  className="text-base leading-relaxed text-graphite"
                >
                  {paragrafo}
                </p>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {ATUACAO.eixos.map((eixo) => (
        <section key={eixo.nome} className="border-b border-hairline py-24 md:py-32">
          <Container>
            <Reveal>
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                <div className="lg:col-span-5">
                  <NumeroSecao numero={eixo.numero} rotulo="Eixo" />
                  <h2 className="mt-6 text-4xl font-bold tracking-tighter md:text-6xl">
                    {eixo.nome}
                  </h2>
                </div>
                <div className="lg:col-span-7">
                  <p className="max-w-[60ch] text-base leading-relaxed text-graphite">
                    {eixo.descricao}
                  </p>
                  <ul className="mt-10 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {eixo.setores.map((setor) => (
                      <li
                        key={setor}
                        className="border-t border-hairline pt-3 text-sm font-semibold"
                      >
                        {setor}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>
      ))}
    </>
  );
}
```

- [ ] **Step 4: Criar `app/metodologia/page.tsx`**

```tsx
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { CabecalhoPagina } from "@/components/ui/cabecalho-pagina";
import { NumeroSecao } from "@/components/ui/numero-secao";
import { Reveal } from "@/components/ui/reveal";
import { METODOLOGIA } from "@/content/metodologia";

export const metadata: Metadata = {
  title: "Metodologia",
  description: METODOLOGIA.chamada,
};

export default function Metodologia() {
  const { complexidade } = METODOLOGIA;

  return (
    <>
      <CabecalhoPagina titulo={METODOLOGIA.titulo} chamada={METODOLOGIA.chamada} />

      <section className="border-b border-hairline py-24 md:py-32">
        <Container>
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <NumeroSecao numero={complexidade.numero} rotulo={complexidade.titulo} />
              </div>
              <div className="lg:col-span-8">
                <div className="max-w-[65ch] space-y-6">
                  {complexidade.paragrafos.map((paragrafo) => (
                    <p
                      key={paragrafo.slice(0, 40)}
                      className="text-base leading-relaxed text-graphite"
                    >
                      {paragrafo}
                    </p>
                  ))}
                </div>
                <ul className="mt-12 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {complexidade.fontes.map((fonte) => (
                    <li
                      key={fonte}
                      className="border-t border-hairline pt-3 text-sm font-semibold"
                    >
                      {fonte}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <div className="space-y-20 md:space-y-24">
            {METODOLOGIA.verbos.map((verbo) => (
              <Reveal key={verbo.nome}>
                <article className="grid gap-8 lg:grid-cols-12 lg:gap-16">
                  <div className="lg:col-span-4">
                    <NumeroSecao numero={verbo.numero} rotulo="Etapa" />
                    <h2 className="mt-5 text-3xl font-bold tracking-tighter md:text-4xl">
                      {verbo.nome}
                    </h2>
                  </div>
                  <div className="lg:col-span-8">
                    <p className="max-w-[65ch] text-base leading-relaxed text-graphite">
                      {verbo.descricao}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
```

- [ ] **Step 5: Verificar as três páginas**

Abrir `/instituto`, `/atuacao` e `/metodologia`. Esperado: cada uma com um único `h1`, hierarquia de heading sem salto, console limpo.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: páginas Instituto, Atuação e Metodologia"
```

---

## Task 14: Schema de contato com testes

**Files:**
- Create: `lib/contato-schema.ts`, `lib/contato-schema.test.ts`

- [ ] **Step 1: Escrever o teste que falha**

Criar `lib/contato-schema.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { contatoSchema } from "./contato-schema";

const valido = {
  nome: "Maria Andrade",
  cargo: "Diretora Financeira",
  empresa: "Agroindustrial Paraná S.A.",
  setor: "agronegocio",
  email: "maria@exemplo.com.br",
  telefone: "4133334444",
  mensagem:
    "Gostaríamos de avaliar direitos relacionados a encargos do setor elétrico.",
  website: "",
};

describe("contatoSchema", () => {
  it("aceita uma submissão válida", () => {
    expect(contatoSchema.safeParse(valido).success).toBe(true);
  });

  it("rejeita e-mail malformado", () => {
    const r = contatoSchema.safeParse({ ...valido, email: "maria@" });
    expect(r.success).toBe(false);
  });

  it("rejeita mensagem curta demais", () => {
    const r = contatoSchema.safeParse({ ...valido, mensagem: "oi" });
    expect(r.success).toBe(false);
  });

  it("rejeita setor fora da lista", () => {
    const r = contatoSchema.safeParse({ ...valido, setor: "turismo" });
    expect(r.success).toBe(false);
  });

  it("rejeita quando o honeypot está preenchido", () => {
    const r = contatoSchema.safeParse({ ...valido, website: "spam" });
    expect(r.success).toBe(false);
  });

  it("remove espaços nas pontas do nome", () => {
    const r = contatoSchema.safeParse({ ...valido, nome: "  Maria Andrade  " });
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.nome).toBe("Maria Andrade");
  });
});
```

- [ ] **Step 2: Rodar e confirmar que falha**

```bash
npm test
```

Esperado: FAIL — `Failed to resolve import "./contato-schema"`.

- [ ] **Step 3: Implementar `lib/contato-schema.ts`**

```ts
import { z } from "zod";

export const SETORES = [
  { valor: "agronegocio", rotulo: "Agronegócio" },
  { valor: "industria", rotulo: "Indústria" },
  { valor: "mineracao", rotulo: "Mineração" },
  { valor: "infraestrutura", rotulo: "Infraestrutura" },
  { valor: "saneamento", rotulo: "Saneamento" },
  { valor: "energia", rotulo: "Energia" },
  { valor: "outro", rotulo: "Outro" },
] as const;

const VALORES_SETOR = SETORES.map((s) => s.valor) as [string, ...string[]];

export const contatoSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome completo."),
  cargo: z.string().trim().min(2, "Informe seu cargo."),
  empresa: z.string().trim().min(2, "Informe o nome da empresa."),
  setor: z.enum(VALORES_SETOR),
  email: z.string().trim().email("Informe um e-mail válido."),
  telefone: z.string().trim().min(10, "Informe um telefone com DDD."),
  mensagem: z
    .string()
    .trim()
    .min(20, "Descreva sua solicitação em ao menos 20 caracteres."),
  /** Honeypot: campo escondido que só um robô preenche. */
  website: z.string().max(0, "Submissão rejeitada."),
});

export type ContatoInput = z.infer<typeof contatoSchema>;
```

- [ ] **Step 4: Rodar e confirmar que passa**

```bash
npm test
```

Esperado: PASS, 15 testes no total.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: schema de validação do formulário de contato"
```

---

## Task 15: Route handler de contato

**Files:**
- Create: `lib/enviar-solicitacao.ts`, `app/api/contato/route.ts`, `.env.example`

- [ ] **Step 1: Criar `lib/enviar-solicitacao.ts`**

```ts
import { Resend } from "resend";
import type { ContatoInput } from "./contato-schema";
import { SETORES } from "./contato-schema";

/**
 * Por decisão de projeto (spec §6.3), este módulo LANÇA quando não está
 * configurado. Um formulário que engole a submissão silenciosamente perde
 * negócio sem deixar rastro — é pior do que um erro visível.
 */
export async function enviarSolicitacao(dados: ContatoInput): Promise<void> {
  const chave = process.env.RESEND_API_KEY;
  const destino = process.env.CONTATO_DESTINO;
  const remetente = process.env.CONTATO_REMETENTE;

  if (!chave || !destino || !remetente) {
    throw new Error(
      "RESEND_API_KEY, CONTATO_DESTINO e CONTATO_REMETENTE precisam estar definidas.",
    );
  }

  const rotuloSetor =
    SETORES.find((s) => s.valor === dados.setor)?.rotulo ?? dados.setor;

  const resend = new Resend(chave);

  const { error } = await resend.emails.send({
    from: remetente,
    to: destino,
    replyTo: dados.email,
    subject: `Solicitação de análise — ${dados.empresa}`,
    text: [
      `Nome: ${dados.nome}`,
      `Cargo: ${dados.cargo}`,
      `Empresa: ${dados.empresa}`,
      `Setor: ${rotuloSetor}`,
      `E-mail: ${dados.email}`,
      `Telefone: ${dados.telefone}`,
      "",
      "Mensagem:",
      dados.mensagem,
    ].join("\n"),
  });

  if (error) {
    throw new Error(`Resend recusou o envio: ${error.message}`);
  }
}
```

- [ ] **Step 2: Criar `app/api/contato/route.ts`**

```ts
import { NextResponse } from "next/server";
import { contatoSchema } from "@/lib/contato-schema";
import { enviarSolicitacao } from "@/lib/enviar-solicitacao";

export async function POST(request: Request) {
  let corpo: unknown;
  try {
    corpo = await request.json();
  } catch {
    return NextResponse.json({ erro: "Corpo inválido." }, { status: 400 });
  }

  const resultado = contatoSchema.safeParse(corpo);

  if (!resultado.success) {
    const campos: Record<string, string> = {};
    for (const problema of resultado.error.issues) {
      const campo = String(problema.path[0] ?? "");
      if (campo && !campos[campo]) campos[campo] = problema.message;
    }
    return NextResponse.json(
      { erro: "Confira os campos destacados.", campos },
      { status: 422 },
    );
  }

  try {
    await enviarSolicitacao(resultado.data);
  } catch (erro) {
    console.error("[contato] falha no envio:", erro);
    return NextResponse.json(
      {
        erro:
          "Não foi possível enviar sua solicitação agora. Tente novamente em alguns minutos.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 3: Criar `.env.example`**

```
# Envio do formulário de contato. Sem estas variáveis o formulário
# retorna erro explícito — por decisão de projeto, ele nunca finge sucesso.
RESEND_API_KEY=
CONTATO_DESTINO=
CONTATO_REMETENTE=
```

- [ ] **Step 4: Confirmar que `.env.local` está ignorado**

```bash
grep -n "env" .gitignore
```

Esperado: linha contendo `.env*`. O `create-next-app` já inclui.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: route handler de contato com envio via Resend"
```

---

## Task 16: Formulário e página de contato

**Files:**
- Create: `content/contato.ts`, `components/sections/formulario-contato.tsx`, `app/contato/page.tsx`

- [ ] **Step 1: Criar `content/contato.ts`**

```ts
export const CONTATO = {
  titulo: "Solicitar análise",
  chamada:
    "Descreva sua operação e o setor em que atua. A partir dessas informações, o instituto avalia a pertinência de um estudo sobre o patrimônio jurídico da empresa.",
  campos: {
    nome: "Nome completo",
    cargo: "Cargo",
    empresa: "Empresa",
    setor: "Setor de atuação",
    email: "E-mail corporativo",
    telefone: "Telefone com DDD",
    mensagem: "Sobre a solicitação",
  },
  botao: "Enviar solicitação",
  enviando: "Enviando...",
  sucesso:
    "Solicitação recebida. O instituto responderá pelo e-mail informado.",
} as const;
```

- [ ] **Step 2: Criar `components/sections/formulario-contato.tsx`**

```tsx
"use client";

import { useState, type FormEvent } from "react";
import { SETORES } from "@/lib/contato-schema";
import { CONTATO } from "@/content/contato";

type Estado = "parado" | "enviando" | "sucesso";

const ENTRADA =
  "mt-2 w-full border border-hairline bg-transparent px-4 py-3 text-base text-ink outline-none transition-colors focus:border-cobalt";

export function FormularioContato() {
  const [estado, setEstado] = useState<Estado>("parado");
  const [erroGeral, setErroGeral] = useState<string | null>(null);
  const [erros, setErros] = useState<Record<string, string>>({});

  async function aoEnviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setEstado("enviando");
    setErroGeral(null);
    setErros({});

    const dados = Object.fromEntries(new FormData(evento.currentTarget));

    try {
      const resposta = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      const corpo = await resposta.json();

      if (!resposta.ok) {
        setErroGeral(corpo.erro ?? "Não foi possível enviar.");
        setErros(corpo.campos ?? {});
        setEstado("parado");
        return;
      }

      setEstado("sucesso");
    } catch {
      setErroGeral(
        "Não foi possível enviar sua solicitação agora. Verifique sua conexão e tente novamente.",
      );
      setEstado("parado");
    }
  }

  if (estado === "sucesso") {
    return (
      <div className="border-t-2 border-cobalt pt-8" role="status">
        <p className="text-2xl font-bold tracking-tight">{CONTATO.sucesso}</p>
      </div>
    );
  }

  return (
    <form onSubmit={aoEnviar} noValidate className="space-y-8">
      {erroGeral && (
        <p
          role="alert"
          className="border-l-2 border-cobalt bg-cobalt/5 px-4 py-3 text-sm font-semibold text-cobalt"
        >
          {erroGeral}
        </p>
      )}

      <div className="grid gap-8 sm:grid-cols-2">
        <Campo nome="nome" rotulo={CONTATO.campos.nome} erro={erros.nome} />
        <Campo nome="cargo" rotulo={CONTATO.campos.cargo} erro={erros.cargo} />
        <Campo nome="empresa" rotulo={CONTATO.campos.empresa} erro={erros.empresa} />

        <div>
          <label htmlFor="setor" className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-graphite">
            {CONTATO.campos.setor}
          </label>
          <select id="setor" name="setor" defaultValue="" required className={ENTRADA}>
            <option value="" disabled>
              Selecione
            </option>
            {SETORES.map((setor) => (
              <option key={setor.valor} value={setor.valor}>
                {setor.rotulo}
              </option>
            ))}
          </select>
          {erros.setor && <p className="mt-2 text-sm text-cobalt">{erros.setor}</p>}
        </div>

        <Campo nome="email" rotulo={CONTATO.campos.email} tipo="email" erro={erros.email} />
        <Campo nome="telefone" rotulo={CONTATO.campos.telefone} tipo="tel" erro={erros.telefone} />
      </div>

      <div>
        <label htmlFor="mensagem" className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-graphite">
          {CONTATO.campos.mensagem}
        </label>
        <textarea id="mensagem" name="mensagem" rows={6} required className={ENTRADA} />
        {erros.mensagem && <p className="mt-2 text-sm text-cobalt">{erros.mensagem}</p>}
      </div>

      {/* Honeypot — invisível para pessoas, atraente para robôs. */}
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <button
        type="submit"
        disabled={estado === "enviando"}
        className="bg-cobalt px-8 py-4 text-sm font-semibold text-paper transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {estado === "enviando" ? CONTATO.enviando : CONTATO.botao}
      </button>
    </form>
  );
}

function Campo({
  nome,
  rotulo,
  tipo = "text",
  erro,
}: {
  nome: string;
  rotulo: string;
  tipo?: string;
  erro?: string;
}) {
  return (
    <div>
      <label htmlFor={nome} className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-graphite">
        {rotulo}
      </label>
      <input id={nome} name={nome} type={tipo} required className={ENTRADA} />
      {erro && <p className="mt-2 text-sm text-cobalt">{erro}</p>}
    </div>
  );
}
```

- [ ] **Step 3: Criar `app/contato/page.tsx`**

```tsx
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { CabecalhoPagina } from "@/components/ui/cabecalho-pagina";
import { FormularioContato } from "@/components/sections/formulario-contato";
import { CONTATO } from "@/content/contato";

export const metadata: Metadata = {
  title: "Solicitar análise",
  description: CONTATO.chamada,
};

export default function Contato() {
  return (
    <>
      <CabecalhoPagina titulo={CONTATO.titulo} chamada={CONTATO.chamada} />
      <section className="py-20 md:py-28">
        <Container>
          <div className="max-w-[52rem]">
            <FormularioContato />
          </div>
        </Container>
      </section>
    </>
  );
}
```

- [ ] **Step 4: Testar o caminho de falha**

Sem `.env.local` configurado, abrir `/contato`, preencher tudo e enviar. Esperado: mensagem de erro visível, botão volta a ficar disponível, e o terminal do servidor mostra `[contato] falha no envio:`. Isso confirma que o formulário nunca finge sucesso.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: formulário e página de contato"
```

---

## Task 17: Documento de pendências

**Files:**
- Create: `content/PENDENCIAS.md`

- [ ] **Step 1: Criar `content/PENDENCIAS.md`**

```markdown
# Pendências de conteúdo — IDATE

O site foi construído sem nenhum dado inventado. Métricas, casos, depoimentos,
equipe e contato **não existem** porque não foram fornecidos, e inventá-los
criaria risco de credibilidade desproporcional para um instituto que vende
rigor técnico.

Cada item abaixo precisa ser fornecido pelo cliente.

## Bloqueia a publicação

| Item | Onde entra | Arquivo |
|---|---|---|
| E-mail institucional | Rodapé, resposta do formulário | `content/site.ts` → `INSTITUCIONAL.email` |
| Telefone | Rodapé | `content/site.ts` → `INSTITUCIONAL.telefone` |
| Endereço | Rodapé | `content/site.ts` → `INSTITUCIONAL.endereco` |
| CNPJ | Rodapé | `content/site.ts` → `INSTITUCIONAL.cnpj` |
| Domínio definitivo | Metadados, Open Graph | `content/site.ts` → `SITE.url` |
| `RESEND_API_KEY` | Envio do formulário | `.env.local` |
| `CONTATO_DESTINO` | Destinatário do formulário | `.env.local` |
| `CONTATO_REMETENTE` | Remetente verificado no Resend | `.env.local` |
| SVG vetorial da marca | Header, rodapé, favicon | `components/layout/marca.tsx` |

## Enriquece o site (opcional)

| Item | Onde entraria |
|---|---|
| Corpo técnico (nomes, cargos, formação) | Nova seção em `/instituto` |
| Imagem Open Graph 1200×630 | `app/opengraph-image.png` |
| Estudos, pareceres ou artigos publicados | Nova página `/conhecimento` |

## O que deliberadamente não existe

Não inclua sem discussão prévia: valores recuperados, número de clientes, anos
de atuação, depoimentos, logos de empresas atendidas, selos, certificações ou
prêmios. Qualquer um desses precisa ser verificável antes de entrar.
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "docs: pendências de conteúdo"
```

---

## Task 18: Verificação final

**Files:** nenhum arquivo novo; correções conforme necessário.

- [ ] **Step 1: Rodar a suíte de testes**

```bash
npm test
```

Esperado: PASS, 15 testes.

- [ ] **Step 2: Rodar o build de produção**

```bash
npm run build
```

Esperado: build concluído, cinco rotas estáticas mais `/api/contato`. Zero erro de tipo.

- [ ] **Step 3: Verificar o console em todas as páginas**

Com `npm run dev` rodando, visitar `/`, `/instituto`, `/atuacao`, `/metodologia` e `/contato`. Em cada uma, ler o console do navegador. Esperado: sem erro e sem aviso de hidratação.

- [ ] **Step 4: Verificar semântica de headings**

Em cada página, rodar no console do navegador:

```js
[...document.querySelectorAll("h1,h2,h3,h4")].map((h) => h.tagName + " " + h.textContent.slice(0, 40))
```

Esperado: exatamente um `H1` por página, e nenhum salto de nível (nunca `H2` seguido direto de `H4`).

- [ ] **Step 5: Verificar responsividade**

Redimensionar para 375px, 768px e 1440px. Em cada largura, rodar:

```js
document.documentElement.scrollWidth <= window.innerWidth
```

Esperado: `true` nas três larguras, em todas as páginas. Nenhuma rolagem horizontal.

- [ ] **Step 6: Verificar navegação por teclado**

Na home, pressionar Tab a partir do topo. Esperado: o link "Pular para o conteúdo" aparece primeiro, o foco fica visível em todos os elementos interativos com contorno cobalto, e a ordem segue a leitura visual.

- [ ] **Step 7: Verificar movimento reduzido**

Emular `prefers-reduced-motion: reduce` no DevTools e recarregar a home. Esperado: todo o conteúdo visível e legível de imediato, incluindo as quatro linhas da seção escura em `#E9EBEF`.

- [ ] **Step 8: Capturar evidência**

Tirar screenshot da home completa, da seção escura e da página de contato. Anexar ao relatório de entrega.

- [ ] **Step 9: Commit final**

```bash
git add -A
git commit -m "chore: verificação final — testes, build, a11y e responsividade"
```

---

## Critérios de aceite

Do spec §7. Nenhum destes pode ficar em aberto:

1. Contraste WCAG AA verificado — coberto pelo teste automatizado em `lib/paleta.test.ts`.
2. Navegação completa por teclado com foco visível.
3. `prefers-reduced-motion` desliga movimento sem esconder conteúdo.
4. Console limpo em todas as cinco páginas.
5. Sem rolagem horizontal em 375, 768 e 1440px.
6. Metadados por página com `title`, `description` e Open Graph.
7. Um `h1` por página, hierarquia sem salto.
8. Formulário falha de forma explícita quando não configurado — nunca finge sucesso.
