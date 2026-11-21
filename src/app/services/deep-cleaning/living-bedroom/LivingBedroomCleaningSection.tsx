"use client";
import LivingBedroomServiceDetails from "./LivingBedroomServiceDetails";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";



import ServiceCartSidebar from "@/app/services/ServiceCartSidebar";


const DEEP_CLEANING_INLINE_CSS = ".cc-dc-living-section {\n  box-sizing: border-box;\n  width: 100%;\n  background: #ffffff;\n  color: #171717;\n}\n\n.cc-dc-living-srOnly {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border: 0;\n}\n\n/*\n * Match the visual content width used by Full Home:\n * approximately 695px service column + right sidebar.\n */\n.cc-dc-living-container {\n  box-sizing: border-box;\n  width: min(1100px, calc(100% - 32px));\n  margin: 0 auto;\n  padding: 0 0 64px;\n}\n\n/* ======================================================\n   TOP SERVICE SELECTOR\n   No Furnished / Unfurnished controls in this category.\n   ====================================================== */\n\n.cc-dc-living-serviceSelector {\n  display: flex;\n  width: 100%;\n  align-items: flex-start;\n  justify-content: flex-start;\n  gap: 24px;\n  margin: 0;\n  padding: 0;\n}\n\n.cc-dc-living-selectorItem {\n  display: flex;\n  width: 88px;\n  min-width: 88px;\n  padding: 0;\n  border: 0;\n  background: transparent;\n  color: #171717;\n  cursor: pointer;\n  flex-direction: column;\n  align-items: center;\n  gap: 7px;\n  font: inherit;\n}\n\n.cc-dc-living-selectorImage {\n  display: block;\n  width: 72px;\n  height: 72px;\n  flex: 0 0 72px;\n  border: 0;\n  border-radius: 0;\n  background: #fff1f3;\n}\n\n.cc-dc-living-selectorLabel {\n  width: 88px;\n  color: #111111;\n  font-size: 13px;\n  font-weight: 500;\n  line-height: 1.15;\n  text-align: center;\n}\n\n.cc-dc-living-selectorItem:hover .cc-dc-living-selectorLabel,\n.cc-dc-living-selectorItem:focus-visible .cc-dc-living-selectorLabel {\n  color: #ef1b23;\n}\n\n.cc-dc-living-selectorItem:focus-visible {\n  outline: 2px solid #ef1b23;\n  outline-offset: 5px;\n}\n\n.cc-dc-living-selectorDivider {\n  width: 100%;\n  height: 1px;\n  margin: 26px 0 28px;\n  background: transparent;\n}\n\n/* ======================================================\n   MAIN + RIGHT SIDEBAR\n   ====================================================== */\n\n.cc-dc-living-contentLayout {\n  display: grid;\n  width: 100%;\n  grid-template-columns:\n    minmax(0, 696px)\n    minmax(300px, 372px);\n  gap: 32px;\n  align-items: start;\n}\n\n.cc-dc-living-mainColumn {\n  min-width: 0;\n}\n\n.cc-dc-living-sidebarColumn {\n  position: sticky;\n  top: 170px;\n  min-width: 0;\n}\n\n.cc-dc-living-serviceGroup {\n  width: 100%;\n  scroll-margin-top: 155px;\n  padding: 0 0 34px;\n}\n\n.cc-dc-living-serviceGroup + .cc-dc-living-serviceGroup {\n  padding-top: 34px;\n  border-top: 1px solid #f0dfe2;\n}\n\n.cc-dc-living-serviceGroup \u003e h2 {\n  margin: 0 0 30px;\n  color: #111111;\n  font-size: 38px;\n  font-weight: 700;\n  line-height: 1.16;\n  letter-spacing: -0.035em;\n}\n\n.cc-dc-living-serviceList {\n  display: flex;\n  width: 100%;\n  flex-direction: column;\n  gap: 28px;\n}\n\n/* ======================================================\n   SERVICE BLOCK - SAME VISUAL STRUCTURE AS FULL HOME\n   ====================================================== */\n\n.cc-dc-living-serviceCard {\n  width: 100%;\n  margin: 0;\n  padding: 0 0 18px;\n  border: 0;\n  border-bottom: 1px solid rgba(40, 40, 40, 0.11);\n  border-radius: 0;\n  background: transparent;\n}\n\n/*\n * Actual service images will be added later.\n * This keeps the same banner footprint as Full Home.\n */\n.cc-dc-living-bannerPlaceholder {\n  box-sizing: border-box;\n  width: 100%;\n  aspect-ratio: 2.36 / 1;\n  overflow: hidden;\n  border: 1px solid #f3ccd2;\n  border-radius: 12px;\n  background: #fff1f3;\n}\n\n.cc-dc-living-serviceDetails {\n  width: 100%;\n  padding: 17px 0 0;\n}\n\n.cc-dc-living-serviceMainRow {\n  display: flex;\n  width: 100%;\n  gap: 18px;\n  align-items: flex-start;\n  justify-content: space-between;\n}\n\n.cc-dc-living-serviceInformation {\n  min-width: 0;\n  flex: 1 1 auto;\n}\n\n.cc-dc-living-serviceTitle {\n  margin: 0;\n  color: #171717;\n  font-size: 18px;\n  font-weight: 700;\n  line-height: 1.34;\n}\n\n.cc-dc-living-ratingRow {\n  display: flex;\n  margin-top: 8px;\n  flex-wrap: nowrap;\n  align-items: center;\n  gap: 5px;\n  color: #555555;\n  font-size: 13px;\n  line-height: 1.3;\n  white-space: nowrap;\n}\n\n.cc-dc-living-ratingIcon {\n  display: inline-flex;\n  width: 20px;\n  height: 20px;\n  min-width: 20px;\n  flex: 0 0 20px;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n  background: #ef1b23;\n  color: #ffffff;\n  font-size: 10px;\n  line-height: 1;\n}\n\n.cc-dc-living-reviewText {\n  flex: 0 0 auto;\n  white-space: nowrap;\n  text-decoration: underline;\n  text-decoration-thickness: 1px;\n  text-underline-offset: 2px;\n}\n\n.cc-dc-living-detailsButton {\n  flex: 0 0 auto;\n  margin: 0 0 0 4px;\n  padding: 0;\n  border: 0;\n  background: transparent;\n  color: #ef1b23;\n  cursor: pointer;\n  font-size: 13px;\n  font-weight: 700;\n  line-height: 1.3;\n  white-space: nowrap;\n}\n\n.cc-dc-living-priceRow {\n  display: flex;\n  margin-top: 9px;\n  align-items: center;\n  gap: 7px;\n  color: #171717;\n  font-size: 13px;\n  line-height: 1.3;\n}\n\n.cc-dc-living-priceRow strong {\n  font-weight: 700;\n}\n\n.cc-dc-living-addButton {\n  display: inline-flex;\n  min-width: 102px;\n  min-height: 50px;\n  flex: 0 0 auto;\n  align-items: center;\n  justify-content: center;\n  padding: 0 18px;\n  border: 1.5px solid #ef1b23;\n  border-radius: 12px;\n  background: #ffffff;\n  color: #ef1b23;\n  cursor: pointer;\n  font-size: 16px;\n  font-weight: 700;\n  line-height: 1;\n}\n\n.cc-dc-living-addButton:hover,\n.cc-dc-living-addButton:focus-visible {\n  background: #fff4f5;\n}\n\n/* ======================================================\n   POPUP\n   Sized to match the Full Home / Villa modal footprint.\n   ====================================================== */\n\n.cc-dc-living-modalOverlay {\n  position: fixed;\n  inset: 0;\n  z-index: 1200;\n  display: flex;\n  box-sizing: border-box;\n  padding: 16px;\n  align-items: center;\n  justify-content: center;\n  background: rgba(14, 14, 14, 0.72);\n}\n\n.cc-dc-living-modal {\n  display: flex;\n  width: min(558px, calc(100vw - 32px));\n  height: min(640px, calc(100dvh - 32px));\n  min-height: 0;\n  overflow: hidden;\n  border: 1px solid #f1d7db;\n  border-radius: 20px;\n  background: #ffffff;\n  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.22);\n  flex-direction: column;\n}\n\n.cc-dc-living-modalHeader {\n  display: flex;\n  box-sizing: border-box;\n  min-height: 150px;\n  flex: 0 0 auto;\n  gap: 18px;\n  padding: 34px 32px 27px;\n  align-items: flex-start;\n  justify-content: space-between;\n  border-bottom: 1px solid #eeeeee;\n  background: #ffffff;\n}\n\n.cc-dc-living-modalHeader h2 {\n  margin: 0;\n  color: #161616;\n  font-size: 28px;\n  font-weight: 750;\n  line-height: 1.16;\n  letter-spacing: -0.025em;\n}\n\n.cc-dc-living-modalHeader p {\n  max-width: 410px;\n  margin: 10px 0 0;\n  color: #626262;\n  font-size: 14px;\n  line-height: 1.5;\n}\n\n.cc-dc-living-closeButton {\n  display: inline-flex;\n  width: 48px;\n  height: 48px;\n  min-width: 48px;\n  flex: 0 0 48px;\n  align-items: center;\n  justify-content: center;\n  margin: -18px -18px 0 0;\n  border: 1px solid #eeeeee;\n  border-radius: 50%;\n  background: #ffffff;\n  color: #171717;\n  cursor: pointer;\n  font-size: 29px;\n  font-weight: 400;\n  line-height: 1;\n  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.05);\n}\n\n.cc-dc-living-modalBody {\n  min-height: 0;\n  flex: 1 1 auto;\n  overflow-x: hidden;\n  overflow-y: auto;\n  padding: 28px 32px 34px;\n  overscroll-behavior: contain;\n  scrollbar-width: none;\n  -ms-overflow-style: none;\n  -webkit-overflow-scrolling: touch;\n}\n\n.cc-dc-living-modalBody::-webkit-scrollbar {\n  display: none;\n  width: 0;\n  height: 0;\n}\n\n/* ======================================================\n   POPUP PRICING\n   ====================================================== */\n\n.cc-dc-living-modalSection {\n  width: 100%;\n}\n\n.cc-dc-living-modalSection + .cc-dc-living-modalSection,\n.cc-dc-living-ratingSection {\n  margin-top: 30px;\n  padding-top: 28px;\n  border-top: 1px solid #e9eaec;\n}\n\n.cc-dc-living-modalSection h3 {\n  margin: 0 0 19px;\n  color: #5c6678;\n  font-size: 18px;\n  font-weight: 700;\n  line-height: 1.3;\n}\n\n.cc-dc-living-pricingGrid {\n  display: grid;\n  width: 100%;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 10px;\n}\n\n.cc-dc-living-priceCard {\n  display: flex;\n  box-sizing: border-box;\n  min-height: 168px;\n  padding: 16px 13px;\n  border: 1px solid #dfe2e7;\n  border-radius: 10px;\n  background: #ffffff;\n  flex-direction: column;\n  align-items: flex-start;\n}\n\n.cc-dc-living-optionLabel {\n  color: #303746;\n  font-size: 15px;\n  font-weight: 400;\n  line-height: 1.42;\n}\n\n.cc-dc-living-priceCard strong {\n  margin-top: 20px;\n  color: #525d6f;\n  font-size: 16px;\n  font-weight: 700;\n  line-height: 1.25;\n}\n\n.cc-dc-living-priceCard button {\n  display: inline-flex;\n  min-width: 85px;\n  min-height: 42px;\n  margin-top: auto;\n  padding: 0 18px;\n  align-items: center;\n  justify-content: center;\n  border: 1.5px solid #ef1b23;\n  border-radius: 9px;\n  background: #ffffff;\n  color: #ef1b23;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 700;\n}\n\n.cc-dc-living-priceCard button:hover,\n.cc-dc-living-priceCard button:focus-visible {\n  background: #ef1b23;\n  color: #ffffff;\n}\n\n/* ======================================================\n   PROCESS / INCLUDED\n   ====================================================== */\n\n.cc-dc-living-processList {\n  display: flex;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  flex-direction: column;\n  gap: 18px;\n}\n\n.cc-dc-living-processList li {\n  display: grid;\n  grid-template-columns: 29px minmax(0, 1fr);\n  gap: 3px;\n}\n\n.cc-dc-living-processNumber {\n  color: #7b8495;\n  font-size: 15px;\n  line-height: 1.45;\n}\n\n.cc-dc-living-processList strong {\n  color: #606a7c;\n  font-size: 16px;\n  font-weight: 500;\n  line-height: 1.4;\n}\n\n.cc-dc-living-processList p {\n  margin: 4px 0 0;\n  color: #7b8598;\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 1.55;\n}\n\n.cc-dc-living-simpleList {\n  display: flex;\n  margin: 0;\n  padding: 0 0 0 21px;\n  color: #697387;\n  flex-direction: column;\n  gap: 14px;\n}\n\n.cc-dc-living-simpleList li {\n  padding-left: 5px;\n  font-size: 15px;\n  line-height: 1.45;\n}\n\n/* ======================================================\n   RATING\n   ====================================================== */\n\n.cc-dc-living-ratingSection {\n  padding-bottom: 8px;\n}\n\n.cc-dc-living-ratingSummary {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n\n.cc-dc-living-goldStar {\n  color: #f6b900;\n  font-size: 28px;\n  line-height: 1;\n}\n\n.cc-dc-living-ratingSummary strong {\n  color: #586171;\n  font-size: 34px;\n  font-weight: 700;\n  line-height: 1;\n}\n\n.cc-dc-living-ratingReviewCount {\n  margin: 10px 0 24px;\n  color: #7e8797;\n  font-size: 14px;\n  line-height: 1.4;\n}\n\n.cc-dc-living-ratingBars {\n  display: flex;\n  width: 100%;\n  flex-direction: column;\n  gap: 15px;\n}\n\n.cc-dc-living-ratingBarRow {\n  display: grid;\n  width: 100%;\n  grid-template-columns: 34px minmax(0, 1fr) 43px;\n  gap: 10px;\n  align-items: center;\n}\n\n.cc-dc-living-ratingLabel {\n  display: inline-flex;\n  align-items: center;\n  gap: 2px;\n  color: #596273;\n  font-size: 14px;\n  line-height: 1;\n}\n\n.cc-dc-living-ratingLabel span {\n  color: #f6b900;\n}\n\n.cc-dc-living-ratingTrack {\n  display: block;\n  width: 100%;\n  height: 6px;\n  overflow: hidden;\n  border-radius: 999px;\n  background: #d4d4d4;\n}\n\n.cc-dc-living-ratingFill {\n  display: block;\n  height: 100%;\n  border-radius: inherit;\n  background: #ef1b23;\n}\n\n.cc-dc-living-ratingPercent {\n  color: #7c8595;\n  font-size: 13px;\n  text-align: right;\n}\n\n/* ======================================================\n   TABLET\n   ====================================================== */\n\n@media (max-width: 1050px) {\n  .cc-dc-living-container {\n    width: min(920px, calc(100% - 32px));\n  }\n\n  .cc-dc-living-contentLayout {\n    grid-template-columns:\n      minmax(0, 1fr)\n      300px;\n    gap: 24px;\n  }\n\n  .cc-dc-living-serviceSelector {\n    gap: 16px;\n  }\n}\n\n/* ======================================================\n   PHONE\n   ====================================================== */\n\n@media (max-width: 760px) {\n  .cc-dc-living-container {\n    width: 100%;\n    padding: 14px 12px 42px;\n  }\n\n  .cc-dc-living-serviceSelector {\n    width: 100%;\n    gap: 11px;\n    padding: 2px 0 8px;\n    overflow-x: auto;\n    overflow-y: hidden;\n    scroll-snap-type: x proximity;\n    scrollbar-width: none;\n    -webkit-overflow-scrolling: touch;\n  }\n\n  .cc-dc-living-serviceSelector::-webkit-scrollbar {\n    display: none;\n  }\n\n  .cc-dc-living-selectorItem {\n    width: 76px;\n    min-width: 76px;\n    flex: 0 0 76px;\n    scroll-snap-align: start;\n  }\n\n  .cc-dc-living-selectorImage {\n    width: 62px;\n    height: 62px;\n    flex-basis: 62px;\n  }\n\n  .cc-dc-living-selectorLabel {\n    width: 76px;\n    font-size: 10.5px;\n    line-height: 1.14;\n  }\n\n  .cc-dc-living-selectorDivider {\n    margin: 10px 0 20px;\n  }\n\n  .cc-dc-living-contentLayout {\n    display: block;\n  }\n\n  .cc-dc-living-sidebarColumn {\n    position: static;\n    width: 100%;\n    margin-top: 20px;\n  }\n\n  .cc-dc-living-serviceGroup {\n    padding-bottom: 26px;\n    scroll-margin-top: 150px;\n  }\n\n  .cc-dc-living-serviceGroup + .cc-dc-living-serviceGroup {\n    padding-top: 27px;\n  }\n\n  .cc-dc-living-serviceGroup \u003e h2 {\n    margin-bottom: 17px;\n    font-size: 29px;\n  }\n\n  .cc-dc-living-serviceList {\n    gap: 24px;\n  }\n\n  .cc-dc-living-serviceCard {\n    padding-bottom: 15px;\n  }\n\n  .cc-dc-living-bannerPlaceholder {\n    width: 100%;\n    aspect-ratio: 16 / 8.2;\n    border-radius: 11px;\n  }\n\n  .cc-dc-living-serviceDetails {\n    padding-top: 13px;\n  }\n\n  .cc-dc-living-serviceMainRow {\n    gap: 8px;\n  }\n\n  .cc-dc-living-serviceTitle {\n    font-size: 16px;\n  }\n\n  .cc-dc-living-ratingRow {\n    gap: 4px;\n    margin-top: 7px;\n    font-size: 11.5px;\n  }\n\n  .cc-dc-living-ratingIcon {\n    width: 18px;\n    height: 18px;\n    min-width: 18px;\n    flex-basis: 18px;\n    font-size: 9px;\n  }\n\n  .cc-dc-living-reviewText,\n  .cc-dc-living-detailsButton {\n    white-space: nowrap;\n  }\n\n  .cc-dc-living-detailsButton {\n    margin-left: 2px;\n    font-size: 11.5px;\n  }\n\n  .cc-dc-living-priceRow {\n    margin-top: 8px;\n    font-size: 12px;\n  }\n\n  .cc-dc-living-addButton {\n    min-width: 74px;\n    min-height: 44px;\n    padding: 0 10px;\n    border-radius: 10px;\n    font-size: 14px;\n  }\n\n  /*\n   * Same popup concept on phone,\n   * automatically fitted to the available screen.\n   */\n  .cc-dc-living-modalOverlay {\n    padding: 0;\n    align-items: flex-end;\n  }\n\n  .cc-dc-living-modal {\n    width: 100%;\n    height: min(640px, 92dvh);\n    max-height: 92dvh;\n    border-width: 1px 0 0;\n    border-radius: 20px 20px 0 0;\n  }\n\n  .cc-dc-living-modalHeader {\n    min-height: 125px;\n    padding: 22px 18px 18px;\n  }\n\n  .cc-dc-living-modalHeader h2 {\n    font-size: 23px;\n  }\n\n  .cc-dc-living-modalHeader p {\n    margin-top: 7px;\n    font-size: 12px;\n  }\n\n  .cc-dc-living-closeButton {\n    width: 42px;\n    height: 42px;\n    min-width: 42px;\n    flex-basis: 42px;\n    margin: -8px -7px 0 0;\n    font-size: 25px;\n  }\n\n  .cc-dc-living-modalBody {\n    padding: 20px 15px 28px;\n  }\n\n  .cc-dc-living-pricingGrid {\n    grid-template-columns:\n      repeat(2, minmax(0, 1fr));\n    gap: 8px;\n  }\n\n  .cc-dc-living-priceCard {\n    min-height: 142px;\n    padding: 12px;\n  }\n\n  .cc-dc-living-optionLabel {\n    font-size: 13px;\n  }\n\n  .cc-dc-living-priceCard strong {\n    margin-top: 15px;\n    font-size: 15px;\n  }\n\n  .cc-dc-living-priceCard button {\n    min-width: 76px;\n    min-height: 39px;\n    padding: 0 14px;\n    font-size: 13px;\n  }\n\n  .cc-dc-living-modalSection h3 {\n    font-size: 17px;\n  }\n\n  .cc-dc-living-processList {\n    gap: 15px;\n  }\n\n  .cc-dc-living-processList strong {\n    font-size: 14px;\n  }\n\n  .cc-dc-living-processList p {\n    font-size: 12px;\n  }\n\n  .cc-dc-living-simpleList li {\n    font-size: 13px;\n  }\n\n  .cc-dc-living-ratingSummary strong {\n    font-size: 31px;\n  }\n\n  .cc-dc-living-goldStar {\n    font-size: 25px;\n  }\n\n  .cc-dc-living-ratingBarRow {\n    grid-template-columns:\n      31px\n      minmax(0, 1fr)\n      38px;\n    gap: 8px;\n  }\n}\n\n@media (max-width: 360px) {\n  .cc-dc-living-serviceTitle {\n    font-size: 15px;\n  }\n\n  .cc-dc-living-ratingRow {\n    gap: 3px;\n    font-size: 10.5px;\n  }\n\n  .cc-dc-living-detailsButton {\n    font-size: 10.5px;\n  }\n\n  .cc-dc-living-addButton {\n    min-width: 66px;\n    padding: 0 7px;\n  }\n}\r\n\r\n/* CITY_COOLIES_LIVING_EXACT_FULLHOME_MATCH_START */\n\n/*\n * Desktop:\n * Keep the same centered position,\n * but use the compact Full Home column dimensions.\n *\n * Main service column: 590px\n * Gap:                 28px\n * Right sidebar:       310px\n *\n * Total visual width:  928px\n */\n@media (min-width: 981px) {\n  .cc-dc-living-container {\n    box-sizing: border-box !important;\n\n    width: 928px !important;\n    max-width: calc(100% - 32px) !important;\n\n    margin-left: auto !important;\n    margin-right: auto !important;\n  }\n\n  .cc-dc-living-contentLayout {\n    display: grid !important;\n\n    width: 100% !important;\n\n    grid-template-columns:\n      minmax(0, 590px)\n      minmax(270px, 310px) !important;\n\n    column-gap: 28px !important;\n    row-gap: 0 !important;\n\n    align-items: start !important;\n  }\n\n  .cc-dc-living-mainColumn {\n    box-sizing: border-box !important;\n\n    width: 590px !important;\n    max-width: 590px !important;\n    min-width: 0 !important;\n  }\n\n  .cc-dc-living-sidebarColumn {\n    box-sizing: border-box !important;\n\n    width: 310px !important;\n    max-width: 310px !important;\n    min-width: 270px !important;\n  }\n}\n\n/*\n * Match Full Home service-banner proportions.\n * Images will be added later.\n */\n.cc-dc-living-bannerPlaceholder {\n  box-sizing: border-box !important;\n\n  width: 100% !important;\n\n  height: 250px !important;\n  min-height: 250px !important;\n  max-height: 250px !important;\n\n  aspect-ratio: auto !important;\n\n  overflow: hidden !important;\n\n  border: 1px solid #f3ccd2 !important;\n  border-radius: 12px !important;\n\n  background: #fff7f8 !important;\n}\n\n/*\n * Match Full Home Add button exactly.\n */\n.cc-dc-living-addButton {\n  box-sizing: border-box !important;\n\n  width: auto !important;\n  min-width: 86px !important;\n\n  height: 42px !important;\n  min-height: 42px !important;\n\n  padding: 8px 20px !important;\n\n  border: 1px solid #ef1b23 !important;\n  border-radius: 9px !important;\n\n  background: #ffffff !important;\n  color: #ef1b23 !important;\n\n  font-size: 15px !important;\n  font-weight: 650 !important;\n  line-height: 1 !important;\n}\n\n/*\n * Match the compact Full Home desktop popup.\n */\n.cc-dc-living-modal {\n  box-sizing: border-box !important;\n\n  width: 560px !important;\n  max-width: calc(100vw - 32px) !important;\n\n  height: 650px !important;\n  max-height: calc(100dvh - 70px) !important;\n\n  min-height: 0 !important;\n\n  overflow: hidden !important;\n\n  border-radius: 16px !important;\n}\n\n/*\n * Only popup content scrolls.\n * The visible scrollbar remains hidden.\n */\n.cc-dc-living-modalBody {\n  min-height: 0 !important;\n\n  flex: 1 1 auto !important;\n\n  overflow-x: hidden !important;\n  overflow-y: auto !important;\n\n  overscroll-behavior: contain !important;\n\n  scrollbar-width: none !important;\n  -ms-overflow-style: none !important;\n\n  -webkit-overflow-scrolling: touch !important;\n}\n\n.cc-dc-living-modalBody::-webkit-scrollbar {\n  display: none !important;\n\n  width: 0 !important;\n  height: 0 !important;\n}\n\n/*\n * Phone:\n * Match the Full Home mobile banner and Add button.\n */\n@media (max-width: 760px) {\n  .cc-dc-living-bannerPlaceholder {\n    width: 100% !important;\n\n    height: 190px !important;\n    min-height: 190px !important;\n    max-height: 190px !important;\n\n    aspect-ratio: auto !important;\n  }\n\n  .cc-dc-living-addButton {\n    width: auto !important;\n    min-width: 72px !important;\n\n    height: 39px !important;\n    min-height: 39px !important;\n\n    padding: 7px 15px !important;\n\n    border-radius: 9px !important;\n\n    font-size: 14px !important;\n  }\n}\n\n/*\n * Small phone popup:\n * Fit automatically to the complete device screen.\n */\n@media (max-width: 620px) {\n  .cc-dc-living-modalOverlay {\n    box-sizing: border-box !important;\n\n    padding: 0 !important;\n\n    align-items: stretch !important;\n    justify-content: stretch !important;\n  }\n\n  .cc-dc-living-modal {\n    width: 100% !important;\n    max-width: 100% !important;\n\n    height: 100dvh !important;\n    max-height: 100dvh !important;\n\n    border-radius: 0 !important;\n  }\n}\n\n/* CITY_COOLIES_LIVING_EXACT_FULLHOME_MATCH_END */\r\n\r\n/* CITY_COOLIES_LIVING_RIGHT_DIVIDER_HOVER_START */\n\n/*\n * Match Full Home desktop vertical divider.\n * The line continues with the complete service column.\n */\n@media (min-width: 1021px) {\n  .cc-dc-living-mainColumn {\n    box-sizing: border-box !important;\n\n    border-left: 0 !important;\n\n    border-right:\n      1px solid #f4d9de !important;\n\n    padding-bottom:\n      80px !important;\n  }\n}\n\n/*\n * Match Full Home Add button hover exactly.\n */\n.cc-dc-living-addButton:hover {\n  background:\n    #ef1b23 !important;\n\n  color:\n    #ffffff !important;\n}\n\n/*\n * Keyboard users receive the same visual state.\n */\n.cc-dc-living-addButton:focus-visible {\n  background:\n    #ef1b23 !important;\n\n  color:\n    #ffffff !important;\n\n  outline:\n    2px solid rgba(239, 27, 35, 0.35);\n\n  outline-offset:\n    2px;\n}\n\n/*\n * No vertical divider when the layout stacks\n * on tablet or phone.\n */\n@media (max-width: 1020px) {\n  .cc-dc-living-mainColumn {\n    border-right:\n      0 !important;\n\n    padding-bottom:\n      0 !important;\n  }\n}\n\n/* CITY_COOLIES_LIVING_RIGHT_DIVIDER_HOVER_END */\r\n\r\n/* CITY_COOLIES_LIVING_COMPACT_GAPS_START */\n\n/*\n * Keep Living \u0026 Bedroom service sections compact.\n *\n * This reduces only vertical spacing.\n * No widths, banners, buttons or sidebar are changed.\n */\n\n/* Fabric sofa -\u003e Leather sofa */\n.cc-dc-living-serviceList {\n  gap: 18px !important;\n}\n\n/* Space after the final service in each section */\n.cc-dc-living-serviceGroup {\n  padding-bottom: 12px !important;\n}\n\n/* Leather sofa -\u003e Mattress, Mattress -\u003e Carpet, etc. */\n.cc-dc-living-serviceGroup + .cc-dc-living-serviceGroup {\n  padding-top: 16px !important;\n}\n\n/*\n * Phone version stays compact without making\n * the service cards feel crowded.\n */\n@media (max-width: 760px) {\n  .cc-dc-living-serviceList {\n    gap: 16px !important;\n  }\n\n  .cc-dc-living-serviceGroup {\n    padding-bottom: 10px !important;\n  }\n\n  .cc-dc-living-serviceGroup + .cc-dc-living-serviceGroup {\n    padding-top: 14px !important;\n  }\n}\n\n/* CITY_COOLIES_LIVING_COMPACT_GAPS_END */\r\n\r\n/* CITY_COOLIES_LIVING_HEADING_MATCH_START */\n\n/*\n * Match Living \u0026 Bedroom section headings\n * with the Full Home section-heading scale.\n */\n.cc-dc-living-serviceGroup \u003e h2 {\n  margin-bottom: 28px !important;\n\n  font-size: 32px !important;\n  font-weight: 700 !important;\n  line-height: 1.18 !important;\n\n  letter-spacing: -0.025em !important;\n}\n\n@media (max-width: 760px) {\n  .cc-dc-living-serviceGroup \u003e h2 {\n    margin-bottom: 22px !important;\n\n    font-size: 24px !important;\n    line-height: 1.18 !important;\n  }\n}\n\n/* CITY_COOLIES_LIVING_HEADING_MATCH_END */\r\n\r\n/* CITY_COOLIES_LIVING_SELECTOR_IMAGES_START */\n\n/*\n * Living \u0026 Bedroom service selector images.\n * Direct image.\n * No card background.\n * No border.\n * No shadow.\n * No zoom.\n * No crop.\n */\n.cc-dc-living-selectorImage {\n  background-color: transparent !important;\n  background-repeat: no-repeat !important;\n  background-position: center center !important;\n  background-size: contain !important;\n\n  border: 0 !important;\n  border-radius: 0 !important;\n  box-shadow: none !important;\n\n  padding: 0 !important;\n  transform: none !important;\n  filter: none !important;\n}\n\n/* Sofa Cleaning */\n.cc-dc-living-selectorItem:nth-child(1) .cc-dc-living-selectorImage {\n  background-image: url(\"/deep-cleaning/sofa_cleaning_in_cozy_living_room.webp\") !important;\n}\n\n/* Mattress Cleaning */\n.cc-dc-living-selectorItem:nth-child(2) .cc-dc-living-selectorImage {\n  background-image: url(\"/deep-cleaning/mattress_cleaning.webp\") !important;\n}\n\n/* Carpet Cleaning */\n.cc-dc-living-selectorItem:nth-child(3) .cc-dc-living-selectorImage {\n  background-image: url(\"/deep-cleaning/carpet_cleaning.webp\") !important;\n}\n\n/* Curtain Cleaning */\n.cc-dc-living-selectorItem:nth-child(4) .cc-dc-living-selectorImage {\n  background-image: url(\"/deep-cleaning/_curtain_cleaning_modern_living_r.webp\") !important;\n}\n\n/* Dining Table Cleaning */\n.cc-dc-living-selectorItem:nth-child(5) .cc-dc-living-selectorImage {\n  background-image: url(\"/deep-cleaning/cleaner_in_cozy_dining_Table.webp\") !important;\n}\n\n@media (max-width: 1020px) {\n  .cc-dc-living-selectorImage {\n    background-size: contain !important;\n    background-position: center center !important;\n  }\n}\n\n@media (max-width: 620px) {\n  .cc-dc-living-selectorImage {\n    background-size: contain !important;\n    background-position: center center !important;\n  }\n}\n\n/* CITY_COOLIES_LIVING_SELECTOR_IMAGES_END */\r\n\n/* CITY_COOLIES_FABRIC_SOFA_MAIN_BANNER_START */\n\n/*\n * Fabric Sofa Cleaning banner.\n * Image is shown directly on the page.\n * No card, no visible background, no border.\n * Complete image remains visible.\n */\n.cc-dc-living-bannerPlaceholder[data-service-id=\"fabric-sofa-cleaning\"] {\n  background-image:\n    url(\"/deep-cleaning/sofa_cleaning_service_banner.webp\") !important;\n\n  background-repeat: no-repeat !important;\n  background-position: center center !important;\n  background-size: contain !important;\n\n  background-color: transparent !important;\n\n  border: 0 !important;\n  border-radius: 0 !important;\n  box-shadow: none !important;\n  outline: 0 !important;\n\n  padding: 0 !important;\n\n  overflow: visible !important;\n}\n\n/* CITY_COOLIES_FABRIC_SOFA_MAIN_BANNER_END */\r\n\r\n/* CITY_COOLIES_SOFA_DIVIDER_GAP_FIX_START */\n\n/*\n * Remove the empty space between the service image\n * and the right-side vertical divider.\n */\n@media (min-width: 1021px) {\n  .cc-dc-living-mainColumn {\n    padding-right: 0 !important;\n  }\n\n  .cc-dc-living-bannerPlaceholder[data-service-id=\"fabric-sofa-cleaning\"] {\n    display: block !important;\n\n    width: 100% !important;\n    max-width: none !important;\n\n    height: auto !important;\n    min-height: 0 !important;\n    max-height: none !important;\n\n    aspect-ratio: 1916 / 821 !important;\n\n    margin-left: 0 !important;\n    margin-right: 0 !important;\n\n    padding: 0 !important;\n\n    background-image:\n      url(\"/deep-cleaning/sofa_cleaning_service_banner.webp\") !important;\n\n    background-repeat: no-repeat !important;\n    background-position: center center !important;\n    background-size: contain !important;\n\n    background-color: transparent !important;\n\n    border: 0 !important;\n    border-radius: 0 !important;\n    box-shadow: none !important;\n  }\n}\n\n/*\n * Phone and tablet:\n * preserve full image without crop.\n */\n@media (max-width: 1020px) {\n  .cc-dc-living-bannerPlaceholder[data-service-id=\"fabric-sofa-cleaning\"] {\n    display: block !important;\n\n    width: 100% !important;\n    max-width: 100% !important;\n\n    height: auto !important;\n    min-height: 0 !important;\n    max-height: none !important;\n\n    aspect-ratio: 1916 / 821 !important;\n\n    margin: 0 !important;\n    padding: 0 !important;\n\n    background-size: contain !important;\n    background-position: center center !important;\n\n    border: 0 !important;\n    border-radius: 0 !important;\n    box-shadow: none !important;\n  }\n}\n\n/* CITY_COOLIES_SOFA_DIVIDER_GAP_FIX_END */\n\n\n/* CITY_COOLIES_LIVING_SHARED_POPUP_FINAL */\n.cc-dc-living-modal {\n  box-sizing: border-box !important;\n  display: flex !important;\n  flex-direction: column !important;\n  width: min(480px, calc(100vw - 32px)) !important;\n  min-width: 0 !important;\n  max-width: calc(100vw - 32px) !important;\n  height: min(660px, calc(100dvh - 48px)) !important;\n  min-height: 0 !important;\n  max-height: calc(100dvh - 48px) !important;\n  overflow: hidden !important;\n  border-radius: 16px !important;\n}\n\n.cc-dc-living-modalHeader {\n  box-sizing: border-box !important;\n  flex: 0 0 auto !important;\n  min-height: 0 !important;\n  padding: 20px 22px 18px !important;\n}\n\n.cc-dc-living-modalHeader h2 {\n  font-size: 26px !important;\n  line-height: 1.2 !important;\n}\n\n.cc-dc-living-modalBody {\n  box-sizing: border-box !important;\n  flex: 1 1 auto !important;\n  min-width: 0 !important;\n  min-height: 0 !important;\n  padding: 16px 22px 20px !important;\n  overflow-x: hidden !important;\n  overflow-y: auto !important;\n}\n\n.cc-dc-living-pricingGrid {\n  display: grid !important;\n  width: 100% !important;\n  grid-template-columns: repeat(3, minmax(0, 1fr)) !important;\n  gap: 8px !important;\n}\n\n.cc-dc-living-priceCard {\n  box-sizing: border-box !important;\n  width: 100% !important;\n  min-width: 0 !important;\n  height: auto !important;\n  min-height: 90px !important;\n  max-height: none !important;\n  padding: 9px !important;\n}\n\n.cc-dc-living-priceCard strong {\n  margin-top: 3px !important;\n  color: #171717 !important;\n}\n\n.cc-dc-living-priceCard button {\n  min-width: 66px !important;\n  min-height: 30px !important;\n  height: 30px !important;\n  margin-top: auto !important;\n  padding: 0 9px !important;\n  font-size: 12px !important;\n}\n\n.cc-dc-living-priceCard:has(button[aria-pressed=\"true\"]) {\n  border-color: #ef1b23 !important;\n  background: #fff8f9 !important;\n}\n\n.cc-dc-living-priceCard button[aria-pressed=\"true\"] {\n  background: #ef1b23 !important;\n  color: #ffffff !important;\n}\n\n.cc-dc-living-selectionFooter {\n  box-sizing: border-box;\n  display: flex;\n  flex: 0 0 auto;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  width: 100%;\n  padding: 10px 22px;\n  border-top: 1px solid #eeeeee;\n  background: #ffffff;\n}\n\n.cc-dc-living-selectionSummary {\n  display: flex;\n  min-width: 0;\n  flex-direction: column;\n  gap: 3px;\n}\n\n.cc-dc-living-selectionCaption {\n  color: #737373;\n  font-size: 12px;\n}\n\n.cc-dc-living-selectionValue {\n  overflow: hidden;\n  color: #171717;\n  font-size: 14px;\n  font-weight: 700;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.cc-dc-living-continueButton {\n  flex: 0 0 auto;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 8px 14px;\n  border: 1px solid #ef1b23;\n  border-radius: 10px;\n  background: #ef1b23;\n  color: #ffffff;\n  font: inherit;\n  font-weight: 700;\n  cursor: pointer;\n}\n\n.cc-dc-living-continueButton:disabled {\n  border-color: #e3e3e3;\n  background: #f2f3f5;\n  color: #999999;\n  cursor: not-allowed;\n}\n\n@media (max-width: 620px) {\n  .cc-dc-living-modal {\n    width: calc(100vw - 20px) !important;\n    max-width: calc(100vw - 20px) !important;\n    height: calc(100dvh - 20px) !important;\n    max-height: calc(100dvh - 20px) !important;\n    border-radius: 16px !important;\n  }\n\n  .cc-dc-living-modalHeader {\n    padding: 18px 16px 16px !important;\n  }\n\n  .cc-dc-living-modalHeader h2 {\n    font-size: 23px !important;\n  }\n\n  .cc-dc-living-modalBody {\n    padding: 16px 14px !important;\n  }\n\n  .cc-dc-living-pricingGrid {\n    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;\n    gap: 8px !important;\n  }\n\n  .cc-dc-living-priceCard {\n    min-height: 90px !important;\n    padding: 9px !important;\n  }\n\n  .cc-dc-living-selectionFooter {\n    padding: 10px 14px calc(10px + env(safe-area-inset-bottom));\n  }\n\n  .cc-dc-living-continueButton {\n    min-width: 108px;\n    min-height: 40px;\n  }\n}\n/* CITY_COOLIES_LIVING_SHARED_POPUP_FINAL_END */\n/* CITY_COOLIES_LEATHER_SOFA_BANNER_START */\n/* Show the complete Leather sofa image directly in its page banner. */\n.cc-dc-living-bannerPlaceholder[data-service-id=\"leather-sofa-cleaning\"] {\n  display: block !important;\n  box-sizing: border-box !important;\n  width: 100% !important;\n  max-width: 100% !important;\n  height: auto !important;\n  min-height: 0 !important;\n  max-height: none !important;\n  aspect-ratio: 1916 / 821 !important;\n  margin: 0 !important;\n  padding: 0 !important;\n  border: 0 !important;\n  border-radius: 0 !important;\n  box-shadow: none !important;\n  background-color: transparent !important;\n  background-image: url(\"/deep-cleaning/leather_sofa_cleaning_service_banner.webp\") !important;\n  background-repeat: no-repeat !important;\n  background-position: center center !important;\n  background-size: contain !important;\n}\n/* CITY_COOLIES_LEATHER_SOFA_BANNER_END */\n/* CITY_COOLIES_MATTRESS_BANNER_START */\n/* Show the complete mattress-cleaning image directly in its service banner. */\n.cc-dc-living-bannerPlaceholder[data-service-id=\"mattress-cleaning\"] {\n  display: block !important;\n  box-sizing: border-box !important;\n  width: 100% !important;\n  max-width: 100% !important;\n  height: auto !important;\n  min-height: 0 !important;\n  max-height: none !important;\n  aspect-ratio: 1916 / 821 !important;\n  margin: 0 !important;\n  padding: 0 !important;\n  border: 0 !important;\n  border-radius: 0 !important;\n  box-shadow: none !important;\n  background-color: transparent !important;\n  background-image: url(\"/deep-cleaning/mattress_cleaning_service_banner.webp\") !important;\n  background-repeat: no-repeat !important;\n  background-position: center center !important;\n  background-size: contain !important;\n}\n/* CITY_COOLIES_MATTRESS_BANNER_END */\n/* CITY_COOLIES_CARPET_BANNER_START */\n/* Display the full carpet-cleaning image directly in its page banner. */\n.cc-dc-living-bannerPlaceholder[data-service-id=\"carpet-cleaning\"] {\n  display: block !important;\n  box-sizing: border-box !important;\n  width: 100% !important;\n  max-width: 100% !important;\n  height: auto !important;\n  min-height: 0 !important;\n  max-height: none !important;\n  aspect-ratio: 1916 / 821 !important;\n  margin: 0 !important;\n  padding: 0 !important;\n  border: 0 !important;\n  border-radius: 0 !important;\n  box-shadow: none !important;\n  background-color: transparent !important;\n  background-image: url(\"/deep-cleaning/carpet_cleaning_service_banner.webp\") !important;\n  background-repeat: no-repeat !important;\n  background-position: center center !important;\n  background-size: contain !important;\n}\n/* CITY_COOLIES_CARPET_BANNER_END */\n/* CITY_COOLIES_CURTAIN_BANNER_START */\n/* Display the complete curtain-cleaning image directly in its page banner. */\n.cc-dc-living-bannerPlaceholder[data-service-id=\"curtain-cleaning\"] {\n  display: block !important;\n  box-sizing: border-box !important;\n  width: 100% !important;\n  max-width: 100% !important;\n  height: auto !important;\n  min-height: 0 !important;\n  max-height: none !important;\n  aspect-ratio: 1916 / 821 !important;\n  margin: 0 !important;\n  padding: 0 !important;\n  border: 0 !important;\n  border-radius: 0 !important;\n  box-shadow: none !important;\n  background-color: transparent !important;\n  background-image: url(\"/deep-cleaning/curtain_cleaning_service_banner.webp\") !important;\n  background-repeat: no-repeat !important;\n  background-position: center center !important;\n  background-size: contain !important;\n}\n/* CITY_COOLIES_CURTAIN_BANNER_END */\r\n\r\n/* CITY_COOLIES_DINING_TABLE_BANNER_START */\n.cc-dc-living-bannerPlaceholder[data-service-id=\"dining-table-cleaning\"] {\n  display: block !important;\n  box-sizing: border-box !important;\n  width: 100% !important;\n  max-width: 100% !important;\n  height: auto !important;\n  min-height: 0 !important;\n  max-height: none !important;\n  aspect-ratio: 1671 / 941 !important;\n  margin: 0 !important;\n  padding: 0 !important;\n  border: 0 !important;\n  border-radius: 0 !important;\n  box-shadow: none !important;\n  background-color: transparent !important;\n  background-image: url(\"/deep-cleaning/dining_table_cleaning_service_banner.webp\") !important;\n  background-repeat: no-repeat !important;\n  background-position: center center !important;\n  background-size: contain !important;\n}\n/* CITY_COOLIES_DINING_TABLE_BANNER_END */\r\n\n\n\n/* CITY_COOLIES_DIVIDER_VISIBILITY_FIX */\n.cc-dc-living-mainColumn {\n  border-right-color: transparent !important;\n  border-left-color: transparent !important;\n}\n\n.cc-dc-living-serviceCard {\n  border-bottom-color: transparent !important;\n}\n\n.cc-dc-living-serviceGroup + .cc-dc-living-serviceGroup {\n  border-top-color: transparent !important;\n}\n/* END_CITY_COOLIES_DIVIDER_VISIBILITY_FIX */";

type RatingBar = {
  stars: number;
  percentage: number;
};

export type PriceOption = {
  id: string;
  label: string;
  price: number;
};

type ProcessStep = {
  title: string;
  description: string;
};

export type CleaningService = {
  id: string;
  title: string;
  rating: number;
  reviews: number;
  pricingTitle: string;
  options: readonly PriceOption[];
  process: readonly ProcessStep[];
  ratingBars: readonly RatingBar[];
  included?: readonly string[];
  excluded?: readonly string[];
};

const rating42: readonly RatingBar[] = [
  { stars: 5, percentage: 47 },
  { stars: 4, percentage: 34 },
  { stars: 3, percentage: 13 },
  { stars: 2, percentage: 4 },
  { stars: 1, percentage: 2 },
];

const rating43: readonly RatingBar[] = [
  { stars: 5, percentage: 55 },
  { stars: 4, percentage: 28 },
  { stars: 3, percentage: 11 },
  { stars: 2, percentage: 4 },
  { stars: 1, percentage: 2 },
];

const rating44: readonly RatingBar[] = [
  { stars: 5, percentage: 60 },
  { stars: 4, percentage: 27 },
  { stars: 3, percentage: 8 },
  { stars: 2, percentage: 3 },
  { stars: 1, percentage: 2 },
];

const rating41: readonly RatingBar[] = [
  { stars: 5, percentage: 47 },
  { stars: 4, percentage: 30 },
  { stars: 3, percentage: 13 },
  { stars: 2, percentage: 6 },
  { stars: 1, percentage: 4 },
];

const sofaPrices: readonly PriceOption[] = [
  { id: "3-seat", label: "3 Seat", price: 514 },
  { id: "4-seat", label: "4 Seat", price: 621 },
  { id: "5-seat", label: "5 Seat", price: 745 },
  { id: "6-seat", label: "6 Seat", price: 869 },
  { id: "7-seat", label: "7 Seat", price: 995 },
  { id: "8-seat", label: "8 Seat", price: 1120 },
  { id: "9-seat", label: "9 Seat", price: 1243 },
  { id: "10-seat", label: "10 Seat", price: 1367 },
];

const fabricSofa: CleaningService = {
  id: "fabric-sofa-cleaning",
  title: "Fabric sofa cleaning",
  rating: 4.2,
  reviews: 800,
  pricingTitle: "Select sofa size",
  options: sofaPrices,

  process: [
    {
      title: "Vacuuming",
      description:
        "Dust, hair and loose debris are removed from the sofa surface and accessible gaps.",
    },
    {
      title: "Foam cleaning",
      description:
        "Fabric-safe foam helps loosen everyday dirt, grime and suitable surface stains.",
    },
    {
      title: "Wet extraction",
      description:
        "Professional extraction removes loosened dirt and cleaning residue from the fabric.",
    },
    {
      title: "Drying",
      description:
        "The sofa is left to dry naturally with proper ventilation after cleaning.",
    },
  ],

  included: [
    "Deep vacuum",
    "Foam treatment",
    "Spot stain cleaning",
    "Wet extraction",
    "Final refresh",
  ],

  ratingBars: rating42,
};

const leatherSofa: CleaningService = {
  id: "leather-sofa-cleaning",
  title: "Leather sofa cleaning",
  rating: 4.3,
  reviews: 800,
  pricingTitle: "Select sofa size",
  options: sofaPrices,

  process: [
    {
      title: "Inspection",
      description:
        "The leather condition is checked before cleaning begins.",
    },
    {
      title: "Dusting & vacuuming",
      description:
        "Loose dust, crumbs and particles are gently removed.",
    },
    {
      title: "Spot cleaning",
      description:
        "Suitable minor marks are treated using leather-safe solutions.",
    },
    {
      title: "Deep cleaning",
      description:
        "Leather surfaces are carefully cleaned to remove built-up dirt.",
    },
    {
      title: "Conditioning",
      description:
        "Conditioner helps maintain softness and protects the leather finish.",
    },
    {
      title: "Optional shine",
      description:
        "A finishing polish can enhance the final premium appearance.",
    },
  ],

  ratingBars: rating43,
};

const mattressCleaning: CleaningService = {
  id: "mattress-cleaning",
  title: "Mattress cleaning",
  rating: 4.4,
  reviews: 800,
  pricingTitle: "Select mattress size",

  options: [
    { id: "single", label: "Single", price: 450 },
    { id: "double", label: "Double", price: 750 },
    { id: "queen", label: "Queen", price: 1000 },
    { id: "king", label: "King", price: 1150 },
  ],

  process: [
    {
      title: "Inspection",
      description:
        "Visible stains, odour and mattress fabric condition are checked before cleaning.",
    },
    {
      title: "Vacuuming",
      description:
        "Dust, hair and loose allergens are removed from the mattress surface.",
    },
    {
      title: "Spot treatment",
      description:
        "Suitable visible marks are pre-treated before deep cleaning.",
    },
    {
      title: "Deep cleaning",
      description:
        "Professional cleaning helps lift sweat, grime and trapped dirt.",
    },
    {
      title: "Drying",
      description:
        "The mattress is left to dry properly before regular use.",
    },
  ],

  ratingBars: rating44,
};

const carpetCleaning: CleaningService = {
  id: "carpet-cleaning",
  title: "Carpet cleaning",
  rating: 4.1,
  reviews: 800,
  pricingTitle: "Select carpet area",

  options: [
    {
      id: "upto-25",
      label: "Upto 25 Sq ft",
      price: 450,
    },
    {
      id: "25-50",
      label: "25 - 50 Sq ft",
      price: 650,
    },
    {
      id: "50-100",
      label: "50 - 100 Sq ft",
      price: 850,
    },
    {
      id: "100-150",
      label: "100 - 150 Sq ft",
      price: 950,
    },
    {
      id: "150-200",
      label: "150 - 200 Sq ft",
      price: 1050,
    },
  ],

  process: [
    {
      title: "Dry vacuuming",
      description:
        "Loose dust and debris are removed thoroughly before deep cleaning.",
    },
    {
      title: "Shampooing",
      description:
        "Fabric-safe cleaner is worked into the fibres to loosen dirt and suitable stains.",
    },
    {
      title: "Wet extraction",
      description:
        "Dirt, moisture and cleaning residue are extracted for a refreshed finish.",
    },
    {
      title: "Drying",
      description:
        "The carpet is left to air-dry properly for best results.",
    },
  ],

  ratingBars: rating41,
};

const curtainCleaning: CleaningService = {
  id: "curtain-cleaning",
  title: "Curtain cleaning",
  rating: 4.2,
  reviews: 800,
  pricingTitle: "Select curtain quantity",

  options: [
    { id: "2-piece", label: "2 Pieces", price: 400 },
    { id: "3-piece", label: "3 Pieces", price: 600 },
    { id: "4-piece", label: "4 Pieces", price: 800 },
    { id: "5-piece", label: "5 Pieces", price: 1000 },
    { id: "6-piece", label: "6 Pieces", price: 1200 },
    { id: "7-piece", label: "7 Pieces", price: 1400 },
    { id: "8-piece", label: "8 Pieces", price: 1600 },
    { id: "9-piece", label: "9 Pieces", price: 1800 },
    { id: "10-piece", label: "10 Pieces", price: 2000 },
  ],

  process: [
    {
      title: "Fabric inspection",
      description:
        "Curtain fabric, visible marks and cleaning requirements are checked first.",
    },
    {
      title: "Dry dust removal",
      description:
        "Loose dust is removed from the curtain surface and folds.",
    },
    {
      title: "Spot pre-treatment",
      description:
        "Suitable visible marks are treated before the main cleaning process.",
    },
    {
      title: "Fabric-safe cleaning",
      description:
        "Selected curtain pieces are cleaned using an appropriate fabric-safe method.",
    },
    {
      title: "Controlled drying",
      description:
        "Curtains are allowed to dry properly to help protect their finish.",
    },
  ],

  ratingBars: rating42,
};

const diningTableCleaning: CleaningService = {
  id: "dining-table-cleaning",
  title: "Dining table cleaning",
  rating: 4.4,
  reviews: 800,
  pricingTitle: "Select dining table size",

  options: [
    {
      id: "4-seater",
      label: "Dining table 4 seater",
      price: 499,
    },
    {
      id: "5-seater",
      label: "Dining table 5 seater",
      price: 549,
    },
    {
      id: "6-seater",
      label: "Dining table 6 seater",
      price: 599,
    },
    {
      id: "7-seater",
      label: "Dining table 7 seater",
      price: 649,
    },
    {
      id: "8-seater",
      label: "Dining table 8 seater",
      price: 699,
    },
    {
      id: "9-seater",
      label: "Dining table 9 seater",
      price: 749,
    },
    {
      id: "10-seater",
      label: "Dining table 10 seater",
      price: 799,
    },
  ],

  process: [
    {
      title: "Dry dusting",
      description:
        "Loose dust, crumbs and surface debris are removed.",
    },
    {
      title: "Deep surface wipe",
      description:
        "Dining surfaces are cleaned using suitable professional solutions.",
    },
    {
      title: "Chair deep cleaning",
      description:
        "Accessible dining-chair surfaces are cleaned according to their material.",
    },
    {
      title: "Final polish",
      description:
        "Cleaned surfaces receive a finishing touch for a fresh appearance.",
    },
  ],

  excluded: [
    "Removal of permanent stains such as ink or dye marks",
  ],

  ratingBars: rating44,
};

const serviceGroups = [
  {
    id: "sofa-cleaning-section",
    label: "Sofa Cleaning",
    services: [
      fabricSofa,
      leatherSofa,
    ],
  },
  {
    id: "mattress-cleaning-section",
    label: "Mattress Cleaning",
    services: [
      mattressCleaning,
    ],
  },
  {
    id: "carpet-cleaning-section",
    label: "Carpet Cleaning",
    services: [
      carpetCleaning,
    ],
  },
  {
    id: "curtain-cleaning-section",
    label: "Curtain Cleaning",
    services: [
      curtainCleaning,
    ],
  },
  {
    id: "dining-table-cleaning-section",
    label: "Dining Table Cleaning",
    services: [
      diningTableCleaning,
    ],
  },
] as const;

const serviceNavigation = [
  {
    id: "sofa",
    label: "Sofa Cleaning",
    targetId: "sofa-cleaning-section",
  },
  {
    id: "mattress",
    label: "Mattress Cleaning",
    targetId: "mattress-cleaning-section",
  },
  {
    id: "carpet",
    label: "Carpet Cleaning",
    targetId: "carpet-cleaning-section",
  },
  {
    id: "curtain",
    label: "Curtain Cleaning",
    targetId: "curtain-cleaning-section",
  },
  {
    id: "dining",
    label: "Dining Table Cleaning",
    targetId: "dining-table-cleaning-section",
  },
] as const;

export function formatCurrency(
  value: number,
): string {
  return `₹${value.toLocaleString(
    "en-IN",
  )}`;
}

function getStartingPrice(
  service: CleaningService,
): number {
  return Math.min(
    ...service.options.map(
      (option) => option.price,
    ),
  );
}

function scrollToService(
  targetId: string,
) {
  const target =
    document.getElementById(
      targetId,
    );

  if (!target) {
    return;
  }

  const top =
    target.getBoundingClientRect().top +
    window.scrollY -
    155;

  window.scrollTo({
    top: Math.max(
      0,
      top,
    ),
    behavior: "smooth",
  });
}

type ServiceCardProps = {
  service: CleaningService;
  onOpen: (
    service: CleaningService,
  ) => void;
};

function ServiceCard({
  service,
  onOpen,
}: ServiceCardProps) {
  const startingPrice =
    getStartingPrice(
      service,
    );

  return (
    <article
      className={
        "cc-dc-living-serviceCard"
      }
    >
      <div
        className={
          "cc-dc-living-bannerPlaceholder"
        }
        data-service-id={service.id}
        aria-hidden="true"
      />

      <div
        className={
          "cc-dc-living-serviceDetails"
        }
      >
        <div
          className={
            "cc-dc-living-serviceMainRow"
          }
        >
          <div
            className={
              "cc-dc-living-serviceInformation"
            }
          >
            <h3
              className={
                "cc-dc-living-serviceTitle"
              }
            >
              {service.title}
            </h3>

            <div
              className={
                "cc-dc-living-ratingRow"
              }
            >
              <span
                className={
                  "cc-dc-living-ratingIcon"
                }
                aria-hidden="true"
              >
                ★
              </span>

              <span>
                {service.rating.toFixed(
                  1,
                )}
              </span>

              <span
                className={
                  "cc-dc-living-reviewText"
                }
              >
                (
                {service.reviews.toLocaleString(
                  "en-IN",
                )}{" "}
                reviews)
              </span>

              <button
                type="button"
                className={
                  "cc-dc-living-detailsButton"
                }
                onClick={() =>
                  onOpen(service)
                }
              >
                View details
              </button>
            </div>

            <div
              className={
                "cc-dc-living-priceRow"
              }
            >
              <strong>
                Starts at{" "}
                {formatCurrency(
                  startingPrice,
                )}
              </strong>
            </div>
          </div>

          <button
            type="button"
            className={
              "cc-dc-living-addButton"
            }
            onClick={() =>
              onOpen(service)
            }
          >
            Add
          </button>
        </div>
      </div>
    </article>
  );
}

const LIVING_DETAILS_CSS = '\n.cc-dc-living-detailsPage { width: min(1100px, calc(100% - 32px)); margin: 0 auto; padding: 32px 0 80px; color: #171717; background: #fff; }\n.cc-dc-living-detailsPage .cc-dc-living-detailsContent { width: 100%; max-width: 100%; margin: 0; border: 0; border-radius: 0; box-shadow: none; background: #fff; }\n.cc-dc-living-detailsPage .cc-dc-living-modalHeader { min-height: 0; padding: 20px 0 28px; }\n.cc-dc-living-detailsPage .cc-dc-living-modalBody { overflow: visible; padding: 28px 0; }\n.cc-dc-living-detailsPage .cc-dc-living-pricingGrid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }\n.cc-dc-living-detailsPage .cc-dc-living-priceCard { min-height: 145px; }\n.cc-dc-living-detailsPage .cc-dc-living-selectionFooter { position: static; padding: 24px 0; margin-top: 28px; border-top: 1px solid #eee; }\n.cc-dc-living-detailsPage .cc-dc-living-closeButton { width: auto; min-width: 0; height: auto; margin: 0; padding: 10px 18px; border-radius: 8px; font-size: 15px; }\n@media (max-width: 760px) {\n  .cc-dc-living-detailsPage { width: calc(100% - 24px); padding: 16px 0 48px; }\n  .cc-dc-living-detailsPage .cc-dc-living-modalHeader { padding: 14px 0 20px; }\n  .cc-dc-living-detailsPage .cc-dc-living-modalBody { padding: 20px 0; }\n  .cc-dc-living-detailsPage .cc-dc-living-pricingGrid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }\n  .cc-dc-living-detailsPage .cc-dc-living-selectionFooter { padding: 18px 0; }\n}\n';

function LivingBedroomCleaningContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("livingService");
  const activeService = serviceGroups.flatMap((group) => group.services).find((service) => service.id === serviceId);
  useEffect(() => {
    if (
      activeService ||
      !window.matchMedia("(max-width: 760px)").matches ||
      window.sessionStorage.getItem("citycoolies:living-scroll-cart") !== "1"
    ) {
      return;
    }

    const timer = window.setTimeout(() => {
      const sidebar = document.querySelector<HTMLElement>(
        ".cc-dc-living-sidebarColumn"
      );

      if (!sidebar) return;

      window.sessionStorage.removeItem("citycoolies:living-scroll-cart");

      const top =
        sidebar.getBoundingClientRect().top +
        window.scrollY -
        150;

      window.scrollTo({
        top: Math.max(0, top),
        behavior: "smooth",
      });
    }, 150);

    return () => window.clearTimeout(timer);
  }, [activeService]);

  const openService = (service: CleaningService) => {
    router.push(`/services/deep-cleaning?category=living-bedroom&livingService=${encodeURIComponent(service.id)}`);
  };

  const closeService = () => {
    router.push("/services/deep-cleaning?category=living-bedroom");
  };

  return (
    <>
      <style>{DEEP_CLEANING_INLINE_CSS + LIVING_DETAILS_CSS}</style>
      {!activeService && <section
        id="panel-living-bedroom"
        role="tabpanel"
        className={
          "cc-dc-living-section"
        }
        aria-labelledby="living-bedroom-heading"
      >
        <h1
          id="living-bedroom-heading"
          className={
            "cc-dc-living-srOnly"
          }
        >
          Living &amp; Bedroom Cleaning
        </h1>

        <div
          className={
            "cc-dc-living-container"
          }
        >
          <div
            className={
              "cc-dc-living-contentLayout"
            }
          >
            <main
              className={
                "cc-dc-living-mainColumn"
              }
            >
              <nav
            className={
              "cc-dc-living-serviceSelector"
            }
            aria-label="Living and bedroom cleaning services"
          >
            {serviceNavigation.map(
              (item) => (
                <button
                  key={
                    item.id
                  }
                  type="button"
                  className={
                    "cc-dc-living-selectorItem"
                  }
                  onClick={() =>
                    scrollToService(
                      item.targetId,
                    )
                  }
                >
                  <span
                    className={
                      "cc-dc-living-selectorImage"
                    }
                    aria-hidden="true"
                  />

                  <span
                    className={
                      "cc-dc-living-selectorLabel"
                    }
                  >
                    {
                      item.label
                    }
                  </span>
                </button>
              ),
            )}
          </nav>

          <div
            className={
              "cc-dc-living-selectorDivider"
            }
          />

              {serviceGroups.map(
                (group) => (
                  <section
                    key={
                      group.id
                    }
                    id={
                      group.id
                    }
                    className={
                      "cc-dc-living-serviceGroup"
                    }
                  >
                    <h2>
                      {
                        group.label
                      }
                    </h2>

                    <div
                      className={
                        "cc-dc-living-serviceList"
                      }
                    >
                      {group.services.map(
                        (
                          service,
                        ) => (
                          <ServiceCard
                            key={
                              service.id
                            }
                            service={
                              service
                            }
                            onOpen={openService}
                          />
                        ),
                      )}
                    </div>
                  </section>
                ),
              )}
            </main>

            <aside
              className={
                "cc-dc-living-sidebarColumn"
              }
            >
              <ServiceCartSidebar />
            </aside>
          </div>
        </div>
      </section>}

      {activeService && (
        <LivingBedroomServiceDetails
          key={activeService.id}
          service={
            activeService
          }
          onClose={closeService}
        />
      )}
    </>
  );
}
export default function LivingBedroomCleaningSection() {
  return <Suspense fallback={null}><LivingBedroomCleaningContent /></Suspense>;
}
