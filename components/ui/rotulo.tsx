/**
 * Rótulo pequeno em caixa alta acima de um título de seção.
 *
 * Use com parcimônia. A taste-skill limita a um rótulo a cada três seções,
 * porque um em cima de cada título produz o ritmo templatado que denuncia
 * página gerada. Na dúvida, não use: o título sozinho já categoriza a seção,
 * e a posição dela na página já diz o resto.
 *
 * `nivel` existe para quando o rótulo É o título da seção. Nesse caso ele
 * precisa sair como heading de verdade, senão a página fica sem hierarquia
 * navegável por leitor de tela.
 */
export function Rotulo({
  rotulo,
  nivel = "p",
}: {
  rotulo: string;
  nivel?: "p" | "h2" | "h3";
}) {
  const Tag = nivel;
  return (
    <Tag className="font-mono text-xs uppercase tracking-[0.14em] text-cobalto-claro">
      {rotulo}
    </Tag>
  );
}
