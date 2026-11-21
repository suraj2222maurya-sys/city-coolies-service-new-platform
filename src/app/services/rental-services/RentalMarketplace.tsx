"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import ServiceCartSidebar from "@/app/services/ServiceCartSidebar";

import { services } from "./RentalDetails";

const basePath = "/services/rental-services";

function bannerPath(serviceId: string): string {
  return `/rental-services/${serviceId}-banner.webp`;
}

export function RentalMarketplace() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (
      params.get("showRentalCart") !== "1" ||
      window.innerWidth > 600
    ) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      document
        .querySelector<HTMLElement>(".cc-rental-market .marketSidebar")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <section className="cc-rental-market">
      <div className="marketWrap">
        <div className="marketColumns">
          <main className="marketMain">
            <h1 className="marketHeading">Rental Services</h1>

            <nav className="marketSelector" aria-label="Select a rental service">
              {services.map((service) => (
                <button
                  className="marketSelectorItem"
                  key={service.id}
                  type="button"
                  onClick={() =>
                    document
                      .getElementById(`rental-${service.id}`)
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                >
                  <Image
                    className="marketSelectorThumb"
                    src={bannerPath(service.id)}
                    alt={service.title}
                    width={100}
                    height={100}
                    unoptimized
                  />
                  <span className="marketSelectorLabel">{service.title}</span>
                </button>
              ))}
            </nav>

            {services.map((service) => {
              const detailsHref = `${basePath}?service=${service.id}`;
              const minimumPrice = Math.min(
                ...service.options.map((option) => option.price),
              );

              return (
                <section
                  className="marketServiceBlock"
                  id={`rental-${service.id}`}
                  key={service.id}
                >
                  <h2 className="marketServiceTitle">{service.title}</h2>

                  <Image
                    className="marketServiceBanner"
                    src={bannerPath(service.id)}
                    alt={service.title}
                    width={1940}
                    height={811}
                    unoptimized
                  />

                  <div className="marketServiceRow">
                    <div className="marketServiceInfo">
                      <h3 className="marketServiceName">{service.title}</h3>

                      <div className="marketRatingRow">
                        <span className="marketRatingStar" aria-hidden="true">
                          ★
                        </span>
                        <span>4.20</span>
                        <span>(900 reviews)</span>
                        <Link className="marketDetailsLink" href={detailsHref}>
                          View details
                        </Link>
                      </div>

                      <strong className="marketStartingPrice">
                        Starts at ₹{minimumPrice.toLocaleString("en-IN")} /{" "}
                        {service.unit}
                      </strong>
                    </div>

                    <Link className="marketAddButton" href={detailsHref}>
                      Add
                    </Link>
                  </div>
                </section>
              );
            })}
          </main>

          <aside className="marketSidebar">
            <ServiceCartSidebar />
          </aside>
        </div>
      </div>

      <style jsx global>{`
        .cc-rental-market {
          width: 100%;
          min-height: 65vh;
          background: #ffffff;
          color: #171717;
        }

        .cc-rental-market * {
          box-sizing: border-box;
        }

        .cc-rental-market .marketWrap {
          width: min(928px, calc(100% - 32px));
          margin: 0 auto;
          padding: 28px 0 64px;
        }

        .cc-rental-market .marketColumns {
          display: grid;
          grid-template-columns: minmax(0, 590px) minmax(0, 310px);
          gap: 28px;
          align-items: start;
        }

        .cc-rental-market .marketMain {
          min-width: 0;
          padding-bottom: 40px;
          
        }

        .cc-rental-market .marketSidebar {
          position: sticky;
          top: 170px;
          min-width: 0;
        }

        .cc-rental-market .marketHeading {
          margin: 0 0 18px;
          color: #ef1b23;
          font-size: 18px;
          font-weight: 700;
        }

        .cc-rental-market .marketSelector {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding: 0 0 10px;
          scrollbar-width: none;
          scroll-snap-type: x mandatory;
        }

        .cc-rental-market .marketSelector::-webkit-scrollbar {
          display: none;
        }

        .cc-rental-market .marketSelectorItem {
          display: flex;
          flex: 0 0 100px;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 0;
          border: 0;
          background: none;
          cursor: pointer;
          font: inherit;
          scroll-snap-align: start;
        }

        .cc-rental-market .marketSelectorThumb {
          display: block;
          width: 100px;
          height: 100px;
          object-fit: cover;
          object-position: center;
          background: #fff4f5;
        }

        .cc-rental-market .marketSelectorLabel {
          font-size: 13px;
          line-height: 1.2;
          text-align: center;
        }

        .cc-rental-market .marketServiceBlock {
          padding: 25px 0;
          
          scroll-margin-top: 150px;
        }

        .cc-rental-market .marketServiceTitle {
          margin: 0 0 12px;
          font-size: 28px;
          line-height: 1.2;
        }

        .cc-rental-market .marketServiceBanner {
          display: block;
          width: 100%;
          height: auto;
          aspect-ratio: 1940 / 811;
          object-fit: contain;
          background: #fff4f5;
        }

        .cc-rental-market .marketServiceRow {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          padding-top: 12px;
        }

        .cc-rental-market .marketServiceInfo {
          min-width: 0;
        }

        .cc-rental-market .marketServiceName {
          margin: 0 0 6px;
          font-size: 19px;
        }

        .cc-rental-market .marketRatingRow {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 6px;
          color: #555f6c;
          font-size: 13px;
        }

        .cc-rental-market .marketRatingStar {
          color: #ef1b23;
        }

        .cc-rental-market .marketDetailsLink {
          color: #e71922;
          font-weight: 600;
          text-decoration: none;
        }

        .cc-rental-market .marketStartingPrice {
          display: block;
          margin-top: 11px;
          font-size: 16px;
        }

        .cc-rental-market .marketAddButton {
          display: grid;
          flex: 0 0 auto;
          min-width: 85px;
          min-height: 42px;
          place-items: center;
          padding: 8px 16px;
          border: 1px solid #ef1b23;
          border-radius: 10px;
          color: #ef1b23;
          background: #ffffff;
          font-size: 16px;
          font-weight: 700;
          text-decoration: none;
        }

        .cc-rental-market .marketAddButton:hover {
          background: #ef1b23;
          color: #ffffff;
        }

        @media (max-width: 980px) {
          .cc-rental-market .marketWrap {
            width: min(810px, calc(100% - 28px));
          }

          .cc-rental-market .marketColumns {
            grid-template-columns: minmax(0, 1fr);
          }

          .cc-rental-market .marketMain {
            border-right: 0;
          }

          .cc-rental-market .marketSidebar {
            position: static;
          }
        }

        @media (max-width: 600px) {
          .cc-rental-market .marketWrap {
            width: calc(100% - 24px);
            padding-top: 144px;
          }

          .cc-rental-market .marketServiceTitle {
            font-size: 24px;
          }

          .cc-rental-market .marketServiceName {
            font-size: 17px;
          }

          .cc-rental-market .marketServiceRow {
            align-items: flex-start;
          }

          .cc-rental-market .marketAddButton {
            min-width: 74px;
            min-height: 38px;
            padding: 7px 12px;
            font-size: 14px;
          }
        }
      `}</style>
    </section>
  );
}

export default RentalMarketplace;