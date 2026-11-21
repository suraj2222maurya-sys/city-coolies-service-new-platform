import type { Metadata } from "next";
import RenovationMarketplace from "./RenovationMarketplace";
import RenovationDetails from "./RenovationDetails";

export const metadata: Metadata = {
  title: "Renovation Services | City Coolies",
  description:
    "Explore home, kitchen, bathroom, villa, electrical, office and showroom renovation services. Book a site survey with City Coolies.",
};

type Props = {
  searchParams: Promise<{ service?: string | string[] }>;
};

export default async function RenovationPage({ searchParams }: Props) {
  const { service } = await searchParams;
  const serviceId = Array.isArray(service) ? service[0] : service;

  return serviceId
    ? <RenovationDetails serviceId={serviceId} />
    : <RenovationMarketplace />;
}