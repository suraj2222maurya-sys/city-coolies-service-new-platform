import type { Metadata } from "next";
import SpaSalonMarketplace from "./SpaSalonMarketplace";
import SpaSalonDetails from "./SpaSalonDetails";

export const metadata: Metadata = {
  title: "Spa & Salon | City Coolies",
  description: "Explore spa and salon services for women and men.",
};

type Props = { searchParams: Promise<{ service?: string | string[] }> };

export default async function SpaSalonPage({ searchParams }: Props) {
  const { service } = await searchParams;
  const serviceId = Array.isArray(service) ? service[0] : service;
  return serviceId ? <SpaSalonDetails serviceId={serviceId} /> : <SpaSalonMarketplace />;
}
