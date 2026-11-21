"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import ServiceCartSidebar from "@/app/services/ServiceCartSidebar";
import {
  services,
  money,
} from "./ApplianceRepairDetails";

export {
  services,
  cartId,
  money,
} from "./ApplianceRepairDetails";

// Original service images

const IMAGE_DIRECTORY = "/appliance-repair";

const serviceImages: Record<string, string> = {
  "washing-machine":
    "washing-machine-banner.webp",
  "fridge-cooler":
    "fridge-cooler-banner.webp",
  geyser:
    "geyser-banner.webp",
  tv:
    "tv-banner.webp",
  chimney:
    "chimney-banner.webp",
  "gas-stove-pipe":
    "gas-stove-pipe-banner.webp",
  "exhaust-fan":
    "exhaust-fan-banner.webp",
};

export const selectorImages: Record<string, string> = {
  "washing-machine":
    "washing-machine.webp",
  "fridge-cooler":
    "fridge-cooler.webp",
  geyser:
    "geyser.webp",
  tv:
    "tv.webp",
  chimney:
    "chimney.webp",
  "gas-stove-pipe":
    "gas-stove-pipe.webp",
  "exhaust-fan":
    "exhaust-fan.webp",
};

// Marketplace component

export default function ApplianceRepairMarketplace() {
  const selectorRef = useRef<HTMLElement>(null);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("showCart") !== "1") {
      return;
    }

    if (window.matchMedia("(max-width: 900px)").matches) {
      const frame = window.requestAnimationFrame(() => {
        document.querySelector("#appliance-repair-marketplace .work-sidebar")
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      });

      return () => window.cancelAnimationFrame(frame);
    }
  }, []);
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
      id="appliance-repair-marketplace"
      className="work-section"
    >
      <div className="work-container">
        <div className="work-columns">
          <main className="work-main">
            <h1 className="work-title">
              Appliance Repair
            </h1>

            {/* Service selector */}

            <div className="work-selectorWrap">
              {scrollLeft > 4 && (
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
                id="appliance-service-selector"
                className="work-selector"
                aria-label="Select a service"
                onScroll={(event) =>
                  setScrollLeft(event.currentTarget.scrollLeft)
                }
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
                        src={`${IMAGE_DIRECTORY}/${selectorImages[service.id]}`}
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

            {services.map((service) => {
              const startingPrice = Math.min(
                ...service.jobs.map((job) => job.price),
              );

              return (
                <section
                  key={service.id}
                  id={service.id}
                  className="work-group"
                >
                  <h2>{service.title}</h2>

                  <div className="work-banner">
                    <Image
                      unoptimized
                      src={`${IMAGE_DIRECTORY}/${serviceImages[service.id]}`}
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

                        <span>
                          {service.rating.toFixed(2)}
                        </span>

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
                        Starts at {money(startingPrice)}
                      </strong>
                    </div>

                    <Link
                      className="work-add"
                      href={`?service=${service.id}`}
                      aria-label={`Add ${service.title}`}
                    >
                      Add
                    </Link>
                  </div>
                </section>
              );
            })}
          </main>

          {/* Service cart sidebar */}

          <aside
            className="work-sidebar"
            aria-label="Service cart"
          >
            <ServiceCartSidebar />
          </aside>
        </div>
      </div>

      <style jsx global>{`
        /* Main layout */

        #appliance-repair-marketplace {
          width: 100%;
          background: #ffffff;
          color: #171717;
        }

        #appliance-repair-marketplace,
        #appliance-repair-marketplace * {
          box-sizing: border-box;
        }

        #appliance-repair-marketplace .work-container {
          width: min(928px, calc(100% - 32px));
          margin: 0 auto;
          padding: 28px 0 64px;
        }

        #appliance-repair-marketplace .work-columns {
          display: grid;
          grid-template-columns: minmax(0, 590px) minmax(0, 310px);
          gap: 28px;
          align-items: start;
        }

        #appliance-repair-marketplace .work-main {
          min-width: 0;
          padding-bottom: 60px;
        }

        #appliance-repair-marketplace .work-sidebar {
          min-width: 0;
          position: sticky;
          top: 170px;
        }

        #appliance-repair-marketplace .work-title {
          margin: 0 0 18px;
          color: #ef1b23;
          font-size: 18px;
          font-weight: 700;
        }

        /* Category selector */

        #appliance-repair-marketplace .work-selectorWrap {
          position: relative;
          min-width: 0;
        }

        #appliance-repair-marketplace .work-selector {
          display: flex;
          gap: 4px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          scrollbar-width: none;
          padding: 0 0 6px;
          margin-bottom: 10px;
        }

        #appliance-repair-marketplace .work-selector::-webkit-scrollbar {
          display: none;
        }

        #appliance-repair-marketplace .work-selectorItem {
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

        #appliance-repair-marketplace .work-thumb {
          display: block;
          width: 100px;
          height: 100px;
          overflow: hidden;
          background: transparent;
        }

        #appliance-repair-marketplace .work-thumb img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        #appliance-repair-marketplace .work-selectorLabel {
          width: 100px;
          text-align: center;
          font-size: 13px;
          line-height: 1.18;
        }

        /* Selector arrows */

        #appliance-repair-marketplace .work-arrow {
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

        #appliance-repair-marketplace .work-arrowPrev {
          left: 1px;
        }

        #appliance-repair-marketplace .work-arrowNext {
          right: 1px;
        }

        /* Service sections */

        #appliance-repair-marketplace .work-group {
          scroll-margin-top: 145px;
          padding: 10px 0 25px;
        }

        #appliance-repair-marketplace .work-group + .work-group {
          padding-top: 25px;
        }

        #appliance-repair-marketplace .work-group h2 {
          margin: 0 0 12px;
          font-size: 28px;
          line-height: 1.2;
        }

        #appliance-repair-marketplace .work-banner {
          width: 100%;
          aspect-ratio: 1940 / 811;
          background: #fff4f5;
        }

        #appliance-repair-marketplace .work-banner img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        /* Service information */

        #appliance-repair-marketplace .work-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          padding-top: 12px;
        }

        #appliance-repair-marketplace .work-info {
          min-width: 0;
        }

        #appliance-repair-marketplace .work-row h3 {
          margin: 0 0 6px;
          font-size: 19px;
          line-height: 1.25;
        }

        #appliance-repair-marketplace .work-price {
          display: block;
          margin-top: 11px;
        }

        /* Ratings */

        #appliance-repair-marketplace .work-rating {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          column-gap: 5px;
          row-gap: 3px;
          color: #555f6c;
          font-size: 13px;
        }

        #appliance-repair-marketplace .work-star {
          display: inline-grid;
          place-items: center;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ef1b23;
          color: #ffffff;
          font-size: 11px;
        }

        /* Navigation links */

        #appliance-repair-marketplace .work-detailLink {
          color: #e71922;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
        }

        #appliance-repair-marketplace .work-add {
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

        #appliance-repair-marketplace .work-add:hover {
          color: #ffffff;
          background: #ef1b23;
        }

        /* Tablet layout */

        @media (max-width: 980px) {
          #appliance-repair-marketplace .work-container {
            width: min(810px, calc(100% - 28px));
          }

          #appliance-repair-marketplace .work-columns {
            grid-template-columns: minmax(0, 1fr);
          }

          #appliance-repair-marketplace .work-sidebar {
            position: static;
          }
        }

        /* Small tablets */

        @media (max-width: 760px) {
          #appliance-repair-marketplace .work-arrow {
            display: none;
          }
        }

        /* Mobile layout */

        @media (max-width: 600px) {
          #appliance-repair-marketplace .work-container {
            width: calc(100% - 24px);
            padding-top: 144px;
          }

          #appliance-repair-marketplace .work-group h2 {
            font-size: 24px;
          }

          #appliance-repair-marketplace .work-row h3 {
            font-size: 17px;
          }
        }
      `}</style>
    </section>
  );
}