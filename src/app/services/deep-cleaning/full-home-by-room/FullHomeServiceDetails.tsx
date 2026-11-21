"use client";

/* eslint-disable @next/next/no-img-element */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  upsertServiceCartItem,
} from "@/app/services/serviceCart";

import {
  CITY_COOLIES_INLINE_CSS_FULLAPARTMENT as APARTMENT_CSS,
  homeCleaningServices as apartmentServices,
} from "./FullApartment";

import {
  BUNGALOW_CSS,
  homeCleaningServices as bungalowServices,
} from "./FullBungalowDuplex";

import {
  VILLA_CSS,
  homeCleaningServices as villaServices,
} from "./VillaCleaning";

import {
  CITY_COOLIES_INLINE_CSS_CUSTOMIZECLEANING as CUSTOMIZE_CSS,
} from "./CustomizeCleaning";

const FULL_HOME_PATH =
  "/services/deep-cleaning?category=full-home-by-room";

const DETAIL_PAGE_CSS = String.raw`
/* HOME_SIZE_COMPACT_HOUSE_FIX_V3: home-size cards only */
.cc-fh-detail-page .cc-fh-apartment-modal_sizeSliderShell {
  width:100% !important;
  position:relative;
}
.cc-fh-detail-page .cc-fh-apartment-modal_sizeScroller {
  display:grid !important;
  grid-template-columns:repeat(3,minmax(0,1fr)) !important;
  gap:14px !important;
  width:100% !important;
  overflow:visible !important;
  padding:4px 2px 12px !important;
  scroll-snap-type:none !important;
  transform:none !important;
}
.cc-fh-detail-page .cc-fh-apartment-modal_sliderArrow {
  display:none !important;
}
.cc-fh-detail-page .cc-fh-apartment-modal_sizeOption {
  position:relative !important;
  display:flex !important;
  flex-direction:row !important;
  align-items:center !important;
  justify-content:flex-start !important;
  gap:12px !important;
  width:100% !important;
  min-width:0 !important;
  min-height:108px !important;
  padding:14px 16px !important;
  border:1px solid #f2dadd !important;
  border-radius:15px !important;
  background:linear-gradient(140deg,#fff 65%,#fff2f4 100%) !important;
  box-shadow:0 6px 15px rgba(130,20,30,.10) !important;
  text-align:left !important;
  overflow:hidden !important;
  transition:transform .2s ease,box-shadow .2s ease !important;
}
.cc-fh-detail-page .cc-fh-apartment-modal_sizeOption::before {
  content:"";
  position:absolute;
  top:-45px;
  right:-45px;
  width:135px;
  height:95px;
  border-radius:0 0 0 100%;
  background:linear-gradient(135deg,rgba(255,220,225,.2),rgba(255,127,144,.3));
  pointer-events:none;
}
.cc-fh-detail-page .cc-fh-apartment-modal_sizeOption::after {
  content:"\2713";
  position:absolute;
  top:8px;
  right:8px;
  width:22px;
  height:22px;
  display:grid;
  place-items:center;
  border-radius:50%;
  background:#e00012;
  color:#fff;
  font-size:15px;
  font-weight:800;
  opacity:0;
}
.cc-fh-detail-page .cc-fh-apartment-modal_sizeOptionSelected {
  border:2px solid #e00012 !important;
  background:linear-gradient(135deg,#fff 45%,#ffe7eb 100%) !important;
  box-shadow:0 8px 18px rgba(210,0,18,.15) !important;
}
.cc-fh-detail-page .cc-fh-apartment-modal_sizeOptionSelected::after {
  opacity:1;
}
.cc-fh-detail-page .cc-fh-homeSizeIcon {
  position:relative;
  display:grid;
  flex:0 0 75px;
  place-items:center;
  height:62px;
  border-right:1px solid #f0d3d6;
}
.cc-fh-detail-page .cc-fh-homeSizeIcon img {
  display:block;
  width:58px;
  height:55px;
}
.cc-fh-detail-page .cc-fh-homeSizeText {
  position:relative;
  display:flex;
  flex-direction:column;
  gap:7px;
  min-width:0;
}
.cc-fh-detail-page .cc-fh-homeSizeText > span {
  color:#111 !important;
  font-size:19px !important;
  font-weight:750 !important;
  line-height:1.15;
  white-space:nowrap;
}
.cc-fh-detail-page .cc-fh-homeSizeText > strong {
  color:#d0000d !important;
  font-size:20px !important;
  font-weight:800 !important;
  line-height:1.15;
  white-space:nowrap;
}
.cc-fh-detail-page .cc-fh-apartment-modal_sizeOption:focus-visible {
  outline:3px solid #e00012 !important;
  outline-offset:3px;
}
@media(max-width:900px) {
  .cc-fh-detail-page .cc-fh-apartment-modal_sizeScroller {
    grid-template-columns:repeat(2,minmax(0,1fr)) !important;
    gap:10px !important;
  }
  .cc-fh-detail-page .cc-fh-apartment-modal_sizeOption {
    min-height:95px !important;
    padding:10px !important;
    gap:8px !important;
  }
  .cc-fh-detail-page .cc-fh-homeSizeIcon {
    flex-basis:55px;
    height:50px;
  }
  .cc-fh-detail-page .cc-fh-homeSizeIcon img {
    width:44px;
    height:42px;
  }
  .cc-fh-detail-page .cc-fh-homeSizeText > span {
    font-size:16px !important;
  }
  .cc-fh-detail-page .cc-fh-homeSizeText > strong {
    font-size:17px !important;
  }
}
@media(max-width:480px) {
  .cc-fh-detail-page .cc-fh-apartment-modal_sizeScroller {
    gap:8px !important;
    padding:4px 1px 10px !important;
  }
  .cc-fh-detail-page .cc-fh-apartment-modal_sizeOption {
    min-height:82px !important;
    border-radius:12px !important;
    padding:8px !important;
    gap:6px !important;
  }
  .cc-fh-detail-page .cc-fh-homeSizeIcon {
    flex:0 0 40px;
    height:42px;
  }
  .cc-fh-detail-page .cc-fh-homeSizeIcon img {
    width:37px;
    height:36px;
  }
  .cc-fh-detail-page .cc-fh-homeSizeText {
    gap:5px;
  }
  .cc-fh-detail-page .cc-fh-homeSizeText > span {
    font-size:13px !important;
  }
  .cc-fh-detail-page .cc-fh-homeSizeText > strong {
    font-size:14px !important;
  }
  .cc-fh-detail-page .cc-fh-apartment-modal_sizeOption::after {
    width:18px;
    height:18px;
    top:4px;
    right:4px;
    font-size:12px;
  }
}
.cc-fh-detail-page {
  min-height: 70vh;
  padding: 28px 20px 64px;
  background: #fff;
  color: #171717;
}
.cc-fh-detail-container {
  width: min(100%, 1200px);
  margin: auto;
}
.cc-fh-detail-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}
.cc-fh-detail-back {
  color: #e51c28;
  font-weight: 650;
  text-decoration: none;
}
.cc-fh-detail-back:hover {
  text-decoration: underline;
}
.cc-fh-detail-back:focus-visible {
  outline: 2px solid #e51c28;
  outline-offset: 4px;
}
.cc-fh-detail-tag {
  color: #666;
  font-size: 13px;
}
.cc-detail-content {
  width: 100%;
  min-width: 0;
}
.cc-detail-sheet {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  background: #fff;
}
.cc-detail-body {
  width: 100%;
  min-width: 0;
  overflow: visible;
}
.cc-detail-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  padding: 24px 0;
  margin-top: 28px;
  border-top: 1px solid #eee;
  background: #fff;
}
.cc-detail-coverage {
  margin: 20px 0;
}
.cc-detail-coverage-card {
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 12px;
}
.cc-detail-coverage-card table {
  width: 100%;
  border-collapse: collapse;
}
.cc-detail-coverage-card th, .cc-detail-coverage-card td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}
.cc-fh-detail-page img {
  max-width: 100%;
  height: auto;
}
@media (max-width: 700px) {
  .cc-fh-detail-page {
    padding: 16px 12px 40px;
  }
  .cc-fh-detail-navigation {
    align-items: flex-start;
  }
  .cc-fh-detail-tag {
    display: none;
  }
  .cc-detail-actions {
    align-items: stretch;
    gap: 12px;
  }
  .cc-detail-actions > * {
    max-width: 100%;
  }
  .cc-detail-coverage-card {
    padding: 12px;
    overflow-x: auto;
  }
}
`;

const ApartmentDetails = (() => {
type CleaningCoverageModalProps = {
  open: boolean;
  onClose: () => void;
};

const coverageRows = [
  {
    home: "1 BHK",
    bedrooms: 1,
    bathrooms: 1,
    balconies: 1,
  },
  {
    home: "2 BHK",
    bedrooms: 2,
    bathrooms: 2,
    balconies: 2,
  },
  {
    home: "3 BHK",
    bedrooms: 3,
    bathrooms: 3,
    balconies: 3,
  },
  {
    home: "4 BHK",
    bedrooms: 4,
    bathrooms: 4,
    balconies: 4,
  },
  {
    home: "5 BHK",
    bedrooms: 5,
    bathrooms: 5,
    balconies: 5,
  },
] as const;

function CleaningCoverageModal({
  open,
  onClose,
}: CleaningCoverageModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className={"cc-detail-coverage"}>
      <section
        className={"cc-detail-coverage-card"}
        role="region"
        aria-labelledby="cleaning-coverage-title"
      >
        <button
          type="button"
          className={"cc-fh-apartment-modal_coverage_closeButton"}
          aria-label="Close cleaning coverage"
          onClick={onClose}
        >
          ×
        </button>

        <div className={"cc-fh-apartment-modal_coverage_scrollArea"}>
          <header className={"cc-fh-apartment-modal_coverage_header"}>
            <h2
              id="cleaning-coverage-title"
              className={"cc-fh-apartment-modal_coverage_title"}
            >
              What does your cleaning cover?
            </h2>

            <p className={"cc-fh-apartment-modal_coverage_subtitle"}>
              Along with living and kitchen areas
            </p>
          </header>

          <div className={"cc-fh-apartment-modal_coverage_tableWrapper"}>
            <table className={"cc-fh-apartment-modal_coverage_coverageTable"}>
              <thead>
                <tr>
                  <th aria-label="Home size" />

                  <th>
                    <span>Number of</span>
                    <strong>Bedrooms</strong>
                  </th>

                  <th>
                    <span>Number of</span>
                    <strong>Bathrooms</strong>
                  </th>

                  <th>
                    <span>Number of</span>
                    <strong>Balconies</strong>
                  </th>
                </tr>
              </thead>

              <tbody>
                {coverageRows.map((row) => (
                  <tr key={row.home}>
                    <th scope="row">
                      {row.home}
                    </th>

                    <td>{row.bedrooms}</td>

                    <td>{row.bathrooms}</td>

                    <td>{row.balconies}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

type KitchenOptionId =
  | "cabinet-interior"
  | "chimney"
  | "refrigerator"
  | "microwave"
  | "gas-stove"
  | "air-fryer"
  | "otg"
  | "sandwich-griller";

type KitchenOption = {
  id: KitchenOptionId;
  label: string;
  price: number;
};

const kitchenOptions: ReadonlyArray<KitchenOption> = [
  {
    id: "cabinet-interior",
    label: "Kitchen cabinet interior",
    price: 349,
  },
  {
    id: "chimney",
    label: "Chimney cleaning",
    price: 399,
  },
  {
    id: "refrigerator",
    label: "Refrigerator cleaning",
    price: 399,
  },
  {
    id: "microwave",
    label: "Microwave cleaning",
    price: 199,
  },
  {
    id: "gas-stove",
    label: "Gas stove / hob cleaning",
    price: 99,
  },
  {
    id: "air-fryer",
    label: "Air fryer cleaning",
    price: 199,
  },
  {
    id: "otg",
    label: "OTG cleaning",
    price: 399,
  },
  {
    id: "sandwich-griller",
    label: "Sandwich maker / griller",
    price: 99,
  },
];
type KitchenSelection = {
  id: string;
  label: string;
  price: number;
};

type KitchenStorageAppliancesOptionsProps = {
  selectedOptions: KitchenSelection[];
  onChange: (options: KitchenSelection[]) => void;
};

function KitchenStorageAppliancesOptions({
  selectedOptions,
  onChange,
}: KitchenStorageAppliancesOptionsProps) {
  const scrollerRef =
    useRef<HTMLDivElement>(null);

const [canScrollLeft, setCanScrollLeft] =
    useState(false);

  const [canScrollRight, setCanScrollRight] =
    useState(true);

  const updateScrollState = useCallback(() => {
    const element = scrollerRef.current;

    if (!element) {
      return;
    }

    const maxScroll =
      element.scrollWidth - element.clientWidth;

    setCanScrollLeft(element.scrollLeft > 2);

    setCanScrollRight(
      element.scrollLeft < maxScroll - 2,
    );
  }, []);

  useEffect(() => {
    const element = scrollerRef.current;

    if (!element) {
      return;
    }

    const frame = window.requestAnimationFrame(
      updateScrollState,
    );

    element.addEventListener(
      "scroll",
      updateScrollState,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "resize",
      updateScrollState,
    );

    return () => {
      window.cancelAnimationFrame(frame);

      element.removeEventListener(
        "scroll",
        updateScrollState,
      );

      window.removeEventListener(
        "resize",
        updateScrollState,
      );
    };
  }, [updateScrollState]);

  const toggleOption = (id: KitchenOptionId) => {
    const option = kitchenOptions.find(item => item.id === id);
    if (!option) return;

    onChange(
      selectedOptions.some(item => item.id === id)
        ? selectedOptions.filter(item => item.id !== id)
        : [...selectedOptions, option]
    );
  };

  const scrollOptions = (
    direction: "left" | "right",
  ) => {
    const element = scrollerRef.current;

    if (!element) {
      return;
    }

    const amount =
      Math.max(element.clientWidth * 0.72, 250);

    element.scrollBy({
      left:
        direction === "right"
          ? amount
          : -amount,
      behavior: "smooth",
    });
  };

  return (
    <div className={"cc-fh-apartment-modal_kitchen_root"}>

      <div className={"cc-fh-apartment-modal_kitchen_slider"}>
        {canScrollLeft && (
          <button
            type="button"
            className={`${"cc-fh-apartment-modal_kitchen_arrow"} ${"cc-fh-apartment-modal_kitchen_arrowLeft"}`}
            aria-label="Show previous kitchen options"
            onClick={() =>
              scrollOptions("left")
            }
          >
            ←
          </button>
        )}

        <div
          ref={scrollerRef}
          className={"cc-fh-apartment-modal_kitchen_options"}
        >
          {kitchenOptions.map((option) => {
            const selected =
              selectedOptions.some(item => item.id === option.id);

            return (
              <button
                key={option.id}
                type="button"
                className={`${"cc-fh-apartment-modal_kitchen_optionCard"} ${
                  selected
                    ? "cc-fh-apartment-modal_kitchen_selected"
                    : ""
                }`}
                aria-pressed={selected}
                onClick={() =>
                  toggleOption(option.id)
                }
              >
                <span className={"cc-fh-apartment-modal_kitchen_optionName"}>
                  {option.label}
                </span>

                <strong className={"cc-fh-apartment-modal_kitchen_price"}>
                  ₹
                  {option.price.toLocaleString(
                    "en-IN",
                  )}
                </strong>
              </button>
            );
          })}
        </div>

        {canScrollRight && (
          <button
            type="button"
            className={`${"cc-fh-apartment-modal_kitchen_arrow"} ${"cc-fh-apartment-modal_kitchen_arrowRight"}`}
            aria-label="Show more kitchen options"
            onClick={() =>
              scrollOptions("right")
            }
          >
            →
          </button>
        )}
      </div>

    </div>
  );
}

type ApartmentRequirementsModalProps = {
  serviceId?: string;
  serviceTitle: string;
  startingPrice: string;
  duration: string;
};

const homeSizes = [
  {
    id: "1-bhk",
    label: "1 BHK",
    price: 3199,
    priceLabel: "₹3,199",
  },
  {
    id: "2-bhk",
    label: "2 BHK",
    price: 3499,
    priceLabel: "₹3,499",
  },
  {
    id: "3-bhk",
    label: "3 BHK",
    price: 4299,
    priceLabel: "₹4,299",
  },
  {
    id: "4-bhk",
    label: "4 BHK",
    price: 5499,
    priceLabel: "₹5,499",
  },
  {
    id: "5-bhk",
    label: "5 BHK",
    price: 5999,
    priceLabel: "₹5,999",
  },
] as const;

const requirementGroups = [
  {
    id: "kitchen-storage",
    title: "Kitchen storage & appliances",
    description:
      "Choose additional kitchen cabinet and appliance cleaning.",
  },
  {
    id: "extra-area",
    title: "Additional room or area",
    description:
      "Add another suitable room, balcony or residential area.",
  },
] as const;

const extraAreaOptions = [
  {
    id: "extra-bedroom",
    label: "Extra bedroom",
    price: 299,
    priceLabel: "₹299",
  },
  {
    id: "extra-bathroom",
    label: "Extra bathroom",
    price: 199,
    priceLabel: "₹199",
  },
  {
    id: "extra-balcony",
    label: "Extra balcony",
    price: 149,
    priceLabel: "₹149",
  },
  {
    id: "study-pooja-room",
    label: "Study / Pooja room",
    price: 199,
    priceLabel: "₹199",
  },
  {
    id: "utility-store-room",
    label: "Utility / Store room",
    price: 149,
    priceLabel: "₹149",
  },
  {
    id: "terrace-open-area",
    label: "Terrace / open area",
    price: 399,
    priceLabel: "₹399",
  },
] as const;

const excludedItems = [
  "Permanent paint, glue or construction stains",
  "Unsafe exterior areas without secure access",
  "Wet washing of painted walls and ceilings",
  "Construction debris or active renovation waste",
] as const;

const ratingBars = [
  { label: "5", width: "88%" },
  { label: "4", width: "62%" },
  { label: "3", width: "34%" },
  { label: "2", width: "18%" },
  { label: "1", width: "10%" },
] as const;

function makeServiceId(
  serviceTitle: string,
): string {
  return serviceTitle
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}


function ApartmentRequirementsModal({
  serviceId,
  serviceTitle,
  startingPrice,
  duration,
}: ApartmentRequirementsModalProps) {
  const isOpen = true;
  const router = useRouter();

  const [isCoverageOpen, setIsCoverageOpen] =
    useState(false);

  const [selectedSize, setSelectedSize] = useState("");

  const [kitchenSelections, setKitchenSelections] = useState<
    { id: string; label: string; price: number }[]
  >([]);

  const [extraAreaSelections, setExtraAreaSelections] = useState<
    { id: string; label: string; price: number }[]
  >([]);

  const [expandedGroup, setExpandedGroup] =
    useState<string | null>(null);
const sizeScrollerRef =
    useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] =
    useState(false);

  const [canScrollRight, setCanScrollRight] =
    useState(true);
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const slider = sizeScrollerRef.current;

    if (!slider) {
      return;
    }

    const updateArrowVisibility = () => {
      const maxScrollLeft =
        slider.scrollWidth - slider.clientWidth;

      setCanScrollLeft(slider.scrollLeft > 2);

      setCanScrollRight(
        slider.scrollLeft < maxScrollLeft - 2,
      );
    };

    const frame = window.requestAnimationFrame(() => {
      slider.scrollLeft = 0;
      updateArrowVisibility();
    });

    slider.addEventListener(
      "scroll",
      updateArrowVisibility,
      {
        passive: true,
      },
    );

    window.addEventListener(
      "resize",
      updateArrowVisibility,
    );

    return () => {
      window.cancelAnimationFrame(frame);

      slider.removeEventListener(
        "scroll",
        updateArrowVisibility,
      );

      window.removeEventListener(
        "resize",
        updateArrowVisibility,
      );
    };
  }, [isOpen]);
  const selectedHome = homeSizes.find(
    (home) => home.id === selectedSize,
  );

  const scrollSizes = (
    direction: "left" | "right",
  ) => {
    const element = sizeScrollerRef.current;

    if (!element) {
      return;
    }

    const distance =
      Math.max(
        220,
        element.clientWidth * 0.75,
      );

    element.scrollBy({
      left:
        direction === "right"
          ? distance
          : -distance,
      behavior: "smooth",
    });
  };

  const kitchenTotal = kitchenSelections.reduce(
    (sum, option) => sum + option.price,
    0,
  );

  const extraAreaTotal = extraAreaSelections.reduce(
    (sum, option) => sum + option.price,
    0,
  );

  const selectionTotal =
    (selectedHome?.price ?? 0) +
    kitchenTotal +
    extraAreaTotal;

  const selectionPriceLabel = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(selectionTotal);

  const selectionLabel = [
    selectedHome?.label,
    ...kitchenSelections.map(option => option.label),
    ...extraAreaSelections.map(option => option.label),
  ].filter(Boolean).join(" + ");

  const handleContinue = () => {
    if (!selectedHome) {
      return;
    }
    upsertServiceCartItem({
      id:
        serviceId ??
        makeServiceId(serviceTitle),

      serviceTitle,

      optionLabel: selectionLabel,

      price: selectionTotal,

      priceLabel: selectionPriceLabel,

      duration,
    });

    if (window.matchMedia("(max-width: 760px)").matches) {
      window.sessionStorage.setItem("citycoolies:full-home-scroll-cart", "1");
    }
    router.push(FULL_HOME_PATH);
  };

  const modal = (
          <div
            className={"cc-detail-content"}
          >
            <div className={"cc-detail-sheet"}>

              <div
                className={"cc-detail-body"}
                role="region"
                                aria-labelledby="requirements-modal-title"
              >
                <header className={"cc-fh-apartment-modal_modalHeader"}>
                  <h2
                    id="requirements-modal-title"
                    className={"cc-fh-apartment-modal_serviceTitle"}
                  >
                    {serviceTitle}
                  </h2>

                  <p className={"cc-fh-apartment-modal_serviceMeta"}>
                    Starts at {startingPrice}

                    <span aria-hidden="true">
                      •
                    </span>

                    {duration}
                  </p>
                </header>

                <div className={"cc-fh-apartment-modal_serviceHighlights"}>
                  <p>
                    <span aria-hidden="true">
                      &#10003;
                    </span>
                    Deep cleaning of rooms, kitchen, bathrooms &amp; balcony
                  </p>

                  <p>
                    <span aria-hidden="true">
                      &#10003;
                    </span>
                    Machine floor scrubbing &amp; wall/ceiling dusting
                  </p>
                </div>

                <section className={"cc-fh-apartment-modal_section"}>
                  <h3 className={"cc-fh-apartment-modal_mainHeading"}>
                    Choose your requirements
                  </h3>

                  <div className={"cc-fh-apartment-modal_requirementBlock"}>
                    <h4 className={"cc-fh-apartment-modal_blockHeading"}>
                      Select your home size
                    </h4>

                    <div
                      className={
                        "cc-fh-apartment-modal_sizeSliderShell"
                      }
                    >
                      {canScrollLeft && (
                        <button
                          type="button"
                          className={`${"cc-fh-apartment-modal_sliderArrow"} ${"cc-fh-apartment-modal_sliderArrowLeft"}`}
                          aria-label="Show previous home sizes"
                          onClick={() =>
                            scrollSizes("left")
                          }
                        >
                          ←
                        </button>
                      )}

                      <div
                        ref={sizeScrollerRef}
                        className={"cc-fh-apartment-modal_sizeScroller"}
                      >
                        {homeSizes.map((home) => {
                          const selected =
                            selectedSize === home.id;

                          return (
                            <button
                              key={home.id}
                              type="button"
                              className={`${"cc-fh-apartment-modal_sizeOption"} ${
                                selected
                                  ? "cc-fh-apartment-modal_sizeOptionSelected"
                                  : ""
                              }`}
                              aria-pressed={selected}
                              onClick={() =>
                                setSelectedSize((current) =>
                                  current === home.id
                                    ? ""
                                    : home.id,
                                )
                              }
                            >
                              <span className="cc-fh-homeSizeIcon" aria-hidden="true">
                                <img src={home.id === "4-bhk" ? "/deep-cleaning/house-4bhk.png" : home.id === "2-bhk" || home.id === "5-bhk" ? "/deep-cleaning/house-2bhk.png" : "/deep-cleaning/house-1bhk.png"} alt="" loading="eager" decoding="async" />
                              </span>
                              <span className="cc-fh-homeSizeText">
                                <span>{home.label}</span>
                                <strong>{home.priceLabel}</strong>
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {canScrollRight && (
                        <button
                          type="button"
                          className={`${"cc-fh-apartment-modal_sliderArrow"} ${"cc-fh-apartment-modal_sliderArrowRight"}`}
                          aria-label="Show more home sizes"
                          onClick={() =>
                            scrollSizes("right")
                          }
                        >
                          →
                        </button>
                      )}
                    </div>

                    <a
                      href="#city-coolies-cleaning-coverage"
                      className={"cc-fh-apartment-modal_coverageLink"}
                      onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
                        event.preventDefault();
                        setIsCoverageOpen(true);
                      }}
                    >
                      See what your cleaning covers
                    </a>
                  </div>

                  <div className={"cc-fh-apartment-modal_accordion"}>
                    {requirementGroups.map(
                      (group) => {
                        const expanded =
                          expandedGroup === group.id;

                        return (
                          <div
                            key={group.id}
                            className={
                              "cc-fh-apartment-modal_accordionItem"
                            }
                          >
                            <button
                              type="button"
                              className={
                                "cc-fh-apartment-modal_accordionButton"
                              }
                              aria-expanded={
                                expanded
                              }
                              onClick={() => {
setExpandedGroup(
                                  expanded
                                    ? null
                                    : group.id,
                                );
                              }}
                            >
                              <span>
                                {group.title}
                              </span>

                              <span
                                className={`${"cc-fh-apartment-modal_chevron"} ${
                                  expanded
                                    ? "cc-fh-apartment-modal_chevronExpanded"
                                    : ""
                                }`}
                                aria-hidden="true"
                              >
                                ⌄
                              </span>
                            </button>

                            {expanded && (
                              <div
                                className={
                                  "cc-fh-apartment-modal_accordionContent"
                                }
                              >
                                {group.id === "kitchen-storage" ? (
                                  <div>
                                    <KitchenStorageAppliancesOptions
                                      selectedOptions={kitchenSelections}
                                      onChange={setKitchenSelections}
                                    />
                                    <p
                                      role="status"
                                      style={{
                                        margin: "8px 0 0",
                                        fontSize: "13px",
                                        lineHeight: 1.5,
                                        color: "#b9141d",
                                      }}
                                    >
                                      {kitchenSelections.length > 0
                                        ? `Selected: ${kitchenSelections.map(option => option.label).join(", ")}`
                                        : "Select the kitchen services you need"}
                                    </p>
                                  </div>
                                ) : (
                                  <div>
                                    <div className={"cc-fh-apartment-modal_extraAreaOptions"}>
                                      {extraAreaOptions.map((option) => {
                                        const selected =
                                          extraAreaSelections.some(
                                            (item) =>
                                              item.id === option.id,
                                          );

                                        return (
                                          <button
                                            key={option.id}
                                            type="button"
                                            className={`${"cc-fh-apartment-modal_extraAreaOption"} ${
                                              selected
                                                ? "cc-fh-apartment-modal_extraAreaOptionSelected"
                                                : ""
                                            }`}
                                            aria-pressed={selected}
                                            onClick={() => {
                                              setExtraAreaSelections(
                                                (current) => {
                                                  const alreadySelected =
                                                    current.some(
                                                      (item) =>
                                                        item.id ===
                                                        option.id,
                                                    );

                                                  if (alreadySelected) {
                                                    return current.filter(
                                                      (item) =>
                                                        item.id !==
                                                        option.id,
                                                    );
                                                  }

                                                  return [
                                                    ...current,
                                                    {
                                                      id: option.id,
                                                      label: option.label,
                                                      price: option.price,
                                                    },
                                                  ];
                                                },
                                              );
                                            }}
                                          >
                                            <span>
                                              {option.label}
                                            </span>

                                            <strong>
                                              + {option.priceLabel}
                                            </strong>
                                          </button>
                                        );
                                      })}
                                    </div>

                                    <p className={"cc-fh-apartment-modal_extraAreaHint"}>
                                      Select any extra spaces you want included.
                                    </p>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      },
                    )}
                  </div>
                </section>

<section
                  id="city-coolies-service-coverage"
                  className={"cc-fh-apartment-modal_section"}
                >
                  <h3 className={"cc-fh-apartment-modal_sectionHeading"}>
                    What&apos;s covered
                  </h3>

                  <div className={"cc-fh-apartment-modal_coverageVisualGrid"}>
                    <article className={"cc-fh-apartment-modal_coverageVisualItem"}>
                      <div className={"cc-fh-apartment-modal_coverageVisualImageWrap"}>
                        <img loading="eager" decoding="async"
                          src="/deep-cleaning/floor-scrubbing.webp"
                          alt="Machine floor scrubbing"
                          className={"cc-fh-apartment-modal_coverageVisualImage"}
                        />
                      </div>
                      <p className={"cc-fh-apartment-modal_coverageVisualName"}>
                        Machine floor scrubbing
                      </p>
                    </article>

                    <article className={"cc-fh-apartment-modal_coverageVisualItem"}>
                      <div className={"cc-fh-apartment-modal_coverageVisualImageWrap"}>
                        <img loading="eager" decoding="async"
                          src="/deep-cleaning/balcony-floor-cleaning.webp"
                          alt="Balcony floor cleaning"
                          className={"cc-fh-apartment-modal_coverageVisualImage"}
                        />
                      </div>
                      <p className={"cc-fh-apartment-modal_coverageVisualName"}>
                        Balcony floor cleaning
                      </p>
                    </article>

                    <article className={"cc-fh-apartment-modal_coverageVisualItem"}>
                      <div className={"cc-fh-apartment-modal_coverageVisualImageWrap"}>
                        <img loading="eager" decoding="async"
                          src="/deep-cleaning/wash-basin-fittings.webp"
                          alt="Wash basin and fittings"
                          className={"cc-fh-apartment-modal_coverageVisualImage"}
                        />
                      </div>
                      <p className={"cc-fh-apartment-modal_coverageVisualName"}>
                        Wash basin & fittings
                      </p>
                    </article>

                    <article className={"cc-fh-apartment-modal_coverageVisualItem"}>
                      <div className={"cc-fh-apartment-modal_coverageVisualImageWrap"}>
                        <img loading="eager" decoding="async"
                          src="/deep-cleaning/toilet-bathroom-fixtures.webp"
                          alt="Toilet and bathroom fixtures"
                          className={"cc-fh-apartment-modal_coverageVisualImage"}
                        />
                      </div>
                      <p className={"cc-fh-apartment-modal_coverageVisualName"}>
                        Toilet & bathroom fixtures
                      </p>
                    </article>

                    <article className={"cc-fh-apartment-modal_coverageVisualItem"}>
                      <div className={"cc-fh-apartment-modal_coverageVisualImageWrap"}>
                        <img loading="eager" decoding="async"
                          src="/deep-cleaning/bathroom-floor-scrub.webp"
                          alt="Bathroom floor scrubbing"
                          className={"cc-fh-apartment-modal_coverageVisualImage"}
                        />
                      </div>
                      <p className={"cc-fh-apartment-modal_coverageVisualName"}>
                        Bathroom floor scrubbing
                      </p>
                    </article>

                    <article className={"cc-fh-apartment-modal_coverageVisualItem"}>
                      <div className={"cc-fh-apartment-modal_coverageVisualImageWrap"}>
                        <img loading="eager" decoding="async"
                          src="/deep-cleaning/kitchen-surface-cleaning.webp"
                          alt="Kitchen surface cleaning"
                          className={"cc-fh-apartment-modal_coverageVisualImage"}
                        />
                      </div>
                      <p className={"cc-fh-apartment-modal_coverageVisualName"}>
                        Kitchen surface cleaning
                      </p>
                    </article>

                    <article className={"cc-fh-apartment-modal_coverageVisualItem"}>
                      <div className={"cc-fh-apartment-modal_coverageVisualImageWrap"}>
                        <img loading="eager" decoding="async"
                          src="/deep-cleaning/sink-under-sink.webp"
                          alt="Sink and under sink cleaning"
                          className={"cc-fh-apartment-modal_coverageVisualImage"}
                        />
                      </div>
                      <p className={"cc-fh-apartment-modal_coverageVisualName"}>
                        Sink & under sink
                      </p>
                    </article>

                    <article className={"cc-fh-apartment-modal_coverageVisualItem"}>
                      <div className={"cc-fh-apartment-modal_coverageVisualImageWrap"}>
                        <img loading="eager" decoding="async"
                          src="/deep-cleaning/kitchen-tiles-counter.webp"
                          alt="Kitchen tiles and counter cleaning"
                          className={"cc-fh-apartment-modal_coverageVisualImage"}
                        />
                      </div>
                      <p className={"cc-fh-apartment-modal_coverageVisualName"}>
                        Kitchen tiles & counter
                      </p>
                    </article>

                    <article className={"cc-fh-apartment-modal_coverageVisualItem"}>
                      <div className={"cc-fh-apartment-modal_coverageVisualImageWrap"}>
                        <img loading="eager" decoding="async"
                          src="/deep-cleaning/cabinet-surface-cleaning.webp"
                          alt="Cabinet surface cleaning"
                          className={"cc-fh-apartment-modal_coverageVisualImage"}
                        />
                      </div>
                      <p className={"cc-fh-apartment-modal_coverageVisualName"}>
                        Cabinet surface cleaning
                      </p>
                    </article>

                    <article className={"cc-fh-apartment-modal_coverageVisualItem"}>
                      <div className={"cc-fh-apartment-modal_coverageVisualImageWrap"}>
                        <img loading="eager" decoding="async"
                          src="/deep-cleaning/ceiling-fan-dusting.webp"
                          alt="Ceiling fan dusting"
                          className={"cc-fh-apartment-modal_coverageVisualImage"}
                        />
                      </div>
                      <p className={"cc-fh-apartment-modal_coverageVisualName"}>
                        Ceiling fan dusting
                      </p>
                    </article>

                    <article className={"cc-fh-apartment-modal_coverageVisualItem"}>
                      <div className={"cc-fh-apartment-modal_coverageVisualImageWrap"}>
                        <img loading="eager" decoding="async"
                          src="/deep-cleaning/doors-windows-mirrors-cleaning.webp"
                          alt="Doors, windows and mirrors cleaning"
                          className={"cc-fh-apartment-modal_coverageVisualImage"}
                        />
                      </div>
                      <p className={"cc-fh-apartment-modal_coverageVisualName"}>
                        Doors, windows and mirrors
                      </p>
                    </article>

                    <article className={"cc-fh-apartment-modal_coverageVisualItem"}>
                      <div className={"cc-fh-apartment-modal_coverageVisualImageWrap"}>
                        <img loading="eager" decoding="async"
                          src="/deep-cleaning/switches-reachable-fixtures-cleaning.webp"
                          alt="Switches and reachable fixtures cleaning"
                          className={"cc-fh-apartment-modal_coverageVisualImage"}
                        />
                      </div>
                      <p className={"cc-fh-apartment-modal_coverageVisualName"}>
                        Switches and reachable fixtures
                      </p>
                    </article>
                  </div>
                </section>

                <section className={"cc-fh-apartment-modal_section"}>
                  <h3 className={"cc-fh-apartment-modal_sectionHeading"}>
                    Not part of this package
                  </h3>

                  <ul className={"cc-fh-apartment-modal_excludedList"}>
                    {excludedItems.map((item) => (
                      <li key={item}>
                        <span
                          className={
                            "cc-fh-apartment-modal_crossIcon"
                          }
                          aria-hidden="true"
                        >
                          ×
                        </span>

                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className={"cc-fh-apartment-modal_section"}>
                  <div
                    className={
                      "cc-fh-apartment-modal_protectionBox"
                    }
                  >
                    <div>
                      <h3
                        className={
                          "cc-fh-apartment-modal_protectionTitle"
                        }
                      >
                        Service protection
                      </h3>

                      <p>
                        Support is available for
                        verified service issues
                        reported during the booking.
                      </p>
                    </div>

                    <div
                      className={"cc-fh-apartment-modal_shield"}
                      aria-hidden="true"
                    >
                      ✓
                    </div>
                  </div>
                </section>

                <section className={"cc-fh-apartment-modal_section"}>
                  <h3 className={"cc-fh-apartment-modal_ratingTitle"}>
                    ★ 4.4
                  </h3>

                  <p className={"cc-fh-apartment-modal_ratingCaption"}>
                    Customer rating
                  </p>

                  <div className={"cc-fh-apartment-modal_ratingBars"}>
                    {ratingBars.map((rating) => (
                      <div
                        key={rating.label}
                        className={
                          "cc-fh-apartment-modal_ratingBarRow"
                        }
                      >
                        <span>
                          ★ {rating.label}
                        </span>

                        <div
                          className={
                            "cc-fh-apartment-modal_ratingTrack"
                          }
                        >
                          <span
                            style={{
                              width: rating.width,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <footer className={selectedHome ? "cc-detail-actions cc-fh-selection-ready" : "cc-detail-actions cc-fh-selection-hidden"}>
                  <div
                    className={
                      "cc-fh-apartment-modal_footerSelection"
                    }
                  >
                    <span className={"cc-fh-apartment-modal_footerLabel"}>Total</span>

                    {selectedHome ? (<strong>{selectionPriceLabel}</strong>) : (
                      <strong>
                        Select a home size
                      </strong>
                    )}
                  </div>

                  <div
                    className={
                      "cc-fh-apartment-modal_footerActions"
                    }
                  >

<button
                      type="button"
                      className={
                        "cc-fh-apartment-modal_continueButton"
                      }
                      onClick={handleContinue}
                      disabled={!selectedHome}
                    >
                      Continue
                    </button>
                  </div>
                </footer>
              </div>
            </div>
          </div>
  );

  return (
    <>
      <CleaningCoverageModal
        open={isCoverageOpen}
        onClose={() => setIsCoverageOpen(false)}
      />

      {modal}
    </>
  );
}



return function ApartmentDetailsPage({
  serviceId,
}: {
  serviceId: string;
}) {
  const service = apartmentServices.find(
    (item) => item.id === serviceId,
  );

  if (!service) {
    return null;
  }

  return (
    <>
      <style>{APARTMENT_CSS}</style>
      <ApartmentRequirementsModal
        serviceId={service.id}
        serviceTitle={service.title}
        startingPrice={service.price}
        duration={service.duration}
      />
    </>
  );
};
})();

const BungalowDetails = (() => {
const homeCleaningServices = bungalowServices;

type BungalowSurveyModalProps = {
  serviceId: string;
  serviceTitle: string;
};

const SURVEY_PRICE = 500;
const SURVEY_PRICE_LABEL = "₹500";
const BUNGALOW_CLEANING_VISUALS = [
  {
    id: "floor-deep-cleaning",
    name: "Floor deep cleaning",
    image:
      "/deep-cleaning/bungalow-floor-deep-cleaning.webp",
  },
  {
    id: "staircase-cleaning",
    name: "Staircase cleaning",
    image:
      "/deep-cleaning/bungalow-staircase-cleaning.webp",
  },
  {
    id: "kitchen-deep-cleaning",
    name: "Kitchen deep cleaning",
    image:
      "/deep-cleaning/bungalow-kitchen-deep-cleaning.webp",
  },
  {
    id: "bathroom-deep-cleaning",
    name: "Bathroom deep cleaning",
    image:
      "/deep-cleaning/bungalow-bathroom-deep-cleaning.webp",
  },
  {
    id: "window-glass-cleaning",
    name: "Window & glass cleaning",
    image:
      "/deep-cleaning/bungalow-window-glass-cleaning.webp",
  },
  {
    id: "fan-switch-fixture-cleaning",
    name: "Fan, switch & fixture cleaning",
    image:
      "/deep-cleaning/bungalow-fan-switch-fixture-cleaning.webp",
  },
] as const;
const BUNGALOW_RATING_BREAKDOWN = [
  {
    stars: 5,
    percentage: 47,
    reviews: 423,
  },
  {
    stars: 4,
    percentage: 34,
    reviews: 306,
  },
  {
    stars: 3,
    percentage: 13,
    reviews: 117,
  },
  {
    stars: 2,
    percentage: 4,
    reviews: 36,
  },
  {
    stars: 1,
    percentage: 2,
    reviews: 18,
  },
] as const;


function BungalowSurveyDetailsContent({
  serviceId,
  serviceTitle,
}: BungalowSurveyModalProps) {
  const router = useRouter();

  const serviceFeatures =
    homeCleaningServices.find((service) => service.id === serviceId)?.features ?? [];



  const handleAddSurvey = () => {
    upsertServiceCartItem({
      id: `${serviceId}-site-survey`,
      serviceTitle,
      optionLabel: "Property site survey",
      price: SURVEY_PRICE,
      priceLabel: SURVEY_PRICE_LABEL,
      duration: "Site survey",
    });

    if (window.matchMedia("(max-width: 760px)").matches) {
      window.sessionStorage.setItem("citycoolies:full-home-scroll-cart", "1");
    }
    router.push(FULL_HOME_PATH);
  };

  const modal = (
          <div
            className={"cc-detail-content"}
          >
            <div
              className={"cc-detail-sheet"}
              role="region"
                            aria-labelledby={`${serviceId}-survey-title`}
            >

              <div
                className={
                  "cc-detail-body"
                }
              >
                <header
                  className={
                    "cc-bungalow-modal_header"
                  }
                >
                  <h2
                    id={`${serviceId}-survey-title`}
                    className={
                      "cc-bungalow-modal_title"
                    }
                  >
                    {serviceTitle}
                  </h2>

                  <div
                    className={
                      "cc-bungalow-modal_priceRow"
                    }
                  >
                    <span>
                      Site survey charges
                    </span>

                    <strong>
                      {SURVEY_PRICE_LABEL}
                    </strong>
                  </div>

                                    <p
                    className={
                      "cc-bungalow-modal_squareFootRate"
                    }
                  >
                    {serviceId.startsWith("unfurnished-")
                      ? "₹6.00 per sq. ft."
                      : "₹7.00 per sq. ft."}
                  </p>
                </header>

                <section
                  className={
                    "cc-bungalow-modal_content"
                  }
                >
                  <h3
                    className={
                      "cc-bungalow-modal_sectionTitle"
                    }
                  >
                    Property site survey
                  </h3>

                  <p
                    className={
                      "cc-bungalow-modal_description"
                    }
                  >
                    After the site survey, we’ll confirm the final price based on the actual area, condition and work required.
                  </p>

                  <ul className="cc-bungalow-modal_serviceFeatures">
                      {serviceFeatures.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>

                  <div
                    className={
                      "cc-bungalow-modal_surveyList"
                    }
                  >
                    <div
                      className={
                        "cc-bungalow-modal_surveyItem"
                      }
                    >
                      <span
                        className={
                          "cc-bungalow-modal_check"
                        }
                        aria-hidden="true"
                      >
                        ✓
                      </span>

                      <span>
                        Property size and floor
                        layout
                      </span>
                    </div>

                    <div
                      className={
                        "cc-bungalow-modal_surveyItem"
                      }
                    >
                      <span
                        className={
                          "cc-bungalow-modal_check"
                        }
                        aria-hidden="true"
                      >
                        ✓
                      </span>

                      <span>
                        Furnishing and cleaning
                        condition
                      </span>
                    </div>

                    <div
                      className={
                        "cc-bungalow-modal_surveyItem"
                      }
                    >
                      <span
                        className={
                          "cc-bungalow-modal_check"
                        }
                        aria-hidden="true"
                      >
                        ✓
                      </span>

                      <span>
                        Special cleaning
                        requirements
                      </span>
                    </div>
                  </div>
                  <div
                    className={
                      "cc-bungalow-modal_cleaningVisualGrid"
                    }
                  >
                    {BUNGALOW_CLEANING_VISUALS.map(
                      (item) => (
                        <figure
                          key={item.id}
                          className={
                            "cc-bungalow-modal_cleaningVisualItem"
                          }
                        >
                          <img decoding="async"
                            src={item.image}
                            alt={item.name}
                            className={
                              "cc-bungalow-modal_cleaningVisualImage"
                            }
                            loading="eager"
                          />

                          <figcaption
                            className={
                              "cc-bungalow-modal_cleaningVisualName"
                            }
                          >
                            {item.name}
                          </figcaption>
                        </figure>
                      ),
                    )}
                  </div>

                  <section
                    className={
                      "cc-bungalow-modal_includedSection"
                    }
                  >
                    <h3
                      className={
                        "cc-bungalow-modal_includedTitle"
                      }
                    >
                      What&apos;s Included
                    </h3>

                    <ul
                      className={
                        "cc-bungalow-modal_includedList"
                      }
                    >
                      <li>
                        Machine floor scrubbing
                      </li>

                      <li>
                        Ceiling and fan dusting
                      </li>

                      <li>
                        Windows, doors, mirrors and glass cleaning
                      </li>

                      <li>
                        Switches, sockets and reachable fixtures cleaning
                      </li>

                      <li>
                        Furniture surface cleaning
                      </li>

                      <li>
                        Staircase and railing cleaning
                      </li>

                      <li>
                        Cabinet exterior cleaning
                        <span className={"cc-bungalow-modal_includedNote"}>
                          {" "}
                          (interiors cleaned when empty)
                        </span>
                      </li>

                      <li>
                        Sofa and mattress dry vacuuming
                        <span className={"cc-bungalow-modal_includedNote"}>
                          {" "}
                          (wet shampooing available at extra cost)
                        </span>
                      </li>

                      <li>
                        Kitchen countertop, sink and stove cleaning
                      </li>

                      <li>
                        Kitchen cabinet exterior cleaning
                      </li>

                      <li>
                        Appliance exterior cleaning
                      </li>

                      <li>
                        Bathroom fixtures, wash basin and shower-area cleaning
                      </li>

                      <li>
                        Tile and grout scrubbing
                      </li>
                    </ul>
                  </section>

                  <section
                    className={
                      "cc-bungalow-modal_ratingBreakdownSection"
                    }
                    aria-label="Customer ratings"
                  >
                    <div
                      className={
                        "cc-bungalow-modal_ratingSummary"
                      }
                    >
                      <div
                        className={
                          "cc-bungalow-modal_ratingScoreRow"
                        }
                      >
                        <span
                          className={
                            "cc-bungalow-modal_ratingMainStar"
                          }
                          aria-hidden="true"
                        >
                          ★
                        </span>

                        <strong
                          className={
                            "cc-bungalow-modal_ratingScore"
                          }
                        >
                          4.2
                        </strong>
                      </div>

                      <p
                        className={
                          "cc-bungalow-modal_ratingReviewCount"
                        }
                      >
                        900 reviews
                      </p>
                    </div>

                    <div
                      className={
                        "cc-bungalow-modal_ratingBars"
                      }
                    >
                      {BUNGALOW_RATING_BREAKDOWN.map(
                        (rating) => (
                          <div
                            key={rating.stars}
                            className={
                              "cc-bungalow-modal_ratingBarRow"
                            }
                          >
                            <div
                              className={
                                "cc-bungalow-modal_ratingBarLabel"
                              }
                            >
                              <span>
                                {rating.stars}
                              </span>

                              <span
                                className={
                                  "cc-bungalow-modal_ratingSmallStar"
                                }
                                aria-hidden="true"
                              >
                                ★
                              </span>
                            </div>

                            <div
                              className={
                                "cc-bungalow-modal_ratingTrack"
                              }
                              role="progressbar"
                              aria-label={`${rating.stars} star ratings`}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              aria-valuenow={
                                rating.percentage
                              }
                            >
                              <span
                                className={
                                  "cc-bungalow-modal_ratingFill"
                                }
                                style={{
                                  width: `${rating.percentage}%`,
                                }}
                              />
                            </div>

                            <span
                              className={
                                "cc-bungalow-modal_ratingPercentage"
                              }
                            >
                              {rating.percentage}%
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </section>
</section>
              </div>

              <footer
                className={
                  "cc-detail-actions"
                }
              >
                <div>
                  <span
                    className={
                      "cc-bungalow-modal_footerLabel"
                    }
                  >
                    Site survey
                  </span>

                  <strong
                    className={
                      "cc-bungalow-modal_footerPrice"
                    }
                  >
                    {SURVEY_PRICE_LABEL}
                  </strong>
                </div>

                <button
                  type="button"
                  className={
                    "cc-bungalow-modal_confirmButton"
                  }
                  onClick={
                    handleAddSurvey
                  }
                >
                  Add site survey
                </button>
              </footer>
            </div>
          </div>
  );

  return <>{modal}</>;
}


return function BungalowDetailsPage({
  serviceId,
}: {
  serviceId: string;
}) {
  const service = homeCleaningServices.find(
    (item) => item.id === serviceId,
  );

  if (!service) {
    return null;
  }

  return (
    <>
      <style>{BUNGALOW_CSS}</style>
      <BungalowSurveyDetailsContent
        serviceId={service.id}
        serviceTitle={service.title}
      />
    </>
  );
};
})();

const VillaDetails = (() => {
const homeCleaningServices = villaServices;

const styles = {
  modal_overlay: "cc-detail-content",
  modal_modal: "cc-detail-sheet",
  modal_closeButton: "cc-villa-modal_closeButton",
  modal_scrollArea: "cc-detail-body",
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
  modal_footer: "cc-detail-actions",
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
};

const SURVEY_PRICE = 500;
const SURVEY_PRICE_LABEL = "₹500";
const VILLA_RATING_BREAKDOWN = [
  {
    stars: 5,
    percentage: 47,
    reviews: 423,
  },
  {
    stars: 4,
    percentage: 34,
    reviews: 306,
  },
  {
    stars: 3,
    percentage: 13,
    reviews: 117,
  },
  {
    stars: 2,
    percentage: 4,
    reviews: 36,
  },
  {
    stars: 1,
    percentage: 2,
    reviews: 18,
  },
] as const;


function VillaSurveyDetailsContent({
  serviceId,
  serviceTitle,
}: VillaSurveyModalProps) {
  const router = useRouter();

  const serviceFeatures =
    homeCleaningServices.find(
      (service) => service.id === serviceId
    )?.features ?? [];



  const handleAddSurvey = () => {
    upsertServiceCartItem({
      id: `${serviceId}-site-survey`,
      serviceTitle,
      optionLabel: "Property site survey",
      price: SURVEY_PRICE,
      priceLabel: SURVEY_PRICE_LABEL,
      duration: "Site survey",
    });

    if (window.matchMedia("(max-width: 760px)").matches) {
      window.sessionStorage.setItem("citycoolies:full-home-scroll-cart", "1");
    }
    router.push(FULL_HOME_PATH);
  };

  const modal = (
          <div
            className={styles.modal_overlay}
          >
            <style>{VILLA_CSS}</style>
            <div
              className={styles.modal_modal}
              role="region"
                            aria-labelledby={`${serviceId}-survey-title`}
            >

              <div
                className={
                  styles.modal_scrollArea
                }
              >
                <header
                  className={
                    styles.modal_header
                  }
                >
                  <h2
                    id={`${serviceId}-survey-title`}
                    className={
                      styles.modal_title
                    }
                  >
                    {serviceTitle}
                  </h2>

                  <div
                    className={
                      styles.modal_priceRow
                    }
                  >
                    <span>
                      Site survey charges
                    </span>

                    <strong>
                      {SURVEY_PRICE_LABEL}
                    </strong>
                  </div>

                                    <p
                    className={
                      styles.modal_squareFootRate
                    }
                  >
                    {serviceId.startsWith("unfurnished-")
                      ? "₹6.00 per sq. ft."
                      : "₹7.00 per sq. ft."}
                  </p>
                </header>

                <section
                  className={
                    styles.modal_content
                  }
                >
                  <h3
                    className={
                      styles.modal_sectionTitle
                    }
                  >
                    Property site survey
                  </h3>

                  <p
                    className={
                      styles.modal_description
                    }
                  >
                    After the site survey, we’ll confirm the final price based on the actual area, condition and work required.
                  </p>

                  <ul className={styles.modal_serviceFeatures}>
                    {serviceFeatures.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>

                  <div className={styles.modal_surveyList}
                  >
                    <div
                      className={
                        styles.modal_surveyItem
                      }
                    >
                      <span
                        className={
                          styles.modal_check
                        }
                        aria-hidden="true"
                      >
                        ✓
                      </span>

                      <span>
                        Property size and floor
                        layout
                      </span>
                    </div>

                    <div
                      className={
                        styles.modal_surveyItem
                      }
                    >
                      <span
                        className={
                          styles.modal_check
                        }
                        aria-hidden="true"
                      >
                        ✓
                      </span>

                      <span>
                        Furnishing and cleaning
                        condition
                      </span>
                    </div>

                    <div
                      className={
                        styles.modal_surveyItem
                      }
                    >
                      <span
                        className={
                          styles.modal_check
                        }
                        aria-hidden="true"
                      >
                        ✓
                      </span>

                      <span>
                        Special cleaning
                        requirements
                      </span>
                    </div>
                  </div>
                  <section
                    className={
                      styles.modal_includedSection
                    }
                  >
                    <h3
                      className={
                        styles.modal_includedTitle
                      }
                    >
                      What&apos;s Included
                    </h3>

                    <ul
                      className={
                        styles.modal_includedList
                      }
                    >
                      <li>
                        Machine floor scrubbing
                      </li>

                      <li>
                        Ceiling and fan dusting
                      </li>

                      <li>
                        Windows, doors, mirrors and glass cleaning
                      </li>

                      <li>
                        Switches, sockets and reachable fixtures cleaning
                      </li>

                      <li>
                        Furniture surface cleaning
                      </li>

                      <li>
                        Staircase and railing cleaning
                      </li>

                      <li>
                        Cabinet exterior cleaning
                        <span className={styles.modal_includedNote}>
                          {" "}
                          (interiors cleaned when empty)
                        </span>
                      </li>

                      <li>
                        Sofa and mattress dry vacuuming
                        <span className={styles.modal_includedNote}>
                          {" "}
                          (wet shampooing available at extra cost)
                        </span>
                      </li>

                      <li>
                        Kitchen countertop, sink and stove cleaning
                      </li>

                      <li>
                        Kitchen cabinet exterior cleaning
                      </li>

                      <li>
                        Appliance exterior cleaning
                      </li>

                      <li>
                        Bathroom fixtures, wash basin and shower-area cleaning
                      </li>

                      <li>
                        Tile and grout scrubbing
                      </li>
                    </ul>
                  </section>

                  <section
                    className={
                      styles.modal_ratingBreakdownSection
                    }
                    aria-label="Customer ratings"
                  >
                    <div
                      className={
                        styles.modal_ratingSummary
                      }
                    >
                      <div
                        className={
                          styles.modal_ratingScoreRow
                        }
                      >
                        <span
                          className={
                            styles.modal_ratingMainStar
                          }
                          aria-hidden="true"
                        >
                          ★
                        </span>

                        <strong
                          className={
                            styles.modal_ratingScore
                          }
                        >
                          4.2
                        </strong>
                      </div>

                      <p
                        className={
                          styles.modal_ratingReviewCount
                        }
                      >
                        900 reviews
                      </p>
                    </div>

                    <div
                      className={
                        styles.modal_ratingBars
                      }
                    >
                      {VILLA_RATING_BREAKDOWN.map(
                        (rating) => (
                          <div
                            key={rating.stars}
                            className={
                              styles.modal_ratingBarRow
                            }
                          >
                            <div
                              className={
                                styles.modal_ratingBarLabel
                              }
                            >
                              <span>
                                {rating.stars}
                              </span>

                              <span
                                className={
                                  styles.modal_ratingSmallStar
                                }
                                aria-hidden="true"
                              >
                                ★
                              </span>
                            </div>

                            <div
                              className={
                                styles.modal_ratingTrack
                              }
                              role="progressbar"
                              aria-label={`${rating.stars} star ratings`}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              aria-valuenow={
                                rating.percentage
                              }
                            >
                              <span
                                className={
                                  styles.modal_ratingFill
                                }
                                style={{
                                  width: `${rating.percentage}%`,
                                }}
                              />
                            </div>

                            <span
                              className={
                                styles.modal_ratingPercentage
                              }
                            >
                              {rating.percentage}%
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </section>
</section>
              </div>

              <footer
                className={
                  styles.modal_footer
                }
              >
                <div>
                  <span
                    className={
                      styles.modal_footerLabel
                    }
                  >
                    Site survey
                  </span>

                  <strong
                    className={
                      styles.modal_footerPrice
                    }
                  >
                    {SURVEY_PRICE_LABEL}
                  </strong>
                </div>

                <button
                  type="button"
                  className={
                    styles.modal_confirmButton
                  }
                  onClick={
                    handleAddSurvey
                  }
                >
                  Add site survey
                </button>
              </footer>
            </div>
          </div>
  );

  return <>{modal}</>;
}


return function VillaDetailsPage({
  serviceId,
}: {
  serviceId: string;
}) {
  const service = homeCleaningServices.find(
    (item) => item.id === serviceId,
  );

  if (!service) {
    return null;
  }

  return (
    <>
      <style>{VILLA_CSS}</style>
      <VillaSurveyDetailsContent
        serviceId={service.id}
        serviceTitle={service.title}
      />
    </>
  );
};
})();

const CustomizeDetails = (() => {
type SelectionType =
  | "quantity"
  | "toggle";

type CustomCleaningService = {
  id: string;
  name: string;
  price: number;
  unitLabel: string;
  selectionType: SelectionType;
};

const customCleaningServices: readonly CustomCleaningService[] = [
  {
    id: "bedroom-cleaning",
    name: "Bedroom Cleaning",
    price: 500,
    unitLabel: "per room",
    selectionType: "quantity",
  },
  {
    id: "living-room-cleaning",
    name: "Living Room Cleaning",
    price: 800,
    unitLabel: "per room",
    selectionType: "quantity",
  },
  {
    id: "restroom-cleaning",
    name: "Restroom Cleaning",
    price: 1000,
    unitLabel: "per restroom",
    selectionType: "quantity",
  },
  {
    id: "window-grill-glass-cleaning",
    name: "Window, Grill & Glass Cleaning",
    price: 500,
    unitLabel: "per unit",
    selectionType: "quantity",
  },
  {
    id: "tv-cleaning",
    name: "TV Cleaning",
    price: 150,
    unitLabel: "per TV",
    selectionType: "quantity",
  },
  {
    id: "balcony-cleaning",
    name: "Balcony Cleaning",
    price: 350,
    unitLabel: "per balcony",
    selectionType: "quantity",
  },
  {
    id: "utility-area-cleaning",
    name: "Utility Area Cleaning",
    price: 1000,
    unitLabel: "fixed service",
    selectionType: "toggle",
  },
  {
    id: "cobweb-removal",
    name: "Cobweb Removal",
    price: 500,
    unitLabel: "fixed service",
    selectionType: "toggle",
  },
] as const;

function formatCurrency(
  amount: number,
): string {
  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    },
  ).format(amount);
}


function CustomizeDetailsContent() {
  const router = useRouter();

  const [quantities, setQuantities] =
    useState<Record<string, number>>({});



  const selectedServices = useMemo(
    () =>
      customCleaningServices.flatMap(
        (service) => {
          const quantity =
            quantities[service.id] ?? 0;

          if (quantity <= 0) {
            return [];
          }

          return [
            {
              ...service,
              quantity,
              lineTotal:
                service.price * quantity,
            },
          ];
        },
      ),
    [quantities],
  );

  const total = useMemo(
    () =>
      selectedServices.reduce(
        (sum, service) =>
          sum + service.lineTotal,
        0,
      ),
    [selectedServices],
  );

  const totalUnits =
    selectedServices.reduce(
      (sum, service) =>
        sum + service.quantity,
      0,
    );

  const changeQuantity = (
    serviceId: string,
    delta: number,
  ) => {
    setQuantities((current) => {
      const currentQuantity =
        current[serviceId] ?? 0;

      const nextQuantity = Math.max(
        0,
        Math.min(
          10,
          currentQuantity + delta,
        ),
      );

      return {
        ...current,
        [serviceId]: nextQuantity,
      };
    });
  };

  const toggleService = (
    serviceId: string,
  ) => {
    setQuantities((current) => ({
      ...current,
      [serviceId]:
        (current[serviceId] ?? 0) > 0
          ? 0
          : 1,
    }));
  };

  const addPackageToCart = () => {
    if (selectedServices.length === 0) {
      return;
    }

    const optionLabel =
      selectedServices
        .map((service) => {
          if (
            service.selectionType ===
            "quantity"
          ) {
            return `${service.name} × ${service.quantity}`;
          }

          return service.name;
        })
        .join(", ");

    upsertServiceCartItem({
      id: "customize-cleaning-package",
      serviceTitle:
        "Customize Cleaning",
      optionLabel,
      price: total,
      priceLabel:
        formatCurrency(total),
      duration:
        "Custom cleaning package",
    });

    if (window.matchMedia("(max-width: 760px)").matches) {
      window.sessionStorage.setItem("citycoolies:full-home-scroll-cart", "1");
    }
    router.push(FULL_HOME_PATH);
  };



  return (
    <>
      <style>{CUSTOMIZE_CSS}</style>

        <div
          className={"cc-detail-content"}
        >
          <section
            className={"cc-detail-sheet"}
            role="region"
                        aria-labelledby="customize-modal-heading"
          >
            <header
              className={
                "cc-fh-customize-modalHeader"
              }
            >
              <div>
                <h2
                  id="customize-modal-heading"
                >
                  Customize Cleaning
                </h2>

                <p>
                  Choose only what you
                  need.
                </p>
              </div>
            </header>

            <div
              className={
                "cc-fh-customize-modalSummary"
              }
            >
              <span>
                {totalUnits === 0
                  ? "Nothing selected"
                  : `${totalUnits} selected`}
              </span>

              <strong>
                {formatCurrency(total)}
              </strong>
            </div>

            <div
              className={
                "cc-detail-body"
              }
            >
              <div
                className={
                  "cc-fh-customize-serviceList"
                }
              >
                {customCleaningServices.map(
                  (service) => {
                    const quantity =
                      quantities[
                        service.id
                      ] ?? 0;

                    const selected =
                      quantity > 0;

                    return (
                      <article
                        key={
                          service.id
                        }
                        className={`${"cc-fh-customize-optionRow"} ${
                          selected
                            ? "cc-fh-customize-optionRowSelected"
                            : ""
                        }`}
                      >
                        <div
                          className={
                            "cc-fh-customize-optionCopy"
                          }
                        >
                          <h3>
                            {
                              service.name
                            }
                          </h3>

                          <p>
                            <strong>
                              {formatCurrency(
                                service.price,
                              )}
                            </strong>

                            <span>
                              {
                                service.unitLabel
                              }
                            </span>
                          </p>
                        </div>

                        {service.selectionType ===
                        "quantity" ? (
                          <div
                            className={
                              "cc-fh-customize-stepper"
                            }
                          >
                            <button
                              type="button"
                              aria-label={`Remove one ${service.name}`}
                              disabled={
                                quantity ===
                                0
                              }
                              onClick={() =>
                                changeQuantity(
                                  service.id,
                                  -1,
                                )
                              }
                            >
                              −
                            </button>

                            <span>
                              {quantity}
                            </span>

                            <button
                              type="button"
                              aria-label={`Add one ${service.name}`}
                              onClick={() =>
                                changeQuantity(
                                  service.id,
                                  1,
                                )
                              }
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className={`${"cc-fh-customize-optionAddButton"} ${
                              selected
                                ? "cc-fh-customize-optionAddButtonSelected"
                                : ""
                            }`}
                            aria-pressed={
                              selected
                            }
                            onClick={() =>
                              toggleService(
                                service.id,
                              )
                            }
                          >
                            {selected
                              ? "Added"
                              : "Add"}
                          </button>
                        )}
                      </article>
                    );
                  },
                )}
              </div>
              <section
                className={"cc-fh-customize-ccOverallRating"}
                aria-label="Customize Cleaning rating breakdown"
              >
                <div className={"cc-fh-customize-ccRatingHeading"}>
                  <span
                    className={"cc-fh-customize-ccGoldStar"}
                    aria-hidden="true"
                  >
                    ★
                  </span>

                  <strong>4.1</strong>
                </div>

                <p className={"cc-fh-customize-ccReviewCount"}>
                  900 reviews
                </p>

                <div className={"cc-fh-customize-ccRatingBars"}>
                  {[
                    { stars: 5, percentage: 44 },
                    { stars: 4, percentage: 35 },
                    { stars: 3, percentage: 12 },
                    { stars: 2, percentage: 5 },
                    { stars: 1, percentage: 4 },
                  ].map((rating) => (
                    <div
                      key={rating.stars}
                      className={"cc-fh-customize-ccRatingBarRow"}
                    >
                      <span className={"cc-fh-customize-ccStarLabel"}>
                        {rating.stars}

                        <span aria-hidden="true">
                          ★
                        </span>
                      </span>

                      <div className={"cc-fh-customize-ccRatingTrack"}>
                        <div
                          className={"cc-fh-customize-ccRatingFill"}
                          style={{
                            width: `${rating.percentage}%`,
                          }}
                        />
                      </div>

                      <span className={"cc-fh-customize-ccPercentage"}>
                        {rating.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </section>
</div>

            <footer
              className={
                selectedServices.length > 0 ? "cc-detail-actions cc-fh-selection-ready" : "cc-detail-actions cc-fh-selection-hidden"
              }
            >
              <div
                className={
                  "cc-fh-customize-footerTotal"
                }
              >
                <span>
                  {selectedServices.length ===
                  0
                    ? "Select services"
                    : `${selectedServices.length} service${
                        selectedServices.length ===
                        1
                          ? ""
                          : "s"
                      } selected`}
                </span>

                <strong>
                  {formatCurrency(total)}
                </strong>
              </div>

              <button
                type="button"
                className={
                  "cc-fh-customize-cartButton"
                }
                disabled={
                  selectedServices.length ===
                  0
                }
                onClick={
                  addPackageToCart
                }
              >
                Add to cart
              </button>
            </footer>
          </section>
        </div>

    </>
  );
}

return CustomizeDetailsContent;
})();

export default function FullHomeServiceDetails({
  serviceId,
}: {
  serviceId: string;
}) {
  const normalizedServiceId = serviceId.trim().replace(/^\/+|\/+$/g, "");
  let content: React.ReactNode;

  if (
    apartmentServices.some(
      (service) => service.id === normalizedServiceId,
    )
  ) {
    content = <ApartmentDetails serviceId={normalizedServiceId} />;
  } else if (
    bungalowServices.some(
      (service) => service.id === normalizedServiceId,
    )
  ) {
    content = <BungalowDetails serviceId={normalizedServiceId} />;
  } else if (
    villaServices.some(
      (service) => service.id === normalizedServiceId,
    )
  ) {
    content = <VillaDetails serviceId={normalizedServiceId} />;
  } else if (normalizedServiceId === "customize-cleaning") {
    content = <CustomizeDetails />;
  } else {
    content = (
      <section>
        <h1>Service not found</h1>
        <p>Please choose a service from Full Home cleaning.</p>
      </section>
    );
  }

  return (
    <main className="cc-fh-detail-page">
      <div className="cc-fh-detail-container">
        <nav
          className="cc-fh-detail-navigation"
          aria-label="Service navigation"
        >
          <Link
            href={FULL_HOME_PATH}
            className="cc-fh-detail-back"
          >
            ← Back to Full Home
          </Link>

          <span className="cc-fh-detail-tag">
            City Coolies · Deep Cleaning
          </span>
        </nav>

        {content}
      </div>

      <style>{DETAIL_PAGE_CSS}</style>
      <style>{`
        /* FULL_HOME_FIXED_FOOTER_2026 */

        .cc-fh-detail-page .cc-fh-selection-hidden {
          display: none !important;
        }

        .cc-fh-detail-page .cc-detail-actions:not(.cc-fh-selection-hidden) {
          position: fixed !important;
          left: 50% !important;
          right: auto !important;
          bottom: calc(12px + env(safe-area-inset-bottom, 0px)) !important;
          transform: translateX(-50%) !important;
          z-index: 1100 !important;

          display: flex !important;
          align-items: center !important;
          justify-content: space-between !important;
          flex-wrap: nowrap !important;
          gap: 12px !important;

          width: min(620px, calc(100vw - 24px)) !important;
          min-height: 64px !important;
          margin: 0 !important;
          padding: 10px 16px !important;

          border: 1px solid #eeeeee !important;
          border-radius: 12px !important;
          background: #ffffff !important;
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12) !important;
        }

        .cc-fh-detail-page .cc-detail-actions button {
          flex-shrink: 0;
        }

        @media (max-width: 760px) {
          .cc-fh-detail-page .cc-detail-actions:not(.cc-fh-selection-hidden) {
            bottom: calc(8px + env(safe-area-inset-bottom, 0px)) !important;
            width: calc(100vw - 20px) !important;
            min-height: 60px !important;
            padding: 9px 12px !important;
          }
        }
      `}</style>
    </main>
  );
}
