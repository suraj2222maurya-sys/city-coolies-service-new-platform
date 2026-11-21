import type { Metadata } from "next";
import ApplianceRepairMarketplace from "./ApplianceRepairMarketplace";
import ApplianceRepairDetails from "./ApplianceRepairDetails";
export const metadata: Metadata = { title: "Appliance Repair & Installation | City Coolies", description: "Choose washing machine, refrigerator, cooler, geyser, TV, chimney, gas stove, gas pipe and exhaust fan service or installation." };
type Props = { searchParams: Promise<{ service?: string | string[] }> };
export default async function Page({ searchParams }: Props) {
  const { service } = await searchParams;
  const id = Array.isArray(service) ? service[0] : service;
  return id ? <ApplianceRepairDetails serviceId={id} /> : <ApplianceRepairMarketplace />;
}
