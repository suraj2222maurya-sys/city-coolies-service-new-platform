import type { Metadata } from "next";
import GardeningMarketplace from "./GardeningMarketplace";
import GardeningDetails from "./GardeningDetails";

export const metadata: Metadata = {
  title: "Gardening & Landscaping | City Coolies",
  description: "Gardener visits, lawn care, landscaping, vertical gardens, nursery plants, pots and compost with City Coolies.",
};

type Props = {
  searchParams: Promise<{ service?: string }>;
};

export default async function GardeningPage({ searchParams }: Props) {
  const { service } = await searchParams;
  return service ? <GardeningDetails serviceId={service} /> : <GardeningMarketplace />;
}
