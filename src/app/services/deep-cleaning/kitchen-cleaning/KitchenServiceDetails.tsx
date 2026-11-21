"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { upsertServiceCartItem } from "@/app/services/serviceCart";

export const DEEP_CLEANING_INLINE_CSS = ".cc-dc-kitchen-section {\n  box-sizing: border-box;\n  width: 100%;\n  background: #ffffff;\n  color: #171717;\n}\n\n.cc-dc-kitchen-srOnly {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border: 0;\n}\n\n/*\n * Match the visual content width used by Full Home:\n * approximately 695px service column + right sidebar.\n */\n.cc-dc-kitchen-container {\n  box-sizing: border-box;\n  width: min(1100px, calc(100% - 32px));\n  margin: 0 auto;\n  padding: 0 0 64px;\n}\n\n/* ======================================================\n   TOP SERVICE SELECTOR\n   No Furnished / Unfurnished controls in this category.\n   ====================================================== */\n\n.cc-dc-kitchen-serviceSelector {\n  display: flex;\n  width: 100%;\n  align-items: flex-start;\n  justify-content: flex-start;\n  gap: 24px;\n  margin: 0;\n  padding: 0;\n}\n\n.cc-dc-kitchen-selectorItem {\n  display: flex;\n  width: 88px;\n  min-width: 88px;\n  padding: 0;\n  border: 0;\n  background: transparent;\n  color: #171717;\n  cursor: pointer;\n  flex-direction: column;\n  align-items: center;\n  gap: 7px;\n  font: inherit;\n}\n\n.cc-dc-kitchen-selectorImage {\n  display: block;\n  width: 72px;\n  height: 72px;\n  flex: 0 0 72px;\n  border: 0;\n  border-radius: 0;\n  background: #fff1f3;\n}\n\n.cc-dc-kitchen-selectorLabel {\n  width: 88px;\n  color: #111111;\n  font-size: 13px;\n  font-weight: 500;\n  line-height: 1.15;\n  text-align: center;\n}\n\n.cc-dc-kitchen-selectorItem:hover .cc-dc-kitchen-selectorLabel,\n.cc-dc-kitchen-selectorItem:focus-visible .cc-dc-kitchen-selectorLabel {\n  color: #ef1b23;\n}\n\n.cc-dc-kitchen-selectorItem:focus-visible {\n  outline: 2px solid #ef1b23;\n  outline-offset: 5px;\n}\n\n.cc-dc-kitchen-selectorDivider {\n  width: 100%;\n  height: 1px;\n  margin: 26px 0 28px;\n  background: transparent;\n}\n\n/* ======================================================\n   MAIN + RIGHT SIDEBAR\n   ====================================================== */\n\n.cc-dc-kitchen-contentLayout {\n  display: grid;\n  width: 100%;\n  grid-template-columns:\n    minmax(0, 696px)\n    minmax(300px, 372px);\n  gap: 32px;\n  align-items: start;\n}\n\n.cc-dc-kitchen-mainColumn {\n  min-width: 0;\n}\n\n.cc-dc-kitchen-sidebarColumn {\n  position: sticky;\n  top: 170px;\n  min-width: 0;\n}\n\n.cc-dc-kitchen-serviceGroup {\n  width: 100%;\n  scroll-margin-top: 155px;\n  padding: 0 0 34px;\n}\n\n.cc-dc-kitchen-serviceGroup + .cc-dc-kitchen-serviceGroup {\n  padding-top: 34px;\n  border-top: 1px solid #f0dfe2;\n}\n\n.cc-dc-kitchen-serviceGroup \u003e h2 {\n  margin: 0 0 30px;\n  color: #111111;\n  font-size: 38px;\n  font-weight: 700;\n  line-height: 1.16;\n  letter-spacing: -0.035em;\n}\n\n.cc-dc-kitchen-serviceList {\n  display: flex;\n  width: 100%;\n  flex-direction: column;\n  gap: 28px;\n}\n\n/* ======================================================\n   SERVICE BLOCK - SAME VISUAL STRUCTURE AS FULL HOME\n   ====================================================== */\n\n.cc-dc-kitchen-serviceCard {\n  width: 100%;\n  margin: 0;\n  padding: 0 0 18px;\n  border: 0;\n  border-bottom: 1px solid rgba(40, 40, 40, 0.11);\n  border-radius: 0;\n  background: transparent;\n}\n\n/*\n * Actual service images will be added later.\n * This keeps the same banner footprint as Full Home.\n */\n.cc-dc-kitchen-bannerPlaceholder {\n  box-sizing: border-box;\n  width: 100%;\n  aspect-ratio: 2.36 / 1;\n  overflow: hidden;\n  border: 1px solid #f3ccd2;\n  border-radius: 12px;\n  background: #fff1f3;\n}\n\n.cc-dc-kitchen-serviceDetails {\n  width: 100%;\n  padding: 17px 0 0;\n}\n\n.cc-dc-kitchen-serviceMainRow {\n  display: flex;\n  width: 100%;\n  gap: 18px;\n  align-items: flex-start;\n  justify-content: space-between;\n}\n\n.cc-dc-kitchen-serviceInformation {\n  min-width: 0;\n  flex: 1 1 auto;\n}\n\n.cc-dc-kitchen-serviceTitle {\n  margin: 0;\n  color: #171717;\n  font-size: 18px;\n  font-weight: 700;\n  line-height: 1.34;\n}\n\n.cc-dc-kitchen-ratingRow {\n  display: flex;\n  margin-top: 8px;\n  flex-wrap: nowrap;\n  align-items: center;\n  gap: 5px;\n  color: #555555;\n  font-size: 13px;\n  line-height: 1.3;\n  white-space: nowrap;\n}\n\n.cc-dc-kitchen-ratingIcon {\n  display: inline-flex;\n  width: 20px;\n  height: 20px;\n  min-width: 20px;\n  flex: 0 0 20px;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n  background: #ef1b23;\n  color: #ffffff;\n  font-size: 10px;\n  line-height: 1;\n}\n\n.cc-dc-kitchen-reviewText {\n  flex: 0 0 auto;\n  white-space: nowrap;\n  text-decoration: underline;\n  text-decoration-thickness: 1px;\n  text-underline-offset: 2px;\n}\n\n.cc-dc-kitchen-detailsButton {\n  flex: 0 0 auto;\n  margin: 0 0 0 4px;\n  padding: 0;\n  border: 0;\n  background: transparent;\n  color: #ef1b23;\n  cursor: pointer;\n  font-size: 13px;\n  font-weight: 700;\n  line-height: 1.3;\n  white-space: nowrap;\n}\n\n.cc-dc-kitchen-priceRow {\n  display: flex;\n  margin-top: 9px;\n  align-items: center;\n  gap: 7px;\n  color: #171717;\n  font-size: 13px;\n  line-height: 1.3;\n}\n\n.cc-dc-kitchen-priceRow strong {\n  font-weight: 700;\n}\n\n.cc-dc-kitchen-addButton {\n  display: inline-flex;\n  min-width: 102px;\n  min-height: 50px;\n  flex: 0 0 auto;\n  align-items: center;\n  justify-content: center;\n  padding: 0 18px;\n  border: 1.5px solid #ef1b23;\n  border-radius: 12px;\n  background: #ffffff;\n  color: #ef1b23;\n  cursor: pointer;\n  font-size: 16px;\n  font-weight: 700;\n  line-height: 1;\n}\n\n.cc-dc-kitchen-addButton:hover,\n.cc-dc-kitchen-addButton:focus-visible {\n  background: #fff4f5;\n}\n\n/* ======================================================\n   POPUP\n   Sized to match the Full Home / Villa modal footprint.\n   ====================================================== */\n\n.cc-dc-kitchen-modalOverlay {\n  position: fixed;\n  inset: 0;\n  z-index: 1200;\n  display: flex;\n  box-sizing: border-box;\n  padding: 16px;\n  align-items: center;\n  justify-content: center;\n  background: rgba(14, 14, 14, 0.72);\n}\n\n.cc-dc-kitchen-modal {\n  display: flex;\n  width: min(558px, calc(100vw - 32px));\n  height: min(640px, calc(100dvh - 32px));\n  min-height: 0;\n  overflow: hidden;\n  border: 1px solid #f1d7db;\n  border-radius: 20px;\n  background: #ffffff;\n  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.22);\n  flex-direction: column;\n}\n\n.cc-dc-kitchen-modalHeader {\n  display: flex;\n  box-sizing: border-box;\n  min-height: 150px;\n  flex: 0 0 auto;\n  gap: 18px;\n  padding: 34px 32px 27px;\n  align-items: flex-start;\n  justify-content: space-between;\n  border-bottom: 1px solid #eeeeee;\n  background: #ffffff;\n}\n\n.cc-dc-kitchen-modalHeader h2 {\n  margin: 0;\n  color: #161616;\n  font-size: 28px;\n  font-weight: 750;\n  line-height: 1.16;\n  letter-spacing: -0.025em;\n}\n\n.cc-dc-kitchen-modalHeader p {\n  max-width: 410px;\n  margin: 10px 0 0;\n  color: #626262;\n  font-size: 14px;\n  line-height: 1.5;\n}\n\n.cc-dc-kitchen-closeButton {\n  display: inline-flex;\n  width: 48px;\n  height: 48px;\n  min-width: 48px;\n  flex: 0 0 48px;\n  align-items: center;\n  justify-content: center;\n  margin: -18px -18px 0 0;\n  border: 1px solid #eeeeee;\n  border-radius: 50%;\n  background: #ffffff;\n  color: #171717;\n  cursor: pointer;\n  font-size: 29px;\n  font-weight: 400;\n  line-height: 1;\n  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.05);\n}\n\n.cc-dc-kitchen-modalBody {\n  min-height: 0;\n  flex: 1 1 auto;\n  overflow-x: hidden;\n  overflow-y: auto;\n  padding: 28px 32px 34px;\n  overscroll-behavior: contain;\n  scrollbar-width: none;\n  -ms-overflow-style: none;\n  -webkit-overflow-scrolling: touch;\n}\n\n.cc-dc-kitchen-modalBody::-webkit-scrollbar {\n  display: none;\n  width: 0;\n  height: 0;\n}\n\n/* ======================================================\n   POPUP PRICING\n   ====================================================== */\n\n.cc-dc-kitchen-modalSection {\n  width: 100%;\n}\n\n.cc-dc-kitchen-modalSection + .cc-dc-kitchen-modalSection,\n.cc-dc-kitchen-ratingSection {\n  margin-top: 30px;\n  padding-top: 28px;\n  border-top: 1px solid #e9eaec;\n}\n\n.cc-dc-kitchen-modalSection h3 {\n  margin: 0 0 19px;\n  color: #5c6678;\n  font-size: 18px;\n  font-weight: 700;\n  line-height: 1.3;\n}\n\n.cc-dc-kitchen-pricingGrid {\n  display: grid;\n  width: 100%;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 10px;\n}\n\n.cc-dc-kitchen-priceCard {\n  display: flex;\n  box-sizing: border-box;\n  min-height: 168px;\n  padding: 16px 13px;\n  border: 1px solid #dfe2e7;\n  border-radius: 10px;\n  background: #ffffff;\n  flex-direction: column;\n  align-items: flex-start;\n}\n\n.cc-dc-kitchen-optionLabel {\n  color: #303746;\n  font-size: 15px;\n  font-weight: 400;\n  line-height: 1.42;\n}\n\n.cc-dc-kitchen-priceCard strong {\n  margin-top: 20px;\n  color: #525d6f;\n  font-size: 16px;\n  font-weight: 700;\n  line-height: 1.25;\n}\n\n.cc-dc-kitchen-priceCard button {\n  display: inline-flex;\n  min-width: 85px;\n  min-height: 42px;\n  margin-top: auto;\n  padding: 0 18px;\n  align-items: center;\n  justify-content: center;\n  border: 1.5px solid #ef1b23;\n  border-radius: 9px;\n  background: #ffffff;\n  color: #ef1b23;\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 700;\n}\n\n.cc-dc-kitchen-priceCard button:hover,\n.cc-dc-kitchen-priceCard button:focus-visible {\n  background: #ef1b23;\n  color: #ffffff;\n}\n\n/* ======================================================\n   PROCESS / INCLUDED\n   ====================================================== */\n\n.cc-dc-kitchen-processList {\n  display: flex;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n  flex-direction: column;\n  gap: 18px;\n}\n\n.cc-dc-kitchen-processList li {\n  display: grid;\n  grid-template-columns: 29px minmax(0, 1fr);\n  gap: 3px;\n}\n\n.cc-dc-kitchen-processNumber {\n  color: #7b8495;\n  font-size: 15px;\n  line-height: 1.45;\n}\n\n.cc-dc-kitchen-processList strong {\n  color: #606a7c;\n  font-size: 16px;\n  font-weight: 500;\n  line-height: 1.4;\n}\n\n.cc-dc-kitchen-processList p {\n  margin: 4px 0 0;\n  color: #7b8598;\n  font-size: 14px;\n  font-weight: 400;\n  line-height: 1.55;\n}\n\n.cc-dc-kitchen-simpleList {\n  display: flex;\n  margin: 0;\n  padding: 0 0 0 21px;\n  color: #697387;\n  flex-direction: column;\n  gap: 14px;\n}\n\n.cc-dc-kitchen-simpleList li {\n  padding-left: 5px;\n  font-size: 15px;\n  line-height: 1.45;\n}\n\n/* ======================================================\n   RATING\n   ====================================================== */\n\n.cc-dc-kitchen-ratingSection {\n  padding-bottom: 8px;\n}\n\n.cc-dc-kitchen-ratingSummary {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n\n.cc-dc-kitchen-goldStar {\n  color: #f6b900;\n  font-size: 28px;\n  line-height: 1;\n}\n\n.cc-dc-kitchen-ratingSummary strong {\n  color: #586171;\n  font-size: 34px;\n  font-weight: 700;\n  line-height: 1;\n}\n\n.cc-dc-kitchen-ratingReviewCount {\n  margin: 10px 0 24px;\n  color: #7e8797;\n  font-size: 14px;\n  line-height: 1.4;\n}\n\n.cc-dc-kitchen-ratingBars {\n  display: flex;\n  width: 100%;\n  flex-direction: column;\n  gap: 15px;\n}\n\n.cc-dc-kitchen-ratingBarRow {\n  display: grid;\n  width: 100%;\n  grid-template-columns: 34px minmax(0, 1fr) 43px;\n  gap: 10px;\n  align-items: center;\n}\n\n.cc-dc-kitchen-ratingLabel {\n  display: inline-flex;\n  align-items: center;\n  gap: 2px;\n  color: #596273;\n  font-size: 14px;\n  line-height: 1;\n}\n\n.cc-dc-kitchen-ratingLabel span {\n  color: #f6b900;\n}\n\n.cc-dc-kitchen-ratingTrack {\n  display: block;\n  width: 100%;\n  height: 6px;\n  overflow: hidden;\n  border-radius: 999px;\n  background: #d4d4d4;\n}\n\n.cc-dc-kitchen-ratingFill {\n  display: block;\n  height: 100%;\n  border-radius: inherit;\n  background: #ef1b23;\n}\n\n.cc-dc-kitchen-ratingPercent {\n  color: #7c8595;\n  font-size: 13px;\n  text-align: right;\n}\n\n/* ======================================================\n   TABLET\n   ====================================================== */\n\n@media (max-width: 1050px) {\n  .cc-dc-kitchen-container {\n    width: min(920px, calc(100% - 32px));\n  }\n\n  .cc-dc-kitchen-contentLayout {\n    grid-template-columns:\n      minmax(0, 1fr)\n      300px;\n    gap: 24px;\n  }\n\n  .cc-dc-kitchen-serviceSelector {\n    gap: 16px;\n  }\n}\n\n/* ======================================================\n   PHONE\n   ====================================================== */\n\n@media (max-width: 760px) {\n  .cc-dc-kitchen-container {\n    width: 100%;\n    padding: 14px 12px 42px;\n  }\n\n  .cc-dc-kitchen-serviceSelector {\n    width: 100%;\n    gap: 11px;\n    padding: 2px 0 8px;\n    overflow-x: auto;\n    overflow-y: hidden;\n    scroll-snap-type: x proximity;\n    scrollbar-width: none;\n    -webkit-overflow-scrolling: touch;\n  }\n\n  .cc-dc-kitchen-serviceSelector::-webkit-scrollbar {\n    display: none;\n  }\n\n  .cc-dc-kitchen-selectorItem {\n    width: 76px;\n    min-width: 76px;\n    flex: 0 0 76px;\n    scroll-snap-align: start;\n  }\n\n  .cc-dc-kitchen-selectorImage {\n    width: 62px;\n    height: 62px;\n    flex-basis: 62px;\n  }\n\n  .cc-dc-kitchen-selectorLabel {\n    width: 76px;\n    font-size: 10.5px;\n    line-height: 1.14;\n  }\n\n  .cc-dc-kitchen-selectorDivider {\n    margin: 10px 0 20px;\n  }\n\n  .cc-dc-kitchen-contentLayout {\n    display: block;\n  }\n\n  .cc-dc-kitchen-sidebarColumn {\n    position: static;\n    width: 100%;\n    margin-top: 20px;\n  }\n\n  .cc-dc-kitchen-serviceGroup {\n    padding-bottom: 26px;\n    scroll-margin-top: 150px;\n  }\n\n  .cc-dc-kitchen-serviceGroup + .cc-dc-kitchen-serviceGroup {\n    padding-top: 27px;\n  }\n\n  .cc-dc-kitchen-serviceGroup \u003e h2 {\n    margin-bottom: 17px;\n    font-size: 29px;\n  }\n\n  .cc-dc-kitchen-serviceList {\n    gap: 24px;\n  }\n\n  .cc-dc-kitchen-serviceCard {\n    padding-bottom: 15px;\n  }\n\n  .cc-dc-kitchen-bannerPlaceholder {\n    width: 100%;\n    aspect-ratio: 16 / 8.2;\n    border-radius: 11px;\n  }\n\n  .cc-dc-kitchen-serviceDetails {\n    padding-top: 13px;\n  }\n\n  .cc-dc-kitchen-serviceMainRow {\n    gap: 8px;\n  }\n\n  .cc-dc-kitchen-serviceTitle {\n    font-size: 16px;\n  }\n\n  .cc-dc-kitchen-ratingRow {\n    gap: 4px;\n    margin-top: 7px;\n    font-size: 11.5px;\n  }\n\n  .cc-dc-kitchen-ratingIcon {\n    width: 18px;\n    height: 18px;\n    min-width: 18px;\n    flex-basis: 18px;\n    font-size: 9px;\n  }\n\n  .cc-dc-kitchen-reviewText,\n  .cc-dc-kitchen-detailsButton {\n    white-space: nowrap;\n  }\n\n  .cc-dc-kitchen-detailsButton {\n    margin-left: 2px;\n    font-size: 11.5px;\n  }\n\n  .cc-dc-kitchen-priceRow {\n    margin-top: 8px;\n    font-size: 12px;\n  }\n\n  .cc-dc-kitchen-addButton {\n    min-width: 74px;\n    min-height: 44px;\n    padding: 0 10px;\n    border-radius: 10px;\n    font-size: 14px;\n  }\n\n  /*\n   * Same popup concept on phone,\n   * automatically fitted to the available screen.\n   */\n  .cc-dc-kitchen-modalOverlay {\n    padding: 0;\n    align-items: flex-end;\n  }\n\n  .cc-dc-kitchen-modal {\n    width: 100%;\n    height: min(640px, 92dvh);\n    max-height: 92dvh;\n    border-width: 1px 0 0;\n    border-radius: 20px 20px 0 0;\n  }\n\n  .cc-dc-kitchen-modalHeader {\n    min-height: 125px;\n    padding: 22px 18px 18px;\n  }\n\n  .cc-dc-kitchen-modalHeader h2 {\n    font-size: 23px;\n  }\n\n  .cc-dc-kitchen-modalHeader p {\n    margin-top: 7px;\n    font-size: 12px;\n  }\n\n  .cc-dc-kitchen-closeButton {\n    width: 42px;\n    height: 42px;\n    min-width: 42px;\n    flex-basis: 42px;\n    margin: -8px -7px 0 0;\n    font-size: 25px;\n  }\n\n  .cc-dc-kitchen-modalBody {\n    padding: 20px 15px 28px;\n  }\n\n  .cc-dc-kitchen-pricingGrid {\n    grid-template-columns:\n      repeat(2, minmax(0, 1fr));\n    gap: 8px;\n  }\n\n  .cc-dc-kitchen-priceCard {\n    min-height: 142px;\n    padding: 12px;\n  }\n\n  .cc-dc-kitchen-optionLabel {\n    font-size: 13px;\n  }\n\n  .cc-dc-kitchen-priceCard strong {\n    margin-top: 15px;\n    font-size: 15px;\n  }\n\n  .cc-dc-kitchen-priceCard button {\n    min-width: 76px;\n    min-height: 39px;\n    padding: 0 14px;\n    font-size: 13px;\n  }\n\n  .cc-dc-kitchen-modalSection h3 {\n    font-size: 17px;\n  }\n\n  .cc-dc-kitchen-processList {\n    gap: 15px;\n  }\n\n  .cc-dc-kitchen-processList strong {\n    font-size: 14px;\n  }\n\n  .cc-dc-kitchen-processList p {\n    font-size: 12px;\n  }\n\n  .cc-dc-kitchen-simpleList li {\n    font-size: 13px;\n  }\n\n  .cc-dc-kitchen-ratingSummary strong {\n    font-size: 31px;\n  }\n\n  .cc-dc-kitchen-goldStar {\n    font-size: 25px;\n  }\n\n  .cc-dc-kitchen-ratingBarRow {\n    grid-template-columns:\n      31px\n      minmax(0, 1fr)\n      38px;\n    gap: 8px;\n  }\n}\n\n@media (max-width: 360px) {\n  .cc-dc-kitchen-serviceTitle {\n    font-size: 15px;\n  }\n\n  .cc-dc-kitchen-ratingRow {\n    gap: 3px;\n    font-size: 10.5px;\n  }\n\n  .cc-dc-kitchen-detailsButton {\n    font-size: 10.5px;\n  }\n\n  .cc-dc-kitchen-addButton {\n    min-width: 66px;\n    padding: 0 7px;\n  }\n}\r\n\r\n/* CITY_COOLIES_LIVING_EXACT_FULLHOME_MATCH_START */\n\n/*\n * Desktop:\n * Keep the same centered position,\n * but use the compact Full Home column dimensions.\n *\n * Main service column: 590px\n * Gap:                 28px\n * Right sidebar:       310px\n *\n * Total visual width:  928px\n */\n@media (min-width: 981px) {\n  .cc-dc-kitchen-container {\n    box-sizing: border-box !important;\n\n    width: 928px !important;\n    max-width: calc(100% - 32px) !important;\n\n    margin-left: auto !important;\n    margin-right: auto !important;\n  }\n\n  .cc-dc-kitchen-contentLayout {\n    display: grid !important;\n\n    width: 100% !important;\n\n    grid-template-columns:\n      minmax(0, 590px)\n      minmax(270px, 310px) !important;\n\n    column-gap: 28px !important;\n    row-gap: 0 !important;\n\n    align-items: start !important;\n  }\n\n  .cc-dc-kitchen-mainColumn {\n    box-sizing: border-box !important;\n\n    width: 590px !important;\n    max-width: 590px !important;\n    min-width: 0 !important;\n  }\n\n  .cc-dc-kitchen-sidebarColumn {\n    box-sizing: border-box !important;\n\n    width: 310px !important;\n    max-width: 310px !important;\n    min-width: 270px !important;\n  }\n}\n\n/*\n * Match Full Home service-banner proportions.\n * Images will be added later.\n */\n.cc-dc-kitchen-bannerPlaceholder {\n  box-sizing: border-box !important;\n\n  width: 100% !important;\n\n  height: 250px !important;\n  min-height: 250px !important;\n  max-height: 250px !important;\n\n  aspect-ratio: auto !important;\n\n  overflow: hidden !important;\n\n  border: 1px solid #f3ccd2 !important;\n  border-radius: 12px !important;\n\n  background: #fff7f8 !important;\n}\n\n/*\n * Match Full Home Add button exactly.\n */\n.cc-dc-kitchen-addButton {\n  box-sizing: border-box !important;\n\n  width: auto !important;\n  min-width: 86px !important;\n\n  height: 42px !important;\n  min-height: 42px !important;\n\n  padding: 8px 20px !important;\n\n  border: 1px solid #ef1b23 !important;\n  border-radius: 9px !important;\n\n  background: #ffffff !important;\n  color: #ef1b23 !important;\n\n  font-size: 15px !important;\n  font-weight: 650 !important;\n  line-height: 1 !important;\n}\n\n/*\n * Match the compact Full Home desktop popup.\n */\n.cc-dc-kitchen-modal {\n  box-sizing: border-box !important;\n\n  width: 560px !important;\n  max-width: calc(100vw - 32px) !important;\n\n  height: 650px !important;\n  max-height: calc(100dvh - 70px) !important;\n\n  min-height: 0 !important;\n\n  overflow: hidden !important;\n\n  border-radius: 16px !important;\n}\n\n/*\n * Only popup content scrolls.\n * The visible scrollbar remains hidden.\n */\n.cc-dc-kitchen-modalBody {\n  min-height: 0 !important;\n\n  flex: 1 1 auto !important;\n\n  overflow-x: hidden !important;\n  overflow-y: auto !important;\n\n  overscroll-behavior: contain !important;\n\n  scrollbar-width: none !important;\n  -ms-overflow-style: none !important;\n\n  -webkit-overflow-scrolling: touch !important;\n}\n\n.cc-dc-kitchen-modalBody::-webkit-scrollbar {\n  display: none !important;\n\n  width: 0 !important;\n  height: 0 !important;\n}\n\n/*\n * Phone:\n * Match the Full Home mobile banner and Add button.\n */\n@media (max-width: 760px) {\n  .cc-dc-kitchen-bannerPlaceholder {\n    width: 100% !important;\n\n    height: 190px !important;\n    min-height: 190px !important;\n    max-height: 190px !important;\n\n    aspect-ratio: auto !important;\n  }\n\n  .cc-dc-kitchen-addButton {\n    width: auto !important;\n    min-width: 72px !important;\n\n    height: 39px !important;\n    min-height: 39px !important;\n\n    padding: 7px 15px !important;\n\n    border-radius: 9px !important;\n\n    font-size: 14px !important;\n  }\n}\n\n/*\n * Small phone popup:\n * Fit automatically to the complete device screen.\n */\n@media (max-width: 620px) {\n  .cc-dc-kitchen-modalOverlay {\n    box-sizing: border-box !important;\n\n    padding: 0 !important;\n\n    align-items: stretch !important;\n    justify-content: stretch !important;\n  }\n\n  .cc-dc-kitchen-modal {\n    width: 100% !important;\n    max-width: 100% !important;\n\n    height: 100dvh !important;\n    max-height: 100dvh !important;\n\n    border-radius: 0 !important;\n  }\n}\n\n/* CITY_COOLIES_LIVING_EXACT_FULLHOME_MATCH_END */\r\n\r\n/* CITY_COOLIES_LIVING_RIGHT_DIVIDER_HOVER_START */\n\n/*\n * Match Full Home desktop vertical divider.\n * The line continues with the complete service column.\n */\n@media (min-width: 1021px) {\n  .cc-dc-kitchen-mainColumn {\n    box-sizing: border-box !important;\n\n    border-left: 0 !important;\n\n    border-right:\n      1px solid #f4d9de !important;\n\n    padding-bottom:\n      80px !important;\n  }\n}\n\n/*\n * Match Full Home Add button hover exactly.\n */\n.cc-dc-kitchen-addButton:hover {\n  background:\n    #ef1b23 !important;\n\n  color:\n    #ffffff !important;\n}\n\n/*\n * Keyboard users receive the same visual state.\n */\n.cc-dc-kitchen-addButton:focus-visible {\n  background:\n    #ef1b23 !important;\n\n  color:\n    #ffffff !important;\n\n  outline:\n    2px solid rgba(239, 27, 35, 0.35);\n\n  outline-offset:\n    2px;\n}\n\n/*\n * No vertical divider when the layout stacks\n * on tablet or phone.\n */\n@media (max-width: 1020px) {\n  .cc-dc-kitchen-mainColumn {\n    border-right:\n      0 !important;\n\n    padding-bottom:\n      0 !important;\n  }\n}\n\n/* CITY_COOLIES_LIVING_RIGHT_DIVIDER_HOVER_END */\r\n\r\n/* CITY_COOLIES_LIVING_COMPACT_GAPS_START */\n\n/*\n * Keep Living \u0026 Bedroom service sections compact.\n *\n * This reduces only vertical spacing.\n * No widths, banners, buttons or sidebar are changed.\n */\n\n/* Fabric sofa -\u003e Leather sofa */\n.cc-dc-kitchen-serviceList {\n  gap: 18px !important;\n}\n\n/* Space after the final service in each section */\n.cc-dc-kitchen-serviceGroup {\n  padding-bottom: 12px !important;\n}\n\n/* Leather sofa -\u003e Mattress, Mattress -\u003e Carpet, etc. */\n.cc-dc-kitchen-serviceGroup + .cc-dc-kitchen-serviceGroup {\n  padding-top: 16px !important;\n}\n\n/*\n * Phone version stays compact without making\n * the service cards feel crowded.\n */\n@media (max-width: 760px) {\n  .cc-dc-kitchen-serviceList {\n    gap: 16px !important;\n  }\n\n  .cc-dc-kitchen-serviceGroup {\n    padding-bottom: 10px !important;\n  }\n\n  .cc-dc-kitchen-serviceGroup + .cc-dc-kitchen-serviceGroup {\n    padding-top: 14px !important;\n  }\n}\n\n/* CITY_COOLIES_LIVING_COMPACT_GAPS_END */\r\n\r\n/* CITY_COOLIES_LIVING_HEADING_MATCH_START */\n\n/*\n * Match Living \u0026 Bedroom section headings\n * with the Full Home section-heading scale.\n */\n.cc-dc-kitchen-serviceGroup \u003e h2 {\n  margin-bottom: 28px !important;\n\n  font-size: 32px !important;\n  font-weight: 700 !important;\n  line-height: 1.18 !important;\n\n  letter-spacing: -0.025em !important;\n}\n\n@media (max-width: 760px) {\n  .cc-dc-kitchen-serviceGroup \u003e h2 {\n    margin-bottom: 22px !important;\n\n    font-size: 24px !important;\n    line-height: 1.18 !important;\n  }\n}\n\n/* CITY_COOLIES_LIVING_HEADING_MATCH_END */\r\n\r\n/* CITY_COOLIES_LIVING_SELECTOR_IMAGES_START */\n\n/*\n * Living \u0026 Bedroom service selector images.\n * Direct image.\n * No card background.\n * No border.\n * No shadow.\n * No zoom.\n * No crop.\n */\n.cc-dc-kitchen-selectorImage {\n  background-color: transparent !important;\n  background-repeat: no-repeat !important;\n  background-position: center center !important;\n  background-size: contain !important;\n\n  border: 0 !important;\n  border-radius: 0 !important;\n  box-shadow: none !important;\n\n  padding: 0 !important;\n  transform: none !important;\n  filter: none !important;\n}\n\n/* Sofa Cleaning */\n.cc-dc-kitchen-selectorItem:nth-child(1) .cc-dc-kitchen-selectorImage {\n  background-image: url(\"/deep-cleaning/sofa_cleaning_in_cozy_living_room.webp\") !important;\n}\n\n/* Mattress Cleaning */\n.cc-dc-kitchen-selectorItem:nth-child(2) .cc-dc-kitchen-selectorImage {\n  background-image: url(\"/deep-cleaning/mattress_cleaning.webp\") !important;\n}\n\n/* Carpet Cleaning */\n.cc-dc-kitchen-selectorItem:nth-child(3) .cc-dc-kitchen-selectorImage {\n  background-image: url(\"/deep-cleaning/carpet_cleaning.webp\") !important;\n}\n\n/* Curtain Cleaning */\n.cc-dc-kitchen-selectorItem:nth-child(4) .cc-dc-kitchen-selectorImage {\n  background-image: url(\"/deep-cleaning/_curtain_cleaning_modern_living_r.webp\") !important;\n}\n\n/* Dining Table Cleaning */\n.cc-dc-kitchen-selectorItem:nth-child(5) .cc-dc-kitchen-selectorImage {\n  background-image: url(\"/deep-cleaning/cleaner_in_cozy_dining_Table.webp\") !important;\n}\n\n@media (max-width: 1020px) {\n  .cc-dc-kitchen-selectorImage {\n    background-size: contain !important;\n    background-position: center center !important;\n  }\n}\n\n@media (max-width: 620px) {\n  .cc-dc-kitchen-selectorImage {\n    background-size: contain !important;\n    background-position: center center !important;\n  }\n}\n\n/* CITY_COOLIES_LIVING_SELECTOR_IMAGES_END */\r\n\n/* CITY_COOLIES_FABRIC_SOFA_MAIN_BANNER_START */\n\n/*\n * Fabric Sofa Cleaning banner.\n * Image is shown directly on the page.\n * No card, no visible background, no border.\n * Complete image remains visible.\n */\n.cc-dc-kitchen-bannerPlaceholder[data-service-id=\"fabric-sofa-cleaning\"] {\n  background-image:\n    url(\"/deep-cleaning/sofa_cleaning_service_banner.webp\") !important;\n\n  background-repeat: no-repeat !important;\n  background-position: center center !important;\n  background-size: contain !important;\n\n  background-color: transparent !important;\n\n  border: 0 !important;\n  border-radius: 0 !important;\n  box-shadow: none !important;\n  outline: 0 !important;\n\n  padding: 0 !important;\n\n  overflow: visible !important;\n}\n\n/* CITY_COOLIES_FABRIC_SOFA_MAIN_BANNER_END */\r\n\r\n/* CITY_COOLIES_SOFA_DIVIDER_GAP_FIX_START */\n\n/*\n * Remove the empty space between the service image\n * and the right-side vertical divider.\n */\n@media (min-width: 1021px) {\n  .cc-dc-kitchen-mainColumn {\n    padding-right: 0 !important;\n  }\n\n  .cc-dc-kitchen-bannerPlaceholder[data-service-id=\"fabric-sofa-cleaning\"] {\n    display: block !important;\n\n    width: 100% !important;\n    max-width: none !important;\n\n    height: auto !important;\n    min-height: 0 !important;\n    max-height: none !important;\n\n    aspect-ratio: 1916 / 821 !important;\n\n    margin-left: 0 !important;\n    margin-right: 0 !important;\n\n    padding: 0 !important;\n\n    background-image:\n      url(\"/deep-cleaning/sofa_cleaning_service_banner.webp\") !important;\n\n    background-repeat: no-repeat !important;\n    background-position: center center !important;\n    background-size: contain !important;\n\n    background-color: transparent !important;\n\n    border: 0 !important;\n    border-radius: 0 !important;\n    box-shadow: none !important;\n  }\n}\n\n/*\n * Phone and tablet:\n * preserve full image without crop.\n */\n@media (max-width: 1020px) {\n  .cc-dc-kitchen-bannerPlaceholder[data-service-id=\"fabric-sofa-cleaning\"] {\n    display: block !important;\n\n    width: 100% !important;\n    max-width: 100% !important;\n\n    height: auto !important;\n    min-height: 0 !important;\n    max-height: none !important;\n\n    aspect-ratio: 1916 / 821 !important;\n\n    margin: 0 !important;\n    padding: 0 !important;\n\n    background-size: contain !important;\n    background-position: center center !important;\n\n    border: 0 !important;\n    border-radius: 0 !important;\n    box-shadow: none !important;\n  }\n}\n\n/* CITY_COOLIES_SOFA_DIVIDER_GAP_FIX_END */\n\n\n/* CITY_COOLIES_LIVING_SHARED_POPUP_FINAL */\n.cc-dc-kitchen-modal {\n  box-sizing: border-box !important;\n  display: flex !important;\n  flex-direction: column !important;\n  width: min(480px, calc(100vw - 32px)) !important;\n  min-width: 0 !important;\n  max-width: calc(100vw - 32px) !important;\n  height: min(660px, calc(100dvh - 48px)) !important;\n  min-height: 0 !important;\n  max-height: calc(100dvh - 48px) !important;\n  overflow: hidden !important;\n  border-radius: 16px !important;\n}\n\n.cc-dc-kitchen-modalHeader {\n  box-sizing: border-box !important;\n  flex: 0 0 auto !important;\n  min-height: 0 !important;\n  padding: 20px 22px 18px !important;\n}\n\n.cc-dc-kitchen-modalHeader h2 {\n  font-size: 26px !important;\n  line-height: 1.2 !important;\n}\n\n.cc-dc-kitchen-modalBody {\n  box-sizing: border-box !important;\n  flex: 1 1 auto !important;\n  min-width: 0 !important;\n  min-height: 0 !important;\n  padding: 16px 22px 20px !important;\n  overflow-x: hidden !important;\n  overflow-y: auto !important;\n}\n\n.cc-dc-kitchen-pricingGrid {\n  display: grid !important;\n  width: 100% !important;\n  grid-template-columns: repeat(3, minmax(0, 1fr)) !important;\n  gap: 8px !important;\n}\n\n.cc-dc-kitchen-priceCard {\n  box-sizing: border-box !important;\n  width: 100% !important;\n  min-width: 0 !important;\n  height: auto !important;\n  min-height: 90px !important;\n  max-height: none !important;\n  padding: 9px !important;\n}\n\n.cc-dc-kitchen-priceCard strong {\n  margin-top: 3px !important;\n  color: #171717 !important;\n}\n\n.cc-dc-kitchen-priceCard button {\n  min-width: 66px !important;\n  min-height: 30px !important;\n  height: 30px !important;\n  margin-top: auto !important;\n  padding: 0 9px !important;\n  font-size: 12px !important;\n}\n\n.cc-dc-kitchen-priceCard:has(button[aria-pressed=\"true\"]) {\n  border-color: #ef1b23 !important;\n  background: #fff8f9 !important;\n}\n\n.cc-dc-kitchen-priceCard button[aria-pressed=\"true\"] {\n  background: #ef1b23 !important;\n  color: #ffffff !important;\n}\n\n.cc-dc-kitchen-selectionFooter {\n  box-sizing: border-box;\n  display: flex;\n  flex: 0 0 auto;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  width: 100%;\n  padding: 10px 22px;\n  border-top: 1px solid #eeeeee;\n  background: #ffffff;\n}\n\n.cc-dc-kitchen-selectionSummary {\n  display: flex;\n  min-width: 0;\n  flex-direction: column;\n  gap: 3px;\n}\n\n.cc-dc-kitchen-selectionCaption {\n  color: #737373;\n  font-size: 12px;\n}\n\n.cc-dc-kitchen-selectionValue {\n  overflow: hidden;\n  color: #171717;\n  font-size: 14px;\n  font-weight: 700;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.cc-dc-kitchen-continueButton {\n  flex: 0 0 auto;\n  min-width: 118px;\n  min-height: 42px;\n  padding: 8px 14px;\n  border: 1px solid #ef1b23;\n  border-radius: 10px;\n  background: #ef1b23;\n  color: #ffffff;\n  font: inherit;\n  font-weight: 700;\n  cursor: pointer;\n}\n\n.cc-dc-kitchen-continueButton:disabled {\n  border-color: #e3e3e3;\n  background: #f2f3f5;\n  color: #999999;\n  cursor: not-allowed;\n}\n\n@media (max-width: 620px) {\n  .cc-dc-kitchen-modal {\n    width: calc(100vw - 20px) !important;\n    max-width: calc(100vw - 20px) !important;\n    height: calc(100dvh - 20px) !important;\n    max-height: calc(100dvh - 20px) !important;\n    border-radius: 16px !important;\n  }\n\n  .cc-dc-kitchen-modalHeader {\n    padding: 18px 16px 16px !important;\n  }\n\n  .cc-dc-kitchen-modalHeader h2 {\n    font-size: 23px !important;\n  }\n\n  .cc-dc-kitchen-modalBody {\n    padding: 16px 14px !important;\n  }\n\n  .cc-dc-kitchen-pricingGrid {\n    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;\n    gap: 8px !important;\n  }\n\n  .cc-dc-kitchen-priceCard {\n    min-height: 90px !important;\n    padding: 9px !important;\n  }\n\n  .cc-dc-kitchen-selectionFooter {\n    padding: 10px 14px calc(10px + env(safe-area-inset-bottom));\n  }\n\n  .cc-dc-kitchen-continueButton {\n    min-width: 108px;\n    min-height: 40px;\n  }\n}\n/* CITY_COOLIES_LIVING_SHARED_POPUP_FINAL_END */\n/* CITY_COOLIES_LEATHER_SOFA_BANNER_START */\n/* Show the complete Leather sofa image directly in its page banner. */\n.cc-dc-kitchen-bannerPlaceholder[data-service-id=\"leather-sofa-cleaning\"] {\n  display: block !important;\n  box-sizing: border-box !important;\n  width: 100% !important;\n  max-width: 100% !important;\n  height: auto !important;\n  min-height: 0 !important;\n  max-height: none !important;\n  aspect-ratio: 1916 / 821 !important;\n  margin: 0 !important;\n  padding: 0 !important;\n  border: 0 !important;\n  border-radius: 0 !important;\n  box-shadow: none !important;\n  background-color: transparent !important;\n  background-image: url(\"/deep-cleaning/leather_sofa_cleaning_service_banner.webp\") !important;\n  background-repeat: no-repeat !important;\n  background-position: center center !important;\n  background-size: contain !important;\n}\n/* CITY_COOLIES_LEATHER_SOFA_BANNER_END */\n/* CITY_COOLIES_MATTRESS_BANNER_START */\n/* Show the complete mattress-cleaning image directly in its service banner. */\n.cc-dc-kitchen-bannerPlaceholder[data-service-id=\"mattress-cleaning\"] {\n  display: block !important;\n  box-sizing: border-box !important;\n  width: 100% !important;\n  max-width: 100% !important;\n  height: auto !important;\n  min-height: 0 !important;\n  max-height: none !important;\n  aspect-ratio: 1916 / 821 !important;\n  margin: 0 !important;\n  padding: 0 !important;\n  border: 0 !important;\n  border-radius: 0 !important;\n  box-shadow: none !important;\n  background-color: transparent !important;\n  background-image: url(\"/deep-cleaning/mattress_cleaning_service_banner.webp\") !important;\n  background-repeat: no-repeat !important;\n  background-position: center center !important;\n  background-size: contain !important;\n}\n/* CITY_COOLIES_MATTRESS_BANNER_END */\n/* CITY_COOLIES_CARPET_BANNER_START */\n/* Display the full carpet-cleaning image directly in its page banner. */\n.cc-dc-kitchen-bannerPlaceholder[data-service-id=\"carpet-cleaning\"] {\n  display: block !important;\n  box-sizing: border-box !important;\n  width: 100% !important;\n  max-width: 100% !important;\n  height: auto !important;\n  min-height: 0 !important;\n  max-height: none !important;\n  aspect-ratio: 1916 / 821 !important;\n  margin: 0 !important;\n  padding: 0 !important;\n  border: 0 !important;\n  border-radius: 0 !important;\n  box-shadow: none !important;\n  background-color: transparent !important;\n  background-image: url(\"/deep-cleaning/carpet_cleaning_service_banner.webp\") !important;\n  background-repeat: no-repeat !important;\n  background-position: center center !important;\n  background-size: contain !important;\n}\n/* CITY_COOLIES_CARPET_BANNER_END */\n/* CITY_COOLIES_CURTAIN_BANNER_START */\n/* Display the complete curtain-cleaning image directly in its page banner. */\n.cc-dc-kitchen-bannerPlaceholder[data-service-id=\"curtain-cleaning\"] {\n  display: block !important;\n  box-sizing: border-box !important;\n  width: 100% !important;\n  max-width: 100% !important;\n  height: auto !important;\n  min-height: 0 !important;\n  max-height: none !important;\n  aspect-ratio: 1916 / 821 !important;\n  margin: 0 !important;\n  padding: 0 !important;\n  border: 0 !important;\n  border-radius: 0 !important;\n  box-shadow: none !important;\n  background-color: transparent !important;\n  background-image: url(\"/deep-cleaning/curtain_cleaning_service_banner.webp\") !important;\n  background-repeat: no-repeat !important;\n  background-position: center center !important;\n  background-size: contain !important;\n}\n/* CITY_COOLIES_CURTAIN_BANNER_END */\r\n\r\n/* CITY_COOLIES_DINING_TABLE_BANNER_START */\n.cc-dc-kitchen-bannerPlaceholder[data-service-id=\"dining-table-cleaning\"] {\n  display: block !important;\n  box-sizing: border-box !important;\n  width: 100% !important;\n  max-width: 100% !important;\n  height: auto !important;\n  min-height: 0 !important;\n  max-height: none !important;\n  aspect-ratio: 1671 / 941 !important;\n  margin: 0 !important;\n  padding: 0 !important;\n  border: 0 !important;\n  border-radius: 0 !important;\n  box-shadow: none !important;\n  background-color: transparent !important;\n  background-image: url(\"/deep-cleaning/dining_table_cleaning_service_banner.webp\") !important;\n  background-repeat: no-repeat !important;\n  background-position: center center !important;\n  background-size: contain !important;\n}\n/* CITY_COOLIES_DINING_TABLE_BANNER_END */\r\n\r\n\n/* Kitchen-only adjustments. Service images will be added later. */\n.cc-dc-kitchen-bannerPlaceholder {\n  background-image: none;\n  background-color: #fff8f9;\n  background-size: contain;\n  background-position: center;\n  background-repeat: no-repeat;\n}\n\n.cc-dc-kitchen-quantityControl {\n  display: inline-flex;\n  flex: 0 0 auto;\n  align-items: center;\n  justify-content: space-between;\n  min-width: 104px;\n  height: 46px;\n  border: 1px solid #ef1b23;\n  border-radius: 10px;\n  color: #171717;\n  background: #fff;\n  font-size: 16px;\n}\n\n.cc-dc-kitchen-quantityControl button {\n  width: 34px;\n  height: 44px;\n  border: 0;\n  background: transparent;\n  color: #ef1b23;\n  cursor: pointer;\n  font: inherit;\n  font-size: 21px;\n}\n\n.cc-dc-kitchen-quantityControl button:focus-visible {\n  outline: 2px solid #ef1b23;\n  outline-offset: 2px;\n}\n\n@media (max-width: 760px) {\n  .cc-dc-kitchen-quantityControl {\n    min-width: 88px;\n    height: 42px;\n  }\n  .cc-dc-kitchen-quantityControl button {\n    width: 29px;\n    height: 40px;\n  }\n}\r\n\r\n/* KITCHEN_SELECTOR_NO_LIVING_IMAGES_START */\n.cc-dc-kitchen-section .cc-dc-kitchen-selectorItem .cc-dc-kitchen-selectorImage {\n  background-image: none !important;\n}\n/* KITCHEN_SELECTOR_NO_LIVING_IMAGES_END */\r\n\r\n/* KITCHEN_PAGE_BANNERS_START */\n.cc-dc-kitchen-bannerPlaceholder[data-service-id] {\n  display: block !important;\n  box-sizing: border-box !important;\n  width: 100% !important;\n  max-width: 100% !important;\n  height: auto !important;\n  min-height: 0 !important;\n  max-height: none !important;\n  aspect-ratio: 1926 / 816 !important;\n  margin: 0 !important;\n  padding: 0 !important;\n  overflow: hidden !important;\n  border: 0 !important;\n  border-radius: 0 !important;\n  box-shadow: none !important;\n  background-color: transparent !important;\n  background-repeat: no-repeat !important;\n  background-position: center center !important;\n  background-size: contain !important;\n}\n\n.cc-dc-kitchen-bannerPlaceholder[data-service-id=\"complete-kitchen-cleaning\"] {\n  background-image: url(\"/deep-cleaning/complete_kitchen_cleaning_service_banner.webp\") !important;\n}\n\n.cc-dc-kitchen-bannerPlaceholder[data-service-id=\"microwave-cleaning\"] {\n  background-image: url(\"/deep-cleaning/microwave_cleaning_service_banner.webp\") !important;\n}\n\n.cc-dc-kitchen-bannerPlaceholder[data-service-id=\"gas-stove-cleaning\"] {\n  background-image: url(\"/deep-cleaning/gas_stove_cleaning_service_banner.webp\") !important;\n}\n\n.cc-dc-kitchen-bannerPlaceholder[data-service-id=\"chimney-cleaning\"] {\n  background-image: url(\"/deep-cleaning/chimney_cleaning_service_banner.webp\") !important;\n}\n/* KITCHEN_PAGE_BANNERS_END */\r\n\r\n/* KITCHEN_SELECTOR_IMAGES_START */\n.cc-dc-kitchen-section .cc-dc-kitchen-serviceSelector .cc-dc-kitchen-selectorItem .cc-dc-kitchen-selectorImage {\n  display: block !important;\n  background-color: transparent !important;\n  background-repeat: no-repeat !important;\n  background-position: center center !important;\n  background-size: contain !important;\n}\n\n.cc-dc-kitchen-section .cc-dc-kitchen-serviceSelector .cc-dc-kitchen-selectorItem:nth-child(1) .cc-dc-kitchen-selectorImage {\n  background-image: url(\"/deep-cleaning/complete_kitchen_cleaning_service_banner.webp\") !important;\n}\n\n.cc-dc-kitchen-section .cc-dc-kitchen-serviceSelector .cc-dc-kitchen-selectorItem:nth-child(2) .cc-dc-kitchen-selectorImage {\n  background-image: url(\"/deep-cleaning/microwave_cleaning_service_banner.webp\") !important;\n}\n\n.cc-dc-kitchen-section .cc-dc-kitchen-serviceSelector .cc-dc-kitchen-selectorItem:nth-child(3) .cc-dc-kitchen-selectorImage {\n  background-image: url(\"/deep-cleaning/gas_stove_cleaning_service_banner.webp\") !important;\n}\n\n.cc-dc-kitchen-section .cc-dc-kitchen-serviceSelector .cc-dc-kitchen-selectorItem:nth-child(4) .cc-dc-kitchen-selectorImage {\n  background-image: url(\"/deep-cleaning/chimney_cleaning_service_banner.webp\") !important;\n}\n/* KITCHEN_SELECTOR_IMAGES_END */\r\n\r\n/* KITCHEN_SELECTOR_LARGE_IMAGES_START */\n.cc-dc-kitchen-section .cc-dc-kitchen-serviceSelector .cc-dc-kitchen-selectorItem .cc-dc-kitchen-selectorImage {\n  background-size: cover !important;\n  background-position: center center !important;\n  overflow: hidden !important;\n}\n/* KITCHEN_SELECTOR_LARGE_IMAGES_END */\r\n\r\n/* COMMERCIAL_KITCHEN_IMAGE_START */\n.cc-dc-kitchen-bannerPlaceholder[data-service-id=\"commercial-kitchen-cleaning\"] {\n  display: block !important;\n  width: 100% !important;\n  height: auto !important;\n  aspect-ratio: 1926 / 817 !important;\n  border: 0 !important;\n  border-radius: 0 !important;\n  background-color: transparent !important;\n  background-image: url(\"/deep-cleaning/commercial_kitchen_cleaning_service_banner.webp\") !important;\n  background-repeat: no-repeat !important;\n  background-position: center center !important;\n  background-size: contain !important;\n}\n\n.cc-dc-kitchen-section .cc-dc-kitchen-serviceSelector .cc-dc-kitchen-selectorItem:nth-child(5) .cc-dc-kitchen-selectorImage {\n  background-image: url(\"/deep-cleaning/commercial_kitchen_cleaning_service_banner.webp\") !important;\n  background-repeat: no-repeat !important;\n  background-position: center center !important;\n  background-size: cover !important;\n}\n/* COMMERCIAL_KITCHEN_IMAGE_END */\r\n\n\n\n/* CITY_COOLIES_DIVIDER_VISIBILITY_FIX */\n.cc-dc-kitchen-mainColumn {\n  border-right-color: transparent !important;\n  border-left-color: transparent !important;\n}\n\n.cc-dc-kitchen-serviceCard {\n  border-bottom-color: transparent !important;\n}\n\n.cc-dc-kitchen-serviceGroup + .cc-dc-kitchen-serviceGroup {\n  border-top-color: transparent !important;\n}\n/* END_CITY_COOLIES_DIVIDER_VISIBILITY_FIX */\n/* KITCHEN_PHONE_SIDEBAR_SCROLL_SPACE */\n@media (max-width: 760px) {\n  .cc-dc-kitchen-container {\n    padding-bottom: 100dvh !important;\n  }\n\n  .cc-dc-kitchen-sidebarColumn {\n    scroll-margin-top: 90px;\n  }\n}\n/* END_KITCHEN_PHONE_SIDEBAR_SCROLL_SPACE */";

export type Option = { id: string; label: string; price: number };
type Step = { title: string; description: string };
export type Service = {
  id: string;
  title: string;
  rating: number;
  reviews: number;
  options: readonly Option[];
  pricingTitle?: string;
  process: readonly Step[];
  included?: readonly string[];
  excluded?: readonly string[];
  distribution: readonly number[];
  directAdd?: boolean;
};

export const services: readonly Service[] = [
  {
    id: "complete-kitchen-cleaning",
    title: "Complete Kitchen Cleaning",
    rating: 4.2,
    reviews: 900,
    pricingTitle: "Choose your kitchen cleaning package",
    options: [
      { id: "cabinet-exterior", label: "Cabinet Exterior Only", price: 949 },
      { id: "cabinet-interior-exterior", label: "Cabinet Exterior & Interior", price: 1949 },
    ],
    process: [
      { title: "Inspection", description: "Technician checks the kitchen and confirms the package." },
      { title: "Basic kitchen cleaning", description: "Both packages include slab, sink, visible tiles, dusting, sweeping and floor mopping. Cabinet cleaning follows the selected package." },
      { title: "Final check", description: "All included areas are cleaned and verified before completion." },
    ],
    included: [
      "Clean countertops, tiles & cabinet exteriors",
      "Cabinet interior cleaning (only if selected in package)",
      "Sink & faucet cleaned and sanitized",
      "Neat stove area with dust-free surfaces",
      "Swept & mopped floor for a fresh kitchen",
    ],
    excluded: ["Deep appliance cleaning (unless added)", "Repairs or pest control"],
    distribution: [47, 34, 13, 4, 2],
  },
  {
    id: "microwave-cleaning",
    title: "Microwave Cleaning",
    rating: 4.1,
    reviews: 1263,
    options: [{ id: "standard", label: "Microwave Cleaning", price: 199 }],
    directAdd: true,
    process: [
      { title: "Exterior cleaning", description: "Outer surface and controls are cleaned for a polished finish." },
      { title: "Interior cleaning", description: "Interior is refreshed by removing marks, splashes & odour." },
      { title: "Back panel cleaning", description: "Rear panel is dusted to keep airflow smooth." },
    ],
    distribution: [44, 31, 15, 7, 3],
  },
  {
    id: "gas-stove-cleaning",
    title: "Gas Stove Cleaning",
    rating: 4.3,
    reviews: 1319,
    pricingTitle: "Select number of burners",
    options: [
      { id: "2-burners", label: "2 burners", price: 99 },
      { id: "3-burners", label: "3 burners", price: 149 },
      { id: "4-plus-burners", label: "4+ burners", price: 199 },
    ],
    process: [
      { title: "Top surface cleaning", description: "Stove top wiped to remove oil & stains." },
      { title: "Burner pore cleaning (basic)", description: "External burner holes cleaned for normal flame flow - no dismantling." },
      { title: "Knob & panel cleaning", description: "Knobs & panel wiped for a neat finish." },
    ],
    excluded: [
      "Internal burner or ignition repair",
      "Gas-line fixing or adjustment",
      "Burner/part replacement",
    ],
    distribution: [55, 28, 11, 4, 2],
  },
  {
    id: "chimney-cleaning",
    title: "Chimney Cleaning",
    rating: 4.4,
    reviews: 1241,
    pricingTitle: "Select chimney cleaning",
    options: [{ id: "standard", label: "Chimney Cleaning", price: 399 }],
    process: [
      { title: "Exterior cleaning", description: "Outer body is wiped to remove dust, grease & grime." },
      { title: "Interior surface cleaning", description: "Reachable inner surfaces are cleaned for better airflow." },
      { title: "Filter wipe-down", description: "Washable filters are cleaned to reduce oil deposits." },
    ],
    excluded: [
      "Removing/cleaning inside the motor",
      "Cleaning carbon filters or duct pipes",
      "Opening internal units",
      "Deep cleaning of automatic sensor chimneys",
      "Taking apart the internal structure",
    ],
    distribution: [60, 27, 8, 3, 2],
  },
  {
    id: "commercial-kitchen-cleaning",
    title: "Commercial Kitchen Cleaning",
    rating: 4.2,
    reviews: 0,
    options: [
      {
        id: "site-survey",
        label: "Site survey - final cleaning rate after survey",
        price: 500,
      },
    ],
    directAdd: true,
    process: [
      {
        title: "Book the site survey",
        description: "A site survey is booked for the commercial kitchen. The survey fee is charged at booking.",
      },
      {
        title: "Inspect the kitchen",
        description: "The kitchen size, equipment, grease build-up and cleaning requirements are assessed on site.",
      },
      {
        title: "Confirm the final rate",
        description: "The cleaning scope and final service rate are confirmed after the site survey.",
      },
    ],
    included: [
      "On-site assessment of the commercial kitchen",
      "Review of accessible cooking, preparation and cleaning areas",
      "Cleaning scope and final-rate discussion after inspection",
    ],
    excluded: [
      "The site survey fee does not include the cleaning service",
      "The final cleaning rate is confirmed after the site survey",
    ],
    distribution: [47, 34, 13, 4, 2],
  },
];

export const microwaveId = "kitchen:microwave-cleaning:standard";
export const money = (value: number) => `\u20B9${value.toLocaleString("en-IN")}`;


const KITCHEN_PAGE_CSS = `
.cc-dc-kitchen-detailsPage {
  box-sizing: border-box;
  width: min(1416px, calc(100% - 232px));
  max-width: 100%;
  min-height: 60vh;
  margin: 0 auto;
  padding: 36px 0 80px;
  color: #171717;
  background: #fff;
  overflow: visible;
}
.cc-dc-kitchen-pageTop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  width: 100%;
  margin-bottom: 62px;
}
.cc-dc-kitchen-pageBack {
  display: inline-flex;
  align-items: center;
  padding: 0;
  margin: 0;
  border: 0;
  background: transparent;
  color: #ef1b23;
  font: inherit;
  font-size: 17px;
  font-weight: 700;
  text-align: left;
  cursor: pointer;
}
.cc-dc-kitchen-pageBrand {
  color: #606060;
  font-size: 14px;
  text-align: right;
}
.cc-dc-kitchen-detailsPage .cc-dc-kitchen-modal {
  display: block !important;
  position: static !important;
  width: 100% !important;
  max-width: none !important;
  height: auto !important;
  max-height: none !important;
  overflow: visible !important;
  border: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
}
.cc-dc-kitchen-detailsPage .cc-dc-kitchen-modalHeader {
  display: block !important;
  padding: 0 28px 30px !important;
  min-height: 0 !important;
  border-bottom: 1px solid #eee !important;
}
.cc-dc-kitchen-detailsPage .cc-dc-kitchen-modalHeader h2 {
  font-size: clamp(28px, 3vw, 34px) !important;
  line-height: 1.2 !important;
}
.cc-dc-kitchen-detailsPage .cc-dc-kitchen-modalBody {
  display: block !important;
  box-sizing: border-box !important;
  width: 100% !important;
  height: auto !important;
  max-height: none !important;
  overflow: visible !important;
  padding: 30px 28px !important;
  overscroll-behavior: auto !important;
}
.cc-dc-kitchen-detailsPage .cc-dc-kitchen-pricingGrid {
  grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  gap: 12px !important;
}
.cc-dc-kitchen-detailsPage .cc-dc-kitchen-priceCard {
  min-height: 130px !important;
  padding: 16px !important;
}
.cc-dc-kitchen-detailsPage .cc-dc-kitchen-selectionFooter {
  position: fixed !important;
  left: 50% !important;
  right: auto !important;
  bottom: calc(12px + env(safe-area-inset-bottom, 0px)) !important;
  z-index: 1100 !important;
  display: flex !important;
  box-sizing: border-box !important;
  align-items: center !important;
  justify-content: space-between !important;
  gap: 12px !important;
  width: min(620px, calc(100% - 24px)) !important;
  height: auto !important;
  min-height: 64px !important;
  max-height: none !important;
  margin: 0 !important;
  padding: 10px 16px !important;
  transform: translateX(-50%) !important;
  border: 1px solid #eeeeee !important;
  border-radius: 12px !important;
  background: #ffffff !important;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12) !important;
}

.cc-dc-kitchen-detailsPage .cc-dc-kitchen-continueButton {
  flex: 0 0 auto;
  min-width: 108px;
  min-height: 40px;
}

@media (max-width: 700px) {
  .cc-dc-kitchen-detailsPage .cc-dc-kitchen-selectionFooter {
    width: calc(100% - 20px) !important;
    bottom: calc(8px + env(safe-area-inset-bottom, 0px)) !important;
    min-height: 60px !important;
    padding: 9px 12px !important;
  }
}
@media (max-width: 700px) {
  .cc-dc-kitchen-detailsPage {
    width: calc(100% - 28px);
    padding: 24px 0 56px;
  }
  .cc-dc-kitchen-pageTop {
    gap: 12px;
    margin-bottom: 36px;
  }
  .cc-dc-kitchen-pageBack {
    font-size: 14px;
  }
  .cc-dc-kitchen-pageBrand {
    font-size: 11px;
  }
  .cc-dc-kitchen-detailsPage .cc-dc-kitchen-modalHeader {
    padding: 0 0 24px !important;
  }
  .cc-dc-kitchen-detailsPage .cc-dc-kitchen-modalBody {
    padding: 24px 0 !important;
  }
  .cc-dc-kitchen-detailsPage .cc-dc-kitchen-selectionFooter {
    padding: 16px 0 !important;
  }
  .cc-dc-kitchen-detailsPage .cc-dc-kitchen-pricingGrid {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }
}
@media (max-width: 360px) {
  .cc-dc-kitchen-detailsPage .cc-dc-kitchen-pricingGrid {
    grid-template-columns: 1fr !important;
  }
}
`;

export default function KitchenServiceDetails({
  serviceId,
}: {
  serviceId: string;
}) {
  const service = services.find((item) => item.id === serviceId);
  const [selected, setSelected] = useState<Option | null>(null);
  const router = useRouter();
  const closeDetails = () => router.push("/services/deep-cleaning?category=kitchen-cleaning");
  const onAdd = (item: Service, option: Option) => {
    upsertServiceCartItem({
      id: `kitchen:${item.id}:${option.id}`,
      serviceTitle: item.title,
      optionLabel: option.label,
      price: option.price,
      priceLabel: money(option.price),
      duration: "Professional cleaning service",
    });
    if (window.matchMedia("(max-width: 760px)").matches) {
      window.sessionStorage.setItem("citycoolies:kitchen-scroll-cart", "1");
    }

    closeDetails();
  };
  if (!service) return <main className="cc-dc-kitchen-detailsPage"><div className="cc-dc-kitchen-pageTop"><button type="button" className="cc-dc-kitchen-pageBack" onClick={closeDetails}>← Back to Kitchen Cleaning</button><span className="cc-dc-kitchen-pageBrand">City Coolies · Deep Cleaning</span></div><p>Service not found.</p></main>;


  return (
    <main className="cc-dc-kitchen-detailsPage">
      <style>{DEEP_CLEANING_INLINE_CSS + KITCHEN_PAGE_CSS}</style>
      <div className="cc-dc-kitchen-pageTop"><button type="button" className="cc-dc-kitchen-pageBack" onClick={closeDetails}>← Back to Kitchen Cleaning</button><span className="cc-dc-kitchen-pageBrand">City Coolies · Deep Cleaning</span></div>
      <section
        className={"cc-dc-kitchen-modal"}
        aria-labelledby={`kitchen-modal-${service.id}`}
      >
        <header className={"cc-dc-kitchen-modalHeader"}>
          <div>
            <h2 id={`kitchen-modal-${service.id}`}>{service.title}</h2>
            <p>
              {service.directAdd
                ? (service.id === "commercial-kitchen-cleaning" ? `Site survey: ${money(500)}. Final cleaning rate is confirmed after the survey.` : `Starts at ${money(service.options[0].price)}`)
                : "Choose the option that matches your cleaning requirement."}
            </p>
          </div>
          
        </header>

        <div className={"cc-dc-kitchen-modalBody"}>
          {!service.directAdd && (
            <section className={"cc-dc-kitchen-modalSection"}>
              <h3>{service.pricingTitle}</h3>
              <div className={"cc-dc-kitchen-pricingGrid"}>
                {service.options.map((option) => (
                  <article key={option.id} className={"cc-dc-kitchen-priceCard"}>
                    <span className={"cc-dc-kitchen-optionLabel"}>{option.label}</span>
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

          <section className={"cc-dc-kitchen-modalSection"}>
            <h3>{service.id === "complete-kitchen-cleaning" ? "Our Process" : "How it works?"}</h3>
            <ol className={"cc-dc-kitchen-processList"}>
              {service.process.map((step, index) => (
                <li key={step.title}>
                  <span className={"cc-dc-kitchen-processNumber"}>{index + 1}.</span>
                  <div><strong>{step.title}</strong><p>{step.description}</p></div>
                </li>
              ))}
            </ol>
          </section>

          {!!service.included?.length && (
            <section className={"cc-dc-kitchen-modalSection"}>
              <h3>Included</h3>
              <ul className={"cc-dc-kitchen-simpleList"}>
                {service.included.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
          )}

          {!!service.excluded?.length && (
            <section className={"cc-dc-kitchen-modalSection"}>
              <h3>Not Included</h3>
              <ul className={"cc-dc-kitchen-simpleList"}>
                {service.excluded.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
          )}

          <section className={"cc-dc-kitchen-ratingSection"} aria-label={`${service.title} customer rating`}>
            <div className={"cc-dc-kitchen-ratingSummary"}>
              <span className={"cc-dc-kitchen-goldStar"} aria-hidden="true">{"\u2605"}</span>
              <strong>{service.rating.toFixed(1)}</strong>
            </div>
            {service.reviews > 0 && (<p className={"cc-dc-kitchen-ratingReviewCount"}>{service.reviews.toLocaleString("en-IN")} reviews</p>)}
            <div className={"cc-dc-kitchen-ratingBars"}>
              {service.distribution.map((percentage, index) => (
                <div className={"cc-dc-kitchen-ratingBarRow"} key={5 - index}>
                  <span className={"cc-dc-kitchen-ratingLabel"}>
                    {5 - index}<span aria-hidden="true">{"\u2605"}</span>
                  </span>
                  <span className={"cc-dc-kitchen-ratingTrack"}>
                    <span className={"cc-dc-kitchen-ratingFill"} style={{ width: `${percentage}%` }} />
                  </span>
                  <span className={"cc-dc-kitchen-ratingPercent"}>{percentage}%</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {!service.directAdd && selected && (
          <footer className={"cc-dc-kitchen-selectionFooter"}>
            <div className={"cc-dc-kitchen-selectionSummary"}>
              <span className={"cc-dc-kitchen-selectionCaption"}>Total</span>
              <strong className={"cc-dc-kitchen-selectionValue"}>{selected ? money(selected.price) : "Select an option"}</strong>
            </div>
            <button
              type="button"
              className={"cc-dc-kitchen-continueButton"}
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
    </main>
  );
}

