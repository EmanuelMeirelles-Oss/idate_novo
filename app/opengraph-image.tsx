import { ImageResponse } from "next/og";
import { SITE, LEMA } from "@/content/site";

export const runtime = "nodejs";

export const alt = "IDATE — Instituto dos Direitos da Água, Terra e Energia";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0C10",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          color: "#E9EBEF",
          position: "relative",
        }}
      >
        {/* Glow de fundo */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            background: "rgba(18, 54, 200, 0.25)",
            borderRadius: "50%",
            filter: "blur(120px)",
          }}
        />

        {/* Topo: Logo & Badge */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "10px",
                background: "#1236C8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                fontSize: "24px",
                fontWeight: 900,
                letterSpacing: "-0.05em",
              }}
            >
              I
            </div>
            <span
              style={{
                fontSize: "28px",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "#FFFFFF",
              }}
            >
              {SITE.nome}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 20px",
              borderRadius: "9999px",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(20, 23, 29, 0.8)",
              fontSize: "14px",
              color: "#5B7CFF",
              fontFamily: "monospace",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#5B7CFF",
              }}
            />
            Inteligência & Vigilância Regulatória
          </div>
        </div>

        {/* Centro: Título e Proposta */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "950px" }}>
          <span
            style={{
              fontSize: "16px",
              fontFamily: "monospace",
              color: "#5B7CFF",
              textTransform: "uppercase",
              letterSpacing: "0.16em",
              fontWeight: 600,
            }}
          >
            Água • Terra • Energia
          </span>
          <h1
            style={{
              fontSize: "52px",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
              color: "#FFFFFF",
              margin: 0,
            }}
          >
            Pesquisa, evidências documentadas e radar regulatório contínuo.
          </h1>
          <p
            style={{
              fontSize: "22px",
              color: "#8B93A1",
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            {LEMA}
          </p>
        </div>

        {/* Rodapé: Eixos e Metadados */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "24px",
          }}
        >
          <span style={{ fontSize: "16px", color: "#8B93A1" }}>
            {SITE.nomeCompleto}
          </span>
          <span
            style={{
              fontSize: "15px",
              fontFamily: "monospace",
              color: "#5B7CFF",
              fontWeight: 600,
            }}
          >
            idate.org.br
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
