import { NextResponse } from "next/server";
import { OBSERVATORIOS } from "@/content/observatorios";

export const dynamic = "force-dynamic";

/**
 * Endpoint de Ingestão de Ciclos do Radar Regulatório
 * POST /api/radar/ingest
 * Header: Authorization: Bearer <RADAR_SYNC_SECRET>
 */
export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const secret = process.env.RADAR_SYNC_SECRET;

    if (secret && (!authHeader || authHeader !== `Bearer ${secret}`)) {
      return NextResponse.json(
        { erro: "Não autorizado: Chave de autenticação inválida ou ausente." },
        { status: 401 },
      );
    }

    const body = await request.json();

    if (!body || !body.periodo || !body.periodo.inicio || !body.periodo.fim) {
      return NextResponse.json(
        { erro: "Payload inválido: campos de período obrigatórios ausentes." },
        { status: 400 },
      );
    }

    if (!Array.isArray(body.itens) || body.itens.length === 0) {
      return NextResponse.json(
        { erro: "Payload inválido: lista de atos vazia ou ausente." },
        { status: 400 },
      );
    }

    const slugsValidos = new Set(OBSERVATORIOS.map((o) => o.slug));
    for (const item of body.itens) {
      if (!slugsValidos.has(item.observatorio)) {
        return NextResponse.json(
          {
            erro: `Observatório inválido: "${item.observatorio}". Deve ser um dos slugs oficiais.`,
          },
          { status: 400 },
        );
      }
    }

    // Retorna confirmação estruturada do lote recebido
    return NextResponse.json({
      status: "recebido_com_sucesso",
      mensagem: "Ciclo de vigilância validado contra as regras do IDATE.",
      ciclo: {
        id: body.id ?? `ciclo-${body.periodo.inicio}-${body.periodo.fim}`,
        periodo: body.periodo,
        totalAtos: body.itens.length,
        observatoriosImpactados: Array.from(
          new Set(body.itens.map((i: { observatorio: string }) => i.observatorio)),
        ),
      },
    });
  } catch (err) {
    const mensagem = err instanceof Error ? err.message : "Erro desconhecido";
    return NextResponse.json(
      { erro: "Falha no processamento do payload", detalhe: mensagem },
      { status: 500 },
    );
  }
}
