import type { Metadata } from "next";
import PaintingServicesMarketplace from "./PaintingServicesMarketplace";
import PaintingServicesDetails from "./PaintingServicesDetails";

export const metadata: Metadata = {
  title: "Painting Services | City Coolies",
  description: "Explore home and commercial painting, waterproofing, texture finishes, and safety marking. Book a painting site survey with City Coolies.",
};

type Props = { searchParams: Promise<{ service?: string | string[] }> };

export default async function PaintingServicesPage({ searchParams }: Props) {
  const { service } = await searchParams;
  const serviceId = Array.isArray(service) ? service[0] : service;
  return serviceId ? <PaintingServicesDetails serviceId={serviceId} /> : <PaintingServicesMarketplace />;
}
