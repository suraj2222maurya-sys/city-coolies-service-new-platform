import type { Metadata } from "next";
import ElectricalWorksMarketplace from "./ElectricalWorksMarketplace";
import ElectricalWorksDetails from "./ElectricalWorksDetails";

export const metadata: Metadata = {
  title: "Electrical Works | City Coolies",
  description: "Explore home wiring, electrical installation, smart switches, doorbells and meter panel services with City Coolies.",
};

type Props = { searchParams: Promise<{ service?: string | string[] }> };

export default async function ElectricalWorksPage({ searchParams }: Props) {
  const { service } = await searchParams;
  const serviceId = Array.isArray(service) ? service[0] : service;
  return serviceId ? <ElectricalWorksDetails serviceId={serviceId} /> : <ElectricalWorksMarketplace />;
}
