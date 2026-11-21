import type { Metadata } from "next";
import RentalMarketplace from "./RentalMarketplace";
import RentalDetails from "./RentalDetails";

export const metadata: Metadata = {
  title: "Rental Services | City Coolies",
  description: "Explore City Coolies rental services.",
};

type Props = {
  searchParams: Promise<{ service?: string }>;
};

export default async function RentalServicesPage({ searchParams }: Props) {
  const { service } = await searchParams;

  return service ? (
    <RentalDetails serviceId={service} />
  ) : (
    <RentalMarketplace />
  );
}