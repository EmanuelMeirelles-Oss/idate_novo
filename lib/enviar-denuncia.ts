import { Resend } from "resend";
import type { DenunciaInput } from "./denuncia-schema";
import { rotuloEixo, rotuloVinculo } from "./denuncia-schema";

/**
 * Protocolo legível gerado no servidor. Serve para que quem comunica tenha uma
 * referência ao entrar em contato, e para que a equipe cite o caso.
 *
 * ATENÇÃO: sem banco de dados, este número não é consultável. A página de
 * acompanhamento de protocolo prevista no projeto depende de persistência que
 * ainda não existe — ver content/PENDENCIAS.md. Não prometa consulta ao usuário
 * enquanto isso não for implementado.
 */
export function gerarProtocolo(agora: Date = new Date()): string {
  const ano = agora.getFullYear();
  const dia = String(agora.getMonth() + 1).padStart(2, "0") +
    String(agora.getDate()).padStart(2, "0");
  const aleatorio = Math.floor(Math.random() * 46656)
    .toString(36)
    .toUpperCase()
    .padStart(3, "0");
  return `${ano}${dia}-${aleatorio}`;
}

/**
 * Como em enviarSolicitacao, este módulo LANÇA quando não está configurado.
 * Um canal de denúncias que engole a submissão silenciosamente é pior do que um
 * canal fora do ar: a pessoa acredita ter comunicado e não comunicou.
 */
export async function enviarDenuncia(
  dados: DenunciaInput,
  protocolo: string,
): Promise<void> {
  const chave = process.env.RESEND_API_KEY;
  const destino = process.env.CONTATO_DESTINO;
  const remetente = process.env.CONTATO_REMETENTE;

  if (!chave || !destino || !remetente) {
    throw new Error(
      "RESEND_API_KEY, CONTATO_DESTINO e CONTATO_REMETENTE precisam estar definidas.",
    );
  }

  const identificacao = dados.anonimo
    ? ["Comunicação ANÔNIMA"]
    : [
        `Nome: ${dados.nome}`,
        `E-mail: ${dados.email}`,
        `Telefone: ${dados.telefone || "não informado"}`,
      ];

  const resend = new Resend(chave);

  const { error } = await resend.emails.send({
    from: remetente,
    to: destino,
    /* Sem replyTo em comunicação anônima: devolveria o anonimato. */
    ...(dados.anonimo ? {} : { replyTo: dados.email }),
    subject: `[${protocolo}] ${rotuloEixo(dados.eixo)} — ${dados.assunto}`,
    text: [
      `Protocolo: ${protocolo}`,
      `Eixo: ${rotuloEixo(dados.eixo)}`,
      `Vínculo: ${rotuloVinculo(dados.vinculo)}`,
      `Local: ${dados.municipio}/${dados.estado}`,
      "",
      ...identificacao,
      "",
      `Assunto: ${dados.assunto}`,
      "",
      "Descrição dos fatos:",
      dados.descricao,
      "",
      `Empresas envolvidas: ${dados.empresas || "não informado"}`,
      `Órgãos públicos envolvidos: ${dados.orgaos || "não informado"}`,
      `Documentação declarada: ${dados.documentos || "não informado"}`,
    ].join("\n"),
  });

  if (error) {
    throw new Error(`Resend recusou o envio: ${error.message}`);
  }
}
