import type { Metadata } from "next";
import FabricationWorksMarketplace from "./FabricationWorksMarketplace";
import FabricationWorksDetails from "./FabricationWorksDetails";

export const metadata: Metadata = {
  title: "Fabrication Works | City Coolies",
  description: "Browse gate fabrication, grills, railings, sheds, steel frames, welding repair and commercial fabrication site surveys with City Coolies.",
};

type PageProps = { searchParams: Promise<{ service?: string | string[] }> };

export default async function Page({ searchParams }: PageProps) {
  const { service } = await searchParams;
  const serviceId = Array.isArray(service) ? service[0] : service;
  return serviceId ? <FabricationWorksDetails serviceId={serviceId} /> : <FabricationWorksMarketplace />;
}
