"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";

import ServiceCartSidebar from "@/app/services/ServiceCartSidebar";
import {
  getServiceCartServerSnapshot,
  getServiceCartSnapshot,
  parseServiceCartSnapshot,
  removeServiceCartItem,
  subscribeServiceCart,
  upsertServiceCartItem,
} from "@/app/services/serviceCart";

import {
  cartId,
  services,
  type Service,
} from "./CivilConstructionDetails";

export { cartId, services } from "./CivilConstructionDetails";
export type { Service } from "./CivilConstructionDetails";

const ASSET_ROOT = "/civil-construction-maintenance";

type ServiceImage = {
  banner: string;
  selector: string;
};

const serviceImages: Record<string, ServiceImage> = {
  "full-home-apartment-construction": {
    banner: "full_home_apartment_construction_service_banner.webp",
    selector: "full_home_apartment_construction_service_banner_selector.webp",
  },
  "exterior-civil-work": {
    banner: "exterior_civil_work_service_banner.webp",
    selector: "exterior_civil_work_service_banner_selector.webp",
  },
  "commercial-industrial-civil-work": {
    banner: "commercial_industrial_civil_work_service_banner.webp",
    selector: "commercial_industrial_civil_work_service_banner_selector.webp",
  },
  "repair-maintenance-civil-work": {
    banner: "repair_maintenance_civil_work_service_banner.webp",
    selector: "repair_maintenance_civil_work_service_banner_selector.webp",
  },
  "rcc-construction": {
    banner: "rcc_construction_service_banner.webp",
    selector: "rcc_construction_service_banner_selector.webp",
  },
  "complete-construction-work": {
    banner: "complete_construction_work_service_banner.webp",
    selector: "complete_construction_work_service_banner_selector.webp",
  },
};

const SURVEY_PRICE = 500;
const SURVEY_LABEL = "₹500";
const SURVEY_DURATION =
  "Final civil work rate confirmed after the site survey and approved scope";

function getImagePath(filename: string): string {
  return `${ASSET_ROOT}/${filename}`;
}

function CivilServiceCard({
  service,
  added,
  onToggle,
}: {
  service: Service;
  added: boolean;
  onToggle: (service: Service) => void;
}) {
  const images = serviceImages[service.id];

  return (
    <section
      id={service.id}
      className="civil-service"
      aria-labelledby={`${service.id}-heading`}
    >
      <h2 id={`${service.id}-heading`}>{service.title}</h2>

      {images && (
        <Image
          unoptimized
          className="civil-banner"
          src={getImagePath(images.banner)}
          alt={service.title}
          width={1942}
          height={809}
        />
      )}

      <div className="civil-serviceInfo">
        <div className="civil-serviceContent">
          <h3>{service.title}</h3>

          <div className="civil-rating">
            <span className="civil-star" aria-hidden="true">
              ★
            </span>
            <span>4.20</span>
            <span>
              ({service.reviews.toLocaleString("en-IN")} reviews)
            </span>
            <Link
              href={`/services/civil-construction-maintenance?service=${encodeURIComponent(service.id)}`}
            >
              View details
            </Link>
          </div>

          <strong className="civil-price">
            Site survey {SURVEY_LABEL}
          </strong>
        </div>

        <button
          type="button"
          className="civil-addButton"
          onClick={() => onToggle(service)}
          aria-label={`${added ? "Remove" : "Add"} ${service.title}`}
        >
          {added ? "Remove" : "Add"}
        </button>
      </div>
    </section>
  );
}

export default function CivilConstructionMarketplace() {
  const selectorRef = useRef<HTMLElement>(null);
  const [canScrollBack, setCanScrollBack] = useState(false);

  const snapshot = useSyncExternalStore(
    subscribeServiceCart,
    getServiceCartSnapshot,
    getServiceCartServerSnapshot,
  );

  const cartItems = useMemo(
    () => parseServiceCartSnapshot(snapshot),
    [snapshot],
  );

  const selectedIds = useMemo(
    () => new Set(cartItems.map((item) => item.id)),
    [cartItems],
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function handleSelectorScroll() {
    setCanScrollBack((selectorRef.current?.scrollLeft ?? 0) > 4);
  }

  function scrollSelector(direction: -1 | 1) {
    selectorRef.current?.scrollBy({
      left: direction * 320,
      behavior: "smooth",
    });
  }

  function scrollToService(id: string) {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function toggleSurvey(service: Service) {
    const id = cartId(service.id);

    if (selectedIds.has(id)) {
      removeServiceCartItem(id);
      return;
    }

    upsertServiceCartItem({
      id,
      serviceTitle: service.title,
      optionLabel: "Site survey",
      price: SURVEY_PRICE,
      priceLabel: SURVEY_LABEL,
      duration: SURVEY_DURATION,
    });

    window.dispatchEvent(
      new Event("citycoolies:deep-cleaning-cart-added"),
    );
  }

  return (
    <section id="city-coolies-civil" className="civil-marketplace">
      <div className="civil-container">
        <div className="civil-columns">
          <div className="civil-main">
            <h1 className="civil-heading">
              Civil Construction &amp; Maintenance
            </h1>

            <div className="civil-selectorWrapper">
              {canScrollBack && (
                <button
                  type="button"
                  className="civil-arrow civil-prev"
                  aria-label="Previous services"
                  onClick={() => scrollSelector(-1)}
                >
                  ←
                </button>
              )}

              <nav
                ref={selectorRef}
                className="civil-selector"
                aria-label="Select a civil construction service"
                onScroll={handleSelectorScroll}
              >
                {services.map((service) => {
                  const image = serviceImages[service.id];

                  return (
                    <button
                      key={service.id}
                      type="button"
                      className="civil-selectorItem"
                      onClick={() => scrollToService(service.id)}
                    >
                      {image && (
                        <Image
                          unoptimized
                          src={getImagePath(image.selector)}
                          alt=""
                          width={100}
                          height={100}
                        />
                      )}
                      <span>{service.title}</span>
                    </button>
                  );
                })}
              </nav>

              <button
                type="button"
                className="civil-arrow civil-next"
                aria-label="More services"
                onClick={() => scrollSelector(1)}
              >
                →
              </button>
            </div>

            <div className="civil-serviceList">
              {services.map((service) => (
                <CivilServiceCard
                  key={service.id}
                  service={service}
                  added={selectedIds.has(cartId(service.id))}
                  onToggle={toggleSurvey}
                />
              ))}
            </div>
          </div>

          <aside className="civil-sidebar" aria-label="Service cart">
            <ServiceCartSidebar />
          </aside>
        </div>
      </div>

      <style jsx global>{`
        #city-coolies-civil {
          width: 100%;
          background: #ffffff;
          color: #171717;
        }

        #city-coolies-civil,
        #city-coolies-civil * {
          box-sizing: border-box;
        }

        #city-coolies-civil .civil-container {
          width: min(928px, calc(100% - 32px));
          margin: 0 auto;
          padding: 28px 0 64px;
        }

        #city-coolies-civil .civil-columns {
          display: grid;
          grid-template-columns: minmax(0, 590px) minmax(0, 310px);
          gap: 28px;
          align-items: start;
        }

        #city-coolies-civil .civil-main,
        #city-coolies-civil .civil-sidebar {
          min-width: 0;
        }

        #city-coolies-civil .civil-sidebar {
          position: sticky;
          top: 170px;
        }

        #city-coolies-civil .civil-heading {
          margin: 0 0 18px;
          color: #ef1b23;
          font-size: 18px;
          font-weight: 700;
          line-height: 1.3;
        }

        #city-coolies-civil .civil-selectorWrapper {
          position: relative;
          min-width: 0;
        }

        #city-coolies-civil .civil-selector {
          display: flex;
          gap: 4px;
          margin: 0 0 10px;
          padding: 0 0 6px;
          overflow-x: auto;
          scroll-behavior: smooth;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
        }

        #city-coolies-civil .civil-selector::-webkit-scrollbar {
          display: none;
        }

        #city-coolies-civil .civil-selectorItem {
          display: flex;
          flex: 0 0 100px;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 0;
          border: 0;
          background: transparent;
          color: inherit;
          font: inherit;
          cursor: pointer;
          scroll-snap-align: start;
        }

        #city-coolies-civil .civil-selectorItem img {
          display: block;
          width: 100px;
          height: 100px;
          object-fit: cover;
          object-position: center;
        }

        #city-coolies-civil .civil-selectorItem span {
          width: 100px;
          font-size: 13px;
          line-height: 1.16;
          text-align: center;
        }

        #city-coolies-civil .civil-selectorItem:hover span {
          color: #ef1b23;
        }

        #city-coolies-civil .civil-arrow {
          position: absolute;
          z-index: 2;
          top: 47px;
          width: 38px;
          height: 38px;
          border: 1px solid #f3cbd0;
          border-radius: 50%;
          background: #ffffff;
          color: #ef1b23;
          font-size: 24px;
          cursor: pointer;
        }

        #city-coolies-civil .civil-prev {
          left: 1px;
        }

        #city-coolies-civil .civil-next {
          right: 1px;
        }

        #city-coolies-civil .civil-service {
          padding: 10px 0 25px;
          scroll-margin-top: 145px;
        }

        #city-coolies-civil .civil-service + .civil-service {
          padding-top: 25px;
        }

        #city-coolies-civil .civil-service h2 {
          margin: 0 0 12px;
          font-size: 28px;
          line-height: 1.2;
        }

        #city-coolies-civil .civil-banner {
          display: block;
          width: 100%;
          height: auto;
          object-fit: contain;
        }

        #city-coolies-civil .civil-serviceInfo {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding-top: 12px;
        }

        #city-coolies-civil .civil-serviceContent {
          min-width: 0;
        }

        #city-coolies-civil .civil-serviceContent h3 {
          margin: 0 0 6px;
          font-size: 19px;
        }

        #city-coolies-civil .civil-rating {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 5px;
          color: #555f6c;
          font-size: 13px;
        }

        #city-coolies-civil .civil-star {
          display: inline-grid;
          place-items: center;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ef1b23;
          color: #ffffff;
          font-size: 11px;
        }

        #city-coolies-civil .civil-rating a {
          padding-left: 5px;
          color: #e71922;
          font-weight: 600;
          text-decoration: none;
        }

        #city-coolies-civil .civil-price {
          display: block;
          margin-top: 11px;
        }

        #city-coolies-civil .civil-addButton {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 85px;
          min-height: 42px;
          padding: 8px 16px;
          border: 1px solid #ef1b23;
          border-radius: 10px;
          background: #ffffff;
          color: #ef1b23;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
        }

        #city-coolies-civil .civil-addButton:hover {
          background: #ef1b23;
          color: #ffffff;
        }

        #city-coolies-civil button:focus-visible,
        #city-coolies-civil a:focus-visible {
          outline: 2px solid #ef1b23;
          outline-offset: 3px;
        }

        @media (max-width: 980px) {
          #city-coolies-civil .civil-container {
            width: min(810px, calc(100% - 28px));
          }

          #city-coolies-civil .civil-columns {
            grid-template-columns: minmax(0, 1fr);
          }

          #city-coolies-civil .civil-sidebar {
            position: static;
          }
        }

        @media (max-width: 760px) {
          #city-coolies-civil .civil-arrow {
            display: none;
          }
        }

        @media (max-width: 600px) {
          #city-coolies-civil .civil-container {
            width: calc(100% - 24px);
            padding-top: 144px;
          }

          #city-coolies-civil .civil-service h2 {
            font-size: 24px;
          }

          #city-coolies-civil .civil-serviceContent h3 {
            font-size: 17px;
          }
        }
      `}</style>
    </section>
  );
}