# Hero da home — imagem real + camada generativa reativa — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **Nota de ambiente:** este diretório não é um repositório git (`git rev-parse --is-inside-work-tree` falha). Os passos de "commit" do template padrão foram substituídos por passos de verificação manual. Se o projeto for inicializado como repositório git antes da execução, considere adicionar commits por task.

**Goal:** Substituir a foto do hero da home (barragem com marca d'água de IA, em baixa resolução) por uma fotografia real de banco de imagens livre de direitos, e promover a visualização generativa dos 3 pilares (hoje escondida num cartão pequeno) para uma camada ambiente reativa dentro do véu escuro do hero.

**Architecture:** O estado do pilar ativo (`agua`/`terra`/`energia`), hoje local a `HeroConteudo`, sobe para `Hero` (que passa a ser client component) e é compartilhado por dois consumidores: o cartão de seleção existente (`HeroConteudo`, inalterado na lógica, só recebe props em vez de `useState` local) e um novo componente canvas (`PilarGlowHero`) que desenha linhas finas reativas dentro do véu gradiente esquerdo já existente. A foto em si é baixada uma vez via script Python (seguindo o padrão já usado em `_scripts/preparar_imagens.py`), espelhada horizontalmente para o espaço vazio cair à esquerda, e salva como arquivo único de alta resolução — `next/image` cuida do resto via a otimização já configurada em `next.config.ts`.

**Tech Stack:** Next.js 16 (App Router) + TypeScript + Tailwind v4 + Motion (Framer Motion) + Canvas2D nativo. Preparação de imagem: Python 3 + Pillow + requests (mesmo toolchain de `_scripts/preparar_imagens.py`).

---

### Task 1: Baixar e preparar a nova foto do hero

**Files:**
- Create: `_scripts/baixar_hero.py`
- Create (gerado pelo script): `public/imagens/hero-transmissao.jpg`
- Delete: `public/imagens/imagem_idate.jpg`, `public/imagens/imagem_idate_wide.jpg`, `public/imagens/hero.jpg`, `public/imagens/hero_wide.jpg`

Contexto: `_scripts/preparar_imagens.py` já existe no projeto como o pipeline padrão de preparo de imagem (corta proporção, remove selo de gerador de IA, gradeia). Ele foi desenhado para saídas do Gemini/Nano Banana (ver `docs/brief-imagens.md`) — a foto de barragem problemática (`imagem_idate.jpg`, com marca d'água "HIGGSFIELD AI") não passou por esse pipeline: nem o nome do arquivo bate com nenhum job em `TRABALHOS`, nem o formato (retrato 1280×1714) bate com o alvo `21/9` do job `hero.jpg`. Ela foi colocada direto em `public/imagens/`, pulando o pipeline inteiro.

Como a foto nova vem de um banco de imagens real (Unsplash), não há selo de gerador para remover nem grading a aplicar por detecção — só download em alta resolução e espelhamento horizontal. Por isso este é um script novo e simples, não uma alteração em `preparar_imagens.py`.

- [ ] **Step 1: Criar o script de download**

```python
"""
Baixa a foto do hero da home (Unsplash, licenca livre, sem exigencia de
credito) e espelha horizontalmente, porque o vazio atmosferico da foto
original fica a direita e o texto do hero entra pela esquerda.

Fonte: "a golden sun positioned behind a power pylon set within a misty
landscape", foto de Thilina Alagiyawanna, licenca Unsplash.
https://unsplash.com/photos/PlqFc5_17T4

Uso:
    python _scripts/baixar_hero.py
"""

from pathlib import Path

import requests
from PIL import Image, ImageOps

RAIZ = Path(__file__).resolve().parent.parent
DESTINO = RAIZ / "public" / "imagens" / "hero-transmissao.jpg"

URL = (
    "https://images.unsplash.com/photo-1783254917095-e909669ea8a8"
    "?fm=jpg&q=90&w=3840&auto=format&fit=crop"
)


def main() -> None:
    resposta = requests.get(URL, timeout=30)
    resposta.raise_for_status()

    caminho_bruto = RAIZ / "_brutos" / "hero-transmissao-original.jpg"
    caminho_bruto.parent.mkdir(parents=True, exist_ok=True)
    caminho_bruto.write_bytes(resposta.content)

    im = Image.open(caminho_bruto).convert("RGB")
    im = ImageOps.mirror(im)

    DESTINO.parent.mkdir(parents=True, exist_ok=True)
    im.save(DESTINO, "JPEG", quality=92, optimize=True, progressive=True)

    kb = DESTINO.stat().st_size // 1024
    print(f"{DESTINO.name}  {im.width}x{im.height}  {kb} KB")


if __name__ == "__main__":
    main()
```

- [ ] **Step 2: Rodar o script**

Run: `python _scripts/baixar_hero.py`
Expected: imprime `hero-transmissao.jpg  <largura>x<altura>  <NNN> KB`, com largura de vários milhares de pixels (não upscaled — se o Unsplash não tiver essa resolução, o `fit=crop` do imgix devolve o disponível, nunca amplia).

- [ ] **Step 3: Confirmar visualmente que a imagem salva não tem watermark e está espelhada corretamente**

Abrir `public/imagens/hero-transmissao.jpg` num visualizador de imagem. Confirmar: sem logo/marca d'água, sem texto sobreposto, o poste de transmissão aparece à direita do quadro (não ao centro), com a névoa/luz do amanhecer ocupando o espaço vazio à esquerda.

- [ ] **Step 4: Remover os arquivos antigos problemáticos**

```bash
rm public/imagens/imagem_idate.jpg public/imagens/imagem_idate_wide.jpg public/imagens/hero.jpg public/imagens/hero_wide.jpg
```

Expected: os 4 arquivos deixam de existir em `public/imagens/`. (Confirmado antes de rodar este plano que nenhum deles é referenciado em `content/*.ts` ou `app/**/*.tsx` além de `imagem_idate.jpg`, que a Task 2 vai desreferenciar.)

- [ ] **Step 5: Verificação**

Run: `ls public/imagens/`
Expected: contém `hero-transmissao.jpg`, `agua.jpg`, `terra.jpg`, `energia.jpg`, `instituto.jpg`, `arquivo.jpg` — não contém mais `imagem_idate*.jpg` nem `hero*.jpg` antigos.

---

### Task 2: Apontar `content/home.ts` para a nova imagem

**Files:**
- Modify: `content/home.ts:28-31`

- [ ] **Step 1: Editar o bloco `imagem`**

Trecho atual:

```ts
    imagem: {
      src: "/imagens/imagem_idate.jpg",
      alt: "Imagem de capa do IDATE",
    },
```

Substituir por:

```ts
    imagem: {
      src: "/imagens/hero-transmissao.jpg",
      alt: "Torre de transmissão de energia silhuetada contra o sol nascendo em meio à névoa baixa.",
    },
```

- [ ] **Step 2: Verificação**

Run: `npm run lint`
Expected: sem erros novos relacionados a `content/home.ts`.

---

### Task 3: Elevar o estado do pilar para fora de `HeroConteudo`

**Files:**
- Modify: `components/sections/hero-conteudo.tsx`

Hoje `hero-conteudo.tsx` declara `useState<IdPilar>` e o `useEffect` do ciclo automático internamente (linhas 56-57 e 71-86 do arquivo atual). Isso precisa subir para `Hero`, porque o novo componente `PilarGlowHero` (Task 4) também consome esse estado e vive como irmão de `HeroConteudo`, não como filho dele.

- [ ] **Step 1: Exportar o tipo e a ordem dos pilares**

Trecho atual (linha 56-57):

```ts
type IdPilar = keyof typeof DETALHES_PILARES;
const PILARES_ORDEM: IdPilar[] = ["agua", "terra", "energia"];
```

Substituir por:

```ts
export type IdPilar = keyof typeof DETALHES_PILARES;
export const PILARES_ORDEM: IdPilar[] = ["agua", "terra", "energia"];
```

- [ ] **Step 2: Remover o `useState`/`useEffect` locais e receber como props**

Trecho atual (linhas 69-86):

```tsx
export function HeroConteudo({ conteudo }: { conteudo: ConteudoHero }) {
  const { kicker, titulo, subtitulo, ctaPrimario, ctaSecundario } = conteudo;
  const [pilarSelecionado, setPilarSelecionado] = useState<IdPilar>("agua");
  const [pausado, setPausado] = useState(false);

  // Ciclo automático do radar a cada 4.5 segundos (pausa em hover/clique)
  useEffect(() => {
    if (pausado) return;

    const timer = setInterval(() => {
      setPilarSelecionado((atual) => {
        const proxIndice = (PILARES_ORDEM.indexOf(atual) + 1) % PILARES_ORDEM.length;
        return PILARES_ORDEM[proxIndice];
      });
    }, 4500);

    return () => clearInterval(timer);
  }, [pausado]);
```

Substituir por:

```tsx
export function HeroConteudo({
  conteudo,
  pilarSelecionado,
  setPilarSelecionado,
  pausado,
  setPausado,
}: {
  conteudo: ConteudoHero;
  pilarSelecionado: IdPilar;
  setPilarSelecionado: (pilar: IdPilar) => void;
  pausado: boolean;
  setPausado: (pausado: boolean) => void;
}) {
  const { kicker, titulo, subtitulo, ctaPrimario, ctaSecundario } = conteudo;
```

- [ ] **Step 3: Remover o import de `useState`/`useEffect`, que deixam de ser usados neste arquivo**

Trecho atual (linha 3):

```ts
import { useState, useEffect } from "react";
```

Remover a linha inteira — nenhum outro trecho de `hero-conteudo.tsx` usa esses hooks depois do Step 2.

- [ ] **Step 4: Verificação**

Run: `npm run lint`
Expected: `hero-conteudo.tsx` aponta erro de tipo em `Hero` (que ainda não passa as novas props) — esperado neste ponto, resolvido na Task 5. Não deve haver erro de import não usado nem de variável não usada dentro do próprio `hero-conteudo.tsx`.

---

### Task 4: Criar o componente `PilarGlowHero`

**Files:**
- Create: `components/ui/pilar-glow-hero.tsx`

Reaproveita a mesma abordagem de `components/ui/canvas-telemetria-pilar.tsx` (Canvas2D, `requestAnimationFrame`, resize por `ResizeObserver`-like via `window.resize`), mas com traçado esparso — poucas linhas finas, não uma grade/textura cheia — porque este componente vive dentro do véu escuro do hero, atrás do texto, não num cartão dedicado.

- [ ] **Step 1: Criar o arquivo**

```tsx
"use client";

import { useEffect, useRef } from "react";

export type IdPilarGlow = "agua" | "terra" | "energia";

interface PropsPilarGlowHero {
  pilar: IdPilarGlow;
  className?: string;
}

/**
 * Sinal ambiente do pilar ativo, desenhado dentro do véu escuro esquerdo do
 * hero. Mesma família de assinaturas do CanvasTelemetriaPilar, mas contida a
 * poucas linhas finas — reforça o pilar em foco sem competir com a foto.
 */
export function PilarGlowHero({ pilar, className = "" }: PropsPilarGlowHero) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animFrameId: number;
    let tempo = 0;

    const redimensionar = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    redimensionar();
    window.addEventListener("resize", redimensionar);

    const renderizar = () => {
      tempo += 0.015;
      const largura = canvas.width / (window.devicePixelRatio || 1);
      const altura = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, largura, altura);

      if (pilar === "agua") {
        // Três linhas horizontais com shimmer ondulado, subindo suavemente.
        for (let i = 0; i < 3; i++) {
          const baseY = altura * (0.28 + i * 0.22);
          ctx.beginPath();
          for (let x = 0; x <= largura; x += 8) {
            const y = baseY + Math.sin(x * 0.04 + tempo * 2 + i * 2) * 6;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          const fase = (Math.sin(tempo * 1.3 + i) + 1) / 2;
          ctx.strokeStyle = `rgba(91, 124, 255, ${0.12 + fase * 0.22})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      } else if (pilar === "terra") {
        // Curvas de nível lentas, quase estáticas.
        for (let i = 0; i < 3; i++) {
          const baseY = altura * (0.3 + i * 0.2);
          ctx.beginPath();
          for (let x = 0; x <= largura; x += 10) {
            const y = baseY + Math.sin(x * 0.015 + tempo * 0.4 + i) * 14;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = "rgba(91, 124, 255, 0.16)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      } else {
        // Energia: pulso viajando por linhas de fase.
        for (let i = 0; i < 3; i++) {
          const y = altura * (0.28 + i * 0.22);
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(largura, y);
          ctx.strokeStyle = "rgba(91, 124, 255, 0.1)";
          ctx.lineWidth = 1;
          ctx.stroke();

          const pulsoX = ((tempo * 70 + i * 60) % (largura + 60)) - 30;
          const grad = ctx.createRadialGradient(pulsoX, y, 0, pulsoX, y, 18);
          grad.addColorStop(0, "rgba(91, 124, 255, 0.55)");
          grad.addColorStop(1, "rgba(18, 54, 200, 0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(pulsoX, y, 18, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animFrameId = requestAnimationFrame(renderizar);
    };

    renderizar();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", redimensionar);
    };
  }, [pilar]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full pointer-events-none ${className}`}
    />
  );
}
```

- [ ] **Step 2: Verificação**

Run: `npm run lint`
Expected: sem erros em `components/ui/pilar-glow-hero.tsx`.

---

### Task 5: Ligar tudo em `Hero`

**Files:**
- Modify: `components/sections/hero.tsx`

- [ ] **Step 1: Reescrever o arquivo inteiro**

Conteúdo atual completo (para referência do que muda):

```tsx
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { HeroConteudo, type ConteudoHero } from "./hero-conteudo";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";

export function Hero({
  conteudo,
  rolagem = "Explorar",
}: {
  conteudo: ConteudoHero;
  /** Rótulo do indicador de rolagem. Muda por página. */
  rolagem?: string;
}) {
  const { imagem } = conteudo;

  return (
    <section className="relative isolate flex min-h-[100dvh] flex-col justify-end overflow-hidden">
      <div data-assenta className="absolute inset-0 -z-20">
        <Image
          src={imagem.src}
          alt={imagem.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-noite via-noite/80 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-noite via-noite/70 to-transparent"
      />

      <Container className="pb-16 pt-28 md:pb-24">
        <HeroConteudo conteudo={conteudo} />

        <div className="mt-16 flex items-center gap-3 text-fumaca/70">
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em]">
            {rolagem}
          </span>
          <div className="flex h-6 w-6 animate-bounce items-center justify-center rounded-full border border-fio text-cobalto-claro">
            <CaretDown size={12} weight="bold" />
          </div>
        </div>
      </Container>
    </section>
  );
}
```

Substituir pelo conteúdo completo abaixo:

```tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { HeroConteudo, type ConteudoHero, type IdPilar, PILARES_ORDEM } from "./hero-conteudo";
import { PilarGlowHero } from "@/components/ui/pilar-glow-hero";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";

export function Hero({
  conteudo,
  rolagem = "Explorar",
}: {
  conteudo: ConteudoHero;
  /** Rótulo do indicador de rolagem. Muda por página. */
  rolagem?: string;
}) {
  const { imagem } = conteudo;
  const [pilarSelecionado, setPilarSelecionado] = useState<IdPilar>("agua");
  const [pausado, setPausado] = useState(false);

  // Ciclo automático do radar a cada 4.5 segundos (pausa em hover/clique).
  // Vive aqui, não em HeroConteudo, porque PilarGlowHero também consome
  // pilarSelecionado e é irmão de HeroConteudo, não filho dele.
  useEffect(() => {
    if (pausado) return;

    const timer = setInterval(() => {
      setPilarSelecionado((atual) => {
        const proxIndice = (PILARES_ORDEM.indexOf(atual) + 1) % PILARES_ORDEM.length;
        return PILARES_ORDEM[proxIndice];
      });
    }, 4500);

    return () => clearInterval(timer);
  }, [pausado]);

  return (
    <section className="relative isolate flex min-h-[100dvh] flex-col justify-end overflow-hidden">
      {/*
        `data-assenta` roda a animação de assentamento definida em globals.css:
        a foto entra 6% maior e recua, como câmera estabilizando depois do
        corte. Fica no invólucro e não na <Image> porque o next/image controla
        o próprio transform de posicionamento.

        O filtro CSS corrige o tom da fonte (amanhecer quente) para o registro
        frio do site, sem reprocessar o arquivo de origem — mesmo raciocínio
        dos véus gradiente abaixo: o tratamento vive em código, não na imagem.
      */}
      <div data-assenta className="absolute inset-0 -z-20">
        <Image
          src={imagem.src}
          alt={imagem.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover [filter:saturate(0.7)_hue-rotate(155deg)_brightness(0.82)]"
        />
      </div>

      {/*
        Dois véus, ambos funcionais e não decorativos. O horizontal escurece o
        lado esquerdo, onde o texto vive, aproveitando que a fotografia já é
        vazia e escura ali. O vertical garante o contraste do bloco de texto
        contra o campo, que na base do quadro tem trilhas mais claras.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-noite via-noite/80 to-transparent"
      />

      {/*
        Camada generativa: linhas finas reativas ao pilar em foco, contidas à
        faixa esquerda onde o véu acima já está opaco — nunca cobre a foto
        inteira, só reforça a zona que já é escura por composição.
      */}
      <div aria-hidden="true" className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden sm:w-[60%]">
        <PilarGlowHero pilar={pilarSelecionado} />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-noite via-noite/70 to-transparent"
      />

      <Container className="pb-16 pt-28 md:pb-24">
        <HeroConteudo
          conteudo={conteudo}
          pilarSelecionado={pilarSelecionado}
          setPilarSelecionado={setPilarSelecionado}
          pausado={pausado}
          setPausado={setPausado}
        />

        <div className="mt-16 flex items-center gap-3 text-fumaca/70">
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.2em]">
            {rolagem}
          </span>
          <div className="flex h-6 w-6 animate-bounce items-center justify-center rounded-full border border-fio text-cobalto-claro">
            <CaretDown size={12} weight="bold" />
          </div>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Atualizar as chamadas de `setPilarSelecionado`/`setPausado` dentro de `hero-conteudo.tsx` para bater com a assinatura de props**

Em `components/sections/hero-conteudo.tsx`, os pontos que já chamam `setPilarSelecionado`/`setPausado` (no `onMouseEnter`/`onMouseLeave` do bloco `motion.div` e no `onClick` de cada botão de pilar) continuam funcionando sem alteração de código — eles chamam as funções recebidas via props com a mesma assinatura (`(valor) => void`) que antes vinha do `useState` local. Nenhuma edição adicional é necessária além da Task 3.

- [ ] **Step 3: Verificação de tipos e lint**

Run: `npm run lint`
Expected: sem erros em `hero.tsx` nem `hero-conteudo.tsx`.

Run: `npx tsc --noEmit`
Expected: sem erros de tipo no projeto.

---

### Task 6: Build e checagem visual

**Files:** nenhum (só verificação)

- [ ] **Step 1: Build de produção**

Run: `npm run build`
Expected: build completa sem erros. Confirma que `next/image` consegue processar `hero-transmissao.jpg` (formato JPEG válido, dimensões razoáveis).

- [ ] **Step 2: Rodar os testes existentes**

Run: `npm test`
Expected: todos os testes em `lib/*.test.ts` continuam passando (nenhuma mudança de lógica de dados nesta plan).

- [ ] **Step 3: Subir o servidor de dev e checar visualmente**

Run: `npm run dev`

Abrir `http://localhost:3000` e conferir:
- Hero carrega a nova foto, nítida, sem marca d'água, sem esticar/pixelizar.
- O véu esquerdo mostra linhas finas animadas, mudando de padrão a cada troca de pilar (a cada 4,5s, ou ao clicar num pilar no cartão abaixo).
- Redimensionar a janela (mobile/tablet/desktop): a foto continua cobrindo bem, o texto permanece legível.
- Passar o mouse sobre o cartão de pilares: a rotação automática pausa (mesmo comportamento de antes).
- No DevTools, ativar "reduzir movimento" (emulação de `prefers-reduced-motion`) e confirmar que as animações do site (inclusive a nova) reduzem conforme o restante do site já faz.

- [ ] **Step 4: Confirmar que os arquivos de imagem antigos não deixaram referência quebrada**

Run: `npx tsc --noEmit && npm run lint`
Expected: nenhum erro relacionado a imports de arquivos de imagem inexistentes (Next.js só resolve `src` de `<Image>` em runtime, então isso é principalmente uma checagem visual — nenhum 404 no console do navegador para `/imagens/imagem_idate.jpg`, `/imagens/hero.jpg`, `/imagens/hero_wide.jpg` ou `/imagens/imagem_idate_wide.jpg`).

---

## Fora de escopo (registrado, não implementado nesta plan)

- Imagens `agua.jpg`, `terra.jpg`, `energia.jpg` (usadas em `/denuncia`) têm o mesmo problema de baixa resolução, mas já seguem o brief de imagens e não têm marca d'água visível — não fazem parte deste fix.
- O cartão pequeno com `CanvasTelemetriaPilar` dentro de `HeroConteudo` continua como está (grade cheia, 30% opacidade) — reforça em close-up o mesmo sinal que a nova camada ambiente mostra de longe. Se, depois de ver os dois juntos ao vivo, a dupla parecer redundante ou poluída, simplificar é um ajuste de acabamento, não uma nova plan.
