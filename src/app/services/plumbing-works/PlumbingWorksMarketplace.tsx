"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import ServiceCartSidebar from "@/app/services/ServiceCartSidebar";
import {
  getServiceCartServerSnapshot,
  getServiceCartSnapshot,
  parseServiceCartSnapshot,
  removeServiceCartItem,
  subscribeServiceCart,
  upsertServiceCartItem,
} from "@/app/services/serviceCart";

type PlumbingListingService = {
  id: string;
  title: string;
  rating: number;
  reviews: number;
  surveyPrice: number | null;
  banner: string;
  selector: string;
};

const services: readonly PlumbingListingService[] = [
  {
    id: "new-home-plumbing",
    title: "New Home Plumbing",
    rating: 4.2,
    reviews: 684,
    surveyPrice: 500,
    banner: "new-home-plumbing-banner.webp",
    selector: "new-home-plumbing-selector.webp",
  },
  {
    id: "pipe-work",
    title: "Pipe Work",
    rating: 4.2,
    reviews: 593,
    surveyPrice: null,
    banner: "pipe-work-banner.webp",
    selector: "pipe-work-selector.webp",
  },
  {
    id: "bathroom-plumbing",
    title: "Bathroom Plumbing",
    rating: 4.2,
    reviews: 521,
    surveyPrice: 500,
    banner: "bathroom-plumbing-banner.webp",
    selector: "bathroom-plumbing-selector.webp",
  },
  {
    id: "plumbing-installation",
    title: "Plumbing Installation",
    rating: 4.2,
    reviews: 476,
    surveyPrice: null,
    banner: "plumbing-installation-banner.webp",
    selector: "plumbing-installation-selector.webp",
  },
];

const pagePath = "/services/plumbing-works";
const imagePath = "/plumbing-works";
const formatPrice = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;
const getSurveyCartId = (serviceId: string) => `plumbing:${serviceId}`;

export default function PlumbingWorksMarketplace() {
  const [selectorScrolled, setSelectorScrolled] = useState(false);

  const snapshot = useSyncExternalStore(
    subscribeServiceCart,
    getServiceCartSnapshot,
    getServiceCartServerSnapshot,
  );

  const cartItems = useMemo(
    () => parseServiceCartSnapshot(snapshot),
    [snapshot],
  );

  function scrollSelector(distance: number) {
    document.getElementById("plumbing-service-selector")?.scrollBy({
      left: distance,
      behavior: "smooth",
    });
  }

  function scrollToService(serviceId: string) {
    document.getElementById(serviceId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function toggleSurvey(service: PlumbingListingService) {
    if (service.surveyPrice === null) return;

    const cartId = getSurveyCartId(service.id);
    const alreadyAdded = cartItems.some((item) => item.id === cartId);

    if (alreadyAdded) {
      removeServiceCartItem(cartId);
      return;
    }

    upsertServiceCartItem({
      id: cartId,
      serviceTitle: service.title,
      optionLabel: "Site survey",
      price: service.surveyPrice,
      priceLabel: formatPrice(service.surveyPrice),
      duration: "Final work rate after site survey",
    });

    window.dispatchEvent(new Event("citycoolies:deep-cleaning-cart-added"));
  }

  return (
    <section id="city-coolies-plumbing" className="plumbing-section">
      <div className="plumbing-container">
        <div className="plumbing-columns">
          <main className="plumbing-main">
            <h1 className="plumbing-eyebrow">Plumbing Works</h1>

            <div className="plumbing-selectorViewport">
              {selectorScrolled && (
                <button
                  type="button"
                  className="plumbing-selectorArrow plumbing-previous"
                  aria-label="Show previous plumbing services"
                  onClick={() => scrollSelector(-320)}
                >
                  ←
                </button>
              )}

              <nav
                id="plumbing-service-selector"
                className="plumbing-selector"
                aria-label="Select a plumbing service"
                onScroll={(event) =>
                  setSelectorScrolled(event.currentTarget.scrollLeft > 4)
                }
              >
                {services.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    className="plumbing-selectorItem"
                    onClick={() => scrollToService(service.id)}
                  >
                    <Image
                      unoptimized
                      src={`${imagePath}/${service.selector}`}
                      alt={service.title}
                      width={100}
                      height={100}
                    />
                    <span>{service.title}</span>
                  </button>
                ))}
              </nav>

              <button
                type="button"
                className="plumbing-selectorArrow plumbing-next"
                aria-label="Show more plumbing services"
                onClick={() => scrollSelector(320)}
              >
                →
              </button>
            </div>

            {services.map((service) => {
              const detailsHref = `${pagePath}?service=${service.id}`;
              const selected = cartItems.some(
                (item) => item.id === getSurveyCartId(service.id),
              );
              const surveyPrice = service.surveyPrice;
              const hasOptions = surveyPrice === null;
              const priceLabel = hasOptions
                ? "Choose plumbing jobs"
                : `Site survey ${formatPrice(surveyPrice)}`;

              return (
                <section
                  key={service.id}
                  id={service.id}
                  className="plumbing-serviceGroup"
                >
                  <h2>{service.title}</h2>

                  <Image
                    unoptimized
                    className="plumbing-banner"
                    src={`${imagePath}/${service.banner}`}
                    alt={service.title}
                    width={1942}
                    height={809}
                  />

                  <div className="plumbing-serviceRow">
                    <div>
                      <h3>{service.title}</h3>

                      <div className="plumbing-rating">
                        <span className="plumbing-star" aria-hidden="true">
                          ★
                        </span>
                        <span>{service.rating.toFixed(2)}</span>
                        <span>
                          ({service.reviews.toLocaleString("en-IN")} reviews)
                        </span>
                        <Link href={detailsHref}>View details</Link>
                      </div>

                      <strong>{priceLabel}</strong>
                    </div>

                    {hasOptions ? (
                      <Link className="plumbing-addButton" href={detailsHref}>
                        Add
                      </Link>
                    ) : (
                      <button
                        className="plumbing-addButton"
                        type="button"
                        onClick={() => toggleSurvey(service)}
                      >
                        {selected ? "Remove" : "Add"}
                      </button>
                    )}
                  </div>
                </section>
              );
            })}
          </main>

          <aside className="plumbing-sidebar">
            <ServiceCartSidebar />
          </aside>
        </div>
      </div>

      <style jsx global>{`
        #city-coolies-plumbing {
          width: 100%;
          background: #fff;
          color: #171717;
        }

        #city-coolies-plumbing * {
          box-sizing: border-box;
        }

        #city-coolies-plumbing .plumbing-container {
          width: min(928px, calc(100% - 32px));
          margin: auto;
          padding: 28px 0 64px;
        }

        #city-coolies-plumbing .plumbing-columns {
          display: grid;
          grid-template-columns: minmax(0, 590px) minmax(0, 310px);
          gap: 28px;
          align-items: start;
        }

        #city-coolies-plumbing .plumbing-main,
        #city-coolies-plumbing .plumbing-sidebar {
          min-width: 0;
        }

        #city-coolies-plumbing .plumbing-sidebar {
          position: sticky;
          top: 170px;
        }

        #city-coolies-plumbing .plumbing-eyebrow {
          margin: 0 0 18px;
          color: #ef1b23;
          font-size: 18px;
          font-weight: 700;
        }

        #city-coolies-plumbing .plumbing-selectorViewport {
          position: relative;
          min-width: 0;
        }

        #city-coolies-plumbing .plumbing-selector {
          display: flex;
          gap: 4px;
          overflow-x: auto;
          padding: 0 0 6px;
          margin-bottom: 10px;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          scrollbar-width: none;
        }

        #city-coolies-plumbing .plumbing-selector::-webkit-scrollbar {
          display: none;
        }

        #city-coolies-plumbing .plumbing-selectorItem {
          flex: 0 0 100px;
          display: flex;
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

        #city-coolies-plumbing .plumbing-selectorItem img {
          display: block;
          width: 100px;
          height: 100px;
          object-fit: cover;
          object-position: center;
          background: #fff4f5;
        }

        #city-coolies-plumbing .plumbing-selectorItem span {
          font-size: 13px;
          line-height: 1.16;
          text-align: center;
        }

        #city-coolies-plumbing .plumbing-selectorItem:hover span,
        #city-coolies-plumbing .plumbing-selectorItem:focus-visible span {
          color: #ef1b23;
        }

        #city-coolies-plumbing .plumbing-selectorArrow {
          position: absolute;
          z-index: 2;
          top: 46px;
          width: 38px;
          height: 38px;
          border: 1px solid #f3cbd0;
          border-radius: 50%;
          background: #fff;
          color: #ef1b23;
          box-shadow: 0 2px 10px #00000015;
          font-size: 24px;
          cursor: pointer;
        }

        #city-coolies-plumbing .plumbing-previous {
          left: 1px;
        }

        #city-coolies-plumbing .plumbing-next {
          right: 1px;
        }

        #city-coolies-plumbing .plumbing-selectorArrow:hover {
          background: #ef1b23;
          color: #fff;
        }

        #city-coolies-plumbing .plumbing-serviceGroup {
          padding: 10px 0 25px;
          scroll-margin-top: 145px;
        }

        #city-coolies-plumbing .plumbing-serviceGroup + .plumbing-serviceGroup {
          padding-top: 25px;
        }

        #city-coolies-plumbing .plumbing-serviceGroup h2 {
          margin: 0 0 12px;
          font-size: 28px;
          line-height: 1.2;
        }

        #city-coolies-plumbing .plumbing-banner {
          display: block;
          width: 100%;
          height: auto;
          aspect-ratio: 1942 / 809;
          object-fit: cover;
          object-position: center;
          background: #fff4f5;
        }

        #city-coolies-plumbing .plumbing-serviceRow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding-top: 12px;
        }

        #city-coolies-plumbing .plumbing-serviceRow h3 {
          margin: 0 0 6px;
          font-size: 19px;
        }

        #city-coolies-plumbing .plumbing-serviceRow strong {
          display: block;
          margin-top: 11px;
        }

        #city-coolies-plumbing .plumbing-rating {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 5px;
          color: #555f6c;
          font-size: 13px;
        }

        #city-coolies-plumbing .plumbing-star {
          display: inline-grid;
          place-items: center;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ef1b23;
          color: #fff;
          font-size: 11px;
        }

        #city-coolies-plumbing .plumbing-rating a {
          padding-left: 5px;
          color: #e71922;
          font-weight: 600;
          text-decoration: none;
        }

        #city-coolies-plumbing .plumbing-rating a:hover {
          text-decoration: underline;
        }

        #city-coolies-plumbing .plumbing-addButton {
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

        #city-coolies-plumbing .plumbing-addButton:hover {
          background: #ef1b23;
          color: #fff;
        }

        @media (max-width: 980px) {
          #city-coolies-plumbing .plumbing-container {
            width: min(calc(100% - 28px), 810px);
          }

          #city-coolies-plumbing .plumbing-columns {
            grid-template-columns: minmax(0, 1fr);
          }

          #city-coolies-plumbing .plumbing-sidebar {
            position: static;
          }
        }

        @media (max-width: 760px) {
          #city-coolies-plumbing .plumbing-selectorArrow {
            display: none;
          }
        }

        @media (max-width: 600px) {
          #city-coolies-plumbing .plumbing-container {
            width: calc(100% - 24px);
            padding-top: 120px;
          }

          #city-coolies-plumbing .plumbing-serviceGroup h2 {
            font-size: 24px;
          }

          #city-coolies-plumbing .plumbing-serviceRow h3 {
            font-size: 17px;
          }
        }
      `}</style>
    </section>
  );
}
