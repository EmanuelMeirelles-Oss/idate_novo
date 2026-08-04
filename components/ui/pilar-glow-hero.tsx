"use client";

import { useEffect, useRef } from "react";
import { usePodeAnimar } from "@/lib/use-pode-animar";

export type IdPilarGlow = "agua" | "terra" | "energia";

interface PropsPilarGlowHero {
  pilar: IdPilarGlow;
  className?: string;
}

/**
 * Sinal ambiente do pilar ativo, desenhado dentro do véu escuro esquerdo do
 * hero. Mesma família de assinaturas do CanvasTelemetriaPilar, mas contida a
 * poucas linhas finas — reforça o pilar em foco sem competir com a foto.
 */
export function PilarGlowHero({ pilar, className = "" }: PropsPilarGlowHero) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const podeAnimar = usePodeAnimar(canvasRef);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animFrameId: number;
    let tempo = 0;

    const redimensionar = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    redimensionar();
    window.addEventListener("resize", redimensionar);

    const renderizar = () => {
      tempo += 0.015;
      const largura = canvas.width / (window.devicePixelRatio || 1);
      const altura = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, largura, altura);

      if (pilar === "agua") {
        // Três linhas horizontais com shimmer ondulado, subindo suavemente.
        for (let i = 0; i < 3; i++) {
          const baseY = altura * (0.28 + i * 0.22);
          ctx.beginPath();
          for (let x = 0; x <= largura; x += 8) {
            const y = baseY + Math.sin(x * 0.04 + tempo * 2 + i * 2) * 6;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          const fase = (Math.sin(tempo * 1.3 + i) + 1) / 2;
          ctx.strokeStyle = `rgba(91, 124, 255, ${0.12 + fase * 0.22})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      } else if (pilar === "terra") {
        // Curvas de nível lentas, quase estáticas.
        for (let i = 0; i < 3; i++) {
          const baseY = altura * (0.3 + i * 0.2);
          ctx.beginPath();
          for (let x = 0; x <= largura; x += 10) {
            const y = baseY + Math.sin(x * 0.015 + tempo * 0.4 + i) * 14;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = "rgba(91, 124, 255, 0.16)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      } else {
        // Energia: pulso viajando por linhas de fase.
        for (let i = 0; i < 3; i++) {
          const y = altura * (0.28 + i * 0.22);
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(largura, y);
          ctx.strokeStyle = "rgba(91, 124, 255, 0.1)";
          ctx.lineWidth = 1;
          ctx.stroke();

          const pulsoX = ((tempo * 70 + i * 60) % (largura + 60)) - 30;
          const grad = ctx.createRadialGradient(pulsoX, y, 0, pulsoX, y, 18);
          grad.addColorStop(0, "rgba(91, 124, 255, 0.55)");
          grad.addColorStop(1, "rgba(18, 54, 200, 0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(pulsoX, y, 18, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (podeAnimar) {
        animFrameId = requestAnimationFrame(renderizar);
      }
    };

    renderizar();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", redimensionar);
    };
  }, [pilar, podeAnimar]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full pointer-events-none ${className}`}
    />
  );
}
