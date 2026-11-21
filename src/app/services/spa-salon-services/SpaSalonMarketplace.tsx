"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ServiceCartSidebar from "@/app/services/ServiceCartSidebar";
import { upsertServiceCartItem } from "@/app/services/serviceCart";

type Category = "women" | "men";
export type Service = { id: string; title: string; price: number };
const categories: { id: Category; label: string; image: string }[] = [
  { id: "women", label: "Women", image: "/spa-salon/spa-women-icon.png" },
  { id: "men", label: "Men", image: "/spa-salon/spa-men-icon.png" },
];
export const hairOptions = [
  { id: "haircut", title: "Women's Haircut", price: 549, image: "/spa-salon/haircut.ec1a2220a849.webp", duration: "45 min" },
  { id: "blow-dry", title: "Wash & Blow-Dry", price: 699, image: "/spa-salon/blow_dry.720fc6addce0.webp", duration: "60 min" },
  { id: "hair-spa", title: "Hair Spa", price: 1299, image: "/spa-salon/hair_spa.9117515ea94a.webp", duration: "75 min" },
  { id: "root-touch-up", title: "Root Touch-Up", price: 999, image: "/spa-salon/root_touch_up.920edef322a9.webp", duration: "75 min" },
  { id: "global-colour", title: "Global Hair Colour", price: 2399, image: "/spa-salon/global_colour.5efe93de31ab.webp", duration: "120 min" },
  { id: "keratin", title: "Keratin Smoothing", price: 3999, image: "/spa-salon/keratin_smoothing.4976c0645e48.webp", duration: "180 min" },
];
export const waxingImageRatios: Record<string, string> = {
  stomach: "2048 / 1365",
  "full-legs": "2048 / 1538",
  brazilian: "1536 / 1024",
  underarms: "2048 / 1365",
  butt: "2048 / 1793",
  bikini: "2048 / 1365",
  back: "2048 / 1365",
  "bikini-line": "2048 / 1365",
  "full-body": "2048 / 1365",
  threading: "2048 / 1366",
};
export const waxingOptions = [
  { id: "stomach", title: "Stomach Waxing", price: 399, image: "/spa-salon/stomach_waxing.jpg", duration: "30 min" },
  { id: "full-legs", title: "Full Legs Waxing", price: 549, image: "/spa-salon/full_legs_waxing.jpg", duration: "45 min" },
  { id: "brazilian", title: "Brazilian Stripless Waxing", price: 1499, image: "/spa-salon/brazilian_waxing.3a02f2faa27e.webp", duration: "50 min" },
  { id: "underarms", title: "Underarms Waxing", price: 149, image: "/spa-salon/underarms_waxing.jpg", duration: "15 min" },
  { id: "butt", title: "Butt Waxing", price: 349, image: "/spa-salon/butt_waxing.jpg", duration: "25 min" },
  { id: "bikini", title: "Bikini Waxing", price: 1099, image: "/spa-salon/bikini_waxing.jpg", duration: "40 min" },
  { id: "back", title: "Back Waxing", price: 599, image: "/spa-salon/back_waxing.jpg", duration: "35 min" },
  { id: "bikini-line", title: "Bikini Line Waxing", price: 399, image: "/spa-salon/bikini_line_waxing.jpg", duration: "20 min" },
  { id: "full-body", title: "Full Body Waxing", price: 1799, image: "/spa-salon/full_body_waxing.jpg", duration: "120 min" },
  { id: "threading", title: "Eyebrow Threading", price: 99, image: "/spa-salon/threading.jpg", duration: "15 min" },
];
export const womenServices: Service[] = [
  { id: "salon-for-women", title: "Facial for Women", price: 499 },
  { id: "spa-for-women", title: "Spa for Women", price: 599 },
  { id: "hair-studio-for-women", title: "Hair Studio for Women", price: 549 },
  { id: "waxing-for-women", title: "Waxing for Women", price: 99 },
];

export const spaOptions = [
  { id: "stress-relief", title: "Stress Relief", price: 1299, image: "/spa-salon/stress_relief_spa.6daac463c1e4.webp" },
  { id: "deep-tissue", title: "Deep Tissue Massage", price: 1499, image: "/spa-salon/deep_tissue_massage.639e32a4215a.webp" },
  { id: "deep-tissue-foot", title: "Deep Tissue with Foot Massage", price: 1999, image: "/spa-salon/deep_tissue_foot_massage.995ec0307c7e.webp" },
  { id: "back-relief", title: "Back Relief Massage", price: 929, image: "/spa-salon/back_relief_massage.b987dcb520fc.webp" },
  { id: "vedic-signature", title: "Vedic Signature Massage", price: 1899, image: "/spa-salon/vedic_signature_massage.fdb1b4d54c43.webp" },
  { id: "abhyangam", title: "Abhyangam Neck-to-Toe Stress Relief Massage", price: 2199, image: "/spa-salon/abhyangam_stress_relief_massage.ec4892834ea2.webp" },
  { id: "body-scrub", title: "Full Body Massage & Scrub", price: 1899, image: "/spa-salon/full_body_massage_scrub.9af85a2552d5.webp" },
  { id: "post-natal", title: "Post Natal Massage", price: 1999, image: "/spa-salon/post_natal_massage.063f58de672d.webp" },
  { id: "foot", title: "Foot Massage", price: 699, image: "/spa-salon/foot_massage.27b9a101504c.webp" },
  { id: "face", title: "Face Massage", price: 599, image: "/spa-salon/face_massage.36aa1caabdd9.webp" },
  { id: "hot-bed", title: "Hot Bed", price: 699, image: "/spa-salon/hot_bed.ef9319f73122.webp" },
];
export const facialOptions = [
  { id: "korean-glass", title: "Korean Glass Facial", price: 1599, image: "/spa-salon/korean_glass_hydration_facial.1265a2c6bd14.webp" },
  { id: "korean-plant", title: "Korean Peptide Facial", price: 1699, image: "/spa-salon/korean_plant_peptide_brightening_facial.b69b22c51f9c.webp" },
  { id: "korean-glow", title: "Korean Glow Facial", price: 1299, image: "/spa-salon/korean_glow_facial.36fdd7dc3287.webp" },
  { id: "aroma-magic", title: "Aroma Magic Glow", price: 1099, image: "/spa-salon/aroma_magic_instant_glow_facial.5c12c2b4cfdb.webp" },
  { id: "sara-lightening", title: "Sara Glow Facial", price: 1199, image: "/spa-salon/sara_lightening_glow_facial.42740ac558b1.webp" },
  { id: "o3-shine", title: "O3+ Shine & Glow", price: 1499, image: "/spa-salon/o3_shine_glow_facial.3cbb2d34a2f9.webp" },
  { id: "o3-power", title: "O3+ Power Brightening", price: 1799, image: "/spa-salon/o3_power_brightening_facial.3b234ec140e1.webp" },
  { id: "firming-wine", title: "Wine Glow Facial", price: 1299, image: "/spa-salon/firming_wine_glow_facial.eb6355c6e56e.webp" },
  { id: "kumkumadi", title: "Kumkumadi Ubtan", price: 1399, image: "/spa-salon/kumkumadi_ubtan_hydration_facial.2cee60a94dfa.webp" },
  { id: "power-cleanup", title: "Power Glow Cleanup", price: 799, image: "/spa-salon/power_glow_cleanup.25a2a5e4ee47.webp" },
  { id: "sara-fruit", title: "Sara Fruit Cleanup", price: 699, image: "/spa-salon/sara_fruit_cleanup.22ed104de4b2.webp" },
  { id: "anti-tan", title: "Anti Tan Cleanup", price: 899, image: "/spa-salon/anti_tan_brightening_cleanup.eba80b2dda3f.webp" },
];

export const spaServiceInfo: Record<string, { summary: string; process: string[] }> = {
  "salon-for-women": {
    summary: "Choose the facial that suits your preferred treatment. Products and steps depend on the facial selected.",
    process: ["Confirm the selected facial and requirements", "Cleanse and prepare the face", "Apply the selected facial treatment", "Finish with skin care and aftercare guidance"],
  },
  "spa-for-women": {
    summary: "Relaxation and body care services are discussed before the session so the treatment can be planned.",
    process: ["Confirm the requested spa service", "Prepare the treatment space", "Carry out the agreed session", "Finish and share aftercare guidance"],
  },
  "hair-studio-for-women": {
    summary: "Hair services are planned around the requested cut or styling and the condition of the hair.",
    process: ["Discuss the desired result", "Prepare the hair", "Complete the agreed cut or styling", "Check the finish and share care tips"],
  },
  "waxing-for-women": {
    summary: "Choose the areas to be waxed. The service scope is confirmed before work begins.",
    process: ["Confirm the selected areas", "Prepare the skin and materials", "Complete the waxing service", "Clean the area and explain aftercare"],
  },
};
export const spaRatingPercentages = [50, 29, 14, 5, 2];


export type MenOption = { id: string; title: string; price: number; duration: string; image: string; detail: string };
export type MenService = { id: string; title: string; banner: string; imageAlt: string; options: MenOption[]; process: string[]; summary: string; note: string };
export const menServices: MenService[] = [
  {
    id: "men-spa", title: "Spa for Men", banner: "/spa-salon/men-spa-banner.webp",
    imageAlt: "City Coolies therapist performing a back massage for a male client",
    options: [
      { id: "swedish", title: "Swedish Relaxation Massage", price: 1299, duration: "60 min", image: "/spa-salon/men-spa-swedish.webp", detail: "Full-body oil massage with gentle to medium pressure; fresh linen and oil included." },
      { id: "deep-tissue", title: "Deep Tissue Massage", price: 1499, duration: "60 min", image: "/spa-salon/men-spa-deep-tissue.webp", detail: "Focused, firmer massage with pressure agreed before and during the session." },
      { id: "head-shoulder", title: "Head, Neck & Shoulder Massage", price: 649, duration: "40 min", image: "/spa-salon/men-spa-head-shoulder.webp", detail: "Seated scalp, neck and shoulder massage with comfortable, agreed pressure." },
      { id: "foot", title: "Foot & Calf Massage", price: 549, duration: "30 min", image: "/spa-salon/men-spa-foot.webp", detail: "Relaxing foot and lower-leg massage using oil or cream and clean towels." },
    ],
    process: ["Confirm selected treatments, duration and preferred pressure.", "Prepare a private space, clean linen and the required equipment.", "Complete the selected massage with regular comfort checks.", "Finish the session, tidy the space and discuss aftercare."],
    summary: "Choose one or more relaxation services delivered by a male professional. Each selected treatment is a separate session with its own duration. Full-body sessions use appropriate towel draping.",
    note: "Introductory prices per session. Availability, travel charges if any and final total are confirmed before booking. These are relaxation services, not medical treatment. Tell the professional about any injury or concern before starting.",
  },
  {
    id: "men-facial", title: "Facial for Men", banner: "/spa-salon/men-facial-banner.webp",
    imageAlt: "City Coolies professional applying facial skincare to a male client",
    options: [
      { id: "cleanup", title: "Deep Cleansing Cleanup", price: 599, duration: "35 min", image: "/spa-salon/men-facial-cleanup.webp", detail: "Cleansing, gentle exfoliation, a suitable mask and moisturiser." },
      { id: "hydrating", title: "Hydrating Facial", price: 999, duration: "60 min", image: "/spa-salon/men-facial-hydrating.webp", detail: "Cleansing, hydrating gel massage, moisture mask and finishing care." },
      { id: "detan", title: "De-Tan Facial", price: 899, duration: "50 min", image: "/spa-salon/men-facial-detan.webp", detail: "Gentle cleansing and a cosmetic de-tan mask for face and neck. Results vary." },
      { id: "glow", title: "Glow Facial", price: 1199, duration: "60 min", image: "/spa-salon/men-facial-glow.webp", detail: "Cleansing, facial massage with rollers, mask and finishing moisturiser." },
    ],
    process: ["Discuss skin preferences, sensitivities and the selected facial.", "Prepare clean towels and confirm the products before application.", "Cleanse and perform the selected facial steps at a comfortable pace.", "Finish with suitable skincare, explain aftercare and tidy the area."],
    summary: "Facials and cleanups for refreshed-looking skin. Select the treatment you prefer; each option includes its listed steps and products. Multiple selections are separate treatments, not a combined facial.",
    note: "Introductory prices per session. Products are selected after consultation. Cosmetic results vary; no permanent skin-lightening or medical result is promised. Avoid treatment on irritated skin and follow the product instructions.",
  },
  {
    id: "men-hair-colour", title: "Hair Colour for Men", banner: "/spa-salon/men-colour-banner.webp",
    imageAlt: "City Coolies stylist wearing gloves and applying hair colour with a tint brush",
    options: [
      { id: "full", title: "Full Hair Colour", price: 799, duration: "60 min", image: "/spa-salon/men-colour-full.webp", detail: "One natural shade for short hair up to 5 cm. Colour product, application, rinse and basic finish included." },
      { id: "roots", title: "Root Touch-Up", price: 599, duration: "45 min", image: "/spa-salon/men-colour-roots.webp", detail: "Colour application to up to 2 cm of regrowth on short hair. Shade confirmed before service." },
      { id: "beard", title: "Beard Colour", price: 299, duration: "30 min", image: "/spa-salon/men-colour-beard.webp", detail: "Natural-shade beard colour using a product intended for facial hair; application and cleanup included." },
    ],
    process: ["Confirm colour area, current shade, hair length and desired result.", "Check product suitability and complete the manufacturer's required allergy test before the service.", "Protect clothing, wear gloves and apply the agreed product for its specified processing time.", "Rinse as directed, check the finish and explain colour-care instructions."],
    summary: "Choose full hair colour, root touch-up or beard colour. Natural black and brown shades are discussed before service; the selected product and shade depend on availability. A wash area and water are required for rinsing.",
    note: "Introductory prices include the listed scope. Longer hair, bleach, highlights and fashion colours are excluded and require a separate quote. Follow the selected product's allergy-test instructions and timing; same-day colouring may not be possible. Do not apply hair dye to eyebrows or eyelashes.",
  },
];
export const menMoney = (value: number) => `${String.fromCodePoint(0x20B9)}${value.toLocaleString("en-IN")}`;
export const menCartId = (serviceId: string, optionId: string) => `spa-salon:${serviceId}:${optionId}`;

export default function SpaSalonMarketplace() {
  const router = useRouter();
  const [selected, setSelected] = useState<Category>("women");
  const openService = (id: string) => router.push(`/services/spa-salon-services?service=${encodeURIComponent(id)}`);

  function addMenHaircutToCart() {
    upsertServiceCartItem({
      id: "spa-salon:men-haircut",
      serviceTitle: "Men's Haircut",
      optionLabel: "Men's Haircut",
      price: 299,
      priceLabel: menMoney(299),
      duration: "30 min",
    });

    window.dispatchEvent(
      new Event("citycoolies:deep-cleaning-cart-added")
    );
  }

  function addMenServiceToCart(service: MenService) {
    const option = service.options.reduce((lowest, current) =>
      current.price < lowest.price ? current : lowest
    );

    upsertServiceCartItem({
      id: menCartId(service.id, option.id),
      serviceTitle: service.title,
      optionLabel: option.title,
      price: option.price,
      priceLabel: menMoney(option.price),
      duration: option.duration,
    });

    window.dispatchEvent(
      new Event("citycoolies:deep-cleaning-cart-added")
    );
  }

  return (
    <main className="section spa-marketplace">
      <div className="container">
        <h1 className="selectorTitle">Select a spa &amp; salon service</h1>
        <div className="selector" role="group" aria-label="Choose spa and salon category">
          {categories.map((category) => (
            <button key={category.id} type="button"
              className={`category ${selected === category.id ? "active" : ""}`}
              aria-pressed={selected === category.id} onClick={() => setSelected(category.id)}>
              <Image loading="eager" src={category.image} alt="" width={100} height={100} />
              <span>{category.label}</span>
            </button>
          ))}
        </div>
        <div className="columns">
          <div className="main">
            <section className="content" aria-label={selected === "women" ? "Women's services" : "Men's services"}>
              {selected === "men" && (
  <>
    <nav className="serviceSelector" aria-label="Men's services">
      <button type="button" className="serviceSelectorItem"
        onClick={() => document.getElementById("men-haircut")?.scrollIntoView({ behavior: "smooth", block: "start" })}>
        <span className="menHairThumbnail" aria-hidden="true" />
        <span>Men&apos;s Haircut</span>
      </button>
      {menServices.map(service => (
        <button type="button" className="serviceSelectorItem" key={service.id}
          onClick={() => document.getElementById(service.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}>
          <Image src={service.options[0].image} alt="" width={100} height={100} unoptimized className="menServiceThumbnail" />
          <span>{service.title}</span>
        </button>
      ))}
    </nav>
    <section id="men-haircut" className="serviceGroup">
      <h3>Men&apos;s Haircut</h3>
      <div className="menHairBanner" role="img" aria-label="A barber cutting a man's hair" />
      <div className="serviceRow">
        <div>
          <h4>Men&apos;s Haircut</h4>
          <div className="rating">
            <span className="star" aria-hidden="true">{String.fromCodePoint(0x2605)}</span>
            <span>4.20</span><span className="reviewCount">(900 reviews)</span>
            <button type="button" onClick={() => openService("men-haircut")}>View details</button>
          </div>
          <strong>{String.fromCodePoint(0x20B9)}299</strong>
        </div>
        <button type="button" className="addButton" onClick={addMenHaircutToCart}>
          {"Add"}
        </button>
      </div>
    </section>
    {menServices.map(service => (
      <section id={service.id} className="serviceGroup" key={service.id}>
        <h3>{service.title}</h3>
        <Image src={service.banner} alt={service.imageAlt} width={1939} height={811}
          unoptimized loading="lazy" className="menServiceBanner" />
        <div className="serviceRow">
          <div>
            <h4>{service.title}</h4>
            <div className="rating">
              <span className="star" aria-hidden="true">{String.fromCodePoint(0x2605)}</span>
              <span>4.20</span><span className="reviewCount">(900 demo reviews)</span>
              <button type="button" onClick={() => openService(service.id)}>View details</button>
            </div>
            <strong>Starting from {menMoney(Math.min(...service.options.map(option => option.price)))}</strong>
          </div>
          <button type="button" className="addButton" onClick={() => addMenServiceToCart(service)}>Add</button>
        </div>
      </section>
    ))}
  </>
)}
              {selected === "women" && (
                <>
                  <nav className="serviceSelector" aria-label="Select a women's service">
                    {womenServices.map((service) => (
                      <button key={service.id} type="button" className="serviceSelectorItem"
                        onClick={() => document.getElementById(service.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}>
                        <span className={service.id === "salon-for-women" ? `thumbnail salonImage` : service.id === "spa-for-women" ? `thumbnail spaImage` : "thumbnail"} style={service.id === "hair-studio-for-women" ? { backgroundImage: 'url("/spa-salon/hair_studio_for_women_service_banner.6327a5c68b62.webp?v=4")', backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat" } : service.id === "waxing-for-women" ? { backgroundImage: 'url("/spa-salon/waxing_for_women_service_banner.jpg?v=1")', backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat" } : undefined} aria-hidden="true" />
                        <span>{service.title}</span>
                      </button>
                    ))}
                  </nav>
                  {womenServices.map((service) => (
                    <section key={service.id} id={service.id} className="serviceGroup">
                      <h3>{service.title}</h3>
                      <div className={service.id === "salon-for-women" ? `banner salonImage` : service.id === "spa-for-women" ? `banner spaImage` : "banner"} style={service.id === "hair-studio-for-women" ? { backgroundImage: 'url("/spa-salon/hair_studio_for_women_service_banner.6327a5c68b62.webp?v=4")', backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat" } : service.id === "waxing-for-women" ? { backgroundImage: 'url("/spa-salon/waxing_for_women_service_banner.jpg?v=1")', backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat" } : undefined} aria-hidden="true" />
                      <div className="serviceRow">
                        <div>
                          <h4>{service.title}</h4>
                          <div className="rating">
                            <span className="star" aria-hidden="true">{String.fromCodePoint(0x2605)}</span>
                            <span>4.20</span><span className="reviewCount">(900 reviews)</span>
                            <button type="button" onClick={() => openService(service.id)}>View details</button>
                          </div>
                          <strong>Starting from {String.fromCodePoint(0x20B9)}{service.price.toLocaleString("en-IN")}</strong>
                        </div>
                        <button type="button" className="addButton" onClick={() => openService(service.id)}>Add</button>
                      </div>
                    </section>
                  ))}
                </>
              )}
            </section>
          </div>
          {(selected === "women" || selected === "men") && <aside className="sidebar"><ServiceCartSidebar /></aside>}
        </div>
      </div>
      <style jsx global>{`.section { box-sizing: border-box; min-height: 60vh; width: 100%; background: #fff; color: #171717; }
.container { box-sizing: border-box; width: min(928px, calc(100% - 32px)); margin: 0 auto; padding: 12px 0 64px; }
.selectorTitle { margin: 0 0 8px; color: #ef1b23; font-size: 14px; font-weight: 700; line-height: 1.3; }
.selector { display: flex; gap: 10px; width: 100%; margin-top: -8px; padding: 0 0 15px; border-bottom: 1px solid #f0dfe2; }
.category { display: flex; width: 100px; flex: 0 0 100px; align-items: center; flex-direction: column; gap: 5px; padding: 0 0 5px; border: 0; border-bottom: 2px solid transparent; background: transparent; color: #171717; font: inherit; font-size: 13px; font-weight: 600; cursor: pointer; }
.category img { display: block; width: 100px; height: 100px; object-fit: contain; }
.category span { display: block; margin-top: -8px; text-align: center; }
.category:hover, .category:focus-visible, .active { color: #ef1b23; }
.active { border-bottom-color: #ef1b23; }
.category:focus-visible, .serviceSelectorItem:focus-visible, .addButton:focus-visible { outline: 2px solid #ef1b23; outline-offset: 3px; }
.columns { display: grid; grid-template-columns: minmax(0, 590px) minmax(0, 310px); gap: 28px; align-items: start; }
.main { min-width: 0; border-right: 1px solid #f4d9de; padding-bottom: 60px; }
.sidebar { min-width: 0; position: sticky; top: 170px; padding-top: 18px; }
.content { padding: 16px 0 24px; }
.content > h2 { margin: 0 0 16px; font-size: 18px; line-height: 1.3; }
.serviceSelector { display: flex; gap: 5px; width: 100%; overflow-x: auto; padding: 0 0 12px; scrollbar-width: thin; }
.serviceSelectorItem { display: flex; width: 100px; flex: 0 0 100px; align-items: center; flex-direction: column; gap: 7px; padding: 0; border: 0; background: transparent; color: #171717; font: inherit; font-size: 13px; line-height: 1.16; text-align: center; cursor: pointer; }
.serviceSelectorItem:hover { color: #ef1b23; }
.thumbnail { display: block; width: 100px; height: 100px; background: #fff4f5; }
.serviceGroup { width: 100%; padding: 16px 0 25px; border-bottom: 1px solid #f0dfe2; scroll-margin-top: 145px; }
.serviceGroup + .serviceGroup { padding-top: 25px; }
.serviceGroup h3 { margin: 0 0 12px; font-size: 28px; line-height: 1.2; }
.banner { width: 100%; aspect-ratio: 1940 / 811; background: #fff4f5 center / contain no-repeat; }
.salonImage { background-image: url("/spa-salon/salon_for_women_service_banner.0f440f766431.webp"); background-position: center; background-size: contain; background-repeat: no-repeat; }
.serviceRow { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 0 0; }
.serviceRow h4 { margin: 0 0 6px; font-size: 19px; line-height: 1.25; }
.serviceRow strong { display: inline-block; margin-top: 11px; }
.rating { display: flex; align-items: center; flex-wrap: wrap; column-gap: 5px; row-gap: 3px; color: #555f6c; font-size: 13px; line-height: 1.25; }
.star { display: inline-flex; width: 16px; height: 16px; flex: 0 0 16px; align-items: center; justify-content: center; border-radius: 50%; background: #ef1b23; color: #fff; font-size: 11px; line-height: 1; }
.reviewCount { border-bottom: 1px dotted #69717d; white-space: nowrap; }
.rating button { padding: 0 0 0 5px; border: 0; background: transparent; color: #e71922; font: inherit; font-weight: 600; cursor: pointer; }
.addButton { min-width: 85px; min-height: 42px; flex: 0 0 auto; padding: 8px 16px; border: 1px solid #ef1b23; border-radius: 10px; background: #fff; color: #ef1b23; font-size: 16px; font-weight: 700; cursor: pointer; }
.addButton:hover { background: #ef1b23; color: #fff; }
.backdrop { position: fixed; inset: 0; z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 16px; background: #0009; }
.modal { display: flex; width: min(472px, calc(100vw - 32px)); max-height: calc(100dvh - 32px); min-height: 180px; flex-direction: column; overflow: hidden; border-radius: 18px; background: #fff; box-shadow: 0 20px 70px #0004; }
.modalHeader { display: flex; align-items: start; justify-content: space-between; gap: 12px; padding: 18px 22px; border-bottom: 1px solid #e6e8ef; }
.modalHeader h2 { margin: 0; font-size: 25px; line-height: 1.2; }
.modalHeader button { border: 0; background: transparent; color: #171717; font-size: 29px; line-height: 1; cursor: pointer; }
.modalBody { min-height: 100px; }
@media (max-width: 980px) { .container { width: min(100% - 28px, 810px); } .columns { grid-template-columns: minmax(0, 1fr); } .main { border-right: 0; padding-bottom: 12px; } .sidebar { position: static; padding-top: 0; } }
@media (max-width: 600px) { .container { width: calc(100% - 24px); padding-top: 10px; } .serviceGroup h3 { font-size: 24px; } .serviceRow h4 { font-size: 17px; } .rating, .rating button { font-size: 12px; } }
.serviceSelectorItem .salonImage { background-image: url("/spa-salon/salon_for_women_thumbnail_v2.3c7245d7490d.webp"); background-size: cover; background-position: center; }
.menHairThumbnail { display:block;width:100px;height:100px;background:transparent url("/spa-salon/men_haircut_service_banner.bcc4722732eb.webp") center/cover no-repeat; }
.menHairBanner { display:block;width:100%;aspect-ratio:1939/811;background:#fff4f5 url("/spa-salon/men_haircut_service_banner.bcc4722732eb.webp") center/contain no-repeat; }
.menServiceThumbnail { display:block;width:100px;height:100px;object-fit:cover; }
.menServiceBanner { display:block;width:100%;height:auto;aspect-ratio:1939/811;object-fit:contain; }
.salonImage { background: #fff4f5 url("/spa-salon/salon_for_women_facial_banner.2cf867be55ac.webp") center/cover no-repeat; }
.serviceSelectorItem .salonImage { background-position:72% center; }
.spaImage { background:#fff4f5 url("/spa-salon/spa_for_women_original_massage.jpg") center/cover no-repeat; }

/* SPA_MOBILE_NAVBAR_FIX */
@media (max-width: 600px) {
  .spa-marketplace > .container {
    padding-top: 144px;
  }
}
`}</style>
    </main>
  );
}
