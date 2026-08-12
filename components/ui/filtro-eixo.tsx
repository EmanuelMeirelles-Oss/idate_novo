import Link from "next/link";

export interface OpcaoFiltro {
  readonly rotulo: string;
  readonly valor?: string;
}

/**
 * Navegação por link puro (sem estado de cliente): trocar o filtro é trocar
 * `?eixo=` na URL, o Server Component em app/observatorios/page.tsx faz o
 * resto. Funciona sem JavaScript e é compartilhável por link.
 */
export function FiltroEixo({
  opcoes,
  ativo,
  baseHref,
  paramName = "eixo",
  ariaLabel = "Filtrar por eixo",
}: {
  opcoes: readonly OpcaoFiltro[];
  ativo?: string;
  baseHref: string;
  paramName?: string;
  ariaLabel?: string;
}) {
  return (
    <nav aria-label={ariaLabel} className="flex flex-wrap gap-2">
      {opcoes.map((opcao) => {
        const href = opcao.valor ? `${baseHref}?${paramName}=${opcao.valor}` : baseHref;
        const estaAtivo = opcao.valor === ativo;

        return (
          <Link
            key={opcao.rotulo}
            href={href}
            aria-current={estaAtivo ? "true" : undefined}
            className={`rounded-full border px-4 py-3 font-mono text-xs uppercase tracking-[0.12em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cobalto-claro ${
              estaAtivo
                ? "border-cobalto-claro bg-cobalto/15 text-cobalto-claro"
                : "border-fio text-fumaca hover:border-fio-forte hover:text-osso"
            }`}
          >
            {opcao.rotulo}
          </Link>
        );
      })}
    </nav>
  );
}
