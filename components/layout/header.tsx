"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, X, ArrowRight } from "@phosphor-icons/react";
import { Container } from "@/components/ui/container";
import { Marca } from "./marca";
import { CANAL, NAVEGACAO } from "@/content/site";

export function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-fio bg-noite/80 backdrop-blur-xl transition-all">
      <Container className="flex items-center justify-between py-4 md:py-5">
        <Marca compacta />

        <div className="hidden md:flex items-center gap-8">
          {/* Navegação Desktop */}
          <nav aria-label="Navegação principal">
            <ul className="flex items-center gap-7">
              {NAVEGACAO.map((item) => {
                const ativo = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`relative text-sm font-medium transition-colors hover:text-osso ${
                        ativo ? "text-osso font-semibold" : "text-fumaca"
                      }`}
                    >
                      {item.rotulo}
                      {ativo && (
                        <span className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-cobalto-claro" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Canal de denúncias no Header Desktop */}
          <Link
            href={CANAL.href}
            className="group inline-flex items-center gap-2 rounded-md bg-cobalto px-4 py-2 text-xs font-semibold text-osso shadow-[0_0_20px_rgba(18,54,200,0.3)] transition-all duration-300 hover:bg-cobalto-claro hover:shadow-[0_0_25px_rgba(91,124,255,0.4)] active:scale-[0.98]"
          >
            <span>{CANAL.nomeCurto}</span>
            <ArrowRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Botão Menu Mobile */}
        <button
          type="button"
          onClick={() => setMenuAberto(!menuAberto)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-fio text-osso transition hover:bg-carvao md:hidden"
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuAberto}
        >
          {menuAberto ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
        </button>
      </Container>

      {/* Overlay do Menu Mobile */}
      {menuAberto && (
        <div className="border-b border-fio bg-noite/95 px-6 py-6 backdrop-blur-2xl md:hidden">
          <nav aria-label="Navegação mobile">
            <ul className="space-y-4">
              {NAVEGACAO.map((item) => {
                const ativo = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMenuAberto(false)}
                      className={`block text-base font-medium transition-colors ${
                        ativo ? "text-cobalto-claro font-semibold" : "text-osso hover:text-cobalto-claro"
                      }`}
                    >
                      {item.rotulo}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="mt-6 border-t border-fio pt-4">
              <Link
                href={CANAL.href}
                onClick={() => setMenuAberto(false)}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-cobalto py-3 text-sm font-semibold text-osso shadow-[0_0_20px_rgba(18,54,200,0.3)]"
              >
                <span>{CANAL.nomeCurto}</span>
                <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}


