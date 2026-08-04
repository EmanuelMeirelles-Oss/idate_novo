import { Resend } from "resend";
import type { ContatoInput } from "./contato-schema";
import { SETORES } from "./contato-schema";

/**
 * Por decisão de projeto (spec §6.3), este módulo LANÇA quando não está
 * configurado. Um formulário que engole a submissão silenciosamente perde
 * negócio sem deixar rastro — é pior do que um erro visível.
 */
export async function enviarSolicitacao(dados: ContatoInput): Promise<void> {
  const chave = process.env.RESEND_API_KEY;
  const destino = process.env.CONTATO_DESTINO;
  const remetente = process.env.CONTATO_REMETENTE;

  if (!chave || !destino || !remetente) {
    throw new Error(
      "RESEND_API_KEY, CONTATO_DESTINO e CONTATO_REMETENTE precisam estar definidas.",
    );
  }

  const rotuloSetor =
    SETORES.find((s) => s.valor === dados.setor)?.rotulo ?? dados.setor;

  const resend = new Resend(chave);

  const { error } = await resend.emails.send({
    from: remetente,
    to: destino,
    replyTo: dados.email,
    subject: `Solicitação de análise — ${dados.empresa}`,
    text: [
      `Nome: ${dados.nome}`,
      `Cargo: ${dados.cargo}`,
      `Empresa: ${dados.empresa}`,
      `Setor: ${rotuloSetor}`,
      `E-mail: ${dados.email}`,
      `Telefone: ${dados.telefone}`,
      "",
      "Mensagem:",
      dados.mensagem,
    ].join("\n"),
  });

  if (error) {
    throw new Error(`Resend recusou o envio: ${error.message}`);
  }
}
