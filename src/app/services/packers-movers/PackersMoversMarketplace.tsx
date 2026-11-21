"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ServiceCartSidebar from "@/app/services/ServiceCartSidebar";
import { upsertServiceCartItem } from "@/app/services/serviceCart";

type MovingServiceListing = {
  id: string;
  title: string;
  startingPrice: number;
  banner: string;
  selector: string;
};

const services: readonly MovingServiceListing[] = [
  {
    id: "local-home-shifting",
    title: "Local Home Shifting",
    startingPrice: 2499,
    banner: "local-home-shifting-banner.webp",
    selector: "local-home-shifting-selector.webp",
  },
  {
    id: "intercity-relocation",
    title: "Intercity Relocation",
    startingPrice: 4999,
    banner: "intercity-relocation-banner.webp",
    selector: "intercity-relocation-selector.webp",
  },
  {
    id: "office-commercial-moving",
    title: "Office & Commercial Moving",
    startingPrice: 5999,
    banner: "office-commercial-moving-banner.webp",
    selector: "office-commercial-moving-selector.webp",
  },
  {
    id: "bike-vehicle-moving",
    title: "Bike & Vehicle Transport",
    startingPrice: 2499,
    banner: "bike-vehicle-moving-banner.webp",
    selector: "bike-vehicle-moving-selector.webp",
  },
  {
    id: "packing-unpacking",
    title: "Packing & Unpacking",
    startingPrice: 1499,
    banner: "packing-unpacking-banner.webp",
    selector: "packing-unpacking-selector.webp",
  },
  {
    id: "loading-unloading",
    title: "Loading & Unloading",
    startingPrice: 1999,
    banner: "loading-unloading-banner.webp",
    selector: "loading-unloading-selector.webp",
  },
];

const money = (value: number) => `₹${value.toLocaleString("en-IN")}`;

export default function PackersMoversMarketplace() {
  const [selectorScrolled, setSelectorScrolled] = useState(false);

  function addMovingQuote(service: MovingServiceListing) {
    upsertServiceCartItem({
      id: "moving:" + service.id,
      serviceTitle: service.title,
      optionLabel: "Free quote request · Move details to confirm",
      price: 0,
      priceLabel: "Free quote request",
      duration: "Indicative starting estimate " +
        money(service.startingPrice) +
        "; final quote after inventory and route confirmation.",
    });

    window.dispatchEvent(
      new Event("citycoolies:deep-cleaning-cart-added")
    );
  }

  function scrollSelector(direction: number) {
    document.getElementById("moving-service-selector")?.scrollBy({
      left: direction * 320,
      behavior: "smooth",
    });
  }

  return (
    <section id="city-coolies-moving" className="work-section">
      <div className="work-container">
        <div className="work-columns">
          <main className="work-main">
            <h1 className="work-title">Packers & Movers</h1>

            <div className="work-selectorWrap">
              {selectorScrolled && (
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
                className="work-selector"
                id="moving-service-selector"
                aria-label="Select a service"
                onScroll={(event) =>
                  setSelectorScrolled(event.currentTarget.scrollLeft > 4)
                }
              >
                {services.map((service) => (
                  <button
                    type="button"
                    className="work-selectorItem"
                    key={service.id}
                    onClick={() =>
                      document.getElementById(service.id)?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      })
                    }
                  >
                    <span className="work-thumb">
                      <Image
                        unoptimized
                        src={"/packers-movers/" + service.selector}
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

            {services.map((service) => (
              <section
                id={service.id}
                className="work-group"
                key={service.id}
              >
                <h2>{service.title}</h2>

                <div className="work-banner">
                  <Image
                    unoptimized
                    src={"/packers-movers/" + service.banner}
                    alt={service.title}
                    width={1942}
                    height={809}
                  />
                </div>

                <div className="work-row">
                  <div>
                    <h3>{service.title}</h3>

                    <div className="work-rating">
                      <span className="work-star" aria-hidden="true">
                        ★
                      </span>
                      <span>4.20</span>
                      <span>(628 reviews)</span>
                      <Link
                        className="work-detailLink"
                        href={
                          "/services/packers-movers?service=" +
                          service.id
                        }
                      >
                        View details
                      </Link>
                    </div>

                    <strong>
                      Estimated from {money(service.startingPrice)}
                    </strong>
                  </div>

                  <button
                    type="button"
                    className="work-add"
                    aria-label={`Add ${service.title}`}
                    onClick={() => addMovingQuote(service)}
                  >
                    Add
                  </button>
                </div>
              </section>
            ))}
          </main>

          <aside id="moving-cart" className="work-sidebar">
            <ServiceCartSidebar />
          </aside>
        </div>
      </div>

      <style jsx global>{`
#city-coolies-moving.work-section {
          width:100%;
          background:#fff;
          color:#171717;
        }
      #city-coolies-moving .work-container {
          width:min(928px, calc(100% - 32px));
          margin:0 auto;
          padding:28px 0 64px;
        }
      #city-coolies-moving .work-columns {
          display:grid;
          grid-template-columns:minmax(0,590px) minmax(0,310px);
          gap:28px;
          align-items:start;
        }
      #city-coolies-moving .work-main {
          min-width:0;
          padding-bottom:60px;
        }
      #city-coolies-moving .work-sidebar {
          min-width:0;
          position:sticky;
          top:170px;
        }
      #city-coolies-moving .work-title {
          margin:0 0 18px;
          color:#ef1b23;
          font-size:18px;
          font-weight:700;
        }
      #city-coolies-moving .work-selectorWrap {
          position:relative;
          min-width:0;
        }
      #city-coolies-moving .work-selector {
          display:flex;
          gap:4px;
          overflow-x:auto;
          scroll-snap-type:x mandatory;
          scroll-behavior:smooth;
          scrollbar-width:none;
          padding:0 0 6px;
          margin-bottom:10px;
        }
      #city-coolies-moving .work-selector::-webkit-scrollbar {
          display:none;
        }
      #city-coolies-moving .work-selectorItem {
          flex:0 0 100px;
          width:100px;
          display:flex;
          flex-direction:column;
          align-items:center;
          gap:8px;
          padding:0;
          border:0;
          background:transparent;
          font:inherit;
          cursor:pointer;
          scroll-snap-align:start;
        }
      #city-coolies-moving .work-thumb {
          display:block;
          width:100px;
          height:100px;
          overflow:hidden;
          background:#fff4f5;
        }
      #city-coolies-moving .work-thumb img {
          display:block;
          width:100%;
          height:100%;
          object-fit:cover;
          object-position:center;
        }
      #city-coolies-moving .work-selectorLabel {
          width:100px;
          text-align:center;
          font-size:13px;
          line-height:1.18;
        }
      #city-coolies-moving .work-arrow {
          position:absolute;
          z-index:2;
          top:46px;
          display:grid;
          place-items:center;
          width:38px;
          height:38px;
          border:1px solid #f3cbd0;
          border-radius:50%;
          background:#fff;
          color:#ef1b23;
          box-shadow:0 2px 10px #00000015;
          font-size:24px;
          cursor:pointer;
        }
      #city-coolies-moving .work-arrowPrev {
          left:1px;
        } #city-coolies-moving .work-arrowNext {
          right:1px;
        }
      #city-coolies-moving .work-group {
          scroll-margin-top:145px;
          padding:10px 0 25px;
        }
      #city-coolies-moving .work-group + .work-group {
          padding-top:25px;
        }
      #city-coolies-moving .work-group h2 {
          margin:0 0 12px;
          font-size:28px;
          line-height:1.2;
        }
      #city-coolies-moving .work-banner {
          width:100%;
          aspect-ratio:1940/811;
          background:#fff4f5;
        }
      #city-coolies-moving .work-banner img {
          display:block;
          width:100%;
          height:100%;
          object-fit:contain;
        }
      #city-coolies-moving .work-row {
          display:flex;
          justify-content:space-between;
          align-items:center;
          gap:12px;
          padding-top:12px;
        }
      #city-coolies-moving .work-row h3 {
          margin:0 0 6px;
          font-size:19px;
          line-height:1.25;
        }
      #city-coolies-moving .work-row strong {
          display:block;
          margin-top:11px;
        }
      #city-coolies-moving .work-rating {
          display:flex;
          align-items:center;
          flex-wrap:wrap;
          column-gap:5px;
          row-gap:3px;
          color:#555f6c;
          font-size:13px;
        }
      #city-coolies-moving .work-star {
          display:inline-grid;
          place-items:center;
          width:16px;
          height:16px;
          border-radius:50%;
          background:#ef1b23;
          color:#fff;
          font-size:11px;
        }
      #city-coolies-moving .work-detailLink {
          color:#e71922;
          font-size:13px;
          font-weight:600;
          text-decoration:none;
        }
      #city-coolies-moving .work-add {
          display:inline-grid;
          place-items:center;
          min-width:85px;
          min-height:42px;
          padding:8px 16px;
          border:1px solid #ef1b23;
          border-radius:10px;
          background:#fff;
          color:#ef1b23;
          font-size:16px;
          font-weight:700;
          text-decoration:none;
        }
      #city-coolies-moving .work-add:hover {
          color:#fff;
          background:#ef1b23;
        }
      @media(max-width:980px) { #city-coolies-moving .work-container {
          width:min(810px, calc(100% - 28px));
        } #city-coolies-moving .work-columns {
          grid-template-columns:minmax(0,1fr);
        } #city-coolies-moving .work-sidebar {
          position:static;
        } }
      @media(max-width:760px) { #city-coolies-moving .work-arrow {
          display:none;
        } }
      #city-coolies-moving #moving-cart {
        scroll-margin-top: 160px;
      }

      @media(max-width:600px) { #city-coolies-moving .work-container {
          width:calc(100% - 24px);
          padding-top:144px;
        } #city-coolies-moving .work-group h2 {
          font-size:24px;
        } #city-coolies-moving .work-row h3 {
          font-size:17px;
        } }
      `}</style>
    </section>
  );
}