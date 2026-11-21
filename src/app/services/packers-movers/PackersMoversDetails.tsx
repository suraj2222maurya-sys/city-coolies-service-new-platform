"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { upsertServiceCartItem } from "@/app/services/serviceCart";

type Option = { id: string; title: string; base: number };
type Service = {
  id: string;
  title: string;
  description: string;
  options: readonly Option[];
  distanceRate: number;
  includes: readonly string[];
  process: readonly string[];
};


const services: readonly Service[] = [
  {
    id: "local-home-shifting", title: "Local Home Shifting", distanceRate: 20,
    description: "Move household goods within your city with packing, transport and unloading options.",
    options: [
      { id: "studio", title: "1 RK / Studio", base: 2499 },
      { id: "1bhk", title: "1 BHK", base: 3499 },
      { id: "2bhk", title: "2 BHK", base: 4500 },
      { id: "3bhk", title: "3 BHK", base: 6999 },
    ],
    includes: ["Inventory and access assessment", "Suitable vehicle planning", "Loading, transit and unloading scope", "Packing and fragile handling choices"],
    process: ["List large and fragile items and select move size", "Confirm pickup, drop, vehicle access and estimated distance", "Agree inventory, packing level and final quote", "Pack and label approved goods, load, transport, unload and check delivery"],
  },
  {
    id: "intercity-relocation", title: "Intercity Relocation", distanceRate: 15,
    description: "Plan a household move to another city with inventory assessment and a route based quote.",
    options: [
      { id: "small", title: "Small Move", base: 4999 },
      { id: "1bhk", title: "1 BHK", base: 7499 },
      { id: "2bhk", title: "2 BHK", base: 10999 },
      { id: "3bhk", title: "3 BHK", base: 14999 },
    ],
    includes: ["Route and inventory review", "Packing requirements", "Transport and delivery scheduling", "Final quote after inventory verification"],
    process: ["Document the inventory and destination", "Review access, distance, packing and loading needs", "Confirm transport arrangement and final quote", "Pack, record, transport and hand over the items at the destination"],
  },
  {
    id: "office-commercial-moving", title: "Office & Commercial Moving", distanceRate: 24,
    description: "Coordinate an office, shop or small commercial relocation with an inventory and access plan.",
    options: [
      { id: "small-office", title: "Small Office", base: 5999 },
      { id: "office", title: "Office Move", base: 9999 },
      { id: "shop", title: "Shop / Retail", base: 6999 },
    ],
    includes: ["Workstation and inventory planning", "Sensitive equipment packing scope", "Access and loading schedule", "Delivery placement and verification"],
    process: ["List furniture, documents and equipment", "Check pickup and drop access and operating hours", "Agree handling, packing, transport and final quote", "Label, move and place goods as approved"],
  },
  {
    id: "bike-vehicle-moving", title: "Bike & Vehicle Transport", distanceRate: 12,
    description: "Arrange transport for a two wheeler or vehicle after reviewing route and handling requirements.",
    options: [
      { id: "scooter", title: "Scooter / Bike", base: 2499 },
      { id: "large-bike", title: "Large Motorcycle", base: 3499 },
      { id: "car", title: "Car Transport Assessment", base: 8999 },
    ],
    includes: ["Vehicle condition record", "Loading and protection assessment", "Route planning", "Delivery handover check"],
    process: ["Record vehicle type and visible condition", "Confirm pickup, transport method and destination", "Agree protection, documents and final quote", "Secure for transit and verify condition at delivery"],
  },
  {
    id: "packing-unpacking", title: "Packing & Unpacking", distanceRate: 0,
    description: "Choose packing, unpacking or fragile item protection without a full transport booking.",
    options: [
      { id: "packing", title: "Packing Only", base: 1999 },
      { id: "unpacking", title: "Unpacking Only", base: 1499 },
      { id: "fragile", title: "Fragile Items Packing", base: 2499 },
    ],
    includes: ["Packing material estimate", "Room wise labels", "Fragile item protection", "Optional unpacking and placement"],
    process: ["Assess inventory and handling needs", "Confirm materials and final packing quote", "Protect and label items by room", "Unpack and place items when selected"],
  },
  {
    id: "loading-unloading", title: "Loading & Unloading", distanceRate: 0,
    description: "Get moving labour for lifting, loading, unloading and arranging eligible goods.",
    options: [
      { id: "loading", title: "Loading Only", base: 1999 },
      { id: "unloading", title: "Unloading Only", base: 1999 },
      { id: "both", title: "Loading & Unloading", base: 3499 },
    ],
    includes: ["Crew and item count assessment", "Access and floor check", "Safe carrying plan", "Placement at drop location"],
    process: ["Record item dimensions and handling requirements", "Check loading space, stairs and access", "Confirm labour requirement and final quote", "Carry, load or unload and verify item placement"],
  },
];

const money = (value: number) => `₹${value.toLocaleString("en-IN")}`;
const ratingDistribution = [48, 29, 13, 7, 3] as const;

export default function PackersMoversDetails({
  serviceId,
}: {
  serviceId: string;
}) {
  const router = useRouter();
  const [choice, setChoice] = useState("");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [distance, setDistance] = useState(5);
  const [stairs, setStairs] = useState(false);
  const [packing, setPacking] = useState(false);

  const service = services.find((item) => item.id === serviceId);
  const selected = service?.options.find(
    (option) => option.id === choice
  );

  const estimate =
    service && selected
      ? selected.base +
        Math.max(0, distance - 5) * service.distanceRate +
        (stairs ? 399 : 0) +
        (packing ? 699 : 0)
      : 0;

  const readyToContinue =
    Boolean(selected) &&
    pickup.trim().length > 0 &&
    drop.trim().length > 0;

  function proceed() {
    if (!service || !selected || !readyToContinue) return;

    upsertServiceCartItem({
      id: "moving:" + service.id,
      serviceTitle: service.title,
      optionLabel: [
        selected.title,
        (pickup || "Pickup to confirm") +
          " → " +
          (drop || "Drop to confirm"),
        "estimated " + money(estimate),
      ].join(" · "),
      price: 0,
      priceLabel: "Free quote request",
      duration:
        "Estimate " +
        money(estimate) +
        " for " +
        distance +
        " km; final rate after inventory, route and access confirmation. No online moving payment collected.",
    });

    window.dispatchEvent(
      new Event("citycoolies:deep-cleaning-cart-added")
    );

    router.push("/services/packers-movers#moving-cart");
  }

  if (!service) {
    return (
      <main
        id="city-coolies-moving-details"
        className="work-details"
      >
        <Link
          className="work-back"
          href="/services/packers-movers"
        >
          ← Back to Packers & Movers
        </Link>
        <h1>Service not found</h1>
      </main>
    );
  }

  return (
    <main
      id="city-coolies-moving-details"
      className="work-details"
    >
      <Link
        className="work-back"
        href="/services/packers-movers"
      >
        ← Back to Packers & Movers
      </Link>

      <h1>{service.title}</h1>

      <p className="work-subtitle">
        Free quote request · no booking fee
      </p>

      <section>
        <h2>Choose your move</h2>

        <div className="work-options">
          {service.options.map((option) => (
            <button
              type="button"
              key={option.id}
              className={
                choice === option.id
                  ? "work-option work-optionSelected"
                  : "work-option"
              }
              aria-pressed={choice === option.id}
              onClick={() => setChoice(option.id)}
            >
              <strong>{option.title}</strong>
              <span>
                Estimate from {money(option.base)}
              </span>
            </button>
          ))}
        </div>

        <div className="work-fields">
          <label>
            Pickup area
            <input
              value={pickup}
              onChange={(event) =>
                setPickup(event.target.value)
              }
              placeholder="Area and city"
            />
          </label>

          <label>
            Drop area
            <input
              value={drop}
              onChange={(event) =>
                setDrop(event.target.value)
              }
              placeholder="Area and city"
            />
          </label>

          {service.distanceRate > 0 && (
            <label>
              Estimated distance (km)
              <input
                type="number"
                min={1}
                max={5000}
                value={distance}
                onChange={(event) => {
                  const value = Number(event.target.value);
                  setDistance(
                    Number.isFinite(value) && value > 0
                      ? Math.min(5000, Math.floor(value))
                      : 1
                  );
                }}
              />
            </label>
          )}
        </div>

        <label className="work-check">
          <input
            type="checkbox"
            checked={packing}
            onChange={(event) =>
              setPacking(event.target.checked)
            }
          />
          Add packing estimate (+₹699)
        </label>

        <label className="work-check">
          <input
            type="checkbox"
            checked={stairs}
            onChange={(event) =>
              setStairs(event.target.checked)
            }
          />
          Stairs / no lift estimate (+₹399)
        </label>

        {selected && (
          <div className="work-selectionSummary" aria-live="polite">
            <strong>Selected move: {selected.title}</strong>
            <span>
              Pickup: {pickup.trim() || "Not entered"}
            </span>
            <span>
              Drop: {drop.trim() || "Not entered"}
            </span>
            {service.distanceRate > 0 && (
              <span>Distance: {distance} km</span>
            )}
            <span>Packing: {packing ? "Yes" : "No"}</span>
            <span>Stairs / no lift: {stairs ? "Yes" : "No"}</span>
            <strong>
              Indicative moving estimate: {money(estimate)}
            </strong>
            <span>Booking fee: ₹0</span>
          </div>
        )}
      </section>

      <p className="work-notice">
        The displayed amount is an estimate, not a final
        payable price. Goods volume, exact route, floors,
        vehicle needs and packing materials must be
        confirmed before the final quote.
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
          {service.process.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section aria-label="Reviews">
        <h2>Reviews</h2>

        <div className="work-reviewSummary">
          <span className="work-reviewStar">★</span>
          <strong>4.20</strong>
          <span>628 reviews</span>
        </div>

        <div className="work-ratingRows">
          {ratingDistribution.map((percent, index) => (
            <div
              className="work-ratingRow"
              key={5 - index}
            >
              <span>{5 - index} ★</span>
              <div className="work-track">
                <i
                  style={{ width: String(percent) + "%" }}
                />
              </div>
              <span>{percent}%</span>
            </div>
          ))}
        </div>
      </section>

      <footer className={`work-footer${readyToContinue ? " work-footerReady" : ""}`}>
        <span>
          Request a quote{" "}
          <strong>₹0 booking fee</strong>
        </span>

        <button
          type="button"
          disabled={!readyToContinue}
          onClick={proceed}
        >
          Continue
        </button>
      </footer>

      <style jsx global>{`
#city-coolies-moving-details.work-details {
          box-sizing:border-box;
          width:min(1320px,calc(100% - 32px));
          margin:0 auto;
          padding:36px 0 72px;
          color:#171717;
        }
      #city-coolies-moving-details .work-back {
          color:#ef1b23;
          font-weight:700;
          text-decoration:none;
        }
      #city-coolies-moving-details.work-details h1 {
          max-width:850px;
          margin:48px 0 12px;
          font-size:clamp(27px,3vw,36px);
        }
      #city-coolies-moving-details .work-subtitle {
          color:#596373;
        }
      #city-coolies-moving-details.work-details section {
          margin-top:32px;
        }
      #city-coolies-moving-details.work-details h2 {
          font-size:24px;
          margin:0 0 15px;
        }
      #city-coolies-moving-details.work-details li {
          margin:9px 0;
          line-height:1.6;
        }
      #city-coolies-moving-details .work-notice {
          max-width:780px;
          margin-top:22px;
          padding:14px;
          border:1px solid #fac5cb;
          border-radius:12px;
          background:#fff5f6;
          line-height:1.6;
        }
      #city-coolies-moving-details .work-options {
          display:grid;
          grid-template-columns:repeat(3,minmax(0,1fr));
          gap:12px;
          max-width:780px;
        }
      #city-coolies-moving-details .work-option {
          display:flex;
          flex-direction:column;
          align-items:flex-start;
          gap:10px;
          min-height:116px;
          padding:14px;
          border:1px solid #e0e3e9;
          border-radius:10px;
          text-align:left;
        }
      #city-coolies-moving-details .work-option span, #city-coolies-moving-details .work-option small {
          color:#616a77;
        }


      #city-coolies-moving-details .work-optionSelected {
          border-color:#ef1b23;
          background:#fff8f8;
        }
      #city-coolies-moving-details .work-reviewSummary {
          display:flex;
          align-items:center;
          gap:10px;
          color:#536072;
          font-size:16px;
        }
      #city-coolies-moving-details .work-reviewSummary strong {
          color:#171717;
          font-size:22px;
        }
      #city-coolies-moving-details .work-reviewSummary .work-reviewStar {
          color:#ef1b23;
          font-size:24px;
        }
      #city-coolies-moving-details .work-ratingRows {
          display:grid;
          gap:10px;
          max-width:660px;
          margin-top:18px;
        }
      #city-coolies-moving-details .work-ratingRow {
          display:grid;
          grid-template-columns:44px minmax(0,1fr) 44px;
          gap:12px;
          align-items:center;
          color:#556070;
        }
      #city-coolies-moving-details .work-track {
          height:6px;
          background:#ddd;
          overflow:hidden;
        }
      #city-coolies-moving-details .work-track i {
          display:block;
          height:100%;
          background:#ef1b23;
        }
      #city-coolies-moving-details .work-footer {
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:20px;
          margin-top:38px;
          padding:22px 0;
          border-top:1px solid #eee;
        }
      #city-coolies-moving-details .work-selectionSummary {
        display: flex;
        flex-direction: column;
        gap: 7px;
        max-width: 780px;
        margin-top: 18px;
        padding: 16px;
        border: 1px solid #f3cbd0;
        border-radius: 10px;
        background: #fff8f8;
      }

      #city-coolies-moving-details .work-footerReady {
        position: fixed;
        z-index: 100;
        bottom: 16px;
        left: 50%;
        transform: translateX(-50%);
        width: min(920px, calc(100% - 32px));
        margin: 0;
        padding: 14px 18px;
        border: 1px solid #f3cbd0;
        border-radius: 14px;
        background: #ffffff;
        box-shadow: 0 8px 30px #00000018;
      }

      #city-coolies-moving-details .work-footer button {
          min-width:125px;
          padding:12px 18px;
          border:0;
          border-radius:10px;
          background:#ef1b23;
          color:white;
          font-weight:700;
          cursor:pointer;
        }
      #city-coolies-moving-details .work-footer button:disabled {
          background:#f39ba0;
          cursor:not-allowed;
        }
      #city-coolies-moving-details .work-fields {
          display:grid;
          grid-template-columns:repeat(2,minmax(0,1fr));
          gap:12px;
          max-width:780px;
          margin:16px 0;
        }
      #city-coolies-moving-details .work-fields label {
          display:flex;
          flex-direction:column;
          gap:7px;
          font-size:14px;
          font-weight:600;
        }
      #city-coolies-moving-details .work-fields input {
          min-width:0;
          padding:10px;
          border:1px solid #dde1e7;
          border-radius:8px;
          font:inherit;
        }
      #city-coolies-moving-details .work-check {
          display:flex;
          align-items:center;
          gap:9px;
          margin:12px 0;
        }
      @media(min-width:981px) { #city-coolies-moving-details.work-details {
          padding-left:192px;
        } }
      @media(max-width:760px) { #city-coolies-moving-details.work-details h1 {
          margin-top:35px;
        } #city-coolies-moving-details .work-options {
          grid-template-columns:repeat(2,minmax(0,1fr));
        } }
      @media(max-width:520px) {
        #city-coolies-moving-details .work-footerReady {
          bottom: 10px;
          width: calc(100% - 20px);
          gap: 10px;
          padding: 12px;
        }

        #city-coolies-moving-details .work-footerReady button {
          min-width: 105px;
        }
 #city-coolies-moving-details .work-options,#city-coolies-moving-details .work-fields {
          grid-template-columns:1fr;
        } }
      `}</style>
    </main>
  );
}