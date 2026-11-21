"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { services, money, type Service, type Option } from "./TankCleaningSection";
import { upsertServiceCartItem } from "@/app/services/serviceCart";
const CATEGORY = "tank-cleaning";
const TANK_DETAILS_CSS = `
.cc-dc-tank-section {
  box-sizing: border-box;
  width: 100%;
  background: #ffffff;
  color: #171717;
}

.cc-dc-tank-srOnly {
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

/*
 * Match the visual content width used by Full Home:
 * approximately 695px service column + right sidebar.
 */
.cc-dc-tank-container {
  box-sizing: border-box;
  width: min(1100px, calc(100% - 32px));
  margin: 0 auto;
  padding: 0 0 64px;
}

/* ======================================================
   TOP SERVICE SELECTOR
   No Furnished / Unfurnished controls in this category.
   ====================================================== */

.cc-dc-tank-serviceSelector {
  display: flex;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 24px;
  margin: 0;
  padding: 0;
}

.cc-dc-tank-selectorItem {
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

.cc-dc-tank-selectorImage {
  display: block;
  width: 72px;
  height: 72px;
  flex: 0 0 72px;
  border: 0;
  border-radius: 0;
  background: #fff1f3;
}

.cc-dc-tank-selectorLabel {
  width: 88px;
  color: #111111;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.15;
  text-align: center;
}

.cc-dc-tank-selectorItem:hover .cc-dc-tank-selectorLabel,
.cc-dc-tank-selectorItem:focus-visible .cc-dc-tank-selectorLabel {
  color: #ef1b23;
}

.cc-dc-tank-selectorItem:focus-visible {
  outline: 2px solid #ef1b23;
  outline-offset: 5px;
}

.cc-dc-tank-selectorDivider {
  width: 100%;
  height: 1px;
  margin: 26px 0 28px;
  background: transparent;
}

/* ======================================================
   MAIN + RIGHT SIDEBAR
   ====================================================== */

.cc-dc-tank-contentLayout {
  display: grid;
  width: 100%;
  grid-template-columns:
    minmax(0, 696px)
    minmax(300px, 372px);
  gap: 32px;
  align-items: start;
}

.cc-dc-tank-mainColumn {
  min-width: 0;
}

.cc-dc-tank-sidebarColumn {
  position: sticky;
  top: 170px;
  min-width: 0;
}

.cc-dc-tank-serviceGroup {
  width: 100%;
  scroll-margin-top: 155px;
  padding: 0 0 34px;
}

.cc-dc-tank-serviceGroup + .cc-dc-tank-serviceGroup {
  padding-top: 34px;
  border-top: 1px solid #f0dfe2;
}

.cc-dc-tank-serviceGroup > h2 {
  margin: 0 0 30px;
  color: #111111;
  font-size: 38px;
  font-weight: 700;
  line-height: 1.16;
  letter-spacing: -0.035em;
}

.cc-dc-tank-serviceList {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 28px;
}

/* ======================================================
   SERVICE BLOCK - SAME VISUAL STRUCTURE AS FULL HOME
   ====================================================== */

.cc-dc-tank-serviceCard {
  width: 100%;
  margin: 0;
  padding: 0 0 18px;
  border: 0;
  border-bottom: 1px solid rgba(40, 40, 40, 0.11);
  border-radius: 0;
  background: transparent;
}

/*
 * Actual service images will be added later.
 * This keeps the same banner footprint as Full Home.
 */
.cc-dc-tank-bannerPlaceholder {
  box-sizing: border-box;
  width: 100%;
  aspect-ratio: 2.36 / 1;
  overflow: hidden;
  border: 1px solid #f3ccd2;
  border-radius: 12px;
  background: #fff1f3;
}

.cc-dc-tank-serviceDetails {
  width: 100%;
  padding: 17px 0 0;
}

.cc-dc-tank-serviceMainRow {
  display: flex;
  width: 100%;
  gap: 18px;
  align-items: flex-start;
  justify-content: space-between;
}

.cc-dc-tank-serviceInformation {
  min-width: 0;
  flex: 1 1 auto;
}

.cc-dc-tank-serviceTitle {
  margin: 0;
  color: #171717;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.34;
}

.cc-dc-tank-ratingRow {
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

.cc-dc-tank-ratingIcon {
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

.cc-dc-tank-reviewText {
  flex: 0 0 auto;
  white-space: nowrap;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
}

.cc-dc-tank-detailsButton {
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

.cc-dc-tank-priceRow {
  display: flex;
  margin-top: 9px;
  align-items: center;
  gap: 7px;
  color: #171717;
  font-size: 13px;
  line-height: 1.3;
}

.cc-dc-tank-priceRow strong {
  font-weight: 700;
}

.cc-dc-tank-addButton {
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

.cc-dc-tank-addButton:hover,
.cc-dc-tank-addButton:focus-visible {
  background: #fff4f5;
}

/* ======================================================
   POPUP
   Sized to match the Full Home / Villa modal footprint.
   ====================================================== */

.cc-dc-tank-modalOverlay {
  position: fixed;
  inset: 0;
  z-index: 1200;
  display: flex;
  box-sizing: border-box;
  padding: 16px;
  align-items: center;
  justify-content: center;
  background: rgba(14, 14, 14, 0.72);
}

.cc-dc-tank-modal {
  display: flex;
  width: min(558px, calc(100vw - 32px));
  height: min(640px, calc(100dvh - 32px));
  min-height: 0;
  overflow: hidden;
  border: 1px solid #f1d7db;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.22);
  flex-direction: column;
}

.cc-dc-tank-modalHeader {
  display: flex;
  box-sizing: border-box;
  min-height: 150px;
  flex: 0 0 auto;
  gap: 18px;
  padding: 34px 32px 27px;
  align-items: flex-start;
  justify-content: space-between;
  border-bottom: 1px solid #eeeeee;
  background: #ffffff;
}

.cc-dc-tank-modalHeader h2 {
  margin: 0;
  color: #161616;
  font-size: 28px;
  font-weight: 750;
  line-height: 1.16;
  letter-spacing: -0.025em;
}

.cc-dc-tank-modalHeader p {
  max-width: 410px;
  margin: 10px 0 0;
  color: #626262;
  font-size: 14px;
  line-height: 1.5;
}

.cc-dc-tank-closeButton {
  display: inline-flex;
  width: 48px;
  height: 48px;
  min-width: 48px;
  flex: 0 0 48px;
  align-items: center;
  justify-content: center;
  margin: -18px -18px 0 0;
  border: 1px solid #eeeeee;
  border-radius: 50%;
  background: #ffffff;
  color: #171717;
  cursor: pointer;
  font-size: 29px;
  font-weight: 400;
  line-height: 1;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.05);
}

.cc-dc-tank-modalBody {
  min-height: 0;
  flex: 1 1 auto;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 28px 32px 34px;
  overscroll-behavior: contain;
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
}

.cc-dc-tank-modalBody::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}

/* ======================================================
   POPUP PRICING
   ====================================================== */

.cc-dc-tank-modalSection {
  width: 100%;
}

.cc-dc-tank-modalSection + .cc-dc-tank-modalSection,
.cc-dc-tank-ratingSection {
  margin-top: 30px;
  padding-top: 28px;
  border-top: 1px solid #e9eaec;
}

.cc-dc-tank-modalSection h3 {
  margin: 0 0 19px;
  color: #5c6678;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.3;
}

.cc-dc-tank-pricingGrid {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.cc-dc-tank-priceCard {
  display: flex;
  box-sizing: border-box;
  min-height: 168px;
  padding: 16px 13px;
  border: 1px solid #dfe2e7;
  border-radius: 10px;
  background: #ffffff;
  flex-direction: column;
  align-items: flex-start;
}

.cc-dc-tank-optionLabel {
  color: #303746;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.42;
}

.cc-dc-tank-priceCard strong {
  margin-top: 20px;
  color: #525d6f;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.25;
}

.cc-dc-tank-priceCard button {
  display: inline-flex;
  min-width: 85px;
  min-height: 42px;
  margin-top: auto;
  padding: 0 18px;
  align-items: center;
  justify-content: center;
  border: 1.5px solid #ef1b23;
  border-radius: 9px;
  background: #ffffff;
  color: #ef1b23;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
}

.cc-dc-tank-priceCard button:hover,
.cc-dc-tank-priceCard button:focus-visible {
  background: #ef1b23;
  color: #ffffff;
}

/* ======================================================
   PROCESS / INCLUDED
   ====================================================== */

.cc-dc-tank-processList {
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
  flex-direction: column;
  gap: 18px;
}

.cc-dc-tank-processList li {
  display: grid;
  grid-template-columns: 29px minmax(0, 1fr);
  gap: 3px;
}

.cc-dc-tank-processNumber {
  color: #7b8495;
  font-size: 15px;
  line-height: 1.45;
}

.cc-dc-tank-processList strong {
  color: #606a7c;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.4;
}

.cc-dc-tank-processList p {
  margin: 4px 0 0;
  color: #7b8598;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.55;
}

.cc-dc-tank-simpleList {
  display: flex;
  margin: 0;
  padding: 0 0 0 21px;
  color: #697387;
  flex-direction: column;
  gap: 14px;
}

.cc-dc-tank-simpleList li {
  padding-left: 5px;
  font-size: 15px;
  line-height: 1.45;
}

/* ======================================================
   RATING
   ====================================================== */

.cc-dc-tank-ratingSection {
  padding-bottom: 8px;
}

.cc-dc-tank-ratingSummary {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cc-dc-tank-goldStar {
  color: #f6b900;
  font-size: 28px;
  line-height: 1;
}

.cc-dc-tank-ratingSummary strong {
  color: #586171;
  font-size: 34px;
  font-weight: 700;
  line-height: 1;
}

.cc-dc-tank-ratingReviewCount {
  margin: 10px 0 24px;
  color: #7e8797;
  font-size: 14px;
  line-height: 1.4;
}

.cc-dc-tank-ratingBars {
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 15px;
}

.cc-dc-tank-ratingBarRow {
  display: grid;
  width: 100%;
  grid-template-columns: 34px minmax(0, 1fr) 43px;
  gap: 10px;
  align-items: center;
}

.cc-dc-tank-ratingLabel {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  color: #596273;
  font-size: 14px;
  line-height: 1;
}

.cc-dc-tank-ratingLabel span {
  color: #f6b900;
}

.cc-dc-tank-ratingTrack {
  display: block;
  width: 100%;
  height: 6px;
  overflow: hidden;
  border-radius: 999px;
  background: #d4d4d4;
}

.cc-dc-tank-ratingFill {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: #ef1b23;
}

.cc-dc-tank-ratingPercent {
  color: #7c8595;
  font-size: 13px;
  text-align: right;
}

/* ======================================================
   TABLET
   ====================================================== */

@media (max-width: 1050px) {
  .cc-dc-tank-container {
    width: min(920px, calc(100% - 32px));
  }

  .cc-dc-tank-contentLayout {
    grid-template-columns:
      minmax(0, 1fr)
      300px;
    gap: 24px;
  }

  .cc-dc-tank-serviceSelector {
    gap: 16px;
  }
}

/* ======================================================
   PHONE
   ====================================================== */

@media (max-width: 760px) {
  .cc-dc-tank-container {
    width: 100%;
    padding: 14px 12px 42px;
  }

  .cc-dc-tank-serviceSelector {
    width: 100%;
    gap: 11px;
    padding: 2px 0 8px;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x proximity;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
  }

  .cc-dc-tank-serviceSelector::-webkit-scrollbar {
    display: none;
  }

  .cc-dc-tank-selectorItem {
    width: 76px;
    min-width: 76px;
    flex: 0 0 76px;
    scroll-snap-align: start;
  }

  .cc-dc-tank-selectorImage {
    width: 62px;
    height: 62px;
    flex-basis: 62px;
  }

  .cc-dc-tank-selectorLabel {
    width: 76px;
    font-size: 10.5px;
    line-height: 1.14;
  }

  .cc-dc-tank-selectorDivider {
    margin: 10px 0 20px;
  }

  .cc-dc-tank-contentLayout {
    display: block;
  }

  .cc-dc-tank-sidebarColumn {
    position: static;
    width: 100%;
    margin-top: 20px;
  }

  .cc-dc-tank-serviceGroup {
    padding-bottom: 26px;
    scroll-margin-top: 150px;
  }

  .cc-dc-tank-serviceGroup + .cc-dc-tank-serviceGroup {
    padding-top: 27px;
  }

  .cc-dc-tank-serviceGroup > h2 {
    margin-bottom: 17px;
    font-size: 29px;
  }

  .cc-dc-tank-serviceList {
    gap: 24px;
  }

  .cc-dc-tank-serviceCard {
    padding-bottom: 15px;
  }

  .cc-dc-tank-bannerPlaceholder {
    width: 100%;
    aspect-ratio: 16 / 8.2;
    border-radius: 11px;
  }

  .cc-dc-tank-serviceDetails {
    padding-top: 13px;
  }

  .cc-dc-tank-serviceMainRow {
    gap: 8px;
  }

  .cc-dc-tank-serviceTitle {
    font-size: 16px;
  }

  .cc-dc-tank-ratingRow {
    gap: 4px;
    margin-top: 7px;
    font-size: 11.5px;
  }

  .cc-dc-tank-ratingIcon {
    width: 18px;
    height: 18px;
    min-width: 18px;
    flex-basis: 18px;
    font-size: 9px;
  }

  .cc-dc-tank-reviewText,
  .cc-dc-tank-detailsButton {
    white-space: nowrap;
  }

  .cc-dc-tank-detailsButton {
    margin-left: 2px;
    font-size: 11.5px;
  }

  .cc-dc-tank-priceRow {
    margin-top: 8px;
    font-size: 12px;
  }

  .cc-dc-tank-addButton {
    min-width: 74px;
    min-height: 44px;
    padding: 0 10px;
    border-radius: 10px;
    font-size: 14px;
  }

  /*
   * Same popup concept on phone,
   * automatically fitted to the available screen.
   */
  .cc-dc-tank-modalOverlay {
    padding: 0;
    align-items: flex-end;
  }

  .cc-dc-tank-modal {
    width: 100%;
    height: min(640px, 92dvh);
    max-height: 92dvh;
    border-width: 1px 0 0;
    border-radius: 20px 20px 0 0;
  }

  .cc-dc-tank-modalHeader {
    min-height: 125px;
    padding: 22px 18px 18px;
  }

  .cc-dc-tank-modalHeader h2 {
    font-size: 23px;
  }

  .cc-dc-tank-modalHeader p {
    margin-top: 7px;
    font-size: 12px;
  }

  .cc-dc-tank-closeButton {
    width: 42px;
    height: 42px;
    min-width: 42px;
    flex-basis: 42px;
    margin: -8px -7px 0 0;
    font-size: 25px;
  }

  .cc-dc-tank-modalBody {
    padding: 20px 15px 28px;
  }

  .cc-dc-tank-pricingGrid {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
    gap: 8px;
  }

  .cc-dc-tank-priceCard {
    min-height: 142px;
    padding: 12px;
  }

  .cc-dc-tank-optionLabel {
    font-size: 13px;
  }

  .cc-dc-tank-priceCard strong {
    margin-top: 15px;
    font-size: 15px;
  }

  .cc-dc-tank-priceCard button {
    min-width: 76px;
    min-height: 39px;
    padding: 0 14px;
    font-size: 13px;
  }

  .cc-dc-tank-modalSection h3 {
    font-size: 17px;
  }

  .cc-dc-tank-processList {
    gap: 15px;
  }

  .cc-dc-tank-processList strong {
    font-size: 14px;
  }

  .cc-dc-tank-processList p {
    font-size: 12px;
  }

  .cc-dc-tank-simpleList li {
    font-size: 13px;
  }

  .cc-dc-tank-ratingSummary strong {
    font-size: 31px;
  }

  .cc-dc-tank-goldStar {
    font-size: 25px;
  }

  .cc-dc-tank-ratingBarRow {
    grid-template-columns:
      31px
      minmax(0, 1fr)
      38px;
    gap: 8px;
  }
}

@media (max-width: 360px) {
  .cc-dc-tank-serviceTitle {
    font-size: 15px;
  }

  .cc-dc-tank-ratingRow {
    gap: 3px;
    font-size: 10.5px;
  }

  .cc-dc-tank-detailsButton {
    font-size: 10.5px;
  }

  .cc-dc-tank-addButton {
    min-width: 66px;
    padding: 0 7px;
  }
}

/* CITY_COOLIES_LIVING_EXACT_FULLHOME_MATCH_START */

/*
 * Desktop:
 * Keep the same centered position,
 * but use the compact Full Home column dimensions.
 *
 * Main service column: 590px
 * Gap:                 28px
 * Right sidebar:       310px
 *
 * Total visual width:  928px
 */
@media (min-width: 981px) {
  .cc-dc-tank-container {
    box-sizing: border-box !important;

    width: 928px !important;
    max-width: calc(100% - 32px) !important;

    margin-left: auto !important;
    margin-right: auto !important;
  }

  .cc-dc-tank-contentLayout {
    display: grid !important;

    width: 100% !important;

    grid-template-columns:
      minmax(0, 590px)
      minmax(270px, 310px) !important;

    column-gap: 28px !important;
    row-gap: 0 !important;

    align-items: start !important;
  }

  .cc-dc-tank-mainColumn {
    box-sizing: border-box !important;

    width: 590px !important;
    max-width: 590px !important;
    min-width: 0 !important;
  }

  .cc-dc-tank-sidebarColumn {
    box-sizing: border-box !important;

    width: 310px !important;
    max-width: 310px !important;
    min-width: 270px !important;
  }
}

/*
 * Match Full Home service-banner proportions.
 * Images will be added later.
 */
.cc-dc-tank-bannerPlaceholder {
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

/*
 * Match Full Home Add button exactly.
 */
.cc-dc-tank-addButton {
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

/*
 * Match the compact Full Home desktop popup.
 */
.cc-dc-tank-modal {
  box-sizing: border-box !important;

  width: 560px !important;
  max-width: calc(100vw - 32px) !important;

  height: 650px !important;
  max-height: calc(100dvh - 70px) !important;

  min-height: 0 !important;

  overflow: hidden !important;

  border-radius: 16px !important;
}

/*
 * Only popup content scrolls.
 * The visible scrollbar remains hidden.
 */
.cc-dc-tank-modalBody {
  min-height: 0 !important;

  flex: 1 1 auto !important;

  overflow-x: hidden !important;
  overflow-y: auto !important;

  overscroll-behavior: contain !important;

  scrollbar-width: none !important;
  -ms-overflow-style: none !important;

  -webkit-overflow-scrolling: touch !important;
}

.cc-dc-tank-modalBody::-webkit-scrollbar {
  display: none !important;

  width: 0 !important;
  height: 0 !important;
}

/*
 * Phone:
 * Match the Full Home mobile banner and Add button.
 */
@media (max-width: 760px) {
  .cc-dc-tank-bannerPlaceholder {
    width: 100% !important;

    height: 190px !important;
    min-height: 190px !important;
    max-height: 190px !important;

    aspect-ratio: auto !important;
  }

  .cc-dc-tank-addButton {
    width: auto !important;
    min-width: 72px !important;

    height: 39px !important;
    min-height: 39px !important;

    padding: 7px 15px !important;

    border-radius: 9px !important;

    font-size: 14px !important;
  }
}

/*
 * Small phone popup:
 * Fit automatically to the complete device screen.
 */
@media (max-width: 620px) {
  .cc-dc-tank-modalOverlay {
    box-sizing: border-box !important;

    padding: 0 !important;

    align-items: stretch !important;
    justify-content: stretch !important;
  }

  .cc-dc-tank-modal {
    width: 100% !important;
    max-width: 100% !important;

    height: 100dvh !important;
    max-height: 100dvh !important;

    border-radius: 0 !important;
  }
}

/* CITY_COOLIES_LIVING_EXACT_FULLHOME_MATCH_END */

/* CITY_COOLIES_LIVING_RIGHT_DIVIDER_HOVER_START */

/*
 * Match Full Home desktop vertical divider.
 * The line continues with the complete service column.
 */
@media (min-width: 1021px) {
  .cc-dc-tank-mainColumn {
    box-sizing: border-box !important;

    border-left: 0 !important;

    border-right:
      1px solid #f4d9de !important;

    padding-bottom:
      80px !important;
  }
}

/*
 * Match Full Home Add button hover exactly.
 */
.cc-dc-tank-addButton:hover {
  background:
    #ef1b23 !important;

  color:
    #ffffff !important;
}

/*
 * Keyboard users receive the same visual state.
 */
.cc-dc-tank-addButton:focus-visible {
  background:
    #ef1b23 !important;

  color:
    #ffffff !important;

  outline:
    2px solid rgba(239, 27, 35, 0.35);

  outline-offset:
    2px;
}

/*
 * No vertical divider when the layout stacks
 * on tablet or phone.
 */
@media (max-width: 1020px) {
  .cc-dc-tank-mainColumn {
    border-right:
      0 !important;

    padding-bottom:
      0 !important;
  }
}

/* CITY_COOLIES_LIVING_RIGHT_DIVIDER_HOVER_END */

/* CITY_COOLIES_LIVING_COMPACT_GAPS_START */

/*
 * Keep Living & Bedroom service sections compact.
 *
 * This reduces only vertical spacing.
 * No widths, banners, buttons or sidebar are changed.
 */

/* Fabric sofa -> Leather sofa */
.cc-dc-tank-serviceList {
  gap: 18px !important;
}

/* Space after the final service in each section */
.cc-dc-tank-serviceGroup {
  padding-bottom: 12px !important;
}

/* Leather sofa -> Mattress, Mattress -> Carpet, etc. */
.cc-dc-tank-serviceGroup + .cc-dc-tank-serviceGroup {
  padding-top: 16px !important;
}

/*
 * Phone version stays compact without making
 * the service cards feel crowded.
 */
@media (max-width: 760px) {
  .cc-dc-tank-serviceList {
    gap: 16px !important;
  }

  .cc-dc-tank-serviceGroup {
    padding-bottom: 10px !important;
  }

  .cc-dc-tank-serviceGroup + .cc-dc-tank-serviceGroup {
    padding-top: 14px !important;
  }
}

/* CITY_COOLIES_LIVING_COMPACT_GAPS_END */

/* CITY_COOLIES_LIVING_HEADING_MATCH_START */

/*
 * Match Living & Bedroom section headings
 * with the Full Home section-heading scale.
 */
.cc-dc-tank-serviceGroup > h2 {
  margin-bottom: 28px !important;

  font-size: 32px !important;
  font-weight: 700 !important;
  line-height: 1.18 !important;

  letter-spacing: -0.025em !important;
}

@media (max-width: 760px) {
  .cc-dc-tank-serviceGroup > h2 {
    margin-bottom: 22px !important;

    font-size: 24px !important;
    line-height: 1.18 !important;
  }
}

/* CITY_COOLIES_LIVING_HEADING_MATCH_END */

/* CITY_COOLIES_LIVING_SELECTOR_IMAGES_START */

/*
 * Living & Bedroom service selector images.
 * Direct image.
 * No card background.
 * No border.
 * No shadow.
 * No zoom.
 * No crop.
 */
.cc-dc-tank-selectorImage {
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

/* Sofa Cleaning */
.cc-dc-tank-selectorItem:nth-child(1) .cc-dc-tank-selectorImage {
  background-image: none !important;
}

/* Mattress Cleaning */
.cc-dc-tank-selectorItem:nth-child(2) .cc-dc-tank-selectorImage {
  background-image: none !important;
}

/* Carpet Cleaning */
.cc-dc-tank-selectorItem:nth-child(3) .cc-dc-tank-selectorImage {
  background-image: none !important;
}

/* Curtain Cleaning */
.cc-dc-tank-selectorItem:nth-child(4) .cc-dc-tank-selectorImage {
  background-image: none !important;
}

/* Dining Table Cleaning */
.cc-dc-tank-selectorItem:nth-child(5) .cc-dc-tank-selectorImage {
  background-image: none !important;
}

@media (max-width: 1020px) {
  .cc-dc-tank-selectorImage {
    background-size: contain !important;
    background-position: center center !important;
  }
}

@media (max-width: 620px) {
  .cc-dc-tank-selectorImage {
    background-size: contain !important;
    background-position: center center !important;
  }
}

/* CITY_COOLIES_LIVING_SELECTOR_IMAGES_END */

/* CITY_COOLIES_FABRIC_SOFA_MAIN_BANNER_START */

/*
 * Fabric Sofa Cleaning banner.
 * Image is shown directly on the page.
 * No card, no visible background, no border.
 * Complete image remains visible.
 */
.cc-dc-tank-bannerPlaceholder[data-service-id="fabric-sofa-cleaning"] {
  background-image: none !important;

  background-repeat: no-repeat !important;
  background-position: center center !important;
  background-size: contain !important;

  background-color: transparent !important;

  border: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  outline: 0 !important;

  padding: 0 !important;

  overflow: visible !important;
}

/* CITY_COOLIES_FABRIC_SOFA_MAIN_BANNER_END */

/* CITY_COOLIES_SOFA_DIVIDER_GAP_FIX_START */

/*
 * Remove the empty space between the service image
 * and the right-side vertical divider.
 */
@media (min-width: 1021px) {
  .cc-dc-tank-mainColumn {
    padding-right: 0 !important;
  }

  .cc-dc-tank-bannerPlaceholder[data-service-id="fabric-sofa-cleaning"] {
    display: block !important;

    width: 100% !important;
    max-width: none !important;

    height: auto !important;
    min-height: 0 !important;
    max-height: none !important;

    aspect-ratio: 1916 / 821 !important;

    margin-left: 0 !important;
    margin-right: 0 !important;

    padding: 0 !important;

    background-image: none !important;

    background-repeat: no-repeat !important;
    background-position: center center !important;
    background-size: contain !important;

    background-color: transparent !important;

    border: 0 !important;
    border-radius: 0 !important;
    box-shadow: none !important;
  }
}

/*
 * Phone and tablet:
 * preserve full image without crop.
 */
@media (max-width: 1020px) {
  .cc-dc-tank-bannerPlaceholder[data-service-id="fabric-sofa-cleaning"] {
    display: block !important;

    width: 100% !important;
    max-width: 100% !important;

    height: auto !important;
    min-height: 0 !important;
    max-height: none !important;

    aspect-ratio: 1916 / 821 !important;

    margin: 0 !important;
    padding: 0 !important;

    background-size: contain !important;
    background-position: center center !important;

    border: 0 !important;
    border-radius: 0 !important;
    box-shadow: none !important;
  }
}

/* CITY_COOLIES_SOFA_DIVIDER_GAP_FIX_END */


/* CITY_COOLIES_LIVING_SHARED_POPUP_FINAL */
.cc-dc-tank-modal {
  box-sizing: border-box !important;
  display: flex !important;
  flex-direction: column !important;
  width: min(480px, calc(100vw - 32px)) !important;
  min-width: 0 !important;
  max-width: calc(100vw - 32px) !important;
  height: min(660px, calc(100dvh - 48px)) !important;
  min-height: 0 !important;
  max-height: calc(100dvh - 48px) !important;
  overflow: hidden !important;
  border-radius: 16px !important;
}

.cc-dc-tank-modalHeader {
  box-sizing: border-box !important;
  flex: 0 0 auto !important;
  min-height: 0 !important;
  padding: 20px 22px 18px !important;
}

.cc-dc-tank-modalHeader h2 {
  font-size: 26px !important;
  line-height: 1.2 !important;
}

.cc-dc-tank-modalBody {
  box-sizing: border-box !important;
  flex: 1 1 auto !important;
  min-width: 0 !important;
  min-height: 0 !important;
  padding: 16px 22px 20px !important;
  overflow-x: hidden !important;
  overflow-y: auto !important;
}

.cc-dc-tank-pricingGrid {
  display: grid !important;
  width: 100% !important;
  grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  gap: 8px !important;
}

.cc-dc-tank-priceCard {
  box-sizing: border-box !important;
  width: 100% !important;
  min-width: 0 !important;
  height: auto !important;
  min-height: 90px !important;
  max-height: none !important;
  padding: 9px !important;
}

.cc-dc-tank-priceCard strong {
  margin-top: 3px !important;
  color: #171717 !important;
}

.cc-dc-tank-priceCard button {
  min-width: 66px !important;
  min-height: 30px !important;
  height: 30px !important;
  margin-top: auto !important;
  padding: 0 9px !important;
  font-size: 12px !important;
}

.cc-dc-tank-priceCard:has(button[aria-pressed="true"]) {
  border-color: #ef1b23 !important;
  background: #fff8f9 !important;
}

.cc-dc-tank-priceCard button[aria-pressed="true"] {
  background: #ef1b23 !important;
  color: #ffffff !important;
}

.cc-dc-tank-selectionFooter {

  position: fixed;

  left: 50%;

  bottom: 0;

  z-index: 100;

  transform: translateX(-50%);

  max-width: 1280px;

  border: 1px solid #eeeeee;

  border-radius: 14px 14px 0 0;

  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  padding: 10px 22px;
  border-top: 1px solid #eeeeee;
  background: #ffffff;
}

.cc-dc-tank-selectionSummary {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 3px;
}

.cc-dc-tank-selectionCaption {
  color: #737373;
  font-size: 12px;
}

.cc-dc-tank-selectionValue {
  overflow: hidden;
  color: #171717;
  font-size: 14px;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cc-dc-tank-continueButton {
  flex: 0 0 auto;
  min-width: 118px;
  min-height: 42px;
  padding: 8px 14px;
  border: 1px solid #ef1b23;
  border-radius: 10px;
  background: #ef1b23;
  color: #ffffff;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

.cc-dc-tank-continueButton:disabled {
  border-color: #e3e3e3;
  background: #f2f3f5;
  color: #999999;
  cursor: not-allowed;
}

@media (max-width: 620px) {
  .cc-dc-tank-modal {
    width: calc(100vw - 20px) !important;
    max-width: calc(100vw - 20px) !important;
    height: calc(100dvh - 20px) !important;
    max-height: calc(100dvh - 20px) !important;
    border-radius: 16px !important;
  }

  .cc-dc-tank-modalHeader {
    padding: 18px 16px 16px !important;
  }

  .cc-dc-tank-modalHeader h2 {
    font-size: 23px !important;
  }

  .cc-dc-tank-modalBody {
    padding: 16px 14px !important;
  }

  .cc-dc-tank-pricingGrid {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 8px !important;
  }

  .cc-dc-tank-priceCard {
    min-height: 90px !important;
    padding: 9px !important;
  }

  .cc-dc-tank-selectionFooter {
    padding: 10px 14px calc(10px + env(safe-area-inset-bottom));
  }

  .cc-dc-tank-continueButton {
    min-width: 108px;
    min-height: 40px;
  }
}
/* CITY_COOLIES_LIVING_SHARED_POPUP_FINAL_END */
/* CITY_COOLIES_LEATHER_SOFA_BANNER_START */
/* Show the complete Leather sofa image directly in its page banner. */
.cc-dc-tank-bannerPlaceholder[data-service-id="leather-sofa-cleaning"] {
  display: block !important;
  box-sizing: border-box !important;
  width: 100% !important;
  max-width: 100% !important;
  height: auto !important;
  min-height: 0 !important;
  max-height: none !important;
  aspect-ratio: 1916 / 821 !important;
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  background-color: transparent !important;
  background-image: none !important;
  background-repeat: no-repeat !important;
  background-position: center center !important;
  background-size: contain !important;
}
/* CITY_COOLIES_LEATHER_SOFA_BANNER_END */
/* CITY_COOLIES_MATTRESS_BANNER_START */
/* Show the complete mattress-cleaning image directly in its service banner. */
.cc-dc-tank-bannerPlaceholder[data-service-id="mattress-cleaning"] {
  display: block !important;
  box-sizing: border-box !important;
  width: 100% !important;
  max-width: 100% !important;
  height: auto !important;
  min-height: 0 !important;
  max-height: none !important;
  aspect-ratio: 1916 / 821 !important;
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  background-color: transparent !important;
  background-image: none !important;
  background-repeat: no-repeat !important;
  background-position: center center !important;
  background-size: contain !important;
}
/* CITY_COOLIES_MATTRESS_BANNER_END */
/* CITY_COOLIES_CARPET_BANNER_START */
/* Display the full carpet-cleaning image directly in its page banner. */
.cc-dc-tank-bannerPlaceholder[data-service-id="carpet-cleaning"] {
  display: block !important;
  box-sizing: border-box !important;
  width: 100% !important;
  max-width: 100% !important;
  height: auto !important;
  min-height: 0 !important;
  max-height: none !important;
  aspect-ratio: 1916 / 821 !important;
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  background-color: transparent !important;
  background-image: none !important;
  background-repeat: no-repeat !important;
  background-position: center center !important;
  background-size: contain !important;
}
/* CITY_COOLIES_CARPET_BANNER_END */
/* CITY_COOLIES_CURTAIN_BANNER_START */
/* Display the complete curtain-cleaning image directly in its page banner. */
.cc-dc-tank-bannerPlaceholder[data-service-id="curtain-cleaning"] {
  display: block !important;
  box-sizing: border-box !important;
  width: 100% !important;
  max-width: 100% !important;
  height: auto !important;
  min-height: 0 !important;
  max-height: none !important;
  aspect-ratio: 1916 / 821 !important;
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  background-color: transparent !important;
  background-image: none !important;
  background-repeat: no-repeat !important;
  background-position: center center !important;
  background-size: contain !important;
}
/* CITY_COOLIES_CURTAIN_BANNER_END */

/* CITY_COOLIES_DINING_TABLE_BANNER_START */
.cc-dc-tank-bannerPlaceholder[data-service-id="dining-table-cleaning"] {
  display: block !important;
  box-sizing: border-box !important;
  width: 100% !important;
  max-width: 100% !important;
  height: auto !important;
  min-height: 0 !important;
  max-height: none !important;
  aspect-ratio: 1671 / 941 !important;
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  background-color: transparent !important;
  background-image: none !important;
  background-repeat: no-repeat !important;
  background-position: center center !important;
  background-size: contain !important;
}
/* CITY_COOLIES_DINING_TABLE_BANNER_END */


/* Kitchen-only adjustments. Service images will be added later. */
.cc-dc-tank-bannerPlaceholder {
  background-image: none !important;
  background-color: #fff8f9;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.cc-dc-tank-quantityControl {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: space-between;
  min-width: 104px;
  height: 46px;
  border: 1px solid #ef1b23;
  border-radius: 10px;
  color: #171717;
  background: #fff;
  font-size: 16px;
}

.cc-dc-tank-quantityControl button {
  width: 34px;
  height: 44px;
  border: 0;
  background: transparent;
  color: #ef1b23;
  cursor: pointer;
  font: inherit;
  font-size: 21px;
}

.cc-dc-tank-quantityControl button:focus-visible {
  outline: 2px solid #ef1b23;
  outline-offset: 2px;
}

@media (max-width: 760px) {
  .cc-dc-tank-quantityControl {
    min-width: 88px;
    height: 42px;
  }
  .cc-dc-tank-quantityControl button {
    width: 29px;
    height: 40px;
  }
}

/* KITCHEN_SELECTOR_NO_LIVING_IMAGES_START */
.cc-dc-tank-section .cc-dc-tank-selectorItem .cc-dc-tank-selectorImage {
  background-image: none !important;
}
/* KITCHEN_SELECTOR_NO_LIVING_IMAGES_END */

/* KITCHEN_PAGE_BANNERS_START */
.cc-dc-tank-bannerPlaceholder[data-service-id] {
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

.cc-dc-tank-bannerPlaceholder[data-service-id="complete-kitchen-cleaning"] {
  background-image: none !important;
}

.cc-dc-tank-bannerPlaceholder[data-service-id="microwave-cleaning"] {
  background-image: none !important;
}

.cc-dc-tank-bannerPlaceholder[data-service-id="gas-stove-cleaning"] {
  background-image: none !important;
}

.cc-dc-tank-bannerPlaceholder[data-service-id="chimney-cleaning"] {
  background-image: none !important;
}
/* KITCHEN_PAGE_BANNERS_END */

/* KITCHEN_SELECTOR_IMAGES_START */
.cc-dc-tank-section .cc-dc-tank-serviceSelector .cc-dc-tank-selectorItem .cc-dc-tank-selectorImage {
  display: block !important;
  background-color: transparent !important;
  background-repeat: no-repeat !important;
  background-position: center center !important;
  background-size: contain !important;
}

.cc-dc-tank-section .cc-dc-tank-serviceSelector .cc-dc-tank-selectorItem:nth-child(1) .cc-dc-tank-selectorImage {
  background-image: none !important;
}

.cc-dc-tank-section .cc-dc-tank-serviceSelector .cc-dc-tank-selectorItem:nth-child(2) .cc-dc-tank-selectorImage {
  background-image: none !important;
}

.cc-dc-tank-section .cc-dc-tank-serviceSelector .cc-dc-tank-selectorItem:nth-child(3) .cc-dc-tank-selectorImage {
  background-image: none !important;
}

.cc-dc-tank-section .cc-dc-tank-serviceSelector .cc-dc-tank-selectorItem:nth-child(4) .cc-dc-tank-selectorImage {
  background-image: none !important;
}
/* KITCHEN_SELECTOR_IMAGES_END */

/* KITCHEN_SELECTOR_LARGE_IMAGES_START */
.cc-dc-tank-section .cc-dc-tank-serviceSelector .cc-dc-tank-selectorItem .cc-dc-tank-selectorImage {
  background-size: cover !important;
  background-position: center center !important;
  overflow: hidden !important;
}
/* KITCHEN_SELECTOR_LARGE_IMAGES_END */

/* COMMERCIAL_KITCHEN_IMAGE_START */
.cc-dc-tank-bannerPlaceholder[data-service-id="commercial-kitchen-cleaning"] {
  display: block !important;
  width: 100% !important;
  height: auto !important;
  aspect-ratio: 1926 / 817 !important;
  border: 0 !important;
  border-radius: 0 !important;
  background-color: transparent !important;
  background-image: none !important;
  background-repeat: no-repeat !important;
  background-position: center center !important;
  background-size: contain !important;
}

.cc-dc-tank-section .cc-dc-tank-serviceSelector .cc-dc-tank-selectorItem:nth-child(5) .cc-dc-tank-selectorImage {
  background-image: none !important;
  background-repeat: no-repeat !important;
  background-position: center center !important;
  background-size: cover !important;
}
/* COMMERCIAL_KITCHEN_IMAGE_END */

/* Bathroom images can be added later without cropping on narrow screens. */
.cc-dc-tank-section .cc-dc-tank-bannerPlaceholder[data-service-id] {
  background-image: none !important;
  background-color: #fff4f5 !important;
  background-size: contain !important;
  aspect-ratio: 1926 / 816 !important;
}
.cc-dc-tank-section .cc-dc-tank-serviceSelector .cc-dc-tank-selectorItem:nth-child(n) .cc-dc-tank-selectorImage {
  background-image: none !important;
  background-color: #fff4f5 !important;
  background-size: contain !important;
}
/* Tank banner spaces: images can be added later without mobile cropping. */
.cc-dc-tank-section .cc-dc-tank-bannerPlaceholder[data-service-id] {
  background-image: none !important;
  background-color: #fff4f5 !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
  background-size: contain !important;
  aspect-ratio: 1926 / 816 !important;
}

.cc-dc-tank-section .cc-dc-tank-serviceSelector .cc-dc-tank-selectorItem:nth-child(n) .cc-dc-tank-selectorImage {
  background-image: none !important;
  background-color: #fff4f5 !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
  background-size: contain !important;
}

/* CITY_COOLIES_TANK_IMAGES_START */
/* Small images above the service list: fill each square. */
.cc-dc-tank-section .cc-dc-tank-serviceSelector .cc-dc-tank-selectorItem:nth-child(n) .cc-dc-tank-selectorImage {
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
  background-size: cover !important;
}

.cc-dc-tank-section .cc-dc-tank-serviceSelector .cc-dc-tank-selectorItem:nth-child(1) .cc-dc-tank-selectorImage {
  background-image: url("/deep-cleaning/overhead_water_tank_cleaning.webp") !important;
}

.cc-dc-tank-section .cc-dc-tank-serviceSelector .cc-dc-tank-selectorItem:nth-child(2) .cc-dc-tank-selectorImage {
  background-image: url("/deep-cleaning/underground_sump_cleaning.webp") !important;
}

.cc-dc-tank-section .cc-dc-tank-serviceSelector .cc-dc-tank-selectorItem:nth-child(3) .cc-dc-tank-selectorImage {
  background-image: url("/deep-cleaning/overhead_concrete_water_tank_cleaning.webp") !important;
}

/* Full images in the direct-page service sections. */
.cc-dc-tank-section .cc-dc-tank-bannerPlaceholder[data-service-id] {
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

.cc-dc-tank-section .cc-dc-tank-bannerPlaceholder[data-service-id="overhead-water-tank-cleaning"] {
  background-image: url("/deep-cleaning/overhead_water_tank_cleaning.webp") !important;
}

.cc-dc-tank-section .cc-dc-tank-bannerPlaceholder[data-service-id="underground-sump-cleaning"] {
  background-image: url("/deep-cleaning/underground_sump_cleaning.webp") !important;
}

.cc-dc-tank-section .cc-dc-tank-bannerPlaceholder[data-service-id="overhead-concrete-water-tank-cleaning"] {
  background-image: url("/deep-cleaning/overhead_concrete_water_tank_cleaning.webp") !important;
}

/* CITY_COOLIES_TANK_IMAGES_END */



/* CITY_COOLIES_DIVIDER_VISIBILITY_FIX */
.cc-dc-tank-mainColumn {
  border-right-color: transparent !important;
  border-left-color: transparent !important;
}

.cc-dc-tank-serviceCard {
  border-bottom-color: transparent !important;
}

.cc-dc-tank-serviceGroup + .cc-dc-tank-serviceGroup {
  border-top-color: transparent !important;
}
/* END_CITY_COOLIES_DIVIDER_VISIBILITY_FIX */

/* Tank Cleaning details page styles */
.cc-dc-detailsPage {
  position: static !important;
  display: block !important;
  width: 100% !important;
  min-height: 100vh;
  height: auto !important;
  max-height: none !important;
  overflow: visible !important;
  background: #fff;
  color: #171717;
}

.cc-dc-detailsInner {
  box-sizing: border-box !important;
  display: block !important;
  width: calc(100% - 384px) !important;
  max-width: 1400px !important;
  min-width: 0 !important;
  height: auto !important;
  max-height: none !important;
  margin: 0 auto !important;
  padding: 28px 0 90px !important;
  overflow: visible !important;
}

.cc-dc-detailsInner [class*="-modalHeader"] {
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  justify-content: flex-start !important;
  gap: 54px !important;
  height: auto !important;
  min-height: 0 !important;
  padding: 0 0 32px !important;
  border-bottom: 1px solid #ececec;
}

.cc-dc-detailsInner [class*="-modalHeader"] h2 {
  font-size: clamp(28px, 3vw, 40px);
}

.cc-dc-detailsInner .cc-dc-detailsBack {
  order: -1 !important;
  align-self: flex-start !important;
  position: static !important;
  border: 0;
  padding: 0;
  background: transparent;
  color: #ef1b23;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  white-space: normal;
}

.cc-dc-detailsInner [class*="-modalBody"] {
  display: block !important;
  position: static !important;
  width: 100% !important;
  height: auto !important;
  max-height: none !important;
  min-height: 0 !important;
  padding: 30px 0 0 !important;
  overflow: visible !important;
  overscroll-behavior: auto !important;
}

.cc-dc-detailsInner [class*="-pricingGrid"] {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.cc-dc-detailsInner [class*="-selectionFooter"] {
  position: fixed !important;
  left: 50% !important;
  right: auto !important;
  bottom: 0 !important;
  z-index: 1100 !important;
  transform: translateX(-50%) !important;
  box-sizing: border-box !important;
  width: min(620px, calc(100% - 24px)) !important;
  height: auto !important;
  max-height: none !important;
  margin: 0 !important;
  padding-bottom: calc(10px + env(safe-area-inset-bottom));
}

@media (max-width: 1199px) {
  .cc-dc-detailsInner {
    width: calc(100% - 96px) !important;
  }
}

@media (max-width: 700px) {
  .cc-dc-detailsInner {
    width: calc(100% - 32px) !important;
    padding: 20px 0 64px !important;
  }

  .cc-dc-detailsInner [class*="-pricingGrid"] {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .cc-dc-detailsInner [class*="-modalHeader"] {
    gap: 28px !important;
  }
}

@media (max-width: 420px) {
  .cc-dc-detailsInner [class*="-pricingGrid"] {
    grid-template-columns: 1fr;
  }
}
`;

export default function TankServiceDetails({
  serviceId,
}: {
  serviceId: string;
}) {
  const router = useRouter();
  const service = services.find((item) => item.id === serviceId);
  const onClose = () => router.push("/services/deep-cleaning?category=" + CATEGORY);
  const onAdd = (item: Service, option: Option) => {
    upsertServiceCartItem({
      id: `${CATEGORY}:${item.id}:${option.id}`,
      serviceTitle: item.title,
      optionLabel: option.label,
      price: option.price,
      priceLabel: money(option.price),
      duration: "Professional cleaning service",
    });
    router.push("/services/deep-cleaning?category=" + CATEGORY);
  };
  const [selected, setSelected] = useState<Option | null>(null);


  if (!service) return null;

  return (
    <>
    <style>{TANK_DETAILS_CSS}</style>
    <div
      className="cc-dc-detailsPage"
    >
      <section
        className="cc-dc-detailsInner"
        aria-labelledby={`tank-modal-${service.id}`}
      >
        <header className={"cc-dc-tank-modalHeader"}>
          <div>
            <h2 id={`tank-modal-${service.id}`}>{service.title}</h2>
            <p>
              {service.directAdd
                ? (service.id === "commercial-tank-cleaning" ? `Site survey: ${money(500)}. Final cleaning rate is confirmed after the survey.` : `Starts at ${money(service.options[0].price)}`)
                : "Choose the option that matches your cleaning requirement."}
            </p>
          </div>
          <button type="button" className="cc-dc-detailsBack" onClick={onClose}>← Back to Tank Cleaning</button>
        </header>

        <div className={"cc-dc-tank-modalBody"}>
          {!service.directAdd && (
            <section className={"cc-dc-tank-modalSection"}>
              <h3>{service.pricingTitle}</h3>
              <div className={"cc-dc-tank-pricingGrid"}>
                {service.options.map((option) => (
                  <article key={option.id} className={"cc-dc-tank-priceCard"}>
                    <span className={"cc-dc-tank-optionLabel"}>{option.label}</span>
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

          <section className={"cc-dc-tank-modalSection"}>
            <h3>Process</h3>
            <ol className={"cc-dc-tank-processList"}>
              {service.process.map((step, index) => (
                <li key={step.title}>
                  <span className={"cc-dc-tank-processNumber"}>{index + 1}.</span>
                  <div><strong>{step.title}</strong><p>{step.description}</p></div>
                </li>
              ))}
            </ol>
          </section>

          {!!service.included?.length && (
            <section className={"cc-dc-tank-modalSection"}>
              <h3>Included</h3>
              <ul className={"cc-dc-tank-simpleList"}>
                {service.included.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
          )}

          {!!service.excluded?.length && (
            <section className={"cc-dc-tank-modalSection"}>
              <h3>Not Included</h3>
              <ul className={"cc-dc-tank-simpleList"}>
                {service.excluded.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
          )}

          {!!service.perfectFor?.length && (
            <section className={"cc-dc-tank-modalSection"}>
              <h3>Perfect For</h3>
              <ul className={"cc-dc-tank-simpleList"}>
                {service.perfectFor.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
          )}
          <section className={"cc-dc-tank-ratingSection"} aria-label={`${service.title} customer rating`}>
            <div className={"cc-dc-tank-ratingSummary"}>
              <span className={"cc-dc-tank-goldStar"} aria-hidden="true">{"\u2605"}</span>
              <strong>{service.rating.toFixed(1)}</strong>
            </div>
            {service.reviews > 0 && (<p className={"cc-dc-tank-ratingReviewCount"}>{service.reviews.toLocaleString("en-IN")} reviews</p>)}
            <div className={"cc-dc-tank-ratingBars"}>
              {service.distribution.map((percentage, index) => (
                <div className={"cc-dc-tank-ratingBarRow"} key={5 - index}>
                  <span className={"cc-dc-tank-ratingLabel"}>
                    {5 - index}<span aria-hidden="true">{"\u2605"}</span>
                  </span>
                  <span className={"cc-dc-tank-ratingTrack"}>
                    <span className={"cc-dc-tank-ratingFill"} style={{ width: `${percentage}%` }} />
                  </span>
                  <span className={"cc-dc-tank-ratingPercent"}>{percentage}%</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {!service.directAdd && selected && (
          <footer className={"cc-dc-tank-selectionFooter"}>
            <div className={"cc-dc-tank-selectionSummary"}>
              <span className={"cc-dc-tank-selectionCaption"}>Total</span>
              <strong className={"cc-dc-tank-selectionValue"}>{selected ? money(selected.price) : "Select an option"}</strong>
            </div>
            <button
              type="button"
              className={"cc-dc-tank-continueButton"}
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
    </div>
    </>
  );
}

