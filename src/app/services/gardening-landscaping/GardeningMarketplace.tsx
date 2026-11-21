"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import ServiceCartSidebar from "@/app/services/ServiceCartSidebar";

type GardeningListing = {
  id: string;
  title: string;
  rating: string;
  reviews: number;
  startingPrice: number;
  banner: string;
  thumbnail: string;
};

const imagePath = "/gardening-landscaping/";
const servicePath = "/services/gardening-landscaping";

const services: readonly GardeningListing[] = [
  {
    id: "gardener",
    title: "Gardener",
    rating: "4.40",
    reviews: 459000,
    startingPrice: 499,
    banner: "gardener-banner.webp",
    thumbnail: "gardener-selector.webp",
  },
  {
    id: "lawn-care",
    title: "Lawn Care",
    rating: "4.20",
    reviews: 573,
    startingPrice: 349,
    banner: "lawn-care-banner.webp",
    thumbnail: "lawn-care-selector.webp",
  },
  {
    id: "landscaping",
    title: "Landscaping",
    rating: "4.20",
    reviews: 482,
    startingPrice: 500,
    banner: "landscaping-banner.webp",
    thumbnail: "landscaping-selector.webp",
  },
  {
    id: "vertical-garden",
    title: "Vertical Garden",
    rating: "4.20",
    reviews: 416,
    startingPrice: 500,
    banner: "vertical-garden-banner.webp",
    thumbnail: "vertical-garden-selector.webp",
  },
  {
    id: "nursery",
    title: "Nursery",
    rating: "4.20",
    reviews: 795,
    startingPrice: 149,
    banner: "nursery-banner.webp",
    thumbnail: "nursery-selector.webp",
  },
  {
    id: "pots",
    title: "Pots",
    rating: "4.20",
    reviews: 534,
    startingPrice: 149,
    banner: "pots-banner.webp",
    thumbnail: "pots-selector.webp",
  },
  {
    id: "compost",
    title: "Compost & Soil",
    rating: "4.20",
    reviews: 388,
    startingPrice: 249,
    banner: "compost-banner.webp",
    thumbnail: "compost-selector.webp",
  },
];

function formatReviews(reviews: number): string {
  return reviews >= 1000
    ? `${Math.round(reviews / 1000)}K`
    : String(reviews);
}

export default function GardeningMarketplace() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (
      searchParams.get("showGardeningCart") !== "1" ||
      window.innerWidth > 980
    ) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      document
        .querySelector<HTMLElement>(".cc-garden-market .sidebar")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [searchParams]);

  return (
    <section className="cc-garden-market">
      <div className="container">
        <main className="main">
          <h1 className="pageTitle">Gardening &amp; Landscaping</h1>

          <div className="gardenSlideWrap">
  <button
    type="button"
    className="gardenSlideArrow gardenSlidePrev"
    aria-label="Previous services"
    onClick={() =>
      document.querySelector<HTMLElement>(".cc-garden-market nav.selector")
        ?.scrollBy({ left: -336, behavior: "smooth" })
    }
  >
    {"\u2039"}
  </button>
<nav className="selector" aria-label="Select gardening service">
            {services.map((service) => (
              <button
                key={service.id}
                className="selectorItem"
                type="button"
                onClick={() => {
                  document
                    .getElementById(`garden-${service.id}`)
                    ?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                }}
              >
                <Image
                  className="selectorImage"
                  src={`${imagePath}${service.thumbnail}`}
                  alt=""
                  width={100}
                  height={100}
                  unoptimized
                />
                <span>{service.title}</span>
              </button>
            ))}
          </nav>
  <button
    type="button"
    className="gardenSlideArrow gardenSlideNext"
    aria-label="Next services"
    onClick={() =>
      document.querySelector<HTMLElement>(".cc-garden-market nav.selector")
        ?.scrollBy({ left: 336, behavior: "smooth" })
    }
  >
    {"\u203A"}
  </button>
</div>

          {services.map((service) => {
            const detailsUrl = `${servicePath}?service=${service.id}`;
            const isSurvey =
              service.id === "landscaping" ||
              service.id === "vertical-garden";

            return (
              <section
                key={service.id}
                id={`garden-${service.id}`}
                className="service"
              >
                <h2 className="serviceTitle">{service.title}</h2>

                <Image
                  className="banner"
                  src={`${imagePath}${service.banner}`}
                  alt={service.title}
                  width={1942}
                  height={809}
                  unoptimized
                />

                <div className="serviceInfo">
                  <div className="serviceDescription">
                    <h3>{service.title}</h3>

                    <div className="rating">
                      <span className="star" aria-hidden="true">
                        ★
                      </span>
                      <span>{service.rating}</span>
                      <span>({formatReviews(service.reviews)} reviews)</span>
                      <Link href={detailsUrl}>View details</Link>
                    </div>

                    <strong className="price">
                      {isSurvey ? "Site survey from " : "Starts at "}
                      ₹{service.startingPrice.toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <Link className="addButton" href={detailsUrl}>
                    Add
                  </Link>
                </div>
              </section>
            );
          })}
        </main>

        <aside className="sidebar" aria-label="Service cart">
          <ServiceCartSidebar />
        </aside>
      </div>

      <style jsx global>{`
        .cc-garden-market {
          width: 100%;
          color: #171717;
          background: #ffffff;
        }

        .cc-garden-market .container {
          display: grid;
          grid-template-columns: minmax(0, 590px) minmax(0, 310px);
          gap: 28px;
          align-items: start;
          width: min(928px, calc(100% - 32px));
          margin: 0 auto;
          padding: 28px 0 64px;
        }

        .cc-garden-market .main {
          min-width: 0;
          padding-bottom: 40px;
        }

        .cc-garden-market .pageTitle {
          margin: 0 0 18px;
          color: #ef1b23;
          font-size: 20px;
          font-weight: 700;
        }

        .cc-garden-market .sidebar {
          position: sticky;
          top: 170px;
          min-width: 0;
        }

        .cc-garden-market .selector {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          padding-bottom: 12px;
          scrollbar-width: thin;
          scroll-snap-type: x proximity;
        }

        .cc-garden-market .selectorItem {
          display: flex;
          flex: 0 0 100px;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 0;
          border: 0;
          color: inherit;
          background: transparent;
          font: inherit;
          font-size: 13px;
          line-height: 1.35;
          text-align: center;
          cursor: pointer;
          scroll-snap-align: start;
        }

        .cc-garden-market .selectorItem:focus-visible,
        .cc-garden-market .addButton:focus-visible {
          outline: 2px solid #ef1b23;
          outline-offset: 3px;
        }

        .cc-garden-market .selectorImage {
          display: block;
          width: 100px;
          height: 100px;
          object-fit: cover;
        }

        .cc-garden-market .service {
          padding: 28px 0;
          border-bottom: 1px solid #f0dfe2;
          scroll-margin-top: 190px;
        }

        .cc-garden-market .serviceTitle {
          margin: 0 0 14px;
          font-size: 28px;
          line-height: 1.25;
        }

        .cc-garden-market .banner {
          display: block;
          width: 100%;
          height: auto;
          object-fit: contain;
        }

        .cc-garden-market .serviceInfo {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding-top: 16px;
        }

        .cc-garden-market .serviceDescription {
          min-width: 0;
        }

        .cc-garden-market .serviceDescription h3 {
          margin: 0 0 8px;
          font-size: 19px;
          line-height: 1.3;
        }

        .cc-garden-market .rating {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 6px;
          color: #555f6c;
          font-size: 13px;
        }

        .cc-garden-market .star,
        .cc-garden-market .rating a {
          color: #ef1b23;
        }

        .cc-garden-market .rating a {
          font-weight: 600;
          text-decoration: none;
        }

        .cc-garden-market .price {
          display: block;
          margin-top: 12px;
          font-size: 16px;
        }

        .cc-garden-market .addButton {
          display: inline-flex;
          flex: 0 0 auto;
          align-items: center;
          justify-content: center;
          min-width: 85px;
          min-height: 42px;
          padding: 8px 16px;
          border: 1px solid #ef1b23;
          border-radius: 10px;
          color: #ef1b23;
          font-size: 16px;
          font-weight: 700;
          text-decoration: none;
          transition:
            background-color 0.15s ease,
            color 0.15s ease;
        }

        .cc-garden-market .addButton:hover {
          color: #ffffff;
          background: #ef1b23;
        }

        @media (max-width: 980px) {
          .cc-garden-market .container {
            grid-template-columns: minmax(0, 1fr);
            width: min(810px, calc(100% - 28px));
          }

          .cc-garden-market .sidebar {
            position: static;
          }
        }

        @media (max-width: 600px) {
          .cc-garden-market .container {
            width: calc(100% - 24px);
            padding-top: 144px;
          }

          .cc-garden-market .serviceTitle {
            font-size: 24px;
          }

          .cc-garden-market .serviceDescription h3 {
            font-size: 17px;
          }

          .cc-garden-market .selector {
            gap: 10px;
          }

          .cc-garden-market .selectorItem {
            flex-basis: 88px;
          }

          .cc-garden-market .selectorImage {
            width: 88px;
            height: 88px;
          }

          .cc-garden-market .addButton {
            min-width: 74px;
          }
        }

        .cc-garden-market .gardenSlideWrap {
          position: relative;
          min-width: 0;
        }

        .cc-garden-market .gardenSlideArrow {
          position: absolute;
          top: 34px;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border: 1px solid #f0dfe2;
          border-radius: 50%;
          background: #fff;
          color: #ef1b23;
          font-size: 26px;
          cursor: pointer;
        }

        .cc-garden-market .gardenSlidePrev {
          left: 0;
        }

        .cc-garden-market .gardenSlideNext {
          right: 0;
        }

        @media (max-width: 980px) {
          .cc-garden-market .gardenSlideArrow {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}