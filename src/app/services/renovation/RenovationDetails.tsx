"use client";

import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";
import {
  getServiceCartServerSnapshot,
  getServiceCartSnapshot,
  parseServiceCartSnapshot,
  removeServiceCartItem,
  subscribeServiceCart,
  upsertServiceCartItem,
} from "@/app/services/serviceCart";

export type RenovationService = {
  id: string;
  title: string;
  reviews: number;
  description: string;
  includes: readonly string[];
  process: readonly string[];
};

const renovationServices: readonly RenovationService[] = [

  {
    id: "full-home-renovation",
    title: "Full Home Renovation",
    reviews: 810,
    description: "A coordinated renovation plan for the rooms and finishes across your home.",
    includes: [
      "Room-by-room scope assessment",
      "Civil, flooring and surface work planning",
      "Kitchen and bathroom upgrade planning",
      "Finishing and handover review",
    ],
    process: [
      "Inspect the property and discuss your goals",
      "Measure rooms and assess existing conditions",
      "Prepare a scope, material plan and final quotation",
      "Schedule and complete approved renovation work",
    ],
  },
  {
    id: "kitchen-renovation",
    title: "Kitchen Renovation",
    reviews: 765,
    description: "Upgrade your kitchen layout, storage, worktops and finishes.",
    includes: [
      "Kitchen measurements and layout review",
      "Cabinet and storage planning",
      "Countertop and backsplash assessment",
      "Plumbing and electrical point review",
    ],
    process: [
      "Inspect the kitchen and take measurements",
      "Discuss layout, storage and finish choices",
      "Confirm the scope and final quotation",
      "Complete approved installation and finishing",
    ],
  },
  {
    id: "bathroom-renovation",
    title: "Bathroom Renovation",
    reviews: 720,
    description: "Refresh bathroom surfaces, fittings and layout to suit your space.",
    includes: [
      "Existing bathroom inspection",
      "Tile and waterproofing assessment",
      "Fixture and plumbing layout review",
      "Finishing and handover checks",
    ],
    process: [
      "Inspect the bathroom and existing fittings",
      "Review waterproofing, plumbing and design needs",
      "Confirm the scope and final quotation",
      "Complete approved renovation and final checks",
    ],
  },
  {
    id: "villa-independent-house-renovation",
    title: "Villa / Independent House Renovation",
    reviews: 645,
    description: "Plan interior and exterior improvements for a villa or independent house.",
    includes: [
      "Property-wide condition survey",
      "Interior and exterior scope planning",
      "Civil and finish assessment",
      "Phased work and access planning",
    ],
    process: [
      "Survey the property and understand priorities",
      "Measure areas and review existing construction",
      "Provide a phased scope and final quotation",
      "Carry out approved work with progress checks",
    ],
  },
  {
    id: "complete-house-electrical-renovation",
    title: "Complete House Electrical Renovation",
    reviews: 695,
    description: "Assess and upgrade household wiring, electrical points and fittings.",
    includes: [
      "Existing wiring and distribution assessment",
      "Switch, socket and lighting point planning",
      "Circuit and load review",
      "Testing plan for approved work",
    ],
    process: [
      "Inspect existing electrical installations",
      "Discuss required points and appliance loads",
      "Confirm the safe work scope and final quotation",
      "Complete approved work and electrical testing",
    ],
  },
  {
    id: "office-renovation",
    title: "Office Renovation",
    reviews: 610,
    description: "Adapt an office layout, finishes and utilities for your business needs.",
    includes: [
      "Workspace and circulation assessment",
      "Partitions and finishes planning",
      "Lighting and electrical review",
      "Work scheduling discussion",
    ],
    process: [
      "Survey the office and operational requirements",
      "Plan layout, materials and work schedule",
      "Confirm the scope and final quotation",
      "Carry out approved work and handover checks",
    ],
  },
  {
    id: "shop-showroom-renovation",
    title: "Shop / Showroom Renovation",
    reviews: 585,
    description: "Refresh retail space, displays, lighting and customer-facing finishes.",
    includes: [
      "Retail layout and display assessment",
      "Flooring and wall finish planning",
      "Lighting and power point review",
      "Access and work schedule planning",
    ],
    process: [
      "Survey the shop and discuss your brand needs",
      "Plan displays, finishes and utilities",
      "Confirm the scope and final quotation",
      "Complete approved work and handover",
    ],
  },
];

const surveyPrice = 500;
const surveyPriceLabel = "₹500";
const ratingDistribution = [47, 30, 13, 6, 4] as const;

function surveyCartId(serviceId: string): string {
  return `renovation:${serviceId}:site-survey`;
}

type RenovationDetailsProps = {
  serviceId: string;
};

export default function RenovationDetails({ serviceId }: RenovationDetailsProps) {
  const service = renovationServices.find((item) => item.id === serviceId);
  const snapshot = useSyncExternalStore(
    subscribeServiceCart,
    getServiceCartSnapshot,
    getServiceCartServerSnapshot,
  );

  const cartItems = useMemo(
    () => parseServiceCartSnapshot(snapshot),
    [snapshot],
  );

  if (!service) {
    return (
      <main className="renovation-details">
        <Link href="/services/renovation">← Back to Renovation</Link>
        <h1>Service not found</h1>
      </main>
    );
  }

  const currentService = service;
  const cartId = surveyCartId(currentService.id);
  const added = cartItems.some((item) => item.id === cartId);

  function toggleSurvey(): void {
    if (added) {
      removeServiceCartItem(cartId);
      return;
    }

    upsertServiceCartItem({
      id: cartId,
      serviceTitle: currentService.title,
      optionLabel: "Site survey",
      price: surveyPrice,
      priceLabel: surveyPriceLabel,
      duration: "Final renovation rate after site survey",
    });

    window.dispatchEvent(new Event("citycoolies:deep-cleaning-cart-added"));
  }

  return (
    <main className="renovation-details">
      <div className="renovation-details-top">
        <Link href="/services/renovation">← Back to Renovation</Link>
        <span>City Coolies · Renovation</span>
      </div>

      <header className="renovation-details-heading">
        <h1>{service.title}</h1>
        <p>Site survey {surveyPriceLabel}</p>
      </header>

      <div className="renovation-details-content">
        <p className="renovation-details-note">
          The site survey costs ₹500. The final renovation rate will be confirmed
          after the survey, based on the property condition, measurements,
          materials and agreed work scope.
        </p>

        <p>{service.description}</p>

        <section>
          <h2>What we assess</h2>
          <ul>
            {service.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>How it works</h2>
          <ol>
            {service.process.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section>
          <h2>
            <span className="renovation-details-star">★</span> 4.1
          </h2>
          <p>{service.reviews.toLocaleString("en-IN")} reviews</p>

          {ratingDistribution.map((percentage, index) => (
            <div className="renovation-details-rating" key={5 - index}>
              <span>{5 - index} ★</span>
              <div>
                <span style={{ width: `${percentage}%` }} />
              </div>
              <span>{percentage}%</span>
            </div>
          ))}
        </section>

        <footer className="renovation-details-footer">
          <strong>Site survey {surveyPriceLabel}</strong>
          <button type="button" onClick={toggleSurvey}>
            {added ? "Remove" : "Continue"}
          </button>
        </footer>
      </div>

      <style jsx>{`
.renovation-details {
  width: min(100% - 40px,1100px);
  margin: 0 auto;
  padding: 34px 0 80px;
  color: #171717;
}

.renovation-details-top {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  color: #596170;
}

.renovation-details-top :global(a) {
  color: #ef1b23;
  text-decoration: none;
  font-weight: 600;
}

.renovation-details-heading {
  margin: 65px 0 30px;
}

.renovation-details-heading h1 {
  max-width: 760px;
  margin: 0 0 12px;
  font-size: clamp(28px,3vw,38px);
  line-height: 1.2;
}

.renovation-details-heading p {
  margin: 0;
  color: #596170;
}

.renovation-details-content {
  border-top: 1px solid #ececec;
  padding-top: 28px;
  font-size: 16px;
  line-height: 1.65;
}

.renovation-details-content>p {
  max-width: 850px;
}

.renovation-details-note {
  padding: 16px;
  border: 1px solid #fac5cb;
  border-radius: 12px;
  background: #fff5f6;
}

.renovation-details-content section {
  margin: 32px 0;
}

.renovation-details-content h2 {
  margin: 0 0 14px;
  font-size: 24px;
}

.renovation-details-content li {
  margin: 10px 0;
}

.renovation-details-star {
  color: #ef1b23;
}

.renovation-details-rating {
  display: grid;
  grid-template-columns: 48px minmax(0,330px) 48px;
  align-items: center;
  gap: 12px;
  margin: 9px 0;
  font-size: 14px;
}

.renovation-details-rating>div {
  height: 6px;
  border-radius: 6px;
  background: #ddd;
  overflow: hidden;
}

.renovation-details-rating>div span {
  display: block;
  height: 100%;
  background: #ef1b23;
}

.renovation-details-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  border-top: 1px solid #ececec;
  padding-top: 24px;
  margin-top: 40px;
}

.renovation-details-footer button {
  border: 0;
  border-radius: 10px;
  background: #ef1b23;
  color: white;
  padding: 13px 30px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
}

@media (max-width:600px) {
  .renovation-details {
    width: calc(100% - 28px);
    padding-top: 22px;
  }

  .renovation-details-top {
    font-size: 13px;
  }

  .renovation-details-heading {
    margin: 42px 0 24px;
  }

  .renovation-details-content h2 {
    font-size: 21px;
  }
}
      `}</style>
    </main>
  );
}
