import type { Metadata } from "next";
import CarpentryInteriorMarketplace from "./CarpentryInteriorMarketplace";
import CarpentryInteriorDetails from "./CarpentryInteriorDetails";
export const metadata: Metadata = { title: "Carpentry & Interior Works | City Coolies", description: "Book a carpentry or interior design site survey. Explore furniture, doors, wardrobes, modular kitchens and home or commercial interior planning." };
type Props = { searchParams: Promise<{ service?: string | string[] }> };
export default async function Page({ searchParams }: Props) {
  const { service } = await searchParams;
  const id = Array.isArray(service) ? service[0] : service;
  return id ? <CarpentryInteriorDetails serviceId={id} /> : <CarpentryInteriorMarketplace />;
}
