"use client";

import { useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { FORMULARIO_DENUNCIA as T } from "@/content/denuncia";
import { EIXOS_DENUNCIA, UFS, VINCULOS } from "@/lib/denuncia-schema";
import { CheckCircle, Warning } from "@phosphor-icons/react";

type Erros = Record<string, string>;
type Estado = "editando" | "enviando" | "enviado";

const CAMPO =
  "mt-2 w-full rounded-md border border-fio bg-noite/60 px-4 py-3 text-base text-osso placeholder:text-fumaca/60 transition-colors focus:border-cobalto-claro focus:outline-none focus-visible:ring-2 focus-visible:ring-cobalto-claro/40 aria-[invalid=true]:border-cobalto-claro";

/**
 * Props de acessibilidade de um campo, calculadas num só lugar.
 *
 * O ponto crítico é o `aria-describedby`: sem ele o leitor de tela anuncia o
 * rótulo e o estado inválido, mas não lê a mensagem que explica o erro — a
 * pessoa sabe que errou e não sabe o quê. Ligar os dois é o que satisfaz o
 * critério 3.3.1 de fato, e não só na aparência.
 */
function aria(nome: string, erro?: string, temAjuda = false) {
  const descritores = [
    temAjuda ? `${nome}-ajuda` : null,
    erro ? `${nome}-erro` : null,
  ].filter(Boolean);

  return {
    id: nome,
    name: nome,
    "aria-invalid": erro ? true : undefined,
    "aria-describedby": descritores.length
      ? descritores.join(" ")
      : undefined,
  } as const;
}

function Rotulo({
  htmlFor,
  children,
  obrigatorio,
}: {
  htmlFor: string;
  children: React.ReactNode;
  obrigatorio?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-semibold tracking-tight text-osso"
    >
      {children}
      {obrigatorio && (
        /* Marca visual e textual. `sr-only` porque "*" sozinho não é lido. */
        <span className="ml-1 text-cobalto-claro">
          *<span className="sr-only"> (obrigatório)</span>
        </span>
      )}
    </label>
  );
}

function Ajuda({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-2 text-sm leading-relaxed text-fumaca">
      {children}
    </p>
  );
}

function Erro({ id, mensagem }: { id: string; mensagem?: string }) {
  if (!mensagem) return null;
  return (
    <p
      id={id}
      className="mt-2 flex items-start gap-2 text-sm text-cobalto-claro"
    >
      <Warning size={16} weight="fill" className="mt-0.5 shrink-0" />
      {mensagem}
    </p>
  );
}

function Secao({
  rotulo,
  descricao,
  children,
}: {
  rotulo: string;
  descricao: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="border-t border-fio pt-10">
      <legend className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-cobalto-claro">
        {rotulo}
      </legend>
      <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-fumaca">
        {descricao}
      </p>
      <div className="mt-8 space-y-8">{children}</div>
    </fieldset>
  );
}

export function FormularioDenuncia({ eixoInicial }: { eixoInicial?: string }) {
  const [estado, setEstado] = useState<Estado>("editando");
  const [erros, setErros] = useState<Erros>({});
  const [erroGeral, setErroGeral] = useState<string | null>(null);
  const [anonimo, setAnonimo] = useState(false);
  const [protocolo, setProtocolo] = useState<string | null>(null);
  const resumoErros = useRef<HTMLDivElement>(null);

  const eixoPadrao = EIXOS_DENUNCIA.some((e) => e.valor === eixoInicial)
    ? eixoInicial
    : undefined;

  async function enviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setEstado("enviando");
    setErros({});
    setErroGeral(null);

    const dados = new FormData(evento.currentTarget);
    const corpo = {
      anonimo,
      nome: String(dados.get("nome") ?? ""),
      email: String(dados.get("email") ?? ""),
      telefone: String(dados.get("telefone") ?? ""),
      vinculo: String(dados.get("vinculo") ?? ""),
      eixo: String(dados.get("eixo") ?? ""),
      assunto: String(dados.get("assunto") ?? ""),
      descricao: String(dados.get("descricao") ?? ""),
      estado: String(dados.get("estado") ?? ""),
      municipio: String(dados.get("municipio") ?? ""),
      empresas: String(dados.get("empresas") ?? ""),
      orgaos: String(dados.get("orgaos") ?? ""),
      documentos: String(dados.get("documentos") ?? ""),
      consentimento: dados.get("consentimento") === "on",
      website: String(dados.get("website") ?? ""),
    };

    try {
      const resposta = await fetch("/api/denuncia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(corpo),
      });
      const json = await resposta.json();

      if (!resposta.ok) {
        setErros(json.campos ?? {});
        setErroGeral(json.erro ?? "Não foi possível enviar.");
        setEstado("editando");
        /*
          Mover o foco para o resumo é o que torna a falha perceptível a quem
          navega por teclado ou leitor de tela: sem isso o foco permanece no
          botão de envio, no fim de um formulário longo, e o erro fica muitas
          telas acima sem qualquer sinal de que existe.
        */
        requestAnimationFrame(() => resumoErros.current?.focus());
        return;
      }

      setProtocolo(json.protocolo ?? null);
      setEstado("enviado");
    } catch {
      setErroGeral("Falha de conexão. Verifique sua rede e tente novamente.");
      setEstado("editando");
      requestAnimationFrame(() => resumoErros.current?.focus());
    }
  }

  if (estado === "enviado") {
    return (
      <section className="py-20 md:py-28">
        <Container>
          <div
            /* Anuncia a confirmação a quem não vê a mudança de tela. */
            role="status"
            tabIndex={-1}
            className="max-w-[60ch] rounded-lg border border-cobalto-claro/40 bg-carvao/60 p-8 sm:p-12"
          >
            <CheckCircle
              size={32}
              weight="fill"
              className="text-cobalto-claro"
              aria-hidden="true"
            />
            <p className="mt-6 text-xl leading-relaxed text-osso">
              {anonimo ? T.anonimoSucesso : T.sucesso}
            </p>
            {protocolo && (
              <div className="mt-8 border-t border-fio pt-6">
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-fumaca">
                  Protocolo
                </p>
                <p className="mt-2 font-mono text-2xl font-bold tracking-tight text-cobalto-claro">
                  {protocolo}
                </p>
                {/*
                  Honestidade sobre o que o protocolo ainda não faz. Sem banco de
                  dados não há consulta — ver content/PENDENCIAS.md. Prometer
                  acompanhamento aqui geraria expectativa que o sistema não
                  cumpre.
                */}
                <p className="mt-4 text-sm leading-relaxed text-fumaca">
                  Anote este número. Ele identifica sua comunicação em contatos
                  com o instituto. A consulta de status online ainda não está
                  disponível.
                </p>
              </div>
            )}
          </div>
        </Container>
      </section>
    );
  }

  const listaErros = Object.entries(erros);

  return (
    <section className="py-20 md:py-28">
      <Container>
        <form onSubmit={enviar} noValidate className="max-w-[70ch] space-y-12">
          <div className="rounded-md border border-fio bg-carvao/30 p-5">
            <p className="text-sm leading-relaxed text-fumaca">
              {T.avisoAnexos}
            </p>
          </div>

          {/*
            Resumo de erros. Recebe foco na falha e lista cada problema como
            link para o campo correspondente, que é o padrão que permite a quem
            usa teclado saltar direto ao que precisa corrigir.
          */}
          {(erroGeral || listaErros.length > 0) && (
            <div
              ref={resumoErros}
              role="alert"
              tabIndex={-1}
              className="rounded-md border border-cobalto-claro/50 bg-carvao/70 p-6 focus:outline-2 focus:outline-offset-2 focus:outline-cobalto-claro"
            >
              <p className="flex items-start gap-2 text-base font-semibold text-osso">
                <Warning
                  size={18}
                  weight="fill"
                  className="mt-1 shrink-0 text-cobalto-claro"
                  aria-hidden="true"
                />
                {erroGeral}
              </p>
              {listaErros.length > 0 && (
                <ul className="mt-4 space-y-2 pl-7">
                  {listaErros.map(([campo, mensagem]) => (
                    <li key={campo}>
                      <a
                        href={`#${campo}`}
                        className="text-sm text-cobalto-claro underline underline-offset-4 hover:text-osso"
                      >
                        {mensagem}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <Secao {...T.secoes.identificacao}>
            <label className="flex cursor-pointer items-start gap-3 py-1">
              <input
                type="checkbox"
                checked={anonimo}
                onChange={(e) => setAnonimo(e.target.checked)}
                className="mt-1 h-5 w-5 shrink-0 accent-cobalto"
              />
              <span className="text-base font-semibold text-osso">
                {T.campos.anonimo}
              </span>
            </label>

            {!anonimo && (
              <>
                <div>
                  <Rotulo htmlFor="nome" obrigatorio>
                    {T.campos.nome}
                  </Rotulo>
                  <input
                    type="text"
                    autoComplete="name"
                    aria-required
                    className={CAMPO}
                    {...aria("nome", erros.nome)}
                  />
                  <Erro id="nome-erro" mensagem={erros.nome} />
                </div>
                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <Rotulo htmlFor="email" obrigatorio>
                      {T.campos.email}
                    </Rotulo>
                    <input
                      type="email"
                      autoComplete="email"
                      aria-required
                      className={CAMPO}
                      {...aria("email", erros.email)}
                    />
                    <Erro id="email-erro" mensagem={erros.email} />
                  </div>
                  <div>
                    <Rotulo htmlFor="telefone">{T.campos.telefone}</Rotulo>
                    <input
                      type="tel"
                      autoComplete="tel"
                      className={CAMPO}
                      {...aria("telefone", erros.telefone)}
                    />
                    <Erro id="telefone-erro" mensagem={erros.telefone} />
                  </div>
                </div>
              </>
            )}

            <div>
              <Rotulo htmlFor="vinculo" obrigatorio>
                {T.campos.vinculo}
              </Rotulo>
              <select
                defaultValue="cidadao"
                aria-required
                className={CAMPO}
                {...aria("vinculo", erros.vinculo)}
              >
                {VINCULOS.map((v) => (
                  <option key={v.valor} value={v.valor}>
                    {v.rotulo}
                  </option>
                ))}
              </select>
              <Erro id="vinculo-erro" mensagem={erros.vinculo} />
            </div>
          </Secao>

          <Secao {...T.secoes.ocorrencia}>
            <div>
              <Rotulo htmlFor="eixo" obrigatorio>
                {T.campos.eixo}
              </Rotulo>
              <select
                defaultValue={eixoPadrao}
                aria-required
                className={CAMPO}
                {...aria("eixo", erros.eixo)}
              >
                {!eixoPadrao && <option value="">Selecione</option>}
                {EIXOS_DENUNCIA.map((e) => (
                  <option key={e.valor} value={e.valor}>
                    {e.rotulo}
                  </option>
                ))}
              </select>
              <Erro id="eixo-erro" mensagem={erros.eixo} />
            </div>

            <div>
              <Rotulo htmlFor="assunto" obrigatorio>
                {T.campos.assunto}
              </Rotulo>
              <input
                type="text"
                maxLength={140}
                aria-required
                className={CAMPO}
                {...aria("assunto", erros.assunto)}
              />
              <Erro id="assunto-erro" mensagem={erros.assunto} />
            </div>

            <div>
              <Rotulo htmlFor="descricao" obrigatorio>
                {T.campos.descricao}
              </Rotulo>
              <Ajuda id="descricao-ajuda">{T.ajuda.descricao}</Ajuda>
              <textarea
                rows={10}
                aria-required
                className={CAMPO}
                {...aria("descricao", erros.descricao, true)}
              />
              <Erro id="descricao-erro" mensagem={erros.descricao} />
            </div>

            <div className="grid gap-8 sm:grid-cols-[8rem_1fr]">
              <div>
                <Rotulo htmlFor="estado" obrigatorio>
                  {T.campos.estado}
                </Rotulo>
                <select
                  defaultValue=""
                  aria-required
                  className={CAMPO}
                  {...aria("estado", erros.estado)}
                >
                  <option value="">UF</option>
                  {UFS.map((uf) => (
                    <option key={uf} value={uf}>
                      {uf}
                    </option>
                  ))}
                </select>
                <Erro id="estado-erro" mensagem={erros.estado} />
              </div>
              <div>
                <Rotulo htmlFor="municipio" obrigatorio>
                  {T.campos.municipio}
                </Rotulo>
                <input
                  type="text"
                  aria-required
                  className={CAMPO}
                  {...aria("municipio", erros.municipio)}
                />
                <Erro id="municipio-erro" mensagem={erros.municipio} />
              </div>
            </div>

            <div>
              <Rotulo htmlFor="empresas">{T.campos.empresas}</Rotulo>
              <Ajuda id="empresas-ajuda">{T.ajuda.empresas}</Ajuda>
              <input
                type="text"
                className={CAMPO}
                {...aria("empresas", erros.empresas, true)}
              />
              <Erro id="empresas-erro" mensagem={erros.empresas} />
            </div>

            <div>
              <Rotulo htmlFor="orgaos">{T.campos.orgaos}</Rotulo>
              <Ajuda id="orgaos-ajuda">{T.ajuda.orgaos}</Ajuda>
              <input
                type="text"
                className={CAMPO}
                {...aria("orgaos", erros.orgaos, true)}
              />
              <Erro id="orgaos-erro" mensagem={erros.orgaos} />
            </div>
          </Secao>

          <Secao {...T.secoes.documentacao}>
            <div>
              <Rotulo htmlFor="documentos">{T.campos.documentos}</Rotulo>
              <textarea
                rows={4}
                className={CAMPO}
                {...aria("documentos", erros.documentos)}
              />
              <Erro id="documentos-erro" mensagem={erros.documentos} />
            </div>
          </Secao>

          <div className="border-t border-fio pt-10">
            <label className="flex cursor-pointer items-start gap-3 py-1">
              <input
                type="checkbox"
                name="consentimento"
                aria-required
                aria-invalid={erros.consentimento ? true : undefined}
                aria-describedby={
                  erros.consentimento ? "consentimento-erro" : undefined
                }
                className="mt-1 h-5 w-5 shrink-0 accent-cobalto"
              />
              <span className="text-sm leading-relaxed text-fumaca">
                {T.campos.consentimento}
              </span>
            </label>
            <Erro id="consentimento-erro" mensagem={erros.consentimento} />

            {/*
              Honeypot: fora da tela e fora da ordem de tabulação. Não leva
              aria-hidden porque um elemento focável dentro de uma subárvore
              oculta é violação de 4.1.2 — `tabIndex={-1}` já o remove do
              teclado, e o rótulo o mantém coerente para quem inspecionar.
            */}
            <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
              <label htmlFor="website">Não preencha este campo</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <button
              type="submit"
              disabled={estado === "enviando"}
              className="mt-8 inline-flex items-center rounded-md bg-cobalto px-7 py-3.5 text-base font-semibold text-osso transition-all duration-300 hover:bg-cobalto-claro hover:text-noite focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalto-claro disabled:cursor-not-allowed disabled:opacity-60"
            >
              {estado === "enviando" ? T.enviando : T.botao}
            </button>
          </div>
        </form>
      </Container>
    </section>
  );
}
