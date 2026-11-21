"use client";
import Link from "next/link";

const FULL_HOME_DETAILS_PATH =
  "/services/deep-cleaning?category=full-home-by-room&service=";
export const CITY_COOLIES_INLINE_CSS_CUSTOMIZECLEANING = ".cc-fh-customize-section {\n  width: 100%;\n  margin-top: 34px;\n  padding-top: 30px;\n  scroll-margin-top: 150px;\n}\n\n.cc-fh-customize-sectionTitle {\n  margin: 0 0 26px;\n  color: #171717;\n  font-size: 34px;\n  font-weight: 700;\n  line-height: 1.12;\n  letter-spacing: -0.025em;\n}\n\n.cc-fh-customize-promoBanner {\n  position: relative;\n  min-height: 235px;\n  overflow: hidden;\n\n  border: 1px solid #f4c7cb;\n  border-radius: 12px;\n\n  background-image:\n    linear-gradient(\n      90deg,\n      rgba(255, 247, 248, 0.99) 0%,\n      rgba(255, 247, 248, 0.95) 34%,\n      rgba(255, 247, 248, 0.68) 52%,\n      rgba(255, 247, 248, 0.12) 78%,\n      rgba(255, 247, 248, 0) 100%\n    ),\n    url(\"/deep-cleaning/sunlit_living_room_cleaning_service.webp\");\n\n  background-position: center;\n  background-size: cover;\n  background-repeat: no-repeat;\n}\n\n.cc-fh-customize-promoContent {\n  display: flex;\n  min-height: 235px;\n  width: 55%;\n  flex-direction: column;\n  justify-content: center;\n  padding: 32px;\n}\n\n.cc-fh-customize-badge {\n  width: fit-content;\n  margin-bottom: 18px;\n  padding: 8px 14px;\n  border-radius: 8px;\n  background: #ef1b23;\n  color: #ffffff;\n  font-size: 12px;\n  font-weight: 700;\n}\n\n.cc-fh-customize-promoHeading {\n  margin: 0;\n  color: #181818;\n  font-size: 23px;\n  font-weight: 700;\n  line-height: 1.2;\n}\n\n.cc-fh-customize-promoDescription {\n  max-width: 340px;\n  margin: 12px 0 0;\n  color: #555555;\n  font-size: 15px;\n  line-height: 1.5;\n}\n\n.cc-fh-customize-serviceHeader {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 22px;\n  padding: 22px 0 6px;\n}\n\n.cc-fh-customize-serviceInformation {\n  min-width: 0;\n}\n\n.cc-fh-customize-serviceTitle {\n  margin: 0;\n  color: #181818;\n  font-size: 18px;\n  font-weight: 600;\n  line-height: 1.35;\n}\n\n.cc-fh-customize-serviceMeta {\n  margin: 7px 0 0;\n  color: #666666;\n  font-size: 13px;\n  line-height: 1.4;\n}\n\n.cc-fh-customize-detailsButton {\n  margin-top: 10px;\n  padding: 0;\n  border: 0;\n  background: transparent;\n  color: #ef1b23;\n  font: inherit;\n  font-size: 13px;\n  font-weight: 650;\n  cursor: pointer;\n}\n\n.cc-fh-customize-addButton {\n  min-width: 86px;\n  min-height: 42px;\n  flex: 0 0 auto;\n  padding: 8px 20px;\n\n  border: 1px solid #ef1b23;\n  border-radius: 9px;\n\n  background: #ffffff;\n  color: #ef1b23;\n\n  font: inherit;\n  font-size: 15px;\n  font-weight: 650;\n\n  cursor: pointer;\n}\n\n.cc-fh-customize-addButton:hover {\n  background: #ef1b23;\n  color: #ffffff;\n}\n\n.cc-fh-customize-backdrop {\n  position: fixed;\n  inset: 0;\n  z-index: 2000;\n\n  display: flex;\n  align-items: center;\n  justify-content: center;\n\n  padding: 20px;\n\n  background:\n    rgba(22, 22, 22, 0.46);\n\n  backdrop-filter: blur(2px);\n}\n\n.cc-fh-customize-modal {\n  display: flex;\n  width: min(620px, 100%);\n  max-height: min(760px, 88vh);\n  flex-direction: column;\n\n  overflow: hidden;\n\n  border: 1px solid #eeeeee;\n  border-radius: 18px;\n\n  background: #ffffff;\n\n  box-shadow:\n    0 24px 70px\n    rgba(0, 0, 0, 0.2);\n}\n\n.cc-fh-customize-modalHeader {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 18px;\n\n  padding: 24px 26px 18px;\n\n  border-bottom:\n    1px solid #eeeeee;\n}\n\n.cc-fh-customize-modalHeader h2 {\n  margin: 0;\n\n  color: #151515;\n\n  font-size: 25px;\n  font-weight: 700;\n  line-height: 1.2;\n}\n\n.cc-fh-customize-modalHeader p {\n  margin: 6px 0 0;\n\n  color: #666666;\n\n  font-size: 13px;\n}\n\n.cc-fh-customize-closeButton {\n  display: inline-flex;\n  width: 40px;\n  height: 40px;\n\n  flex: 0 0 40px;\n\n  align-items: center;\n  justify-content: center;\n\n  padding: 0;\n\n  border: 1px solid #e8e8e8;\n  border-radius: 999px;\n\n  background: #ffffff;\n  color: #171717;\n\n  font-size: 25px;\n  line-height: 1;\n\n  cursor: pointer;\n}\n\n.cc-fh-customize-modalSummary {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n\n  gap: 14px;\n\n  padding: 13px 26px;\n\n  background: #fff8f8;\n\n  border-bottom:\n    1px solid #f4e3e4;\n}\n\n.cc-fh-customize-modalSummary span {\n  color: #777777;\n  font-size: 12px;\n}\n\n.cc-fh-customize-modalSummary strong {\n  color: #171717;\n  font-size: 19px;\n}\n\n.cc-fh-customize-modalBody {\n  min-height: 0;\n  flex: 1;\n  overflow-y: auto;\n\n  padding: 18px 22px;\n}\n\n.cc-fh-customize-serviceList {\n  display: flex;\n  flex-direction: column;\n  gap: 9px;\n}\n\n.cc-fh-customize-optionRow {\n  display: flex;\n  min-height: 67px;\n\n  align-items: center;\n  justify-content: space-between;\n\n  gap: 14px;\n\n  padding: 11px 13px;\n\n  border: 1px solid #e9e9e9;\n  border-radius: 11px;\n\n  background: #ffffff;\n}\n\n.cc-fh-customize-optionRowSelected {\n  border-color: #ef9ca1;\n  background: #fff8f8;\n}\n\n.cc-fh-customize-optionCopy {\n  min-width: 0;\n}\n\n.cc-fh-customize-optionCopy h3 {\n  margin: 0;\n\n  color: #202020;\n\n  font-size: 13px;\n  font-weight: 650;\n  line-height: 1.3;\n}\n\n.cc-fh-customize-optionCopy p {\n  display: flex;\n  flex-wrap: wrap;\n\n  gap: 5px;\n\n  margin: 5px 0 0;\n\n  line-height: 1.2;\n}\n\n.cc-fh-customize-optionCopy strong {\n  color: #171717;\n  font-size: 13px;\n}\n\n.cc-fh-customize-optionCopy span {\n  color: #808080;\n  font-size: 11px;\n}\n\n.cc-fh-customize-stepper {\n  display: grid;\n\n  grid-template-columns:\n    31px 31px 31px;\n\n  flex: 0 0 auto;\n\n  align-items: center;\n  justify-items: center;\n\n  border: 1px solid #efb9bc;\n  border-radius: 9px;\n\n  overflow: hidden;\n}\n\n.cc-fh-customize-stepper button {\n  width: 31px;\n  height: 31px;\n\n  padding: 0;\n  border: 0;\n\n  background: #ffffff;\n  color: #ef1b23;\n\n  font-size: 18px;\n\n  cursor: pointer;\n}\n\n.cc-fh-customize-stepper button:disabled {\n  color: #c5c5c5;\n  cursor: default;\n}\n\n.cc-fh-customize-stepper span {\n  width: 31px;\n\n  text-align: center;\n\n  color: #202020;\n\n  font-size: 12px;\n  font-weight: 650;\n}\n\n.cc-fh-customize-optionAddButton {\n  min-width: 66px;\n  height: 33px;\n\n  padding: 0 12px;\n\n  border: 1px solid #ef1b23;\n  border-radius: 8px;\n\n  background: #ffffff;\n  color: #ef1b23;\n\n  font: inherit;\n  font-size: 12px;\n  font-weight: 650;\n\n  cursor: pointer;\n}\n\n.cc-fh-customize-optionAddButtonSelected {\n  background: #ef1b23;\n  color: #ffffff;\n}\n\n.cc-fh-customize-modalFooter {\n  display: flex;\n\n  align-items: center;\n  justify-content: space-between;\n\n  gap: 18px;\n\n  padding: 16px 22px;\n\n  border-top:\n    1px solid #eeeeee;\n\n  background: #ffffff;\n}\n\n.cc-fh-customize-footerTotal {\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n}\n\n.cc-fh-customize-footerTotal span {\n  color: #777777;\n  font-size: 11px;\n}\n\n.cc-fh-customize-footerTotal strong {\n  color: #171717;\n  font-size: 19px;\n}\n\n.cc-fh-customize-cartButton {\n  min-width: 145px;\n  height: 43px;\n\n  padding: 0 20px;\n\n  border: 1px solid #ef1b23;\n  border-radius: 9px;\n\n  background: #ef1b23;\n  color: #ffffff;\n\n  font: inherit;\n  font-size: 13px;\n  font-weight: 700;\n\n  cursor: pointer;\n}\n\n.cc-fh-customize-cartButton:disabled {\n  border-color: #dddddd;\n  background: #eeeeee;\n  color: #999999;\n  cursor: not-allowed;\n}\n\n.cc-fh-customize-addButton:focus-visible,\n.cc-fh-customize-detailsButton:focus-visible,\n.cc-fh-customize-closeButton:focus-visible,\n.cc-fh-customize-optionAddButton:focus-visible,\n.cc-fh-customize-stepper button:focus-visible,\n.cc-fh-customize-cartButton:focus-visible {\n  outline: 2px solid\n    rgba(239, 27, 35, 0.45);\n  outline-offset: 2px;\n}\n\n@media (max-width: 760px) {\n  .cc-fh-customize-section {\n    margin-top: 25px;\n    padding-top: 22px;\n    scroll-margin-top: 140px;\n  }\n\n  .cc-fh-customize-sectionTitle {\n    margin-bottom: 18px;\n    font-size: 27px;\n  }\n\n  .cc-fh-customize-promoBanner {\n    min-height: 190px;\n  }\n\n  .cc-fh-customize-promoContent {\n    min-height: 190px;\n    width: 67%;\n    padding: 22px 16px;\n  }\n\n  .cc-fh-customize-badge {\n    margin-bottom: 12px;\n    padding: 6px 10px;\n    font-size: 10px;\n  }\n\n  .cc-fh-customize-promoHeading {\n    font-size: 18px;\n  }\n\n  .cc-fh-customize-promoDescription {\n    margin-top: 8px;\n    font-size: 12px;\n  }\n\n  .cc-fh-customize-serviceHeader {\n    padding-top: 17px;\n  }\n\n  .cc-fh-customize-serviceTitle {\n    font-size: 16px;\n  }\n\n  .cc-fh-customize-serviceMeta {\n    font-size: 12px;\n  }\n\n  .cc-fh-customize-addButton {\n    min-width: 72px;\n    min-height: 39px;\n    padding: 7px 15px;\n    font-size: 14px;\n  }\n\n  .cc-fh-customize-backdrop {\n    align-items: flex-end;\n    padding: 0;\n  }\n\n  .cc-fh-customize-modal {\n    width: 100%;\n    max-height: 88vh;\n\n    border-radius:\n      18px 18px 0 0;\n  }\n\n  .cc-fh-customize-modalHeader {\n    padding:\n      18px 16px 14px;\n  }\n\n  .cc-fh-customize-modalHeader h2 {\n    font-size: 21px;\n  }\n\n  .cc-fh-customize-closeButton {\n    width: 37px;\n    height: 37px;\n    flex-basis: 37px;\n  }\n\n  .cc-fh-customize-modalSummary {\n    padding: 11px 16px;\n  }\n\n  .cc-fh-customize-modalBody {\n    padding: 14px 12px;\n  }\n\n  .cc-fh-customize-optionRow {\n    min-height: 64px;\n    padding: 10px;\n  }\n\n  .cc-fh-customize-optionCopy h3 {\n    font-size: 12px;\n  }\n\n  .cc-fh-customize-modalFooter {\n    padding:\n      13px 12px\n      calc(\n        13px +\n        env(safe-area-inset-bottom)\n      );\n  }\n\n  .cc-fh-customize-cartButton {\n    min-width: 128px;\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .cc-fh-customize-addButton,\n  .cc-fh-customize-optionRow {\n    transition: none;\n  }\n}\n\n/* CITY_COOLIES_CUSTOMIZE_MODAL_REFERENCE_START */\n\n/*\n  Customize Cleaning popup.\n\n  Desktop size follows the Full Apartment\n  requirements popup reference.\n\n  Header, summary and footer stay fixed.\n  Only the middle services area scrolls.\n*/\n\n@media (min-width: 621px) {\n\n  .cc-fh-customize-backdrop {\n    display: flex !important;\n\n    align-items: center !important;\n    justify-content: center !important;\n\n    padding:\n      24px\n      20px !important;\n  }\n\n  .cc-fh-customize-modal {\n    position: relative !important;\n\n    display: flex !important;\n\n    width: 472px !important;\n    max-width: 472px !important;\n\n    height: 635px !important;\n    max-height: min(\n      635px,\n      calc(100dvh - 48px)\n    ) !important;\n\n    min-height: 0 !important;\n\n    margin: 0 !important;\n    padding: 0 !important;\n\n    flex-direction: column !important;\n\n    overflow: hidden !important;\n\n    border-radius: 18px !important;\n  }\n\n  /*\n    Fixed top header.\n  */\n  .cc-fh-customize-modalHeader {\n    flex:\n      0\n      0\n      auto !important;\n\n    padding:\n      22px\n      28px\n      18px !important;\n  }\n\n  .cc-fh-customize-modalHeader h2 {\n    font-size: 28px !important;\n    line-height: 1.15 !important;\n  }\n\n  .cc-fh-customize-modalHeader p {\n    margin-top: 7px !important;\n\n    font-size: 14px !important;\n    line-height: 1.4 !important;\n  }\n\n  /*\n    Fixed selection summary.\n  */\n  .cc-fh-customize-modalSummary {\n    flex:\n      0\n      0\n      auto !important;\n\n    min-height: 62px !important;\n\n    padding:\n      14px\n      28px !important;\n  }\n\n  /*\n    ONLY this middle area scrolls.\n  */\n  .cc-fh-customize-modalBody {\n    box-sizing: border-box !important;\n\n    flex:\n      1\n      1\n      auto !important;\n\n    min-height: 0 !important;\n\n    padding:\n      16px\n      18px !important;\n\n    overflow-x: hidden !important;\n    overflow-y: auto !important;\n\n    overscroll-behavior:\n      contain !important;\n\n    scrollbar-width:\n      thin;\n\n    scrollbar-color:\n      #c6c6c6\n      transparent;\n\n    -webkit-overflow-scrolling:\n      touch;\n  }\n\n  .cc-fh-customize-modalBody::-webkit-scrollbar {\n    width: 5px;\n  }\n\n  .cc-fh-customize-modalBody::-webkit-scrollbar-track {\n    background:\n      transparent;\n  }\n\n  .cc-fh-customize-modalBody::-webkit-scrollbar-thumb {\n    border-radius:\n      999px;\n\n    background:\n      #c6c6c6;\n  }\n\n  .cc-fh-customize-serviceList {\n    width: 100% !important;\n\n    margin: 0 !important;\n    padding: 0 !important;\n  }\n\n  /*\n    Slightly more compact service rows,\n    matching the smaller popup width.\n  */\n  .cc-fh-customize-optionRow {\n    box-sizing: border-box !important;\n\n    width: 100% !important;\n\n    min-height: 68px !important;\n\n    padding:\n      11px\n      14px !important;\n  }\n\n  .cc-fh-customize-optionCopy {\n    min-width: 0 !important;\n  }\n\n  .cc-fh-customize-optionCopy h3 {\n    font-size: 14px !important;\n    line-height: 1.3 !important;\n  }\n\n  .cc-fh-customize-optionCopy p {\n    margin-top: 5px !important;\n  }\n\n  /*\n    Keep quantity control compact.\n  */\n  .cc-fh-customize-stepper {\n    flex:\n      0\n      0\n      auto !important;\n\n    min-width: 104px !important;\n  }\n\n  /*\n    Fixed bottom footer.\n  */\n  .cc-fh-customize-modalFooter {\n    flex:\n      0\n      0\n      auto !important;\n\n    min-height: 74px !important;\n\n    padding:\n      11px\n      18px !important;\n\n    background:\n      #ffffff !important;\n  }\n\n  .cc-fh-customize-cartButton {\n    min-width: 150px !important;\n  }\n}\n\n/* ========================================================\n   PHONE\n   ======================================================== */\n\n@media (max-width: 620px) {\n\n  .cc-fh-customize-backdrop {\n    align-items:\n      flex-end !important;\n\n    padding:\n      0 !important;\n  }\n\n  .cc-fh-customize-modal {\n    display:\n      flex !important;\n\n    width:\n      100% !important;\n\n    max-width:\n      100% !important;\n\n    height:\n      min(88dvh, 700px) !important;\n\n    max-height:\n      88dvh !important;\n\n    min-height:\n      0 !important;\n\n    flex-direction:\n      column !important;\n\n    overflow:\n      hidden !important;\n\n    border-radius:\n      18px\n      18px\n      0\n      0 !important;\n  }\n\n  .cc-fh-customize-modalHeader,\n  .cc-fh-customize-modalSummary,\n  .cc-fh-customize-modalFooter {\n    flex:\n      0\n      0\n      auto !important;\n  }\n\n  .cc-fh-customize-modalHeader {\n    padding:\n      18px\n      16px\n      14px !important;\n  }\n\n  .cc-fh-customize-modalHeader h2 {\n    font-size:\n      21px !important;\n  }\n\n  .cc-fh-customize-modalSummary {\n    padding:\n      11px\n      16px !important;\n  }\n\n  .cc-fh-customize-modalBody {\n    flex:\n      1\n      1\n      auto !important;\n\n    min-height:\n      0 !important;\n\n    padding:\n      14px\n      12px !important;\n\n    overflow-x:\n      hidden !important;\n\n    overflow-y:\n      auto !important;\n\n    overscroll-behavior:\n      contain !important;\n\n    -webkit-overflow-scrolling:\n      touch;\n  }\n\n  .cc-fh-customize-optionRow {\n    min-height:\n      64px !important;\n\n    padding:\n      10px !important;\n  }\n\n  .cc-fh-customize-modalFooter {\n    padding:\n      13px\n      12px\n      calc(\n        13px +\n        env(safe-area-inset-bottom)\n      ) !important;\n  }\n}\n\n/* CITY_COOLIES_CUSTOMIZE_MODAL_REFERENCE_END */\n\n/* CITY_COOLIES_CUSTOMIZE_RATING_V3_START */\n\n/* Main service rating */\n\n.cc-fh-customize-ccRatingInline {\n  display: inline-flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 5px;\n  margin-top: 10px;\n  vertical-align: middle;\n  color: #555555;\n  font-size: 14px;\n  line-height: 1.4;\n}\n\n.cc-fh-customize-ccRatingStar {\n  display: inline-flex;\n  width: 20px;\n  height: 20px;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n  background: #ef1b23;\n  color: #ffffff;\n  font-size: 11px;\n  line-height: 1;\n}\n\n.cc-fh-customize-ccRatingScore {\n  font-weight: 500;\n}\n\n.cc-fh-customize-ccRatingReviews {\n  text-decoration: underline;\n  text-underline-offset: 2px;\n}\n\n/* Place the existing View details button beside the rating */\n\n.cc-fh-customize-ccRatingInline + .cc-fh-customize-detailsButton {\n  display: inline-flex !important;\n  align-items: center;\n  margin: 10px 0 0 10px !important;\n  padding: 0 !important;\n  vertical-align: middle;\n  line-height: 1.4;\n}\n\n/* Popup rating section */\n\n.cc-fh-customize-ccOverallRating {\n  box-sizing: border-box;\n  width: 100%;\n  margin-top: 26px;\n  padding: 24px 2px 16px;\n  border-top: 1px solid #f0dfe2;\n  background: #ffffff;\n}\n\n.cc-fh-customize-ccRatingHeading {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n\n.cc-fh-customize-ccGoldStar {\n  color: #f4b400;\n  font-size: 29px;\n  line-height: 1;\n}\n\n.cc-fh-customize-ccRatingHeading strong {\n  color: #222222;\n  font-size: 36px;\n  font-weight: 700;\n  line-height: 1;\n}\n\n.cc-fh-customize-ccReviewCount {\n  margin: 12px 0 24px;\n  color: #777777;\n  font-size: 15px;\n  line-height: 1.4;\n}\n\n.cc-fh-customize-ccRatingBars {\n  display: flex;\n  flex-direction: column;\n  gap: 17px;\n}\n\n.cc-fh-customize-ccRatingBarRow {\n  display: grid;\n  grid-template-columns: 38px minmax(0, 1fr) 42px;\n  align-items: center;\n  gap: 10px;\n  width: 100%;\n}\n\n.cc-fh-customize-ccStarLabel {\n  display: inline-flex;\n  align-items: center;\n  gap: 2px;\n  color: #555555;\n  font-size: 15px;\n}\n\n.cc-fh-customize-ccStarLabel span {\n  color: #f4b400;\n}\n\n.cc-fh-customize-ccRatingTrack {\n  width: 100%;\n  height: 6px;\n  overflow: hidden;\n  border-radius: 999px;\n  background: #dddddd;\n}\n\n.cc-fh-customize-ccRatingFill {\n  height: 100%;\n  border-radius: inherit;\n  background: #ef1b23;\n}\n\n.cc-fh-customize-ccPercentage {\n  color: #777777;\n  font-size: 14px;\n  text-align: right;\n}\n\n@media (max-width: 620px) {\n  .cc-fh-customize-ccRatingInline {\n    gap: 4px;\n    font-size: 12px;\n  }\n\n  .cc-fh-customize-ccRatingInline + .cc-fh-customize-detailsButton {\n    margin-left: 7px !important;\n  }\n\n  .cc-fh-customize-ccOverallRating {\n    padding: 20px 2px 12px;\n  }\n\n  .cc-fh-customize-ccRatingHeading strong {\n    font-size: 31px;\n  }\n\n  .cc-fh-customize-ccRatingBarRow {\n    grid-template-columns: 34px minmax(0, 1fr) 38px;\n    gap: 8px;\n  }\n\n  .cc-fh-customize-ccStarLabel,\n  .cc-fh-customize-ccPercentage {\n    font-size: 13px;\n  }\n}\n\n/* CITY_COOLIES_CUSTOMIZE_RATING_V3_END */\n\n/* CITY_COOLIES_CUSTOMIZE_BANNER_IMAGE_START */\n\n/*\n  Customize Cleaning banner.\n\n  Display the supplied image directly.\n  Keep its actual aspect ratio on all screen sizes.\n  Never crop or stretch the image.\n*/\n\n.cc-fh-customize-section .cc-fh-customize-promoBanner {\n    box-sizing: border-box !important;\n\n    display: block !important;\n\n    width: 100% !important;\n    height: auto !important;\n    min-height: 0 !important;\n\n    aspect-ratio: 1983 / 793 !important;\n\n    margin: 0 !important;\n    padding: 0 !important;\n\n    border: 0 !important;\n    border-radius: 0 !important;\n    box-shadow: none !important;\n\n    overflow: hidden !important;\n\n    background-color: #fff7f8 !important;\n\n    background-image:\n        url(\"/deep-cleaning/customize-cleaning-banner.webp\") !important;\n\n    background-position: center center !important;\n    background-repeat: no-repeat !important;\n    background-size: contain !important;\n}\n\n/*\n  Remove all promotional content from the banner.\n  Do not affect the service title, rating or buttons below it.\n*/\n\n.cc-fh-customize-section .cc-fh-customize-promoBanner \u003e .cc-fh-customize-promoContent {\n    display: none !important;\n}\n\n.cc-fh-customize-section .cc-fh-customize-promoBanner::before,\n.cc-fh-customize-section .cc-fh-customize-promoBanner::after {\n    display: none !important;\n    content: none !important;\n}\n\n/* CITY_COOLIES_CUSTOMIZE_BANNER_IMAGE_END */\n\n/* CITY_COOLIES_MOBILE_POPUP_LAYOUT_FIX_START */\n@media (max-width: 620px) {\n  .cc-fh-customize-backdrop { position: fixed !important; inset: 0 !important; display: flex !important; align-items: flex-end !important; padding: 0 !important; overflow: hidden !important; }\n  .cc-fh-customize-modal { position: relative !important; display: flex !important; flex-direction: column !important; width: 100% !important; max-width: 100% !important; height: min(88dvh, 700px) !important; max-height: 88dvh !important; min-height: 0 !important; overflow: hidden !important; border-radius: 18px 18px 0 0 !important; }\n  .cc-fh-customize-modalHeader, .cc-fh-customize-modalSummary, .cc-fh-customize-modalFooter { flex: 0 0 auto !important; }\n  .cc-fh-customize-modalBody { flex: 1 1 0% !important; min-height: 0 !important; height: auto !important; overflow-x: hidden !important; overflow-y: auto !important; }\n  .cc-fh-customize-modalFooter { position: relative !important; display: flex !important; width: 100% !important; box-sizing: border-box !important; padding-bottom: max(12px, env(safe-area-inset-bottom)) !important; background: #fff !important; }\n}\n/* CITY_COOLIES_MOBILE_POPUP_LAYOUT_FIX_END */\n";






export default function CustomizeCleaning() {
  return (
    <>
      <style>{CITY_COOLIES_INLINE_CSS_CUSTOMIZECLEANING}</style>
      <section
        id="customize-cleaning-section"
        className={"cc-fh-customize-section"}
        aria-labelledby="customize-cleaning-heading"
      >
        <h2
          id="customize-cleaning-heading"
          className={"cc-fh-customize-sectionTitle"}
        >
          Customize Cleaning
        </h2>

        <div className={"cc-fh-customize-promoBanner"}>
          <div
            className={
              "cc-fh-customize-promoContent"
            }
          >
            <span className={"cc-fh-customize-badge"}>
              Make your package
            </span>

            <h3 className={"cc-fh-customize-promoHeading"}>
              Cleaning built around
              your home
            </h3>

            <p
              className={
                "cc-fh-customize-promoDescription"
              }
            >
              Choose only the rooms and
              areas you want cleaned.
            </p>
          </div>
        </div>

        <div
          className={
            "cc-fh-customize-serviceHeader"
          }
        >
          <div
            className={
              "cc-fh-customize-serviceInformation"
            }
          >
            <h3
              className={
                "cc-fh-customize-serviceTitle"
              }
            >
              Customize your home cleaning
            </h3>

            <p className={"cc-fh-customize-serviceMeta"}>
              Bedroom, living room,
              restroom, balcony & more
            </p>
            {/* CITY_COOLIES_CUSTOMIZE_RATING_MAIN_V3 */}
            <span
              className={"cc-fh-customize-ccRatingInline"}
              aria-label="Rated 4.1 out of 5"
            >
              <span
                className={"cc-fh-customize-ccRatingStar"}
                aria-hidden="true"
              >
                ★
              </span>

              <span className={"cc-fh-customize-ccRatingScore"}>
                4.1
              </span>

              <span className={"cc-fh-customize-ccRatingReviews"}>
                (900 reviews)
              </span>
            </span>

<Link
              href={FULL_HOME_DETAILS_PATH + "customize-cleaning"}
              className={"cc-fh-customize-detailsButton"}
              style={{ textDecoration: "none" }}
            >
              View details
            </Link>
          </div>

          <Link
            href={FULL_HOME_DETAILS_PATH + "customize-cleaning"}
            className={"cc-fh-customize-addButton"}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
            }}
          >
            Add
          </Link>
        </div>
      </section>

    </>
  );
}
