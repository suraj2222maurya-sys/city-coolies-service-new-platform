"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { readServiceCart, removeServiceCartItem, upsertServiceCartItem } from "@/app/services/serviceCart";
import { hairOptions, waxingOptions, waxingImageRatios, womenServices, spaOptions, facialOptions, spaServiceInfo, spaRatingPercentages, menServices, menMoney, menCartId, type MenService } from "./SpaSalonMarketplace";

function SpaOptionImage({
    src, title, className, aspectRatio
  }: {
    src: string;
    title: string;
    className: string;
    aspectRatio?: string | number;
  }) {
    return (
      <div className={className} style={{
        position: "relative",
        backgroundImage: "none",
        ...(aspectRatio === undefined ? {} : { aspectRatio })
      }}>
        <Image src={src} alt={title} fill unoptimized
          loading="eager" decoding="async"
          sizes="(max-width: 600px) 100vw, 472px"
          style={{ objectFit: "contain" }} />
      </div>
    );
  }

function MenServiceDialog({ service, onClose, pageMode = false }: { service: MenService; onClose: () => void; pageMode?: boolean }) {
  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    const saved = readServiceCart();
    return service.options.filter(option => saved.some(item => item.id === menCartId(service.id, option.id))).map(option => option.id);
  });
  const [hadSavedSelection] = useState(() => selectedIds.length > 0);
  const [cartError, setCartError] = useState("");
  const panelRef = useRef<HTMLElement>(null);
  const chosen = service.options.filter(option => selectedIds.includes(option.id));
  const total = chosen.reduce((sum, option) => sum + option.price, 0);

  useEffect(() => {
    if (pageMode) return;
    const previousOverflow = document.body.style.overflow;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    panel?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") { event.preventDefault(); onClose(); return; }
      if (event.key !== "Tab" || !panel) return;
      const controls = Array.from(panel.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], input, select, textarea, [tabindex="0"]'));
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === panel)) {
        event.preventDefault(); first.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      if (trigger?.isConnected) trigger.focus();
    };
  }, [onClose, pageMode]);

  function continueBooking() {
    try {
      const current = readServiceCart();
      for (const option of service.options) {
        const id = menCartId(service.id, option.id);
        if (selectedIds.includes(option.id)) {
          upsertServiceCartItem({ id, serviceTitle: service.title, optionLabel: option.title,
            price: option.price, priceLabel: menMoney(option.price), duration: option.duration });
        } else if (current.some(item => item.id === id)) {
          removeServiceCartItem(id);
        }
      }
      onClose();
    } catch {
      setCartError("Your browser could not save the cart. Please allow site storage and try again.");
    }
  }

  return (
    <div className="spaPageContent">
      <section ref={panelRef} tabIndex={-1} className="spaPagePanel menServiceModal"
        role="region" aria-labelledby="men-service-title">
        <header className="spaPageHeader">
          <h2 id="men-service-title">{service.title}</h2>
        </header>
        <div className="spaPageBody menServiceBody">
          <p className="menOptionPrompt">Choose your requirements</p>
          <div className="menOptionGrid">
            {service.options.map(option => {
              const isSelected = selectedIds.includes(option.id);
              return (
                <div className="menOption" key={option.id}>
                  <Image className="menOptionImage" src={option.image} alt={option.title + " service demonstration"}
                    width={360} height={240} unoptimized loading="lazy" />
                  <h3>{option.title}</h3>
                  <span className="menOptionDuration">{option.duration}</span>
                  <div className="menOptionActions">
                    <strong>{menMoney(option.price)}</strong>
                    <button type="button" className={`addButton ${isSelected ? "menOptionSelected" : ""}`}
                      aria-pressed={isSelected} aria-label={`${isSelected ? "Remove" : "Add"} ${option.title}`}
                      onClick={() => { setSelectedIds(ids => ids.includes(option.id) ? ids.filter(id => id !== option.id) : [...ids, option.id]); setCartError(""); }}>
                      {isSelected ? "Remove" : "Add"}
                    </button>
                  </div>
                  <p>{option.detail}</p>
                </div>
              );
            })}
          </div>
          {chosen.length > 0 && <div className="menSelectedSummary" aria-live="polite">
            <h3>Selected services</h3>
            {chosen.map(option => <p key={option.id}><span>{option.title}</span><strong>{menMoney(option.price)}</strong></p>)}
          </div>}
          <section className="menServiceInfo">
            <h3>Work process</h3>
            <ol>{service.process.map(step => <li key={step}>{step}</li>)}</ol>
          </section>
          <section className="menServiceInfo">
            <h3>About this service</h3><p>{service.summary}</p><p>{service.note}</p>
          </section>
          <section className="menHairReviews" aria-label="Demo rating overview">
            <h3>Rating overview</h3>
            <div className="menHairReviewHeader">
              <strong><span aria-hidden="true">{String.fromCodePoint(0x2605)}</span> 4.20</strong>
              <span>900 demo reviews</span>
            </div>
            <p className="menDemoNote">Illustrative rating and sample reviews, not verified customer feedback.</p>
            {[50, 29, 14, 5, 2].map((percentage, index) => <div className="menHairRatingLine" key={index}>
              <span>{5 - index} {String.fromCodePoint(0x2605)}</span>
              <div><i style={{ width: `${percentage}%` }} /></div><span>{percentage}%</span>
            </div>)}
            <div className="menSampleReview"><strong>Sample review (demo)</strong><p>The professional explained each step and kept the work area clean.</p></div>
            <div className="menSampleReview"><strong>Sample review (demo)</strong><p>Clear service options and a comfortable session from start to finish.</p></div>
          </section>
          {cartError && <p role="alert" className="menCartError">{cartError}</p>}
        </div>
        <footer className="facialFooter">
          <div aria-live="polite"><span>Selected total</span><strong>{menMoney(total)}</strong></div>
          <button type="button" disabled={chosen.length === 0 && !hadSavedSelection} onClick={continueBooking}>
            {chosen.length === 0 && hadSavedSelection ? "Update cart" : "Continue"}
          </button>
        </footer>
      </section>
    </div>
  );
}

export default function SpaSalonDetails({ serviceId }: { serviceId: string }) {
  const router = useRouter();
  const closeDetails = () => router.push("/services/spa-salon-services");
  const active = womenServices.find(item => item.id === serviceId) ?? null;
  const showMenDetails = serviceId === "men-haircut";
  const activeMenService = menServices.find(item => item.id === serviceId) ?? null;
  const [menHaircutAdded, setMenHaircutAdded] = useState(false);
  const [selectedWaxingIds, setSelectedWaxingIds] = useState<string[]>([]);
  const [selectedHairIds, setSelectedHairIds] = useState<string[]>([]);
  const [selectedSpaIds, setSelectedSpaIds] = useState<string[]>([]);
  const [selectedFacial, setSelectedFacial] = useState<string[]>([]);
  const selectedFacialIds = selectedFacial;

  function continueSpaService() {
    if (!active) return;
    if (active.id === "salon-for-women") {
      const ids = Array.isArray(selectedFacial) ? selectedFacial : [];
      facialOptions.filter((facial) => ids.includes(facial.id)).forEach((facial) => {
        upsertServiceCartItem({
          id: `spa-salon:facial:${facial.id}`,
          serviceTitle: active.title,
          optionLabel: facial.title,
          price: facial.price,
          priceLabel: `${String.fromCodePoint(0x20B9)}${facial.price.toLocaleString("en-IN")}`,
          duration: "One session",
        });
      });
    } else if (active.id === "spa-for-women") {
      if (selectedSpaIds.length === 0) return;
      spaOptions.filter((spa) => selectedSpaIds.includes(spa.id)).forEach((spa) => {
        upsertServiceCartItem({
          id: `spa-salon:spa:${spa.id}`,
          serviceTitle: active.title,
          optionLabel: spa.title,
          price: spa.price,
          priceLabel: `${String.fromCodePoint(0x20B9)}${spa.price.toLocaleString("en-IN")}`,
          duration: "One session",
        });
      });
    } else if (active.id === "hair-studio-for-women") {
      if (selectedHairIds.length === 0) return;
      hairOptions.filter((hair) => selectedHairIds.includes(hair.id)).forEach((hair) => {
        upsertServiceCartItem({
          id: `spa-salon:hair:${hair.id}`,
          serviceTitle: active.title,
          optionLabel: hair.title,
          price: hair.price,
          priceLabel: `${String.fromCodePoint(0x20B9)}${hair.price.toLocaleString("en-IN")}`,
          duration: hair.duration,
        });
      });
    } else if (active.id === "waxing-for-women") {
      if (selectedWaxingIds.length === 0) return;
      waxingOptions.filter((option) => selectedWaxingIds.includes(option.id)).forEach((option) => {
        upsertServiceCartItem({
          id: `spa-salon:waxing:${option.id}`,
          serviceTitle: active.title,
          optionLabel: option.title,
          price: option.price,
          priceLabel: `${String.fromCodePoint(0x20B9)}${option.price.toLocaleString("en-IN")}`,
          duration: option.duration,
        });
      });
    } else {
      upsertServiceCartItem({
        id: `spa-salon:${active.id}`,
        serviceTitle: active.title,
        optionLabel: active.title,
        price: active.price,
        priceLabel: `${String.fromCodePoint(0x20B9)}${active.price.toLocaleString("en-IN")}`,
        duration: "One session",
      });
    }
    closeDetails();
  }
  function addMenHaircut() {
    upsertServiceCartItem({
      id: "spa-salon:men-haircut",
      serviceTitle: "Men's Haircut",
      optionLabel: "Men's Haircut",
      price: 299,
      priceLabel: `${String.fromCodePoint(0x20B9)}299`,
      duration: "30 min",
    });
    setMenHaircutAdded(true);
  }
  if (!active && !showMenDetails && !activeMenService) {
    return <main className="spa-detail-mode" style={{padding:32}}><button type="button" onClick={closeDetails}>Back to Spa & Salon</button><h1>Service not found</h1></main>;
  }
  return (
    <main className="spa-detail-mode spa-service-page">
      <div className="spa-detail-heading"><button type="button" onClick={closeDetails}>← Back to Spa & Salon</button></div>
      {active && (
        <div className="spaPageContent">
          <section className="spaPagePanel" role="region" aria-labelledby="spa-modal-title">
            <header className="spaPageHeader">
              <h2 id="spa-modal-title">{active.title}</h2>
            </header>
            <div className="spaPageBody">
          {active.id === "waxing-for-women" && (
            <>
              <p className="waxingPrompt">Choose your requirements</p>
              <div className="waxingGrid">
                {waxingOptions.map((option) => (
                  <div className="waxingOption" key={option.id}>
                    <SpaOptionImage className="waxingImage" src={option.image} title={option.title} aspectRatio={waxingImageRatios[option.id]} />
                    <div className="waxingDetails">
                      <strong>{option.title}</strong>
                      <span>{String.fromCodePoint(0x20B9)}{option.price.toLocaleString("en-IN")}</span>
                      <button type="button" className="waxingAdd" aria-pressed={selectedWaxingIds.includes(option.id)}
                        onClick={() => setSelectedWaxingIds((current) => current.includes(option.id) ? current.filter((id) => id !== option.id) : [...current, option.id])}>Add</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {active.id === "hair-studio-for-women" && (
            <>
              <p className="hairPrompt">Choose your hair service</p>
              <div className="hairGrid">
                {hairOptions.map((hair) => (
                  <div className="hairOption" key={hair.id}>
                    <SpaOptionImage className="hairImage" src={hair.image} title={hair.title} />
                    <div className="hairDetails">
                      <strong>{hair.title}</strong>
                      <span>{String.fromCodePoint(0x20B9)}{hair.price.toLocaleString("en-IN")}</span>
                      <button type="button" className="hairAdd" aria-pressed={selectedHairIds.includes(hair.id)}
                        onClick={() => setSelectedHairIds((current) => current.includes(hair.id) ? current.filter((id) => id !== hair.id) : [...current, hair.id])}>Add</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
  {active.id === "salon-for-women" && (
    <>
      <p className="facialPrompt">Choose your requirements</p>
      <div className="facialGrid">
        {facialOptions.map((facial) => (
          <div className="facialOption" key={facial.id}>
            <SpaOptionImage className="facialImage" src={facial.image} title={facial.title} />
            <div className="facialOptionDetails">
              <strong>{facial.title}</strong>
              <span>{String.fromCodePoint(0x20B9)}{facial.price.toLocaleString("en-IN")}</span>
              <button type="button" className="facialAdd" aria-pressed={selectedFacialIds.includes(facial.id)}
                onClick={() => setSelectedFacial((current) => { const items = Array.isArray(current) ? current : []; return items.includes(facial.id) ? items.filter((id) => id !== facial.id) : [...items, facial.id]; })}>
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )}
{active.id === "spa-for-women" && (
  <>
    <p className="spaIntro">Choose your requirements</p>
    <div className="stressGrid">
      {spaOptions.map((spa) => (
        <div className="stressOption" key={spa.id}>
          <SpaOptionImage className="stressImage" src={spa.image} title={spa.title} />
          <div className="stressDetails">
            <strong>{spa.title}</strong>
            <span>{String.fromCodePoint(0x20B9)}{spa.price.toLocaleString("en-IN")}</span>
            <button type="button" aria-pressed={selectedSpaIds.includes(spa.id)}
              onClick={() => setSelectedSpaIds((current) => current.includes(spa.id) ? current.filter((id) => id !== spa.id) : [...current, spa.id])}>Add</button>
          </div>
        </div>
      ))}
    </div>
  </>
)}
{active.id !== "salon-for-women" && active.id !== "spa-for-women" && <p className="spaIntro">Service details</p>}
<div className="spaInfo">
  <h3>About this service</h3>
  <p>{spaServiceInfo[active.id]?.summary}</p>
  <h3>Work process</h3>
  <ol>
    {spaServiceInfo[active.id]?.process.map((step) => <li key={step}>{step}</li>)}
  </ol>
  <div className="spaRating">
    <div className="spaRatingHeading">
      <span className="spaRatingStar" aria-hidden="true">{String.fromCodePoint(0x2605)}</span>
      <strong>4.20</strong>
      <span>900 reviews</span>
    </div>
    {[5, 4, 3, 2, 1].map((star, index) => (
      <div className="spaRatingLine" key={star}>
        <span>{star} ★</span>
        <div><i style={{ width: `${spaRatingPercentages[index]}%` }} /></div>
        <span>{spaRatingPercentages[index]}%</span>
      </div>
    ))}
  </div>
</div>
</div>
{active.id === "salon-for-women" && (
  <footer className="facialFooter">
    <div><span>Selected total</span><strong>{String.fromCodePoint(0x20B9)}{facialOptions.filter((item) => selectedFacialIds.includes(item.id)).reduce((sum, item) => sum + item.price, 0).toLocaleString("en-IN")}</strong></div>
    <button type="button" disabled={selectedFacialIds.length === 0} onClick={continueSpaService}>Continue</button>
  </footer>
)}
{active.id === "hair-studio-for-women" && (
  <footer className="facialFooter">
    <div>
      <span>Selected total</span>
      <strong>{String.fromCodePoint(0x20B9)}{hairOptions.filter((hair) => selectedHairIds.includes(hair.id)).reduce((total, hair) => total + hair.price, 0).toLocaleString("en-IN")}</strong>
    </div>
    <button type="button" disabled={selectedHairIds.length === 0} onClick={continueSpaService}>Continue</button>
  </footer>
)}
{active.id === "waxing-for-women" && (
  <footer className="facialFooter">
    <div>
      <span>Selected total</span>
      <strong>{String.fromCodePoint(0x20B9)}{waxingOptions.filter((option) => selectedWaxingIds.includes(option.id)).reduce((total, option) => total + option.price, 0).toLocaleString("en-IN")}</strong>
    </div>
    <button type="button" disabled={selectedWaxingIds.length === 0} onClick={continueSpaService}>Continue</button>
  </footer>
)}
{active.id !== "salon-for-women" && active.id !== "hair-studio-for-women" && active.id !== "waxing-for-women" && (
  <footer className="facialFooter">
    <div>
      <span>Selected total</span>
      <strong>{String.fromCodePoint(0x20B9)}{active.id === "spa-for-women" ? spaOptions.filter((spa) => selectedSpaIds.includes(spa.id)).reduce((total, spa) => total + spa.price, 0).toLocaleString("en-IN") : active.price.toLocaleString("en-IN")}</strong>
    </div>
    <button type="button" disabled={active.id === "spa-for-women" && selectedSpaIds.length === 0} onClick={continueSpaService}>Continue</button>
  </footer>
)}
          </section>
        </div>
      )}
      {activeMenService && <MenServiceDialog key={activeMenService.id} service={activeMenService} onClose={closeDetails} pageMode />}
      {showMenDetails && (
        <div className="spaPageContent">
          <section className="spaPagePanel" role="region" aria-labelledby="men-haircut-dialog-title">
            <header className="spaPageHeader">
              <h2 id="men-haircut-dialog-title">Men&apos;s Haircut</h2>
            </header>
            <div className="spaPageBody">
              <div className="menHairInfo">
                <h3>About this service</h3>
                <p>A professional haircut tailored to your preferred style and hair length. Includes a brief style consultation, haircut and a final check. Hair wash and beard grooming are separate services.</p>
              </div>
              <div className="menHairInfo">
                <h3>Work process</h3>
                <ol>
                  <li>Discuss the requested cut and hair length.</li>
                  <li>Prepare clean tools and a protective cape.</li>
                  <li>Cut, blend and shape the hair.</li>
                  <li>Check the finish and tidy the work area.</li>
                </ol>
              </div>
              <div className="menHairReviews">
                <div className="menHairReviewHeader">
                  <strong><span aria-hidden="true">{String.fromCodePoint(0x2605)}</span> 4.20</strong><span>900 reviews</span>
                </div>
                {[48, 29, 13, 7, 3].map((percentage, index) => (
                  <div className="menHairRatingLine" key={index}>
                    <span>{5 - index} {String.fromCodePoint(0x2605)}</span>
                    <div><i style={{ width: `${percentage}%` }} /></div>
                    <span>{percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
            <footer className="facialFooter">
              <div><span>Service price</span><strong>{String.fromCodePoint(0x20B9)}299</strong></div>
              <button type="button" onClick={() => { addMenHaircut(); closeDetails(); }}>
                {menHaircutAdded ? "Added" : "Add"}
              </button>
            </footer>
          </section>
        </div>
      )}          <style jsx global>{`.section { box-sizing: border-box; min-height: 60vh; width: 100%; background: #fff; color: #171717; }
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

/* Original Spa for Women photo: preserve the entire image on every screen. */
.banner.spaImage,
.serviceSelectorItem .thumbnail.spaImage {
  background-image: url("/spa-salon/spa_for_women_original_massage.jpg") !important;
  background-position: center !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
}
/* ORIGINAL_SPA_IMAGE_START */
.spaImage {
  background-image: url("/spa-salon/spa_for_women_original_massage.jpg") !important;
  background-position: center !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
}
/* ORIGINAL_SPA_IMAGE_END */
/* SPA_BANNER_FIT_START */
.banner.spaImage {
  background-size: cover !important;
  background-position: center !important;
}
.serviceSelectorItem .thumbnail.spaImage {
  background-size: cover !important;
  background-position: center !important;
}
/* SPA_BANNER_FIT_END */
/* SALON_FACIAL_START */
.salonImage {
  background-image: url("/spa-salon/salon_for_women_facial_banner.2cf867be55ac.webp") !important;
  background-size: cover !important;
  background-position: center !important;
}
.serviceSelectorItem .salonImage {
  background-image: url("/spa-salon/salon_for_women_facial_banner.2cf867be55ac.webp") !important;
  background-size: cover !important;
  background-position: 72% center !important;
}
/* SALON_FACIAL_END */
/* FACIAL_OPTIONS_START */
.modalBody { min-height: 0; overflow-y: auto; padding: 20px 30px; }
.facialPrompt { margin: 0 0 4px; color: #566173; font-size: 16px; }
.facialGrid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 16px; row-gap: 20px; }
.facialOption { min-width: 0; }
.facialImage { width: 100%; aspect-ratio: 1; border-radius: 11px; background-color: #fff4f5; background-position: center; background-size: contain; background-repeat: no-repeat; }
.facialOptionDetails { display: grid; grid-template-columns: minmax(0, 1fr) auto auto; align-items: center; gap: 7px; padding-top: 7px; color: #171717; font-size: 13px; }
.facialOptionDetails strong { min-width: 0; line-height: 1.25; }
.facialOptionDetails span { font-weight: 700; white-space: nowrap; }
.facialAdd { min-width: 61px; padding: 7px 10px; border: 1px solid #ef1b23; border-radius: 10px; background: #fff; color: #ef1b23; font: inherit; font-weight: 700; cursor: pointer; }
.facialAdd[aria-pressed="true"] { background: #fff4f5; }
.facialFooter { display: flex; flex: 0 0 auto; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 30px; border-top: 1px solid #e6e8ef; }
.facialFooter div { display: flex; flex-direction: column; gap: 3px; }
.facialFooter span { color: #66707e; }
.facialFooter strong { color: #171717; font-size: 19px; }
.facialFooter button { min-width: 140px; padding: 13px; border: 0; border-radius: 12px; background: #ef1b23; color: #fff; font-size: 16px; font-weight: 700; cursor: pointer; }
.facialFooter button:disabled { background: #e6e8ec; color: #8c929d; cursor: not-allowed; }
@media (max-width: 600px) { .modalBody { padding: 15px 16px; } .facialGrid { gap: 14px 10px; } .facialOptionDetails { grid-template-columns: minmax(0, 1fr) auto; } .facialOptionDetails strong { grid-column: 1 / -1; } .facialFooter { padding: 12px 16px; } }
/* FACIAL_OPTIONS_END */
/* SPA_DETAILS_START */
.spaIntro { margin: 0 0 12px; color: #566173; }
.spaInfo { margin-top: 22px; color: #4e5968; font-size: 14px; line-height: 1.5; }
.spaInfo h3 { margin: 16px 0 6px; color: #171717; font-size: 16px; }
.spaInfo p { margin: 0 0 10px; }
.spaInfo ol { margin: 0; padding-left: 20px; }
.spaInfo li { margin: 5px 0; }
.spaRating { margin-top: 20px; padding-top: 14px; border-top: 1px solid #e6e8ef; }
.spaRatingHeading { display: flex; align-items: center; gap: 9px; margin-bottom: 12px; }
.spaRatingHeading strong { color: #4e5968; font-size: 22px; }
.spaRatingStar { color: #ef1b23; font-size: 22px; }
.spaRatingLine { display: grid; grid-template-columns: 36px minmax(0, 1fr) 38px; align-items: center; gap: 9px; margin: 8px 0; }
.spaRatingLine > div { height: 6px; background: #ddd; }
.spaRatingLine i { display: block; height: 100%; background: #ef1b23; }
.spaRatingLine > span:last-child { text-align: right; }
/* SPA_DETAILS_END */
/* STRESS_RELIEF_START */
.stressGrid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; margin-bottom: 22px; }
.stressOption { min-width: 0; }
.stressImage { width: 100%; aspect-ratio: 1; border-radius: 11px; background: #fff4f5 url('/spa-salon/stress_relief_spa.6daac463c1e4.webp') center / contain no-repeat; }
.stressDetails { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: center; gap: 7px; padding-top: 7px; color: #171717; font-size: 13px; }
.stressDetails strong { min-width: 0; grid-column: 1 / -1; }
.stressDetails span { font-weight: 700; white-space: nowrap; }
.stressDetails button { min-width: 60px; padding: 7px 10px; border: 1px solid #ef1b23; border-radius: 9px; background: #fff; color: #ef1b23; font: inherit; font-weight: 700; cursor: pointer; }
.stressDetails button[aria-pressed='true'] { background: #fff4f5; }
@media (max-width: 600px) { .stressGrid { gap: 10px; } }
/* STRESS_RELIEF_END */
/* SPA_FACIAL_LAYOUT_MATCH */
.stressGrid { margin-bottom: 0; }
.stressDetails {
  grid-template-columns: minmax(0, 1fr) auto auto;
  gap: 7px;
}
.stressDetails strong {
  grid-column: auto;
  line-height: 1.25;
}
@media (max-width: 600px) {
  .stressDetails { grid-template-columns: minmax(0, 1fr) auto; }
  .stressDetails strong { grid-column: 1 / -1; }
}
/* SPA_PAIN_OPTIONS_START */
.stressGrid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px 12px; margin-bottom: 22px; }
.stressOption { min-width: 0; border: 0; background: transparent; }
.stressImage { display: block; width: 100%; aspect-ratio: 1; border-radius: 0; background-color: #fff4f5; background-position: center; background-size: contain; background-repeat: no-repeat; }
.stressDetails { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: center; gap: 5px; padding-top: 7px; color: #171717; font-size: 13px; }
.stressDetails strong { grid-column: 1 / -1; min-height: 2.4em; line-height: 1.2; overflow-wrap: anywhere; }
.stressDetails span { font-weight: 700; white-space: nowrap; }
.stressDetails button { min-width: 60px; padding: 7px 10px; border: 1px solid #ef1b23; border-radius: 9px; background: #fff; color: #ef1b23; font: inherit; font-weight: 700; cursor: pointer; }
.stressDetails button[aria-pressed='true'] { background: #fff4f5; }
@media (max-width: 600px) { .stressGrid { gap: 14px 10px; } .stressDetails { font-size: 12px; } }
/* SPA_PAIN_OPTIONS_END */
/* HAIR_STUDIO_OPTIONS_START */
.hairPrompt { margin: 0 0 12px; color: #566173; font-size: 16px; }
.hairGrid { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 18px 12px; margin-bottom: 20px; }
.hairOption { min-width: 0; background: transparent; border: 0; }
.hairImage { display: block; width: 100%; aspect-ratio: 1672 / 941; background-color: #fff4f5; background-position: center; background-size: contain; background-repeat: no-repeat; }
.hairDetails { display: grid; grid-template-columns: minmax(0,1fr) auto; align-items: center; gap: 6px; padding-top: 8px; color: #171717; font-size: 13px; }
.hairDetails strong { grid-column: 1 / -1; min-width: 0; line-height: 1.25; }
.hairDetails span { font-weight: 700; white-space: nowrap; }
.hairAdd { min-width: 62px; padding: 7px 10px; border: 1px solid #ef1b23; border-radius: 10px; background: #fff; color: #ef1b23; font: inherit; font-weight: 700; cursor: pointer; }
.hairAdd[aria-pressed="true"] { background: #fff4f5; }
@media (max-width:600px) { .hairGrid { gap: 14px 9px; } .hairDetails { font-size: 12px; } }
/* HAIR_STUDIO_OPTIONS_END */
/* WAXING_OPTIONS_START */
.waxingPrompt { margin: 0 0 12px; color: #566173; font-size: 16px; }
.waxingGrid { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 18px 12px; margin-bottom: 20px; }
.waxingOption { min-width: 0; border: 0; background: transparent; }
.waxingImage { display: block; width: 100%; aspect-ratio: 1; background-color: #fff4f5; background-position: center; background-size: contain; background-repeat: no-repeat; }
.waxingDetails { display: grid; grid-template-columns: minmax(0,1fr) auto; align-items: center; gap: 6px; padding-top: 8px; color: #171717; font-size: 13px; }
.waxingDetails strong { grid-column: 1 / -1; min-width: 0; line-height: 1.25; }
.waxingDetails span { font-weight: 700; white-space: nowrap; }
.waxingAdd { min-width: 62px; padding: 7px 10px; border: 1px solid #ef1b23; border-radius: 10px; background: #fff; color: #ef1b23; font: inherit; font-weight: 700; cursor: pointer; }
.waxingAdd[aria-pressed="true"] { background: #fff4f5; }
@media (max-width:600px) { .waxingGrid { gap: 14px 9px; } .waxingDetails { font-size: 12px; } }
/* WAXING_OPTIONS_END */
/* WAXING_LARGE_IMAGES_START */
.waxingGrid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 24px; margin-bottom: 20px; }
.waxingOption { min-width: 0; padding: 0; border: 0; border-radius: 0; background: transparent; box-shadow: none; }
.waxingImage { display: block; width: 100%; height: auto; border: 0; border-radius: 0; background-color: transparent; background-position: center; background-size: contain; background-repeat: no-repeat; }
.waxingDetails { padding-top: 9px; }
@media (max-width: 600px) { .waxingGrid { grid-template-columns: minmax(0, 1fr); gap: 20px; } }
/* WAXING_LARGE_IMAGES_END */
/* MEN_HAIRCUT_START */
.menHairThumbnail {
  display: block;
  width: 100px;
  height: 100px;
  flex: 0 0 100px;
  padding: 0;
  border: 0;
  border-radius: 0;
  box-shadow: none;
  background: transparent url("/spa-salon/men_haircut_service_banner.bcc4722732eb.webp") center / cover no-repeat;
}
.menHairBanner { display: block; width: 100%; aspect-ratio: 1939 / 811; background: #fff4f5 url("/spa-salon/men_haircut_service_banner.bcc4722732eb.webp") center / contain no-repeat; }
.menHairInfo { margin-bottom: 16px; color: #526071; font-size: 15px; line-height: 1.5; }
.menHairInfo h3 { margin: 0 0 8px; color: #171717; font-size: 18px; }
.menHairInfo p { margin: 0; }
.menHairInfo ol { margin: 0; padding-left: 22px; }
.menHairInfo li { margin: 5px 0; }
.menHairReviews { padding: 15px 0 5px; border-top: 1px solid #e6e8ef; color: #566173; }
.menHairReviewHeader { display: flex; align-items: center; gap: 11px; margin-bottom: 12px; }
.menHairReviewHeader strong { font-size: 23px; }
.menHairReviewHeader strong span { color: #ef1b23; }
.menHairRatingLine { display: grid; grid-template-columns: 50px minmax(0,1fr) 38px; gap: 10px; align-items: center; margin: 10px 0; }
.menHairRatingLine > div { height: 6px; background: #dedede; }
.menHairRatingLine i { display: block; height: 100%; background: #ef1b23; }
@media (max-width:600px) { .menHairInfo { font-size: 14px; } }
/* MEN_HAIRCUT_END */
/* Men's spa, facial and colour services */
.menServiceThumbnail { display: block; width: 100px; height: 100px; flex: 0 0 100px; object-fit: cover; border: 0; border-radius: 0; background: transparent; box-shadow: none; }
.menServiceBanner { display: block; width: 100%; height: auto; aspect-ratio: 1939 / 811; object-fit: contain; border: 0; border-radius: 0; background: transparent; box-shadow: none; }
.menServiceModal { width: min(560px, calc(100vw - 32px)); }
.menServiceModal:focus { outline: none; }
.menServiceBody { overscroll-behavior: contain; }
.menOptionPrompt { margin: 0 0 16px; color: #526071; font-size: 16px; }
.menOptionGrid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px 14px; }
.menOption { min-width: 0; padding: 0; border: 0; border-radius: 0; background: transparent; box-shadow: none; }
.menOptionImage { display: block; width: 100%; height: auto; aspect-ratio: 3 / 2; object-fit: contain; border: 0; border-radius: 0; }
.menOption h3 { margin: 9px 0 4px; color: #171717; font-size: 15px; line-height: 1.35; }
.menOptionDuration { color: #66707e; font-size: 13px; }
.menOptionActions { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin: 12px 0 8px; }
.menOptionActions strong { color: #171717; font-size: 16px; }
.menOptionActions .addButton { min-width: 70px; min-height: 38px; padding: 6px 12px; font-size: 14px; }
.menOptionActions .menOptionSelected { background: #fff1f2; color: #d9101a; }
.menOption p { margin: 0; color: #66707e; font-size: 12px; line-height: 1.55; }
.menSelectedSummary { padding: 16px 0; margin-top: 18px; border-top: 1px solid #f0dfe2; }
.menSelectedSummary h3, .menServiceInfo h3, .menHairReviews h3 { margin: 0 0 10px; color: #171717; font-size: 18px; }
.menSelectedSummary p { display: flex; justify-content: space-between; gap: 12px; margin: 8px 0; color: #526071; font-size: 14px; }
.menSelectedSummary strong { white-space: nowrap; }
.menServiceInfo { margin-top: 24px; color: #526071; font-size: 14px; line-height: 1.65; }
.menServiceInfo ol { margin: 0; padding-left: 21px; }
.menServiceInfo li { margin: 6px 0; }
.menServiceInfo p { margin: 8px 0 16px; }
.menServiceModal .menHairReviews { margin-top: 24px; }
.menDemoNote { font-size: 12px; line-height: 1.5; color: #66707e; }
.menSampleReview { padding: 12px 0; border-top: 1px solid #eceef2; font-size: 13px; }
.menSampleReview p { margin: 6px 0 0; line-height: 1.5; }
.menCartError { color: #bc1020; font-size: 14px; }
@media (max-width: 380px) {
  .menOptionGrid { gap: 18px 10px; }
  .menOption h3 { font-size: 14px; }
  .menServiceModal .facialFooter button { min-width: 112px; }
}

/* MEN_POPUP_COMPACT_LAYOUT */
.menServiceModal {
  width: min(472px, calc(100vw - 32px));
}
.menOptionPrompt {
  margin-bottom: 4px;
}
.menOptionGrid {
  column-gap: 16px;
  row-gap: 20px;
  align-items: start;
}
.menOption {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  column-gap: 7px;
  row-gap: 7px;
  align-items: center;
}
.menOptionImage {
  grid-column: 1 / -1;
  grid-row: 1;
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
}
.menOption h3 {
  grid-column: 1;
  grid-row: 2;
  min-width: 0;
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.25;
  overflow-wrap: anywhere;
}
.menOptionActions {
  display: contents;
}
.menOptionActions strong {
  grid-column: 2;
  grid-row: 2;
  font-size: 13px;
  white-space: nowrap;
}
.menOptionActions .addButton {
  grid-column: 3;
  grid-row: 2;
  min-width: 61px;
  min-height: 35px;
  padding: 7px 10px;
  border-radius: 10px;
  font-size: 13px;
  line-height: 1.25;
}
.menOptionDuration {
  grid-column: 1 / -1;
  grid-row: 3;
  font-size: 12px;
}
.menOption > p {
  grid-column: 1 / -1;
  grid-row: 4;
  font-size: 12px;
}
@media (max-width: 600px) {
  .menOptionGrid {
    gap: 14px 10px;
  }
  .menOption {
    grid-template-columns: minmax(0, 1fr) auto;
  }
  .menOption h3 {
    grid-column: 1 / -1;
    grid-row: 2;
    font-size: 13px;
  }
  .menOptionActions strong {
    grid-column: 1;
    grid-row: 3;
  }
  .menOptionActions .addButton {
    grid-column: 2;
    grid-row: 3;
    min-width: 0;
    padding: 7px 8px;
  }
  .menOptionDuration {
    grid-row: 4;
  }
  .menOption > p {
    grid-row: 5;
  }
}

/* Standalone service page; no popup overlay or modal shell. */
.spa-service-page { min-height:65vh; background:#fff; color:#171717; }
.spa-service-page .spa-detail-heading { width:min(1320px,calc(100% - 32px));margin:0 auto;padding:20px 0 0; }
.spa-service-page .spa-detail-heading button { border:0;padding:0;background:transparent;color:#ef1b23;font:inherit;font-weight:700;cursor:pointer; }
.spa-service-page .spaPageContent { box-sizing:border-box; width:min(1320px,calc(100% - 32px)); margin:0 auto; padding:28px 0 72px; }
.spa-service-page .spaPagePanel { box-sizing:border-box; width:100%; min-width:0; border:0; background:#fff; }
.spa-service-page .spaPageHeader { padding:0 0 20px; border-bottom:1px solid #e6e8ef; }
.spa-service-page .spaPageHeader h2 { margin:0; font-size:28px; font-weight:700; line-height:1.3; }
.spa-service-page .spaPageBody { padding:22px 0; overflow:visible; color:#4e5968; font-size:14px; line-height:1.55; }
.spa-service-page .menServiceModal { width:100%; }
.spa-service-page .menServiceBody { overflow:visible; }
.spa-service-page .facialFooter { padding:20px 0; }
@media(min-width:981px) { .spa-service-page .spaPageContent { padding-left:192px; } }
@media(max-width:600px) { .spa-service-page .spaPageContent { width:calc(100% - 28px);padding-top:22px; } .spa-service-page .spaPageHeader h2 { font-size:24px; } .spa-service-page .spaPageBody { padding:16px 0; } }

/* Compact, unframed images placed directly on the details page. */
.spa-service-page .spaPageContent { width: min(1120px, calc(100% - 32px)); }
.spa-service-page .facialGrid,
.spa-service-page .stressGrid,
.spa-service-page .hairGrid,
.spa-service-page .waxingGrid,
.spa-service-page .menOptionGrid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 28px 22px;
  align-items: start;
}
.spa-service-page .facialOption,
.spa-service-page .stressOption,
.spa-service-page .hairOption,
.spa-service-page .waxingOption,
.spa-service-page .menOption {
  min-width: 0;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: none;
}
.spa-service-page .facialImage,
.spa-service-page .stressImage,
.spa-service-page .hairImage,
.spa-service-page .waxingImage,
.spa-service-page .menOptionImage {
  display: block;
  width: 100%;
  max-width: 260px;
  height: 185px;
  aspect-ratio: auto !important;
  margin: 0;
  border: 0;
  border-radius: 0;
  background: transparent !important;
  background-image: none !important;
  object-fit: contain;
  overflow: hidden;
}
.spa-service-page .facialImage img,
.spa-service-page .stressImage img,
.spa-service-page .hairImage img,
.spa-service-page .waxingImage img { object-fit: contain !important; }
@media (min-width: 981px) {
  .spa-service-page .spaPageContent { padding-left: 160px; }
}
@media (max-width: 760px) {
  .spa-service-page .facialGrid,
  .spa-service-page .stressGrid,
  .spa-service-page .hairGrid,
  .spa-service-page .waxingGrid,
  .spa-service-page .menOptionGrid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 22px 12px; }
  .spa-service-page .facialImage,
  .spa-service-page .stressImage,
  .spa-service-page .hairImage,
  .spa-service-page .waxingImage,
  .spa-service-page .menOptionImage { height: 145px; }
}

/* SPA_SELECTED_CONTINUE_FIX */
.spa-service-page .spaPagePanel:has(
  .facialAdd[aria-pressed="true"],
  .hairAdd[aria-pressed="true"],
  .waxingAdd[aria-pressed="true"],
  .stressDetails button[aria-pressed="true"],
  .menOptionSelected
) > .facialFooter {
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  box-sizing: border-box;
  width: min(920px, calc(100% - 32px));
  margin: 0;
  padding: 14px 20px;
  border: 1px solid #f0dfe2;
  border-radius: 14px;
  background: #ffffff;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

@media (max-width: 600px) {
  .spa-service-page .spaPagePanel:has(
    .facialAdd[aria-pressed="true"],
    .hairAdd[aria-pressed="true"],
    .waxingAdd[aria-pressed="true"],
    .stressDetails button[aria-pressed="true"],
    .menOptionSelected
  ) > .facialFooter {
    bottom: 10px;
    width: calc(100% - 20px);
    padding: 10px 12px;
    gap: 10px;
  }

  .spa-service-page .spaPagePanel:has(
    .facialAdd[aria-pressed="true"],
    .hairAdd[aria-pressed="true"],
    .waxingAdd[aria-pressed="true"],
    .stressDetails button[aria-pressed="true"],
    .menOptionSelected
  ) > .facialFooter button {
    min-width: 110px;
    padding: 11px 14px;
  }
}
`}</style>
    </main>
  );
}
