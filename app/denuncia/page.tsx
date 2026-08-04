import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Triagem } from "@/components/sections/triagem";
import { Etapas } from "@/components/sections/etapas";
import { Expectativa } from "@/components/sections/expectativa";
import { Lema } from "@/components/sections/lema";
import { Fechamento } from "@/components/sections/fechamento";
import { DENUNCIA } from "@/content/denuncia";
import { CANAL } from "@/content/site";

export const metadata: Metadata = {
  title: CANAL.nome,
  description:
    "Identificou uma possível ilegalidade envolvendo água, terra ou energia? Comunique ao IDATE. Sua informação entra na triagem técnica do instituto.",
};

/*
  A Central Nacional de Denúncias herda a composição da home original — hero
  cinematográfico, três cards fotográficos, blocos numerados, caixa de
  fechamento. É aqui que aquele registro pertence: fala em segunda pessoa e
  convoca ação, o que um canal precisa fazer e um instituto não.
*/
export default function CentralDeDenuncias() {
  return (
    <>
      <Hero conteudo={DENUNCIA.hero} rolagem="Como funciona" />
      <Triagem
        rotulo="01 — Triagem"
        titulo={DENUNCIA.triagem.titulo}
        intro={DENUNCIA.triagem.intro}
        lista={DENUNCIA.triagem.lista}
      />
      <Etapas
        id="etapas"
        rotulo="02 — O percurso"
        titulo={DENUNCIA.etapas.titulo}
        intro={DENUNCIA.etapas.intro}
        lista={DENUNCIA.etapas.lista}
      />
      <Expectativa
        rotulo="03 — Limites"
        titulo={DENUNCIA.expectativa.titulo}
        faz={DENUNCIA.expectativa.faz}
        naoFaz={DENUNCIA.expectativa.naoFaz}
        fechamento={DENUNCIA.expectativa.fechamento}
      />
      <Lema {...DENUNCIA.lema} />
      <Fechamento
        rotulo="04 — Comunicar"
        titulo={DENUNCIA.fechamento.titulo}
        subtitulo={DENUNCIA.fechamento.subtitulo}
        cta={DENUNCIA.fechamento.cta}
      />
    </>
  );
}
