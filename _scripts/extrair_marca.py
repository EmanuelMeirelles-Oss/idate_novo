"""
Extrai o simbolo do IDATE do PNG gerado, isolando-o do fundo.

Estrategia: selecionar por AZUL, nao por escuridao. A marca e azul saturado
sobre fundo quase branco, e o selo do Gemini e um brilho esbranquicado. Um
teste de azuis descarta o selo de gra�a, sem precisar recortar canto.

A saida e uma mascara alpha com preenchimento branco. Assim o componente
controla a cor por CSS (`mask-image` + `background-color`), e a mesma marca
serve em fundo claro e escuro sem gerar dois arquivos que podem divergir.

Uso:
    python _scripts/extrair_marca.py "logo idate.png" public/marca-idate.png
"""

import sys
from pathlib import Path
from PIL import Image
import numpy as np

# Margem em volta da marca, em fracao do lado maior da caixa delimitadora.
RESPIRO = 0.04


def extrair(caminho_entrada: str, caminho_saida: str) -> None:
    im = Image.open(caminho_entrada).convert("RGB")
    rgb = np.asarray(im, dtype=np.float32) / 255.0
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]

    # "Azulidade": quanto o canal azul supera a media dos outros dois.
    # O selo do Gemini e neutro e claro, entao pontua perto de zero aqui.
    azulidade = b - (r + g) / 2.0

    # Normaliza para 0..1 usando o pico real da imagem, para nao depender de
    # qual azul exato o gerador produziu.
    pico = float(azulidade.max())
    if pico <= 0.05:
        sys.exit("nenhum azul encontrado: a imagem e a marca esperada?")
    alpha = np.clip(azulidade / pico, 0.0, 1.0)

    # Curva de contraste: firma o miolo em opaco e o fundo em transparente,
    # preservando a suavidade da borda para nao serrilhar.
    alpha = np.clip((alpha - 0.18) / 0.5, 0.0, 1.0)

    solidos = alpha > 0.5
    if not solidos.any():
        sys.exit("marca nao encontrada apos limiar")

    linhas = np.where(solidos.any(axis=1))[0]
    colunas = np.where(solidos.any(axis=0))[0]
    y0, y1 = int(linhas.min()), int(linhas.max()) + 1
    x0, x1 = int(colunas.min()), int(colunas.max()) + 1

    respiro = int(max(x1 - x0, y1 - y0) * RESPIRO)
    y0, y1 = max(0, y0 - respiro), min(alpha.shape[0], y1 + respiro)
    x0, x1 = max(0, x0 - respiro), min(alpha.shape[1], x1 + respiro)

    recorte = alpha[y0:y1, x0:x1]
    altura, largura = recorte.shape

    # Quadrado, com a marca centrada: simplifica o uso em avatar e favicon.
    lado = max(altura, largura)
    quadro = np.zeros((lado, lado), dtype=np.float32)
    deslocamento_y = (lado - altura) // 2
    deslocamento_x = (lado - largura) // 2
    quadro[deslocamento_y:deslocamento_y + altura, deslocamento_x:deslocamento_x + largura] = recorte

    branco = np.full((lado, lado, 3), 255, dtype=np.uint8)
    rgba = np.dstack([branco, (quadro * 255).astype(np.uint8)])

    saida = Path(caminho_saida)
    saida.parent.mkdir(parents=True, exist_ok=True)
    Image.fromarray(rgba, "RGBA").save(saida, optimize=True)

    cobertura = float((quadro > 0.5).mean())
    print(f"gravado: {saida}  {lado}x{lado}  ({saida.stat().st_size // 1024} KB)")
    print(f"caixa da marca no original: x {x0}-{x1}, y {y0}-{y1}")
    print(f"cobertura de tinta no quadro: {cobertura:.1%}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit("uso: python extrair_marca.py <entrada.png> <saida.png>")
    extrair(sys.argv[1], sys.argv[2])
