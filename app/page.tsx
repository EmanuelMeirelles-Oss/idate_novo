import { Hero } from "@/components/sections/hero";
import { Lema } from "@/components/sections/lema";
import { GradeObservatorios } from "@/components/sections/grade-observatorios";
import { Esteira } from "@/components/sections/esteira";
import { Banda } from "@/components/sections/banda";
import { Portas } from "@/components/sections/portas";
import { HOME } from "@/content/home";
import { OBSERVATORIOS } from "@/content/observatorios";

export default function Home() {
  return (
    <>
      <Hero conteudo={HOME.hero} rolagem="Explorar o instituto" />
      <Lema {...HOME.lema} />
      <GradeObservatorios
        rotulo="01 — Observatórios"
        titulo={HOME.observatorios.titulo}
        intro={HOME.observatorios.intro}
        lista={OBSERVATORIOS}
        cta={HOME.observatorios.cta}
      />
      <Esteira {...HOME.esteira} />
      <Banda {...HOME.biblioteca} />
      <Portas
        rotulo="02 — Duas portas"
        titulo={HOME.portas.titulo}
        lista={HOME.portas.lista}
      />
    </>
  );
}
