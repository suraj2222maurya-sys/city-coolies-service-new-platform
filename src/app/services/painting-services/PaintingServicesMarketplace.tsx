"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import ServiceCartSidebar from "@/app/services/ServiceCartSidebar";
import {
  getServiceCartServerSnapshot,
  getServiceCartSnapshot,
  parseServiceCartSnapshot,
  removeServiceCartItem,
  subscribeServiceCart,
  upsertServiceCartItem,
} from "@/app/services/serviceCart";

type Service = {
  id: string;
  title: string;
  rating: number;
  reviews: number;
  banner: string;
  selector: string;
};

const services: readonly Service[] = [
  {
    id: "full-home-painting",
    title: "Full Home Painting",
    rating: 4.2,
    reviews: 608,
    banner: "full-home-painting-banner.webp",
    selector: "full-home-painting-selector.webp",
  },
  {
    id: "most-popular-painting",
    title: "Most Popular Painting",
    rating: 4.3,
    reviews: 742,
    banner: "most-popular-painting-banner.webp",
    selector: "most-popular-painting-selector.webp",
  },
  {
    id: "marking-safety-painting",
    title: "Marking & Safety Painting",
    rating: 4.2,
    reviews: 386,
    banner: "marking-safety-painting-banner.webp",
    selector: "marking-safety-painting-selector.webp",
  },
];


const money = (value: number) => `₹${value.toLocaleString("en-IN")}`;
const cartId = (id: string) => `painting:${id}`;

export default function PaintingServicesMarketplace() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [scrolled, setScrolled] = useState(false);
  const snapshot = useSyncExternalStore(
    subscribeServiceCart,
    getServiceCartSnapshot,
    getServiceCartServerSnapshot,
  );
  const cartItems = useMemo(
    () => parseServiceCartSnapshot(snapshot),
    [snapshot],
  );
  function toggleSurvey(service: Service) {
    const id = cartId(service.id);
    if (cartItems.some((item) => item.id === id))
      removeServiceCartItem(id);
    else {
      upsertServiceCartItem({
        id,
        serviceTitle: service.title,
        optionLabel: "Site survey",
        price: 500,
        priceLabel: money(500),
        duration:
          "Final painting price confirmed after site measurements and work assessment",
      });
      window.dispatchEvent(new Event("citycoolies:deep-cleaning-cart-added"));
    }
  }
  return (
    <section id="city-coolies-painting" className="work-page">
      <div className="work-container">
        <div className="work-columns">
          <main className="work-main">
            <h1 className="work-heading">Painting Services</h1>
            <div className="work-selectorWrap">
              {scrolled && (
                <button
                  type="button"
                  className="work-arrow work-prev"
                  aria-label="Previous services"
                  onClick={() =>
                    document
                      .getElementById("painting-selector")
                      ?.scrollBy({ left: -320, behavior: "smooth" })
                  }
                >
                  ←
                </button>
              )}
              <nav
                id="painting-selector"
                className="work-selector"
                aria-label="Select a service"
                onScroll={(e) => setScrolled(e.currentTarget.scrollLeft > 4)}
              >
                {services.map((service) => (
                  <button
                    type="button"
                    key={service.id}
                    className="work-selectorItem"
                    onClick={() =>
                      document
                        .getElementById(service.id)
                        ?.scrollIntoView({ behavior: "smooth", block: "start" })
                    }
                  >
                    <Image
                      unoptimized
                      src={`/painting-services/${service.selector}`}
                      alt=""
                      width={100}
                      height={100}
                    />
                    <span>{service.title}</span>
                  </button>
                ))}
              </nav>
              <button
                type="button"
                className="work-arrow work-next"
                aria-label="More services"
                onClick={() =>
                  document
                    .getElementById("painting-selector")
                    ?.scrollBy({ left: 320, behavior: "smooth" })
                }
              >
                →
              </button>
            </div>
            {services.map((service) => {
              const added = cartItems.some(
                (item) => item.id === cartId(service.id),
              );
              return (
                <section
                  key={service.id}
                  id={service.id}
                  className="work-service"
                >
                  <h2>{service.title}</h2>
                  <Image
                    unoptimized
                    className="work-banner"
                    src={`/painting-services/${service.banner}`}
                    alt={service.title}
                    width={1942}
                    height={809}
                  />
                  <div className="work-row">
                    <div>
                      <h3>{service.title}</h3>
                      <div className="work-rating">
                        <span className="work-star">★</span>
                        <span>{service.rating.toFixed(2)}</span>
                        <span>
                          ({service.reviews.toLocaleString("en-IN")} reviews)
                        </span>
                        <Link href={`?service=${service.id}`}>
                          View details
                        </Link>
                      </div>
                      <strong>
                        {service.id === "marking-safety-painting"
                          ? "Indicative ₹65 / sq ft"
                          : "Site survey ₹500"}
                      </strong>
                    </div>
                    {service.id === "full-home-painting" ? (
                      <button
                        type="button"
                        className="work-add"
                        onClick={() => toggleSurvey(service)}
                      >
                        {added ? "Remove" : "Add"}
                      </button>
                    ) : (
                      <Link
                        className="work-add"
                        href={`?service=${service.id}`}
                      >
                        Add
                      </Link>
                    )}
                  </div>
                </section>
              );
            })}
          </main>
          <aside className="work-sidebar">
            <ServiceCartSidebar />
          </aside>
        </div>
      </div>
      <style jsx global>{`
        #city-coolies-painting {
          width: 100%;
          background: #fff;
          color: #171717;
        }
        #city-coolies-painting * {
          box-sizing: border-box;
        }
        #city-coolies-painting .work-container {
          width: min(928px, calc(100% - 32px));
          margin: 0 auto;
          padding: 28px 0 64px;
        }
        #city-coolies-painting .work-columns {
          display: grid;
          grid-template-columns: minmax(0, 590px) minmax(0, 310px);
          gap: 28px;
          align-items: start;
        }
        #city-coolies-painting .work-main,
        #city-coolies-painting .work-sidebar {
          min-width: 0;
        }
        #city-coolies-painting .work-sidebar {
          position: sticky;
          top: 170px;
        }
        #city-coolies-painting .work-heading {
          margin: 0 0 18px;
          color: #ef1b23;
          font-size: 18px;
          line-height: 1.3;
          font-weight: 700;
        }
        #city-coolies-painting .work-selectorWrap {
          position: relative;
          min-width: 0;
        }
        #city-coolies-painting .work-selector {
          display: flex;
          gap: 4px;
          overflow-x: auto;
          margin: 0 0 10px;
          padding: 0 0 6px;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          scrollbar-width: none;
        }
        #city-coolies-painting .work-selector::-webkit-scrollbar {
          display: none;
        }
        #city-coolies-painting .work-selectorItem {
          display: flex;
          flex: 0 0 100px;
          flex-direction: column;
          gap: 8px;
          align-items: center;
          padding: 0;
          border: 0;
          background: transparent;
          color: inherit;
          font: inherit;
          cursor: pointer;
          scroll-snap-align: start;
        }
        #city-coolies-painting .work-selectorItem img {
          display: block;
          width: 100px;
          height: 100px;
          object-fit: cover;
          object-position: center;
        }
        #city-coolies-painting .work-selectorItem span {
          width: 100px;
          text-align: center;
          font-size: 13px;
          line-height: 1.16;
        }
        #city-coolies-painting .work-selectorItem:hover span {
          color: #ef1b23;
        }
        #city-coolies-painting .work-arrow {
          position: absolute;
          z-index: 2;
          top: 47px;
          width: 38px;
          height: 38px;
          border: 1px solid #f3cbd0;
          border-radius: 50%;
          background: #fff;
          color: #ef1b23;
          font-size: 24px;
          cursor: pointer;
        }
        #city-coolies-painting .work-prev {
          left: 1px;
        }
        #city-coolies-painting .work-next {
          right: 1px;
        }
        #city-coolies-painting .work-service {
          padding: 10px 0 25px;
          scroll-margin-top: 145px;
        }
        #city-coolies-painting .work-service + .work-service {
          padding-top: 25px;
        }
        #city-coolies-painting .work-service h2 {
          margin: 0 0 12px;
          font-size: 28px;
          line-height: 1.2;
        }
        #city-coolies-painting .work-banner {
          display: block;
          width: 100%;
          height: auto;
          object-fit: contain;
        }
        #city-coolies-painting .work-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding-top: 12px;
        }
        #city-coolies-painting .work-row h3 {
          margin: 0 0 6px;
          font-size: 19px;
        }
        #city-coolies-painting .work-row strong {
          display: block;
          margin-top: 11px;
        }
        #city-coolies-painting .work-rating {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 5px;
          font-size: 13px;
          color: #555f6c;
        }
        #city-coolies-painting .work-star {
          display: inline-grid;
          place-items: center;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ef1b23;
          color: #fff;
          font-size: 11px;
        }
        #city-coolies-painting .work-rating a {
          padding-left: 5px;
          color: #e71922;
          font-weight: 600;
          text-decoration: none;
        }
        #city-coolies-painting .work-add {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 85px;
          min-height: 42px;
          padding: 8px 16px;
          border: 1px solid #ef1b23;
          border-radius: 10px;
          background: #fff;
          color: #ef1b23;
          font-size: 16px;
          font-weight: 700;
          text-decoration: none;
          cursor: pointer;
        }
        #city-coolies-painting .work-add:hover {
          background: #ef1b23;
          color: #fff;
        }
        @media (max-width: 980px) {
          #city-coolies-painting .work-container {
            width: min(810px, calc(100% - 28px));
          }
          #city-coolies-painting .work-columns {
            grid-template-columns: minmax(0, 1fr);
          }
          #city-coolies-painting .work-sidebar {
            position: static;
          }
        }
        @media (max-width: 760px) {
          #city-coolies-painting .work-arrow {
            display: none;
          }
        }
        @media (max-width: 600px) {
          #city-coolies-painting .work-container {
            width: calc(100% - 24px);
            padding-top: 144px;
          }
          #city-coolies-painting .work-service h2 {
            font-size: 24px;
          }
          #city-coolies-painting .work-row h3 {
            font-size: 17px;
          }
        }
      `}</style>
    </section>
  );
}
