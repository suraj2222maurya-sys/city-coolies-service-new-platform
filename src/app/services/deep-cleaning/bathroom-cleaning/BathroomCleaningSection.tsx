"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ServiceCartSidebar from "@/app/services/ServiceCartSidebar";

type BathroomListing = {
  id: string;
  title: string;
  rating: number;
  reviews: number;
  startingPrice: number;
  survey: boolean;
  image: string;
};

const SERVICES: readonly BathroomListing[] = [
  { id: "intense-bathroom-cleaning", title: "Intense Bathroom Cleaning", rating: 4.1, reviews: 800, startingPrice: 574, survey: false, image: "/deep-cleaning/intense_bathroom_cleaning.webp" },
  { id: "move-in-move-out-bathroom-cleaning", title: "Move-in/Move-out Bathroom Cleaning", rating: 4.4, reviews: 800, startingPrice: 666, survey: false, image: "/deep-cleaning/move_in_move_out_bathroom_cleaning.webp" },
  { id: "commercial-bathroom-cleaning", title: "Commercial Bathroom Cleaning", rating: 4.4, reviews: 800, startingPrice: 500, survey: true, image: "/deep-cleaning/commercial_bathroom_cleaning.webp" },
];

const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;

export default function BathroomCleaningSection() {
  const router = useRouter();

  useEffect(() => {
    if (!window.matchMedia("(max-width: 760px)").matches) return;

    const key = "citycoolies:bathroom-scroll-cart";
    if (window.sessionStorage.getItem(key) !== "1") return;

    const timer = window.setTimeout(() => {
      const sidebar = document.querySelector<HTMLElement>(
        "#panel-bathroom-cleaning .cc-dc-bathroom-sidebarColumn"
      );

      if (!sidebar) return;

      const container = sidebar.closest<HTMLElement>(
        ".cc-dc-bathroom-container"
      );

      if (!container) return;

      // Give the browser enough space to align the sidebar at the top.

      window.sessionStorage.removeItem(key);

      window.requestAnimationFrame(() => {
        const top =
          sidebar.getBoundingClientRect().top +
          window.scrollY -
          80;

        window.scrollTo({
          top: Math.max(0, top),
          behavior: "smooth",
        });
      });
    }, 300);

    return () => window.clearTimeout(timer);
  }, []);
  const openDetails = (id: string) =>
    router.push(`/services/deep-cleaning?category=bathroom-cleaning&bathroomService=${encodeURIComponent(id)}`);

  const scrollToService = (id: string) => {
    const target = document.getElementById(`bathroom-${id}`);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 155;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  };

  return (
    <section id="panel-bathroom-cleaning" role="tabpanel" className="cc-dc-bathroom-section" aria-labelledby="bathroom-cleaning-heading">
      <style>{LISTING_CSS}</style>
      <h1 id="bathroom-cleaning-heading" className="cc-dc-bathroom-srOnly">Bathroom Cleaning</h1>
      <div className="cc-dc-bathroom-container">
        <div className="cc-dc-bathroom-contentLayout">
          <div className="cc-dc-bathroom-mainColumn">
            <nav className="cc-dc-bathroom-serviceSelector" aria-label="Bathroom cleaning services">
              {SERVICES.map((service) => (
                <button key={service.id} type="button" className="cc-dc-bathroom-selectorItem" onClick={() => scrollToService(service.id)}>
                  <Image className="cc-dc-bathroom-selectorImage" src={service.image} alt="" width={100} height={100} unoptimized style={{ objectFit: "cover" }} />
                  <span className="cc-dc-bathroom-selectorLabel">{service.title}</span>
                </button>
              ))}
            </nav>
            <div className="cc-dc-bathroom-selectorDivider" />
            {SERVICES.map((service) => (
              <section key={service.id} id={`bathroom-${service.id}`} className="cc-dc-bathroom-serviceGroup">
                <h2>{service.title}</h2>
                <div className="cc-dc-bathroom-serviceList">
                  <article className="cc-dc-bathroom-serviceCard">
                    <Image className="cc-dc-bathroom-bannerPlaceholder" data-service-id={service.id} src={service.image} alt={service.title} width={1940} height={811} unoptimized style={{ objectFit: "contain" }} />
                    <div className="cc-dc-bathroom-serviceDetails">
                      <div className="cc-dc-bathroom-serviceMainRow">
                        <div className="cc-dc-bathroom-serviceInformation">
                          <h3 className="cc-dc-bathroom-serviceTitle">{service.title}</h3>
                          <div className="cc-dc-bathroom-ratingRow">
                            <span className="cc-dc-bathroom-ratingIcon" aria-hidden="true">★</span>
                            <span>{service.rating.toFixed(1)}</span>
                            <span className="cc-dc-bathroom-reviewText">({service.reviews.toLocaleString("en-IN")} reviews)</span>
                            <button type="button" className="cc-dc-bathroom-detailsButton" onClick={() => openDetails(service.id)}>View details</button>
                          </div>
                          <div className="cc-dc-bathroom-priceRow"><strong>{service.survey ? `Site survey ${formatPrice(service.startingPrice)}` : `Starts at ${formatPrice(service.startingPrice)}`}</strong></div>
                        </div>
                        <button type="button" className="cc-dc-bathroom-addButton" onClick={() => openDetails(service.id)}>Add</button>
                      </div>
                    </div>
                  </article>
                </div>
              </section>
            ))}
          </div>
          <aside className="cc-dc-bathroom-sidebarColumn"><ServiceCartSidebar /></aside>
        </div>
      </div>
    </section>
  );
}

const LISTING_CSS = `
.cc-dc-bathroom-section .cc-dc-bathroom-selectorImage { background-image: none; }
.cc-dc-bathroom-section {
  box-sizing: border-box;
  width: 100%;
  background: #ffffff;
  color: #171717;
}
.cc-dc-bathroom-srOnly {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
.cc-dc-bathroom-container {
  box-sizing: border-box;
  width: min(1100px, calc(100% - 32px));
  margin: 0 auto;
  padding: 0 0 64px;
}
.cc-dc-bathroom-serviceSelector {
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 24px;
  margin: 0;
  padding: 0;
}
.cc-dc-bathroom-selectorItem {
  display: flex;
  width: 88px;
  min-width: 88px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #171717;
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  font: inherit;
}
.cc-dc-bathroom-selectorImage {
  display: block;
  width: 72px;
  height: 72px;
  flex: 0 0 72px;
  border: 0;
  border-radius: 0;
  background: #fff1f3;
}
.cc-dc-bathroom-selectorLabel {
  width: 88px;
  color: #111111;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.15;
  text-align: center;
}
.cc-dc-bathroom-selectorItem:hover .cc-dc-bathroom-selectorLabel,
.cc-dc-bathroom-selectorItem:focus-visible .cc-dc-bathroom-selectorLabel {
  color: #ef1b23;
}
.cc-dc-bathroom-selectorItem:focus-visible {
  outline: 2px solid #ef1b23;
  outline-offset: 5px;
}
.cc-dc-bathroom-selectorDivider {
  width: 100%;
  height: 1px;
  margin: 26px 0 28px;
  background: transparent;
}
.cc-dc-bathroom-contentLayout {
  display: grid;
  width: 100%;
  grid-template-columns:
    minmax(0, 696px)
    minmax(300px, 372px);
  gap: 32px;
  align-items: start;
}
.cc-dc-bathroom-mainColumn {
  min-width: 0;
}
.cc-dc-bathroom-sidebarColumn {
  position: sticky;
  top: 170px;
  min-width: 0;
}
.cc-dc-bathroom-serviceGroup {
  width: 100%;
  scroll-margin-top: 155px;
  padding: 0 0 34px;
}
.cc-dc-bathroom-serviceGroup + .cc-dc-bathroom-serviceGroup {
  padding-top: 34px;
  border-top: 1px solid #f0dfe2;
}
.cc-dc-bathroom-serviceGroup > h2 {
  margin: 0 0 30px;
  color: #111111;
  font-size: 38px;
  font-weight: 700;
  line-height: 1.16;
  letter-spacing: -0.035em;
}
.cc-dc-bathroom-serviceList {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 28px;
}
.cc-dc-bathroom-serviceCard {
  width: 100%;
  margin: 0;
  padding: 0 0 18px;
  border: 0;
  border-bottom: 1px solid rgba(40, 40, 40, 0.11);
  border-radius: 0;
  background: transparent;
}
.cc-dc-bathroom-bannerPlaceholder {
  box-sizing: border-box;
  width: 100%;
  aspect-ratio: 2.36 / 1;
  overflow: hidden;
  border: 1px solid #f3ccd2;
  border-radius: 12px;
  background: #fff1f3;
}
.cc-dc-bathroom-serviceDetails {
  width: 100%;
  padding: 17px 0 0;
}
.cc-dc-bathroom-serviceMainRow {
  display: flex;
  width: 100%;
  gap: 18px;
  align-items: flex-start;
  justify-content: space-between;
}
.cc-dc-bathroom-serviceInformation {
  min-width: 0;
  flex: 1 1 auto;
}
.cc-dc-bathroom-serviceTitle {
  margin: 0;
  color: #171717;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.34;
}
.cc-dc-bathroom-ratingRow {
  display: flex;
  margin-top: 8px;
  flex-wrap: nowrap;
  align-items: center;
  gap: 5px;
  color: #555555;
  font-size: 13px;
  line-height: 1.3;
  white-space: nowrap;
}
.cc-dc-bathroom-ratingIcon {
  display: inline-flex;
  width: 20px;
  height: 20px;
  min-width: 20px;
  flex: 0 0 20px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #ef1b23;
  color: #ffffff;
  font-size: 10px;
  line-height: 1;
}
.cc-dc-bathroom-reviewText {
  flex: 0 0 auto;
  white-space: nowrap;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
}
.cc-dc-bathroom-detailsButton {
  flex: 0 0 auto;
  margin: 0 0 0 4px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #ef1b23;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.3;
  white-space: nowrap;
}
.cc-dc-bathroom-priceRow {
  display: flex;
  margin-top: 9px;
  align-items: center;
  gap: 7px;
  color: #171717;
  font-size: 13px;
  line-height: 1.3;
}
.cc-dc-bathroom-priceRow strong {
  font-weight: 700;
}
.cc-dc-bathroom-addButton {
  display: inline-flex;
  min-width: 102px;
  min-height: 50px;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  padding: 0 18px;
  border: 1.5px solid #ef1b23;
  border-radius: 12px;
  background: #ffffff;
  color: #ef1b23;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  line-height: 1;
}
.cc-dc-bathroom-addButton:hover,
.cc-dc-bathroom-addButton:focus-visible {
  background: #fff4f5;
}
@media  (max-width: 1050px)  {
.cc-dc-bathroom-container {
    width: min(920px, calc(100% - 32px));
  }
.cc-dc-bathroom-contentLayout {
    grid-template-columns:
      minmax(0, 1fr)
      300px;
    gap: 24px;
  }
.cc-dc-bathroom-serviceSelector {
    gap: 16px;
  }
}
@media  (max-width: 760px)  {
.cc-dc-bathroom-container {
    width: 100%;
    padding: 14px 12px 42px;
  }
.cc-dc-bathroom-serviceSelector {
    width: 100%;
    gap: 11px;
    padding: 2px 0 8px;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x proximity;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
  }
.cc-dc-bathroom-serviceSelector::-webkit-scrollbar {
    display: none;
  }
.cc-dc-bathroom-selectorItem {
    width: 76px;
    min-width: 76px;
    flex: 0 0 76px;
    scroll-snap-align: start;
  }
.cc-dc-bathroom-selectorImage {
    width: 62px;
    height: 62px;
    flex-basis: 62px;
  }
.cc-dc-bathroom-selectorLabel {
    width: 76px;
    font-size: 10.5px;
    line-height: 1.14;
  }
.cc-dc-bathroom-selectorDivider {
    margin: 10px 0 20px;
  }
.cc-dc-bathroom-contentLayout {
    display: block;
  }
.cc-dc-bathroom-sidebarColumn {
    position: static;
    width: 100%;
    margin-top: 20px;
  }
.cc-dc-bathroom-serviceGroup {
    padding-bottom: 26px;
    scroll-margin-top: 150px;
  }
.cc-dc-bathroom-serviceGroup + .cc-dc-bathroom-serviceGroup {
    padding-top: 27px;
  }
.cc-dc-bathroom-serviceGroup > h2 {
    margin-bottom: 17px;
    font-size: 29px;
  }
.cc-dc-bathroom-serviceList {
    gap: 24px;
  }
.cc-dc-bathroom-serviceCard {
    padding-bottom: 15px;
  }
.cc-dc-bathroom-bannerPlaceholder {
    width: 100%;
    aspect-ratio: 16 / 8.2;
    border-radius: 11px;
  }
.cc-dc-bathroom-serviceDetails {
    padding-top: 13px;
  }
.cc-dc-bathroom-serviceMainRow {
    gap: 8px;
  }
.cc-dc-bathroom-serviceTitle {
    font-size: 16px;
  }
.cc-dc-bathroom-ratingRow {
    gap: 4px;
    margin-top: 7px;
    font-size: 11.5px;
  }
.cc-dc-bathroom-ratingIcon {
    width: 18px;
    height: 18px;
    min-width: 18px;
    flex-basis: 18px;
    font-size: 9px;
  }
.cc-dc-bathroom-reviewText,
  .cc-dc-bathroom-detailsButton {
    white-space: nowrap;
  }
.cc-dc-bathroom-detailsButton {
    margin-left: 2px;
    font-size: 11.5px;
  }
.cc-dc-bathroom-priceRow {
    margin-top: 8px;
    font-size: 12px;
  }
.cc-dc-bathroom-addButton {
    min-width: 74px;
    min-height: 44px;
    padding: 0 10px;
    border-radius: 10px;
    font-size: 14px;
  }
}
@media  (max-width: 360px)  {
.cc-dc-bathroom-serviceTitle {
    font-size: 15px;
  }
.cc-dc-bathroom-ratingRow {
    gap: 3px;
    font-size: 10.5px;
  }
.cc-dc-bathroom-detailsButton {
    font-size: 10.5px;
  }
.cc-dc-bathroom-addButton {
    min-width: 66px;
    padding: 0 7px;
  }
}
@media  (min-width: 981px)  {
.cc-dc-bathroom-container {
    box-sizing: border-box !important;

    width: 928px !important;
    max-width: calc(100% - 32px) !important;

    margin-left: auto !important;
    margin-right: auto !important;
  }
.cc-dc-bathroom-contentLayout {
    display: grid !important;

    width: 100% !important;

    grid-template-columns:
      minmax(0, 590px)
      minmax(270px, 310px) !important;

    column-gap: 28px !important;
    row-gap: 0 !important;

    align-items: start !important;
  }
.cc-dc-bathroom-mainColumn {
    box-sizing: border-box !important;

    width: 590px !important;
    max-width: 590px !important;
    min-width: 0 !important;
  }
.cc-dc-bathroom-sidebarColumn {
    box-sizing: border-box !important;

    width: 310px !important;
    max-width: 310px !important;
    min-width: 270px !important;
  }
}
.cc-dc-bathroom-bannerPlaceholder {
  box-sizing: border-box !important;

  width: 100% !important;

  height: 250px !important;
  min-height: 250px !important;
  max-height: 250px !important;

  aspect-ratio: auto !important;

  overflow: hidden !important;

  border: 1px solid #f3ccd2 !important;
  border-radius: 12px !important;

  background: #fff7f8 !important;
}
.cc-dc-bathroom-addButton {
  box-sizing: border-box !important;

  width: auto !important;
  min-width: 86px !important;

  height: 42px !important;
  min-height: 42px !important;

  padding: 8px 20px !important;

  border: 1px solid #ef1b23 !important;
  border-radius: 9px !important;

  background: #ffffff !important;
  color: #ef1b23 !important;

  font-size: 15px !important;
  font-weight: 650 !important;
  line-height: 1 !important;
}
@media  (max-width: 760px)  {
.cc-dc-bathroom-bannerPlaceholder {
    width: 100% !important;

    height: 190px !important;
    min-height: 190px !important;
    max-height: 190px !important;

    aspect-ratio: auto !important;
  }
.cc-dc-bathroom-addButton {
    width: auto !important;
    min-width: 72px !important;

    height: 39px !important;
    min-height: 39px !important;

    padding: 7px 15px !important;

    border-radius: 9px !important;

    font-size: 14px !important;
  }
}
@media  (min-width: 1021px)  {
.cc-dc-bathroom-mainColumn {
    box-sizing: border-box !important;

    border-left: 0 !important;

    border-right:
      1px solid #f4d9de !important;

    padding-bottom:
      80px !important;
  }
}
.cc-dc-bathroom-addButton:hover {
  background:
    #ef1b23 !important;

  color:
    #ffffff !important;
}
.cc-dc-bathroom-addButton:focus-visible {
  background:
    #ef1b23 !important;

  color:
    #ffffff !important;

  outline:
    2px solid rgba(239, 27, 35, 0.35);

  outline-offset:
    2px;
}
@media  (max-width: 1020px)  {
.cc-dc-bathroom-mainColumn {
    border-right:
      0 !important;

    padding-bottom:
      0 !important;
  }
}
.cc-dc-bathroom-serviceList {
  gap: 18px !important;
}
.cc-dc-bathroom-serviceGroup {
  padding-bottom: 12px !important;
}
.cc-dc-bathroom-serviceGroup + .cc-dc-bathroom-serviceGroup {
  padding-top: 16px !important;
}
@media  (max-width: 760px)  {
.cc-dc-bathroom-serviceList {
    gap: 16px !important;
  }
.cc-dc-bathroom-serviceGroup {
    padding-bottom: 10px !important;
  }
.cc-dc-bathroom-serviceGroup + .cc-dc-bathroom-serviceGroup {
    padding-top: 14px !important;
  }
}
.cc-dc-bathroom-serviceGroup > h2 {
  margin-bottom: 28px !important;

  font-size: 32px !important;
  font-weight: 700 !important;
  line-height: 1.18 !important;

  letter-spacing: -0.025em !important;
}
@media  (max-width: 760px)  {
.cc-dc-bathroom-serviceGroup > h2 {
    margin-bottom: 22px !important;

    font-size: 24px !important;
    line-height: 1.18 !important;
  }
}
.cc-dc-bathroom-selectorImage {
  background-color: transparent !important;
  background-repeat: no-repeat !important;
  background-position: center center !important;
  background-size: contain !important;

  border: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;

  padding: 0 !important;
  transform: none !important;
  filter: none !important;
}
.cc-dc-bathroom-selectorItem:nth-child(1) .cc-dc-bathroom-selectorImage {
  
}
.cc-dc-bathroom-selectorItem:nth-child(2) .cc-dc-bathroom-selectorImage {
  
}
.cc-dc-bathroom-selectorItem:nth-child(3) .cc-dc-bathroom-selectorImage {
  
}
.cc-dc-bathroom-selectorItem:nth-child(4) .cc-dc-bathroom-selectorImage {
  
}
.cc-dc-bathroom-selectorItem:nth-child(5) .cc-dc-bathroom-selectorImage {
  
}
@media  (max-width: 1020px)  {
.cc-dc-bathroom-selectorImage {
    background-size: contain !important;
    background-position: center center !important;
  }
}
@media  (max-width: 620px)  {
.cc-dc-bathroom-selectorImage {
    background-size: contain !important;
    background-position: center center !important;
  }
}
@media  (min-width: 1021px)  {
.cc-dc-bathroom-mainColumn {
    padding-right: 0 !important;
  }
}
.cc-dc-bathroom-bannerPlaceholder {
  
  background-color: #fff8f9;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
.cc-dc-bathroom-section .cc-dc-bathroom-selectorItem .cc-dc-bathroom-selectorImage {
  
}
.cc-dc-bathroom-bannerPlaceholder[data-service-id] {
  display: block !important;
  box-sizing: border-box !important;
  width: 100% !important;
  max-width: 100% !important;
  height: auto !important;
  min-height: 0 !important;
  max-height: none !important;
  aspect-ratio: 1926 / 816 !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow: hidden !important;
  border: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  background-color: transparent !important;
  background-repeat: no-repeat !important;
  background-position: center center !important;
  background-size: contain !important;
}
.cc-dc-bathroom-section .cc-dc-bathroom-serviceSelector .cc-dc-bathroom-selectorItem .cc-dc-bathroom-selectorImage {
  display: block !important;
  background-color: transparent !important;
  background-repeat: no-repeat !important;
  background-position: center center !important;
  background-size: contain !important;
}
.cc-dc-bathroom-section .cc-dc-bathroom-serviceSelector .cc-dc-bathroom-selectorItem:nth-child(1) .cc-dc-bathroom-selectorImage {
  
}
.cc-dc-bathroom-section .cc-dc-bathroom-serviceSelector .cc-dc-bathroom-selectorItem:nth-child(2) .cc-dc-bathroom-selectorImage {
  
}
.cc-dc-bathroom-section .cc-dc-bathroom-serviceSelector .cc-dc-bathroom-selectorItem:nth-child(3) .cc-dc-bathroom-selectorImage {
  
}
.cc-dc-bathroom-section .cc-dc-bathroom-serviceSelector .cc-dc-bathroom-selectorItem:nth-child(4) .cc-dc-bathroom-selectorImage {
  
}
.cc-dc-bathroom-section .cc-dc-bathroom-serviceSelector .cc-dc-bathroom-selectorItem .cc-dc-bathroom-selectorImage {
  background-size: contain !important;
  background-position: center center !important;
  overflow: hidden !important;
}
.cc-dc-bathroom-section .cc-dc-bathroom-serviceSelector .cc-dc-bathroom-selectorItem:nth-child(5) .cc-dc-bathroom-selectorImage {
  
  background-repeat: no-repeat !important;
  background-position: center center !important;
  background-size: contain !important;
}
.cc-dc-bathroom-section .cc-dc-bathroom-bannerPlaceholder[data-service-id] {
  
  background-color: #fff4f5 !important;
  background-size: contain !important;
  aspect-ratio: 1926 / 816 !important;
}
.cc-dc-bathroom-section .cc-dc-bathroom-serviceSelector .cc-dc-bathroom-selectorItem:nth-child(n) .cc-dc-bathroom-selectorImage {
  
  background-color: #fff4f5 !important;
  background-size: contain !important;
}
.cc-dc-bathroom-section .cc-dc-bathroom-serviceSelector .cc-dc-bathroom-selectorItem .cc-dc-bathroom-selectorImage {
  width: 100px !important;
  height: 100px !important;
  flex: 0 0 100px !important;
  border: 0 !important;
  border-radius: 0 !important;
  background-color: transparent !important;
  background-repeat: no-repeat !important;
  background-position: center center !important;
  background-size: contain !important;
}
.cc-dc-bathroom-section .cc-dc-bathroom-serviceSelector .cc-dc-bathroom-selectorItem {
  width: 120px !important;
  min-width: 120px !important;
}
.cc-dc-bathroom-section .cc-dc-bathroom-serviceSelector .cc-dc-bathroom-selectorItem .cc-dc-bathroom-selectorLabel {
  width: 120px !important;
}
.cc-dc-bathroom-section .cc-dc-bathroom-serviceSelector .cc-dc-bathroom-selectorItem:nth-child(1) .cc-dc-bathroom-selectorImage {
  
}
.cc-dc-bathroom-section .cc-dc-bathroom-serviceSelector .cc-dc-bathroom-selectorItem:nth-child(2) .cc-dc-bathroom-selectorImage {
  
}
.cc-dc-bathroom-section .cc-dc-bathroom-serviceSelector .cc-dc-bathroom-selectorItem:nth-child(3) .cc-dc-bathroom-selectorImage {
  
}
.cc-dc-bathroom-section .cc-dc-bathroom-bannerPlaceholder[data-service-id] {
  box-sizing: border-box !important;
  display: block !important;
  width: 100% !important;
  height: auto !important;
  min-height: 0 !important;
  max-height: none !important;
  aspect-ratio: 1940 / 811 !important;
  border: 0 !important;
  border-radius: 0 !important;
  background-color: transparent !important;
  background-repeat: no-repeat !important;
  background-position: center center !important;
  background-size: contain !important;
}
.cc-dc-bathroom-section .cc-dc-bathroom-bannerPlaceholder[data-service-id="intense-bathroom-cleaning"] {
  
}
.cc-dc-bathroom-section .cc-dc-bathroom-bannerPlaceholder[data-service-id="move-in-move-out-bathroom-cleaning"] {
  
}
.cc-dc-bathroom-section .cc-dc-bathroom-bannerPlaceholder[data-service-id="commercial-bathroom-cleaning"] {
  
}
.cc-dc-bathroom-section .cc-dc-bathroom-serviceSelector .cc-dc-bathroom-selectorItem:nth-child(n) .cc-dc-bathroom-selectorImage {
  display: block !important;
  width: 100px !important;
  height: 100px !important;
  min-width: 100px !important;
  min-height: 100px !important;
  flex: 0 0 100px !important;
  border: 0 !important;
  border-radius: 0 !important;
  background-color: transparent !important;
  background-repeat: no-repeat !important;
  background-position: center center !important;
  background-size: contain !important;
}
.cc-dc-bathroom-section .cc-dc-bathroom-serviceSelector .cc-dc-bathroom-selectorItem:nth-child(1) .cc-dc-bathroom-selectorImage {
  
}
.cc-dc-bathroom-section .cc-dc-bathroom-serviceSelector .cc-dc-bathroom-selectorItem:nth-child(2) .cc-dc-bathroom-selectorImage {
  
}
.cc-dc-bathroom-section .cc-dc-bathroom-serviceSelector .cc-dc-bathroom-selectorItem:nth-child(3) .cc-dc-bathroom-selectorImage {
  
}
.cc-dc-bathroom-mainColumn {
  border-right-color: transparent !important;
  border-left-color: transparent !important;
}
.cc-dc-bathroom-serviceCard {
  border-bottom-color: transparent !important;
}
.cc-dc-bathroom-serviceGroup + .cc-dc-bathroom-serviceGroup {
  border-top-color: transparent !important;
}
.cc-dc-bathroom-section .cc-dc-bathroom-selectorImage { background-size: contain !important; }
`;
