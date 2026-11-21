"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { services, money, DEEP_CLEANING_INLINE_CSS, type Service, type Option } from "./IndustrialCleaningSection";
import { upsertServiceCartItem } from "@/app/services/serviceCart";
const CATEGORY = "industrial-cleaning";
const PAGE_CSS = ".cc-dc-detailsPage {\n  position: static !important;\n  display: block !important;\n  width: 100% !important;\n  min-height: 100vh;\n  height: auto !important;\n  max-height: none !important;\n  overflow: visible !important;\n  background: #fff;\n  color: #171717;\n}\n\n.cc-dc-detailsInner {\n  box-sizing: border-box !important;\n  display: block !important;\n  width: calc(100% - 384px) !important;\n  max-width: 1400px !important;\n  min-width: 0 !important;\n  height: auto !important;\n  max-height: none !important;\n  margin: 0 auto !important;\n  padding: 28px 0 90px !important;\n  overflow: visible !important;\n}\n\n.cc-dc-detailsInner [class*=\"-modalHeader\"] {\n  display: flex !important;\n  flex-direction: column !important;\n  align-items: flex-start !important;\n  justify-content: flex-start !important;\n  gap: 54px !important;\n  height: auto !important;\n  min-height: 0 !important;\n  padding: 0 0 32px !important;\n  border-bottom: 1px solid #ececec;\n}\n\n.cc-dc-detailsInner [class*=\"-modalHeader\"] h2 {\n  font-size: clamp(28px, 3vw, 40px);\n}\n\n.cc-dc-detailsInner .cc-dc-detailsBack {\n  order: -1 !important;\n  align-self: flex-start !important;\n  position: static !important;\n  border: 0;\n  padding: 0;\n  background: transparent;\n  color: #ef1b23;\n  font-size: 17px;\n  font-weight: 700;\n  cursor: pointer;\n  white-space: normal;\n}\n\n.cc-dc-detailsInner [class*=\"-modalBody\"] {\n  display: block !important;\n  position: static !important;\n  width: 100% !important;\n  height: auto !important;\n  max-height: none !important;\n  min-height: 0 !important;\n  padding: 30px 0 0 !important;\n  overflow: visible !important;\n  overscroll-behavior: auto !important;\n}\n\n.cc-dc-detailsInner [class*=\"-pricingGrid\"] {\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n}\n\n.cc-dc-detailsInner [class*=\"-selectionFooter\"] {\n  position: static !important;\n  width: 100% !important;\n  height: auto !important;\n  max-height: none !important;\n  margin-top: 36px;\n}\n\n@media (max-width: 1199px) {\n  .cc-dc-detailsInner {\n    width: calc(100% - 96px) !important;\n  }\n}\n\n@media (max-width: 700px) {\n  .cc-dc-detailsInner {\n    width: calc(100% - 32px) !important;\n    padding: 20px 0 64px !important;\n  }\n\n  .cc-dc-detailsInner [class*=\"-pricingGrid\"] {\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n  }\n\n  .cc-dc-detailsInner [class*=\"-modalHeader\"] {\n    gap: 28px !important;\n  }\n}\n\n@media (max-width: 420px) {\n  .cc-dc-detailsInner [class*=\"-pricingGrid\"] {\n    grid-template-columns: 1fr;\n  }\n}";

export default function IndustrialServiceDetails({
  serviceId,
}: {
  serviceId: string;
}) {
  const router = useRouter();
  const service = services.find((item) => item.id === serviceId);
  const onClose = () => router.push("/services/deep-cleaning?category=" + CATEGORY);
  const onAdd = (item: Service, option: Option) => {
    upsertServiceCartItem({
      id: `${CATEGORY}:${item.id}:${option.id}`,
      serviceTitle: item.title,
      optionLabel: option.label,
      price: option.price,
      priceLabel: money(option.price),
      duration: "Professional cleaning service",
    });
    onClose();
  };
  const [selected, setSelected] = useState<Option | null>(null);


  if (!service) return null;

  return (
    <>
    <style>{DEEP_CLEANING_INLINE_CSS + PAGE_CSS}</style>
    <div
      className="cc-dc-detailsPage"
    >
      <section
        className="cc-dc-detailsInner"
        aria-labelledby={`industrial-modal-${service.id}`}
      >
        <header className={"cc-dc-industrial-modalHeader"}>
          <div>
            <h2 id={`industrial-modal-${service.id}`}>{service.title}</h2>
            <p>
              {service.directAdd
                ? (service.directAdd ? `Site survey: ${money(500)}. Final cleaning rate is confirmed after the survey.` : `Starts at ${money(service.options[0].price)}`)
                : "Choose the option that matches your cleaning requirement."}
            </p>
          </div>
          <button type="button" className="cc-dc-detailsBack" onClick={onClose}>← Back to Industrial Cleaning</button>
        </header>

        <div className={"cc-dc-industrial-modalBody"}>
          {!service.directAdd && (
            <section className={"cc-dc-industrial-modalSection"}>
              <h3>{service.pricingTitle}</h3>
              <div className={"cc-dc-industrial-pricingGrid"}>
                {service.options.map((option) => (
                  <article key={option.id} className={"cc-dc-industrial-priceCard"}>
                    <span className={"cc-dc-industrial-optionLabel"}>{option.label}</span>
                    <strong>{money(option.price)}</strong>
                    <button
                      type="button"
                      aria-pressed={selected?.id === option.id}
                      onClick={() => setSelected((current) => current?.id === option.id ? null : option)}
                    >
                      Select
                    </button>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section className={"cc-dc-industrial-modalSection"}>
            <h3>How it works?</h3>
            <ol className={"cc-dc-industrial-processList"}>
              {service.process.map((step, index) => (
                <li key={step.title}>
                  <span className={"cc-dc-industrial-processNumber"}>{index + 1}.</span>
                  <div><strong>{step.title}</strong><p>{step.description}</p></div>
                </li>
              ))}
            </ol>
          </section>

          {!!service.included?.length && (
            <section className={"cc-dc-industrial-modalSection"}>
              <h3>Included</h3>
              <ul className={"cc-dc-industrial-simpleList"}>
                {service.included.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
          )}

          {!!service.excluded?.length && (
            <section className={"cc-dc-industrial-modalSection"}>
              <h3>Not Included</h3>
              <ul className={"cc-dc-industrial-simpleList"}>
                {service.excluded.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
          )}

          {!!service.perfectFor?.length && (
            <section className={"cc-dc-industrial-modalSection"}>
              <h3>Perfect For</h3>
              <ul className={"cc-dc-industrial-simpleList"}>
                {service.perfectFor.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
          )}
          <section className={"cc-dc-industrial-ratingSection"} aria-label={`${service.title} customer rating`}>
            <div className={"cc-dc-industrial-ratingSummary"}>
              <span className={"cc-dc-industrial-goldStar"} aria-hidden="true">{"\u2605"}</span>
              <strong>{service.rating.toFixed(1)}</strong>
            </div>
            {service.reviews > 0 && (<p className={"cc-dc-industrial-ratingReviewCount"}>{service.reviews.toLocaleString("en-IN")} reviews</p>)}
            <div className={"cc-dc-industrial-ratingBars"}>
              {service.distribution.map((percentage, index) => (
                <div className={"cc-dc-industrial-ratingBarRow"} key={5 - index}>
                  <span className={"cc-dc-industrial-ratingLabel"}>
                    {5 - index}<span aria-hidden="true">{"\u2605"}</span>
                  </span>
                  <span className={"cc-dc-industrial-ratingTrack"}>
                    <span className={"cc-dc-industrial-ratingFill"} style={{ width: `${percentage}%` }} />
                  </span>
                  <span className={"cc-dc-industrial-ratingPercent"}>{percentage}%</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {!service.directAdd && (
          <footer className={"cc-dc-industrial-selectionFooter"}>
            <div className={"cc-dc-industrial-selectionSummary"}>
              <span className={"cc-dc-industrial-selectionCaption"}>Total</span>
              <strong className={"cc-dc-industrial-selectionValue"}>{selected ? money(selected.price) : "Select an option"}</strong>
            </div>
            <button
              type="button"
              className={"cc-dc-industrial-continueButton"}
              disabled={!selected}
              onClick={() => {
                if (selected) onAdd(service, selected);
              }}
            >
              Continue
            </button>
          </footer>
        )}
      </section>
    </div>
    </>
  );
}

