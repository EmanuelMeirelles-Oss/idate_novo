"use client";

import { useEffect, useRef } from "react";
import { usePodeAnimar } from "@/lib/use-pode-animar";

export type IdPilarTelemetria = "agua" | "terra" | "energia";

interface PropsCanvasTelemetria {
  pilar: IdPilarTelemetria;
  className?: string;
}

const CHAR_SET_AGUA = ["@", "%", "#", "*", "+", "=", "~", ":", ".", " "];

export function CanvasTelemetriaPilar({ pilar, className = "" }: PropsCanvasTelemetria) {
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

    // Loop de renderização 60fps do Canvas2D
    const renderizar = () => {
      tempo += 0.03;
      const largura = canvas.width / (window.devicePixelRatio || 1);
      const altura = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, largura, altura);

      if (pilar === "agua") {
        // --- PILAR ÁGUA: Matriz ASCII Fluida de Hidrologia ---
        const cellSize = 10;
        const colunas = Math.ceil(largura / cellSize);
        const linhas = Math.ceil(altura / cellSize);

        ctx.font = '9px monospace';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        for (let y = 0; y < linhas; y++) {
          for (let x = 0; x < colunas; x++) {
            const posX = x * cellSize + cellSize / 2;
            const posY = y * cellSize + cellSize / 2;

            // Onda de luminância fluida (shimmer + wave)
            const v1 = Math.sin(x * 0.15 + tempo * 1.8);
            const v2 = Math.cos(y * 0.2 - tempo * 1.2);
            const v3 = Math.sin((x + y) * 0.1 + tempo * 2.0);
            const luminancia = Math.max(0, Math.min(1, (v1 + v2 + v3 + 3) / 6));

            if (luminancia > 0.25) {
              const charIdx = Math.floor((1 - luminancia) * (CHAR_SET_AGUA.length - 1));
              const char = CHAR_SET_AGUA[charIdx];

              const alfa = luminancia * 0.85;
              ctx.fillStyle = `rgba(91, 124, 255, ${alfa})`; // Cobalto Claro
              ctx.fillText(char, posX, posY);
            }
          }
        }
      } else if (pilar === "terra") {
        // --- PILAR TERRA: Curvas de Nível Topográficas ISO ---
        const contornos = 7;
        ctx.lineWidth = 1.2;

        for (let i = 0; i < contornos; i++) {
          ctx.beginPath();
          const nivelOffset = (i / contornos) * Math.PI * 2;
          ctx.strokeStyle = i % 2 === 0 ? "rgba(91, 124, 255, 0.45)" : "rgba(139, 147, 161, 0.3)";

          for (let x = 0; x < largura; x += 6) {
            const y =
              altura / 2 +
              Math.sin(x * 0.02 + tempo * 0.8 + nivelOffset) * 22 +
              Math.cos(x * 0.04 - tempo * 0.5) * 14;

            if (x === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();
        }
      } else if (pilar === "energia") {
        // --- PILAR ENERGIA: Matriz de Frequência Elétrica & Pulsos ---
        const numLinhas = 6;
        const espaco = altura / (numLinhas + 1);

        for (let i = 1; i <= numLinhas; i++) {
          const y = i * espaco;

          // Linha de base da fase
          ctx.beginPath();
          ctx.strokeStyle = "rgba(91, 124, 255, 0.2)";
          ctx.lineWidth = 1;
          ctx.moveTo(0, y);
          ctx.lineTo(largura, y);
          ctx.stroke();

          // Pulso elétrico que caminha pela fase
          const pulsoX = ((tempo * 90 + i * 45) % (largura + 80)) - 40;
          const grad = ctx.createRadialGradient(pulsoX, y, 0, pulsoX, y, 25);
          grad.addColorStop(0, "rgba(91, 124, 255, 0.9)");
          grad.addColorStop(0.5, "rgba(18, 54, 200, 0.4)");
          grad.addColorStop(1, "rgba(18, 54, 200, 0)");

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(pulsoX, y, 25, 0, Math.PI * 2);
          ctx.fill();

          // Nó central
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(pulsoX, y, 2, 0, Math.PI * 2);
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
