"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  removeServiceCartItem,
  upsertServiceCartItem,
} from "@/app/services/serviceCart";

export type RentalOption = {
  id: string;
  title: string;
  price: number;
  detail: string;
};

export type RentalService = {
  id: string;
  title: string;
  symbol: string;
  unit: string;
  unitLabel: string;
  minimum: number;
  options: RentalOption[];
  description: string;
  note: string;
  process: string[];
};

export const services: RentalService[] = [
  {
    id: "lorry-rental",
    title: "Lorry Rental",
    symbol: "02",
    unit: "local trip",
    unitLabel: "Trips per selected vehicle",
    minimum: 1,
    options: [
      {
        id: "mini-lorry",
        title: "Mini Lorry",
        price: 1500,
        detail: "Small goods vehicle / Tata Ace class; suitable load confirmed.",
      },
      {
        id: "pickup",
        title: "Pickup Truck",
        price: 2200,
        detail: "Light commercial goods transport; cargo dimensions confirmed.",
      },
      {
        id: "lorry-14ft",
        title: "14-Foot Lorry",
        price: 4000,
        detail: "Medium goods vehicle; legal payload and access confirmed.",
      },
      {
        id: "lorry-17ft",
        title: "17-Foot Lorry",
        price: 5500,
        detail: "Larger loads; vehicle body type and capacity confirmed.",
      },
    ],
    description:
      "Goods vehicle rental for local deliveries, materials and commercial transport.",
    note:
      "Indicative local-trip prices only. Distance, cargo weight, vehicle body, loading/unloading, waiting time, tolls, permits and taxes change the final quote. Hazardous or restricted cargo requires separate approval.",
    process: [
      "Share pickup/drop locations, cargo description, weight and dimensions.",
      "Confirm the appropriate vehicle and pickup/drop access.",
      "Agree trip distance, loading support, waiting allowance and final quote.",
      "Confirm availability and vehicle/driver details before dispatch.",
      "Record pickup, delivery and any approved additional charges.",
    ],
  },
  {
    id: "jcb-rental",
    title: "JCB Rental",
    symbol: "03",
    unit: "working hour",
    unitLabel: "Working hours per selected machine",
    minimum: 4,
    options: [
      {
        id: "backhoe",
        title: "Backhoe Loader",
        price: 1500,
        detail: "JCB class backhoe for digging, loading and levelling.",
      },
      {
        id: "mini-excavator",
        title: "Mini Excavator",
        price: 1800,
        detail: "Compact excavation equipment; access suitability confirmed.",
      },
      {
        id: "excavator",
        title: "Excavator",
        price: 2500,
        detail: "Larger earthwork; machine size chosen after site assessment.",
      },
      {
        id: "breaker",
        title: "Breaker Attachment",
        price: 2200,
        detail: "Compatible machine and attachment for approved breaking work.",
      },
    ],
    description:
      "Operator-assisted equipment rental for excavation, trenching, levelling and loading.",
    note:
      "Indicative hourly rates with a provisional 4-hour minimum. Operator, fuel, mobilization, attachments, standby and site conditions must be agreed in writing. Work starts only after access and site readiness are confirmed.",
    process: [
      "Share the site location, task, photos and expected working duration.",
      "Assess access, ground conditions, underground services and machine suitability.",
      "Confirm operator, attachments, fuel, transport and minimum hire charges.",
      "Schedule dispatch after availability and site readiness checks.",
      "Record working/standby hours and obtain completion sign-off.",
    ],
  },
  {
    id: "crane-rental",
    title: "Crane Rental",
    symbol: "04",
    unit: "working hour",
    unitLabel: "Working hours per selected crane",
    minimum: 4,
    options: [
      {
        id: "pick-carry",
        title: "Pick & Carry Crane",
        price: 2000,
        detail: "Equipment lifting and shifting; capacity and reach assessed.",
      },
      {
        id: "mobile-crane",
        title: "Mobile Crane",
        price: 3500,
        detail: "General lifting; suitable capacity selected for the job.",
      },
      {
        id: "truck-crane",
        title: "Truck-Mounted Crane",
        price: 4500,
        detail: "Mobile lifting support; access and setup space assessed.",
      },
      {
        id: "heavy-crane",
        title: "Heavy-Lift Crane",
        price: 7500,
        detail:
          "Specialist lifting; site-specific engineering and quotation required.",
      },
    ],
    description:
      "Crane hire for equipment handling, installation and approved lifting work.",
    note:
      "Indicative estimates only, with a provisional 4-hour minimum. Load weight alone does not determine crane capacity: lift radius, height, ground conditions and the lift plan matter. Operator, rigging crew, mobilization and permits are quoted separately as applicable.",
    process: [
      "Provide load weight, dimensions, lift height, radius and site location.",
      "Arrange a qualified assessment of access, ground and the required lift plan.",
      "Confirm crane capacity, operator, rigging support and written quotation.",
      "Schedule approved equipment and crew after site-readiness confirmation.",
      "Complete the agreed lift and sign off actual hire hours and extras.",
    ],
  },
  {
    id: "generator-rental",
    title: "Generator Rental",
    symbol: "05",
    unit: "day",
    unitLabel: "Rental days per selected generator",
    minimum: 1,
    options: [
      {
        id: "20-kva",
        title: "20 kVA Generator",
        price: 2500,
        detail:
          "Small temporary-power category; suitability depends on actual load.",
      },
      {
        id: "40-kva",
        title: "40 kVA Generator",
        price: 4000,
        detail:
          "Medium temporary-power category; load assessment required.",
      },
      {
        id: "62-kva",
        title: "62.5 kVA Generator",
        price: 5500,
        detail:
          "Event or site power category; starting loads considered.",
      },
      {
        id: "125-kva",
        title: "125 kVA Generator",
        price: 8500,
        detail:
          "Larger temporary-power requirement; assessed before confirmation.",
      },
    ],
    description:
      "Temporary generator rental for events, backup power and work sites.",
    note:
      "Indicative daily hire; daily running-hour allowance must be confirmed. Fuel, transport, cables, electrical connection, operator and taxes are not automatically included. Generator size is selected from assessed load, starting demand and operating conditions.",
    process: [
      "Share equipment loads, running hours, date and site details.",
      "Assess required capacity, starting demand and installation location.",
      "Confirm fuel, cabling, delivery, operator and final hire quotation.",
      "Arrange installation and commissioning by qualified personnel.",
      "Record run hours/fuel as agreed and arrange disconnection and collection.",
    ],
  },
];

type RentalDetailsProps = {
  serviceId: string;
};

const money = (value: number) => `₹${value.toLocaleString("en-IN")}`;
const reviewPercentages = [50, 29, 14, 5, 2];

export default function RentalDetails({ serviceId }: RentalDetailsProps) {
  const router = useRouter();
  const service = services.find((item) => item.id === serviceId);
  const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([]);
  const [units, setUnits] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  if (!service) return null;

  const serviceTitle = service.title;
  const minimumUnits = service.minimum;
  const rentalOptions = service.options;
  const rentalUnit = service.unit;
  const quantity = units ?? service.minimum;
  const selectedOptions = service.options.filter((option) =>
    selectedOptionIds.includes(option.id),
  );
  const total = selectedOptions.reduce(
    (sum, option) => sum + option.price * quantity,
    0,
  );

  function toggleOption(optionId: string) {
    setSelectedOptionIds((current) =>
      current.includes(optionId)
        ? current.filter((item) => item !== optionId)
        : [...current, optionId],
    );
  }

  function changeUnits(value: string) {
    const parsedValue = Math.floor(Number(value) || minimumUnits);
    setUnits(Math.max(minimumUnits, parsedValue));
  }

  function addToCart() {
    for (const option of rentalOptions) {
      const cartId = `rental:${serviceId}:${option.id}`;

      if (!selectedOptionIds.includes(option.id)) {
        removeServiceCartItem(cartId);
        continue;
      }

      const price = option.price * quantity;

      upsertServiceCartItem({
        id: cartId,
        serviceTitle,
        optionLabel: `${option.title} x ${quantity}`,
        price,
        priceLabel: `${money(price)} estimated`,
        duration: `${quantity} ${rentalUnit} | Booking details and availability pending`,
      });
    }

    window.dispatchEvent(new Event("citycoolies:deep-cleaning-cart-added"));
    router.push("/services/rental-services?showRentalCart=1");
  }

  return (
    <section className="cc-rental-detail">
      <div className="detailWrap">
        <Link className="detailBackLink" href="/services/rental-services">
          ← Back to Rental Services
        </Link>

        <h1 className="detailTitle">{service.title}</h1>
        <p className="detailSubhead">Choose your requirements</p>

        <div className="rentalOptionList">
          {service.options.map((option) => {
            const isSelected = selectedOptionIds.includes(option.id);

            return (
              <article
                className={`rentalOptionItem ${isSelected ? "isSelected" : ""}`}
                key={option.id}
              >
                <div className="rentalOptionHeader">
                  <strong>{option.title}</strong>
                  <strong>
                    {money(option.price)} / {service.unit}
                  </strong>
                </div>

                <p>{option.detail}</p>

                <button
                  className="rentalToggleButton"
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => toggleOption(option.id)}
                >
                  {isSelected ? "Remove" : "Add"}
                </button>
              </article>
            );
          })}
        </div>

        <div className="rentalFieldRow">
          <label htmlFor="rental-units">{service.unitLabel}</label>
          <input
            id="rental-units"
            type="number"
            min={service.minimum}
            step="1"
            value={quantity}
            onChange={(event) => changeUnits(event.target.value)}
          />
        </div>

        <p className="detailNote">
          Indicative prices. Availability and final quotation must be confirmed
          before payment. Ratings shown are demo data.
        </p>

        {selectedOptions.length > 0 && (
          <section className="detailInfoBox">
            <h2>Selected estimates</h2>
            {selectedOptions.map((option) => (
              <p key={option.id}>
                {option.title} × {quantity} — <strong>{money(option.price * quantity)}</strong>
              </p>
            ))}
          </section>
        )}

        <p className="detailDescription">{service.description}</p>
        <p className="detailNote">{service.note}</p>

        <section className="detailInfoBox">
          <h2>Work process</h2>
          <ol>
            {service.process.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="detailReviews">
          <h2>Rating overview</h2>

          <p className="detailReviewSummary">
            <strong>
              <span className="detailStar" aria-hidden="true">
                ★
              </span>{" "}
              4.20
            </strong>
            <span>900 reviews · Not verified customer feedback</span>
          </p>

          {[5, 4, 3, 2, 1].map((score, index) => (
            <div className="detailRatingLine" key={score}>
              <span>{score} ★</span>
              <div className="detailTrack">
                <div
                  className="detailFill"
                  style={{ width: `${reviewPercentages[index]}%` }}
                />
              </div>
              <span>{reviewPercentages[index]}%</span>
            </div>
          ))}
        </section>

        <footer className="detailFooter" style={{ display: selectedOptions.length > 0 ? undefined : "none" }}>
          <div className="detailFooterAmount">
            <small>Selected estimate</small>
            <strong>{money(total)}</strong>
          </div>

          <button
            className="detailContinueButton"
            type="button"
            onClick={addToCart}
            disabled={!selectedOptions.length}
          >
            Continue
          </button>
        </footer>
      </div>

      <style jsx global>{`
        .cc-rental-detail {
          min-height: 65vh;
          background: #ffffff;
          color: #171717;
        }

        .cc-rental-detail * {
          box-sizing: border-box;
        }

        .cc-rental-detail .detailWrap {
          width: min(1040px, calc(100% - 40px));
          margin: 0 auto;
          padding: 38px 0 80px;
        }

        .cc-rental-detail .detailBackLink {
          display: inline-block;
          margin: 0 0 26px;
          color: #ef1b23;
          font-weight: 700;
          text-decoration: none;
        }

        .cc-rental-detail .detailTitle {
          margin: 0 0 18px;
          font-size: 30px;
          font-weight: 700;
          line-height: 1.2;
        }

        .cc-rental-detail .detailSubhead {
          margin: 0 0 18px;
          color: #555f6c;
          font-size: 17px;
        }

        .cc-rental-detail .rentalOptionList {
          display: grid;
          gap: 0;
        }

        .cc-rental-detail .rentalOptionItem {
          padding: 15px 0;
          border-bottom: 1px solid #e5e5e5;
        }

        .cc-rental-detail .rentalOptionItem p {
          margin: 8px 0;
          color: #555f6c;
          line-height: 1.55;
        }

        .cc-rental-detail .rentalOptionItem.isSelected {
          background: #fff9f9;
        }

        .cc-rental-detail .rentalOptionHeader {
          display: flex;
          justify-content: space-between;
          gap: 14px;
        }

        .cc-rental-detail .rentalOptionHeader strong:last-child {
          white-space: nowrap;
        }

        .cc-rental-detail .rentalToggleButton {
          min-width: 65px;
          padding: 7px 14px;
          border: 1px solid #ef1b23;
          border-radius: 9px;
          background: #ffffff;
          color: #ef1b23;
          font: inherit;
          font-weight: 700;
          cursor: pointer;
        }

        .cc-rental-detail .rentalFieldRow {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          margin: 20px 0;
        }

        .cc-rental-detail .rentalFieldRow input {
          width: 105px;
          padding: 9px;
          border: 1px solid #dddddd;
          border-radius: 7px;
          font: inherit;
        }

        .cc-rental-detail .detailNote {
          margin: 20px 0;
          padding: 13px;
          border: 1px solid #fac5cb;
          border-radius: 10px;
          background: #fff5f6;
          color: #303640;
          line-height: 1.55;
        }

        .cc-rental-detail .detailDescription {
          line-height: 1.65;
        }

        .cc-rental-detail .detailInfoBox {
          margin: 22px 0;
          padding: 16px;
          border-radius: 10px;
          background: #f6faf7;
          line-height: 1.55;
        }

        .cc-rental-detail .detailInfoBox h2,
        .cc-rental-detail .detailReviews h2 {
          margin: 0 0 10px;
          font-size: 19px;
        }

        .cc-rental-detail .detailInfoBox li {
          margin: 7px 0;
        }

        .cc-rental-detail .detailReviews {
          margin: 26px 0;
          padding-top: 17px;
          border-top: 1px solid #eeeeee;
        }

        .cc-rental-detail .detailReviewSummary {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .cc-rental-detail .detailStar {
          color: #ef1b23;
        }

        .cc-rental-detail .detailRatingLine {
          display: grid;
          grid-template-columns: 42px minmax(0, 1fr) 42px;
          align-items: center;
          gap: 9px;
          margin: 8px 0;
          font-size: 14px;
        }

        .cc-rental-detail .detailTrack {
          height: 6px;
          background: #dddddd;
        }

        .cc-rental-detail .detailFill {
          height: 100%;
          background: #ef1b23;
        }

        .cc-rental-detail .detailFooter {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 13px 0;
          border-top: 1px solid #eeeeee;
          background: #ffffff;
        }

        .cc-rental-detail .detailFooterAmount {
          display: grid;
          gap: 4px;
        }

        .cc-rental-detail .detailFooterAmount small {
          color: #68717a;
        }

        .cc-rental-detail .detailContinueButton {
          padding: 12px 22px;
          border: 0;
          border-radius: 9px;
          background: #ef1b23;
          color: #ffffff;
          font: inherit;
          font-weight: 700;
          cursor: pointer;
        }

        .cc-rental-detail .detailContinueButton:disabled {
          background: #e5e5e5;
          color: #888888;
          cursor: not-allowed;
        }

        @media (max-width: 700px) {
          .cc-rental-detail .detailWrap {
            width: calc(100% - 24px);
            padding: 24px 0 65px;
          }

          .cc-rental-detail .detailTitle {
            font-size: 25px;
          }

          .cc-rental-detail .detailBackLink {
            margin-bottom: 22px;
          }

          .cc-rental-detail .detailFooter {
            padding: 12px 0;
          }

          .cc-rental-detail .rentalOptionHeader {
            flex-direction: column;
            gap: 6px;
          }

          .cc-rental-detail .rentalOptionHeader strong:last-child {
            white-space: normal;
          }
        }

        /* rentalStickyContinue */
        .cc-rental-detail .detailFooter {
          position: fixed;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          z-index: 50;
          width: min(1040px, calc(100% - 40px));
          margin: 0;
          padding: 12px 16px;
          border: 1px solid #eeeeee;
          border-radius: 12px 12px 0 0;
          background: #ffffff;
          box-shadow: 0 -3px 14px rgba(0, 0, 0, 0.06);
        }

        .cc-rental-detail .detailFooterAmount strong {
          font-size: 18px;
        }

        .cc-rental-detail .detailContinueButton {
          min-height: 40px;
          padding: 9px 20px;
          font-size: 14px;
        }

        .cc-rental-detail .detailWrap {
          padding-bottom: 140px;
        }

        @media (max-width: 700px) {
          .cc-rental-detail .detailFooter {
            width: calc(100% - 16px);
            gap: 10px;
            padding: 10px 12px;
          }

          .cc-rental-detail .detailFooterAmount small {
            font-size: 11px;
          }

          .cc-rental-detail .detailFooterAmount strong {
            font-size: 16px;
          }

          .cc-rental-detail .detailContinueButton {
            min-height: 38px;
            padding: 8px 14px;
            font-size: 13px;
          }
        }

      `}</style>
    </section>
  );
}