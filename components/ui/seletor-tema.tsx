"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "@phosphor-icons/react/dist/ssr";

export function SeletorTema({ compacto = false }: { compacto?: boolean }) {
  const [escuro, setEscuro] = useState(false);
  const [montado, setMontado] = useState(false);

  useEffect(() => {
    setMontado(true);
    const temaAtual = document.documentElement.getAttribute("data-theme");
    setEscuro(temaAtual === "dark");
  }, []);

  function alternarTema() {
    const novoEscuro = !escuro;
    setEscuro(novoEscuro);

    if (novoEscuro) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("idate-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("idate-theme", "light");
    }
  }

  if (!montado) {
    return (
      <div className="h-9 w-9 rounded-md border border-fio opacity-0" aria-hidden="true" />
    );
  }

  return (
    <button
      type="button"
      onClick={alternarTema}
      className={`group relative flex items-center justify-center rounded-md border border-fio bg-carvao/60 text-osso transition-all duration-300 hover:border-cobalto-claro/50 hover:bg-carvao hover:text-cobalto-claro active:scale-95 ${
        compacto ? "h-9 w-9" : "h-9 px-3 gap-2 text-xs font-medium"
      }`}
      aria-label={escuro ? "Alternar para modo claro" : "Alternar para modo escuro"}
      title={escuro ? "Alternar para modo claro" : "Alternar para modo escuro"}
    >
      {escuro ? (
        <>
          <Sun size={16} weight="bold" className="text-amber-500 transition-transform duration-300 group-hover:rotate-45" />
          {!compacto && <span>Modo Claro</span>}
        </>
      ) : (
        <>
          <Moon size={16} weight="bold" className="text-cobalto transition-transform duration-300 group-hover:-rotate-12" />
          {!compacto && <span>Modo Escuro</span>}
        </>
      )}
    </button>
  );
}
