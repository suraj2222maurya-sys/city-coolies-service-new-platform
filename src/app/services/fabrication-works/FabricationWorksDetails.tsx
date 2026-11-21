"use client";

import { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
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
  reviews: number;
  description: string;
  includes: readonly string[];
  process: readonly string[];
};
const services: readonly Service[] = [
  {
    id: "gate-fabrication",
    title: "Gate Fabrication & Installation",
    reviews: 0,
    description:
      "Made-to-measure MS or SS entrance, swing and sliding gate work for homes, apartments, offices and commercial premises.",
    includes: [
      "Opening measurement and swing or sliding clearance",
      "Material, frame and design review",
      "Hinge, lock, track and finish planning",
    ],
    process: [
      "Survey opening and fixing points",
      "Agree gate design, section size, finish and final quotation",
      "Cut, weld and finish the approved frame and panels",
      "Install, align, operate and inspect the gate",
    ],
  },
  {
    id: "grills-railing",
    title: "Window Grills & Railings",
    reviews: 0,
    description:
      "Fabrication of window security grills, balcony or staircase railings and handrails to measured dimensions.",
    includes: [
      "Window and stair dimensions",
      "Grill spacing, railing height and anchor review",
      "MS or SS material and finish selection",
    ],
    process: [
      "Survey location, dimensions and substrate",
      "Agree design, fixing detail and final quote",
      "Fabricate and finish sections off-site where suitable",
      "Anchor and inspect fittings and edge finish",
    ],
  },
  {
    id: "shed-canopy",
    title: "Roof Shed & Canopy Fabrication",
    reviews: 0,
    description:
      "Custom metal frames for parking shelters, terrace covers, shop canopies and light roof sheds, subject to structural assessment.",
    includes: [
      "Area measurement and access review",
      "Support, drainage and roof sheet requirements",
      "Structural design referral for large spans",
    ],
    process: [
      "Survey dimensions, load paths and weather exposure",
      "Review supports and obtain engineer-approved design where required",
      "Agree roof material, fabrication scope and final rate",
      "Fabricate, install and inspect joints and drainage",
    ],
  },
  {
    id: "steel-structure",
    title: "Structural Steel Fabrication",
    reviews: 0,
    description:
      "Steel frames and support elements for approved residential, commercial and industrial designs.",
    includes: [
      "Drawing and steel grade review",
      "Connection and weld specifications",
      "Access, lifting and finishing plan",
    ],
    process: [
      "Survey site and review engineer-approved drawings",
      "Confirm sections, connections, schedule and final quote",
      "Cut, fit, weld and inspect approved members",
      "Erect with appropriate supervision and complete handover checks",
    ],
  },
  {
    id: "welding-repair",
    title: "Welding & Metal Repair",
    reviews: 0,
    description:
      "On-site assessment of damaged metal gates, grills, handrails and non-structural fittings for repair or replacement.",
    includes: [
      "Damage and corrosion assessment",
      "Repairability and replacement scope",
      "Weld, hinge and finish review",
    ],
    process: [
      "Inspect affected item and surrounding material",
      "Confirm whether a safe repair is feasible",
      "Agree repair scope, materials and final price",
      "Weld or replace approved parts and check alignment and finish",
    ],
  },
  {
    id: "commercial-custom-fabrication",
    title: "Custom & Commercial Fabrication",
    reviews: 0,
    description:
      "Measured steel fabrication for shops, warehouses, schools and custom property requirements, based on drawings and site conditions.",
    includes: [
      "Purpose and site access review",
      "Custom dimensions and material specification",
      "Installation and operating-hours plan",
    ],
    process: [
      "Survey location and collect reference drawings",
      "Confirm dimensions, loads and required approvals",
      "Agree detailed fabrication scope and quotation",
      "Fabricate, install, inspect and document handover",
    ],
  },
];

const money = (value: number) => `₹${value.toLocaleString("en-IN")}`;
const cartId = (id: string) => `fabrication:${id}`;

const distribution = [48, 29, 13, 7, 3];

export default function FabricationWorksDetails({
  serviceId,
}: {
  serviceId: string;
}) {
  const service = services.find((item) => item.id === serviceId);
  const snapshot = useSyncExternalStore(
    subscribeServiceCart,
    getServiceCartSnapshot,
    getServiceCartServerSnapshot,
  );
  const cartItems = useMemo(
    () => parseServiceCartSnapshot(snapshot),
    [snapshot],
  );

  if (!service)
    return (
      <main className="details">
        <Link href="/services/fabrication-works">
          ← Back to Fabrication Works
        </Link>
        <h1>Service not found</h1>
      </main>
    );

  const selected = cartItems.some((item) => item.id === cartId(service.id));
  function proceed() {
    if (!service) return;
    if (selected) {
      removeServiceCartItem(cartId(service.id));
      return;
    }
    upsertServiceCartItem({
      id: cartId(service.id),
      serviceTitle: service.title,
      optionLabel: "Site survey",
      price: 500,
      priceLabel: money(500),
      duration:
        "Final fabrication rate confirmed after the site survey and approved scope",
    });
    window.dispatchEvent(new Event("citycoolies:deep-cleaning-cart-added"));
  }

  return (
    <main className="details">
      <div className="top">
        <Link href="/services/fabrication-works">
          ← Back to Fabrication Works
        </Link>
        <span>City Coolies · Fabrication Works</span>
      </div>
      <h1>{service.title}</h1>
      <p className="notice">
        {
          "The site survey costs ₹500. The final fabrication rate is confirmed after inspecting the site, reviewing measurements, materials, drawings and the approved work scope."
        }
      </p>
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
          {service.process.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>
      <section className="reviews">
        <h2>Reviews</h2>
        <div className="reviewHeading">
          <span className="redStar">★</span>
          <strong>4.20</strong>
          <span>Sample rating · verified customer reviews pending</span>
        </div>
        {distribution.map((percent, index) => (
          <div className="ratingRow" key={index}>
            <span>{5 - index} ★</span>
            <div className="ratingTrack">
              <span className="ratingFill" style={{ width: `${percent}%` }} />
            </div>
            <span>{percent}%</span>
          </div>
        ))}
      </section>
      <div className="summary">
        <strong>Site survey ₹500</strong>
        <button type="button" onClick={proceed}>
          {selected ? "Remove" : "Continue"}
        </button>
      </div>
      <style jsx global>{`
        .details {
          box-sizing: border-box;
          width: min(1320px, calc(100% - 32px));
          margin: 0 auto;
          padding: 36px 0 72px;
          color: #171717;
        }
        .top {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 40px;
        }
        .top a {
          color: #ef1b23;
          font-weight: 700;
          text-decoration: none;
        }
        .details h1 {
          font-size: clamp(28px, 3vw, 38px);
          margin: 0 0 18px;
        }
        .details h2 {
          font-size: 24px;
          margin: 0 0 16px;
        }
        .notice {
          padding: 15px;
          border: 1px solid #fac5cb;
          border-radius: 12px;
          background: #fff5f6;
          line-height: 1.5;
        }
        .details section {
          margin: 28px 0;
        }
        .details li {
          margin: 10px 0;
          line-height: 1.5;
        }
        .details ul,
        .details ol {
          padding-left: 22px;
        }
        .details p {
          line-height: 1.6;
        }
        .summary {
          border-top: 1px solid #e6e8ef;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 24px 0;
          margin-top: 30px;
        }
        .summary button {
          border: 0;
          border-radius: 10px;
          background: #ef1b23;
          color: #fff;
          font-weight: 700;
          font-size: 16px;
          padding: 12px 24px;
          cursor: pointer;
        }
        .reviews {
          max-width: 660px;
        }
        .reviewHeading {
          display: flex;
          align-items: center;
          gap: 9px;
          color: #555f6c;
          margin-bottom: 18px;
        }
        .reviewHeading strong {
          font-size: 24px;
        }
        .redStar {
          color: #ef1b23;
          font-size: 24px;
        }
        .ratingRow {
          display: grid;
          grid-template-columns: 44px minmax(0, 1fr) 44px;
          align-items: center;
          gap: 10px;
          margin: 10px 0;
          color: #555f6c;
        }
        .ratingTrack {
          height: 6px;
          background: #ddd;
        }
        .ratingFill {
          height: 100%;
          background: #ef1b23;
          display: block;
        }
        @media (min-width: 981px) {
          .details {
            padding-left: 192px;
          }
        }
        @media (max-width: 600px) {
          .details {
            width: calc(100% - 28px);
            padding-top: 22px;
          }
          .summary {
            align-items: flex-start;
          }
          .details h2 {
            font-size: 21px;
          }
        }
      `}</style>
    </main>
  );
}
