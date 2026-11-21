import type { Metadata } from "next";
import PlumbingWorksMarketplace from "./PlumbingWorksMarketplace";
import PlumbingWorksDetails from "./PlumbingWorksDetails";

export const metadata: Metadata = {
  title: "Plumbing Works | City Coolies",
  description: "Book plumbing services for homes, apartments, villas, schools and commercial properties. Choose pipe work and fitting services or arrange a site survey.",
};

type Props = { searchParams: Promise<{ service?: string | string[] }> };

export default async function PlumbingWorksPage({ searchParams }: Props) {
  const { service } = await searchParams;
  const serviceId = Array.isArray(service) ? service[0] : service;
  return serviceId ? <PlumbingWorksDetails serviceId={serviceId} /> : <PlumbingWorksMarketplace />;
}
