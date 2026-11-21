import type { Metadata } from "next";
import CivilConstructionMarketplace from "./CivilConstructionMarketplace";
import CivilConstructionDetails from "./CivilConstructionDetails";

export const metadata: Metadata = {
  title: "Civil Construction & Maintenance | City Coolies",
  description: "Explore home and apartment construction, exterior civil work, commercial and industrial construction, repairs, RCC and complete construction. Book a site survey with City Coolies.",
};

type Props = { searchParams: Promise<{ service?: string | string[] }> };

export default async function CivilConstructionPage({ searchParams }: Props) {
  const { service } = await searchParams;
  const serviceId = Array.isArray(service) ? service[0] : service;
  return serviceId ? <CivilConstructionDetails serviceId={serviceId} /> : <CivilConstructionMarketplace />;
}
