"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * O desligamento do movimento acontece em CSS (bloco `prefers-reduced-motion`
 * em `app/globals.css`), não em JS. O servidor não conhece a preferência do
 * usuário: `useReducedMotion()` responde `false` na renderização do servidor e
 * `true` no cliente, então qualquer ramo condicional aqui geraria markup
 * diferente dos dois lados e quebraria a hidratação. Com a marcação idêntica,
 * o seletor `[data-reveal]` neutraliza o estado inicial da animação.
 */
export function Reveal({
  children,
  atraso = 0,
}: {
  children: ReactNode;
  atraso?: number;
}) {
  return (
    <motion.div
      data-reveal
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: atraso, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
