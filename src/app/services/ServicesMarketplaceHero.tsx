"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

// Service categories

const services = [
  {
    slug: "deep-cleaning",
    name: "Deep Cleaning",
    icon: "/service-icons/deep-cleaning-display.webp",
  },
  {
    slug: "renovation",
    name: "Renovation",
    icon: "/service-icons/renovation-display.webp",
  },
  {
    slug: "electrical-works",
    name: "Electrical Works",
    icon: "/service-icons/electrical-works-display.webp",
  },
  {
    slug: "plumbing-works",
    name: "Plumbing Works",
    icon: "/service-icons/plumbing-works-display.webp",
  },
  {
    slug: "painting-services",
    name: "Painting Services",
    icon: "/service-icons/painting-services-display.webp",
  },
  {
    slug: "civil-construction-maintenance",
    name: "Civil Construction & Maintenance",
    icon: "/service-icons/civil-construction-maintenance-display.webp",
  },
  {
    slug: "appliance-repair",
    name: "Appliance Repair",
    icon: "/service-icons/appliance-repair-display.webp",
  },
  {
    slug: "carpentry-interior-works",
    name: "Carpentry & Interior Works",
    icon: "/service-icons/carpentry-interior-works-display.webp",
  },
  {
    slug: "packers-movers",
    name: "Packers & Movers",
    icon: "/service-icons/packers-movers-display.webp",
  },
  {
    slug: "pest-control",
    name: "Pest Control",
    icon: "/service-icons/pest-control-display.webp",
  },
  {
    slug: "spa-salon-services",
    name: "Spa & Salon Services",
    icon: "/service-icons/spa-salon-services-display.webp",
  },
  {
    slug: "fabrication-works",
    name: "Fabrication Works",
    icon: "/service-icons/fabrication-works-display.webp",
  },
  {
    slug: "gardening-landscaping",
    name: "Gardening & Landscaping",
    icon: "/service-icons/gardening-landscaping-display.webp",
  },
  {
    slug: "rental-services",
    name: "Rental Services",
    icon: "/rental-services/rental-services-icon.webp",
  },
] as const;

// Professional gallery images

const heroImages = [
  {
    src: "/service-icons/services-hero-spa-display.webp",
    alt: "City Coolies spa and salon professional",
    priority: true,
  },
  {
    src: "/service-icons/services-hero-plumbing-display.webp",
    alt: "City Coolies plumbing professional",
    priority: true,
  },
  {
    src: "/service-icons/services-hero-carpentry-display.webp",
    alt: "City Coolies carpentry professional",
    priority: false,
  },
  {
    src: "/service-icons/services-hero-painting-display.webp",
    alt: "City Coolies painting professional",
    priority: false,
  },
  {
    src: "/service-icons/services-hero-ac-repair-display.webp",
    alt: "City Coolies AC repair professional",
    priority: false,
  },
  {
    src: "/service-icons/services-hero-cleaning-display.webp",
    alt: "City Coolies cleaning professional",
    priority: false,
  },
] as const;

// Service navigation

function getServiceHref(slug: string): string {
  return slug === "deep-cleaning"
    ? "/services/deep-cleaning?category=full-home-by-room"
    : `/services/${slug}`;
}

// Marketplace hero

// Keep the mobile heading below an overlapping fixed or sticky header.
// Only this hero receives spacing; the navbar and desktop layout are unchanged.
function useMobileHeroClearance() {
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero) {
      return;
    }

    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const headers = Array.from(document.querySelectorAll("header"));
    let frameId = 0;

    function updateClearance() {
      if (!hero) {
        return;
      }

      if (!mobileQuery.matches) {
        hero.style.removeProperty("--mobile-hero-clearance");
        return;
      }

      let headerBottom = 0;

      for (const header of headers) {
        if (hero.contains(header)) {
          continue;
        }

        let element: HTMLElement | null = header;
        let overlaysContent = false;

        while (element && element !== document.body) {
          const position = window.getComputedStyle(element).position;

          if (position === "fixed" || position === "sticky") {
            overlaysContent = true;
            break;
          }

          element = element.parentElement;
        }

        if (overlaysContent && header.getClientRects().length > 0) {
          headerBottom = Math.max(
            headerBottom,
            header.getBoundingClientRect().bottom,
          );
        }
      }

      // Document coordinates avoid adding space just because the page is scrolled.
      const heroDocumentTop =
        hero.getBoundingClientRect().top + window.scrollY;

      const clearance = Math.max(0, headerBottom - heroDocumentTop);

      hero.style.setProperty(
        "--mobile-hero-clearance",
        `${Math.ceil(clearance)}px`,
      );
    }

    function scheduleUpdate() {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateClearance);
    }

    const observer = new ResizeObserver(scheduleUpdate);

    for (const header of headers) {
      observer.observe(header);
    }

    scheduleUpdate();
    window.addEventListener("resize", scheduleUpdate);
    mobileQuery.addEventListener("change", scheduleUpdate);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", scheduleUpdate);
      mobileQuery.removeEventListener("change", scheduleUpdate);
      hero.style.removeProperty("--mobile-hero-clearance");
    };
  }, []);

  return heroRef;
}

export default function ServicesMarketplaceHero() {
  const heroRef = useMobileHeroClearance();

  return (
    <section
      ref={heroRef}
      className="cc-marketplace"
      aria-label="City Coolies service marketplace"
    >
      <div className="cc-marketplace__layout">
        <div className="cc-marketplace__content">
          <h1 className="cc-marketplace__title">
            Find &amp; Book Services
            <span>For Homes, Businesses &amp; Industries</span>
          </h1>

          <nav
            className="cc-marketplace__panel"
            aria-label="Service categories"
          >
            <ul className="cc-marketplace__categories">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={getServiceHref(service.slug)}
                    className="cc-marketplace__category"
                  >
                    <span
                      className="cc-marketplace__icon"
                      aria-hidden="true"
                    >
                      <Image
                        src={service.icon}
                        alt=""
                        width={80}
                        height={80}
                        unoptimized
                        sizes="(max-width: 639px) 64px, 80px"
                      />
                    </span>

                    <span className="cc-marketplace__name">
                      {service.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div
            className="cc-marketplace__stats"
            aria-label="Service trust statistics"
          >
            <div className="cc-marketplace__stat">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m12 3 2.78 5.63 6.22.9-4.5 4.39 1.06 6.2L12 17.2l-5.56 2.92 1.06-6.2L3 9.53l6.22-.9L12 3Z"
                />
              </svg>

              <span>
                <strong>4.4</strong>
                <small>Service Rating</small>
              </span>
            </div>

            <div className="cc-marketplace__stat">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                aria-hidden="true"
              >
                <circle cx="9" cy="8" r="3.2" />
                <circle cx="17" cy="9" r="2.4" />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.5 20c0-3.6 2.4-6 5.5-6s5.5 2.4 5.5 6M14.5 14.7c.7-.45 1.55-.7 2.5-.7 2.3 0 4 1.75 4 4.5"
                />
              </svg>

              <span>
                <strong>9M+</strong>
                <small>Customers Across India</small>
              </span>
            </div>
          </div>
        </div>

        <div
          className="cc-marketplace__gallery"
          aria-label="City Coolies service professionals"
        >
          {heroImages.map((image) => (
            <div
              className="cc-marketplace__photo"
              key={image.src}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={768}
                height={1024}
                priority={image.priority}
                unoptimized
                sizes="(max-width: 767px) 50vw, (max-width: 1023px) 45vw, 300px"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{MARKETPLACE_CSS}</style>
    </section>
  );
}

// Marketplace styles

const MARKETPLACE_CSS = `
  /* Mobile heading clearance below the existing site header. */
  @media (max-width: 767px) {
    .cc-marketplace {
      padding-top: var(--mobile-hero-clearance, 0px);
    }

    .cc-marketplace .cc-marketplace__title {
      display: block;
      visibility: visible;
      opacity: 1;
    }

    .cc-marketplace .cc-marketplace__title span {
      display: block;
    }
  }

  /* Base */

  .cc-marketplace {
    width: 100%;
    background: #fff;
    color: #171717;
    font-family: var(--font-geist-sans), Arial, Helvetica, sans-serif;
  }

  .cc-marketplace * {
    box-sizing: border-box;
  }

  /* Main layout */

  .cc-marketplace__layout {
    display: grid;
    grid-template-columns: minmax(0, 436px) minmax(0, 464px);
    gap: 182px;
    align-items: start;
    width: min(calc(100% - 48px), 1082px);
    margin: auto;
    padding: 26px 0 64px;
  }

  .cc-marketplace__content,
  .cc-marketplace__gallery {
    min-width: 0;
  }

  /* Heading */

  .cc-marketplace__title {
    max-width: 440px;
    margin: 0 0 24px;
    font-size: 32px;
    font-weight: 500;
    line-height: 1.25;
  }

  .cc-marketplace__title span {
    display: block;
    color: #ef1b23;
  }

  /* Service categories */

  .cc-marketplace__panel {
    width: 100%;
    max-width: 436px;
    padding: 24px 16px;
    border: 1px solid #e3e3e3;
    border-radius: 10px;
    background: #fff;
  }

  .cc-marketplace__categories {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 32px 12px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .cc-marketplace__categories li {
    min-width: 0;
  }

  .cc-marketplace__category {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    height: 100%;
    min-width: 0;
    border-radius: 8px;
    color: inherit;
    text-align: center;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
  }

  .cc-marketplace__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 88px;
  }

  .cc-marketplace__icon img {
    display: block;
    width: 80px;
    height: 80px;
    max-width: 100%;
    object-fit: contain;
    animation: cc-marketplace-float 4s ease-in-out infinite;
  }

  .cc-marketplace__name {
    max-width: 100%;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.4;
    overflow-wrap: break-word;
  }

  .cc-marketplace__category:focus-visible {
    outline: 2px solid #ef1b23;
    outline-offset: 5px;
  }

  /* Professional gallery */

  .cc-marketplace__gallery {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 6px;
    align-content: start;
  }

  .cc-marketplace__photo {
    min-width: 0;
    overflow: hidden;
    background: transparent;
  }

  .cc-marketplace__photo img {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 3 / 4;
    object-fit: contain;
  }

  /* Trust statistics */

  .cc-marketplace__stats {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 54px;
    margin-top: 24px;
    padding-left: 8px;
  }

  .cc-marketplace__stat {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .cc-marketplace__stat svg {
    width: 38px;
    height: 38px;
    flex-shrink: 0;
  }

  .cc-marketplace__stat span {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .cc-marketplace__stat strong {
    font-size: 25px;
    font-weight: 600;
    line-height: 1;
  }

  .cc-marketplace__stat small {
    color: #686868;
    font-size: 14px;
    line-height: 1.35;
  }

  /* Animation and hover */

  @keyframes cc-marketplace-float {
    0%,
    100% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-3px);
    }
  }

  @media (hover: hover) {
    .cc-marketplace__category:hover .cc-marketplace__name {
      color: #ef1b23;
    }
  }

  /* Medium and large screens */

  @media (min-width: 768px) and (max-width: 1350px) {
    .cc-marketplace__layout {
      grid-template-columns: minmax(0, 1fr) minmax(0, 1.064fr);
      gap: clamp(24px, calc(100vw - 948px), 182px);
    }
  }

  /* Tablets and smaller screens */

  @media (max-width: 1023px) {
    .cc-marketplace__layout {
      gap: 28px;
      padding: 32px 0 48px;
    }

    .cc-marketplace__title {
      font-size: 27px;
      margin-bottom: 28px;
    }

    .cc-marketplace__categories {
      gap: 24px 6px;
    }

    .cc-marketplace__icon {
      height: 68px;
    }

    .cc-marketplace__icon img {
      width: 62px;
      height: 62px;
    }

    .cc-marketplace__name {
      font-size: 12px;
    }

    .cc-marketplace__stats {
      gap: 18px;
    }
  }

  /* Mobile phones */

  @media (max-width: 767px) {
    .cc-marketplace__layout {
      grid-template-columns: minmax(0, 1fr);
      width: min(calc(100% - 32px), 520px);
      padding: 28px 0 40px;
    }

    .cc-marketplace__title {
      font-size: clamp(25px, 6vw, 30px);
    }

    .cc-marketplace__panel {
      max-width: none;
      padding: 22px 14px;
    }

    .cc-marketplace__categories {
      gap: 24px 10px;
    }

    .cc-marketplace__icon {
      height: 72px;
    }

    .cc-marketplace__icon img {
      width: 64px;
      height: 64px;
    }

    .cc-marketplace__stats {
      justify-content: space-between;
      gap: 14px;
    }

    .cc-marketplace__stat {
      gap: 8px;
    }

    .cc-marketplace__stat svg {
      width: 30px;
      height: 30px;
    }

    .cc-marketplace__stat strong {
      font-size: 22px;
    }

    .cc-marketplace__stat small {
      font-size: 12px;
    }
  }

  /* Narrow mobile screens */

  @media (max-width: 359px) {
    .cc-marketplace__categories {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  /* Reduced motion preference */

  @media (prefers-reduced-motion: reduce) {
    .cc-marketplace__icon img {
      animation: none;
    }
  }
`;
