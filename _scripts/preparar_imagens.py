"""
Prepara as imagens brutas para o site.

O que faz:
1. Renomeia sem acento e sem espaco. Acento em nome de arquivo vira dor de
   cabeca de encoding em URL, e o Next serve esses arquivos direto.
2. Recorta para a proporcao de destino, enviesando o corte para raspar o
   canto inferior direito, que e onde o Gemini estampa o selo. Assim a marca
   sai como subproduto do enquadramento, sem etapa manual.
3. Aplica o grading de petroleo nas imagens que estao fora do registro.
4. Converte para JPEG de alta qualidade. PNG de fotografia e desperdicio:
   as originais tem ate 800 KB para o que cabe em 200.

Uso:
    python _scripts/preparar_imagens.py
"""

from pathlib import Path
from PIL import Image
import numpy as np

RAIZ = Path(__file__).resolve().parent.parent
DESTINO = RAIZ / "public" / "imagens"

PETROLEO = np.array([11, 34, 45], dtype=np.float32)

# origem, destino, proporcao alvo (largura/altura), aplicar grading
TRABALHOS = [
    ("herodahome_atualizada.png", "hero.jpg", 21 / 9, False),
    ("Agua_estações_de_tratamento.png", "agua.jpg", 3 / 2, False),
    ("terra_mineração.png", "terra.jpg", 3 / 2, False),
    ("geração_de_energia.png", "energia.jpg", 3 / 2, False),
    ("metodologia_sugere_profundidade_da_pesquisa.png", "arquivo.jpg", 3 / 2, False),
    ("instituto_vista_pivosdeirrigacao.png", "instituto.jpg", 3 / 2, True),
]

# Raspagem minima do canto inferior direito, em fracao da menor dimensao.
# Serve de piso quando a deteccao nao encontra selo nenhum.
RASPAGEM_MINIMA = 0.04

# Um pixel entra como candidato a selo se estiver este tanto acima da mediana
# da regiao. O selo do Gemini e um brilho compacto sobre fundo escuro.
LIMIAR_BRILHO = 0.22


def gradear_petroleo(rgb: np.ndarray) -> np.ndarray:
    """Dessatura o verde, puxa a matiz para o petroleo e rebaixa a exposicao."""
    hsv = np.asarray(
        Image.fromarray((rgb * 255).astype(np.uint8), "RGB").convert("HSV"),
        dtype=np.float32,
    ) / 255.0
    matiz, satur, valor = hsv[..., 0], hsv[..., 1], hsv[..., 2]

    peso_verde = np.clip(1.0 - np.abs(matiz - 0.33) / 0.16, 0.0, 1.0)
    satur = satur * (1.0 - 0.72 * peso_verde)
    matiz = matiz + (0.52 - matiz) * 0.85 * peso_verde

    hsv = np.stack([matiz, satur, valor], axis=-1)
    rgb = np.asarray(
        Image.fromarray((hsv * 255).astype(np.uint8), "HSV").convert("RGB"),
        dtype=np.float32,
    ) / 255.0

    rgb = np.power(np.clip(rgb, 0.0, 1.0), 1.55) * 0.82

    luminancia = rgb @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    forca = (0.30 * (1.0 - luminancia))[..., None]
    return rgb * (1.0 - forca) + (PETROLEO / 255.0) * forca


def detectar_selo(im: Image.Image) -> int | None:
    """Procura o selo do Gemini no canto inferior direito.

    Devolve a coordenada X onde o selo comeca, ou None se nao achar nada.

    Brilho sozinho nao basta como criterio: rocha clara, poeira iluminada e
    ceu residual tambem sao brilhantes e disparariam falso positivo, cortando
    a foto a toa. O selo tem tres marcas juntas que o conteudo nao costuma
    ter ao mesmo tempo: fica colado no canto, e muito mais claro que a
    vizinhanca, e e COMPACTO. Exigimos as tres.
    """
    largura, altura = im.size
    x0, y0 = int(largura * 0.84), int(altura * 0.68)
    regiao_l, regiao_a = largura - x0, altura - y0

    regiao = np.asarray(im.crop((x0, y0, largura, altura)), dtype=np.float32) / 255.0
    lum = regiao @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)

    candidatos = lum > (np.median(lum) + LIMIAR_BRILHO)
    area = int(candidatos.sum())
    if area < 40:
        return None

    # Compacidade: um selo ocupa uma fracao minuscula da regiao. Mancha que
    # toma boa parte dela e conteudo da foto, nao marca sobreposta.
    if area > 0.05 * regiao_l * regiao_a:
        return None

    colunas = np.where(candidatos.any(axis=0))[0]
    linhas = np.where(candidatos.any(axis=1))[0]
    caixa_l = int(colunas.max() - colunas.min()) + 1
    caixa_a = int(linhas.max() - linhas.min()) + 1

    # A caixa delimitadora tambem precisa ser pequena. Brilho disperso pela
    # regiao inteira produz caixa larga mesmo com poucos pixels acesos.
    if caixa_l > 0.45 * regiao_l or caixa_a > 0.45 * regiao_a:
        return None

    return x0 + int(colunas.min())


def recortar(im: Image.Image, proporcao: float) -> tuple[Image.Image, bool]:
    """Recorta para a proporcao alvo descartando o canto inferior direito.

    A ancora fica no canto superior esquerdo, entao o que se perde e sempre
    embaixo e a direita, que e onde o selo mora. Quando um selo e detectado,
    a borda direita recua o suficiente para exclui-lo.
    """
    largura, altura = im.size

    piso = int(min(largura, altura) * RASPAGEM_MINIMA)
    limite_l, limite_a = largura - piso, altura - piso

    selo_x = detectar_selo(im)
    achou_selo = selo_x is not None
    if achou_selo:
        limite_l = min(limite_l, selo_x - 12)

    if limite_l / limite_a > proporcao:
        nova_l, nova_a = int(limite_a * proporcao), limite_a
    else:
        nova_l, nova_a = limite_l, int(limite_l / proporcao)

    return im.crop((0, 0, nova_l, nova_a)), achou_selo


def main() -> None:
    DESTINO.mkdir(parents=True, exist_ok=True)

    for origem, saida, proporcao, aplicar_grading in TRABALHOS:
        # aceita o arquivo recem-chegado na raiz ou o ja arquivado em _brutos
        caminho = next(
            (p for p in (RAIZ / origem, RAIZ / "_brutos" / origem) if p.exists()),
            None,
        )
        if caminho is None:
            print(f"AUSENTE  {origem}")
            continue

        im = Image.open(caminho).convert("RGB")
        antes = im.size

        im, achou_selo = recortar(im, proporcao)

        if aplicar_grading:
            rgb = np.asarray(im, dtype=np.float32) / 255.0
            rgb = gradear_petroleo(rgb)
            im = Image.fromarray((np.clip(rgb, 0, 1) * 255).astype(np.uint8), "RGB")

        destino = DESTINO / saida
        im.save(destino, "JPEG", quality=88, optimize=True, progressive=True)

        kb = destino.stat().st_size // 1024
        notas = []
        if achou_selo:
            notas.append("selo removido")
        if aplicar_grading:
            notas.append("gradeada")
        sufixo = f"  [{', '.join(notas)}]" if notas else ""
        print(f"{saida:<16} {antes[0]}x{antes[1]} -> {im.width}x{im.height}  {kb} KB{sufixo}")


if __name__ == "__main__":
    main()
