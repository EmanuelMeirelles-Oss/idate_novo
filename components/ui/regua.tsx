export function Regua({ invertida = false }: { invertida?: boolean }) {
  const cor = invertida ? "bg-cobalto-claro" : "bg-cobalto";
  return <div className={`h-[2px] w-14 ${cor}`} aria-hidden="true" />;
}
