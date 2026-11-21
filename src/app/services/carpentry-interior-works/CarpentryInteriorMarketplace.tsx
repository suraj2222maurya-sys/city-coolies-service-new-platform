"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

import ServiceCartSidebar from "@/app/services/ServiceCartSidebar";
import { upsertServiceCartItem } from "@/app/services/serviceCart";
import { cartId, services } from "./CarpentryInteriorDetails";

export {
  cartId,
  jobs,
  services,
} from "./CarpentryInteriorDetails";

export type {
  Service,
} from "./CarpentryInteriorDetails";

// Service images

const IMAGE_PATH = "/carpentry-interior-works";

const serviceImages: Record<string, string> = {
  carpentry: "carpentry_service_banner.26c92e768190.webp",
  "interior-designing":
    "interior_designing_service_banner.0bf7c4031fd5.webp",
};

export const selectorImages: Record<string, string> = {
  carpentry: "carpentry_service_banner_selector.c5eaf372766a.webp",
  "interior-designing":
    "interior_designing_service_banner_selector.d68366482b7c.webp",
};

export const money = (amount: number): string =>
  `₹${amount.toLocaleString("en-IN")}`;

// Marketplace component

export default function CarpentryInteriorMarketplace() {
  const selectorRef = useRef<HTMLElement>(null);
  const [canScrollBack, setCanScrollBack] = useState(false);

  function addSiteSurvey(service: (typeof services)[number]) {
    upsertServiceCartItem({
      id: cartId(service.id),
      serviceTitle: service.title,
      optionLabel: "Site survey",
      price: 500,
      priceLabel: money(500),
      duration: "Site survey",
    });

    window.dispatchEvent(
      new Event("citycoolies:deep-cleaning-cart-added"),
    );
  }

  function handleSelectorScroll() {
    setCanScrollBack((selectorRef.current?.scrollLeft ?? 0) > 4);
  }

  function scrollSelector(direction: -1 | 1) {
    selectorRef.current?.scrollBy({
      left: direction * 320,
      behavior: "smooth",
    });
  }

  function scrollToService(serviceId: string) {
    document.getElementById(serviceId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <section
      id="carpentry-interior-marketplace"
      className="work-section"
    >
      <div className="work-container">
        <div className="work-columns">
          <main className="work-main">
            <h1 className="work-title">
              Carpentry &amp; Interior Works
            </h1>

            {/* Service selector */}

            <div className="work-selectorWrap">
              {canScrollBack && (
                <button
                  type="button"
                  className="work-arrow work-arrowPrev"
                  aria-label="Previous services"
                  onClick={() => scrollSelector(-1)}
                >
                  ←
                </button>
              )}

              <nav
                ref={selectorRef}
                id="carpentry-service-selector"
                className="work-selector"
                aria-label="Select a service"
                onScroll={handleSelectorScroll}
              >
                {services.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    className="work-selectorItem"
                    onClick={() => scrollToService(service.id)}
                  >
                    <span className="work-thumb">
                      <Image
                        unoptimized
                        src={`${IMAGE_PATH}/${selectorImages[service.id]}`}
                        alt=""
                        width={100}
                        height={100}
                      />
                    </span>

                    <span className="work-selectorLabel">
                      {service.title}
                    </span>
                  </button>
                ))}
              </nav>

              <button
                type="button"
                className="work-arrow work-arrowNext"
                aria-label="Next services"
                onClick={() => scrollSelector(1)}
              >
                →
              </button>
            </div>

            {/* Service listings */}

            {services.map((service) => (
              <section
                key={service.id}
                id={service.id}
                className="work-group"
              >
                <h2>{service.title}</h2>

                <div className="work-banner">
                  <Image
                    unoptimized
                    src={`${IMAGE_PATH}/${serviceImages[service.id]}`}
                    alt={service.title}
                    width={1942}
                    height={809}
                  />
                </div>

                <div className="work-row">
                  <div className="work-info">
                    <h3>{service.title}</h3>

                    <div className="work-rating">
                      <span
                        className="work-star"
                        aria-hidden="true"
                      >
                        ★
                      </span>

                      <span>{service.rating.toFixed(2)}</span>

                      <span>
                        ({service.reviews.toLocaleString("en-IN")} reviews)
                      </span>

                      <Link
                        className="work-detailLink"
                        href={`?service=${service.id}`}
                      >
                        View details
                      </Link>
                    </div>

                    <strong className="work-price">
                      Site survey ₹500
                    </strong>
                  </div>

                  <button
                    type="button"
                    className="work-add"
                    aria-label={`Add ${service.title}`}
                    onClick={() => addSiteSurvey(service)}
                  >
                    Add
                  </button>
                </div>
              </section>
            ))}
          </main>

          {/* Service cart */}

          <aside
            className="work-sidebar"
            aria-label="Service cart"
          >
            <ServiceCartSidebar />
          </aside>
        </div>
      </div>

      <style jsx global>{`
        /* Marketplace layout */

        #carpentry-interior-marketplace {
          width: 100%;
          background: #ffffff;
          color: #171717;
        }

        #carpentry-interior-marketplace,
        #carpentry-interior-marketplace * {
          box-sizing: border-box;
        }

        #carpentry-interior-marketplace .work-container {
          width: min(928px, calc(100% - 32px));
          margin: 0 auto;
          padding: 28px 0 64px;
        }

        #carpentry-interior-marketplace .work-columns {
          display: grid;
          grid-template-columns: minmax(0, 590px) minmax(0, 310px);
          gap: 28px;
          align-items: start;
        }

        #carpentry-interior-marketplace .work-main {
          min-width: 0;
          padding-bottom: 60px;
        }

        #carpentry-interior-marketplace .work-sidebar {
          min-width: 0;
          position: sticky;
          top: 170px;
        }

        #carpentry-interior-marketplace .work-title {
          margin: 0 0 18px;
          color: #ef1b23;
          font-size: 18px;
          font-weight: 700;
        }

        /* Service selector */

        #carpentry-interior-marketplace .work-selectorWrap {
          position: relative;
          min-width: 0;
        }

        #carpentry-interior-marketplace .work-selector {
          display: flex;
          gap: 4px;
          margin-bottom: 10px;
          padding: 0 0 6px;
          overflow-x: auto;
          scroll-behavior: smooth;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
        }

        #carpentry-interior-marketplace .work-selector::-webkit-scrollbar {
          display: none;
        }

        #carpentry-interior-marketplace .work-selectorItem {
          display: flex;
          flex: 0 0 100px;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          width: 100px;
          padding: 0;
          border: 0;
          background: transparent;
          font: inherit;
          cursor: pointer;
          scroll-snap-align: start;
        }

        #carpentry-interior-marketplace .work-thumb {
          display: block;
          width: 100px;
          height: 100px;
          overflow: hidden;
          background: #fff4f5;
        }

        #carpentry-interior-marketplace .work-thumb img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        #carpentry-interior-marketplace .work-selectorLabel {
          width: 100px;
          font-size: 13px;
          line-height: 1.18;
          text-align: center;
        }

        #carpentry-interior-marketplace .work-arrow {
          position: absolute;
          z-index: 2;
          top: 46px;
          display: grid;
          place-items: center;
          width: 38px;
          height: 38px;
          border: 1px solid #f3cbd0;
          border-radius: 50%;
          background: #ffffff;
          color: #ef1b23;
          box-shadow: 0 2px 10px #00000015;
          font-size: 24px;
          cursor: pointer;
        }

        #carpentry-interior-marketplace .work-arrowPrev {
          left: 1px;
        }

        #carpentry-interior-marketplace .work-arrowNext {
          right: 1px;
        }

        /* Service listings */

        #carpentry-interior-marketplace .work-group {
          padding: 10px 0 25px;
          scroll-margin-top: 145px;
        }

        #carpentry-interior-marketplace .work-group + .work-group {
          padding-top: 25px;
        }

        #carpentry-interior-marketplace .work-group h2 {
          margin: 0 0 12px;
          font-size: 28px;
          line-height: 1.2;
        }

        #carpentry-interior-marketplace .work-banner {
          width: 100%;
          aspect-ratio: 1940 / 811;
          background: #fff4f5;
        }

        #carpentry-interior-marketplace .work-banner img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        #carpentry-interior-marketplace .work-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding-top: 12px;
        }

        #carpentry-interior-marketplace .work-info {
          min-width: 0;
        }

        #carpentry-interior-marketplace .work-row h3 {
          margin: 0 0 6px;
          font-size: 19px;
          line-height: 1.25;
        }

        #carpentry-interior-marketplace .work-price {
          display: block;
          margin-top: 11px;
        }

        /* Ratings and links */

        #carpentry-interior-marketplace .work-rating {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          column-gap: 5px;
          row-gap: 3px;
          color: #555f6c;
          font-size: 13px;
        }

        #carpentry-interior-marketplace .work-star {
          display: inline-grid;
          place-items: center;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ef1b23;
          color: #ffffff;
          font-size: 11px;
        }

        #carpentry-interior-marketplace .work-detailLink {
          color: #e71922;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
        }

        #carpentry-interior-marketplace .work-add {
          display: inline-grid;
          place-items: center;
          min-width: 85px;
          min-height: 42px;
          padding: 8px 16px;
          border: 1px solid #ef1b23;
          border-radius: 10px;
          background: #ffffff;
          color: #ef1b23;
          font-size: 16px;
          font-weight: 700;
          text-decoration: none;
        }

        #carpentry-interior-marketplace .work-add:hover {
          background: #ef1b23;
          color: #ffffff;
        }

        /* Tablet */

        @media (max-width: 980px) {
          #carpentry-interior-marketplace .work-container {
            width: min(810px, calc(100% - 28px));
          }

          #carpentry-interior-marketplace .work-columns {
            grid-template-columns: minmax(0, 1fr);
          }

          #carpentry-interior-marketplace .work-sidebar {
            position: static;
          }
        }

        /* Small tablets */

        @media (max-width: 760px) {
          #carpentry-interior-marketplace .work-arrow {
            display: none;
          }
        }

        /* Mobile */

        @media (max-width: 600px) {
          #carpentry-interior-marketplace .work-container {
            width: calc(100% - 24px);
            padding-top: 144px;
          }

          #carpentry-interior-marketplace .work-group h2 {
            font-size: 24px;
          }

          #carpentry-interior-marketplace .work-row h3 {
            font-size: 17px;
          }
        }
      `}</style>
    </section>
  );
}