type RGB = [number, number, number];

function hexParaRgb(hex: string): RGB {
  const limpo = hex.replace("#", "");
  if (!/^[0-9a-fA-F]{6}$/.test(limpo)) {
    throw new Error(`Hex inválido: ${hex}`);
  }
  return [
    parseInt(limpo.slice(0, 2), 16),
    parseInt(limpo.slice(2, 4), 16),
    parseInt(limpo.slice(4, 6), 16),
  ];
}

function luminanciaCanal(valor: number): number {
  const s = valor / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

export function luminanciaRelativa(hex: string): number {
  const [r, g, b] = hexParaRgb(hex);
  return (
    0.2126 * luminanciaCanal(r) +
    0.7152 * luminanciaCanal(g) +
    0.0722 * luminanciaCanal(b)
  );
}

export function contrastRatio(a: string, b: string): number {
  const la = luminanciaRelativa(a);
  const lb = luminanciaRelativa(b);
  const claro = Math.max(la, lb);
  const escuro = Math.min(la, lb);
  return (claro + 0.05) / (escuro + 0.05);
}
