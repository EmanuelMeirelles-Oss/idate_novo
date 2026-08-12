import { Hero } from "@/components/sections/hero";
import { Lema } from "@/components/sections/lema";
import { Eixos } from "@/components/sections/eixos";
import { GradeObservatorios } from "@/components/sections/grade-observatorios";
import { Esteira } from "@/components/sections/esteira";
import { AcervoDestaque } from "@/components/sections/acervo-destaque";
import { Portas } from "@/components/sections/portas";
import { HOME } from "@/content/home";
import { OBSERVATORIOS } from "@/content/observatorios";

export default function Home() {
  return (
    <>
      <Hero conteudo={HOME.hero} rolagem="Explorar o instituto" />
      <Lema {...HOME.lema} />
      <Eixos {...HOME.eixos} />
      <GradeObservatorios
        rotulo="01 — Observatórios"
        titulo={HOME.observatorios.titulo}
        intro={HOME.observatorios.intro}
        lista={OBSERVATORIOS}
        cta={HOME.observatorios.cta}
      />
      <Esteira {...HOME.esteira} />
      <AcervoDestaque />
      <Portas
        rotulo="03 — Duas portas"
        titulo={HOME.portas.titulo}
        lista={HOME.portas.lista}
      />
    </>
  );
}
