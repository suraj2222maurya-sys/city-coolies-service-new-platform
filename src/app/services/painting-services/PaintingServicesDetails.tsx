"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import {
  getServiceCartServerSnapshot,
  getServiceCartSnapshot,
  parseServiceCartSnapshot,
  removeServiceCartItem,
  subscribeServiceCart,
  upsertServiceCartItem,
} from "@/app/services/serviceCart";
type Service = {
  id: string;
  title: string;
  rating: number;
  reviews: number;
  description: string;
  includes: readonly string[];
  process: readonly string[];
};

const services: readonly Service[] = [
  {
    id: "full-home-painting",
    title: "Full Home Painting",
    rating: 4.2,
    reviews: 608,
    description:
      "Complete painting plans for homes, apartments, villas, bungalows, schools, colleges, industrial sites and commercial buildings.",
    includes: [
      "Interior and exterior condition check",
      "Measurements, shade and finish planning",
      "Repair, putty and primer requirements",
      "Detailed scope and final painting quote after survey",
    ],
    process: [
      "Visit the property and measure paintable surfaces",
      "Check damp areas, cracks, old coatings and access",
      "Agree surface preparation, paint system and the final quote",
      "Protect nearby areas, prepare surfaces, apply approved coats and inspect the finish",
    ],
  },
  {
    id: "most-popular-painting",
    title: "Most Popular Painting",
    rating: 4.3,
    reviews: 742,
    description:
      "Choose one or several painting jobs. A single site survey covers all selected jobs in this booking.",
    includes: [
      "Interior painting",
      "Wood and metal painting",
      "Gate painting",
      "Terrace waterproof coating",
      "Putty and primer",
      "Texture and design painting",
    ],
    process: [
      "Select all painting jobs needed in the same property",
      "Measure each surface and inspect repairs and moisture",
      "Confirm square foot rates, paint systems, scope and final quotation after the survey",
      "Complete surface preparation, protective coats and finishing checks",
    ],
  },
  {
    id: "marking-safety-painting",
    title: "Marking & Safety Painting",
    rating: 4.2,
    reviews: 386,
    description:
      "Marking for parking spaces, road curbs and yellow and black safety zones. Indicative painting rate: ₹65 per sq ft.",
    includes: [
      "Parking line marking",
      "Road curb painting",
      "Yellow and black safety marking",
      "Surface area and access check",
    ],
    process: [
      "Check the marking layout and measure the area",
      "Clean and prepare the surface and mark out straight lines",
      "Apply the suitable coating and allow the specified drying time",
      "Inspect visibility and finish before reopening the area",
    ],
  },
];

const popularOptions = [
  { id: "interior", title: "Interior Painting" },
  { id: "wood-metal", title: "Wood & Metal Painting" },
  { id: "gate", title: "Gate Painting" },
  { id: "terrace", title: "Terrace Waterproof Painting" },
  { id: "putty-primer", title: "Putty & Primer" },
  { id: "texture", title: "Texture & Design Painting" },
] as const;
const markingOptions = [
  { id: "parking", title: "Parking Line Marking" },
  { id: "curb", title: "Road Curb Painting" },
  { id: "safety", title: "Yellow & Black Safety Painting" },
] as const;

const money = (value: number) => `₹${value.toLocaleString("en-IN")}`;
const cartId = (id: string) => `painting:${id}`;
export default function PaintingServicesDetails({
  serviceId,
}: {
  serviceId: string;
}) {
  const router = useRouter();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);
  const [chosen, setChosen] = useState<string[]>([]);
  const [area, setArea] = useState(1);
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
  if (!service)
    return (
      <main className="details-page">
        <Link href="/services/painting-services">
          ← Back to Painting Services
        </Link>
        <p>Service not found.</p>
      </main>
    );
  const isPopular = service.id === "most-popular-painting";
  const isMarking = service.id === "marking-safety-painting";
  const options = isPopular ? popularOptions : markingOptions;
  const selectedJobs = options.filter((option) => chosen.includes(option.id));
  const total = isMarking ? selectedJobs.length * area * 65 : 500;
  const selected = cartItems.some((item) => item.id === cartId(service.id));
  function proceed() {
    if (!service) return;
    if ((isPopular || isMarking) && !chosen.length) return;
    if (isPopular || isMarking) {
      upsertServiceCartItem({
        id: cartId(service.id),
        serviceTitle: service.title,
        optionLabel: isPopular
          ? `${selectedJobs.map((option) => option.title).join(", ")} · one site survey`
          : `${selectedJobs.map((option) => option.title).join(", ")} · ${area} sq ft each`,
        price: total,
        priceLabel: money(total),
        duration: isPopular
          ? "One ₹500 survey; credited against this service's final payment. Final rate based on measured area and approved scope."
          : "Indicative ₹65 per sq ft per selected job; confirm measured area and scope on site.",
      });
    } else if (selected) removeServiceCartItem(cartId(service.id));
    else
      upsertServiceCartItem({
        id: cartId(service.id),
        serviceTitle: service.title,
        optionLabel: "Site survey",
        price: 500,
        priceLabel: "₹500",
        duration:
          "Final painting price confirmed after site measurements and work assessment",
      });
    window.dispatchEvent(new Event("citycoolies:deep-cleaning-cart-added"));
    router.push("/services/painting-services");
  }
  return (
    <main className="details-page" id="painting-details">
      <nav className="details-nav">
        <Link href="/services/painting-services">
          ← Back to Painting Services
        </Link>
        <span>City Coolies · Painting Services</span>
      </nav>
      <header className="details-header">
        <h1>{service.title}</h1>
        <p>
          {isMarking ? "Indicative ₹65 / sq ft" : "Site survey ₹500"} ·{" "}
          {service.rating.toFixed(2)} ★ ·{" "}
          {service.reviews.toLocaleString("en-IN")} reviews
        </p>
      </header>
      <p className="details-description">{service.description}</p>
      {(isPopular || isMarking) && (
        <section className="details-section">
          <h2>Choose your requirements</h2>
          <div className="details-options">
            {options.map((option) => (
              <article className="details-option" key={option.id}>
                <strong>{option.title}</strong>
                <span>
                  {isPopular ? "Covered by one ₹500 survey" : "₹65 / sq ft"}
                </span>
                <button
                  type="button"
                  aria-pressed={chosen.includes(option.id)}
                  onClick={() =>
                    setChosen((current) =>
                      current.includes(option.id)
                        ? current.filter((id) => id !== option.id)
                        : [...current, option.id],
                    )
                  }
                >
                  {chosen.includes(option.id) ? "Selected" : "Add"}
                </button>
              </article>
            ))}
          </div>
          {isMarking && (
            <label className="details-area">
              Area for each selected job (sq ft)
              <input
                type="number"
                min={1}
                max={100000}
                step={1}
                value={area}
                onChange={(e) =>
                  setArea(
                    Math.max(
                      1,
                      Math.min(100000, Math.floor(Number(e.target.value) || 1)),
                    ),
                  )
                }
              />
            </label>
          )}
        </section>
      )}
      <p className="details-notice">
        {isMarking
          ? "₹65 per sq ft is an indicative rate for each selected job. Final measurements, materials and scope are confirmed on site."
          : isPopular
            ? "Choose one or several jobs: the site survey is ₹500 only once. On full payment for this same service, ₹500 is deducted from the final bill. The final painting rate is confirmed per measured square foot after the survey."
            : "The site survey costs ₹500. The final painting rate is fixed after surface measurements, material selection and the work assessment."}
      </p>
      <section className="details-section">
        <h2>What the service covers</h2>
        <ul>
          {service.includes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section className="details-section">
        <h2>Work process</h2>
        <ol>
          {service.process.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>
      <section className="details-section details-reviews">
        <h2>Reviews</h2>
        <div className="details-reviewSummary">
          <span className="details-reviewStar">★</span>
          <strong>{service.rating.toFixed(2)}</strong>
          <span>{service.reviews.toLocaleString("en-IN")} reviews</span>
        </div>
        <div className="details-ratingBreakdown">
          {[48, 29, 13, 7, 3].map((percent, index) => (
            <div className="details-ratingRow" key={5 - index}>
              <span>{5 - index} ★</span>
              <div className="details-ratingTrack">
                <span style={{ width: `${percent}%` }} />
              </div>
              <span>{percent}%</span>
            </div>
          ))}
        </div>
      </section>
      <footer className="details-footer">
        <strong>{money(total)}</strong>
        <button
          type="button"
          disabled={(isPopular || isMarking) && chosen.length === 0}
          onClick={proceed}
        >
          {selected && !(isPopular || isMarking) ? "Remove" : "Continue"}
        </button>
      </footer>
      <style jsx global>{`
        #painting-details.details-page {
          box-sizing: border-box;
          width: min(1320px, calc(100% - 32px));
          margin: 0 auto;
          padding: 36px 0 72px;
          color: #171717;
        }
        #painting-details.details-page * {
          box-sizing: border-box;
        }
        #painting-details .details-nav {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }
        #painting-details .details-nav a {
          color: #ef1b23;
          font-weight: 700;
          text-decoration: none;
        }
        #painting-details .details-nav span {
          color: #606876;
        }
        #painting-details .details-header {
          margin: 72px 0 32px;
          padding-bottom: 30px;
          border-bottom: 1px solid #eee;
        }
        #painting-details .details-header h1 {
          margin: 0 0 20px;
          font-size: clamp(26px, 3vw, 42px);
          line-height: 1.2;
        }
        #painting-details .details-header p {
          color: #505d6b;
        }
        #painting-details .details-description {
          line-height: 1.7;
        }
        #painting-details .details-notice {
          border: 1px solid #fac5cb;
          border-radius: 12px;
          padding: 14px 18px;
          background: #fff5f6;
        }
        #painting-details .details-section {
          margin-top: 32px;
          line-height: 1.7;
        }
        #painting-details .details-section h2 {
          margin: 0 0 14px;
          font-size: 24px;
        }
        #painting-details .details-section li {
          margin-bottom: 8px;
        }
        #painting-details .details-options {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
          max-width: 750px;
        }
        #painting-details .details-option {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 15px;
          border: 1px solid #e0e3e9;
          border-radius: 10px;
        }
        #painting-details .details-option button {
          align-self: start;
          border: 1px solid #ef1b23;
          background: #fff;
          color: #ef1b23;
          border-radius: 8px;
          padding: 7px 15px;
          cursor: pointer;
        }
        #painting-details .details-option button[aria-pressed="true"] {
          background: #ef1b23;
          color: #fff;
        }
        #painting-details .details-area {
          display: flex;
          flex-direction: column;
          gap: 7px;
          margin-top: 18px;
        }
        #painting-details .details-area input {
          width: 160px;
          border: 1px solid #d6d9e0;
          border-radius: 8px;
          padding: 9px;
        }
        #painting-details .details-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-top: 40px;
          padding-top: 24px;
          border-top: 1px solid #eee;
        }
        #painting-details .details-footer button {
          padding: 11px 24px;
          border: 0;
          border-radius: 9px;
          background: #ef1b23;
          color: #fff;
          font-weight: 700;
          cursor: pointer;
        }
        #painting-details .details-footer button:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }
        #painting-details .details-reviews {
          max-width: 660px;
        }
        #painting-details .details-reviewSummary {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 9px;
          margin-bottom: 16px;
          color: #505d6b;
          font-size: 16px;
        }
        #painting-details .details-reviewSummary strong {
          font-size: 24px;
        }
        #painting-details .details-reviewStar {
          color: #ef1b23;
          font-size: 24px;
        }
        #painting-details .details-ratingBreakdown {
          display: grid;
          gap: 10px;
        }
        #painting-details .details-ratingRow {
          display: grid;
          grid-template-columns: 44px minmax(0, 1fr) 45px;
          align-items: center;
          gap: 12px;
          color: #505d6b;
          font-size: 16px;
        }
        #painting-details .details-ratingTrack {
          height: 6px;
          overflow: hidden;
          background: #dedede;
        }
        #painting-details .details-ratingTrack > span {
          display: block;
          height: 100%;
          background: #ef1b23;
        }
        @media (min-width: 981px) {
          #painting-details.details-page {
            padding-left: 192px;
          }
        }
        @media (max-width: 600px) {
          #painting-details.details-page {
            width: calc(100% - 24px);
            padding-top: 24px;
          }
          #painting-details .details-nav span {
            display: none;
          }
          #painting-details .details-header {
            margin: 40px 0 24px;
          }
          #painting-details .details-options {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
