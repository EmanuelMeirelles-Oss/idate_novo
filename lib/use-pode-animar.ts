"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Combina duas condições de economia: preferência de movimento reduzido do
 * usuário e visibilidade em viewport. Usado pelos canvases decorativos do
 * hero para não gastar CPU/bateria à toa, principalmente em mobile.
 */
export function usePodeAnimar(ref: RefObject<HTMLElement | null>): boolean {
  const [podeAnimar, setPodeAnimar] = useState(false);

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento) return;

    const consultaMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visivel = false;

    const atualizar = () => {
      setPodeAnimar(visivel && !consultaMovimento.matches);
    };

    const observer = new IntersectionObserver(
      ([entrada]) => {
        visivel = entrada.isIntersecting;
        atualizar();
      },
      { threshold: 0 },
    );
    observer.observe(elemento);
    consultaMovimento.addEventListener("change", atualizar);

    return () => {
      observer.disconnect();
      consultaMovimento.removeEventListener("change", atualizar);
    };
  }, [ref]);

  return podeAnimar;
}
