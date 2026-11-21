"use client";
const CITY_COOLIES_INLINE_CSS_FULLHOMEBYROOMCLEANINGSECTION = ".cc-fh-main-pageSection {\n  box-sizing: border-box;\n\n  display: grid;\n\n  width: 100%;\n  max-width: 1360px;\n\n  height: calc(100dvh - 325px);\n  min-height: 520px;\n\n  margin: 0 auto;\n\n  grid-template-columns:\n    minmax(300px, 340px)\n    minmax(500px, 590px)\n    minmax(270px, 310px);\n\n  gap: 28px;\n\n  align-items: stretch;\n\n  overflow: hidden;\n}\n\n.cc-fh-main-leftColumn {\n  min-width: 0;\n  height: 100%;\n\n  overflow: hidden;\n\n  padding-top: 4px;\n}\n\n.header {\n  margin: 0 0 38px;\n}\n\n.title {\n  margin: 0;\n\n  color: #111111;\n\n  font-size: 42px;\n  font-weight: 500;\n  line-height: 1.13;\n\n  letter-spacing: -0.035em;\n}\n\n.ratingRow {\n  display: flex;\n  align-items: center;\n\n  gap: 9px;\n\n  margin-top: 10px;\n}\n\n.ratingIcon {\n  display: inline-flex;\n\n  width: 20px;\n  height: 20px;\n\n  flex: 0 0 20px;\n\n  align-items: center;\n  justify-content: center;\n\n  border-radius: 50%;\n\n  background: #ef1b23;\n  color: #ffffff;\n\n  font-size: 11px;\n  line-height: 1;\n}\n\n.ratingText {\n  color: #171717;\n\n  font-size: 17px;\n  font-weight: 400;\n\n  line-height: 1.3;\n}\n\n.cc-fh-main-selectorBox {\n  box-sizing: border-box;\n\n  width: 100%;\n\n  padding: 21px 17px 25px;\n\n  border: 1px solid #dddddd;\n  border-radius: 10px;\n\n  background: #ffffff;\n}\n\n.selectorHeadingRow {\n  display: flex;\n\n  align-items: center;\n\n  gap: 16px;\n\n  margin-bottom: 27px;\n}\n\n.selectorHeading {\n  flex: 0 0 auto;\n\n  margin: 0;\n\n  color: #5e5e5e;\n\n  font-size: 14px;\n  font-weight: 400;\n\n  line-height: 1.3;\n}\n\n.headingLine {\n  display: block;\n\n  width: 100%;\n  height: 1px;\n\n  background: #e1e1e1;\n}\n\n.cc-fh-main-serviceGrid {\n  display: grid;\n\n  grid-template-columns:\n    repeat(3, minmax(0, 1fr));\n\n  column-gap: 15px;\n\n  align-items: start;\n}\n\n.cc-fh-main-serviceItem {\n  display: flex;\n\n  min-width: 0;\n\n  padding: 0;\n\n  flex-direction: column;\n\n  align-items: center;\n\n  border: 0;\n\n  background: transparent;\n\n  color: inherit;\n\n  font: inherit;\n\n  text-align: center;\n\n  cursor: pointer;\n}\n\n.cc-fh-main-serviceImage {\n  display: block;\n\n  width: 68px;\n  height: 68px;\n\n  object-fit: contain;\n  object-position: center;\n\n  border: 1px solid transparent;\n  border-radius: 9px;\n}\n\n.cc-fh-main-serviceItemActive .cc-fh-main-serviceImage {\n  border-color: #444444;\n  box-shadow:\n    0 0 0 1px #ffffff,\n    0 0 0 2px #777777;\n}\n\n.cc-fh-main-serviceName {\n  display: block;\n\n  margin-top: 10px;\n\n  color: #171717;\n\n  font-size: 13px;\n  font-weight: 400;\n\n  line-height: 1.35;\n}\n\n.cc-fh-main-middleColumn {\n  min-width: 0;\n  min-height: 0;\n\n  height: 100%;\n\n  overflow-x: hidden;\n  overflow-y: auto;\n\n  padding:\n    0\n    30px\n    60px;\n\n  border-left: 1px solid #eeeeee;\n  border-right: 0;\n\n  overscroll-behavior: contain;\n\n  scrollbar-width: thin;\n  scrollbar-color: #b7b7b7 transparent;\n\n  scrollbar-gutter: stable;\n}\n\n.cc-fh-main-middleColumn::-webkit-scrollbar {\n  width: 6px;\n}\n\n.cc-fh-main-middleColumn::-webkit-scrollbar-track {\n  background: transparent;\n}\n\n.cc-fh-main-middleColumn::-webkit-scrollbar-thumb {\n  border-radius: 999px;\n  background: #b7b7b7;\n}\n\n.cc-fh-main-rightColumn {\n  min-width: 0;\n\n  height: 100%;\n\n  overflow: hidden;\n\n  padding-top: 18px;\n}\n\n@media (max-width: 1220px) {\n  .cc-fh-main-pageSection {\n    grid-template-columns:\n      minmax(280px, 320px)\n      minmax(470px, 1fr)\n      270px;\n\n    gap: 20px;\n  }\n\n  .cc-fh-main-middleColumn {\n    padding-right: 22px;\n    padding-left: 22px;\n  }\n}\n\n@media (max-width: 1020px) {\n  .cc-fh-main-pageSection {\n    height: auto;\n    min-height: 0;\n\n    grid-template-columns:\n      minmax(280px, 330px)\n      minmax(0, 1fr);\n\n    overflow: visible;\n  }\n\n  .cc-fh-main-leftColumn,\n  .cc-fh-main-middleColumn,\n  .cc-fh-main-rightColumn {\n    height: auto;\n    overflow: visible;\n  }\n\n  .cc-fh-main-middleColumn {\n    padding-bottom: 30px;\n\n    border-right: 0;\n  }\n\n  .cc-fh-main-rightColumn {\n    grid-column: 2;\n\n    padding:\n      0\n      22px\n      40px;\n\n    border-left: 1px solid #eeeeee;\n  }\n}\n\n@media (max-width: 760px) {\n  .cc-fh-main-pageSection {\n    display: block;\n\n    width: 100%;\n\n    height: auto;\n\n    overflow: visible;\n  }\n\n  .cc-fh-main-leftColumn {\n    width: 100%;\n  }\n\n  .header {\n    margin-bottom: 28px;\n  }\n\n  .title {\n    font-size: 32px;\n    line-height: 1.14;\n  }\n\n  .cc-fh-main-selectorBox {\n    padding: 18px 14px 22px;\n  }\n\n  .cc-fh-main-serviceGrid {\n    column-gap: 10px;\n  }\n\n  .cc-fh-main-serviceImage {\n    width: 62px;\n    height: 62px;\n  }\n\n  .cc-fh-main-serviceName {\n    font-size: 11.5px;\n  }\n\n  .cc-fh-main-middleColumn {\n    width: 100%;\n\n    margin-top: 42px;\n\n    padding:\n      0\n      0\n      38px;\n\n    border: 0;\n\n    overflow: visible;\n  }\n\n  .cc-fh-main-rightColumn {\n    width: 100%;\n\n    padding:\n      0\n      0\n      40px;\n\n    border: 0;\n\n    overflow: visible;\n  }\n}\n\n/* CITY_COOLIES_NORMAL_PAGE_SCROLL_START */\n\n@media (min-width: 1021px) {\n  .cc-fh-main-pageSection {\n    height: auto;\n    min-height: 0;\n    overflow: visible;\n    align-items: start;\n  }\n\n  .cc-fh-main-leftColumn {\n    position: sticky;\n    top: 150px;\n\n    height: auto;\n    overflow: visible;\n  }\n\n  .cc-fh-main-middleColumn {\n    height: auto;\n    min-height: 0;\n\n    overflow: visible;\n\n    padding-bottom: 80px;\n\n    scrollbar-width: none;\n  }\n\n  .cc-fh-main-middleColumn::-webkit-scrollbar {\n    display: none;\n  }\n\n  .cc-fh-main-rightColumn {\n    position: sticky;\n    top: 150px;\n\n    height: auto;\n    overflow: visible;\n  }\n}\n\n/* CITY_COOLIES_NORMAL_PAGE_SCROLL_END */\n\n/* CITY_COOLIES_BRAND_THEME_START */\n\n.cc-fh-main-pageSection {\n  background:\n    linear-gradient(\n      180deg,\n      #ffffff 0%,\n      #fffafb 48%,\n      #fff6f8 100%\n    );\n}\n\n.cc-fh-main-middleColumn {\n  border-left-color: #f4d9de;\n  border-right: 0;\n}\n\n.cc-fh-main-selectorBox {\n  border-color: #f0d6db;\n  background: #ffffff;\n}\n\n.headingLine {\n  background: #f1d8dd;\n}\n\n.cc-fh-main-serviceItemActive .cc-fh-main-serviceImage {\n  border-color: #ef1b23;\n\n  box-shadow:\n    0 0 0 1px #ffffff,\n    0 0 0 2px rgba(239, 27, 35, 0.28);\n}\n\n.ratingIcon {\n  background: #ef1b23;\n}\n\n/* CITY_COOLIES_BRAND_THEME_END */\n\n/* CITY_COOLIES_MAIN_HEADING_SIZE_START */\n\n.title {\n  font-size: 36px;\n  font-weight: 500;\n  line-height: 1.14;\n  letter-spacing: -0.025em;\n}\n\n@media (max-width: 760px) {\n  .title {\n    font-size: 28px;\n    line-height: 1.16;\n  }\n}\n\n/* CITY_COOLIES_MAIN_HEADING_SIZE_END */\n\n/* CITY_COOLIES_COMPACT_LEFT_PANEL_START */\n\n.title {\n  font-size: 31px;\n  font-weight: 500;\n  line-height: 1.12;\n  letter-spacing: -0.02em;\n}\n\n.ratingRow {\n  margin-top: 9px;\n}\n\n.ratingText {\n  font-size: 15px;\n}\n\n.ratingIcon {\n  width: 18px;\n  height: 18px;\n  flex-basis: 18px;\n  font-size: 10px;\n}\n\n.cc-fh-main-selectorBox {\n  width: 92%;\n  max-width: 320px;\n  padding: 17px 14px 20px;\n  border-radius: 9px;\n}\n\n.selectorHeadingRow {\n  gap: 12px;\n  margin-bottom: 22px;\n}\n\n.selectorHeading {\n  font-size: 13px;\n}\n\n.cc-fh-main-serviceGrid {\n  column-gap: 11px;\n}\n\n.cc-fh-main-serviceImage {\n  width: 60px;\n  height: 60px;\n  border-radius: 8px;\n}\n\n.cc-fh-main-serviceName {\n  margin-top: 8px;\n  font-size: 12px;\n  line-height: 1.3;\n}\n\n@media (max-width: 760px) {\n  .title {\n    font-size: 26px;\n    line-height: 1.14;\n  }\n\n  .ratingText {\n    font-size: 14px;\n  }\n\n  .cc-fh-main-selectorBox {\n    width: 100%;\n    max-width: 310px;\n    padding: 15px 12px 18px;\n  }\n\n  .selectorHeadingRow {\n    margin-bottom: 19px;\n  }\n\n  .cc-fh-main-serviceImage {\n    width: 56px;\n    height: 56px;\n  }\n\n  .cc-fh-main-serviceName {\n    font-size: 11px;\n  }\n}\n\n/* CITY_COOLIES_COMPACT_LEFT_PANEL_END */\n\n/* CITY_COOLIES_FINAL_RATING_STAR_START */\n\n.ratingRow {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-top: 10px;\n}\n\n.ratingIcon {\n  display: inline-flex;\n\n  width: 18px;\n  height: 18px;\n  min-width: 18px;\n  flex: 0 0 18px;\n\n  align-items: center;\n  justify-content: center;\n\n  padding: 0;\n  margin: 0;\n\n  border: 0;\n  border-radius: 0;\n\n  background: linear-gradient(\n    145deg,\n    #ff4f55 0%,\n    #ef1b23 46%,\n    #c90008 100%\n  );\n\n  -webkit-background-clip: text;\n  background-clip: text;\n\n  color: transparent;\n\n  font-size: 19px;\n  font-weight: 900;\n  line-height: 1;\n\n  transform: translateY(-1px);\n\n  text-shadow:\n    0 1px 1px rgba(130, 0, 5, 0.18);\n\n  filter:\n    drop-shadow(0 1px 1px rgba(140, 0, 5, 0.16));\n}\n\n.ratingText {\n  margin: 0;\n\n  color: #252525;\n\n  font-size: 15px;\n  font-weight: 400;\n  line-height: 1.25;\n\n  letter-spacing: 0;\n}\n\n@media (max-width: 760px) {\n  .ratingRow {\n    gap: 7px;\n  }\n\n  .ratingIcon {\n    width: 17px;\n    height: 17px;\n    min-width: 17px;\n    flex-basis: 17px;\n\n    font-size: 18px;\n  }\n\n  .ratingText {\n    font-size: 14px;\n  }\n}\n\n/* CITY_COOLIES_FINAL_RATING_STAR_END */\n\n/* CITY_COOLIES_DIRECT_SERVICE_SELECTOR_START */\n\n/*\n * Left service selector only.\n * Removes the visible outer card/box.\n * Keeps the existing three service images, names,\n * spacing, selection state and functionality.\n */\n.cc-fh-main-selectorBox {\n  box-sizing: border-box !important;\n\n  width: 92% !important;\n  max-width: 320px !important;\n\n  padding: 0 !important;\n\n  border: 0 !important;\n  border-radius: 0 !important;\n\n  background: transparent !important;\n  box-shadow: none !important;\n}\n\n@media (max-width: 760px) {\n  .cc-fh-main-selectorBox {\n    width: 100% !important;\n    max-width: 310px !important;\n\n    padding: 0 !important;\n  }\n}\n\n/* CITY_COOLIES_DIRECT_SERVICE_SELECTOR_END */\n\n/* CITY_COOLIES_HOME_TYPE_BUTTONS_START */\n\n.cc-fh-main-homeTypeButtons {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n\n  width: 100%;\n\n  margin: 0 0 22px;\n}\n\n.cc-fh-main-homeTypeButton {\n  display: inline-flex;\n\n  min-width: 104px;\n  height: 36px;\n\n  align-items: center;\n  justify-content: center;\n\n  padding: 0 16px;\n\n  border: 1px solid #ef1b23;\n  border-radius: 8px;\n\n  background: #ffffff;\n  color: #ef1b23;\n\n  font: inherit;\n  font-size: 12.5px;\n  font-weight: 600;\n  line-height: 1;\n\n  cursor: pointer;\n\n  transition:\n    background-color 160ms ease,\n    color 160ms ease,\n    border-color 160ms ease,\n    box-shadow 160ms ease;\n}\n\n.cc-fh-main-homeTypeButton:hover {\n  background: #fff5f6;\n}\n\n.cc-fh-main-homeTypeButtonActive {\n  border-color: #ef1b23;\n\n  background: #ef1b23;\n  color: #ffffff;\n\n  box-shadow:\n    0 5px 14px rgba(239, 27, 35, 0.16);\n}\n\n.cc-fh-main-homeTypeButtonActive:hover {\n  background: #ef1b23;\n  color: #ffffff;\n}\n\n.cc-fh-main-homeTypeButton:focus-visible {\n  outline: 2px solid #ef1b23;\n  outline-offset: 3px;\n}\n\n@media (max-width: 760px) {\n  .cc-fh-main-homeTypeButtons {\n    gap: 8px;\n    margin-bottom: 19px;\n  }\n\n  .cc-fh-main-homeTypeButton {\n    min-width: 98px;\n    height: 35px;\n\n    padding-inline: 14px;\n\n    font-size: 12px;\n  }\n}\n\n/* CITY_COOLIES_HOME_TYPE_BUTTONS_END */\n\n/* CC_SELECTOR_ABOVE_APARTMENT_START */\n\n/*\n  Desktop structure:\n  Row 1 = Furnished / Unfurnished + service type selector\n  Row 2 = Full apartment service content\n  Right  = Existing booking/sidebar\n*/\n\n@media (min-width: 1021px) {\n  .cc-fh-main-pageSection {\n    display: grid !important;\n\n    grid-template-columns:\n      minmax(0, 1fr)\n      minmax(270px, 310px) !important;\n\n    grid-template-areas:\n      \"selector sidebar\"\n      \"main sidebar\" !important;\n\n    column-gap: 28px !important;\n    row-gap: 22px !important;\n\n    align-items: start !important;\n\n    width: 100% !important;\n    max-width: 1100px !important;\n\n    height: auto !important;\n    min-height: 0 !important;\n\n    margin-inline: auto !important;\n\n    overflow: visible !important;\n  }\n\n  .cc-fh-main-leftColumn {\n    grid-area: selector !important;\n\n    position: static !important;\n    top: auto !important;\n\n    width: 100% !important;\n    height: auto !important;\n\n    padding: 0 !important;\n    margin: 0 !important;\n\n    overflow: visible !important;\n  }\n\n  .cc-fh-main-middleColumn {\n    grid-area: main !important;\n\n    width: 100% !important;\n    min-width: 0 !important;\n\n    margin: 0 !important;\n\n    padding:\n      0\n      0\n      80px !important;\n\n    border-left: 0 !important;\n    border-right: 0 !important;\n\n    overflow: visible !important;\n  }\n\n  .cc-fh-main-rightColumn {\n    grid-area: sidebar !important;\n\n    position: sticky !important;\n    top: 150px !important;\n\n    width: 100% !important;\n    min-width: 0 !important;\n\n    height: auto !important;\n\n    padding-top: 0 !important;\n\n    overflow: visible !important;\n  }\n\n  /*\n    Keep the selector aligned directly above\n    the Full apartment section.\n  */\n  .cc-fh-main-selectorBox {\n    margin: 0 !important;\n  }\n}\n\n/*\n  Tablet/mobile already stack naturally.\n  Keep selector before service content.\n*/\n@media (max-width: 1020px) {\n  .cc-fh-main-leftColumn {\n    order: 1 !important;\n  }\n\n  .cc-fh-main-middleColumn {\n    order: 2 !important;\n  }\n\n  .cc-fh-main-rightColumn {\n    order: 3 !important;\n  }\n}\n\n/* CC_SELECTOR_ABOVE_APARTMENT_END */\n\n/* CC_RESTORE_FULL_APARTMENT_WIDTH_START */\n\n@media (min-width: 1021px) {\n  .cc-fh-main-pageSection {\n    grid-template-columns:\n      minmax(500px, 590px)\n      minmax(270px, 310px) !important;\n\n    grid-template-areas:\n      \"selector sidebar\"\n      \"main sidebar\" !important;\n\n    justify-content: center !important;\n\n    column-gap: 28px !important;\n    row-gap: 22px !important;\n\n    max-width: 928px !important;\n    width: 100% !important;\n\n    margin-inline: auto !important;\n  }\n\n  .cc-fh-main-leftColumn {\n    grid-area: selector !important;\n\n    width: 100% !important;\n    max-width: 590px !important;\n  }\n\n  .cc-fh-main-middleColumn {\n    grid-area: main !important;\n\n    width: 100% !important;\n    max-width: 590px !important;\n\n    padding-left: 0 !important;\n    padding-right: 0 !important;\n\n    border-left: 0 !important;\n    border-right: 0 !important;\n  }\n\n  .cc-fh-main-rightColumn {\n    grid-area: sidebar !important;\n\n    width: 100% !important;\n    max-width: 310px !important;\n  }\n}\n\n/* CC_RESTORE_FULL_APARTMENT_WIDTH_END */\n\n/* CC_FURNISHING_SERVICE_INLINE_START */\n\n/*\n  FINAL CITY COOLIES INLINE SELECTOR\n\n  Furnished / Unfurnished stay on the left.\n\n  Directly beside them:\n  1. Full apartment\n  2. Full bungalow/duplex\n  3. Villa Cleaning\n  4. Customize Cleaning\n\n  Existing image size is preserved.\n  No slider.\n  No scrollbar.\n  No enlarged selector box.\n*/\n\n.cc-fh-main-selectorInlineRow {\n  display: flex !important;\n\n  width: 100% !important;\n\n  align-items: flex-start !important;\n  justify-content: flex-start !important;\n\n  gap: 18px !important;\n\n  margin: 0 !important;\n  padding: 0 !important;\n\n  overflow: visible !important;\n}\n\n/*\n  Keep Furnished / Unfurnished exactly as the\n  existing control group.\n*/\n.cc-fh-main-selectorInlineRow \u003e :first-child {\n  flex: 0 0 auto !important;\n\n  width: auto !important;\n\n  margin: 0 !important;\n\n  position: relative !important;\n  z-index: 2 !important;\n}\n\n/*\n  IMPORTANT:\n  The service grid must not shrink down to only\n  one visible item.\n\n  It keeps its natural four-item width and sits\n  directly beside the furnishing buttons.\n*/\n.cc-fh-main-selectorInlineRow .cc-fh-main-serviceGrid {\n  display: grid !important;\n\n  flex: 0 0 auto !important;\n\n  width: auto !important;\n  min-width: max-content !important;\n  max-width: none !important;\n\n  grid-template-columns:\n    repeat(4, 82px) !important;\n\n  grid-auto-flow: row !important;\n\n  column-gap: 12px !important;\n  row-gap: 0 !important;\n\n  align-items: start !important;\n  justify-items: center !important;\n\n  margin: 0 !important;\n\n  padding:\n    0\n    0\n    4px\n    6px !important;\n\n  overflow: visible !important;\n\n  scroll-snap-type: none !important;\n\n  scrollbar-width: none !important;\n}\n\n.cc-fh-main-selectorInlineRow .cc-fh-main-serviceGrid::-webkit-scrollbar {\n  display: none !important;\n\n  width: 0 !important;\n  height: 0 !important;\n}\n\n/*\n  Four service items remain independent and\n  cannot collapse into each other.\n*/\n.cc-fh-main-selectorInlineRow .cc-fh-main-serviceItem,\n.cc-fh-main-selectorInlineRow .cc-fh-main-serviceItem:nth-child(n) {\n  display: flex !important;\n\n  visibility: visible !important;\n  opacity: 1 !important;\n\n  width: 82px !important;\n  min-width: 82px !important;\n  max-width: 82px !important;\n\n  height: auto !important;\n\n  flex: 0 0 82px !important;\n\n  flex-direction: column !important;\n\n  align-items: center !important;\n  justify-content: flex-start !important;\n\n  margin: 0 !important;\n  padding: 0 !important;\n\n  border: 0 !important;\n\n  background: transparent !important;\n\n  box-shadow: none !important;\n\n  transform: none !important;\n\n  overflow: visible !important;\n}\n\n/*\n  DO NOT enlarge service images.\n  Preserve the existing compact size.\n*/\n.cc-fh-main-selectorInlineRow .cc-fh-main-serviceImage {\n  display: block !important;\n\n  visibility: visible !important;\n  opacity: 1 !important;\n\n  width: 60px !important;\n  height: 60px !important;\n\n  min-width: 60px !important;\n  min-height: 60px !important;\n\n  max-width: 60px !important;\n  max-height: 60px !important;\n\n  flex: 0 0 60px !important;\n\n  margin:\n    0\n    auto !important;\n\n  padding: 0 !important;\n\n  object-fit: cover !important;\n  object-position: center !important;\n}\n\n/*\n  Villa placeholder keeps exactly the same\n  60x60 visual space until its real image arrives.\n*/\n.cc-fh-main-selectorInlineRow .cc-fh-main-serviceImagePlaceholder {\n  display: block !important;\n\n  width: 60px !important;\n  height: 60px !important;\n\n  min-width: 60px !important;\n  min-height: 60px !important;\n\n  max-width: 60px !important;\n  max-height: 60px !important;\n\n  flex: 0 0 60px !important;\n\n  margin:\n    0\n    auto !important;\n\n  padding: 0 !important;\n\n  border: 0 !important;\n  border-radius: 0 !important;\n\n  background:\n    linear-gradient(\n      145deg,\n      #fff8f9 0%,\n      #fdecef 100%\n    ) !important;\n\n  box-shadow: none !important;\n}\n\n/*\n  Names remain directly below their own image.\n*/\n.cc-fh-main-selectorInlineRow .cc-fh-main-serviceName {\n  display: block !important;\n\n  visibility: visible !important;\n  opacity: 1 !important;\n\n  width: 82px !important;\n  max-width: 82px !important;\n\n  min-height: 32px !important;\n\n  margin:\n    8px\n    0\n    0 !important;\n\n  padding: 0 !important;\n\n  color: #171717 !important;\n\n  font-size: 11px !important;\n  font-weight: 400 !important;\n\n  line-height: 1.25 !important;\n\n  text-align: center !important;\n\n  white-space: normal !important;\n\n  word-break: normal !important;\n  overflow-wrap: normal !important;\n\n  overflow: visible !important;\n\n  text-overflow: clip !important;\n}\n\n/*\n  Keep parent containers from clipping the\n  four service options that extend to the right.\n*/\n.cc-fh-main-selectorBox,\n.cc-fh-main-leftColumn {\n  overflow: visible !important;\n}\n\n/*\n  Responsive phone/tablet:\n  furnishing controls first,\n  then all four services together.\n*/\n@media (max-width: 760px) {\n  .cc-fh-main-selectorInlineRow {\n    flex-direction: column !important;\n\n    gap: 16px !important;\n  }\n\n  .cc-fh-main-selectorInlineRow .cc-fh-main-serviceGrid {\n    width: 100% !important;\n    min-width: 0 !important;\n\n    grid-template-columns:\n      repeat(4, minmax(0, 1fr)) !important;\n\n    column-gap: 8px !important;\n\n    padding-left: 0 !important;\n  }\n\n  .cc-fh-main-selectorInlineRow .cc-fh-main-serviceItem,\n  .cc-fh-main-selectorInlineRow .cc-fh-main-serviceItem:nth-child(n) {\n    width: 100% !important;\n    min-width: 0 !important;\n    max-width: none !important;\n\n    flex: none !important;\n  }\n\n  .cc-fh-main-selectorInlineRow .cc-fh-main-serviceImage,\n  .cc-fh-main-selectorInlineRow .cc-fh-main-serviceImagePlaceholder {\n    width: 54px !important;\n    height: 54px !important;\n\n    min-width: 54px !important;\n    min-height: 54px !important;\n\n    max-width: 54px !important;\n    max-height: 54px !important;\n\n    flex-basis: 54px !important;\n  }\n\n  .cc-fh-main-selectorInlineRow .cc-fh-main-serviceName {\n    width: 100% !important;\n    max-width: 68px !important;\n\n    font-size: 10px !important;\n  }\n}\n\n/* CC_FURNISHING_SERVICE_INLINE_END */\n\n/* CC_SERVICE_SCROLL_TARGETS_START */\n\n#full-apartment-section,\n#full-bungalow-duplex-section,\n#customize-cleaning-section {\n  scroll-margin-top: 150px;\n}\n\n/*\n  Keep selector design exactly the same.\n  Customize Cleaning uses a normal thumbnail crop.\n*/\n.cc-fh-main-serviceItem img {\n  object-fit: cover;\n}\n\n/* CC_SERVICE_SCROLL_TARGETS_END */\n\n/* CC_ACTIVE_THUMBNAIL_EDGE_FIX_START */\n\n/*\n  Prevent the first selected service thumbnail border\n  from touching or clipping against the left edge.\n*/\n.cc-fh-main-serviceGrid {\n  box-sizing: border-box !important;\n  padding-left: 6px !important;\n  overflow: visible !important;\n}\n\n.cc-fh-main-serviceItem {\n  overflow: visible !important;\n}\n\n.cc-fh-main-serviceItem:first-child {\n  margin-left: 1px !important;\n}\n\n.cc-fh-main-serviceItemActive .cc-fh-main-serviceImage {\n  box-sizing: border-box !important;\n}\n\n/* CC_ACTIVE_THUMBNAIL_EDGE_FIX_END */\n\n/* CITY_COOLIES_DIRECT_SERVICE_IMAGES_START */\n\n/*\n * Full Home / By Room service selector images.\n *\n * Images are shown directly on the page.\n * No card border.\n * No selected red border.\n * No outline.\n * No shadow.\n * No artificial rounded image container.\n *\n * Button and scroll functionality remain unchanged.\n */\n\n.cc-fh-main-serviceImage {\n  border: 0 !important;\n  border-radius: 0 !important;\n  background: transparent !important;\n  box-shadow: none !important;\n  outline: 0 !important;\n}\n\n.cc-fh-main-serviceItemActive .cc-fh-main-serviceImage {\n  border: 0 !important;\n  border-color: transparent !important;\n  border-radius: 0 !important;\n  background: transparent !important;\n  box-shadow: none !important;\n  outline: 0 !important;\n}\n\n/* CITY_COOLIES_DIRECT_SERVICE_IMAGES_END */\n\n/* CITY_COOLIES_VILLA_DIRECT_IMAGE_START */\n\n/*\n  Villa Cleaning selector image:\n  direct image only.\n  No card.\n  No background box.\n  No border.\n  No rounded container.\n  No shadow.\n*/\n\n.cc-fh-main-serviceItem .cc-fh-main-serviceImage {\n  border: 0 !important;\n  border-radius: 0 !important;\n\n  background: transparent !important;\n\n  box-shadow: none !important;\n  outline: 0 !important;\n\n  filter: none !important;\n  transform: none !important;\n}\n\n/* CITY_COOLIES_VILLA_DIRECT_IMAGE_END */\n";


import Image from "next/image";
import { useEffect, useState } from "react";
import FullApartment from "./FullApartment";
import FullBungalowDuplex from "./FullBungalowDuplex";
import VillaCleaning from "./VillaCleaning";
import ServiceCartSidebar from "@/app/services/ServiceCartSidebar";
import CustomizeCleaning from "./CustomizeCleaning";


const serviceTypes = [
  {
    id: "full-apartment",
    name: "Full apartment",
    image: "/deep-cleaning/full_apartment_cleaning_small.webp",
    alt: "Full apartment cleaning",
    targetId: "full-apartment-section",
    targetLabel: "Full apartment",
  },
  {
    id: "full-bungalow-duplex",
    name: "Full bungalow/duplex",
    image: "/deep-cleaning/full_bungalow_duplex_cleaning_small.webp",
    alt: "Full bungalow and duplex cleaning",
    targetId: "full-bungalow-duplex-section",
    targetLabel: "Full bungalow/duplex",
  },
  {
    id: "villa-cleaning",
    name: "Villa Cleaning",
    image: "/deep-cleaning/villa-cleaning.webp",
    alt: "Villa cleaning",
    targetId: "villa-cleaning-section",
    targetLabel: "Villa cleaning",
  },
  {
    id: "customize-cleaning",
    name: "Customize Cleaning",
    image: "/deep-cleaning/customize-cleaning.webp",
    alt: "Customize home cleaning",
    targetId: "customize-cleaning-section",
    targetLabel: "Customize Cleaning",
  },
] as const;

type FullHomeByRoomCleaningSectionProps = {
  rating?: number | null;
  bookingsLabel?: string | null;
};

function scrollToServiceTarget(
  targetId: string,
  targetLabel: string,
) {
  const directTarget = document.getElementById(targetId);

  const headingTarget =
    directTarget ??
    Array.from(
      document.querySelectorAll<HTMLElement>(
        "h1, h2, h3, [data-service-scroll-target]",
      ),
    ).find((element) => {
      const text =
        element.textContent
          ?.replace(/\s+/g, " ")
          .trim()
          .toLowerCase() ?? "";

      return text === targetLabel.toLowerCase();
    });

  if (!headingTarget) {
    return;
  }

  const top =
    headingTarget.getBoundingClientRect().top +
    window.scrollY -
    150;

  window.scrollTo({
    top: Math.max(0, top),
    behavior: "smooth",
  });
}
export default function FullHomeByRoomCleaningSection({
  rating = 4.4,
  bookingsLabel = "9 M bookings",
}: FullHomeByRoomCleaningSectionProps) {
  useEffect(() => {
    const key = "citycoolies:full-home-scroll-cart";
    if (!window.matchMedia("(max-width: 760px)").matches) return;
    if (window.sessionStorage.getItem(key) !== "1") return;

    const timer = window.setTimeout(() => {
      const sidebar = document.querySelector<HTMLElement>(
        ".cc-fh-main-pageSection .cc-fh-main-rightColumn"
      );
      if (!sidebar) return;
      window.sessionStorage.removeItem(key);
      const top = sidebar.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }, 250);
    return () => window.clearTimeout(timer);
  }, []);
  const [furnishingType, setFurnishingType] =
    useState<"furnished" | "unfurnished">("unfurnished");
return (
    <section
      className={"cc-fh-main-pageSection"}
      data-rating={rating ?? undefined}
      data-bookings-label={bookingsLabel ?? undefined}
    >
      <style>{CITY_COOLIES_INLINE_CSS_FULLHOMEBYROOMCLEANINGSECTION}</style>
      <aside className={"cc-fh-main-leftColumn"}>
        <div className={"cc-fh-main-selectorBox"}>
                    <div className={"cc-fh-main-selectorInlineRow"}>
<div
            className={"cc-fh-main-homeTypeButtons"}
            aria-label="Home furnishing type"
          >
            <button
              type="button"
              aria-pressed={furnishingType === "furnished"}
              className={`${"cc-fh-main-homeTypeButton"} ${
                furnishingType === "furnished"
                  ? "cc-fh-main-homeTypeButtonActive"
                  : ""
              }`}
              onClick={() => setFurnishingType("furnished")}
            >
              Furnished
            </button>

            <button
              type="button"
              aria-pressed={furnishingType === "unfurnished"}
              className={`${"cc-fh-main-homeTypeButton"} ${
                furnishingType === "unfurnished"
                  ? "cc-fh-main-homeTypeButtonActive"
                  : ""
              }`}
              onClick={() => setFurnishingType("unfurnished")}
            >
              Unfurnished
            </button>
          </div>
<div className={"cc-fh-main-serviceGrid"}>
            {serviceTypes.map((service, index) => (
              <button
                key={service.id}
                type="button"
                onClick={() =>
                  scrollToServiceTarget(
                    service.targetId,
                    service.targetLabel,
                  )
                }
                className={`${"cc-fh-main-serviceItem"} ${
                  index === 0 ? "cc-fh-main-serviceItemActive" : ""
                }`}
              >
                {service.image ? (
                  <Image loading="eager"
                    src={serviceDisplaySource(service.image)}
                    alt={service.alt}
                    width={192}
                    height={192}
                    unoptimized
                    className={"cc-fh-main-serviceImage"}
                  />
                ) : (
                  <span
                    className={`${"cc-fh-main-serviceImage"} ${"cc-fh-main-serviceImagePlaceholder"}`}
                    aria-hidden="true"
                  />
                )}

                <span className={"cc-fh-main-serviceName"}>
                  {service.name}
                </span>
              </button>
            ))}
          </div>
          </div>
        </div>
      </aside>

      <main className={"cc-fh-main-middleColumn"}>
        <FullApartment furnishingType={furnishingType} />
        <div style={{ height: 28 }} aria-hidden="true" />
        <FullBungalowDuplex furnishingType={furnishingType} />
        <div style={{ height: 28 }} aria-hidden="true" />
        <VillaCleaning furnishingType={furnishingType} />
              <div style={{ height: 28 }} aria-hidden="true" />
              <CustomizeCleaning />
      </main>

      <aside className={"cc-fh-main-rightColumn"}>
        <ServiceCartSidebar cartCount={0} />
      </aside>
    </section>
  );
}

const serviceDisplayImages: Record<string, string> = {
  "/deep-cleaning/carpet_cleaning_service_banner.png": "/deep-cleaning/carpet_cleaning_service_banner_selector.webp",
  "/deep-cleaning/carpet_cleaning_service_banner.webp": "/deep-cleaning/carpet_cleaning_service_banner_selector.webp",
  "/deep-cleaning/chimney_cleaning_service_banner.png": "/deep-cleaning/chimney_cleaning_service_banner_selector.webp",
  "/deep-cleaning/chimney_cleaning_service_banner.webp": "/deep-cleaning/chimney_cleaning_service_banner_selector.webp",
  "/deep-cleaning/commercial_kitchen_cleaning_service_banner.png": "/deep-cleaning/commercial_kitchen_cleaning_service_banner_selector.webp",
  "/deep-cleaning/commercial_kitchen_cleaning_service_banner.webp": "/deep-cleaning/commercial_kitchen_cleaning_service_banner_selector.webp",
  "/deep-cleaning/complete_kitchen_cleaning_service_banner.png": "/deep-cleaning/complete_kitchen_cleaning_service_banner_selector.webp",
  "/deep-cleaning/complete_kitchen_cleaning_service_banner.webp": "/deep-cleaning/complete_kitchen_cleaning_service_banner_selector.webp",
  "/deep-cleaning/curtain_cleaning_service_banner.png": "/deep-cleaning/curtain_cleaning_service_banner_selector.webp",
  "/deep-cleaning/curtain_cleaning_service_banner.webp": "/deep-cleaning/curtain_cleaning_service_banner_selector.webp",
  "/deep-cleaning/dining_table_cleaning_service_banner.png": "/deep-cleaning/dining_table_cleaning_service_banner_selector.webp",
  "/deep-cleaning/dining_table_cleaning_service_banner.webp": "/deep-cleaning/dining_table_cleaning_service_banner_selector.webp",
  "/deep-cleaning/gas_stove_cleaning_service_banner.png": "/deep-cleaning/gas_stove_cleaning_service_banner_selector.webp",
  "/deep-cleaning/gas_stove_cleaning_service_banner.webp": "/deep-cleaning/gas_stove_cleaning_service_banner_selector.webp",
  "/deep-cleaning/leather_sofa_cleaning_service_banner.png": "/deep-cleaning/leather_sofa_cleaning_service_banner_selector.webp",
  "/deep-cleaning/leather_sofa_cleaning_service_banner.webp": "/deep-cleaning/leather_sofa_cleaning_service_banner_selector.webp",
  "/deep-cleaning/mattress_cleaning_service_banner.png": "/deep-cleaning/mattress_cleaning_service_banner_selector.webp",
  "/deep-cleaning/mattress_cleaning_service_banner.webp": "/deep-cleaning/mattress_cleaning_service_banner_selector.webp",
  "/deep-cleaning/microwave_cleaning_service_banner.png": "/deep-cleaning/microwave_cleaning_service_banner_selector.webp",
  "/deep-cleaning/microwave_cleaning_service_banner.webp": "/deep-cleaning/microwave_cleaning_service_banner_selector.webp",
  "/deep-cleaning/sofa_cleaning_service_banner.png": "/deep-cleaning/sofa_cleaning_service_banner_selector.webp",
  "/deep-cleaning/sofa_cleaning_service_banner.webp": "/deep-cleaning/sofa_cleaning_service_banner_selector.webp"
};
function serviceDisplaySource(src: string): string {
  const queryAt = src.indexOf("?");
  const base = queryAt < 0 ? src : src.slice(0, queryAt);
  return serviceDisplayImages[base] ?? src;
}
