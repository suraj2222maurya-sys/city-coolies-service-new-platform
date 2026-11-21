"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, useSyncExternalStore } from "react";
import {
  getServiceCartServerSnapshot,
  getServiceCartSnapshot,
  parseServiceCartSnapshot,
  removeServiceCartItem,
  subscribeServiceCart,
  upsertServiceCartItem,
} from "@/app/services/serviceCart";

type PlumbingDetailsProps = {
  serviceId: string;
};

type PlumbingOption = {
  id: string;
  title: string;
  price: number;
  unit: string;
};

type PlumbingService = {
  id: string;
  title: string;
  rating: number;
  reviews: number;
  price: number;
  survey?: boolean;
  description: string;
  includes: readonly string[];
  process: readonly string[];
};

const services: readonly PlumbingService[] = [
  {
    id: "new-home-plumbing",
    title: "New Home Plumbing",
    rating: 4.2,
    reviews: 684,
    price: 500,
    survey: true,
    description:
      "New plumbing layouts for apartments, villas, bungalows, houses, schools, buildings and commercial properties.",
    includes: [
      "Water supply and drainage layout assessment",
      "Kitchen, bathroom and utility point planning",
      "Tank, pump and fixture connection review",
      "Materials and final work quotation after site survey",
    ],
    process: [
      "Visit the site and review drawings, existing connections and requirements",
      "Map supply, drainage, tank and fixture locations",
      "Confirm quantities, materials and final rate after the site survey",
      "Install approved piping and fittings, then check for leaks and flow",
    ],
  },
  {
    id: "pipe-work",
    title: "Pipe Work",
    rating: 4.2,
    reviews: 593,
    price: 0,
    description:
      "Choose the CPVC supply or UPVC drainage pipe size and length required for your property.",
    includes: [
      "CPVC supply pipe laying",
      "UPVC drainage pipe installation",
      "Soil and waste pipe work",
      "Joint and leak checks",
    ],
    process: [
      "Inspect the pipe route and measure the required running feet",
      "Confirm pipe grade, fittings, access and materials",
      "Cut and join the selected pipe using the correct system components",
      "Allow joints to cure, then inspect and test the line before closing work",
    ],
  },
  {
    id: "bathroom-plumbing",
    title: "Bathroom Plumbing",
    rating: 4.2,
    reviews: 521,
    price: 500,
    survey: true,
    description:
      "Bathroom water supply, drainage and fixture planning for homes, apartments, commercial premises and industrial facilities.",
    includes: [
      "Water and drain point survey",
      "Existing leakage and pipe-condition review",
      "Fixture and sanitary connection planning",
      "Final work quotation after site survey",
    ],
    process: [
      "Inspect bathroom layout, water points and drain lines",
      "Check pressure, leakage, existing fixtures and access",
      "Agree scope, materials and final rate after site survey",
      "Complete approved pipe and fitting work and test for leaks",
    ],
  },
  {
    id: "plumbing-installation",
    title: "Plumbing Installation",
    rating: 4.2,
    reviews: 476,
    price: 0,
    description:
      "Select individual plumbing fittings and installations for bathrooms, kitchens and utility areas.",
    includes: [
      "Water tank and jet spray fitting",
      "Toilet seat and basin fitting",
      "Flush tank fitting or repair",
      "Shower, washbasin and tap fitting",
    ],
    process: [
      "Inspect the existing connection and chosen fitting",
      "Confirm compatibility, materials and any extra work",
      "Isolate water when needed and complete installation",
      "Restore supply and check flow, drainage and leaks",
    ],
  },
];

const pipeOptions: readonly PlumbingOption[] = [
  {
    id: "cpvc-15-20",
    title: "CPVC Water Supply Pipe Laying - 15/20 mm",
    price: 180,
    unit: "Rft",
  },
  {
    id: "cpvc-25",
    title: "CPVC Water Supply Pipe Laying - 25 mm",
    price: 200,
    unit: "Rft",
  },
  {
    id: "cpvc-32",
    title: "CPVC Water Supply Pipe Laying - 32 mm",
    price: 250,
    unit: "Rft",
  },
  {
    id: "upvc-40-50",
    title: "UPVC Drainage Pipe Installation - 40/50 mm",
    price: 150,
    unit: "Rft",
  },
  {
    id: "upvc-75",
    title: "UPVC Drainage Pipe Installation - 75 mm",
    price: 150,
    unit: "Rft",
  },
  {
    id: "upvc-110",
    title: "UPVC Drainage Pipe Installation - 110 mm",
    price: 200,
    unit: "Rft",
  },
  {
    id: "soil-waste",
    title: "Soil / Waste Pipe Installation",
    price: 250,
    unit: "Rft",
  },
];

const installationOptions: readonly PlumbingOption[] = [
  { id: "water-tank", title: "Water Tank Installation", price: 699, unit: "installation" },
  { id: "jet-spray", title: "Jet Spray Fitting", price: 299, unit: "fitting" },
  { id: "toilet-seat", title: "Toilet Seat Fitting", price: 799, unit: "fitting" },
  { id: "basin", title: "Washbasin Fitting", price: 499, unit: "fitting" },
  { id: "flush-tank", title: "Flush Tank Fitting / Repair", price: 399, unit: "job" },
  { id: "shower", title: "Shower Fitting", price: 299, unit: "fitting" },
  { id: "tap", title: "Tap / Nal Fitting", price: 249, unit: "fitting" },
];

const pagePath = "/services/plumbing-works";
const ratingPercentages = [48, 29, 13, 7, 3];
const formatPrice = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;
const getCartId = (id: string) => `plumbing:${id}`;
const hasOptions = (id: string) => id === "pipe-work" || id === "plumbing-installation";

function getOptions(serviceId: string): readonly PlumbingOption[] {
  if (serviceId === "pipe-work") return pipeOptions;
  if (serviceId === "plumbing-installation") return installationOptions;
  return [];
}

export default function PlumbingWorksDetails({ serviceId }: PlumbingDetailsProps) {
  const router = useRouter();
  const [draftQuantities, setDraftQuantities] = useState<Record<string, number>>({});

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

  if (!service) {
    return (
      <main className="plumbing-details">
        <p>Service not found.</p>
        <Link href={pagePath}>Back to Plumbing Works</Link>
      </main>
    );
  }

  const serviceTitle = service.title;
  const surveyPrice = service.price;
  const serviceHasOptions = hasOptions(serviceId);
  const options = getOptions(serviceId);
  const surveyCartId = getCartId(serviceId);
  const surveySelected = cartItems.some((item) => item.id === surveyCartId);

  function quantityFor(option: PlumbingOption): number {
    const cartId = getCartId(`${serviceId}-${option.id}`);
    const savedPrice = cartItems.find((item) => item.id === cartId)?.price ?? 0;
    const savedQuantity = Math.max(0, Math.round(savedPrice / option.price));
    const draftKey = `${serviceId}:${option.id}`;

    return draftQuantities[draftKey] ?? savedQuantity;
  }

  const total = options.reduce(
    (sum, option) => sum + option.price * quantityFor(option),
    0,
  );

  function updateQuantity(option: PlumbingOption, change: number) {
    const draftKey = `${serviceId}:${option.id}`;
    const currentQuantity = quantityFor(option);

    setDraftQuantities((current) => ({
      ...current,
      [draftKey]: Math.max(0, (current[draftKey] ?? currentQuantity) + change),
    }));
  }

  function continueService() {
    if (serviceHasOptions) {
      for (const option of options) {
        const count = quantityFor(option);
        const cartId = getCartId(`${serviceId}-${option.id}`);

        if (count === 0) {
          if (cartItems.some((item) => item.id === cartId)) {
            removeServiceCartItem(cartId);
          }
          continue;
        }

        const price = option.price * count;

        upsertServiceCartItem({
          id: cartId,
          serviceTitle,
          optionLabel: `${option.title} x ${count} ${option.unit}`,
          price,
          priceLabel: formatPrice(price),
          duration: "Indicative labour rate; materials and additional work confirmed on site",
        });
      }
    } else if (surveySelected) {
      removeServiceCartItem(surveyCartId);
    } else {
      upsertServiceCartItem({
        id: surveyCartId,
        serviceTitle,
        optionLabel: "Site survey",
        price: surveyPrice,
        priceLabel: formatPrice(surveyPrice),
        duration: "Final work rate after site survey",
      });
    }

    window.dispatchEvent(new Event("citycoolies:deep-cleaning-cart-added"));
    router.push(pagePath);
  }

  return (
    <main className="plumbing-details">
      <nav className="plumbing-detailsNav">
        <Link href={pagePath}>← Back to Plumbing Works</Link>
        <span>City Coolies · Plumbing Works</span>
      </nav>

      <header className="plumbing-detailsHeader">
        <h1>{service.title}</h1>
        <p>
          {serviceHasOptions
            ? "Choose plumbing jobs"
            : `Site survey ${formatPrice(surveyPrice)}`}
          {" · "}
          {service.rating.toFixed(2)} ★ · {service.reviews.toLocaleString("en-IN")} reviews
        </p>
      </header>

      <p className="plumbing-detailsDescription">{service.description}</p>
      <p className="plumbing-detailsNotice">
        {service.survey
          ? "The site survey costs ₹500. The final plumbing work rate is confirmed after checking the property, work scope and materials."
          : "Displayed labour rates are indicative. Materials, access work and the final scope are confirmed after the site assessment."}
      </p>

      {serviceHasOptions && (
        <section className="plumbing-detailsSection">
          <h2>Choose your requirements</h2>

          <div className="plumbing-options">
            {options.map((option) => {
              const count = quantityFor(option);

              return (
                <article className="plumbing-option" key={option.id}>
                  <strong>{option.title}</strong>
                  <span>
                    Unit: {option.unit} · {formatPrice(option.price)}
                  </span>

                  <div className="plumbing-quantity">
                    {count > 0 && (
                      <button
                        type="button"
                        aria-label={`Remove one ${option.title}`}
                        onClick={() => updateQuantity(option, -1)}
                      >
                        −
                      </button>
                    )}

                    {count > 0 && <span>{count}</span>}

                    <button
                      type="button"
                      aria-label={`Add one ${option.title}`}
                      onClick={() => updateQuantity(option, 1)}
                    >
                      {count > 0 ? "+" : "Add"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      <section className="plumbing-detailsSection">
        <h2>What the service covers</h2>
        <ul>
          {service.includes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="plumbing-detailsSection">
        <h2>Work process</h2>
        <ol>
          {service.process.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

      <section className="plumbing-detailsSection">
        <h2>Customer ratings</h2>
        <strong>★ {service.rating.toFixed(2)}</strong>{" "}
        <span>({service.reviews.toLocaleString("en-IN")} reviews)</span>

        {[5, 4, 3, 2, 1].map((score, index) => (
          <div className="plumbing-ratingLine" key={score}>
            <span>{score} ★</span>
            <div>
              <i style={{ width: `${ratingPercentages[index]}%` }} />
            </div>
            <span>{ratingPercentages[index]}%</span>
          </div>
        ))}
      </section>

      <footer className="plumbing-detailsFooter">
        <div>
          <small>{serviceHasOptions ? "Selected jobs total" : "Site survey"}</small>
          <strong>{formatPrice(serviceHasOptions ? total : surveyPrice)}</strong>
        </div>

        <button
          type="button"
          disabled={serviceHasOptions && total === 0}
          onClick={continueService}
        >
          {!serviceHasOptions && surveySelected ? "Remove" : "Continue"}
        </button>
      </footer>

      <style jsx global>{`
        .plumbing-details {
          box-sizing: border-box;
          width: min(1320px, calc(100% - 32px));
          min-height: 60vh;
          margin: 0 auto;
          padding: 36px 0 72px;
          color: #171717;
        }

        @media (min-width: 981px) {
          .plumbing-details {
            padding-left: 192px;
          }
        }

        .plumbing-detailsNav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 76px;
        }

        .plumbing-detailsNav a {
          color: #ef1b23;
          font-weight: 700;
          text-decoration: none;
        }

        .plumbing-detailsNav span {
          color: #626e7a;
        }

        .plumbing-detailsHeader {
          padding-bottom: 32px;
          border-bottom: 1px solid #eee;
        }

        .plumbing-detailsHeader h1 {
          margin: 0 0 18px;
          font-size: clamp(28px, 4vw, 40px);
          line-height: 1.22;
        }

        .plumbing-detailsHeader p {
          margin: 0;
          color: #596474;
        }

        .plumbing-detailsDescription {
          margin: 36px 0 12px;
          line-height: 1.6;
        }

        .plumbing-detailsNotice {
          padding: 15px;
          border: 1px solid #fac5cb;
          border-radius: 12px;
          background: #fff5f6;
          line-height: 1.5;
        }

        .plumbing-detailsSection {
          margin-top: 32px;
        }

        .plumbing-detailsSection h2 {
          margin: 0 0 18px;
          font-size: 24px;
        }

        .plumbing-detailsSection li {
          margin: 10px 0;
          line-height: 1.5;
        }

        .plumbing-options {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }

        .plumbing-option {
          display: flex;
          flex-direction: column;
          gap: 9px;
          min-height: 130px;
          padding: 14px;
          border: 1px solid #e0e3e9;
          border-radius: 10px;
        }

        .plumbing-option strong {
          line-height: 1.4;
        }

        .plumbing-option > span {
          font-size: 13px;
          color: #566171;
        }

        .plumbing-quantity {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: auto;
        }

        .plumbing-quantity button {
          min-width: 36px;
          padding: 6px 12px;
          border: 1px solid #ef1b23;
          border-radius: 8px;
          background: #fff;
          color: #ef1b23;
          cursor: pointer;
        }

        .plumbing-quantity button:hover {
          background: #ef1b23;
          color: #fff;
        }

        .plumbing-ratingLine {
          display: grid;
          grid-template-columns: 42px minmax(0, 1fr) 42px;
          align-items: center;
          gap: 10px;
          max-width: 460px;
          margin: 8px 0;
          font-size: 14px;
        }

        .plumbing-ratingLine div {
          height: 5px;
          background: #ddd;
        }

        .plumbing-ratingLine i {
          display: block;
          height: 100%;
          background: #ef1b23;
        }

        .plumbing-detailsFooter {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-top: 36px;
          padding: 18px 0;
          border-top: 1px solid #e6e8ef;
        }

        .plumbing-detailsFooter div {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .plumbing-detailsFooter small {
          color: #69717d;
        }

        .plumbing-detailsFooter button {
          min-width: 110px;
          padding: 12px 20px;
          border: 0;
          border-radius: 10px;
          background: #ef1b23;
          color: white;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
        }

        .plumbing-detailsFooter button:disabled {
          background: #e6e8ec;
          color: #8c929d;
          cursor: not-allowed;
        }

        @media (max-width: 760px) {
          .plumbing-details {
            width: calc(100% - 24px);
            padding: 24px 0 60px;
          }

          .plumbing-detailsNav {
            margin-bottom: 40px;
            font-size: 14px;
          }

          .plumbing-detailsNav span {
            display: none;
          }

          .plumbing-options {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 480px) {
          .plumbing-options {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
