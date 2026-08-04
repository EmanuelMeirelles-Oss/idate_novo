import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Marca } from "./marca";
import { NAVEGACAO, INSTITUCIONAL, SITE } from "@/content/site";

export function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="mt-32 border-t border-fio py-16">
      <Container className="grid gap-12 md:grid-cols-2">
        <Marca />

        <div className="grid gap-10 sm:grid-cols-2">
          <nav aria-label="Navegação do rodapé">
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-cobalto-claro">
              Navegação
            </p>
            <ul className="mt-4 space-y-2">
              {NAVEGACAO.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-fumaca transition-colors hover:text-cobalto-claro"
                  >
                    {item.rotulo}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-cobalto-claro">
              Contato
            </p>
            <ul className="mt-4 space-y-2 text-sm text-fumaca">
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

      <Container className="mt-16 border-t border-fio pt-8">
        <p className="font-mono text-[0.625rem] tracking-[0.1em] text-fumaca">
          © {ano} {SITE.nomeCompleto.toUpperCase()}
        </p>
      </Container>
    </footer>
  );
}
