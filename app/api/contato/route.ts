import { NextResponse } from "next/server";
import { contatoSchema } from "@/lib/contato-schema";
import { enviarSolicitacao } from "@/lib/enviar-solicitacao";

export async function POST(request: Request) {
  let corpo: unknown;
  try {
    corpo = await request.json();
  } catch {
    return NextResponse.json({ erro: "Corpo inválido." }, { status: 400 });
  }

  const resultado = contatoSchema.safeParse(corpo);

  if (!resultado.success) {
    const campos: Record<string, string> = {};
    for (const problema of resultado.error.issues) {
      const campo = String(problema.path[0] ?? "");
      if (campo && !campos[campo]) campos[campo] = problema.message;
    }
    return NextResponse.json(
      { erro: "Confira os campos destacados.", campos },
      { status: 422 },
    );
  }

  try {
    await enviarSolicitacao(resultado.data);
  } catch (erro) {
    console.error("[contato] falha no envio:", erro);
    return NextResponse.json(
      {
        erro:
          "Não foi possível enviar sua solicitação agora. Tente novamente em alguns minutos.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
