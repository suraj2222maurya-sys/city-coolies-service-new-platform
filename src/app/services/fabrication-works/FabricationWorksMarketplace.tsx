"use client";

import Image from "next/image";
import Link from "next/link";
import ServiceCartSidebar from "@/app/services/ServiceCartSidebar";
import { upsertServiceCartItem } from "@/app/services/serviceCart";

type FabricationService = {
  id: string;
  title: string;
  banner: string;
  thumbnail: string;
};

const SERVICES: readonly FabricationService[] = [
  {
    id: "gate-fabrication",
    title: "Gate Fabrication & Installation",
    banner: "gate_fabrication_installation_service_banner.webp",
    thumbnail: "gate_fabrication_installation_service_banner_selector.webp",
  },
  {
    id: "grills-railing",
    title: "Window Grills & Railings",
    banner: "window_grills_railings_service_banner.webp",
    thumbnail: "window_grills_railings_service_banner_selector.webp",
  },
  {
    id: "shed-canopy",
    title: "Roof Shed & Canopy Fabrication",
    banner: "roof_shed_canopy_fabrication_service_banner.webp",
    thumbnail: "roof_shed_canopy_fabrication_service_banner_selector.webp",
  },
  {
    id: "steel-structure",
    title: "Structural Steel Fabrication",
    banner: "structural_steel_fabrication_service_banner.webp",
    thumbnail: "structural_steel_fabrication_service_banner_selector.webp",
  },
  {
    id: "welding-repair",
    title: "Welding & Metal Repair",
    banner: "welding_metal_repair_service_banner.webp",
    thumbnail: "welding_metal_repair_service_banner_selector.webp",
  },
  {
    id: "commercial-custom-fabrication",
    title: "Custom & Commercial Fabrication",
    banner: "custom_commercial_fabrication_service_banner.webp",
    thumbnail: "custom_commercial_fabrication_service_banner_selector.webp",
  },
];

const SERVICE_PATH = "/services/fabrication-works";
const IMAGE_PATH = "/fabrication-works";
const SURVEY_PRICE = 500;

export default function FabricationWorksMarketplace() {
  const scrollToService = (serviceId: string) => {
    document.getElementById(serviceId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollSelector = () => {
    document.getElementById("fabrication-selector")?.scrollBy({
      left: 320,
      behavior: "smooth",
    });
  };

  const addSurveyToCart = (service: FabricationService) => {
    upsertServiceCartItem({
      id: `fabrication:${service.id}`,
      serviceTitle: service.title,
      optionLabel: "Site survey",
      price: SURVEY_PRICE,
      priceLabel: `₹${SURVEY_PRICE.toLocaleString("en-IN")}`,
      duration:
        "Final fabrication rate confirmed after the site survey and approved scope",
    });

    window.dispatchEvent(
      new Event("citycoolies:deep-cleaning-cart-added")
    );
  };
  return (
    <section className="section" id="city-coolies-fabrication">
      <div className="container">
        <div className="columns">
          <main className="main">
            <h1 className="eyebrow">Fabrication Works</h1>

            <div className="selectorViewport">
              <nav
                id="fabrication-selector"
                className="selector"
                aria-label="Select a fabrication service"
              >
                {SERVICES.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    className="selectorItem"
                    onClick={() => scrollToService(service.id)}
                  >
                    <Image
                      className="thumbnail"
                      src={`${IMAGE_PATH}/${service.thumbnail}`}
                      width={100}
                      height={100}
                      alt=""
                      unoptimized
                    />
                    <span className="selectorLabel">
                      {service.title}
                    </span>
                  </button>
                ))}
              </nav>

              <button
                type="button"
                className="selectorArrow next"
                aria-label="Show more services"
                onClick={scrollSelector}
              >
                →
              </button>
            </div>

            {SERVICES.map((service) => {
              const detailsUrl = `${SERVICE_PATH}?service=${service.id}`;

              return (
                <section
                  key={service.id}
                  id={service.id}
                  className="serviceGroup"
                >
                  <h2>{service.title}</h2>

                  <Image
                    className="banner"
                    src={`${IMAGE_PATH}/${service.banner}`}
                    width={1942}
                    height={809}
                    alt={service.title}
                    unoptimized
                  />

                  <div className="serviceRow">
                    <div className="serviceInfo">
                      <h3>{service.title}</h3>

                      <div className="rating">
                        <span className="star" aria-hidden="true">
                          ★
                        </span>
                        <span>4.20</span>
                        <span>(Sample rating)</span>

                        <Link href={detailsUrl}>
                          View details
                        </Link>
                      </div>

                      <strong className="price">
                        Site survey ₹{SURVEY_PRICE}
                      </strong>
                    </div>

                    <button
                      type="button"
                      className="addButton"
                      onClick={() => addSurveyToCart(service)}
                    >
                      Add
                    </button>
                  </div>
                </section>
              );
            })}
          </main>

          <aside className="sidebar">
            <ServiceCartSidebar />
          </aside>
        </div>
      </div>

      <style jsx global>{`
        .section {
          box-sizing: border-box;
          width: 100%;
          background: #fff;
          color: #171717;
        }

        .container {
          box-sizing: border-box;
          width: min(928px, calc(100% - 32px));
          margin: 0 auto;
          padding: 28px 0 64px;
        }

        .columns {
          display: grid;
          grid-template-columns: minmax(0, 590px) minmax(0, 310px);
          gap: 28px;
          align-items: start;
        }

        .main {
          min-width: 0;
          padding-bottom: 60px;
        }

        .sidebar {
          min-width: 0;
          position: sticky;
          top: 170px;
        }

        .eyebrow {
          margin: 0 0 18px;
          color: #ef1b23;
          font-size: 18px;
          font-weight: 700;
        }

        .selectorViewport {
          position: relative;
          min-width: 0;
        }

        .selector {
          display: flex;
          gap: 4px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          padding-bottom: 8px;
          margin-bottom: 10px;
        }

        .selector::-webkit-scrollbar {
          display: none;
        }

        .selectorItem {
          display: flex;
          flex: 0 0 100px;
          width: 100px;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          border: 0;
          padding: 0;
          background: none;
          color: inherit;
          cursor: pointer;
          scroll-snap-align: start;
          font: inherit;
        }

        .thumbnail {
          display: block;
          width: 100px;
          height: 100px;
          object-fit: cover;
          object-position: center;
          flex-shrink: 0;
        }

        .selectorLabel {
          font-size: 12px;
          font-weight: 400;
          line-height: 1.25;
          text-align: center;
        }

        .selectorArrow {
          position: absolute;
          top: 46px;
          z-index: 2;
          width: 38px;
          height: 38px;
          border: 1px solid #f3cbd0;
          border-radius: 50%;
          background: #fff;
          color: #ef1b23;
          font-size: 24px;
          cursor: pointer;
        }

        .next {
          right: 0;
        }

        .serviceGroup {
          scroll-margin-top: 145px;
          padding: 10px 0 25px;
          border-bottom: 1px solid #f0dfe2;
        }

        .serviceGroup + .serviceGroup {
          padding-top: 25px;
        }

        .serviceGroup h2 {
          margin: 0 0 12px;
          font-size: 28px;
          line-height: 1.2;
        }

        .banner {
          display: block;
          width: 100%;
          height: auto;
          object-fit: contain;
          background: #fff4f5;
        }

        .serviceRow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding-top: 12px;
        }

        .serviceInfo {
          min-width: 0;
        }

        .serviceRow h3 {
          margin: 0 0 6px;
          font-size: 19px;
        }

        .rating {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 5px;
          color: #555f6c;
          font-size: 13px;
        }

        .star {
          display: inline-grid;
          place-items: center;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ef1b23;
          color: #fff;
          font-size: 11px;
        }

        .rating a {
          margin-left: 5px;
          color: #e71922;
          font-weight: 600;
          text-decoration: none;
        }

        .price {
          display: block;
          margin-top: 11px;
        }

        .addButton {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 85px;
          min-height: 42px;
          border: 1px solid #ef1b23;
          border-radius: 10px;
          padding: 9px 16px;
          background: #fff;
          color: #ef1b23;
          font-size: 16px;
          font-weight: 700;
          text-decoration: none;
          cursor: pointer;
        }

        .addButton:hover {
          background: #ef1b23;
          color: #fff;
        }

        @media (max-width: 980px) {
          .container {
            width: min(calc(100% - 28px), 810px);
          }

          .columns {
            grid-template-columns: minmax(0, 1fr);
          }

          .sidebar {
            position: static;
          }
        }

        @media (max-width: 760px) {
          .selectorArrow {
            display: none;
          }
        }

        @media (max-width: 600px) {
        .container {
            padding-top: 144px;
          }

          .serviceGroup h2 {
            font-size: 24px;
          }

          .serviceRow h3 {
            font-size: 17px;
          }
        }
      `}</style>
    </section>
  );
}