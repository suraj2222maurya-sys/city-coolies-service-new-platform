"use client";
import { useRouter } from "next/navigation";

import Link from "next/link";

import { useState } from "react";

import { upsertServiceCartItem } from "@/app/services/serviceCart";

export type Job = {
  id: string;
  title: string;
  price: number;
};

export type Service = {
  id: string;
  title: string;
  rating: number;
  reviews: number;
  description: string;
  jobs: readonly Job[];
  process: readonly string[];
};

export const services: readonly Service[] = [
  {
    id: "washing-machine",
    title: "Washing Machine Repair & Installation",
    rating: 4.2,
    reviews: 682,
    description:
      "Inspect a top load or front load washing machine for draining, spinning, leaks, noise or installation needs.",
    jobs: [
      {
        id: "checkup",
        title: "Repair diagnosis / check-up",
        price: 299,
      },
      {
        id: "installation",
        title: "Washing machine installation",
        price: 499,
      },
      {
        id: "drain",
        title: "Drain / inlet connection service",
        price: 349,
      },
    ],
    process: [
      "Confirm appliance type, model and reported fault",
      "Inspect power, water inlet, drain and accessible components",
      "Share the diagnosis and quote any parts or extra labour before repair",
      "Complete approved service and check a test cycle",
    ],
  },
  {
    id: "fridge-cooler",
    title: "Fridge & Cooler Repair",
    rating: 4.2,
    reviews: 614,
    description:
      "Check cooling, power, noise and water leakage issues in a refrigerator or air cooler.",
    jobs: [
      {
        id: "fridge-check",
        title: "Refrigerator check-up",
        price: 299,
      },
      {
        id: "cooler-check",
        title: "Air cooler check-up",
        price: 249,
      },
      {
        id: "cooler-install",
        title: "Air cooler setup / fitting",
        price: 349,
      },
    ],
    process: [
      "Record symptoms and identify the appliance model",
      "Inspect cooling, airflow, electrical and accessible water connections",
      "Explain the fault and obtain approval for parts or specialist work",
      "Complete approved work and verify cooling or airflow",
    ],
  },
  {
    id: "geyser",
    title: "Geyser Installation & Repair",
    rating: 4.2,
    reviews: 541,
    description:
      "Fit a compatible geyser or inspect problems with heating, supply, leakage and controls.",
    jobs: [
      {
        id: "checkup",
        title: "Geyser repair diagnosis",
        price: 299,
      },
      {
        id: "installation",
        title: "Geyser installation",
        price: 599,
      },
      {
        id: "uninstall",
        title: "Geyser uninstallation",
        price: 349,
      },
    ],
    process: [
      "Check model, mounting, water connections and power supply",
      "Inspect the reported issue or confirm installation compatibility",
      "Quote additional parts or mounting work before proceeding",
      "Complete approved work and test safe operation and leaks",
    ],
  },
  {
    id: "tv",
    title: "TV Fitting & Repair",
    rating: 4.2,
    reviews: 489,
    description:
      "TV wall fitting and inspection of display, power, sound or input issues.",
    jobs: [
      {
        id: "wall-fit",
        title: "TV wall fitting",
        price: 499,
      },
      {
        id: "checkup",
        title: "TV repair diagnosis",
        price: 299,
      },
      {
        id: "setup",
        title: "TV setup and connections",
        price: 349,
      },
    ],
    process: [
      "Check TV size, wall material, bracket and power position",
      "Inspect symptoms or confirm safe mounting location",
      "Agree any required bracket, anchors or replacement parts",
      "Fit or repair as approved, then verify stability and picture or sound",
    ],
  },
  {
    id: "chimney",
    title: "Kitchen Chimney Service & Repair",
    rating: 4.2,
    reviews: 573,
    description:
      "Check a kitchen chimney for low suction, motor noise, controls or fitting issues.",
    jobs: [
      {
        id: "checkup",
        title: "Chimney repair diagnosis",
        price: 299,
      },
      {
        id: "installation",
        title: "Chimney installation assessment",
        price: 399,
      },
      {
        id: "basic-service",
        title: "Accessible filter and function service",
        price: 449,
      },
    ],
    process: [
      "Check model, ducting, suction and filter condition",
      "Inspect safe access, motor and controls",
      "Quote any parts, deep cleaning or duct work before starting",
      "Complete approved service and test operation",
    ],
  },
  {
    id: "gas-stove-pipe",
    title: "Gas Stove & Gas Pipe Service",
    rating: 4.2,
    reviews: 526,
    description:
      "Inspect gas stove burners, ignition and approved flexible gas hose connections.",
    jobs: [
      {
        id: "stove-check",
        title: "Gas stove diagnosis",
        price: 299,
      },
      {
        id: "burner-service",
        title: "Burner / ignition service",
        price: 399,
      },
      {
        id: "hose-check",
        title: "Gas hose connection assessment",
        price: 299,
      },
    ],
    process: [
      "Check the stove, hose type and accessible connections",
      "Identify the fault and confirm suitable approved parts",
      "Explain the quote before any replacement or repair",
      "Complete authorized work and check operation and leaks",
    ],
  },
  {
    id: "exhaust-fan",
    title: "Exhaust Fan Repair & Fitting",
    rating: 4.2,
    reviews: 438,
    description:
      "Diagnose or fit a bathroom or kitchen exhaust fan at a suitable existing opening.",
    jobs: [
      {
        id: "checkup",
        title: "Exhaust fan repair diagnosis",
        price: 249,
      },
      {
        id: "installation",
        title: "Exhaust fan fitting",
        price: 399,
      },
      {
        id: "clean-service",
        title: "Fan cleaning and service",
        price: 299,
      },
    ],
    process: [
      "Inspect fan size, mounting opening and electrical point",
      "Assess noise, blade, motor or airflow issue",
      "Confirm additional wiring, parts and labour before work",
      "Complete approved repair or fitting and test airflow",
    ],
  },
];

export const money = (amount: number): string =>
  `₹${amount.toLocaleString("en-IN")}`;

export const cartId = (serviceId: string): string =>
  `appliance:${serviceId}`;

type ApplianceRepairDetailsProps = {
  serviceId: string;
};

const BACK_URL = "/services/appliance-repair";

const RATING_DISTRIBUTION = [48, 29, 13, 7, 3] as const;

const SERVICE_NOTICE =
  "Displayed service charges are indicative. The technician checks the appliance first. Spare parts, gas or refrigerant work, wall brackets and additional labour are quoted separately for approval before work.";

const SERVICE_DURATION =
  "Indicative service charges; spare parts and additional work quoted after diagnosis";

export default function ApplianceRepairDetails({
  serviceId,
}: ApplianceRepairDetailsProps) {
  const router = useRouter();

  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const service = services.find((item) => item.id === serviceId);

  const total =
    service?.jobs.reduce(
      (sum, job) => sum + job.price * (quantities[job.id] ?? 0),
      0,
    ) ?? 0;

  function updateQuantity(jobId: string, change: number) {
    setQuantities((current) => ({
      ...current,
      [jobId]: Math.max(0, (current[jobId] ?? 0) + change),
    }));
  }

  function handleContinue() {
    if (!service || total <= 0) {
      return;
    }

    const selectedJobs = service.jobs.filter(
      (job) => (quantities[job.id] ?? 0) > 0,
    );

    const optionLabel = selectedJobs
      .map((job) => `${job.title} x ${quantities[job.id]}`)
      .join(", ");

    upsertServiceCartItem({
      id: cartId(service.id),
      serviceTitle: service.title,
      optionLabel,
      price: total,
      priceLabel: money(total),
      duration: SERVICE_DURATION,
    });

    window.dispatchEvent(
      new Event("citycoolies:deep-cleaning-cart-added"),
    );

    
  router.push("/services/appliance-repair?showCart=1");
  }

  if (!service) {
    return (
      <main
        id="appliance-repair-details"
        className="work-details"
      >
        <Link className="work-back" href={BACK_URL}>
          ← Back to Appliance Repair
        </Link>

        <h1>Service not found</h1>

        <style jsx global>{`
          #appliance-repair-details {
            width: min(1320px, calc(100% - 32px));
            margin: 0 auto;
            padding: 36px 0 72px;
          }

          #appliance-repair-details .work-back {
            color: #ef1b23;
            font-weight: 700;
            text-decoration: none;
          }
        `}</style>
      </main>
    );
  }

  return (
    <main
      id="appliance-repair-details"
      className="work-details"
    >
      <Link className="work-back" href={BACK_URL}>
        ← Back to Appliance Repair
      </Link>

      <header className="work-header">
        <h1>{service.title}</h1>
        <p className="work-subtitle">
          Choose the jobs you need
        </p>
      </header>

      <section className="work-section">
        <h2>Choose your requirements</h2>

        <div className="work-options">
          {service.jobs.map((job) => {
            const quantity = quantities[job.id] ?? 0;

            return (
              <div className="work-option" key={job.id}>
                <strong>{job.title}</strong>

                <span className="work-jobPrice">
                  {money(job.price)} per job
                </span>

                <div className="work-count">
                  {quantity > 0 && (
                    <>
                      <button
                        type="button"
                        aria-label={`Remove one ${job.title}`}
                        onClick={() => updateQuantity(job.id, -1)}
                      >
                        −
                      </button>

                      <span>{quantity}</span>
                    </>
                  )}

                  <button
                    type="button"
                    aria-label={`Add one ${job.title}`}
                    onClick={() => updateQuantity(job.id, 1)}
                  >
                    {quantity > 0 ? "+" : "Add"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <p className="work-notice">
        {SERVICE_NOTICE}
      </p>

      <p className="work-description">
        {service.description}
      </p>

      <section className="work-section">
        <h2>Work process</h2>

        <ol>
          {service.process.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section
        className="work-section"
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
          {RATING_DISTRIBUTION.map((percent, index) => {
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

      <footer className={`work-footer${total > 0 ? " work-footerActive" : ""}`}>
        <span>
          Selected jobs total{" "}
          <strong>{money(total)}</strong>
        </span>

        <button
          type="button"
          disabled={total <= 0}
          onClick={handleContinue}
        >
          Continue
        </button>
      </footer>

      <style jsx global>{`
        #appliance-repair-details {
          box-sizing: border-box;
          width: min(1320px, calc(100% - 32px));
          margin: 0 auto;
          padding: 36px 0 72px;
          color: #171717;
        }

        #appliance-repair-details * {
          box-sizing: border-box;
        }

        #appliance-repair-details .work-back {
          color: #ef1b23;
          font-weight: 700;
          text-decoration: none;
        }

        #appliance-repair-details h1 {
          max-width: 850px;
          margin: 48px 0 12px;
          font-size: clamp(27px, 3vw, 36px);
        }

        #appliance-repair-details .work-subtitle {
          color: #596373;
        }

        #appliance-repair-details .work-section {
          margin-top: 32px;
        }

        #appliance-repair-details h2 {
          margin: 0 0 15px;
          font-size: 24px;
        }

        #appliance-repair-details li {
          margin: 9px 0;
          line-height: 1.6;
        }

        #appliance-repair-details .work-description {
          line-height: 1.6;
        }

        #appliance-repair-details .work-notice {
          max-width: 780px;
          margin-top: 22px;
          padding: 14px;
          border: 1px solid #fac5cb;
          border-radius: 12px;
          background: #fff5f6;
          line-height: 1.6;
        }

        #appliance-repair-details .work-options {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
          max-width: 780px;
        }

        #appliance-repair-details .work-option {
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

        #appliance-repair-details .work-jobPrice {
          color: #616a77;
        }

        #appliance-repair-details .work-option button {
          margin-top: auto;
          padding: 7px 14px;
          border: 1px solid #ef1b23;
          border-radius: 8px;
          background: #fff;
          color: #ef1b23;
          font-weight: 700;
          cursor: pointer;
        }

        #appliance-repair-details .work-count {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: auto;
        }

        #appliance-repair-details .work-count button {
          margin-top: 0;
        }

        #appliance-repair-details .work-reviewSummary {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          color: #536072;
          font-size: 16px;
        }

        #appliance-repair-details .work-reviewSummary strong {
          color: #171717;
          font-size: 22px;
        }

        #appliance-repair-details .work-reviewStar {
          color: #ef1b23;
          font-size: 24px;
        }

        #appliance-repair-details .work-ratingRows {
          display: grid;
          gap: 10px;
          max-width: 660px;
          margin-top: 18px;
        }

        #appliance-repair-details .work-ratingRow {
          display: grid;
          grid-template-columns: 44px minmax(0, 1fr) 44px;
          align-items: center;
          gap: 12px;
          color: #556070;
        }

        #appliance-repair-details .work-track {
          height: 6px;
          overflow: hidden;
          background: #dddddd;
        }

        #appliance-repair-details .work-track > span {
          display: block;
          height: 100%;
          background: #ef1b23;
        }

        #appliance-repair-details .work-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-top: 38px;
          padding: 22px 0;
          border-top: 1px solid #eeeeee;
        }

        #appliance-repair-details .work-footerActive {
          position: fixed;
          z-index: 100;
          left: 50%;
          bottom: 16px;
          transform: translateX(-50%);
          width: min(920px, calc(100% - 32px));
          margin: 0;
          padding: 14px 18px;
          border: 1px solid #f3cbd0;
          border-radius: 14px;
          background: #ffffff;
          box-shadow: 0 8px 30px #0000001a;
        }

        #appliance-repair-details .work-footer button {
          min-width: 125px;
          padding: 12px 18px;
          border: 0;
          border-radius: 10px;
          background: #ef1b23;
          color: #ffffff;
          font-weight: 700;
          cursor: pointer;
        }

        #appliance-repair-details .work-footer button:disabled {
          background: #f39ba0;
          cursor: not-allowed;
        }

        #appliance-repair-details button:focus-visible,
        #appliance-repair-details a:focus-visible {
          outline: 2px solid #ef1b23;
          outline-offset: 3px;
        }

        @media (min-width: 981px) {
          #appliance-repair-details {
            padding-left: 192px;
          }
        }

        @media (max-width: 760px) {
          #appliance-repair-details h1 {
            margin-top: 35px;
          }

          #appliance-repair-details .work-options {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 520px) {
          #appliance-repair-details .work-footerActive {
            bottom: 10px;
            width: calc(100% - 20px);
            gap: 10px;
            padding: 10px 12px;
          }

          #appliance-repair-details .work-footerActive button {
            min-width: 100px;
            padding: 11px 14px;
          }

          #appliance-repair-details {
            width: calc(100% - 24px);
          }

          #appliance-repair-details .work-options {
            grid-template-columns: minmax(0, 1fr);
          }
        }
      `}</style>
    </main>
  );
}