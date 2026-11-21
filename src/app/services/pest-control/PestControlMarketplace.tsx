"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";
import ServiceCartSidebar from "@/app/services/ServiceCartSidebar";
import {
  getServiceCartServerSnapshot,
  getServiceCartSnapshot,
  parseServiceCartSnapshot,
  removeServiceCartItem,
  subscribeServiceCart,
  upsertServiceCartItem,
} from "@/app/services/serviceCart";

interface PestListingService {
  id: string;
  title: string;
  price: number;
  label: string;
  banner: string;
  selector: string;
}

const services: readonly PestListingService[] = [
  {
    id: "full-home-pest-control",
    title: "Full Home Pest Control",
    price: 500,
    label: "Site survey",
    banner: "/pest-control/full-home-pest-control-banner.webp",
    selector: "/pest-control/full-home-pest-control-selector.webp",
  },
  {
    id: "cockroach-control",
    title: "Cockroach Control",
    price: 999,
    label: "Starting treatment price",
    banner: "/pest-control/cockroach-control-banner.webp",
    selector: "/pest-control/cockroach-control-selector.webp",
  },
  {
    id: "apartment-pest-control",
    title: "Apartment Pest Control",
    price: 1549,
    label: "Starting treatment price",
    banner: "/pest-control/apartment-pest-control-banner.webp",
    selector: "/pest-control/apartment-pest-control-selector.webp",
  },
  {
    id: "termite-control",
    title: "Termite Control",
    price: 500,
    label: "Site survey",
    banner: "/pest-control/termite-control-banner.webp",
    selector: "/pest-control/termite-control-selector.webp",
  },
  {
    id: "bed-bug-control",
    title: "Bed Bug Control",
    price: 500,
    label: "Site survey",
    banner: "/pest-control/bed-bug-control-banner.webp",
    selector: "/pest-control/bed-bug-control-selector.webp",
  },
  {
    id: "rodent-control",
    title: "Rodent Control",
    price: 500,
    label: "Site survey",
    banner: "/pest-control/rodent-control-banner.webp",
    selector: "/pest-control/rodent-control-selector.webp",
  },
  {
    id: "commercial-pest-control",
    title: "Commercial Pest Control",
    price: 500,
    label: "Site survey",
    banner: "/pest-control/commercial-pest-control-banner.webp",
    selector: "/pest-control/commercial-pest-control-selector.webp",
  },
];

const cartId = (serviceId: string) => `pest:${serviceId}`;
const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;

export default function PestControlMarketplace() {
  const snapshot = useSyncExternalStore(
    subscribeServiceCart,
    getServiceCartSnapshot,
    getServiceCartServerSnapshot,
  );
  const cartItems = useMemo(() => parseServiceCartSnapshot(snapshot), [snapshot]);

  function toggleService(service: PestListingService) {
    const id = cartId(service.id);
    const isSelected = cartItems.some((item) => item.id === id);

    if (isSelected) {
      removeServiceCartItem(id);
      return;
    }

    upsertServiceCartItem({
      id,
      serviceTitle: service.title,
      optionLabel: service.label,
      price: service.price,
      priceLabel: formatPrice(service.price),
      duration:
        service.label === "Site survey"
          ? "Treatment price confirmed after the site survey"
          : "Starting price; final treatment scope confirmed before work",
    });
    window.dispatchEvent(new Event("citycoolies:deep-cleaning-cart-added"));
  }

  function scrollToService(serviceId: string) {
    document.getElementById(serviceId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <section id="city-coolies-pest" className="section">
      <div className="container">
        <div className="columns">
          <main className="main">
            <h1 className="eyebrow">Pest Control</h1>

            <div className="selectorViewport">
              <nav
                id="pest-selector"
                className="selector"
                aria-label="Select a pest control service"
              >
                {services.map((service) => (
                  <button
                    key={service.id}
                    className="selectorItem"
                    type="button"
                    onClick={() => scrollToService(service.id)}
                  >
                    <Image
                      className="thumbnail"
                      src={service.selector}
                      alt=""
                      width={100}
                      height={100}
                      unoptimized
                    />
                    <span className="selectorLabel">{service.title}</span>
                  </button>
                ))}
              </nav>

              <button
                className="selectorArrow next"
                type="button"
                aria-label="Show more pest control services"
                onClick={() =>
                  document.getElementById("pest-selector")?.scrollBy({
                    left: 320,
                    behavior: "smooth",
                  })
                }
              >
                →
              </button>
            </div>

            {services.map((service) => {
              const isSelected = cartItems.some(
                (item) => item.id === cartId(service.id),
              );

              return (
                <section className="serviceGroup" id={service.id} key={service.id}>
                  <h2>{service.title}</h2>
                  <Image
                    className="banner"
                    src={service.banner}
                    alt={service.title}
                    width={1942}
                    height={809}
                    unoptimized
                  />

                  <div className="serviceRow">
                    <div>
                      <h3>{service.title}</h3>
                      <div className="rating">
                        <span className="star" aria-hidden="true">★</span>
                        <span>4.20</span>
                        <span>(sample rating)</span>
                        <Link href={`/services/pest-control?service=${service.id}`}>
                          View details
                        </Link>
                      </div>
                      <strong className="price">
                        {service.label} {formatPrice(service.price)}
                      </strong>
                    </div>
                    <button
                      className="addButton"
                      type="button"
                      onClick={() => toggleService(service)}
                      aria-pressed={isSelected}
                    >
                      {isSelected ? "Remove" : "Add"}
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
        #city-coolies-pest {
          box-sizing: border-box;
          width: 100%;
          background: #fff;
          color: #171717;
        }

        #city-coolies-pest .container {
          box-sizing: border-box;
          width: min(928px, calc(100% - 32px));
          margin: auto;
          padding: 28px 0 64px;
        }

        #city-coolies-pest .columns {
          display: grid;
          grid-template-columns: minmax(0, 590px) minmax(0, 310px);
          gap: 28px;
          align-items: start;
        }

        #city-coolies-pest .main {
          min-width: 0;
          padding-bottom: 60px;
        }

        #city-coolies-pest .sidebar {
          min-width: 0;
          position: sticky;
          top: 170px;
        }

        #city-coolies-pest .eyebrow {
          margin: 0 0 18px;
          color: #ef1b23;
          font-size: 18px;
          font-weight: 700;
        }

        #city-coolies-pest .selectorViewport {
          position: relative;
          min-width: 0;
        }

        #city-coolies-pest .selector {
          display: flex;
          gap: 4px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          padding-bottom: 8px;
          margin-bottom: 10px;
        }

        #city-coolies-pest .selector::-webkit-scrollbar {
          display: none;
        }

        #city-coolies-pest .selectorItem {
          display: flex;
          flex: 0 0 100px;
          width: 100px;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          background: none;
          border: 0;
          padding: 0;
          color: inherit;
          cursor: pointer;
          scroll-snap-align: start;
          font: inherit;
        }

        #city-coolies-pest .thumbnail {
          display: block;
          width: 100px;
          height: 100px;
          object-fit: cover;
          object-position: center;
        }

        #city-coolies-pest .selectorLabel {
          font-size: 13px;
          text-align: center;
          line-height: 1.2;
        }

        #city-coolies-pest .selectorArrow {
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

        #city-coolies-pest .next {
          right: 0;
        }

        #city-coolies-pest .serviceGroup {
          scroll-margin-top: 145px;
          padding: 10px 0 25px;
          border-bottom: 1px solid #f0dfe2;
        }

        #city-coolies-pest .serviceGroup + .serviceGroup {
          padding-top: 25px;
        }

        #city-coolies-pest .serviceGroup h2 {
          font-size: 28px;
          line-height: 1.2;
          margin: 0 0 12px;
        }

        #city-coolies-pest .banner {
          width: 100%;
          height: auto;
          aspect-ratio: 1940 / 811;
          object-fit: contain;
          background: #fff4f5;
        }

        #city-coolies-pest .serviceRow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding-top: 12px;
        }

        #city-coolies-pest .serviceRow h3 {
          font-size: 19px;
          margin: 0 0 6px;
        }

        #city-coolies-pest .rating {
          display: flex;
          align-items: center;
          gap: 5px;
          flex-wrap: wrap;
          font-size: 13px;
          color: #555f6c;
        }

        #city-coolies-pest .star {
          display: inline-grid;
          place-items: center;
          width: 16px;
          height: 16px;
          background: #ef1b23;
          border-radius: 50%;
          color: #fff;
          font-size: 11px;
        }

        #city-coolies-pest .rating a {
          color: #e71922;
          text-decoration: none;
          font-weight: 600;
          margin-left: 5px;
        }

        #city-coolies-pest .price {
          display: block;
          margin-top: 11px;
        }

        #city-coolies-pest .addButton {
          border: 1px solid #ef1b23;
          border-radius: 10px;
          background: #fff;
          color: #ef1b23;
          padding: 9px 16px;
          min-width: 85px;
          min-height: 42px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
        }

        #city-coolies-pest .addButton:hover {
          background: #ef1b23;
          color: #fff;
        }

        @media (max-width: 980px) {
          #city-coolies-pest .container {
            width: min(calc(100% - 28px), 810px);
          }

          #city-coolies-pest .columns {
            grid-template-columns: minmax(0, 1fr);
          }

          #city-coolies-pest .sidebar {
            position: static;
          }
        }

        @media (max-width: 760px) {
          #city-coolies-pest .selectorArrow {
            display: none;
          }
        }

        @media (max-width: 600px) {
          #city-coolies-pest .container {
            width: calc(100% - 24px);
            padding-top: 144px;
          }

          #city-coolies-pest .serviceGroup h2 {
            font-size: 24px;
          }

          #city-coolies-pest .serviceRow h3 {
            font-size: 17px;
          }
        }
      `}</style>
    </section>
  );
}
