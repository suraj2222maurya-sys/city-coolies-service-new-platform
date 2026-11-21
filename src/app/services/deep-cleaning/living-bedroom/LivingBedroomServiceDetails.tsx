"use client";

import { useState } from "react";
import { upsertServiceCartItem } from "@/app/services/serviceCart";

import {
  type CleaningService,
  type PriceOption,
  formatCurrency,
} from "./LivingBedroomCleaningSection";
type ServiceModalProps = {
  service: CleaningService;
  onClose: () => void;
};

export default function LivingBedroomServiceDetails({
  service,
  onClose,
}: ServiceModalProps) {

  /* CITY_COOLIES_LIVING_SELECTION_STATE_START */
  const [selectedOption, setSelectedOption] =
    useState<PriceOption | null>(null);


  /* CITY_COOLIES_LIVING_SELECTION_STATE_END */

  const commitSelectedOption = (
    option: PriceOption,
  ) => {
    upsertServiceCartItem({
      id:
        `living-bedroom:${service.id}:${option.id}`,
      serviceTitle:
        service.title,
      optionLabel:
        option.label,
      price:
        option.price,
      priceLabel:
        formatCurrency(
          option.price,
        ),
      duration:
        "Professional cleaning service",
    });

    if (window.matchMedia("(max-width: 760px)").matches) {
      window.sessionStorage.setItem("citycoolies:living-scroll-cart", "1");
    }

    onClose();
  };

  return (
    <div
      className="cc-dc-living-detailsPage"
    >
<style>{`
  .cc-dc-living-backRow {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    width: 100%;
    margin: 0 0 56px;
  }

  .cc-dc-living-backRow .cc-dc-living-pageBack {
    color: #ef1b23;
    font-size: 17px;
    font-weight: 650;
    text-align: left;
  }

  .cc-dc-living-backRow > span {
    color: #666;
    font-size: 14px;
  }

  @media (max-width: 600px) {
    .cc-dc-living-backRow {
      margin-bottom: 32px;
    }

    .cc-dc-living-backRow > span {
      display: none;
    }
  }
`}</style>
<div className="cc-dc-living-backRow">
  <button
  type="button"
  className="cc-dc-living-pageBack"
  onClick={onClose}
>
  ← Back to Living &amp; Bedroom
</button>
  <span>City Coolies · Deep Cleaning</span>
</div>
<style>{`
  .cc-dc-living-detailsPage {
    display: block !important;
    position: static !important;
    width: min(1100px, calc(100% - 32px)) !important;
    max-width: 100% !important;
    height: auto !important;
    max-height: none !important;
    min-height: 0 !important;
    margin: 0 auto !important;
    padding: 28px 0 80px !important;
    overflow: visible !important;
    background: #fff !important;
  }

  .cc-dc-living-detailsPage .cc-dc-living-detailsContent,
  .cc-dc-living-detailsPage .cc-dc-living-modalBody {
    display: block !important;
    position: static !important;
    width: 100% !important;
    height: auto !important;
    max-height: none !important;
    overflow: visible !important;
    flex: none !important;
  }

  .cc-dc-living-detailsPage .cc-dc-living-modalHeader {
    display: flex !important;
    align-items: flex-start !important;
    justify-content: space-between !important;
    gap: 20px !important;
  }

  .cc-dc-living-detailsPage .cc-dc-living-pageBack {
    flex-shrink: 0;
    border: 0;
    background: transparent;
    color: #ef1b23;
    font: inherit;
    font-weight: 650;
    cursor: pointer;
  }

  .cc-dc-living-detailsPage .cc-dc-living-selectionFooter {
    position: fixed !important;
    left: 50% !important;
    right: auto !important;
    bottom: 16px !important;
    z-index: 1100 !important;
    box-sizing: border-box !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    gap: 12px !important;
    width: min(720px, calc(100% - 32px)) !important;
    height: auto !important;
    min-height: 68px !important;
    max-height: none !important;
    margin: 0 !important;
    padding: 10px 18px !important;
    transform: translateX(-50%) !important;
    border: 1px solid #eeeeee !important;
    border-radius: 14px !important;
    background: #ffffff !important;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12) !important;
}

.cc-dc-living-detailsPage .cc-dc-living-selectionSummary {
    display: flex;
    min-width: 0;
    flex-direction: column;
    gap: 4px;
}

.cc-dc-living-detailsPage .cc-dc-living-selectionCaption {
    color: #737373;
    font-size: 12px;
}

.cc-dc-living-detailsPage .cc-dc-living-selectionValue {
    color: #171717;
    font-size: 16px;
    font-weight: 700;
}

.cc-dc-living-detailsPage .cc-dc-living-continueButton {
    display: inline-flex;
    flex: 0 0 auto;
    min-width: 118px;
    min-height: 44px;
    align-items: center;
    justify-content: center;
    padding: 8px 18px;
    border: 1px solid #ef1b23;
    border-radius: 10px;
    background: #ef1b23;
    color: #ffffff;
    font: inherit;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
}

.cc-dc-living-detailsPage .cc-dc-living-priceCard button[aria-pressed="true"] {
    background: #ef1b23 !important;
    color: #ffffff !important;
}

@media (max-width: 600px) {
    .cc-dc-living-detailsPage .cc-dc-living-selectionFooter {
        bottom: calc(10px + env(safe-area-inset-bottom)) !important;
        width: calc(100% - 24px) !important;
        min-height: 62px !important;
        padding: 9px 12px !important;
        border-radius: 12px !important;
    }

    .cc-dc-living-detailsPage .cc-dc-living-continueButton {
        min-width: 104px;
        min-height: 40px;
        padding: 8px 12px;
        font-size: 14px;
    }
}

  @media (max-width: 600px) {
    .cc-dc-living-detailsPage .cc-dc-living-modalHeader {
      flex-direction: column !important;
    }
  }
`}</style>
      <section
        className="cc-dc-living-detailsContent"
        aria-labelledby={`living-bedroom-modal-${service.id}`}
      >
        <header
          className={
            "cc-dc-living-modalHeader"
          }
        >
          <div>
            <h2
              id={`living-bedroom-modal-${service.id}`}
            >
              {service.title}
            </h2>

            <p>
              Choose the option that matches your cleaning requirement.
            </p>
          </div>

          
        </header>

        <div
          className={
            "cc-dc-living-modalBody"
          }
        >
          <section
            className={
              "cc-dc-living-modalSection"
            }
          >
            <h3>
              {service.pricingTitle}
            </h3>

            <div
              className={
                "cc-dc-living-pricingGrid"
              }
            >
              {service.options.map(
                (option) => (
                  <article
                    key={
                      option.id
                    }
                    className={
                      "cc-dc-living-priceCard"
                    }
                  >
                    <span
                      className={
                        "cc-dc-living-optionLabel"
                      }
                    >
                      {
                        option.label
                      }
                    </span>

                    <strong>
                      {formatCurrency(
                        option.price,
                      )}
                    </strong>

                    <button
                      type="button"
                      aria-pressed={selectedOption?.id === option.id}
                      onClick={() => setSelectedOption((current) => current?.id === option.id ? null : option)}
                    >
                Select
              </button>
                  </article>
                ),
              )}
            </div>
          </section>

          <section
            className={
              "cc-dc-living-modalSection"
            }
          >
            <h3>
              Process
            </h3>

            <ol
              className={
                "cc-dc-living-processList"
              }
            >
              {service.process.map(
                (
                  step,
                  index,
                ) => (
                  <li
                    key={
                      step.title
                    }
                  >
                    <span
                      className={
                        "cc-dc-living-processNumber"
                      }
                    >
                      {index + 1}.
                    </span>

                    <div>
                      <strong>
                        {
                          step.title
                        }
                      </strong>

                      <p>
                        {
                          step.description
                        }
                      </p>
                    </div>
                  </li>
                ),
              )}
            </ol>
          </section>

          {service.included &&
            service.included.length >
              0 && (
              <section
                className={
                  "cc-dc-living-modalSection"
                }
              >
                <h3>
                  Included
                </h3>

                <ul
                  className={
                    "cc-dc-living-simpleList"
                  }
                >
                  {service.included.map(
                    (item) => (
                      <li
                        key={
                          item
                        }
                      >
                        {item}
                      </li>
                    ),
                  )}
                </ul>
              </section>
            )}

          {service.excluded &&
            service.excluded.length >
              0 && (
              <section
                className={
                  "cc-dc-living-modalSection"
                }
              >
                <h3>
                  What&apos;s not included?
                </h3>

                <ul
                  className={
                    "cc-dc-living-simpleList"
                  }
                >
                  {service.excluded.map(
                    (item) => (
                      <li
                        key={
                          item
                        }
                      >
                        {item}
                      </li>
                    ),
                  )}
                </ul>
              </section>
            )}

          <section
            className={
              "cc-dc-living-ratingSection"
            }
            aria-label={`${service.title} customer rating`}
          >
            <div
              className={
                "cc-dc-living-ratingSummary"
              }
            >
              <span
                className={
                  "cc-dc-living-goldStar"
                }
                aria-hidden="true"
              >
                ★
              </span>

              <strong>
                {service.rating.toFixed(
                  1,
                )}
              </strong>
            </div>

            <p
              className={
                "cc-dc-living-ratingReviewCount"
              }
            >
              {service.reviews.toLocaleString(
                "en-IN",
              )}{" "}
              reviews
            </p>

            <div
              className={
                "cc-dc-living-ratingBars"
              }
            >
              {service.ratingBars.map(
                (row) => (
                  <div
                    key={
                      row.stars
                    }
                    className={
                      "cc-dc-living-ratingBarRow"
                    }
                  >
                    <span
                      className={
                        "cc-dc-living-ratingLabel"
                      }
                    >
                      {row.stars}

                      <span
                        aria-hidden="true"
                      >
                        ★
                      </span>
                    </span>

                    <span
                      className={
                        "cc-dc-living-ratingTrack"
                      }
                    >
                      <span
                        className={
                          "cc-dc-living-ratingFill"
                        }
                        style={{
                          width: `${row.percentage}%`,
                        }}
                      />
                    </span>

                    <span
                      className={
                        "cc-dc-living-ratingPercent"
                      }
                    >
                      {
                        row.percentage
                      }
                      %
                    </span>
                  </div>
                ),
              )}
            </div>
          </section>
        </div>
      
        {/* CITY_COOLIES_LIVING_CONTINUE_FOOTER_START */}
        {selectedOption && (<footer className={"cc-dc-living-selectionFooter"}>
          <div className={"cc-dc-living-selectionSummary"}>
            <span className={"cc-dc-living-selectionCaption"}>Total</span>

            <strong className={"cc-dc-living-selectionValue"}>{selectedOption ? formatCurrency(selectedOption.price) : "Select an option"}</strong>
          </div>

          <button
            type="button"
            className={"cc-dc-living-continueButton"}
            disabled={!selectedOption}
            onClick={() => {
              if (selectedOption) {
                commitSelectedOption(selectedOption);
              }
            }}
          >
            Continue
          </button>
        </footer>)}
        {/* CITY_COOLIES_LIVING_CONTINUE_FOOTER_END */}

</section>
    </div>
  );
}

