# Hero da home — imagem real + camada generativa reativa — Design

**Data:** 2026-08-03
**Status:** aprovado
**Projeto:** IDATE — Instituto dos Direitos da Água, Terra e Energia

---

## 1. Contexto e problema

O hero da home (`components/sections/hero.tsx` + `hero-conteudo.tsx`) usa hoje `public/imagens/imagem_idate.jpg`: uma foto de barragem gerada por IA (Higgsfield), em retrato (1280×1714px), com uma marca d'água visível "HIGGSFIELD AI" no canto inferior direito. A imagem é renderizada com `next/image` `fill` + `sizes="100vw"` numa seção `min-h-[100dvh]` de largura total — em qualquer tela acima de ~1280px lógicos (a maioria dos desktops, pior em retina/4K) o navegador amplia a imagem além da resolução original, produzindo a perda de nitidez percebida como "má qualidade".

O projeto já tem um brief de imagens (`docs/brief-imagens.md`) que definia o hero como **torres de transmissão sobre fazenda ao entardecer, 21:9, full-bleed, com os 40% esquerdos vazios para o título**. As três imagens dos eixos (água/terra/energia, hoje usadas em `/denuncia`) seguem esse brief à risca. Só o hero divergiu — foi substituído numa sessão posterior sem seguir o brief nem a regra do próprio documento ("no watermarks").

Adicionalmente, o site já tem um motor de visualização generativa (`components/ui/canvas-telemetria-pilar.tsx`) que desenha três assinaturas distintas por pilar (água = matriz ASCII fluida, terra = curvas de nível, energia = pulso elétrico), hoje restrito a um cartão pequeno e secundário dentro do bloco de conteúdo do hero, a 30% de opacidade. Esse motor é a peça que resolve a intenção do usuário de tornar os três pilares "mais claros e representativos, sem precisar explicar" — só precisa ganhar espaço na composição.

---

## 2. Decisões (validadas em conversa, incluindo comparação visual)

| Decisão | Escolha |
|---|---|
| Abordagem técnica de animação | Ao vivo no navegador, com o stack já existente (Motion + Canvas2D). Sem Remotion, sem pipeline de vídeo — nenhuma dependência nova. |
| Hero mantém fotografia? | Sim — foto real como base emocional/documental, com camada generativa sutil por cima (não 100% abstrato). |
| Tratamento da camada generativa | **Opção C** da comparação visual: linhas finas e reativas nascendo dentro do véu escuro que já existe à esquerda do hero (onde o texto vive), não uma textura full-bleed sobre a foto inteira. Sincronizada ao mesmo estado que já alterna os 3 pilares no cartão inferior — os dois lugares mostram sempre o mesmo pilar ativo, reforçando o sinal em vez de competir com ele. |
| Origem da nova foto | Banco de imagens livre de direitos (Unsplash), não geração por IA — elimina de vez o risco de marca d'água/artefato. |
| Foto escolhida | **Foto B**: torre de transmissão silhuetada contra sol nascendo em névoa baixa, por Thilina Alagiyawanna (Unsplash, licença livre, sem exigência de crédito). Já é ampla (2400×1599, próxima de 21:9), já tem névoa atmosférica real (não precisa ser simulada), já tem espaço vazio generoso — hoje à direita, por isso **espelhada horizontalmente** para o vazio cair à esquerda, onde o overlay de texto já é desenhado. Grade de cor original é quente (nascer do sol); aplicamos ajuste de tom pro frio via CSS (`filter`), não reprocessamento do arquivo — mesmo mecanismo que os dois véus gradiente já existentes em `hero.tsx`. |
| Foto alternativa (reserva) | Foto C — grade de torres cruzando terra cultivada, céu aberto, Bernd Dittrich (Unsplash) — se a foto B não performar bem em teste real no layout. |
| Resolução | Um único arquivo-fonte em alta resolução (o maior disponível no Unsplash para essa foto, tipicamente vários milhares de px de largura). `next/image` com otimização já ativa em `next.config.ts` gera os tamanhos responsivos automaticamente — **não** recriamos os arquivos duplicados `hero.jpg`/`hero_wide.jpg`/`imagem_idate_wide.jpg` que existem hoje. |
| Fora de escopo | As imagens água/terra/energia usadas em `/denuncia` (mesmo tipo de problema de resolução, mas já seguem o brief e não são o hero da home). Registrado para follow-up separado, não tocado agora. |

Essa direção — infraestrutura industrial sóbria, sem apelo ambiental (sem folha, gota d'água, painel solar, turbina eólica) — está alinhada ao anti-default já registrado no spec original do site (`2026-07-28-site-institucional-idate-design.md`), que baniu explicitamente iconografia "ambiental/ESG" por reforçar uma leitura errada do nome do instituto.

---

## 3. O que muda, arquivo por arquivo

### `public/imagens/`
- Novo arquivo de foto (nome a definir, ex. `hero-transmissao.jpg`), baixado do Unsplash na maior resolução disponível, espelhado horizontalmente.
- Remover `imagem_idate.jpg`, `imagem_idate_wide.jpg`, `hero.jpg`, `hero_wide.jpg` (duplicatas do arquivo problemático, nenhuma reaproveitável).

### `content/home.ts`
- `hero.imagem.src` aponta para o novo arquivo.
- `hero.imagem.alt` deixa de ser genérico ("Imagem de capa do IDATE") e passa a descrever a cena real (torre de transmissão em névoa ao amanhecer).

### `components/sections/hero.tsx`
- Estado `pilarSelecionado` (hoje declarado dentro de `HeroConteudo`) sobe para `Hero`, que passa tanto para `HeroConteudo` (cartão + seletores, inalterados na lógica) quanto para o novo componente de camada generativa.
- Novo componente renderizado dentro da `div` do véu escuro esquerdo existente (a mesma que hoje só tem o gradiente `from-noite via-noite/80 to-transparent`), com as 3 assinaturas por pilar reescritas na linguagem "linhas finas subindo/cruzando dentro do véu" (Opção C), não a grade ASCII/contorno cheia usada no cartão pequeno.
- Ajuste do `filter` CSS na `<Image>` para a correção de tom frio da foto B.

### `components/sections/hero-conteudo.tsx`
- Recebe `pilarSelecionado`/`setPilarSelecionado` como props em vez de declarar o `useState` localmente. Lógica de ciclo automático (4,5s) e pausa em hover permanece igual, só muda de dono.
- Cartão pequeno com `CanvasTelemetriaPilar` (grade cheia, 30% opacidade) continua existindo como está — reforço em close-up do mesmo sinal que agora também aparece ambient no fundo do hero.

### `components/ui/canvas-telemetria-pilar.tsx`
- Não é alterado. Um novo componente irmão (não uma modificação deste) implementa a variação "linha fina no véu" da Opção C, reaproveitando as mesmas fórmulas de onda/curva/pulso já validadas aqui, mas com traçado mais esparso e contido a uma faixa estreita.

---

## 4. Testes e verificação

Não há testes de componente no projeto hoje (`lib/*.test.ts` cobre só schemas/paleta/contraste) — nenhum teste novo é necessário para este trabalho, que é visual/apresentação. Verificação é manual:

- `npm run dev`, conferir o hero em mobile/tablet/desktop/wide (breakpoints já usados no resto do site).
- Confirmar que `prefers-reduced-motion` desliga a camada generativa nova do mesmo jeito que já desliga o resto (via CSS, não JS — mesma técnica já documentada em `globals.css`).
- Confirmar contraste do texto sobre a nova foto (a regra do projeto já valida AA/AAA contra `--color-noite`; o véu escuro precisa continuar escurecendo o suficiente para o texto ler).
- `npm run lint` e `npm test` (schemas/paleta) continuam passando — nenhuma mudança de lógica de dados.

---

## 5. Riscos conhecidos

- Foto B pode não funcionar tão bem quanto o mockup sugeriu depois de integrada no layout real (texto por cima, tamanho de tela variado) — foto C é o plano B já validado, troca é só o arquivo-fonte.
- Espelhar a foto (para o vazio cair à esquerda) inverte a direção da luz/composição original — aceitável para este uso (infraestrutura, sem elemento assimétrico óbvio como texto ou logo na cena), mas vale checar visualmente depois de baixada em resolução real.
