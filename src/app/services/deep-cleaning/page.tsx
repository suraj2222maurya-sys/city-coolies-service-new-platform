import type { Metadata } from "next";
import DeepCleaningCategorySelector from "./DeepCleaningCategorySelector";

export const metadata: Metadata = {
  title: "Deep Cleaning Services | City Coolies",
  description:
    "Explore professional deep cleaning services from City Coolies for homes, rooms, kitchens, bathrooms, water tanks and industrial properties.",
};

type DeepCleaningSearchParams = {
  bathroomService?: string | string[];
  tankService?: string | string[];
  industrialService?: string | string[];
  cobwebService?: string | string[];
  kitchenService?: string | string[];
  category?: string | string[];
  service?: string | string[];
};

type DeepCleaningPageProps = {
  searchParams?:
    | DeepCleaningSearchParams
    | Promise<DeepCleaningSearchParams>;
};

export default async function DeepCleaningPage({
  searchParams,
}: DeepCleaningPageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const kitchenValue = resolvedSearchParams?.kitchenService;
  const kitchenServiceId = Array.isArray(kitchenValue) ? kitchenValue[0] : kitchenValue;
  const categoryValue = resolvedSearchParams?.category;
  const category = Array.isArray(categoryValue)
    ? categoryValue[0]
    : categoryValue;

  const serviceValue = resolvedSearchParams?.service;
  const serviceId = Array.isArray(serviceValue)
    ? serviceValue[0]
    : serviceValue;

  const bathroomServiceValue = resolvedSearchParams?.bathroomService;
  const bathroomServiceId = Array.isArray(bathroomServiceValue) ? bathroomServiceValue[0] : bathroomServiceValue;

  const tankServiceValue = resolvedSearchParams?.tankService;
  const tankServiceId = Array.isArray(tankServiceValue) ? tankServiceValue[0] : tankServiceValue;

  const industrialServiceValue = resolvedSearchParams?.industrialService;
  const industrialServiceId = Array.isArray(industrialServiceValue) ? industrialServiceValue[0] : industrialServiceValue;

  const cobwebServiceValue = resolvedSearchParams?.cobwebService;
  const cobwebServiceId = Array.isArray(cobwebServiceValue) ? cobwebServiceValue[0] : cobwebServiceValue;

  return (
    <main>
      <DeepCleaningCategorySelector key={`${category ?? "full-home-by-room"}:${serviceId ?? ""}:${kitchenServiceId ?? ""}:${bathroomServiceId ?? ""}:${tankServiceId ?? ""}:${industrialServiceId ?? ""}:${cobwebServiceId ?? ""}`} initialCategory={category} initialServiceId={serviceId} initialKitchenServiceId={kitchenServiceId} initialCobwebServiceId={cobwebServiceId} initialIndustrialServiceId={industrialServiceId} initialTankServiceId={tankServiceId} initialBathroomServiceId={bathroomServiceId} />
    </main>
  );
}