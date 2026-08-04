"""
Baixa a foto do hero da home (Unsplash, licenca livre, sem exigencia de
credito) e espelha horizontalmente, porque o vazio atmosferico da foto
original fica a direita e o texto do hero entra pela esquerda.

Fonte: "a golden sun positioned behind a power pylon set within a misty
landscape", foto de Thilina Alagiyawanna, licenca Unsplash.
https://unsplash.com/photos/PlqFc5_17T4

Uso:
    python _scripts/baixar_hero.py
"""

from pathlib import Path

import requests
from PIL import Image, ImageOps

RAIZ = Path(__file__).resolve().parent.parent
DESTINO = RAIZ / "public" / "imagens" / "hero-transmissao.jpg"

URL = (
    "https://images.unsplash.com/photo-1783254917095-e909669ea8a8"
    "?fm=jpg&q=90&w=3840&auto=format&fit=crop"
)


def main() -> None:
    resposta = requests.get(URL, timeout=30)
    resposta.raise_for_status()

    caminho_bruto = RAIZ / "_brutos" / "hero-transmissao-original.jpg"
    caminho_bruto.parent.mkdir(parents=True, exist_ok=True)
    caminho_bruto.write_bytes(resposta.content)

    im = Image.open(caminho_bruto).convert("RGB")
    im = ImageOps.mirror(im)

    DESTINO.parent.mkdir(parents=True, exist_ok=True)
    im.save(DESTINO, "JPEG", quality=92, optimize=True, progressive=True)

    kb = DESTINO.stat().st_size // 1024
    print(f"{DESTINO.name}  {im.width}x{im.height}  {kb} KB")


if __name__ == "__main__":
    main()
