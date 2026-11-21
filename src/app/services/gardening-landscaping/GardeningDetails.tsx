"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";

import {
  getServiceCartServerSnapshot,
  getServiceCartSnapshot,
  parseServiceCartSnapshot,
  removeServiceCartItem,
  subscribeServiceCart,
  upsertServiceCartItem,
} from "@/app/services/serviceCart";

type Job = {
  id: string;
  title: string;
  price: number;
  sizes?: readonly { label: string; price: number }[];
};
type Service = {
  id: string;
  title: string;
  rating: string;
  reviews: number;
  description: string;
  note: string;
  jobs: readonly Job[];
  process: readonly string[];
};
const makeJobs = (names: readonly string[], prices: readonly number[]): Job[] =>
  names.map((title, index) => ({
    id: title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, ""),
    title,
    price: prices[index],
  }));
const plantNames = [
  "Money Plant",
  "Snake Plant",
  "Areca Palm",
  "Peace Lily",
  "ZZ Plant",
  "Rubber Plant",
  "Tulsi Plant",
  "Hibiscus Plant",
  "Black Rose",
  "Yellow Rose",
  "Red Rose",
  "Pink Rose",
  "Lemon Plant",
  "Banana Plant",
  "Moringa Plant",
  "Adenium Bonsai",
  "Azalea Bonsai",
  "Banyan Bonsai",
  "Ber Bonsai",
  "Bougainvillea Bonsai",
  "Boxwood Bonsai",
  "Chinese Elm Bonsai",
  "Crabapple Bonsai",
  "Curry Leaf Bonsai",
  "Dwarf Jade Bonsai",
  "Ficus Bonsai",
  "Fukien Tea Bonsai",
  "Ginseng Ficus Bonsai",
  "Guava Bonsai",
  "Jade Bonsai",
  "Japanese Maple Bonsai",
  "Juniper Bonsai",
  "Lemon Bonsai",
  "Mango Bonsai",
  "Neem Bonsai",
  "Olive Bonsai",
  "Orange Bonsai",
  "Peepal Bonsai",
  "Pomegranate Bonsai",
  "Serissa Bonsai",
  "Tamarind Bonsai",
  "Wrightia Bonsai",
] as const;
const nurseryPrices = [
  249, 299, 499, 349, 449, 399, 149, 249, 349, 299, 249, 299, 449, 399, 299,
  999, 1499, 1199, 899, 999, 1299, 1199, 1499, 799, 699, 899, 1299, 999, 899,
  699, 1999, 1499, 999, 1499, 899, 1599, 999, 899, 1199, 1299, 999, 1299,
] as const;
const potSizes = (base: number) => [
  { label: "Small (4–6 in)", price: base },
  { label: "Medium (8–10 in)", price: Math.round(base * 1.6) },
  { label: "Large (12–14 in)", price: Math.round(base * 2.5) },
];
const services: readonly Service[] = [
  {
    id: "gardener",
    title: "Gardener",
    rating: "4.40",
    reviews: 459000,
    description:
      "Book a gardener for pruning, weeding, watering, potting and seasonal upkeep. Plants, soil and extra materials are separate.",
    note: "Indicative labour rates by time. Tools, waste removal and materials are confirmed before service.",
    jobs: makeJobs(
      ["2 Hours Gardener", "3 Hours Gardener", "8 Hours Gardener"],
      [499, 699, 1599],
    ),
    process: [
      "Discuss the garden size and tasks before arrival",
      "Check plant condition, water access and tools",
      "Prune, weed, loosen soil, water and repot within booked time",
      "Clean the work area and share maintenance suggestions",
    ],
  },
  {
    id: "lawn-care",
    title: "Lawn Care",
    rating: "4.20",
    reviews: 573,
    description:
      "Choose lawn upkeep jobs; charges are starting estimates for a small residential lawn.",
    note: "Final rate depends on lawn area, grass condition, access and supplies. Fertilizer and other materials are quoted separately.",
    jobs: makeJobs(
      [
        "Lawn Mowing",
        "Lawn Edge Trimming",
        "Lawn Weed Removal",
        "Lawn Aeration",
        "Lawn Fertilizing",
      ],
      [599, 349, 499, 799, 449],
    ),
    process: [
      "Measure the lawn and check grass height and obstacles",
      "Agree the selected mowing, edging, weed, aeration or fertilizer work",
      "Carry out the work using suitable equipment and protect nearby plants",
      "Clear cuttings as agreed and explain watering and aftercare",
    ],
  },
  {
    id: "landscaping",
    title: "Landscaping",
    rating: "4.20",
    reviews: 482,
    description:
      "Plan a new garden, turf, pathway or bed border with measurements and a site-specific material plan.",
    note: "The ₹500 site survey is charged once for selected landscaping jobs. Final construction and material rate is fixed after the survey; no fixed installation total is promised here.",
    jobs: makeJobs(
      [
        "Complete Garden Setup",
        "Artificial Turf Installation",
        "Garden Pathway Installation",
        "Garden Bed Border Setup",
      ],
      [500, 500, 500, 500],
    ),
    process: [
      "Survey dimensions, sunlight, drainage and access",
      "Discuss the garden design, turf or pathway materials",
      "Confirm drawings, quantities, timeline and final quotation",
      "Prepare ground, install approved work and check levels and drainage",
    ],
  },
  {
    id: "vertical-garden",
    title: "Vertical Garden",
    rating: "4.20",
    reviews: 416,
    description:
      "Select a living or artificial vertical garden for a wall or balcony, plus ongoing maintenance.",
    note: "₹500 site survey covers selected installations once; final rate depends on wall, dimensions, irrigation and plant choices. Maintenance is an indicative visit charge.",
    jobs: makeJobs(
      [
        "Natural Vertical Garden",
        "Artificial Vertical Garden",
        "Balcony Vertical Garden",
        "Vertical Garden Maintenance",
      ],
      [500, 500, 500, 699],
    ),
    process: [
      "Survey wall strength, space, light and water access",
      "Choose natural or artificial system, frame and planting",
      "Confirm fixing method, irrigation and final quotation",
      "Install approved panels and provide plant care or cleaning guidance",
    ],
  },
  {
    id: "nursery",
    title: "Nursery",
    rating: "4.20",
    reviews: 795,
    description:
      "Browse indoor plants, flowering plants, fruit plants and bonsai. Each plant has an indicative unit price and an illustrative image.",
    note: "Prices are illustrative per plant; mature bonsai, pot size, variety and local availability may change the final amount before payment. Images illustrate the plant variety; the delivered plant may differ in size and appearance.",
    jobs: makeJobs(plantNames, nurseryPrices),
    process: [
      "Choose plants and quantities",
      "Confirm variety, size and live stock availability",
      "Check light and watering needs before placement",
      "Pack and hand over the selected plants with care instructions",
    ],
  },
  {
    id: "pots",
    title: "Pots",
    rating: "4.20",
    reviews: 534,
    description:
      "Select planter type and size for the space and plant's root requirements.",
    note: "Indicative prices are per pot. Size, material, drainage and local stock are confirmed before payment. Images illustrate the pot types; available colours and exact designs may vary.",
    jobs: [
      { id: "grow-bag", title: "Grow Bag", price: 149, sizes: potSizes(149) },
      {
        id: "ceramic-pot",
        title: "Ceramic Pot",
        price: 299,
        sizes: potSizes(299),
      },
      { id: "fiber-pot", title: "Fiber Pot", price: 249, sizes: potSizes(249) },
      {
        id: "hanging-pot",
        title: "Hanging Pot",
        price: 199,
        sizes: potSizes(199),
      },
      {
        id: "self-watering-pot",
        title: "Self-Watering Pot",
        price: 349,
        sizes: potSizes(349),
      },
    ],
    process: [
      "Choose planter type and size for each plant",
      "Check drainage holes, placement and root space",
      "Confirm available colour, exact dimensions and price",
      "Pack the planters and give setup or repotting guidance",
    ],
  },
  {
    id: "compost",
    title: "Compost & Soil",
    rating: "4.20",
    reviews: 388,
    description:
      "Choose planting media and soil conditioners for pots and garden beds.",
    note: "Indicative pack prices; confirm actual weight, brand and availability before payment. Cocopeat improves structure but is not a complete fertilizer by itself.",
    jobs: makeJobs(
      [
        "Cocopeat Block (5 kg)",
        "Neem Cake (1 kg)",
        "Potting Mix (5 kg)",
        "Vermicompost (5 kg)",
      ],
      [449, 249, 399, 399],
    ),
    process: [
      "Choose material and pack quantities",
      "Check plant and soil needs before mixing",
      "Confirm stock, pack weight and final amount",
      "Explain appropriate mixing and watering after application",
    ],
  },
];

const reviewDistribution = [48, 29, 13, 7, 3];
const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;

function getJobImage(serviceId: string, jobId: string): string | null {
  if (serviceId === "nursery")
    return `/gardening-landscaping/nursery-${jobId}.webp`;
  if (serviceId === "pots") return `/gardening-landscaping/pot-${jobId}.webp`;
  if (serviceId === "compost")
    return `/gardening-landscaping/compost-${jobId}.webp`;
  return null;
}

function isSurveyJob(serviceId: string, job: Job): boolean {
  return (
    serviceId === "landscaping" ||
    (serviceId === "vertical-garden" &&
      job.id !== "vertical-garden-maintenance")
  );
}

function quantityKey(job: Job, size?: string): string {
  return `${job.id}:${size ?? "standard"}`;
}

type GardeningDetailsProps = {
  serviceId: string;
};

export default function GardeningDetails({ serviceId }: GardeningDetailsProps) {
  const router = useRouter();
  const service = services.find((item) => item.id === serviceId);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [sizes, setSizes] = useState<Record<string, string>>({});

  const cartSnapshot = useSyncExternalStore(
    subscribeServiceCart,
    getServiceCartSnapshot,
    getServiceCartServerSnapshot,
  );
  const cartItems = useMemo(
    () => parseServiceCartSnapshot(cartSnapshot),
    [cartSnapshot],
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  if (!service) return null;

  const serviceTitle = service.title;

  const cartId = `gardening:${service.id}`;

  function selectedSize(job: Job): string | undefined {
    return sizes[job.id] ?? job.sizes?.[0]?.label;
  }

  function jobQuantity(job: Job): number {
    return quantities[quantityKey(job, selectedSize(job))] ?? 0;
  }

  function jobPrice(job: Job): number {
    return (
      job.sizes?.find((size) => size.label === selectedSize(job))?.price ??
      job.price
    );
  }

  const selectedJobs = service.jobs.filter((job) => jobQuantity(job) > 0);
  const hasSurvey = selectedJobs.some((job) => isSurveyJob(service.id, job));
  const total = selectedJobs.reduce(
    (sum, job) =>
      sum +
      (isSurveyJob(service.id, job) ? 0 : jobPrice(job) * jobQuantity(job)),
    hasSurvey ? 500 : 0,
  );
  const hasSavedCart = cartItems.some((item) => item.id === cartId);

  function adjustQuantity(job: Job, change: number) {
    const key = quantityKey(job, selectedSize(job));
    setQuantities((current) => ({
      ...current,
      [key]: Math.max(0, (current[key] ?? 0) + change),
    }));
  }

  function changeSize(job: Job, size: string) {
    const previousKey = quantityKey(job, selectedSize(job));
    setQuantities((current) => ({ ...current, [previousKey]: 0 }));
    setSizes((current) => ({ ...current, [job.id]: size }));
  }

  function updateCart() {
    if (selectedJobs.length === 0) {
      removeServiceCartItem(cartId);
      return;
    }

    upsertServiceCartItem({
      id: cartId,
      serviceTitle,
      optionLabel: selectedJobs
        .map(
          (job) =>
            `${job.title}${job.sizes ? ` (${selectedSize(job)})` : ""} x ${jobQuantity(job)}`,
        )
        .join(", "),
      price: total,
      priceLabel: formatPrice(total),
      duration: hasSurvey
        ? "Site survey included once; final installation rate after assessment"
        : "Indicative rate; stock, materials and final scope confirmed before payment",
    });
    window.dispatchEvent(new Event("citycoolies:deep-cleaning-cart-added"));
    router.push("/services/gardening-landscaping?showGardeningCart=1");
  }

  return (
    <section className="cc-garden-details">
      <div className="container">
        <Link className="backLink" href="/services/gardening-landscaping">
          ← Back to Gardening &amp; Landscaping
        </Link>

        <h1 className="title">{service.title}</h1>
        <p className="intro">Choose your requirements</p>

        <div className="jobs">
          {service.jobs.map((job) => {
            const image = getJobImage(service.id, job.id);
            const quantity = jobQuantity(job);

            return (
              <article className="card" key={job.id}>
                {image && (
                  <div className="imageArea">
                    <Image
                      className="jobImage"
                      src={image}
                      alt={job.title}
                      width={360}
                      height={260}
                      unoptimized
                    />
                  </div>
                )}

                <h2 className="jobName">{job.title}</h2>

                {job.sizes && (
                  <label className="sizeField">
                    <span>Size</span>
                    <select
                      value={selectedSize(job)}
                      onChange={(event) => changeSize(job, event.target.value)}
                    >
                      {job.sizes.map((size) => (
                        <option key={size.label} value={size.label}>
                          {size.label} — {formatPrice(size.price)}
                        </option>
                      ))}
                    </select>
                  </label>
                )}

                <div className="actions">
                  <strong className="jobPrice">
                    {formatPrice(jobPrice(job))}
                  </strong>
                  {quantity > 0 ? (
                    <div
                      className="quantity"
                      aria-label={`${job.title} quantity`}
                    >
                      <button
                        type="button"
                        aria-label={`Remove one ${job.title}`}
                        onClick={() => adjustQuantity(job, -1)}
                      >
                        −
                      </button>
                      <span>{quantity}</span>
                      <button
                        type="button"
                        aria-label={`Add one ${job.title}`}
                        onClick={() => adjustQuantity(job, 1)}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="addButton"
                      type="button"
                      onClick={() => adjustQuantity(job, 1)}
                    >
                      Add
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <p className="notice">{service.note}</p>
        <p className="description">{service.description}</p>

        <section className="process">
          <h2>Work process</h2>
          <ol>
            {service.process.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="reviews">
          <h2>Rating overview</h2>
          <p className="ratingSummary">
            <strong>
              <span aria-hidden="true">★</span> {service.rating}
            </strong>
            <span>
              {service.reviews >= 1000
                ? `${Math.round(service.reviews / 1000)}K`
                : service.reviews}{" "}
              reviews
            </span>
          </p>
          {reviewDistribution.map((percent, index) => (
            <div className="reviewRow" key={5 - index}>
              <span>{5 - index} ★</span>
              <div className="reviewTrack">
                <div style={{ width: `${percent}%` }} />
              </div>
              <span>{percent}%</span>
            </div>
          ))}
        </section>

        <footer className="totalRow" style={{ display: selectedJobs.length > 0 ? undefined : "none" }}>
          <div className="totalAmount">
            <small>Selected total</small>
            <strong>{formatPrice(total)}</strong>
          </div>
          <button
            type="button"
            disabled={selectedJobs.length === 0 && !hasSavedCart}
            onClick={updateCart}
          >
            Continue
          </button>
        </footer>
      </div>
      <style jsx global>{`
        .cc-garden-details {
          min-height: 65vh;
          width: 100%;
          color: #171717;
          background: #fff;
        }

        .cc-garden-details * {
          box-sizing: border-box;
        }

        .cc-garden-details .container {
          width: min(1080px, calc(100% - 40px));
          margin: 0 auto;
          padding: 45px 0 75px;
        }

        .cc-garden-details .backLink {
          display: inline-block;
          margin-bottom: 28px;
          color: #ef1b23;
          font-weight: 700;
          text-decoration: none;
        }

        .cc-garden-details .title {
          margin: 0 0 10px;
          font-size: clamp(26px, 3vw, 34px);
        }

        .cc-garden-details .intro {
          margin: 0 0 26px;
          color: #555f6c;
          font-size: 17px;
        }

        .cc-garden-details .jobs {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          column-gap: 36px;
          row-gap: 38px;
        }

        .cc-garden-details .card {
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 272px;
          min-width: 0;
          margin: 0 auto;
          padding: 0;
          border: 0;
          border-radius: 0;
          background: transparent;
          box-shadow: none;
        }

        .cc-garden-details .imageArea {
          display: flex;
          width: 100%;
          height: 272px;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .cc-garden-details .jobImage {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
        }

        .cc-garden-details .jobName {
          width: 100%;
          min-height: 0;
          margin: 12px 0 4px;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.4;
          overflow-wrap: anywhere;
        }

        .cc-garden-details .sizeField {
          display: grid;
          gap: 6px;
          width: 100%;
          margin-top: 10px;
          font-size: 13px;
        }

        .cc-garden-details .sizeField select {
          width: 100%;
          min-width: 0;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 7px;
          background: #fff;
          font: inherit;
        }

        .cc-garden-details .actions {
          display: flex;
          width: 100%;
          min-width: 0;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          margin-top: 0;
          padding: 0;
          border: 0;
        }

        .cc-garden-details .jobPrice {
          min-width: 0;
          font-size: 16px;
          font-weight: 700;
          white-space: nowrap;
        }

        .cc-garden-details .addButton {
          display: inline-flex;
          flex: 0 0 auto;
          min-width: 72px;
          height: 38px;
          align-items: center;
          justify-content: center;
          padding: 6px 12px;
          border: 1px solid #ef1b23;
          border-radius: 8px;
          color: #ef1b23;
          background: #fff;
          font: inherit;
          font-weight: 700;
          cursor: pointer;
        }

        .cc-garden-details .addButton:hover {
          color: #fff;
          background: #ef1b23;
        }

        .cc-garden-details .quantity {
          display: inline-flex;
          flex: 0 0 auto;
          height: 38px;
          align-items: center;
          overflow: hidden;
          border: 1px solid #ef1b23;
          border-radius: 8px;
        }

        .cc-garden-details .quantity button {
          width: 28px;
          height: 100%;
          padding: 0;
          border: 0;
          color: #ef1b23;
          background: #fff7f8;
          font-size: 18px;
          cursor: pointer;
        }

        .cc-garden-details .quantity span {
          min-width: 18px;
          text-align: center;
          font-size: 13px;
          font-weight: 600;
        }

        .cc-garden-details .notice {
          margin: 28px 0 16px;
          padding: 14px 16px;
          border: 1px solid #fac5cb;
          border-radius: 10px;
          background: #fff5f6;
          line-height: 1.6;
        }

        .cc-garden-details .description {
          line-height: 1.65;
        }

        .cc-garden-details .process {
          margin: 24px 0;
          padding: 20px;
          border-radius: 10px;
          background: #f6faf7;
          line-height: 1.6;
        }

        .cc-garden-details .process h2,
        .cc-garden-details .reviews h2 {
          margin: 0 0 12px;
          font-size: 19px;
        }

        .cc-garden-details .process li {
          margin: 6px 0;
        }

        .cc-garden-details .reviews {
          margin: 28px 0;
          padding-top: 20px;
          border-top: 1px solid #eee;
        }

        .cc-garden-details .ratingSummary {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
        }

        .cc-garden-details .ratingSummary strong {
          font-size: 22px;
        }

        .cc-garden-details .ratingSummary strong span {
          color: #ef1b23;
        }

        .cc-garden-details .reviewRow {
          display: grid;
          grid-template-columns: 43px minmax(0, 1fr) 42px;
          align-items: center;
          gap: 9px;
          margin: 9px 0;
          font-size: 14px;
        }

        .cc-garden-details .reviewTrack {
          height: 6px;
          background: #ddd;
        }

        .cc-garden-details .reviewTrack div {
          height: 100%;
          background: #ef1b23;
        }

        .cc-garden-details .totalRow {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-top: 26px;
          padding: 20px 0;
          border-top: 1px solid #eee;
        }

        .cc-garden-details .totalAmount {
          display: grid;
          gap: 5px;
        }

        .cc-garden-details .totalAmount small {
          color: #68717a;
        }

        .cc-garden-details .totalAmount strong {
          font-size: 20px;
        }

        .cc-garden-details .totalRow button {
          min-height: 44px;
          padding: 12px 24px;
          border: 0;
          border-radius: 9px;
          color: #fff;
          background: #ef1b23;
          font: inherit;
          font-weight: 700;
          cursor: pointer;
        }

        .cc-garden-details .totalRow button:disabled {
          color: #888;
          background: #e5e5e5;
          cursor: not-allowed;
        }

        @media (max-width: 900px) {
          .cc-garden-details .jobs {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 28px 20px;
          }
        }

        @media (max-width: 520px) {
          .cc-garden-details .container {
            width: calc(100% - 24px);
            padding: 28px 0 60px;
          }

          .cc-garden-details .jobs {
            gap: 24px 12px;
          }

          .cc-garden-details .card {
            max-width: 100%;
          }

          .cc-garden-details .imageArea {
            height: 150px;
          }

          .cc-garden-details .jobName {
            margin-top: 8px;
            font-size: 13px;
          }

          .cc-garden-details .jobPrice {
            font-size: 13px;
          }

          .cc-garden-details .addButton {
            min-width: 52px;
            height: 32px;
            padding: 4px 7px;
            font-size: 12px;
          }

          .cc-garden-details .quantity {
            height: 32px;
          }

          .cc-garden-details .quantity button {
            width: 22px;
            font-size: 15px;
          }

          .cc-garden-details .quantity span {
            min-width: 14px;
            font-size: 11px;
          }
        }

        @media (max-width: 360px) {
          .cc-garden-details .jobs {
            grid-template-columns: minmax(0, 1fr);
          }

          .cc-garden-details .imageArea {
            height: 210px;
          }

          .cc-garden-details .jobName {
            font-size: 15px;
          }

          .cc-garden-details .jobPrice {
            font-size: 16px;
          }
        }

        /* gardenStickyContinue */
        .cc-garden-details .totalRow {
          position: fixed;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          z-index: 50;
          width: min(1080px, calc(100% - 40px));
          margin: 0;
          padding: 12px 16px;
          border: 1px solid #eeeeee;
          border-radius: 12px 12px 0 0;
          background: #ffffff;
          box-shadow: 0 -3px 14px rgba(0, 0, 0, 0.06);
        }

        .cc-garden-details .totalRow button {
          min-height: 40px;
          padding: 9px 20px;
          font-size: 14px;
        }

        .cc-garden-details .totalAmount strong {
          font-size: 18px;
        }

        .cc-garden-details .container {
          padding-bottom: 140px;
        }

        @media (max-width: 520px) {
          .cc-garden-details .totalRow {
            width: calc(100% - 16px);
            gap: 10px;
            padding: 10px 12px;
          }

          .cc-garden-details .totalRow button {
            min-height: 38px;
            padding: 8px 14px;
            font-size: 13px;
          }

          .cc-garden-details .totalAmount small {
            font-size: 11px;
          }

          .cc-garden-details .totalAmount strong {
            font-size: 16px;
          }
        }

      `}</style>
    </section>
  );
}
