import type { MetadataRoute } from "next";
import { OBSERVATORIOS } from "@/content/observatorios";
import { PUBLICACOES } from "@/content/publicacoes";
import { SITE } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url;
  const dataHoje = new Date();

  // Rotas estáticas
  const rotasEstaticas: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: dataHoje,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/instituto`,
      lastModified: dataHoje,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/observatorios`,
      lastModified: dataHoje,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/biblioteca`,
      lastModified: dataHoje,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/metodologia`,
      lastModified: dataHoje,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contato`,
      lastModified: dataHoje,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/denuncia`,
      lastModified: dataHoje,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/denuncia/nova`,
      lastModified: dataHoje,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacidade`,
      lastModified: dataHoje,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Rotas dos observatórios
  const rotasObservatorios: MetadataRoute.Sitemap = OBSERVATORIOS.map((obs) => ({
    url: `${baseUrl}/observatorios/${obs.slug}`,
    lastModified: dataHoje,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Rotas das publicações
  const rotasPublicacoes: MetadataRoute.Sitemap = PUBLICACOES.map((pub) => ({
    url: `${baseUrl}/biblioteca/${pub.slug}`,
    lastModified: new Date(pub.atualizadoEm ?? pub.publicadoEm),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...rotasEstaticas, ...rotasObservatorios, ...rotasPublicacoes];
}
