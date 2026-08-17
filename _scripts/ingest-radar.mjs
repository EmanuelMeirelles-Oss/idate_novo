#!/usr/bin/env node
/**
 * Script de Ingestão Automática do Radar Regulatório IDATE
 * 
 * Uso:
 *   node _scripts/ingest-radar.mjs payload.json
 * ou via stdin:
 *   cat payload.json | node _scripts/ingest-radar.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const RADAR_FILE = path.join(ROOT_DIR, "content", "radar.ts");
const MEMORIA_FILE = path.join(ROOT_DIR, "MEMORIA.md");

function validateRadarPayload(data) {
  if (!data.periodo || !data.periodo.inicio || !data.periodo.fim || !data.periodo.rotulo) {
    throw new Error("Payload inválido: campo 'periodo' incompleto.");
  }
  if (!Array.isArray(data.itens) || data.itens.length === 0) {
    throw new Error("Payload inválido: 'itens' deve ser um array com pelo menos 1 ato.");
  }
  for (const item of data.itens) {
    if (!item.id || !item.titulo || !item.orgao || !item.publicadoEm || !item.observatorio || !item.perguntaVinculada) {
      throw new Error(`Item inválido: ${JSON.stringify(item)}`);
    }
  }
  return true;
}

async function main() {
  const args = process.argv.slice(2);
  let rawJson = "";

  if (args.length > 0) {
    const inputPath = path.resolve(process.cwd(), args[0]);
    if (!fs.existsSync(inputPath)) {
      console.error(`Erro: Arquivo não encontrado: ${inputPath}`);
      process.exit(1);
    }
    rawJson = fs.readFileSync(inputPath, "utf-8");
  } else {
    // Read from stdin
    rawJson = fs.readFileSync(0, "utf-8");
  }

  const payload = JSON.parse(rawJson);
  validateRadarPayload(payload);

  console.log(`✓ Payload validado com sucesso. Ciclo: ${payload.periodo.rotulo} (${payload.itens.length} atos)`);

  // Gera o ID do ciclo se não fornecido
  if (!payload.id) {
    payload.id = `ciclo-${payload.periodo.inicio}-${payload.periodo.fim}`;
  }

  console.log(`✓ Pronto para integrar o ciclo ${payload.id} em content/radar.ts`);
}

main().catch((err) => {
  console.error("Erro na ingestão do radar:", err.message);
  process.exit(1);
});
