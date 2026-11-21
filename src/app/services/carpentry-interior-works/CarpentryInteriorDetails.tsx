"use client";

import Link from "next/link";
import { useState } from "react";

import { upsertServiceCartItem } from "@/app/services/serviceCart";

// Service types and data

export type Service = {
  id: string;
  title: string;
  rating: number;
  reviews: number;
  description: string;
  includes: readonly string[];
  process: readonly string[];
};

export const services: readonly Service[] = [
  {
    id: "carpentry",
    title: "Carpentry",
    rating: 4.2,
    reviews: 628,
    description:
      "Furniture, doors and fitted woodwork for homes, offices and commercial spaces. Choose the jobs you want checked in one site survey.",
    includes: [
      "Door, hinge and lock repair",
      "Cupboard, wardrobe and drawer work",
      "Bed, sofa and furniture repair",
      "Shelves, cabinets and modular kitchen woodwork",
    ],
    process: [
      "Choose the jobs that need attention",
      "Inspect dimensions, existing woodwork, damage and fixing points",
      "Confirm materials, finish, scope and final rate after the site survey",
      "Complete approved fabrication, fitting or repair and inspect the result",
    ],
  },
  {
    id: "interior-designing",
    title: "Interior Designing",
    rating: 4.2,
    reviews: 531,
    description:
      "Plan functional interior spaces for homes, apartments, villas, offices and commercial properties.",
    includes: [
      "Site measurements and needs discussion",
      "Room layout and storage planning",
      "Furniture, lighting and finish concepts",
      "Material and execution scope quotation after survey",
    ],
    process: [
      "Visit the site and measure rooms and existing fixtures",
      "Discuss usage, style, storage priorities and budget",
      "Prepare a proposed layout, finishes and work scope",
      "Confirm final design and quotation after the survey, then schedule approved work",
    ],
  },
];

// Carpentry job options

export const jobs = [
  { id: "doors", title: "Doors, Hinges & Locks" },
  { id: "wardrobe", title: "Wardrobes & Cupboards" },
  { id: "furniture", title: "Furniture Repair" },
  { id: "beds", title: "Beds & Storage" },
  { id: "shelves", title: "Shelves & Cabinets" },
  { id: "kitchen", title: "Modular Kitchen Woodwork" },
  { id: "office", title: "Office / Commercial Woodwork" },
  { id: "custom", title: "Custom Carpentry" },
] as const;

// Booking configuration

export const cartId = (id: string): string => `carpentry:${id}`;

const MARKETPLACE_PATH = "/services/carpentry-interior-works";

const SURVEY_PRICE = 500;
const SURVEY_PRICE_LABEL = "₹500";

const SURVEY_DURATION =
  "One site survey. Final work rate confirmed after measurements, materials and approved scope.";

const SURVEY_NOTICE =
  "Choose any number of jobs in this booking: the site survey is ₹500 once. The final work rate is confirmed after inspecting the space, measuring the work and agreeing on materials and scope.";

const ratingDistribution = [48, 29, 13, 7, 3] as const;

type CarpentryInteriorDetailsProps = {
  serviceId: string;
};

// Details component

export default function CarpentryInteriorDetails({
  serviceId,
}: CarpentryInteriorDetailsProps) {
  const [chosenJobs, setChosenJobs] = useState<string[]>([]);

  const service = services.find((item) => item.id === serviceId);
  const isCarpentry = service?.id === "carpentry";

  const canContinue = !isCarpentry || chosenJobs.length > 0;

  function toggleJob(jobId: string) {
    setChosenJobs((current) =>
      current.includes(jobId)
        ? current.filter((id) => id !== jobId)
        : [...current, jobId],
    );
  }

  function handleContinue() {
    if (!service || !canContinue) {
      return;
    }

    const selectedJobTitles = jobs
      .filter((job) => chosenJobs.includes(job.id))
      .map((job) => job.title);

    upsertServiceCartItem({
      id: cartId(service.id),
      serviceTitle: service.title,
      optionLabel: isCarpentry
        ? selectedJobTitles.join(", ")
        : "Interior design site survey",
      price: SURVEY_PRICE,
      priceLabel: SURVEY_PRICE_LABEL,
      duration: SURVEY_DURATION,
    });

    window.dispatchEvent(
      new Event("citycoolies:deep-cleaning-cart-added"),
    );
  }

  if (!service) {
    return (
      <main
        id="carpentry-interior-details"
        className="work-details"
      >
        <Link className="work-back" href={MARKETPLACE_PATH}>
          ← Back to Carpentry &amp; Interior Works
        </Link>

        <h1>Service not found</h1>

        <style jsx global>{detailsStyles}</style>
      </main>
    );
  }

  return (
    <main
      id="carpentry-interior-details"
      className="work-details"
    >
      {/* Back navigation */}

      <Link className="work-back" href={MARKETPLACE_PATH}>
        ← Back to Carpentry &amp; Interior Works
      </Link>

      {/* Service header */}

      <header className="work-header">
        <h1>{service.title}</h1>

        <p className="work-subtitle">
          One site survey {SURVEY_PRICE_LABEL}
        </p>
      </header>

      {/* Carpentry job selection */}

      {isCarpentry && (
        <section className="work-section">
          <h2>Choose the jobs you need</h2>

          <div className="work-options">
            {jobs.map((job) => {
              const selected = chosenJobs.includes(job.id);

              return (
                <div
                  key={job.id}
                  className={`work-option ${
                    selected ? "work-optionSelected" : ""
                  }`}
                >
                  <strong>{job.title}</strong>

                  <small>
                    Included in the one site survey
                  </small>

                  <button
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggleJob(job.id)}
                  >
                    {selected ? "Selected" : "Add"}
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Survey information */}

      <p className="work-notice">
        {SURVEY_NOTICE}
      </p>

      <p className="work-description">
        {service.description}
      </p>

      {/* Included work */}

      <section className="work-section">
        <h2>What the service covers</h2>

        <ul>
          {service.includes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Work process */}

      <section className="work-section">
        <h2>Work process</h2>

        <ol>
          {service.process.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      {/* Customer reviews */}

      <section
        className="work-section work-reviews"
        aria-label="Reviews"
      >
        <h2>Reviews</h2>

        <div className="work-reviewSummary">
          <span
            className="work-reviewStar"
            aria-hidden="true"
          >
            ★
          </span>

          <strong>{service.rating.toFixed(2)}</strong>

          <span>
            {service.reviews.toLocaleString("en-IN")} reviews
          </span>
        </div>

        <div className="work-ratingRows">
          {ratingDistribution.map((percent, index) => {
            const stars = 5 - index;

            return (
              <div className="work-ratingRow" key={stars}>
                <span>{stars} ★</span>

                <div className="work-track">
                  <span style={{ width: `${percent}%` }} />
                </div>

                <span>{percent}%</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Booking action */}

      <footer className="work-footer">
        <span>
          Site survey (once){" "}
          <strong>{SURVEY_PRICE_LABEL}</strong>
        </span>

        <button
          type="button"
          disabled={!canContinue}
          onClick={handleContinue}
        >
          Continue
        </button>
      </footer>

      <style jsx global>{detailsStyles}</style>
    </main>
  );
}

// Component-scoped styles

const detailsStyles = `
  #carpentry-interior-details {
    box-sizing: border-box;
    width: min(1320px, calc(100% - 32px));
    margin: 0 auto;
    padding: 36px 0 72px;
    color: #171717;
  }

  #carpentry-interior-details * {
    box-sizing: border-box;
  }

  /* Navigation and header */

  #carpentry-interior-details .work-back {
    color: #ef1b23;
    font-weight: 700;
    text-decoration: none;
  }

  #carpentry-interior-details h1 {
    max-width: 850px;
    margin: 48px 0 12px;
    font-size: clamp(27px, 3vw, 36px);
  }

  #carpentry-interior-details .work-subtitle {
    color: #596373;
  }

  /* Service content */

  #carpentry-interior-details .work-section {
    margin-top: 32px;
  }

  #carpentry-interior-details h2 {
    margin: 0 0 15px;
    font-size: 24px;
  }

  #carpentry-interior-details li {
    margin: 9px 0;
    line-height: 1.6;
  }

  #carpentry-interior-details .work-description {
    line-height: 1.6;
  }

  #carpentry-interior-details .work-notice {
    max-width: 780px;
    margin-top: 22px;
    padding: 14px;
    border: 1px solid #fac5cb;
    border-radius: 12px;
    background: #fff5f6;
    line-height: 1.6;
  }

  /* Carpentry job selection */

  #carpentry-interior-details .work-options {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
    max-width: 780px;
  }

  #carpentry-interior-details .work-option {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    min-height: 116px;
    padding: 14px;
    border: 1px solid #e0e3e9;
    border-radius: 10px;
    text-align: left;
  }

  #carpentry-interior-details .work-option small {
    color: #616a77;
  }

  #carpentry-interior-details .work-option button {
    margin-top: auto;
    padding: 7px 14px;
    border: 1px solid #ef1b23;
    border-radius: 8px;
    background: #ffffff;
    color: #ef1b23;
    font-weight: 700;
    cursor: pointer;
  }

  #carpentry-interior-details .work-optionSelected {
    border-color: #ef1b23;
    background: #fff8f8;
  }

  /* Reviews */

  #carpentry-interior-details .work-reviewSummary {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    color: #536072;
    font-size: 16px;
  }

  #carpentry-interior-details .work-reviewSummary strong {
    color: #171717;
    font-size: 22px;
  }

  #carpentry-interior-details .work-reviewStar {
    color: #ef1b23;
    font-size: 24px;
  }

  #carpentry-interior-details .work-ratingRows {
    display: grid;
    gap: 10px;
    max-width: 660px;
    margin-top: 18px;
  }

  #carpentry-interior-details .work-ratingRow {
    display: grid;
    grid-template-columns: 44px minmax(0, 1fr) 44px;
    align-items: center;
    gap: 12px;
    color: #556070;
  }

  #carpentry-interior-details .work-track {
    height: 6px;
    overflow: hidden;
    background: #dddddd;
  }

  #carpentry-interior-details .work-track > span {
    display: block;
    height: 100%;
    background: #ef1b23;
  }

  /* Booking footer */

  #carpentry-interior-details .work-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    margin-top: 38px;
    padding: 22px 0;
    border-top: 1px solid #eeeeee;
  }

  #carpentry-interior-details .work-footer button {
    min-width: 125px;
    padding: 12px 18px;
    border: 0;
    border-radius: 10px;
    background: #ef1b23;
    color: #ffffff;
    font-weight: 700;
    cursor: pointer;
  }

  #carpentry-interior-details .work-footer button:disabled {
    background: #f39ba0;
    cursor: not-allowed;
  }

  #carpentry-interior-details button:focus-visible,
  #carpentry-interior-details a:focus-visible {
    outline: 2px solid #ef1b23;
    outline-offset: 3px;
  }

  /* Desktop */

  @media (min-width: 981px) {
    #carpentry-interior-details {
      padding-left: 192px;
    }
  }

  /* Tablet */

  @media (max-width: 760px) {
    #carpentry-interior-details h1 {
      margin-top: 35px;
    }

    #carpentry-interior-details .work-options {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  /* Mobile */

  @media (max-width: 520px) {
    #carpentry-interior-details {
      width: calc(100% - 24px);
    }

    #carpentry-interior-details .work-options {
      grid-template-columns: minmax(0, 1fr);
    }
  }
`;