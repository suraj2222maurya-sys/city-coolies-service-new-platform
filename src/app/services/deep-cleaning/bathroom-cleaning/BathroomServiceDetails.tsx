"use client";

import { useState } from "react";
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

const services: readonly Service[] = [
  {
    id: "intense-bathroom-cleaning",
    title: "Intense Bathroom Cleaning",
    rating: 4.1,
    reviews: 800,
    pricingTitle: "Select number of bathrooms",
    options: [
      { id: "1-bathroom", label: "1 Bathroom", price: 574 },
      { id: "2-bathrooms", label: "2 Bathrooms", price: 1056 },
      { id: "3-bathrooms", label: "3 Bathrooms", price: 1549 },
      { id: "4-bathrooms", label: "4 Bathrooms", price: 2065 },
      { id: "5-bathrooms", label: "5 Bathrooms", price: 2582 },
    ],
    process: [
      { title: "Inspect the bathrooms", description: "The cleaning team checks accessible surfaces and confirms the selected bathroom count." },
      { title: "Deep clean and scrub", description: "Floors, tiles, toilet, basin, taps and shower areas are cleaned with attention to stains and grime." },
      { title: "Final check", description: "Mirrors and accessible fixtures are finished, and the cleaned areas are checked." },
    ],
    included: [
      "Floor, tiles, walls and corner deep cleaning",
      "Machine scrubbing for stubborn stains",
      "Toilet deep cleaning",
      "Wash basin, taps, shower and glass partition cleaning",
      "Mirror and window cleaning",
      "Exhaust fan cleaning",
      "Bathroom cabinet and shelf interior cleaning",
    ],
    excluded: [
      "Rust or cement stain removal",
      "Bucket and mug cleaning",
      "Fixture dismantling or repairs",
    ],
    perfectFor: [
      "Regular monthly deep cleaning",
      "Bathrooms with hard water stains or dull tiles",
      "Homes, apartments and commercial properties",
    ],
    distribution: [47, 30, 13, 6, 4],
  },
  {
    id: "move-in-move-out-bathroom-cleaning",
    title: "Move-in/Move-out Bathroom Cleaning",
    rating: 4.4,
    reviews: 800,
    pricingTitle: "Select number of bathrooms",
    options: [
      { id: "1-bathroom", label: "1 Bathroom", price: 666 },
      { id: "2-bathrooms", label: "2 Bathrooms", price: 1240 },
      { id: "3-bathrooms", label: "3 Bathrooms", price: 1825 },
      { id: "4-bathrooms", label: "4 Bathrooms", price: 2433 },
      { id: "5-bathrooms", label: "5 Bathrooms", price: 3042 },
    ],
    process: [
      { title: "Check the space", description: "The team confirms the bathrooms and notes areas needing additional attention." },
      { title: "Detailed cleaning", description: "Tiles, floors, toilet, shower, basin, mirrors and accessible storage are cleaned." },
      { title: "Ready for handover", description: "Visible surfaces are checked before the move-in or move-out handover." },
    ],
    included: [
      "Machine scrubbing for tiles and floors",
      "Toilet deep cleaning inside and out",
      "Basin, taps, shower area and mirror cleaning",
      "Hard water stain, soap scum and grime cleaning",
      "Exhaust fan cleaning",
      "Bathroom cabinet and shelf interior cleaning",
      "Additional attention to move-in or move-out cleaning",
    ],
    excluded: [
      "Rust or cement stain removal",
      "Bucket and mug cleaning",
      "Fixture dismantling or repairs",
    ],
    distribution: [60, 27, 8, 3, 2],
  },
  {
    id: "commercial-bathroom-cleaning",
    title: "Commercial Bathroom Cleaning",
    rating: 4.4,
    reviews: 800,
    directAdd: true,
    options: [
      { id: "site-survey", label: "Site survey - final cleaning rate after survey", price: 500 },
    ],
    process: [
      { title: "Book a site survey", description: "Book the commercial bathroom site survey for \u20B9500." },
      { title: "Assess the space", description: "The team checks the number of bathrooms, fixtures, condition and cleaning requirements on site." },
      { title: "Confirm the final rate", description: "After the survey, the cleaning scope and final service rate are confirmed with you." },
      { title: "Schedule cleaning", description: "The service is scheduled after you approve the confirmed scope and rate." },
    ],
    included: [
      "On-site assessment of commercial bathrooms",
      "Review of fixtures, surfaces and cleaning requirements",
      "Cleaning scope and final rate confirmation after the survey",
    ],
    excluded: [
      "The \u20B9500 site survey charge does not include the cleaning service",
      "The final cleaning rate is fixed after the site survey",
    ],
    distribution: [60, 27, 8, 3, 2],
  },
];

const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;
const RETURN_PATH = "/services/deep-cleaning?category=bathroom-cleaning";

export default function BathroomServiceDetails({ serviceId }: { serviceId: string }) {
  const router = useRouter();
  const [selected, setSelected] = useState<Option | null>(null);
  const service = services.find((item) => item.id === serviceId);

  if (!service) {
    return <main className="cc-dc-detailsPage"><div className="cc-dc-detailsInner"><button type="button" className="cc-dc-detailsBack" onClick={() => router.push(RETURN_PATH)}>← Back to Bathroom Cleaning</button><h1>Service not found</h1></div></main>;
  }

  const addToCart = (option: Option) => {
    upsertServiceCartItem({
      id: `bathroom-cleaning:${service.id}:${option.id}`,
      serviceTitle: service.title,
      optionLabel: option.label,
      price: option.price,
      priceLabel: formatPrice(option.price),
      duration: "Professional cleaning service",
    });
    if (window.matchMedia("(max-width: 760px)").matches) {
      window.sessionStorage.setItem("citycoolies:bathroom-scroll-cart", "1");
    }
    router.push(RETURN_PATH);
  };

  return (
    <main className="cc-dc-detailsPage">
      <style>{DETAILS_CSS}</style>
      <style>{`
        .cc-dc-detailsPage .cc-dc-bathroom-selectionFooter {
          position: fixed !important;
          left: 50%;
          bottom: calc(12px + env(safe-area-inset-bottom, 0px));
          z-index: 1100;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          width: min(620px, calc(100% - 24px));
          min-height: 64px;
          margin: 0;
          padding: 10px 16px;
          transform: translateX(-50%);
          border: 1px solid #eeeeee;
          border-radius: 12px;
          background: #ffffff;
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
        }

        @media (max-width: 760px) {
          .cc-dc-detailsPage .cc-dc-bathroom-selectionFooter {
            bottom: calc(8px + env(safe-area-inset-bottom, 0px));
            width: calc(100% - 20px);
            min-height: 60px;
            padding: 9px 12px;
          }
        }
      `}</style>
      <div className="cc-dc-detailsInner">
        <header className="cc-dc-bathroom-modalHeader">
          <div>
            <h1 id={`bathroom-modal-${service.id}`}>{service.title}</h1>
            <p>{service.directAdd ? `Site survey: ${formatPrice(service.options[0].price)}. Final cleaning rate is confirmed after the survey.` : "Choose the option that matches your cleaning requirement."}</p>
          </div>
          <button type="button" className="cc-dc-detailsBack" onClick={() => router.push(RETURN_PATH)}>← Back to Bathroom Cleaning</button>
        </header>
        <div className="cc-dc-bathroom-modalBody">
          {!service.directAdd && (
            <section className="cc-dc-bathroom-modalSection">
              <h2>{service.pricingTitle}</h2>
              <div className="cc-dc-bathroom-pricingGrid">
                {service.options.map((option) => (
                  <article key={option.id} className="cc-dc-bathroom-priceCard">
                    <span className="cc-dc-bathroom-optionLabel">{option.label}</span>
                    <strong>{formatPrice(option.price)}</strong>
                    <button type="button" aria-pressed={selected?.id === option.id} onClick={() => setSelected((current) => current?.id === option.id ? null : option)}>{selected?.id === option.id ? "Selected" : "Select"}</button>
                  </article>
                ))}
              </div>
            </section>
          )}
          <section className="cc-dc-bathroom-modalSection">
            <h2>{service.id === "intense-bathroom-cleaning" ? "Our Process" : "How it works?"}</h2>
            <ol className="cc-dc-bathroom-processList">
              {service.process.map((step, index) => (
                <li key={step.title}><span className="cc-dc-bathroom-processNumber">{index + 1}.</span><div><strong>{step.title}</strong><p>{step.description}</p></div></li>
              ))}
            </ol>
          </section>
          {([ ["Included", service.included], ["Not Included", service.excluded], ["Perfect For", service.perfectFor] ] as const).map(([heading, items]) => items?.length ? (
            <section key={heading} className="cc-dc-bathroom-modalSection"><h2>{heading}</h2><ul className="cc-dc-bathroom-simpleList">{items.map((item) => <li key={item}>{item}</li>)}</ul></section>
          ) : null)}
          <section className="cc-dc-bathroom-ratingSection" aria-label={`${service.title} customer rating`}>
            <div className="cc-dc-bathroom-ratingSummary"><span className="cc-dc-bathroom-goldStar" aria-hidden="true">★</span><strong>{service.rating.toFixed(1)}</strong></div>
            <p className="cc-dc-bathroom-ratingReviewCount">{service.reviews.toLocaleString("en-IN")} reviews</p>
            <div className="cc-dc-bathroom-ratingBars">
              {service.distribution.map((percentage, index) => (
                <div className="cc-dc-bathroom-ratingBarRow" key={5 - index}><span className="cc-dc-bathroom-ratingLabel">{5 - index} ★</span><span className="cc-dc-bathroom-ratingTrack"><span className="cc-dc-bathroom-ratingFill" style={{ width: `${percentage}%` }} /></span><span className="cc-dc-bathroom-ratingPercent">{percentage}%</span></div>
              ))}
            </div>
          </section>
        </div>
        {(selected || service.directAdd) && (
        <footer className="cc-dc-bathroom-selectionFooter">
          <div className="cc-dc-bathroom-selectionSummary"><span className="cc-dc-bathroom-selectionCaption">Total</span><strong className="cc-dc-bathroom-selectionValue">{service.directAdd ? formatPrice(service.options[0].price) : selected ? formatPrice(selected.price) : "Select an option"}</strong></div>
          <button type="button" className="cc-dc-bathroom-continueButton" disabled={!service.directAdd && !selected} onClick={() => { const option = service.directAdd ? service.options[0] : selected; if (option) addToCart(option); }}>Continue</button>
        </footer>
        )}
      </div>
    </main>
  );
}

const DETAILS_CSS = `.cc-dc-bathroom-modalOverlay {
  position: fixed;
  inset: 0;
  z-index: 1200;
  display: flex;
  box-sizing: border-box;
  padding: 16px;
  align-items: center;
  justify-content: center;
  background: rgba(14, 14, 14, 0.72);
}
.cc-dc-bathroom-modal {
  display: flex;
  width: min(558px, calc(100vw - 32px));
  height: min(640px, calc(100dvh - 32px));
  min-height: 0;
  overflow: hidden;
  border: 1px solid #f1d7db;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.22);
  flex-direction: column;
}
.cc-dc-bathroom-modalHeader {
  display: flex;
  box-sizing: border-box;
  min-height: 150px;
  flex: 0 0 auto;
  gap: 18px;
  padding: 34px 32px 27px;
  align-items: flex-start;
  justify-content: space-between;
  border-bottom: 1px solid #eeeeee;
  background: #ffffff;
}
.cc-dc-bathroom-modalHeader h2 {
  margin: 0;
  color: #161616;
  font-size: 28px;
  font-weight: 750;
  line-height: 1.16;
  letter-spacing: -0.025em;
}
.cc-dc-bathroom-modalHeader p {
  max-width: 410px;
  margin: 10px 0 0;
  color: #626262;
  font-size: 14px;
  line-height: 1.5;
}
.cc-dc-bathroom-modalBody {
  min-height: 0;
  flex: 1 1 auto;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 28px 32px 34px;
  overscroll-behavior: contain;
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
}
.cc-dc-bathroom-modalBody::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}
.cc-dc-bathroom-modalSection {
  width: 100%;
}
.cc-dc-bathroom-modalSection + .cc-dc-bathroom-modalSection,
.cc-dc-bathroom-ratingSection {
  margin-top: 30px;
  padding-top: 28px;
  border-top: 1px solid #e9eaec;
}
.cc-dc-bathroom-modalSection h3 {
  margin: 0 0 19px;
  color: #5c6678;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.3;
}
.cc-dc-bathroom-pricingGrid {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}
.cc-dc-bathroom-priceCard {
  display: flex;
  box-sizing: border-box;
  min-height: 168px;
  padding: 16px 13px;
  border: 1px solid #dfe2e7;
  border-radius: 10px;
  background: #ffffff;
  flex-direction: column;
  align-items: flex-start;
}
.cc-dc-bathroom-optionLabel {
  color: #303746;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.42;
}
.cc-dc-bathroom-priceCard strong {
  margin-top: 20px;
  color: #525d6f;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.25;
}
.cc-dc-bathroom-priceCard button {
  display: inline-flex;
  min-width: 85px;
  min-height: 42px;
  margin-top: auto;
  padding: 0 18px;
  align-items: center;
  justify-content: center;
  border: 1.5px solid #ef1b23;
  border-radius: 9px;
  background: #ffffff;
  color: #ef1b23;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
}
.cc-dc-bathroom-priceCard button:hover,
.cc-dc-bathroom-priceCard button:focus-visible {
  background: #ef1b23;
  color: #ffffff;
}
.cc-dc-bathroom-processList {
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
  flex-direction: column;
  gap: 18px;
}
.cc-dc-bathroom-processList li {
  display: grid;
  grid-template-columns: 29px minmax(0, 1fr);
  gap: 3px;
}
.cc-dc-bathroom-processNumber {
  color: #7b8495;
  font-size: 15px;
  line-height: 1.45;
}
.cc-dc-bathroom-processList strong {
  color: #606a7c;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.4;
}
.cc-dc-bathroom-processList p {
  margin: 4px 0 0;
  color: #7b8598;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.55;
}
.cc-dc-bathroom-simpleList {
  display: flex;
  margin: 0;
  padding: 0 0 0 21px;
  color: #697387;
  flex-direction: column;
  gap: 14px;
}
.cc-dc-bathroom-simpleList li {
  padding-left: 5px;
  font-size: 15px;
  line-height: 1.45;
}
.cc-dc-bathroom-ratingSection {
  padding-bottom: 8px;
}
.cc-dc-bathroom-ratingSummary {
  display: flex;
  align-items: center;
  gap: 10px;
}
.cc-dc-bathroom-goldStar {
  color: #f6b900;
  font-size: 28px;
  line-height: 1;
}
.cc-dc-bathroom-ratingSummary strong {
  color: #586171;
  font-size: 34px;
  font-weight: 700;
  line-height: 1;
}
.cc-dc-bathroom-ratingReviewCount {
  margin: 10px 0 24px;
  color: #7e8797;
  font-size: 14px;
  line-height: 1.4;
}
.cc-dc-bathroom-ratingBars {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 15px;
}
.cc-dc-bathroom-ratingBarRow {
  display: grid;
  width: 100%;
  grid-template-columns: 34px minmax(0, 1fr) 43px;
  gap: 10px;
  align-items: center;
}
.cc-dc-bathroom-ratingLabel {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  color: #596273;
  font-size: 14px;
  line-height: 1;
}
.cc-dc-bathroom-ratingLabel span {
  color: #f6b900;
}
.cc-dc-bathroom-ratingTrack {
  display: block;
  width: 100%;
  height: 6px;
  overflow: hidden;
  border-radius: 999px;
  background: #d4d4d4;
}
.cc-dc-bathroom-ratingFill {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: #ef1b23;
}
.cc-dc-bathroom-ratingPercent {
  color: #7c8595;
  font-size: 13px;
  text-align: right;
}
@media  (max-width: 760px)  {
.cc-dc-bathroom-modalOverlay {
    padding: 0;
    align-items: flex-end;
  }
.cc-dc-bathroom-modal {
    width: 100%;
    height: min(640px, 92dvh);
    max-height: 92dvh;
    border-width: 1px 0 0;
    border-radius: 20px 20px 0 0;
  }
.cc-dc-bathroom-modalHeader {
    min-height: 125px;
    padding: 22px 18px 18px;
  }
.cc-dc-bathroom-modalHeader h2 {
    font-size: 23px;
  }
.cc-dc-bathroom-modalHeader p {
    margin-top: 7px;
    font-size: 12px;
  }
.cc-dc-bathroom-modalBody {
    padding: 20px 15px 28px;
  }
.cc-dc-bathroom-pricingGrid {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
    gap: 8px;
  }
.cc-dc-bathroom-priceCard {
    min-height: 142px;
    padding: 12px;
  }
.cc-dc-bathroom-optionLabel {
    font-size: 13px;
  }
.cc-dc-bathroom-priceCard strong {
    margin-top: 15px;
    font-size: 15px;
  }
.cc-dc-bathroom-priceCard button {
    min-width: 76px;
    min-height: 39px;
    padding: 0 14px;
    font-size: 13px;
  }
.cc-dc-bathroom-modalSection h3 {
    font-size: 17px;
  }
.cc-dc-bathroom-processList {
    gap: 15px;
  }
.cc-dc-bathroom-processList strong {
    font-size: 14px;
  }
.cc-dc-bathroom-processList p {
    font-size: 12px;
  }
.cc-dc-bathroom-simpleList li {
    font-size: 13px;
  }
.cc-dc-bathroom-ratingSummary strong {
    font-size: 31px;
  }
.cc-dc-bathroom-goldStar {
    font-size: 25px;
  }
.cc-dc-bathroom-ratingBarRow {
    grid-template-columns:
      31px
      minmax(0, 1fr)
      38px;
    gap: 8px;
  }
}
.cc-dc-bathroom-modal {
  box-sizing: border-box !important;

  width: 560px !important;
  max-width: calc(100vw - 32px) !important;

  height: 650px !important;
  max-height: calc(100dvh - 70px) !important;

  min-height: 0 !important;

  overflow: hidden !important;

  border-radius: 16px !important;
}
.cc-dc-bathroom-modalBody {
  min-height: 0 !important;

  flex: 1 1 auto !important;

  overflow-x: hidden !important;
  overflow-y: auto !important;

  overscroll-behavior: contain !important;

  scrollbar-width: none !important;
  -ms-overflow-style: none !important;

  -webkit-overflow-scrolling: touch !important;
}
.cc-dc-bathroom-modalBody::-webkit-scrollbar {
  display: none !important;

  width: 0 !important;
  height: 0 !important;
}
@media  (max-width: 620px)  {
.cc-dc-bathroom-modalOverlay {
    box-sizing: border-box !important;

    padding: 0 !important;

    align-items: stretch !important;
    justify-content: stretch !important;
  }
.cc-dc-bathroom-modal {
    width: 100% !important;
    max-width: 100% !important;

    height: 100dvh !important;
    max-height: 100dvh !important;

    border-radius: 0 !important;
  }
}
.cc-dc-bathroom-modal {
  box-sizing: border-box !important;
  display: flex !important;
  flex-direction: column !important;
  width: min(480px, calc(100vw - 32px)) !important;
  min-width: 0 !important;
  max-width: calc(100vw - 32px) !important;
  height: min(660px, calc(100dvh - 48px)) !important;
  min-height: 0 !important;
  max-height: calc(100dvh - 48px) !important;
  overflow: hidden !important;
  border-radius: 16px !important;
}
.cc-dc-bathroom-modalHeader {
  box-sizing: border-box !important;
  flex: 0 0 auto !important;
  min-height: 0 !important;
  padding: 20px 22px 18px !important;
}
.cc-dc-bathroom-modalHeader h2 {
  font-size: 26px !important;
  line-height: 1.2 !important;
}
.cc-dc-bathroom-modalBody {
  box-sizing: border-box !important;
  flex: 1 1 auto !important;
  min-width: 0 !important;
  min-height: 0 !important;
  padding: 16px 22px 20px !important;
  overflow-x: hidden !important;
  overflow-y: auto !important;
}
.cc-dc-bathroom-pricingGrid {
  display: grid !important;
  width: 100% !important;
  grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  gap: 8px !important;
}
.cc-dc-bathroom-priceCard {
  box-sizing: border-box !important;
  width: 100% !important;
  min-width: 0 !important;
  height: auto !important;
  min-height: 90px !important;
  max-height: none !important;
  padding: 9px !important;
}
.cc-dc-bathroom-priceCard strong {
  margin-top: 3px !important;
  color: #171717 !important;
}
.cc-dc-bathroom-priceCard button {
  min-width: 66px !important;
  min-height: 30px !important;
  height: 30px !important;
  margin-top: auto !important;
  padding: 0 9px !important;
  font-size: 12px !important;
}
.cc-dc-bathroom-priceCard:has(button[aria-pressed="true"]) {
  border-color: #ef1b23 !important;
  background: #fff8f9 !important;
}
.cc-dc-bathroom-priceCard button[aria-pressed="true"] {
  background: #ef1b23 !important;
  color: #ffffff !important;
}
.cc-dc-bathroom-selectionFooter {
  box-sizing: border-box;
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  padding: 10px 22px;
  border-top: 1px solid #eeeeee;
  background: #ffffff;
}
.cc-dc-bathroom-selectionSummary {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 3px;
}
.cc-dc-bathroom-selectionCaption {
  color: #737373;
  font-size: 12px;
}
.cc-dc-bathroom-selectionValue {
  overflow: hidden;
  color: #171717;
  font-size: 14px;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cc-dc-bathroom-continueButton {
  flex: 0 0 auto;
  min-width: 118px;
  min-height: 42px;
  padding: 8px 14px;
  border: 1px solid #ef1b23;
  border-radius: 10px;
  background: #ef1b23;
  color: #ffffff;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}
.cc-dc-bathroom-continueButton:disabled {
  border-color: #e3e3e3;
  background: #f2f3f5;
  color: #999999;
  cursor: not-allowed;
}
@media  (max-width: 620px)  {
.cc-dc-bathroom-modal {
    width: calc(100vw - 20px) !important;
    max-width: calc(100vw - 20px) !important;
    height: calc(100dvh - 20px) !important;
    max-height: calc(100dvh - 20px) !important;
    border-radius: 16px !important;
  }
.cc-dc-bathroom-modalHeader {
    padding: 18px 16px 16px !important;
  }
.cc-dc-bathroom-modalHeader h2 {
    font-size: 23px !important;
  }
.cc-dc-bathroom-modalBody {
    padding: 16px 14px !important;
  }
.cc-dc-bathroom-pricingGrid {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 8px !important;
  }
.cc-dc-bathroom-priceCard {
    min-height: 90px !important;
    padding: 9px !important;
  }
.cc-dc-bathroom-selectionFooter {
    padding: 10px 14px calc(10px + env(safe-area-inset-bottom));
  }
.cc-dc-bathroom-continueButton {
    min-width: 108px;
    min-height: 40px;
  }
}
.cc-dc-bathroom-quantityControl {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: space-between;
  min-width: 104px;
  height: 46px;
  border: 1px solid #ef1b23;
  border-radius: 10px;
  color: #171717;
  background: #fff;
  font-size: 16px;
}
.cc-dc-bathroom-quantityControl button {
  width: 34px;
  height: 44px;
  border: 0;
  background: transparent;
  color: #ef1b23;
  cursor: pointer;
  font: inherit;
  font-size: 21px;
}
.cc-dc-bathroom-quantityControl button:focus-visible {
  outline: 2px solid #ef1b23;
  outline-offset: 2px;
}
@media  (max-width: 760px)  {
.cc-dc-bathroom-quantityControl {
    min-width: 88px;
    height: 42px;
  }
.cc-dc-bathroom-quantityControl button {
    width: 29px;
    height: 40px;
  }
}
.cc-dc-detailsPage { position: static; display: block; width: 100%; min-height: 100vh; background: #fff; color: #171717; }
.cc-dc-detailsInner { box-sizing: border-box; width: min(928px, calc(100% - 32px)); margin: 0 auto; padding: 28px 0 90px; }
.cc-dc-detailsInner .cc-dc-bathroom-modalHeader { display: flex; flex-direction: column; align-items: flex-start; gap: 40px; min-height: 0; padding: 0 0 30px; border-bottom: 1px solid #ececec; }
.cc-dc-detailsInner .cc-dc-bathroom-modalHeader h1 { margin: 0; font-size: clamp(28px, 3vw, 40px); }
.cc-dc-detailsBack { order: -1; padding: 0; border: 0; background: transparent; color: #ef1b23; font-size: 17px; font-weight: 700; cursor: pointer; }
.cc-dc-detailsInner .cc-dc-bathroom-modalBody { display: block; height: auto; max-height: none; overflow: visible; padding: 30px 0 0; }
.cc-dc-detailsInner .cc-dc-bathroom-pricingGrid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.cc-dc-detailsInner .cc-dc-bathroom-selectionFooter { position: static; width: 100%; margin-top: 36px; }
.cc-dc-detailsInner .cc-dc-bathroom-modalSection h2 { margin: 0 0 19px; color: #5c6678; font-size: 18px; }
@media (max-width: 700px) { .cc-dc-detailsInner { padding: 20px 0 64px; } .cc-dc-detailsInner .cc-dc-bathroom-pricingGrid { grid-template-columns: repeat(2, minmax(0, 1fr)); } .cc-dc-detailsInner .cc-dc-bathroom-modalHeader { gap: 28px; } }
@media (max-width: 420px) { .cc-dc-detailsInner .cc-dc-bathroom-pricingGrid { grid-template-columns: 1fr; } }
`;
