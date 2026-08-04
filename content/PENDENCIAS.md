# Pendências — IDATE

O site foi construído sem nenhum dado inventado. Estudos, métricas, casos,
equipe e contato **não existem** porque não foram fornecidos, e inventá-los
criaria risco de credibilidade desproporcional para um instituto cuja tese é
autoridade técnica.

Essa regra endureceu com o reposicionamento: um observatório com estudo
fabricado é pior do que um observatório vazio, porque qualquer leitor que
consulte duas fontes percebe — e o dano cai sobre o único ativo do instituto.

---

## Bloqueia a publicação

### Dados institucionais

| Item | Onde entra | Arquivo |
|---|---|---|
| E-mail institucional | Rodapé, resposta do formulário | `content/site.ts` → `INSTITUCIONAL.email` |
| Telefone | Rodapé | `content/site.ts` → `INSTITUCIONAL.telefone` |
| Endereço | Rodapé | `content/site.ts` → `INSTITUCIONAL.endereco` |
| CNPJ | Rodapé | `content/site.ts` → `INSTITUCIONAL.cnpj` |
| Domínio definitivo | Metadados, Open Graph | `content/site.ts` → `SITE.url` |
| SVG vetorial da marca | Header, rodapé, favicon | `components/layout/marca.tsx` |

### Envio de e-mail

| Item | Onde entra |
|---|---|
| `RESEND_API_KEY` | `.env.local` |
| `CONTATO_DESTINO` | `.env.local` |
| `CONTATO_REMETENTE` | `.env.local` (remetente verificado no Resend) |

Sem estas variáveis o formulário retorna erro explícito. Por decisão de projeto,
ele nunca finge sucesso — um canal de denúncias que engole a submissão em
silêncio é pior do que um canal fora do ar, porque a pessoa acredita ter
comunicado e não comunicou.

### LGPD — bloqueia a Central de Denúncias

Denúncias contêm dados pessoais de quem comunica **e de terceiros denunciados**,
que não consentiram e podem nem saber que foram citados. Antes de publicar
`/denuncia/nova`, é preciso definir:

| Item | Por quê |
|---|---|
| Base legal do tratamento | Legítimo interesse e interesse público têm requisitos distintos |
| Política de privacidade publicada | Exigível e hoje inexistente no site |
| Política de retenção | Por quanto tempo uma comunicação arquivada permanece armazenada |
| Tratamento de dados de terceiros | Como o instituto lida com pessoas e empresas citadas |
| Regra de sigilo do denunciante | Especialmente em comunicação identificada com risco de retaliação |
| Encarregado (DPO) | Contato obrigatório para titulares |

Isto não é formalidade: é exposição jurídica direta, e mais ainda para um
instituto de direito.

---

## Funcionalidades previstas e ainda não implementadas

| Item | Estado | Depende de |
|---|---|---|
| Anexo de documentos, fotos, contratos e contas | Não implementado | Storage de arquivos (Vercel Blob, S3 ou Supabase) |
| Consulta de protocolo (`/denuncia/acompanhar`) | Não implementado | Banco de dados — o protocolo é gerado, mas não é persistido |
| Status da investigação | Não implementado | Banco de dados + fluxo interno de triagem |
| Classificação automática por IA | Não implementado | Base de dados com volume + definição de critérios |

O formulário atual declara essas ausências ao usuário em vez de escondê-las:
ver `avisoAnexos` em `content/denuncia.ts` e o aviso de protocolo em
`components/sections/formulario-denuncia.tsx`.

---

## Conteúdo dos observatórios

Os 8 observatórios têm escopo e agenda de pesquisa declarados, e **nenhuma
publicação**. O acervo é o que vai ocupar a maior parte do site.

| Item | Onde entra |
|---|---|
| Acervo da IMEPPI (estudos e pesquisas já produzidos) | `content/publicacoes.ts` → `PUBLICACOES` |
| Corpo técnico (nomes, cargos, formação) | Nova seção em `/instituto` |
| Estatuto ou documento constitutivo | Nova seção em `/instituto` |

O modelo em `content/publicacoes.ts` já aceita os 9 tipos de publicação com
autoria, data, tags e PDF. Incorporar o acervo é preenchimento, não
reengenharia: basta acrescentar objetos ao array.

Promover um observatório de `constituicao` para `ativo` em
`content/observatorios.ts` só depois que houver publicação real indexada.

---

## Imagens

| Item | Onde entra |
|---|---|
| Hero próprio da Central de Denúncias | `content/denuncia.ts` → `hero.imagem` (hoje usa `arquivo.jpg`, emprestada de `/metodologia`) |
| Imagem Open Graph 1200×630 | `app/opengraph-image.png` |

A Central e a home não podem abrir com a mesma fotografia e o mesmo ritmo: o
visitante lê como se tivesse clicado errado. Ver `docs/brief-imagens.md`.

---

## O que deliberadamente não existe

Não incluir sem discussão prévia: valores recuperados, número de denúncias
recebidas, número de casos resolvidos, anos de atuação, depoimentos, logos de
instituições parceiras, selos, certificações ou prêmios.

Vale também para os observatórios: nenhum indicador, série histórica ou
conclusão entra sem fonte verificável e autoria declarada.
