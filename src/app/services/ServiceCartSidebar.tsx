"use client";

/**
 * ServiceCartSidebar
 *
 * PURPOSE
 * Displays the current service selection, individual prices and total.
 *
 * DATA CONNECTION
 * ./serviceCart owns the shared browser cart.
 * - subscribeServiceCart: listens for cart updates.
 * - getServiceCartSnapshot: reads the current selection.
 * - parseServiceCartSnapshot: converts the snapshot into cart items.
 * - removeServiceCartItem: removes a service from the shared cart.
 * - confirmSelectedServices: confirms the current selection.
 *
 * NAVIGATION FLOW
 * Service selection -> this sidebar -> Add More Services -> /services.
 * AddToCartService.tsx reads the confirmed selection on /services.
 *
 * MOBILE BEHAVIOR
 * A cart-added event scrolls this sidebar into view on mobile.
 * The existing event name is retained for compatibility.
 *
 * STYLING
 * All sidebar styles and responsive rules are defined in this file.
 * No backend or payment requests are made by this component.
 */

import Link from "next/link";
import {
  useEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
} from "react";

import {
  confirmSelectedServices,
  getServiceCartServerSnapshot,
  getServiceCartSnapshot,
  parseServiceCartSnapshot,
  removeServiceCartItem,
  subscribeServiceCart,
} from "./serviceCart";

// Configuration

const SERVICES_ROUTE = "/services";

// Existing service-selection components dispatch this legacy event.
const CART_ADDED_EVENT = "citycoolies:deep-cleaning-cart-added";

const MOBILE_MEDIA_QUERY = "(max-width: 760px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const CART_SCROLL_DELAY_MS = 250;
const MINIMUM_SCROLL_OFFSET_PX = 190;
const HEADER_SCROLL_GAP_PX = 16;

// Public props

type ServiceCartSidebarProps = {
  /**
   * Retained for existing callers.
   * The displayed count always comes from the shared cart.
   */
  cartCount?: number;
};

// Mobile scrolling

function useMobileCartScroll() {
  const cartRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let scrollTimer: number | undefined;

    function scrollToCart() {
      const cart = cartRef.current;

      if (!cart) {
        return;
      }

      const headerBottom =
        document.querySelector("header")?.getBoundingClientRect().bottom ?? 0;

      const topOffset = Math.max(
        MINIMUM_SCROLL_OFFSET_PX,
        headerBottom + HEADER_SCROLL_GAP_PX,
      );

      const targetTop = Math.max(
        0,
        cart.getBoundingClientRect().top + window.scrollY - topOffset,
      );

      const prefersReducedMotion = window.matchMedia(
        REDUCED_MOTION_QUERY,
      ).matches;

      window.scrollTo({
        top: targetTop,
        behavior: prefersReducedMotion ? "instant" : "smooth",
      });
    }

    function handleCartAdded() {
      if (!window.matchMedia(MOBILE_MEDIA_QUERY).matches) {
        return;
      }

      if (scrollTimer !== undefined) {
        window.clearTimeout(scrollTimer);
      }

      // Allow the service popup to close before scrolling.
      scrollTimer = window.setTimeout(
        scrollToCart,
        CART_SCROLL_DELAY_MS,
      );
    }

    window.addEventListener(CART_ADDED_EVENT, handleCartAdded);

    return () => {
      window.removeEventListener(CART_ADDED_EVENT, handleCartAdded);

      if (scrollTimer !== undefined) {
        window.clearTimeout(scrollTimer);
      }
    };
  }, []);

  return cartRef;
}

// Sidebar component

export default function ServiceCartSidebar(
  props: ServiceCartSidebarProps,
) {
  // Preserve the public prop without using it as a second data source.
  void props.cartCount;

  const cartRef = useMobileCartScroll();

  const snapshot = useSyncExternalStore(
    subscribeServiceCart,
    getServiceCartSnapshot,
    getServiceCartServerSnapshot,
  );

  const items = useMemo(
    () => parseServiceCartSnapshot(snapshot),
    [snapshot],
  );

  const total = items.reduce(
    (sum, item) => sum + item.price,
    0,
  );

  const isEmpty = items.length === 0;

  return (
    <aside className="cc-service-sidebar-sidebar">
      <section
        ref={cartRef}
        className="cc-service-sidebar-cartCard"
        aria-label="Selected services"
      >
        {isEmpty ? (
          <div className="cc-service-sidebar-emptyCart">
            <span
              className="cc-service-sidebar-cartIcon"
              aria-hidden="true"
            >
              {"\u{1F6D2}"}
            </span>

            <p>No items in your cart</p>
          </div>
        ) : (
          <>
            <div className="cc-service-sidebar-cartHeader">
              <h2>Your services</h2>
              <span>{items.length}</span>
            </div>

            <div className="cc-service-sidebar-cartItems">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="cc-service-sidebar-cartItem"
                >
                  <div className="cc-service-sidebar-cartItemContent">
                    <div className="cc-service-sidebar-cartItemHeading">
                      <h3>{item.serviceTitle}</h3>
                      <strong>{item.priceLabel}</strong>
                    </div>

                    <p>
                      {item.optionLabel}
                      {" \u00B7 "}
                      {item.duration}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="cc-service-sidebar-removeButton"
                    aria-label={`Remove ${item.serviceTitle}`}
                    title="Remove service"
                    onClick={() => removeServiceCartItem(item.id)}
                  >
                    {"\u00D7"}
                  </button>
                </article>
              ))}
            </div>

            <div className="cc-service-sidebar-cartTotal">
              <span>Estimated total</span>
              <strong>
                {"\u20B9"}
                {total.toLocaleString("en-IN")}
              </strong>
            </div>

            <Link
              href={SERVICES_ROUTE}
              className="cc-service-sidebar-addMoreServices"
              onClick={confirmSelectedServices}
            >
              Add More Services
            </Link>

            <p className="cc-service-sidebar-bookingNote">
              Final booking and payment will be connected with the backend later.
            </p>
          </>
        )}
      </section>

      <style>{SIDEBAR_CSS}</style>
    </aside>
  );
}

// Styles use a sidebar-specific prefix to avoid other page components.

const SIDEBAR_CSS = `
  /* Sidebar container */

  .cc-service-sidebar-sidebar {
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 26px;
  }

  .cc-service-sidebar-cartCard {
    display: flex;
    width: 100%;
    flex-direction: column;
    max-height: clamp(380px, calc(100dvh - 360px), 640px);
    padding: 26px;
    overflow: hidden;
    border: 1px solid #f0d7da;
    border-radius: 13px;
    background: #ffffff;
    box-shadow: 0 4px 18px rgba(239, 27, 35, 0.025);
  }

  .cc-service-sidebar-cartCard:has(.cc-service-sidebar-cartItems) {
    height: min(640px, calc(100dvh - 190px));
    max-height: none;
  }

  /* Empty cart */

  .cc-service-sidebar-emptyCart {
    display: flex;
    min-height: 120px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    color: #777777;
    text-align: center;
  }

  .cc-service-sidebar-cartIcon {
    font-size: 34px;
    filter: grayscale(1);
    opacity: 0.65;
  }

  .cc-service-sidebar-emptyCart p {
    margin: 0;
    font-size: 14px;
  }

  /* Heading and item count */

  .cc-service-sidebar-cartHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding-bottom: 16px;
    border-bottom: 1px solid #f1e2e4;
  }

  .cc-service-sidebar-cartHeader h2 {
    margin: 0;
    color: #171717;
    font-size: 20px;
    font-weight: 700;
  }

  .cc-service-sidebar-cartHeader span {
    display: inline-flex;
    min-width: 27px;
    height: 27px;
    align-items: center;
    justify-content: center;
    padding: 0 7px;
    border-radius: 999px;
    background: #ef1b23;
    color: #ffffff;
    font-size: 12px;
    font-weight: 700;
  }

  /* Scrollable service list */

  .cc-service-sidebar-cartItems {
    display: flex;
    min-height: 0;
    flex: 1 1 auto;
    flex-direction: column;
    overflow-y: auto;
    overscroll-behavior: contain;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .cc-service-sidebar-cartItems::-webkit-scrollbar {
    display: none;
  }

  .cc-service-sidebar-cartItems .cc-service-sidebar-cartItem {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid #f1e2e4;
  }

  .cc-service-sidebar-cartItemContent {
    min-width: 0;
    flex: 1;
  }

  .cc-service-sidebar-cartItemHeading {
    display: flex;
    min-width: 0;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
  }

  .cc-service-sidebar-cartItem h3 {
    min-width: 0;
    margin: 0;
    color: #222222;
    font-size: 14px;
    font-weight: 650;
    line-height: 1.35;
    overflow-wrap: anywhere;
  }

  .cc-service-sidebar-cartItem strong {
    flex: 0 0 auto;
    color: #171717;
    font-size: 13px;
    line-height: 1.35;
    white-space: nowrap;
  }

  .cc-service-sidebar-cartItems .cc-service-sidebar-cartItem p {
    display: -webkit-box;
    margin: 4px 0 0;
    overflow: hidden;
    color: #6a6a6a;
    font-size: 12px;
    line-height: 1.4;
    -webkit-box-orient: vertical;
    line-clamp: 2;
    -webkit-line-clamp: 2;
  }

  /* Remove service action */

  .cc-service-sidebar-removeButton {
    display: inline-flex;
    width: 28px;
    min-width: 28px;
    height: 28px;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 1px solid #f0c9cc;
    border-radius: 50%;
    background: #fff7f8;
    color: #ef1b23;
    font-size: 19px;
    line-height: 1;
    cursor: pointer;
  }

  .cc-service-sidebar-removeButton:hover {
    background: #ef1b23;
    color: #ffffff;
  }

  /* Total and navigation */

  .cc-service-sidebar-cartHeader,
  .cc-service-sidebar-cartTotal,
  .cc-service-sidebar-addMoreServices,
  .cc-service-sidebar-bookingNote {
    flex: 0 0 auto;
  }

  .cc-service-sidebar-cartTotal {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    padding-top: 17px;
  }

  .cc-service-sidebar-cartTotal span {
    color: #555555;
    font-size: 13px;
  }

  .cc-service-sidebar-cartTotal strong {
    color: #171717;
    font-size: 17px;
  }

  .cc-service-sidebar-addMoreServices {
    display: flex;
    width: 100%;
    min-height: 42px;
    align-items: center;
    justify-content: center;
    margin-top: 18px;
    padding: 9px 14px;
    border: 1px solid #ef1b23;
    border-radius: 10px;
    background: #ffffff;
    color: #ef1b23;
    font-size: 14px;
    font-weight: 700;
    line-height: 1.3;
    text-align: center;
    text-decoration: none;
  }

  .cc-service-sidebar-addMoreServices:hover,
  .cc-service-sidebar-addMoreServices:focus-visible {
    background: #ef1b23;
    color: #ffffff;
  }

  .cc-service-sidebar-addMoreServices:focus-visible {
    outline: 2px solid #ef1b23;
    outline-offset: 2px;
  }

  .cc-service-sidebar-bookingNote {
    margin: 12px 0 0;
    color: #858585;
    font-size: 11px;
    line-height: 1.45;
  }

  /* Compact desktop and tablet spacing */

  @media (max-width: 1020px) {
    .cc-service-sidebar-cartCard {
      padding: 21px;
    }
  }

  /* Tablet height and touch scrolling */

  @media (max-width: 980px) {
    .cc-service-sidebar-cartCard {
      max-height: min(640px, 75dvh);
    }

    .cc-service-sidebar-cartCard:has(.cc-service-sidebar-cartItems) {
      height: min(640px, 85dvh);
      max-height: none;
    }

    .cc-service-sidebar-cartItems {
      overscroll-behavior-y: auto;
      touch-action: pan-y;
      -webkit-overflow-scrolling: touch;
    }
  }

  /* Mobile: show up to four rows before scrolling */

  @media (max-width: 600px) {
    .cc-service-sidebar-cartCard:has(.cc-service-sidebar-cartItems) {
      height: auto !important;
      max-height: none !important;
    }

    .cc-service-sidebar-cartItems {
      flex: 0 1 auto !important;
      max-height: 272px;
      overflow-y: auto !important;
    }

    .cc-service-sidebar-cartItems .cc-service-sidebar-cartItem {
      box-sizing: border-box;
      height: 68px;
      min-height: 68px;
      flex: 0 0 68px;
      overflow: hidden;
      padding: 8px 0;
    }

    .cc-service-sidebar-cartItems .cc-service-sidebar-cartItem p {
      line-clamp: 1;
      -webkit-line-clamp: 1;
    }
  }
`;
