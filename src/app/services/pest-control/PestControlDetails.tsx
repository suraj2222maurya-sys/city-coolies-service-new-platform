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

interface PestDetailService {
  id: string;
  title: string;
  price: number;
  label: string;
  description: string;
  includes: readonly string[];
  process: readonly string[];
}

type PestControlDetailsProps = {
  serviceId: string;
};

const services: readonly PestDetailService[] = [
  {
    id: "full-home-pest-control",
    title: "Full Home Pest Control",
    price: 500,
    label: "Site survey",
    description: "A property-wide inspection for the pests present in rooms, kitchen, bathrooms and outdoor access points. The treatment and final quote are chosen after the visit.",
    includes: [
      "Inspect active pest areas and entry points",
      "Review room count, property size and infestation",
      "Plan pest-specific treatment and follow-up",
    ],
    process: [
      "Inspect rooms, kitchens, bathrooms and likely entry points",
      "Identify the pests and assess infestation and safety needs",
      "Agree treatment, visits and final price after survey",
      "Apply approved treatment and explain re-entry and prevention steps",
    ],
  },
  {
    id: "cockroach-control",
    title: "Cockroach Control",
    price: 999,
    label: "Starting treatment price",
    description: "Targeted cockroach treatment for a kitchen and bathroom. The shown amount is an indicative starting price; area, preparation and repeat visits are confirmed before work.",
    includes: [
      "Inspect hiding spots and activity",
      "Discuss utensil removal and preparation",
      "Targeted application and follow-up plan",
    ],
    process: [
      "Check kitchen, bathroom and hiding areas",
      "Ask the customer to clear utensils and keep children and pets away from treatment",
      "Apply the agreed treatment following product instructions",
      "Explain drying time and whether a second visit is needed",
    ],
  },
  {
    id: "apartment-pest-control",
    title: "Apartment Pest Control",
    price: 1549,
    label: "Starting treatment price",
    description: "Apartment pest treatment starting with cockroach and ant-prone areas. Other pests or larger scopes require a revised quote after inspection.",
    includes: [
      "Inspect kitchen, bathrooms and affected rooms",
      "Choose targeted treatment for confirmed pests",
      "Discuss revisit and prevention needs",
    ],
    process: [
      "Inspect the apartment and confirm the pest type",
      "Agree access, treatment scope and the final quote",
      "Apply targeted treatment under product guidance",
      "Explain safe re-entry, follow-up and prevention",
    ],
  },
  {
    id: "termite-control",
    title: "Termite Control",
    price: 500,
    label: "Site survey",
    description: "Inspect termite signs in timber, walls and adjoining ground before proposing the appropriate treatment. The treatment rate is confirmed after the survey.",
    includes: [
      "Identify visible termite signs",
      "Assess affected timber and structures",
      "Propose property-specific treatment scope",
    ],
    process: [
      "Inspect damaged areas and possible entry points",
      "Map infestation and assess access and building type",
      "Confirm appropriate method, safety measures and final price",
      "Carry out approved treatment and schedule monitoring where needed",
    ],
  },
  {
    id: "bed-bug-control",
    title: "Bed Bug Control",
    price: 500,
    label: "Site survey",
    description: "Inspect sleeping areas and furniture for bed bugs; confirm preparation, rooms and treatment visits before giving the final price.",
    includes: [
      "Inspect mattresses, bed frames and furniture seams",
      "Assess affected rooms and preparation needs",
      "Plan treatment and repeat inspection",
    ],
    process: [
      "Inspect suspected harbourage and confirm activity",
      "Explain laundry, access and occupant preparation",
      "Confirm treatment plan, visits and final quote",
      "Treat agreed areas and explain follow-up checks",
    ],
  },
  {
    id: "rodent-control",
    title: "Rodent Control",
    price: 500,
    label: "Site survey",
    description: "Inspection for rats and mice across homes, shops and storage spaces, with a plan for entry-point control and monitoring.",
    includes: [
      "Look for droppings and entry points",
      "Review food and waste storage",
      "Plan traps or other suitable control and monitoring",
    ],
    process: [
      "Inspect activity, access routes and likely nesting areas",
      "Assess food sources and safe placement options",
      "Agree exclusion, control plan and final quote",
      "Install approved controls and arrange follow-up monitoring",
    ],
  },
  {
    id: "commercial-pest-control",
    title: "Commercial Pest Control",
    price: 500,
    label: "Site survey",
    description: "Site-specific pest management for offices, shops, kitchens, warehouses and other commercial spaces. Final scope and price follow inspection.",
    includes: [
      "Inspect site and operational constraints",
      "Identify pests, hygiene risks and entry points",
      "Plan treatment, monitoring and service frequency",
    ],
    process: [
      "Survey premises and document pest activity",
      "Review access, food areas, staff and operating hours",
      "Agree the treatment programme and final quotation",
      "Treat approved zones and document follow-up and prevention",
    ],
  },
];

const ratingDistribution = [48, 29, 13, 7, 3] as const;
const cartId = (serviceId: string) => `pest:${serviceId}`;
const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;

export default function PestControlDetails({ serviceId }: PestControlDetailsProps) {
  const service = services.find((item) => item.id === serviceId);
  const snapshot = useSyncExternalStore(
    subscribeServiceCart,
    getServiceCartSnapshot,
    getServiceCartServerSnapshot,
  );
  const cartItems = useMemo(() => parseServiceCartSnapshot(snapshot), [snapshot]);

  if (!service) {
    return (
      <main id="city-coolies-pest-details" className="details">
        <Link href="/services/pest-control">← Back to Pest Control</Link>
        <h1>Service not found</h1>
      </main>
    );
  }

  const isSelected = cartItems.some((item) => item.id === cartId(service.id));
  const currentService = service;

  function toggleService() {
    const id = cartId(currentService.id);

    if (isSelected) {
      removeServiceCartItem(id);
      return;
    }

    upsertServiceCartItem({
      id,
      serviceTitle: currentService.title,
      optionLabel: currentService.label,
      price: currentService.price,
      priceLabel: formatPrice(currentService.price),
      duration:
        currentService.label === "Site survey"
          ? "Treatment price confirmed after the site survey"
          : "Starting price; final treatment scope confirmed before work",
    });
    window.dispatchEvent(new Event("citycoolies:deep-cleaning-cart-added"));
  }

  const notice =
    service.label === "Site survey"
      ? `The site survey costs ${formatPrice(service.price)}. The final treatment rate is confirmed after inspection, based on the pest, affected area and agreed treatment.`
      : `Indicative starting rate ${formatPrice(service.price)}. The final scope and price are confirmed before treatment based on area and infestation.`;

  return (
    <main id="city-coolies-pest-details" className="details">
      <div className="top">
        <Link href="/services/pest-control">← Back to Pest Control</Link>
        <span>City Coolies · Pest Control</span>
      </div>

      <h1>{service.title}</h1>
      <p className="notice">{notice}</p>
      <p>{service.description}</p>

      <section>
        <h2>What the service covers</h2>
        <ul>
          {service.includes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Work process</h2>
        <ol>
          {service.process.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="reviews">
        <h2>Reviews</h2>
        <div className="reviewHeading">
          <span className="redStar" aria-hidden="true">★</span>
          <strong>4.20</strong>
          <span>Sample rating · verified customer reviews pending</span>
        </div>
        {ratingDistribution.map((percent, index) => (
          <div className="ratingRow" key={5 - index}>
            <span>{5 - index} ★</span>
            <div className="ratingTrack">
              <span className="ratingFill" style={{ width: `${percent}%` }} />
            </div>
            <span>{percent}%</span>
          </div>
        ))}
      </section>

      <div className="summary">
        <strong>
          {service.label} {formatPrice(service.price)}
        </strong>
        <button type="button" onClick={toggleService}>
          {isSelected ? "Remove" : "Continue"}
        </button>
      </div>

      <style jsx global>{`
        #city-coolies-pest-details {
          box-sizing: border-box;
          width: min(1320px, calc(100% - 32px));
          margin: 0 auto;
          padding: 36px 0 72px;
          color: #171717;
        }

        #city-coolies-pest-details .top {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 40px;
        }

        #city-coolies-pest-details .top a {
          color: #ef1b23;
          font-weight: 700;
          text-decoration: none;
        }

        #city-coolies-pest-details h1 {
          font-size: clamp(28px, 3vw, 38px);
          margin: 0 0 18px;
        }

        #city-coolies-pest-details h2 {
          font-size: 24px;
          margin: 0 0 16px;
        }

        #city-coolies-pest-details .notice {
          padding: 15px;
          border: 1px solid #fac5cb;
          border-radius: 12px;
          background: #fff5f6;
          line-height: 1.5;
        }

        #city-coolies-pest-details section {
          margin: 28px 0;
        }

        #city-coolies-pest-details li {
          margin: 10px 0;
          line-height: 1.5;
        }

        #city-coolies-pest-details ul,
        #city-coolies-pest-details ol {
          padding-left: 22px;
        }

        #city-coolies-pest-details p {
          line-height: 1.6;
        }

        #city-coolies-pest-details .summary {
          border-top: 1px solid #e6e8ef;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 24px 0;
          margin-top: 30px;
        }

        #city-coolies-pest-details .summary button {
          border: 0;
          border-radius: 10px;
          background: #ef1b23;
          color: #fff;
          font-weight: 700;
          font-size: 16px;
          padding: 12px 24px;
          cursor: pointer;
        }

        #city-coolies-pest-details .reviews {
          max-width: 660px;
        }

        #city-coolies-pest-details .reviewHeading {
          display: flex;
          align-items: center;
          gap: 9px;
          color: #555f6c;
          margin-bottom: 18px;
        }

        #city-coolies-pest-details .reviewHeading strong {
          font-size: 24px;
        }

        #city-coolies-pest-details .redStar {
          color: #ef1b23;
          font-size: 24px;
        }

        #city-coolies-pest-details .ratingRow {
          display: grid;
          grid-template-columns: 44px minmax(0, 1fr) 44px;
          align-items: center;
          gap: 10px;
          margin: 10px 0;
          color: #555f6c;
        }

        #city-coolies-pest-details .ratingTrack {
          height: 6px;
          background: #ddd;
        }

        #city-coolies-pest-details .ratingFill {
          height: 100%;
          background: #ef1b23;
          display: block;
        }

        @media (min-width: 981px) {
          #city-coolies-pest-details {
            padding-left: 192px;
          }
        }

        @media (max-width: 600px) {
          #city-coolies-pest-details {
            width: calc(100% - 28px);
            padding-top: 22px;
          }

          #city-coolies-pest-details .summary {
            align-items: flex-start;
          }

          #city-coolies-pest-details h2 {
            font-size: 21px;
          }
        }
      `}</style>
    </main>
  );
}
