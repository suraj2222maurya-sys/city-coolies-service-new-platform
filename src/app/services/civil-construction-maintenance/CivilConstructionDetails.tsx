"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useSyncExternalStore } from "react";

import {
  getServiceCartServerSnapshot,
  getServiceCartSnapshot,
  parseServiceCartSnapshot,
  removeServiceCartItem,
  subscribeServiceCart,
  upsertServiceCartItem,
} from "@/app/services/serviceCart";

export type Service = {
  id: string;
  title: string;
  reviews: number;
  description: string;
  includes: readonly string[];
  process: readonly string[];
};

export const services: readonly Service[] = [
  {
    id: "full-home-apartment-construction",
    title: "Full Home & Apartment Construction",
    reviews: 628,
    description:
      "Construction planning for a new home or apartment, from site assessment through approved structure and finishes.",
    includes: [
      "Site dimensions and access assessment",
      "Foundation and structural drawing review",
      "Masonry, plaster, flooring and finishing scope",
      "Material quantities and work schedule planning",
    ],
    process: [
      "Survey the site, plans and proposed use",
      "Review soil information, drawings, utilities and required permissions",
      "Agree engineering design, materials, schedule and final quotation",
      "Execute approved stages with inspections and handover checks",
    ],
  },
  {
    id: "exterior-civil-work",
    title: "Exterior Civil Work",
    reviews: 502,
    description:
      "Civil work for exterior areas such as compound walls, paving, steps and surface repairs.",
    includes: [
      "Compound wall and entrance assessment",
      "Paving and pathway scope",
      "External steps, drains and surface repair planning",
      "Drainage and weather exposure review",
    ],
    process: [
      "Inspect dimensions, levels, ground conditions and existing damage",
      "Confirm drainage, foundation and material requirements",
      "Agree the final scope and price after the survey",
      "Complete approved civil work and inspect drainage and finish",
    ],
  },
  {
    id: "commercial-industrial-civil-work",
    title: "Commercial & Industrial Civil Work",
    reviews: 447,
    description:
      "Site specific civil construction for shops, offices, warehouses, schools and industrial premises.",
    includes: [
      "Building and operational requirements survey",
      "Floors, partitions and utility route planning",
      "Access and safe work sequence assessment",
      "Engineer approved scope when structural work is involved",
    ],
    process: [
      "Survey the premises and record operating constraints",
      "Review existing drawings, loads and structural requirements",
      "Confirm the phased plan, materials and final quote",
      "Perform approved work with inspections and site handover",
    ],
  },
  {
    id: "repair-maintenance-civil-work",
    title: "Repair & Maintenance Civil Work",
    reviews: 583,
    description:
      "Civil maintenance for damaged plaster, masonry, surfaces, floors and drainage related defects.",
    includes: [
      "Crack and damaged surface assessment",
      "Plaster, masonry and flooring repair scope",
      "Water ingress and drainage observations",
      "Maintenance plan and final repair quotation",
    ],
    process: [
      "Inspect the defect and identify likely causes",
      "Escalate structural damage for engineering review",
      "Agree repairs, materials and final price after survey",
      "Complete approved repair, curing and finish inspection",
    ],
  },
  {
    id: "rcc-construction",
    title: "RCC Construction",
    reviews: 419,
    description:
      "Reinforced cement concrete work for engineer designed structural elements, subject to site review and approved drawings.",
    includes: [
      "Structural drawing and load requirement review",
      "Foundation, column, beam or slab scope assessment",
      "Steel, formwork and concrete planning",
      "Concrete placement, curing and inspection planning",
    ],
    process: [
      "Survey the site and review structural design with a qualified engineer",
      "Confirm drawings, reinforcement details, formwork and final quotation",
      "Execute approved reinforcement, formwork and concreting stages",
      "Complete specified curing, quality checks and engineer inspection",
    ],
  },
  {
    id: "complete-construction-work",
    title: "Complete Construction Work",
    reviews: 706,
    description:
      "Coordinated construction scope for an entire property, from site preparation to finishing and handover.",
    includes: [
      "Full site and project scope survey",
      "Drawings, approvals and structural design coordination",
      "Civil, finishing and utility work sequencing",
      "Phased schedule, materials and final quotation",
    ],
    process: [
      "Survey the site and collect project requirements",
      "Coordinate approved architectural and structural drawings and permits",
      "Agree milestones, materials and final cost after the survey",
      "Complete approved work in stages with inspections and handover",
    ],
  },
];

export const cartId = (id: string): string => `civil:${id}`;

const MARKETPLACE_PATH =
  "/services/civil-construction-maintenance";

const SURVEY_PRICE = 500;
const SURVEY_PRICE_LABEL = "₹500";
const SERVICE_RATING = "4.20";

const SURVEY_DURATION =
  "Final civil work rate confirmed after the site survey and approved scope";

const SURVEY_NOTICE =
  "The site survey costs ₹500. The final construction or repair rate is confirmed after inspecting the site, reviewing the approved work scope, measurements and materials.";

const ratingBreakdown = [48, 29, 13, 7, 3] as const;

type CivilConstructionDetailsProps = {
  serviceId: string;
};

export default function CivilConstructionDetails({
  serviceId,
}: CivilConstructionDetailsProps) {
  const router = useRouter();

  const snapshot = useSyncExternalStore(
    subscribeServiceCart,
    getServiceCartSnapshot,
    getServiceCartServerSnapshot,
  );

  const cartItems = useMemo(
    () => parseServiceCartSnapshot(snapshot),
    [snapshot],
  );

  const service = services.find((item) => item.id === serviceId);

  const selected = service
    ? cartItems.some((item) => item.id === cartId(service.id))
    : false;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  function handleContinue() {
    if (!service) return;

    const id = cartId(service.id);

    if (selected) {
      removeServiceCartItem(id);
    } else {
      upsertServiceCartItem({
        id,
        serviceTitle: service.title,
        optionLabel: "Site survey",
        price: SURVEY_PRICE,
        priceLabel: SURVEY_PRICE_LABEL,
        duration: SURVEY_DURATION,
      });
    }

    window.dispatchEvent(
      new Event("citycoolies:deep-cleaning-cart-added"),
    );

    router.push(MARKETPLACE_PATH);
  }

  if (!service) {
    return (
      <main id="civil-details" className="civil-details-page">
        <Link href={MARKETPLACE_PATH}>
          ← Back to Civil Construction &amp; Maintenance
        </Link>

        <p>Service not found.</p>

        <style jsx global>{detailsStyles}</style>
      </main>
    );
  }

  return (
    <main id="civil-details" className="civil-details-page">
      <nav
        className="civil-details-nav"
        aria-label="Service navigation"
      >
        <Link href={MARKETPLACE_PATH}>
          ← Back to Civil Construction &amp; Maintenance
        </Link>

        <span>
          City Coolies · Civil Construction &amp; Maintenance
        </span>
      </nav>

      <header className="civil-details-header">
        <h1>{service.title}</h1>

        <p>
          Site survey {SURVEY_PRICE_LABEL} · {SERVICE_RATING} ★ ·{" "}
          {service.reviews.toLocaleString("en-IN")} reviews
        </p>
      </header>

      <p className="civil-details-description">
        {service.description}
      </p>

      <p className="civil-details-notice">
        {SURVEY_NOTICE}
      </p>

      <section className="civil-details-section">
        <h2>What the service covers</h2>

        <ul>
          {service.includes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="civil-details-section">
        <h2>Work process</h2>

        <ol>
          {service.process.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

      <section className="civil-details-section civil-details-reviews">
        <h2>Reviews</h2>

        <div className="civil-details-reviewSummary">
          <span className="civil-details-reviewStar" aria-hidden="true">
            ★
          </span>

          <strong>{SERVICE_RATING}</strong>

          <span>
            {service.reviews.toLocaleString("en-IN")} reviews
          </span>
        </div>

        <div className="civil-details-ratingBreakdown">
          {ratingBreakdown.map((percent, index) => {
            const stars = 5 - index;

            return (
              <div className="civil-details-ratingRow" key={stars}>
                <span>{stars} ★</span>

                <div className="civil-details-ratingTrack">
                  <span style={{ width: `${percent}%` }} />
                </div>

                <span>{percent}%</span>
              </div>
            );
          })}
        </div>
      </section>

      <footer className="civil-details-footer">
        <strong>{SURVEY_PRICE_LABEL}</strong>

        <button type="button" onClick={handleContinue}>
          {selected ? "Remove" : "Continue"}
        </button>
      </footer>

      <style jsx global>{detailsStyles}</style>
    </main>
  );
}

const detailsStyles = `
  #civil-details {
    box-sizing: border-box;
    width: min(1320px, calc(100% - 32px));
    margin: 0 auto;
    padding: 36px 0 72px;
    color: #171717;
  }

  #civil-details * {
    box-sizing: border-box;
  }

  #civil-details .civil-details-nav {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
  }

  #civil-details .civil-details-nav a,
  #civil-details > a {
    color: #ef1b23;
    font-weight: 700;
    text-decoration: none;
  }

  #civil-details .civil-details-nav span {
    color: #606876;
  }

  #civil-details .civil-details-header {
    margin: 72px 0 32px;
    padding-bottom: 30px;
    border-bottom: 1px solid #eeeeee;
  }

  #civil-details .civil-details-header h1 {
    margin: 0 0 20px;
    font-size: clamp(26px, 3vw, 42px);
    line-height: 1.2;
  }

  #civil-details .civil-details-header p {
    color: #505d6b;
  }

  #civil-details .civil-details-description {
    line-height: 1.7;
  }

  #civil-details .civil-details-notice {
    padding: 14px 18px;
    border: 1px solid #fac5cb;
    border-radius: 12px;
    background: #fff5f6;
  }

  #civil-details .civil-details-section {
    margin-top: 32px;
    line-height: 1.7;
  }

  #civil-details .civil-details-section h2 {
    margin: 0 0 14px;
    font-size: 24px;
  }

  #civil-details .civil-details-section li {
    margin-bottom: 8px;
  }

  #civil-details .civil-details-reviews {
    max-width: 660px;
  }

  #civil-details .civil-details-reviewSummary {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 9px;
    margin-bottom: 16px;
    color: #505d6b;
    font-size: 16px;
  }

  #civil-details .civil-details-reviewSummary strong {
    font-size: 24px;
  }

  #civil-details .civil-details-reviewStar {
    color: #ef1b23;
    font-size: 24px;
  }

  #civil-details .civil-details-ratingBreakdown {
    display: grid;
    gap: 10px;
  }

  #civil-details .civil-details-ratingRow {
    display: grid;
    grid-template-columns: 44px minmax(0, 1fr) 45px;
    align-items: center;
    gap: 12px;
    color: #505d6b;
    font-size: 16px;
  }

  #civil-details .civil-details-ratingTrack {
    height: 6px;
    overflow: hidden;
    background: #dedede;
  }

  #civil-details .civil-details-ratingTrack > span {
    display: block;
    height: 100%;
    background: #ef1b23;
  }

  #civil-details .civil-details-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-top: 40px;
    padding-top: 24px;
    border-top: 1px solid #eeeeee;
  }

  #civil-details .civil-details-footer button {
    padding: 11px 24px;
    border: 0;
    border-radius: 9px;
    background: #ef1b23;
    color: #ffffff;
    font-weight: 700;
    cursor: pointer;
  }

  #civil-details .civil-details-footer button:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  #civil-details .civil-details-footer button:focus-visible,
  #civil-details a:focus-visible {
    outline: 2px solid #ef1b23;
    outline-offset: 3px;
  }

  @media (min-width: 981px) {
    #civil-details {
      padding-left: 192px;
    }
  }

  @media (max-width: 600px) {
    #civil-details {
      width: calc(100% - 24px);
      padding-top: 24px;
    }

    #civil-details .civil-details-nav span {
      display: none;
    }

    #civil-details .civil-details-header {
      margin: 40px 0 24px;
    }
  }
`;