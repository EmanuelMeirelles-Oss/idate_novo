"use client";

import { useState, type FormEvent } from "react";
import { SETORES } from "@/lib/contato-schema";
import { CONTATO } from "@/content/contato";

type Estado = "parado" | "enviando" | "sucesso";

const ENTRADA =
  "mt-2 w-full rounded-md border border-fio bg-carvao/40 px-4 py-3.5 text-base text-osso outline-none transition-all duration-300 focus:border-cobalto-claro focus:bg-carvao/80 focus:ring-1 focus:ring-cobalto-claro/50 placeholder:text-fumaca/50";

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
      <div className="rounded-lg border border-cobalto-claro/40 bg-carvao/80 p-8 shadow-[0_0_30px_rgba(18,54,200,0.2)]" role="status">
        <p className="text-2xl font-bold tracking-tight text-osso">{CONTATO.sucesso}</p>
        <p className="mt-2 text-sm text-fumaca">Entraremos em contato em breve para dar início ao processo de análise.</p>
      </div>
    );
  }

  return (
    <form onSubmit={aoEnviar} noValidate className="space-y-8 rounded-xl border border-fio bg-carvao/30 p-6 sm:p-10 backdrop-blur-md">
      {erroGeral && (
        <p
          role="alert"
          className="rounded-md border-l-4 border-cobalto-claro bg-cobalto/10 px-4 py-3.5 text-sm font-semibold text-cobalto-claro"
        >
          {erroGeral}
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Campo nome="nome" rotulo={CONTATO.campos.nome} erro={erros.nome} />
        <Campo nome="cargo" rotulo={CONTATO.campos.cargo} erro={erros.cargo} />
        <Campo nome="empresa" rotulo={CONTATO.campos.empresa} erro={erros.empresa} />

        <div>
          <label htmlFor="setor" className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-fumaca">
            {CONTATO.campos.setor}
          </label>
          <select id="setor" name="setor" defaultValue="" required className={ENTRADA}>
            <option value="" disabled className="bg-carvao text-fumaca">
              Selecione
            </option>
            {SETORES.map((setor) => (
              <option key={setor.valor} value={setor.valor} className="bg-carvao text-osso">
                {setor.rotulo}
              </option>
            ))}
          </select>
          {erros.setor && <p className="mt-2 text-sm text-cobalto-claro">{erros.setor}</p>}
        </div>

        <Campo nome="email" rotulo={CONTATO.campos.email} tipo="email" erro={erros.email} />
        <Campo nome="telefone" rotulo={CONTATO.campos.telefone} tipo="tel" erro={erros.telefone} />
      </div>

      <div>
        <label htmlFor="mensagem" className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-fumaca">
          {CONTATO.campos.mensagem}
        </label>
        <textarea id="mensagem" name="mensagem" rows={5} required className={ENTRADA} />
        {erros.mensagem && <p className="mt-2 text-sm text-cobalto-claro">{erros.mensagem}</p>}
      </div>

      {/* Honeypot: invisível para pessoas, atraente para robôs. */}
      <div aria-hidden="true" className="absolute left-[-9999px]">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <button
        type="submit"
        disabled={estado === "enviando"}
        className="rounded-md bg-cobalto px-8 py-4 text-sm font-semibold text-osso shadow-[0_0_25px_rgba(18,54,200,0.35)] transition-all duration-300 hover:bg-cobalto-claro hover:shadow-[0_0_35px_rgba(91,124,255,0.5)] active:scale-[0.98] disabled:opacity-50"
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
      <label htmlFor={nome} className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-fumaca">
        {rotulo}
      </label>
      <input id={nome} name={nome} type={tipo} required className={ENTRADA} />
      {erro && <p className="mt-2 text-sm text-cobalto-claro">{erro}</p>}
    </div>
  );
}

