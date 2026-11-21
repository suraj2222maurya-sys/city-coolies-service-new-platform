"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import BathroomCleaningSection from "./bathroom-cleaning/BathroomCleaningSection";
import CobwebCleaningSection from "./cobweb-cleaning/CobwebCleaningSection";
import FullHomeByRoomCleaningSection from "./full-home-by-room/FullHomeByRoomCleaningSection";
import FullHomeServiceDetails from "./full-home-by-room/FullHomeServiceDetails";
import IndustrialCleaningSection from "./industrial-cleaning/IndustrialCleaningSection";
import KitchenCleaningSection from "./kitchen-cleaning/KitchenCleaningSection";
import KitchenServiceDetails from "./kitchen-cleaning/KitchenServiceDetails";
import LivingBedroomCleaningSection from "./living-bedroom/LivingBedroomCleaningSection";
import BathroomServiceDetails from "./bathroom-cleaning/BathroomServiceDetails";
import TankServiceDetails from "./tank-cleaning/TankServiceDetails";
import IndustrialServiceDetails from "./industrial-cleaning/IndustrialServiceDetails";
import CobwebServiceDetails from "./cobweb-cleaning/CobwebServiceDetails";
import TankCleaningSection from "./tank-cleaning/TankCleaningSection";

import {
  deepCleaningCategories,
  type DeepCleaningCategoryId,
} from "./deepCleaningCategories";


type DeepCleaningMarketplaceProps = {
  initialCategory?: string;
  initialServiceId?: string;
  initialKitchenServiceId?: string;
  initialCobwebServiceId?: string;
  initialIndustrialServiceId?: string;
  initialTankServiceId?: string;
  initialBathroomServiceId?: string;
};

const categoryIcons: Record<
  DeepCleaningCategoryId,
  string
> = {
  "full-home-by-room":
    "/deep-cleaning/glossy_house_cleaning_icon.png",

  "living-bedroom":
    "/deep-cleaning/glossy_red_home_cleaning_icon.png",

  "kitchen-cleaning":
    "/deep-cleaning/kitchen_cleaning_icon.png",

  "bathroom-cleaning":
    "/deep-cleaning/_bathroom_cleaning_icon.png",

  "tank-cleaning":
    "/deep-cleaning/tank_cleaning_icon.png",

  "industrial-cleaning":
    "/deep-cleaning/factory_cleaning_icon.png",
  "cobweb-cleaning": "/deep-cleaning/cobweb_cleaning_icon1.png",
};

function isDeepCleaningCategoryId(
  value: string | undefined,
): value is DeepCleaningCategoryId {
  return deepCleaningCategories.some(
    (category) => category.id === value,
  );
}

function resolveCategory(
  value: string | undefined,
): DeepCleaningCategoryId {
  if (isDeepCleaningCategoryId(value)) {
    return value;
  }

  return "full-home-by-room";
}

export default function DeepCleaningCategorySelector({
  initialCategory,
  initialServiceId,
  initialKitchenServiceId,
  initialCobwebServiceId,
  initialIndustrialServiceId,
  initialTankServiceId,
  initialBathroomServiceId,
}: DeepCleaningMarketplaceProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const livingServiceId = searchParams.get("livingService");

  const resolvedInitialCategory =
    resolveCategory(initialCategory);

  const [activeCategory, setActiveCategory] =
    useState<DeepCleaningCategoryId>(
      resolvedInitialCategory,
    );



  // Reserve only the space missing beneath the fixed navbar.
  // RootLayout already provides the initial page offset.
  const [mobileHeaderOffset, setMobileHeaderOffset] = useState(0);

  useEffect(() => {
    const navbar = document.querySelector<HTMLElement>("header.fixed");
    const section = document.querySelector<HTMLElement>(".ccdc-section");

    if (!navbar || !section) {
      return;
    }

    const updateMobileSpacing = () => {
      const isPhone = window.matchMedia("(max-width: 539px)").matches;

      if (!isPhone) {
        setMobileHeaderOffset(0);
        return;
      }

      const sectionDocumentTop =
        section.getBoundingClientRect().top + window.scrollY;

      const navbarBottom = navbar.getBoundingClientRect().bottom;

      const requiredSpacing = Math.max(
        0,
        Math.ceil(navbarBottom - sectionDocumentTop + 8),
      );

      setMobileHeaderOffset(requiredSpacing);
    };

    const resizeObserver = new ResizeObserver(updateMobileSpacing);

    resizeObserver.observe(navbar);

    window.addEventListener("resize", updateMobileSpacing);

    updateMobileSpacing();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateMobileSpacing);
    };
  }, []);
  const selectCategory = (
    category: DeepCleaningCategoryId,
  ) => {
    if (category === activeCategory) {
      return;
    }

    setActiveCategory(category);

    const params = new URLSearchParams(
      window.location.search,
    );

    params.set("category", category);
    params.delete("service");
    params.delete("livingService");
    params.delete("kitchenService");
    params.delete("cobwebService");
    params.delete("industrialService");
    params.delete("tankService");
    params.delete("bathroomService");

    const query = params.toString();

    router.replace(
      query
        ? `${pathname}?${query}`
        : pathname,
      {
        scroll: false,
      },
    );
  };

  if (livingServiceId && resolvedInitialCategory === "living-bedroom") {
    return <LivingBedroomCleaningSection />;
  }
  if (initialKitchenServiceId && resolvedInitialCategory === "kitchen-cleaning") {
    return (
      <KitchenServiceDetails
        key={initialKitchenServiceId}
        serviceId={initialKitchenServiceId.replace(/^\/+/, "")}
      />
    );
  }
  if (initialBathroomServiceId && resolvedInitialCategory === "bathroom-cleaning") {
    return <BathroomServiceDetails key={initialBathroomServiceId} serviceId={initialBathroomServiceId} />;
  }

  if (initialTankServiceId && resolvedInitialCategory === "tank-cleaning") {
    return <TankServiceDetails key={initialTankServiceId} serviceId={initialTankServiceId} />;
  }

  if (initialIndustrialServiceId && resolvedInitialCategory === "industrial-cleaning") {
    return <IndustrialServiceDetails key={initialIndustrialServiceId} serviceId={initialIndustrialServiceId} />;
  }

  if (initialCobwebServiceId && resolvedInitialCategory === "cobweb-cleaning") {
    return <CobwebServiceDetails key={initialCobwebServiceId} serviceId={initialCobwebServiceId} />;
  }

  if (initialServiceId && activeCategory === "full-home-by-room") {
    return <FullHomeServiceDetails serviceId={initialServiceId} />;
  }
  return (
    <section
      className={"ccdc-section"}
      style={{ paddingTop: mobileHeaderOffset }}
      aria-labelledby="deep-cleaning-title"
    >
      <style>{deepCleaningSelectorCSS}</style>
      <div className={"ccdc-container"}>


        <nav
          className={"ccdc-selectorPanel"}
          aria-label="Deep cleaning services"
        >
          <div className={"ccdc-selectorHeading"}>
            Select a cleaning service
          </div>

          <div className={"ccdc-categoryGrid"}>
            {deepCleaningCategories.map(
              (category) => {
                const isActive =
                  activeCategory === category.id;

                return (
                  <button
                    key={category.id}
                    type="button"
                    className={`${"ccdc-categoryButton"} ${
                      isActive
                        ? "ccdc-categoryButtonActive"
                        : ""
                    }`}
                    aria-pressed={isActive}
                    onClick={() =>
                      selectCategory(category.id)
                    }
                  >
                    <span
                      className={"ccdc-iconArea"}
                      aria-hidden="true"
                    >
                      <Image loading="eager"
                        unoptimized
                        src={serviceDisplaySource(categoryIcons[
                            category.id
                          ])}
                        alt=""
                        width={88}
                        height={88}
                        sizes="(max-width: 539px) 58px, (max-width: 899px) 68px, 76px"
                        className={
                          "ccdc-categoryIcon"
                        }
                      />
                    </span>

                    <span
                      className={
                        "ccdc-categoryName"
                      }
                    >
                      {category.name}
                    </span>
                  </button>
                );
              },
            )}
          </div>
        </nav>

        <div className={"ccdc-contentDivider"} />

        <div className={"ccdc-contentArea"}>
          {activeCategory === "full-home-by-room" &&
            (initialServiceId ? (
              <FullHomeServiceDetails serviceId={initialServiceId} />
            ) : (
              <FullHomeByRoomCleaningSection />
            ))}

          {activeCategory ===
            "living-bedroom" && (
            <LivingBedroomCleaningSection />
          )}

          {activeCategory === "kitchen-cleaning" && (initialKitchenServiceId ? (<KitchenServiceDetails key={initialKitchenServiceId} serviceId={initialKitchenServiceId} />) : (<KitchenCleaningSection />))}

          {activeCategory ===
            "bathroom-cleaning" && (
            <BathroomCleaningSection />
          )}

          {activeCategory ===
            "tank-cleaning" && (
            <TankCleaningSection />
          )}

          {activeCategory ===
            "industrial-cleaning" && (
            <IndustrialCleaningSection />
          )}

          {activeCategory === "cobweb-cleaning" && (
            <CobwebCleaningSection />
          )}
        </div>
      </div>
    </section>
  );
}

const serviceDisplayImages: Record<string, string> = {
  "/deep-cleaning/carpet_cleaning_service_banner.png": "/deep-cleaning/carpet_cleaning_service_banner_selector.webp",
  "/deep-cleaning/carpet_cleaning_service_banner.webp": "/deep-cleaning/carpet_cleaning_service_banner_selector.webp",
  "/deep-cleaning/chimney_cleaning_service_banner.png": "/deep-cleaning/chimney_cleaning_service_banner_selector.webp",
  "/deep-cleaning/chimney_cleaning_service_banner.webp": "/deep-cleaning/chimney_cleaning_service_banner_selector.webp",
  "/deep-cleaning/commercial_kitchen_cleaning_service_banner.png": "/deep-cleaning/commercial_kitchen_cleaning_service_banner_selector.webp",
  "/deep-cleaning/commercial_kitchen_cleaning_service_banner.webp": "/deep-cleaning/commercial_kitchen_cleaning_service_banner_selector.webp",
  "/deep-cleaning/complete_kitchen_cleaning_service_banner.png": "/deep-cleaning/complete_kitchen_cleaning_service_banner_selector.webp",
  "/deep-cleaning/complete_kitchen_cleaning_service_banner.webp": "/deep-cleaning/complete_kitchen_cleaning_service_banner_selector.webp",
  "/deep-cleaning/curtain_cleaning_service_banner.png": "/deep-cleaning/curtain_cleaning_service_banner_selector.webp",
  "/deep-cleaning/curtain_cleaning_service_banner.webp": "/deep-cleaning/curtain_cleaning_service_banner_selector.webp",
  "/deep-cleaning/dining_table_cleaning_service_banner.png": "/deep-cleaning/dining_table_cleaning_service_banner_selector.webp",
  "/deep-cleaning/dining_table_cleaning_service_banner.webp": "/deep-cleaning/dining_table_cleaning_service_banner_selector.webp",
  "/deep-cleaning/gas_stove_cleaning_service_banner.png": "/deep-cleaning/gas_stove_cleaning_service_banner_selector.webp",
  "/deep-cleaning/gas_stove_cleaning_service_banner.webp": "/deep-cleaning/gas_stove_cleaning_service_banner_selector.webp",
  "/deep-cleaning/leather_sofa_cleaning_service_banner.png": "/deep-cleaning/leather_sofa_cleaning_service_banner_selector.webp",
  "/deep-cleaning/leather_sofa_cleaning_service_banner.webp": "/deep-cleaning/leather_sofa_cleaning_service_banner_selector.webp",
  "/deep-cleaning/mattress_cleaning_service_banner.png": "/deep-cleaning/mattress_cleaning_service_banner_selector.webp",
  "/deep-cleaning/mattress_cleaning_service_banner.webp": "/deep-cleaning/mattress_cleaning_service_banner_selector.webp",
  "/deep-cleaning/microwave_cleaning_service_banner.png": "/deep-cleaning/microwave_cleaning_service_banner_selector.webp",
  "/deep-cleaning/microwave_cleaning_service_banner.webp": "/deep-cleaning/microwave_cleaning_service_banner_selector.webp",
  "/deep-cleaning/sofa_cleaning_service_banner.png": "/deep-cleaning/sofa_cleaning_service_banner_selector.webp",
  "/deep-cleaning/sofa_cleaning_service_banner.webp": "/deep-cleaning/sofa_cleaning_service_banner_selector.webp"
};
function serviceDisplaySource(src: string): string {
  const queryAt = src.indexOf("?");
  const base = queryAt < 0 ? src : src.slice(0, queryAt);
  return serviceDisplayImages[base] ?? src;
}

// Selector styling is colocated here; service-section styles remain unchanged.
const deepCleaningSelectorCSS = `
/* Scoped Deep Cleaning category selector styles. */
.ccdc-section {
  width:100%;
  background:#fff;
  color:#171717;
}
.ccdc-container {
  box-sizing:border-box;
  width:100%;
  max-width:1240px;
  margin-inline:auto;
  padding:10px 16px 72px;
}
.ccdc-selectorPanel {
  width:100%;
  min-width:0;
  margin:0;
  padding:0;
  border:0;
  background:transparent;
}
.ccdc-selectorHeading {
  margin:0 0 6px;
  font-size:14px;
  font-weight:650;
  line-height:1.3;
}
.ccdc-categoryGrid {
  display:grid;
  grid-template-columns:repeat(7,100px);
  justify-content:start;
  gap:8px 10px;
  width:100%;
  min-width:0;
}
.ccdc-categoryButton {
  position:relative;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:flex-start;
  gap:2px;
  width:100px;
  min-width:0;
  margin:0;
  padding:0 0 6px;
  border:0;
  border-radius:0;
  background:transparent;
  color:#1d1d1d;
  font:inherit;
  text-align:center;
  cursor:pointer;
  user-select:none;
  -webkit-tap-highlight-color:transparent;
}
.ccdc-iconArea {
  display:flex;
  width:50px;
  height:50px;
  align-items:center;
  justify-content:center;
}
.ccdc-categoryIcon {
  display:block;
  width:100%;
  height:100%;
  object-fit:contain;
  object-position:center;
}
.ccdc-categoryName {
  display:block;
  max-width:96px;
  font-size:10.5px;
  font-weight:600;
  line-height:1.18;
  text-align:center;
}
.ccdc-categoryButtonActive {
  color:#ef1b23;
}
.ccdc-categoryButtonActive::after {
  content:"";
  position:absolute;
  left:50%;
  bottom:0;
  width:20px;
  height:2px;
  border-radius:999px;
  background:#ef1b23;
  transform:translateX(-50%);
}
.ccdc-categoryButton:focus-visible {
  outline:2px solid #ef1b23;
  outline-offset:3px;
}
.ccdc-contentDivider {
  width:100%;
  height:1px;
  margin:9px 0 20px;
  background:#f1e4e5;
}
.ccdc-contentArea {
  width:100%;
  min-width:0;
}
@media (hover:hover) and (pointer:fine) {
  .ccdc-categoryButton:hover {
    color:#ef1b23;
  }
}
@media (max-width:899px) and (min-width:540px) {
  .ccdc-categoryGrid {
    grid-template-columns:repeat(3,96px);
    gap:12px 9px;
  }
  .ccdc-categoryButton {
    width:96px;
  }
  .ccdc-iconArea {
    width:48px;
    height:48px;
  }
  .ccdc-categoryName {
    max-width:92px;
    font-size:10px;
  }
}
@media (max-width:539px) {
  .ccdc-container {
    padding:10px 12px 72px;
  }
  .ccdc-selectorPanel {
    display:block;
    width:100%;
    min-width:0;
    overflow:hidden;
  }
  .ccdc-selectorHeading {
    margin:0 0 8px;
    font-size:13px;
  }
  .ccdc-categoryGrid {
    display:flex;
    flex-wrap:nowrap;
    align-items:flex-start;
    justify-content:flex-start;
    gap:10px;
    width:100%;
    max-width:100%;
    overflow-x:auto;
    overflow-y:hidden;
    padding:2px 2px 8px;
    scroll-snap-type:x proximity;
    scrollbar-width:none;
    -webkit-overflow-scrolling:touch;
    overscroll-behavior-x:contain;
    touch-action:pan-x pan-y;
  }
  .ccdc-categoryGrid::-webkit-scrollbar {
    display:none;
  }
  .ccdc-categoryButton {
    flex:0 0 72px;
    width:72px;
    min-width:72px;
    max-width:72px;
    gap:3px;
    padding:0 0 6px;
    scroll-snap-align:start;
  }
  .ccdc-iconArea {
    width:42px;
    height:42px;
  }
  .ccdc-categoryName {
    width:72px;
    max-width:72px;
    font-size:9.5px;
    font-weight:600;
    line-height:1.12;
  }
  .ccdc-contentDivider {
    margin:6px 0 14px;
  }
}
`;
