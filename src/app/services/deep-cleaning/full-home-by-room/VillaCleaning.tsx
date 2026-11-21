"use client";
import Link from "next/link";

const FULL_HOME_DETAILS_PATH =
  "/services/deep-cleaning?category=full-home-by-room&service=";

const styles = {
  modal_overlay: "cc-villa-modal_overlay",
  modal_modal: "cc-villa-modal_modal",
  modal_closeButton: "cc-villa-modal_closeButton",
  modal_scrollArea: "cc-villa-modal_scrollArea",
  modal_header: "cc-villa-modal_header",
  modal_title: "cc-villa-modal_title",
  modal_priceRow: "cc-villa-modal_priceRow",
  modal_squareFootRate: "cc-villa-modal_squareFootRate",
  modal_content: "cc-villa-modal_content",
  modal_sectionTitle: "cc-villa-modal_sectionTitle",
  modal_description: "cc-villa-modal_description",
  modal_surveyList: "cc-villa-modal_surveyList",
  modal_surveyItem: "cc-villa-modal_surveyItem",
  modal_check: "cc-villa-modal_check",
  modal_includedSection: "cc-villa-modal_includedSection",
  modal_includedTitle: "cc-villa-modal_includedTitle",
  modal_includedList: "cc-villa-modal_includedList",
  modal_includedNote: "cc-villa-modal_includedNote",
  modal_ratingBreakdownSection: "cc-villa-modal_ratingBreakdownSection",
  modal_ratingSummary: "cc-villa-modal_ratingSummary",
  modal_ratingScoreRow: "cc-villa-modal_ratingScoreRow",
  modal_ratingMainStar: "cc-villa-modal_ratingMainStar",
  modal_ratingScore: "cc-villa-modal_ratingScore",
  modal_ratingReviewCount: "cc-villa-modal_ratingReviewCount",
  modal_ratingBars: "cc-villa-modal_ratingBars",
  modal_ratingBarRow: "cc-villa-modal_ratingBarRow",
  modal_ratingBarLabel: "cc-villa-modal_ratingBarLabel",
  modal_ratingSmallStar: "cc-villa-modal_ratingSmallStar",
  modal_ratingTrack: "cc-villa-modal_ratingTrack",
  modal_ratingFill: "cc-villa-modal_ratingFill",
  modal_ratingPercentage: "cc-villa-modal_ratingPercentage",
  modal_footer: "cc-villa-modal_footer",
  modal_footerLabel: "cc-villa-modal_footerLabel",
  modal_footerPrice: "cc-villa-modal_footerPrice",
  modal_confirmButton: "cc-villa-modal_confirmButton",
  section: "cc-villa-section",
  serviceList: "cc-villa-serviceList",
  serviceGroup: "cc-villa-serviceGroup",
  sectionTitle: "cc-villa-sectionTitle",
  subSectionTitle: "cc-villa-subSectionTitle",
  apartmentService: "cc-villa-apartmentService",
  promoBanner: "cc-villa-promoBanner",
  imagePending: "cc-villa-imagePending",
  bestValue: "cc-villa-bestValue",
  serviceDetails: "cc-villa-serviceDetails",
  serviceHeader: "cc-villa-serviceHeader",
  serviceInformation: "cc-villa-serviceInformation",
  serviceTitle: "cc-villa-serviceTitle",
  ratingRow: "cc-villa-ratingRow",
  ratingIcon: "cc-villa-ratingIcon",
  reviewText: "cc-villa-reviewText",
  detailsButton: "cc-villa-detailsButton",
  ratingDetailsButton: "cc-villa-ratingDetailsButton",
  priceRow: "cc-villa-priceRow",
  addButton: "cc-villa-addButton",
  divider: "cc-villa-divider",
  features: "cc-villa-features",
  modal_serviceFeatures: "cc-villa-modal_serviceFeatures",
} as const;

type VillaSurveyModalProps = {
  serviceId: string;
  serviceTitle: string;
  buttonClassName: string;
  buttonLabel?: string;
};

export function VillaSurveyModal({
  serviceId,
  buttonClassName,
  buttonLabel = "Add",
}: VillaSurveyModalProps) {
  if (!serviceId) {
    return null;
  }

  return (
    <Link
      href={`${FULL_HOME_DETAILS_PATH}${serviceId}`}
      className={buttonClassName}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        textDecoration: "none",
      }}
    >
      {buttonLabel}
    </Link>
  );
}

type FurnishingType =
  | "furnished"
  | "unfurnished";

type HomeCleaningService = {
  id: string;
  furnishingType: FurnishingType;
  groupTitle: string;
  title: string;
  promoTitle: string;
  promoDescription: string;
  rating: number | null;
  reviews: string;
  price: string;
  originalPrice?: string;
  duration: string;
  badge?: string;
  imagePending?: boolean;
  features: readonly string[];
};

export const homeCleaningServices: readonly HomeCleaningService[] = [
  {
    id: "furnished-villa-cleaning",
    furnishingType: "furnished",
    groupTitle: "Villa cleaning",

    title:
      "Furnished villa cleaning",

promoTitle:
      "Furnished villa cleaning",

    promoDescription:
      "Premium deep cleaning for furnished and occupied villas.",

    rating: 4.2,
    reviews: "900 reviews",

    price: "₹500",
    duration: "Site survey",

    imagePending: true,

    features: [
      "Detailed deep cleaning for furnished and occupied villas",
      "Machine floor scrubbing and detailed cleaning across rooms, kitchen, bathrooms, staircase and balconies",
    ],
  },
  {
    id: "unfurnished-villa-cleaning",
    furnishingType: "unfurnished",
    groupTitle: "Villa cleaning",

    title:
      "Unfurnished villa cleaning",

promoTitle:
      "Unfurnished villa cleaning",

    promoDescription:
      "Professional deep cleaning for vacant or unfurnished villas.",

    rating: 4.2,
    reviews: "900 reviews",

    price: "₹500",
    duration: "Site survey",

    imagePending: true,

    features: [
      "Detailed deep cleaning for vacant or unfurnished villas",
      "Machine floor scrubbing and detailed cleaning across rooms, kitchen, bathrooms, staircase and balconies",
    ],
  },
];

type VillaCleaningProps = {
  furnishingType?: FurnishingType;
};

export default function VillaCleaning({
  furnishingType = "unfurnished",
}: VillaCleaningProps) {
  const visibleServices =
    homeCleaningServices.filter(
      (service) =>
        service.furnishingType ===
        furnishingType,
    );

  return (
    <section
      id="villa-cleaning-section"
      data-service-scroll-target
      className={styles.section}
      aria-label={
        furnishingType === "furnished"
          ? "Furnished home cleaning services"
          : "Unfurnished home cleaning services"
      }
    >
      <style>{VILLA_CSS}</style>
      <div className={styles.serviceList}>
        {visibleServices.map(
          (service, index) => (
            <div
              key={service.id}
              className={styles.serviceGroup}
            >
              <h2
                className={
                  index === 0
                    ? styles.sectionTitle
                    : styles.subSectionTitle
                }
              >
                {service.groupTitle}
              </h2>

              <article
                className={styles.apartmentService}
              >
                <div
                  data-service-id={service.id}
                  className={`${styles.promoBanner} ${
                    service.imagePending
                      ? styles.imagePending
                      : ""
                  }`}
                >
                  {service.badge ? (
                    <span
                      className={styles.bestValue}
                    >
                      {service.badge}
                    </span>
                  ) : null}

</div>

                <div
                  className={
                    styles.serviceDetails
                  }
                >
                  <div
                    className={
                      styles.serviceHeader
                    }
                  >
                    <div
                      className={
                        styles.serviceInformation
                      }
                    >
                      <h3
                        className={styles.serviceTitle}
                      >
                        {service.title}
                      </h3>

                      {service.rating !==
                      null ? (
                        <div
                          className={
                            styles.ratingRow
                          }
                        >
                          <span
                            className={
                              styles.ratingIcon
                            }
                            aria-hidden="true"
                          >
                            ★
                          </span>

                          <span>
                            {service.rating.toFixed(1)}
                          </span>

                          {service.reviews ? (
                            <span
                              className={
                                styles.reviewText
                              }
                            >
                              (
                              {
                                service.reviews
                              }
                              )
                            </span>
                          ) : null}

                        

                        <VillaSurveyModal
                            serviceId={
                              service.id
                            }
                            serviceTitle={
                              service.title
                            }
                            buttonClassName={`${styles.detailsButton} ${styles.ratingDetailsButton}`}
                            buttonLabel="View details"
                          /></div>
                      ) : null}

                      <div
                        className={
                          styles.priceRow
                        }
                      >
                        <strong>
                            Site survey charges ₹500
                          </strong>
                      </div>
                    </div>

                    <VillaSurveyModal
                        serviceId={service.id}
                        serviceTitle={service.title}
                        buttonClassName={styles.addButton}
                      />
                  </div>

                  
                </div>
              </article>
            </div>
          ),
        )}
      </div>
    </section>
  );
}

export const VILLA_CSS = String.raw`
.cc-villa-section {
  width: 100%;
}

.cc-villa-sectionTitle {
  margin: 8px 0 32px;

  color: #151515;

  font-size: 32px;
  font-weight: 700;
  line-height: 1.18;

  letter-spacing: -0.025em;
}

.cc-villa-serviceList {
  display: flex;
  flex-direction: column;
  gap: 34px;
}

.cc-villa-apartmentService {
  width: 100%;
}

.cc-villa-promoBanner {
  position: relative;

  box-sizing: border-box;

  width: 100%;
  min-height: 250px;

  overflow: hidden;

  border: 1px solid #f3ccd2;
  border-radius: 12px;

  background-color: #fff7f8;

  background-image:
    linear-gradient(
      90deg,
      rgba(255, 247, 248, 0.96) 0%,
      rgba(255, 247, 248, 0.91) 26%,
      rgba(255, 247, 248, 0.74) 42%,
      rgba(255, 247, 248, 0.35) 57%,
      rgba(255, 247, 248, 0.08) 73%,
      rgba(255, 247, 248, 0) 100%
    ),
    url("/deep-cleaning/sunlit_living_room_cleaning_service.webp");

  background-repeat: no-repeat, no-repeat;

  background-position:
    center,
    right center;

  background-size:
    100% 100%,
    cover;
}

.cc-villa-bestValue {
  position: absolute;

  top: 0;
  left: 20px;

  z-index: 2;

  display: inline-flex;

  min-height: 35px;

  padding: 0 15px;

  align-items: center;
  justify-content: center;

  border-radius: 0 0 7px 7px;

  background: #ef1b23;

  color: #ffffff;

  font-size: 13px;
  font-weight: 700;
  line-height: 1;
}

.cc-villa-promoContent {
  position: relative;
  z-index: 1;

  box-sizing: border-box;

  display: flex;

  min-height: 250px;

  padding: 58px 24px 24px;

  flex-direction: column;
  justify-content: center;
}

.cc-villa-promoHeading {
  width: min(58%, 330px);

  margin: 0;

  color: #111111;

  font-size: 27px;
  font-weight: 700;
  line-height: 1.16;

  letter-spacing: -0.015em;
}

.cc-villa-promoPrice {
  display: flex;

  width: min(62%, 390px);

  margin-top: 5px;

  flex-wrap: wrap;

  align-items: baseline;

  gap: 9px;
}

.cc-villa-promoPrice strong {
  color: #111111;

  font-size: 25px;
  font-weight: 700;
  line-height: 1.18;
}

.cc-villa-originalPrice {
  color: #666666;

  font-size: 20px;
  font-weight: 500;

  line-height: 1.2;

  text-decoration: line-through;
  text-decoration-thickness: 1.5px;
}

.cc-villa-promoDescription {
  width: min(55%, 320px);

  margin: 14px 0 0;

  color: #464646;

  font-size: 14.5px;
  font-weight: 400;
  line-height: 1.45;
}

.cc-villa-serviceDetails {
  padding: 20px 0 31px;

  border-bottom: 1px solid #e5e5e5;
}

.cc-villa-serviceHeader {
  display: flex;

  align-items: flex-start;
  justify-content: space-between;

  gap: 22px;
}

.cc-villa-serviceInformation {
  min-width: 0;
  flex: 1;
}

.cc-villa-serviceTitle {
  max-width: 370px;

  margin: 0;

  color: #171717;

  font-size: 18px;
  font-weight: 700;
  line-height: 1.4;
}

.cc-villa-ratingRow {
  display: flex;

  margin-top: 8px;

  align-items: center;

  gap: 5px;

  color: #626262;

  font-size: 13px;
  line-height: 1.3;
}

.cc-villa-ratingIcon {
  display: inline-flex;

  width: 17px;
  height: 17px;

  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: #ef1b23;

  color: #ffffff;

  font-size: 9px;
}

.cc-villa-reviewText {
  text-decoration: underline;
  text-decoration-style: dotted;
  text-underline-offset: 3px;
}

.cc-villa-priceRow {
  display: flex;

  margin-top: 11px;

  flex-wrap: wrap;

  align-items: center;

  gap: 9px;

  color: #666666;

  font-size: 13px;
  line-height: 1.4;
}

.cc-villa-priceRow strong {
  color: #171717;
}

.cc-villa-addButton {
  min-width: 86px;
  min-height: 42px;

  padding: 8px 20px;

  border: 1px solid #ef1b23;
  border-radius: 9px;

  background: #ffffff;

  color: #ef1b23;

  font-size: 15px;
  font-weight: 600;

  cursor: pointer;
}

.cc-villa-addButton:hover {
  background: #ef1b23;
  color: #ffffff;
}

.cc-villa-divider {
  width: 100%;
  height: 1px;

  margin: 18px 0 14px;

  border-top: 1px dashed #eadadd;
}

.cc-villa-features {
  margin: 0;

  padding-left: 22px;

  color: #606060;

  font-size: 13.5px;
  line-height: 1.55;
}

.cc-villa-detailsButton {
  margin-top: 14px;

  padding: 0;

  border: 0;

  background: transparent;

  color: #ef1b23;

  font-size: 15px;
  font-weight: 600;

  cursor: pointer;
}

.cc-villa-addButton:focus-visible,
.cc-villa-detailsButton:focus-visible {
  outline: 2px solid #ef1b23;
  outline-offset: 3px;
}

@media (max-width: 760px) {
  .cc-villa-sectionTitle {
    margin-bottom: 22px;
    font-size: 27px;
  }

  .cc-villa-serviceList {
    gap: 28px;
  }

  .cc-villa-promoBanner {
    min-height: 220px;

    background-image:
      linear-gradient(
        90deg,
        rgba(255, 247, 248, 0.97) 0%,
        rgba(255, 247, 248, 0.90) 36%,
        rgba(255, 247, 248, 0.62) 54%,
        rgba(255, 247, 248, 0.18) 75%,
        rgba(255, 247, 248, 0) 100%
      ),
      url("/deep-cleaning/sunlit_living_room_cleaning_service.webp");
  }

  .cc-villa-promoContent {
    min-height: 220px;

    padding: 50px 16px 18px;
  }

  .cc-villa-promoHeading {
    width: 63%;

    font-size: 20px;
  }

  .cc-villa-promoPrice {
    width: 68%;

    gap: 6px;
  }

  .cc-villa-promoPrice strong {
    font-size: 18px;
  }

  .cc-villa-originalPrice {
    font-size: 15px;
  }

  .cc-villa-promoDescription {
    width: 62%;

    margin-top: 10px;

    font-size: 12.5px;
  }

  .cc-villa-serviceHeader {
    gap: 12px;
  }

  .cc-villa-serviceTitle {
    font-size: 16px;
  }

  .cc-villa-addButton {
    min-width: 72px;
    min-height: 39px;

    padding: 7px 15px;
  }
}

/* CITY_COOLIES_BANNER_TEXT_SIZE_START */

.cc-villa-promoHeading {
  font-size: 23px;
  font-weight: 600;
  line-height: 1.18;
}

.cc-villa-promoPrice strong {
  font-size: 21px;
  font-weight: 600;
  line-height: 1.2;
}

.cc-villa-originalPrice {
  font-size: 18px;
  font-weight: 500;
}

@media (max-width: 760px) {
  .cc-villa-promoHeading {
    font-size: 18px;
    font-weight: 600;
  }

  .cc-villa-promoPrice strong {
    font-size: 17px;
    font-weight: 600;
  }

  .cc-villa-originalPrice {
    font-size: 15px;
  }
}

/* CITY_COOLIES_BANNER_TEXT_SIZE_END */

/* CITY_COOLIES_UNFURNISHED_SERVICES_START */

.cc-villa-serviceGroup {
  width: 100%;
}

.cc-villa-serviceGroup + .cc-villa-serviceGroup {
  margin-top: 42px;
}

.cc-villa-subSectionTitle {
  margin: 0 0 28px;

  color: #151515;

  font-size: 28px;
  font-weight: 700;
  line-height: 1.18;

  letter-spacing: -0.02em;
}

/*
 * Unfurnished service banner images will be added later.
 * For now keep the content clean and image-free.
 */
.cc-villa-promoBanner.imagePending {
  background-color: #fff7f8 !important;
  background-image: none !important;
}

.cc-villa-promoBanner.imagePending .cc-villa-promoHeading,
.cc-villa-promoBanner.imagePending .cc-villa-promoPrice,
.cc-villa-promoBanner.imagePending .cc-villa-promoDescription {
  width: min(82%, 430px);
}

@media (max-width: 760px) {
  .cc-villa-serviceGroup + .cc-villa-serviceGroup {
    margin-top: 34px;
  }

  .cc-villa-subSectionTitle {
    margin-bottom: 22px;
    font-size: 24px;
  }

  .cc-villa-promoBanner.imagePending .cc-villa-promoHeading,
  .cc-villa-promoBanner.imagePending .cc-villa-promoPrice,
  .cc-villa-promoBanner.imagePending .cc-villa-promoDescription {
    width: 88%;
  }
}

/* CITY_COOLIES_UNFURNISHED_SERVICES_END */

/* CITY_COOLIES_FURNISHED_SERVICES_START */

.cc-villa-serviceGroup {
  width: 100%;
}

.cc-villa-serviceGroup + .cc-villa-serviceGroup {
  margin-top: 8px;
}

.cc-villa-subSectionTitle {
  margin:
    8px
    0
    32px;

  color: #151515;

  font-size: 32px;
  font-weight: 700;
  line-height: 1.18;

  letter-spacing: -0.025em;
}

/*
 * For now, use the same direct banner background image
 * that is already used on the existing unfurnished banner.
 * No separate inner image/card should appear.
 */
.cc-villa-imagePending {
  background-color: #fff7f8 !important;

  background-image:
    linear-gradient(
      90deg,
      rgba(255, 247, 248, 0.96) 0%,
      rgba(255, 247, 248, 0.91) 26%,
      rgba(255, 247, 248, 0.74) 42%,
      rgba(255, 247, 248, 0.35) 57%,
      rgba(255, 247, 248, 0.08) 73%,
      rgba(255, 247, 248, 0) 100%
    ),
    url("/deep-cleaning/sunlit_living_room_cleaning_service.webp") !important;

  background-repeat: no-repeat, no-repeat !important;

  background-position:
    center,
    right center !important;

  background-size:
    100% 100%,
    cover !important;
}

.cc-villa-imagePending .cc-villa-promoHeading {
  width: min(58%, 330px);
}

.cc-villa-imagePending .cc-villa-promoPrice {
  width: min(62%, 390px);
}

.cc-villa-imagePending .cc-villa-promoDescription {
  width: min(55%, 320px);
}

/*
 * Keep both Furnished service sections visually separated
 * without changing the full layout.
 */
.cc-villa-serviceGroup + .cc-villa-serviceGroup::before {
  display: block;

  width: 100%;
  height: 1px;

  margin:
    4px
    0
    34px;

  background: #f2dde0;

  content: "";
}

@media (max-width: 760px) {
  .cc-villa-subSectionTitle {
    margin-bottom: 22px;

    font-size: 27px;
  }

  .cc-villa-serviceGroup + .cc-villa-serviceGroup::before {
    margin-bottom: 26px;
  }

  .cc-villa-imagePending {
    background-image:
      linear-gradient(
        90deg,
        rgba(255, 247, 248, 0.97) 0%,
        rgba(255, 247, 248, 0.90) 36%,
        rgba(255, 247, 248, 0.62) 54%,
        rgba(255, 247, 248, 0.18) 75%,
        rgba(255, 247, 248, 0) 100%
      ),
      url("/deep-cleaning/sunlit_living_room_cleaning_service.webp") !important;

    background-repeat: no-repeat, no-repeat !important;

    background-position:
      center,
      right center !important;

    background-size:
      100% 100%,
      cover !important;
  }

  .cc-villa-imagePending .cc-villa-promoHeading {
    width: 63%;
  }

  .cc-villa-imagePending .cc-villa-promoPrice {
    width: 68%;
  }

  .cc-villa-imagePending .cc-villa-promoDescription {
    width: 62%;

    margin-top: 10px;

    font-size: 12.5px;
  }
}

/* CITY_COOLIES_FURNISHED_SERVICES_END */

/* CITY_COOLIES_FURNISHED_BACKGROUND_FINAL_START */

/*
 * Furnished service banner:
 * use the same direct background image as the
 * existing Empty Home banner.
 *
 * This intentionally overrides the earlier
 * imagePending background-image: none rule.
 */
.cc-villa-promoBanner.imagePending {
  background-color: #fff7f8 !important;

  background-image:
    linear-gradient(
      90deg,
      rgba(255, 247, 248, 0.96) 0%,
      rgba(255, 247, 248, 0.91) 26%,
      rgba(255, 247, 248, 0.74) 42%,
      rgba(255, 247, 248, 0.35) 57%,
      rgba(255, 247, 248, 0.08) 73%,
      rgba(255, 247, 248, 0) 100%
    ),
    url("/deep-cleaning/sunlit_living_room_cleaning_service.webp") !important;

  background-repeat:
    no-repeat,
    no-repeat !important;

  background-position:
    center,
    right center !important;

  background-size:
    100% 100%,
    cover !important;
}

.cc-villa-promoBanner.imagePending .cc-villa-promoHeading {
  width: min(58%, 330px);
}

.cc-villa-promoBanner.imagePending .cc-villa-promoPrice {
  width: min(62%, 390px);
}

.cc-villa-promoBanner.imagePending .cc-villa-promoDescription {
  width: min(55%, 320px);
}

@media (max-width: 760px) {
  .cc-villa-promoBanner.imagePending {
    background-image:
      linear-gradient(
        90deg,
        rgba(255, 247, 248, 0.98) 0%,
        rgba(255, 247, 248, 0.94) 34%,
        rgba(255, 247, 248, 0.72) 52%,
        rgba(255, 247, 248, 0.30) 72%,
        rgba(255, 247, 248, 0.06) 100%
      ),
      url("/deep-cleaning/sunlit_living_room_cleaning_service.webp") !important;

    background-repeat:
      no-repeat,
      no-repeat !important;

    background-position:
      center,
      right center !important;

    background-size:
      100% 100%,
      cover !important;
  }

  .cc-villa-promoBanner.imagePending .cc-villa-promoHeading {
    width: 63%;
  }

  .cc-villa-promoBanner.imagePending .cc-villa-promoPrice {
    width: 68%;
  }

  .cc-villa-promoBanner.imagePending .cc-villa-promoDescription {
    width: 62%;
  }
}

/* CITY_COOLIES_FURNISHED_BACKGROUND_FINAL_END */

/* CITY_COOLIES_FURNISHED_TEXT_SIZE_FINAL_START */

/*
 * Furnished banner text only.
 * Smaller typography with reduced font weight.
 */
.cc-villa-promoBanner.imagePending .cc-villa-promoHeading {
  font-size: 20px !important;
  font-weight: 550 !important;
  line-height: 1.2 !important;
  letter-spacing: -0.01em !important;
}

.cc-villa-promoBanner.imagePending .cc-villa-promoPrice strong {
  font-size: 18px !important;
  font-weight: 550 !important;
  line-height: 1.2 !important;
}

.cc-villa-promoBanner.imagePending .cc-villa-originalPrice {
  font-size: 16px !important;
  font-weight: 450 !important;
  line-height: 1.2 !important;
}

@media (max-width: 760px) {
  .cc-villa-promoBanner.imagePending .cc-villa-promoHeading {
    font-size: 17px !important;
    font-weight: 550 !important;
  }

  .cc-villa-promoBanner.imagePending .cc-villa-promoPrice strong {
    font-size: 16px !important;
    font-weight: 550 !important;
  }

  .cc-villa-promoBanner.imagePending .cc-villa-originalPrice {
    font-size: 14px !important;
    font-weight: 450 !important;
  }
}

/* CITY_COOLIES_FURNISHED_TEXT_SIZE_FINAL_END */

/* CITY_COOLIES_FURNISHED_APARTMENT_TITLE_WEIGHT_START */

.cc-villa-furnishedApartmentTitle {
  font-weight: 500 !important;
}

/* CITY_COOLIES_FURNISHED_APARTMENT_TITLE_WEIGHT_END */

/* CITY_COOLIES_FURNISHED_TITLE_SIZE_START */

.cc-villa-furnishedApartmentTitle {
  font-size: 16px !important;
  font-weight: 500 !important;
  line-height: 1.35 !important;
}

@media (max-width: 760px) {
  .cc-villa-furnishedApartmentTitle {
    font-size: 15px !important;
    line-height: 1.35 !important;
  }
}

/* CITY_COOLIES_FURNISHED_TITLE_SIZE_END */

/* CITY_COOLIES_FURNISHED_RATING_DETAILS_START */

.cc-villa-ratingDetailsButton {
  flex: 0 0 auto;

  margin-top: 0 !important;
  margin-left: 5px !important;

  padding: 0 !important;

  font-size: 13px !important;
  font-weight: 600 !important;
  line-height: 1.3 !important;

  white-space: nowrap;
}

@media (max-width: 760px) {
  .cc-villa-ratingDetailsButton {
    margin-left: 3px !important;

    font-size: 12px !important;
  }
}

/* CITY_COOLIES_FURNISHED_RATING_DETAILS_END */

/* CITY_COOLIES_FURNISHED_GAP_FIX_START */

/* Remove the unnecessary empty space after Furnished Apartment */
.cc-villa-serviceGroup:first-child .cc-villa-serviceDetails {
  padding-bottom: 8px !important;
  border-bottom: 0 !important;
}

/* Remove the unused dashed divider from the first Furnished service */
.cc-villa-serviceGroup:first-child .cc-villa-divider {
  display: none !important;
}

/* Remove the extra separator line added before Bungalow/Duplex */
.cc-villa-serviceGroup + .cc-villa-serviceGroup::before {
  display: none !important;
  content: none !important;
}

/* Bring the next Furnished service upward */
.cc-villa-serviceGroup + .cc-villa-serviceGroup {
  margin-top: 18px !important;
}

/* Prevent the service list itself from adding another large gap */
.cc-villa-serviceList {
  gap: 0 !important;
}

@media (max-width: 760px) {
  .cc-villa-serviceGroup:first-child .cc-villa-serviceDetails {
    padding-bottom: 6px !important;
  }

  .cc-villa-serviceGroup + .cc-villa-serviceGroup {
    margin-top: 14px !important;
  }
}

/* CITY_COOLIES_FURNISHED_GAP_FIX_END */

/* CITY_COOLIES_FURNISHED_THIN_SEPARATOR_START */

/*
 * Thin separator below Furnished Apartment
 * price / duration area.
 */
.cc-villa-serviceGroup:has(.cc-villa-furnishedApartmentTitle) .cc-villa-serviceHeader {
  padding-bottom: 14px !important;

  border-bottom:
    1px solid rgba(40, 40, 40, 0.12) !important;
}

@media (max-width: 760px) {
  .cc-villa-serviceGroup:has(.cc-villa-furnishedApartmentTitle) .cc-villa-serviceHeader {
    padding-bottom: 12px !important;
  }
}

/* CITY_COOLIES_FURNISHED_THIN_SEPARATOR_END */

/* CITY_COOLIES_FURNISHED_BANNER_CLEAR_OVERRIDE_START */

/*
  Keep the furnished banner image fully clear.
  No faded overlay, no dull look, no blur effect.
*/
.cc-villa-promoBanner.imagePending {
  background-color: #fff7f8 !important;
  background-image: url("/deep-cleaning/sunlit_living_room_cleaning_service.webp") !important;
  background-repeat: no-repeat !important;
  background-position: center center !important;
  background-size: cover !important;
}

/* CITY_COOLIES_FURNISHED_BANNER_CLEAR_OVERRIDE_END */

/* CITY_COOLIES_FULL_APARTMENT_CLEAR_BANNER_START */

/*
  Full apartment banner:
  - clear original image
  - no faded gradient
  - no blur layer
  - same presentation for Furnished and Unfurnished
  - badge remains untouched
*/

.cc-villa-serviceGroup:first-child .cc-villa-promoBanner {
  background-color: #fff7f8 !important;

  background-image:
    url("/deep-cleaning/sunlit_living_room_cleaning_service.webp") !important;

  background-repeat:
    no-repeat !important;

  background-position:
    center center !important;

  background-size:
    cover !important;
}

@media (max-width: 760px) {
  .cc-villa-serviceGroup:first-child .cc-villa-promoBanner {
    background-image:
      url("/deep-cleaning/sunlit_living_room_cleaning_service.webp") !important;

    background-repeat:
      no-repeat !important;

    background-position:
      center center !important;

    background-size:
      cover !important;
  }
}

/* CITY_COOLIES_FULL_APARTMENT_CLEAR_BANNER_END */

/* CITY_COOLIES_BUNGALOW_TITLE_SIZE_START */

/*
  Only Full bungalow/duplex service title.
  Keeps the apartment title and all other content unchanged.
*/
.cc-villa-serviceGroup + .cc-villa-serviceGroup .cc-villa-serviceTitle {
  max-width: 360px;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.35;
  letter-spacing: -0.01em;
}

@media (max-width: 760px) {
  .cc-villa-serviceGroup + .cc-villa-serviceGroup .cc-villa-serviceTitle {
    max-width: 100%;
    font-size: 15px;
    line-height: 1.35;
  }
}

/* CITY_COOLIES_BUNGALOW_TITLE_SIZE_END */

/* CITY_COOLIES_BUNGALOW_DIRECT_BANNER_START */

/*
  Furnished + Unfurnished Full bungalow/duplex banner.

  The image is applied directly to the existing promo banner.
  No inner card.
  No additional image wrapper.
  No gradient overlay.
  No blur.
*/

.cc-villa-serviceGroup + .cc-villa-serviceGroup .cc-villa-promoBanner {
  background-color: #fff7f8 !important;

  background-image:
    url("/deep-cleaning/furnished-bungalow-duplex-cleaning-banner.webp") !important;

  background-repeat:
    no-repeat !important;

  background-position:
    center center !important;

  background-size:
    cover !important;
}

@media (max-width: 760px) {
  .cc-villa-serviceGroup + .cc-villa-serviceGroup .cc-villa-promoBanner {
    background-image:
      url("/deep-cleaning/furnished-bungalow-duplex-cleaning-banner.webp") !important;

    background-repeat:
      no-repeat !important;

    background-position:
      center center !important;

    background-size:
      cover !important;
  }
}

/* CITY_COOLIES_BUNGALOW_DIRECT_BANNER_END */

/* CITY_COOLIES_BUNGALOW_COMPACT_CARD_START */

/*
  Full bungalow/duplex only.

  Remove the old lower description/features area
  and the unnecessary empty vertical space.

  Keep:
  - title
  - rating/reviews
  - View details
  - survey price
  - Add button
*/

.cc-villa-serviceGroup + .cc-villa-serviceGroup
.cc-villa-serviceDetails > .cc-villa-divider {
  display: none !important;
}

.cc-villa-serviceGroup + .cc-villa-serviceGroup
.cc-villa-serviceDetails > .cc-villa-features {
  display: none !important;
}

.cc-villa-serviceGroup + .cc-villa-serviceGroup
.cc-villa-serviceDetails > .cc-villa-detailsButton {
  display: none !important;
}

.cc-villa-serviceGroup + .cc-villa-serviceGroup
.cc-villa-serviceDetails {
  padding-bottom: 8px !important;

  border-bottom: 0 !important;
}

.cc-villa-serviceGroup + .cc-villa-serviceGroup
.cc-villa-serviceHeader {
  margin-bottom: 0 !important;

  padding-bottom: 4px !important;
}

.cc-villa-serviceGroup + .cc-villa-serviceGroup
.cc-villa-apartmentService {
  margin-bottom: 0 !important;

  padding-bottom: 0 !important;
}

@media (max-width: 760px) {
  .cc-villa-serviceGroup + .cc-villa-serviceGroup
  .cc-villa-serviceDetails {
    padding-bottom: 6px !important;
  }

  .cc-villa-serviceGroup + .cc-villa-serviceGroup
  .cc-villa-serviceHeader {
    padding-bottom: 3px !important;
  }
}

/* CITY_COOLIES_BUNGALOW_COMPACT_CARD_END */

/* CITY_COOLIES_VILLA_BANNER_LOCK_START */

/*
  Exact Villa Cleaning banner lock.

  Applies only to:
  - Furnished Villa Cleaning
  - Unfurnished Villa Cleaning

  This selector intentionally has higher specificity
  than the old generic bungalow banner rule.
*/

.cc-villa-serviceGroup
> .cc-villa-apartmentService
> .cc-villa-promoBanner[data-service-id="furnished-villa-cleaning"],
.cc-villa-serviceGroup
> .cc-villa-apartmentService
> .cc-villa-promoBanner[data-service-id="unfurnished-villa-cleaning"] {
  box-sizing: border-box !important;

  width: 100% !important;

  height: auto !important;
  min-height: 0 !important;

  aspect-ratio:
    1932 / 814 !important;

  margin: 0 !important;
  padding: 0 !important;

  overflow: hidden !important;

  background-color:
    #fff7f8 !important;

  background-image:
    url("/deep-cleaning/villa-cleaning-banner.webp") !important;

  background-repeat:
    no-repeat !important;

  background-position:
    center center !important;

  background-size:
    contain !important;
}

/*
  Villa banner must remain image-only.
*/
.cc-villa-serviceGroup
> .cc-villa-apartmentService
> .cc-villa-promoBanner[data-service-id="furnished-villa-cleaning"]
.cc-villa-promoContent,
.cc-villa-serviceGroup
> .cc-villa-apartmentService
> .cc-villa-promoBanner[data-service-id="unfurnished-villa-cleaning"]
.cc-villa-promoContent {
  display: none !important;
}

/*
  No promotional badge over the Villa image.
*/
.cc-villa-serviceGroup
> .cc-villa-apartmentService
> .cc-villa-promoBanner[data-service-id="furnished-villa-cleaning"]
.cc-villa-bestValue,
.cc-villa-serviceGroup
> .cc-villa-apartmentService
> .cc-villa-promoBanner[data-service-id="unfurnished-villa-cleaning"]
.cc-villa-bestValue {
  display: none !important;
}

/* Tablet */
@media (max-width: 900px) {
  .cc-villa-serviceGroup
  > .cc-villa-apartmentService
  > .cc-villa-promoBanner[data-service-id="furnished-villa-cleaning"],
  .cc-villa-serviceGroup
  > .cc-villa-apartmentService
  > .cc-villa-promoBanner[data-service-id="unfurnished-villa-cleaning"] {
    width: 100% !important;

    height: auto !important;
    min-height: 0 !important;

    aspect-ratio:
      1932 / 814 !important;

    background-size:
      contain !important;
  }
}

/* Phone */
@media (max-width: 620px) {
  .cc-villa-serviceGroup
  > .cc-villa-apartmentService
  > .cc-villa-promoBanner[data-service-id="furnished-villa-cleaning"],
  .cc-villa-serviceGroup
  > .cc-villa-apartmentService
  > .cc-villa-promoBanner[data-service-id="unfurnished-villa-cleaning"] {
    width: 100% !important;

    height: auto !important;
    min-height: 0 !important;

    aspect-ratio:
      1932 / 814 !important;

    background-size:
      contain !important;
  }
}

/* CITY_COOLIES_VILLA_BANNER_LOCK_END */

/* CITY_COOLIES_APARTMENT_MOBILE_RATING_FIX_START */

@media (max-width: 760px) {

  .cc-villa-serviceGroup:first-child .cc-villa-ratingRow {
    display: flex !important;

    width: 100% !important;

    flex-direction: row !important;
    flex-wrap: nowrap !important;

    align-items: center !important;
    justify-content: flex-start !important;

    gap: 5px !important;

    margin-top: 9px !important;

    font-size: 12px !important;
    line-height: 1.3 !important;

    white-space: nowrap !important;
  }

  .cc-villa-serviceGroup:first-child .cc-villa-ratingIcon {
    display: inline-flex !important;

    width: 18px !important;
    height: 18px !important;

    min-width: 18px !important;

    flex: 0 0 18px !important;

    align-items: center !important;
    justify-content: center !important;
  }

  .cc-villa-serviceGroup:first-child .cc-villa-ratingRow > span {
    flex-shrink: 0 !important;
    white-space: nowrap !important;
  }

  .cc-villa-serviceGroup:first-child .cc-villa-reviewText {
    display: inline !important;

    width: auto !important;
    max-width: none !important;

    flex: 0 0 auto !important;

    font-size: 12px !important;
    line-height: 1.3 !important;

    white-space: nowrap !important;
    overflow-wrap: normal !important;
    word-break: normal !important;
  }

  .cc-villa-serviceGroup:first-child .cc-villa-ratingDetailsButton {
    display: inline-flex !important;

    width: auto !important;

    flex: 0 0 auto !important;

    align-items: center !important;

    margin: 0 0 0 5px !important;
    padding: 0 !important;

    font-size: 12px !important;
    line-height: 1.3 !important;

    white-space: nowrap !important;
  }
}

/* CITY_COOLIES_APARTMENT_MOBILE_RATING_FIX_END */

/* CITY_COOLIES_SERVICE_BANNER_MAPPING_START */

/* Furnished and Unfurnished Bungalow/Duplex */
.cc-villa-promoBanner[data-service-id="furnished-bungalow-duplex"],
.cc-villa-promoBanner[data-service-id="unfurnished-bungalow-duplex"] {
    background-image: url("/deep-cleaning/furnished-bungalow-duplex-cleaning-banner.webp") !important;
    background-repeat: no-repeat !important;
    background-position: center center !important;
    background-size: cover !important;
}

/* Furnished and Unfurnished Villa Cleaning */
.cc-villa-promoBanner[data-service-id="furnished-villa-cleaning"],
.cc-villa-promoBanner[data-service-id="unfurnished-villa-cleaning"] {
    background-image: url("/deep-cleaning/villa-cleaning-banner.webp") !important;
    background-repeat: no-repeat !important;
    background-position: center center !important;
    background-size: contain !important;
    aspect-ratio: 1932 / 814 !important;
    min-height: 0 !important;
}

/* CITY_COOLIES_SERVICE_BANNER_MAPPING_END */

/* Service-specific modal styles */
.cc-villa-modal_overlay {
  position: fixed;
  inset: 0;
  z-index: 5000;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 24px;

  background: rgba(16, 16, 16, 0.72);
  backdrop-filter: blur(2px);
}

.cc-villa-modal_modal {
  position: relative;

  display: flex;
  flex-direction: column;

  width: min(560px, calc(100vw - 32px));
  max-height: min(720px, calc(100dvh - 48px));

  overflow: hidden;

  border: 1px solid #f2d9dd;
  border-radius: 18px;

  background: #ffffff;

  box-shadow:
    0 24px 70px rgba(0, 0, 0, 0.22);
}

.cc-villa-modal_closeButton {
  position: absolute;
  top: 14px;
  right: 14px;

  z-index: 3;

  display: inline-flex;

  width: 42px;
  height: 42px;

  align-items: center;
  justify-content: center;

  padding: 0;

  border: 1px solid #eeeeee;
  border-radius: 50%;

  background: #ffffff;
  color: #171717;

  font-size: 28px;
  font-weight: 400;
  line-height: 1;

  cursor: pointer;

  box-shadow:
    0 6px 18px rgba(0, 0, 0, 0.09);
}

.cc-villa-modal_scrollArea {
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;

  scrollbar-width: thin;
  scrollbar-color: #d4d4d4 transparent;
}

.cc-villa-modal_header {
  padding:
    34px
    72px
    27px
    28px;

  border-bottom: 1px solid #eeeeee;
}

.cc-villa-modal_title {
  max-width: 430px;

  margin: 0;

  color: #111111;

  font-size: 26px;
  font-weight: 700;
  line-height: 1.24;

  letter-spacing: -0.025em;
}

.cc-villa-modal_priceRow {
  display: flex;

  margin-top: 13px;

  align-items: baseline;
  gap: 8px;

  color: #4d4d4d;

  font-size: 15px;
  line-height: 1.4;
}

.cc-villa-modal_priceRow strong {
  color: #ef1b23;

  font-size: 18px;
  font-weight: 700;
}

.cc-villa-modal_content {
  padding: 28px;
}

.cc-villa-modal_sectionTitle {
  margin: 0;

  color: #151515;

  font-size: 23px;
  font-weight: 700;
  line-height: 1.25;
}

.cc-villa-modal_description {
  max-width: 470px;

  margin:
    10px
    0
    24px;

  color: #565656;

  font-size: 15px;
  line-height: 1.55;
}

.cc-villa-modal_surveyList {
  display: grid;
  gap: 13px;
}

.cc-villa-modal_surveyItem {
  display: flex;

  min-height: 52px;

  align-items: center;
  gap: 12px;

  padding:
    12px
    14px;

  border: 1px solid #f3dfe2;
  border-radius: 12px;

  background: #fffafa;

  color: #222222;

  font-size: 15px;
  font-weight: 600;
  line-height: 1.4;
}

.cc-villa-modal_check {
  display: inline-flex;

  width: 28px;
  height: 28px;

  flex: 0 0 28px;

  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: #fff0f2;
  color: #ef1b23;

  font-size: 17px;
  font-weight: 800;
}

.cc-villa-modal_note {
  margin-top: 22px;

  padding:
    14px
    16px;

  border-left: 3px solid #ef1b23;
  border-radius: 0 10px 10px 0;

  background: #fff6f7;

  color: #535353;

  font-size: 13.5px;
  line-height: 1.5;
}

.cc-villa-modal_footer {
  display: flex;

  flex: 0 0 auto;

  align-items: center;
  justify-content: space-between;

  gap: 18px;

  padding:
    15px
    20px;

  border-top: 1px solid #eeeeee;

  background: #ffffff;
}

.cc-villa-modal_footerLabel {
  display: block;

  color: #777777;

  font-size: 12px;
  line-height: 1.3;
}

.cc-villa-modal_footerPrice {
  display: block;

  margin-top: 2px;

  color: #151515;

  font-size: 18px;
  font-weight: 700;
  line-height: 1.2;
}

.cc-villa-modal_confirmButton {
  min-height: 46px;

  padding:
    10px
    22px;

  border: 1px solid #ef1b23;
  border-radius: 10px;

  background: #ef1b23;
  color: #ffffff;

  font: inherit;
  font-size: 15px;
  font-weight: 700;

  cursor: pointer;
}

.cc-villa-modal_confirmButton:hover {
  background: #d9141c;
}

.cc-villa-modal_closeButton:focus-visible,
.cc-villa-modal_confirmButton:focus-visible {
  outline: 2px solid #ef1b23;
  outline-offset: 3px;
}

@media (max-width: 760px) {
  .cc-villa-modal_overlay {
    align-items: flex-end;

    padding:
      16px
      10px;
  }

  .cc-villa-modal_modal {
    width: 100%;
    max-height: calc(100dvh - 32px);

    border-radius: 18px;
  }

  .cc-villa-modal_header {
    padding:
      29px
      62px
      23px
      20px;
  }

  .cc-villa-modal_title {
    font-size: 21px;
    line-height: 1.28;
  }

  .cc-villa-modal_priceRow {
    margin-top: 10px;

    font-size: 14px;
  }

  .cc-villa-modal_priceRow strong {
    font-size: 17px;
  }

  .cc-villa-modal_content {
    padding:
      23px
      20px;
  }

  .cc-villa-modal_sectionTitle {
    font-size: 20px;
  }

  .cc-villa-modal_description {
    font-size: 14px;
  }

  .cc-villa-modal_surveyItem {
    min-height: 48px;

    padding:
      11px
      12px;

    font-size: 14px;
  }

  .cc-villa-modal_footer {
    padding:
      13px
      16px;

    gap: 12px;
  }

  .cc-villa-modal_confirmButton {
    min-height: 44px;

    padding:
      9px
      17px;

    font-size: 14px;
  }
}

/* CITY_COOLIES_BUNGALOW_MATCH_APARTMENT_SIZE_START */

/*
  Match the existing Apartment Requirements popup exactly.

  Desktop:
  width  = 472px
  height = 635px

  Phone:
  full viewport width and height.
*/

@media (min-width: 621px) {
  .cc-villa-modal_overlay {
    align-items: center !important;

    padding:
      24px
      20px !important;
  }

  .cc-villa-modal_modal {
    position: relative;

    width: 472px !important;
    max-width: 472px !important;

    height: 635px !important;
    max-height: calc(100dvh - 92px) !important;

    top: 34px;

    margin: 0;

    border-radius: 16px !important;
  }

  .cc-villa-modal_scrollArea {
    min-height: 0;

    overflow-x: hidden;
    overflow-y: auto;
  }
}

@media (max-width: 620px) {
  .cc-villa-modal_overlay {
    position: fixed !important;
    inset: 0 !important;
    z-index: 5000 !important;

    display: flex !important;
    align-items: stretch !important;
    justify-content: stretch !important;

    box-sizing: border-box !important;
    width: 100% !important;
    height: 100dvh !important;
    min-height: 0 !important;

    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
  }

  .cc-villa-modal_modal {
    position: relative !important;
    inset: auto !important;

    display: flex !important;
    flex-direction: column !important;
    flex: 1 1 auto !important;

    box-sizing: border-box !important;
    width: 100% !important;
    max-width: 100% !important;

    height: 100% !important;
    min-height: 0 !important;
    max-height: 100% !important;

    margin: 0 !important;
    padding: 0 !important;

    overflow: hidden !important;
    border-radius: 0 !important;
  }

  .cc-villa-modal_scrollArea {
    display: block !important;
    flex: 1 1 0% !important;

    min-height: 0 !important;
    max-height: none !important;

    overflow-x: hidden !important;
    overflow-y: auto !important;

    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
  }

  .cc-villa-modal_footer {
    position: relative !important;
    z-index: 5 !important;

    display: flex !important;
    flex: 0 0 auto !important;

    box-sizing: border-box !important;
    width: 100% !important;

    margin: 0 !important;
    padding: 12px 16px !important;
    padding-bottom: max(12px, env(safe-area-inset-bottom)) !important;

    background: #ffffff !important;
    border-top: 1px solid #eeeeee !important;
  }

  .cc-villa-modal_confirmButton {
    flex-shrink: 0 !important;
  }
}
/* CITY_COOLIES_BUNGALOW_MATCH_APARTMENT_SIZE_END */

/* CITY_COOLIES_SQFT_RATE_START */

.cc-villa-modal_squareFootRate {
  margin: 5px 0 0;

  color: #666666;

  font-size: 13px;
  font-weight: 500;
  line-height: 1.35;
}

/* CITY_COOLIES_SQFT_RATE_END */

/* CITY_COOLIES_BUNGALOW_CLEANING_IMAGES_START */

.cc-villa-modal_cleaningVisualGrid {
  display: grid;

  grid-template-columns:
    repeat(3, minmax(0, 1fr));

  gap:
    18px
    12px;

  margin:
    28px
    0
    0;

  padding: 0;
}

.cc-villa-modal_cleaningVisualItem {
  display: block;

  min-width: 0;

  margin: 0;
  padding: 0;

  border: 0;
  border-radius: 0;

  background: transparent;

  box-shadow: none;
}

.cc-villa-modal_cleaningVisualImage {
  display: block;

  width: 100%;
  height: auto;

  aspect-ratio: 1 / 1;

  object-fit: cover;
  object-position: center;

  margin: 0;
  padding: 0;

  border: 0;
  border-radius: 0;

  background: transparent;

  box-shadow: none;
  outline: 0;

  filter: none;
  transform: none;
}

.cc-villa-modal_cleaningVisualName {
  margin:
    8px
    0
    0;

  padding: 0;

  color: #181818;

  font-size: 13px;
  font-weight: 600;
  line-height: 1.35;

  text-align: left;
}

@media (max-width: 620px) {
  .cc-villa-modal_cleaningVisualGrid {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));

    gap:
      18px
      12px;

    margin-top: 24px;
  }

  .cc-villa-modal_cleaningVisualName {
    margin-top: 7px;

    font-size: 12.5px;
  }
}

/* CITY_COOLIES_BUNGALOW_CLEANING_IMAGES_END */

/* CITY_COOLIES_BUNGALOW_INCLUDED_START */

.cc-villa-modal_includedSection {
  margin:
    30px
    0
    6px;

  padding:
    24px
    24px
    22px;

  border:
    1px
    solid
    #f2d8dd;

  border-radius:
    14px;

  background:
    #fff6f7;
}

.cc-villa-modal_includedTitle {
  margin:
    0
    0
    18px;

  padding: 0;

  color:
    #1c1c1c;

  font-size:
    21px;

  font-weight:
    700;

  line-height:
    1.3;

  letter-spacing:
    -0.015em;
}

.cc-villa-modal_includedList {
  display:
    grid;

  gap:
    13px;

  margin:
    0;

  padding:
    0;

  list-style:
    none;
}

.cc-villa-modal_includedList li {
  position:
    relative;

  margin:
    0;

  padding:
    0
    0
    0
    22px;

  color:
    #555555;

  font-size:
    14px;

  font-weight:
    500;

  line-height:
    1.55;
}

.cc-villa-modal_includedList li::before {
  content:
    "";

  position:
    absolute;

  top:
    0.72em;

  left:
    2px;

  width:
    6px;

  height:
    6px;

  border-radius:
    50%;

  background:
    #ef1b23;

  transform:
    translateY(-50%);
}

.cc-villa-modal_includedNote {
  color:
    #767676;

  font-weight:
    400;
}

@media (max-width: 620px) {
  .cc-villa-modal_includedSection {
    margin-top:
      26px;

    padding:
      20px
      18px;

    border-radius:
      12px;
  }

  .cc-villa-modal_includedTitle {
    margin-bottom:
      16px;

    font-size:
      19px;
  }

  .cc-villa-modal_includedList {
    gap:
      12px;
  }

  .cc-villa-modal_includedList li {
    padding-left:
      20px;

    font-size:
      13.5px;
  }
}

/* CITY_COOLIES_BUNGALOW_INCLUDED_END */

/* CITY_COOLIES_BUNGALOW_RATING_BREAKDOWN_START */

.cc-villa-modal_ratingBreakdownSection {
  margin:
    30px
    0
    8px;

  padding:
    4px
    0
    8px;

  background:
    transparent;
}

.cc-villa-modal_ratingSummary {
  margin:
    0
    0
    24px;
}

.cc-villa-modal_ratingScoreRow {
  display:
    flex;

  align-items:
    center;

  gap:
    9px;
}

.cc-villa-modal_ratingMainStar {
  color:
    #f5b700;

  font-size:
    23px;

  line-height:
    1;
}

.cc-villa-modal_ratingScore {
  color:
    #303030;

  font-size:
    29px;

  font-weight:
    700;

  line-height:
    1;
}

.cc-villa-modal_ratingReviewCount {
  margin:
    8px
    0
    0;

  color:
    #777777;

  font-size:
    14px;

  font-weight:
    400;

  line-height:
    1.4;
}

.cc-villa-modal_ratingBars {
  display:
    grid;

  gap:
    15px;
}

.cc-villa-modal_ratingBarRow {
  display:
    grid;

  grid-template-columns:
    32px
    minmax(0, 1fr)
    42px;

  align-items:
    center;

  column-gap:
    10px;
}

.cc-villa-modal_ratingBarLabel {
  display:
    inline-flex;

  align-items:
    center;

  justify-content:
    flex-start;

  gap:
    2px;

  color:
    #565656;

  font-size:
    14px;

  font-weight:
    500;

  line-height:
    1;
}

.cc-villa-modal_ratingSmallStar {
  color:
    #f5b700;

  font-size:
    15px;
}

.cc-villa-modal_ratingTrack {
  position:
    relative;

  width:
    100%;

  height:
    5px;

  overflow:
    hidden;

  border-radius:
    999px;

  background:
    #d8d8d8;
}

.cc-villa-modal_ratingFill {
  position:
    absolute;

  top:
    0;

  bottom:
    0;

  left:
    0;

  border-radius:
    inherit;

  background:
    #ef1b23;
}

.cc-villa-modal_ratingPercentage {
  color:
    #777777;

  font-size:
    13px;

  font-weight:
    400;

  line-height:
    1;

  text-align:
    right;
}

@media (max-width: 620px) {
  .cc-villa-modal_ratingBreakdownSection {
    margin-top:
      26px;
  }

  .cc-villa-modal_ratingSummary {
    margin-bottom:
      21px;
  }

  .cc-villa-modal_ratingScore {
    font-size:
      27px;
  }

  .cc-villa-modal_ratingMainStar {
    font-size:
      21px;
  }

  .cc-villa-modal_ratingBars {
    gap:
      14px;
  }

  .cc-villa-modal_ratingBarRow {
    grid-template-columns:
      30px
      minmax(0, 1fr)
      38px;

    column-gap:
      8px;
  }

  .cc-villa-modal_ratingPercentage {
    font-size:
      12.5px;
  }
}

/* CITY_COOLIES_BUNGALOW_RATING_BREAKDOWN_END */

/* CITY_COOLIES_MOBILE_POPUP_LAYOUT_FIX_START */
@media (max-width: 620px) {
  .cc-villa-modal_overlay { position: fixed !important; inset: 0 !important; display: flex !important; align-items: stretch !important; justify-content: stretch !important; padding: 0 !important; height: 100dvh !important; overflow: hidden !important; }
  .cc-villa-modal_modal { position: relative !important; top: 0 !important; display: flex !important; flex-direction: column !important; flex: 1 1 auto !important; width: 100% !important; max-width: 100% !important; height: 100dvh !important; max-height: 100dvh !important; min-height: 0 !important; overflow: hidden !important; border-radius: 0 !important; }
  .cc-villa-modal_scrollArea { flex: 1 1 0% !important; min-height: 0 !important; height: auto !important; overflow-x: hidden !important; overflow-y: auto !important; }
  .cc-villa-modal_footer { position: relative !important; display: flex !important; flex: 0 0 auto !important; width: 100% !important; box-sizing: border-box !important; padding-bottom: max(12px, env(safe-area-inset-bottom)) !important; background: #fff !important; }
}
/* CITY_COOLIES_MOBILE_POPUP_LAYOUT_FIX_END */
.cc-villa-modal_serviceFeatures {
  margin: 0 0 24px;
  padding-left: 22px;
  color: #565656;
  font-size: 15px;
  line-height: 1.55;
}
.cc-villa-modal_serviceFeatures li + li {
  margin-top: 8px;
}

`;
