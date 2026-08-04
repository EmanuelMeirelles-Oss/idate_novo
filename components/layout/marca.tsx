import Link from "next/link";

/**
 * Assinatura do IDATE: símbolo do entrelace mais logotipo tipográfico.
 *
 * O símbolo entra como MÁSCARA CSS, não como imagem colorida. O arquivo em
 * `public/marca-idate.png` é branco sobre transparente, e a cor real vem do
 * `background-color` do elemento. Assim a mesma marca serve em fundo claro e
 * escuro sem gerar dois arquivos que podem divergir com o tempo, e ela
 * acompanha `currentColor` em estados de hover e foco.
 *
 * O arquivo foi extraído do PNG gerado selecionando por azul, não por
 * escuridão: o selo do gerador é neutro e claro, então essa seleção o descarta
 * sem precisar recortar canto.
 *
 * PENDENTE: versão reduzida para favicon. Os traços do entrelace têm cerca de
 * 5% da largura da marca, o que abaixo de 32px cai para menos de dois pixels e
 * funde. Ver spec §3.5, sistema de dois níveis.
 */
export function Marca({ compacta = false }: { compacta?: boolean }) {
  const lado = compacta ? 34 : 44;

  return (
    <Link
      href="/"
      aria-label="IDATE, Instituto dos Direitos da Água, Terra e Energia. Ir para a página inicial"
      className="group inline-flex items-center gap-3.5 text-osso transition-colors hover:text-cobalto-claro"
    >
      {/*
        A cor do símbolo vem de `currentColor`, herdada do link. Assim o hover
        muda texto e símbolo juntos com uma declaração só, e a marca acompanha
        qualquer contexto de cor onde for colocada.
      */}
      <span
        aria-hidden="true"
        className="block shrink-0"
        style={{
          width: lado,
          height: lado,
          backgroundColor: "currentColor",
          maskImage: "url(/marca-idate.png)",
          WebkitMaskImage: "url(/marca-idate.png)",
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      />

      <span className="block">
        <span className="block text-[1.375rem] font-extrabold leading-none tracking-[-0.04em]">
          IDATE
        </span>

        {!compacta && (
          <span className="mt-1.5 block max-w-[20ch] font-mono text-[0.5rem] uppercase leading-[1.5] tracking-[0.16em] text-fumaca">
            Instituto dos Direitos
            <br />
            da Água, Terra e Energia
          </span>
        )}
      </span>
    </Link>
  );
}
