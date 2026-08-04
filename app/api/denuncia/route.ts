import { NextResponse } from "next/server";
import { denunciaSchema } from "@/lib/denuncia-schema";
import { enviarDenuncia, gerarProtocolo } from "@/lib/enviar-denuncia";

export async function POST(request: Request) {
  let corpo: unknown;
  try {
    corpo = await request.json();
  } catch {
    return NextResponse.json({ erro: "Corpo inválido." }, { status: 400 });
  }

  const resultado = denunciaSchema.safeParse(corpo);

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

  const protocolo = gerarProtocolo();

  try {
    await enviarDenuncia(resultado.data, protocolo);
  } catch (erro) {
    /*
      O log não registra o corpo da comunicação: denúncias contêm dados
      pessoais do denunciante e de terceiros denunciados, e logs de aplicação
      não são o lugar para eles.
    */
    console.error("[denuncia] falha no envio:", erro);
    return NextResponse.json(
      {
        erro:
          "Não foi possível registrar sua comunicação agora. Tente novamente em alguns minutos.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, protocolo });
}
