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

type ElectricalService = {
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

const ELECTRICAL_SERVICES: readonly ElectricalService[] = [
  {
    id: "full-house-electrical-wiring",
    title: "Full House Electrical Wiring",
    rating: 4.2,
    reviews: 846,
    price: 500,
    survey: true,
    description: "Wiring planning and execution for new apartments, villas, bungalows and buildings, or a complete home rewiring project.",
    includes: ["Property and room-by-room assessment", "Circuit, switch-point and lighting-point planning", "Distribution board and earthing review", "Scope and material quotation after the survey"],
    process: ["Survey the property, rooms and expected electrical loads", "Plan circuits, cable routes, points and protective devices", "Confirm the work scope and final price after the site survey", "Complete approved installation, inspection and testing"],
  },
  {
    id: "electrical-installation",
    title: "Electrical Installation",
    rating: 4.2,
    reviews: 723,
    price: 0,
    description: "Choose the electrical fittings and installation work you need.",
    includes: ["Switches and switchboards", "MCB fitting", "LED light fitting", "6A socket points", "16A power socket points"],
    process: ["Inspect the existing point and fitting location", "Check the planned fitting and required materials", "Complete the selected installation work", "Inspect and test the finished point"],
  },
  {
    id: "smart-switch-automation-setup",
    title: "Smart Switch & Automation Setup",
    rating: 4.1,
    reviews: 612,
    price: 599,
    description: "Setup of compatible smart switches and basic room automation controls.",
    includes: ["Existing switch-box assessment", "Compatible smart-switch fitting", "App pairing and basic control setup", "Function check and handover"],
    process: ["Check existing wiring and device compatibility", "Confirm the required hardware and work scope", "Fit and configure the approved devices", "Test controls and explain normal operation"],
  },
  {
    id: "doorbell-video-doorbell-fitting",
    title: "Doorbell / Video Doorbell Fitting",
    rating: 4.2,
    reviews: 574,
    price: 399,
    description: "Fitting and setup for a compatible doorbell or video doorbell.",
    includes: ["Mounting-position assessment", "Existing power-point review", "Doorbell fitting", "Connection and function check"],
    process: ["Check the mounting position and power arrangement", "Confirm device compatibility and work scope", "Fit and connect the approved doorbell", "Test ringing, video and app connection when applicable"],
  },
  {
    id: "main-meter-box-panel-work",
    title: "Main Meter Box Wiring / Panel Work",
    rating: 4.2,
    reviews: 498,
    price: 500,
    survey: true,
    description: "Assessment of a meter-box or distribution-panel wiring job before a final quote.",
    includes: ["Existing panel condition assessment", "Circuit and protective-device review", "Meter-box or panel work planning", "Final quotation after site survey"],
    process: ["Inspect the panel and document the requested work", "Review circuits, protection and access requirements", "Confirm scope, materials and final quote after survey", "Carry out approved work followed by inspection and testing"],
  },
];

const INSTALLATION_OPTIONS = [
  { id: "switch", title: "Switch Fitting", price: 149 },
  { id: "switchboard", title: "Switchboard Fitting", price: 299 },
  { id: "mcb", title: "MCB Fitting", price: 299 },
  { id: "led-light", title: "LED Light Fitting", price: 199 },
  { id: "6a-socket", title: "6A Socket Point", price: 249 },
  { id: "16a-socket", title: "16A Power Socket Point", price: 349 },
] as const;

const formatPrice = (price: number): string =>
  `₹${price.toLocaleString("en-IN")}`;

const getCartId = (id: string): string => `electrical:${id}`;

const getCartCount = (optionLabel: string): number => {
  const parsed = Number(optionLabel.match(/ x (\d+)$/)?.[1] ?? 1);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : 0;
};

function updateServiceCart(service: ElectricalService, quantity: number) {
  const id = getCartId(service.id);

  if (quantity <= 0) {
    removeServiceCartItem(id);
    return;
  }

  const price = service.price * quantity;

  upsertServiceCartItem({
    id,
    serviceTitle: service.title,
    optionLabel: `${service.survey ? "Site survey" : "Service visit"} x ${quantity}`,
    price,
    priceLabel: formatPrice(price),
    duration: service.survey
      ? "Final work rate after site survey"
      : "Indicative service charge; materials and final scope confirmed on site",
  });

  window.dispatchEvent(new Event("citycoolies:deep-cleaning-cart-added"));
}

const SERVICE_PATH = "/services/electrical-works";
const SURVEY_PRICE = 500;
const REVIEW_DISTRIBUTION = [48, 29, 13, 7, 3] as const;

type ElectricalWorksDetailsProps = {
  serviceId: string;
};

export default function ElectricalWorksDetails({
  serviceId,
}: ElectricalWorksDetailsProps) {
  const service = ELECTRICAL_SERVICES.find((item) => item.id === serviceId);
  const snapshot = useSyncExternalStore(
    subscribeServiceCart,
    getServiceCartSnapshot,
    getServiceCartServerSnapshot,
  );
  const cartItems = useMemo(
    () => parseServiceCartSnapshot(snapshot),
    [snapshot],
  );

  const getQuantity = (id: string): number => {
    const item = cartItems.find((entry) => entry.id === getCartId(id));
    return item ? getCartCount(item.optionLabel) : 0;
  };

  const isInstallation = service?.id === "electrical-installation";
  const installationTotal = INSTALLATION_OPTIONS.reduce(
    (total, option) =>
      total + getQuantity(`installation-${option.id}`) * option.price,
    0,
  );
  const quantity = service ? getQuantity(service.id) : 0;

  function changeOption(
    option: (typeof INSTALLATION_OPTIONS)[number],
    delta: number,
  ) {
    const id = getCartId(`installation-${option.id}`);
    const next = Math.max(0, getQuantity(`installation-${option.id}`) + delta);

    if (next === 0) {
      removeServiceCartItem(id);
      return;
    }

    const price = option.price * next;
    upsertServiceCartItem({
      id,
      serviceTitle: "Electrical Installation",
      optionLabel: `${option.title} x ${next}`,
      price,
      priceLabel: formatPrice(price),
      duration:
        "Indicative fitting charge; materials and additional work confirmed on site",
    });
    window.dispatchEvent(new Event("citycoolies:deep-cleaning-cart-added"));
  }

  if (!service) {
    return (
      <main className="electrical-details">
        <Link href={SERVICE_PATH}>← Back to Electrical Works</Link>
        <h1>Service not found</h1>
      </main>
    );
  }

  return (
    <main className="electrical-details">
      <div className="electrical-details-top">
        <Link href={SERVICE_PATH}>← Back to Electrical Works</Link>
        <span>City Coolies · Electrical Works</span>
      </div>

      <h1>{service.title}</h1>
      <p className="electrical-details-price">
        {isInstallation
          ? "Choose installation jobs"
          : service.survey
            ? `Site survey ${formatPrice(service.price)}`
            : `Starts at ${formatPrice(service.price)}`}
        {` · ${service.rating.toFixed(2)} ★ · ${service.reviews.toLocaleString("en-IN")} reviews`}
      </p>
      <hr />
      <p>{service.description}</p>

      {isInstallation && (
        <section>
          <h2>Choose your requirements</h2>
          <div className="electrical-details-options">
            {INSTALLATION_OPTIONS.map((option) => {
              const optionCount = getQuantity(`installation-${option.id}`);
              return (
                <div className="electrical-details-option" key={option.id}>
                  <strong>{option.title}</strong>
                  <span>{formatPrice(option.price)} per fitting</span>
                  <div className="electrical-details-quantity">
                    {optionCount > 0 && (
                      <button
                        type="button"
                        aria-label={`Remove one ${option.title}`}
                        onClick={() => changeOption(option, -1)}
                      >
                        −
                      </button>
                    )}
                    {optionCount > 0 && <span>{optionCount}</span>}
                    <button
                      type="button"
                      aria-label={`Add one ${option.title}`}
                      onClick={() => changeOption(option, 1)}
                    >
                      {optionCount ? "+" : "Add"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          {installationTotal > 0 && (
            <p>
              <strong>
                Selected jobs total: {formatPrice(installationTotal)}
              </strong>
            </p>
          )}
        </section>
      )}

      <p className="electrical-details-notice">
        {service.survey
          ? `The site survey costs ${formatPrice(SURVEY_PRICE)}. The final work rate is fixed after checking the property, scope and materials.`
          : "Displayed fitting charges are indicative. Materials, additional wiring and the final scope are confirmed after the site assessment."}
      </p>

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

      <section>
        <h2>Customer reviews</h2>
        <strong>★ {service.rating.toFixed(2)}</strong> (
        {service.reviews.toLocaleString("en-IN")} reviews)
        <p className="electrical-details-reviewNote">Illustrative rating distribution; verified breakdown pending.</p>
        {REVIEW_DISTRIBUTION.map((percent, index) => (
          <div className="electrical-details-ratingLine" key={5 - index}>
            <span>{5 - index} ★</span>
            <div>
              <i style={{ width: `${percent}%` }} />
            </div>
            <span>{percent}%</span>
          </div>
        ))}
      </section>

      {!isInstallation && (
        <div className="electrical-details-action">
          <strong>
            {service.survey ? "Site survey" : "Indicative charge"}: {formatPrice(service.price * (quantity || 1))}
          </strong>
          <button
            type="button"
            onClick={() => updateServiceCart(service, quantity ? 0 : 1)}
          >
            {quantity ? "Remove" : "Continue"}
          </button>
        </div>
      )}

      <style jsx global>{`
.electrical-details {
  box-sizing: border-box;
  width: min(1320px, calc(100% - 32px));
  margin: 0 auto;
  padding: 36px 0 72px;
  color: #171717;
}
@media (min-width: 981px) {
  .electrical-details {
    padding-left: 192px;
  }
}
.electrical-details-top {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 64px;
}
.electrical-details-top a {
  color: #ef1b23;
  text-decoration: none;
  font-weight: 700;
}
.electrical-details-top span {
  color: #69717d;
}
.electrical-details h1 {
  max-width: 700px;
  margin: 0 0 14px;
  font-size: clamp(27px, 3vw, 36px);
}
.electrical-details-price {
  color: #4e5968;
}
.electrical-details hr {
  border: 0;
  border-top: 1px solid #eee;
  margin: 32px 0;
}
.electrical-details section {
  margin: 32px 0;
}
.electrical-details h2 {
  font-size: 25px;
  margin: 0 0 16px;
}
.electrical-details li {
  margin: 10px 0;
}
.electrical-details-notice {
  padding: 16px;
  border: 1px solid #fac5cb;
  border-radius: 12px;
  background: #fff5f6;
}
.electrical-details-options {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}
.electrical-details-option {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 12px;
  min-height: 135px;
  padding: 16px;
  border: 1px solid #e0e3e9;
  border-radius: 10px;
}
.electrical-details-quantity {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: auto;
}
.electrical-details-quantity button, .electrical-details-action button {
  padding: 8px 15px;
  border: 1px solid #ef1b23;
  border-radius: 9px;
  background: #fff;
  color: #ef1b23;
  font-weight: 700;
  cursor: pointer;
}
.electrical-details-action {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  max-width: 660px;
  padding-top: 22px;
  border-top: 1px solid #eee;
}
.electrical-details-action button {
  background: #ef1b23;
  color: #fff;
}
.electrical-details-reviewNote {
  color: #69717d;
  font-size: 13px;
}
.electrical-details-ratingLine {
  display: grid;
  grid-template-columns: 50px minmax(0, 260px) 50px;
  gap: 10px;
  align-items: center;
  margin: 10px 0;
}
.electrical-details-ratingLine div {
  height: 5px;
  background: #ddd;
}
.electrical-details-ratingLine i {
  display: block;
  height: 100%;
  background: #ef1b23;
}
@media (max-width: 760px) {
  .electrical-details-top {
    margin-bottom: 40px;
  }
  .electrical-details-options {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 520px) {
  .electrical-details-top span {
    display: none;
  }
  .electrical-details-options {
    grid-template-columns: 1fr;
  }
}
      `}</style>
    </main>
  );
}
