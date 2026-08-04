# Briefing de imagens — site IDATE

Para geração no Gemini (Nano Banana) ou equivalente. Mesmo fluxo que funcionou na marca: você gera, eu integro.

---

## A linha que não atravessamos

**Nada de pessoas apresentadas como equipe, clientes ou parceiros do IDATE.**

Rosto gerado numa seção de "corpo técnico" faz o visitante acreditar que aquelas pessoas existem e trabalham no instituto. Se alguém procurar e não achar, o dano cai exatamente sobre o único ativo que o instituto vende, que é credibilidade técnica. Não vale o risco, e não é necessário.

**E não é necessário porque a alternativa é melhor.** Água, terra e energia são visualmente magníficos em escala industrial. Linha de transmissão, estação de tratamento, lavra, pivô de irrigação, arquivo de documentos. Isso representa exatamente o que o texto do instituto diz, não afirma nada falso sobre ninguém, e é muito mais interessante que executivo em sala de vidro — que é o estoque genérico do qual estamos fugindo.

A referência do próprio Meirelles IPC confirma: o hero de lá é fibra óptica em bokeh, sem uma pessoa sequer, e funciona.

---

## Direção fotográfica comum a todas

Todas as imagens compartilham o mesmo tratamento, senão o site vira colagem:

- **Tonalidade petróleo escuro**, azul-esverdeado profundo e dessaturado.
- **Exposição escura no geral**, com uma única fonte de luz criando profundidade.
- **Névoa atmosférica**, haze, ar visível. Profundidade por camadas, não por foco.
- **Registro editorial**, médio formato, grão fino natural. Nunca stock corporativo brilhante.
- **Sem pessoas, sem texto, sem logo, sem marca d'água.**
- **Área vazia deliberada** para o texto entrar por cima. Cada prompt diz onde.

Sufixo para colar no fim de todo prompt:

```
Deep petrol teal and desaturated navy color grade, dark overall exposure,
atmospheric haze, editorial medium-format photography, fine natural film
grain, cinematic depth. No people, no text, no logos, no watermarks, no
lens flare, no oversaturation.
```

---

## 1. Hero da home

Formato **21:9**, uso full-bleed com overlay escuro por cima. A imagem mais importante do site.

```
Cinematic wide aerial photograph of high-voltage electricity transmission
towers marching across vast open Brazilian farmland at blue hour. The
towers recede into deep atmospheric haze toward the horizon. A faint
luminous band of remaining daylight sits low in the sky; everything else
falls into darkness. Shot from high altitude, slightly oblique angle.

Composition: the left 40 percent of the frame is nearly empty dark land and
sky, reserved for a headline overlay. The towers occupy the right side and
lead the eye toward the horizon.

Deep petrol teal and desaturated navy color grade, dark overall exposure,
atmospheric haze, editorial medium-format photography, fine natural film
grain, cinematic depth. No people, no text, no logos, no watermarks, no
lens flare, no oversaturation.
```

---

## 2, 3, 4. Os três eixos

Formato **3:2** cada. Aparecem lado a lado na home e em tamanho grande em `/atuacao`. Precisam funcionar como conjunto: mesmo horário, mesma altura de câmera, mesma densidade de névoa.

### Água

```
Cinematic elevated photograph of a large industrial water treatment facility
at dawn. Circular clarifier tanks and rectangular basins form a geometric
pattern of dark water and concrete. Thin mist hangs over the surface. The
water is almost black, reflecting a pale sky.

Composition: strong overhead geometry, the tanks reading as abstract shapes
rather than as machinery.

Deep petrol teal and desaturated navy color grade, dark overall exposure,
atmospheric haze, editorial medium-format photography, fine natural film
grain, cinematic depth. No people, no text, no logos, no watermarks, no
lens flare, no oversaturation.
```

### Terra

```
Cinematic aerial photograph of an open-pit mine at dusk, the terraced
benches spiraling down in concentric rings. The excavated rock walls are
dark and stratified, each layer a different age. Deep shadow fills the
bottom of the pit. Dust haze softens the far rim.

Composition: the terraces read as geological strata, layers of time stacked
on top of each other.

Deep petrol teal and desaturated navy color grade, dark overall exposure,
atmospheric haze, editorial medium-format photography, fine natural film
grain, cinematic depth. No people, no text, no logos, no watermarks, no
lens flare, no oversaturation.
```

### Energia

```
Cinematic photograph of a hydroelectric dam spillway at night, seen from
below and to the side. Enormous concrete structure, water falling in heavy
sheets, spray suspended in the air. A few cold industrial lights pick out
edges of the concrete; everything else is in shadow.

Composition: the scale of the concrete dominates, the human-made mass
against moving water.

Deep petrol teal and desaturated navy color grade, dark overall exposure,
atmospheric haze, editorial medium-format photography, fine natural film
grain, cinematic depth. No people, no text, no logos, no watermarks, no
lens flare, no oversaturation.
```

---

## 5. Seção "Patrimônio Invisível"

Formato **16:9**. Textura de fundo atrás do texto, com opacidade baixa. Esta é a imagem que carrega o conceito central.

```
Extreme close-up photograph of a single sheet of thick cotton paper held up
against a light source, revealing an embedded watermark pattern that is
invisible in normal light. The paper fills the entire frame. The light
passes through unevenly, showing the fiber structure of the sheet.

Composition: almost abstract, the watermark barely legible, the texture of
the fibers dominant.

Deep petrol teal and desaturated navy color grade, dark overall exposure,
editorial medium-format photography, fine natural film grain. No people, no
text, no logos, no watermarks added, no lens flare, no oversaturation.
```

Nota: a marca d'água aqui é o objeto fotografado, não é marca d'água de gerador. Se o modelo se confundir e estampar logo, regenere.

---

## 6. Metodologia

Formato **3:2**. Cabeçalho da página `/metodologia`.

```
Cinematic photograph of a vast archive of bound legal volumes on steel
shelving, receding into darkness. Only the nearest shelves are lit; the
depth of the room disappears into shadow. The spines are worn, uniform,
anonymous.

Composition: strong one-point perspective down the aisle, the far end
unresolved.

Deep petrol teal and desaturated navy color grade, dark overall exposure,
atmospheric haze, editorial medium-format photography, fine natural film
grain, cinematic depth. No people, no text, no logos, no watermarks, no
lens flare, no oversaturation.
```

---

## 7. Instituto

Formato **3:2**. Cabeçalho da página `/instituto`.

```
Cinematic photograph of irrigation pivots on agricultural land seen from
directly overhead at low sun, the circular fields forming a geometric
pattern across the landscape. Long shadows from the pivot structures cut
across the circles. Dry haze in the atmosphere.

Composition: flat overhead abstraction, the circles reading as a diagram of
land use rather than as scenery.

Deep petrol teal and desaturated navy color grade, dark overall exposure,
atmospheric haze, editorial medium-format photography, fine natural film
grain, cinematic depth. No people, no text, no logos, no watermarks, no
lens flare, no oversaturation.
```

---

## Como avaliar o que voltar

1. **Escureça mentalmente mais 30 por cento.** Toda imagem vai receber overlay escuro para o texto ficar legível. Se ela já está no limite da leitura, depois do overlay some.
2. **Tem gente?** Descarte. Mesmo ao fundo, mesmo desfocado.
3. **Tem texto, placa, logo ou marca d'água?** Descarte.
4. **Está saturada ou alegre?** Descarte. O registro é grave.
5. **As três dos eixos parecem da mesma sessão?** Se uma está em pleno sol e outra à noite, o conjunto quebra. Regenere a discrepante.
6. **Tem área vazia onde o texto entra?** No hero isso é obrigatório.

---

## Onde salvar

Gere na maior resolução disponível e salve em `D:\Idate\public\imagens\` com estes nomes exatos:

| Arquivo | Formato | Onde entra |
|---|---|---|
| `hero.jpg` | 21:9 | Home, full-bleed |
| `agua.jpg` | 3:2 | Home e `/atuacao` |
| `terra.jpg` | 3:2 | Home e `/atuacao` |
| `energia.jpg` | 3:2 | Home e `/atuacao` |
| `marca-dagua.jpg` | 16:9 | Seção Patrimônio Invisível |
| `arquivo.jpg` | 3:2 | `/metodologia` |
| `terra-cultivada.jpg` | 3:2 | `/instituto` |

Eu converto para AVIF e WebP, gero os tamanhos responsivos e ligo tudo via `next/image` com `priority` no hero.

---

## Se preferir não gerar

Alternativa legítima e mais rápida: banco de imagem real. Unsplash e Pexels têm material excelente de infraestrutura industrial sob licença livre, e foto real de instalação real é mais honesta que geração. Me diga e eu levanto as opções com os links.

Enquanto não houver imagem definitiva, eu monto o layout com placeholder no formato exato de cada slot, para você já ver a composição funcionando.
