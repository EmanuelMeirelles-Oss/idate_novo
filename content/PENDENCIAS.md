# Pendências — IDATE

O site foi construído sem nenhum dado inventado. Estudos, métricas, casos,
equipe e contato **não existem** porque não foram fornecidos, e inventá-los
criaria risco de credibilidade desproporcional para um instituto cuja tese é
autoridade técnica.

Essa regra endureceu com o reposicionamento: um observatório com estudo
fabricado é pior do que um observatório vazio, porque qualquer leitor que
consulte duas fontes percebe — e o dano cai sobre o único ativo do instituto.

---

# Pendências & Status de Implementação — IDATE

Este documento mapeia o estado de conformidade, itens concluídos e pendências que dependem exclusivamente de credenciais ou insumos externos do instituto.

---

## 1. Itens Resolvidos

| Item | Solução Implementada | Arquivo / Rota |
|---|---|---|
| **Política de Privacidade & LGPD** | Política de privacidade formal publicada (legítimo interesse, sigilo da fonte, canal do DPO) | `app/privacidade/page.tsx` & `content/privacidade.ts` |
| **Open Graph Dinâmico (1200×630)** | Geração dinâmica de card social com branding IDATE e metadados institucionais | `app/opengraph-image.tsx` |
| **Hub do Radar Regulatório** | Página dedicada de vigilância semanal, histórico de ciclos e triagem metodológica | `app/radar/page.tsx` & `content/radar.ts` |
| **Automação Contínua (Claude/CI-CD)** | Pipeline de ingestão, script validador, webhook seguro e GitHub Action | `docs/automacao-radar-claude.md`, `_scripts/ingest-radar.mjs`, `app/api/radar/ingest/route.ts` |
| **Acervo e Leitura Dedicada** | 6 publicações reais cadastradas com fundamentação legal, ficha ABNT e leitura completa | `content/publicacoes.ts` & `app/biblioteca/[slug]/page.tsx` |
| **Promoção de Observatórios Ativos** | 4 observatórios promovidos para `ativo` (*Energia*, *Recursos Minerais*, *Águas*, *Tarifas Públicas*) | `content/observatorios.ts` |
| **SEO Estruturado & Sitemaps** | Sitemap dinâmico (`sitemap.xml`), `robots.txt` e JSON-LD (`NGO`) | `app/sitemap.ts`, `app/robots.ts`, `app/layout.tsx` |

---

## 2. Insumos Externos Pendentes (Fornecimento pelo Instituto)

Estes itens não dependem de engenharia de software — apenas de dados cadastrais oficiais e contratação de provedor pelo IDATE:

| Item | Onde entra | Estado |
|---|---|---|
| **E-mail Institucional Definitivo** | `content/site.ts` → `INSTITUCIONAL.email` | Aguarda definição da diretoria |
| **Telefone / Endereço / CNPJ** | `content/site.ts` → `INSTITUCIONAL.telefone/cnpj` | Aguarda registro formal em cartório |
| **Chave do Resend (`RESEND_API_KEY`)** | `.env.local` e Vercel Environment Variables | Aguarda criação de conta no provedor |
| **E-mail de Destino das Denúncias** | `.env.local` → `CONTATO_DESTINO` | Aguarda e-mail da ouvidoria/triagem |
| **Domínio Definitivo (`idate.org.br`)** | `content/site.ts` → `SITE.url` e Vercel Domains | Aguarda apontamento DNS |

---

## 3. Funcionalidades Futuras (Backlog de Expansão)

| Item | Estado | Requisitos |
|---|---|---|
| Storage de Anexos (PDFs de denúncias) | Previsto | Integração com Vercel Blob / AWS S3 |
| Painel de Consulta de Protocolo (`/denuncia/acompanhar`) | Previsto | Banco de dados relacional (PostgreSQL / Supabase) |
| Novas Notas Técnicas dos Observatórios em Constituição | Contínuo | Produção técnica pelos pesquisadores do instituto |

