"use client";
import Link from "next/link";

const FULL_HOME_DETAILS_PATH =
  "/services/deep-cleaning?category=full-home-by-room&service=";



type BungalowSurveyModalProps = {
  serviceId: string;
  serviceTitle: string;
  buttonClassName: string;
  buttonLabel?: string;
};

export function BungalowSurveyModal({
  serviceId,
  buttonClassName,
  buttonLabel = "Add",
}: BungalowSurveyModalProps) {
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
    id: "furnished-bungalow-duplex",
    furnishingType: "furnished",
    groupTitle: "Full bungalow/duplex",

    title:
      "Furnished bungalow & duplex cleaning",

    promoTitle:
      "Furnished bungalow & duplex deep cleaning",

    promoDescription:
      "Complete deep cleaning designed for furnished and occupied bungalow or duplex homes.",

    /*
     * Do not copy another company's customer rating
     * into City Coolies.
     */
    rating: 4.2,
    reviews: "900 reviews",

    price: "₹500",

    duration: "5 hrs 50 mins",

    /*
     * Furnished banner will be added later.
     */
    imagePending: true,

    features: [
      "Detailed cleaning for furnished and occupied bungalow or duplex homes",
      "Machine floor scrubbing and stain-focused cleaning across rooms, kitchen, bathrooms and balcony",
    ],
  },
  {
    id: "unfurnished-bungalow-duplex",
    furnishingType: "unfurnished",
    groupTitle: "Full bungalow/duplex",

    title:
      "Unfurnished bungalow & duplex cleaning",

    promoTitle:
      "Unfurnished bungalow & duplex cleaning",

    promoDescription:
      "Professional deep cleaning for vacant or unfurnished bungalow and duplex properties.",

    rating: 4.2,
    reviews: "900 reviews",

    price: "₹500",
    duration: "Site survey",

    imagePending: true,

    features: [
      "Detailed cleaning for vacant or unfurnished bungalow or duplex properties",
      "Machine floor scrubbing and deep cleaning across rooms, kitchen, bathrooms and balcony",
    ],
  },
];

type FullBungalowDuplexProps = {
  furnishingType?: FurnishingType;
};

function FullBungalowDuplexContent({
  furnishingType = "unfurnished",
}: FullBungalowDuplexProps) {
  const visibleServices =
    homeCleaningServices.filter(
      (service) =>
        service.furnishingType ===
        furnishingType,
    );

  return (
    <section
      id="full-bungalow-duplex-section"
      data-service-scroll-target
      className={"cc-bungalow-section"}
      aria-label={
        furnishingType === "furnished"
          ? "Furnished home cleaning services"
          : "Unfurnished home cleaning services"
      }
    >
      <div className={"cc-bungalow-serviceList"}>
        {visibleServices.map(
          (service, index) => (
            <div
              key={service.id}
              className={"cc-bungalow-serviceGroup"}
            >
              <h2
                className={
                  index === 0
                    ? "cc-bungalow-sectionTitle"
                    : "cc-bungalow-subSectionTitle"
                }
              >
                {service.groupTitle}
              </h2>

              <article
                className={"cc-bungalow-apartmentService"}
              >
                <div
                  data-service-id={service.id}
                  className={`${"cc-bungalow-promoBanner"} ${
                    service.imagePending
                      ? "cc-bungalow-imagePending"
                      : ""
                  }`}
                >
                  {service.badge ? (
                    <span
                      className={"cc-bungalow-bestValue"}
                    >
                      {service.badge}
                    </span>
                  ) : null}

</div>

                <div
                  className={
                    "cc-bungalow-serviceDetails"
                  }
                >
                  <div
                    className={
                      "cc-bungalow-serviceHeader"
                    }
                  >
                    <div
                      className={
                        "cc-bungalow-serviceInformation"
                      }
                    >
                      <h3
                        className={"cc-bungalow-serviceTitle"}
                      >
                        {service.title}
                      </h3>

                      {service.rating !==
                      null ? (
                        <div
                          className={
                            "cc-bungalow-ratingRow"
                          }
                        >
                          <span
                            className={
                              "cc-bungalow-ratingIcon"
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
                                "cc-bungalow-reviewText"
                              }
                            >
                              (
                              {
                                service.reviews
                              }
                              )
                            </span>
                          ) : null}

                        

                        <BungalowSurveyModal
                            serviceId={
                              service.id
                            }
                            serviceTitle={
                              service.title
                            }
                            buttonClassName={`${"cc-bungalow-detailsButton"} ${"cc-bungalow-ratingDetailsButton"}`}
                            buttonLabel="View details"
                          /></div>
                      ) : null}

                      <div
                        className={
                          "cc-bungalow-priceRow"
                        }
                      >
                        <strong>
                            Site survey charges ₹500
                          </strong>
                      </div>
                    </div>

                    <BungalowSurveyModal
                        serviceId={service.id}
                        serviceTitle={service.title}
                        buttonClassName={"cc-bungalow-addButton"}
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
export default function FullBungalowDuplex(
  props: React.ComponentProps<typeof FullBungalowDuplexContent>
) {
  return (
    <>
      <style>{BUNGALOW_CSS}</style>
      <FullBungalowDuplexContent {...props} />
    </>
  );
}

export const BUNGALOW_CSS = String.raw`
.cc-bungalow-modal_serviceFeatures {
  margin: 0 0 24px;
  padding-left: 22px;
  color: #565656;
  font-size: 15px;
  line-height: 1.55;
}

.cc-bungalow-modal_serviceFeatures li + li {
  margin-top: 8px;
}

.cc-bungalow-section {
  width: 100%;
}
.cc-bungalow-sectionTitle {
  margin: 8px 0 32px;
  color: #151515;
  font-size: 32px;
  font-weight: 700;
  line-height: 1.18;
  letter-spacing: -0.025em;
}
.cc-bungalow-serviceList {
  display: flex;
  flex-direction: column;
  gap: 34px;
}
.cc-bungalow-apartmentService {
  width: 100%;
}
.cc-bungalow-promoBanner {
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
.cc-bungalow-bestValue {
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
.cc-bungalow-promoContent {
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  display: flex;
  min-height: 250px;
  padding: 58px 24px 24px;
  flex-direction: column;
  justify-content: center;
}
.cc-bungalow-promoHeading {
  width: min(58%, 330px);
  margin: 0;
  color: #111111;
  font-size: 27px;
  font-weight: 700;
  line-height: 1.16;
  letter-spacing: -0.015em;
}
.cc-bungalow-promoPrice {
  display: flex;
  width: min(62%, 390px);
  margin-top: 5px;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 9px;
}
.cc-bungalow-promoPrice strong {
  color: #111111;
  font-size: 25px;
  font-weight: 700;
  line-height: 1.18;
}
.cc-bungalow-originalPrice {
  color: #666666;
  font-size: 20px;
  font-weight: 500;
  line-height: 1.2;
  text-decoration: line-through;
  text-decoration-thickness: 1.5px;
}
.cc-bungalow-promoDescription {
  width: min(55%, 320px);
  margin: 14px 0 0;
  color: #464646;
  font-size: 14.5px;
  font-weight: 400;
  line-height: 1.45;
}
.cc-bungalow-serviceDetails {
  padding: 20px 0 31px;
  border-bottom: 1px solid #e5e5e5;
}
.cc-bungalow-serviceHeader {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 22px;
}
.cc-bungalow-serviceInformation {
  min-width: 0;
  flex: 1;
}
.cc-bungalow-serviceTitle {
  max-width: 370px;
  margin: 0;
  color: #171717;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.4;
}
.cc-bungalow-ratingRow {
  display: flex;
  margin-top: 8px;
  align-items: center;
  gap: 5px;
  color: #626262;
  font-size: 13px;
  line-height: 1.3;
}
.cc-bungalow-ratingIcon {
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
.cc-bungalow-reviewText {
  text-decoration: underline;
  text-decoration-style: dotted;
  text-underline-offset: 3px;
}
.cc-bungalow-priceRow {
  display: flex;
  margin-top: 11px;
  flex-wrap: wrap;
  align-items: center;
  gap: 9px;
  color: #666666;
  font-size: 13px;
  line-height: 1.4;
}
.cc-bungalow-priceRow strong {
  color: #171717;
}
.cc-bungalow-addButton {
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
.cc-bungalow-addButton:hover {
  background: #ef1b23;
  color: #ffffff;
}
.cc-bungalow-divider {
  width: 100%;
  height: 1px;
  margin: 18px 0 14px;
  border-top: 1px dashed #eadadd;
}
.cc-bungalow-features {
  margin: 0;
  padding-left: 22px;
  color: #606060;
  font-size: 13.5px;
  line-height: 1.55;
}
.cc-bungalow-detailsButton {
  margin-top: 14px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #ef1b23;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}
.cc-bungalow-addButton:focus-visible,
.cc-bungalow-detailsButton:focus-visible {
  outline: 2px solid #ef1b23;
  outline-offset: 3px;
}
@media (max-width: 760px) {
  .cc-bungalow-sectionTitle {
    margin-bottom: 22px;
    font-size: 27px;
  }
  .cc-bungalow-serviceList {
    gap: 28px;
  }
  .cc-bungalow-promoBanner {
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
  .cc-bungalow-promoContent {
    min-height: 220px;
    padding: 50px 16px 18px;
  }
  .cc-bungalow-promoHeading {
    width: 63%;
    font-size: 20px;
  }
  .cc-bungalow-promoPrice {
    width: 68%;
    gap: 6px;
  }
  .cc-bungalow-promoPrice strong {
    font-size: 18px;
  }
  .cc-bungalow-originalPrice {
    font-size: 15px;
  }
  .cc-bungalow-promoDescription {
    width: 62%;
    margin-top: 10px;
    font-size: 12.5px;
  }
  .cc-bungalow-serviceHeader {
    gap: 12px;
  }
  .cc-bungalow-serviceTitle {
    font-size: 16px;
  }
  .cc-bungalow-addButton {
    min-width: 72px;
    min-height: 39px;
    padding: 7px 15px;
  }
}
.cc-bungalow-promoHeading {
  font-size: 23px;
  font-weight: 600;
  line-height: 1.18;
}
.cc-bungalow-promoPrice strong {
  font-size: 21px;
  font-weight: 600;
  line-height: 1.2;
}
.cc-bungalow-originalPrice {
  font-size: 18px;
  font-weight: 500;
}
@media (max-width: 760px) {
  .cc-bungalow-promoHeading {
    font-size: 18px;
    font-weight: 600;
  }
  .cc-bungalow-promoPrice strong {
    font-size: 17px;
    font-weight: 600;
  }
  .cc-bungalow-originalPrice {
    font-size: 15px;
  }
}
.cc-bungalow-serviceGroup {
  width: 100%;
}
.cc-bungalow-serviceGroup + .cc-bungalow-serviceGroup {
  margin-top: 42px;
}
.cc-bungalow-subSectionTitle {
  margin: 0 0 28px;
  color: #151515;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.18;
  letter-spacing: -0.02em;
}
.cc-bungalow-promoBanner.imagePending {
  background-color: #fff7f8 !important;
  background-image: none !important;
}
.cc-bungalow-promoBanner.imagePending .cc-bungalow-promoHeading,
.cc-bungalow-promoBanner.imagePending .cc-bungalow-promoPrice,
.cc-bungalow-promoBanner.imagePending .cc-bungalow-promoDescription {
  width: min(82%, 430px);
}
@media (max-width: 760px) {
  .cc-bungalow-serviceGroup + .cc-bungalow-serviceGroup {
    margin-top: 34px;
  }
  .cc-bungalow-subSectionTitle {
    margin-bottom: 22px;
    font-size: 24px;
  }
  .cc-bungalow-promoBanner.imagePending .cc-bungalow-promoHeading,
  .cc-bungalow-promoBanner.imagePending .cc-bungalow-promoPrice,
  .cc-bungalow-promoBanner.imagePending .cc-bungalow-promoDescription {
    width: 88%;
  }
}
.cc-bungalow-serviceGroup {
  width: 100%;
}
.cc-bungalow-serviceGroup + .cc-bungalow-serviceGroup {
  margin-top: 8px;
}
.cc-bungalow-subSectionTitle {
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
.cc-bungalow-imagePending {
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
.cc-bungalow-imagePending .cc-bungalow-promoHeading {
  width: min(58%, 330px);
}
.cc-bungalow-imagePending .cc-bungalow-promoPrice {
  width: min(62%, 390px);
}
.cc-bungalow-imagePending .cc-bungalow-promoDescription {
  width: min(55%, 320px);
}
.cc-bungalow-serviceGroup + .cc-bungalow-serviceGroup::before {
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
  .cc-bungalow-subSectionTitle {
    margin-bottom: 22px;
    font-size: 27px;
  }
  .cc-bungalow-serviceGroup + .cc-bungalow-serviceGroup::before {
    margin-bottom: 26px;
  }
  .cc-bungalow-imagePending {
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
  .cc-bungalow-imagePending .cc-bungalow-promoHeading {
    width: 63%;
  }
  .cc-bungalow-imagePending .cc-bungalow-promoPrice {
    width: 68%;
  }
  .cc-bungalow-imagePending .cc-bungalow-promoDescription {
    width: 62%;
    margin-top: 10px;
    font-size: 12.5px;
  }
}
.cc-bungalow-promoBanner.imagePending {
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
.cc-bungalow-promoBanner.imagePending .cc-bungalow-promoHeading {
  width: min(58%, 330px);
}
.cc-bungalow-promoBanner.imagePending .cc-bungalow-promoPrice {
  width: min(62%, 390px);
}
.cc-bungalow-promoBanner.imagePending .cc-bungalow-promoDescription {
  width: min(55%, 320px);
}
@media (max-width: 760px) {
  .cc-bungalow-promoBanner.imagePending {
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
  .cc-bungalow-promoBanner.imagePending .cc-bungalow-promoHeading {
    width: 63%;
  }
  .cc-bungalow-promoBanner.imagePending .cc-bungalow-promoPrice {
    width: 68%;
  }
  .cc-bungalow-promoBanner.imagePending .cc-bungalow-promoDescription {
    width: 62%;
  }
}
.cc-bungalow-promoBanner.imagePending .cc-bungalow-promoHeading {
  font-size: 20px !important;
  font-weight: 550 !important;
  line-height: 1.2 !important;
  letter-spacing: -0.01em !important;
}
.cc-bungalow-promoBanner.imagePending .cc-bungalow-promoPrice strong {
  font-size: 18px !important;
  font-weight: 550 !important;
  line-height: 1.2 !important;
}
.cc-bungalow-promoBanner.imagePending .cc-bungalow-originalPrice {
  font-size: 16px !important;
  font-weight: 450 !important;
  line-height: 1.2 !important;
}
@media (max-width: 760px) {
  .cc-bungalow-promoBanner.imagePending .cc-bungalow-promoHeading {
    font-size: 17px !important;
    font-weight: 550 !important;
  }
  .cc-bungalow-promoBanner.imagePending .cc-bungalow-promoPrice strong {
    font-size: 16px !important;
    font-weight: 550 !important;
  }
  .cc-bungalow-promoBanner.imagePending .cc-bungalow-originalPrice {
    font-size: 14px !important;
    font-weight: 450 !important;
  }
}
.cc-bungalow-furnishedApartmentTitle {
  font-weight: 500 !important;
}
.cc-bungalow-furnishedApartmentTitle {
  font-size: 16px !important;
  font-weight: 500 !important;
  line-height: 1.35 !important;
}
@media (max-width: 760px) {
  .cc-bungalow-furnishedApartmentTitle {
    font-size: 15px !important;
    line-height: 1.35 !important;
  }
}
.cc-bungalow-ratingDetailsButton {
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
  .cc-bungalow-ratingDetailsButton {
    margin-left: 3px !important;
    font-size: 12px !important;
  }
}
.cc-bungalow-serviceGroup:first-child .cc-bungalow-serviceDetails {
  padding-bottom: 8px !important;
  border-bottom: 0 !important;
}
.cc-bungalow-serviceGroup:first-child .cc-bungalow-divider {
  display: none !important;
}
.cc-bungalow-serviceGroup + .cc-bungalow-serviceGroup::before {
  display: none !important;
  content: none !important;
}
.cc-bungalow-serviceGroup + .cc-bungalow-serviceGroup {
  margin-top: 18px !important;
}
.cc-bungalow-serviceList {
  gap: 0 !important;
}
@media (max-width: 760px) {
  .cc-bungalow-serviceGroup:first-child .cc-bungalow-serviceDetails {
    padding-bottom: 6px !important;
  }
  .cc-bungalow-serviceGroup + .cc-bungalow-serviceGroup {
    margin-top: 14px !important;
  }
}
.cc-bungalow-serviceGroup:has(.cc-bungalow-furnishedApartmentTitle) .cc-bungalow-serviceHeader {
  padding-bottom: 14px !important;
  border-bottom:
    1px solid rgba(40, 40, 40, 0.12) !important;
}
@media (max-width: 760px) {
  .cc-bungalow-serviceGroup:has(.cc-bungalow-furnishedApartmentTitle) .cc-bungalow-serviceHeader {
    padding-bottom: 12px !important;
  }
}
.cc-bungalow-promoBanner.imagePending {
  background-color: #fff7f8 !important;
  background-image: url("/deep-cleaning/sunlit_living_room_cleaning_service.webp") !important;
  background-repeat: no-repeat !important;
  background-position: center center !important;
  background-size: cover !important;
}
.cc-bungalow-serviceGroup:first-child .cc-bungalow-promoBanner {
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
  .cc-bungalow-serviceGroup:first-child .cc-bungalow-promoBanner {
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
.cc-bungalow-serviceGroup + .cc-bungalow-serviceGroup .cc-bungalow-serviceTitle {
  max-width: 360px;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.35;
  letter-spacing: -0.01em;
}
@media (max-width: 760px) {
  .cc-bungalow-serviceGroup + .cc-bungalow-serviceGroup .cc-bungalow-serviceTitle {
    max-width: 100%;
    font-size: 15px;
    line-height: 1.35;
  }
}
.cc-bungalow-serviceGroup + .cc-bungalow-serviceGroup .cc-bungalow-promoBanner {
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
  .cc-bungalow-serviceGroup + .cc-bungalow-serviceGroup .cc-bungalow-promoBanner {
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
.cc-bungalow-serviceGroup + .cc-bungalow-serviceGroup
.cc-bungalow-serviceDetails > .cc-bungalow-divider {
  display: none !important;
}
.cc-bungalow-serviceGroup + .cc-bungalow-serviceGroup
.cc-bungalow-serviceDetails > .cc-bungalow-features {
  display: none !important;
}
.cc-bungalow-serviceGroup + .cc-bungalow-serviceGroup
.cc-bungalow-serviceDetails > .cc-bungalow-detailsButton {
  display: none !important;
}
.cc-bungalow-serviceGroup + .cc-bungalow-serviceGroup
.cc-bungalow-serviceDetails {
  padding-bottom: 8px !important;
  border-bottom: 0 !important;
}
.cc-bungalow-serviceGroup + .cc-bungalow-serviceGroup
.cc-bungalow-serviceHeader {
  margin-bottom: 0 !important;
  padding-bottom: 4px !important;
}
.cc-bungalow-serviceGroup + .cc-bungalow-serviceGroup
.cc-bungalow-apartmentService {
  margin-bottom: 0 !important;
  padding-bottom: 0 !important;
}
@media (max-width: 760px) {
  .cc-bungalow-serviceGroup + .cc-bungalow-serviceGroup
  .cc-bungalow-serviceDetails {
    padding-bottom: 6px !important;
  }
  .cc-bungalow-serviceGroup + .cc-bungalow-serviceGroup
  .cc-bungalow-serviceHeader {
    padding-bottom: 3px !important;
  }
}
.cc-bungalow-serviceGroup
> .cc-bungalow-apartmentService
> .cc-bungalow-promoBanner[data-service-id="furnished-villa-cleaning"],
.cc-bungalow-serviceGroup
> .cc-bungalow-apartmentService
> .cc-bungalow-promoBanner[data-service-id="unfurnished-villa-cleaning"] {
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
.cc-bungalow-serviceGroup
> .cc-bungalow-apartmentService
> .cc-bungalow-promoBanner[data-service-id="furnished-villa-cleaning"]
.cc-bungalow-promoContent,
.cc-bungalow-serviceGroup
> .cc-bungalow-apartmentService
> .cc-bungalow-promoBanner[data-service-id="unfurnished-villa-cleaning"]
.cc-bungalow-promoContent {
  display: none !important;
}
.cc-bungalow-serviceGroup
> .cc-bungalow-apartmentService
> .cc-bungalow-promoBanner[data-service-id="furnished-villa-cleaning"]
.cc-bungalow-bestValue,
.cc-bungalow-serviceGroup
> .cc-bungalow-apartmentService
> .cc-bungalow-promoBanner[data-service-id="unfurnished-villa-cleaning"]
.cc-bungalow-bestValue {
  display: none !important;
}
@media (max-width: 900px) {
  .cc-bungalow-serviceGroup
  > .cc-bungalow-apartmentService
  > .cc-bungalow-promoBanner[data-service-id="furnished-villa-cleaning"],
  .cc-bungalow-serviceGroup
  > .cc-bungalow-apartmentService
  > .cc-bungalow-promoBanner[data-service-id="unfurnished-villa-cleaning"] {
    width: 100% !important;
    height: auto !important;
    min-height: 0 !important;
    aspect-ratio:
      1932 / 814 !important;
    background-size:
      contain !important;
  }
}
@media (max-width: 620px) {
  .cc-bungalow-serviceGroup
  > .cc-bungalow-apartmentService
  > .cc-bungalow-promoBanner[data-service-id="furnished-villa-cleaning"],
  .cc-bungalow-serviceGroup
  > .cc-bungalow-apartmentService
  > .cc-bungalow-promoBanner[data-service-id="unfurnished-villa-cleaning"] {
    width: 100% !important;
    height: auto !important;
    min-height: 0 !important;
    aspect-ratio:
      1932 / 814 !important;
    background-size:
      contain !important;
  }
}
@media (max-width: 760px) {
  .cc-bungalow-serviceGroup:first-child .cc-bungalow-ratingRow {
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
  .cc-bungalow-serviceGroup:first-child .cc-bungalow-ratingIcon {
    display: inline-flex !important;
    width: 18px !important;
    height: 18px !important;
    min-width: 18px !important;
    flex: 0 0 18px !important;
    align-items: center !important;
    justify-content: center !important;
  }
  .cc-bungalow-serviceGroup:first-child .cc-bungalow-ratingRow > span {
    flex-shrink: 0 !important;
    white-space: nowrap !important;
  }
  .cc-bungalow-serviceGroup:first-child .cc-bungalow-reviewText {
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
  .cc-bungalow-serviceGroup:first-child .cc-bungalow-ratingDetailsButton {
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
.cc-bungalow-promoBanner[data-service-id="furnished-bungalow-duplex"],
.cc-bungalow-promoBanner[data-service-id="unfurnished-bungalow-duplex"] {
    background-image: url("/deep-cleaning/furnished-bungalow-duplex-cleaning-banner.webp") !important;
    background-repeat: no-repeat !important;
    background-position: center center !important;
    background-size: cover !important;
}
.cc-bungalow-promoBanner[data-service-id="furnished-villa-cleaning"],
.cc-bungalow-promoBanner[data-service-id="unfurnished-villa-cleaning"] {
    background-image: url("/deep-cleaning/villa-cleaning-banner.webp") !important;
    background-repeat: no-repeat !important;
    background-position: center center !important;
    background-size: contain !important;
    aspect-ratio: 1932 / 814 !important;
    min-height: 0 !important;
}
.cc-bungalow-modal_overlay {
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
.cc-bungalow-modal_modal {
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
.cc-bungalow-modal_closeButton {
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
.cc-bungalow-modal_scrollArea {
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: #d4d4d4 transparent;
}
.cc-bungalow-modal_header {
  padding:
    34px
    72px
    27px
    28px;
  border-bottom: 1px solid #eeeeee;
}
.cc-bungalow-modal_title {
  max-width: 430px;
  margin: 0;
  color: #111111;
  font-size: 26px;
  font-weight: 700;
  line-height: 1.24;
  letter-spacing: -0.025em;
}
.cc-bungalow-modal_priceRow {
  display: flex;
  margin-top: 13px;
  align-items: baseline;
  gap: 8px;
  color: #4d4d4d;
  font-size: 15px;
  line-height: 1.4;
}
.cc-bungalow-modal_priceRow strong {
  color: #ef1b23;
  font-size: 18px;
  font-weight: 700;
}
.cc-bungalow-modal_content {
  padding: 28px;
}
.cc-bungalow-modal_sectionTitle {
  margin: 0;
  color: #151515;
  font-size: 23px;
  font-weight: 700;
  line-height: 1.25;
}
.cc-bungalow-modal_description {
  max-width: 470px;
  margin:
    10px
    0
    24px;
  color: #565656;
  font-size: 15px;
  line-height: 1.55;
}
.cc-bungalow-modal_surveyList {
  display: grid;
  gap: 13px;
}
.cc-bungalow-modal_surveyItem {
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
.cc-bungalow-modal_check {
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
.cc-bungalow-modal_note {
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
.cc-bungalow-modal_footer {
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
.cc-bungalow-modal_footerLabel {
  display: block;
  color: #777777;
  font-size: 12px;
  line-height: 1.3;
}
.cc-bungalow-modal_footerPrice {
  display: block;
  margin-top: 2px;
  color: #151515;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.2;
}
.cc-bungalow-modal_confirmButton {
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
.cc-bungalow-modal_confirmButton:hover {
  background: #d9141c;
}
.cc-bungalow-modal_closeButton:focus-visible,
.cc-bungalow-modal_confirmButton:focus-visible {
  outline: 2px solid #ef1b23;
  outline-offset: 3px;
}
@media (max-width: 760px) {
  .cc-bungalow-modal_overlay {
    align-items: flex-end;
    padding:
      16px
      10px;
  }
  .cc-bungalow-modal_modal {
    width: 100%;
    max-height: calc(100dvh - 32px);
    border-radius: 18px;
  }
  .cc-bungalow-modal_header {
    padding:
      29px
      62px
      23px
      20px;
  }
  .cc-bungalow-modal_title {
    font-size: 21px;
    line-height: 1.28;
  }
  .cc-bungalow-modal_priceRow {
    margin-top: 10px;
    font-size: 14px;
  }
  .cc-bungalow-modal_priceRow strong {
    font-size: 17px;
  }
  .cc-bungalow-modal_content {
    padding:
      23px
      20px;
  }
  .cc-bungalow-modal_sectionTitle {
    font-size: 20px;
  }
  .cc-bungalow-modal_description {
    font-size: 14px;
  }
  .cc-bungalow-modal_surveyItem {
    min-height: 48px;
    padding:
      11px
      12px;
    font-size: 14px;
  }
  .cc-bungalow-modal_footer {
    padding:
      13px
      16px;
    gap: 12px;
  }
  .cc-bungalow-modal_confirmButton {
    min-height: 44px;
    padding:
      9px
      17px;
    font-size: 14px;
  }
}
@media (min-width: 621px) {
  .cc-bungalow-modal_overlay {
    align-items: center !important;
    padding:
      24px
      20px !important;
  }
  .cc-bungalow-modal_modal {
    position: relative;
    width: 472px !important;
    max-width: 472px !important;
    height: 635px !important;
    max-height: calc(100dvh - 92px) !important;
    top: 34px;
    margin: 0;
    border-radius: 16px !important;
  }
  .cc-bungalow-modal_scrollArea {
    min-height: 0;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
@media (max-width: 620px) {
  .cc-bungalow-modal_overlay {
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
  .cc-bungalow-modal_modal {
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
  .cc-bungalow-modal_scrollArea {
    display: block !important;
    flex: 1 1 0% !important;
    min-height: 0 !important;
    max-height: none !important;
    overflow-x: hidden !important;
    overflow-y: auto !important;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
  }
  .cc-bungalow-modal_footer {
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
  .cc-bungalow-modal_confirmButton {
    flex-shrink: 0 !important;
  }
}
.cc-bungalow-modal_squareFootRate {
  margin: 5px 0 0;
  color: #666666;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.35;
}
.cc-bungalow-modal_cleaningVisualGrid {
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
.cc-bungalow-modal_cleaningVisualItem {
  display: block;
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}
.cc-bungalow-modal_cleaningVisualImage {
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
.cc-bungalow-modal_cleaningVisualName {
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
  .cc-bungalow-modal_cleaningVisualGrid {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
    gap:
      18px
      12px;
    margin-top: 24px;
  }
  .cc-bungalow-modal_cleaningVisualName {
    margin-top: 7px;
    font-size: 12.5px;
  }
}
.cc-bungalow-modal_includedSection {
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
.cc-bungalow-modal_includedTitle {
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
.cc-bungalow-modal_includedList {
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
.cc-bungalow-modal_includedList li {
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
.cc-bungalow-modal_includedList li::before {
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
.cc-bungalow-modal_includedNote {
  color:
    #767676;
  font-weight:
    400;
}
@media (max-width: 620px) {
  .cc-bungalow-modal_includedSection {
    margin-top:
      26px;
    padding:
      20px
      18px;
    border-radius:
      12px;
  }
  .cc-bungalow-modal_includedTitle {
    margin-bottom:
      16px;
    font-size:
      19px;
  }
  .cc-bungalow-modal_includedList {
    gap:
      12px;
  }
  .cc-bungalow-modal_includedList li {
    padding-left:
      20px;
    font-size:
      13.5px;
  }
}
.cc-bungalow-modal_ratingBreakdownSection {
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
.cc-bungalow-modal_ratingSummary {
  margin:
    0
    0
    24px;
}
.cc-bungalow-modal_ratingScoreRow {
  display:
    flex;
  align-items:
    center;
  gap:
    9px;
}
.cc-bungalow-modal_ratingMainStar {
  color:
    #f5b700;
  font-size:
    23px;
  line-height:
    1;
}
.cc-bungalow-modal_ratingScore {
  color:
    #303030;
  font-size:
    29px;
  font-weight:
    700;
  line-height:
    1;
}
.cc-bungalow-modal_ratingReviewCount {
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
.cc-bungalow-modal_ratingBars {
  display:
    grid;
  gap:
    15px;
}
.cc-bungalow-modal_ratingBarRow {
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
.cc-bungalow-modal_ratingBarLabel {
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
.cc-bungalow-modal_ratingSmallStar {
  color:
    #f5b700;
  font-size:
    15px;
}
.cc-bungalow-modal_ratingTrack {
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
.cc-bungalow-modal_ratingFill {
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
.cc-bungalow-modal_ratingPercentage {
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
  .cc-bungalow-modal_ratingBreakdownSection {
    margin-top:
      26px;
  }
  .cc-bungalow-modal_ratingSummary {
    margin-bottom:
      21px;
  }
  .cc-bungalow-modal_ratingScore {
    font-size:
      27px;
  }
  .cc-bungalow-modal_ratingMainStar {
    font-size:
      21px;
  }
  .cc-bungalow-modal_ratingBars {
    gap:
      14px;
  }
  .cc-bungalow-modal_ratingBarRow {
    grid-template-columns:
      30px
      minmax(0, 1fr)
      38px;
    column-gap:
      8px;
  }
  .cc-bungalow-modal_ratingPercentage {
    font-size:
      12.5px;
  }
}
@media (max-width: 620px) {
  .cc-bungalow-modal_overlay { position: fixed !important; inset: 0 !important; display: flex !important; align-items: stretch !important; justify-content: stretch !important; padding: 0 !important; height: 100dvh !important; overflow: hidden !important; }
  .cc-bungalow-modal_modal { position: relative !important; top: 0 !important; display: flex !important; flex-direction: column !important; flex: 1 1 auto !important; width: 100% !important; max-width: 100% !important; height: 100dvh !important; max-height: 100dvh !important; min-height: 0 !important; overflow: hidden !important; border-radius: 0 !important; }
  .cc-bungalow-modal_scrollArea { flex: 1 1 0% !important; min-height: 0 !important; height: auto !important; overflow-x: hidden !important; overflow-y: auto !important; }
  .cc-bungalow-modal_footer { position: relative !important; display: flex !important; flex: 0 0 auto !important; width: 100% !important; box-sizing: border-box !important; padding-bottom: max(12px, env(safe-area-inset-bottom)) !important; background: #fff !important; }
}
`;
