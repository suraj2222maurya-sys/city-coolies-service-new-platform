"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ServiceCartSidebar from "@/app/services/ServiceCartSidebar";
import { upsertServiceCartItem } from "@/app/services/serviceCart";

type ElectricalListing = {
  id: string;
  title: string;
  rating: number;
  reviews: number;
  price: number;
  survey?: boolean;
  banner: string;
  thumbnail: string;
};

const services: readonly ElectricalListing[] = [
  {
    id: "full-house-electrical-wiring",
    title: "Full House Electrical Wiring",
    rating: 4.2,
    reviews: 846,
    price: 500,
    survey: true,
    banner: "full_house_electrical_wiring_service_banner.webp",
    thumbnail: "full_house_electrical_wiring_service_banner_selector.webp",
  },
  {
    id: "electrical-installation",
    title: "Electrical Installation",
    rating: 4.2,
    reviews: 723,
    price: 0,
    banner: "electrical_installation_service_banner.webp",
    thumbnail: "electrical_installation_service_banner_selector.webp",
  },
  {
    id: "smart-switch-automation-setup",
    title: "Smart Switch & Automation Setup",
    rating: 4.1,
    reviews: 612,
    price: 599,
    banner: "smart_switch_automation_setup_service_banner.webp",
    thumbnail: "smart_switch_automation_setup_service_banner_selector.webp",
  },
  {
    id: "doorbell-video-doorbell-fitting",
    title: "Doorbell / Video Doorbell Fitting",
    rating: 4.2,
    reviews: 574,
    price: 399,
    banner: "doorbell_video_doorbell_fitting_service_banner.webp",
    thumbnail: "doorbell_video_doorbell_fitting_service_banner_selector.webp",
  },
  {
    id: "main-meter-box-panel-work",
    title: "Main Meter Box Wiring / Panel Work",
    rating: 4.2,
    reviews: 498,
    price: 500,
    survey: true,
    banner: "main_meter_box_wiring_panel_work_service_banner.webp",
    thumbnail: "main_meter_box_wiring_panel_work_service_banner_selector.webp",
  },
];

const SERVICE_PATH = "/services/electrical-works";
const IMAGE_PATH = "/electrical-works";
const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;

export default function ElectricalWorksMarketplace() {
  const [selectorScrolled, setSelectorScrolled] = useState(false);

  const scrollSelector = (distance: number) => {
    document.getElementById("electrical-service-selector")?.scrollBy({
      left: distance,
      behavior: "smooth",
    });
  };

  return (
    <section id="city-coolies-electrical">
      <div className="electrical-container">
        <div className="electrical-columns">
          <main className="electrical-main">
            <h1 className="electrical-eyebrow">Electrical Works</h1>

            <div className="electrical-selectorViewport">
              {selectorScrolled && (
                <button
                  type="button"
                  className="electrical-selectorArrow electrical-prev"
                  aria-label="Previous services"
                  onClick={() => scrollSelector(-320)}
                >
                  ←
                </button>
              )}

              <nav
                id="electrical-service-selector"
                className="electrical-selector"
                aria-label="Select an electrical service"
                onScroll={(event) =>
                  setSelectorScrolled(event.currentTarget.scrollLeft > 4)
                }
              >
                {services.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    className="electrical-selectorItem"
                    onClick={() =>
                      document.getElementById(service.id)?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      })
                    }
                  >
                    <Image
                      unoptimized
                      className="electrical-thumbnail"
                      src={`${IMAGE_PATH}/${service.thumbnail}`}
                      alt=""
                      width={100}
                      height={100}
                    />
                    <span className="electrical-selectorLabel">{service.title}</span>
                  </button>
                ))}
              </nav>

              <button
                type="button"
                className="electrical-selectorArrow electrical-next"
                aria-label="More services"
                onClick={() => scrollSelector(320)}
              >
                →
              </button>
            </div>

            {services.map((service) => {
              const detailsUrl = `${SERVICE_PATH}?service=${service.id}`;
              const priceLabel =
                service.id === "electrical-installation"
                  ? "Choose installation jobs"
                  : service.survey
                    ? `Site survey ${formatPrice(service.price)}`
                    : `Starts at ${formatPrice(service.price)}`;

              return (
                <section
                  key={service.id}
                  id={service.id}
                  className="electrical-serviceGroup"
                >
                  <h2>{service.title}</h2>
                  <Image
                    unoptimized
                    className="electrical-banner"
                    src={`${IMAGE_PATH}/${service.banner}`}
                    alt={service.title}
                    width={1942}
                    height={809}
                  />

                  <div className="electrical-serviceRow">
                    <div>
                      <h3>{service.title}</h3>
                      <div className="electrical-rating">
                        <span className="electrical-star" aria-hidden="true">★</span>
                        <span>{service.rating.toFixed(2)}</span>
                        <span>
                          ({service.reviews.toLocaleString("en-IN")} reviews)
                        </span>
                        <Link href={detailsUrl}>View details</Link>
                      </div>
                      <strong>{priceLabel}</strong>
                    </div>

                    <button
                      type="button"
                      className="electrical-addButton"
                      style={{ fontFamily: "inherit" }}
                      onClick={() =>
                        upsertServiceCartItem({
                          id: `electrical-works:${service.id}`,
                          serviceTitle: service.title,
                          optionLabel: service.survey
                            ? "Site survey"
                            : service.id === "electrical-installation"
                              ? "Choose installation jobs"
                              : "Starting price",
                          price: service.price,
                          priceLabel,
                          duration: "To be confirmed",
                        })
                      }
                    >
                      Add
                    </button>
                  </div>
                </section>
              );
            })}
          </main>

          <aside className="electrical-sidebar">
            <ServiceCartSidebar />
          </aside>
        </div>
      </div>

      <style jsx global>{`
#city-coolies-electrical {
  background: #fff;
  color: #171717;
}
#city-coolies-electrical * {
  box-sizing: border-box;
}
#city-coolies-electrical .electrical-container {
  width: min(928px, calc(100% - 32px));
  margin: auto;
  padding: 28px 0 64px;
}
#city-coolies-electrical .electrical-columns {
  display: grid;
  grid-template-columns: minmax(0,590px) minmax(0,310px);
  gap: 28px;
  align-items: start;
}
#city-coolies-electrical .electrical-main {
  min-width: 0;
  padding-bottom: 60px;
}
#city-coolies-electrical .electrical-sidebar {
  min-width: 0;
  position: sticky;
  top: 170px;
}
#city-coolies-electrical .electrical-eyebrow {
  margin: 0 0 18px;
  color: #ef1b23;
  font-size: 18px;
  font-weight: 700;
}
#city-coolies-electrical .electrical-selectorViewport {
  position: relative;
  min-width: 0;
}
#city-coolies-electrical .electrical-selector {
  display: flex;
  gap: 4px;
  overflow-x: auto;
  margin: 0 0 10px;
  padding: 0 0 6px;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scrollbar-width: none;
}
#city-coolies-electrical .electrical-selector::-webkit-scrollbar {
  display: none;
}
#city-coolies-electrical .electrical-selectorItem {
  display: flex;
  flex: 0 0 100px;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 0;
  border: 0;
  background: none;
  color: inherit;
  font: inherit;
  cursor: pointer;
  scroll-snap-align: start;
}
#city-coolies-electrical .electrical-thumbnail {
  width: 100px;
  height: 80px;
  object-fit: cover;
  object-position: center;
  background: transparent;
}
#city-coolies-electrical .electrical-selectorLabel {
  width: 100px;
  font-size: 13px;
  line-height: 1.16;
  text-align: center;
}
#city-coolies-electrical .electrical-selectorItem:hover .electrical-selectorLabel {
  color: #ef1b23;
}
#city-coolies-electrical .electrical-selectorArrow {
  position: absolute;
  top: 47px;
  z-index: 2;
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border: 1px solid #f3cbd0;
  border-radius: 50%;
  background: #fff;
  color: #ef1b23;
  font-size: 24px;
  cursor: pointer;
}
#city-coolies-electrical .electrical-prev {
  left: 1px;
}
#city-coolies-electrical .electrical-next {
  right: 1px;
}
#city-coolies-electrical .electrical-serviceGroup {
  padding: 10px 0 25px;
  scroll-margin-top: 145px;
}
#city-coolies-electrical .electrical-serviceGroup + .electrical-serviceGroup {
  padding-top: 25px;
}
#city-coolies-electrical .electrical-serviceGroup h2 {
  margin: 0 0 12px;
  font-size: 28px;
  line-height: 1.2;
}
#city-coolies-electrical .electrical-banner {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 1940/811;
  object-fit: contain;
  background: #fff4f5;
}
#city-coolies-electrical .electrical-serviceRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 12px;
}
#city-coolies-electrical .electrical-serviceRow h3 {
  margin: 0 0 6px;
  font-size: 19px;
}
#city-coolies-electrical .electrical-serviceRow strong {
  display: inline-block;
  margin-top: 11px;
}
#city-coolies-electrical .electrical-rating {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
  color: #555f6c;
  font-size: 13px;
}
#city-coolies-electrical .electrical-star {
  display: inline-grid;
  place-items: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #ef1b23;
  color: white;
  font-size: 11px;
}
#city-coolies-electrical .electrical-rating a {
  padding-left: 5px;
  color: #e71922;
  font-weight: 600;
  text-decoration: none;
}
#city-coolies-electrical .electrical-addButton {
  min-width: 85px;
  min-height: 42px;
  padding: 8px 16px;
  border: 1px solid #ef1b23;
  border-radius: 10px;
  background: white;
  color: #ef1b23;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
}
#city-coolies-electrical .electrical-addButton:hover {
  background: #ef1b23;
  color: white;
}
@media(max-width:980px) {
  #city-coolies-electrical .electrical-container {
    width: min(810px, calc(100% - 28px));
  }
  #city-coolies-electrical .electrical-columns {
    grid-template-columns: minmax(0,1fr);
  }
  #city-coolies-electrical .electrical-sidebar {
    position: static;
  }
}
@media(max-width:760px) {
  #city-coolies-electrical .electrical-selectorArrow {
    display: none;
  }
}
@media(max-width:600px) {
  #city-coolies-electrical .electrical-container {
    width: calc(100% - 24px);
    padding-top: 144px;
  }
  #city-coolies-electrical .electrical-serviceGroup h2 {
    font-size: 24px;
  }
  #city-coolies-electrical .electrical-serviceRow h3 {
    font-size: 17px;
  }
}
      `}</style>
    </section>
  );
}
