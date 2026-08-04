import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export function CTALink({
  href,
  children,
  variante = "primario",
}: {
  href: string;
  children: React.ReactNode;
  variante?: "primario" | "secundario";
}) {
  if (variante === "primario") {
    return (
      <Link
        href={href}
        className="group inline-flex items-center gap-2.5 rounded-sm bg-cobalto px-7 py-3.5 text-sm font-semibold text-osso shadow-[0_0_25px_rgba(18,54,200,0.35)] transition-all duration-300 hover:bg-cobalto-claro hover:shadow-[0_0_35px_rgba(91,124,255,0.5)] active:scale-[0.98]"
      >
        {children}
        <ArrowRight size={16} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 border-b-2 border-cobalto-claro/50 pb-1 text-sm font-semibold text-cobalto-claro transition-all duration-300 hover:border-cobalto-claro hover:text-osso active:scale-[0.98]"
    >
      {children}
      <ArrowRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  );
}

