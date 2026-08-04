import { Container } from "@/components/ui/container";
import { Rotulo } from "@/components/ui/rotulo";
import { Regua } from "@/components/ui/regua";
import { Reveal } from "@/components/ui/reveal";

/*
  Substitui a antiga seção de tese. Mesma composição tipográfica — declaração em
  corpo grande, régua, desenvolvimento em corpo pequeno — agora servindo o lema
  institucional. Aparece na home e na Central de Denúncias; na segunda sem
  desenvolvimento, porque ali a página inteira já é o desenvolvimento.
*/
export function Lema({
  kicker,
  declaracao,
  desenvolvimento,
}: {
  kicker: { readonly rotulo: string };
  declaracao: string;
  desenvolvimento?: string;
}) {
  return (
    <section className="border-b border-fio py-24 md:py-40">
      <Container>
        <Reveal>
          <Rotulo rotulo={kicker.rotulo} nivel="h2" />
          <p className="mt-8 max-w-[26ch] text-3xl font-bold leading-[1.1] tracking-tighter md:text-5xl lg:text-6xl">
            {declaracao}
          </p>
          <div className="mt-10">
            <Regua />
          </div>
          {desenvolvimento && (
            <p className="mt-10 max-w-[60ch] text-base leading-relaxed text-fumaca">
              {desenvolvimento}
            </p>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
