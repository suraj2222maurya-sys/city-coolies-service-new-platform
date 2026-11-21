import type { Metadata } from "next";
import PestControlMarketplace from "./PestControlMarketplace";
import PestControlDetails from "./PestControlDetails";

export const metadata: Metadata = {
  title: "Pest Control | City Coolies",
  description: "Explore home, apartment, cockroach, termite, bed bug, rodent and commercial pest control services with City Coolies.",
};

type PageProps = { searchParams: Promise<{ service?: string | string[] }> };

export default async function Page({ searchParams }: PageProps) {
  const { service } = await searchParams;
  const serviceId = Array.isArray(service) ? service[0] : service;
  return serviceId ? <PestControlDetails serviceId={serviceId} /> : <PestControlMarketplace />;
}
