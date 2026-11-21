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

type MarketplaceService = {
  id: string;
  title: string;
  reviews: number;
  banner: string;
  selector: string;
};

const marketplaceServices: readonly MarketplaceService[] = [
  {
    id: "full-home-renovation",
    title: "Full Home Renovation",
    reviews: 810,
    banner: "full-home-renovation-banner.webp",
    selector: "full-home-renovation-selector.webp",
  },
  {
    id: "kitchen-renovation",
    title: "Kitchen Renovation",
    reviews: 765,
    banner: "kitchen-renovation-banner.webp",
    selector: "kitchen-renovation-selector.webp",
  },
  {
    id: "bathroom-renovation",
    title: "Bathroom Renovation",
    reviews: 720,
    banner: "bathroom-renovation-banner.webp",
    selector: "bathroom-renovation-selector.webp",
  },
  {
    id: "villa-independent-house-renovation",
    title: "Villa / Independent House Renovation",
    reviews: 645,
    banner: "villa-independent-house-renovation-banner.webp",
    selector: "villa-independent-house-renovation-selector.webp",
  },
  {
    id: "complete-house-electrical-renovation",
    title: "Complete House Electrical Renovation",
    reviews: 695,
    banner: "complete-house-electrical-renovation-banner.webp",
    selector: "complete-house-electrical-renovation-selector.webp",
  },
  {
    id: "office-renovation",
    title: "Office Renovation",
    reviews: 610,
    banner: "office-renovation-banner.webp",
    selector: "office-renovation-selector.webp",
  },
  {
    id: "shop-showroom-renovation",
    title: "Shop / Showroom Renovation",
    reviews: 585,
    banner: "shop-showroom-renovation-banner.webp",
    selector: "shop-showroom-renovation-selector.webp",
  },
];

const surveyPrice = 500;
const surveyPriceLabel = "₹500";

function surveyCartId(serviceId: string): string {
  return `renovation:${serviceId}:site-survey`;
}

const renovationUrl = "/services/renovation";

function scrollToService(serviceId: string): void {
  document.getElementById(serviceId)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function scrollSelector(direction: -1 | 1): void {
  document.getElementById("renovation-service-selector")?.scrollBy({
    left: direction * 330,
    behavior: "smooth",
  });
}

export default function RenovationMarketplace() {
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

  function isSelected(serviceId: string): boolean {
    return cartItems.some((item) => item.id === surveyCartId(serviceId));
  }

  function toggleSurvey(service: MarketplaceService): void {
    const cartId = surveyCartId(service.id);

    if (isSelected(service.id)) {
      removeServiceCartItem(cartId);
      return;
    }

    upsertServiceCartItem({
      id: cartId,
      serviceTitle: service.title,
      optionLabel: "Site survey",
      price: surveyPrice,
      priceLabel: surveyPriceLabel,
      duration: "Final renovation rate after site survey",
    });

    window.dispatchEvent(new Event("citycoolies:deep-cleaning-cart-added"));
  }

  return (
    <section id="city-coolies-renovation" className="renovation-section">
      <div className="renovation-container">
        <div className="renovation-columns">
          <main className="renovation-main">
            <p className="renovation-eyebrow">Renovation services</p>
            <h1 className="renovation-pageTitle">Renovation</h1>
            <p className="renovation-intro">
              Select a service to arrange a ₹500 site survey. Your final
              renovation rate is confirmed after the survey.
            </p>

            <div className="renovation-selectorViewport">
              {selectorScrolled && (
                <button
                  type="button"
                  className="renovation-selectorPrevious"
                  aria-label="Show previous renovation services"
                  onClick={() => scrollSelector(-1)}
                >
                  ←
                </button>
              )}

              <nav
                id="renovation-service-selector"
                className="renovation-selector"
                aria-label="Select a renovation service"
                onScroll={(event) =>
                  setSelectorScrolled(event.currentTarget.scrollLeft > 4)
                }
              >
                {marketplaceServices.map((service) => (
                  <button
                    type="button"
                    className="renovation-selectorItem"
                    key={service.id}
                    onClick={() => scrollToService(service.id)}
                  >
                    <span className="renovation-thumbnail">
                      <Image
                        unoptimized
                        src={`/renovation/${service.selector}`}
                        alt=""
                        width={100}
                        height={100}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </span>
                    <span>{service.title}</span>
                  </button>
                ))}
              </nav>

              <button
                type="button"
                className="renovation-selectorNext"
                aria-label="Show more renovation services"
                onClick={() => scrollSelector(1)}
              >
                →
              </button>
            </div>

            {marketplaceServices.map((service) => (
              <section
                className="renovation-serviceGroup"
                id={service.id}
                key={service.id}
              >
                <h2>{service.title}</h2>

                <Image
                  unoptimized
                  className="renovation-banner"
                  src={`/renovation/${service.banner}`}
                  alt={service.title}
                  width={1942}
                  height={809}
                />

                <div className="renovation-serviceRow">
                  <div>
                    <h3>{service.title}</h3>
                    <div className="renovation-rating">
                      <span className="renovation-star">★</span>
                      <span>4.10</span>
                      <span>
                        ({service.reviews.toLocaleString("en-IN")} reviews)
                      </span>
                      <Link href={`${renovationUrl}?service=${service.id}`}>
                        View details
                      </Link>
                    </div>
                    <strong>Site survey ₹500</strong>
                  </div>

                  <button
                    type="button"
                    className="renovation-addButton"
                    onClick={() => toggleSurvey(service)}
                  >
                    {isSelected(service.id) ? "Remove" : "Add"}
                  </button>
                </div>
              </section>
            ))}
          </main>

          <aside className="renovation-sidebar">
            <ServiceCartSidebar />
          </aside>
        </div>
      </div>

      <style jsx global>{`
.renovation-section {
  box-sizing: border-box;
  width: 100%;
  background: #fff;
  color: #171717;
}

.renovation-section * {
  box-sizing: border-box;
}

.renovation-container {
  width: min(928px,calc(100% - 32px));
  margin: 0 auto;
  padding: 28px 0 64px;
}

.renovation-columns {
  display: grid;
  grid-template-columns: minmax(0,590px) minmax(0,310px);
  gap: 28px;
  align-items: start;
}

.renovation-main,.renovation-sidebar {
  min-width: 0;
}

.renovation-sidebar {
  position: sticky;
  top: 170px;
}

.renovation-eyebrow {
  margin: 0 0 18px;
  color: #ef1b23;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.3;
}

.renovation-pageTitle,.renovation-intro {
  display: none;
}

.renovation-selectorViewport {
  position: relative;
  min-width: 0;
}

.renovation-selector {
  display: flex;
  flex-wrap: nowrap;
  gap: 4px;
  overflow-x: auto;
  overflow-y: hidden;
  margin: 0 0 8px;
  padding: 0 0 6px;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scrollbar-width: none;
}

.renovation-selector::-webkit-scrollbar {
  display: none;
}

.renovation-selectorItem {
  display: flex;
  flex: 0 0 100px;
  width: 100px;
  flex-direction: column;
  align-items: center;
  padding: 0;
  border: 0;
  background: transparent;
  color: #171717;
  font: inherit;
  text-align: center;
  cursor: pointer;
  scroll-snap-align: start;
}

.renovation-thumbnail {
  display: block;
  width: 100px;
  height: 100px;
  flex: 0 0 100px;
  background: #fff4f5;
}

.renovation-selectorItem span:last-child {
  display: block;
  width: 100px;
  padding-top: 10px;
  font-size: 13px;
  line-height: 1.15;
}

.renovation-selectorPrevious,.renovation-selectorNext {
  position: absolute;
  z-index: 2;
  top: 48px;
  display: flex;
  width: 38px;
  height: 38px;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 1px solid #f3cbd0;
  border-radius: 50%;
  background: #fff;
  color: #ef1b23;
  box-shadow: 0 2px 10px #00000015;
  font-size: 24px;
  cursor: pointer;
}

.renovation-selectorPrevious {
  left: 1px;
}

.renovation-selectorNext {
  right: 1px;
}

.renovation-selectorPrevious:hover,.renovation-selectorNext:hover {
  background: #ef1b23;
  color: #fff;
}

.renovation-serviceGroup {
  width: 100%;
  padding: 8px 0 22px;
  scroll-margin-top: 140px;
}

.renovation-serviceGroup>h2 {
  margin: 0 0 12px;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
}

.renovation-banner {
  display: block;
  width: 100%;
  aspect-ratio: 1942/809;
  object-fit: contain;
}

.renovation-serviceRow {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 12px 0 8px;
}

.renovation-serviceRow h3 {
  margin: 0 0 6px;
  font-size: 19px;
  line-height: 1.25;
}

.renovation-serviceRow strong {
  display: inline-block;
  margin-top: 12px;
}

.renovation-rating {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  column-gap: 5px;
  row-gap: 3px;
  color: #4e5560;
  font-size: 13px;
  line-height: 1.25;
}

.renovation-star {
  display: inline-flex;
  width: 16px;
  height: 16px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #ef1b23;
  color: #fff;
  font-size: 11px;
}

.renovation-rating span:nth-of-type(3) {
  border-bottom: 1px dotted #69717d;
  white-space: nowrap;
}

.renovation-rating a {
  padding-left: 5px;
  color: #e71922;
  font-weight: 600;
  text-decoration: none;
}

.renovation-addButton {
  min-width: 85px;
  min-height: 42px;
  padding: 8px 16px;
  border: 1px solid #ef1b23;
  border-radius: 10px;
  background: #fff;
  color: #ef1b23;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
}

@media (max-width:980px) {
  .renovation-container {
    width: min(920px,calc(100% - 32px));
    padding-top: 20px;
  }

  .renovation-columns {
    grid-template-columns: minmax(0,1fr);
  }

  .renovation-sidebar {
    position: static;
  }
}

@media (max-width:760px) {
  .renovation-selectorPrevious,.renovation-selectorNext {
    display: none;
  }
}

@media (max-width:600px) {
  .renovation-container {
    width: calc(100% - 24px);
    padding-top: 120px;
  }

  .renovation-serviceGroup>h2 {
    font-size: 24px;
  }

  .renovation-serviceRow h3 {
    font-size: 19px;
  }

  .renovation-rating,.renovation-rating a {
    font-size: 12px;
  }

  .renovation-addButton {
    min-width: 82px;
    padding: 10px 15px;
  }
}
      `}</style>
    </section>
  );
}
