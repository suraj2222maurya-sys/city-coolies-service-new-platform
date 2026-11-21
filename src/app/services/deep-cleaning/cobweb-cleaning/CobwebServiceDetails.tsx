"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { upsertServiceCartItem } from "@/app/services/serviceCart";

type Option = { id: string; label: string; price: number };
type Step = { title: string; description: string };
type Service = {
  id: string;
  title: string;
  rating: number;
  reviews: number;
  options: readonly Option[];
  pricingTitle?: string;
  process: readonly Step[];
  included?: readonly string[];
  excluded?: readonly string[];
  perfectFor?: readonly string[];
  distribution: readonly number[];
  directAdd?: boolean;
};

const CATEGORY = "cobweb-cleaning";
const RETURN_URL = `/services/deep-cleaning?category=${CATEGORY}`;
const money = (value: number) => `₹${value.toLocaleString("en-IN")}`;

const SERVICES: readonly Service[] = [
  {
    id: "home-cobweb-cleaning",
    title: "Home Cobweb Cleaning",
    rating: 4.4,
    reviews: 810,
    directAdd: true,
    options: [{ id: "site-survey", label: "Site survey", price: 500 }],
    process: [
      { title: "Book the site survey", description: "Book a home cobweb cleaning assessment for ₹500." },
      { title: "Inspect accessible areas", description: "Check ceiling corners, wall edges, balconies and reachable fixtures." },
      { title: "Confirm the final rate", description: "The work scope and final cleaning rate are confirmed after the survey." },
      { title: "Schedule cleaning", description: "Arrange the approved cleaning and review access needs." },
    ],
    included: [
      "On-site assessment of reachable cobweb areas",
      "Review of ceilings, corners and accessible exterior edges",
      "Cleaning scope and final rate discussion after the survey",
    ],
    excluded: [
      "The site survey charge does not include cleaning",
      "Repairs, pest control and inaccessible high-area work",
    ],
    distribution: [60, 27, 8, 3, 2],
  },
  {
    id: "industrial-cobweb-cleaning",
    title: "Industrial Cobweb Cleaning",
    rating: 4.4,
    reviews: 740,
    directAdd: true,
    options: [{ id: "site-survey", label: "Site survey", price: 500 }],
    process: [
      { title: "Book the site survey", description: "Book an industrial cobweb cleaning assessment for ₹500." },
      { title: "Review the facility", description: "Inspect accessible beams, corners, storage zones and working areas." },
      { title: "Plan safe access", description: "Confirm height, equipment access and operating restrictions with the site team." },
      { title: "Confirm the final rate", description: "Set the cleaning scope and final service rate after the survey." },
    ],
    included: [
      "Industrial site and access assessment",
      "Review of reachable cobweb accumulation areas",
      "Cleaning scope and final rate discussion after the survey",
    ],
    excluded: [
      "The site survey charge does not include cleaning",
      "Machinery dismantling, electrical work and unapproved height work",
    ],
    distribution: [60, 27, 8, 3, 2],
  },
  {
    id: "building-cobweb-cleaning",
    title: "Building Cobweb Cleaning",
    rating: 4.4,
    reviews: 690,
    directAdd: true,
    options: [{ id: "site-survey", label: "Site survey", price: 500 }],
    process: [
      { title: "Book the site survey", description: "Book a building cobweb cleaning assessment for ₹500." },
      { title: "Inspect common areas", description: "Check corridors, stairwells, entrances and accessible ceiling edges." },
      { title: "Review access needs", description: "Identify height restrictions and areas requiring building permission." },
      { title: "Confirm the final rate", description: "Confirm the cleaning scope and final rate after the survey." },
    ],
    included: [
      "Building common-area assessment",
      "Review of reachable corners and ceiling edges",
      "Cleaning scope and final rate discussion after the survey",
    ],
    excluded: [
      "The site survey charge does not include cleaning",
      "Facade work, repairs and inaccessible areas unless separately agreed",
    ],
    distribution: [60, 27, 8, 3, 2],
  },
  {
    id: "commercial-cobweb-cleaning",
    title: "Commercial Cobweb Cleaning",
    rating: 4.4,
    reviews: 780,
    directAdd: true,
    options: [{ id: "site-survey", label: "Site survey", price: 500 }],
    process: [
      { title: "Book the site survey", description: "Book a commercial cobweb cleaning assessment for ₹500." },
      { title: "Inspect the premises", description: "Review accessible ceiling corners, display edges, storage areas and common spaces." },
      { title: "Agree on the work plan", description: "Confirm access, business hours and areas to be cleaned." },
      { title: "Confirm the final rate", description: "Set the cleaning scope and final service rate after the survey." },
    ],
    included: [
      "Commercial premises assessment",
      "Review of accessible cobweb areas",
      "Cleaning scope and final rate discussion after the survey",
    ],
    excluded: [
      "The site survey charge does not include cleaning",
      "Repairs, pest control and restricted areas without permission",
    ],
    distribution: [60, 27, 8, 3, 2],
  },
];

export default function CobwebServiceDetails({ serviceId }: { serviceId: string }) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const service = SERVICES.find((item) => item.id === serviceId);

  if (!service) {
    return (
      <main className="cc-cobweb-details">
        <Link href={RETURN_URL}>← Back to Cobweb Cleaning</Link>
        <h1>Service not found</h1>
      </main>
    );
  }

  const selectedOption = service.options.find((option) => option.id === selectedId);
  const activeOption = service.directAdd ? service.options[0] : selectedOption;

  function addToCart(option: Option) {
    if (!service) return;
    upsertServiceCartItem({
      id: `cobweb:${service.id}:${option.id}`,
      serviceTitle: service.title,
      optionLabel: option.label,
      price: option.price,
      priceLabel: money(option.price),
      duration: "Professional cleaning service",
    });
    router.push(RETURN_URL);
  }

  return (
    <main className="cc-cobweb-details">
      <div className="cc-cobweb-details-inner">
        <header className="cc-cobweb-details-header">
          <Link href={RETURN_URL} className="cc-cobweb-details-back">
            ← Back to Cobweb Cleaning
          </Link>
          <h1>{service.title}</h1>
          <p>
            {service.directAdd
              ? `Site survey: ${money(service.options[0].price)}. Final cleaning rate is confirmed after the survey.`
              : "Choose the option that matches your cleaning requirement."}
          </p>
        </header>

        {!service.directAdd && (
          <section className="cc-cobweb-details-section">
            <h2>{service.pricingTitle ?? "Choose your service"}</h2>
            <div className="cc-cobweb-details-pricing">
              {service.options.map((option) => (
                <article key={option.id} className="cc-cobweb-details-option">
                  <span>{option.label}</span>
                  <strong>{money(option.price)}</strong>
                  <button
                    type="button"
                    aria-pressed={selectedId === option.id}
                    onClick={() => setSelectedId((current) => current === option.id ? null : option.id)}
                  >
                    {selectedId === option.id ? "Selected" : "Select"}
                  </button>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="cc-cobweb-details-section">
          <h2>How it works?</h2>
          <ol className="cc-cobweb-details-process">
            {service.process.map((step, index) => (
              <li key={`${index}-${step.title}`}>
                <span>{index + 1}.</span>
                <div><strong>{step.title}</strong><p>{step.description}</p></div>
              </li>
            ))}
          </ol>
        </section>

        {([
          ["Included", service.included],
          ["Not Included", service.excluded],
          ["Perfect For", service.perfectFor],
        ] as const).map(([heading, items]) =>
          items?.length ? (
            <section className="cc-cobweb-details-section" key={heading}>
              <h2>{heading}</h2>
              <ul className="cc-cobweb-details-list">
                {items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
          ) : null
        )}

        <section className="cc-cobweb-details-section" aria-label={`${service.title} customer rating`}>
          <h2>Customer reviews</h2>
          <div className="cc-cobweb-details-rating">
            <span aria-hidden="true">★</span>
            <strong>{service.rating.toFixed(1)}</strong>
          </div>
          <p>{service.reviews.toLocaleString("en-IN")} reviews</p>
          <div className="cc-cobweb-details-rating-bars">
            {service.distribution.map((percentage, index) => (
              <div className="cc-cobweb-details-rating-row" key={5 - index}>
                <span>{5 - index} ★</span>
                <div className="cc-cobweb-details-rating-track">
                  <span style={{ width: `${percentage}%` }} />
                </div>
                <span>{percentage}%</span>
              </div>
            ))}
          </div>
        </section>

        <footer className="cc-cobweb-details-footer">
          <div>
            <span>{service.directAdd ? "Site survey" : "Total"}</span>
            <strong>{activeOption ? money(activeOption.price) : "Select an option"}</strong>
          </div>
          <button type="button" disabled={!activeOption} onClick={() => activeOption && addToCart(activeOption)}>
            Continue
          </button>
        </footer>
      </div>
      <style jsx global>{`.cc-cobweb-details {
  min-height: 100vh;
  background: #fff;
  color: #171717;
}
.cc-cobweb-details * {
  box-sizing: border-box;
}
.cc-cobweb-details-inner {
  width: min(1016px, calc(100% - 64px));
  margin: auto;
  padding: 28px 0 90px;
}
.cc-cobweb-details-header {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 32px;
  border-bottom: 1px solid #ececec;
}
.cc-cobweb-details-back {
  align-self: flex-start;
  margin-bottom: 32px;
  color: #ef1b23;
  font-size: 17px;
  font-weight: 700;
  text-decoration: none;
}
.cc-cobweb-details-header h1 {
  margin: 0;
  font-size: clamp(28px, 3vw, 40px);
  line-height: 1.2;
}
.cc-cobweb-details-header p {
  margin: 0;
  color: #626262;
  line-height: 1.5;
}
.cc-cobweb-details-section {
  margin-top: 32px;
  padding-top: 28px;
  border-top: 1px solid #e9eaec;
}
.cc-cobweb-details-section h2 {
  margin: 0 0 20px;
  color: #5c6678;
  font-size: 20px;
}
.cc-cobweb-details-pricing {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}
.cc-cobweb-details-option {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  min-height: 140px;
  padding: 16px;
  border: 1px solid #dfe2e7;
  border-radius: 10px;
}
.cc-cobweb-details-option strong {
  color: #525d6f;
}
.cc-cobweb-details-option button {
  margin-top: auto;
  padding: 9px 17px;
  border: 1px solid #ef1b23;
  border-radius: 9px;
  background: #fff;
  color: #ef1b23;
  font-weight: 700;
  cursor: pointer;
}
.cc-cobweb-details-option button[aria-pressed="true"] {
  background: #ef1b23;
  color: #fff;
}
.cc-cobweb-details-process {
  display: grid;
  gap: 18px;
  padding: 0;
  list-style: none;
}
.cc-cobweb-details-process li {
  display: grid;
  grid-template-columns: 30px minmax(0, 1fr);
  gap: 8px;
}
.cc-cobweb-details-process li > span {
  color: #7b8495;
}
.cc-cobweb-details-process strong {
  color: #606a7c;
}
.cc-cobweb-details-process p {
  margin: 5px 0 0;
  color: #7b8598;
  line-height: 1.55;
}
.cc-cobweb-details-list {
  display: grid;
  gap: 12px;
  padding-left: 24px;
  color: #697387;
}
.cc-cobweb-details-rating {
  display: flex;
  align-items: center;
  gap: 10px;
}
.cc-cobweb-details-rating span {
  color: #f6b900;
  font-size: 28px;
}
.cc-cobweb-details-rating strong {
  color: #586171;
  font-size: 34px;
}
.cc-cobweb-details-rating-bars {
  display: grid;
  gap: 12px;
  max-width: 450px;
}
.cc-cobweb-details-rating-row {
  display: grid;
  grid-template-columns: 45px minmax(0, 1fr) 45px;
  gap: 10px;
  align-items: center;
  color: #596273;
  font-size: 14px;
}
.cc-cobweb-details-rating-row > span:last-child {
  text-align: right;
}
.cc-cobweb-details-rating-track {
  height: 6px;
  overflow: hidden;
  border-radius: 999px;
  background: #d4d4d4;
}
.cc-cobweb-details-rating-track span {
  display: block;
  height: 100%;
  background: #ef1b23;
}
.cc-cobweb-details-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-top: 36px;
  padding: 20px 0;
  border-top: 1px solid #eee;
}
.cc-cobweb-details-footer > div {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.cc-cobweb-details-footer > div > span {
  color: #737373;
  font-size: 13px;
}
.cc-cobweb-details-footer button {
  min-width: 118px;
  min-height: 42px;
  padding: 8px 16px;
  border: 1px solid #ef1b23;
  border-radius: 10px;
  background: #ef1b23;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
}
.cc-cobweb-details-footer button:disabled {
  border-color: #e3e3e3;
  background: #f2f3f5;
  color: #999;
  cursor: not-allowed;
}
        @media (max-width: 700px) {
.cc-cobweb-details-inner {
  width: calc(100% - 32px);
  padding: 20px 0 64px;
}
.cc-cobweb-details-pricing {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.cc-cobweb-details-back {
  margin-bottom: 16px;
}
        }
        @media (max-width: 420px) {
.cc-cobweb-details-pricing {
  grid-template-columns: 1fr;
} }
      `}</style>
    </main>
  );
}
