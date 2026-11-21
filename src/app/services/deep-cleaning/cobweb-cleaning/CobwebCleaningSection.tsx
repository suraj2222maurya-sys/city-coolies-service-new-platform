"use client";

import Image from "next/image";
import Link from "next/link";
import ServiceCartSidebar from "@/app/services/ServiceCartSidebar";

const CATEGORY_URL = "/services/deep-cleaning?category=cobweb-cleaning";
const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;

type CobwebListing = {
  id: string;
  title: string;
  rating: number;
  reviews: number;
  surveyPrice: number;
  image: string;
};

const SERVICES: readonly CobwebListing[] = [
  {
    id: "home-cobweb-cleaning",
    title: "Home Cobweb Cleaning",
    rating: 4.4,
    reviews: 810,
    surveyPrice: 500,
    image: "/deep-cleaning/home_cobweb_cleaning.webp",
  },
  {
    id: "industrial-cobweb-cleaning",
    title: "Industrial Cobweb Cleaning",
    rating: 4.4,
    reviews: 740,
    surveyPrice: 500,
    image: "/deep-cleaning/industrial_cobweb_cleaning.webp",
  },
  {
    id: "building-cobweb-cleaning",
    title: "Building Cobweb Cleaning",
    rating: 4.4,
    reviews: 690,
    surveyPrice: 500,
    image: "/deep-cleaning/building_cobweb_cleaning.webp",
  },
  {
    id: "commercial-cobweb-cleaning",
    title: "Commercial Cobweb Cleaning",
    rating: 4.4,
    reviews: 780,
    surveyPrice: 500,
    image: "/deep-cleaning/commercial_cobweb_cleaning.webp",
  },
 ];

function scrollToService(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function CobwebCleaningSection() {
  return (
    <section id="panel-cobweb-cleaning" className="cc-cobweb-listing" role="tabpanel" aria-labelledby="cobweb-cleaning-heading">
      <h2 id="cobweb-cleaning-heading" className="cc-cobweb-visuallyHidden">Cobweb Cleaning</h2>
      <div className="cc-cobweb-container">
        <div className="cc-cobweb-layout">
          <div className="cc-cobweb-main">
            <nav className="cc-cobweb-selector" aria-label="Cobweb cleaning services">
              {SERVICES.map((service) => (
                <button key={service.id} type="button" className="cc-cobweb-selectorItem" onClick={() => scrollToService(`cobweb-${service.id}`)}>
                  <Image unoptimized src={service.image} alt="" width={100} height={100} />
                  <span>{service.title}</span>
                </button>
              ))}
            </nav>
            {SERVICES.map((service) => {
              const detailsUrl = `${CATEGORY_URL}&cobwebService=${encodeURIComponent(service.id)}`;
              return (
                <section key={service.id} id={`cobweb-${service.id}`} className="cc-cobweb-service">
                  <h2>{service.title}</h2>
                  <Image unoptimized className="cc-cobweb-banner" src={service.image} alt={service.title} width={1940} height={811} />
                  <div className="cc-cobweb-serviceRow">
                    <div className="cc-cobweb-serviceInfo">
                      <h3>{service.title}</h3>
                      <div className="cc-cobweb-rating">
                        <span className="cc-cobweb-star" aria-hidden="true">★</span>
                        <span>{service.rating.toFixed(1)}</span>
                        <span>({service.reviews.toLocaleString("en-IN")} reviews)</span>
                        <Link href={detailsUrl}>View details</Link>
                      </div>
                      <strong>Site survey {formatPrice(service.surveyPrice)}</strong>
                    </div>
                    <Link className="cc-cobweb-add" href={detailsUrl}>Add</Link>
                  </div>
                </section>
              );
            })}
          </div>
          <aside className="cc-cobweb-sidebar"><ServiceCartSidebar /></aside>
        </div>
      </div>
      <style jsx global>{`
        .cc-cobweb-listing {
  width: 100%;
  background: #fff;
  color: #171717;
        }
        .cc-cobweb-listing * {
  box-sizing: border-box;
        }
        .cc-cobweb-visuallyHidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
        }
        .cc-cobweb-container {
  width: min(928px, calc(100% - 32px));
  margin: 0 auto;
  padding-bottom: 64px;
        }
        .cc-cobweb-layout {
  display: grid;
  grid-template-columns: minmax(0, 590px) minmax(0, 310px);
  gap: 28px;
  align-items: start;
        }
        .cc-cobweb-main, .cc-cobweb-sidebar {
  min-width: 0;
        }
        .cc-cobweb-sidebar {
  position: sticky;
  top: 170px;
        }
        .cc-cobweb-selector {
  display: flex;
  gap: 4px;
  overflow-x: auto;
  padding: 0 0 10px;
  scroll-snap-type: x proximity;
  scrollbar-width: none;
        }
        .cc-cobweb-selector::-webkit-scrollbar {
  display: none;
        }
        .cc-cobweb-selectorItem {
  display: flex;
  flex: 0 0 100px;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 0;
  border: 0;
  background: none;
  color: inherit;
  font: inherit;
  cursor: pointer;
  scroll-snap-align: start;
        }
        .cc-cobweb-selectorItem img {
  display: block;
  width: 100px;
  height: 100px;
  object-fit: contain;
        }
        .cc-cobweb-selectorItem span {
  font-size: 13px;
  line-height: 1.2;
  text-align: center;
        }
        .cc-cobweb-selectorItem:hover span, .cc-cobweb-selectorItem:focus-visible span {
  color: #ef1b23;
        }
        .cc-cobweb-service {
  padding: 16px 0 18px;
  scroll-margin-top: 155px;
        }
        .cc-cobweb-service > h2 {
  margin: 0 0 22px;
  font-size: 32px;
  line-height: 1.2;
        }
        .cc-cobweb-banner {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
        }
        .cc-cobweb-serviceRow {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  padding: 16px 0;
        }
        .cc-cobweb-serviceInfo {
  min-width: 0;
        }
        .cc-cobweb-serviceInfo h3 {
  margin: 0 0 8px;
  font-size: 18px;
        }
        .cc-cobweb-rating {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
  color: #555;
  font-size: 13px;
        }
        .cc-cobweb-star {
  display: inline-grid;
  place-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ef1b23;
  color: #fff;
  font-size: 11px;
        }
        .cc-cobweb-rating a {
  color: #ef1b23;
  font-weight: 700;
  text-decoration: none;
        }
        .cc-cobweb-serviceInfo > strong {
  display: block;
  margin-top: 10px;
  font-size: 13px;
        }
        .cc-cobweb-add {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  min-width: 86px;
  min-height: 42px;
  padding: 8px 20px;
  border: 1px solid #ef1b23;
  border-radius: 9px;
  background: #fff;
  color: #ef1b23;
  font-weight: 700;
  text-decoration: none;
        }
        .cc-cobweb-add:hover, .cc-cobweb-add:focus-visible {
  background: #ef1b23;
  color: #fff;
        }
        @media (max-width: 980px) {
          .cc-cobweb-container {
  width: min(810px, calc(100% - 28px));
        }
          .cc-cobweb-layout {
  grid-template-columns: minmax(0, 1fr);
        }
          .cc-cobweb-sidebar {
  position: static;
        }
        }
        @media (max-width: 760px) {
          .cc-cobweb-container {
  width: calc(100% - 24px);
  padding-bottom: 42px;
        }
          .cc-cobweb-service > h2 {
  font-size: 24px;
        }
          .cc-cobweb-selectorItem {
  flex-basis: 76px;
        }
          .cc-cobweb-selectorItem img {
  width: 72px;
  height: 72px;
        }
          .cc-cobweb-selectorItem span {
  font-size: 11px;
        }
          .cc-cobweb-serviceInfo h3 {
  font-size: 16px;
        }
          .cc-cobweb-rating {
  font-size: 12px;
        }
          .cc-cobweb-add {
  min-width: 72px;
  min-height: 39px;
  padding: 7px 15px;
        }
        }
      `}</style>
    </section>
  );
}
